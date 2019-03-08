// tab切换高亮
$(function(){
	var moneyTab = $(".moneyTab").find("a");
	moneyTab.on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
	})  
	
})

// APP
var app = new Vue({
	el: '#app',
	data: {
		list: [1,2,3,4],
		moneyProduct: true,
		moneyUser: false
	},
	methods: {
		
		// 切换tab
		moneyTab: function(e){
			var that = this;
			if( e.target.className != 'active'){
				if(that.$data.moneyProduct){
					that.$data.moneyProduct = false;
					that.$data.moneyUser = true;
				}else{
					that.$data.moneyProduct = true;
					that.$data.moneyUser = false
				}
			}
		},
		
		// 二维码
		showCode: function(){
			// 显示二维码弹窗
			layer.open({
				type: 1,
				title: false,
				closeBtn: false,
				shadeClose: true,
				scrollbar: false,
				content: '<img src="../img/qrcode.jpg" style="width: 150px; height: 150px; padding: 10px;"/>'
			});
		}
	},
	mounted(){
		var that = this;
	}
})
