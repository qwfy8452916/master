/*
* @Author: Administrator
* @Date:   2018-09-14 20:08:01
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-10-15 12:31:40
* 使用案例:
*   $(".img-list").on("click",function(){
        $(this).erpswiper({
            conWidth:".img-list",
            imgItem:[],
            column:3
        });
    });"
*/
  ;(function($){
        var sw_xh=0,left_tance,item_length;

        $.fn.erpswiper=function(option){

            var imgItem=option.imgItem,
                conWidth=option.conWidth,
                length=imgItem.length,
                column=option.column,
                initLeft=sw_xh=option.currentIndex?option.currentIndex:0,
                title=option.swiperTitle?option.swiperTitle:"示例";
            var leftBtnPx=($(window).width()-conWidth)/2-50;
            $("body").append("<div class='sw-mask'><span class='sw-close'></span><div class='sw-dir' id='sw-left' style='left:"+leftBtnPx+"px'></div><div class='sw-dir' id='sw-right'  style='right:"+leftBtnPx+"px'></div></div>");
            $(".sw-mask").append("<div class='sw-container' style='width:"+conWidth+"px'><ul class='sw-item-box' style='width:"+length*conWidth/column+"px;margin-left:-"+initLeft*conWidth+"px;'></ul><div></div></div>");
            for(var i=0; i<length; i++){
                var li="<li class='imgItem'><div class='img'><p class='shilims'>"+title+"</p><img src='"+imgItem[i].imgPath+"'/><p>"+imgItem[i].imgName+"</p></div></li>";
                var coefficient=$(li).find("img")[0].width/conWidth;
                var imgHeight=$(li).find("img")[0].height/coefficient;

                $(".sw-item-box").append(li);

                if(imgHeight>600){
                     var imgWidth=600/imgHeight*conWidth;
                     $(".sw-item-box li").eq(i).find("img").css({
                        height:600+"px",
                        width:imgWidth+"px"
                     })
                }
            }
            initStyle(conWidth,$('.imgItem'),column)
            left_tance=conWidth/column;
            item_length=length;
        }

        function initStyle(conWidth,imgItem,column){
            var li_width=conWidth/column;
            imgItem.width(li_width);
            $(".sw-mask").fadeIn();
            $("#sw-right").css({"opacity":"1"});
            $("#sw-left").css({"opacity":"0.5"});
        }
        var hasLeft=true,hasTrue=true;
        $("body").on("click","#sw-right",function(){
            $("#sw-right").css({"opacity":"1"});
            if(sw_xh==item_length-2){
                $(this).css({"opacity":"0.5"});
                $("#sw-left").css({"opacity":"1"});
            }else if(sw_xh==item_length-1){
                sw_xh=item_length-1;
                $(this).css({"opacity":"0.5"});
                $("#sw-left").css({"opacity":"1"});
                return
            }else{
                $(this).css({"opacity":"1"});
                $("#sw-left").css({"opacity":"1"});
            }
            sw_xh++;
           $(".sw-item-box").stop().animate({
                "margin-left": -(sw_xh)*left_tance+"px"
            },400);
        });


        $("body").on("click","#sw-left",function(){
            $("#sw-left").css({"opacity":"1"});
            if(sw_xh==1){
                $(this).css({"opacity":"0.5"});
                $("#sw-right").css({"opacity":"1"});
            }else if(sw_xh==0){
                sw_xh=0;
                $(this).css("opacity","0.5");
                $("#sw-right").css({"opacity":"1"});
                return;
            }else{
                $(this).css("opacity","1");
                $("#sw-right").css({"opacity":"1"});
            }

            sw_xh--;
            $(".sw-item-box").stop().animate({
                "margin-left":-(sw_xh)*left_tance+"px"
            },400);
        });


        $("body").on("click",".sw-close", function(){
            $(".sw-mask").fadeOut(500);
            setTimeout(function(){
                $(".sw-mask").remove();
            },300);

        })

    })(jQuery);
