$(function () {
    var Golbal_FeedBack_Url = "/userset/addfeedback";
    var $publishBtn = $("span[data-name='publish']"),
        $feedBackTextArea = $("#feedback-area");
    $publishBtn.on("click", submitFeedBack);

    function submitFeedBack() {
        var text = $feedBackTextArea.val();
        if(!trim(text)){
            $.toptip('您尚未填写意见，请先输入再提交！');
            return;
        }
        ajaxAction({
            url: Golbal_FeedBack_Url,
            method: "post",
            data: {
                feedbackcontent: text
            },
            successCallback: function (res) {
                if(res.status==1){
                    location.href = "/userset"
                }else{
                    $.toptip(res.info);
                }
            }
        })
    }

    function trim(str) {
        return str.replace(/(^\s+)|(\s+$)/g, "");
    }
})
