var app =new Vue({
	el: "#app",
	data: {		
		url: '',
		username: '',
		head_img: '',
	},
	methods: {
		init(){
			var rootHtml = $(":root");
			var rootResize = function (){
			var fontSize =$(window).width()<640?$(window).width()/16:40;
				rootHtml.css("font-size",fontSize);	
			}
			rootResize();
			$(window).resize(function (){
				rootResize();	
			});			
			this.url = window.globalResURL;
			this.getUserInfo();
		},
		getUserInfo(){
			var that = this;
			var token = getData('TOKEN');
			axios({
				method: 'post',
				url: that.url + '/user/get_info?token=' + token,
			}).then(function(res){
				if(res.data.code==1001){
					that.username = res.data.data.username;
					that.head_img = res.data.data.head_img;
					console.log(that.username,that.head_img);
				}else{
					console.log(res.data.data.msg);
				}
			}).catch(function(error){
				console.log(error.data.msg);
			});
		}
	},
	mounted: function () {
		this.init();
	},

});