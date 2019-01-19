$(function () {
    var Global_ChangeInfo_url = "/userset/changeaccountinfo";
    var $closeBtn = $("i[data-name='close']"),
        $infoInput = $("input[data-name='info-input']"),
        $changeBtn = $("span[data-name='change']");
    $closeBtn.on("click", clearInput);
    $changeBtn.on("click", changeAction);
    $infoInput.on("keyup", function (event) {
        if(event.keyCode==32){
            $(this).val($(this).val().replace(/\s+/g,""));
        }
    });

    function clearInput(event) {
        $infoInput.val("");
    }
    function changeAction(event) {
        var value = $infoInput.val();
        if(!value){
            $.toptip("请输入名字");
            return;
        }
        ajaxAction({
            url: Global_ChangeInfo_url,
            method: "post",
            data : {
                contactname: value
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
