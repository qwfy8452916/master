/*
* @Author: Administrator
* @Date:   2018-08-31 13:29:55
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-09-25 11:55:12
*/
$(function(){
     initSize();
     var cookie = {
        setCookie:function(key,val,time){//设置cookie方法
            var date=new Date(); //获取当前时间
            var expiresDays=time;  //将date设置为n天以后的时间
            date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
            document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
        },
        getCookie:function(key){//获取cookie方法
            /*获取cookie参数*/
            var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
            var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
            var tips;  //声明变量tips
            for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
                var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
                if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                    tips=arr[1];   //将cookie的值赋给变量tips
                    break;   //终止for循环遍历
                }
            }
            return tips;

        },
        deleteCookie:function(key){ //删除cookie方法
            var date = new Date(); //获取当前时间
            date.setTime(date.getTime()-10000); //将date设置为过去的时间
             document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie
            }

     }
     if(cookie.getCookie("tips") === undefined){
         var ieCheckBox = "<div class='ie-tips b-owf'>尊敬的用户您好，您当前浏览器版本过低，为了更好体验效果，建议您升级到更高版本的浏览器！<span class='b-fr' id='closed-tips'>关闭</span></div>";
         $("body").prepend(ieCheckBox)
     }
     $("#closed-tips").click(function(){
         $(this).parent(".ie-tips").remove();
         cookie.setCookie("tips",'this is ie8',15);
     })
    //  window.close(function(){
    //     alert("关闭")
    //  })


   // IE8 初始化一些样式
   function initSize(){
        var win_height = $(window).height() - 80;
        $(".b-right-content").css({
            "min-height": win_height + "px"
        });
    }
    $(window).resize(function(event) {
         initSize();
    });



})