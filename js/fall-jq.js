$(window).on('load',function(){
	waterfall();
	var dateint={'date':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	$(window).on('scroll',function(){
		if(checkscrollslide){
			$.each(dateint.date,function(key,value){
				var obox=$('<div>').addClass('box').appendTo($('#main'));
				var opic=$('<div>').addClass('pic').appendTo($(obox));
				$('<img>').attr('src','img/'+$(value).attr('src')).appendTo($(opic));
			})
		}
		waterfall();
	})
})
function waterfall(){
	var $boxs=$('#main>div');
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');
	var harr=[];
	$boxs.each(function(index,value){
		var h=$boxs.eq(index).outerHeight();
		if(index<cols){
			harr[index]=h;
		}else{
			var minh=Math.min.apply(null,harr);
			var minhindex=$.inArray(minh,harr);
			$(value).css({
				'position':'absolute',
				'top':minh+'px',
				'left':minhindex*w+'px'
			})
			harr[minhindex]+=$boxs.eq(index).outerHeight();
		}
	})
	
}
function checkscrollslide(){
	var $lastbox=$('#main>div').last();
	var lastboxdis=$lastbox.offset().top+Math.floor($lastbox.outerHeight()/2);
	var scrolltop=$(window).scrollTop();
	var documenth=$(window).height();
	return(lastboxdis<scrolltop+documenth)?true:false;
}