// 收藏
$(function(){
	var $collectBtn = $("button[data-type='collect']"),
		$collectsBox = $("#collects"),
		status = 1, 
		cfn = null;
	$collectBtn.on('click',function(event){
		event.preventDefault();
		var _this = this;
		status = $(this).attr("data-collect-status");
		if( status == 1 ){
			$("span[data-type='signin-btn']").trigger("click");
			return;
		}else if( status == 2 || status == 3 ){ // 提交收藏
			cfn = function(res) {
				var currentSize = parseInt($collectsBox.text());
                if( res.status == 9){
                    layer.msg("收藏成功",{time:2000});
                    $(_this).text("已收藏");
                    $collectsBox.text(currentSize+1);
                }else if( res.status == 10){
                    layer.msg("取消收藏成功",{time:2000});
                   $(_this).text("收藏");
                    $collectsBox.text(currentSize-1);
                }
            }
		}
		ajaxAction({
            url : Global_Collect_Url,
            method : "post",
            data : {
                code : $(this).attr("data-code")
            },
            successCallback : function(res) {
                cfn.call(_this,res);
            }
        });
	})
})

// 评分
$(function(){
	var $evaluateBtn = $("div[data-type='evaluate']"),
		$evaluateStarBox = $("div[data-type='evaluate-star']"),
		$evaluateSubmit = $("div[data-type='evaluate-submit']");

	$evaluateBtn.on("click",function(event){
		event.stopPropagation();
		var status = $(this).attr("data-status");
        if( status == 1 ){
            $("span[data-type='signin-btn']").trigger("click");
			return;
        }else if( status == 2 ){
            $evaluateStarBox.addClass('dib');
        }else if( status == 3 ){
            alert("您已评分");
            return;
        }            
	});

	$evaluateStarBox.on("click",function(event){
		event.stopPropagation();
	});

	$evaluateSubmit.on("click",function(event){
		event.stopPropagation();
	});

	$(document).on("click",function(){
		if( $evaluateStarBox.hasClass("dib") ){
			$evaluateStarBox.removeClass('dib');
            $evaluateStarBox.find("i").each(function(index, item){
                $(item).removeClass("cf21855");
            });
		}
		if( $evaluateSubmit.hasClass("dib") ){
			$evaluateSubmit.removeClass('dib');
		}
	});

    // 评分心形点击事件
    $evaluateStarBox.find("i").on('click',function() {
        var end = $(this).index();
        $evaluateStarBox.find("i").removeClass("cf21855");
        for(var i=0; i<end+1; i++){
            $evaluateStarBox.find("i").eq(i).addClass("cf21855");
        }
        $evaluateSubmit.addClass("dib");
    });
    // 点击评分确定按钮事件
    $evaluateSubmit.on("click",function() {
        var score = 0, code = $(this).attr("data-code");
        $evaluateStarBox.find("i").each(function(index,item) {
            if( $(item).hasClass("cf21855") ){
                score++;
            }
        });
        ajaxAction({
            url : Global_Score_Url,
            method : "post",
            data : {
                code : code,
                score : score
            },
            successCallback : function(res){
                layer.msg(res.info,{time:2000});
                if(res.status==1){
                    $evaluateBtn.attr('data-status',3).text("已评分");
                }
            }
        });
    });

})

// 产品轮播图
+ function ($) {
    if ($("#productpics").find(".ieswiper-slide").length > 1) {
        var mySwiper = new ieSwiper('#productpics', {
            pagination: '.pagination',
            autoplay: 3000, //可选选项，自动滑动
            initialSlide: 0,
            loop: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,
            onlyExternal: true, // 调用mySwiper.swipePrev()，mySwiper.swipeNext();接口就必须有这个
            autoplayDisableOnInteraction : false // 无则手动滑动后无法再自动滑动
            // onlyExternal:true,
            // observer:true,//修改swiper自己或子元素时，自动初始化swiper
            // observeParents:true,//修改swiper的父元素时，自动初始化swiper
        });
        // 上一张
        $('.productpics-prev').click(function () {
            mySwiper.swipePrev();
        });
        // 下一张
        $('.productpics-next').click(function () {
            mySwiper.swipeNext();
        });
    }
    if ($("#productpics").find(".ieswiper-slide").length <= 1) {
        $('.productpics-prev').remove();
        $('.productpics-next').remove();
    }
}(jQuery)