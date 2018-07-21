+function ($) {
    var jiequphone=$('.rightjvli').text();
    $('.rightjvli').html(jiequphone.substring(0,3)+"****"+jiequphone.substring(8,11))

    $('.rightbianji .xiugai span').click(function (event) {
        var panduanzhi = $(this).parent().attr('data-ji')
        $(this).closest('.fujixz').children('.middlebianji').show();
        $(this).parent('.xiugai').hide();
        $(this).parent().parent().children('.bianjicunqu').removeClass('yincang')
        switch (panduanzhi) {
            case 'sexgai':
                $(this).closest('.fujixz').children('.middlebianji').children('.sexselect').show();
                $('.sexxb .xingbie').hide();
                break;
            case 'areagai':
                $('.areadiv').show();
                $('.citydiv').show();
                $('.province').show();
                $('.middlebianji .localdiqu').hide();
                break;
        }
    });

    $('.rightbianji .cancelqx').click(function (event) {
        var cancelpanduan=$(this).attr('data-cancel');
        $(this).parent().addClass('yincang');
        $(this).parent().parent().parent().children('.middlebianji').children('.xianshiquyu').show();
        
        $(this).closest('.fujixz').children().children('.xiugai').show();
        $(this).closest('.fujixz').children().children('.xiugai').children('span').hide();

        switch(cancelpanduan){
            case 'namecancel':
            $(this).parent().parent().parent().children('.middlebianji').children('.nameinput').hide();
            case 'sexcancel':
            $(this).parent().parent().parent().children('.middlebianji').children('.sexselect').hide();
                 break;
            case 'areacancel':
             $(this).parent().parent().parent().children('.middlebianji').children('.areadiv').hide();
             $(this).parent().parent().parent().children('.middlebianji').children('.citydiv').hide();
        }

    });


    //修改昵称
    $('.rightbianji .namesave').click(function (event) {
        var nick_name = $('.middlebianji .nameinput').val();
        var that=this;
        if (nick_name == "") {
            layer.msg('请输入昵称', {time: 2000});
        } else {
            $.ajax({
                url: change_nickname,
                type: 'POST',
                data: {nick_name: nick_name},
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if (data.status == 1) {
                        layer.msg(data.info, {time: 1300}, function () {
                            $(that).parent('.bianjicunqu').addClass('yincang');
                            $(that).closest('.fujixz').children().children('.xiugai').show();
                            $(that).closest('.fujixz').children().children('.xiugai').children('span').hide();
                            $(that).closest('.fujixz').children('.middlebianji').hide();
                            $('.nameinput').val('');
                            $(that).closest('.fujixz').children('.leftbianji').html(nick_name);
                        });
                    } else {
                        layer.msg(data.info, {time: 2000});
                    }
                },
                error: function () {
                    layer.msg('不知道哪里出错了~', {time: 1300});
                }
            });
        }
    });

    //修改性别
    $('.rightbianji .sexsave').click(function () {
        var sex = $('.sexselect').val();
        var that=this;
        if (sex == "请选择") {
            layer.msg('请选择性别', {time: 2000});
        } else {
            $.ajax({
                url: change_sex,
                type: 'POST',
                data: {sex: sex},
                dataType: 'json',
                success: function (data) {
                    if (data.status == 1) {
                        layer.msg(data.info, {time: 1300}, function () {
                            $(that).parent('.bianjicunqu').addClass('yincang');
                            $(that).closest('.fujixz').children('.middlebianji').children('.sexselect').hide();
                            $(that).closest('.fujixz').children().children('.xiugai').show();
                            $(that).closest('.fujixz').children().children('.xiugai').children('span').hide();
                            $('.sexxb .xingbie').html(sex);
                            $('.sexxb .xingbie').show();
                        });
                    } else {
                        layer.msg(data.info, {time: 2000});
                    }
                },
                error: function () {
                    layer.msg('不知道哪里出错了~', {time: 1300});
                }
            });
        }
    });

    //修改城市
    $('.rightbianji .areasave').click(function (event) {
        var areashi = $.trim($('.areacity').val()),
            areaqu = $.trim($('.areadq .diqu').val()),
            areashitext=$('.areacity option:selected').text().substring(1),
            areaqutext=$('.areadq .diqu option:selected').text();

        var that=this;
        if (areashi == 0 || areaqu == 0) {
            if (areashi == 0) {
                layer.msg('请选择市', {time: 2000,})
            } else if (areaqu == 0) {
                layer.msg('请选择区', {time: 2000,})
            }
        } else {
            var data = {cs: areashi, qx: areaqu};
            $.ajax({
                url: change_area,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (data) {
                    console.log(data)
                    if (data.status == 1) {
                        layer.msg(data.info, {time: 1300}, function () {
                            $(that).parent('.bianjicunqu').addClass('yincang');
                            $('.areadiv,.citydiv').hide();
                            $('.middlebianji .localdiqu').show();
                            $(that).closest('.fujixz').children().children('.xiugai').show();
                            $(that).closest('.fujixz').children().children('.xiugai').children('span').hide();
                            $('.middlebianji .localdiqu').html(areashitext + '-' + areaqutext);
                            $('.middlebianji .localdiqu').show();
                        });
                    } else {
                        layer.msg(data.info, {time: 2000});
                    }
                },
                error: function () {
                    layer.msg('不知道哪里出错了~', {time: 1300});
                }
            });
        }

    });


    $('.xinxquyu .fujixz').mouseenter(function () {
        if ($(this).children().children('.xiugai').children('span').css('display') == 'none' && $(this).children().children('.bianjicunqu').hasClass('yincang')) {
            $(this).children().children('.xiugai').children('span').show();
        }
    });

    //  $('.xinxquyu .fujixz').mouseleave(function(){
    // 	 if($(this).children().children('.xiugai').children('span').css('display')=='inline-block'){
    // 	 	$(this).children().children('.xiugai').children('span').hide();
    // 	 }
    // });
}(jQuery);

