$(function () {
    var Global_Material_url = "/material/";

    $("html,body").on("click", "a[data-name='close']", function(event) {
        var _this = $(this),
            target = $(this).attr("data-target");
        var oid = _this.data("id");
        $.confirm("确定要删除?", "提示", function() {
            $.ajax({
                url: '/material/del/',
                type: 'POST',
                dataType: 'JSON',
                data: {oid:oid}
            })
                .done(function(res) {
                    if(res.error_code == 0){
                        $(_this).closest("."+target).remove();
                        $.toptip("删除成功", "success");
                    }else{
                        $.toptip(res.info, "error");
                    }
                })
                .fail(function(xhr) {
                    $.toptip('发生未知错误，请稍后重试~',"error");
                    return false;
                })
        }, function() {
            //取消操作
        });
    });

    var loading = false, kyw = "";
    $(document.body).infinite().on("infinite", function() {
        if(loading) return;
        $(".weui-loadmore").fadeIn(0);
        loading = true;
        var page = $('.weui-loadmore__tips').attr('data-page');
        if( page == 0 ){
            $('.weui-loadmore__tips').html('到底了~');
            $(".weui-loading").fadeOut(0);
            return;
        }
        setTimeout(function () {
            ajaxAction({
                url : Global_Material_url,
                method: "get",
                data : {
                    p : parseInt(page)+1,
                    yzname : kyw
                },
                successCallback:function (res) {
                    if(res.error_code == 0){
                        $('.weui-loadmore__tips').attr('data-page',res.page);
                        var tplStr = template('tmpl',res);
                        $('.material-item-box').append(tplStr);
                        loading = false;
                    }
                }
            });
        }, 100)
    });

    $('#sform').on('submit', function(event){
        event.preventDefault();
        kyw = $("#search").val();
        if(!$.trim(kyw)){
            // $.alert("请输入业主姓名/供应商/联系人");
            location.href = "http://merp.qizuang.com/material/index";
            return;
        }
        $(".weui-loadmore").fadeIn(0);
        $("p[data-name='none']").fadeOut(0);
        var page = 1;
        $('.weui-loadmore__tips').attr('data-page',2);
        ajaxAction({
            url : Global_Material_url,
            method : "get",
            data : {
                p : page,
                yzname : kyw
            },
            successCallback: function (res) {
                if(res.error_code == 0){
                    if(res.data && res.data.length>0){
                        $("p[data-name='none']").fadeOut(0);
                        $(".weui-loadmore").fadeIn(0);
                        $(".weui-loading").fadeIn(0);
                        var tplStr1 = template('tmpl',res);
                        $('.material-item-box').html(tplStr1);
                        if(res.data.length < 5){
                            $('.weui-loadmore__tips').html('没有了');
                            $(".weui-loading").fadeOut(0);
                        }else{
                            $('.weui-loadmore__tips').html('正在加载');
                        }
                        loading = false;
                    }else{
                        $('.material-item-box').html("");
                        $(".weui-loadmore").fadeOut(0);
                        $("p[data-name='none']").fadeIn(0);
                    }
                }
            }
        })
    })

})
