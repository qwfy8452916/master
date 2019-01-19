$(function () {
    var Global_Del_Draw = "/build/unit/del",
        Global_BuildList_url = "/build/list/api";
    var $constructItemBox = $(".construct-item-box");
    var loading = false, page = 2, order_no = location.href.split("=")[1];
    $(document.body).infinite().on("infinite", function() {
        if(loading) return;
        $(".weui-loadmore").fadeIn(0);
        loading = true;
        ajaxAction({
            url : Global_BuildList_url,
            method: "get",
            data: {
                page_current: page,
                order_no: order_no
            },
            successCallback:function (res) {
                if(res.error_code==0){
                    if(!res.data){
                        $(".weui-loading").fadeOut(0);
                        $(".weui-loadmore__tips").text("到底了~");
                    }else{
                        $constructItemBox.append(res.data);
                        page++;
                        loading = false;
                    }
                }
            }
        });
    });

    $("span[data-name='del']").on("click", delDraw);

    var pics = [], pb = null;
    $(document).on("click", ".swiper-hook", function (event) {
        $(this).closest(".pics").find("img").each(function (index, item) {
            pics.push(item.src);
        })
        pb = $.photoBrowser({
            items: pics,
            onSlideChange: function (index) {
                console.log(this, index);
            },
            onOpen: function () {
                console.log("onOpen", this);
            },
            onClose: function () {
                pics = [];
            }
        })
        pb.open($(this).index());

    });

    function delDraw(event) {
        var buildId = $(this).attr("data-build-id"),
            _this = this;
        $.confirm("确定要删除？", function() {
            ajaxAction({
                url : Global_Del_Draw,
                method : "post",
                data : {
                    build_id: buildId
                },
                successCallback: function (res) {
                    if(res.error_code == 0){
                        $(_this).closest(".construct-item").remove();
                        location.reload();
                    }else{
                        $.alert(res.info);
                    }
                }
            })
        }, function() {
            //点击取消后的回调函数
        });
    }
})
