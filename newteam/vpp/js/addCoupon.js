var app = new Vue({
    el: '#app',
    data: {
        list:[]
    },
    methods: {

        // 我的余额
        gotoMoney: function(){
            go('my/money.html');
        },

        receive: function (id) {
            console.log(id);
        }
    },
    mounted(){
        var that = this;
        $.ajax({
            type: "GET",
            url: window.globalResURL + "/coupon/lists",
            data: {
                // price: 50
            },
            // header: {
            // 'content-type': 'application/x-www-form-urlencoded'
            // },
            success:function (data) {
                console.log(data);
                data = JSON.parse(data);
                if(data && data.data && data.data.list){
                    that.list = data.data.list.map(function (item) {
                        item.money = Math.floor(item.money);
                        return item
                    });
                }
                // that.list = data.data.list;
            }
        });
    }
})

//  is_use  1 未使用
