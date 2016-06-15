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
  //console.log(str.toArrObj());
  //console.log(str.toArrself());
  var arr1=[1,2,3,4,5,5,5,6,6,7,7,7,8];
  var set1=Array.from(new Set(arr1));
  console.log(set1);
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


var arrE=[
{data:{
  weight:1
}},
{data:{
  weight:2
}},
{data:{
  weight:3
}},
{data:{
  stick:1,
  weight:4
}},
{data:{
  // weight:5
}},
{data:{
  weight:6
}},
{data:{
  weight:7
}},
{data:{
  // weight:8
}},
{data:{
  weight:9
}},{data:{
  weight:10
}},

{data:{
  weight:11
}},{data:{
  weight:12
}},

];
// console.log(dataSotr(arrE));
function dataSotr(arg,cur){
  //根据置顶和权重重新排序
  let arr=[].concat(arg),
      stickArr=[],
      stickArrNW=[],
      weightArr=[],
      weightArrNW=[],
      target=null,
      sl=0,
      wl=0;
      for(let i=0,l=arr.length;i<l;i++){
        if(+arr[i]["data"]["stick"]==1){
          if(arr[i]["data"]["weight"]== void 0){
            stickArrNW.push(arr[i]);
            continue;
          }
          stickArr.push(arr[i]);
          continue;
        }
        if(arr[i]["data"]["weight"]== void 0){
            weightArrNW.push(arr[i]);
            continue;
          }
        weightArr.push(arr[i]);
      }
      if(stickArr.length>1){
        stickArr.sort(function(a,b){
          if(typeof +a["data"]["weight"]=="number"&&typeof +b["data"]["weight"]=="number"){
            return b["data"]["weight"]-a["data"]["weight"];
          }else if(typeof a["data"]["weight"]=="undefined"&&typeof b["data"]["weight"]!="undefined"){
            return 10;
          }else if(typeof a["data"]["weight"]!="undefined"&&typeof b["data"]["weight"]=="undefined"){
            return -10;
          }else if(typeof a["data"]["weight"]=="undefined"&&typeof b["data"]["weight"]=="undefined"){
            return 0;
          }
          return 0;
        });
      }
      if(weightArr.length>1){
        weightArr.sort(function(a,b){
          if(typeof +a["data"]["weight"]=="number"&&typeof +b["data"]["weight"]=="number"){
            return b["data"]["weight"]-a["data"]["weight"];
          }else if(typeof a["data"]["weight"]=="undefined"&&typeof b["data"]["weight"]!="undefined"){
            return 10;
          }else if(typeof a["data"]["weight"]!="undefined"&&typeof b["data"]["weight"]=="undefined"){
            return -10;
          }else if(typeof a["data"]["weight"]=="undefined"&&typeof b["data"]["weight"]=="undefined"){
            return 0;
          }
          return 0;
        });
      }
      if(typeof cur=="undefined"){
        stickArr=stickArr.concat(stickArrNW);
        weightArr=weightArr.concat(weightArrNW);
        return stickArr.concat(weightArr);
      }
      if(+cur["data"]["stick"]==1){
        sl=stickArr.length;
        for(let j=0,k=stickArr.length;j<k;j++){
          if(+stickArr[j]["data"]["weight"]<= +cur["data"]["weight"]){
                stickArr.splice(j,0,cur);
            break;
          }
        }
        if(stickArr.length==sl){stickArr.push(cur);}
      }else{
          wl=weightArr.length;
              for(let o=0,p=weightArr.length;o<p;o++){
                if(+weightArr[o]["data"]["weight"]<= +cur["data"]["weight"]){
                    // console.log(typeof weightArr[o]["data"]["weight"]);
                    // console.log(typeof cur["data"]["weight"]);
                      weightArr.splice(o,0,cur);
                break;
            }
          }
          if(weightArr.length==wl){weightArr.push(cur);}
      }
      // console.log(stickArr);
      // console.log(weightArr);
      stickArr=stickArr.concat(stickArrNW);
      weightArr=weightArr.concat(weightArrNW);
      target=stickArr.concat(weightArr);
      // console.log(target);
      return target;
}

function* stateFn(arr){
   for(let i=0,l=arr.length;i<l;i++){
    if(i+1==l){return arr[i]}
      yield arr[i];
   }
}
function print(){
  let s=stateFn(arrE);
  let t=setInterval(function(){
    let b=s.next();
    console.log(b);
    if(b["done"]){clearInterval(t);}
  },1000);
}
print();
 // var regStr="2016-05-18 11:40:54";
 // console.log(regStr.match(/[0-9]{4}?/)[0]);
 // console.log(regStr.match(/-[0-9]{2}-/)[0].replace(/-/g,""));
 // console.log(regStr.match(/-[0-9]{2}\s/)[0].replace(/-/g,"").replace(/\s/g,""));
 // console.log(regStr.match(/\s[0-9]{2}:/)[0].replace(/:/g,"").replace(/\s/g,""));
 // console.log(regStr.match(/:[0-9]{2}:/)[0].replace(/:/g,"").replace(/\s/g,""));
 // console.log(regStr.match(/:[0-9]{2}$/)[0].replace(/:/g,"").replace(/\s/g,""));
 // console.log(regStr.match(/aa/g));