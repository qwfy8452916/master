var app = new Vue({
    el: '#app',
    data: {
        showTime: false,
        productID: '',
        productInfo: {},
        activity_id: '',
        is_collect: false,
    },
    methods: {
        toBuy: function (id) {
            go('../pay/welfareorderbuy.html?id=' + id);
        },
        collect: function () {
            var that = this;
            var res = collect(this.activity_id, 'activity');
            res.status == 1 ? that.is_collect = true : that.is_collect = false;
            alert(res.msg)
        }
    },
    mounted() {
        var that = this;
        // 获取当前产品ID
        var thisId = getParam('id');
        that.productID = thisId;
        // console.log(thisId);
        console.log('当前产品ID是：' + thisId);

        // 初始化 swiper
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: false,
            pagination: {
                el: '.swiper-pagination',
            }
        });

        //
        $.ajax({
            type: "POST",
            url: window.globalResURL + "/activity/detail",
            data: {
                detail: thisId,
                category: 'companywelfare'
            },
            dataType: 'json',
            success: function (data) {
                that.productInfo = data.data.product;
                that.activity_id = data.data.id;
                var res = is_collect(that.activity_id, 'activity')
                res.status == 1 ? that.is_collect = true : that.is_collect = false;
            }
        });
    }
});
