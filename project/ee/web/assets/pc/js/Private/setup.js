
swfobject.addDomLoadEvent(function () {
        var swf = new fullAvatarEditor("swfContainer", {
                id: 'swf',
                upload_url: '/userset/uploadhead', //上传路径
                method : "post",
                src_upload: 0,//默认为0；是否上传原图片的选项，有以下值：0:不上传；1:上传；2 :显示复选框由用户选择
                isShowUploadResultIcon: false,//在上传完成时（无论成功和失败），是否显示表示上传结果的图标
                src_size: "2MB",//选择的本地图片文件所允许的最大值，必须带单位，如888Byte，88KB，8MB
                src_size_over_limit: "文件大小超出2MB，请重新选择图片。",//当选择的原图片文件的大小超出指定最大值时的提示文本。可使用占位符{0}表示选择的原图片文件的大小。
                //src_box_width: "300",//原图编辑框的宽度
                //src_box_height: "300",//原图编辑框的高度
                //tab_visible: false,//是否显示选项卡*
                //browse_box_width: "300",//图片选择框的宽度
                //browse_box_height: "300",//图片选择框的高度
                browse_tip:"bmp,jpg,png",
                // avatar_sizes_desc : '100*100像素',
                avatar_sizes:"180*180"  //生成的头像大小

            }, function (msg) {
                switch(msg.code)
                {
                    case 3 :
                        if(msg.type == 0) {
                            layer.msg("摄像头已准备就绪且用户已允许使用。",{time:1300});
                        } else if(msg.type == 1) {
                            layer.msg("摄像头已准备就绪但用户未允许使用!",{time:1300});
                        } else {
                            layer.msg("摄像头被占用!",{time:1300});
                        }
                        break;
                    case 5 :
                        if(msg.content.error_code == 0){
                            //关闭头像控件
                            $('.touxiangkz').hide();
                            $('.clipyinying').hide();
                            $('.p-backbj').hide();
                            if (msg.content.error_code == 0) {
                                //更换头像地址
                                if(msg.content.url){
                                    $.ajax({
                                        url: '/userset/saveHeadImage',
                                        type:'POST',
                                        dataType: 'JSON',
                                        data: {headimage: msg.content.url}
                                    })
                                    .done(function(data) {
                                        if(data.status == 0){
                                            tishitip(data.info,1);
                                        }else{
                                            //替换头像地址
                                            $(".touxiang img").attr("src", 'http://' + msg.content.url);
                                            $(".photopic-wrap img").attr("src", 'http://' + msg.content.url);
                                            var tishixin = "操作成功！";
                                            tishitip(tishixin,1)
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

                        }else{
                            tishitip('上传失败！：'+ msg.type,2);
                        }
                        break;
                }
            }
        );
        $("#upload").click(function(){
            //启用上传
            swf.call("upload");
        });
    });


$(function () {

    //保存按钮
    $('.savebaocun').click(function (event) {
        $('.tishi').html("");
        var data = new Object();
        data.Staffname = $.trim($('.staffname').val().replace(/\s+/g,""));
        data.Phonenumber = $.trim($('.phonenumber').val());
        data.Weixinnumber = $.trim($('.weixinnumber').val().replace(/\s+/g,""));
        if (data.Staffname == "") {
            $('.staff-tishi').html("请输入姓名");
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

        //微信验证
        if(data.Weixinnumber.length>0){
            if(data.Weixinnumber.length<6){
                $('.weixin-tishi').html("请输入正确的微信号");
                return false;
            }
        }

           //保存逻辑
       if(data.Staffname && data.Phonenumber){
        $.ajax({
            url: '/userset/changeuserinfo',
            type:'POST',
            dataType: 'JSON',
            data: {contact_name:data.Staffname,contact_tel:data.Phonenumber,contact_wx:data.Weixinnumber}
        })
        .done(function(data) {
            if(data.status == 0){
                tishitip(data.info,1);
            }else{
                $('.p-backbj').hide();
                $('.addtanchuang').hide();
                var tishixin="操作成功！";
                tishitip(tishixin,1)
            }
        })
        .fail(function(xhr) {
            tishitip('发生未知错误，请稍后重试~',2);
            return false;
        })
    }else{
        tishitip('参数有误,请刷新重试',2);
    }

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
        var reg2=/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*+-_,.?''""~`{}[\](\){\}:;/]{6,24}$/;
        if(Inpassword.length<6){
            $(".passtishi").html("");
            $(".mima-tishi").html("请输入6-24位英文、数字或特殊字符");
            return false;
        }
        if(!reg2.test(Inpassword)){
            $(".passtishi").html("");
            $(".mima-tishi").html("请不要填写纯数字/纯字母/纯特殊符号");
            return false;
        }
        if (Surepass == "") {
            $(".passtishi").html("");
            $(".sure-tishi").html("“请再次输入确认密码。");
            return false;
        } else {
            $(".passtishi").html("");
        }
        //密码一致
        if(Surepass != Inpassword){
            $(".passtishi").html("");
            $(".sure-tishi").html("您两次输入的密码不一致");
            return false;
        }else {
            $(".passtishi").html("");
        }
        //ajax更改密码
        //获取账号
        var user_account = $('.loginumber').val();
        if(user_account && Inpassword){
            $.ajax({
                url: '/userset/changepassword',
                type:'POST',
                dataType: 'JSON',
                data: {username:user_account,password:Inpassword}
            })
            .done(function(data) {
                if(data.status == 0){
                    tishitip(data.info,2);

                }else{
                    $('.addtanchuang').hide();
                    $('.passsurewk').show();
                }
            })
            .fail(function(xhr) {
                tishitip('发生未知错误，请稍后重试~',2);
                return false;
            })
        }else{
            tishitip('参数有误,请刷新重试',2);
        }

    });

    $('.passsurewk .suresave').click(function(event) {
        $('.p-backbj').hide();
        $('.passsurewk').hide();
        window.location.href = '/login/';
    });

    //重置密码弹窗
    $('.resetpass').click(function (event) {
        $('.edit-fl').text("修改密码")
        $('.p-backbj').show();
        $('.addtanchuang').show();
    });

    //重置密码取消按钮
    $('.addtanchuang .foottanc .cancelqx').click(function (event) {
        $('.p-backbj').hide();
        $('.addtanchuang').hide();
    });

    $('.addtanchuang .p-close').click(function (event) {
        $('.p-backbj').hide();
        $('.addtanchuang').hide();
    });

    //头像上传按钮
    $('.photopic .genghuan').click(function(event) {
        $('.p-backbj').fadeIn();
        $('.touxiangkz').fadeIn();
    });

    $('.closequx').click(function(event) {
        $('.p-backbj').fadeOut();
        $('.touxiangkz').fadeOut();
    });

})
