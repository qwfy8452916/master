window.onload = function(){
    // 判断浏览器
    var browser=navigator.appName;
    var b_version=navigator.appVersion;
    var version=b_version.split(";");
    var trim_Version=version[1].replace(/[ ]/g,"");
    if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
        $('.xgt-home-nav dl').eq(0).hover(function(){
            $(this).find('.more').css({top: 0,'border-top': '1px solid #ddd'}).toggle();
        });
        $('.xgt-home-nav dl').eq(1).hover(function(){
            $(this).find('.more').css({top: 83}).toggle();
        });
        $('.xgt-home-nav dl').eq(2).hover(function(){
            $(this).find('.more').css({top: 166}).toggle();
        });
        $('.xgt-home-nav dl').eq(3).hover(function(){
            $(this).find('.more').css({top: 249}).toggle();
        });
        $('.xgt-home-nav dl').eq(4).hover(function(){
            $(this).find('.more').css({top: 335,'border-bottom': '1px solid #ddd'}).toggle();
        });
        $('.item-3d').hover(function(){
            $(this).find('.mark-3d').show();
            $(this).find('p').show();
            $(this).find('.item-ft a').css({'color':'#ff5353'})
        },function(){
            $(this).find('.mark-3d').hide();
            $(this).find('p').hide();
            $(this).find('.item-ft a').css({'color':'#333'})
        })
    }
    // 轮播图
    var ieswiper = new ieSwiper('.ieswiper-container', {
        speed:300,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        loop:true,
        loopedSlides:8,
        noSwiping : true
    });
    $('.slide-switch').eq(0).css('background','#ff5353');
    $('.img-info').eq(0).show();
    // 上一张
    $('.prev').click(function(){
        ieswiper.swipePrev();
        $('.slide-switch').eq(ieswiper.activeIndex%4).css('background','#ff5353').siblings('.slide-switch').css('background','#fff');
        $('.img-info-list').find('.img-item-info').eq(ieswiper.activeIndex%4).show().siblings('.img-item-info').hide();
        $('.change-img-src').find('.img-src').eq(ieswiper.activeIndex%4).show().siblings('.img-src').hide();
    });
    // 下一张
    $('.next').click(function(){
        ieswiper.swipeNext();
        $('.slide-switch').eq(ieswiper.activeIndex%4).css('background','#ff5353').siblings('.slide-switch').css('background','#fff');
        $('.img-info-list').find('.img-item-info').eq(ieswiper.activeIndex%4).show().siblings('.img-item-info').hide();
        $('.change-img-src').find('.img-src').eq(ieswiper.activeIndex%4).show().siblings('.img-src').hide();
    });
};

$(document).ready(function($) {
    $('.common-hd-nav span').each(function(index, el) {
        $(el).hover(function(){
            var index = $(this).index();
            $(this).addClass('current').siblings('span').removeClass('current');
            $(this).parent().siblings('.common-list-con').find('.common-list').eq(index).show().siblings().hide();
        });
    });
    $('img.lazy').lazyload();
});

//点击美图到终端页时候附加参数
$(function(){
    $('.meitu-param').click(function(event) {
        if ($.cookie) {
            var param = $(this).attr('data-value');
            $.cookie('index_meitu_params', param, { expires: 7, path: '/' });
        }
    });
    $('.pubmeitu-param').click(function(event) {
        if ($.cookie) {
            var param = $(this).attr('data-value');
            $.cookie('index_pubmeitu_params', param, { expires: 7, path: '/' });
        }
    });

    $('.j-tab-nav-link a:first').addClass('current');
    $('.j-tab-con-link div:first').css('display','block');
    //友链
    $("#friend").rTabs({
        btnClass:'.j-tab-nav-link',  /*按钮的父级Class*/
        conClass:'.j-tab-con-link',  /*内容的父级Class*/
        speed:2000,
        auto:false
    });
    $("#friend").find(".tab-nav a:first").addClass('current');
    $("#friend").find(".j-tab-con-link .tab-con-item:first").css("display","block");

});