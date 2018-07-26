/*
 * 首页样式，商品详情页，专题列表页，专题详情页
 * 赵文林
*/

/*===================== 公共函数部分 =====================*/
// ajax请求，所有的请求都通过这里发送
function ajaxAction(options){
    var defalutOptions = {
        url : "",
        method : "get",
        data : null,
        successCallback : null,
        failCallback : null
    };
    options = $.extend({}, defalutOptions, options);
    console.log(options);
    if( !options.url ){
        return;
    }
    $.ajax({
        url : options.url,
        data : options.data,
        method : options.method,
        success : function(res){
            options.successCallback && options.successCallback(res);

        },
        fail : function(res){
            options.failCallback && options.failCallback(res);
        }
    });
}

// 图片上定位
function picPointer(options) {
    var defalutOptions = {
        ele : [".p1",".p2"],
        pointer : [
            {
                x : 0,
                y : 0,
                w : 0,
                h : 0
            },
            {
                x : 0,
                y : 0,
                w : 0,
                h : 0
            }
        ]
    };
    options = $.extend({}, defalutOptions, options);
    var eleLen = options.ele.length,
        pointerLen = options.pointer.length;
    options.ele.forEach(function(item,index) {
        var xPerc = options.pointer[index].x / options.pointer[index].w;
        var yPerc = options.pointer[index].y / options.pointer[index].h;
        var $img = $(item).parent().find("img");
        $(item).css({
            "position" : "absolute",
            "left" : $img.width() * xPerc,
            "top" : $img.height() * yPerc
        });
    });
}

// 设置场景导购页面家具分类宽度
function setSceneWidth(selector){
    if( !selector || typeof selector != "string"){
        return;
    }
    var liW = $(selector).find("ul>li").eq(0).outerWidth(true),
        liC = $(selector).find("ul>li").length;
    $(selector).find(".furniture-main-scroll").width(liW * liC+10);
}
/*===================== 公共函数部分 =====================*/

// setTimeout(showPage, 450);

// 这里要增加一个loading.gif的图标，表示正在加载
function showPage() {
    var body = document.getElementsByTagName('body')[0];
    body.style.display = "block";
    body.style.opacity = "1";
    body.style.visibility = "visible";
}

// 点击搜索框跳转到搜索页面
+function ($) {
	var $search = $("input[data-type='index-search']");
    if( $search.length > 0 ){
        $search.on('click',function(event) {
            event.preventDefault();
            location.href="/search/";
        });
    }

}(jQuery)

// 商品详情页轮播图
+function ($) {
    if( $(".good-pics").length > 0 ){
        var mySwiper = new Swiper('.good-pics', {
            //移动端轮播
            autoplay: 3000,//可选选项，自动滑动
            initialSlide: 0,
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true,//修改swiper的父元素时，自动初始化swiper
            pagination : '.swiper-pagination',
            paginationType : 'custom',
            paginationCustomRender: function (swiper, current, total) {
                return current + ' / ' + total;
            }
        });
    }
}(jQuery)

// 首页顶部轮播图
+function ($) {
    if( $(".ibanner").length > 0 && $(".ibanner").find(".swiper-slide").length > 1 ){
        var mySwiper = new Swiper('.ibanner', {
            autoplayDisableOnInteraction : false,
            //移动端轮播
            autoplay: 5000,//可选选项，自动滑动
            loop : true,
            pagination: '.swiper-pagination',
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',
            slidesPerView: 'auto',
            coverflow: {
                rotate: 0,// 旋转的角度
                stretch: 0,// 拉伸   图片间左右的间距和密集度
                depth: 80,// 深度   切换图片间上下的间距和密集度
                modifier: 5,// 修正值 该值越大前面的效果越明显
                slideShadows : false// 页面阴影效果
            }
        });
    }
    if($(".ibanner").find(".swiper-slide").length == 1){
        $(".ibanner").find(".swiper-slide").css("width","100%");
    }
}(jQuery)

// 定义全局变量
var jrollInnerScene = null;

// 将场景导购的场景恢复原状，主要解决从其他页面返回时无法正确获取宽度问题
$(function(){
    // var $furnitureContainer = $(".furniture-container");
    // $furnitureContainer.each(function(index,item) {
    //     $(item).css({
    //         "display":"block",
    //         "opacity" : 0
    //     });
    // });
})
    
