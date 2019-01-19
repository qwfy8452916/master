$(function () {
    var Global_ChangeInfo_url = "/userset/changeaccountinfo";
    var $closeBtn = $("i[data-name='close']"),
        $infoInput = $("input[data-name='info-input']"),
        $changeBtn = $("span[data-name='change']");
    fixInputType($infoInput);
    $closeBtn.on("click", clearInput);
    $changeBtn.on("click", changeAction);
    $infoInput.on("keyup", function () {
        var $target = $(this);
        $target.val($target.val().replace(/\D/g,""));
    });

    function clearInput(event) {
        $infoInput.val("");
    }
    function changeAction(event) {
        var value = $infoInput.val();
        if(!value){
            $.toptip("请输入手机号");
            return;
        }
        if(!checkPhoneNum(value)){
            $.toptip("手机号输入有误，请重新输入");
            return;
        }
        ajaxAction({
            url: Global_ChangeInfo_url,
            method: "post",
            data : {
                contacttel: value
            },
            successCallback: function (res) {
                if(res.error_code==0){
                    location.href = "/userset/info";
                }else{
                    $.toptip(res.error_msg);
                }
            }
        })
    }
});
