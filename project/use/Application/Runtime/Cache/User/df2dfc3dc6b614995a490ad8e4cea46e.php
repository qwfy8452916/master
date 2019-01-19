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
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/home/css/ht-common.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/home/css/ht-common-p21414.css?v=<?php echo C('STATIC_VERSION');?>">
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/user/home/js/goalProgress.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.queue.js?v=<?php echo C('STATIC_VERSION');?>"></script>
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
    <div class="ht-wrap oflow">
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
        <div class="ht-main">
            <span class="sortpaiming">如何提升排名？
                        <div class="sortbeijing">
                            <div class="sortbeijing_title">你可通过以下几种方式来提升排名</div>
                            <ul class="sortul">
                                <li>
                                    <span class="sortul-title">1、完善店铺信息</span><a class="sortul-qianwang" target="_blank" href="http://u.qizuang.com/info/basic">立即前往></a>
                                </li>
                                <li>
                                    <span class="sortul-title">2、上传至少8套设计案例</span><a class="sortul-qianwang" target="_blank" href="http://u.qizuang.com/cases/">立即前往></a>
                                </li>
                                <li>
                                    <span class="sortul-title">3、邀请至少2位设计师入驻</span><a class="sortul-qianwang" target="_blank" href="http://u.qizuang.com/team/">立即前往></a>
                                </li>
                                <li>
                                    <span class="sortul-title">4、及时更新签单/量房状态</span><a class="sortul-qianwang" target="_blank" href="http://u.qizuang.com/orders/">立即前往></a>
                                </li>
                            </ul>
                        </div>
            </span>
            <div class="ht-comp-info">
                <div class="ht-logo">
                    <a href="/info/basic"><img src="<?php echo ($info["user"]["logo"]); ?>" width="193" height="110">
                        <span class="ht-logo-alter">更换LOGO</span>
                    </a>
                </div>
                <div class="ht-content companyinfo">
                    <h3 class="pull-left companygs-title" title="<?php echo ($info["user"]["qc"]); ?>">
                    <?php if($info['user']['on'] == 2 AND $info['user']['fake'] == 0): ?><i class="icon-trophy mr10" style="color:#F30" title="VIP会员公司"></i>
                    <?php else: ?>
                      <i class="icon-trophy mr10" style="color:#888" title="您还不是会员公司">  </i><?php endif; ?>
                    <?php echo ($info["user"]["qc"]); ?>
                    </h3>
                    
                    
                    
                    <?php if(isset($paiming)): ?><div class="rankingwk">
                            <ul class="rankulwk">
                                <li><span class="rankulwk_title">综合排名</span><span class="rankulwk_count"><?php echo ($paiming["shili"]); ?></span></li>
                                <li><span class="rankulwk_title">签单排名</span><span class="rankulwk_count"><?php echo ($paiming["qiandan"]); ?></span></li>
                                <li><span class="rankulwk_title">量房排名</span><span class="rankulwk_count"><?php echo ($paiming["liangfang"]); ?></span></li>
                            </ul>
                        </div><?php endif; ?>
                    <div>
                        <?php if($info['user']['on'] == 2 AND $info['user']['fake'] == 0): ?><p class="pull-left ico">
                                    <span title="该公司营业执照已认证"><i class="ico1">认</i></span>
                                    <span title="该公司无优惠"><i class="iconone">惠</i></span>
                                </p><?php endif; ?>
                    </div>
                </div>
                <div class="dataperfect">
                    <?php if($info['perfect'] != 100): ?><div class="ht-comp-info-alter">资料完善度<?php echo ($info["perfect"]); ?>%
                        <a href="/info/basic">>> 去完善</a></div><?php endif; ?>
                    <?php if($info['user']['on'] != 2 OR $info['user']['fake'] != 0): ?><div class="joinhotline">加盟热线：<?php echo OP('QZ_CONTACT_TEL400');?></div><?php endif; ?>
                </div>
                <?php if($info['user']['unreadcount'] != 0): ?><div class="ht-home-message mt20">
                            <i class="icon-inbox icon-large mr10"></i>
                            <a href="/orders/">您有<?php echo ($info['user']['unreadcount']); ?>条未读的订单消息，请尽快查阅！</a>
                        </div><?php endif; ?>

            </div>

            <div class="saferenzwk">
               <div class="saferenzwk_title">安全认证</div>
               <div class="phoneemailwk">

                   <ul id="banging" class="banding">
                        
                        <li>
                            <div class="shoujilogo">
                                    <img src="/assets/user/home/img/phonelogo.png">
                            </div>
                            <div class="jiedanphone">
                            <?php if(!$info['user']['tel_safe_chk']): ?><h3>安全手机<span class="jvsecolor fontnowei">（建议绑定公司负责人）</span></h3>
                                 <p>未绑定<a href="javascript:void(0)" data-type="tel">立即绑定</a></p>
                            <?php else: ?>
                                 <h3>安全手机<span class="jvsecolor fontnowei">（建议绑定公司负责人）</span></h3>
                                 <p class="shoujihao"><?php echo ($info["user"]["tel_safe"]); ?></p>
                                 <p>已绑定<a href="javascript:void(0)" data-type="tel">修改</a></p><?php endif; ?>
                         </div>
                        </li>
                           <li class="leftjianjv">  
                                <div class="youxianglogo">
                                        <img src="/assets/user/home/img/emiallogo.png">
                                </div>
                                <div class="safeyouxiang">
                                <?php if(!$info['user']['mail_safe_chk']): ?><h3>安全邮箱</h3>
                                        <p>未绑定<a href="javascript:void(0)" data-type="mail">立即绑定</a></p>
                                <?php else: ?>
                                        <h3>安全邮箱</h3>
                                        <p><?php echo ($info["user"]["mail_safe"]); ?></p>
                                        <p>已绑定<a href="javascript:void(0)" data-type="mail">修改</a></p><?php endif; ?>
                              </div>
                        </li>
                        <?php if(!empty($info['user']['jd_tel_1']) || !empty($info['user']['jd_tel_2'])): ?><div class="jiedan-phone-wrap font400">
                                <div class="jiedan-left">
                                    <span class="lingxinglogo"></span>接单电话：
                                </div>
                                <div class="jiedan-right">
                                    <?php if(!empty($info["user"]["jd_tel_1"])): ?><div class="phone01"><?php echo ($info["user"]["jd_tel_1"]); ?></div><?php endif; ?>
                                    <?php if(!empty($info["user"]["jd_tel_2"])): ?><div class="phone02"><?php echo ($info["user"]["jd_tel_2"]); ?></div><?php endif; ?>
                                </div>
                            </div><?php endif; ?>
                        </ul>
               </div>
               <div class="xiaotieshi">
                   <div class="xiaotieshi_title">小贴士</div>
                   <p>
                        绑定安全手机的用处：1.可以接收修改订单的微信号的验证码；2.可以接收修改查看订单密码的验证码
                    </p>
                    <p>接单电话的用处：用于接收订单提醒短信（如需修改，请联系齐装网客服）</p>
                    <p>绑定安全邮箱的用处：用于修改账号密码或者修改安全手机时验证码的接收</p>
               </div>
            </div>
                <div class="zhanghaowaik">
                    <div class="bindinghao"><span class="jiedanwx">接单微信</span><span class="jvsecolor">（为了保证订单安全,不建议绑定太多）</span></div>
                    <div class="jvsecolor bottomjianjv">备注：绑定微信后，在手机上可以接收到订单的消息，可以及时查看到订单信息。</div>
                    <?php if(!empty($wechat_list)): if(is_array($wechat_list)): $i = 0; $__LIST__ = $wechat_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="zhanghaoitem">
                            <div class="zhanghaotx">
                                <img src="<?php echo ($vo["img"]); ?>" alt="<?php echo ($vo["nickname"]); ?>">
                            </div>
                            <div class="weixcity">
                                <div class="weixcity_nicheng">微信昵称：<?php echo ($vo["nickname"]); ?></div>
                                <div class="weixcity_city">所在城市：<?php echo ($vo["city"]); ?></div>
                            </div>
                        </div><?php endforeach; endif; else: echo "" ;endif; ?>
                    <?php else: ?>
                         <a href="/wechat/" class="add-member-icon">+</a><?php endif; ?>
                </div>
            
            <?php if($info['orders']): ?><div class="ht-home-tj mt20 fontline">
                <div class="fontweight">最新申请量房动态</div>
                <span class="jvsecolor">成为齐装网会员，立刻获得业主信息！</span>
            </div>
            <ul class="newser">
              <li class="tlist1">业主</li>
              <li class="tlist1">装修预算</li>
              <li class="tlist1">项目类型</li>
              <li class="tlist1">装修类型</li>
              <li class="tlist2">装修小区</li>
              <li class="tlist1">发布时间</li>
            </ul>
            <div class="maquee">
                <ul>
                <?php if(is_array($info["orders"])): $i = 0; $__LIST__ = $info["orders"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                     <span class="tlist1"><?php echo ($vo["name"]); echo ((isset($vo["sex"]) && ($vo["sex"] !== ""))?($vo["sex"]):"先生"); ?></span>
                     <span class="tlist1"><?php echo ((isset($vo["yusuan"]) && ($vo["yusuan"] !== ""))?($vo["yusuan"]):"-"); ?></span>
                     <span class="tlist1"><?php echo ((isset($vo["hxname"]) && ($vo["hxname"] !== ""))?($vo["hxname"]):"-"); ?></span>
                     <span class="tlist1"><?php echo ((isset($vo["fname"]) && ($vo["fname"] !== ""))?($vo["fname"]):"-"); ?></span>
                     <span class="tlist2"><?php echo ((isset($vo["xiaoqu"]) && ($vo["xiaoqu"] !== ""))?($vo["xiaoqu"]):"-"); ?></span>
                     <span class="tlist1"><?php echo ($vo["time"]); ?></span>
                    </li><?php endforeach; endif; else: echo "" ;endif; ?>
                </ul>
            </div><?php endif; ?>
        </div>
        <div class="threerightwk">
            <div class="quanmianjian">
                <div class="ht-home-tj">
                        <div class="fontweight font14">全面体检</div>
                        <!-- <?php if($info['user']['check_score'] == 0): ?><h3 class="red" style="float:left;">( 您还没有体检过 )</h3>
                        <?php else: ?>
                        <span class="gray" style="float:left;">
                            <?php if($info['user']['check_warning']): ?><em class="red" style="font-size:14px;">
                                    <i class=" icon-exclamation-sign"></i>
                                </em>
                                <em class="red">
                                    您已经超过7天未体检了
                                </em>
                            <?php else: ?>
                                上次体检时间&nbsp;&nbsp;<em class="red"><?php echo (date("Y-m-d H:i:s",$info["user"]["check_time"])); ?></em></span><?php endif; ?>
                        </span><?php endif; ?> -->
                        <span class="lineheight20 jvsecolor">完善您的内容将使您的知名度与签单成功率更上一层楼</span>
                    </div>
                    <div class="ht-home-jdt oflow">
                            <div class="jdt sample_goal" id="sample_goal"></div>
                            <div class="ht-home-check">

                            </div>
                            <div class="defenwk">
                                <div class="defenbeijing">
                                        <?php echo ((isset($info["user"]["check_score"]) && ($info["user"]["check_score"] !== ""))?($info["user"]["check_score"]):0); ?>
                                </div>
                                <div class="tijdefen">亲,您上一次体检得分</div>
                           </div>
                            <button class="jdt-btn">立即体检</button>
                    </div>
                </div>
                <div class="caozuowk">
                        <div class="caozuowkhead">
                            <div class="fontweight font14 lineheight30">操作记录</div>
                            <span class="lineheight20 jvsecolor">若不是您本人操，请与齐装网客服联系，谢谢！</span>
                        </div>
                        <dl class="ht-home-czjl">
                                <?php if(is_array($info["logs"])): $i = 0; $__LIST__ = $info["logs"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($key == date('Y-m-d')): ?><dt>今天</dt>
                                        <?php else: ?>
                                        <dt><?php echo (date("m-d",$vo["date"])); ?></dt><?php endif; ?>
                                    <?php if(is_array($vo["child"])): $i = 0; $__LIST__ = $vo["child"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><dd><i class="icon-time mr10"></i><?php echo (date("H:i:s",$v["time"])); ?>&nbsp;&nbsp;&nbsp;<?php echo ($v["info"]); ?>&nbsp;&nbsp;&nbsp;<?php echo ($v["remark"]); ?></dd><?php endforeach; endif; else: echo "" ;endif; endforeach; endif; else: echo "" ;endif; ?>
                            </dl>
                </div>
        </div>
    </div>
    <?php echo ($BusinessLicenceTips); ?>
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
    <?php echo ($urgentNotice); ?>

     <div class="tips-mask">
        <div class="tips-container">
            <div class="tips-header"><i class="fa fa-close"></i></div>
            <p>为了您的账号安全,请每隔30天修改一次密码</p>
            <div class="btn-box">
                <span class="btn-item btn-danger"><a href="/getpassword/">立即修改</a></span>
                <span class="btn-item btn-default" id="ignore">忽略</span>
            </div>
        </div>
    </div>

</body>
<script type="text/javascript">
$(function(){
    var ckeck_alert = '<?php echo ($check_alert); ?>';
    if(ckeck_alert == 1){
        $(".tips-mask").fadeIn()
    }
    $('#sample_goal').goalProgress({
        goalAmount: 100, //进度条控制台
        currentAmount:100 ,
        text:"亲,您上一次体检得分 <?php echo ((isset($info["user"]["check_score"]) && ($info["user"]["check_score"] !== ""))?($info["user"]["check_score"]):0); ?>！"
    });
    // 营业执照审核弹窗操作
    $('.tip-btn-close').on('click',function(){
        $('.tip-info').fadeOut(300);
    });
    $(".jdt-btn").click(function(event) {
        if($(".ht-home-list").length == 0){
            var total = 0;
            var _this = $(this);
            $.ajax({
                url: '/chkstatus',
                type: 'POST',
                dataType: 'JSON'
            })
            .done(function(data) {
                if(data.status == 1){
                    $('.ht-home-jdt .defenwk').hide();
                    $('.ht-home-jdt .jdt').show();
                    $(".ht-home-check").append(data.data.tmp);
                    _this.addClass('active').find("em").html("停止检测");
                    $('#sample_goal').goalProgress("reset");
                    var total = 0;
                    var score = 0;
                    var parent = $(".ht-home-list");
                    $(".ht-home-list li").each(function(i){
                        var li = $(this);
                        var type = li.attr("data-type");

                        var target = data.data[type];
                        if(typeof target != "undefined"){
                            score += parseInt(target.score);
                            var arguments = [target.percentage,"正在检测"+target.name+"...",total,function(){
                                li.find("p").html(target.text);
                                li.append("<a></a>");
                                if(target.score >= target.percentage){
                                    li.addClass('sucsess');
                                    li.find("i").removeClass("icon-refresh").addClass('icon-ok-circle');
                                    li.find("a").addClass('none').html("已完成");
                                }else{
                                    li.addClass('danger');
                                    li.find("i").removeClass("icon-refresh").addClass(target.icon);
                                    li.find("a").html(target.info).attr("href",target.href);
                                }
                            }];
                            $('#sample_goal').goalProgress("queue",arguments);
                            total += target.percentage;

                            if(i == $(".ht-home-list li").length -1){
                                
                                arguments = [score,"亲,您这次体检的得分",function(){
                                    $.ajax({
                                        url: '/editbaseinfo',
                                        type: 'POST',
                                        dataType: 'JSON',
                                        data: {
                                            score:score
                                        }
                                    });
                                    _this.find("em").html("检测完成!");
                                }];
                                $('#sample_goal').goalProgress("finish",arguments);
                            }
                        }
                    });
                    $('#sample_goal').goalProgress("dequeue");
                }else{
                    $('#sample_goal').goalProgress("abort");
                }
            })
            .fail(function(xhr) {
                $.pt({
                    target: _this,
                    content:"发生了未知的错误,请刷新页面！",
                    width: 'auto'
                });
            });
        }else{
            $(".ht-home-list").remove();
            $('.ht-home-jdt .defenwk').show();
            $('.ht-home-jdt .jdt').hide();
            $(this).find("em").html("开始检测");
            $('#sample_goal').goalProgress("abort",[function(){$.ajax({
                                    url: '/editbaseinfo',
                                    type: 'POST',
                                    dataType: 'JSON',
                                    data: {
                                        score:"{$info.user.check_score}",
                                        time:"<?php echo ($info["user"]["check_time"]); ?>"
                                    }
                                });}]);
        }
    });

    $(".banding a").click(function(event) {
        var _this = $(this);
        var type = _this.attr("data-type");
        $.ajax({
            url: '/account/',
            type: 'POST',
            dataType: 'JSON',
            data:{
                ssid:"<?php echo ($info["ssid"]); ?>",
                type:type
            }
        })
        .done(function(data) {
            if(data.status == 1){
                $("body").append(data.data);
            }
        }).fail(function(xhr) {
            //显示提示
            $.pt({
                target: _this,
                content: '操作失败,请稍后再试！',
                width: 'auto'
            });
        });
    });

    setInterval('autoScroll(".maquee")', 500);


  $('.sortpaiming').mouseenter(function(){
    $('.sortbeijing').show()
  })

  $('.sortpaiming').mouseleave(function(){
    $('.sortbeijing').hide()
  })


});
function autoScroll(obj) {
    $(obj).find("ul").animate({
        marginTop: "-30px"
    }, 2000, function() {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    })
}
   $("#ignore, .fa-close").click(function(event) {
        $(".tips-mask").fadeOut();
    });

</script>

</html>