$(function () {
    if(action_type == 'add'){
        $(".resetpass").hide();
    }

   $('input').on('keyup',function(){
      $(this).val($(this).val().replace(/\s+/g,"")); 
   })



    //保存按钮
    $('.savebaocun').click(function (event) {
        var data = new Object();
        data.edit_id = $("input[name=edit_id]").val();
        data.Staffname = $.trim($('.staffname').val().replace(/\s+/g,""));
        data.Phonenumber = $.trim($('.phonenumber').val());
        data.Weixinnumber = $.trim($('.weixinnumber').val().replace(/\s+/g,""));
        data.Departmentxz = $.trim($('.departmentxz').val());
        data.Postxz = $.trim($('.postxz').val());
        data.Loginumber = $.trim($('.loginumber').val().replace(/\s+/g,""));
        data.Passwordtext = $.trim($('.passwordtext').val().replace(/\s+/g,""));
        data.Statetai = $.trim($('.statetai').val());
         $('.tishi').html("");
        if (data.Staffname == "") {
            $('.staff-tishi').html("请输入员工姓名");
            return false;
        }
        if (data.Phonenumber == "") {
            $('.phone-tishi').html("请输入手机号");
            return false;
        }

        if(!telReg(data.Phonenumber)){
            $('.phone-tishi').html("请输入正确的手机号");
            return false;
        }
        if(data.Weixinnumber){
           if(data.Weixinnumber.length<6){
            $('.weixin-tishi').html("请输入正确的微信号");
            return false;
           }
        }
        if (data.Departmentxz == "") {
            $('.department-tishi').html("请选择部门");
            return false;
        }
        if (data.Postxz == "") {
            $('.postxz-tishi').html("请选择岗位");
            return false;
        }
        if (data.Loginumber == "") {
            $('.loginumber-tishi').html("请输入登录账号");
            return false;
        }
        if(data.Loginumber.length<6){
           $('.loginumber-tishi').html("请输入6-18位中英文、数字或特殊字符。");
            return false;
        }
        //如果是编辑 , 则不验证密码
        if(!data.edit_id){
            if (data.Passwordtext == "") {
                $('.password-tishi').html("请输入登录密码");
                return false;
            }
            var reg2=/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*+-_,.?''""~`{}[\](\){\}:;/]{6,24}/;
            if(data.Passwordtext.length<6){
            $(".password-tishi").html("请输入6-24位英文、数字或特殊字符");
            return false;
           }
            if(!reg2.test(data.Passwordtext)){
              $('.password-tishi').html("请不要填写纯数字/纯字母/纯特殊符号");
              return false;
            }
        }

        if (data.Statetai == "") {
            $('.statetai-tishi').html("请选择状态");
            return false;
        } else {
            $('.tishi').html("");
        }
        //保存
        save(data);
    });

    //密码保存按钮
    $('.p-tancfl .foottanc .savebc').click(function (event) {
        var Inpassword = $.trim($('.inpassword').val()),
            Surepass = $.trim($('.surepass').val());
        if (Inpassword == "") {
            $(".passtishi").html("");
            $(".mima-tishi").html("请输入新密码");
            return false;
        }
        var reg4=/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*+-_,.?''""~`{}[\](\){\}:;/]{6,24}/;
        if(Inpassword.length<6){
            $(".passtishi").html("");
            $(".mima-tishi").html("请输入6-24位英文、数字或特殊字符");
            return false;
        }
            if(!reg4.test(Inpassword)){
              $(".passtishi").html("");
              $('.mima-tishi').html("请不要填写纯数字/纯字母/纯特殊符号");
              return false;
            }
        if (Surepass == "") {
            $(".passtishi").html("");
            $(".sure-tishi").html("请确认新密码");
            return false;
        } else {
            $(".passtishi").html("");
        }
        //密码一致
        if(Surepass != Inpassword){
            $(".passtishi").html("");
            $(".sure-tishi").html("您两次输入的密码不一致");
            return false;
        }
        changePwd(Surepass);
    });

    //重置密码弹窗
    $('.resetpass').click(function (event) {
        $('.edit-fl').text("重置密码")
        $('.p-tancfl .contentnr input').val("");
        $('.p-backbj').show();
        $('.addtanchuang').show();
    });

    //重置密码取消按钮
    $('.addtanchuang .foottanc .cancelqx').click(function (event) {
        $('.p-backbj').hide();
        $('.addtanchuang').hide();
        $('.passtishi').html("");
    });

    $('.addtanchuang .p-close').click(function (event) {
        $('.p-backbj').hide();
        $('.addtanchuang').hide();
        $('.passtishi').html("");
    });

    //添加 /编辑  取消按钮
    $(".cancelbtn").on('click',function () {

        window.location.href = '/employee';
    });
})

/**
 * 保存数据
 * @param data
 */
function save(data) {
    $.ajax({
        url: '/employee/save',
        type: 'POST',
        dataType: 'JSON',
        data: data
    })
        .done(function (data) {
            if (data.error_code == 0) {
                tishitip('操作成功',1)
                setTimeout(function(){
                  window.location.href = '/employee';
              },1000)

            } else if (data.error_code == 400021){
                //验证账号唯一性
                $('.loginumber').focus();
                $('.tishi').html("");
                $('.loginumber-tishi').html(data.error_msg);
                return false;
            }else if (data.error_code == 400022){
                //验证姓名唯一性
                $('.staffname').focus();
                $('.tishi').html("");
                $('.staff-tishi').html(data.error_msg);
                return false;
            }else
            {
                tishitip(data.error_msg);
            }
        });
}

/**
 * 保存数据
 * @param data
 */
function changePwd(pwd) {
    var edit_id = $("input[name=edit_id]").val();
    if(!edit_id){
        return false;
    }
    $.ajax({
        url: '/employee/updatepwd',
        type: 'POST',
        dataType: 'JSON',
        data: {edit_id:edit_id,pwd:pwd}
    })
        .done(function (data) {
            if (data.error_code == 0) {
                $(".passwordtext").val(pwd);
                $(".cancelqx").click();

                $(".passtishi").html("");
                var tishixin = "操作成功！";
                tishitip(tishixin, 1)
            } else {
                tishitip(data.error_msg);
            }
        });
}