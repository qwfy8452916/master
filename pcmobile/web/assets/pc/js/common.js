// 60s倒计时定时器变量
var timer = null;
// 点击头部搜索框，弹出相关搜索下拉框
$(function(){
	var $searchHistoryContainer = $(".search-history-container"),
		$searchInput = $(".search-input");
	if( $searchHistoryContainer.length > 0 && $searchInput.length > 0 ){
		$searchInput.on("click",function(event){
			event.stopPropagation();
			updateHistory();
		});
		$searchInput.on("keyup",function(event){
			if( $(this).val().length > 30 ){
				$(this).val($(this).val().slice(0,30));
			}
		});
		$(document).on("click",function(){
			$searchHistoryContainer.removeClass("db");
		});
	}

	// 删除缓存中的数据
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
	// 更新下拉框中的数据
	function updateHistory(){
		var searchTextArr = localStorage.getItem("searchText") ? JSON.parse(localStorage.getItem("searchText")) : [];
		$searchHistoryContainer.html("");
		if( searchTextArr.length > 0 ){
			var htmlStr = "";
			$.each(searchTextArr,function(index,item){
				htmlStr+='<li><a href="http://jiaju.qizuang.com/all/?keywords='+item+'">'+item+'</a><span class="del" data-type="del-search-word" data-index="'+index+'">删除</span></li>';
			});
			htmlStr+='<li id="del-all-search-word"><span class="del" data-type="del-all-search-word">全部删除</span></li>';
			$searchHistoryContainer.append(htmlStr);
			$searchHistoryContainer.addClass("db");
			// 下拉搜索框删除事件，单个删除
			$searchHistoryContainer.find("span[data-type='del-search-word']").on("click",function(event){
				event.stopPropagation();
				var index = $(this).attr("data-index");
				console.log(index);
				$.when(delStorage(index)).done(function(){
					updateHistory();
				});
			});
			// 下拉搜索框删除事件，删除全部
			$searchHistoryContainer.find("span[data-type='del-all-search-word']").on("click",function(event){
				event.stopPropagation();
				$.when(delStorage("all")).done(function(){
					$searchHistoryContainer.removeClass("db").html("");
				});
			});
		}
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
			if( !val || val == "找任何你想要的家具" ){
				// alert("请输入搜索词");
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
						// alert("请输入搜索词");
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
			searchTextArr.pop();
		}
		searchTextArr.unshift(val);
		localStorage.setItem("searchText",JSON.stringify(searchTextArr));
	}
});

