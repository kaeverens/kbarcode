$(function() {
	var imgs=[ // {
		'img3.jpg',
		'img2.png',
		'img1.png',
	]; // }
	$('button').click(function() {
		$('button').remove();
		var cur=-1;
		function next() {
			cur++;
			$('<img src="img/'+imgs[cur]+'"/>')
				.load(function() {
					var $this=$(this);
					var kbarcode=new KBarcode($this[0]);
					kbarcode.check();
					console.log(kbarcode);
				})
				.appendTo($('#preview').empty());
		}
		next();
	});
});
