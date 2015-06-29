$(function() {
	var imgs=[ // {
		[43,43,42,42,42,42,42,42,42,42,43,43,43,43,43,43,43,43,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,41,41,41,41,41,41,41,41,41,41,41,41,41,41,42,41,41,41,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,41,41,41,41,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,39,39,39,39,39,39,39,40,39,39,39,39,38,38,38,38,38,39,39,39,40,40,40,39,39,39,39,39,39,39,39,40,40,40,40,40,40,40,40,40,39,39,39,39,39,39,39,39,39,40,40,40,40,40,40,40,40,40,40,40,40,40,40,39,40,40,40,40,39,39,39,39,39,39,38,38,38,38,38,38,38,39,39,39,39,39,39,39,39,39,39,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,39,39,39,39,39,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,41,41,41,41,41,42,42,42,42,42,43,43,43,43,43,42,42,42,42,42,42,43,43,43,43,43,44,44,44,44,44,45,45,45,45,45,46,46,46,46,46,47,47,47,47,48,48,48,48,49,49,49,49,50,50,50,51,51,51,52,52,52,53,53,53,53,54,54,54,55,55,56,56,57,57,58,58,59,59,59,60,61,61,62,63,63,64,65,65,65,66,66,67,68,69,70,71,71,73,74,79,115,166,191,200,202,204,204,204,205,206,206,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,206,206,206,206,206,206,206,205,205,205,205,203,198,184,145,93,97,143,178,181,156,105,90,114,162,175,152,105,83,81,80,79,80,80,81,88,121,168,176,141,99,86,85,85,85,98,159,189,196,198,200,200,200,198,194,175,123,95,113,162,189,196,196,195,186,146,98,96,135,174,177,147,100,91,116,171,189,195,195,191,173,127,85,81,80,79,79,78,78,84,107,163,174,157,107,83,79,79,79,79,78,78,78,78,78,85,116,167,175,155,108,88,104,156,180,171,124,95,100,147,186,195,199,201,201,201,201,202,201,199,193,172,120,91,104,150,186,196,198,199,200,199,197,191,168,101,84,82,82,82,98,149,178,175,132,94,90,123,169,179,155,101,89,108,154,174,170,121,88,89,135,170,171,137,90,85,120,165,176,156,111,85,80,80,80,80,81,82,91,131,179,191,193,193,188,167,115,90,102,155,174,168,126,89,82,82,82,82,82,83,84,106,161,187,193,194,193,182,142,96,95,155,183,193,193,194,190,172,117,95,115,163,186,195,198,198,198,197,196,189,159,113,91,104,161,176,171,128,96,97,138,181,192,196,198,198,199,199,199,199,196,193,182,142,99,92,130,175,189,192,192,189,173,127,87,81,81,80,79,79,80,81,110,155,171,159,118,87,81,80,79,79,79,80,85,112,161,173,158,116,94,99,141,176,187,189,189,181,154,113,93,99,152,173,168,131,97,96,131,174,191,196,198,198,198,199,200,201,201,201,201,201,201,200,199,199,199,198,196,193,181,150,101,91,124,159,169,155,116,89,82,82,82,89,133,173,187,189,189,186,167,124,96,97,131,166,167,142,103,84,79,78,77,77,77,77,85,123,161,170,150,105,89,104,146,169,164,133,92,89,126,166,182,186,187,185,171,125,93,80,78,78,77,78,78,80,107,149,166,158,120,91,94,136,169,180,183,183,181,165,125,94,81,80,79,82,134,169,182,184,184,179,163,121,88,97,138,161,159,128,93,88,129,164,179,186,187,188,188,187,180,163,124,91,79,77,77,81,128,157,159,133,97,85,105,145,157,143,106,87,97,146,174,181,183,184,184,184,182,174,132,96,82,77,76,78,106,154,158,135,99,86,105,150,172,182,185,186,186,187,188,189,189,189,189,189,189,189,189,189,189,189,189,186,185,184,184,183,183,179,167,136,100,79,70,68,66,65,64,64,62,61,60,60,60,60,59,59,59,59,58,58,58,58,57,57,57,57,56,56,55,55,54,54,53,53,53,52,52,51,50,50,49,48,47,46,45,45,44,43,43,42,41,41,40,39,39,38,38,38,38,38,38,37,37,37,37,37,37,37,37,36,36,36,37,37,37,38,38,38,38,39,39,38,37,37,37,36,35,34,33,33,32,32,32,32,32,31,31,31,31,31,31,31,31,31,31,31,32,32,32,31,31,31,31,31,30,30,29,29,29,29,29,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,28,28,28],
		[194,194,194,194,194,194,194,193,194,194,194,194,194,193,193,193,193,192,192,192,193,193,193,193,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,195,195,195,195,195,194,194,194,194,194,194,194,194,194,194,194,195,195,195,195,195,194,194,194,194,194,194,194,194,194,194,193,193,193,194,193,193,193,193,193,193,193,193,193,193,193,193,193,193,192,192,192,192,192,192,192,192,192,192,191,191,191,191,191,191,191,191,190,190,190,190,190,190,190,190,190,189,189,189,189,189,189,189,189,189,189,189,189,188,188,188,188,188,188,188,189,189,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,186,186,186,186,186,186,187,187,187,187,187,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,185,185,185,185,185,185,185,185,185,185,185,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,183,183,183,183,183,183,183,183,183,182,182,182,182,182,182,182,182,182,182,182,182,182,182,182,182,181,181,182,182,182,181,181,181,181,181,181,181,181,181,181,181,180,180,180,180,180,180,180,180,180,180,180,180,180,180,180,179,179,179,179,179,178,178,178,178,177,177,177,177,177,177,177,177,177,177,177,177,176,176,176,176,175,174,174,174,174,174,173,173,173,173,173,173,172,172,170,169,167,165,165,162,159,159,101,54,60,66,120,140,145,146,103,56,55,53,97,142,143,144,117,60,58,56,73,138,154,152,151,152,152,152,152,152,152,124,72,53,58,58,108,140,137,130,85,52,54,55,105,140,133,137,113,52,50,52,52,51,50,50,52,51,56,120,145,144,143,145,147,145,141,139,144,139,108,47,48,52,51,51,51,50,48,48,73,127,129,126,70,50,53,50,60,125,131,131,117,60,47,49,48,49,49,49,49,51,50,49,96,129,127,126,71,48,54,50,71,131,142,139,145,146,145,144,145,145,148,111,44,49,51,50,50,51,53,54,52,65,127,137,142,143,142,144,146,144,141,142,87,47,56,52,66,128,128,130,108,51,52,52,65,118,128,131,137,106,50,53,50,64,114,124,123,122,62,48,55,55,53,50,48,52,53,51,55,122,140,139,142,140,142,142,142,142,140,135,78,45,52,53,55,55,55,55,54,50,87,138,135,142,145,143,142,142,141,140,143,87,50,63,58,79,130,131,133,123,62,58,57,60,109,128,128,131,106,53,62,62,60,112,126,126,99,57,58,58,59,59,59,60,60,60,59,63,122,134,139,137,140,139,140,138,136,134,119,68,62,63,63,61,61,61,62,60,69,122,128,126,131,105,62,69,63,82,129,136,138,139,139,140,140,140,139,137,126,69,66,69,67,67,67,68,69,65,61,108,127,125,122,105,66,70,66,68,101,134,138,139,139,140,140,139,140,136,135,110,67,67,66,89,123,123,129,118,72,67,64,63,64,66,66,67,66,69,78,120,132,136,136,138,140,138,138,137,135,121,73,69,68,66,106,124,125,105,64,67,68,68,68,68,66,67,66,67,89,117,122,124,112,72,67,72,69,86,126,132,137,138,137,136,137,137,133,127,92,60,66,67,67,67,68,68,69,66,65,100,121,119,119,83,65,68,65,75,108,123,125,127,113,74,68,66,69,119,132,135,137,139,140,138,137,136,134,129,85,68,70,70,71,71,70,71,72,71,75,113,123,125,129,106,70,73,70,78,125,140,142,147,150,150,153,154,155,156,156,157,157,157,157,157,157,158,158,158,158,158,158,159,159,160,160,160,160,160,160,160,160,160,160,160,160,160,161,161,161,161,161,161,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,161,161,161,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,161,161,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,163,163,163,163,162,162,162,162,162,162,162,163,163,163,162,162,162,162,162,162,162,162,162,162,162,162,162,161,161,161,161,162,162,162,162,162,162,161,161,161,161,161,161,161,161,161,161,161,161,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,161,161,161,161,161,161,161,161,161,162,161,162,162,162,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,162,162,162,161,161,161,162,161,161,161,161,161,161,161,161,161,161,162,162,161,161],
	]; // }
	$('button').click(function() {
		var kbarcode=new Worker('kbarcode.js');
		$('button').remove();
		var cur=-1;
		function next() {
			cur++;
			var $preview=$('#preview').css({'position':'relative', 'padding-top':'10px'}).empty(), width;
			function resultCallback(result) {
				result=result.data;
				console.log(result);
				if (result.left) {
					$('<div class="marker" style="left:'+result.left+'px;width:'+(result.bitsize*result.quietSize)+'px"/>').appendTo($preview);
				}
				if (result.right) {
					$('<div class="marker" style="left:'+result.right+'px;width:'+(result.bitsize*result.quietSize)+'px;background:red"/>').appendTo($preview);
				}
				if (result.leftMarker) {
					$('<div class="marker" style="left:'+result.leftMarker[0]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.leftMarker[1]+'px;width:'+(result.bitsize)+'px"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.leftMarker[2]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
				}
				if (result.rightMarker) {
					$('<div class="marker" style="left:'+result.rightMarker[0]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.rightMarker[1]+'px;width:'+(result.bitsize)+'px"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.rightMarker[2]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
				}
				if (result.type=='ean13') {
					if (result.middleMarker) {
						$('<div class="marker" style="left:'+result.middleMarker[0]+'px;width:'+(result.bitsize)+'px"/>').appendTo($preview);
						$('<div class="marker" style="left:'+result.middleMarker[1]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
						$('<div class="marker" style="left:'+result.middleMarker[2]+'px;width:'+(result.bitsize)+'px"/>').appendTo($preview);
						$('<div class="marker" style="left:'+result.middleMarker[3]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
						$('<div class="marker" style="left:'+result.middleMarker[4]+'px;width:'+(result.bitsize)+'px"/>').appendTo($preview);
					}
					if (result.lbytes) {
						var lbytes=result.lbytes, lBitSize=(result.lBytesRBound-result.lBytesLBound+1)/42;
						for (var i=0;i<lbytes.length;i++) {
							var bits=lbytes[i].split('');
							for (var j=0;j<bits.length;++j) {
								$('<div class="marker" style="left:'+(result.lBytesLBound+lBitSize*(i*7+j))+'px;width:'+(lBitSize)+'px;background:'+(bits[j]=='1'?'black':'white')+'"/>').appendTo($preview);
							}
						}
					}
					if (result.rbytes) {
						var rbytes=result.rbytes, rBitSize=(result.rBytesRBound-result.rBytesLBound+1)/42;;
						for (var i=0;i<rbytes.length;i++) {
							var bits=rbytes[i].split('');
							for (var j=0;j<bits.length;++j) {
								$('<div class="marker" style="left:'+(result.rBytesLBound+rBitSize*(i*7+j))+'px;width:'+rBitSize+'px;background:'+(bits[j]=='1'?'black':'white')+'"/>').appendTo($preview);
							}
						}
					}
				}
				if (result.type=='itf') {
					var bitsize=result.bitsize;
					for (var i=0;i<result.numbits;++i) {
						$('<div class="marker" style="left:'+(result.lBytesLBound+bitsize*i)+'px;width:'+bitsize+'px;background:'+(result.bits[i]==1?'black':'white')+'"/>').appendTo($preview);
					}
				}
				if (result.value) {
					alert(result.type+"\n"+result.value);
				}
			}
			kbarcode.addEventListener('message', resultCallback);
			for (var i=0;i<imgs[cur].length;++i) {
				var p=imgs[cur][i];
				$('<div title="'+i+', '+p+'" style="position:absolute;left:'+i+'px;top:0;height:100px;width:1px;background:rgb('+p+', '+p+', '+p+');"/>').appendTo($preview);
			}
			width=imgs[cur].length;
			kbarcode.postMessage({
				'cmd':'decode',
				'msg':imgs[cur]
			});
		}
		next();
	}).click();
});