// 左右滚动
+function ($) {
    var $cheapGoods = $(".cheap-goods"),
        w = $cheapGoods.find("ul>li").eq(0).outerWidth(true),
        docFs = 100 * (document.documentElement.clientWidth / 750);
    if( $("#cheap-goods-container").length > 0 && $("#cheap-goods-container").find("ul>li").length > 1 ){
        var cheapLiW = $("#cheap-goods-container").find(".item").eq(0).outerWidth(true),
            cheapLiC = $("#cheap-goods-container").find(".item").length;
        $("#cheap-goods-container").find(".cheap-goods").width(cheapLiW * cheapLiC);
        // var jrollCheap = new JRoll("#cheap-goods-container", {scrollX:true,scrollY:false,preventDefault:false});
    }
    if( $("#scene-list-container").length > 0 ){
        // var jrollScene = new JRoll("#scene-list-container", {scrollX:true,scrollY:false,preventDefault:false});
    }
    if( $("#scene-container").length > 0 ){
        jrollInnerScene = new JRoll("#scene-container", {scrollX:true,scrollY:false,preventDefault:false});
    }
    if( $("#furniture-container-0").length > 0 ){
        setSceneWidth("#furniture-container-0");
        setTimeout(function(){
            var jrollLivingRoom = new JRoll("#furniture-container-0", {scrollX:true,scrollY:false,preventDefault:false});
        },0)
    }
    if( $("#furniture-container-1").length > 0 ){
        setSceneWidth("#furniture-container-1");
        setTimeout(function(){
            var jrollBedingRoom = new JRoll("#furniture-container-1", {scrollX:true,scrollY:false,preventDefault:false});
        },0)
    }
    if( $("#furniture-container-2").length > 0 ){
        setSceneWidth("#furniture-container-2");
        setTimeout(function(){
            var jrollDining = new JRoll("#furniture-container-2", {scrollX:true,scrollY:false,preventDefault:false});
        },0)
    }
    if( $("#furniture-container-3").length > 0 ){
        setSceneWidth("#furniture-container-3");
        setTimeout(function(){
            var jrollBookshouse = new JRoll("#furniture-container-3", {scrollX:true,scrollY:false,preventDefault:false});
        },0)
    }
    if( $("#furniture-container-4").length > 0 ){
        setSceneWidth("#furniture-container-4");
        setTimeout(function(){
            var jrollChildren = new JRoll("#furniture-container-4", {scrollX:true,scrollY:false,preventDefault:false});
        },0)
    }
    if( $("#furniture-container-5").length > 0 ){
        setSceneWidth("#furniture-container-5");
        setTimeout(function(){
            var jrollOffice = new JRoll("#furniture-container-5", {scrollX:true,scrollY:false,preventDefault:false});
        },0)
    }
    if( $("#furniture-container-6").length > 0 ){
        setSceneWidth("#furniture-container-6");
        setTimeout(function(){
            var jrollLighting = new JRoll("#furniture-container-6", {scrollX:true,scrollY:false,preventDefault:false});
        },0)
    }
    if( $("#furniture-container-7").length > 0 ){
        setSceneWidth("#furniture-container-7");
        setTimeout(function(){
            var jrollBathroom = new JRoll("#furniture-container-7", {scrollX:true,scrollY:false,preventDefault:false});
        },0)
    }
    if( $("#furniture-container-8").length > 0 ){
        setSceneWidth("#furniture-container-8");
        setTimeout(function(){
            var jrollOuter = new JRoll("#furniture-container-8", {scrollX:true,scrollY:false});
        },0)
    }
    // if( $("#ispecial-list-container").length > 0 && $("#ispecial-list-container").find("ul>li").length > 1 ){
    //     var ispecialLiW = $("#ispecial-list-container").find("ul>li").eq(0).outerWidth(true),
    //         ispecialLiC = $("#ispecial-list-container").find("ul>li").length;
    //     $("#ispecial-list-container").find(".ispecial-list-scroll").width(ispecialLiW * ispecialLiC+10);
    //     var jrollSpecial = new JRoll("#ispecial-list-container", {scrollX:true,scrollY:false,preventDefault:false});
    // }
    // if($("#ispecial-list-container").find("ul>li").length == 1){
    //     $(".ispecial-list-scroll").css({
    //         "width":"100%",
    //         "padding-right" : "0.1rem"
    //     });
    //     $("#ispecial-list-container").find("ul>li").css("width","100%");
    // }
    if( $("#relation-lsit-container").length > 0 ){
        var liW = $("#relation-lsit-container").find("ul>li").eq(0).outerWidth(true),
            liC = $("#relation-lsit-container").find("ul>li").length;
        $("#relation-lsit-container").find(".relation-list-scroll").width(liW * liC+5);
        var jrollRelation = new JRoll("#relation-lsit-container", {scrollX:true,scrollY:false,preventDefault:false}); //相关搭配数量无法固定
    }
    if( $("#relation-recommend-list-container").length > 0 ){
        // var jrollRelationRecommend = new JRoll("#relation-recommend-list-container", {scrollX:true,scrollY:false});
    }
    
}(jQuery)

