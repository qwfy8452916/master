var app = new Vue({
    el: '#app',
    data: {
        selectDeliverType: 1,  //1 市内送  0 原产地送
        isDeliver: 1,    //配送 自提
        addressInfo: {
            real_name: '',
            mobile: '',
            province: '',
            city: '',
            area: '',
            address: ''
        },
        productInfo: {
            logo: '',
            title: '',
            num: 0,
            cx_price: '',
            is_address: 0,
            couponCount: ''
        },
        showPackage: false,
        list: [],
        select: 0,
        searchindex: 0,
        money: 0,
        length: '',
        title: '',
        couponid: '',
        product_price: 0,
    },
    watch: {
        status(value, oldvalue) {
            console.log(value);
            var that = this;
            ajaxPost(window.globalResURL + "/order", { status: value }, function (result) {
                console.log(data);
                if (result.code == 1001) {
                    var allList = result.data;
                    if (allList.length > 5) {
                        that.showNothing = true;
                    }
                    that.allList = allList;
                }
            });
        }
    },
    methods: {
        toAddress: function () {
            go("../my/address.html");
        },
        buy: function () {
            var carid = getParam('cart_id');
            var that = this;
            if (that.addressInfo.real_name == '') {
                alert('请填写姓名');
                return false;
            }
            if (that.addressInfo.mobile == '') {
                alert('请填写手机号');
                return false;
            }
            var address = that.addressInfo;
            var product = that.productInfo;
            var order_type = (product.is_address == 0) ? 2 : 1;
            ajaxPost(window.globalResURL + "/pay/wx_pay", {
                cart_ids: carid,
                consignee: address.real_name,
                mobile: address.mobile,
                province: address.province,
                city: address.city,
                area: address.area,
                address: address.address,
                pay_type: "wechat",
                num: product.num,
                wl_price: that.selectDeliverType ? '0' : '20',
                order_type: that.isDeliver,   //1 配送 2 自提
                coupon_receive_id: that.couponid,  //优惠券ID
                order_alias: 'product',
                order_type: order_type
            }, function (res) {
                var code = res.code;
                if (code != "1001") {
                    go('../order.html');// BASE_URL + '/order';
                    return false;
                } else {
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                    } else {
                        var json = JSON.parse(res.data);
                        onBridgeReady(json);
                    }
                }
            });
        },
        show:function () {
            this.showPackage = !this.showPackage;
            var that = this;
            var token = getData('TOKEN');
            var url = window.globalResURL + '/coupon/ajax_index?token=' + token;
            axios({
                method: 'POST',
                url: url
            }).then(function (res) {
                that.list = res.data.data;
            })

        },
        tiket: function () {
            var that = this;
            var token = getData('TOKEN');
            var url = window.globalResURL + '/coupon/ajax_index?token=' + token;
            axios({
                method: 'POST',
                url: url
            }).then(function (res) {
                that.length = res.data.data.length;
                that.title = '有' + res.data.data.length + '张可用优惠券';
            })
        }
    },
    mounted() {
        var that = this;
        // 获取当前产品ID
        var thisId = getParam('id');
        var carid = getParam('cart_id');
        var product_id = getParam('product_id');
        var num = 0;
        that.productID = carid;
        var allMoney = 0;
        ajaxPost(window.globalResURL + "/pay/add_order", { cart_ids: carid }, function (result) {
            that.list = result.data.product;
            for (i = 0; i < that.list.length; i++) {
                allMoney += that.list[i].share_price * that.list[i].num;
            }
            that.product_price = allMoney;
            var coupon = '';
            var address = result.data.userAddress;
            if (address) {
                that.addressInfo = address;
            }
        });
        console.log('调试计次：12')
    }
});


function onBridgeReady(sdkConfig) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', sdkConfig,
        function (res) {
            go('../order.html');
        }
    );
}
