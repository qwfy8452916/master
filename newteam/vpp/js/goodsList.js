var app = new Vue({
    el: '#app',
    data: {
        num: 0,
        shopNum: 0,
        list: [],
        isActive: false,
        companywelfare: ''
    },
    methods: {
        tab(index) {
            this.num = index;
        },
        toBuy: function (id) {
            go("timeBuy.html?id=" + id);
        },
        toShopCar: function () {
            go("../shopcar.html");
        },
        addNum: function (id) {
            var that = this;
            var selectID = id;
            // this.isActive=true;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/user/ajax_add_cart",
                data: {
                    product_id: selectID
                },
                success: function (data) {
                    var res = JSON.parse(data);
                    if (res.code == '1001') {
                        that.shopNum++;
                        alert(res.msg);
                        return;
                    } else if (res.code == '2001') {
                        alert(res.msg);
                        return;
                    }
                }
            });
        }
    },
    mounted() {
        var that = this;
        $.ajax({
            type: "POST",
            url: window.globalResURL + "/activity/index",
            data: {
                category: 'companywelfare'
            },
            success: function (data) {
                that.list = JSON.parse(data).data.list;
            }
        });
        $.ajax({
            type: "POST",
            url: window.globalResURL + "/user/shopping_cart",
            data: {},
            success: function (data) {
                // console.log(data);
            }
        });
    }
});