// 退出登录
$(function(){
	$(document).on("click",function(event){
		var $target = $(event.target);
		if( $target[0].nodeName.toLowerCase() == "a" && $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "sign-out"){
			ajaxAction({
				url : Global_Sign_Out_Url,
				method : "post",
				successCallback : function(res){
					if( res.status == 1 ){
					    if(window.location.href.indexOf("/user/") > -1){
					        window.location.href = "/"
                        }else{
                            location.reload();
                        }

					}
				}
			});
		}
	});
});
// IE8遮罩层点击穿透处理
$(function () {
	$("div[data-type='user-mask']").on("click",function (event) {
		event.preventDefault();
		event.stopPropagation();
		return false;
    });
});
// IE8文字被placeholder插件改变颜色
$(function () {
    $("html,body").on("keyup","input",function(){
        if($(this).val().length>0){
            $(this).css('color',"#666");
        }else{
            $(this).css('color',"#999");
        }
    });
})
// 登录注册框忘记密码修改密码等弹窗显示隐藏功能
$(function(){
	var $siginBtn = $("span[data-type='signin-btn']"),
		$registerBtn = $("span[data-type='register-btn']"),
		$useMask = $("iframe[data-type='user-mask']"),
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
			$registerContainer.find("button[data-type='get-token']").attr("disabled",true).text("获取验证码");
			$registerContainer.find("input").val("");
			$registerContainer.find("button[data-type='register-next-btn']").attr("data-purpose","register").attr("disabled",true);
			$registerContainer.fadeIn();
			$siginContainer.fadeOut();
            // 防止重复绑定先解绑再绑定
            $registerContainer.find("button[data-type='get-token']").off("click");
            $registerContainer.find("button[data-type='get-token']").on("click",getSms);
		});
		// 弹窗关闭按钮
		$userContainerClose.on("click",function(){
			var $pbox = $(this).parent(), $getTokenBtn = $pbox.find("button[data-type='get-token']");
			$pbox.fadeOut().find("input").val("");
			$pbox.find(".user-tips").css("opacity",0);
			$pbox.find(".user-btn").attr("disabled",true);
			if(timer){
				clearTimeout(timer);
				timer = null;
			}
			if( $getTokenBtn.length > 0 ){
				$registerContainer.find("button[data-type='get-token']").off("click");
				// 将解绑的事件绑定回去
				$registerContainer.find("button[data-type='get-token']").on("click",getSms);
			}
			$useMask.fadeOut();
		});
		// 注册弹窗下一步按钮
		$registerContainer.find("button[data-purpose='register']").on("click",function(){
			$registerContainer.fadeOut();
			$setPasswordContainer.fadeIn("fast",function(){
				checkNickName();
				checkPassword();
			});
		});
		// 忘记密码弹窗
		$forgetPasswordBtn.on("click",function(){
			$siginContainer.fadeOut();
			$registerContainer.find(".user-caption").text("忘记密码");
			$registerContainer.find("button[data-type='register-next-btn']").attr("data-purpose","forget-password");
			$registerContainer.find("input[data-type='phone']").val("");
			$registerContainer.find("input[data-type='token']").val("").attr("disabled",true);
			$registerContainer.find("button[data-type='get-token']").attr("disabled",true);
			$registerContainer.find("button[data-type='get-token']").text("获取验证码");
			$registerContainer.find(".user-tips").text("").css("opacity",0);
			$registerContainer.fadeIn();
            // 防止重复绑定先解绑再绑定
            $registerContainer.find("button[data-type='get-token']").off("click");
            $registerContainer.find("button[data-type='get-token']").on("click",getSms);
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
			$registerContainer.find("input[data-type='token']").attr("disabled",true);
			$registerContainer.find("button[data-type='get-token']").attr("disabled",true);
			$registerContainer.find("button[data-type='get-token']").text("获取验证码");
			$registerContainer.fadeIn();
		});
		// 获取短信验证码
		$registerContainer.find("button[data-type='get-token']").on("click",getSms);

		function getSms(event){
			var val = $registerContainer.find("input[data-type='phone']").val(),
				purpose = $registerContainer.find("button[data-type='register-next-btn']").attr("data-purpose"),
				checkUserV = 2;
			if( !checkPhoneNum(val) ){
				$registerContainer.find(".user-tips").text("输入正确的手机号").css("opacity",1);
				return;
			}
			if( purpose == "register" ){
				checkUserV = 1;
			}
			$registerContainer.find(".user-tips").text("").css("opacity",0);
			$registerContainer.find("input[data-type='token']").attr("disabled",false);
			ajaxAction({
				url : Global_Sms_url,
				method : "post",
				data : {
					tel : val,
					checkUser : checkUserV
				},
				successCallback : function(res){
					if( !res.status ){
						$registerContainer.find(".user-tips").text(res.info).css("opacity",1);
					}else if( res.status == 1 ){
						layer.msg(res.info);
						$registerContainer.find("input[data-type='token']").attr("disabled",false);
						countDown(60, $registerContainer.find("button[data-type='get-token']"), function(){
							$registerContainer.find("button[data-type='get-token']").text("重新获取");
							// $registerContainer.find("button[data-type='get-token']").attr("disabled",false);
							$registerContainer.find("button[data-type='get-token']").on("click",getSms);
						});
					}
				}
			});
		}
})