+function ($) {
    $('.xinxquyu .touxiang').click(function (event) {
        $('.clipyinying').show();
        $('.clipwaik').show();
    });

    $('.anxiuwk .closequx').click(function (event) {
        $('.clipyinying').hide();
        $('.clipwaik').hide();
    });


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
        setTimeout(function () {
                settime(obj)
            }
            , 1000)
    }

    $('.yanzengmwk .btnyzm').click(function (event) {
        var reg = new RegExp("^(13|14|15|16|17|18)[0-9]{9}$"),
         reg2 = new RegExp("^174|175[0-9]{8}$"),
         shoujival = $.trim($('.phonewk input').val());
        if (shoujival == '') {
            $('.phonewk input').focus();
            $('.guidetanc .tjtishi').html("手机号码不能为空").show();
            return false;
        }else if (!reg.test(shoujival)) {
            $('.phonewk input').focus();
            $('.guidetanc .tjtishi').html("请输入正确的手机号").show();
            return false;
        }else if(reg2.test(shoujival)){
            $('.phonewk input').focus();
            $('.guidetanc .tjtishi').html("请输入正确的手机号").show();
            return false;
        }else{
            $('.yanzengmwk .btnyzm').attr('disabled',true);
            $('.guidetanc .yanzengmwk .inputtext').attr('disabled',false);
            $('.guidetanc .yanzengmwk .inputtext').focus();
        }
        var obj = this;
        $.ajax({
            url: send_msg,
            type: 'POST',
            data: {tel:shoujival},
            success: function (data) {
                console.log(data)
                if (data.status == 1){
                    layer.msg(data.info,{time: 1300},function () {
                        $('.guidetanc .tjtishi').html("").show();
                        settime(obj);
                    });
                }else{
                    $('.guidetanc .yanzengmwk .inputtext').attr('disabled', true);
                    $('.yanzengmwk .btnyzm').attr('disabled',false);
                    $('.phonewaik .tihsims').html(data.info).show();
                }
            },
            error:function () {
                $('.guidetanc .yanzengmwk .inputtext').attr('disabled', true);
                $('.yanzengmwk .btnyzm').attr('disabled',false);
                layer.msg('不知道哪里出错了~',{time: 1300});
            }
        });
    });

    $('.passwordmm .chongse').click(function (event) {
        $('.clipyinying').show();
        $('.guidetanc').show();
    });


     $('.yanzengmwk').bind('input propertychange', function() {  
        var phoneval=$.trim($('.phonewk input').val()),
            codeinput = $.trim($('.yanzengmwk input').val());
       if(phoneval!='' && codeinput!=''){
          $('.guidetanc .surewk .sureqr').attr('disabled',false); 
       }else{
          $('.guidetanc .surewk .sureqr').attr('disabled',true);
       }
      });

     $('.phonewk').bind('input propertychange', function() {  
        var phoneval=$.trim($('.phonewk input').val()),
            codeinput = $.trim($('.yanzengmwk input').val());
       if(phoneval!='' && codeinput!=''){
          $('.guidetanc .surewk .sureqr').attr('disabled',false); 
       }else{
          $('.guidetanc .surewk .sureqr').attr('disabled',true);
       }
      });

     $('.newpassword').bind('input propertychange', function() {  
        var newpassval=$.trim($('.newpassword input').val()),
            surepassval = $.trim($('.surepassword input').val());
       if(newpassval!='' && surepassval!=''){
          $('.guidetanc2 .surewk .sureqr2').attr('disabled',false); 
       }else{
          $('.guidetanc2 .surewk .sureqr2').attr('disabled',true);
       }
      });

     $('.surepassword').bind('input propertychange', function() {  
        var newpassval=$.trim($('.newpassword input').val()),
            surepassval = $.trim($('.surepassword input').val());
       if(newpassval!='' && surepassval!=''){
          $('.guidetanc2 .surewk .sureqr2').attr('disabled',false); 
       }else{
          $('.guidetanc2 .surewk .sureqr2').attr('disabled',true);
       }
      });


    $('.surewk .sureqr').click(function () {
        var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$"),
            reg2 = new RegExp("^174|175[0-9]{8}$"),
            mobile = $.trim($('.phonewk input').val()),
            code = $.trim($('.yanzengmwk input').val());
        if (mobile == '') {
            $('.phonewk input').focus();
            $('.guidetanc .tjtishi').html("手机号码不能为空").show();
            return;
        }
        if (!reg.test(mobile)) {
            $('.phonewk input').focus();
            $('.guidetanc .tjtishi').html("请填写正确的手机号").show();
            return;
        }
        if (reg2.test(mobile)) {
            $('.phonewk input').focus();
            $('.guidetanc .tjtishi').html("请填写正确的手机号").show();
            return;
        }

        if (code == '') {
            $('.guidetanc .tjtishi').html("请填写验证码").show();
            return;
        }
        $.ajax({
            url: check_code,
            type: 'POST',
            data: {tel:mobile,code:code},
            dataType: 'json',
            success: function (data) {
                if (data.status == 1){
                     $('.guidetanc .tjtishi').hide();
                     $('.guidetanc').hide();
                     $('.guidetanc2').show();
                }else{
                    $('.guidetanc .tjtishi').html(data.info).show();
                }
            },
            error:function () {
                layer.msg('不知道哪里出错了~',{time: 1300});
            }
        });
    });

    $('.guidetanc .guanbi').click(function (event) {
        $('.clipyinying').hide();
        $('.guidetanc').hide();
    });

    $('.surewk .sureqr2').click(function () {
        var reg = /^[\s\S*]{8,20}$/,
            newpass = $.trim($('.newpassword input').val()),
            repass = $.trim($('.surepassword input').val()),
            regmobile = new RegExp("^(13|14|15|17|18)[0-9]{9}$"),
            regmobile2 = new RegExp("^174|175[0-9]{8}$"),
            mobile = $.trim($('.phonewk input').val()),
            code = $.trim($('.yanzengmwk input').val());
        if (mobile == '') {
            $('.tjtishi02').html('手机号码不能为空').show();
            return;
        }
        if (!regmobile.test(mobile)) {
            $('.tjtishi02').html('请填写正确的手机号').show();
            return;
        }
        if (regmobile2.test(mobile)) {
            $('.tjtishi02').html('请填写正确的手机号').show();
            return;
        }
        if (code == '') {
            $('.tjtishi02').html('请填写验证码').show();
            return;
        }
        if (newpass == '') {
            $('.newpassword input').focus();
            $('.tjtishi02').html('密码不能为空').show();
            return false
        }
        if (!reg.test(newpass)) {
            $('.newpassword input').focus();
            $('.tjtishi02').html('密码为8-20位数').show();
            return;
        }

        if (repass == '') {
            $('.surepassword input').focus();
            $('.tjtishi02').html('请输入确认密码').show();
            return false
        }
        if (repass != newpass) {
            $('.surepassword input').focus();
            $('.tjtishi02').html('确认密码与输入密码不一致').show();
            return false
        }
        $.ajax({
            url: change_pwd,
            type: 'POST',
            data: {pwd:newpass,rpwd:repass,tel:mobile,code:code},
            dataType: 'json',
            success: function (data) {
                if (data.status == 1){
                    layer.msg(data.info,{time: 1300},function () {
                        $('.clipyinying').hide();
                        $('.guidetanc2').hide();
                        $('.phonewk input').val("");
                        $('.yanzengmwk input').val("");
                        $('.newpassword input').val("");
                        $('.surepassword input').val("");
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

    $('.guidetanc2 .guanbi').click(function (event) {
        $('.clipyinying').hide();
        $('.guidetanc2').hide();
    });
}(jQuery);

