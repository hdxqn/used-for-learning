define(['jquery'],function ($) {
	return{
		start:function(){
			console.log("我是开始方法");
		},
		going:function(){
			console.log("我是进行方法");
		},
		end:function(){
			console.log("我是结束方法");
		},
		receive:function(str1,str2){
			console.log("你给我了"+str1+"和"+str2+"!");
		},
	};
});

