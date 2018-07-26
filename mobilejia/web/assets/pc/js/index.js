// 图片上定位函数
function picPointer(options) {
    var defalutOptions = {
        ele: [".p1", ".p2"],
        pointer: [
            {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            },
            {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            }
        ]
    };
    options = $.extend({}, defalutOptions, options);
    var eleLen = options.ele.length,
        pointerLen = options.pointer.length;
    options.ele.forEach(function (item, index) {
        var xPerc = options.pointer[index].x / options.pointer[index].w;
        var yPerc = options.pointer[index].y / options.pointer[index].h;
        var $img = $(item).parent().find("img");
        $(item).css({
            "position": "absolute",
            "left": $img.width() * xPerc,
            "top": $img.height() * yPerc
        });
    });
}

// 顶部banner
+function ($) {
    if( $("#ibanner").find(".ieswiper-slide").length > 1 ){
        var mySwiper = new ieSwiper('#ibanner', {
            pagination: '.pagination',
            autoplay: 3000,//可选选项，自动滑动
            initialSlide: 0,
            loop: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,
            onlyExternal:true
            // onlyExternal:true,
            // observer:true,//修改swiper自己或子元素时，自动初始化swiper
            // observeParents:true,//修改swiper的父元素时，自动初始化swiper
        });
        // 上一张
        $('.ibanner-prev').click(function () {
            mySwiper.swipePrev();
        });
        // 下一张
        $('.ibanner-next').click(function () {
            mySwiper.swipeNext();
        });
    }
    if( $("#ibanner").find(".ieswiper-slide").length <= 1 ){
        $('.ibanner-prev').remove();
        $('.ibanner-next').remove();
    }
}(jQuery)


// 图片上定位
+ function (argument) {
    picPointer({
        ele: ["#living-t1", "#living-t2", "#living-t3", "#bedroom-t1", "#bedroom-t2", "#bedroom-t3", "#dining-t1",
                "#dining-t2", "#bookshouse-t1", "#bookshouse-t2", "#bookshouse-t3", "#children-t1", "#children-t2",
                "#office-t1", "#office-t2", "#lighting-t1", "#lighting-t2", "#bathroom-t1", "#bathroom-t2",
                "#bathroom-t3", "#outer-t1", "#outer-t2"],
        pointer: [
             // 电视柜
            {
                x: 270,
                y: 395,
                w: 680,
                h: 680
            }, 
            // 沙发
            {
                x: 70,
                y: 510,
                w: 680,
                h: 680
            }, 
            // 茶几
            {
                x: 350,
                y: 450,
                w: 680,
                h: 680
            }, 
            // 床垫
            {
                x: 160,
                y: 450,
                w: 680,
                h: 680
            }, 
            // 床
            {
                x: 335,
                y: 520,
                w: 680,
                h: 680
            },
            // 床尾凳
            {
                x: 380,
                y: 425,
                w: 680,
                h: 680
            }, 
            // 餐桌
            {
                x: 203,
                y: 400,
                w: 680,
                h: 680
            },
            // 餐椅
            {
                x: 350,
                y: 510,
                w: 680,
                h: 680
            }, 
            // 书柜
            {
                x: 258,
                y: 253,
                w: 680,
                h: 680
            }, 
            // 书椅
            {
                x: 385,
                y: 412,
                w: 680,
                h: 680
            }, 
            // 书桌
            {
                x: 500,
                y: 425,
                w: 680,
                h: 680
            }, 
            // 儿童床
            {
                x: 340,
                y: 380,
                w: 680,
                h: 680
            }, 
            // 儿童床垫
            {
                x: 388,
                y: 323,
                w: 680,
                h: 680
            }, 
            // 办公桌
            {
                x: 380,
                y: 413,
                w: 680,
                h: 680
            }, 
            // 办公椅
            {
                x: 143,
                y: 565,
                w: 680,
                h: 680
            }, 
            // 吸顶灯
            {
                x: 192,
                y: 195,
                w: 680,
                h: 680
            }, 
            // LED灯
            {
                x: 580,
                y: 281,
                w: 680,
                h: 680
            }, 
            // 浴缸
            {
                x: 271,
                y: 442,
                w: 680,
                h: 680
            }, 
            // 坐便器
            {
                x: 430,
                y: 563,
                w: 680,
                h: 680
            }, 
            // 浴室镜
            {
                x: 560,
                y: 80,
                w: 680,
                h: 680
            }, 
            // 园艺
            {
                x: 288,
                y: 321,
                w: 680,
                h: 680
            }, 
            // 阳台桌椅
            {
                x: 220,
                y: 450,
                w: 680,
                h: 680
            }
        ]
    });
}(jQuery)