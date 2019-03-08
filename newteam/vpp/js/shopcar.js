
var app = new Vue({
	el: '#app',
	data: {
	    showInvalid:false,
        isSelectAll:false,
        money:'',
		list: [],
        footerNavList: [
            {
                icon: 'icon-zhuye',
                name: '首页',
                isActive: false,
                url: 'index.html'
            },
            {
                icon: 'icon-dingdan1',
                name: '订单',
                isActive: false,
                url: 'order.html'
            },
            {
                icon: 'icon-gouwuche1',
                name: '购物车',
                isActive: true,
                url: 'shopcar.html'
            },
            {
                icon: 'icon-wode',
                name: '我的',
                isActive: false,
                url: 'my.html'
            }
        ]
	},
    watch:{
        list: {//深度监听，可监听到对象、数组的变化
            handler(value, oldVal){
                // console.log(value);
                var that = this;
                var money = 0;
                value.map(function (item) {
                    if(item.select){
                        money =accAdd(money,accMul(item.share_price,item.num));
                    }
                });
                that.money = money;
            },
            deep:true
        }
    },
	methods: {
	    //数量更改
	    addProduct:function(product,add){
	        var that = this;
	        var num ;
            if(add){
               num = Number(product.num )+ 1;
            }else {
                if(product.num == 1){
                    alert("该宝贝不能减少了哟")
                    return
                }else{
                    num = Number(product.num )-1;
                }
            }
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/user/ajax_update_cart",
                data: {
                    product_id: product.product_id,
                    num: num
                },
                // header: {
                // 'content-type': 'application/x-www-form-urlencoded'
                // },
                success:function (data) {
                    console.log(data);
                    that.list.map(function (item) {
                        if(item.id==product.id){
                           item.num = num;
                        }
                    });
                    // if(data&&data.data){
                    //     that.list = data.data.map(function (item) {
                    //         item.select = false;
                    //         return item
                    //     });
                    // }
                }
            });
        },
        //选择
        selectProduct:function (id) {
            this.list.map(function (item) {
                if(item.id==id){
                    if(item.select){
                        item.select = false;
                    }else {
                        item.select = true;
                    }
                }
            });
            var isNoAll = this.list.find(function (item) {
                return item.select == false
            });
            if(!isNoAll){
                this.isSelectAll = true;
            }else {
                this.isSelectAll = false;
            }
        },
        //全选
        selectAll:function () {
           if(!this.isSelectAll){
               this.list.map(function (item) {
                   item.select = true;
               });
               this.isSelectAll = true;
           }else {
               this.list.map(function (item) {
                   item.select = false;
               });
               this.isSelectAll = false;
           }
        },
        //添加订单
        addOrder:function () {
            var that = this;
            var idList = "";
            that.list.map(function (item) {
                if(item.select){
                    idList = idList + item.id +','
                    console.log(idList);
                }
            });
            idList = idList.slice(0,idList.length-1);
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/pay/add_order",
                data: {
                    cart_ids: idList
                },
                success:function (data) {
                    if(data&&data.data){
                        var nowOrderInfo = JSON.stringify(data.data);
                        window.localStorage.setItem("nowOrderInfo",nowOrderInfo);
                        window.location.href = './orderList/payinfo.html'
                        // window.location.href = './pay/orderBuy.html'
                    }
                }
            });
        },
        //删除购物车
        del:function(){
            var that=this;
            var idList = "";
            that.list.map(function (item) {
                if(item.select){
                    idList = idList + item.id +','
                    console.log(idList);
                }
            });
            idList = idList.slice(0,idList.length-1);
            ajaxPost(window.globalResURL + "/user/ajax_del_cart",{ids:idList},function(res){
               console.log(res); 
               if(res.code=1001){
                   alert("删除成功");
                   location.href = location.href;
               }  
            })
        }
	},
	mounted(){
		var that = this;
        $.ajax({
            type: "POST",
            url: window.globalResURL + "/user/shopping_cart",
            data: {
                // product_id: selectID
            },
            // header: {
            // 'content-type': 'application/x-www-form-urlencoded'
            // },
            success:function (data) {
                console.log(data);
                if(data&&data.data){
                    that.list = data.data.map(function (item) {
                        item.select = false;
                        return item
                    });
                }
            }
        });

	}
});
