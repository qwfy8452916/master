/*
* @Author: Administrator
* @Date:   2018-08-31 10:56:24
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-09-30 13:53:38
*/
$(function () {
    //初始化布局

    initStyle();

    //导航栏初始化
    function initStyle(){
      var menus = $(".b-current-menu").parent("ul").find("li");
      $(".b-current-menu").parent("ul").height(menus.length*42);
      $(".b-current-menu").parent("ul").prev(".b-menu-father").attr("data-open",1).css("color","#fff");
      $(".b-current-menu").parent("ul").prev(".b-menu-father").children("i").attr("class","b-fr fa fa-chevron-up");
    }

    // 左侧导航栏效果
    $(".b-menu-father").on("click", function () {
        var is_open = parseInt($(this).attr("data-open"));
        var num = $(this).next().children("li").length;
        var itemHeight = num * 42 + "px";
        if (is_open == 0) {
            $(this).css("color", "#fff").children("i").attr("class", "b-fr fa fa-chevron-up");
            $(this).next().animate({
                "height": itemHeight
            }, 300)
            $(this).attr("data-open", 1);
        } else {
            $(this).css("color", "#999").children("i").attr("class", "b-fr fa fa-chevron-down");
            $(this).next().animate({
                "height": "0px"
            }, 300)
            $(this).attr("data-open", 0);
        }
        $(this).parent().siblings().children(".b-menu-father").attr("data-open", 0).css("color", "#999");
        $(this).parent().siblings().find("i").attr("class", "b-fr fa fa-chevron-down");
        $(this).parent().siblings().children("ul").animate({
            "height": "0px"
        }, 300);
    });

    // select 文字颜色
    $.each($("select"),function(index,value){
       if($("select").eq(index).find("option:selected").text() === "请选择"){
            $(value).css("color","#666")
       }else{
            $(value).css("color","#333")
       }
    })

    $("select").change(function(event){

        if($(this).find("option:selected").text() === "请选择"){
            $(this).css("color","#666")
        }else{
            $(this).css("color","#333")
        }
    })
});

// 提示

function tishitip(infotip, status) {
    if(!status){
       status=1;
    }
    var tip_mask=$(".p-tips-mask");

    //防止频繁点击,导致背景层变厚
    if(tip_mask.length>0){
        return false;
    }
    var domtanc;
    if (status == 1) {
        domtanc = "<div class='p-tips-mask'><div class='p-tips-box'><div class='p-smalltip'><span class='p-status-pic'></span><span class='p-smalltip-ms'>" + infotip + "</span></div></div></div>";
    } else {
        domtanc = "<div class='p-tips-mask'><div class='p-tips-box'><div class='p-smalltip'><span class='p-status-pic2'></span><span class='p-smalltip-ms'>" + infotip + "</span></div></div></div>";
    }
    $('body').append(domtanc);
    setTimeout(function () {
        $('.p-tips-mask').remove();
    }, 1000)
}


function b_wait(){
    $("body").append("<div class='p-wait'><div class='p-wait-img'><img src='/assets/pc/img/Common/load.gif'/></div></div>");
}
function b_remove_wait(){
    $(".p-wait").remove();
}


//分页的跳转到第几页js逻辑 从PHP 中抽离出来 author:mcj
$("#jump").click(function(){
    var skip = $('#skipPage').val();
    var size = parseInt($("#skipPage").attr("data-size"));
    var url = $(this).val();
    if ('' == skip) {
        tishitip('请输入要跳转的页码',0);
        $('#skipPage').focus();
    } else {
        skip=skip>size? size: skip;
        window.location.href = url+'p=' + skip;
    }
});

//回车分页跳转
$('#skipPage').on("keydown",function(event) {
    if(event.keyCode==13){
        var skip = $(this).val();
        var size = parseInt($("#skipPage").attr("data-size"));
        if(skip===""){
            tishitip('请输入要跳转的页码',0);
            $('#skipPage').focus();
        }else{
            var url=$("#jump").val();
            skip=skip>size? size: skip;
            window.location.href = url+'p=' + skip;
        }
    }
});


//号码验证
//
function telReg(num){
    var newReg = new RegExp("^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$");
    if(newReg.test(num)){
        return true;
    }else{
        return false;
    }
}