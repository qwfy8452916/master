
var app = new Vue({
    el: '#app',
    data: {
        showInvalid: false,
        isSelectAll: false,
        idList: '',
        money: '',
        list: [],
        productList: '',
        user_level: '',
        footerNavList: [
            {
                icon: 'icon-zhuye',
                name: '首页',
                isActive: false,
                url: 'index.html'
            },
            {
                icon: 'icon-dingdan1',
                name: '订单',
                isActive: false,
                url: 'order.html'
            },
            {
                icon: 'icon-gouwuche1',
                name: '购物车',
                isActive: true,
                url: 'shopcar.html'
            },
            {
                icon: 'icon-wode',
                name: '我的',
                isActive: false,
                url: 'my.html'
            }
        ]
    },
    watch: {
        list: {//深度监听，可监听到对象、数组的变化
            handler(value, oldVal) {
                // console.log(value);
                var that = this;
                var money = 0;
                value.map(function (item) {
                    if (item.select) {
                        var show_price = (that.user_level == 'fenxiao_v2') ? item.share_price : item.cx_price;
                        money = accAdd(money, accMul(show_price, item.num));
                    }
                });
                that.money = money;
            },
            deep: true
        }
    },
    methods: {
        //数量更改
        addProduct: function (product, add) {
            var that = this;
            var num;
            if (add) {
                num = Number(product.num) + 1;
            } else {
                if (product.num == 1) {
                    alert("该宝贝不能减少了哟")
                    return
                } else {
                    num = Number(product.num) - 1;
                }
            }

            $.ajax({
                type: "POST",
                url: window.globalResURL + "/user/ajax_update_cart",
                data: {
                    product_id: product.product_id,
                    num: num
                },
                success: function (data) {
                    console.log(data);
                    that.list.map(function (item) {
                        if (item.id == product.id) {
                            item.num = num;
                        }
                    });
                }
            });
        },
        //选择
        selectProduct: function (id) {
            this.list.map(function (item) {
                if (item.id == id) {
                    if (item.select) {
                        item.select = false;
                    } else {
                        item.select = true;
                    }
                }
            });
            var isNoAll = this.list.find(function (item) {
                return item.select == false
            });
            if (!isNoAll) {
                this.isSelectAll = true;
            } else {
                this.isSelectAll = false;
            }
        },
        //全选
        selectAll: function () {
            if (!this.isSelectAll) {
                this.list.map(function (item) {
                    item.select = true;
                });
                this.isSelectAll = true;
            } else {
                this.list.map(function (item) {
                    item.select = false;
                });
                this.isSelectAll = false;
            }
        },
        //添加订单
        addOrder: function () {
            var that = this;
            var idList = "";
            var productList = "";
            that.list.map(function (item) {
                if (item.select) {
                    idList = idList + item.id + ',';
                    productList = productList + item.product_id + ',';
                }
            });
            that.idList = idList.slice(0, idList.length - 1);
            that.productList = productList.slice(0, productList.length - 1);

            $.ajax({
                type: "POST",
                url: window.globalResURL + "/pay/add_order",
                data: {
                    cart_ids: that.idList
                },
                success: function (data) {
                    if (data && data.data) {
                        var nowOrderInfo = JSON.stringify(data.data);
                        window.localStorage.setItem("nowOrderInfo", nowOrderInfo);
                        go('./pay/orderInfo.html?cart_id=' + that.idList + '&product_id=' + that.productList);
                    }
                }
            });
        },
        //删除购物车
        del: function () {
            var that = this;
            var idList = "";
            that.list.map(function (item) {
                if (item.select) {
                    idList = idList + item.id + ','
                }
            });
            idList = idList.slice(0, idList.length - 1);
            ajaxPost(window.globalResURL + "/user/ajax_del_cart", { ids: idList }, function (res) {
                if (res.code = 1001) {
                    alert("删除成功");
                    location.href = location.href;
                }
            })
        },
        getData: function () {
            var that = this;
            ajaxPost(window.globalResURL + "/user/shopping_cart",
                function (res) {
                    if (res.code == 1001) {
                        var cartList = res.data.list;
                        that.user_level = res.data.users.alias;
                        that.list = cartList.map(function (item) {
                            item.select = false;
                            return item
                        });
                    }
                });
        }
    },
    mounted() {
        this.getData();
    }
});
