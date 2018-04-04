$(function(){
        $(".ask-tab .tab-list").find("p").on("click",function(e) {//tab切换
            $('body').unbind("touchmove");
            $(this).parent().siblings().find("p").children(".pointer").removeClass('show');
            $(this).parent().siblings().find("p").removeClass('redColor');
            $(this).parent().siblings().find(".tab-list-items").removeClass('show');
            
            if($(this).hasClass('redColor')){
                $(this).removeClass('redColor');
                $(this).next().removeClass('show');
                $(this).children('.pointer').removeClass('show');
                $(".mask").css("display","none");
                $("body").css("overflow","auto");
            }else{
                $(this).children('.pointer').addClass('show');
                $(this).addClass('redColor');
                $(this).next().addClass('show');
                $(".mask").css("display","block");
                $("body").css("overflow","hidden");
                $('body').bind("touchmove",function(e){e.preventDefault();});
            }
            $(".ask-tab a").on("click",function(){
                $(this).addClass("bgColor whiteColor");
                $(this).siblings().removeClass("bgColor whiteColor");
            });
            window.event? window.event.cancelBubble = true : e.stopPropagation();
        });
        
        $(".mask").on("click",function(){//遮罩层
            $('body').unbind("touchmove");
            $("body").css("overflow","auto");
            $(".ask-tab .tab-list p").removeClass('redColor');
            $(".pointer").removeClass('show');
            $(this).css("display","none");
            $(".tab-list .tab-list-items").removeClass('show');
            
        });
        $(".ask-main .question-box .qst-list").on('click',function(event) {//列表整块点击跳转
            window.location = $(this).find("a").attr("href");
            event.preventDefault();
        });
    });