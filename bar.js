/**
 * Created by neo on 2016/3/29.
 */
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
////fs.writeFile('./128.txt',new Buffer(128*1024),function(err){
////    console.log(err);
////});
//
////var rs = fs.createReadStream('128.txt',{});
////rs.on('data',function(data){
////    console.log(data.length);
////});
//
//var src = fs.createReadStream('1.txt');
//var tar = fs.createWriteStream('2.txt');
//
////src.on('data',function(data){
////    tar.write(data);
////});
////
////src.on('end',function(){
////    tar.end(function(){
////        console.log("数据已写入： ", tar.bytesWritten);
////    })
////});
//src.pipe(tar);

//fs.readFileAsync('./2.txt','utf8')
//    .then(function(data){
//        console.log(data);
//    },function(err){
//        console.log(err)})
//    .then(function(){
//        setTimeout(function(){
//            console.log("搞定");
//        },2000)
//    });

//fs.readFileAsync("1.txt", "utf8")
//    .then(function(data) {
//    console.log(data);
//});

fs.readFileAsync('1.txt', 'utf8')
    .then(data => console.log(data), err => console.log(err))
    .then( ()=> setTimeout( ()=> console.log("搞定"),2000));
