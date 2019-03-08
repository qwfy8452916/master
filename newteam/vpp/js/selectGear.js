var activeID = getParam('id');
// console.log(activeID);
var vm = new Vue({
    el: '#app',
    data: {
        activeID: '',
        index : "",
        list:{}
    },
    methods: {
        selectGear:function (id) {
            that = this;
            console.log(id);
            var list = [];
            list =  this.list.map(function (item,index) {
                item.select = false;
                if(item.id==id){
                    item.select = true;
                    that.index = id;
                }
                return item;
            });
            this.list = list;
        },
        gopayment:function (id) {
            go("payment.html?id="+id + '&activeid='+activeID + '&index=' + this.index);
        }
    },
    mounted(){
        var that=this;
        that.activeID = activeID;
        $.ajax({
            type: "POST",
            url: window.globalResURL + "/activity/crowdfunding_stalls",
            data: {
                activity_id:activeID
            },
            success:function (data) {
                data = JSON.parse(data);
                if(data){
                    that.list = data.data;
                }
            }
        });
    }
});
