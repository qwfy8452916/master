/**公共函数库 zwl**/
/*********************************/

/**
 * 字符串切割
 * @param str
 * @param start 起始位置
 * @param end 结束位置
 * @returns str
 */
function cutStr(str, start, end){
	if( !str ){
		return;
	}
	start = start || 0;
	end = end || str.length;
	return str.slice(start, end);
}

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
    console.log(options);
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

/**
 * 验证手机号
 * @param str
 * @returns {boolean}
 */
function checkPhoneNum(str){
	if( !str ){
		return;
	}
	var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
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
 * 计算字符串长度，中文2个字符，英文一个字符
 * @param str
 * @returns {number}
 */
function calcCharacterSize(str){
    if(typeof str != "string"){
        return;
    } 
    var len = 0;
    for (var i=0; i<str.length; i++) {
        if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len;
}

/**
 * 禁止某些字符输入输入
 * @param ele 显示容器
 * @param type 1：禁止空格输入 2：禁止非数字字符输入 3：禁止数字小数点以外的字符输入 4：禁止特殊字符输入
 */
function forbidenInput(ele, type){
	var $ele = $(ele);
	if( $(ele).length <= 0 ){
		return;
	}
	switch(type){
		case 1:
			$ele.val($ele.val().replace(/\s+/g,""));
			break;
		case 2:
			$ele.val($ele.val().replace(/\D/g,""));
			break;
		case 3:
			$ele.val($ele.val().replace(/[^\d.]*/g,""));
			break;
        case 4:
            $ele.val($ele.val().replace(/[~'!@#￥$%^&*()-+_\-=:\.\/]/g,""));
            break;
		default :
			break;
	}
}

/**
 * 校验url
 * @param str_url
 * @returns {boolean}
 */
function isURL(str_url){
    if( typeof str_url !== "string" ){
        return false;
    }
    var reg = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;
    if (reg.test(str_url)){
        return (true);
    }else{
        return (false);
    }
}

/**
 * 批量向本地缓存中存储数据
 * @param item 格式为[{name:"对象名",val:"存储的值"},{name:"对象名",val:"存储的值"}]
 */
function saveStorage(item){
    if( !(item instanceof Array) ){
        return;
    }
    var len = item.length;
    for(var i=0; i<len; i++){
        if(typeof item[i].val == "string"){
            localStorage.setItem(item[i].name,item[i].val);
        }else{
            localStorage.setItem(item[i].name,JSON.stringify(item[i].val));
        } 
    }
}

/**
 * 删除指定缓存
 * @param name
 * @param storageName
 */
function delStorage(name,storageName){
    if( !name && !storageName ){
        return
    }
    var storage = localStorage.getItem(storageName) ? JSON.parse(localStorage.getItem(storageName)) : "";
    if( !storage ){
        return;
    }
    var len = storage.length,
        index = -1;
    for(var i=0; i<len; i++){
        if(name == storage[i].code){
            index = i;
        }
    }
    index >= 0 ? storage.splice(index,1) : "";
    localStorage.removeItem(storageName);
    if(storage.length>0){
        localStorage.setItem(storageName, JSON.stringify(storage));
    }
}

/**
 * 获取指定缓存
 * @param [string] storageName
 * @return [array|object]
 */
function getStorage(storageName){
    if( !storageName || typeof storageName != "string"){
        return;
    }
    return localStorage.getItem(storageName) ? JSON.parse(localStorage.getItem(storageName)) : null;
}

/**
 * IE8 鼠标移入图片放大兼容
 * @param ele 图片容器
 */
function scaleCompatible(ele) {
    var $ele = $(ele);
    if( $ele.length <= 0 ){
        return;
    }
    if(navigator.userAgent.indexOf("MSIE 8.0") > -1){
        $ele.hover(function () {
            $(this).find("img").animate({
                "width" : "120%",
                "height" : "120%"
            },"fast");
        },function () {
            $(this).find("img").animate({
                "width" : "100%",
                "height" : "100%"
            },"fast");
        });
    };
}

/**
 * 屏蔽输入框特殊字符输入
 */
$(function () {
    $("html,body").on("keyup","input",function(){
        var $target = $(this);
        $target.val($target.val().replace(/[~'!@#￥$%^&*()-+_\-=:\.\/]/g,""));
    });
})

/**
 * IE8文字被placeholder插件改变颜色
 */
$(function () {
    $("html,body").on("keyup","input",function(){
        if($(this).val().length>0){
            $(this).css('color',"#666");
        }else{
            $(this).css('color',"#999");
        }
    });
})


/**
 * 检测IE版本
 */
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11
    }else{
        return -1;//不是ie浏览器
    }
}

/**
 * 检测属性是否可用，检测属性是否可用，比检测浏览器更靠谱
 * @param ele 元素
 * @param pn 属性
 * @returns {boolean}
 */
function checkProperty(ele,pn) {
    if( typeof ele != "string"){
        return;
    }
    if( !pn ){
        return;
    }
    var test = document.createElement(ele);
    if( test[pn] == "undefined" ){ // 若属性不存在返回的将是undefined，否则返回的是空字符串""
        return false;
    }
    return true;
}

/**
 * 监听paste事件
 * @param ele 需要监听的元素
 * @param callback
 */
function pasteListen(ele,callback){
    var $ele = $(ele);
    if( $ele.length <=0 ){
        return;
    }
    $ele.on("paste",function (event) {
        var val = "", $target = $(event.target);
        if (window.clipboardData && window.clipboardData.getData){
            val = $target.val() + window.clipboardData.getData('Text');
        }else{
            val = $target.val() + event.originalEvent.clipboardData.getData("Text");
        }
        callback && callback(val);
    });
}

/**
 * 全选/取消全选
 * @param ele string/jQuery Object
 * @param coc bool
 */
function checkAll(ele, coc) {
    var $ele = $(ele);
    if( $ele.length <= 0 || $ele.find("input[type='checkbox']").length <= 0 ){
        return;
    }
    coc = Boolean(coc);
    var $checkboxs = $ele.find("input[type='checkbox']");
    if( coc ){
        $checkboxs.each(function(index,item){
            $(item)[0].checked = true;
        });
    }else{
        $checkboxs.each(function(index,item){
            $(item)[0].checked = false;
        });
    }
}

/**
 * 复制指定信息到剪贴板
 * @param str string
 */
function copyToClipboard(str){
    var oInput = document.createElement('input');
    oInput.value = str;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display='none';
    oInput.parentNode.removeChild(oInput);
}
