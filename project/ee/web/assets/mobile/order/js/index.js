$(function () {
    var Global_Order_url = "/order/list",
        Global_Order_Search_url = "/order";
    var $forderItemBox = $(".forder-item-box");

    var loading = false, page = 2, kyw = $("#search").val();
    $(document.body).infinite().on("infinite", function() {
        if(loading) return;
        $(".weui-loadmore").fadeIn(0);
        loading = true;
        setTimeout(function () {
            ajaxAction({
                url : Global_Order_url,
                method: "get",
                data: {
                    page_current: page,
                    search: kyw
                },
                successCallback:function (res) {
                    if(res.error_code==0){
                        console.log(!res.data);
                        if(!res.data){
                            $(".weui-loading").fadeOut(0);
                            $(".weui-loadmore__tips").text("到底了~");
                        }else{
                            $forderItemBox.append(res.data);
                            page++;
                            loading = false;
                        }
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
            location.href = "/order"
            return;
        }
        location.href = "http://merp.qizuang.com/order?search="+kyw;
        return;
        $(".weui-loadmore").fadeIn(0);
        $("p[data-name='none']").fadeOut(0);
        page = 1;
        $('.weui-loadmore__tips').attr('data-page',2);
        ajaxAction({
            url : Global_Order_Search_url,
            method : "get",
            data : {
                search : kyw
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
