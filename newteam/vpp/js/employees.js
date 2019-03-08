var app = new Vue({
	el: '#app',
	data: {
		dateNum: 31,
		yearSSS: 2018,
		monthSSS: 1
	},
	methods: {
		choseTime: function(type){
			
		}
	},
	mounted(){

	}
})

$(function(){
	tab($(".taskTab"),'a');
	
	// 展示二维码函数
	function showCode(imgName){
		layer.open({
			type: 1,
			title: false,
			closeBtn: false,
			shadeClose: true,
			scrollbar: false,
			content: '<img src="../img/' + imgName + '.jpg" style="width: 150px; height: 150px; padding: 10px;"/>'
		});
	}
	
	// 显示关注商城二维码
	var focus = $(".focus");
	focus.on('click',function(){
		showCode('qrcode');
	})
	
	// 发展分销者二维码
	var distributioner = $(".distributioner");
	distributioner.on('click',function(){
		showCode('qrcode');
	})
	
	// 发展会员二维码
	var viper = $(".viper");
	viper.on('click',function(){
		showCode('qrcode');
	})
	
	var timerYear = $(".timerYear");
	timerYear.animate({scrollTop: 2600},0);
	var timerMonth = $(".timerMonth");
	timerMonth.animate({scrollTop: 360},0);
	var timerDate = $(".timerDate");
	timerDate.animate({scrollTop: 1120},0);
	function scrollFixed(obj,type){
		
		obj.on('touchend',function(ojb){
			var top = obj[0].scrollTop;
			if(top%40){
				if(top%40 >= 20){
					obj.stop().animate({scrollTop: top + 40 - top%40},50);
				}else{
					obj.stop().animate({scrollTop: parseInt(top/40)*40},50);
				}
			}
			// scroll事件放到 touchend里面，防止抖动
			obj.scroll(function(){
				var top = obj[0].scrollTop;
				if(top%40){
					if(top%40 >= 20){
						obj.stop().animate({scrollTop: top + 40 - top%40},50);
					}else{
						obj.stop().animate({scrollTop: parseInt(top/40)*40},50);
					}
				}else{
					if(type == 'year'){ // 年
						var yearNum = top/40 + 3 + 1950;
						if(yearNum%4){
							var yearRun = false;
						}else{
							var yearRun = true;
						}
						console.log('年：' + yearNum, '闰年：' + yearRun);
						app.$data.yearSSS = yearNum;
					}else if(type == 'month'){ // 月
						var monthNum = top/40 + 3 - 11;
						if(monthNum <= 0){
							monthNum = 12 - Math.abs(monthNum);
							timerMonth.animate({scrollTop: 320 + monthNum*40},0);
						}else if(monthNum > 12){
							monthNum = monthNum - 12;
							timerMonth.animate({scrollTop: 320 + monthNum*40},0);
						}
						
						if(monthNum == 1 || monthNum == 3 || monthNum == 5 || monthNum == 7 || monthNum == 8 ||monthNum == 10 ||monthNum == 12){
							app.$data.dateNum = 31;
						}else if(monthNum == 2){
							if(yearRun){
								app.$data.dateNum = 29;
							}else{
								app.$data.dateNum = 28;
							}
						}else{
							app.$data.dateNum = 30;
						}
						console.log('月：' + monthNum);
						
						app.$data.monthSSS = monthNum;
					}else{  // 日
						console.log('date')
					}
					obj.unbind('scroll');
				}
			})
		})
	}
	scrollFixed(timerYear,'year');
	scrollFixed(timerMonth,'month');
	scrollFixed(timerDate,'date');
	
	
	

})

	

