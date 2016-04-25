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

  String.prototype.deleteBlank=deleteBlank;	 
  var str="hello world my friends";
  console.log(Object.assign({},str.deleteBlank()));//首个参数不能为undefined 和null
  
  function deleteBlank(){
  	return this.replace(/\s/g,"");
  }
//const fs=require("fs");

//fs.readFile("nodeText.text",(err,data)=>{
//	if(err){
//	  return console.error(err);
//	}
//	console.log(data.toString());
//});

//console.log("程序执行结束！");
