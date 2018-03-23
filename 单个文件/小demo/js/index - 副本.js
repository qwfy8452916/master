/**
 * Created by dell on 2016/5/28.
 */

window.onload = function(){
    tab("box");

};
function tab(id){
    var mask = document.getElementById('mask')
    var  eleId = document.getElementById(id);
    var span = eleId.getElementsByTagName("span");
    var ul = eleId.getElementsByTagName("ul");
    var li = eleId.getElementsByTagName('li')
    for(var i=0; i<span.length;i++) {
        span[i].index = i;
        span[i].addEventListener("touchstart",function(){

            for(var j = 0;j < ul.length; j++)
            {
                span[j].className = "";
                ul[j].className = "";
            }
            this.className = "active";
            ul[this.index].className = "show";
        })

         //span[i].onclick = function(){
         //   for(var j = 0;j < ul.length; j++)
         //   {
         //       span[j].className = "";
         //       ul[j].className = "";
         //   }
         //   this.className = "active";
         //   ul[this.index].className = "show";
         //
         //}
         //mask.onclick = function(){
         //   for(var i=0;i<span.length;i++){
         //       span[i].className = ''
         //
         //   }
         //}
        mask.addEventListener('touchstart',function(){
            for(var i=0;i<span.length;i++){
                       span[i].className = ''

                  }
        })
    }
}

function $(id) {return document.getElementById(id);}
var login = document.getElementById("m_hd");
var m_bd = document.getElementById('m_bd');
//login.onclick = function(event){
//    $("mask").style.display = "block";
//    $('m_bd').style.display = 'block';
//
//    document.body.style.overflow = "hidden"
//    var event = event || window.event;
//    if(event && event.stopPropagation) {
//        event.stopPropagation();
//    }
//    else {
//        event.cancelBubble = true;
//    }
//}
login.addEventListener('touchstart',function(event){
    $("mask").style.display = "block";
    $('m_bd').style.display = 'block';

    document.body.style.overflow = "hidden"
    var event = event || window.event;
    if(event && event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
});
document.addEventListener('touchend',function(event){
    var event = event || window.event;
    var targetId = event.target ? event.target.id : event.srcElement.id;
    if(targetId != "m_hd") {
        $("mask").style.display = "none";
        $('m_bd').style.display = 'none'
        document.body.style.overflow = "visible";

            }

    })

//document.onclick = function(event){
//    var event = event || window.event;
//    var targetId = event.target ? event.target.id : event.srcElement.id;
//    if(targetId != "m_hd") {
//        $("mask").style.display = "none";
//        $('m_bd').style.display = 'none'
//        document.body.style.overflow = "visible";
//    }
//}


