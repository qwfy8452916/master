var refunid=getParam('id');
var app=new Vue({
    el:"#app",
    data:{
      list:{}
    },
    mounted(){
        var that=this;
        that.getData();
    },
    methods:{
      // 获取数据
      getData: function () {
        var that = this;
        var token = getData('TOKEN');
        var url = window.globalResURL + '/order/refund_detail?token=' + token;
        var params = new URLSearchParams();
        params.append('id', refunid);
        axios({
            method: 'POST',
            url: url,
            data: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (res) {
           if(res.data.code='1001'){
               that.list=res.data.data;
           }
        }).catch(err => {
            console.log(err)
        });
    },
    }
})