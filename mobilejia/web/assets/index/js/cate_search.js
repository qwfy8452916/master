/*
* @Author: Administrator
* @Date:   2018-06-08 11:33:52
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-06-27 08:50:15
*/


$(function(){
    //打开筛选界面
    $("#screen").click(function(event) {
      if($(this).parent().hasClass('search_active')){
        $(this).parent().removeClass('search_active');
        $(".screen_list").stop().fadeOut();
        $("body").removeClass('static_style');
      }else{
        $(this).parent().addClass('search_active');
        $(".screen_list").stop().fadeIn();
        $("body").addClass('static_style');
      }
    });
    //关闭筛选界面
    $(".screen_list").click(function(event) {
       if($(event.target).hasClass('screen_list')){
          $(this).stop().fadeOut();
          $("body").removeClass('static_style');
          $("#screen").parent().removeClass('search_active');
       }
    });

    $(".select_item_box a").click(function(){
        $(".screen_list").stop().fadeOut(0);
        $("body").removeClass('static_style');
        $("#screen").parent().removeClass('search_active');
    });
});
