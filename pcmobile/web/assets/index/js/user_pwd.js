$(function () {
    $('.tijiaoniu .tijiao').click(function () {
        var reg = /^[\S*]{6,20}$/;
        var newpassval = $('.passwaik .newpass input').val(),
            surepassval = $('.passwaik .yanhengmawk input').val();
        if (newpassval == '') {
            $('.passwaik .newpass input').focus();
            $('.passwaik .tihsims').html('密码不能为空').show();
            return false
        }
        if (!reg.test(newpassval)) {
            $('.passwaik .newpass input').focus();
            $('.passwaik .tihsims').html('密码必须为6-20位字母、数字或符号').show();
            return false
        }

        if (surepassval == '') {
            $('.passwaik .yanhengmawk input').focus();
            $('.passwaik .tihsims').html('请确认密码').show();
            return false
        }
        if (surepassval != newpassval) {
            $('.passwaik .yanhengmawk input').focus();
            $('.passwaik .tihsims').html('确认密码与输入密码不一致').show();
            return false
        }
        $.ajax({
            url: change_pwd,
            type: 'POST',
            data: {pwd:newpassval,rpwd:surepassval},
            dataType: 'json',
            success: function (data) {
                if (data.status == 1){
                    layer.msg(data.info,{time: 1300},function () {
                        $('.passwaik .tihsims').html('').hide();
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