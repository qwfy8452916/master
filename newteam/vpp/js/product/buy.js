
function getParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var search = decodeURIComponent(window.location.search);
    var r = search.substr(1).match(reg);
    // console.log(r);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
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
        couponid:''
    },
    watch: {
        status(value, oldvalue) {
            console.log(value);
            var that = this;
            ajaxPost(window.globalResURL + "/order",{status: value},function(result){
                console.log(data);
                if(result.code == 1001){
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
            ajaxPost(window.globalResURL + "/pay/wx_pay",{
                product_id: product.id,
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
                order_alias: 'product',
                order_type: order_type
            },function(res){
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
                        onBridgeReady(res.data);
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
        that.productID = thisId;
        ajaxGet(window.globalResURL + "/product/show_order",{id: thisId},function(result){
            console.log(result);
            var p = result.data.product;
            var coupon = '';
            var address = result.data.userAddress;
            if (address) {
                that.addressInfo = address;
            }
            that.productInfo = p;
            that.productInfo.num = p.num;
            that.productInfo.cx_price = p.pt_price;
            that.productInfo.is_address = p.is_address;
        });
        //this.tiket();
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
