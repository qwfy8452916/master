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
        selectType:[
            '余额支付',
            '微信支付'
        ],
        searchIndex:0,
        title:'',
        showToast:false
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
                alert('请填写地址');
                return false;
            }
            if (that.addressInfo.mobile == '') {
                alert('请填写手机号');
                return false;
            }
            var address = that.addressInfo;
            var product = that.productInfo;
            that.showToast=true;
            var order_type = (product.is_address == 0) ? 2 : 1;
            if(that.searchIndex==0){
                alert(1);
            }else{
                alert(2);
                ajaxPost(window.globalResURL + "/pay/wx_pay",{
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
                    order_alias: 'activity',
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
            }
           
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
        },
        // 选择支付方式
        choose: function (item, index) {
            this.searchIndex = index;
            this.title = item;
        },
        // 取消
        cancel:function(){
            this.showToast=false;
        }

    },
    mounted() {
        var that = this;
        // 获取当前产品ID
        var thisId = getParam('id');
        var num    = getParam('num') ? getParam('num') : 1;
        that.productID = thisId;

        var addr_id = getParam('addr_id');
        var _data   = { activity_id: thisId, category: 'activity' };
        if (addr_id != null) {
            _data = { activity_id: thisId, category: 'activity',addr_id: addr_id};
        }

        ajaxPost(window.globalResURL + "/pay/activity_buy",_data,function(result){
            console.log(result);
            var activityInfo = result.data.activity;
            that.productInfo = activityInfo;
            var coupon = '';
            var address = result.data.userAddress;
            if (address) {
                that.addressInfo = address;
            }else{
                that.addressInfo = '';
            }
            that.productInfo.pt_price = activityInfo.price;
            that.productInfo.num = num;
            that.productInfo.is_address = that.productInfo.is_address;
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
