/*
* @Author: Administrator
* @Date:   2018-06-08 11:33:52
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-06-11 13:34:17
*/


$(function(){
    //打开筛选界面
    $("#screen").click(function(event) {
      if($(this).parent().hasClass('search_active')){
        $(this).parent().removeClass('search_active').siblings().removeClass('search_active');
        $(".screen_list").fadeOut();
        $("body").removeClass('static_style');
      }else{
        $(this).parent().addClass('search_active').siblings().removeClass('search_active');
        $(".screen_list").fadeIn();
        $("body").addClass('static_style');
      }
    });
    //关闭筛选界面
    $(".screen_list").click(function(event) {
       if($(event.target).hasClass('screen_list')){
          $(this).fadeOut();
          $("body").removeClass('static_style');
          $("#screen").parent().removeClass('search_active').siblings().removeClass('search_active');
       }
    });
    //筛选功能
    var selectData={};
    $(".select_item_box span").click(function(event) {
        var checked=$(this).attr("data-checked");
        var id=$(this).attr("data-id");
        var type=$(this).parent().parent().data("type");
        if(checked=="true"){
          $(this).removeClass('selected');
          $(this).attr("data-checked",false);

          for(var i=0; i<selectData[type].length;i++){
            if(selectData[type][i]==id){
                selectData[type].splice(i, 1);
                break;
            }
          }
          if(selectData[type].length==0){
            delete selectData[type];
          }
        }else{
          $(this).attr("data-checked",true);
          $(this).addClass('selected');
          if(!selectData[type]){
            selectData[type]=[id];
          }else{
             selectData[type].push(id);
          }

        }
    });

    //请求筛选数据
    $(".okbtn").click(function(event) {
        var parm="?cate=";
        for(var key in selectData){
            var value="";
            for(var i=0; i<key.length;i++){
                value=value+i+"_";
            }
            parm=parm+value;
        }
        parm=parm.substring(0, parm.length-1);
        location.href=parm;
    });

    //重置筛选数据
    $(".reset").click(function(event) {
        selectData=null;
        $(".select_item_box span").removeClass('selected');
    });

});
