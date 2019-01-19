<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="keywords" content="<?php echo ($keys["keywords"]); ?>">
    <meta name="description" content="<?php echo ($keys["description"]); ?>">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <title><?php echo ($keys["title"]); ?>-<?php echo ($title); ?></title>
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
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/home/css/ht-public.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/home/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>">
<link href="<?php echo ($static_host); ?>/assets/common/css/step.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<!--[if lte IE 7]>
     <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/home/css/font-awesome-ie7.min.css?v=<?php echo C('STATIC_VERSION');?>">
<![endif]-->
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/orders/css/ht-order.css?v=<?php echo C('STATIC_VERSION');?>">
</head>
<body>
<!-- <div class="ht-wrap">
    <img src="<?php echo ($static_host); ?>/assets/user/home/img/qd.jpg" width="1210" height="80"></div> -->
<div class="ht-top">
    <div class="ht-wrap">
        <h2 class="mr20"><?php echo ($info["user"]["qc"]); ?></h2>
        <ul class="ht-link ht-pull-right">
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($info["user"]["id"]); ?>" target="_blank">公司首页</a></li>
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_case/<?php echo ($info["user"]["id"]); ?>" target="_blank">公司案例</a></li>
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_zixun/<?php echo ($info["user"]["id"]); ?>" target="_blank">公司资讯</a></li>
            <li>
                 <a class="red" href="/loginout">退出</a>
            </li>
        </ul>
        <div class="info-box"><i class="icon-envelope-alt mr10"></i>消息通知
            <?php if($info['user']['unreadcount'] != 0 OR $info['user']['unreadsystem'] != 0): ?><span class="ml10 tips"><?php echo ($info['user']['unreadcount']+$info['user']['unreadsystem']); ?></span><?php endif; ?>
            <i class="icon-angle-down ml10"></i>
            <div class="info">
                <ul>
                    <li><a href="/orders/"><i class="icon-copy mr10"></i>订单信息
                    <?php if($info['user']['unreadcount'] != 0): ?><span class="ml10 tips"><?php echo ($info['user']['unreadcount']); ?></span><?php endif; ?>
                    </a></li>
                    <li><a href="/message/"><i class="icon-bullhorn mr10"></i>系统消息
                     <?php if($info['user']['unreadsystem'] != 0): ?><span class="ml10 tips"><?php echo ($info['user']['unreadsystem']); ?></span><?php endif; ?>
                    </a></li>
                </ul>
                <!---暂时没有消息-->
            </div>
        </div>
        <ul class="ht-link">
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/" target="_blank">齐装网首页</a></li>
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company/" target="_blank">装修公司大全</a></li>
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/xgt/" target="_blank">装修案例</a></li>
        </ul>
    </div>
</div>
<div class="ht-tit">用户管理中心</div>
<div class="ht-wrap oflow ht-relative">
    <div class="ht-nav subMenu">
    <ul>
        <li><a href="/home/"><i class="icon-home mr10"></i>首页<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/info/basic"><i class="icon-tasks mr10"></i>企业信息<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/message/"><i class="icon-bullhorn mr10"></i>系统信息
            <?php if($info['user']['unreadsystem'] != 0): ?><span class="tips ml10"><?php echo ($info['user']['unreadsystem']); ?></span><?php endif; ?>
            <i class=" icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/orders/"><i class="icon-paste mr10"></i>装修订单
            <?php if($info['user']['unreadcount'] != 0): ?><span class="tips ml10"><?php echo ($info['user']['unreadcount']); ?></span><?php endif; ?>
            <i class=" icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/team/"><i class="icon-group mr10"></i>设计团队<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/cases/"><i class="icon-picture mr10"></i>图库案例<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/article/"><i class="icon-edit mr10"></i>文章信息<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/comment/"><i class="icon-comments-alt mr10"></i>评价留言<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/wenda/"><i class="icon-question-sign mr10"></i>装修问答<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/baike/"><i class="icon-book mr10"></i>装修百科<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <?php if($info['user']['on'] == 2): ?><li><a href="/peruser/"><i class="icon-user mr10"></i>业主帐号<i class="icon-double-angle-right pull-right"></i></a></li>
            <li class="active"><a href="/oneselfevent"><i class="icon-flag mr10"></i>优惠活动<i class="icon-double-angle-right pull-right"></i></a></li><?php endif; ?>
    </ul>
    <div class="mt20">
        <img src="<?php echo ($static_host); ?>/assets/user/home/img/hezuo.jpg" width="280" height="159">
    </div>
