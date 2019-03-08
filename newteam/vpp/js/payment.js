var activeID = getParam('activeid');
var gearID   = getParam('id');
var index    = getParam('index');
var vm = new Vue({
    el: '#app',
    data: {
        activeID: '',
        list:{},
        index:"",
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
                    console.log(11);
                    that.supportMoney = item.price;
                    that.totalMoney =  accAdd(Number(item.price),Number(that.customMoney));
                }
            })
        },goBuy:function(){
            go("../pay/crowd_order.html?id="+activeID+"&scale_id="+gearID);
        }
    },
    mounted(){
        var that=this;
        that.mySelect = index;
        ajaxPost(window.globalResURL + "/pay/activity_buy",{
            activity_id:activeID,
            category:'crowdfunding',
            scale_id:gearID
        },function(result){
            if(result.code == 1001){
                var activity = result.data.activity;
                that.list     = result.data;
                that.activity = activity;
            }
        });

        ajaxPost(window.globalResURL + "/activity/crowdfunding_stalls",{activity_id:activeID},function(result){
            if(result.code == 1001){
                that.gearList = result.data;
                // console.log(that.gearList);
                result.data.map(function (item) {
                    if(item.id == index){
                        that.supportMoney = item.price;
                        that.totalMoney =  accAdd(Number(item.price),Number(that.customMoney));
                    }
                })
            }
        });
    }
});
