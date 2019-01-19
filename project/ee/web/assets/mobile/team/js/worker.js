/*
* @Author: jsb
* @Date:   2018-08-31 16:39:44
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-29 13:51:46
*/
$(function(){
    //工人个数
    var worker_count = $(".worker_count").val();

    //删除
    $('.worker').on('click','.close',function(){
        var worker_count = $(".worker_count").val();
        if(worker_count == 1){
            $.toptip('施工组至少有一位工人');
            return false;
        }
        var _this = $(this);
        $.confirm("确定要删除?", "提示", function() {
            var edit_id = _this.attr('data-id');
            var group_id = _this.attr('data-gid');
            $.ajax({
                url: '/worker/del/',
                type: 'POST',
                dataType: 'JSON',
                data: {group_id:group_id,edit_id:edit_id}
            })
                .done(function(data) {
                    if(data.error_code == 0){
                        $.toptip('删除成功','success');
                        _this.parent().parent().remove();
                        window.location.href = window.location.href;
                    }else{
                        $.toptip(data.error_msg);
                    }
                })
                .fail(function(xhr) {
                    $.toptip('发生未知错误，请稍后重试~');
                    return false;
                })
        }, function() {
            //取消操作
        });
    });

    $("#back").click(function(event) {
        window.location.href = "/workgroup/";
    });
})