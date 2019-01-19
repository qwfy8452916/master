/*
* @Author: jsb
* @Date:   2018-08-31 11:30:54
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-29 13:47:29
*/
$(function(){
    $("#back").click(function(event) {
        history.go(-1);
    });
    $('#menu').click(function(event) {
        event.stopPropagation();
        $('.top-nav').toggle();
        $('.mask').show();
    });
    $('.mask').click(function(event) {
        $('.top-nav').hide();
        $('.mask').hide();
    });

    var value = $("div[data-top='top']").html();
    switch(value){
        case '跟单管理':
            $('.gendan-img').attr('src', '/assets/mobile/common/img/order2.png');
            $('.order').css('color','#6f809c');
            break;
        case '施工管理':
            $('.constructor-img').attr('src', '/assets/mobile/common/img/cons-icon2.png');
            $('.const').css('color','#6f809c');
            break;
        case '材料进销':
            $('.cailiao-img').attr('src', '/assets/mobile/common/img/material2.png');
            $('.material').css('color','#6f809c');
            break;
        case '供应商管理':
            $('.gongying-img').attr('src', '/assets/mobile/common/img/supplier2.png');
            $('.supplier').css('color','#6f809c');
            break;
        case '团队管理':
            $('.tuandui-img').attr('src', '/assets/mobile/common/img/team2.png');
            $('.team').css('color','#6f809c');
            break;
        case '设置':
            $('.shezhi-img').attr('src', '/assets/mobile/common/img/set2.png');
            $('.set').css('color','#6f809c');
            break;
    }

})

/**
 * ajax请求，所有的请求都通过这里发送
 * @param options
 */
function ajaxAction(options){
    var defalutOptions = {
        url : "",
        method : "get",
        data : null,
        successCallback : null,
        failCallback : null
    };
    options = $.extend({}, defalutOptions, options);
    $.ajax({
        url : options.url,
        data : options.data,
        method : options.method,
        timeout: 2000,
        success : function(res){
            options.successCallback && options.successCallback(res);

        },
        fail : function(res){
            options.failCallback && options.failCallback(res);
        }
    });
}


/**
 * 验证手机号
 * @param str
 * @returns {boolean}
 */
function checkPhoneNum(str){
    if( !str ){
        return;
    }
    var reg = new RegExp("^((13[0-9])|(14[5,7,8,9])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$");
    return reg.test(str);
}

/**
 * 倒计时
 * @param sec 倒计时实现，如60s
 * @param ele 显示容器
 * @param callback
 */
function countDown(sec, ele, callback){
    if( $(ele).length <= 0 ){
        var $ele = $(document);
    }else{
        var $ele = $(ele);
    }
    var s = sec || 60;
    $ele.text(s+"s");
    function calc(){
        timer = setTimeout(function(){
            s--;
            $ele.text(s+"s");
            if( s > 0 ){
                calc();
            }else{
                callback && callback.call();
            }
        },1000);
    }
    calc();
}

/**
 * 判断是Android还是iOS
 * @returns {string}
 */
function mobileSystem() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid){
        return "Android"
    }else if(isiOS){
        return "iOS"
    }
}

/**
 * 根据系统类型更改input框的属性
 */
function fixInputType(ele) {
    if( mobileSystem().toLowerCase() == "ios" ){
        $(ele).attr("type","tel");
    }
}

/**
 * 判断是不是微信浏览器
 * @type {boolean}
 */
var isWechat = function() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
        return true;
    }else{
        return false;
    }
}()
