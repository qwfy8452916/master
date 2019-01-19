$(function () {
    var Global_Del_Url = "/house/design/del";
    var $delBtn = $("p[data-name='del']");
    $delBtn.on("click",delDesignDraw)

    var pics = [], pb = null, index = 0;
    $(document).on("click", ".swiper-hook", function (event) {
        var _this = this;
        $(this).closest(".forder-design-box").find("img").each(function (idx, item) {
            pics.push(item.src);
            if(item.src==_this.src){
                index = idx;
            }
        })

        pb = $.photoBrowser({
            items: pics,
            onSlideChange: function (index) {
                // console.log(this, index);
            },
            onOpen: function () {
                // console.log("onOpen", this);
            },
            onClose: function () {
                pics = [];
            }
        })
        pb.open(index);

    });

    /**
     * 删除设计图
     */
    function delDesignDraw(event) {
        var id = $(this).attr('data-id');
        if(!id){
            return;
        }
        $.confirm("确定要删除？", function() {
            ajaxAction({
                url: Global_Del_Url,
                method: "post",
                data: {
                    design_id: id
                },
                successCallback: function (res) {
                    if(res.error_code==0){
                        location.reload();
                    }
                }
            })
        }, function() {
            //点击取消后的回调函数
        });
    }
})
