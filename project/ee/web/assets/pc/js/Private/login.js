$(function(){

$('.divinput .loginniu').click(function(event) {
  $('.tishi').html("");
	var Zhanghaonumval=$.trim($('.zhanghaonum').val()),
	    Passmima=$.trim($('.passmima').val());
	    if(Zhanghaonumval==''){
          $('.zhanghao-tishi').html("请输入登录账号");
          $('.zhanghaonum').focus();
          return false;
	    }
	    if(Passmima==""){
          $('.pass-tishi').html("请输入登录密码");
          $('.passmima').focus();
          return false;
	    }else{
           loginaction(Zhanghaonumval,Passmima);
	    }

});


function yanzheng(){
  $('.tishi').html("");
   var Zhanghaonumval=$.trim($('.zhanghaonum').val()),
	    Passmima=$.trim($('.passmima').val());
	    if(Zhanghaonumval==''){
          $('.zhanghao-tishi').html("请输入登录账号");
          $('.zhanghaonum').focus();
          return false;
	    }
	    if(Passmima==""){
          $('.pass-tishi').html("请输入登录密码");
          $('.passmima').focus();
          return false;
	    }else{
           loginaction(Zhanghaonumval,Passmima);
	    }
}

function loginaction(Zhanghaonumval,Passmima){
    if(Zhanghaonumval && Passmima){
        $.ajax({
            url: '/login/land',
            type:'POST',
            dataType: 'JSON',
            data: {username:Zhanghaonumval,password:Passmima}
        })
        .done(function(data) {
            if(data.status == 0){
                var info = data.info;
                tishitip(info,2);
            }else{
               // tishitip('登录成功',1);
                window.location.href="/";
            }
        })
        .fail(function(xhr) {
            tishitip('未知错误,请稍后重试',2);
            return false;
        })
    }else{
        tishitip('参数有误,请刷新重试',2);
    }
}

$(document).on("keyup",function(){

 if(event.keyCode==13){

   yanzheng();

 }

})










})

