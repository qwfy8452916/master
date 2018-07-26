$(function () {
    var countdown = 60;
    function settime(obj) {

        if (countdown == 0) {
            obj.removeAttribute("disabled");
            obj.value = "获取验证码";
            countdown = 60;
            return;
        } else {
            obj.setAttribute("disabled", true);
            obj.value = "重新发送(" + countdown + ")";
            countdown--;
        }
        setTimeout(function () {settime(obj)}, 1000);
    }

    $('.registerwaik .yanhengmawk .giveyzm').click(function (event) {
        var reg = new RegExp("^(13|14|15|16|17|18)[0-9]{9}$"),
            shoujival = $('.registerwaik .newphonewk input').val(),
            reg2 = new RegExp("^174|175[0-9]{8}$");
        if (shoujival == '') {
            $('.registerwaik .newphonewk input').focus();
            $('.registerwaik .tihsims').html("手机号码不能为空").show();
            return false;
        } else if (!reg.test(shoujival)) {
            $('.registerwaik .newphonewk input').focus();
            $('.registerwaik .tihsims').html("请填写正确的手机号").show();
            return false;
        }else if (reg2.test(shoujival)) {
            $('.registerwaik .newphonewk input').focus();
            $('.registerwaik .tihsims').html("请填写正确的手机号");
            return false;
        }else{
            $('.registerwaik .yanhengmawk .giveyzm').attr("disabled",true);
        }
        var obj = this;
        $.ajax({
            url: send_msg,
            type: 'POST',
            data: {tel:shoujival,checkUser:2},
            success: function (data) {
                if (data.status == 0){
                    $('.registerwaik .tihsims').html(data.info).show();
                    $('.registerwaik .yanhengmawk .giveyzm').attr("disabled",false);
                }else{
                    layer.msg(data.info,{time: 1300},function () {
                    $('.registerwaik .yanhengmawk .yanzmtext').attr("disabled",false);  
                        settime(obj);
                        $('.registerwaik .tihsims').html("");
                    });
                }
            },
            error:function () {
                $('.registerwaik .yanhengmawk .giveyzm').attr("disabled",false);
                layer.msg('不知道哪里出错了~',{time: 1300});
            }
        });
    });


    $('.tijiaoniu .tijiao').click(function () {
        var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$"),
            reg2 = new RegExp("^174|175[0-9]{8}$"),
            reg3 = /^[\S*]{6,20}$/,
            yanzhengma = $('.registerwaik .yanhengmawk input').val(),
            shoujival = $('.registerwaik .newphonewk input').val(),
            newpassval = $('.registerwaik .newpass input').val(),
            surepassval = $('.registerwaik .surepasswk input').val();
        if (shoujival == '') {
            $('.registerwaik .newphonewk input').focus();
            $('.registerwaik .tihsims').html("手机号码不能为空");
            return false;
        }
        if (!reg.test(shoujival)) {
            $('.registerwaik .newphonewk input').focus();
            $('.registerwaik .tihsims').html("请填写正确的手机号");
            return false;
        }
        if (reg2.test(shoujival)) {
            $('.registerwaik .newphonewk input').focus();
            $('.registerwaik .tihsims').html("请填写正确的手机号");
            return false;
        }

        if (yanzhengma == '') {
            $('#code').focus();
            $('.registerwaik .tihsims').html("请填写验证码");
            return false;
        }

        if (newpassval == '') {
            $('.registerwaik .newpass input').focus();
            $('.registerwaik .tihsims').html('密码不能为空');
            return false
        }
        if (!reg3.test(newpassval)) {

            $('.registerwaik .newpass input').focus();
            $('.registerwaik .tihsims').html('密码为6-20位数');
            return false
        }

        if (surepassval == '') {
            $('.registerwaik .surepasswk input').focus();
            $('.registerwaik .tihsims').html('请确认密码');
            return false
        }
        if (surepassval != newpassval) {
            $('.registerwaik .surepasswk input').focus();
            $('.registerwaik .tihsims').html('确认密码与输入密码不一致');
            return false
        }

        $.ajax({
            url: getpassword_url,
            type: 'POST',
            data: {tel:shoujival,code:yanzhengma,password:newpassval,repassword:surepassval},
            dataType: 'json',
            success: function (data) {
                if (data.status == 1){
                    layer.msg(data.info,{time: 1300},function () {
                        $('.registerwaik .tihsims').html("");
                        window.location.href = location_url;
                    });
                }else{
                    $('.registerwaik .tihsims').html(data.info).show();
                }
            },
            error:function () {
                layer.msg('不知道哪里出错了~',{time: 1300});
            }
        });
    });
});