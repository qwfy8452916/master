<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <title>在线智能装修报价，轻松获得精确预算，躲避装修猫腻_齐装网</title>
    <meta name="keywords" content="在线报价，装修报价，委托设计" />
    <meta name="description" content="齐装网是目前中国较大较活跃的交流社区，为业主提供专业服务的平台，依托齐装网数十万的设计师群体和全国各地的装修公司、商家会员为业主提供完美家居解决方案，致力让全中国业主懂得家居生活，享受完美家居生活。" />
    <link rel="Shortcut Icon" href="<?php echo ($static_host); ?>/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/all.css?v=<?php echo C('STATIC_VERSION');?>"/>
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/minimal/red.css?v=<?php echo C('STATIC_VERSION');?>" />
<!--S小贴士-->
<link rel="stylesheet" href="/assets/home/about/css/swiper-3.3.1.min.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" href="/assets/common/css/xiaotieshi.css?v=<?php echo C('STATIC_VERSION');?>">
<!--E小贴士-->
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public-new.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link href="<?php echo ($static_host); ?>/assets/common/css/step.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/window.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/tooltips/tooltips.css?v=<?php echo C('STATIC_VERSION');?>"/>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/order.js?v=<?php echo C('ORDER_JS_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/icheck/icheck.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.cookie-min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/popwin.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<!--S小贴士-->
<script type="text/javascript" src="/assets/home/about/js/swiper-3.3.1.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<!--E小贴士-->
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/tooltips/jquery.pure.tooltips.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/hm.min.js?ver=1&md=<?php echo time();?>"></script>
<script type="text/javascript" src="<?php echo ($cityfile); ?>"></script>
<!--[if lt IE 9]>
<script src="<?php echo ($static_host); ?>/assets/xiaoguotu/js/css3-mediaqueries.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="/assets/common/js/html5shiv.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<![endif]-->
<!--[if lte IE 7]>
<script  type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/json2.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<![endif]-->

    <link rel="stylesheet" type="text/css" href="<?php echo ($static_host); ?>/assets/home/zb/css/zxbj.css?v=<?php echo C('STATIC_VERSION');?>" />
<script>
    window._agl = [];
    (function () {
        _agl.push(
            ['production', '_f7L2XwGXjyszb4d1e2oxPybgD']
        );
        (function () {
            var agl = document.createElement('script');
            agl.type='text/javascript';
            agl.async = true;
            agl.src = 'https://fxgate.baidu.com/angelia/fcagl.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(agl, s);
        })();
    })();
</script>
</head>
<body>
    <?php echo ($headerTmp); ?>
    <div class="zxbj">
        <div class="wrap zxbj-box" id="step2-box1">
            <div class="znbj-con">
                <div class="znbj-con-box">
                    <div class="info-input znbj-con-l">
                        <div class="con-l-tit">
                            <p class="con-l-text">
                                装修报价计算器
                            </p>
                            <p class="text-con">
                                今日已有
                                <i class="text-red"><?php echo releaseCount("fbrs");?>人</i>
                                免费获取设计方案
                            </p>
                        </div>
                        <div class="znbj-form validate">

                             <div id="select_box" class="form-line">
                                <div class="element">
                                    <select id="cs" name="cs"></select>
                                    <select id="qy" name="qy"></select>
                                </div>
                                <p class="error-info"></p>
                            </div>

                            <div class="form-line">
                                <input class="mianjixz" type="number" name="mianji" placeholder="输入您的房屋面积">
                                <i class="mianji-icon">㎡</i>
                                <p class="error-info text-red"></p>
                            </div>
                            <div class="form-line">
                                <input type="text" name="tel" placeholder="输入手机号获取报价" maxlength="11">
                                <input type="hidden" name="fb_type" value="baojia">
                                <p class="error-info text-red"></p>
                            </div>
                            <div class="form-line">
                                <input class="xiaoquname" type="text" name="xiaoqu" placeholder="填写小区以便准确匹配">
                                <p class="error-info text-red"></p>
                            </div>
                            <!--S-免责申明-->
                                <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                            <!--E-免责申明-->

                        </div>
                    </div>
                </div>
                <div class="znbj-con-m">
                    <div class="con-m-bgt">
                        <div class="clickbtn" ></div>
                        <div class="cxjisuan" style="display: none;">
                           <div class="resend"></div>
                           <div class="erweima"></div>
                           <div class="shaoma">扫一扫，获取更多免费惊喜</div>
                        </div>
                    </div>
                </div>
                <div class="znbj-con-r">
                    <div class="con-l-tit">
                        <p class="con-l-text">
                            您的装修预算为<span id="total-price" class="num-up text-red">?</span>元
                        </p>
                    </div>
                    <ul class="con-r-ul">
                        <li>
                            <span>客厅总价</span>
                            <div><p><i id="kt-price" class="num-up">?</i>元</p></div>
                        </li>
                        <li>
                            <span>厨房总价</span>
                            <div><p><i id="cf-price" class="num-up">?</i>元</p></div>
                        </li>
                        <li>
                            <span>卧室总价</span>
                            <div><p><i id="zw-price" class="num-up">?</i>元</p></div>
                        </li>
                        <li>
                            <span>卫生间总价</span>
                            <div><p><i id="wsj-price" class="num-up">?</i>元</p></div>
                        </li>
                        <li>
                            <span>水电总价</span>
                            <div><p><i id="sd-price" class="num-up">?</i>元</p></div>
                        </li>
                        <li>
                            <span>其他总价</span>
                            <div><p><i id="other-price" class="num-up">?</i>元</p></div>
                        </li>
                    </ul>
                    <div class="info-show con-r-hint" style="margin-right: -6px;">
                        <p>*该报价为半包估算价，实际以上门量房实测为准。</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap zxbj-box" style="display:none;" id="step2-box2">
            <div class="znbj-con">
                <p class="line"></p>
                <div class="left">
                    <div class="znbj-con-r" id="znbj-con-r">
                        <div class="con-l-tit">
                            <p class="con-l-text">
                                您的装修预算为<span id="total-price1" class="num-up text-red pricess">?</span>元
                            </p>
                        </div>
                        <ul class="con-r-ul">
                            <li>
                                <span>客厅总价</span>
                                <div><p><i id="kt-price1" class="num-up kt-price">?</i>元</p></div>
                            </li>
                            <li>
                                <span>厨房总价</span>
                                <div><p><i id="cf-price1" class="num-up cf-price">?</i>元</p></div>
                            </li>
                            <li>
                                <span>卧室总价</span>
                                <div><p><i id="zw-price1" class="num-up zw-price">?</i>元</p></div>
                            </li>
                            <li>
                                <span>卫生间总价</span>
                                <div><p><i id="wsj-price1" class="num-up wsj-price">?</i>元</p></div>
                            </li>
                            <li>
                                <span>水电总价</span>
                                <div><p><i id="sd-price1" class="num-up sd-price">?</i>元</p></div>
                            </li>
                            <li>
                                <span>其他总价</span>
                                <div><p><i id="other-price1" class="num-up other-price">?</i>元</p></div>
                            </li>
                        </ul>
                        <div class="info-show con-r-hint" style="margin-right: -6px;">
                            <p>*该报价为半包估算价，实际以上门量房实测为准。</p>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="znbj-tck" id="znbj-tck"></div>
                    <div style="width:385px;margin:0 auto;">
                        <p class="message"><span class="znbj-s1">完善以下信息</span>&nbsp;让我们更了解您的需求<span class="znbj-s2">优先</span>为您服务</p>
                        <div class="choose fullname">
                            <div class="znbj-right">1. 您的姓名</div>
                            <input type="text" class="mess" placeholder="">
                            <div class="znbj-jrxsex">
                                <input type="radio" name="sex" id="nan" value="先生"><label for="nan">先生</label>
                            </div>
                            <div class="znbj-jrxsex">
                                <input type="radio" name="sex" id="nv" value="女士"><label for="nv">女士</label>
                            </div>
                        </div>
                        <div class="choose zxtime">
                            <div class="znbj-right">2. 您家准备什么时候开始装修：</div>
                            <div>
                                <div class="znbj-jrx" style="margin-left:17px;">
                                    <input type="radio" name="start" id="z1" value="1个月内开工"><label for="z1">1个月内</label>
                                </div>
                                <div class="znbj-jrx">
                                    <input type="radio" name="start" id="z2" value="2个月内开工"><label for="z2">2个月内</label>
                                </div>
                                <div class="znbj-jrx">
                                    <input type="radio" name="start" id="z3" value="3个月内开工"><label for="z3">3个月内</label>
                                </div>
                                <div class="znbj-jrx">
                                    <input type="radio" name="start" id="z4" value="面议"><label for="z4">面议</label>
                                </div>
                            </div>
                        </div>
                        <div class="choose znbj-lftime">
                            <div class="znbj-right">3. 装修公司何时可以为您量房：</div>
                            <div>
                                <div style="width:385px;height:35px;">
                                    <div class="znbj-jrx" id="znbj-jrxlf1" style="margin-left:17px;">
                                        <input type="radio" value="随时" name="lftime" id="l1" ><label for="l1" class="l1">随时</label>
                                    </div>
                                    <div class="znbj-jrx">
                                        <input type="radio" value="下班后" name="lftime" id="l2" ><label for="l2" class="l2">下班后</label>
                                    </div>
                                    <div class="znbj-jrx">
                                        <input type="radio" value="3天内" name="lftime" id="l3" ><label for="l3" class="l3">3天内</label>
                                    </div>
                                </div>
                                <div>
                                    <div class="znbj-jrx" id="znbj-jrxlf2" style="margin-left:17px;">
                                        <input type="radio" value="周末" name="lftime" id="l4" ><label for="l4" class="l4">周末</label>
                                    </div>
                                    <div class="znbj-jrx">
                                        <input type="radio" value="1周内" name="lftime" id="l5" ><label for="l5" class="l5">一周内</label>
                                    </div>
                                    <div class="znbj-jrx">
                                        <input type="radio" value="其他" name="lftime" id="l6" ><label for="l6" class="l6">其他</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <p class="prompt"><span>量房小贴士：</span>通过量房可以了解到您房屋的户型结构、采光等信息，为您量身定制精确的设计方案和报价。</p>
                        <button id="step2-btn" class="btn">提交</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap zxbj-box" style="display:none;"  id="step2-box3">
            <div class="znbj-con">
                <p class="line"></p>
                <div class="left-third">
                    <div class="imgs">
                        <img src="/assets/common/img/u472.jpg" />
                    </div>
                    <h2 style="color:#ff5050;margin-top:15px;">申请成功！</h2>
                    <p style="margin-top:40px;color:#8c8c8c;">工作人员将于24小时内致电您，为您提供更详细的装修报价。</p>
                </div>
                <div class="right-third">
                    <div style="width:385px;height:370px;margin:0 auto;">
                        <h1>感谢选择齐装网的你</h1>
                        <p>您一共获得<span>4项装修礼包</span>，扫码立即获取</p>
                        <div class="choose-third">
                            <div class="step4-jrx">
                                <img src="/assets/common/img/2_06.jpg" /><label>4份户型设计方案</label>
                            </div>
                            <div class="step4-jrx">
                                <img src="/assets/common/img/2_06.jpg" /><label>10000套装修效果图</label><br>
                            </div>
                            <div class="step4-jrx">
                                <img src="/assets/common/img/2_06.jpg" /><label>免费装修报价</label>
                            </div>
                            <div class="step4-jrx">
                                <img src="/assets/common/img/2_06.jpg" /><label>更全装修攻略</label>
                            </div>
                        </div>
                        <div class="wx">
                            <img src="/assets/common/img/weixin_fdrk.jpg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="shipinkz">
        <div class="shipinzt">
            <div class="shipinwz company-video" id="company-video">
            </div>
            <div class="wzmsright">
                <div class="jinbjtitle" onclick="bofang()">准确报价误差小</div>
                <div class="jinbjtitle02">拒绝恶意增项0陷阱</div>
                <ul class="ulwenzi">
                    <li><i class="fa fa-circle" aria-hidden="true"></i>5万余家正规装修公司</li>
                    <li><i class="fa fa-circle" aria-hidden="true"></i>550万余条装修案例</li>
                    <li><i class="fa fa-circle" aria-hidden="true"></i>耗时三年的数据分析</li>
                    <li><i class="fa fa-circle" aria-hidden="true"></i>为您提供准确的报价</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="txfwkz">
        <div class="txfwzt">
            <a href="#">
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/txfw01.jpg">
            </a>
            <div class="yizans">
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/txfw07.jpg">
            </div>
            <a href="#" class="yizans02">
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/txfw06.jpg">
            </a>
            <div class="jiantou01"></div>
            <a href="#" class="yizans03">
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/txfw02.jpg">
            </a>
            <div class="jiantou02"></div>
            <a href="#" class="yizans04">
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/txfw03.jpg">
            </a>
            <div class="jiantou03"></div>
            <a href="#" class="yizans05">
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/txfw04.jpg">
            </a>
            <div class="jiantou04"></div>
            <a href="#" class="yizans06">
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/txfw05.jpg">
            </a>
            <div class="jiantou05"></div>
        </div>
    </div>
    <div class="footer">
    <div class="kefu-box">
        <span class="mr-10">客服电话：<em class="f-red"><?php echo OP("QZ_CONTACT_TEL400");?></em></span> 客服QQ：
        <a rel="external nofollow" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=<?php echo OP('QZ_CONTACT_QQ1');?>&site=qq&menu=yes" title="点击这里给 <?php echo OP('QZ_CONTACT_QQ1_NAME');?> 发消息">
            <img src="/assets/common/img/qq_bottom.gif" class="kefu-qq" alt="齐装网官方客服"/>
        </a>
        <a rel="external nofollow" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=<?php echo OP('QZ_CONTACT_QQ2');?>&site=qq&menu=yes" title="点击这里给 <?php echo OP('QZ_CONTACT_QQ2_NAME');?> 发消息">
            <img src="/assets/common/img/qq_bottom.gif" class="kefu-qq" alt="齐装网官方客服"/>
        </a>
    </div>
    <ul>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/about" target="_blank" rel="nofollow">齐装网简介</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/contactus" target="_blank" rel="nofollow">联系我们</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/culture" target="_blank" rel="nofollow">企业文化</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/zhaopin" target="_blank" rel="nofollow">诚聘英才</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/team" target="_blank" rel="nofollow">员工风采</a></li>
        <li><a style="color: #FF5353" href="http://<?php echo C('QZ_YUMINGWWW');?>/about/fengcai" target="_blank" rel="nofollow">企业风采</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/media" target="_blank" rel="nofollow">媒体报道</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/legal" target="_blank" rel="nofollow">法律声明</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/liansuo" target="_blank" rel="nofollow">战略合作</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/kefu/" target="_blank" rel="nofollow">客服中心</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/city/" target="_blank" rel="nofollow">城市导航</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/sitemap.html" target="_blank" rel="nofollow">网站地图</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/ruzhu/" target="_blank" rel="nofollow">商家入驻</a></li>
    </ul>
    <p class="foot-disclaimer">免责声明：任何单位或个人认为本网站转载信息涉及版权或有侵权嫌疑等问题的，敬请立即通知，齐装网将在第一时间予以更改或删除。</p>
    <p>苏州云网通信息科技有限公司 齐装网 版权所有Copyright ©<?php echo date("Y");?> Www.QiZuang.Com. All Rights Reserved</p>
    <p>法律顾问：江苏蓝之天律师事务所 徐玲律师 <a target="_blank" rel="nofollow" href="http://www.miitbeian.gov.cn">苏ICP备12045334号</a> </p>
    <p>增值电信业务经营许可证：<a target="_blank" rel="nofollow" href="http://www.miitbeian.gov.cn/"><?php echo OP('QZ_BEIAN_JYX_INFO');?></a></p>
</div>

<!--伸缩广告-->
<?php if($zb_bottom_s): echo ($zb_bottom_s); endif; ?>
<!-- 客服挂件，回顶按钮开关
     0 关闭, 不为0  打开 -->
<?php if($is_top != '0'): ?><!--客服挂件，回到顶部-->
    <div class="fix_warp">
        <!--客服挂件-->
        <?php if(empty($_COOKIE['m_to_pc'])): ?><div class="fix_nav">
                <div class="moqu_kefu">
                    <?php echo OP('53kf','yes');?>
                    <div class="xiaotiestishi">
                    <span class="zxxtsbiaot">装修小贴士：</span>
                        <span class="lingjy">0经验也能10分钟了<br/>解装修，戳我查看！</span>
                        <div class="xiaotieshiguanbi"></div>
                    </div>
                    <a rel="nofollow" href="javascript:void(0)" class="moqu_header">
                    </a>
                    <a id="s-zxzb" rel="nofollow" class="moqu_zb" href="javascript:void(0)">
                        <span class="bj">免费报价</span>
                    </a>
                    <a id="s-zxsj" rel="nofollow" class="moqu_sj" href="javascript:void(0)">
                        <span class="icon"></span>
                        <span class="icon-tips">免费设计</span>
                    </a>
                    <a rel="nofollow" class="moqu_assistant dianjixts" href="javascript:void(0)">
                        <span class="icon"></span>
                        <span class="icon-tips">装修助手</span>
                    </a>
                    <div class="moqu_qq">
                        <a rel="nofollow" href="javascript:void(0)" onclick="open_pic_chat()">
                            <span class="icon"></span>
                            <span class="icon-tips">在线咨询</span>
                        </a>
                    </div>
                    <div class="guanzhuyl">
                        <a rel="nofollow" href="javascript:void(0)">
                            <span class="icon"></span>
                            <span class="icon-tips">关注有礼</span>
                        </a>
                    </div>
                    <a rel="nofollow" class="moqu_top" href="javascript:void(0)">
                        <span class="icon"></span>
                        <span class="icon-tips">回到顶部</span>
                    </a>
                </div>
                <div class="guanzhubj">
                  <div class="guanzhubj_left">
                    <img class="weibotup" src="/assets/common/img/weibo.jpg" alt="齐装网微博" />
                    <p class="weibopbq">关注微博</p>
                    <p>找到这，你家装修</p>
                    <p>就成功了一半</p>
                    <img class="weixingzh" src="/assets/common/img/weixingongzhao.jpg" alt="齐装网微信公众号" />
                    <p class="weixinms">关注微信</p>
                    <p>10000套效果图抢</p>
                    <p>先看</p>
                  </div>
                </div>
            </div>
            <script type="text/javascript">

                $('.guanzhuyl').mouseover(function(){
                    $('.guanzhubj').show();
                })
                $('.guanzhuyl').mouseout(function(){
                    $('.guanzhubj').hide();
                })

                // setTimeout(function(){
                //     $('.fix_nav .moqu_kefu .xiaotiestishi').fadeOut();
                //     },5000);

                $('.dianjixts').click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    if ($("#guide").length > 0) {
                        $('.toumyingy').show();
                        $('.xiaotieskz').show();

                        return false;
                    }
                    $.ajax({
                        url: '/guide/',
                        type: 'GET',
                        dataType: 'JSON'
                    })
                    .done(function(data, status, xhr) {
                        $('.fix_nav .moqu_kefu .xiaotiestishi').hide();
                        $('.fix_warp').append(data.data);
                        $('.toumyingy').show();
                        $('.xiaotieskz').show();
                        if (typeof(Storage) !== "undefined") {
                            localStorage.setItem("guideclose", "1");
                        }
                    })
                    .fail(function(xhr, status, error) {
                        alert('网络错误，请稍后重试~')
                    });
                });

                //客服挂件
                $(".fix_nav").hover(function(){
                    $(".fix_nav .moqu_header").addClass('moqu_header_active');
                },function(){
                    $(".fix_nav .moqu_header").removeClass('moqu_header_active');
                });
                $(".moqu_top").click(function(){
                    $('body,html').animate({scrollTop:0},1000);
                    return false;
                });
                function goToHeader(){
                    //alert($(".moqu_kefu").height());
                    var top = $(document).scrollTop();
                    if (top > 600) {
                        $('.moqu_kefu .moqu_top').show();
                        // $('.moqu_kefu').height(340);
                        $(".moqu_qq").css("border-bottom","1px solid #EBEBEB");
                    } else {
                        $('.moqu_kefu .moqu_top').hide();
                         //$('.moqu_kefu').height(276);
                         $(".moqu_qq").css("border-bottom","none");
                    }
                }
                goToHeader();
                $(window).scroll(function() {
                    goToHeader();
                });
            </script><?php endif; ?>
    </div><?php endif; ?>
