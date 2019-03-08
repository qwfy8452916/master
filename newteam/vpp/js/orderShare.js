//定义接口地址及图片地址
// window.globalResURL = "http://xinbingtuan.sevenlele.com";
// window.globalImgURL = "http://xinbingtuan.sevenlele.com";
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
        selectDeliverType:1,  //1 市内送  0 原产地送
        isDeliver: 1,    //配送 自提
        addressInfo: {
            real_name: '',
            mobile: '',
            province: '',
            city: '',
            area: '',
            address: ''
        },
        share:{
            id:0
        },
        productID:'',
        productInfo:{
            logo: '',
            title: '',
            num: 0,
            cx_price: '',
            is_address:0
        }
    },
    watch:{
        status(value,oldvalue){
            console.log(value);
            var that = this;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/order",
                data: {
                    status: value
                },
                success:function (data) {
                    console.log(data);
                    var allList = data.data;
                    if(JSON.stringify(allList).length>5){
                        that.showNothing = true;
                    }
                    that.allList = allList;
                }
            });
        }
    },
    methods: {
        toAddress:function () {
            go("../my/address.html");
            if (selectaddress) {
                that.address = selectaddress;
            }
        },
        buy:function () {
            var that = this;
            if(that.addressInfo.real_name == ''){
                alert('请填写姓名');
                return false;
            }
            if(that.addressInfo.mobile == ''){
                alert('请填写手机号');
                return false;
            }
            var address = that.addressInfo;
            var product = that.productInfo;
            var shareData = that.share;
            var order_type = (product.is_address ==0) ? 2 : 1;
            console.log(address);
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/pay/wx_pay",
                data: {
                    activity_share_id: shareData.id,
                    consignee: address.real_name,
                    mobile:address.mobile,
                    province: address.province,
                    city: address.city,
                    area: address.area,
                    address: address.address,
                    pay_type: "wechat",
                    num: product.num,
                    wl_price: that.selectDeliverType ? '0' :'20',
                    order_type: that.isDeliver,   //1 配送 2 自提
                    coupon_receive_id: '',  //优惠券ID
                    order_alias:'activity_share',
                    order_type:order_type
                },
                success:function(res){
                    var code = res.code;
                    var msg = res.msg;
                    if(code != "1001"){
                        go('../order.html');// BASE_URL + '/order';
                        return false;
                    }else {
                        if (typeof WeixinJSBridge == "undefined"){
                            if( document.addEventListener ){
                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                            }else if (document.attachEvent){
                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                            }
                        }else{
                            var json = JSON.parse(res.data);
                            onBridgeReady(json);
                        }
                    }
                },error:function(){
                    console.log('error');
                }
            });
        }
    },
    mounted(){

        console.log('第2次刷新')
        var that = this;
        // 获取当前产品ID
        var thisId = getParam('id');
        var num    = getParam('num');
        //var type   = getParam('type');
        that.productID = thisId;

        $.ajax({
            type: "GET",
            dataType:'json',
            url: window.globalResURL + "/activityshare/order?id=" + thisId + '&num=' + num,
            success:function (res) {
                if(res.code ==1001){
                    var p = res.data.product;
                    that.productInfo.logo = p.product_img;
                    that.productInfo.title = p.title;
                    that.productInfo.num = num;
                    that.productInfo.cx_price = p.show_price;
                    that.productInfo.is_address = p.is_address;
                    that.share = res.data.share;
                }else{
                    alert('数据获取失败！');
                }
            }
        });

        $.ajax({
            type: "POST",
            dataType:'json',
            url: window.globalResURL + "/user/address_list",
            success:function (data) {
                that.addressInfo.real_name = data.data[0].real_name;
                that.addressInfo.mobile = data.data[0].mobile;
                that.addressInfo.province = data.data[0].province;
                that.addressInfo.city = data.data[0].city;
                that.addressInfo.area = data.data[0].area;
                that.addressInfo.address = data.data[0].address;
            }
        });

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
