var orderinfoid=getParam('order_info_id');
var app=new Vue({
    el:"#app",
    data:{
      list:{}
    },
    mounted(){
        var that=this;
        this.getData();
    },
    methods:{
        // 获取数据
        getData: function () {
            var that = this;
            var token = getData('TOKEN');
            var url = window.globalResURL + '/order/refund_page?token=' + token;
            var params = new URLSearchParams();
            params.append('order_info_id', orderinfoid);
            axios({
                method: 'POST',
                url: url,
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (res) {
                if(res.data.code='1001'){
                    that.list = res.data.data;
                }
            }).catch(err => {
                console.log(err)
            });
        },
        // 仅退款跳转
        goDraw:function(){
            go('only_draw.html?order_info_id='+orderinfoid);
        },
        // 退货退款跳转
        goDrawgoods:function(){
            go('draw_goods.html?order_info_id='+orderinfoid);
        },
        // 换货
        goExchange:function(){
            go('exchange_goods.html?order_info_id='+orderinfoid);
        }
    }
})