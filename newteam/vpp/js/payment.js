var activeID = getParam('id');
var scaleID   = getParam('scale_id');
var vm = new Vue({
    el: '#app',
    data: {
        activeID: '',
        list:{},
        scale_id:"",
        activity:{},
        selectList:{},
        gearList:[],
        supportMoney:'', //档位价格
        customMoney:'', //自定义价格
        totalMoney:'', //总价
        mySelect:'',
        isSelect:false
    },
    watch:{
        supportMoney(value,oldvalue){
            console.log(value);
            this.totalMoney =  accAdd( Number(value), Number(this.customMoney));
        },
        customMoney(val,oldval){
            var that = this;
            this.totalMoney =  accAdd( Number(val), Number(that.supportMoney));
        }
    },
    methods: {
        select:function () {
            this.isSelect=!this.isSelect;
        },
        getMySelected:function () {
            console.log(this.mySelect);
            var that = this;
            this.gearList.map(function (item) {
                if(item.id == that.mySelect){
                    that.supportMoney = item.price;
                    that.totalMoney =  accAdd(Number(item.price),Number(that.customMoney));
                }
            })
        },goBuy:function(){
            go("../pay/crowd_order.html?id="+activeID+"&scale_id="+this.mySelect);
        }
    },
    mounted(){
        var that=this;
        that.mySelect = scaleID;
        ajaxPost(window.globalResURL + "/pay/activity_buy",{
            activity_id:activeID,
            category:'crowdfunding',
            scale_id:scaleID
        },function(result){
            if(result.code == 1001){
                var activity = result.data.activity;
                that.list     = result.data;
                that.activity = activity;
            }
        });

        ajaxPost(window.globalResURL + "/activity/crowdfunding_stalls",{
            activity_id:activeID,
            scale_id:scaleID
        },function(result){
            if(result.code == 1001){
                that.gearList = result.data;
                // console.log(that.gearList);
                result.data.map(function (item) {
                    if(item.id == scaleID){
                        that.supportMoney = item.price;
                        that.totalMoney =  accAdd(Number(item.price),Number(that.customMoney));
                    }
                })
            }
        });
    }
});
