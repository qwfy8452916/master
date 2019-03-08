
var app = new Vue({
    el: '#app',
    data: {
        showTime: false,
        productID: '',
        productInfo:{

        }

    },
    methods: {
        toBuy:function (id) {
            go('../pay/activity_order.html?id=' + id);
        }
    },
    mounted(){
        var that = this;
        // 获取当前产品ID
        var thisId = getParam('id');
        that.productID = thisId;
        // console.log(thisId);
        console.log('当前产品ID是：' + thisId);

        // 初始化 swiper
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            autoplay: true,
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
                category:'activity'
            },
            success:function (data) {
                that.productInfo=JSON.parse(data).data.product;
            }
        });
    }
});
