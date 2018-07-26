// 控制筛选栏目"展开"，链接是否显示
$(function(){
	var $classifyBox = $(".classify-box"),
		$classifyOperate = $(".classify-operate");
	$classifyBox.each(function(index,item){
		var $item = $(item);
		var cw = $item.width() - $item.find(".classify-title").width() - $item.find(".classify-operate").outerWidth(true) - parseInt($item.find(".classify-list").css("margin-left"));
		var spans = $item.find(".classify-list").find("span");
		if( spans.eq(0).width() * spans.length > cw ){
			$item.find(".classify-operate").addClass("db");
		}
	});
	// 展开操作
	$classifyOperate.on("click",function(event){
		event.preventDefault();
		var touch = $(this).attr("data-status") && $(this).attr("data-status").toLowerCase() ;
		if( touch == "close" ){
			var height = $(this).parent().find('.classify-list').height();
			$(this).closest(".classify-box").stop().animate({height: height},600);
			$(this).attr("data-status","stretch");
			$(this).find("span").text("收起");
			$(this).find("i").removeClass("icon-angle-down").addClass("icon-angle-up");
		}else if( touch == "stretch" ){
			$(this).attr("data-status","close");
			$(this).find("span").text("展开");
			$(this).find("i").removeClass("icon-angle-up").addClass("icon-angle-down");
			$(this).closest(".classify-box").stop().animate({"height":"48px"},600);
		};
	});
});

// 收藏
$(function(){
	var $allProductBox = $("#all-product-box");
	$allProductBox.on("click",function(event){
		var $target = $(event.target), status = 1, cfn = null, _this = this, $parent = null;
		if( $target[0].nodeName.toLowerCase() == "span" && $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "collect" ){
			status = $target.attr("data-collect-status");
			$parent = $target.closest("li");
			if( status == 1 ){
				$("span[data-type='signin-btn']").trigger("click");
				return;
			}else if( status == 2 || status == 3 ){ // 提交收藏
				cfn = function(res) {
					var currentSize = parseInt($parent.find("span[data-type='collect-count']").find("i").text());
                    if( res.status == 9){
                        layer.msg("收藏成功",{time:2000});
                        $target.addClass('collected').text("已收藏");
                        $parent.find("span[data-type='collect-count']").find("i").text(currentSize+1);
                    }
                    if( res.status == 10){
                        layer.msg("取消收藏成功",{time:2000});
                        $target.removeClass("collected").text("收藏");
                        $parent.find("span[data-type='collect-count']").find("i").text(currentSize-1);
                    }
                }
			}
			ajaxAction({
                url : Global_Collect_Url,
                method : "post",
                data : {
                    code : $target.attr("data-code")
                },
                successCallback : function(res) {
                    cfn.call(_this,res);
                }
            });
		}
	});
})