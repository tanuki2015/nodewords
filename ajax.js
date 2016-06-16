/**
 * Created by neo on 2016/4/1.
 */
window.onload = function(){
    new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', "./package.json", true);
        xhr.send(null);
        xhr.addEventListener('readystatechange', function(e){
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr);
                }
            }
        })
    }).then(function(txt){
            console.log(txt);
        },function(){console.log("出错了")});
}
