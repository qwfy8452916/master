$(function () {
    var Global_Sign_Url = "/login/land";
    var $userNameInput = $("input[data-name='username']"),
        $passwordInput = $("input[data-name='password']"),
        $signBtn = $("button[data-name='sign']"),
        $errorBox = $("p[data-name='error-container']");

    $signBtn.on("click", signAction);

    autoFillUserName();

    /**
     * 登录函数
     */
    function signAction(event) {
        var username = $userNameInput.val(),
            password = $passwordInput.val();
        $errorBox.text("").css("opacity",0);
        if( !username ){
            $errorBox.text("请输入账号密码").css("opacity",1);
            return;
        }else{
            $errorBox.text("").css("opacity",0);
        }
        if( !password ){
            $errorBox.text("请输入密码").css("opacity",1);
            return;
        }else{
            $errorBox.text("").css("opacity",0);
        }
        ajaxAction({
            url : Global_Sign_Url,
            method: "post",
            data : {
                username : username,
                password : password
            },
            successCallback:function (res) {
                if(parseInt(res.status) == 1){
                    if(isWechat){
                        localStorage.setItem("username", username)
                    }else{
                        store.set("username", username);
                    }
                    location.href="http://merp.qizuang.com/?v="+new Date().getTime();
                }else{
                    $errorBox.text(res.info).css("opacity",1);
                }
            },
            failCallback: function (res) {
                $.toptip("网络异常，请稍后重试", "error");
            }
        });
    }

    /**
     * 自动填充用户名
     */
    function autoFillUserName() {
        if(isWechat){
            var username = localStorage.getItem("username");
        }else{
            var username = store.get("username");
        }
        $userNameInput.val("");
        $passwordInput.val("");
        if(username){
            $userNameInput.val(username);
        }
    }

})


