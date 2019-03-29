var app =new Vue({
	el: "#app",
	data: {
		currentNum: '',
		musictype: '',
		namevalue: '',
		telvalue: '',
		remarkvalue: '',
		remarks_hidden: '',
		swiper_type1: '',
		swiper_type2: '',
		swiper_type3: '',
		swiper_type4: '',
		swiper_type5: '',
		swiper_type6: '',
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

			var winHeight = $(window).height(); //获取当前页面高度
			$(window).resize(function() {
				var thisHeight = $(this).height();
				if (winHeight - thisHeight > 50) {
					$('body').css('height', winHeight + 'px');
				} else {
					$('body').css('height', '100%');
		// 			setTimeout(function() {
		//                 var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
		//                 window.scrollTo(0, Math.max(scrollHeight - 1, 0));
		//          }, 100);
					// $("html,body").animate({scrollTop: document.documentElement.clientHeight},500);
					window.scroll(0,0);
					setTimeout(function(){
						window.scrollTo(0, 0)
					},100)
				}
			});
			
			this.getSwiper();
		},
		Iosback(){
			// setTimeout(function() {
            //     var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            //     window.scrollTo(0, Math.max(scrollHeight - 1, 0));
			// }, 100);
			// $("html,body").animate({scrollTop: document.documentElement.clientHeight},500);
			window.scroll(0,0);
			setTimeout(function(){
				window.scrollTo(0, 0)
			},100)
		},
		getSwiper(){
			var that = this;
			var mySwiper = new Swiper ('.swiper-container', {
				direction: 'vertical', // 垂直切换选项
				loop: false, // 循环模式选项
				autoplay: false,//可选选项，自动滑动
				on: {
					slideChangeTransitionStart: function(){
					  var ActiveIndex = this.activeIndex;
						switch (ActiveIndex) {
							case 0: 
								that.swiper_type1 = true;
								that.swiper_type2 = false;
								that.swiper_type3 = false;
								that.swiper_type4 = false;
								that.swiper_type5 = false;
								that.swiper_type6 = false;
							;break;
							case 1: 
								that.swiper_type1 = false;
								that.swiper_type2 = true;
								that.swiper_type3 = false;
								that.swiper_type4 = false;
								that.swiper_type5 = false;
								that.swiper_type6 = false;
							; break;
							case 2: 
								that.swiper_type1 = false;
								that.swiper_type2 = false;
								that.swiper_type3 = true;
								that.swiper_type4 = false;
								that.swiper_type5 = false;
								that.swiper_type6 = false;
							; break;
							case 3: 
								that.swiper_type1 = false;
								that.swiper_type2 = false;
								that.swiper_type3 = false;
								that.swiper_type4 = true;
								that.swiper_type5 = false;
								that.swiper_type6 = false;
							; break;
							case 4: 
								that.swiper_type1 = false;
								that.swiper_type2 = false;
								that.swiper_type3 = false;
								that.swiper_type4 = false;
								that.swiper_type5 = true;
								that.swiper_type6 = false;
							; break;
							case 5: 
								that.swiper_type1 = false;
								that.swiper_type2 = false;
								that.swiper_type3 = false;
								that.swiper_type4 = false;
								that.swiper_type5 = false;
								that.swiper_type6 = true;
							; break;
						}
					},
				},
			}); 
			that.currentNum = '0';
			that.musictype = true;
			that.remarks_hidden = true,
			that.swiper_type1 = true;
			that.swiper_type2 = false;
			that.swiper_type3 = false;
			that.swiper_type4 = false;
			that.swiper_type5 = false;
			that.swiper_type6 = false;
			mySwiper.slideTo(that.currentNum, 1000, false);
			var audio = document.querySelector('#audio_player');
			document.addEventListener('DOMContentLoaded', function () {
				function audioAutoPlay() {
					audio.play();
					document.addEventListener("WeixinJSBridgeReady", function () {
						audio.play();
					}, false);
				}
				audioAutoPlay();
			});
		},
		textshow(){
			this.remarks_hidden= false;
		},
		music_stop(){
			var audio = document.querySelector('#audio_player');
			if(this.musictype){
				this.musictype = false;
				audio.pause();
			}else{
				this.musictype = true;
				audio.play();
			}
		},
		checkForm(){
			var that = this;
			var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			console.log(that.namevalue,that.telvalue,that.remarkvalue);
			if(that.namevalue == ""){
				alert("请填写姓名");
				return false;
			}else if(that.telvalue == ""){
				alert("请填写联系电话");
				return false;
			}else if(!reg.test(that.telvalue)){
				alert("请填写正确的联系电话");
				return false;
			}else if(that.remarkvalue == ""){
				alert("请填写留言");
				return false;
			}else{
				var axiosurl = window.globalResURL;
				var token = getData('TOKEN');
				var params = new URLSearchParams();
				params.append('real_name', that.namevalue);
				params.append('mobile', that.telvalue);
				params.append('remark', that.remarkvalue);
				params.append('token', token);
				axios({
					method: 'post',
					url: window.globalResURL +'/user/recruit_save?token=' + token,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params,
				}).then(function(res){
					if(res.data.code==1001){
						alert(res.data.msg);
						window.location.reload();
					}else{
						console.log(res.data.msg);
					}
				})
			}
			
		}
	},
	mounted: function () {
		this.init();
	},

});