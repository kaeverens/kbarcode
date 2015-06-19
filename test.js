$(function() {
	var imgs=[ // {
		[35,33,38,42,40,40,36,36,31,27,28,29,31,35,42,38,34,32,28,29,29,32,33,33,33,33,34,35,32,32,33,36,33,32,30,32,34,34,32,38,48,46,44,69,69,46,39,48,44,33,29,27,27,29,29,29,28,28,26,23,27,28,34,30,29,29,29,29,29,29,28,29,30,32,30,30,31,29,29,29,29,29,27,26,25,25,26,26,27,27,27,27,26,26,26,28,28,28,27,28,30,33,32,29,26,26,26,28,26,26,26,24,22,22,25,25,25,26,25,31,29,33,33,41,33,24,24,26,25,26,27,27,28,29,29,29,27,25,28,29,29,29,29,33,33,32,27,24,23,22,22,23,26,28,28,28,28,29,29,28,28,28,28,28,29,29,29,28,27,26,26,27,29,30,30,27,31,33,32,31,30,30,27,27,28,28,28,27,26,26,28,29,30,29,29,28,28,28,27,27,27,27,27,28,28,29,31,31,29,28,28,27,27,28,29,33,31,28,27,26,26,26,26,28,27,24,24,25,27,27,25,25,25,24,24,24,24,24,24,23,22,22,22,22,23,23,23,24,23,24,23,23,23,23,24,24,25,26,26,26,26,25,25,26,27,31,36,38,37,37,37,37,43,38,36,93,176,217,225,227,227,229,230,231,232,233,233,233,233,233,233,233,233,233,233,233,233,233,233,233,232,233,233,233,233,233,233,233,233,233,233,233,233,233,232,232,232,232,232,233,233,233,233,233,233,233,233,233,233,233,233,232,232,232,232,232,232,232,230,230,229,229,227,229,224,214,160,55,41,41,86,180,206,205,201,130,35,37,34,96,184,195,195,163,57,32,31,33,32,29,29,29,30,32,32,27,39,122,198,201,204,127,27,29,34,35,34,36,36,43,135,209,223,223,223,225,227,227,227,225,227,223,219,197,87,42,46,89,188,214,222,221,222,221,221,214,186,73,38,35,87,183,206,207,195,97,32,37,36,133,209,211,214,217,216,221,222,206,97,26,36,39,33,29,30,30,30,30,27,25,53,158,194,194,194,108,21,28,29,27,30,30,30,30,29,28,28,27,26,27,23,28,109,190,196,196,159,51,34,34,55,168,199,199,201,121,32,38,34,143,211,218,221,221,226,225,225,225,225,225,225,225,221,220,220,219,141,39,41,34,112,212,213,220,222,224,225,223,222,220,220,215,213,127,34,31,28,31,34,33,28,77,185,197,196,187,76,34,34,38,147,203,201,206,135,35,38,36,87,194,200,201,179,63,35,33,34,151,203,200,193,83,34,37,32,125,202,201,201,147,31,30,31,31,28,28,29,29,26,27,22,46,173,209,212,216,218,216,218,216,129,31,33,27,90,195,197,195,161,42,26,27,30,29,29,29,27,29,30,29,26,151,214,216,217,220,218,214,214,155,46,43,29,140,212,215,220,218,218,222,220,195,78,35,35,69,195,215,219,220,222,222,221,221,221,220,215,214,141,38,36,25,96,200,203,204,161,50,42,32,75,196,213,218,219,223,225,224,224,223,223,222,221,221,219,219,225,135,34,50,34,122,207,212,215,215,216,216,209,178,55,29,27,26,26,25,24,24,24,24,15,31,159,192,193,197,90,24,24,27,25,24,24,24,26,24,21,16,112,200,193,202,139,40,33,24,98,196,209,218,221,221,221,211,180,70,35,32,49,169,197,199,194,86,34,35,29,168,209,216,222,220,222,222,223,225,225,226,226,226,226,226,226,226,226,226,226,225,224,222,221,219,215,215,211,186,89,43,30,77,177,199,200,165,64,33,29,27,28,24,21,57,173,207,210,213,211,209,208,190,99,37,35,37,156,195,199,198,101,35,40,36,30,28,26,25,25,25,23,23,131,194,201,199,118,45,37,24,127,196,199,199,133,53,33,29,133,203,212,221,217,217,217,213,142,62,41,34,25,21,20,20,23,23,17,21,130,184,185,191,116,59,42,38,156,210,213,212,210,209,206,209,143,56,41,37,29,29,24,48,167,202,209,213,214,217,214,185,106,56,36,93,181,191,198,140,66,43,26,135,194,205,214,216,219,220,218,217,216,211,177,93,55,42,30,25,18,18,136,187,195,186,101,58,39,70,163,192,200,143,82,52,38,146,199,207,211,213,217,217,215,215,214,207,145,81,49,41,33,31,16,78,168,187,183,114,65,54,83,177,197,206,210,215,219,218,219,221,221,221,221,221,221,221,220,220,220,220,220,220,220,220,219,218,215,215,214,214,215,217,213,204,144,89,61,47,32,29,21,20,19,18,17,17,15,15,15,16,17,18,18,18,18,18,18,18,19,19,20,20,20,20,20,20,21,21,21,21,21,21,21,20,20,19,17,15,15,13,13,13,13,12,11,9,6,5,4,4,4,4,4,4,3,2,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
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
					$('<div class="marker" style="left:'+result.middleMarker[0]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.middleMarker[1]+'px;width:'+(result.bitsize)+'px"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.middleMarker[2]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.middleMarker[3]+'px;width:'+(result.bitsize)+'px"/>').appendTo($preview);
					$('<div class="marker" style="left:'+result.middleMarker[4]+'px;width:'+(result.bitsize)+'px;background:blue"/>').appendTo($preview);
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
