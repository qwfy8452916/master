var app = new Vue({
    el: '#app',
    data: {
        money: '',
        user_id: ''
    },
    mounted() {
        var that = this;
        ajaxGet(window.globalResURL + "/user/get_info",function(data){
            if(data.code ==1001){
                that.user_id = data.data.id;
            }
        })
    },
    methods: {
        apply: function () {
            var that = this;
            ajaxGet(window.globalResURL + "/pay/apply_withdraw",{user_id:that.user_id,money:that.money},function(result){
                alert(result.msg);
                if(result.code ==1001){
                    go('../deposit/depositsuccess.html');
                }

            })
            
        }

    }
})