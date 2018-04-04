function tab(){
    var aSpan=document.getElementById("m_hd").children;
    var mBd=document.getElementById("m_bd");
    var aUl=mBd.children;
    for(var i=0;i<aSpan.length;i++){
        aSpan[i].index = i;
        aSpan[i].onclick=function(){
            if(this.className == "active"){
                this.className="";
                aUl[this.index].style.display = "none";
            }else{
                for(var i=0;i<aSpan.length;i++){
                    aUl[i].style.display="none"
                    aSpan[i].className="";
                }
                this.className="active";
                aUl[this.index].style.display = "block";
            } 
        }
    }
}
/*文字多隐藏。。。*/
function textmore(){
    atb();
    window.onresize=function(){
        atb();
    }
}

function atb(){
    var str="苏州某某装饰工程有限公司";
    var compName=document.getElementsByClassName('comp-name');
    if(document.documentElement.clientWidth <= 365 && str.length >= 11){
        for (var i = 0; i < compName.length; i++) {
            compName[i].innerHTML=str.substring(0,10)+"...";
            compName[i].style.fontSize="1em";
        }
    }else{
        for (var i = 0; i < compName.length; i++) {
            compName[i].innerHTML=str;
            compName[i].style.fontSize="1.2em";
        }
    }
}
/*上页下页 变色*/
function udpage(obj){
    var oChange=document.querySelectorAll(obj);
    for (var i = 0; i < oChange.length; i++) {
        oChange[i].onclick=function(){
            for (var i = 0; i < oChange.length; i++) {
                oChange[i].className="change";
            }
            if(this.className == "change"){
                this.className = "change ph";
            }else{
                this.className = "change";
            }
        }
    }
}