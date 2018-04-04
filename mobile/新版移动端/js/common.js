	window.onload = function(){
		
    var fullNav = document.getElementById("full-nav"),
	    navBtn = document.getElementById("m-nav"),
		fullNavshut = document.getElementById("full-nav-shut");
        navBtn.addEventListener("touchend", function() {
        addClass(fullNav,"shut-buff");
		fullNavshut.addEventListener("touchend", function() {
			 removeClass(fullNav,"shut-buff")
			 });
         });//导航呼叫
		
		
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
		
	TouchSlide({ 
		slideCell:"#focus",
		titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".bd ul", 
		effect:"leftLoop", 
		autoPlay:true,//自动播放
		autoPage:true //自动分页
	});//轮播
	TouchSlide({ slideCell:"#leftTabBox" });
	//tab

TouchSlide({ 
		slideCell:"#xgt-info",
		mainCell:".bd ul", 
		effect:"left", 
		autoPlay:false,//自动播放
		pageStateCell:".pageState span" //自动分页
	});//效果图终端
	
	
	gotop = function(){
		  var obj = document.getElementById('gotop') || false;
		  if(obj!=false){
		      obj.ontouchend = function(){
		  timer = setInterval(function(){
		  var a = document.body.scrollTop;
	          a = a-50;
			  document.body.scrollTop = a;
			  if(a<=0){
				 clearInterval(timer);
				 }
			},1)
         } 
	   }
	}
	gotop({});
	   

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
startmarquee(20,20,2000);
	
	

	}