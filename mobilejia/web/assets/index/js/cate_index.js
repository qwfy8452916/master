/*
* @Author: Administrator
* @Date:   2018-06-07 16:07:24
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-07-06 15:09:00
*/
$(function(){
    $("#search_input").focus(function(event) {
        $(this).parent().next(".remove_text").css("display","block");
    });
    $(".remove_text").click(function(event) {
        $(this).css("display","none").prev().children("#search_input").val("");
    });
    $('#search_form').bind('search', function () {
        var keyword=$("#search_input").val();
        location.href="/all?keyword="+keyword;
    });



    //多条件筛选
    var parms=[];

    for(var i=0; i<$(".parentLevel").length; i++){
        for(j=0; j<$(".parentLevel").eq(i).find("span").length;j++){
            if($(".parentLevel").eq(i).find("span").eq(j).data("checked")){
                parms[i]=$(".parentLevel").eq(i).find("span").eq(j).data("id");

            }
        }

    }

    $(".parms-box span").click(function(event) {
        var can=$(this).data("id");
        var flag=$(this).attr("data-checked");
        var level=$(this).parents(".parentLevel").index();
        if(flag=="false"){
            $(this).addClass("selected").attr("data-checked","true");
            $(this).siblings('span').removeClass('selected').attr("data-checked","false");
            parms[level]=can;
        }else{
            $(this).removeClass("selected").attr("data-checked","false");
            parms[level]="";
        }
    });

    $(".okbtn").click(function() {
        var parmStr=parms.join("");
        $(".screen_list").fadeOut();
        $("#screen").parent().removeClass('search_active');
        location.href="/"+$("#shortName").val()+"/"+parmStr;
    });
    //重置
    $(".reset").click(function(event) {
        $(".parms-box span").removeClass('selected').attr("data-checked","false");
        parms=[];
       

    });
});
