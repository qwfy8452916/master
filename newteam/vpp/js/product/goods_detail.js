var app = new Vue({
    el: '#app',
    data: {
        showTime: false,
        productID: '',
        productInfo: {},
        is_collect: false,
    },
    methods: {
        toBuy: function (id) {
            go('../pay/buy.html?id=' + id);
        },
        collect: function () {
            var that = this;
            var res = collect(that.productID, 'product');
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
            loop: false,
            autoplay: true,
            pagination: {
                el: '.swiper-pagination',
            }
        });
        ajaxGet(window.globalResURL + "/product/detail", {id: thisId}, function (result) {
            if (result.code == 1001) {
                that.productInfo = result.data.product;
                var res = is_collect(that.productID, 'product')
                res.status == 1 ? that.is_collect = true : that.is_collect = false;
            }
        })
    }
});
