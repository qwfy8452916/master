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
        setTimeout(function () {settime(obj)}, 1000)
    }

    $('.phonewaik .yanhengmawk .giveyzm').click(function (event) {
        var reg = new RegExp("^(13|14|15|16|17|18)[0-9]{9}$");
        shoujival = $('.phonewaik .newphonewk input').val();
        if (shoujival == '') {
            $('.phonewaik .newphonewk input').focus();
            $('.phonewaik .tihsims').html("手机号码不能为空").show();
            return false;
        } else if (!reg.test(shoujival)) {
            $('.phonewaik .newphonewk input').focus();
            $('.phonewaik .tihsims').html("请填写正确的手机号").show();
            return false;
        }else{
            $('.phonewaik .yanhengmawk .giveyzm').attr("disabled",true);
        }
        var obj = this;
        $.ajax({
            url: send_msg,
            type: 'POST',
            data: {tel:shoujival},
            success: function (data) {
                if (data.status == 1){
                    $('.phonewaik .yanhengmawk input').attr("disabled",false)
                    layer.msg(data.info,{time: 1300},function () {
                        $('.phonewaik .tihsims').html("");
                        settime(obj);
                    });
                }else{
                    $('.phonewaik .yanhengmawk .giveyzm').attr("disabled",false);
                    $('.phonewaik .tihsims').html(data.info).show();
                }
            },
            error:function () {
                $('.phonewaik .yanhengmawk .giveyzm').attr("disabled",false);
                layer.msg('不知道哪里出错了~',{time: 1300});
            }
        });
    });


    $('.tijiaoniu .tijiao').click(function () {
        var reg = new RegExp("^(13|14|15|16|17|18)[0-9]{9}$"),
            reg2 = new RegExp("^174|175[0-9]{8}$"),
            shoujival = $('.phonewaik .newphonewk input').val(),
            yanzhengma = $('.phonewaik .yanhengmawk input').val();
        if (shoujival == '') {
            $('.phonewaik .newphonewk input').focus();
            $('.phonewaik .tihsims').html("手机号码不能为空").show();
            return false;
        }
        if (!reg.test(shoujival)) {
            $('.phonewaik .newphonewk input').focus();
            $('.phonewaik .tihsims').html("请填写正确的手机号").show();
            return false;
        }
        if (reg2.test(shoujival)) {
            $('.phonewaik .newphonewk input').focus();
            $('.phonewaik .tihsims').html("请填写正确的手机号").show();
            return false;
        }
        if (yanzhengma == '') {
            $('.phonewaik .tihsims').html("请填写验证码").show();
            return false;
        }
        $('.phonewaik .tihsims').html("");
        $.ajax({
            url: change_mobile,
            type: 'POST',
            data: {tel:shoujival,code:yanzhengma},
            dataType: 'json',
            success: function (data) {
                if (data.status == 1){
                    layer.msg(data.info,{time: 1300},function () {
                        $('.phonewaik .tihsims').html("");
                        window.location.href = location_url;
                    });
                }else{
                    $('.phonewaik .tihsims').html(data.info).show();
                }
            },
            error:function () {
                layer.msg('不知道哪里出错了~',{time: 1300});
            }
        });

    });
});