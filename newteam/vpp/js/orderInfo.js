
var app = new Vue({
    el: '#app',
    data: {
        showInvalid: false,
        isSelectAll: false,
        orderInfo: {},
        money: '',
        list: [],
        address: [],
        total:0
    },
    watch: {
        list: {//深度监听，可监听到对象、数组的变化
            handler(value, oldVal) {
                // console.log(value);
                var that = this;
                var money = 0;
                value.map(function (item) {
                    if (item.select) {
                        money = accAdd(money, accMul(item.share_price, item.num));
                        console.log(money);
                    }
                });
                that.money = money;
                // console.log(that.money);
            },
            deep: true
        }
    },
    methods: {
        goAddress: function () {
            go('../my/address.html')
            var that = this;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/user/address_list",
                success: function (data) {
                    console.log(data);
                    if (data && data.data) {
                        that.list = data.data.map(function (item) {
                            item.isSelect = item.is_default == '1' ? true : false;
                            return item
                        });
                    }
                }
            });
        },
        buy:function () {
            var that = this;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/pay/wx_pay",
                data: {
                    product_id: that.productID,
                    consignee: address.real_name,
                    mobile:address.mobile,
                    province: address.province,
                    city: address.city,
                    area: address.area,
                    address: address.address,
                    pay_type: "wechat",
                    num: '1',
                    wl_price: that.selectDeliverType?'20':'18',
                    order_type: that.isDeliver,   //1 配送 2 自提
                    coupon_receive_id: ''  //优惠券ID
                },
                success:function (data) {
                    console.log(data);
                    data = JSON.parse(data);
                    if(data.code == '1001'){
                        window.location.href = 'paySuccess.html';
                        // that.productInfo = data.data.product;
                    }
                }
            });
        }
    },
    mounted() {
        var that = this;
        var orderInfo = JSON.parse(getData("nowOrderInfo"));
        that.list = orderInfo.product;
        for (var i=0; i<that.list.length;i++)
        {
            console.log(that.list[i]);
            var price=that.list[i].share_price;
            var num=that.list[i].num;
            that.total+=price*num;
        }  
        that.address = orderInfo.userAddress;
        var address = JSON.parse(getData('selectAddress'));
        if (address) {
            that.address = address;
        }
    },


});
