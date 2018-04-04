
	
function fulnav(){
    var fullNav = document.getElementById("full-nav"),
    navBtn = document.getElementById("m-nav"),
    fullNavshut = document.getElementById("full-nav-shut");
    navBtn.addEventListener("touchend", function() {
        addClass(fullNav,"shut-buff");
    fullNavshut.addEventListener("touchend", function() {
        removeClass(fullNav,"shut-buff")
      });
    });//导航呼叫
}
	/*
文字滚动
参数说明，
lh:行高
speed：速度
delay：间隔
*/

function startmarquee(lh,speed,delay) {
    var p=false;
    var t;
    var o=document.getElementById("marqueebox") || false;

    if(o!=false){
        o.innerHTML+=o.innerHTML;
        o.style.marginTop=0;
        o.onmouseover=function(){p=true;}
        o.onmouseout=function(){p=false;}
        function start(){
            t=setInterval(scrolling,speed);
            if(!p) o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
        }
        function scrolling(){
            if(parseInt(o.style.marginTop)%lh!=0){
                o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
                if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2) o.style.marginTop=0;
            }else{
                clearInterval(t);
                setTimeout(start,delay);
            }
        }
        setTimeout(start,delay);
    }

}
gotop = function(){
		var obj = document.getElementById('gotop') || false;
		  	obj.style.display = "none";
		    document.body.addEventListener("touchmove",function(){
    			  if(document.body.scrollTop>100){
    			      obj.style.display = "block";
    			  }
    			  else{
                obj.style.display = "none";
    			  }
			  });
		
	  if(obj!=false){
	      obj.ontouchend = function(){
	          timer = setInterval(function(){
  		          var a = document.body.scrollTop;
                a = a-50;
                document.body.scrollTop = a;
        			  if(a<=0){
                    clearInterval(timer);
        				    obj.style.display = "none";
                }
            },1);
        }
    }
}//返回顶部
	
			
function hasClass( elements,cName ){    
          return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") );   
        };    //判断class方法
function addClass( ele,className ){    
        if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) != -1)) return;
		 ele.className += (ele.className ? " " : "") + className; 
       };    //添加class
function removeClass( elements,cName ){    
          if( hasClass( elements,cName ) ){    
            elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );  
         };    
       };  //删除class

function $(id) {return document.getElementById(id);}

    var login = document.getElementById("m_hd") || false;
    var m_bd = document.getElementById('m_bd');
    if(login!=false){
    login.onclick = function(event){
        document.getElementById("m_bd").style.display = "block";
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
    var aSpan=document.getElementById("m_hd").children;
    var targetId = event.target ? event.target.id : event.srcElement.id;
    if(targetId != "m_hd") {
        // $("mask").style.display = "none";
        document.getElementById("m_bd").style.display = "none";
        for (var i = 0; i < aSpan.length; i++) {
          aSpan[i].className="";
        }
        document.body.style.overflow = "visible";
    }
}
}
