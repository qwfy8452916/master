$(function () {
    var flag = true; //验证码防止重复提交
    var Global_Sms_url = "/login/send",
        Global_Psw_One_url = "/login/checksavecode";

    var $cancelBtn = $("a[data-name='cancel']"),
        $nextBtn = $("a[data-name='next']"),
        $getCodeBtn = $("button[data-name='get-code']"),
        $accountInput = $("input[data-name='account']"),
        $phoneInput = $("input[data-name='phone']"),
        $codeInput = $("input[data-name='code']"),
        $errBox = $("div[data-name='error-container']");

    fixInputType($phoneInput);

    $cancelBtn.on("click", cancelAction);
    $getCodeBtn.on('click', getSmsCode);
    $codeInput.on("input", filterCodeData);
    $phoneInput.on("keyup", function (event) {
        var $target = $(this);
        $target.val($target.val().replace(/\D/g,""));
    });

    $(document).on("keyup", function (event) {
        event.stopPropagation();
        // 判断是否要更改登录按钮状态，启用
        if ($.trim($accountInput.val()).length > 0 && $phoneInput.val().length > 0 && $getCodeBtn.attr("disabled") ==
            "disabled") {
            changeStatus($getCodeBtn, false);
        }
        // 判断是否要更改登录按钮状态，禁用
        if ($.trim($accountInput.val()).length <= 0 || $phoneInput.val().length <= 0 ) {
            changeStatus($getCodeBtn, true);
        }
        // 判断是否要更改下一步按钮状态，启用
        if ($.trim($accountInput.val()).length > 0 && $phoneInput.val().length > 0 && $codeInput.val().length > 0) {
            $nextBtn.removeClass("c2ce").addClass("orange");
            var $events= $._data($nextBtn[0], 'events');
            // 确保只绑定一次
            if( !($events && $events['click']) ){
                $nextBtn.on("click", nextAction);
            }
        }
        // 判断是否要更改下一步按钮状态，禁用
        if ($.trim($accountInput.val()).length <= 0 || $phoneInput.val().length <= 0 || $codeInput.val().length <= 0) {
            $nextBtn.removeClass("orange").addClass("c2ce");
            event.preventDefault();
            $nextBtn.off("click");
        }
    });

    /**
     * 取消找回密码，返回上一级页面，清空输入框的值
     */
    function cancelAction(event) {
        event.stopPropagation();
        $accountInput.val("");
        $getCodeBtn.val("发送验证码");
        $phoneInput.val("");
        $codeInput.val("");
    }

    /**
     * 下一步按钮函数，要验证输入框的值是否符合要求
     */
    function nextAction(event) {
        event.stopPropagation();
        var account = $accountInput.val(),
            phone = $phoneInput.val(),
            code = $codeInput.val(),
            $target = $(event.target);
        if( !account ){
            $errBox.text("请输入账号").fadeIn(0);
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        if( !checkPhoneNum(phone) ){
            $errBox.text("抱歉，手机号输入错误").fadeIn(0);
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        if( !code ){
            $errBox.text("请输入验证码").fadeIn(0);
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        if( code.length != 6 ){
            $errBox.text("验证码错误，请重新输入").fadeIn(0);
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        if( parseInt($.trim(code)) != code ){
            $errBox.text("验证码错误，请重新输入").fadeIn(0);
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        ajaxAction({
            url : Global_Psw_One_url,
            method:"post",
            data:{
                account: account,
                tel: phone,
                code: code
            },
            successCallback : function (res) {
                if(res.status==1){
                    location.href = $target.attr("data-href")
                }else{
                    $errBox.text(res.info).fadeIn(0);
                }
            }
        });
    }

    /**
     * 获取短信验证码
     */
    function getSmsCode(event) {
        event.stopPropagation();
        var account = $accountInput.val(),
            phone = $phoneInput.val();
        if( !account ){
            $errBox.text("请输入账号").fadeIn(0);
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        if( !phone ){
            $errBox.text("请输入手机号").fadeIn(0);
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        if( !checkPhoneNum(phone) ){
            $errBox.text("抱歉，手机号输入错误").fadeIn(0);
            return;
        }else{
            $errBox.text("").fadeOut(0);
        }
        if(flag==true){
            flag=false;
            ajaxAction({
                url : Global_Sms_url,
                method:"post",
                data:{
                    tel:$phoneInput.val(),
                    accountnum:$accountInput.val()
                },
                successCallback : function (res) {
                    if(res.status==1){
                        $getCodeBtn.attr("disabled",true)
                        countDown(60, $getCodeBtn, function () {
                            $getCodeBtn.text("发送验证码").attr("disabled",false);
                            flag=true;
                        });
                    }else{
                        $errBox.text(res.info).fadeIn(0);
                        flag=true;
                        return;
                    }
                }
            });
        }
    }

    /**
     * 验证账号是否存在
     */
    function validAccount(account) {
        if( !account ){
            return;
        }
        ajaxAction({
            url : "",
            method:"post",
            data:{
                account:account
            },
            successCallback : function (res) {
                if(res.status==1){

                }else{

                }
            }
        });
    }

    // 修改禁用表单控件状态

    function changeStatus(ele, bool) {
        if ($(ele).length <= 0) {
            return;
        }
        $(ele).attr("disabled", bool);
        if(bool){
            $(ele).removeClass("orange").addClass("c2ce");
        }else{
            $(ele).removeClass("c2ce").addClass("orange");
        }
    }

    /**
     * 验证码输入框屏蔽所有非数字符号
     */
    function filterCodeData() {
        $codeInput[0].value=$codeInput[0].value.replace(/[^0-9.]+/,'');
    }
})
