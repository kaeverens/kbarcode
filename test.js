$(function() {
	var imgs=[ // {
		[36,36,33,33,34,34,34,33,33,34,34,33,34,34,35,37,37,34,32,32,31,31,30,31,31,31,31,31,32,32,31,31,31,31,32,32,31,31,31,31,31,31,31,31,32,32,31,31,31,31,31,32,32,33,32,32,31,31,31,31,30,28,28,28,30,28,30,28,31,30,30,30,30,30,30,28,29,29,29,29,30,30,30,30,30,28,28,28,28,28,28,27,28,28,28,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,27,27,26,26,26,27,27,27,25,24,26,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,30,30,29,29,29,29,28,28,29,29,28,28,28,28,28,28,30,30,28,26,26,26,27,27,27,28,27,26,26,26,26,25,25,24,24,24,24,25,25,27,27,27,26,25,26,26,26,26,26,26,25,25,25,26,25,25,26,26,26,26,26,28,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,30,30,29,29,28,28,28,28,29,28,30,30,30,30,30,30,30,30,29,31,31,31,32,32,32,32,32,31,31,31,32,31,32,31,32,32,32,32,32,32,32,32,32,32,31,31,31,32,32,32,32,33,34,34,36,34,34,34,34,36,36,37,36,37,36,39,65,159,207,216,214,214,215,215,215,215,217,218,218,218,218,219,220,220,220,220,220,219,219,219,219,219,219,219,219,219,219,219,219,219,220,220,220,220,219,219,219,219,218,218,218,219,218,219,219,219,218,218,218,217,217,217,216,214,216,214,203,132,45,43,49,143,196,198,179,76,42,37,72,166,193,195,110,38,36,40,42,42,42,42,42,39,34,40,126,189,190,143,49,40,44,42,44,39,38,100,189,203,206,209,211,211,211,213,212,211,203,132,44,45,78,173,206,208,206,207,207,203,164,56,51,49,142,193,195,179,78,46,46,73,175,201,207,206,205,205,200,128,40,37,43,42,39,39,39,39,40,36,63,163,182,183,152,51,36,44,42,42,41,41,41,40,41,41,42,44,36,56,154,183,187,155,58,40,37,95,181,192,192,114,44,41,54,162,204,204,206,210,210,210,210,211,211,210,211,211,208,200,114,48,47,51,163,207,208,205,205,206,206,206,207,206,205,158,46,42,44,45,46,42,39,137,189,187,178,73,44,44,61,163,187,189,153,48,42,41,99,182,190,194,108,38,44,49,142,191,191,162,61,48,44,69,172,180,184,132,45,38,43,43,40,37,37,40,42,37,51,157,197,205,199,199,203,206,157,45,45,40,100,179,186,189,104,39,35,38,42,42,42,40,43,45,37,58,168,196,200,197,198,204,200,141,50,52,64,159,198,199,200,199,199,204,186,87,43,38,92,183,198,202,204,205,204,205,202,204,201,192,115,46,42,42,136,190,187,177,78,49,42,70,173,200,205,204,204,204,205,205,205,204,204,202,206,207,200,130,51,43,47,142,194,201,197,195,198,198,180,73,38,42,41,38,40,40,40,42,37,30,79,165,184,183,120,41,34,37,40,38,38,38,40,37,29,48,151,180,179,162,72,49,40,72,169,193,195,195,198,198,195,146,59,42,38,90,172,184,186,123,44,43,41,126,186,197,203,201,204,206,206,207,207,207,207,207,207,207,207,207,207,207,207,205,204,204,205,205,201,198,165,73,49,35,89,174,183,186,127,47,40,42,42,42,36,36,126,183,190,190,191,194,194,184,111,47,41,43,123,179,185,171,96,44,35,39,36,35,35,35,38,37,30,54,137,167,173,156,72,42,33,62,150,180,184,153,73,42,37,79,161,189,192,190,192,195,193,150,66,43,39,40,38,37,36,40,38,28,35,108,165,168,172,109,53,40,39,128,177,190,190,190,191,191,182,125,61,38,40,43,36,28,54,146,183,191,192,191,192,189,172,107,51,39,65,144,168,173,140,69,42,39,82,159,182,191,192,190,192,193,192,191,188,181,122,59,40,39,37,36,26,47,127,162,169,147,79,44,38,63,128,160,167,136,68,47,37,85,158,176,184,186,187,191,191,189,185,186,168,97,57,46,40,34,32,24,60,138,158,159,124,62,45,39,106,157,171,181,182,186,187,187,188,189,189,189,189,189,189,189,190,190,190,191,191,193,195,194,190,185,181,183,185,185,183,183,180,183,184,153,84,59,45,38,36,31,32,33,32,31,31,31,31,30,30,30,29,29,29,29,30,28,27,28,28,28,28,28,28,28,29,28,28,28,26,26,27,27,26,26,25,25,25,26,29,30,32,30,43,45,51,53,56,63,59,45,30,25,20,19,19,18,17,17,15,14,14,13,13,13,13,12,12,12,12,12,12,11,11,11,11,11,11,10,10,10,10,10,10,10,10,10,10,10,11,10,11,11,10,10,10,8,8,8,8,8,7,6,6,7,7,7,8,8,6,6,6,6,6,6,6,6,6,6,6,8,8,8],
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
				if (result.value) {
					alert(value);
				}
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
				if (result.middleMarker) {
					$('<div class="marker" style="left:'+result.middleMarker[0]+'px;width:'+(result.bitsize)+'px"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.middleMarker[1]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.middleMarker[2]+'px;width:'+(result.bitsize)+'px"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.middleMarker[3]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.middleMarker[4]+'px;width:'+(result.bitsize)+'px"/>').appendTo($preview);
				}
				if (result.rightMarker) {
					$('<div class="marker" style="left:'+result.rightMarker[0]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.rightMarker[1]+'px;width:'+(result.bitsize)+'px"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.rightMarker[2]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
				}
				if (result.lbytes) {
					var lbytes=result.lbytes;
					for (var i=0;i<lbytes.length;i++) {
						var bits=lbytes[i].split('');
						for (var j=0;j<bits.length;++j) {
							$('<div class="marker" style="left:'+(result.bcStart+result.bitsize*(i*7+j+3))+'px;width:'+(result.bitsize)+'px;background:'+(bits[j]=='1'?'black':'white')+'"/>').appendTo($preview);
						}
					}
				}
				if (result.rbytes) {
					var rbytes=result.rbytes;
					for (var i=0;i<rbytes.length;i++) {
						var bits=rbytes[i].split('');
						for (var j=0;j<bits.length;++j) {
							$('<div class="marker" style="left:'+(result.bcStart+result.bitsize*(i*7+j+8+6*7))+'px;width:'+(result.bitsize)+'px;background:'+(bits[j]=='1'?'black':'white')+'"/>').appendTo($preview);
						}
					}
				}
			}
			kbarcode.addEventListener('message', resultCallback);
			for (var i=0;i<imgs[cur].length;++i) {
				var p=imgs[cur][i];
				$('<div title="'+i+'" style="position:absolute;left:'+i+'px;top:0;height:100px;width:1px;background:rgb('+p+', '+p+', '+p+');"/>').appendTo($preview);
			}
			width=imgs[cur].length;
			kbarcode.postMessage({
				'cmd':'decode',
				'msg':imgs[cur]
			});
			return;
		}
		next();
	}).click();
});
