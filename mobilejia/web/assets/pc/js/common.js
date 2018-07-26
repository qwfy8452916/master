
// 点击头部搜索框，弹出相关搜索下拉框
$(function(){
	var $searchHistoryContainer = $(".search-history-container"),
		$searchInput = $(".search-input");
	if( $searchHistoryContainer.length > 0 && $searchInput.length > 0 ){
		$searchInput.on("click",function(event){
			event.stopPropagation();
			var searchTextArr = localStorage.getItem("searchText") ? JSON.parse(localStorage.getItem("searchText")) : [];
			$searchHistoryContainer.html("");
			if( searchTextArr.length > 0 ){
				var htmlStr = "";
				$.each(searchTextArr,function(index,item){
					htmlStr+='<li><a href="http://jiaju.qizuang.com/all/'+item+'">'+item+'</a><span class="del" data-type="del-search-word" data-index="'+index+'">删除</span></li>';
				});
				htmlStr+='<li id="del-all-search-word"><span class="del" data-type="del-all-search-word">全部删除</span></li>';
				$searchHistoryContainer.append(htmlStr);
				$searchHistoryContainer.addClass("db");
			}
		});
		$(document).on("click",function(){
			$searchHistoryContainer.removeClass("db");
		});
	}
});

// 点击搜索按钮，判断是否有搜索词并保存搜索词到本地存储，监听回车按钮
$(function(){
	var $searchBtn = $(".search-btn"),
		$searchInput = $(".search-input");
	if( $searchBtn.length > 0 && $searchInput.length > 0 ){
		$searchBtn.on("click",function(event){
			event.preventDefault();
			var val = $searchInput.val();
			if( !val ){
				alert("请输入搜索词");
				return false;
			}
			dealStorage(val);
			location.href="http://jiaju.qizuang.com/all/?keywords="+val;
		});
		// 按回车启动搜索
		$searchInput.on("focus",function(){
			$(document).on("keyup.header",function(event){
				var val = $searchInput.val();
				if( event.keyCode == 13 ){
					if( !val ){
						alert("请输入搜索词");
						return false;
					}
					dealStorage(val);
					location.href="http://jiaju.qizuang.com/all/?keywords="+val;
				}
			});
		});
		// 失去焦点取消键盘事件监听
		$searchInput.on("blur",function(){
			$(document).off("keyup.header");
		});
	}
	// 这里要判断是否有重复搜索的词
	function dealStorage(val){
		var searchTextArr = localStorage.getItem("searchText") ? JSON.parse(localStorage.getItem("searchText")) : [],
			exist = false;
		for(var i=0,len=searchTextArr.length; i<len; i++){
			if( searchTextArr[i] == val ){
				exist = true;
			}
		}
		if(exist){
			return;
		}
		if( searchTextArr.length >= 10 ){
			searchTextArr.splice( 0 , searchTextArr.length - 9 );
		}
		searchTextArr.push(val);
		localStorage.setItem("searchText",JSON.stringify(searchTextArr));
	}
});

// 下拉搜索框删除事件
$(function(){
	var $searchHistoryContainer = $(".search-history-container");
	$searchHistoryContainer.on('click',function(event){
		event.stopPropagation();
		event.preventDefault();
		var $target = $(event.target);
		if( $target.attr("data-type") == "del-search-word" ){
			var index = $target.attr("data-index");
			$.when(delStorage(index)).done(function(){
				$target.closest("li").remove();
			});
		}else if( $target.attr("data-type") == "del-all-search-word" ){
			$.when(delStorage("all")).done(function(){
				$searchHistoryContainer.removeClass("db").html("");
			});
		}
	});
	function delStorage(index){
		if( !index){
			return;
		}
		var dtd = $.Deferred();
		var searchTextArr = localStorage.getItem("searchText") ? JSON.parse(localStorage.getItem("searchText")) : [];
		if( searchTextArr.length <= 0 ){
			return;
		}
		if( parseInt(index) == index ){
			searchTextArr.splice( index , 1 );
			localStorage.setItem("searchText",JSON.stringify(searchTextArr));
		}else if(index=="all"){
			localStorage.removeItem("searchText");
		}
		dtd.resolve();
		return dtd.promise();
	}
});

