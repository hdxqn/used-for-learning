
(function($){
var Carousel=function(poster){
	//保存单个旋转木马对象
	this.poster=poster;
	this.posterItemMain=poster.find("ul.poster-list");
	this.nextBtn=poster.find("div.poster-next-btn");
	this.prevBtn=poster.find("div.poster-prev-btn");
	this.posterItems=this.poster.find("li.poster-item");
	this.posterFirstItem=this.posterItems.eq(0);
	//默认配置参数
	this.setting={
		"width":1000, //幻灯片的宽度
		"height":500, //幻灯片的高度
		"posterWidth":800, //幻灯片第一帧的宽度
		"posterHeight":500, //幻灯片第一帧的高度
		"scale":0.9, //记录显示比例关系
		"speed":500,
		"verticalAlign":"middle"
	}
	$.extend(this.setting,this.getSetting());
	//设置配置参数值
	this.setSettingValue();
	this.setPosterPos();
};
Carousel.prototype={
	setPosterPos:function(){
		var self=this; 
		var sliceItems=this.posterItems.slice(1),
		 sliceSize=sliceItems.size()/2,
		rightSlice=sliceItems.slice(0,sliceSize),
		level=Math.floor(this.posterItems.size()/2);
		
		var rw=this.setting.posterWidth,
			rh=this.setting.posterHeight,
			gap=((this.setting.width-this.setting.posterWidth)/2)/level;
			var firstLeft=(this.setting.width-this.setting.posterWidth)/2;
			var fixOffsetLeft=firstLeft+rw;

		rightSlice.each(function(index){
			level--;
			rw=rw*self.setting.scale;
			rh=rh*self.setting.scale;
			var j=index;
			$(this).css({
				zIndex:level,
				width:rw,
				height:rh,
				opacity:1/(++j),
				left:fixOffsetLeft+(++index)*gap-rw,
				top:(self.setting.height-rh)/2
			})
		});
		//设置右边帧的位置关系和宽高
	},
	//设置剩余帧的位置关系
setSettingValue:function(){
	this.poster.css({
		width:this.setting.width,
		height:this.setting.height
	});
	this.posterItemMain.css({
		width:this.setting.width,
		height:this.setting.height
	});
	var w=(this.setting.width-this.setting.posterWidth)/2;
	this.nextBtn.css({
		width:w,
		height:this.setting.height,
		zIndex:Math.ceil(this.posterItems.size()/2)
	});
	this.prevBtn.css({
		width:w,
		height:this.setting.height,
		zIndex:Math.ceil(this.posterItems.size()/2)
	});
	this.posterFirstItem.css({
		width:this.setting.posterWidth,
		height:this.setting.posterHeight,
		left:w,
		zIndex:Math.floor(this.posterItems.size()/2)
	});
},
//设置基本的参数值去控制宽高等等
getSetting:function(){
	var setting=this.poster.attr("date-setting");
	if(setting&&setting!=""){
		return $.parseJSON(setting);
	}else{
		return {};
}
	}
	
//获取人工配置参数
};
Carousel.init=function(posters){
var _this_=this;
//使用一个变量来保存this，即Carousel 
posters.each(function(){
	new _this_($(this));
});
//传入一个数组，内容是class为J_poster的所有元素
}
//使用以上方式实现一个插件
window["Carousel"]=Carousel;
//因为是闭包所以无法被访问，所以需要使用window全局注册
})(jQuery);