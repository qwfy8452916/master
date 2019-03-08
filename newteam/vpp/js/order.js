
var app = new Vue({
    el: '#app',
    data: {
        selectState: 1,
        showTip: false,
        tipInfo: '',
        showRemoveOrder: false,
        sureHaveSuccess: false,
        showWuLiu: false,
        isLevip: true,
        showNothing: false,
        isInternal: false,
        orderState: 0,
        status: '1',
        allList: [],
        typeList: {
            'thematic': '专题活动',
            'product': '普通订单',
            'activity': '活动',
            'crowdfunding': '众筹',
            'activity_share': '活动分享',
            'distribution': '转发购买',
            'bargain': '砍价订单'
        },
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
                isActive: true,
                url: 'order.html'
            },
            {
                icon: 'icon-gouwuche1',
                name: '购物车',
                isActive: false,
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
        status(value, oldvalue) {
            console.log(value);
            var that = this;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/order",
                data: {
                    type: 'API',
                    status: value
                },
                // header: {
                // 'content-type': 'application/x-www-form-urlencoded'
                // },
                success: function (data) {
                    console.log(data);
                    var allList = data.data;
                    if (JSON.stringify(allList).length > 5) {
                        that.showNothing = true;
                    }
                    that.allList = allList;
                    // that.list = data.data.map(function (item) {
                    // item.logo = window.globalImgURL + item.logo;
                    // return item
                    // });
                    // var allList = data.data.list;
                    // var seeLsit = that.seeList;
                    // that.allList = allList;
                    // if(allList.length>0){
                    //     allList.map(function (item) {
                    //     	if(!seeLsit[item.order_alias]){
                    //             seeLsit[item.order_alias]=[];
                    // 		}
                    //         seeLsit[item.order_alias].push(item);
                    //     })
                    // }
                    // console.log(that.seeList);
                }
            });
        }
    },
    methods: {
        //金额计算
        getAllMoney: function (list) {
            var money = 0;
            if (list) {
                list.map(function (item) {
                    var price = (item.orderInfo[0].prepay >0) ? item.orderInfo[0].prepay : item.orderInfo[0].product_money;
                    money = accAdd(money, accMul(price, item.orderInfo[0].num));
                })
            }
            return money;
        },
        detail: function (id) {
            go('./pay/orderDetail.html?id=' + id);
        },
        //查看物流
        lookLogistics: function (product) {
            // console.log(product);
            var that = this;
            // var wuliuInfo = product.orderInfo[0];
            // if(wuliuInfo.deliver_no == ""){
            that.showTip = true;
            that.tipInfo = '暂无物流信息';
            // }else {
            //     $.ajax({
            //         type: "POST",
            //         url: window.globalResURL + "/user/get_tracking",
            //         data: {
            //             company: wuliuInfo.deliver_company,
            //             deliver_no: wuliuInfo.deliver_no
            //         },
            //         success:function (data) {
            //             console.log(data);
            //             that.list = data.data.map(function (item) {
            //             item.logo = window.globalImgURL + item.logo;
            //             return item
            //             });
            // }
            // });
            // }
        },
        //确认收货
        confirmReceipt: function (product) {
            var that = this;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/order/confirm_receipt",
                data: {
                    info_id: product.orderInfo[0].id
                },
                success: function (data) {
                    // console.log(data);
                    data = JSON.parse(data);
                    // if(data.code = '1001'){
                    that.showTip = true;
                    that.tipInfo = data.msg;
                    that.status = 4;
                    // }
                }
            });
        },
        //提醒发货
        remind: function (product) {
            var that = this;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/order/confirm_receipt",
                data: {
                    // info_id: product.orderInfo[0].id
                    info_id: product.id
                },
                success: function (data) {
                    // console.log(data);
                    data = JSON.parse(data);
                    // if(data.code = '1001'){
                    that.showTip = true;
                    that.tipInfo = data.msg;
                    // that.status = 4;
                    // }
                }
            });
        }
    },
    mounted() {
        var that = this;
        $.ajax({
            type: "POST",
            url: window.globalResURL + "/order",
            data: {
                type: 'API',
                status: 1
            },
            success: function (data) {
                var allList = data.data;
                if (JSON.stringify(allList).length > 5) {
                    that.showNothing = true;
                }
                that.allList = allList;
            }
        });
    }
});
