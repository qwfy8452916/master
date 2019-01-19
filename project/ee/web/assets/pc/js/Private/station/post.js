/*
* @Author: qz_xsc
* @Date:   2018-09-04 10:39:06
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-09-17 16:06:24
*/
$(function () {
    //重置

    $("#reset").on("click", function () {
        $(".yz-box").find('input').val("");
        $(".yz-box").find('select').val("0").css("color", "#666");
    });

    //禁用 /启用
    $(".change-status").on("click", function () {


        var _this = $(this);
        var users = parseInt($(".users-"+_this.attr('data-id')).text());
        var data = new Object();
        data.edit_id = _this.attr('data-id');
        data.status = _this.attr('data-status');
        //有人员就不能禁用
        if(users > 0){
            tishitip('该岗位存在关联人员，无法禁用', 0);
            return;
        }
        _this.p_confirm({
            "confirmText": "您确定要" + _this.text() + "吗?",
            okFun: function () {
                $.ajax({
                    url: '/station/change',
                    type: 'POST',
                    dataType: 'JSON',
                    data: data
                })
                    .done(function (data) {
                        if (data.error_code == 0) {
                            tishitip(_this.text() + '成功', 1);
                            setTimeout(function(){
                                window.location.href = window.location.href;
                            },1000);

                        } else {
                            tishitip(data.error_msg, 2);
                        }
                    });
            },
            noFun: function () {

            }
        });
    });

    //删除
    $(".p-delete").on("click", function () {
        var _this = $(this);
        var users = parseInt($(".users-"+_this.attr('data-id')).text());
         if(users > 0){
            tishitip('该岗位存在关联人员，无法删除', 0);
            return;
        }
        _this.p_confirm({
            "confirmText": "您确定要删除吗?",
            okFun: function () {
                var edit_id = _this.attr('data-id');

                $.ajax({
                    url: '/station/del',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {edit_id:edit_id}
                })
                    .done(function (data) {
                        if (data.error_code == 0) {
                            tishitip("删除成功",1);
                            setTimeout(function(){
                                window.location.href = window.location.href;
                            },1000);

                        } else {
                            tishitip(data.info,2);
                        }
                    });
            },
            noFun: function () {
            }
        });
    });
});