$(function(){
	$(document).on("click",function(event){
		var $target = $(event.target);
		if( $target[0].nodeName.toLowerCase() == "a" && $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "sign-out"){
			ajaxAction({
				url : Global_Sign_Out_Url,
				method : "post",
				successCallback : function(res){
					if( res.status == 1 ){
						location.reload();
					}
				}
			});
		}
	});
});
// 登录注册框忘记密码修改密码等弹窗显示隐藏功能
$(function(){
	var $siginBtn = $("span[data-type='signin-btn']"),
		$registerBtn = $("span[data-type='register-btn']"),
		$useMask = $("div[data-type='user-mask']"),
		$siginContainer = $("div[data-type='signin-container']"),
		$registerContainer = $("div[data-type='register-container']"),
		$setPasswordContainer = $("div[data-type='set-password-container']"),
		$userContainerClose = $("span[data-type='user-container-close']"),
		$registerNextBtn = $("button[data-type='register-next-btn']"),
		$forgetPasswordBtn = $("span[data-type='forget-password-btn']"),
		$forgetPasswordContainer = $("div[data-type='forget-password-container']");
		// 页面顶部登录按钮
		$siginBtn.on("click",function(){
			$useMask.fadeIn();
			$registerContainer.fadeOut();
			$siginContainer.find("input").val("");
			$siginContainer.fadeIn();
		});
		// 页面顶部注册按钮
		$registerBtn.on("click",function(){
			$useMask.fadeIn();
			$registerContainer.find(".user-caption").text("注册");
			$registerContainer.find("span[data-type='get-token']").text("获取验证码");
			$registerContainer.find("button[data-type='register-next-btn']").attr("data-purpose","");
			$registerContainer.find("input").val("");
			$registerContainer.find("button[data-type='register-next-btn']").attr("data-purpose","register");
			$registerContainer.fadeIn();
			$siginContainer.fadeOut();
		});
		// 弹窗关闭按钮
		$userContainerClose.on("click",function(){
			$(this).parent().fadeOut().find("input").val("");
			$(this).parent().find(".user-tips").css("opacity",0);
			$(this).parent().find(".user-btn").attr("disabled",true);
			$useMask.fadeOut();
		});
		// 注册弹窗下一步按钮
		$registerContainer.find("button[data-purpose='register']").on("click",function(){
			$registerContainer.fadeOut();
			$setPasswordContainer.fadeIn();
		});
		// 忘记密码弹窗
		$forgetPasswordBtn.on("click",function(){
			$siginContainer.fadeOut();
			$registerContainer.find(".user-caption").text("忘记密码");
			$registerContainer.find("button[data-type='register-next-btn']").attr("data-purpose","forget-password");
			$registerContainer.fadeIn();
		});

		// 忘记密码弹窗里的登录跳转
		$forgetPasswordContainer.find("div[data-type='sign'] > span").on("click",function(){
			$forgetPasswordContainer.fadeOut();
			$siginContainer.find("input").val("");
			$siginContainer.fadeIn();
		});
		// 忘记密码弹窗里的注册跳转
		$forgetPasswordContainer.find("div[data-type='reg'] > span").on("click",function(){
			$registerContainer.find(".user-caption").text("注册");
			$registerContainer.find("button[data-type='register-next-btn']").attr("data-purpose","");
			$forgetPasswordContainer.fadeOut();
			$registerContainer.find("input").val("");
			$registerContainer.find("button[data-type='register-next-btn']").attr("data-purpose","register");
			$registerContainer.fadeIn();
		});
		// 登录框立即注册
		$("a[data-type='register-now']").on("click",function(){
			$siginContainer.fadeOut();
			$registerContainer.find("input").val("");
			$registerContainer.find("button[data-type='register-next-btn']").attr("data-purpose","register");
			$registerContainer.fadeIn();
		});
		// 获取短信验证码
		$registerContainer.find("span[data-type='get-token']").on("click",function(){
			var val = $registerContainer.find("input[data-type='phone']").val(),
				_this = this;
			if( !checkPhoneNum(val) ){
				$registerContainer.find(".user-tips").text("输入正确的手机号").css("opacity",1);
				return;
			}
			$registerContainer.find(".user-tips").text("").css("opacity",0);
			// countDown(10, $(this), function(){
			// 				$(_this).text("重新获取");
			// 			});
			// return;
			ajaxAction({
				url : Global_Sms_url,
				method : "post",
				data : {
					tel : val
				},
				successCallback : function(res){
					if( res.status == 1 ){
						layer.msg(res.info);
						$registerContainer.find("input[data-type='token']").attr("disabled",false);
						countDown(10, $(_this), function(){
							$(_this).text("重新获取");
						});
					}
				}
			});
		});
})

