self.addEventListener('message', function(e) {
	if (!e.data.cmd || e.data.cmd!='decode') {
		return;
	}
	var j, i, sum;
	this_quietSize=8;
	this_height=1;
	this_avgGray=0;
	this_pixels=e.data.msg;
	console.log(this_pixels);
	this_width=this_pixels.length;
	this_center=parseInt(this_width/2);
	this_getBit=function(plStart, pbitsize, log) {
		var sum=0, blStart=Math.ceil(plStart), bitsize=Math.floor(pbitsize)||1;
		var pixels=[];
		var rMax=this_pixels.length;
		for (var j=blStart;j<bitsize+blStart;++j) {
			sum+=j<rMax?this_pixels[j]:0;
			pixels.push(j<rMax?this_pixels[j]:0);
		}
		var avg=sum/bitsize;
		var bit=avg<(this_avgGray*1)?1:0;
		if (log) {
			console.log('checking bit at point '+blStart+', bitsize '+bitsize, 'gray is '+this_avgGray, 'sum is '+sum, ' avg is '+(sum/bitsize), 'result is '+bit);
			console.log(pixels, plStart, pbitsize);
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
			for (i=0;i<this_quietSize;++i) {
				if (this_getBit(lStart+i*bitsize, bitsize)) {
					allLow=0;
					break; // no point continuing this loop - it's not a quiet area
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
			for (var rStart=minRStart;rStart<maxRStart;++rStart) {
				// at each rStart position, check this_quietSize bits and see if they are all low
				allLow=1;
				for (i=0;i<this_quietSize;++i) {
					if (this_getBit(rStart+i*bitsize, bitsize)) {
						allLow=0;
						break; // no point continuing this loop - it's not a quiet area
					}
				}
				// if this rStart position does not have this_quietSize low bits, then continue on to the next rStart position
				if (!allLow) {
					continue;
				}
				result.right=rStart;
				result.level=2;
				result.gray=this_avgGray;
				// { otherwise, we have found a quiet area where expected and can start checking the code itself. exciting!
				// first, we set the boundaries of the expected barcode
				var bcStart=lStart+bitsize*this_quietSize, bcWidth=rStart-bcStart, bcBitSize=bcWidth/95;
				result.bcStart=bcStart;
				result.bcWidth=bcWidth;
				result.bitsize=bcBitSize;
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
				var mStart=Math.ceil(bcStart+bcWidth/2-bcBitSize*2.5);
				if (this_getBit(mStart, bcBitSize) || !this_getBit(mStart+bcBitSize, bcBitSize) || this_getBit(mStart+bcBitSize*2, bcBitSize) || !this_getBit(mStart+bcBitSize*3, bcBitSize) || this_getBit(mStart+bcBitSize*4, bcBitSize)) {
				result.middleMarker=[mStart, mStart+bcBitSize, mStart+bcBitSize*2, mStart+bcBitSize*3, mStart+bcBitSize*4];
					break;
				}
				result.middleMarker=[mStart, mStart+bcBitSize, mStart+bcBitSize*2, mStart+bcBitSize*3, mStart+bcBitSize*4];
				result.level=5;
				// }
				// awesome! this is looking good. now we can extract the 7-bit bytes inside the barcode.
				// now that we know the exact size of the barcode in the image, we can rescale it down to 95 pixels to make bit extraction easier
				var nextBitSize=Math.ceil(bcBitSize)*2, multiplier=nextBitSize/bcBitSize;
				var arr=[], min=255, max=0, pixel;
				for (i=0;i<bcWidth;i++) {
					pixel=this_pixels[bcStart+i];
					var idx1=Math.ceil(i*multiplier), idx2=idx1+1, idx3=idx2+1, idx4=idx3+1;
					arr[idx1]=pixel;
					arr[idx2]=pixel;
					arr[idx3]=pixel;
					arr[idx4]=pixel;
					if (pixel<min) {
						min=pixel;
					}
					if (pixel>max) {
						max=pixel;
					}
				}
				if (min>0 || max<255) {
					var normaliser=255/(max-min);
					for (i=0;i<arr.length;++i) {
						arr[i]=(arr[i]-min)*normaliser;
					}
				}
				// normalize arr before the next stage
				var barcodePixels=[], psum;
				for (i=0;i<95;++i) {
					psum=0;
					for (j=0;j<nextBitSize;++j) {
						psum+=arr[i*nextBitSize+j];
					}
					psum/=nextBitSize;
					barcodePixels.push(psum);
					sum+=psum;
				}
				// now find a better average gray
				var avgGray=sum/95;
				result.avgGray=avgGray;
				// there are two groups of 6 bytes each
				var lbytes=[], b;
				for (i=0;i<6;++i) {
					b='';
					for (j=0;j<7;++j) {
						b+=barcodePixels[i*7+3+j]<avgGray?'1':'0';
					}
					lbytes.push(b);
				}
				var rbytes=[];
				for (i=0;i<6;++i) {
					b='';
					for (j=0;j<7;++j) {
						b+=barcodePixels[i*7+50+j]<avgGray?'1':'0';
					}
					rbytes.push(b);
				}
				result.level=6;
				result.lbytes=lbytes;
				result.rbytes=rbytes;
				console.log('succeeded in finding barcode');
				console.log(result);
				return self.postMessage(result);
				// }
				// after finding a right quiet area, there's no point looking any further right
				break;
			}
			// }
		}
	}
	// }
	console.log('failed to find barcode');
	console.log(result);
	self.postMessage(result);
});