// 图片上定位
+function(argument) {
    picPointer({
        ele : ["#living-t1","#living-t2","#living-t3","#bedroom-t1","#bedroom-t2","#bedroom-t3","#dining-t1","#dining-t2","#bookshouse-t1","#bookshouse-t2","#bookshouse-t3","#children-t1","#children-t2","#office-t1","#office-t2","#lighting-t1","#lighting-t2","#bathroom-t1","#bathroom-t2","#bathroom-t3","#outer-t1","#outer-t2"],
        pointer : [
            // 电视柜
            {
                x : 270,
                y : 395,
                w : 680,
                h : 680
            },
            // 沙发
            {
                x : 70,
                y : 510,
                w : 680,
                h : 680
            },
            // 茶几
            {
                x : 360,
                y : 470,
                w : 680,
                h : 680
            },
            // 床垫
            {
                x : 120,
                y : 450,
                w : 680,
                h : 680
            },
            // 床
            {
                x : 319,
                y : 510,
                w : 680,
                h : 680
            },
            // 床尾凳
            {
                x : 415,
                y : 435,
                w : 680,
                h : 680
            },
            // 餐桌
            {
                x : 203,
                y : 400,
                w : 680,
                h : 680
            },
            // 餐椅
            {
                x : 350,
                y : 510,
                w : 680,
                h : 680
            },
            // 书柜
            {
                x : 238,
                y : 253,
                w : 680,
                h : 680
            },
            // 书椅
            {
                x : 404,
                y : 412,
                w : 680,
                h : 680
            },
            // 书桌
            {
                x : 520,
                y : 425,
                w : 680,
                h : 680
            },
            // 儿童床
            {
                x : 258,
                y : 375,
                w : 680,
                h : 680
            },
            // 儿童床垫
            {
                x : 358,
                y : 333,
                w : 680,
                h : 680
            },
            // 办公桌
            {
                x : 380,
                y : 403,
                w : 680,
                h : 680
            },
            // 办公椅
            {
                x : 113,
                y : 525,
                w : 680,
                h : 680
            },
            // 吸顶灯
            {
                x : 142,
                y : 205,
                w : 680,
                h : 680
            },
            // LED灯
            {
                x : 570,
                y : 261,
                w : 680,
                h : 680
            },
            // 浴缸
            {
                x : 271,
                y : 442,
                w : 680,
                h : 680
            },
            // 坐便器
            {
                x : 450,
                y : 563,
                w : 680,
                h : 680
            },
            // 浴室镜
            {
                x : 630,
                y : 111,
                w : 680,
                h : 680
            },
            // 园艺
            {
                x : 288,
                y : 321,
                w : 680,
                h : 680
            },
            // 阳台桌椅
            {
                x : 310,
                y : 460,
                w : 680,
                h : 680
            }
        ]
    });
}(jQuery)

// 场景导购滚动显示对应标签
+function($) {
    if( $(".scene-scroll").length > 0 ){
        var $furnitureContainer = $(".furniture-container"),
            $sceneScroll = $(".scene-scroll"),
            timer = null,
            step = $sceneScroll.find("li.item").outerWidth(true);

        // 手动跳转到指定位置 
        ;(function(){
            var liW = $("#scene-container").find("ul>li").eq(0).outerWidth(true),
                index = location.href.substr(location.href.indexOf("#")+1,1);
            if( location.href.indexOf("#") != -1){
                jrollInnerScene.scrollTo( -liW * (index-1), 0, 300, false);
            }
        })();

        timer = setInterval(function(argument) {
            var leftV = Math.abs($sceneScroll.css("transform").replace(/matrix\(/g,'').replace(/\)/,"").split(',')[4]),
                index = isNaN(Math.round(leftV / step)) ? 0 : Math.round(leftV / step);
                index = index >= $furnitureContainer.length-1 ? $furnitureContainer.length-1 : index;
            $furnitureContainer.each(function(index,item) {
                $(item).css({
                    "display":"none",
                    "opacity" : 1
                });
            });
            $furnitureContainer.eq(index).css("display","block");
            setSceneWidth("#furniture-container-"+index);
            var jrollOuter = new JRoll("#furniture-container-"+index, {scrollX:true,scrollY:false});
            $("#indexs").text($furnitureContainer.eq(index).find(".furniture-main-scroll").width()+":"+index);
        },100);
    }
}(jQuery)

