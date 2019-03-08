var app = new Vue({
	el: '#app',
	data: {

	},
	methods: {
		// 分享
		paySuccessShare: function(id){
			console.log('分享的ID是：' + id);
		},

		// 查看订单
		viewOrder: function(id){
			go('../order.html');
		}
	},
	mounted(){
		var that = this;
	}
})

