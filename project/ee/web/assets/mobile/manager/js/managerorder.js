/*
* @Author: qz_dc
* @Date:   2018-09-05 11:00:56
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-18 16:38:00
*/
$(function(){
    var Global_Order_url = "/managerorder/";

    var loading = false;  //状态标记
    $(document.body).infinite().on("infinite", function() {
        if(loading) return;
        loading = true;
        ajaxAction({
            url : Global_Order_url,
            method: "get",
            successCallback:function (res) {
                if(res.status==1){
                    var tplStr = template('tmpl', data);
                    $('.forder-item-container').append(tplStr);
                    $(".weui-loadmore").fadeOut(0);
                    loading = false;
                }
            }
        });
    });
})