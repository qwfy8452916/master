<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="用户中心">
    <meta name="description" content="用户中心">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <title>登录-齐装网</title>
    <link rel="Shortcut Icon" href="<?php echo ($static_host); ?>/favicon.ico" type="image/x-icon" />
<link href="<?php echo ($static_host); ?>/assets/common/css/public.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/tooltips/tooltips.css?v=<?php echo C('STATIC_VERSION');?>">
<link href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/all.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet">
<link href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/minimal/red.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet">
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/order.js?v=<?php echo C('ORDER_JS_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/tooltips/jquery.pure.tooltips.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/icheck/icheck.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/cors.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.cookie.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/popwin.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($cityfile); ?>"></script>
<!--[if lte IE 7]>
    <script  type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/json2.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<![endif]-->
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet">
    <link href="<?php echo ($static_host); ?>/assets/user/index/css/default_g1101120180822.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="menutop">
    <div class="wrap">
        <div class="subnav">
            <a href="http://<?php echo C('QZ_YUMINGWWW');?>/" target="_blank">首页</a>
            <a href="http://<?php echo C('QZ_YUMINGWWW');?>/zhaobiao/" target="_blank">设计与报价</a>
            <a href="http://meitu.<?php echo C('QZ_YUMING');?>/" target="_blank">效果图</a>
            <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/" target="_blank">装修攻略</a>
            <a href="http://<?php echo C('QZ_YUMINGWWW');?>/wenda/" target="_blank">装修问答</a>
        </div>
        <div class="login">
            <ul>
                <li>
                <span><a href="http://u.qizuang.com">登录</a></span>
                <span><a href="http://u.qizuang.com/reg/">注册</a></span>
                </li>
                <li class="line">|</li>
                <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/zhaobiao/" class="hot" target="_blank">免费招标</a> </li>
                <li class="line">|</li>
                <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/xgt/" target="_blank">装修案例</a> </li>
                <li> 服务热线：<strong><?php echo OP('QZ_CONTACT_TEL400');?></strong> </li>
            </ul>
        </div>
    </div>
</div>

<div class="wrap">
    <div class="loginlogo">
        <a class="logo" href="http://<?php echo C('QZ_YUMINGWWW');?>/"><img src="<?php echo ($static_host); ?>/assets/common/pic/logo.jpg"
                                                                 alt="齐装网"/></a>
    </div>
</div>
<style>
    .tab-nav {
        margin-bottom: 15px;
    }
</style>
<div class="loginbg">
    <div class="wrap">
        <div class="loginbgby">
            <img src="<?php echo ($static_host); ?>/assets/common/img/0918105202.jpg" width="540" height="340" alt="登录齐装网">
            <div class="zhezhao"></div>
        </div>
        <div class="loginbox">
            <div class="tab" id="tab">
                <div class="tab-nav j-tab-nav">
                    <a href="javascript:void(0);" class="current">帐号登录</a>
                    <a href="javascript:void(0);">验证码登录</a>
                </div>
                <div class="tab-con">
                    <div class="j-tab-con">
                        <div class="tab-con-item reg-user" style="display:block;">
                            <div class="loginput">
                                <input name="name" type="text" class="log" placeholder="用户名" value="">
                                <div class="tips nametishi"></div>
                            </div>
                            <div class="loginput">
                                <input name="password" type="password" class="res" placeholder="密码" value="">
                                <div class="tips times-tip password—tip"></div>
                            </div>
                            <div class="control-group verity" style="display: none">
                                <?php echo ($verify); ?>
                            </div>
                            <p class="yzm-tips"><i class="fa fa-check-square"></i>验证码已发送手机，有效时间为30分钟，请及时查收</p>
                            <div class="logintit">
                                <i>还没有齐装帐号？<a href="/reg/" target="_blank">点击注册»</a></i>
                            </div>
                            <div class="login-info">
                                <i><a href="/getpassword/" target="_blank">忘记密码？</a></i>
                            </div>
                            <div class="btn">
                                <button class="logbtn" id="login_show_verifysmscode" style="display: none">点击验证</button>
                                <button class="logbtn" id="login_show_login">登录</button>
                                <input type="hidden" id="but_style" value="1">
                            </div>
                            <div class="other">
                                <i>第三方帐号登录：</i>
                                <a href="http://oauthtmp.qizuang.com/loginfromqq" title="QQ登录" class="qqlogin"></a>
                                <a href="http://oauthtmp.qizuang.com/loginfromsina" title="新浪微博登录" class="weibologin"></a>
                                <a href="http://oauthtmp.qizuang.com/loginfromwechat" title="微信登录" class="tblogin"></a>
                            </div>
                        </div>
                        <div class="tab-con-item  reg-company">
                            <div class="loginput">
                                <input name="yonghuming" type="text" class="yonghuming" placeholder="用户名" value="">
                                <div class="tishi usertishi"></div>
                            </div>
                            <div class="loginput">
                                <input name="yanzhengma" type="text" class="yanzhengma" placeholder="验证码" value="">
                                <button class="getyanzcode">获取验证码</button>
                                <!-- <input class="getyanzcode" type="button" value="获取验证码"> -->
                                <div class="tishi yzmtishi"></div>
                            </div>
                            <div class="logintit">
                                <i>还没有齐装帐号？<a href="/reg/" target="_blank">点击注册»</a></i>
                            </div>
                            <div class="login-info">
                                <i><a href="/getpassword/" target="_blank">忘记密码？</a></i>
                            </div>
                            <div class="btnwaik">
                                <button class="loginniu">登录</button>
                            </div>
                            <div class="other">
                                <i>第三方帐号登录：</i>
                                <a href="http://oauthtmp.qizuang.com/loginfromqq" title="QQ登录" class="qqlogin"></a>
                                <a href="http://oauthtmp.qizuang.com/loginfromsina" title="新浪微博登录" class="weibologin"></a>
                                <a href="http://oauthtmp.qizuang.com/loginfromwechat" title="微信登录" class="tblogin"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="footer mt50">
    <div class="wrap cbox">
    <div class="leftbox">
        <div class="l">
            <p class="t">关于齐装网</p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/about" target="_blank">齐装网简介</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/culture" target="_blank">企业文化</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/contactus" target="_blank">联系我们</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/zhaopin" target="_blank">诚聘英才</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/team" target="_blank">员工风采</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/media" target="_blank">媒体报道</a></p>
        </div>
        <div class="r">
            <p class="t">帮助中心</p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/legal" target="_blank">法律声明</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/joinus" target="_blank">战略合作</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/city/" target="_blank">网站导航</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/kefu/" target="_blank">客户服务</a></p>
        </div>
    </div>
    <div class="centerbox">
        <p><span>全国统一商务热线：</span></p>
        <p><span style="font-size: 20px;color: #FF9900;"><?php echo OP('QZ_CONTACT_TEL400');?></span></p>
        <p><span>全国统一</span><span>客服</span><span>QQ</span><span>：
            <a rel="external nofollow" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=<?php echo OP('QZ_CONTACT_QQ1');?>&site=qq&menu=yes" title="点击这里给 <?php echo OP('QZ_CONTACT_QQ1_NAME');?> 发消息">
                <img src="/assets/common/img/qq_bottom.gif" style="position: relative; top: 6px;" alt="齐装网官方客服" />
            </a>
            <a rel="external nofollow" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=<?php echo OP('QZ_CONTACT_QQ2');?>&site=qq&menu=yes" title="点击这里给 <?php echo OP('QZ_CONTACT_QQ2_NAME');?> 发消息">
                <img src="/assets/common/img/qq_bottom.gif" style="position: relative; top: 6px;" alt="齐装网官方客服"/>
            </a>
            </span></p>
        <p><span>服务邮箱</span><span>：<?php echo OP('QZ_CONTACT_EMAIL');?></span></p>
        <p><span>友情链接</span><span>QQ</span><span>：<a rel="external nofollow" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=<?php echo OP('QZ_FRIENDLINK_QQ');?>&site=qq" title="点击这里联系交换链接">
        <img src="/assets/common/img/qq_bottom.gif" style="position: relative; top: 6px;" alt="齐装网官方客服"/></a></span></p>
    </div>
    <div class="rightbox">
        <div class="l">
            <img src="/assets/common/img/weixin_f.jpg" width="128" height="120" alt="齐装网官方微信">
            <p>微信扫一扫，工资省半年</p>
        </div>
        <div class="r">
            <a href="http://weibo.com/337807899" target="_blank">
            <img src="/assets/common/img/weibo_f.png" width="157" height="68" alt="齐装网官方微博"></a>
            <p><a href="http://weibo.com/337807899" target="_blank">@齐装网-装修管家</a></p>
        </div>
    </div>
    <div class="clearfix"></div>
    <div style="padding:10px">
        <p><?php echo OP('QZ_LAWYER1');?> <a rel="external nofollow" href="http://www.miitbeian.gov.cn/" target="_blank"> <?php echo OP('QZ_BEIAN_INFO');?> </a>&nbsp;Copyright &copy;<?php echo date('Y');?> Www.QiZuang.Com. All Rights Reserved</p>
        <?php echo OP('baidutongji1');?>
        <div class="wechat"></div>
    </div>
</div>
</div>


<div class="tips-mask">
    <div class="tips-container">
        <div class="tips-header"><i class="fa fa-close"></i></div>
        <p>为了您的账号安全,请每隔30天修改一次密码</p>
        <div class="btn-box">
            <span href="" class="btn-item btn-danger"><a href="/getpassword/">立即修改</a></span>
            <span href="" class="btn-item btn-default" id="ignore">忽略</span>
        </div>
    </div>
</div>
</body>
<script type="text/javascript">
    $(function () {
        $("#tab").rTabs({
            bind: 'click',
            animation: 'fadein',
            auto: false
        });

        // //倒计时
        var flag = true;

        function countDown(obj, num) {
            if (num > 0) {
                obj.text(num + " 秒后重新发送");
                num--;
                setTimeout(function (obj, num) {
                    countDown(obj, num);
                }, 1000, obj, num);
            } else {
                obj.text("发送验证码");
                flag = true;
            }
        }

        function logindl() {

            var name = $.trim($("input[name=name]").val()),
                password = $.trim($("input[name=password]").val());
            if (name == "") {
                $('.tips').html("");
                $('.nametishi').html("请输入用户名");
                return false;
            }
            if (password == "") {
                $('.tips').html("");
                $('.password—tip').html("请输入密码");
                return false;
            } else {
                $('.tips').html("");
            }
            $.ajax({
                url: " /login/",
                type: "post",
                dataType: "json",
                data: {name: name, password: password},
                success: function (data) {
                    if (data.status == 1) {
                        window.location.href = "/home/";
                    } else if (data.status == 0) {
                        $('.tips').html("");
                        $('.password—tip').html(data.info);
                    }
                },
                error: function (xhr) {
                    alert("登录失败,请稍后再试！")
                }
            })
        }


        //登录按钮
        $("#login_show_login").on('click', function () {
            logindl();
        });

        $('.loginbox .loginput .getyanzcode').click(function (event) {

            var that = this, name = $.trim($("input[name=yonghuming]").val());
            if (name == "") {
                $('.tishi').html("");
                $('.loginbox .usertishi').html("请输入用户名");
                return false;
            } else {
                $('.tishi').html("");
            }
            if (flag == true) {
                flag=false;
                $.ajax({
                    url: "/login_sendsms/",
                    type: "post",
                    dataType: "json",
                    data: {name: name},
                    success: function (data) {
                        if (data.status == 1) {
                            $('.tishi').html("");

                                countDown($(that), 60);

                        } else if (data.status == 0) {
                            $('.tishi').html("");
                            $('.yzmtishi').html(data.info);
                        }
                    },
                    error: function (xhr) {
                        alert("发送失败,请稍后再试!")
                    }
                })
            }


        });

        function yanzhenglogin() {
            var yonghumingval = $.trim($("input[name=yonghuming]").val()),
                yanzhengmaval = $.trim($("input[name=yanzhengma]").val());
            if (yonghumingval == "") {
                $('.tishi').html("");
                $('.loginbox .usertishi').html("请输入用户名");
                return false;
            }
            if (yanzhengmaval == "") {
                $('.tishi').html("");
                $('.loginbox .yzmtishi').html("请输入验证码");
                return false;
            } else {
                $('.tishi').html("");
            }

            $.ajax({
                url: "/login/",
                type: "post",
                dataType: "json",
                data: {name: yonghumingval, code: yanzhengmaval},
                success: function (data) {
                    console.log(data)
                    if (data.status == 1) {
                        $('.tishi').html("");
                        window.location.href = "/home/";
                    } else if (data.status == 0) {
                        $('.tishi').html("");
                        $('.loginbox .yzmtishi').html(data.info);
                    }
                },
                error: function (xhr) {
                    alert("登录失败,请稍后再试！")
                }
            })
        }


        $('.btnwaik .loginniu').click(function (event) {
            yanzhenglogin();
        });

        //监听按键
        $(document).on("keyup", function (event) {

            if (event.keyCode == 13 && $('.reg-user').css("display") == "block") {
                logindl();
            } else if (event.keyCode == 13 && $('.reg-company').css("display") == "block") {
                yanzhenglogin();
            }
        })
    })
</script>
</html>