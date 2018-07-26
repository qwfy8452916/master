$(function () {
    $('.tijiaoniu .tijiao').click(function () {
        var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$"),
            reg2 = new RegExp("^174|175[0-9]{8}$"),
            reg3 = /^[\S*]{6,20}$/,
            userval = $('.loginwaik .dlphonewk input').val(),
            passval = $('.loginwaik .dlpass input').val();
        if (userval == '') {
            $('.loginwaik .dlphonewk input').focus();
            $('.loginwaik .tihsims').html("手机号码不能为空");
            return false;
        }
        else if (!reg.test(userval)) {
            $('.loginwaik .dlphonewk input').focus();
            $('.loginwaik .tihsims').html("请填写正确的手机号");
            return false;
        }
        else if (reg2.test(userval)) {
            $('.loginwaik .dlphonewk input').focus();
            $('.loginwaik .tihsims').html("请填写正确的手机号");
            return false;
        }
        else if (passval == '') {
            $('.loginwaik .dlpass input').focus();
            $('.loginwaik .tihsims').html('密码不能为空');
            return false
        }
        else if (!reg3.test(passval)) {
            $('.loginwaik .dlpass input').focus();
            $('.loginwaik .tihsims').html('密码必须为6-20位字母、数字或符号');
            return false
        } else {
            $.ajax({
                dataType: 'json',
                url: login_url,
                type: 'POST',
                data: {name: userval, password: passval},
                success: function (data) {
                    if (data.status == 1) {
                        layer.msg(data.info, {time: 1300}, function () {
                            $('.loginwaik .tihsims').html("");
                            var tUrl = localStorage.parentUrl;
                            if (tUrl) {
                                localStorage.removeItem('parentUrl');
                                window.location.href = tUrl;
                            } else {
                                window.location.href = '/user/';
                            }

                        });
                    } else {
                        $('.loginwaik .tihsims').html(data.info).show();
                    }
                },
                error: function () {
                    layer.msg('不知道哪里出错了~', {time: 1300});
                }
            });
        }

    });
});