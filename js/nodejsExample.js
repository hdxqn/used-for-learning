//const http = require('http');

//const hostname = '127.0.0.1';
//const port = 3000;

//const server = http.createServer((req, res) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World\n');
//})

//server.listen(port, hostname, () => {
  //console.log("Server running at http://${hostname}:${port}/");
//});

//es6的对象合并方法assign,可以很方便的把字符转变为类数组对象
	
	//箭头函数的this指向定义时的所在对象，此时即是global对象，所以会报错；
  //String.prototype.deleteBlank= (this)=> {return this.replace(/\s/g,"");};
  'use strict'
  String.prototype.toArrObj=toArrObj;
  String.prototype.toArrself=toArrself;
  let str="hello world my friends";
  //assign函数首个参数不能为undefined 和null
  console.log(`STR became ${str}`);
  printCharacter(str);
  function printCharacter(str){
  	//for(let i in obj){
	//	console.log(obj[i]);
	//}
	// for(let i=0,l=obj.length;i<l;i++){
	// 	console.log(obj[i]);
	// }
  console.log(str.toArrObj());
  console.log(str.toArrself());
  }
  //function deleteBlank(){
    //去除所有字符串的空白字符
  //	return this.replace(/\s/g,"");
  //}
  function toArrObj(){
  //将字符串变为一个类数组对象
	let self=this,
	    l=0,
	    obj={};
	self=self.replace(/\s/g,"");
	obj=Object.assign({},self);
	for(let i in obj){l+=1;}
	obj.length=l;
	return obj;
  }
  function toArrself(){
  //将字符串变为一个数组
  let self=this.toArrObj(),
      arr=[];
  for(let i=0,l=self.length;i<l;i++){
    arr.push(self[i]);
  }
  return arr;
  }
//const fs=require("fs");

//fs.readFile("nodeText.text",(err,data)=>{
//	if(err){
//	  return console.error(err);
//	}
//	console.log(data.toString());
//});

//console.log("程序执行结束！");
