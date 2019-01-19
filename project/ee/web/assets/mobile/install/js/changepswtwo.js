$(function () {
    var Global_NewPsw_Url = "/login/changepassword",
        Global_Layout_url = "/login/loginout";
    var $cancelBtn = $("a[data-name='cancel']"),
        $saveBtn = $("a[data-name='save']"),
        $pswInput = $("input[data-name='psw']"),
        $pswConfirmInput = $("input[data-name='psw-confirm']"),
        $errBox = $("div[data-name='error-container']");

    $cancelBtn.on("click", cancelPswAction);

    $pswInput.on("keyup",function () {
        $(this).val($(this).val().replace(/\s+/,""));
    });

    $(document).on("keyup", function (event) {
        event.stopPropagation();
        // 判断是否要更改登录按钮状态，启用
        if ($.trim($pswInput.val()).length > 0 && $pswConfirmInput.val().length > 0 ) {
            $saveBtn.removeClass("c2ce").addClass("orange");
            var $events= $._data($saveBtn[0], 'events');
            // 确保只绑定一次
            if( !($events && $events['click']) ){
                $saveBtn.on("click", savePswAction);
            }
        }
        // 判断是否要更改登录按钮状态，禁用
        if ($.trim($pswInput.val()).length <= 0 || $pswConfirmInput.val().length <= 0 ) {
            $saveBtn.removeClass("orange").addClass("c2ce");
            event.preventDefault();
            $saveBtn.off("click");
        }
    })

    /**
     * 取消按钮函数，要清空密码输入框的值
     */
    function cancelPswAction(event) {
        location.href = "/userset";
        return;
        event.stopPropagation();
        $pswInput.val("");
        $pswConfirmInput.val("");
        ajaxAction({
            url: Global_Layout_url,
            method: "get",
            successCallback: function (res) {
                if(res.error_code==0){
                    location.href = "/login"
                }else{
                    $.toptip(res.error_msg);
                }
            }
        })
    }

    /**
     * 保存密码函数
     */
    function savePswAction(event) {
        event.stopPropagation();
        var psw = $pswInput.val(),
            pswC = $pswConfirmInput.val(),
            reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*+-_,.?''""~`{}[\](\){\}:;/]{6,24}/;
        if( !psw ){
            $errBox.text("请输入密码").fadeIn(0);
            event.preventDefault();
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        if( psw.length < 6 ){
            $errBox.text("密码为6-24位").fadeIn(0);
            event.preventDefault();
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        if( psw.length > 24 ){
            $errBox.text("密码为6-24位").fadeIn(0);
            event.preventDefault();
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        if( !reg.test(psw) ){
            $errBox.text("请不要填写纯数字/纯字母/纯特殊符号").fadeIn(0);
            event.preventDefault();
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        if( psw !== pswC ){
            $errBox.text("密码不一致，请重新输入").fadeIn(0);
            event.preventDefault();
            return;
        }else{
            $errBox.text("").fadeOut(0);
            ajaxAction({
                url : Global_NewPsw_Url,
                method:"post",
                data:{
                    password: psw,
                },
                successCallback : function (res) {
                    if(res.status==1){
                        $.toptip("密码修改成功","success");
                        setTimeout(function () {
                            location.href = '/login'
                        }, 500)
                    }else{
                        $errBox.text(res.info).fadeIn(0);
                    }
                }
            });
        }
    }
})
