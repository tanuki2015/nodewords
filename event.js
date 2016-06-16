/**
 * Created by neo on 2016/4/1.
 */
var events = require('events');
//起床，洗脸，吃饭，上学
function getup(){
    console.log("getup");
}
function wash(){
    console.log("wash face");
}
function breakfast(){
    console.log("have a breakfast");
}
function goToSchool(){
    console.log("go to school");
}

var emitter = new events();
emitter.on("getup",getup);
emitter.on("wash", wash);
emitter.on("breakfast",breakfast);
emitter.on("gotoschool",goToSchool);

emitter.emit('getup');
emitter.emit('wash');
emitter.emit('breakfast');
emitter.emit('gotoschool');

