$(function(){
    $(".imgBox").on('click',function(){
        $("this").css("background-color","red");
    })
})

var app = new Vue({
    el: '#app',
    data: {

    },
    methods: {

        // 我的余额
        gotoMoney: function(){
            go('my/money.html');
        },

        // 我的优惠券
        gotoCoupon: function(){
            go('my/coupon.html');
        }
    },
    mounted(){
        var that = this;
        $.ajax({
            type: "GET",
            url: window.globalResURL + "/recharge/wx_pay",
            data: {
                price: 50
            },
            // header: {
            // 'content-type': 'application/x-www-form-urlencoded'
            // },
            success:function (data) {
                console.log(data);
                that.userInfo = data.data;
            }
        });
    }
})