<!--百度统计-->
<?php echo OP('baidutongji1');?>
<?php if($var != 404): echo OP('yycollect','yes');?>
    <script>
    (function(){
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https'){
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else{
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
</script><?php endif; ?>
<?php if($isOpen): ?><script type="text/javascript">
      $(function(){
        $("#s-zxzb").trigger('click');
      });
    </script><?php endif; ?>

<script type="text/javascript">
    $("#s-zxsj").click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        var _this = $(this);
        $.ajax({
            url: '/dispatcher/',
            type: 'POST',
            dataType: 'JSON',
            data: {
                type: "sj",
                source: 158,
                action: "load"
            }
        })
        .done(function(data) {
            if (data.status == 1) {
                $("body").append(data.data);

                $(".zb_box_sj").fadeIn(400, function() {
                    $(this).find("input[name=lf-name]").focus();
                });
                window.setTimeout(function(){
                    $('#quchujicheng input[name=name]').focus();
                },100);
            }
        });
    });
    $("#s-zxzb").click(function(event) {
        var _this = $(this);
        $.ajax({
            url: '/dispatcher/',
            type: 'POST',
            dataType: 'JSON',
            data: {
                type:"bj",
                source: 159,
                action:"load"
            }
        })
        .done(function(data) {
            if (data.status == 1) {
                $("body").append(data.data);
                if(navigator.appName == "Microsoft Internet Explorer"){
                    $(".zxfb").show();
                    _this.hide();
                }else{
                    $(".zxfb").fadeIn(400,function(){
                        $(this).find("input[name='bj-xiaoqu']").focus();
                    });
                    $(".zxbj_content").removeClass('smaller');
                }
                $(".win_box .win-box-bj-mianji").addClass('focus').focus();
            }
        });
    });
</script>

    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/text-slideup.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/countUp.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/plugin/jwplayer/jwplayer.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/plugin/jwplayer/jwpsrv.js?v=<?php echo C('STATIC_VERSION');?>"></script>

<script type="text/javascript">
    var shen = null, shi = null, areaId = null;
    var cityId = '<?php echo ($theCityId); ?>';
    var price = '<?php echo (json_encode($price)); ?>';
    if (price != "null") {
        price = JSON.parse(price);
        calculate(price);
        $(".clickbtn").hide();
        $('.cxjisuan').show();
        cityId = price.cs;
        areaId = price.qx;
        $('input[name=mianji]').val(price.mianji);
        $('input[name=xiaoqu]').val(price.xiaoqu);
        $('input[name=tel]').val(price.tel8);
    }

    //光标自动定位
    $(".znbj-form input[name=mianji]").focus();
    shen = citys["shen"];
    shi = citys["shi"];

$(document).ready(function() {
    video = jwplayer("company-video");

    // 视频播放
    video.setup({
        flashplayer: "<?php echo ($static_host); ?>/assets/common/plugin/jwplayer/jwplayer.flash.swf",
        file:"http://<?php echo C('QINIU_DOMAIN');?>//video/qizuang/jingzhunbj.mp4",
        height: 388,
        width: 690,
        autostart:false,
        image: "<?php echo ($static_host); ?>/assets/home/zb/img/shipinfm.jpg",
        screencolor :"#000"
    });

    initCity(cityId);
    function initCity(cityId,areaId){
        App.citys.init("#cs", "#qy", shen, shi,cityId,areaId);
    }

    $('.clickbtn').click(function () {
        var geshu = $('.num-up');
        var mianjival = parseInt($('.mianjixz').val());

        var container = $(".znbj-form");
        $(".focus", container).removeClass('focus');
        $(".error-info", container).html("");
        if (!App.validate.run($("select[name=cs]", container).val())) {
            $("select[name=cs]", container).addClass('focus').focus();
            $(".element", container).siblings('.error-info').html("请选择城市");
            return false;
        }
        if (!App.validate.run($("input[name=mianji]", container).val())) {
            $("input[name=mianji]", container).addClass('focus').focus();
            $("input[name=mianji]", container).siblings('.error-info').html("请填写房屋面积");
            return false;
        }
        if (isNaN(mianjival)) {
            $("input[name=mianji]", container).addClass('focus').focus();
            $("input[name=mianji]", container).val('');
            $("input[name=mianji]", container).siblings('.error-info').html("面积只能是纯数字");
            return false;
        }
        if (mianjival < 1 || mianjival > 10000) {
            $("input[name=mianji]", container).siblings('.error-info').html("房屋面积请输入1-10000之间的数字^_^!");
            return false;
        }
        //检查手机号
        if (!App.validate.run($("input[name=tel]", container).val())) {
            $("input[name=tel]", container).addClass('focus').focus();
            $("input[name=tel]", container).siblings('.error-info').html("请填写正确的手机号码 ^_^!");
            return false;
        } else {
            var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
            if (!reg.test($("input[name=tel]", container).val())) {
                $("input[name=tel]", container).addClass('focus').focus();
                $("input[name=tel]", container).siblings('.error-info').html("请填写正确的手机号码 ^_^!");
                return false;
            }
            if (!App.validate.run($("input[name=xiaoqu]", container).val())) {
                $("input[name=xiaoqu]", container).addClass('focus').focus();
                $("input[name=xiaoqu]", container).siblings('.error-info').html("请填写小区名");
                return false;
            }
            if (!isNaN($('.xiaoquname').val())) {
                $('.xiaoquname').focus();
                $("input[name=xiaoqu]", container).siblings('.error-info').html("小区名称不能为纯数字");
                return false;
            }
        }

        if (!checkDisclamer(".znbj-form")) {
            return false;
        }

        var data = {
            mianji: $("input[name=mianji]", container).val(),
            cs: $("select[name=cs]", container).val(),
            qx: $("select[name=qy]", container).val(),
            name: $("input[name=name]", container).val(),
            tel: $("input[name=tel]", container).val(),
            fb_type: $("input[name=fb_type]", container).val(),
            xiaoqu: $("input[name=xiaoqu]", container).val(),
            source: '<?php echo ($source); ?>'
        };

        window.order({
            extra: data,
            error: function () {
                alert('获取报价失败,请刷新页面');
            },
            success: function (data, status, xhr) {
                if (data.status == 1) {
                    window._agl && window._agl.push(['track', ['success', {t: 3}]]);
                    $.ajax({
                        url: '/getdetailsbyajax/',
                        type: 'GET',
                        dataType: 'JSON'
                    }).done(function (data) {
                        if (data.status == 1) {
                            $("#step2-box1").hide();
                            $("#step2-box2").show();
                            $('.pricess').text(data.data.total);
                            $(".kt-price").text(data.data.kt);
                            $(".cf-price").text(data.data.cf);
                            $(".zw-price").text(data.data.zw);
                            $(".wsj-price").text(data.data.wsj);
                            $(".sd-price").text(data.data.sd);
                            $(".other-price").text(data.data.other);
                        } else {
                            alert(data.info);
                        }
                    }).fail(function (xhr) {
                        alert('获取报价失败,请刷新页面');
                    });
                } else {
                    alert(data.info);
                }
            },
            validate: function (item, value, method, info) {
                return true;
            }
        });

//        $(this).hide();
//        $('.cxjisuan').show();
//        $($(geshu)[1]).html("200000");
//        $($(geshu)[2]).html("300000");
//        $($(geshu)[3]).html("400000");
//        $($(geshu)[4]).html("500000");
//        $($(geshu)[5]).html("600000");
//        $($(geshu)[6]).html("700000");
    });

    //智能报价第二屏验证
    $("#step2-btn").click(function () {
        var reg_rename = /^[\u4e00-\u9fa5a-zA-Z]{1,10}$/;
        var sex = $("input[name='sex']:checked").val();
        var start = $("input[name='start']:checked").val();
        var lftime = $("input[name='lftime']:checked").val();
        var data1 = {
            name: $(".mess").val()
        };
        if (data1.name == '') {
            $("#znbj-tck").show();
            $("#znbj-tck").html("请填写您的姓名")
            setTimeout(function(){
                $("#znbj-tck").hide()
            },1000)
            return false;
        }
        if (!reg_rename.test(data1.name)) {
            $("#znbj-tck").show();
            $("#znbj-tck").html("请填写真实的姓名")
            setTimeout(function(){
                $("#znbj-tck").hide()
            },1000)
            return false;
        }
        if (sex == undefined || sex == '') {
            $("#znbj-tck").show();
            $("#znbj-tck").html("请选择您的性别")
            setTimeout(function(){
                $("#znbj-tck").hide()
            },1000)
            return false;
        }
        if (start == undefined || start=="") {
            $("#znbj-tck").show();
            $("#znbj-tck").html("请选择开始装修时间")
            setTimeout(function(){
                $("#znbj-tck").hide()
            },1000)
            return false;
        }
        if (lftime == undefined || lftime == '') {
            $("#znbj-tck").show();
            $("#znbj-tck").html("请选择量房时间")
            setTimeout(function(){
                $("#znbj-tck").hide()
            },1000)
            return false;
        }

        data1.sex = sex;
        data1.start = start;
        data1.lftime = lftime;
        data1.step = 2;

        $.ajax({
            url: '/getdetailsbyajax/',
            type: 'POST',
            data: data1,
            dataType: 'JSON'
        }).done(function (data) {
            if (data.status == 1) {
                $("#step2-box2").hide();
                $("#step2-box3").show();
                //calculate(data.data);
            } else {
                alert(data.info);
            }
        }).fail(function (xhr) {
            alert('提交报价失败,请刷新页面');
        });
    });

    $('.cxjisuan .resend').click(function(){
        var geshu=$('.num-up');
            $(".znbj-form input").val('');
            $('.cxjisuan').hide();
            $('.clickbtn').show();

         $($(geshu)[1]).html("?");
         $($(geshu)[2]).html("?");
         $($(geshu)[3]).html("?");
         $($(geshu)[4]).html("?");
         $($(geshu)[5]).html("?");
         $($(geshu)[6]).html("?");
    });
    if( navigator.userAgent.indexOf("MSIE 8.0") > -1 ){
        $("input[name=mianji]").on("keyup",function () {
            $(this).val($(this).val().replace(/\s+/g,""));
        });
    }else{
        $("input[name=mianji]").on("input",function () {
            $(this).val( $(this).val().replace(/\s+/,"") );
        });
    }
});

function calculate(data) {
    $('#kt-price').text(data.kt);
    $('#zw-price').text(data.zw);
    $('#wsj-price').text(data.wsj);
    $('#cf-price').text(data.cf);
    $('#sd-price').text(data.sd);
    $('#other-price').text(data.other);
    $('#total-price').text(data.total);
    $(".num-up").countTo({
        lastSymbol:"", //显示在最后的字符
        firstSymbol:"￥", //显示在最后的字符
        from: 0,  // 开始时的数字
        speed: 500,  // 总时间
        refreshInterval: 10,  // 刷新一次的时间
        beforeSize:0, //小数点前最小显示位数，不足的话用0代替
        decimals: 2  // 小数点后的位数，小数做四舍五入
    });
}
</script>
</body>
</html>