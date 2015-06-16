$(function() {
	var imgs=[ // {
		[24,25,26,27,27,27,27,26,27,27,27,27,26,26,26,26,27,27,27,28,28,29,29,29,30,30,31,32,32,33,34,33,35,37,41,49,87,156,203,206,184,174,165,161,155,147,144,147,145,137,130,127,127,128,125,122,121,123,124,125,123,120,116,114,117,117,118,119,120,118,113,110,107,102,101,103,104,104,106,111,120,125,142,183,229,246,242,246,247,247,247,248,247,248,248,248,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,241,247,242,244,242,242,239,206,155,184,205,169,160,211,237,236,235,223,182,118,99,158,201,179,146,194,229,229,193,127,93,110,182,184,136,96,96,177,223,237,237,237,238,228,189,145,192,196,161,161,218,232,238,235,210,157,157,196,174,114,85,129,204,230,236,232,220,167,152,194,182,129,84,106,178,187,147,166,210,230,216,158,97,74,77,89,170,184,156,152,190,175,140,172,185,145,92,73,73,94,173,217,224,192,147,161,184,158,144,179,179,148,177,216,230,234,234,233,220,182,124,76,71,79,147,203,225,212,167,159,187,173,146,176,186,156,158,201,222,233,233,232,227,196,144,89,87,159,168,149,101,77,142,198,219,203,153,104,78,148,196,222,204,153,107,76,141,168,153,152,179,172,154,175,204,224,232,234,235,235,235,235,235,235,235,235,235,235,235,235,235,234,235,235,235,235,234,234,234,234,233,234,233,233,233,232,231,230,231,216,178,128,83,59,52,52,49,47,44,42,43,43,42,40,39,39,39,38,39,38,38,38,38,37,35,34,32,31,30,30,33,32,31,30,30,30,30,31,28,28,29,30,32,33,34,34,28,28,28,28,28,28,28,28,28,28,28,27,27,26,26,26,28,28,28,27,27,26,26,26,25,25,25,25,25,25,25,25,23,23,23,24,24,25,25,25,26,26,26,26,26,26,26,26,26,27,27,27,27,26,25,24,22,22,22,22,22,22,22,22,21,21,21,21,21,21,21,21,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,19,19,18,17,17,16,15,15],
		'img3.jpg',
		[3,3,3,3,3,4,4,4,3,3,3,3,3,3,3,3,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,7,6,7,7,7,7,10,8,11,15,21,48,88,98,103,109,113,112,108,105,104,107,105,105,103,104,103,103,104,104,94,91,95,99,107,128,152,164,198,225,225,218,217,219,220,210,181,145,126,122,120,108,96,95,95,95,95,93,91,88,87,85,83,80,78,76,75,73,73,73,72,70,70,72,72,70,69,68,68,68,68,68,68,68,69,62,63,64,65,66,66,64,65,62,62,62,62,62,62,63,63,60,60,59,59,59,58,57,58,62,62,45,33,40,43,38,40,39,39,39,40,40,41,41,41,41,41,41,42,42,43,43,43,44,46,47,47,48,50,55,58,84,212,229,223,237,226,234,231,232,231,231,232,232,233,233,233,233,233,233,234,234,233,232,230,193,113,199,109,192,230,226,177,76,96,186,116,186,215,144,71,98,181,76,77,182,229,230,228,197,112,190,118,182,233,226,187,116,185,98,72,174,230,229,195,114,190,98,71,154,158,132,222,199,81,64,63,159,160,129,183,108,190,103,61,64,133,220,199,107,185,122,164,158,140,225,229,230,225,136,71,58,117,216,215,130,171,153,144,185,121,214,231,234,228,171,81,95,181,120,71,144,218,187,90,85,180,223,164,73,106,178,121,185,152,167,223,233,235,235,237,237,237,236,236,236,236,235,235,235,236,236,236,235,237,235,236,230,239,215,128,60,54,48,45,46,46,44,42,40,39,41,39,38,38,37,36,35,35,35,34,35,34,34,34,34,34,34,33,33,32,32,32,33,33,33,32,32,31,31,31,29,29,29,29,29,29,29,29,28,29,29,30,30,29,29,28,28,28,28,29,29,30,30,30,30,30,30,29,29,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,28,28,27,27,27,27,27,27,28,28,29,29,29,28,28,28,28,28,28,28,28,27,27,27,27,27,27,27,27,27,27,27,26,26,25,25,25,24,25,24,25,24,25,24,25,22,23,22,23,22,23,22,23],
		'img2.png',
		'img1.png',
	]; // }
	$('button').click(function() {
		$('button').remove();
		var cur=-1;
		function next() {
			cur++;
			var $preview=$('#preview').empty(), width;
			function resultCallback(result) {
				console.log(result);
				if (result.left) {
					$('<div style="position:absolute;top:0;left:'+result.left+'px;width:'+(result.bitsize*result.quietSize)+'px;height:1px;background:red"/>').appendTo($preview);
				}
				if (result.right) {
					$('<div style="position:absolute;top:0;left:'+result.right+'px;width:'+(result.bitsize*result.quietSize)+'px;height:1px;background:red"/>').appendTo($preview);
				}
				if (result.leftMarker) {
					$('<div style="position:absolute;top:0;left:'+result.leftMarker[0]+'px;width:'+(result.bitsize)+'px;height:1px;background:blue"/>').appendTo($preview);
					$('<div style="position:absolute;top:0;left:'+result.leftMarker[1]+'px;width:'+(result.bitsize)+'px;height:1px;background:red"/>').appendTo($preview);
					$('<div style="position:absolute;top:0;left:'+result.leftMarker[2]+'px;width:'+(result.bitsize)+'px;height:1px;background:blue"/>').appendTo($preview);
				}
				if (result.middleMarker) {
					$('<div style="position:absolute;top:0;left:'+result.middleMarker[0]+'px;width:'+(result.bitsize)+'px;height:1px;background:blue"/>').appendTo($preview);
					$('<div style="position:absolute;top:0;left:'+result.middleMarker[1]+'px;width:'+(result.bitsize)+'px;height:1px;background:red"/>').appendTo($preview);
					$('<div style="position:absolute;top:0;left:'+result.middleMarker[2]+'px;width:'+(result.bitsize)+'px;height:1px;background:blue"/>').appendTo($preview);
					$('<div style="position:absolute;top:0;left:'+result.middleMarker[3]+'px;width:'+(result.bitsize)+'px;height:1px;background:red"/>').appendTo($preview);
					$('<div style="position:absolute;top:0;left:'+result.middleMarker[4]+'px;width:'+(result.bitsize)+'px;height:1px;background:blue"/>').appendTo($preview);
				}
				if (result.rightMarker) {
					$('<div style="position:absolute;top:0;left:'+result.rightMarker[0]+'px;width:'+(result.bitsize)+'px;height:1px;background:blue"/>').appendTo($preview);
					$('<div style="position:absolute;top:0;left:'+result.rightMarker[1]+'px;width:'+(result.bitsize)+'px;height:1px;background:red"/>').appendTo($preview);
					$('<div style="position:absolute;top:0;left:'+result.rightMarker[2]+'px;width:'+(result.bitsize)+'px;height:1px;background:blue"/>').appendTo($preview);
				}
			}
			if (typeof imgs[cur] !== 'string') {
				for (var i=0;i<imgs[cur].length;++i) {
					var p=imgs[cur][i];
					$('<div style="position:absolute;left:'+i+'px;top:0;height:100px;width:1px;background:rgb('+p+', '+p+', '+p+');"/>').appendTo($preview);
				}
				width=imgs[cur].length;
				var kbarcode=new KBarcode(imgs[cur], resultCallback);
				kbarcode.check();
				return;
			}
			$('<img src="img/'+imgs[cur]+'"/>')
				.load(function() {
					var $this=$(this);
					width=$this[0].naturalWidth;
					var kbarcode=new KBarcode($this[0], resultCallback);
					kbarcode.check();
					console.log(kbarcode);
				})
				.appendTo($('#preview').empty());
		}
		next();
	});
});
