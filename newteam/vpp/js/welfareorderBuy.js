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
        productID: '',
        productInfo: {
            logo: '',
            title: '',
            num: 0,
            cx_price: '',
            is_address: 0,
            couponCount: '',
            is_address:1
        },
        showPackage: false,
        list: [],

        select: 0,
        searchindex: 0,
        money:0 ,
        length:'',
        title:'',
        couponid:'',
        activityInfo:{

        },
        userAddress:{
            real_name: '',
            mobile: '',
            province: '',
            city: '',
            area: '',
            address: ''
        },
        couponid:'',
        productInfo:{}
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
            if (that.userAddress.real_name == '') {
                alert('请填写地址');
                return false;
            }
            if (that.userAddress.mobile == '') {
                alert('请填写手机号');
                return false;
            }
            var address = that.userAddress;
            var product = that.productInfo;
            var order_type = (product.is_address == 0) ? 2 : 1;
            ajaxPost(window.globalResURL + "/pay/wx_pay",{
                    activity_id: that.productID,
                    consignee: address.real_name,
                    mobile: address.mobile,
                    province: address.province,
                    city: address.city,
                    area: address.area,
                    address: address.address,
                    pay_type: "wechat",
                    num: 1,
                    wl_price: that.selectDeliverType ? '0' : '20',
                    order_type: that.isDeliver,   //1 配送 2 自提
                    coupon_receive_id:that.couponid,  //优惠券ID
                    order_alias: 'companywelfare',
                    order_type: order_type
                },function(res){
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

        }
    },
    mounted() {
        var that = this;
        // 获取当前产品ID
        var thisId = getParam('id');
        that.productID = thisId;
        var addr_id = getParam('addr_id');
        var _data   = { activity_id: thisId, category: 'companywelfare' };
        if (addr_id != null) {
            _data = { activity_id: thisId, category: 'companywelfare',addr_id: addr_id};
        }

        ajaxPost(window.globalResURL + "/pay/activity_buy",
            _data,function(res){
                if(res.code ==1001){
                    that.activityInfo = res.data.activity.product;
                    that.productInfo=res.data.activity;
                    var address = res.data.userAddress;
                    if (address) {
                        that.userAddress = address;
                    }
                }
            }
        );
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
