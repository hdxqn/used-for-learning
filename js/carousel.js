
(function($){
var Carousel=function(poster){
	//保存单个旋转木马对象
	var self=this;
	this.poster=poster;
	this.posterItemMain=poster.find("ul.poster-list");
	this.nextBtn=poster.find("div.poster-next-btn");
	this.prevBtn=poster.find("div.poster-prev-btn");
	this.posterItems=this.poster.find("li.poster-item");
	if(this.posterItems.size()%2==0){
				this.posterItemMain.append(this.posterItems.eq(0).clone());
				this.posterItems = this.posterItemMain.children();
			};
	this.posterFirstItem=this.posterItems.first();
	this.posterLastItem=this.posterItems.last();
	this.rotateFlag=true;
	//默认配置参数
	this.setting={
		"width":1000, //幻灯片的宽度
		"height":500, //幻灯片的高度
		"posterWidth":800, //幻灯片第一帧的宽度
		"posterHeight":500, //幻灯片第一帧的高度
		"scale":0.9, //记录显示比例关系
		"speed":500, //设置动画实现的速度
		"autoPlay":false, //设置是否自动播放
		"delay":5000, //设置自动播放时，幻灯片的延时
		"verticalAlign":"middle"//排列对齐方式 top bottom
	}
	$.extend(this.setting,this.getSetting());
	//设置配置参数值
	this.setSettingValue();
	this.setPosterPos();
	this.nextBtn.click(function(){
		if(self.rotateFlag){
			self.rotateFlag=false;
			self.carouselRotate("left");
		}
	});
	this.prevBtn.click(function(){
		if(self.rotateFlag){
			self.rotateFlag=false;
			self.carouselRotate("right");
		}
	});
	if(this.setting.autoPlay){
		this.autoPlay();
		this.poster.hover(function(){
			window.clearInterval(self.timer);
		},
		function(){
			self.autoPlay();
		});
	}
};
Carousel.prototype={
	autoPlay:function(){
		var self=this;
		this.timer=window.setInterval(function(){
			self.nextBtn.click();
		},this.setting.delay);
	},
	//自动播放函数
	carouselRotate:function(dir){
		var _this_=this;
		var zIndexArr=[];
		if(dir==="left"){
			this.posterItems.each(function(){
				var self=$(this),
				prev=self.prev().get(0)?self.prev():_this_.posterLastItem,
				width=prev.width(),
				height=prev.height(),
				zIndex=prev.css("zIndex"),
				opacity=prev.css("opacity"),
				left=prev.css("left"),
				top=prev.css("top");
				zIndexArr.push(zIndex);

				self.animate({
					width:width,
					height:height,
					// zIndex:zIndex,
					opacity:opacity,
					left:left,
					top:top
				},_this_.setting.speed,function(){
					_this_.rotateFlag=true;
				});

			});
			this.posterItems.each(function(index){
				$(this).css("zIndex",zIndexArr[index]);
			});
		}else if(dir=="right"){
			this.posterItems.each(function(){
				var self=$(this),
				next=self.next().get(0)?self.next():_this_.posterFirstItem,
				width=next.width(),
				height=next.height(),
				zIndex=next.css("zIndex"),
				opacity=next.css("opacity"),
				left=next.css("left"),
				top=next.css("top");
				zIndexArr.push(zIndex);
				self.animate({
					width:width,
					height:height,
					// zIndex:zIndex,
					opacity:opacity,
					left:left,
					top:top
				},_this_.setting.speed,function(){
					_this_.rotateFlag=true;
				}
				);

			});
			this.posterItems.each(function(index){
				$(this).css("zIndex",zIndexArr[index]);
			});
			
		}
	},
	//左右摁键的功能实现
	setPosterPos:function(){
		var self=this; 
		var sliceItems=this.posterItems.slice(1),
		sliceSize=sliceItems.size()/2,
		rightSlice=sliceItems.slice(0,sliceSize),
		level=Math.floor(this.posterItems.size()/2),
		leftSlice=sliceItems.slice(sliceSize);
		
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
				top:self.setVertucalAlign(rh)
			})
		});
		//设置右边帧的位置关系和宽高
		var lw=rightSlice.last().width(),
			lh=rightSlice.last().height(),
			oloop=Math.floor(this.posterItems.size()/2);
		leftSlice.each(function(index){
			$(this).css({
				// zIndex:index,
				width:lw,
				height:lh,
				opacity:1/oloop,
				left:index*gap,
				top:self.setVertucalAlign(lh)
			})
			lw=lw/self.setting.scale;
			lh=lh/self.setting.scale;
			oloop--;
		});
		//设置左边帧的位置关系和宽高
	},
	//设置剩余帧的位置关系
setVertucalAlign:function(height){
	var verticalType=this.setting.verticalAlign,
		top=0;
		if(verticalType==="top"){
			top=0;
		}else if(verticalType==="middle"){
			top=(this.setting.height-height)/2;
		}else if(verticalType==="bottom"){
			top=this.setting.height-height;
		}else{
			top=(this.setting.height-height)/2;
		}
		return top;
},
//设置两侧幻灯片排列对齐方式
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