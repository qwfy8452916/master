/*
* @Author: jsb
* @Date:   2018-08-30 17:47:51
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-21 14:14:02
*/
$(function(){
    var loading = false, gys = "";
    $(document.body).infinite().on("infinite", function() {
        if(loading) return;
        loading = true;
        var page = parseInt($('.weui-loadmore__tips').attr('data-id'));
        if(page===0){
            $('.weui-loading').hide();
            $('.weui-loadmore__tips').html('到底了~');
            return;
        }

        setTimeout(function() {
            $.ajax({
                url: '/supplier/',
                type: 'GET',
                data:{p:page, gys:gys}
            })
            .done(function(data) {
                if(data.error_code == 0){
                    // $('.weui-loadmore').show();
                    var tplStr = template('tmpl',data);
                    $('.weui-loadmore__tips').attr('data-id',data.page);
                    $('.part').append(tplStr);
                    loading = false;
                }
            })
            .fail(function() {
                console.log("error");
            })

        }, 100);
    })
    //删除
    $('.part').on('click','.close',function(){
        var _this = $(this);
        $.confirm("确定要删除?", "提示", function() {
            var sid = _this.attr('data-id');
            $.ajax({
                url: '/supplier/del/',
                type: 'POST',
                dataType: 'JSON',
                data: {sid:sid}
            })
            .done(function(data) {
                if(data.error_code == 0){
                    $.toptip('删除成功','success');
                    _this.parent().remove();
                    // window.location.href = window.location.href;
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
    })

    var page = parseInt($('.weui-loadmore__tips').attr('data-id'));
    document.addEventListener("keyup", function(evnet){
        var $search = $("#searchInput").val();
        page = 1;
        $('.weui-loadmore__tips').attr('data-id',2);
        if(event.keyCode == 13){
            gys = $search;
            if(gys==''){
                window.location = '/supplier';
            }else{
                $.ajax({
                    url: '/supplier/',
                    type: 'GET',
                    data:{gys:$search}
                })
                .done(function(data) {
                    if(data.error_code == 0){
                        $("p[data-name='none']").hide();
                        var tplStr1 = template('tmpl',data);
                        $('.part').html(tplStr1);
                        if($('.part').children('div').length <= 3){
                            $('.weui-loadmore').hide();
                        }
                        loading = false;
                    }
                    if(data.data == null||data.data == ''){
                        $("p[data-name='none']").show();
                        $('.weui-loadmore').hide();
                    }
                })
                .fail(function() {
                    console.log("error");
                })
            }

        }
        return false;
    }, false)

    if($('.part').children('div').length <= 3){
        $('.weui-loadmore').hide();
    }


    // document.addEventListener("keyup", function(evnet){
    //     var $search = $("#searchInput").val();
    //     if(event.keyCode == 13){
    //        window.location = '/supplier/?gys='+$search;
    //     }
    //     return false;
    // }, false)
})
