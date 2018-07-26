/*
* @Author: Administrator
* @Date:   2018-06-07 16:07:24
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-06-09 09:25:52
*/
$(function(){
    $("#search_input").focus(function(event) {
        $(this).parent().next(".remove_text").css("display","block");
    });
    $(".remove_text").click(function(event) {
        $(this).css("display","none").prev().children("input[name=search]").val("");
    });
    $('#search_form').bind('search', function () {
        var keyword=$("#search_input").val();
        location.href="/all?keyword="+keyword;
    });
})