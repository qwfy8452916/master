<?php if (!defined('THINK_PATH')) exit();?><div class="win_box step bind_box">
    <div class="win_box_bg">
    </div>
    <div class="win_box_content">
        <div class="zb_box_in">
            <div class="zb_box_title">
                <div class="zb_box_hd">
                    <div class="zb_box_info">
                    <?php echo ($info["title"]); ?>
                    </div>
                </div>
                <span class="win_box_close" title="关闭">
                </span>
            </div>
            <div class="zb_box_form">
                <div class="input">
                    为了保证您的帐号安全，更换密保<?php echo ($info["tag"]); ?>前请先进行安全验证
                </div>
                <?php if(($info['type'] == 'tel' AND !$info['user']['tel_safe_chk']) OR (!$info['user'] AND $info['type'] == 'tel')): ?><div class="input">
                        <label class="label-control"><?php echo ($info["subtitle"]); ?></label>
                        <input type="text" class="input-control" placeholder="手机" name="val" />
                        <em class="red err-tips"></em>
                        <input type="hidden" name="verifyType" value="moblie">
                    </div>
                <?php elseif(($info['type'] == 'mail' AND !$info['user']['mail_safe_chk']) OR (!$info['user'] AND $info['type'] == 'mail')): ?>
                    <div class="input">
                        <label class="label-control"><?php echo ($info["subtitle"]); ?></label>
                        <input type="text" class="input-control" placeholder="邮箱" name="val" />
                        <em class="red err-tips"></em>
                        <input type="hidden" name="verifyType" value="email">
                    </div>
                <?php else: ?>
                    <div class="input">
                        <label class="label-control">验证方式</label>
                        <select name="type" class="input-control">
                            <?php if($info['user']['tel_safe_chk']): ?><option value="1">密保手机<?php echo ($info["user"]["tel_safe"]); ?></option><?php endif; ?>
                            <?php if($info['user']['mail_safe_chk']): ?><option value="2">密保邮箱<?php echo ($info["user"]["mail_safe"]); ?></option><?php endif; ?>
                        </select>
                        <input name="real_tel" type="hidden" value="<?php echo ($info["user"]["real_tel"]); ?>"/>
                        <input name="real_mail" type="hidden" value="<?php echo ($info["user"]["real_mail"]); ?>"/>                    
                    </div><?php endif; ?>
                <div class="input mt20">
                    <input type="text" class="input-control" placeholder="右侧验证码" name="verifyCode" style="width:120px; margin-left:70px;" /><img src="/verify" style="vertical-align:middle;cursor:pointer" class="verifyimg" title="点击更换验证码">
                    <em class="red err-tips"></em>
                </div>


                <div class="input mt20">
                    <input type="text" class="input-control" placeholder="手机/邮箱验证码" name="code" style="width:120px; margin-left:70px;" /><button  id="btncode" type="button" class="input-button">获取验证码</button>
                    <em class="red err-tips"></em>
                </div>

                <div class="input ">
                    <button id="btnSub" type="button" class="button ml70 mb30">确定</button>
                    <em class="red err-tips"></em>
                    <input class="order_safecode" type="hidden" />
                </div>
                <div class="input">
                    <div class="input-line"></div>
                </div>
                <div class="input ">
                如果您的安全账户无法使用,请致电<em class="red"><?php echo OP('QZ_CONTACT_TEL400');?></em>,联系客服
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(".verifyimg").click(function(event) {
        $(this).attr("src","/verify?rand="+Math.random());
    });
    $(".bind_box .win_box_close").click(function(event) {
        $(".bind_box").remove();
    });
    $(".bind_box .win_box_bg").click(function(event) {
        $(".bind_box").remove();
    });
    //开始验证
    $(".bind_box #btnSub").click(function(event) {
        $(".err-tips").html("");
        $(".focus").removeClass("focus");
        var _this = $(this);


        if($(".bind_box input[name=val]").val() == undefined){
            //alert('undefined');
        }else{

            var typeName = $(".bind_box input[name=verifyType]").val();

            if(typeName == 'email'){
                if(!App.validate.run($(".bind_box input[name=val]").val())){
                    $(".bind_box input[name=val]").addClass('focus').focus().parent().find(".err-tips").html("请输入邮箱地址");
                    return false;
                }
                if(!App.validate.run($(".bind_box input[name=val]").val(),"email")){
                    $(".bind_box input[name=val]").addClass('focus').focus().parent().find(".err-tips").html("请输入正确的邮箱");
                    return false;
                }
            }

            if(typeName == 'moblie'){

                if(!App.validate.run($(".bind_box input[name=val]").val())){
                    $(".bind_box input[name=val]").addClass('focus').focus().parent().find(".err-tips").html("请填写您的手机号");
                    return false;
                }
                if(!App.validate.run($(".bind_box input[name=val]").val(),"moblie")){
                    $(".bind_box input[name=val]").addClass('focus').focus().parent().find(".err-tips").html("手机号填写错误");
                    return false;
                }
            }            
        }

        if(!App.validate.run($(".bind_box input[name=verifyCode]").val())){
            $(".bind_box input[name=verifyCode]").addClass('focus').focus().parent().find(".err-tips").html("请填写验证码");
            return false;
        }

        if(!App.validate.run($(".bind_box input[name=code]").val())){
            $(".bind_box input[name=code]").addClass('focus').focus().parent().find(".err-tips").html("请输入短信/邮箱验证码");
            return false;
        }
        var tel ="";
        var auth = 0;
        if($(".bind_box select[name=type]").length > 0){
            if($(".bind_box select[name=type]").val() == 1){
                tel = $(".bind_box input[name=real_tel]").val();
            }else{
                tel = $(".bind_box input[name=real_mail]").val();
            }
            auth = 1;
        }else{
            tel = $(".bind_box input[name=val]").val();
        }
        $.ajax({
                url: "/verifysmscode/",
                type: 'POST',
                dataType : "JSON",
                data: {
                    code: $(".bind_box input[name=code]").val(),
                    tel:tel,
                    authcode:auth,
                    ssid:"<?php echo ($info["ssid"]); ?>",
                    cookie:$(".order_safecode").val()
                },
                success: function(data) {
                    if (data.status == 1) {
                        if($(".bind_box select[name=type]").length > 0){
                            $(".bind_box").remove();
                            getSafeAccount(_this,"<?php echo ($info["type"]); ?>");
                        }else{
                            bindSafeAccount(_this,"<?php echo ($info["type"]); ?>",tel);
                        }
                    }else{
                        _this.parent().find(".err-tips").html(data.info);
                    }
                },
                error: function(xhr) {
                     _this.parent().find(".err-tips").html("发生了未知的错误,请稍后再试！");
                }
            });
    });

    function getSafeAccount(o,type){
        $.ajax({
            type : "POST",
            url : "/account/",
            dataType : "JSON",
            data:{
                ssid:"<?php echo ($info["ssid"]); ?>",
                type:type,
                refresh:1
            },
            success : function(data){
                if(data.status == 0){
                    o.parent().find(".err-tips").html(data.info);
                }else{
                    $("body").append(data.data);
                }
            },
            error:function(xhr){
               o.parent().find(".err-tips").html("发生了未知的错误,请稍后再试！");
            }
        });
    }

    function bindSafeAccount(o,type,account){
        $.ajax({
            type : "POST",
            url : "/bindaccount/",
            dataType : "json",
            data:{
                ssid:"<?php echo ($info["ssid"]); ?>",
                account:account,
                type:type
            },
            success : function(data){
                if(data.status == 0){
                    o.parent().find(".err-tips").html(data.info);
                }else{
                    window.location.href =  window.location.href;
                }
            },
            error:function(xhr){
               o.parent().find(".err-tips").html("发生了未知的错误,请稍后再试！");
            }
        });

    }

    //取验证码
    $(".bind_box #btncode").click(function(event) {
        var _this = $(this);
        $(".err-tips").html("");
        $(".focus").removeClass("focus");
        var tel ="";
        var auth = 0;
        var url ="";
        var email ="";

        //先验证图形验证码
        if(!App.validate.run($(".bind_box input[name=verifyCode]").val())){
            $(".bind_box input[name=verifyCode]").addClass('focus').focus().parent().find(".err-tips").html("请填写验证码");
            return false;
        }
        if($(".bind_box select[name=type]").length > 0){
            auth = 1;
            if($(".bind_box select[name=type]").val() == 1){
                url = "/sendsms/";
                tel = $(".bind_box input[name=real_tel]").val();
            }else{
                url = "/sendemail/";
                email = $(".bind_box input[name=real_mail]").val();
            }
        }else{
            email = tel = $(".bind_box input[name=val]").val();

            if("<?php echo ($info["type"]); ?>" == "tel"){
                url = "/sendsms/";
                if(!App.validate.run($(".bind_box input[name=val]").val())){
                    $(".bind_box input[name=val]").addClass('focus').focus().parent().find(".err-tips").html("请输入正确的手机");
                    return false;
                }

                if(!App.validate.run($(".bind_box input[name=val]").val(),"moblie")){
                    $(".bind_box input[name=val]").addClass('focus').focus().parent().find(".err-tips").html("无效的手机号");
                    return false;
                }
            }else{
                url = "/sendemail/";
                if(!App.validate.run($(".bind_box input[name=val]").val())){
                    $(".bind_box input[name=val]").addClass('focus').focus().parent().find(".err-tips").html("请输入正确的邮箱");
                    return false;
                }
                if(!App.validate.run($(".bind_box input[name=val]").val(),"email")){
                    $(".bind_box input[name=val]").addClass('focus').focus().parent().find(".err-tips").html("无效的邮箱");
                    return false;
                }
            }
        }
        _this.attr("disabled","disabled");

        $.ajax({
            type : "POST",
            url : url,
            dataType : "json",
            data:{
                save:0,
                authcode:auth,
                ssid:"<?php echo ($info["ssid"]); ?>",
                tel:tel,
                email:email,
                code:$(".bind_box input[name=verifyCode]").val()
            },
            success : function(data){
                if(data.status == 0){
                    _this.prop("disabled",false);
                    _this.parent().find(".err-tips").html(data.info);
                }else{
                    if(data.status == 9){
                        _this.prop("disabled",false);
                        $(".bind_box input[name=verifyCode]").addClass('focus').focus().parent().find(".err-tips").html("验证码错误");
                    }
                    if(data.status == 1){
                        _this.prop("disabled",true);
                        alert('验证码发送成功');
                    }
                    // if(data.data != ""){
                    //     $(".order_safecode").val(data.data.name+"="+data.data.value + "&expires=" +data.data.expires);
                    // }
                }
            },
            error:function(xhr){
               _this.prop("disabled",false);
                _this.parent().find(".err-tips").html("发生了未知的错误,请稍后再试！");
            }
        });
    });
</script>