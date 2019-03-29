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
            couponCount: ''
        },
        showPackage: false,
        list: [],
        searchIndex: '',
        money:0 ,
        length:'',
        title:'',
        couponid:''
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

        selectChange(index, item) {
            this.searchIndex = index;
            this.money = item.money;
            this.couponid = item.id;
            this.title = item.title;
        },
        noChange(index) {
            this.searchIndex = index;
            this.title = '不使用优惠券';
            var that = this;
            // 获取当前产品ID
            var thisId = getParam('id');
            var num = getParam('num');
            var type = getParam('type');
            that.productID = thisId;

            var addr_id = getParam('addr_id');
            var _data = { id: thisId, num: num };
            if (addr_id != null) {
                _data = { id: thisId, num: num, addr_id: addr_id };
            }
            // xu.
            $.ajax({
                type: "GET",
                url: window.globalResURL + "/thematic/add_order",
                data: _data,
                success: function (data) {
                    var p = JSON.parse(data).data.product;
                    var coupon = JSON.parse(data).data;
                    console.log(p.show_price)
                    that.money =0;
                }
            });
            // location.href = location.href;
        },
        buy: function () {
            var that = this;
            if (that.addressInfo.real_name == '') {
                alert('请填写地址');
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
                    product_id: that.productID,
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
                    order_alias: 'thematic',
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
        colseButton:function(){
            this.showPackage = !this.showPackage;
            this.getData();
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
        },
        getData:function(){
            var that = this;
            // 获取当前产品ID
            var thisId = getParam('id');
            var num = getParam('num');
            var type = getParam('type');
            that.productID = thisId;

            var addr_id = getParam('addr_id');
            var _data = { id: thisId, num: num };
            if (addr_id != null) {
                _data = { id: thisId, num: num, addr_id: addr_id };
            }
            // xu.
            $.ajax({
                type: "GET",
                url: window.globalResURL + "/thematic/add_order",
                data: _data,
                success: function (data) {
                    var p = JSON.parse(data).data.product;
                    var coupon = JSON.parse(data).data;
                    var address = JSON.parse(data).data.userAddress;
                    if (address) {
                        that.addressInfo = address;
                    }else{
                        that.addressInfo = '';
                    }
                    that.productInfo.logo = p.banner1;
                    that.productInfo.title = p.title;
                    that.productInfo.num = num;
                    that.productInfo.cx_price = p.show_price;
                    that.productInfo.is_address = p.is_address;
                    // that.productInfo.couponCount=coupon.couponCount;
                    // console.log(coupon.couponCount);

                }
            });
        }
    },
    mounted() {
        this.getData();
        this.tiket();
    }
});


function onBridgeReady(sdkConfig) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', sdkConfig,
        function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                go('../redpacket/fenxiao_packet.html');
            } else {
                go('../order.html');
            }
        }
    );
}