</div>
<script type="text/javascript">
$(".subMenu ul li").removeClass('active').eq("<?php echo ((isset($nav) && ($nav !== ""))?($nav):0); ?>").addClass('active');
</script>
    <ul class="ht-nav-tit">
    <li class="active"><a href="/orders/">我的订单</a></li>
    <li><a href="/ordersbac">回访订单</a></li>
    <li><a href="/initiative/">主动咨询订单</a></li>
    <li><a href="/wechat/"><i class="icon-comments mr10 green"></i>微信接收订单</a></li>
    <li><a href="/orderchange/">修改订单密码</a></li>
</ul>
<script type="text/javascript">
$(".ht-nav-tit li").removeClass("active").eq("<?php echo ((isset($tabNav) && ($tabNav !== ""))?($tabNav):'0'); ?>").addClass('active');
</script>

    <div class="ht-main clearfix xiangdui">
        <div class="wechat-account">
            <h4 class="caption">已绑定账号</h4>
            <div class="member">
                <p class="caption">管理员1</p>
                <ul class="member-list">
                    <?php if(empty($info['users'][0])): ?><p class="add-member-icon" data-type="add-btn">+</p>
                        <?php else: ?>
                        <li class="clearfix">
                            <img src="<?php echo ($info['users'][0]['img']); ?>" alt="">
                            <div class="member-info">
                                <p>微信昵称：<?php echo ($info['users'][0]['nickname']); echo ($info['users'][0]['sex']); ?></p>
                                <p>所在城市：<?php echo ($info['users'][0]['city']); ?></p>
                                <i class="icon-trash del-icon" data-type="unbindwx" data-id="<?php echo ($info['users'][0]['wx_unionid']); ?>"></i>
                            </div>
                        </li><?php endif; ?>
                </ul>
            </div>
            <div class="add-member">
                <p class="caption">管理员2</p>
                <ul class="member-list">
                    <?php if(empty($info['users'][1])): ?><p class="add-member-icon" data-type="add-btn">+</p>
                        <?php else: ?>
                        <li class="clearfix">
                            <img src="<?php echo ($info['users'][1]['img']); ?>" alt="">
                            <div class="member-info">
                                <p>微信昵称：<?php echo ($info['users'][1]['nickname']); echo ($info['users'][1]['sex']); ?></p>
                                <p>所在城市：<?php echo ($info['users'][1]['city']); ?></p>
                                <i class="icon-trash del-icon" data-type="unbindwx" data-id="<?php echo ($info['users'][1]['wx_unionid']); ?>"></i>
                            </div>
                        </li><?php endif; ?>
                </ul>
            </div>
            <div class="add-membernew">
                <p class="caption">管理员3</p>
                <ul class="member-list">
                    <?php if(empty($info['users'][2])): ?><p class="add-member-icon" data-type="add-btn">+</p>
                        <?php else: ?>
                        <li class="clearfix">
                            <img src="<?php echo ($info['users'][2]['img']); ?>" alt="">
                            <div class="member-info">
                                <p>微信昵称：<?php echo ($info['users'][2]['nickname']); echo ($info['users'][2]['sex']); ?></p>
                                <p>所在城市：<?php echo ($info['users'][2]['city']); ?></p>
                                <i class="icon-trash del-icon" data-type="unbindwx" data-id="<?php echo ($info['users'][2]['wx_unionid']); ?>"></i>
                            </div>
                        </li><?php endif; ?>
                </ul>
            </div>
        </div>
        <div class="wechat-tips">
                <h4>小齐贴士</h4>
                <p>1.绑定后微信可接收以及查看订单消息。</p>
                <p>2.管理者可绑定一个微信，实时了解订单情况。</p>
                <p><span>特别提示：</span>为了订单的安全性，记得关注绑定账号情况哦！</p>
        </div>

        <div class="wechat-qrcode absweiz">
            <input type="hidden" value="<?php echo ($info["wxcheckpass"]); ?>" id="logining">
            <div class="valid-phone" data-type="valid-phone-box">
                <p class="caption">为了您的账户安全，我们需要验证您的安全手机</p>
                <div class="simulation-table main-table">
                    <div style="width: 20%">验证码</div>
                    <div style="width: 55%"><input type="text" class="phone" data-type="sms"></div>
                    <div style="width: 25%"><button class="get-code"data-type="get-code">获取验证码</button></div>
                </div>
                <div class="action"><span data-type="valid-action">验证</span><span data-type="valid-cancel">取消</span><i class="line"></i></div>
            </div>
            <div class="scan-qrcode" data-type="scan-qrcode-box">
                <span class="closema">X</span>
                <img src="<?php echo ($info["qrimg"]); ?>" alt="" class="qrcode">
                <p class="scan" data-type="wechatstate">请使用微信扫描二维码等待用户扫描...</p>
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
</body>
<script type="text/javascript">
    /**
     * ajax请求，所有的请求都通过这里发送
     * @param options
     */
    function ajaxAction(options) {
        var defalutOptions = {
            url: "",
            method: "get",
            data: null,
            successCallback: null,
            failCallback: null
        };
        options = $.extend({}, defalutOptions, options);
        $.ajax({
            url: options.url,
            data: options.data,
            method: options.method,
            success: function (res) {
                options.successCallback && options.successCallback(res);

            },
            fail: function (res) {
                options.failCallback && options.failCallback(res);
            }
        });
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

    $(function () {

        var dianjirepeat=true;

        var $addBtn = $("p[data-type='add-btn']"),
            $validPhoneBox = $("div[data-type='valid-phone-box']"),
            $scanQrcodeBox = $("div[data-type='scan-qrcode-box']"),
            $getCodeBtn = $validPhoneBox.find("button[data-type='get-code']"),
            $smsCodeInput = $validPhoneBox.find("input[data-type='sms']"),
            $unBindWxBtn = $("i[data-type='unbindwx']");
        $addBtn.on("click",function () {
            // 判断是否已经登录过，如果处于登录状态无需获取短信，0/""显示，1不显示
            if( !$("#logining").val() ){
                $validPhoneBox.fadeIn(0);
                $('.absweiz').show();
            }else{
                $scanQrcodeBox.fadeIn(0);
                $('.absweiz').show();
                if(dianjirepeat==true){
                    dianjirepeat=false;
                    polling();
                }
                
            }
        });
        $validPhoneBox.find("span[data-type='valid-action']").on("click",validSmsCode)
        $validPhoneBox.find("span[data-type='valid-cancel']").on("click",function () {
            $validPhoneBox.fadeOut(0);
            $('.absweiz').hide();
        })
        $getCodeBtn.on("click",getSmsCode);
        $unBindWxBtn.on("click", unBindWx);

        function getSmsCode(event) {
            var $target = $(event.target);
            $target.attr("disabled",true);
            ajaxAction({
                url : "/orders/sendsms/",
                method : "get",
                successCallback:function (res) {
                    if(!res.status || res.status === 0){
                        $target.removeAttr('disabled');
                        $.pt({
                            target: $smsCodeInput,
                            content: res.info,
                            width: 'auto'
                        });
                        $target.removeAttr('disabled');
                    } else {
                        countDown(60, $target, function () {
                            $target.removeAttr('disabled').text("获取验证码");
                        });
                    }
                }
            });
        }
        function validSmsCode(event) {
            if( !$smsCodeInput.val() ){
                alert("请输入验证码");
                return;
            }
            ajaxAction({
                url : "/orders/checksms/",
                method : "post",
                data : {
                    code : $smsCodeInput.val()
                },
                successCallback:function (res) {
                    if(!res.status && res.status !== 0){
                        $validPhoneBox.fadeOut(0);
                        $scanQrcodeBox.fadeIn(0);
                        polling();
                    }else{
                        $.pt({
                            target: $smsCodeInput,
                            content:res.info,
                            width: 'auto'
                        });
                    }
                }
            });
        }
        function unBindWx(event) {
            var $target = $(event.target);
            // 解除微信绑定
            if(confirm("确定解除绑定吗？")){
                var id = $target.attr("data-id");
                ajaxAction({
                    url: '/unbindwx',
                    method: "post",
                    data: {
                        id : id
                    },
                    successCallback: function (res) {
                        if(res.status == 1){
                            window.location.href = window.location.href;
                        }else{
                            $.pt({
                                target: $target,
                                content:res.info,
                                width: 'auto'
                            });
                        }
                    },
                    failCallback: function (res) {
                        $.pt({
                            target: $target,
                            content:"发生了未知的错误,请刷新后再试！",
                            width: 'auto'
                        });
                    }
                });
            }

        }
        // 检测用户是否扫描二维码轮训
        var timmer;
        function polling() {
             timmer =  setInterval(function(){
                $.ajax({
                    url: '/polling',
                    type: 'POST',
                    dataType: 'JSON'
                })
                    .done(function(data) {
                        $("p[data-type='wechatstate']").html(data.info);
                        if(data.status == 0){
                            clearInterval(timmer);
                        }else if(data.status == 3){
                            // $scanQrcodeBox.find("img").attr("src",data.data);
                            location.reload();
                        }
                    })
                    .fail(function(xhr) {
                        $("p[data-type='wechatstate']").html("");
                        clearInterval(timmer);
                        dianjirepeat=true;
                    });
            },3000);
        }

       //   关闭二维码

        $('.scan-qrcode .closema').click(function(){
            $('.scan-qrcode').hide();
            $('.absweiz').hide();
            window.clearInterval(timmer)
            dianjirepeat=true;
        })

    })
</script>
</html>