var app = new Vue({
	el: '#app',
	data: {

	},
	methods: {
		// 拆红包
		openRedPacket: function(id){
			go('open_red_packet.html?id=' + id);
		}
	},
	mounted(){
		var that = this;
	}
})

$(function(){
	var redPacketShareBox = $(".redPacketShareBox");
	redPacketShareBox.on('click',function(){
		$(this).addClass('hide');
		$(this).find("img.redPacketShow").attr("src","../../img/kai.png").css({'marginTop':'-10px','height':'75px'});
		$(this).find("img.redPacketUserIconShow").attr("src","../../img/userIcon.png").css('display','block');
		$(this).find("img.kaiqian").css('display','block');
		$(this).find("p").css('display','block');
		var a = $(this).find("p").text().split('');
		$(this).find("p").html(a.splice(0,2).join('') + '<br>' + a.join(''));
		$(this).removeClass('hide').addClass('show');
	});

})