// 登录注册框忘记密码修改密码等弹窗验证提交
$(function(){
	var $siginContainer = $("div[data-type='signin-container']"),
		$registerContainer = $("div[data-type='register-container']"),
		$setPasswordContainer = $("div[data-type='set-password-container']"),
		$forgetPasswordContainer = $("div[data-type='forget-password-container']");
	$(document).on("keyup",function(event){
		var $target = $(event.target);
		// 替换手机号输入框的非数字字符
		if( $target[0].nodeName.toLowerCase() == "input" && $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "phone" ){
			$target.val($target.val().replace(/\D/g,""));
		}
		// 保证昵称输入框只能输入20个字符
		if( $target[0].nodeName.toLowerCase() == "input" && $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "nickname" ){
			$target.val($target.val().slice(0,20));
		}
		// 判断是否要更改登录按钮状态
		if( $.trim($siginContainer.find("input[data-type='phone']").val()).length > 0 && $("input[data-type='sign-password']").val().length > 0 && $("button[data-type='sign-btn']").attr("disabled") == "disabled" ){
			changeStatus($("button[data-type='sign-btn']"),false);
		}
		// 判断是否要更改注册密码框下一步按钮状态
		if( $.trim($registerContainer.find("input[data-type='phone']").val()).length > 0 && $registerContainer.find("input[data-type='token']").val().length > 0 ){
			changeStatus($registerContainer.find("button[data-type='register-next-btn']"),false);
		}else{
			changeStatus($registerContainer.find("button[data-type='register-next-btn']"),true);
		}
		// 判断是否要更改忘记密码框第二步确认按钮状态
		if( $.trim($forgetPasswordContainer.find("input[data-type='password']").val()).length > 0 && $forgetPasswordContainer.find("input[data-type='confirm-password']").val().length > 0 ){
			changeStatus($forgetPasswordContainer.find("button[data-type='change-password-btn']"),false);
		}else{
			changeStatus($forgetPasswordContainer.find("button[data-type='change-password-btn']"),true);
		}
		// 判断是否要更改注册按钮状态
		if( $.trim($setPasswordContainer.find("input[data-type='nickname']").val()).length > 0 && $setPasswordContainer.find("input[data-type='password']").val().length > 0 && $setPasswordContainer.find("input[data-type='confirm-password']").val().length > 0 ){
			changeStatus($setPasswordContainer.find("button[data-type='register-btn']"),false);
		}else{
			changeStatus($setPasswordContainer.find("button[data-type='register-btn']"),true);
		}
		// 监听回车事件提交账号密码
		if( event.keyCode == 13 && $.trim($siginContainer.find("input[data-type='phone']").val()).length > 0 && $siginContainer.find("input[data-type='sign-password']").val().length > 0 ){
			submitAccount($siginContainer.find("input[data-type='phone']").val(), $siginContainer.find("input[data-type='sign-password']").val(), function(res){
				if( res.status == 1 ){
					location.reload();
				}else{
					$siginContainer.find(".user-tips").text(res.info).css("opacity",1);
				}
			});
		}
		// 监听回车事件提交手机号码和短信验证码判断是否匹配
		if( event.keyCode == 13 && $.trim($registerContainer.find("input[data-type='phone']").val()).length > 0 && $registerContainer.find("input[data-type='token']").val().length > 0 ){
			alert("验证手机号码和验证码是否匹配");
			submitPhoneAndToken($registerContainer.find("input[data-type='phone']").val(), $registerContainer.find("input[data-type='token']").val());
		}
		// 监听回车事件提交手机号码和短信验证码判断是否匹配
		if( event.keyCode == 13 && $.trim($forgetPasswordContainer.find("input[data-type='password']").val()).length > 0 && $forgetPasswordContainer.find("input[data-type='confirm-password']").val().length > 0 ){
			alert("修改密码数据提交");
			
		}
	});
	// 点击登录按钮事件
	$("button[data-type='sign-btn']").on("click",function(){
		var val = $siginContainer.find("input[data-type='phone']").val();
        if ( !checkPhoneNum(val) ) {
            $siginContainer.find(".user-tips").text("手机号码格式不正确").css("opacity",1);
            return;
        }
		submitAccount(val, $siginContainer.find("input[data-type='sign-password']").val(),function(res){
			if( res.status == 1 ){
				location.reload();
			}else{
				$siginContainer.find(".user-tips").text(res.info).css("opacity",1);
			}
		});
	});
	// 忘记密码"下一步"按钮事件，点击提交手机号码和短信验证码，验证是否匹配
	$registerContainer.on("click",function(event){
		var $target = $(event.target);
		submitPhoneAndToken($registerContainer.find("input[data-type='phone']").val(), $registerContainer.find("input[data-type='token']").val(),function(res){
			// 验证手机号短信验证码是否正确
			// if( !res.status ){
			// 	$registerContainer.find(".user-tips").text(res.info).css("opacity",1);
			// 	return;
			// }
			$registerContainer.find(".user-tips").text("").css("opacity",0);
			$registerContainer.fadeOut();
			if( $target.attr("data-purpose") && $target.attr("data-purpose").toLowerCase() == "forget-password" ){
				$forgetPasswordContainer.find("input[data-type='phone']").val($registerContainer.find("input[data-type='phone']").val());
				$forgetPasswordContainer.find("input[data-type='token']").val($registerContainer.find("input[data-type='token']").val());
				$forgetPasswordContainer.fadeIn();
			}else if($target.attr("data-purpose") && $target.attr("data-purpose").toLowerCase() == "register"){
				$setPasswordContainer.find("input[data-type='phone']").val($registerContainer.find("input[data-type='phone']").val());
				$setPasswordContainer.find("input[data-type='token']").val($registerContainer.find("input[data-type='token']").val());
				$setPasswordContainer.fadeIn();
			}
		});
	});
	// 忘记密码修改，提交修改数据
	$forgetPasswordContainer.on("click",function(event){
		var $target = $(event.target);
		if( $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "change-password-btn" ){
			submitForgetPassword($(this).find("input[data-type='phone']").val(), $(this).find("input[data-type='token']").val(), $(this).find("input[data-type='password']").val(), $(this).find("input[data-type='confirm-password']").val(), function(res){
				console.log(res);
				if( res.status == 1 ){
					location.reload();
				}else{
					layer.msg(res.info);
				}
			});
		}
	});
	// 提交注册账号数据
	$setPasswordContainer.on("click",function(event){
		var $target = $(event.target);
		if( $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "register-btn" ){
			submitRegister($(this).find("input[data-type='phone']").val(), $(this).find("input[data-type='token']").val(), $(this).find("input[data-type='nickname']").val(), $(this).find("input[data-type='password']").val(), $(this).find("input[data-type='confirm-password']").val(), function(res){
				console.log(res);
				return;
				if( res.status == 1 ){
					location.reload();
				}else{
					layer.msg(res.info);
				}
			});
		}
	});

	// 提交手机号码和密码进行登录
	function submitAccount(user, pass, callback){
		if( !user || !pass ){
			return;
		}
		ajaxAction({
			url : Global_SignIn_url,
			method : "post",
			data : {
				name : user,
				password : pass
			},
			successCallback : function(res){
				callback && callback.call(null,res); 
			}
		});
	}
	// 验证手机号和短信验证码是否匹配
	function submitPhoneAndToken(phone, token, callback){
		if( !phone || !token ){
			return;
		}
		ajaxAction({
			url : Global_SignIn_url,
			method : "post",
			data : {
				tel : phone,
				code : token
			},
			successCallback : function(res){
				callback && callback.call(null,res);
			}
		});
	}
	// 提交忘记密码相关数据
	function submitForgetPassword(phone, token, password, repassword, callback){
		if( !phone || !token || !password || !repassword ){
			return;
		}
		ajaxAction({
			url : Global_Edit_Password_url,
			method : "post",
			data : {
				tel : phone,
				code : token,
				pass : password,
				repass : repassword
			},
			successCallback : function(res){
				callback && callback.call(null,res);
			}
		});
	}
	// 提交注册数据
	function submitRegister(phone, token, nikename, password, repassword, callback){
		if( !phone || !token || !nikename || !password || !repassword ){
			return;
		}
		ajaxAction({
			url : Global_Register_url,
			method : "post",
			data : {
				tel : phone,
				code : token,
				pass : password,
				repass : repassword,
				nick_name : nikename
			},
			successCallback : function(res){
				callback && callback.call(null,res);
			}
		});
	}

	// 修改禁用表单控件状态
	function changeStatus(ele,bool){
		if( $(ele).length <=0 ){
			return;
		}
		$(ele).attr("disabled",bool);
	}
});




// ajax请求，所有的请求都通过这里发送
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

// 验证手机号
function checkPhoneNum(str){
	if( !str ){
		return;
	}
	var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
	return reg.test(str);
}

// 60s倒计时
function countDown(sec, ele, callback){
	if( $(ele).length <= 0 ){
		return;
	}
	var s = sec || 60;
	$(ele).text(s+"s");
	function calc(){
		setTimeout(function(){
			s--;
			$(ele).text(s+"s");
			if( s > 0 ){
				calc();
			}else{
				callback && callback.call();
			}
		},1000);
	}
	calc();
}