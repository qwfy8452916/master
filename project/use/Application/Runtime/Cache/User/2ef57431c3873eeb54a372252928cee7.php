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
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/orders/css/ht-remind.css?v=<?php echo C('STATIC_VERSION');?>">
</head>
<body>
<input type="hidden" value="<?php echo ($remind); ?>" id="unmeasure-house">
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

    <div class="ht-main maindw">
        <!--订单列表-->
        <?php if($info['user']['orderpass']): ?><div class="ht-order-check"><strong>筛选:</strong>
                <select name="read">
                    <?php if(is_array($info["orderInfo"]["readStatus"])): $i = 0; $__LIST__ = $info["orderInfo"]["readStatus"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($info['orderInfo']['isread'] == $vo['value']): ?><option value="<?php echo ($vo["value"]); ?>" selected="selected"><?php echo ($vo["name"]); ?></option>
                            <?php else: ?>
                            <option value="<?php echo ($vo["value"]); ?>"><?php echo ($vo["name"]); ?></option><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                </select>
                <div class="search">
                    <input name="text" type="text" placeholder="订单号/小区/电话号" value="<?php echo ($info["orderInfo"]["keyword"]); ?>">
                    <input name="btnSearch" type="button" value="查找订单">
                </div>
            </div>
            <?php if($need_to_do_num > 0): ?><p class="unmark-tips"><img src="<?php echo ($static_host); ?>/assets/user/orders/img/tips.png" alt="">您有<?php echo ($need_to_do_num); ?>条订单未标记状态，请及时标记，齐装网后台会根据您标记的订单状态，进行及时回访，以提高您对齐装网的满意度。</p><?php endif; ?>
            <table border="0" cellpadding="0" cellspacing="0" class="ht-order-list">
                <tr class="order-title">
                    <td>读取状态</td>
                    <td>发布日期</td>
                    <td>业主</td>
                    <td>所在区域</td>
                    <td>小区名称</td>
                    <td>建筑面积</td>
                    <td>装修预算</td>
                    <td>订单类型</td>
                    <td style="position: relative;">
                        订单状态
                        <span class="ques-mark" data-type="ques-mark">?</span>
                        <div class="status-intro" data-type="ques-intro">
                            <p>未量房 : 未能成功预约到业主进行量房。</p>
                            <p>已到店/已见面：已与业主当面沟通。</p>
                            <p>已量房：已与业主预约好量房时间，并成功对场地进行量房。</p>
                            <p>已签约：已与业主沟通好可以签约。</p>
                        </div>
                    </td>
                    <td>签单审核</td>
                    <td>订单详情</td>
                </tr>
                <?php if(is_array($info["orderInfo"]["orderlist"])): $i = 0; $__LIST__ = $info["orderInfo"]["orderlist"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if(!$vo['isread']): ?><tr class="order-list unknow">
                            <td><span class="green"><i class="icon-folder-close icon-large mr10"></i>未读</span></td>
                            <td><?php echo (date("Y-m-d",$vo["ordertime"])); ?></td>
                            <td><?php echo ((isset($vo["ordername"]) && ($vo["ordername"] !== ""))?($vo["ordername"]):""); echo ($vo["sex"]); ?></td>
                            <td><?php echo ($vo["qx"]); ?></td>
                            <td><?php echo ($vo["xiaoqu"]); ?></td>
                            <td><?php echo ($vo["mianji"]); ?>㎡</td>
                            <td><?php echo ($vo["jiage"]); ?></td>
                            <td><?php if($vo['type_fw'] == 1): ?>分<?php else: ?>赠送<?php endif; ?></td>
                            <td>-</td>
                            <td>-</td>
                            <td><a href="/orderdetails?id=<?php echo ($vo["order"]); ?>" class="order-look" data-id="<?php echo ($vo["order"]); ?>" target="_blank">订单详情</a></td>
                        </tr>
                        <?php else: ?>
                        <tr class="order-list">
                            <td><span class="gray"><i class="icon-folder-open icon-large mr10"></i>已读</span></td>
                            <td><?php echo (date("Y-m-d",$vo["ordertime"])); ?></td>
                            <td><?php echo ((isset($vo["ordername"]) && ($vo["ordername"] !== ""))?($vo["ordername"]):""); echo ($vo["sex"]); ?></td>
                            <td><?php echo ($vo["qx"]); ?></td>
                            <td><?php echo ($vo["xiaoqu"]); ?></td>
                            <td><?php echo ($vo["mianji"]); ?>㎡</td>
                            <td><?php echo ($vo["jiage"]); ?></td>
                            <td><?php if($vo['type_fw'] == 1): ?>分<?php else: ?>赠送<?php endif; ?></td>
                            <td>
                                <select class="state" data-id="<?php echo ($vo["order"]); ?>" data-hook="<?php echo ((isset($vo['status']) && ($vo['status'] !== ""))?($vo['status']):'0'); ?>">
                                    <?php if(($vo["qiandan_status"] != null) and ($vo["qiandan_companyid"] !=$user['id'])): ?><option value="0">请选择</option>
                                    <option value="1" <?php if($vo['status'] == 1) echo 'selected'; ?> >已量房</option>
                                    <option value="2" <?php if($vo['status'] == 2) echo 'selected'; ?> >已到店/见面</option>
                                    <option value="3" <?php if($vo['status'] == 3) echo 'selected'; ?> >未量房</option>
                                    <?php else: ?>
                                    <option value="0">请选择</option>
                                    <option value="1" <?php if($vo['status'] == 1) echo 'selected'; ?> >已量房</option>
                                    <option value="2" <?php if($vo['status'] == 2) echo 'selected'; ?> >已到店/见面</option>
                                    <option value="3" <?php if($vo['status'] == 3) echo 'selected'; ?> >未量房</option>
                                    <option value="4" <?php if($vo['status'] == 4) echo 'selected'; ?> >已签约</option><?php endif; ?>
                                </select>
                            </td>
                            <td>
                                <?php if($vo['status'] == 4): if($vo['qiandan_status'] == 0): ?>签约确认中
                                        <?php elseif(($vo['qiandan_status'] == 1) and ($vo['qiandan_companyid'] == $info['user']['id'])): ?>
                                        恭喜签约
                                        <?php elseif(($vo['qiandan_status'] == 1) and ($vo['qiandan_companyid'] != $info['user']['id'])): ?>
                                        不签约<?php endif; endif; ?>
                            </td>
                            <td><a href="/orderdetails?id=<?php echo ($vo["order"]); ?>" class="order-look" data-id="<?php echo ($vo["order"]); ?>"
                                   target="_blank">订单详情</a></td>
                        </tr><?php endif; endforeach; endif; else: echo "" ;endif; ?>
            </table>
            <?php echo ($info["orderInfo"]["page"]); ?>
        <?php else: ?>
            <?php if($info['passinit']): ?><div class="ht-order-login">订单密码：
                    <input name="pass" type="password" placeholder="订单密码"><i class="red error vtop"></i>
                </div>
                <div class="ht-order-login">重复密码：
                    <input name="confirmpass" type="password" placeholder="重复密码"><i class="red error vtop"></i>
                </div>
                <div class="ht-order-login">
                    <p><i class="red  ml10">
                        <i class="icon-info-sign mr10"></i>请妥善保管好您的查询密码,请勿泄漏给无相关人员,谢谢！
                    </i></p>
                </div>
                <div class="ht-yes btn-seting"><a href="javascript:void(0)"><i class="icon-copy mr10"></i>设置</a></div>

                <script type="text/javascript">
                    $(".btn-seting a").click(function (event) {
                        var _this = $(this);
                        if (_this.hasClass('disabled') == true) {
                            return false;
                        }
                        var input = $("input[name=pass]");
                        var confirminput = $("input[name=confirmpass]");
                        var mypass = input.val();
                        if (!App.validate.run(mypass)) {
                            input.focus();
                            input.addClass('focus');
                            input.parent().find(".error").html("请输入查看订单密码");
                            return false;
                        }

                        if (!App.validate.run(mypass, "blend")) {
                            input.focus();
                            input.addClass('focus');
                            input.parent().find(".error").html("请不要填写纯数字/纯字母");
                            return false;
                        }

                        if (mypass != confirminput.val()) {
                            confirminput.focus();
                            confirminput.addClass('focus');
                            confirminput.parent().find(".error").html("二次密码不一致");
                            return false;
                        }
                        _this.addClass('disabled').html('<i class="icon-copy mr10"></i>设置中...');
                        $.ajax({
                            url: '/saveorderpass/',
                            type: 'POST',
                            dataType: 'JSON',
                            data: {
                                pass: mypass
                            }
                        }).done(function (data) {
                            if (data.status == 1) {
                                window.location.href = window.location.href;
                            } else {
                                setTimeout(function(){_this.removeClass('disabled').html('<i class="icon-copy mr10"></i>设置'); $(".error").html(data.info);},500);
                            }
                        }).fail(function (xhr) {
                            $.pt({
                                target: _this,
                                content: "发生了未知不到的错误,请刷新页面",
                                width: 'auto'
                            });
                        });
                    });

                </script>
            <?php else: ?>
                <!--输入订单密码-->
                <div class="ht-order-login">
                    <div class="shuruyzm">
                        <span class="spantitle">查看订单密码：</span>
                        <input class="orderpassword" name="pass" type="password" placeholder="请输入订单密码">
                        <div class="weixinma">
                            <img src="/assets/user/orders/img/userma.png">
                        </div>
                        <i class="red error vtop tishi passtishi"></i>
                    </div>
                    <p class="topjvli"><i class="red  ml10"><i class="icon-info-sign mr10"></i>提醒：此订单密码极为重要,请不要将密码透露给他人（包括齐装网的工作人员），谢谢！</i>
                    </p>
                    <p><i class="red ml10"><i class="icon-info-sign mr10"></i>连续输错3次密码,查看订单将冻结10分钟,如有问题请联系客服</i></p>
                </div>
                <div class="ht-yes btn-look btn_jianjv"><a class="lookorder" href="javascript:void(0)">查看订单</a></div>

                <!-- 微信二维码弹窗 -->
                <div class="weixinmatc">
                    <div class="weixinmatc-title">扫码进入<span class="closema">X</span></div>
                    <div class="erweimawk">
                        <img src="<?php echo ($qrLoginImg); ?>">
                    </div>
                    <div class="lunxuntip">正在等待扫描</div>
                </div>
                <script type="text/javascript">
                    $(function () {
                        $(".btn-look a").click(function (event) {
                            var _this = $(this);
                            if (_this.hasClass('disabled') == true) {
                                return false;
                            }
                            var passdom = $("input[name=pass]");
                            $(".focus").removeClass('focus');
                            $(".tishi").html('');
                            if (!App.validate.run(passdom.val())) {
                                passdom.focus();
                                passdom.addClass('focus');
                                $(".passtishi").html("亲,请输入查看订单密码");
                                return false;
                            }
                            _this.addClass('disabled').text('验证中...');
                            var data = {};
                            data.pass = passdom.val();
                            $.ajax({
                                url: '/orders/',
                                type: 'POST',
                                dataType: 'JSON',
                                data: data
                            }).done(function (data) {
                                if (data.status == 1) {
                                    window.location.href = window.location.href;
                                } else {
                                    setTimeout(function () {
                                        _this.removeClass('disabled').text('查看订单');
                                        $(".tishi").html('');
                                        $(".passtishi").html(data.info);
                                    }, 500);
                                }
                            }).fail(function (xhr) {
                                $.pt({
                                    target: _this,
                                    content: "发生了未知不到的错误,请刷新页面",
                                    width: 'auto'
                                });
                            });
                        });

                        //扫描二维码查看订单
                        var flag = true;
                        var getEwm = function () {
                            $.ajax({
                                url: '/orders/wechatlogin/',
                                dataType: 'json',
                                success: function (res) {
                                    if (res.status == 1) {
                                         if(res.info=="用户微信未绑定"){
                                            $('.weixinmatc .lunxuntip').addClass('redgaoliang');
                                          }else{
                                            $('.weixinmatc .lunxuntip').removeClass('redgaoliang');
                                          }
                                        $('.weixinmatc .lunxuntip').text(res.info);
                                        if (aa) {
                                            aa()
                                        }
                                    } else {
                                        $('.weixinmatc .lunxuntip').removeClass('redgaoliang');
                                        $('.weixinmatc .lunxuntip').text(res.info);
                                        aa = null;
                                        window.location.reload();
                                    }
                                },
                                error: function (xhr) {
                                    if (xhr.readyState != 0) {
                                        alert("网络错误请稍后再试")
                                    }
                                }
                            })
                        };
                        var aa = getEwm;
                        $('.shuruyzm .weixinma').click(function () {
                            if (flag == true) {
                                flag = false;
                                $('.weixinmatc').show();
                                aa = getEwm;
                                aa()
                            }
                        });
                        $('.weixinmatc-title .closema').click(function () {
                            flag = true;
                            aa = null;
                            $('.weixinmatc').hide();
                        });

                        $(document).click(function () {
                            flag = true;
                            aa = null;
                            $(".weixinmatc").hide();
                        });

                        $('.shuruyzm .weixinma').click(function (event) {
                            event.stopPropagation();
                        });

                        $('.weixinmatc').click(function (event) {
                            event.stopPropagation();
                        })
                    })
                </script><?php endif; endif; ?>
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
        <p>为了您的账号安全,请每隔30天修改一次查询密码</p>
        <div class="btn-box">
            <span class="btn-item btn-danger"><a href="/getpassword/">立即修改</a></span>
            <span class="btn-item btn-default" id="ignore">忽略</span>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(function () {
        var check_alert = '<?php echo ($check_alert); ?>';
        if (check_alert == 1) {
            $(".tips-mask").fadeIn();
        }

        $("#ignore,.fa-close").click(function (event) {
            $(".tips-mask").fadeOut();
        });

        $("input[name=btnSearch]").click(function (event) {
            var text = $("input[name=text]").val();
            var isread = $("select[name=read]").val();
            var url = "/orders";
            if (isread != "") {
                url += "/" + isread;
            }
            if (text != "") {
                url += "/" + text;
            }
            window.location.href = url;
        });
        $(".qd_sq").click(function (event) {
            var id = $(this).attr("data-id");
            var _this = $(this);
            $.ajax({
                url: '/applyorder',
                type: 'GET',
                dataType: 'JSON',
                data: {
                    id: id
                }
            }).done(function (data) {
                if (data.status == 1) {
                    $("body").append(data.data);
                }
            }).fail(function (xhr) {
                $.pt({
                    target: _this,
                    content: "发生了未知不到的错误,请刷新页面！",
                    width: 'auto'
                });
            });
        });

        $(".order-list .cancel").click(function (event) {
            if (confirm("确定取消申请")) {
                var id = $(this).attr("data-id");
                var _this = $(this);
                $.ajax({
                    url: '/unapplyorder',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {
                        id: id
                    }
                }).done(function (data) {
                    if (data.status == 1) {
                        window.location.href = window.location.href;
                    }
                }).fail(function (xhr) {
                    $.pt({
                        target: _this,
                        content: "发生了未知不到的错误,请刷新页面！",
                        width: 'auto'
                    });
                });
            }
        });

        //取消已签单
        $(".cancel-qd").click(function (event) {
            var id = $(this).attr("data-id");
            var _this = $(this);
            $.ajax({
                url: '/unqiandanorder',
                type: 'GET',
                dataType: 'JSON',
                data: {
                    id: id
                }
            }).done(function (data) {
                if (data.status == 1) {
                    $("body").append(data.data);
                }
            }).fail(function (xhr) {
                $.pt({
                    target: _this,
                    content: "发生了未知不到的错误,请刷新页面！",
                    width: 'auto'
                });
            });
        });
    });
</script>
<!--未处理订单提醒部分-->
<iframe class="order-mask" src="about:blank" allowtransparency="true" marginheight="0" marginwidth="0"
        frameborder="0"></iframe>
<iframe class="sign-box-mask" src="about:blank" allowtransparency="true" marginheight="0" marginwidth="0"
        frameborder="0"></iframe>
<div class="order-remind-box" data-type="order-remind-box">
    <h3 class="caption">尊敬的<span class="red"><?php echo ($user["qc"]); ?></span>，您好</h3>
    <p class="order-remind-msg">您的装修订单页面存在未标记状态的订单，为了更好地为您服务，请根据订单的实际跟进情况，在下面列表中，对未标记状态的订单进行标记。</p>
    <div class="order-remind-reason">
        <p class="title"><span data-type="show-reason">为什么标记订单状态？>></span></p>
        <div class="simulation-table reason-item" data-type="reason-item">
            <div class="c-blue"><img src="/assets/user/home/img/circle-blue.png" alt=""><span>提高签约率</span></div>
            <div><p>二次回访 及时跟进 不漏一单 共赢创收</p></div>
            <div class="c-purple"><img src="/assets/user/home/img/circle-purple.png" alt=""><span>口碑排名</span></div>
            <div><p>量房签单 口碑排行 科学排名 有理有据</p></div>
            <div class="c-red"><img src="/assets/user/home/img/circle-red.png" alt=""><span>知名度</span></div>
            <div><p>企业曝光 榜单排名 签单优势 分单导向</p></div>
        </div>
    </div>
    <div class="order-remind-items">
        <?php if(!empty($remind_order)): if(is_array($remind_order)): $i = 0; $__LIST__ = $remind_order;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="orders">
                <div class="head clearfix">
                    <div class="l">订单日期：<?php echo (date("Y-m-d",$vo["addtime"])); ?></div>
                    <div class="r">
                        <span class="ques-mark" data-type="ques-mark">?</span>
                        <div class="intro" data-type="ques-intro">
                            <p>未量房 : 未能成功预约到业主进行量房。</p>
                            <p>已到店/已见面：已与业主当面沟通。</p>
                            <p>已量房：已与业主预约好量房时间，并成功对场地进行量房。</p>
                            <p>已签约：已与业主沟通好可以签约。</p>
                            <div class="rectangle-rotate"></div>
                            <div class="cover"></div>
                        </div>
                    </div>
                </div>
                <div style="padding: 30px 24px;">
                    <div class="simulation-table orders-info">
                        <div style="width: 70%">
                            <p class="owner">业主：<?php echo ($vo["name"]); echo ($vo["sex"]); ?></p>
                            <p class="house-info">
                                <span>小区名称：<?php echo ($vo["xiaoqu"]); ?></span>
                                <span>
                                    所在区域：
                                          <?php if(!empty($vo['cname']) and ($vo['name'] !='总站')): echo ($vo["cname"]); ?>
                                              <?php else: ?>
                                              全国<?php endif; ?>
                                    -<?php echo ((isset($vo["qx"]) && ($vo["qx"] !== ""))?($vo["qx"]):"-"); ?>
                                </span>
                                <span>建筑面积：<?php echo ($vo["mianji"]); ?>m²</span>
                            </p>
                        </div>
                        <div style="width: 30%;text-align: right">
                            <select name="order-status" data-company-id="<?php echo ($vo["order"]); ?>">
                                <?php if($vo["qiandan_status"] != null ): ?><option value="0">请选择</option>
                                    <option value="1">已量房</option>
                                    <option value="2">已到店/见面</option>
                                    <option value="3">未量房</option>
                                    <?php else: ?>
                                    <option value="0">请选择</option>
                                    <option value="1">已量房</option>
                                    <option value="2">已到店/见面</option>
                                    <option value="3">未量房</option>
                                    <option value="4">已签约</option><?php endif; ?>
                            </select>
                        </div>
                    </div>
                </div>
            </div><?php endforeach; endif; else: echo "" ;endif; endif; ?>
    </div>
    <div class="order-btn-box">
        <button class="later-again" data-type="later-again">暂不处理</button>
    </div>
</div>
<!--量房状态为未量房时选择原因弹窗-->
<div class="unmeasure-box">
    <div class="close">×</div>
    <div class="head">请选择未量房原因(可选1-3个)：</div>
    <ul class="rs clearfix" data-type="unmeasure-reason">
        <li data-id="1">业主无法联系 <img src="<?php echo ($static_host); ?>/assets/user/orders/img/chosed.png" alt=""></li>
        <li data-id="2">业务无装修需求 <img src="<?php echo ($static_host); ?>/assets/user/orders/img/chosed.png" alt=""></li>
        <li data-id="3">业主已经签约 <img src="<?php echo ($static_host); ?>/assets/user/orders/img/chosed.png" alt=""></li>
        <li data-id="4">业主无法量房 <img src="<?php echo ($static_host); ?>/assets/user/orders/img/chosed.png" alt=""></li>
        <li data-id="5">业主仅咨询了解 <img src="<?php echo ($static_host); ?>/assets/user/orders/img/chosed.png" alt=""></li>
        <li data-id="6">业主有户型图 <img src="<?php echo ($static_host); ?>/assets/user/orders/img/chosed.png" alt=""></li>
    </ul>
    <div class="note-detail">
        <textarea name="note" id="note" rows="5" placeholder="详细备注"></textarea>
    </div>
    <div class="btn-box">
        <button class="reset">重置</button>
        <button class="confirm">确认</button>
    </div>
</div>
<!--量房状态选择为已签约时的价格和备注输入弹窗-->
<div class="sign-price-box" data-type="sign-box">
    <div class="head">申请签单<span class="close" data-type="close">×</span></div>
    <div class="main">
        <div class="simulation-table price">
            <div style="width: 20%">签单金额</div>
            <div style="width: 60%"><input type="text" data-type="s-price"></div>
            <div>万元</div>
        </div>
        <div class="simulation-table note">
            <div style="width: 20%">签单备注</div>
            <div><textarea name="" id="" cols="30" rows="5" data-type="s-note"></textarea></div>
        </div>
        <div class="action-area">
            <button data-type="confirm" class="confirm">确定</button>
            <button data-type="cancel" class="cancel">取消</button>
        </div>
    </div>
</div>
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
        console.log(options);
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

    // 已签约价格弹窗公用部分
    var $orderReminaBox = $("div[data-type='order-remind-box']"),
        $signBox = $("div[data-type='sign-box']"),
        $signBoxMask = $(".sign-box-mask"),
        $orderMask = $(".order-mask"),
        $currentEle = null;
    $signBox.find(".close").on("click", closeSignBox);
    $signBox.find("button[data-type='cancel']").on("click", closeSignBox);
    $signBox.find("button[data-type='confirm']").on("click", validSignInfo);
    // 关闭已签约价格输入弹窗
    function closeSignBox() {
        $signBox.find("input").val("");
        $signBox.find("textarea").val("");
        var $target = $(this);
        // 处理未填写签约价格直接关闭的情况
        if ($currentEle[0].nodeName.toLowerCase() == "select") {
            if ($target.attr("data-type") && $target.attr("data-type") != "confirm") {
                $currentEle.val($currentEle.attr('data-hook'))
            }
        } else {
            $currentEle.find("select").val(0);
        }
        $currentEle = null;
        $signBox.fadeOut(0);
        $signBoxMask.fadeOut(0);
    }
    // 验证已签约弹窗输入信息是否正确及保存相关信息
    function validSignInfo(event) {
        var $signPriceInput = $signBox.find("input[data-type='s-price']"),
            $signPriceTextarea = $signBox.find("textarea[data-type='s-note']");
        if (!$signPriceInput.val()) {
            alert("请输入签单金额");
            return
        }
        if (parseFloat($signPriceInput.val()) != $signPriceInput.val() || $signPriceInput.val() <= 0) {
            alert("签单金额不正确");
            return
        }
        if ($currentEle[0].nodeName.toLowerCase() == "select") {
            submitOrderStatus({
                id: $currentEle.attr("data-id"),
                qiandan_jine: $signPriceInput.val(),
                qiandan_info: $signPriceTextarea.val(),
                state: $currentEle[0].value
            }, closeSignBox.bind($signBox.find("button[data-type='confirm']")[0]));
        } else {
            changeUnsignOrder($currentEle, {
                id: $currentEle.find("select").attr("data-company-id"),
                qiandan_jine: $signPriceInput.val(),
                qiandan_info: $signPriceTextarea.val(),
                state: $currentEle.find("select")[0].value
            }, closeSignBox);
        }

    }
    // 向后台发送修改未标记订单数据
    function changeUnsignOrder($target, data, callback) {
        ajaxAction({
            url: "http://u.qizuang.com/orders/changestate",
            method: "post",
            data: data,
            successCallback: function (res) {
                if (res.status == 1) {
                    $target.remove();
                    callback && callback();
                    if ($orderReminaBox.find(".orders").length <= 0) {
                        $orderReminaBox.fadeOut(0);
                        $orderMask.fadeOut(0);
                        window.location.reload();
                    }
                }
            }
        });
    }
    // 列表页修改订单状态ajax请求
    function submitOrderStatus(data, callback) {
        ajaxAction({
            url: '/orders/change/state/complete',
            method: 'POST',
            data: data,
            successCallback: function (res) {
                if (res.status == 1) {
                    window.location.href = window.location.href;
                } else {
                    alert(res.info);
                    callback && callback();
                }
            }
        });
    }

    // 未标记订单提醒弹窗
    $(function () {
        var $showReason = $("span[data-type='show-reason']"),
            $reasonItem = $("div[data-type='reason-item']"),
            $quesMark = $("span[data-type='ques-mark']"),
            $quesIntro = $("div[data-type='ques-intro']"),
            $laterDeal = $("button[data-type='later-again']"),
            $orderSelect = $("select[name='order-status']");
        $showReason.on("click", function () {
            $reasonItem.toggle();
        });
        $quesMark.on("click", function (event) {
            event.stopPropagation();
            $(this).parent().find("div[data-type='ques-intro']").toggle();
        });
        $("html,body").on("click", function () {
            $quesIntro.fadeOut();
        });
        $laterDeal.on("click", function () {
            var $orders = $orderReminaBox.find(".orders");
            var laterDealIds = [];
            if ($orders.length > 0) {
                $orders.each(function (index, item) {
                    laterDealIds.push($(item).find("select").attr("data-company-id"))
                })
            }
            ajaxAction({
                url: "http://u.qizuang.com/orders/ignore ",
                method: "post",
                data: {
                    order_id: laterDealIds,
                },
                successCallback: function (res) {
                    console.log(res);
                    window.location.reload();
                    if (res.status == 1) {

                    }
                }
            });
            $orderReminaBox.fadeOut();
            $orderMask.fadeOut();
        });
        $orderSelect.each(function (index, item) {
            $(item).on("change", function () {
                var selectValue = this.value
                if (selectValue <= 0) {
                    return;
                }
                $currentEle = $(this).closest(".orders");
                if (selectValue == 4) {
                    $signBoxMask.width($orderReminaBox.outerWidth(true)).height($orderReminaBox.outerHeight(true)).fadeIn(0);
                    $signBox.fadeIn(0);
                    return
                }
                var that = $(this);
                setTimeout(function () {
                    if (confirm("是否提交？")) {
                        changeUnsignOrder($currentEle, {
                            id: that.attr("data-company-id"),
                            state: selectValue
                        })

                    } else {
                        $(item).val(0);
                    }
                }, 500)
            });
        });
        $orderReminaBox.on("click", function () {
            $quesIntro.fadeOut();
        });
        showRemindBox();

        function showRemindBox() {
            if ($("#unmeasure-house").val() == 1) {
                $orderReminaBox.fadeIn();
                $orderMask.fadeIn();
            }
        }
    });

    // 订单状态原因选择框及未量房原因选择事件
    $(function () {
        var $unmeasureBox = $(".unmeasure-box"),
            $reasons = $unmeasureBox.find("ul.rs>li"),
            $closeBtn = $unmeasureBox.find(".close"),
            $orderMask = $(".order-mask"),
            $resetBtn = $unmeasureBox.find("button.reset"),
            $confirmBtn = $unmeasureBox.find("button.confirm"),
            $currentSelect = null,
            reasonArr = [], id, state;
        $reasons.on('click', function () {
            var id = $(this).attr('data-id'), index;
            $(this).find("img").toggle();
            if ((index = reasonArr.indexOf(id)) > -1) {
                reasonArr.splice(index, 1);
            } else {
                reasonArr.push(id);
            }
        });
        $closeBtn.on('click', function () {
            $orderMask.fadeOut();
            $unmeasureBox.fadeOut();
            $currentSelect.val(0);
        });
        $(".state").change(function (event) {
            id = $(this).attr("data-id");
            state = $(this).val();
            if (this.value == 3) {
                $currentSelect = $(this);
                $orderMask.fadeIn();
                $unmeasureBox.fadeIn();
                return;
            }
            if (this.value == 4) {
                $currentEle = $(this);
                $signBoxMask.width("100%").height("100%").fadeIn();
                $signBox.fadeIn(0);
                return;
            }
            submitOrderStatus({
                id: id,
                state: state
            }, function () {
                $(this).attr('data-hook', state);
            }.bind(this));
        });
        $resetBtn.on("click", function () {
            $reasons.each(function (index, item) {
                $(item).find("img").fadeOut(0);
                reasonArr = [];
            });
        });
        $confirmBtn.on("click", function () {
            if (reasonArr.length <= 0) {
                alert("请选择原因");
                return;
            }
            if (reasonArr.length > 3) {
                alert("最多只能选择3个");
                return;
            }
            submitOrderStatus({
                id: id,
                state: state,
                reason: reasonArr,
                remark: $unmeasureBox.find("textarea").val()
            }, function () {
                location.reload()
            })
        });
    })
</script>
</body>
</html>