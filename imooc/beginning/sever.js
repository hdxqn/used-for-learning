var http = require('http');
var sever=http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Node.js\n');
});
sever.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
//git bash中 ctrl+c可以停止之前的服务