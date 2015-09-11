requirejs.config({
	paths:{
		jquery:'jquery-2.1.3.min',
		m1:'mymodule'
	}
	//定义模块别名
});
requirejs(['jquery','m1'],function ($,m1){
	//引入模块，第一个参数为数组，传入你需要引入的任意多模块，第二个参数是回调函数
	m1.receive("money","beauty");
	m1.end();
	m1.change();

});