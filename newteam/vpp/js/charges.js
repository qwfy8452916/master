var app=new Vue({
    el:'#app',
    data:{
        list:[],
        price:0,
        money:0,
        user_id:''
    },
    mounted(){
        var that=this;
        var token = getData('TOKEN');
        var url = window.globalResURL + '/user/my_commission?token=' + token;
        axios({
            method: 'POST',
            url: url
        }).then(function(res){
            that.list=res.data.data.data;
            that.user_id = that.list[0].user_id 
            for (var i=0; i<that.list.length;i++)
            {
                var price=parseInt(that.list[i].money);
                that.price+=price;
                
            } 
        })
       
    },
    methods:{
        toDeposit:function(){
            go('../deposit/deposit.html');
            
        },
        toList:function(){
            go('../deposit/depositlist.html')
        }
    }
})