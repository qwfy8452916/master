
var app = new Vue({
	el: '#app',
	data: {
		id: 0
	},
	methods: {
		
	},
	mounted(){
		var that = this;
		
		// 获取当前产品ID
		var that = this;
		that.$data.id = getParam('id');
		
		// 初始化 swiper
		var mySwiper = new Swiper ('.swiper-container', {
			loop: true,
			autoplay: true,
			pagination: {
		      	el: '.swiper-pagination',
		    }
		})
	}
})