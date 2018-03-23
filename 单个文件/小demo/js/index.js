/**
 * Created by dell on 2016/5/28.
 */


function $$(id) {return document.getElementById(id);}
var login = document.getElementById("m_hd");
var m_bd = document.getElementById('m_bd');
login.onclick = function(event){
    $$("mask").style.display = "block";
    $$('m_bd').style.display = 'block';

    document.body.style.overflow = "hidden"
    var event = event || window.event;
    if(event && event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
}
document.onclick = function(event){
    var event = event || window.event;
    var targetId = event.target ? event.target.id : event.srcElement.id;
    if(targetId != "m_hd") {
        $$("mask").style.display = "none";
        $$('m_bd').style.display = 'none'
        document.body.style.overflow = "visible";
    }
}


