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
const fs=require("fs");

fs.readFile("nodeText.text",function(err,data){
	if(err){
	  return console.error(err);
	}
	console.log(data.toString());
});

console.log("程序执行结束！");
