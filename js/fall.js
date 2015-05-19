window.onload=function(){
	waterfall('main','box');
	var dateint={'date':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	window.onscroll=function(){
		if (checkscrollslide) {
			//将数据块渲染到页面的尾部
			var oparent=document.getElementById('main');
			for (var i = 0; i <dateint.date.length; i++) {
				var obox=document.createElement('div');
				obox.className='box';
				oparent.appendChild(obox);
				var opic=document.createElement('div');
				opic.className='pic';
				obox.appendChild(opic);
				var oimg=document.createElement('img');
				oimg.src='img/'+dateint.date[i].src;
				opic.appendChild(oimg);
			}
			waterfall('main','box');
		}
		
	}
}
function waterfall(parent,box){
	//取出父元素main下所有class为box的元素
	var oparent = document.getElementById(parent);
	var oboxs=getbyclass(oparent,box);
	//计算整个页面显示的列数(页面宽度/box的宽度)
	var oboxw=oboxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oboxw);
	//为了让列数随着窗口大小变化而变化，设置main的宽度
	oparent.style.cssText='width:'+oboxw*cols+'px;margin:0 auto;';
	//声明一个数组用来保存每一列元素的高度
	var harr=new Array();
	for (var i = 0; i < oboxs.length; i++) {
		if (i<cols) {
			harr.push(oboxs[i].offsetHeight);
				}else{
					//已经到了第二行，求出第一行中最小高度
					var minh=Math.min.apply(null,harr);
					//获取最小高度元素在数组中的索引
					var index=getminhindex(harr,minh);
					//设置第二行元素的位置
					oboxs[i].style.position='absolute';
					oboxs[i].style.top=minh+'px';
					//oboxs[i].style.left=oboxw*index+'px';两种方法都可以
					oboxs[i].style.left=oboxs[index].offsetLeft+'px';
					harr[index]+=oboxs[i].offsetHeight;
				}
		}
		console.log(minh);
}
//根据class获取元素
function getbyclass(parent,classname){
	var boxarr=new Array();//用来存储class为box的所有元素
	oelements=parent.getElementsByTagName('*');//取出父元素main下所有子元素
	for (var i = 0; i < oelements.length; i++) {
		if (oelements[i].className==classname) {
			boxarr.push(oelements[i]);
		}
	}
	
	return boxarr;
	}
function getminhindex(arr,val){
	for (var i in arr) {
		if (arr[i]==val) {
			return i;		}
	}
}
//检测是否具备加载数据块的条件
function checkscrollslide(){
	var oparent=document.getElementById('main');
	var oboxs=getbyclass(oparent,'box');
	var lastboxh=oboxs[oboxs.length-1].offsetTop+Math.floor(oboxs[oboxs.length-1].offsetHeight/2);
	var scrolltop=document.body.scrollTop||document.documentElement.scrollTop;
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	return (lastboxh<scrolltop+height)?true:false;
	}