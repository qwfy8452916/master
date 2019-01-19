/*
* @Author: qz_dc
* @Date:   2018-08-01 14:59:53
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-08-17 17:06:09
*/
$(function(){
    $("#check").addClass('fa-check');
    var check = $("#mianze").is(':checked');
    if(!check){
        $("#check").removeClass('fa-check');

    }
    $("#check2").addClass('fa-check');
    var check = $("#mianze2").is(':checked');
    if(!check){
        $("#check2").removeClass('fa-check');

    }

    $("body").on("click",".disclamer-check",function(){
        var hasChecked=$(this).attr("data-checked");
         if(hasChecked=="true"){
            $(this).html("");
            $(this).attr("data-checked",false);
         }else{
            $(this).html("<i class='fa fa-check'></i>");
            $(this).attr("data-checked",true);
         }
    });
})
function checkDisclamer(parent_box){
    if(!parent_box){
        console.error("请选择父容器");
        return false;
    }
    var disclamer =$(parent_box+" .disclamer-check").attr("data-checked");
    if(disclamer=="false"){
        alert("请勾选我已阅读并同意齐装网的《免责申明》！");
        return false;
    }
    return true;
}