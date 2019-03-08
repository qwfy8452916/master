var vm = new Vue({
    el: '#app',
    data: {
        tabs: ["综合", "销售","价格"],
        num: 0,
        shopNum:0,
        isActive:false,
        list: []
    },
    methods: {
        tab(index) {
            this.num = index;
        },
        addNum:function (id) {
            console.log(id);
            var that = this;
            var selectID = id;
            // this.isActive=true;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/user/ajax_add_cart",
                data: {
                    product_id: selectID
                },
                // header: {
                // 'content-type': 'application/x-www-form-urlencoded'
                // },
                success:function (data) {
                    console.log(data);
                }
            });
        },
        goDetail:function (id) {
            go("crowdDetail.html?id="+id);
        },
        toShopCar:function(){
            go("../shopcar.html");
        },
    },
    mounted(){
        var that=this;
        $.ajax({
            type: "POST",
            url: window.globalResURL + "/activity/index",
            data: {
                category:'crowdfunding'
            },
            success:function (data) {
                data = JSON.parse(data);
                if(data&&data.data){
                    that.list = data.data.list;
                }
            }
        });
    }
});
