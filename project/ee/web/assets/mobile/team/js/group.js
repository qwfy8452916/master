/*
* @Author: qz_dc
* @Date:   2018-09-05 11:45:00
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-29 14:04:19
*/
$(function(){
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload()
        }
    };
    // 下拉加载
    var loading = false, mobile_search = "";
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
                url: '/workgroup/',
                type: 'GET',
                data:{p:page, mobile_search:mobile_search}
            })
            .done(function(data) {
                if(data.error_code == 0){

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
            var edit_id = _this.attr('data-id');
            $.ajax({
                url: '/workgroup/del/',
                type: 'POST',
                dataType: 'JSON',
                data: {edit_id:edit_id}
            })
            .done(function(data) {
                if(data.error_code == 0){
                    $.toptip('删除成功','success');
                    _this.parent().remove();
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

    // 搜索
    var page = parseInt($('.weui-loadmore__tips').attr('data-id'));
    document.addEventListener("keyup", function(evnet){
        var search = $("#searchInput").val();
        page = 1;
        $('.weui-loadmore__tips').attr('data-id',2);
        mobile_search = search;
        if(event.keyCode == 13){
            if(mobile_search == ''){
                window.location.href = window.location.href;
            }else{
               $.ajax({
                    url: '/workgroup/',
                    type: 'GET',
                    data:{mobile_search:mobile_search}
                })
                .done(function(data) {
                    if(data.error_code == 0){
                        $("p[data-name='none']").fadeOut(0);
                        var tplStr1 = template('tmpl',data);
                        $('.part').html(tplStr1);
                        if($('.part').children('div').length <= 3){
                            $('.weui-loadmore').hide();
                        }
                        loading = false;
                    }
                    if(data.data == ''||data.data == null){
                        $("p[data-name='none']").fadeIn(0);
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

    // 模板函数判写入成员个数
    template.helper('hasuids',function(uids){
        var arr=[];
        arr = uids.split(',');
        uids = arr.length;
        return uids;
    })
})