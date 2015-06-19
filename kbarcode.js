self.addEventListener('message', function(e) {
	if (!e.data.cmd || e.data.cmd!='decode') {
		return;
	}
	var j, i, sum;
	this_quietSize=6;
	this_height=1;
	this_avgGray=0;
	this_pixels=e.data.msg;
	this_width=this_pixels.length;
	this_center=parseInt(this_width/2);
	this_getBit=function(plStart, pbitsize, log) {
		var sum=0, blStart=parseInt(plStart), bitsize=parseInt(pbitsize)||1;
		var pixels=[];
		var rMax=this_pixels.length, avg;
		if (bitsize==1) {
			avg=this_pixels[blStart];
			pixels=[avg];
		}
		else {
			sum=(this_pixels[blStart]+this_pixels[blStart+bitsize-1])/2<this_avgGray?0:255;
			pixels.push([this_pixels[blStart], blStart+bitsize<rMax?this_pixels[blStart+bitsize-1]:0]);
			for (var j=blStart+1;j<bitsize+blStart-1;++j) {
				sum+=j<rMax?(this_pixels[j]<this_avgGray?0:255):0;
				pixels.push(j<rMax?this_pixels[j]:0);
			}
			var avg=sum/(bitsize-1);
		}
		var bit=avg<(this_avgGray)?1:0;
		if (log) {
			console.log('checking bit at point '+blStart,
				'bitsize '+bitsize,
				'gray is '+this_avgGray,
				'sum is '+sum,
				' avg is '+(avg),
				'result is '+bit,
				'this_avgGray is '+this_avgGray
			);
			console.log(plStart, pixels);
		}
		return bit;
	};
	var result={
		'success':0
	};
	sum=0;
	for (i=0;i<this_width;++i) {
		sum+=this_pixels[i];
	}
	this_avgGray=sum/this_width;
	// barcode is a "quiet" area of this_quietSize low bits, 3+7*6+5+7*6+3 (95) bits of encoding, followed by this_quietSize low bits. 109 total.
	// we start by first finding a "quiet" area on the left.
	// we cannot be certain of the "bit size" of the barcode, so we start with bit-size 1.
	// {
	var maxbitsize=Math.ceil(this_width/109); // bitsize can't be higher or the barcode is larger than the image.
	result.pixels=this_pixels;
	for (var bitsize=1;bitsize<maxbitsize;++bitsize) {
		result.bitsize=bitsize;
		result.quietSize=this_quietSize;
		// starting from the center of the image, check left until we find this_quietSize repeated "low" bits (the "quiet area")
		for (var lStart=this_center;lStart>=0;--lStart) {
			// at each start position, check this_quietSize bits and see if they are all low
			var allLow=1;
			for (i=lStart;i<this_quietSize*bitsize+lStart;++i) {
				if (this_pixels[i]<this_avgGray) {
					allLow=0;
					break;
				}
			}
			// if this start position does not have this_quietSize low bits, then continue on to the next start position
			if (!allLow) {
				continue;
			}
			result.left=lStart;
			result.level=1;
			// { otherwise, we have a quiet area and can check this further
			// next we need to check on the right size of the barcode to find a quiet area there.
			// if there, it starts somewhere between lStart+(bitsize*103) and lStart+((bitsize+1)*103)-1 inclusive.
			// this accounts for bits that are "between" pixel sizes, as the barcode is not strictly pixelated in the image.
			var minRStart=lStart+(bitsize*(95+this_quietSize));
			var maxRStart=lStart+((bitsize+1)*(95+this_quietSize));
			if (maxRStart+this_quietSize*bitsize>this_pixels.length) {
				maxRStart=this_pixels.length-this_quietSize*bitsize;
			}
			var bcStart=lStart+bitsize*this_quietSize;
			for (var rStart=minRStart;rStart<maxRStart;++rStart) {
				// set the boundaries of the expected barcode
				var bcWidth=rStart-bcStart, bcBitSize=bcWidth/95;
				// at each rStart position, check this_quietSize bits and see if they are all low
				allLow=1;
				for (i=rStart;i<this_quietSize*bcBitSize+rStart;++i) {
					if (this_pixels[i]<this_avgGray) {
						allLow=0;
						break;
					}
				}
				// if this rStart position does not have this_quietSize low bits, then continue on to the next rStart position
				if (!allLow) {
					continue;
				}
				result.right=rStart;
				result.level=2;
				result.gray=this_avgGray;
				result.bcStart=bcStart;
				result.bcWidth=bcWidth;
				result.bitsize=bcBitSize;
				// { otherwise, we have found a quiet area where expected and can start checking the code itself. exciting!
				// and now we can check for the "markers"
				// if anything at all is wrong from this point forward, then we don't bother checking again at this bit size
				// { check for start marker
				if (!this_getBit(bcStart, bcBitSize) || this_getBit(bcStart+bcBitSize, bcBitSize) || !this_getBit(bcStart+bcBitSize*2, bcBitSize)) {
					break;
				}
				result.leftMarker=[bcStart, bcStart+bcBitSize, bcStart+bcBitSize*2];
				result.level=3;
				// }
				// { check right marker
				var mStart2=Math.ceil(bcStart+bcWidth-bcBitSize*3);
				if (!this_getBit(mStart2, bcBitSize) || this_getBit(mStart2+bcBitSize, bcBitSize) || !this_getBit(mStart2+bcBitSize*2, bcBitSize)) {
					break;
				}
				result.rightMarker=[mStart2, mStart2+bcBitSize, mStart2+bcBitSize*2];
				result.level=4;
				// }
				// { check middle marker
				var mStart=bcStart+bcWidth/2-bcBitSize*2.5;
				if (this_getBit(mStart, bcBitSize) ||
					!this_getBit(mStart+bcBitSize, bcBitSize) ||
					this_getBit(mStart+bcBitSize*2, bcBitSize) ||
					!this_getBit(mStart+bcBitSize*3, bcBitSize) ||
					this_getBit(mStart+bcBitSize*4, bcBitSize)
				) {
					break;
				}
				result.middleMarker=[mStart, mStart+bcBitSize, mStart+bcBitSize*2, mStart+bcBitSize*3, mStart+bcBitSize*4];
				result.level=5;
				// }
				// awesome! this is looking good. now we can extract the 7-bit bytes inside the barcode.
				// first, find a better this_avgGray
				sum=0;
				for (i=lStart; i<rStart; ++i) {
					sum+=this_pixels[i];
				}
				this_avgGray=sum/(rStart-lStart);
				result.avgGray=this_avgGray;
				// there are two groups of 6 bytes each
				var lbytes=[], b;
				for (i=0;i<6;++i) {
					b='';
					for (j=0;j<7;++j) {
						b+=this_getBit(lStart+bcBitSize*(i*7+j+this_quietSize+2), bcBitSize);
					}
					lbytes.push(b);
				}
				var rbytes=[];
				for (i=0;i<6;++i) {
					b='';
					for (j=0;j<7;++j) {
						b+=this_getBit(lStart+bcBitSize*(i*7+j+this_quietSize+49), bcBitSize);
					}
					rbytes.push(b);
				}
				result.level=6;
				result.lbytes=lbytes;
				result.rbytes=rbytes;

				result.success=1;
				return self.postMessage(result);
				// }
				// after finding a right quiet area, there's no point looking any further right
				break;
			}
			// }
		}
	}
	// }
	self.postMessage(result);
});
