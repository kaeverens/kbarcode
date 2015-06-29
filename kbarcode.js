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
			pixels=avg;
		}
		else {
			sum=(this_pixels[blStart]+this_pixels[blStart+bitsize-1])/2;
			pixels.push([this_pixels[blStart], blStart+bitsize<rMax?this_pixels[blStart+bitsize-1]:0]);
			for (var j=blStart+1;j<bitsize+blStart-1;++j) {
				sum+=j<rMax?this_pixels[j]:0;
				pixels.push(j<rMax?this_pixels[j]:0);
			}
			var avg=sum/(bitsize-1);
		}
		var bit=avg<this_avgGray?1:0;
		if (log) {
			console.log('checking bit at point '+blStart,
				'bitsize '+bitsize,
				'gray is '+this_avgGray,
				'sum is '+sum,
				'avg is '+avg,
				'bit is '+bit
			);
			console.log(blStart, pixels);
		}
		return bit;
	};
	var result={
		'success':0
	};
	function calibrateGray(lBound, rBound) {
		var sum=0;
		for (var i=lBound; i<rBound; ++i) {
			sum+=this_pixels[i];
		}
		this_avgGray=sum/(rBound-lBound);
	}
	function getBytes(lBound, rBound, log) {
		lBound=Math.floor(lBound);
		rBound=Math.ceil(rBound);
		var width=rBound-lBound+1, byteWidth=width/6, bitWidth=width/42;
		// first, find a better average gray value for this section
		calibrateGray(lBound, rBound);
		var bytes=[];
		for (var i=0;i<6;++i) {
			var b='';
			for (var j=0;j<7;++j) {
				b+=this_getBit(Math.floor(lBound+byteWidth*i+bitWidth*j), bitWidth, log);
			}
			bytes.push(b);
		}
		return bytes;
	}
	calibrateGray(0, this_width);
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
			calibrateGray(lStart, lStart+95);
			// at each start position, check this_quietSize bits and see if they are all low
			var allLow=1;
			for (i=lStart;i<this_quietSize*bitsize+lStart;++i) {
				if (this_pixels[i]<this_avgGray+20) {
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
			while (this_pixels[i]>this_avgGray && i<this_center) { // make sure we start the barcode proper on a high bit.
				i++;
			}
			var bcStart=i;
			result.bcStart=bcStart;
			for (var rStart=minRStart;rStart<maxRStart;++rStart) {
				calibrateGray(lStart, lStart+95);
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
				result.bcWidth=bcWidth;
				result.bitsize=bcBitSize;
				// { otherwise, we have found a quiet area where expected and can start checking the code itself. exciting!
				// and now we can check for the "markers"
				// if anything at all is wrong from this point forward, then we don't bother checking again at this bit size
				// first, recalibrate the average gray value
				calibrateGray(bcStart, rStart);
				var barcodeType='';
				// { check for start marker
				if (!this_getBit(bcStart, bcBitSize) ||
					this_getBit(bcStart+bcBitSize, bcBitSize) ||
					!this_getBit(bcStart+bcBitSize*2, bcBitSize)
				) {
					break;
				}
				result.leftMarker=[bcStart, bcStart+bcBitSize, bcStart+bcBitSize*2];
				result.level=3;
				// }
				// { check right marker
				var rGuardStart=parseInt(rStart-bcBitSize*3);
				if (!this_getBit(rGuardStart, bcBitSize) ||
					this_getBit(rGuardStart+bcBitSize, bcBitSize) ||
					!this_getBit(rGuardStart+bcBitSize*2, bcBitSize)
				) {
					break;
				}
				result.rightMarker=[rGuardStart, rGuardStart+bcBitSize, rGuardStart+bcBitSize*2];
				result.level=4;
				// }
				if (!this_getBit(bcStart+bcBitSize*3, bcBitSize) && this_getBit(rGuardStart-bcBitSize, bcBitSize)) { // probably ITF-14
					result.type='itf';
					result.lBytesLBound=parseInt(bcStart+3*bcBitSize);
					while (this_pixels[result.lBytesLBound]>this_avgGray) {
						result.lBytesLBound++;
					}
					result.rBytesRBound=rGuardStart-1;
					while (this_pixels[result.rBytesRBound]<this_avgGray) {
						result.rBytesRBound--;
					}
					result.numbits=14*(2*3+3); // num digits (14) multiplied by (num wide bits (2) by width (2.5) plus num narrow bits)
					var bits=[], tbitsize=(result.rBytesRBound-result.lBytesLBound)/result.numbits;
					result.bitsize=tbitsize;
					var lengths=[], lengthsAt=-1, expectedBit=0;
					for (var bit=0;bit<result.numbits;++bit) {
						var b=this_getBit(result.lBytesLBound+bit*tbitsize, tbitsize)?1:0;
						bits.push(b);
						if (b!=expectedBit) {
							lengthsAt++;
							lengths[lengthsAt]=1;
							expectedBit=expectedBit?0:1;
						}
						else {
							lengths[lengthsAt]++;
						}
					}
					if (lengthsAt!=59) { // should be (12 digits * 5 bits -1 offset = 59)
						continue;
					}
					result.bits=bits;
					var bytes=[];
					for (var i=0;i<6;++i) { // convert lengths into 5-bit bytes
						for (var j=0;j<2;++j) {
							var bits=[];
							for (var k=0;k<5;++k) {
								bits.push(lengths[i*10+j+k*2]);
							}
							bytes.push(bits);
						}
					}
					for (var i=0;i<bytes.length;++i) { // "normalise" the bytes by zeroing the lowest 3 bits
						for (var j=0;j<3;++j) {
							var lowest=200, lowestIdx=0;
							for (var k=0;k<5;++k) {
								if (bytes[i][k] && bytes[i][k]<lowest) {
									lowest=bytes[i][k];
									lowestIdx=k;
								}
							}
							bytes[i][lowestIdx]=0;
						}
						for (var j=0;j<5;++j) {
							if (bytes[i][j]) {
								bytes[i][j]=1;
							}
						}
						// convert to "bitstring"
						bytes[i]=bytes[i].join('');
					}
					// { convert the bytes to numbers
					var itfBytes={
						'00110':0,
						'10001':1,
						'01001':2,
						'11000':3,
						'00101':4,
						'10100':5,
						'01100':6,
						'00011':7,
						'10010':8,
						'01010':9
					};
					var ok=true;
					for (var i=0;i<12;++i) {
						var n=itfBytes[bytes[i]];
						if (n===undefined) {
							ok=false;
						}
						else {
							bytes[i]=n;
						}
					}
					if (!ok) {
						continue;
					}
					result.value=bytes.join('');
					// }
					return self.postMessage(result);
				}
				else { // probably EAN-13
					result.type='ean13';
					// { check middle marker
					var mStart=parseInt(bcStart+bcWidth/2-bcBitSize*2.5);
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
					// adjust the guard boundaries so they're right at their edges
					while (this_pixels[rGuardStart-1]<this_avgGray) {
						rGuardStart--;
					}
					// both sides can be done the same way, so do it in a function
					result.lBytesLBound=parseInt(bcStart+3*bcBitSize);
					while (this_pixels[result.lBytesLBound]<this_avgGray) {
						result.lBytesLBound++;
					}
					result.lBytesRBound=mStart-1;
					result.rBytesLBound=mStart+5*bcBitSize;
					while (this_pixels[result.rBytesLBound-1]<this_avgGray) {
						result.rBytesLBound--;
					}
					result.rBytesRBound=rGuardStart-1;
					while (this_pixels[result.rBytesRBound]<this_avgGray) {
						result.rBytesRBound--;
					}
					var lbytes=getBytes(result.lBytesLBound, result.lBytesRBound),
						rbytes=getBytes(result.rBytesLBound, result.rBytesRBound);
					result.level=6;
					result.lbytes=lbytes;
					result.rbytes=rbytes;
					// decode the bytes into digits
					var eanDigits=[
						['0001101', '0100111', '1110010'],
						['0011001', '0110011', '1100110'],
						['0010011', '0011011', '1101100'],
						['0111101', '0100001', '1000010'],
						['0100011', '0011101', '1011100'],
						['0110001', '0111001', '1001110'],
						['0101111', '0000101', '1010000'],
						['0111011', '0010001', '1000100'],
						['0110111', '0001001', '1001000'],
						['0001011', '0010111', '1110100']
					];
					var parityValues={
						'AAAAAA': 0,
						'AABABB': 1,
						'AABBAB': 2,
						'AABBBA': 3,
						'ABAABB': 4,
						'ABBAAB': 5,
						'ABBBAA': 6,
						'ABABAB': 7,
						'ABABBA': 8,
						'ABBABA': 9
					};
					var digits=[], ok=1, parityPattern='';
					for (i=0;i<6;++i) { // check left side digits first
						for (j=0;j<10;++j) {
							if (eanDigits[j][0]==lbytes[i]) {
								digits[i]=j;
								parityPattern+='A';
								break;
							}
							if (eanDigits[j][1]==lbytes[i]) {
								digits[i]=j;
								parityPattern+='B';
								break;
							}
						}
						if (j==10) { // failed to identify a digit!
							ok=0;
						}
					}
					var parityNumber=parityValues[parityPattern];
					if (parityNumber===undefined) { // failed to find a number encoded in the parity bits
						continue;
					}
					for (i=0;i<6;++i) { // check right side digits first
						for (j=0;j<10;++j) {
							if (eanDigits[j][2]==rbytes[i]) {
								digits[i+6]=j;
								break;
							}
						}
						if (j==10) { // failed to identify a digit!
							ok=0;
						}
					}
					if (!ok) {
						break;
					}
					digits.unshift(parityNumber);
					// check to see if the checksum works against the digits
					var odd=0, even=0;
					for (i=12; i; i-=2) {
						odd+=digits[i];
					}
					for (i=11; i>0; i-=2) {
						even+=digits[i];
					}
					sum=odd+even*3;
					sum=10-(sum%10);
					if (digits[0]!=sum) { // checksum failed
						break;
					}
					result.digits=digits;
					result.success=1;
					result.value=result.digits.join('');
					return self.postMessage(result);
				}
				// }
			}
			// }
		}
	}
	// }
	self.postMessage(result);
});