// 登录注册框忘记密码修改密码等弹窗验证提交
$(function(){
	var $siginContainer = $("div[data-type='signin-container']"),
		$registerContainer = $("div[data-type='register-container']"),
		$setPasswordContainer = $("div[data-type='set-password-container']"),
		$forgetPasswordContainer = $("div[data-type='forget-password-container']");

	// 监听keyup事件
	$(document).on("keyup",function(event){
        event.stopPropagation();
		var $target = $(event.target);
		// 所有输入框禁止空格输入
		if( $target[0].nodeName.toLowerCase() == "input" && event.keyCode == 32 ){
			$target.val($target.val().replace(/\s+/g,""));
		}
		// 替换手机号输入框的非数字字符
		if( $target[0].nodeName.toLowerCase() == "input" && $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "phone" ){
			$target.val($target.val().replace(/\D/g,""));
		}
		// 保证昵称输入框只能输入20个字符，搜狗兼容模式下，下面这个会导致无法输入中文
		if( $target[0].nodeName.toLowerCase() == "input" && $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "nickname" ){
            $target.val($target.val().replace(/[~'!@#￥$%^&*()-+_\-=:\.\/]/g,""));
		    $target.val($target.val().slice(0,20));
		}
		// 保证密码输入框只能输入20个字符
		if( $target[0].nodeName.toLowerCase() == "input" && $target.attr("type") && $target.attr("type").toLowerCase() == "password" ){
			$target.val($target.val().slice(0,20));
		}
		// 保证验证码只能输入6个字符
		if( $target[0].nodeName.toLowerCase() == "input" && $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "token" ){
			$target.val($target.val().slice(0,6));
		}
		// 判断是否要更改登录按钮状态
		if( $.trim($siginContainer.find("input[data-type='phone']").val()).length > 0 && $("input[data-type='sign-password']").val().length > 0 && $("button[data-type='sign-btn']").attr("disabled") == "disabled" ){
			changeStatus($("button[data-type='sign-btn']"),false);
		}
		if( $.trim($siginContainer.find("input[data-type='phone']").val()).length <= 0 || $("input[data-type='sign-password']").val().length <= 0 ){
			changeStatus($("button[data-type='sign-btn']"),true);
		}
		// 判断是否要更改注册密码框下一步按钮状态
		if( $.trim($registerContainer.find("input[data-type='phone']").val()).length > 0 && $registerContainer.find("input[data-type='token']").val().length > 0 ){
			changeStatus($registerContainer.find("button[data-type='register-next-btn']"),false);
		}
		if( $.trim($registerContainer.find("input[data-type='phone']").val()).length <= 0 || $registerContainer.find("input[data-type='token']").val().length <= 0 ){
			changeStatus($registerContainer.find("button[data-type='register-next-btn']"),true);
		}
		// 判断是否要更改忘记密码框第二步确认按钮状态
		if( $.trim($forgetPasswordContainer.find("input[data-type='password']").val()).length > 0 && $forgetPasswordContainer.find("input[data-type='confirm-password']").val().length > 0 ){
			changeStatus($forgetPasswordContainer.find("button[data-type='change-password-btn']"),false);
		}
		if( $.trim($forgetPasswordContainer.find("input[data-type='password']").val()).length <= 0 || $forgetPasswordContainer.find("input[data-type='confirm-password']").val().length <= 0 ){
			changeStatus($forgetPasswordContainer.find("button[data-type='change-password-btn']"),true);
		}
		// 判断是否要更改注册按钮状态
		if( $.trim($setPasswordContainer.find("input[data-type='nickname']").val()).length > 0 && $setPasswordContainer.find("input[data-type='password']").val().length > 0 && $setPasswordContainer.find("input[data-type='confirm-password']").val().length > 0 ){
			changeStatus($setPasswordContainer.find("button[data-type='register-btn']"),false);
		}
		if( $.trim($setPasswordContainer.find("input[data-type='nickname']").val()).length <= 0 || $setPasswordContainer.find("input[data-type='password']").val().length <= 0 || $setPasswordContainer.find("input[data-type='confirm-password']").val().length <= 0 ){
			changeStatus($setPasswordContainer.find("button[data-type='register-btn']"),true);
		}
		// 判断是否要更改获取验证码按钮，输入框验证码状态
		if( $.trim($registerContainer.find("input[data-type='phone']").val()).length > 0 ){
			$registerContainer.find("button[data-type='get-token']").attr("disabled",false);
		}
		if( $.trim($registerContainer.find("input[data-type='phone']").val()).length <= 0 ){
			$registerContainer.find("input[data-type='token']").attr("disabled",true);
			$registerContainer.find("button[data-type='get-token']").attr("disabled",true);
		}
		// 监听回车事件提交账号密码
		if( event.keyCode == 13 && $.trim($siginContainer.find("input[data-type='phone']").val()).length > 0 && $siginContainer.find("input[data-type='sign-password']").val().length > 0 ){
            if($siginContainer.find("input[data-type='phone']").val() == "手机号" || $siginContainer.find("input[data-type='sign-password']").val() == "密码"){
                return;
            };
			siginAction();
		}
		// 监听回车事件提交手机号码和短信验证码判断是否匹配
		if( event.keyCode == 13 && $.trim($registerContainer.find("input[data-type='phone']").val()).length > 0 && $registerContainer.find("input[data-type='token']").val().length > 0 ){
			if($registerContainer.find("input[data-type='phone']").val() == "手机号" || $registerContainer.find("input[data-type='token']").val() == "验证码"){
				return;
			};
			checkPATAction();
		}
		// 监听回车事件提交修改密码相关数据
		if( event.keyCode == 13 && $.trim($forgetPasswordContainer.find("input[data-type='password']").val()).length > 0 && $forgetPasswordContainer.find("input[data-type='confirm-password']").val().length > 0 ){
            if($forgetPasswordContainer.find("input[data-type='password']").val() == "密码" || $forgetPasswordContainer.find("input[data-type='confirm-password']").val() == "确认密码"){
                return;
            };
			forgetAction($forgetPasswordContainer);
		}
		// 监听回车事件提交注册信息，注意要判断是否存在手机号及验证码
		if( event.keyCode == 13 && $setPasswordContainer.find("input[data-type='nickname']").length > 0 && $setPasswordContainer.find("input[data-type='password']").length > 0 && $setPasswordContainer.find("input[data-type='confirm-password']").length > 0 ){
            if($setPasswordContainer.find("input[data-type='nickname']").val() == "昵称" || $setPasswordContainer.find("input[data-type='password']").val() == "密码" || $setPasswordContainer.find("input[data-type='confirm-password']").val() == "确认密码"){
                return;
            };
			registerAction($setPasswordContainer);
		}
	});
	// 监听paste事件
    $(document).on("paste",function (event) {
        var val = "", $target = $(event.target), $parentBox = null;
        if( $target[0].nodeName.toLowerCase() !== "input" ){
            return;
        }
        if (window.clipboardData && window.clipboardData.getData){
            val = $target.val() + window.clipboardData.getData('Text');
        }else{
            val = $target.val() + event.originalEvent.clipboardData.getData("Text");
        }
        $parentBox = $target.closest("div[data-type]");
        switch ($parentBox.attr("data-type").toLowerCase()) {
            case "signin-container":
                var $signBox = $("div[data-type='signin-container']");
                if( val.length > 0 ){
                    if( $target.attr("data-type").toLowerCase() == "phone" ){
                        if( $signBox.find("input[data-type='sign-password']").val().length > 0 ){
                            changeStatus($signBox.find("button[data-type='sign-btn']"),false);
                        }
                    }
                    if( $target.attr("data-type").toLowerCase() == "sign-password" ){
                        if( $signBox.find("input[data-type='phone']").val().length > 0 ){
                            changeStatus($signBox.find("button[data-type='sign-btn']"),false);
                        }
                    }
                }
                break;
            case "register-container":
                var $regBox = $("div[data-type='register-container']");
                if( val.length > 0 ){
                    if( $target.attr("data-type").toLowerCase() == "phone" ){
                        if( $regBox.find("input[data-type='token']").val().length > 0 ){
                            changeStatus($regBox.find("button[data-type='register-next-btn']"),false);
                        }
                    }
                    if( $target.attr("data-type").toLowerCase() == "token" ){
                        if( $regBox.find("input[data-type='phone']").val().length > 0 ){
                            changeStatus($regBox.find("button[data-type='register-next-btn']"),false);
                        }
                    }
                }
                break;
            case "set-password-container":
                var $setBox = $("div[data-type='set-password-container']");
                if( val.length > 0 ){
                    if( $target.attr("data-type").toLowerCase() == "nickname" ){
                        if( $setBox.find("input[data-type='password']").val().length > 0 && $setBox.find("input[data-type='confirm-password']").val().length > 0 ){
                            changeStatus($setBox.find("button[data-type='register-btn']"),false);
                        }
                    }
                    if( $target.attr("data-type").toLowerCase() == "password" ){
                        if( $setBox.find("input[data-type='nickname']").val().length > 0 && $setBox.find("input[data-type='confirm-password']").val().length > 0 ){
                            changeStatus($setBox.find("button[data-type='register-btn']"),false);
                        }
                    }
                    if( $target.attr("data-type").toLowerCase() == "confirm-password" ){
                        if( $setBox.find("input[data-type='nickname']").val().length > 0 && $setBox.find("input[data-type='password']").val().length > 0 ){
                            changeStatus($setBox.find("button[data-type='register-btn']"),false);
                        }
                    }
                }
                break;
            case "forget-password-container":
                var $forgetBox = $("div[data-type='forget-password-container']");
                if( val.length > 0 ){
                    if( $target.attr("data-type").toLowerCase() == "password" ){
                        if( $forgetBox.find("input[data-type='confirm-password']").val().length > 0 ){
                            changeStatus($forgetBox.find("button[data-type='change-password-btn']"),false);
                        }
                    }
                    if( $target.attr("data-type").toLowerCase() == "token" ){
                        if( $forgetBox.find("input[data-type='password']").val().length > 0 ){
                            changeStatus($forgetBox.find("button[data-type='change-password-btn']"),false);
                        }
                    }
                }
                break;
            default:
                break;
        }
    });
	// 点击登录按钮事件
	$("button[data-type='sign-btn']").on("click",siginAction);

	// 忘记密码/注册"下一步"按钮事件，点击提交手机号码和短信验证码，验证是否匹配
	$registerContainer.on("click",function(event){
		var $target = $(event.target);
		if( $target[0].nodeName.toLowerCase() == "button" && $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "register-next-btn"){
			checkPATAction();
		}
	});
	// 忘记密码修改，提交修改数据
	$forgetPasswordContainer.on("click",function(event){
		var $target = $(event.target);
		if( $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "change-password-btn" ){
			forgetAction($(this));
		}
	});
	// 提交注册账号数据
	$setPasswordContainer.on("click",function(event){
		var $target = $(event.target);
		if( $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "register-btn" ){
			registerAction($setPasswordContainer);
		}
	});

	function registerAction(ele){
		var $ele = $(ele);
		if( $ele.length <= 0 ){
			return;
		}
		var $tipsBox = $ele.find(".user-tips"),
			phoneV = $ele.find("input[data-type='hidden-phone']").val(),
			token = $ele.find("input[data-type='hidden-token']").val(),
			nickname = $ele.find("input[data-type='nickname']").val(),
			password = $ele.find("input[data-type='password']").val(),
			repassword = $ele.find("input[data-type='confirm-password']").val();
        // 由于打开设置密码框的时候input值已经被手动清空，所以直接判断值即可，IE下给按钮设置disabled，其点击事件已经可以执行，因此要做如下判断
		if( nickname == "昵称" || password == "" || repassword == "" ){
			return;
		}
		if( !phoneV || !token ){
			$tipsBox.text("手机号/验证码不正确").css("opacity",1)
			return;
		}
		$tipsBox.text("").css("opacity",0);
		if( nickname.length > 20 ){
			$tipsBox.text("昵称最多输入20位字符").css("opacity",1);
			return;
		}else{
			$tipsBox.text("").css("opacity",0);
		}
		if( nickname.length < 4 ){
			$tipsBox.text("昵称格式不正确").css("opacity",1);
			return;
		}else{
			$tipsBox.text("").css("opacity",0);
		}
		if( calcCharacterSize(password) < 6 ){
			$tipsBox.text("密码必须为6-20位字母、数字或符号").css("opacity",1);
			return;
		}else{
			$tipsBox.text("").css("opacity",0);
		}
		if( password !== repassword){
			$tipsBox.text("两次密码不一致").css("opacity",1);
			return;
		}else{
			$tipsBox.text("").css("opacity",0);
		}
		submitRegister(phoneV, token, nickname, password, repassword, function(res){
			if( res.status == 1 ){
				layer.msg("注册成功", {time:1000}, function(){
					location.reload();
				});
			}else{
				layer.msg(res.info);
			}
		});
	}
	// 提交忘记密码相关信息
	function forgetAction(ele){
		var $ele = $(ele);
		if( $ele.length <= 0 ){
			return;
		}
		var $tipsBox = $ele.find(".user-tips"),
			phoneV = $ele.find("input[data-type='hidden-phone']").val(),
			token = $ele.find("input[data-type='hidden-token']").val(),
			password = $ele.find("input[data-type='password']").val(),
			repassword = $ele.find("input[data-type='confirm-password']").val();
		$tipsBox.text("").css("opacity",0);
		// 由于打开重置密码框的时候input值已经被手动清空，所以直接判断值即可,IE下给按钮设置disabled，其点击事件已经可以执行，因此要做如下判断
		if( password == "" || repassword == "" ){
			return;
		}
		if( !phoneV || !token ){
			alert("手机号/验证码不正确");
			return;
		}
		if( calcCharacterSize(password) < 6 ){
			$tipsBox.text("密码必须为6-20位字母、数字或符号").css("opacity",1);
			return;
		}else{
			$tipsBox.text("").css("opacity",0);
		}

		if( password !== repassword){
			$tipsBox.text("两次密码不一致").css("opacity",1);
			return;
		}else{
			$tipsBox.text("").css("opacity",0);
		}
		submitForgetPassword(phoneV, token, password, repassword, function(res){
			if( res.status == 1 ){
				layer.msg(res.info, {time:1000}, function(){
					$ele.find("input").each(function(index,item){
						$(item).val("");
					});
					$ele.fadeOut();
					$siginContainer.fadeIn();
				});
				
			}else{
				$tipsBox.text(res.info).css("opacity",1);
			}
		});
	}
	// 检测手机号和验证码是否匹配
	function checkPATAction(){
		// alert("验证手机号短信验证码是否正确");
		// return;
		var phoneV = $registerContainer.find("input[data-type='phone']").val(),
			tokenV = $registerContainer.find("input[data-type='token']").val(),
			purpose = $registerContainer.find("button[data-type='register-next-btn']").attr("data-purpose") && $registerContainer.find("button[data-type='register-next-btn']").attr("data-purpose").toLowerCase(),
			checkUser = 1;
		if( purpose == "forget-password" ){
			var checkUser = 2;
		}else if(purpose == "register"){
			var checkUser = 1;
		}
		$registerContainer.find(".user-tips").text("").css("opacity",0);
		submitPhoneAndToken(phoneV, tokenV, checkUser, function(res){
			// 验证手机号短信验证码是否正确
			if( !res.status ){
				$registerContainer.find(".user-tips").text(res.info).css("opacity",1);
				return;
			}
			$registerContainer.find(".user-tips").text("").css("opacity",0);
			$registerContainer.fadeOut();
			if( purpose == "forget-password" ){
				$forgetPasswordContainer.find("input[data-type='hidden-phone']").val(phoneV);
				$forgetPasswordContainer.find("input[data-type='hidden-token']").val(tokenV);
				// 清除IE8下placehoder插件设置的值，否则会有点号，因为input类型为password
                $forgetPasswordContainer.find("input[data-type='password']").val("");
                $forgetPasswordContainer.find("input[data-type='confirm-password']").val("");

				$forgetPasswordContainer.fadeIn().find(".user-tips").text("").css("opacity",0);
			}else if(purpose == "register"){
				$setPasswordContainer.find("input[data-type='hidden-phone']").val(phoneV);
				$setPasswordContainer.find("input[data-type='hidden-token']").val(tokenV);
                // 清除IE8下placehoder插件设置的值，否则会有点号，因为input类型为password
                $setPasswordContainer.find("input[data-type='nickname']").val("");
                $setPasswordContainer.find("input[data-type='password']").val("");
                $setPasswordContainer.find("input[data-type='confirm-password']").val("");

				$setPasswordContainer.fadeIn("fast",function(){
					checkNickName();
					checkPassword();
				}).find(".user-tips").text("").css("opacity",0);
			}
			// 清空输入框的值，防止回车重复验证
			$registerContainer.find("input[data-type='phone']").val("");
			$registerContainer.find("input[data-type='token']").val("");
		});
	}
	// 登录
	function siginAction(){
		var val = $siginContainer.find("input[data-type='phone']").val();
	    if ( !checkPhoneNum(val) ) {
	        $siginContainer.find(".user-tips").text("请输入正确的手机号").css("opacity",1);
	        return;
	    }
		submitAccount(val, $siginContainer.find("input[data-type='sign-password']").val(),function(res){
			if( res.status == 1 ){
				location.reload();
			}else{
				$siginContainer.find(".user-tips").text(res.info).css("opacity",1);
			}
		});
	}

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
	function submitPhoneAndToken(phone, token, checkUser, callback){
		if( !phone || !token || !checkUser ){
			return;
		}
		ajaxAction({
			url : Global_Check_Phone_Url,
			method : "post",
			data : {
				tel : phone,
				code : token,
				checkUser : checkUser
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

	// 检测昵称长度是否符合要求
	function checkNickName(){
		$setPasswordContainer.find("input[ata-type='nickname']").on("blur.nickname",function(){
			if( calcCharacterSize($(this).val()) > 20 ){
				$setPasswordContainer.find(".user-tips").text("昵称最多输入20位字符").css("opacity",1);
			}else{
				$setPasswordContainer.find(".user-tips").text("").css("opacity",0);
			}
		});
	}

	// 检测密码位数
	function checkPassword(){
		$setPasswordContainer.find("input[ata-type='password']").on("blur.password",function(){
			if( calcCharacterSize($(this).val()) < 8 ){
				$setPasswordContainer.find(".user-tips").text("密码最少8位").css("opacity",1);
			}else{
				$setPasswordContainer.find(".user-tips").text("").css("opacity",0);
			}
		});
	}
});

$(function(){
	// 点击头像打开用户信息中心
	if( $(".avatar-container").length > 0 ){
		$(".avatar-container").on('click',function(event){
			event.stopPropagation();
			$(".header-user-container").fadeIn();
		});
	}
	$(document).on("click",function(){
		$(".header-user-container").fadeOut();
	});
})

// 兼容IE8 鼠标移入放大
$(function () {
    scaleCompatible(".icheap-price-today .thumb");
    scaleCompatible(".ispecial-list .thumb");
    scaleCompatible(".other-special-list .thumb");
    scaleCompatible(".isale-list .thumb");
})


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
	// $(ele).attr('disabled',true);
	$(ele).off("click");
	$(ele).text(s+"s");
	function calc(){
		timer = setTimeout(function(){
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

// 计算字符串长度
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


// IE兼容处理
if(navigator.userAgent.indexOf("MSIE 10") > 0){
	$(".search-btn").css("height","42px");
}

// IE8 鼠标移入图片放大兼容
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