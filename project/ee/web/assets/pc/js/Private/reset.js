$(function(){



  var flag = true;

  function countDown(obj, num) {
      if (num > 0) {
          obj.text(num + " s");
          num--;
          setTimeout(function (obj, num) {
              countDown(obj, num);
          }, 1000, obj, num);
      } else {
          obj.text("获取验证码");
          flag = true;
      }
  }



 $('.getyanzm').click(function() {
  $('.tishi').html("");
 	var Phonenumval=$.trim($('.phonenum').val());
  var Accountnum = $.trim($('.zhanghaonum').val());
    var that=this;
  if(Accountnum==''){
      $('.zhanghao-tishi').html("请输入登录账号");
      return false;
  }
 	if(Phonenumval==""){
    $('.phonenum-tishi').html("请输入手机号");
     return false;
    }

	    if(!telReg(Phonenumval)){
	        $('.tishi').html("");
	        $('.phonenum-tishi').html("请输入正确的手机号");
	        return false;
	    }else{
            $('.tishi').html("");
	    }
       if(flag==true){
          flag=false;
          //验证
          if(Phonenumval){
          $.ajax({
              url: '/login/send',
              type:'POST',
              dataType: 'JSON',
              data: {tel:Phonenumval,accountnum:Accountnum,checkUser:2}
          })
            .done(function(data) {
                if(data.status == 0){
                    var info = data.info;
                    tishitip(info,2);
                    flag=true;
                }else{
                    tishitip(data.info,1);
                    countDown($(that),60);
                }
            })
            .fail(function(xhr) {
                tishitip('发生未知错误，请稍后重试~',2);
                return false;
            })
          }else{
              tishitip('参数有误,请刷新重试',2);
          }

       }



 });



 $('.divinput .resetniu').click(function(event) {
  $('.tishi').html("");
 	var Zhanghaonumval=$.trim($('.zhanghaonum').val()),
 	    Phonenumval=$.trim($('.phonenum').val()),
 	    Yanzhengmval=$.trim($('.yanzhengm').val()),
 	    Newpassval=$.trim($('.newpass').val()),
 	    Surepassval=$.trim($('.surepass').val());

        if(Zhanghaonumval==''){
         $('.zhanghao-tishi').html("请输入登录账号");
         return false;
        }
        if(Phonenumval==""){
         $('.phonenum-tishi').html("请输入手机号");
         return false;
        }

	    if(!telReg(Phonenumval)){
	        $('.phonenum-tishi').html("请输入正确的手机号");
	        return false;
	    }
	    if(Yanzhengmval==""){
	        $('.getyanzm-tishi').html("请输入验证码");
	        return false;
	    }
	    if(Newpassval==""){
	        $('.newpass-tishi').html("请输入新密码");
	        return false;
	    }
	    var reg2=/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*?]/;
	    if(!reg2.test(Newpassval)){
	        $('.newpass-tishi').html("请不要填写纯数字/纯字母/纯特殊符号");
	        return false;
	    }
	    if(Surepassval==""){
	        $('.surepass-tishi').html("请输入确认密码");
	        return false;
	    }
	    if(Surepassval!=Newpassval){
	        $('.surepass-tishi').html("您两次输入的密码不一致");
	        return false;
	    }
      //验证
      if(Phonenumval){
        $.ajax({
            url: '/login/resetpass',
            type:'POST',
            dataType: 'JSON',
            data: {username:Zhanghaonumval,password:Newpassval,tel:Phonenumval,code:Yanzhengmval}
        })
          .done(function(data) {
              if(data.status == 0){
                  var info = data.info;
                  tishitip(info,2);
              }else{
                  tishitip(data.info,1);
                  location.href='/index'
              }
          })
          .fail(function(xhr) {
              tishitip('未知错误,请稍后重试',2);
              return false;
          })
        }else{
            tishitip('参数有误,请刷新重试',2);
        }
 });
})

