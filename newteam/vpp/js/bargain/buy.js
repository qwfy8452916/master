var bargain_id = getParam('bargain_id') ? getParam('bargain_id') : 0;
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
        money:0 ,
        length:'',
        title:'',
        couponid:'',
        final_price:0
    },
    watch: {
        status(value, oldvalue) {
            console.log(value);
            var that = this;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/order",
                data: {
                    status: value
                },
                success: function (data) {
                    console.log(data);
                    var allList = data.data;
                    if (JSON.stringify(allList).length > 5) {
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
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/pay/wx_pay",
                data: {
                    activity_id: product.id,
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
                    coupon_receive_id:that.couponid,  //优惠券ID
                    order_alias: 'bargain',
                    bargain_id: bargain_id,
                    order_type: order_type
                },
                success: function (res) {
                    var code = res.code;
                    var msg = res.msg;
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
                }, error: function () {
                    console.log('error');
                }
            });
        },
        show: function () {
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
        tiket:function(){
            var that = this;
            var token = getData('TOKEN');
            var url = window.globalResURL + '/coupon/ajax_index?token=' + token;
            axios({
                method: 'POST',
                url: url
            }).then(function (res) {
                that.length=res.data.data.length;
                that.title='有'+res.data.data.length+'张可用优惠券';
            })
        }
    },
    mounted() {
        var that = this;
        // 获取当前产品ID
        var thisId = getParam('id');
        var bargain_id = getParam('bargain_id') ? getParam('bargain_id'): 0;
        var num    = getParam('num') ? getParam('num') : 1;
        that.productID = thisId;
        $.ajax({
            type: "POST",
            url: window.globalResURL + "/pay/activity_buy",
            dataType:'json',
            data: {
                activity_id: thisId,
                bargain_id: bargain_id,
                category: 'bargain'
            },
            success: function (result) {
                console.log(result);
                that.productInfo = result.data.activity;
                that.final_price=result.data.activity.product_price;
                var coupon = '';
                var address = result.data.userAddress;
                if (address) {
                    that.addressInfo = address;
                }
                that.productInfo.num = num;
                that.productInfo.is_address = that.productInfo.is_address;
            }
        });

        this.tiket();
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