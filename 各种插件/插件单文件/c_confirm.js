/*
* @Author: qz_xsc
* @Date:   2018-09-03 17:43:52
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-09-12 15:57:57
* 说明: 本插件主要针对本项目中PC端模块的确认框功能.
* 部分样式依赖p_public.css 中的确认框样式
*/

;(function($){
    var defaultParms = {
        "width":430,
        "height":200,
        "okBtn":'确定',
        "cancelBtn":"取消",
        "confirmText":"您确定要删除吗?",
        okFun:function(){},
        noFun:function(){
            console.log(22)
        }
    }

    var p_delete_box=function(){
       var mask=$(".p-cofirm-mask");
       var con_box=$(".p-confirm-box");
       mask.fadeOut(300);
       con_box.fadeOut(300);
        setTimeout(function(){
             mask.remove();
             con_box.remove();
        },300);
    }
    var p_fadeIn=function(a,b){
        $('body').append(a);
        $('body').append(b);
        a.fadeIn(300);
        b.fadeIn(300);
    }
    $.fn.p_confirm=function(options){
        var parms=$.extend(defaultParms,options);
        defaultParms=$.extend(defaultParms,options);
        var mask="<div class='p-cofirm-mask'></div>";
        var container="<div style='width:"+parms.width+"px;height:"+parms.height+"px;' class='p-confirm-box'><p class='p-confirm-title'>"+parms.confirmText+"</p><div class='p-confirm-foot'><span class='p-btn p-primary' id='okBtn'>"+parms.okBtn+"</span><span class='p-btn ' id='cancelBtn'>"+parms.cancelBtn+"</span></div></div>";
        p_fadeIn($(mask),$(container));
    }

    $('body').on("click","#okBtn",function(e){
        defaultParms.okFun();
        p_delete_box();
    });
    $('body').on("click","#cancelBtn",function(e){
        defaultParms.noFun();
        p_delete_box();
    });

})(jQuery)