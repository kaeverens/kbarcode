window.KBarcode=function(img, callback) {
	this.quietSize=7;
	this.imageEl=img;
	this.width=img.naturalWidth;
	this.height=img.naturalHeight;
	this.center=parseInt(this.width/2);
	this.canvas=document.createElement('canvas');
	this.canvas.width=this.width;
	this.canvas.height=this.quietSize;
	this.avgGray=0;
	this.ctx=this.canvas.getContext('2d');
	this.pixels=new Uint8ClampedArray(this.width);
	this.getBit=function(plStart, pbitsize, log) {
		var sum=0, lStart=Math.ceil(plStart), bitsize=Math.floor(pbitsize);
		for (var j=lStart;j<bitsize+lStart;++j) {
			sum+=this.pixels[j];
		}
		if (log) {
			console.log('checking bit', lStart, bitsize, this.avgGray, sum/bitsize);
		}
		return (sum/bitsize)<this.avgGray?1:0;
	}
	this.getBytes=function(lpos, bitsize) {
		var bytes=[];
		for (var i=0;i<6;++i) {
			bytes.push(this.getByte(lpos+bitsize*7*i, bitsize));
		}
		return bytes;
	}
	this.getByte=function(lpos, bitsize) {
		var b=0;
		b+=64*this.getBit(lpos, bitsize);
		b+=32*this.getBit(lpos+bitsize, bitsize);
		b+=16*this.getBit(lpos+bitsize*2, bitsize);
		b+=8*this.getBit(lpos+bitsize*3, bitsize);
		b+=4*this.getBit(lpos+bitsize*4, bitsize);
		b+=2*this.getBit(lpos+bitsize*5, bitsize);
		b+=1*this.getBit(lpos+bitsize*6, bitsize);
		return b;
	}
	this.check=function() {
		var result={
			'success':0
		};
		this.ctx.drawImage(img, 0, -parseInt(this.height/2));
		var imageData=this.ctx.getImageData(0, 0, this.width, 1).data, i;
		document.body.appendChild(this.canvas);
		var sum=0;
		for (i=0;i<this.width;++i) {
			this.pixels[i]=parseInt((imageData[i*4]*0.21+imageData[i*4+1]*0.72+imageData[i*4+2]*0.07));
			sum+=this.pixels[i];
		}
		this.avgGray=sum/this.width;
		// barcode is a "quiet" area of this.quietSize low bits, 3+7*6+5+7*6+3 (95) bits of encoding, followed by this.quietSize low bits. 109 total.
		// we start by first finding a "quiet" area on the left.
		// we cannot be certain of the "bit size" of the barcode, so we start with bit-size 1.
		// {
		var maxbitsize=Math.ceil(this.width/109); // bitsize can't be higher or the barcode is larger than the image.
		for (var bitsize=1;bitsize<maxbitsize;++bitsize) {
			// starting from the center of the image, check left until we find this.quietSize repeated "low" bits (the "quiet area")
			for (var lStart=this.center;lStart>=0;--lStart) {
				// at each start position, check this.quietSize bits and see if they are all low
				var allLow=1;
				for (i=0;i<this.quietSize;++i) {
					if (this.getBit(lStart+i*bitsize, bitsize)) {
						allLow=0;
						break; // no point continuing this loop - it's not a quiet area
					};
				}
				// if this start position does not have this.quietSize low bits, then continue on to the next start position
				if (!allLow) {
					continue;
				}
				result.left=lStart;
				result.level=1;
				// { otherwise, we have a quiet area and can check this further
				// next we need to check on the right size of the barcode to find a quiet area there.
				// if there, it starts somewhere between lStart+(bitsize*103) and lStart+((bitsize+1)*103)-1 inclusive.
				// this accounts for bits that are "between" pixel sizes, as the barcode is not strictly pixelated in the image.
				var minRStart=lStart+(bitsize*95+this.quietSize);
				var maxRStart=lStart+((bitsize+1)*95+this.quietSize);
				for (var rStart=minRStart;rStart<maxRStart;++rStart) {
					// at each rStart position, check this.quietSize bits and see if they are all low
					allLow=1;
					for (i=0;i<this.quietSize;++i) {
						if (this.getBit(rStart+i*bitsize, bitsize)) {
							allLow=0;
							break; // no point continuing this loop - it's not a quiet area
						}
					}
					// if this rStart position does not have this.quietSize low bits, then continue on to the next rStart position
					if (!allLow) {
						continue;
					}
					result.right=rStart;
					result.level=2;
					// { otherwise, we have found a quiet area where expected and can start checking the code itself. exciting!
					// first, we set the boundaries of the expected barcode
					var bcStart=lStart+bitsize*this.quietSize, bcWidth=rStart-bcStart, bcBitSize=bcWidth/95;
					// and now we can check for the "markers"
					// if anything at all is wrong from this point forward, then we don't bother checking again at this bit size
					// { check for start marker
					if (!this.getBit(bcStart, bcBitSize) || this.getBit(bcStart+bcBitSize, bcBitSize) || !this.getBit(bcStart+bcBitSize*2, bcBitSize)) {
						break;
					}
					// }
					result.level=3;
					// { check middle marker
					var mStart=bcStart+bcWidth/2-bcBitSize*2.5;
					if (this.getBit(mStart, bcBitSize) || !this.getBit(mStart+bcBitSize, bcBitSize) || this.getBit(mStart+bcBitSize*2, bcBitSize) || !this.getBit(mStart+bcBitSize*3, bcBitSize) || this.getBit(mStart+bcBitSize*4, bcBitSize)) {
						break;
					}
					// }
					result.level=4;
					// { check right marker
					var mStart2=bcStart+bcWidth-bcBitSize*3;
					if (!this.getBit(mStart2, bcBitSize)
						|| this.getBit(mStart2+bcBitSize, bcBitSize)
						|| !this.getBit(mStart2+bcBitSize*2, bcBitSize)
					) {
						break;
					}
					// }
					result.level=5;
					// awesome! this is looking good. now we can extract the 7-bit bytes inside the barcode.
					// there are two groups of 6 bytes each
					var lbytes=this.getBytes(bcStart+bcBitSize*3, bcBitSize);
					var rbytes=this.getBytes(mStart+bcBitSize*5, bcBitSize);
					result.level=6;
					result.lbytes=lbytes;
					result.rbytes=rbytes;
					// }
					// after finding a right quiet area, there's no point looking any further right
					break;
				}
				// }
				// after finding a left quiet area, there's no point looking any further left
				break;
			}
		}
		// }
		result.pixels=this.pixels;
		callback(result);
	}
	return this;
}
