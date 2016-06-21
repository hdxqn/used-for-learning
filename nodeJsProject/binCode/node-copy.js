#! /usr/bin/env node
'use strict'
const fs=require("fs");
function copy(src,dst){
	fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}
copy(process.argv[2],process.argv[3]);  
