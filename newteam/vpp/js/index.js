$(document).ready(function(){
	// 初始化变量
	var timeBuyBox = $(".timeBuy").find(".timeBuyBox"),
		closeTop   = $(".closeTop"),
		top        = $(".top"),
		search     = $(".search"),
		focus 	   = $(".focus");


	// 关闭顶部通知
	closeTop.on('click',function(){
		top.slideUp(200);
		search.stop().animate({top: 0},200);
	})

	// 显示关注商城二维码
	focus.on('click',function(){
		// 显示二维码弹窗
		layer.open({
			type: 1,
			title: false,
			closeBtn: false,
			shadeClose: true,
			scrollbar: false,
			content: '<img src="../img/qrcode.jpg" style="width: 150px; height: 150px; padding: 10px;"/>'
		});
	})


})


var app = new Vue({
	el: '#app',
	data: {
		slide: [
			{link: 'baidu.com', logo: '../img/banner1.jpg'},
			{link: 'sina.com.cn', logo: '../img/banner2.jpg'}
		],
		menu: [
			// 充值页面地址：addMoney/addMoney.html
			// {name: '充值', icon: '../img/menu1.png', link: 'javascript: alert("该功能暂未开放！")'},
			{name: '单位福利', icon: '../img/menu2.png', link: 'product/goodsList.html'},
			{name: '一砍到低', icon: '../img/menu3.png', link: 'bargain/index.html'},
			{name: '抢鲜众筹', icon: '../img/menu4.png', link: 'crowd/crowd.html'},
			// 红包页面地址：redPacket/redPacket.html
			{name: '红包', icon: '../img/menu5.png', link: 'redpacket/redpacket.html'},
			{name: '苏州味道', icon: '../img/menu6.png', link: 'product/list.html'},
			{name: '新疆特产', icon: '../img/menu7.png', link: 'product/list.html'},
			{name: '美味零食', icon: '../img/menu8.png', link: 'product/list.html'},
			// {name: '精美礼盒', icon: '../img/menu9.png', link: 'product/list.html'},
			{name: '时令鲜果', icon: '../img/menu10.png', link: 'product/list.html'}

		],
		ad: {
			img: '../img/xiangmanghui.png'
		},
		timeLess: [],
		hot: [],
		list: [],
		like: []
	},
	methods: {
		// 限时抢购
		timeBuy: function(id){
			go('activity/detail.html?id=' + id);
		},
		//菜单跳转
        toDetals: function(url){
			go(url)
		},
		// 特麦会
		temaihui: function(){
			go('temaihui.html');
		},

		// 领券中心
		coupon: function(){
			go('my/coupon.html');
		},

		// 产品列表
		showList: function(){
			go('product/list.html');
		},
		//点击搜索跳转到列表页
		goList:function(){
            go('product/list.html');
		},
		// 产品详情
		showProduct: function(id){
			go('product/detail.html?id=' + id);
		}
	},
	mounted: function(){
		var that = this;
		
		var mySwiper = new Swiper ('.swiper-container', {
			loop: true, // 循环模式选项
			// 如果需要分页器
			pagination: {
				el: '.swiper-pagination',
			}
		})
		
        $.ajax({
            type: "GET",
            url: window.globalResURL+"/index/home_data",
            // header: {
            // 'content-type': 'application/x-www-form-urlencoded'
            // },
            success:function (data) {
                data = JSON.parse(data);
                console.log(data);
                // that.slide = data.data.advert.map(function (item) {
					// item.logo = window.globalImgURL + item.logo;
					// return item
                // });
                //that.slide = data.data.advert;
                setData('da', JSON.stringify(data.data.qianggou));
                
                that.hot = data.data.zhunong;
                that.list = data.data.youxuan;
                that.like = data.data.xihuan;
                // Vue.set(app.slide, 'slide',slide)
            }
        });
		
		that.timeLess = JSON.parse(getData('da'));
        function timeRun(unix){
			var nowTime = parseInt(new Date().getTime()/1000);
			var remaining = parseInt(unix) - nowTime;
			// 处理时间戳，转换时间
			if(remaining > 0){
				var timeH = remaining/3600 < 10 ? '0' + parseInt(remaining/3600) : parseInt(remaining/3600);
				var timeM = remaining/60%60 < 10 ? '0' + parseInt(remaining/60%60) : parseInt(remaining/60%60);
				var timeS = remaining%60 < 10 ? '0' + remaining%60 : remaining%60;
			}else{
				var timeH = '00';
				var timeM = '00';
				var timeS = '00';
			}
			// 输出倒计时
			time = {
				h: timeH,
				m: timeM,
				s: timeS
			}
			return time;
		}
        function run(){
        	for(var i=0;i<that.timeLess.length; i++){
            	that.timeLess[i].time = timeRun(that.timeLess[i].end_time);
				setData('ss', JSON.stringify(that.timeLess));
            }
        	that.timeLess = JSON.parse(getData('ss'));
        	/**
        	 ** 关于上面这几行代码
        	 ** 我觉得，这里有必要写个注释
        	 ** 神奇的 that.timeLess
        	 ** 不要问我为什么这样写
        	 ** 因为我也不知道
        	 ** 但是
        	 ** 这样真的可以执行
        	 ** 
        	 */
        	setTimeout(run, 1000)
        }
        run();
        
        
                
        $.ajax({
            type: "GET",
            url: window.globalResURL + "/product/category",
            data: {
                // price: 50
            },
            // header: {
            // 'content-type': 'application/x-www-form-urlencoded'
            // },
            success:function (data) {
                // that.list = data.data.map(function (item) {
                // item.logo = window.globalImgURL + item.logo;
                // return item
                // });
                // that.userInfo = data.data;
            }
        });


	}

})
