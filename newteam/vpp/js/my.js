

var app = new Vue({
	el: '#app',
	data: {
		isLevip: true,
		isInternal: false,
		userInfo:{

		},
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
                isActive: false,
                url: 'shopcar.html'
            },
            {
                icon: 'icon-wode',
                name: '我的',
                isActive: true,
                url: 'my.html'
            }
        ]
	},
	methods: {
		// 我的余额
		gotoMoney: function(){
			go('my/money.html');
		},

		// 我的优惠券
		gotoCoupon: function(){
			go('my/coupon.html');
		},
		//我的收藏
        goCollect:function () {
			go('my/collect.html');
        }

	},
	mounted(){
		var that = this;
        $.ajax({
            type: "GET",
            url:window.globalResURL+"/user/get_info",
            // header: {
            // 'content-type': 'application/x-www-form-urlencoded'
            // },
            success:function (data) {
                console.log(data);
                that.userInfo = data.data;
            }
        });
	}
})

// 菜单
$(function(){
	var menuOne = $(".menuOne").find(".menuItem");
	menuOne.on('click',function(){
		var menuIndex = $(this).index();
		switch(menuIndex){
			case 0:
				break;
			case 1:
				go('order.html?source=my');
				break;
			case 2:
				go('my/address.html?ischeck=1');
				break;
			case 3:
				go('my/charges.html');
				break;
			default:
				break;
		}
	})
	var menuTwo = $(".menuTwo").find(".menuItem");
	menuTwo.on('click',function(){
		var menuIndex = $(this).index();
		switch(menuIndex){
			case 0:
				go('my/distribution.html');
				break;
			case 1:
				go('my/employees.html');
				break;
			default:
				break;
		}
	})
})
