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

	})

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
			},1)
		}
	}
}//返回顶部



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

$(".moretext").click(function(event) {
	var _this = $(this);
	var text = _this.attr("data-text");
	if(_this.attr("data-on") == 1){
		_this.attr("data-on",2);
		$(".firm .company_text").html(text);
		_this.find("em").html("点击收起>>");
	}else{
		_this.attr("data-on",1);
		$(".firm .company_text").html(text.substring(0,143)+"...");
		_this.find("em").html("点击展开>>");
	}
});


/*
文字滚动
参数说明，
lh:行高
speed：速度
delay：间隔
*/

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
