// JavaScript Document

$(function(){

	//手风琴效果
	$(".gl-box-left ul li").each(function(){
		var fold = $(this).find(".fold");
		if(fold.is(":hidden")){
			$(this).width(820);
		}else{
			$(this).width(70);
		}
	});

	$(".gl-box-left ul li").click(function(){
		var li_index = $(this).index();
		$(this).animate({width:820},200);
		$(this).find(".unfold").show();
		$(this).find(".fold").hide();
		$(this).siblings().animate({width:70},200);
		$(this).siblings().find(".unfold").hide();
		$(this).siblings().find(".fold").show();
	});

})
