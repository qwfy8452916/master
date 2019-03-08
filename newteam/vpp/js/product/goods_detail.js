
var app = new Vue({
	el: '#app',
	data: {
		showTime: false,
        productID: '',
		productInfo:{

		}

	},
	methods: {
		toBuy:function (id) {
            go('../pay/buy.html?id=' + id);
        }
	},
	mounted(){
		var that = this;
		// 获取当前产品ID
		var thisId = getParam('id');
		that.productID = thisId;
        // console.log(thisId);
        console.log('当前产品ID是：' + thisId);

		// 初始化 swiper
		var mySwiper = new Swiper ('.swiper-container', {
			loop: true,
			autoplay: false,
			pagination: {
		      	el: '.swiper-pagination',
		    }
		});
		ajaxGet(window.globalResURL + "/product/detail",{id: thisId},function(result){
			console.log(result);
			if(result.code ==1001){
                that.productInfo= result.data.product;
			}
		})
	}
});
