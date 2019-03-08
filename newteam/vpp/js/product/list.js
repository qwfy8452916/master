var tokenUrl = "?token="+ getData('TOKEN');

$(function(){
	var nav = $(".listHead").find("a");
	nav.on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
});

var app = new Vue({
	el: '#app',
	data: {
		list: [],
        keywords:''
	},
	methods: {
		//详情页
        toBuy: function(id){
            go('../product/detail.html?id=' + id);
        },
        sort:function(price,order){
            var that=this;
            ajaxPost(window.globalResURL + "/product/ajax_list",{
                // cat_id: 8
                sort:price,  //price
                order:order
            },function (data) {
                console.log(data);
                that.list = data.data.map(function (item) {
                    // item.logo = window.globalImgURL + item.logo;
                    return item
                });
                // that.userInfo = data.data;
            });
        },
        sortPrice:function () {
            this.sort('cx_price',0);
        },
        sortOrigin:function () {
            this.sort('id',1);
        },
        sortBuy:function(){
            this.sort('pay_num',0);
        },
        // 搜索
        searchGoods:function () {
            var that=this;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/product/ajax_list",
                data: {
                    // cat_id: 8
                    keyword: that.keywords
                },
                success:function (data) {
                    console.log(data);
                   that.list=data.data;
                }
            });
        }
	},
	mounted(){
        this.sort('id',1);
	}
});
