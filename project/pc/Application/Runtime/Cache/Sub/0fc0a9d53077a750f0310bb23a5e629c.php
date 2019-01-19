<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <?php if(isset($info["mobileagent"])): ?><meta name="mobile-agent" content="format=html5;url=<?php echo ($info["mobileagent"]); ?>" /><?php endif; ?>
    <title><?php echo ($keys["title"]); ?></title>
    <meta name="keywords" content="<?php echo ($keys["keywords"]); ?>" />
    <meta name="description" content="<?php echo ($keys["description"]); ?>" />
    <meta name="location" content="province=<?php echo ($cityInfo["province"]); ?>;city=<?php echo ($cityInfo["name"]); ?>;coord=<?php echo ($cityInfo["lng"]); ?>,<?php echo ($cityInfo["lat"]); ?>" />
    <link href="<?php echo ($info["canonical"]); ?>" rel="canonical" />
    <link rel="Shortcut Icon" href="<?php echo ($static_host); ?>/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/all.css?v=<?php echo C('STATIC_VERSION');?>"/>
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/minimal/red.css?v=<?php echo C('STATIC_VERSION');?>" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public-new.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link href="<?php echo ($static_host); ?>/assets/common/css/step.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/tooltips/tooltips.css?v=<?php echo C('STATIC_VERSION');?>"/>
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/window.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/order.js?v=<?php echo C('ORDER_JS_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/icheck/icheck.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.cookie-min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/popwin.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/tooltips/jquery.pure.tooltips.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<!--S小贴士-->
<link rel="stylesheet" href="/assets/home/about/css/swiper-3.3.1.min.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" href="/assets/common/css/xiaotieshi.css?v=<?php echo C('STATIC_VERSION');?>">
<script type="text/javascript" src="/assets/home/about/js/swiper-3.3.1.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<!--E小贴士-->
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/hm.min.js?ver=1&md=<?php echo time();?>"></script>
<script type="text/javascript" src="<?php echo ($cityfile); ?>"></script>



    <link href="<?php echo ($static_host); ?>/assets/home/company/css/comp-list.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo ($static_host); ?>/assets/common/css/step.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo ($static_host); ?>/assets/home/company/css/luarabanner.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo ($static_host); ?>/assets/home/company/css/company-foot.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo ($static_host); ?>/assets/sub/company/css/animate.min.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <!--[if lte IE 8]>
    <link href="<?php echo ($static_host); ?>/assets/sub/company/css/zxgsgaibanie8.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <![endif]-->
    <!--[if lte IE 9]>
    <link href="<?php echo ($static_host); ?>/assets/sub/company/css/zxgsgaibanie.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <![endif]-->
    <link href="<?php echo ($static_host); ?>/assets/sub/company/css/zxcompany_p21414.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
</head>
<body>
<!--[if lte IE 8]> <link rel="stylesheet" type="text/css" href="/assets/home/ie/forie.css?v=<?php echo C('STATIC_VERSION');?>"/> <![endif]-->
<!--[if lte IE 9]> <link rel="stylesheet" type="text/css" href="/assets/home/ie/forie.css?v=<?php echo C('STATIC_VERSION');?>"/> <![endif]-->
<link rel="stylesheet" type="text/css" href="/assets/common/css/tanchuang.css?v=<?php echo C('STATIC_VERSION');?>"/>
<link rel="stylesheet" type="text/css" href="/assets/common/css/daohang20180712.css?v=<?php echo C('STATIC_VERSION');?>"/>
<?php if($topbanner != null): ?><div class="header-top-img">
        <a target="_blank" href="<?php echo ($topbanner["url"]); ?>"><img class="header-top-pic" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($topbanner["img_url"]); ?>" alt="<?php echo ($topbanner["title"]); ?>"></a>
        <div class="top-close"><img src="/assets/home/index/img/shanchu.png"></div>
    </div><?php endif; ?>
<div class="pub-top">
    <div class="wrap">
        <div class="city">
            <i class="fa fa-map-marker location"></i>
            <strong><?php echo ($cityInfo["name"]); ?></strong>
            <?php if($cityInfo['adj_city']): ?><i style="font-size: 14px; margin-top:0;">[</i>
                <?php if(is_array($cityInfo["adj_city"])): $i = 0; $__LIST__ = $cityInfo["adj_city"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if(!empty($vo['bm'])): ?><a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>" rel="nofollow" target="_blank" style=" margin:0 2px;"><?php echo ($vo["name"]); ?></a><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                <i style="margin-right:3px;font-size: 14px;margin-top:0;">]</i><?php endif; ?>
            <div class="pub-city">
                <a class="city-link" href="http://<?php echo C('QZ_YUMINGWWW');?>/city/" rel="nofollow">[切换]</a>
            </div>
            <?php echo ($info["returnhome"]); ?>
        </div>
        <ul class="menu">
            <?php if(isset($_SESSION['u_userInfo'])): ?><li>
                <a href="http://u.qizuang.com/home/" target="_blank">
                    <?php switch($_SESSION['u_userInfo']['classid']): case "1": echo ($_SESSION['u_userInfo']['name']); break;?>
                        <?php case "2": echo ($_SESSION['u_userInfo']['name']); break;?>
                        <?php case "3": echo ($_SESSION['u_userInfo']['jc']); break; endswitch;?>
                </a>
                <a class="loginout" href="javascript:void(0)">退出</a>
            </li>
                <script type="text/javascript">
                $(".loginout").click(function(event) {
                    var _this = $(this);
                    $.ajax({
                            url: '/loginout',
                            type: 'GET',
                            dataType: 'JSON',
                            data: {
                                ssid: "<?php echo ($ssid); ?>"
                            }
                        })
                        .done(function(data) {
                            if (data.status == 1) {
                                window.location.href = window.location.href;
                            } else {
                                $.pt({
                                    target: _this,
                                    content: data.info,
                                    width: 'auto'
                                });
                            }
                        })
                        .fail(function(xhr) {
                            $.pt({
                                target: _this,
                                content: '操作失败,请稍后再试！',
                                width: 'auto'
                            });
                        });
                });
                </script>
            <?php else: ?>
                <li><a href="http://u.qizuang.com" rel="nofollow">登录</a></li>
                <li><a href="http://u.qizuang.com/reg/" rel="nofollow">注册</a></li><?php endif; ?>
            <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/ruzhu" rel="nofollow">商家入驻</a></li>
            <li><a class="active" href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/zhaobiao/" rel="nofollow">我要装修</a></li>
            <li class="guanzhuli"><a href="javascript:void(0);" rel="nofollow"><span class="guanzhupic"></span><span>关注有礼</span><div class="erweimawk"><img src="/assets/common/img/topyouhuama.png" alt="关注有礼二维码"><div class="guanzhums">关注微信</div><div class="guanzhums">随身看攻略</div></div></a></li>
            <li>全国统一服务热线：<span class="menu-telnum"><?php echo OP("QZ_CONTACT_TEL400");?></span></li>
        </ul>
    </div>
</div>
<div class="pub-head-box">
    <div class="pub-head">
        <a class="logo" href="/">
            <img class="logo-img1" src="/assets/common/pic/logo-new.jpg" alt="<?php echo OP('QZ_SITE_NAME');?>" title="<?php echo OP('QZ_SITE_NAME');?>"/>
            <img class="logo-img2" src="/assets/common/pic/logo-fubiao.gif" width="146" alt="中国知名装修平台">
        </a>
        <div class="pub-head-nav">
            <ul class="nav">
                <?php if($cityInfo['bm'] != ''): ?><li><a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/">首页</a></li>
                    <?php else: ?>
                    <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/">首页</a></li><?php endif; ?>
                <?php if($cityInfo['bm'] != ''): ?><li><a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/zhaobiao/" rel="nofollow">设计与报价</a></li>
                    <?php else: ?>
                    <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/zhaobiao/" rel="nofollow">设计与报价</a></li><?php endif; ?>
                <li class="nav-list-meitu" data-pub="zxmt-nav"><a href="http://<?php echo C('MEITU_DONAMES');?>/">装修效果图<i class="fa fa-sort-desc"></i></a></li>
                <?php if($cityInfo['bm'] != ''): ?><li><a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/company/">装修公司</a></li>
                    <?php else: ?>
                    <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/company/">装修公司</a></li><?php endif; ?>
                <li class="nav-list-gonglue" data-pub="zxgl-nav"><a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/">装修攻略<i class="fa fa-sort-desc"></i></a></li>
                <li class="nav-list-more" data-pub="more-nav"><a>更多<i class="fa fa-sort-desc"></i></a></li>
                <li class="search-box"><a><img src="/assets/common/pic/sousuo.png"></a>
                </li>
            </ul>
        </div>
        <div class="pub-search">
            <div class="search-nav">
                <?php if($serch_uri == 'meitu' ): ?><form class="search-form" method="GET" action="http://meitu.<?php echo C('QZ_YUMING');?>/list/">
                <?php elseif($serch_type == '装修公司'): ?>
                <form class="search-form" method="GET" action="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/companysearch/">
                <?php else: ?>
                <form class="search-form" method="GET" action="<?php echo ($serch_uri); ?>/"><?php endif; ?>
                    <?php if($serch_uri == 'meitu' ): ?><div class="first-search" placeholder="<?php echo ($holdercontent); ?>" target="http://meitu.<?php echo C('QZ_YUMING');?>/list"><?php echo ($serch_type); ?><i class="fa  fa-sort-desc"></i></div>
                    <?php else: ?>
                    <div class="first-search" placeholder="<?php echo ($holdercontent); ?>" target="http://<?php echo C('QZ_YUMINGWWW');?>/<?php echo ($serch_uri); ?>/"><?php echo ($serch_type); ?><i class="fa  fa-sort-desc"></i></div><?php endif; ?>
                    <ul>
                        <li  placeholder="全国超过十万家装修公司为您免费设计" target="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/companysearch/">装修公司</li>
                        <li  placeholder="海量精选美图任您挑选" target="http://meitu.<?php echo C('QZ_YUMING');?>/list/">装修效果图</li>
                        <li  placeholder="3922515套真实案例任您挑选" target="http://<?php echo C('QZ_YUMINGWWW');?>/xgt/">装修案例</li>
                        <li  placeholder="了解相关的装修知识" target="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/search/">装修攻略</li>
                        <li  placeholder="专业解决您所有的装修问题" target="http://<?php echo C('QZ_YUMINGWWW');?>/wenda/search">装修问答</li>
                        <li  placeholder="视频学装修更简单" target="http://<?php echo C('QZ_YUMINGWWW');?>/video/">装修视频</li>
                    </ul>
                    <div class="search-input">
                        <input type="text" placeholder="<?php echo ($holdercontent); ?>" name="keyword">
                        <button type="button"></button>
                    </div>
                </form>
            </div>
            <div class="search-close"><img src="/assets/common/pic/quxiao.png"></div>
        </div>
    </div>
    <div class="pub-nav-hover">
        <div class="zxmt-nav">
            <div class="zxmt-nav-main">
                <div class="daohxiugitem" <?php if($choose_menu == 'jiajumeitu'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('MEITU_DONAMES');?>/list/" target="_blank"><span <?php if($choose_menu == 'list'): ?>class="jiazlogodh"<?php else: ?>class="jiazlogodh2"<?php endif; ?>></span><span <?php if($choose_menu == 'list'): ?>class="jiazuangdhms2"<?php else: ?>class="jiazuangdhms3"<?php endif; ?>>家装效果</span></a></div>
                <div class="daohxiugitem" <?php if($choose_menu == 'gongzhuang'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('MEITU_DONAMES');?>/gongzhuang/" target="_blank"><span <?php if($choose_menu == 'gongzhuang'): ?>class="gongzuanglogodh2"<?php else: ?>class="gongzuanglogodh"<?php endif; ?>></span><span <?php if($choose_menu == 'gongzhuang'): ?>class="gongzuangdhms2"<?php else: ?>class="gongzuangdhms"<?php endif; ?>>公装效果</span></a></div>

                <?php if($cityInfo['bm'] != ''): ?><div class="daohxiugitem" <?php if($choose_menu == 'xgt'): ?>class="active"<?php endif; ?>><a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/xgt/" target="_blank"><span <?php if($choose_menu == 'xgt'): ?>class="quanwulogodh2"<?php else: ?>class="quanwulogodh"<?php endif; ?>></span><span <?php if($choose_menu == 'xgt'): ?>class="quanwudhms2"<?php else: ?>class="quanwudhms"<?php endif; ?>>全屋图集</span></a></div>
                <?php else: ?>
                <div class="daohxiugitem" <?php if($choose_menu == 'xgt'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('QZ_YUMINGWWW');?>/xgt/" target="_blank"><span <?php if($choose_menu == 'xgt'): ?>class="quanwulogodh2"<?php else: ?>class="quanwulogodh"<?php endif; ?>></span><span <?php if($choose_menu == 'xgt'): ?>class="quanwudhms2"<?php else: ?>class="quanwudhms"<?php endif; ?>>全屋图集</span></a></div><?php endif; ?>
                <div class="daohxiugitem" <?php if($choose_menu == '3dxgt'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('MEITU_DONAMES');?>/3d/" target="_blank"><span <?php if($choose_menu == '3dxgt'): ?>class="vrlogodh2"<?php else: ?>class="vrlogodh"<?php endif; ?>></span><span <?php if($choose_menu == '3dxgt'): ?>class="vrgdhms2"<?php else: ?>class="vrgdhms"<?php endif; ?>>VR实景</span></a></div>
                <?php if($cityInfo['bm'] != ''): ?><div class="daohxiugitem" <?php if($choose_menu == 'sheji'): ?>class="active"<?php endif; ?>><a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/sheji/" target="_blank" rel="nofollow"><span <?php if($choose_menu == 'sheji'): ?>class="qiangsjlogodh2"<?php else: ?>class="qiangsjlogodh"<?php endif; ?>></span><span <?php if($choose_menu == 'sheji'): ?>class="qiangsjdhms2"<?php else: ?>class="qiangsjdhms"<?php endif; ?>>0元抢设计</span></a></div>
                <?php else: ?>
                <div class="daohxiugitem" <?php if($choose_menu == 'sheji'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('QZ_YUMINGWWW');?>/sheji/" target="_blank" rel="nofollow"><span <?php if($choose_menu == 'sheji'): ?>class="qiangsjlogodh2"<?php else: ?>class="qiangsjlogodh"<?php endif; ?>></span><span <?php if($choose_menu == 'sheji'): ?>class="qiangsjdhms2"<?php else: ?>class="qiangsjdhms"<?php endif; ?>>0元抢设计</span></a></div><?php endif; ?>
            </div>
        </div>
        <div class="zxgl-nav">
            <div class="zxgl-nav-main">
                <div class="daohxiugitem" <?php if($choose_gonglue == 'lc'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/lc/" target="_blank"><span <?php if($choose_gonglue == 'lc'): ?>class="zxlclogodh2"<?php else: ?>class="zxlclogodh"<?php endif; ?>></span><span <?php if($choose_gonglue == 'lc'): ?>class="zxlcdhms2"<?php else: ?>class="zxlcdhms"<?php endif; ?>>装修流程</span></a></div>
                <div class="daohxiugitem" <?php if($choose_gonglue == 'video'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('QZ_YUMINGWWW');?>/video/jiangtang/" target="_blank"><span <?php if($choose_gonglue == 'video'): ?>class="zxjtlogodh2"<?php else: ?>class="zxjtlogodh"<?php endif; ?>></span><span <?php if($choose_gonglue == 'video'): ?>class="zxjtdhms2"<?php else: ?>class="zxjtdhms"<?php endif; ?>>装修讲堂</span></a></div>
                <div class="daohxiugitem" <?php if($choose_gonglue == 'baike'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('QZ_YUMINGWWW');?>/baike/" target="_blank"><span <?php if($choose_gonglue == 'baike'): ?>class="zxbklogodh2"<?php else: ?>class="zxbklogodh"<?php endif; ?>></span><span <?php if($choose_gonglue == 'baike'): ?>class="zxbkdhms2"<?php else: ?>class="zxbkdhms"<?php endif; ?>>装修百科</span></a></div>
                <div class="daohxiugitem" <?php if($choose_gonglue == 'wenda'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('QZ_YUMINGWWW');?>/wenda/" target="_blank"><span <?php if($choose_gonglue == 'wenda'): ?>class="zxwdlogodh2"<?php else: ?>class="zxwdlogodh"<?php endif; ?>></span><span <?php if($choose_gonglue == 'wenda'): ?>class="zxwddhms2"<?php else: ?>class="zxwddhms"<?php endif; ?>>在线问答</span></a></div>
                <div class="daohxiugitem" <?php if($choose_gonglue == 'riji'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('QZ_YUMINGWWW');?>/riji/" target="_blank"><span <?php if($choose_gonglue == 'riji'): ?>class="yhrjlogodh2"<?php else: ?>class="yhrjlogodh"<?php endif; ?>></span><span <?php if($choose_gonglue == 'riji'): ?>class="yhrjdhms2"<?php else: ?>class="yhrjdhms"<?php endif; ?>>用户日记</span></a></div>
                <div class="daohxiugitem" <?php if($choose_gonglue == 'hl'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('QZ_YUMINGWWW');?>/hl/" target="_blank"><span <?php if($choose_gonglue == 'hl'): ?>class="kgjrlogodh2"<?php else: ?>class="kgjrlogodh"<?php endif; ?>></span><span <?php if($choose_gonglue == 'hl'): ?>class="kgjrdhms2"<?php else: ?>class="kgjrdhms"<?php endif; ?>>开工吉日</span></a></div>
            </div>
        </div>
        <div class="more-nav">
            <div class="more-nav-main">
                <div class="daohxiugitem" <?php if($choose_more == 'zxbj'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('QZ_YUMINGWWW');?>/zxbj/" target="_blank" rel="nofollow"><span <?php if($choose_more == 'zxbj'): ?>class="fastbjlogodh2"<?php else: ?>class="fastbjlogodh"<?php endif; ?>></span><span <?php if($choose_more == 'zxbj'): ?>class="fastbjdhms2"<?php else: ?>class="fastbjdhms"<?php endif; ?>>8秒报价</span></a></div>
                <div class="daohxiugitem" <?php if($choose_more == 'baozhang'): ?>class="active"<?php endif; ?>><a href="http://<?php echo C('QZ_YUMINGWWW');?>/baozhang.html" target="_blank" rel="nofollow"><span <?php if($choose_more == 'baozhang'): ?>class="fuwubzlogodh2"<?php else: ?>class="fuwubzlogodh"<?php endif; ?>></span><span <?php if($choose_more == 'baozhang'): ?>class="fuwubzdhms2"<?php else: ?>class="fuwubzdhms"<?php endif; ?>>服务保障</span></a></div>
                <div class="daohxiugitem"><a href="http://jiancai.qizuang.com/" target="_blank"><span class="jczxlogodh"></span><span class="jczxdhms">建材资讯</span></a></div>
                <!--<div class="daohxiugitem"><a href="http://jiaju.qizuang.com/" target="_blank"><span class="jjscdh"></span><span class="jjscdhms">家居商城</span></a></div>-->
            </div>
        </div>
    </div>
    <div class="pub-jisuanqi" style="width: 72px;height: 65px;position: absolute;right: 8px;top: 12px;">
        <a href="http://<?php echo C('QZ_YUMINGWWW');?>/zxbj/?source=18013034" target="_blank">
            <img width="72" height="56" src="/assets/common/img/zhinengbaojia.gif" alt="智能报价" />
        </a>
    </div>
</div>
<div class="pub-head-empty"></div>
<script src="/assets/common/js/disclamer.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript">

    $(".search-nav ul li").click(function(event) {
        $(".options em").html($(this).html());
        $(".search-nav input[type=text]").attr("placeholder", $(this).attr("placeholder"));
        var url = $(this).attr("target");
        $(".search-form").attr("action",url);
        $(".search-nav .first-search").html($(this).html()+'<i class="fa fa-sort-asc"></i>').find('i').css('line-height','30px');
    });
    $(".search-nav button").click(function(event) {
        var url = $(".search-form").attr("action");
        var keyword = $(".search-nav input[name=keyword]").val();
        url += "?keyword="+keyword;
        window.open(url);
    });

    $(".pub-head-nav ul li").removeClass('active');
    $(".pub-head-nav ul li").eq("<?php echo ($tabIndex); ?>").addClass('active');

    $(".pub-city").hover(function() {
        $(this).addClass('active');
    }, function() {
        $(this).removeClass('active');
    });

    var timer = null;
    $('.first-search').mouseenter(function() {
        $(this).css('color','#ff5353').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','30px')
        clearTimeout(timer);
        $('.search-nav ul').show();
    });
    $('.first-search').mouseleave(function() {
        timer = setTimeout(function(){
            $('.search-form ul').hide();
            $(this).css('color','#333').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','22px')
        },500);
    });
    $('.search-nav ul').mouseenter(function() {
        $('.first-search').css('color','#ff5353').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','30px')
        clearTimeout(timer);
        $(this).show();
    });
    $('.search-nav ul').mouseleave(function() {
        $('.first-search').css('color','#333').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','22px')
        clearTimeout(timer);
        $(this).hide();
    });

    var timer1 = null;
    var timer2 = null;
    $(".pub-head-nav li").mouseenter(function(event) {
        clearTimeout(timer2);
        clearTimeout(timer1);
        $(this).addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','86px');
        $(this).siblings().removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','77px');
        var pub_text=$(this).data("pub");
        if(pub_text){
            $('.pub-nav-hover').show().attr('state',pub_text);
            $("."+pub_text).show();
            $("."+pub_text).siblings().hide();
        }else{
            $('.pub-nav-hover').hide();
        }
    });

     $(".pub-head-nav li").mouseleave(function(event) {
        var that=$(this);
        timer1 = setTimeout(function(){
            that.removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','77px');
            $('.pub-nav-hover').hide().removeAttr('state');
            $(".zxgl-nav , .zxmt-nav, .more-nav").hide();
            clearTimeout(timer1);
        },500);
    });

    $('.pub-nav-hover').mouseenter(function() {
        clearTimeout(timer1);
        clearTimeout(timer2);
        $(this).show();
        if($(this).attr('state') == 'zxmt-nav'){
            $('.nav-list-meitu').addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','86px');
            $('.nav-list-gonglue').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','77px');
            $('.nav-list-more').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','77px');
            $(this).find('.zxmt-nav').show().siblings().hide();
        }else if($(this).attr('state') == 'zxgl-nav'){
            $('.nav-list-gonglue').addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','86px');
            $('.nav-list-meitu').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','77px');
            $('.nav-list-more').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','77px');
            $(this).find('.zxgl-nav').show().siblings().hide();
        }else if($(this).attr('state') == 'more-nav'){
            $('.nav-list-more').addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','86px');
            $('.nav-list-meitu').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','77px');
            $('.nav-list-gonglue').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','77px');
            $(this).find('.more-nav').show().siblings().hide();
        }
    });
    $('.pub-nav-hover').mouseleave(function() {
        var that=$(this);

        timer2=setTimeout(function(){
            that.removeAttr('state');
        $('.nav-list-meitu,.nav-list-gonglue,.nav-list-more').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','77px');
            that.hide().children().hide();
        },500);
    });

    $('.pub-nav .nav li').hover(function() {
        $(this).find('a i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','86px');
    }, function() {
        $(this).find('a i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','77px');
    });
    $(window).scroll(function(){
        var scrollTop = $(document).scrollTop();
        if($('.header-top-img').length>0){
            if(scrollTop>106){
                $('.pub-head-box').addClass('fixed_top');
                $('.pub-head-empty').show();
            }else{
                $('.pub-head-box').removeClass('fixed_top');
                $('.pub-head-empty').hide();
            }
        }else{
            if(scrollTop>36){
                $('.pub-head-box').addClass('fixed_top');
                $('.pub-head-empty').show();
            }else{
                $('.pub-head-box').removeClass('fixed_top');
                $('.pub-head-empty').hide();
            }
        }
    });

    // 搜索框模块切换
    $('.search-box').on('click',function(){
        $('.pub-head-nav').stop().animate({width: 0}, 250,function(){
            $('.pub-head-nav').hide();
            $('.pub-search').show();
        });

    });
    // 关闭搜索框模块
    $('.search-close').on('click',function() {
        $('.pub-search').hide();
        $('.pub-head-nav').show().stop().animate({width: 754}, 250)
    });

    // 关闭顶图
    $('.top-close').on('click',function(){
        $('.header-top-img').stop().animate({height: 0}, 300,function(){
            $('.header-top-img').remove();
        });
    });
    var timer2 = null;
    if($('.header-top-img')){
        // 点击关闭
        $('.top-close').on('click',function(){
            clearTimeout(timer2);
            $('.header-top-img').stop().animate({height: 0}, 300,function(){
                $('.header-top-img').remove();
            });
        });
        // 6秒后关闭顶图
        timer2 = setTimeout(function(){
            $('.header-top-img').stop().animate({height: 0}, 300,function(){
                $('.header-top-img').remove();
                clearTimeout(timer2);
            });
        },5700);
    }
</script>

<div class="zxbanner">
    <div class="fadankz">
        <div class="fuwumskz">
            <div class="fuwumskz_zhuti">报名享受高品质装修服务</div>
            <div class="fuwumskz_futi">今日还剩<span><?php echo S('Sbu:Company:TopNum');?>个</span>名额</div>
        </div>
        <span class="wenben">
            <select id="tab-cs" class="citycs">
            </select>
        </span>
        <span class="wenben">
            <select id="tab-qx" class="areadiqu">
            </select>
        </span>
        <span class="wenben">
            <input class="chenghu" name="a_name" type="text" placeholder="怎么称呼您">
        </span>
        <span class="wenben">
            <input class="shoujihao" name="a_tel" type="text" placeholder="请输入手机号码获取结果" maxlength="11">
        </span>
        <span class="baoming">立即报名</span>
    </div>
</div>

<div class="g-msg">
                <div class="msg msg1">
                    <img data-src="http://<?php echo C('QINIU_DOMAIN');?>/desLogo/201705/boy01.jpg" src="http://<?php echo C('QINIU_DOMAIN');?>/desLogo/201705/boy01.jpg">
                    <span>来自南宁的陈先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;1秒前</span>
                </div>
</div>

<div class="wrap ofw">
    <div class="new-bread">
        <a href="/"><?php echo ($cityinfo["name"]); ?>装修</a> >
        <a href="/company/"><?php echo ($cityinfo["name"]); ?>装修公司</a> <?php if(!empty($breadcheck)): ?>><?php endif; ?>
        <?php if(!empty($breadcheck["city"])): ?><a  class="keyword" href="<?php echo ($companyInfo['city'][0][url]); ?>/" rel="nofollow" ><?php echo ($breadcheck["city"]["name"]); ?><i>x</i></a><?php endif; ?>
        <?php if(!empty($breadcheck["guimo"])): ?><a  class="keyword" href="<?php echo ($companyInfo['guimo'][0][url]); ?>/" rel="nofollow" ><?php echo ($breadcheck["guimo"]["name"]); ?><i>x</i></a><?php endif; ?>
        <?php if(!empty($breadcheck["baozhang"])): ?><a  class="keyword" href="<?php echo ($companyInfo['baozhang'][0][url]); ?>/" rel="nofollow" ><?php echo ($breadcheck["baozhang"]["name"]); ?><i>x</i></a><?php endif; ?>
    </div>

    <div class="new-box-l">
        <div class="conpany_xuanz">
            <dl class="fuwuquy">
                <dt><span>服务区域：</span></dt>
                <?php if(is_array($companyInfo["city"])): $i = 0; $__LIST__ = $companyInfo["city"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><dd>
                        <?php if(($vo["name"]) == "不限"): if($vo['checked']): ?><a title="<?php echo ($vo["name"]); ?>" rel="nofollow" class="xuanzcolor" href="<?php echo ($vo["url"]); ?>/" ><?php echo ($vo["name"]); ?></a>
                                <?php else: ?>
                                <a title="<?php echo ($vo["name"]); ?>" rel="nofollow" href="<?php echo ($vo["url"]); ?>/"><?php echo ($vo["name"]); ?></a><?php endif; ?>
                            <?php else: ?>
                            <?php if($vo['checked']): ?><a title="<?php echo ($vo["name"]); ?>" class="xuanzcolor" href="<?php echo ($vo["url"]); ?>/" ><?php echo ($vo["name"]); ?></a>
                                <?php else: ?>
                                <a title="<?php echo ($vo["name"]); ?>" href="<?php echo ($vo["url"]); ?>/"><?php echo ($vo["name"]); ?></a><?php endif; endif; ?>
                    </dd><?php endforeach; endif; else: echo "" ;endif; ?>
            </dl>
            <dl class="conpanygm">
                <dt><span>公司规模：</span></dt>
                <?php if(is_array($companyInfo["guimo"])): $i = 0; $__LIST__ = $companyInfo["guimo"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><dd>
                        <?php if(($vo["name"]) == "不限"): if($vo['checked']): ?><a title="<?php echo ($vo["name"]); ?>" rel="nofollow" class="xuanzcolor" href="<?php echo ($vo["url"]); ?>/"><?php echo ($vo["name"]); ?></a>
                                <?php else: ?>
                                <a title="<?php echo ($vo["name"]); ?>" rel="nofollow" href="<?php echo ($vo["url"]); ?>/"><?php echo ($vo["name"]); ?></a><?php endif; ?>
                            <?php else: ?>
                            <?php if($vo['checked']): ?><a title="<?php echo ($vo["name"]); ?>" class="xuanzcolor" href="<?php echo ($vo["url"]); ?>/"><?php echo ($vo["name"]); ?></a>
                                <?php else: ?>
                                <a title="<?php echo ($vo["name"]); ?>" href="<?php echo ($vo["url"]); ?>/"><?php echo ($vo["name"]); ?></a><?php endif; endif; ?>
                    </dd><?php endforeach; endif; else: echo "" ;endif; ?>
            </dl>
            <dl class="fuwubaoz">
                <dt><span>服务保障：</span></dt>
                <?php if(is_array($companyInfo["baozhang"])): $i = 0; $__LIST__ = $companyInfo["baozhang"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><dd>
                        <?php if(($vo["name"]) == "不限"): if($vo['checked']): ?><a title="<?php echo ($vo["name"]); ?>" rel="nofollow" class="xuanzcolor" href="<?php echo ($vo["url"]); ?>/" ><?php echo ($vo["name"]); ?></a>
                                <?php else: ?>
                                <a title="<?php echo ($vo["name"]); ?>" rel="nofollow" href="<?php echo ($vo["url"]); ?>/"><?php echo ($vo["name"]); ?></a><?php endif; ?>
                            <?php else: ?>
                            <?php if($vo['checked']): ?><a title="<?php echo ($vo["name"]); ?>" rel="nofollow"  class="xuanzcolor" href="<?php echo ($vo["url"]); ?>/" ><?php echo ($vo["name"]); ?></a>
                                <?php else: ?>
                                <a title="<?php echo ($vo["name"]); ?>" rel="nofollow"  href="<?php echo ($vo["url"]); ?>/"><?php echo ($vo["name"]); ?></a><?php endif; endif; ?>
                    </dd><?php endforeach; endif; else: echo "" ;endif; ?>
            </dl>
        </div>

    <div class="listxz_title">
        <ul>
            <li><a class="<?php echo ($orderby[5]['active']); ?>" href="<?php echo ($orderby[5]['url']); ?>">综合实力</a></li>
            <li><a class="<?php echo ($orderby[1]['active']); ?>" href="<?php echo ($orderby[1]['url']); ?>">口碑</a></li>
            <li><a class="<?php echo ($orderby[6]['active']); ?>" href="<?php echo ($orderby[6]['url']); ?>">最新量房榜</a></li>
            <li><a class="<?php echo ($orderby[7]['active']); ?>" href="<?php echo ($orderby[7]['url']); ?>">最新签单榜</a></li>
        </ul>
        <div class="sort_right">
            <label class="labelkz">
                <span class="yiselect"></span>
                <span class="noselect"></span>
                <input type="checkbox" onclick="window.location.href='<?php echo ($companyInfo["saleUrl"]); ?>'"><span class="huizi">惠</span>
            </label>
        </div>
    </div>
    <ul class="gongslist">
        <?php if(is_array($companyInfo["companyList"])): $i = 0; $__LIST__ = $companyInfo["companyList"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
            <div class="contentop">
                <div class="tuplj">
                      <div class="bjtupian">
                          <img  src="<?php echo ($vo['logo']); ?>" >
                      </div>
                        <div class="dizhiad" ><span class="address_logo"></span><?php echo ($vo["cityname"]); echo ($vo["area_name"]); ?></div>
                </div>
                <div class="gongsjskz">
                    <div class="company_tituw f0">
                        <a class="company-link" href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($vo["id"]); ?>/" target="_blank" title="<?php echo ($vo["qc"]); ?>">
                            <span title="<?php echo ($vo["qc"]); ?>"><?php echo (mbstr($vo["qc"],0,16)); ?></span>
                        </a>
                        <span class="rel">
                            <img src="/assets/sub/company/img/yingyezz.png" alt="" class="license mr10">
                            <span class="cert-desc">营业执照已审核</span>
                            <span class="ieShadow"></span>
                        </span>
                        <span class="rel">
                            <img src="/assets/sub/company/img/zizhi.png" alt="" class="license">
                            <span class="cert-desc">具备装修资质</span>
                            <span class="ieShadow"></span>
                        </span>
                    </div>
                    <?php if($vo['star'] != 1): ?><div class="company_Grade">

                        <?php if($_GET['orderby']!= 'liangfang' AND $_GET['orderby']!= 'qiandan'): $__FOR_START_17904__=0;$__FOR_END_17904__=$vo["star"];for($i=$__FOR_START_17904__;$i < $__FOR_END_17904__;$i+=1){ ?><span class="xingxing"></span><?php } ?>

                            <span class="ping_number">
                                 <?php if(isset($vo["haopinglv"])): if($vo['haopinglv'] != 0): ?>好评率:<span><?php echo (round($vo["haopinglv"],2)); ?>%</span><?php endif; endif; ?>
                                <?php if(isset($vo["ping_num"])): if($vo['ping_num'] != 0): ?><span class="dianping">已有<span class="dianpingshu"><?php echo ($vo['ping_num']); ?></span>位业主点评</span><?php endif; endif; ?>
                            </span><?php endif; ?>


                    </div><?php endif; ?>
                    <?php if($_GET['orderby']!= 'star'): ?><div class="anliteam">
                            <?php if(!empty($vo["case_count"])): ?><span class="anliteam_anli">案例数</span>
                                <span class="anliteam_anlinum"><?php echo ((isset($vo["case_count"]) && ($vo["case_count"] !== ""))?($vo["case_count"]):0); ?>套</span><?php endif; ?>

                            <?php if(!empty($vo["team_count"])): ?><span class="anliteam_sheji">设计师</span>
                                <span class="anliteam_shejinum"><?php echo ((isset($vo["team_count"]) && ($vo["team_count"] !== ""))?($vo["team_count"]):0); ?>位</span><?php endif; ?>


                            <?php if($_GET['orderby']!= 'liangfang'): if(!empty($vo["team_num"])): ?><span class="anliteam_shigong">在建工地</span>
                                    <span><?php echo ((isset($vo["team_num"]) && ($vo["team_num"] !== ""))?($vo["team_num"]):0); ?>家</span><?php endif; endif; ?>

                        </div>
                        <?php else: ?>
                        <?php if(isset($vo["order_fenshu"])): if($vo['order_fenshu'] != 0): ?><span class="anliteam_anli">口碑值:<span class="koubeival">
                                    <?php if(($vo['on'] == 2) AND ($vo['fake'] == 0) ): echo $vo["koubei"]*10;?>
                                        <?php else: ?>
                                        <?php echo $vo["koubei"]; endif; ?>
                                </span></span><?php endif; endif; endif; ?>

                    <?php if($_GET['orderby']== 'liangfang'): if(!empty($vo["lf_time"])): ?><div class="anliteam_anli">最新量房小区:<?php echo ($vo["lf_xiaoqu"]); ?>  <?php echo ($vo["lf_time"]); ?></div><?php endif; endif; ?>

                    <?php if($_GET['orderby']== 'qiandan'): if(!empty($vo["show_time"])): ?><div class="anliteam_anli">最新签单小区:<?php echo ($vo["show_xiaoqu"]); ?>  <?php echo ($vo["show_time"]); ?></div><?php endif; endif; ?>


                </div>
                <div class="gongsms_right">
                    <span class="yuyue_niu" data-id="<?php echo ($vo["id"]); ?>" data-count="<?php echo ($vo["yuyue_num"]); ?>">免费预约</span>
                    <div class="yuyue_number">今日已<span><?php echo ($vo["yuyue_num"]); ?>人</span>成功预约</div>
                </div>
                <div class="qingchufd"></div>

                <?php if($vo['on'] == 2 AND $vo['fake'] == 0 AND $vo['active_id'] != null): ?><div class="discount">
                    <span class="discount_hui">惠</span>
                    <a rel="nofollow" href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_event/<?php echo ($vo["id"]); ?>/" target="_blank" title="<?php echo ($vo["active_title"]); ?>">
                        <span class="discount_ms"><?php echo ($vo["active_title"]); ?></span>
                    </a>
                </div><?php endif; ?>

                <?php if($vo['new_comment'] != ''): ?><a target="_blank" rel="nofollow"  href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_message/<?php echo ($vo["id"]); ?>/" class="gongs_comment" title="<?php echo ($vo["new_comment"]); ?>">用户说：<?php echo (mbstr($vo["new_comment"],0,50)); ?></a><?php endif; ?>
            </div>
        </li><?php endforeach; endif; else: echo "" ;endif; ?>
    </ul>
    <div class="pagebox">
        <?php echo ($companyInfo["page"]); ?>
    </div>
  </div>
    <div class="new-box-r">
        <div class="bj-form">
            <div class="bj-content">
                <p class="bj-free-title">算算家里装修要花多少钱</p>
                <p class="jisuan_fubt">8秒即可算出</p>
                <div class="bj-box">
                      <div class="input-select jisuanjg">
                          <span class="shuzi">123456</span>
                          <span class="danweiyuan">元</span>
                      </div>
                      <div class="input-select">
                        <select id="b_cs" class="freesj_cs" name="cs"></select>
                        <select id="b_qy" class="freesj_qy" name="qx"></select>
                    </div>
                      <div class="input-select bord">
                        <input type="text" placeholder="请输入您的房屋面积" name="mianji">
                        <i class="pingfang">m²</i>
                    </div>
                    <div class="input-select bord">
                        <input type="text" placeholder="输入手机号获取计算结果" name="tel" maxlength="11">
                    </div>
                    <!--S-免责申明-->
                     <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                    <!--E-免责申明-->
                    <div class="input-select">
                        <a class="right-now-btn" href="javascript:;">立即计算</a>
                    </div>
                </div>
            </div>
        </div>


            <div class="jisuanjieguo" style="display:none;">
                <div class="kuangzi">
                    <div class="zxjgy">您的装修预算为：</div>
                    <div class="zxjgy2"><span id="total-price">6.8</span>万元</div>
                    <div class="xiangxisj">
                        <div class="xiangxisj_biaod"><span class="lf">客厅</span><span class="rt"><span id="kt-price"></span><span>元</span></span></div>
                        <div class="xiangxisj_biaod"><span class="lf">卧室</span><span class="rt"><span id="zw-price"></span><span>元</span></span></div>
                        <div class="xiangxisj_biaod"><span class="lf">厨房</span><span class="rt"><span id="cf-price"></span><span>元</span></span></div>
                        <div class="xiangxisj_biaod"><span class="lf">卫生间</span><span class="rt"><span id="wsj-price"></span><span>元</span></span></div>
                        <div class="xiangxisj_biaod"><span class="lf">水电</span><span class="rt"><span id="sd-price"></span><span>元</span></span></div>
                        <div class="xiangxisj_biaod otherxian"><span class="lf">其它</span><span class="rt"><span id="other-price"></span><span>元</span></span></div>
                    </div>
                </div>
                <div class="shuom"><span>*</span>因材料品牌及工程量不同,具体的价格由实际工程为准;稍后齐装网客服会给您提供更多的报价详情</div>
            </div>

            <div class="zhuagnx_process homeowner-order-container">
                <div class="zxtitle">服务状态</div>
                <div class="homeowner-scroll box">
                    <ul class="homeowner-order list">
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>陈先生</i>已签约</span><span class="date"><?php echo rand(1,7) ?>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>马女士</i>家已量房</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>朱先生</i>家已量房</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>李先生</i>家已量房</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>赵先生</i>已签约</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>李小姐</i>家已量房</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>曹小姐</i>家已量房</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>吴先生</i>已签约</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>钱小姐</i>已签约</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>冯小姐</i>家已量房</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>杨先生</i>家已量房</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>周女士</i>已签约</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>王先生</i>已签约</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>吴先生</i>已签约</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                        <li><span class="info"><?php echo ($cityinfo["name"]); ?>的<i>冒小姐</i>家已量房</span><span class="date"><?php echo rand(1,7) ?>天前</span>天前</span>
                        </li>
                    </ul>
                </div>
            </div>


            <div class="zhuagnx_process">
                <div class="zxtitle">装修流程</div>
                <ul>
                    <li class="lixian company_saixuan">
                        <a href="http://www.qizuang.com/gonglue/gongsi/" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen01"></span>
                            <span class="gonggms gonggms01">1筛选公司</span>
                        </a>
                    </li>
                    <li class="company_huxing">
                        <a href="http://www.qizuang.com/gonglue/shejiyusuan/" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen02"></span>
                            <span class="gonggms gonggms02">2户型设计</span>
                        </a>
                    </li>
                    <li class="lixian company_yusuan">
                        <a href="http://www.qizuang.com/gonglue/shejiyusuan/" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen03"></span>
                            <span class="gonggms gonggms03">3估测预算</span>
                        </a>
                    </li>
                    <li class="company_hetong">
                        <a href="http://www.qizuang.com/baike/hetong/" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen04"></span>
                            <span class="gonggms gonggms04">4签订合同</span>
                        </a>
                    </li>
                    <li class="lixian company_caigai">
                        <a href="http://www.qizuang.com/gonglue/chagai/" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen05"></span>
                            <span class="gonggms gonggms05">5房屋拆改</span>
                        </a>
                    </li>
                    <li class="company_shuidian">
                        <a href="http://www.qizuang.com/gonglue/shuidian/" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen06"></span>
                            <span class="gonggms gonggms06">6水电改造</span>
                        </a>
                    </li>
                    <li class="lixian company_fangshui">
                        <a href="http://www.qizuang.com/gonglue/fangshui/" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen07"></span>
                            <span class="gonggms gonggms07">7防水处理</span>
                        </a>
                    </li>
                    <li class="company_niwa">
                        <a href="http://www.qizuang.com/gonglue/niwa/" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen08"></span>
                            <span class="gonggms gonggms08">8泥瓦工程</span>
                        </a>
                    </li>
                    <li class="lixian company_tumu">
                        <a href="http://www.qizuang.com/gonglue/mugong/" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen09"></span>
                            <span class="gonggms gonggms09">9木工工程</span>
                        </a>
                    </li>
                    <li class="company_youqi">
                        <a href="http://www.qizuang.com/gonglue/youqi/" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen10"></span>
                            <span class="gonggms gonggms10">10油漆进场</span>
                        </a>
                    </li>
                    <li class="lixian company_ruanzhuang">
                        <a href="http://www.qizuang.com/baike/ruanzhuang/" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen11"></span>
                            <span class="gonggms gonggms11">11软装布置</span>
                        </a>
                    </li>
                    <li class="company_ruzhu">
                        <a href="http://www.qizuang.com/gonglue/jjsh/74353.html" rel="nofollow" target="_blank">
                            <span class="gongbu gs_screen12"></span>
                            <span class="gonggms gonggms12">12入住新屋</span>
                        </a>
                    </li>
                </ul>
            </div>


    </div>

    <!-- 广告 -->
    <?php if(count($info['bigbanner_c']) > 0): ?><div class="wrap mt-20">
            <div class="adbanner2">
                <ul>
                    <?php if(is_array($info["bigbanner_c"])): $i = 0; $__LIST__ = $info["bigbanner_c"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                            <?php if($vo['company_id'] != 0): ?><a rel="nofollow" href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($vo["company_id"]); ?>" target="_blank">
                                    <img src="http://<?php echo OP('QINIU_DOMAIN');?>/<?php echo ($vo["img_url"]); ?>" width="1210" height="110" alt="<?php echo ((isset($vo["company_name"]) && ($vo["company_name"] !== ""))?($vo["company_name"]):'齐装网 - 行业领先的装修平台'); ?>" />
                                </a>
                                <?php else: ?>
                                <?php if($vo['url'] != ''): ?><a rel="nofollow" href="<?php echo ($vo["url"]); ?>" target="_blank">
                                        <img src="http://<?php echo OP('QINIU_DOMAIN');?>/<?php echo ($vo["img_url"]); ?>/" width="1210" height="110" alt="<?php echo ((isset($vo["company_name"]) && ($vo["company_name"] !== ""))?($vo["company_name"]):'齐装网 - 行业领先的装修平台'); ?>" />
                                    </a>
                                    <?php else: ?>
                                    <img src="http://<?php echo OP('QINIU_DOMAIN');?>/<?php echo ($vo["img_url"]); ?>" width="1210" height="110" alt="<?php echo ((isset($vo["company_name"]) && ($vo["company_name"] !== ""))?($vo["company_name"]):'齐装网 - 行业领先的装修平台'); ?>" /><?php endif; endif; ?>
                        </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    <ol>
                        <?php if(is_array($info["bigbanner_b"])): $i = 0; $__LIST__ = $info["bigbanner_b"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li></li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ol>
                </ul>
            </div>
        </div><?php endif; ?>
    <!-- 广告 -->

</div>

<!-- 预约弹窗 -->
   <div class="beijingyiny"></div>
   <div class="appointment">
       <div class="guanbiniu"></div>
       <div class="yuyue_title">填写您的信息</div>
       <div class="waikuangz">
           <span>所在城市：</span>
           <select id="c_cs" class="freesj_cs" name="cs"></select>
           <select id="c_qy" class="freesj_qy" name="qy"></select>
       </div>
       <div class="waikuangz">
           <span>您的称呼：</span>
           <input class="chenghushuru" type="text" name="c_name" placeholder="怎么称呼您">
       </div>
       <div class="waikuangz">
           <span>手机号码：</span>
           <input class="shoujihaoma" type="text" name="c_tel" placeholder="请输入手机号码获取结果" maxlength="11">
       </div>

       <div class="mzyz">
          <!--S-免责申明-->
            <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

          <!--E-免责申明-->
       </div>


       <div class="lijiyuyue">
           <a href="#">立即预约</a>
       </div>
       <div class="zixun">
           点击进行<a href="#" onclick="open_pic_chat()">在线咨询</a>
       </div>
   </div>
<!-- 预约弹窗 -->

<!-- 预约成功弹窗 -->
   <div class="yuyuesuccess">
       <div class="close_gb"></div>
       <div class="success_title"><span></span>预约成功</div>
       <div class="xiaobiaoti">稍后齐装网管家将会致电你，请注意接听来电。</div>
       <div class="enterservice">装修公司将免费上门服务</div>
       <ul class="tuwen">
           <li>
               <img src="/assets/sub/company/img/fuwuliuc01.jpg" alt="">
               <div class="colortiltle">1、免费量房</div>
               <div class="fulcmiaos">测量全屋面积、轴线、外墙尺寸，为后续装修奠定基础</div>
           </li>
           <li>
               <img src="/assets/sub/company/img/mfsj.jpg" alt="">
               <div class="colortiltle">2、免费设计</div>
               <div class="fulcmiaos">根据你的需求改造你的户型，为你进行私人定制</div>
           </li>
           <li class="quxiaobj">
               <img src="/assets/sub/company/img/mfbj.jpg" alt="">
               <div class="colortiltle">3、免费报价</div>
               <div class="fulcmiaos">为你提供详细的预算规划表，帮你轻松了解市场行情</div>
           </li>
       </ul>

   </div>
<!-- 预约成功弹窗 -->

<!-- 报名成功弹窗 -->

    <div class="sign_success">
       <div class="close_gb"></div>
       <div class="success_title"><span></span>报名成功</div>
       <div class="xiaobiaoti">稍后齐装网管家将会致电你，请注意接听来电。</div>
       <div class="enterservice">齐装网业主专享服务</div>
       <ul class="tuwen">
           <li>
               <img src="/assets/sub/company/img/mfsj.jpg" alt="">
               <div class="colortiltle">1、免费设计</div>
               <div class="fulcmiaos">获取4份设计方案，货比四家，选择好了再动手</div>
           </li>
           <li>
               <img src="/assets/sub/company/img/mfbj.jpg" alt="">
               <div class="colortiltle">2、免费报价</div>
               <div class="fulcmiaos">算算装修要花多少钱，快速了解市场行情</div>
           </li>
           <li class="quxiaobj">
               <img src="/assets/sub/company/img/ptbz.jpg" alt="">
               <div class="colortiltle">3、平台保障</div>
               <div class="fulcmiaos">官方管控，价格公开透明，跟踪施工质量</div>
           </li>
       </ul>

   </div>

<!-- 报名成功弹窗 -->

    <!-- 底部弹窗s -->
<div class="jiadakuangz">
<div class="foottc">
    <div class="cter">
        <div class="toubu">
            <div class="tu-box">
                <div class="qzlogo"></div>
                <div class="dbwzjs"></div>
            </div>
            <div class="jiantou01 three-arrow"></div>
        </div>
        <div class="pop-step-1">
            <div class="nrkz">
                <div class="biaodanqu">
                    <div class="btwz">今日已有<span>3692</span>位业主查找了装修公司</div>
                    <ul class="btul">
                        <li>
                            <span>所在城市：</span>
                            <div class="shurudiv">
                                <select id="cs" class="freesj_cs" name="cs"></select>
                                <select id="qy" class="freesj_qy" name="qy"></select>
                            </div>

                        </li>
                        <li>
                            <span>房屋面积：</span>
                            <div class="shurudiv"><input class="mianji" type="text" placeholder="输入您的房屋面积"></div>
                        </li>
                        <li>
                            <span>手机号码：</span>
                            <div class="shurudiv"><input class="shouji" type="text" maxlength="11" placeholder="输入手机号获取推荐结果"></div>
                        </li>
                        <li>
                             <span>小区名称：</span>
                            <div class="shurudiv"><input class="xiaoqu" type="text" placeholder="输入您的小区以便准确匹配"></div>
                        </li>
                    </ul>
                    <div class="bottom_mianze">
                         <!--S-免责申明-->
                         <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                        <!--E-免责申明-->
                     </div>
                </div>
                <div class="tijiao"></div>
                <div class="bjtu"></div>
            </div>
            <div class="pop-close"><img src="/assets/home/company/img/company-pop-close.png"><span>关闭</span></div>
        </div>
        <div class="pop-step-2">
            <div class="nrkz2">
                <div class="rtt">
                    <div class="bt">正在为您挑选优质的装修公司</div>
                    <div class="bt-sm">稍后客服将与您取得联系，注意接听电话哟~</div>
                    <div class="erwma"></div>
                    <div class="wxss">微信扫一扫</div>
                    <div class="sjanli">获取<span>1000套</span>装修设计案例</div>
                </div>
            </div>
            <div class="pop-close"><img src="/assets/home/company/img/company-pop-close.png"><span>关闭</span></div>
        </div>
        <div class="pop-step-3">
             <img src="/assets/home/company/img/step-3.png">
        </div>
    </div>

</div>
</div>

 <!-- 底部弹窗e -->
<?php if($friendLink['hotCity'] || $friendLink['link'] || $friendLink['provinceCity'] || $friendLink['recentCity'] || $friendLink['tags']): ?><div class="friend" id="friend">
    <div class="wrap">
        <div class="tab-nav j-tab-nav-link">
            <?php if($friendLink['tags']): ?><a href="javascript:void(0);">装修效果图</a><?php endif; ?>
            <?php if($friendLink['link']): ?><a href="javascript:void(0);">友情链接</a><?php endif; ?>
            <?php if($friendLink['hotCity']): ?><a href="javascript:void(0);">热门城市</a><?php endif; ?>
            <?php if($friendLink['recentCity']): ?><a href="javascript:void(0);">附近城市</a><?php endif; ?>
            <?php if($friendLink['provinceCity']): ?><a href="javascript:void(0);">同省城市</a><?php endif; ?>
            <?php if($friendLink['recommendCompany']): ?><a href="javascript:void(0);">推荐装修公司</a><?php endif; ?>
        </div>
        <div class="tab-con">
            <div class="j-tab-con-link">
                <?php if($friendLink['tags']): ?><div class="tab-con-item">
                    <?php if(is_array($friendLink["tags"])): $i = 0; $__LIST__ = $friendLink["tags"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li><a href="<?php echo ($vo["link_url"]); ?>" target="_blank"><?php echo ($vo["link_name"]); ?></a></li><?php endforeach; endif; else: echo "" ;endif; ?>
                </div><?php endif; ?>
                <?php if($friendLink['link']): ?><div class="tab-con-item">
                    <?php if(is_array($friendLink["link"])): $i = 0; $__LIST__ = $friendLink["link"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li><a href="<?php echo ($vo["link_url"]); ?>" target="_blank"><?php echo ($vo["link_name"]); ?></a></li><?php endforeach; endif; else: echo "" ;endif; ?>
                </div><?php endif; ?>
                <?php if($friendLink['hotCity']): ?><div class="tab-con-item">
                    <?php if(is_array($friendLink["hotCity"])): $i = 0; $__LIST__ = $friendLink["hotCity"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/" target="_blank"><?php echo ($vo["cname"]); ?>装修</a><?php endforeach; endif; else: echo "" ;endif; ?>
                </div><?php endif; ?>
                <?php if($friendLink['recentCity']): ?><div class="tab-con-item">
                    <?php if(is_array($friendLink["recentCity"])): $i = 0; $__LIST__ = $friendLink["recentCity"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/" target="_blank"><?php echo ($vo["cname"]); ?>装修</a><?php endforeach; endif; else: echo "" ;endif; ?>
                </div><?php endif; ?>
                <?php if($friendLink['provinceCity']): ?><div class="tab-con-item">
                    <?php if(is_array($friendLink["provinceCity"])): $i = 0; $__LIST__ = $friendLink["provinceCity"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company/" target="_blank"><?php echo ($vo["cname"]); ?>装修公司</a><?php endforeach; endif; else: echo "" ;endif; ?>
                </div><?php endif; ?>
                <?php if($friendLink['recommendCompany']): ?><div class="tab-con-item">
                        <?php if(is_array($friendLink["recommendCompany"])): $i = 0; $__LIST__ = $friendLink["recommendCompany"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a href="<?php echo ($vo["url"]); ?>" target="_blank"><?php echo ($vo["name"]); ?></a><?php endforeach; endif; else: echo "" ;endif; ?>
                    </div><?php endif; ?>
            </div>
        </div>
    </div>
</div>
    <script type="text/javascript" src="/assets/home/meitu/js/frendlink.js?v=<?php echo C('STATIC_VERSION');?>"></script><?php endif; ?>
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
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/joinus" target="_blank" rel="nofollow">战略合作</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/kefu/" target="_blank" rel="nofollow">客服中心</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/city/" target="_blank" rel="nofollow">网站导航</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/ruzhu/" target="_blank" rel="nofollow">商家入驻</a></li>
    </ul>
    <p class="foot-disclaimer">免责声明：任何单位或个人认为本网站转载信息涉及版权或有侵权嫌疑等问题的，敬请立即通知，齐装网将在第一时间予以更改或删除。</p>
    <p>齐装网 版权所有Copyright ©<?php echo date("Y");?> Www.QiZuang.Com. All Rights Reserved</p>
    <p>法律顾问：江苏蓝之天律师事务所 徐玲律师 苏ICP备12045334号 </p>
    <p>增值电信业务经营许可证：<a target="_blank" rel="nofollow" href="http://www.miitbeian.gov.cn/"><?php echo OP('QZ_BEIAN_JYX_INFO');?></a></p>
</div>

<?php if($zb_bottom_s): ?><!--伸缩广告-->
<?php echo ($zb_bottom_s); endif; ?>
<?php if($adv_bottom): ?><!--伸缩广告-->
<?php echo ($adv_bottom); endif; ?>

<!-- 客服挂件，回顶按钮开关 0:关闭, 不为0 : 打开 -->
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
                        <img class="weibotup" src="/assets/common/img/weixingongzhao.jpg" alt="齐装网微博" />
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
                //装修小贴士
               setTimeout(function(){
                    $('.fix_nav .moqu_kefu .xiaotiestishi').fadeOut();
                    },5000);
                $('.dianjixts').click(function() {
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
<!-- <?php if($isOpen): ?>-->
 <!--    <script type="text/javascript">
      $(function(){
        $("#s-zxzb").trigger('click');
      });
    </script> -->
<!--<?php endif; ?> -->
<script type="text/javascript">
    $("#s-zxsj").click(function(event) {
      var _this = $(this);
      $.ajax({
                  url: '/dispatcher/',
                  type: 'POST',
                  dataType: 'JSON',
                  data: {
                      type: "sj",
                      source:'158',
                      action: "load"
                  }
      })
      .done(function(data) {
                  if (data.status == 1) {
                      $("body").append(data.data);
                      $(".zb_box_sj").fadeIn(400, function() {
                          $(this).find("input[name=lf-name]").focus();
                      });
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
                source:'159',
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
            }
        });
    });
</script>

<input id="safecode" type="hidden" value="<?php echo ($safecode); ?>" />
<input id="safekey" type="hidden" value="<?php echo ($safekey); ?>" />
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/home/company/js/jquery.luara.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/sub/company/js/rem.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/sub/company/js/jquery.cxscroll.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript">
    var change_cid = ''; //修改的公司id
    var change_cnum = ''; //修改的公司预约人数
    var shen = null,shi = null;
    shen = citys["shen"];
    shi = citys["shi"];

    initCity('<?php echo ($theCityId); ?>');
    function initCity(cityId){
        App.citys.init("#tab-cs", "#tab-qx", shen, shi,cityId);
        App.citys.init("#b_cs", "#b_qy", shen, shi,cityId);
        App.citys.init("#cs", "#qy", shen, shi,cityId);
         App.citys.init("#c_cs", "#c_qy", shen, shi,cityId);
    }
    var cityName = '<?php echo ($cityinfo["name"]); ?>';
    var msgNum=0;


$(".adbanner2").luara({
    width: "1210",
    height: "110",
    interval: 2000,
    selected: "seleted",
    deriction: "top"
});

// function up(){
//     $('.jiantou01').animate({top:20},600,function(){
//         $('.jiantou01').animate({top:41},650,function(){
//             up()
//         })
//     });
// }
// $('.jiantou01').animate({top:41},600,function(){
//     up();
// });
    var closeTc= function(){
        a=false;
        $('.toubu').height('126px')
        $('.three-arrow').removeClass('jiantou02').addClass('jiantou01')
        $('.toubu').find('.tu-box').css({height:86,width:648,'border':'2px solid #fff','margin-top':'7px','margin-left':'0'}).find('.qzlogo').css('margin-top','10px');
        $('.toubu').find('.dbwzjs').css('margin-top','27px');
        $('.foottc').stop().animate({"bottom":"-262px"},500,function(){
            var width = -$('.foottc').width();
            $('.foottc').stop().animate({left: width}, 500 ,function(){
                $('.pop-step-3').stop().animate({left: 0}, 500)
            })
        });
    }

$(document).ready(function() {

    $('.new-box-l .conpany_xuanz .fuwuquy dt').height($('.new-box-l .conpany_xuanz .fuwuquy dt').parent('.new-box-l .conpany_xuanz .fuwuquy').height())
    $('.new-box-l .conpany_xuanz .fuwuquy dt').height($('.new-box-l .conpany_xuanz .fuwuquy dt').parent('.new-box-l .conpany_xuanz .fuwuquy').height())
    $('.new-box-l .conpany_xuanz .conpanygm dt').height($('.new-box-l .conpany_xuanz .conpanygm dt').parent('.new-box-l .conpany_xuanz .conpanygm').height())
    $('.new-box-l .conpany_xuanz .fuwubaoz dt').height($('.new-box-l .conpany_xuanz .fuwubaoz dt').parent('.new-box-l .conpany_xuanz .fuwubaoz').height())
    $('.new-box-l .conpany_xuanz .fuwuquy dd a').click(function(){
        $(this).addClass('xuanzcolor');
        $(this).parent().siblings().children('.new-box-l .conpany_xuanz .fuwuquy dd a').removeClass('xuanzcolor');
    })
    $('.new-box-l .conpany_xuanz .conpanygm dd a').click(function(){
        $(this).addClass('xuanzcolor');
        $(this).parent().siblings().children('.new-box-l .conpany_xuanz .conpanygm dd a').removeClass('xuanzcolor');
    })
    $('.new-box-l .conpany_xuanz .fuwubaoz dd a').click(function(){
        $(this).addClass('xuanzcolor');
        $(this).parent().siblings().children('.new-box-l .conpany_xuanz .fuwubaoz dd a').removeClass('xuanzcolor');
    })

    $('.listxz_title ul li a').click(function(){
        $(this).addClass('xuanzcolor');
        $(this).parent().siblings().children('.listxz_title ul li a').removeClass('xuanzcolor');
    })

    $('.zhuagnx_process ul .company_saixuan').mouseover(function() {
        $('.zhuagnx_process ul .gonggms01').html('公司口碑<br>公司实力')
    });
    $('.zhuagnx_process ul .company_saixuan').mouseout(function() {
        $('.zhuagnx_process ul .gonggms01').html('1筛选公司')
    })
    $('.zhuagnx_process ul .company_huxing').mouseover(function() {
        $('.zhuagnx_process ul .gonggms02').html('设计方案<br>施工方案')
    });
    $('.zhuagnx_process ul .company_huxing').mouseout(function() {
        $('.zhuagnx_process ul .gonggms02').html('2户型设计')
    })
    $('.zhuagnx_process ul .company_yusuan').mouseover(function() {
        $('.zhuagnx_process ul .gonggms03').html('人工、辅材<br>主材、家具等')
    });
    $('.zhuagnx_process ul .company_yusuan').mouseout(function() {
        $('.zhuagnx_process ul .gonggms03').html('3估测预算')
    })
    $('.zhuagnx_process ul .company_hetong').mouseover(function() {
        $('.zhuagnx_process ul .gonggms04').html('装修合同')
    });
    $('.zhuagnx_process ul .company_hetong').mouseout(function() {
        $('.zhuagnx_process ul .gonggms04').html('4签订合同')
    })
    $('.zhuagnx_process ul .company_caigai').mouseover(function() {
        $('.zhuagnx_process ul .gonggms05').html('拆除<br>清理')
    });
    $('.zhuagnx_process ul .company_caigai').mouseout(function() {
        $('.zhuagnx_process ul .gonggms05').html('5房屋拆改')
    })
    $('.zhuagnx_process ul .company_shuidian').mouseover(function() {
        $('.zhuagnx_process ul .gonggms06').html('开槽<br>排设')
    });
    $('.zhuagnx_process ul .company_shuidian').mouseout(function() {
        $('.zhuagnx_process ul .gonggms06').html('6水电改造')
    })
    $('.zhuagnx_process ul .company_fangshui').mouseover(function() {
        $('.zhuagnx_process ul .gonggms07').html('防水处理<br>防水测试')
    });
    $('.zhuagnx_process ul .company_fangshui').mouseout(function() {
        $('.zhuagnx_process ul .gonggms07').html('7防水处理')
    })
    $('.zhuagnx_process ul .company_niwa').mouseover(function() {
        $('.zhuagnx_process ul .gonggms08').html('墙砖、地砖<br>过门石')
    });
    $('.zhuagnx_process ul .company_niwa').mouseout(function() {
        $('.zhuagnx_process ul .gonggms08').html('8泥瓦工程')
    })
    $('.zhuagnx_process ul .company_tumu').mouseover(function() {
        $('.zhuagnx_process ul .gonggms09').html('柜子、地板<br>五金安装')
    });
    $('.zhuagnx_process ul .company_tumu').mouseout(function() {
        $('.zhuagnx_process ul .gonggms09').html('9木工工程')
    })
    $('.zhuagnx_process ul .company_youqi').mouseover(function() {
        $('.zhuagnx_process ul .gonggms10').html('墙、顶面<br>柜面')
    });
    $('.zhuagnx_process ul .company_youqi').mouseout(function() {
        $('.zhuagnx_process ul .gonggms10').html('10油漆进场')
    })
    $('.zhuagnx_process ul .company_ruanzhuang').mouseover(function() {
        $('.zhuagnx_process ul .gonggms11').html('窗帘<br>沙发、床等')
    });
    $('.zhuagnx_process ul .company_ruanzhuang').mouseout(function() {
        $('.zhuagnx_process ul .gonggms11').html('11软装布置')
    })
    $('.zhuagnx_process ul .company_ruzhu').mouseover(function() {
        $('.zhuagnx_process ul .gonggms12').html('生活用品')
    });
    $('.zhuagnx_process ul .company_ruzhu').mouseout(function() {
        $('.zhuagnx_process ul .gonggms12').html('12入住新屋')
    })

    $('.contentop .gongsms_right .yuyue_niu').click(function(){
        change_cid = $(this).attr('data-id');
        change_cnum = $(this).attr('data-count');
        $('.beijingyiny').show();
        $('.appointment').show();
    });

    //装修公司预约关闭
    $('.appointment .guanbiniu').click(function(){
        $('input[name="c_name"]').val('');
        $('input[name="c_tel"]').val('');
        $('.beijingyiny').hide();
        $('.appointment').hide();
    })

    //装修公司预约
    $('.appointment .lijiyuyue').click(function(){
        var name = $('input[name="c_name"]');
        var tel = $('input[name="c_tel"]');
        var qx = $('#c_qy');
        var cs = $('#c_cs');
        if (name.val() == "" || name.val().length == 0) {
            name.focus();
            alert("请输入您的称呼");
            return false;
        } else {
            var reg = new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$");
            if (!reg.test(name.val())) {
                name.focus();
                alert("请输入正确的称呼，只支持中文和英文 ^_^!");
                return false;
            }
        }
        if (qx.val() == "" || cs.val() == "") {
            alert("请选择地区");
            return false;
        }
        if (tel.val() == "" || tel.val().length == 0) {
            tel.focus();
            alert("请输入您的手机号码");
            return false;
        } else {
            var reg = new RegExp("" +
                "^(130|131|132|155|156|185|186|145|176|175" +
                "|139|138|137|136|135|134|147|150|151|152|157|158|159|178|182|183|184|187|188" +
                "|133|153|177|173|180|181|189)[0-9]{8}$");
            if (!tel.val().match(reg)) {
                tel.focus();
                alert("请填写正确的手机号码");
                return false;
            }
        }

        if(!checkDisclamer(".appointment")){
            return false;
        }
        var data = {
            tel:tel.val(),
            cs:cs.val(),
            qx:qx.val(),
            nane:name.val(),
            source: '18031925'
        };
        window.order({
            extra:data,   error:function(){alert("网络发生错误,请稍后重试！");},
            success:function(data, status, xhr){
                if (data.status == 1) {
                    //修改页面对应公司预约人数
                    $.ajax({
                        url: '/company/changePageCases/',
                        type: 'POST',
                        dataType: 'JSON',
                        data: {
                            change_cid: change_cid,
                            change_cnum: change_cnum,
                            location: 'company',
                        }
                    })
                        .done(function (data) {
                            $('.appointment').hide();
                            $('.beijingyiny').show();
                            $('.yuyuesuccess').show();
                        });
                } else {
                    alert(data.info);
                }
            },
            validate:function(item, value, method, info){
                return true;
            }
        });
    });

    $('.yuyuesuccess .close_gb').click(function(){
        location.reload();
        $('.beijingyiny').hide();
        $('.yuyuesuccess').hide();
    });

    $('.sign_success .close_gb').click(function(){
        location.reload();
        $('.beijingyiny').hide();
        $('.sign_success').hide();
    })

    //顶部报名
    $('.fadankz .baoming').click(function(){
        var name = $('input[name="a_name"]');
        var tel = $('input[name="a_tel"]');
        var qx = $('#tab-qx');
        var cs = $('#tab-cs');
        if (name.val() == "" || name.val().length == 0) {
            name.focus();
            alert("请输入您的称呼");
            return false;
        } else {
            var reg = new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$");
            if (!reg.test(name.val())) {
                name.focus();
                alert("请输入正确的称呼，只支持中文和英文 ^_^!");
                return false;
            }
        }
        if (qx.val() == "" || cs.val() == "") {
            alert("请选择地区");
            return false;
        }
        if (tel.val() == "" || tel.val().length == 0) {
            tel.focus();
            alert("请输入您的手机号码");
            return false;
        } else {
            var reg = new RegExp("" +
                "^(130|131|132|155|156|185|186|145|176|175" +
                "|139|138|137|136|135|134|147|150|151|152|157|158|159|178|182|183|184|187|188" +
                "|133|153|177|173|180|181|189)[0-9]{8}$");
            if (!tel.val().match(reg)) {
                tel.focus();
                alert("请填写正确的手机号码");
                return false;
            }
        }

        var data = {
            tel:tel.val(),
            cs:cs.val(),
            qx:qx.val(),
            nane:name.val(),
            source: '18031910'
        };

        window.order({
            extra:data,   error:function(){alert("网络发生错误,请稍后重试！");},
            success:function(data, status, xhr){
                if (data.status == 1) {
                    //修改页面对应公司预约人数
                    $.ajax({
                        url: '/company/changePageCases/',
                        type: 'POST',
                        dataType: 'JSON',
                        data: {
                            location: 'top',
                        }
                    })
                        .done(function (data) {
                            $('.beijingyiny').show();
                            $('.sign_success').show();
                        })
                }else{
                    alert("发生错误,请稍后重试！");
                }
            },
            validate:function(item, value, method, info){
                return true;
            }
        });
    });

    //优惠选中效果
    if('<?php echo ($issale); ?>' == 1){
        $('.listxz_title .sort_right .noselect').show();
    }else {
        $('.listxz_title .sort_right .noselect').hide();
    }

    var a=false;
    $('.toubu').click(function(){
        $(this).animate({top:0},550,function(){
            up();
        });
        if(a==false){
            $('.foottc').stop().animate({"bottom":"0"},500);
            $('.toubu').height('105px')
            $(this).find('.tu-box').css({'border':'none','height':100,width:652,'margin-top':'5px','margin-left':'2px'}).find('.qzlogo').css('margin-top','16px');
            $(this).find('.dbwzjs').css('margin-top','31px');
            $('.jiantou01').removeClass('jiantou01').addClass('jiantou02').stop();
            $('.jiantou02').css('top','30px')
            a=true;
       }else{
            $('.foottc').stop().animate({"bottom":"-262px"},500);
            $('.toubu').height('126px')
            $(this).find('.tu-box').css({height:86,width:648,'border':'2px solid #fff','margin-top':'7px','margin-left':'0'}).find('.qzlogo').css('margin-top','10px');
            $(this).find('.dbwzjs').css('margin-top','27px');
            $('.jiantou02').removeClass('jiantou02').addClass('jiantou01')
            a=false;
       }
    });

    $('.foottc .cter .pop-close').on('click',function(){
        closeTc();
    });
    $('.foottc .cter .pop-step-3').on('click',function(){
        $(this).stop().animate({left: '-194px'}, 500, function(){
            $('.foottc').stop().animate({left:0}, 500);
            up();
        })
    })
    var yici=false;
    $(window).scroll(function(event) {

        if($(window).scrollTop() >= 1000 && yici==false){
            $('.foottc').stop().animate({"bottom":"0"},500);
            $('.toubu').find('.tu-box').css({'border':'none','width':652,height:100,'margin-top':'17px','margin-left':'2px'});
            $('.jiantou01').removeClass('jiantou01').addClass('jiantou02')
            yici=true;
            a=true;
        }
        if( $(window).scrollTop()<1000){
            $('.foottc').stop().animate({"bottom":"-262"},500);
            $('.toubu').find('.tu-box').css({'border':'2px solid #fff','width':648,height:86,'margin-top':'7px','margin-left':'0px'});
            $('.jiantou02').removeClass('jiantou02').addClass('jiantou01')
            yici=false;
            a=false;
        }
    });

    $(".tijiao").click(function(event) {

        var cs_name=$('.btul .freesj_cs option:selected').text();
        var qy_name=$('.btul .freesj_qy option:selected').text();
        var cs = $('.freesj_cs');
        if (cs.val() == '') {
            alert("您还没有选择所在城市噢 ^_^!");
            cs.focus();
            return false;
        }

        var qy = $('.freesj_qy');
        if (qy.val() == '') {
            alert("您还没有选择所在区域噢 ^_^!");
            qy.focus();
            return false;
        }

        var mianji = $('.mianji');
        if (mianji.val() == "") {
            mianji.focus();
            alert("请输入房屋面积");
            return false;
        }
        var re = /^[0-9]+(.[0-9]{1,2})?$/gi;
        if (!re.test(mianji.val()) || mianji.val()>10000 || mianji.val()<1) {
            mianji.focus();
            alert("请输入1-10000的数字");
            return false;
        }

        var tel = $('.shouji');
        if (tel.val() == "" || tel.val().length == 0) {
            tel.focus();
            alert("请填写您的手机号");
            return false;
        } else {
            var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
            if (!tel.val().match(reg)) {
                tel.focus();
                alert("手机号错误");
                return false;
            }
        }
        var xiaoqu = $('.xiaoqu');
        if (xiaoqu.val() == "") {
            xiaoqu.focus();
            alert("请输入小区名称");
            return false;
        }else if(!isNaN(Number(xiaoqu.val()))){
            xiaoqu.focus();
            alert("小区名称不可为纯数字");
            return false;
        }
        if(!checkDisclamer(".jiadakuangz")){
            return false;
        }
        var comid = $("#companyid").val();

        var data = {
            mianji:mianji.val(),
            xiaoqu:xiaoqu.val(),
            tel:tel.val(),
            cs:cs.val(),
            qx:qy.val(),
            source: '188',
            fb_type: 'sheji'
        };

        window.order({
            extra:data,   error:function(){alert("网络发生错误,请稍后重试！");},
            success:function(data, status, xhr){
                if (data.status == 1) {
                    var pattern_char = /[a-zA-Z]/g;
                    cs_name = $.trim(cs_name.replace(pattern_char,''));
                    $("#cs_val").text(cs_name+qy_name);
                    $("#mj_val").text(mianji.val());
                    $("#xq_val").text(xiaoqu.val());
                    $('.pop-step-1').hide();
                    $('.pop-step-2').show();
                }else{
                    alert("发生错误,请稍后重试！");
                }
            },
            validate:function(item, value, method, info){
                return true;
            }
        });
        return false;


    });
    var flag=false;
    setInterval(function(){
        var aa=parseInt(Math.random() * 90000+ 30000);
        $('.jisuanjg .shuzi').html(aa);
    },300)

    //右侧计算器
    $(".right-now-btn").click(function(event) {
        var disclamer =$(".bj-form  .disclamer-check").attr("data-checked");
        var _this = $(this).parent().parent();
        var cs = $(".b_cs");
        var qy = $(".b_qy");
        if (cs.val() == '') {
            alert("您还没有选择所在城市噢 ^_^!");
            cs.focus();
            return false;
        }

        var mianji = _this.find("input[name=mianji]");
        var tel = _this.find("input[name=tel]");
        if (mianji.val() == "") {
            mianji.focus();
            alert("请输入您的房屋面积");
            return false;
        }
        if(isNaN(mianji.val())){
            mianji.focus();
            alert("请输入正确的房屋面积");
            return false;
        }

        if (tel.val() == "" || tel.val().length == 0) {
            tel.focus();
            alert("请输入您的手机号码");
            return false;
        } else {
            var reg = new RegExp("" +
                "^(130|131|132|155|156|185|186|145|176|175" +
                "|139|138|137|136|135|134|147|150|151|152|157|158|159|178|182|183|184|187|188" +
                "|133|153|177|173|180|181|189)[0-9]{8}$");
            if (!tel.val().match(reg)) {
                tel.focus();
                alert("请填写正确的手机号码");
                return false;
            }
        }
        if(disclamer=="false"){
            alert("请勾选我已阅读并同意齐装网的《免责申明》！");
            return false;
        }

        var data = {
            mianji:mianji.val(),
            tel:tel.val(),
            cs:cs.val(),
            qx:qy.val(),
            source: '18031916',
            fb_type:'baojia',
        };

        window.order({
            extra : data,
            error:function(){alert("网络发生错误,请稍后重试！");},
            success:function(data, status, xhr){
                if (data.status == 1) {
                    if (data.status == 1) {
                        $.ajax({
                            url: '/zxbj/getdetailsbyajax/',
                            type: 'GET',
                            dataType: 'JSON'
                        })
                            .done(function (data) {
                                if (data.status == 1) {
                                    calculate(data.data);
                                    $('.bj-form').hide();
                                    $('.jisuanjieguo').show()
                                } else {
                                    alert(data.info);
                                }
                            })
                            .fail(function (xhr) {
                                alert('获取报价失败,请刷新页面');
                            });
                    }
                }else{
                    alert("发生错误,请稍后重试！");
                }
            },
            validate:function(item, value, method, info){
                return true;
            }
        });
        return false;
    });
    // 设计报价滚动到1500px 悬浮
    $(window).scroll(function(event) {
        var fixHeight = 1500;
        if ($('.recom-article').length > 0 ){
            fixHeight = 2100;
        }
        if($(window).scrollTop() >= fixHeight){
            $('.bj-form').css({
                "width":"260px",
                "margin-top":"0",
                "position":"fixed",
                "top":"85px",
                "zIndex":2
            });
        }else{
            $('.bj-form').css({
                "margin-top":"15px",
                "position":"",
                "top":"",
                "zIndex":''
            });
        }
    });

    <?php if(empty($companyInfo["gmstyle"])): ?>$(".comp-chouse-list").css("height","81px");<?php endif; ?>
    $(".comp-chouse-more").click(function(){
        if(flag==false){
            $(this).siblings(".comp-chouse-list").css("height","auto");
            $(this).html("收起"+"<i class='fa fa-angle-up'></i>");
            flag=true;
        }else{
            $(this).siblings(".comp-chouse-list").css("height","81px");
            $(this).html("更多"+"<i class='fa fa-angle-down'></i>");
            flag=false;
        }
    })
});

$(function(){
    if ('<?php echo ($_GET["p"]); ?>') {
        // closeTc()
    }
    $('#city').change(function(){
        var cs = $(this).children('option:selected').val();
        if(cs != ""){
            window.location.href = "/company/?cs=" + cs;
        }
    });

    $(".rtel input[name=name]").focus();

    $(".tiaoj dl dd a").click(function(event) {
        var $id = $(this).attr("data-id");
        var src = "/company/?cs="+$id;
        if("<?php echo ($keyword); ?>" != ""){
            src = src+"&keyword=<?php echo ($keyword); ?>";
        }
        window.location.href=src;
    });

    $(".comp-list-ul .comp-list-button").click(function(event) {
        var cid = $(this).attr("data-id");
        $.ajax({
            url: '/dispatcher/',
            type: 'POST',
            dataType: 'JSON',
            data: {
               type:"sj",
               source:'158',
               action:"load",
               cid:cid
            }
        })
        .done(function(data) {
            if (data.status == 1) {
                $("body").append(data.data);
                $(".zb_box_sj").fadeIn(400,function(){
                    $(this).find("input[name=lf-name]").focus();
                });
            }
        });
    });

    $(".zxfw dd a").click(function(event) {
        $.ajax({
            url: '/dispatcher/',
            type: 'POST',
            dataType: 'JSON',
            data: {
               type:"fb",
               source:'171',
               action:"load",
               cs:"<?php echo ($cityInfo["id"]); ?>"
            }
        })
        .done(function(data) {
            if (data.status == 1) {
                $("body").append(data.data);
                $("input[name='name']").focus();
            }
        });
    });

    $(".keyword").click(function(event) {
        window.location.href ="/company/";
    });

});
function calculate(data) {
    console.log(data.zw);
    $('#kt-price').text(data.kt);
    $('#zw-price').text(data.zw);
    $('#wsj-price').text(data.wsj);
    $('#cf-price').text(data.cf);
    $('#sd-price').text(data.sd);
    $('#other-price').text(data.other);
    $('#total-price').text(data.total / 10000);
}
</script>
<script>
    // 服务状态滚动
    +function($) {
        $('.homeowner-order-container').cxScroll({
            direction: 'bottom',
            time : 2000,
            step:1
        });
    }(jQuery)
    // 设计报价滚动到1500px 悬浮
    $(window).scroll(function(event) {
        if($(window).scrollTop() >= 1820){
            $('.bj-form').css({
                "width":"260px",
                "margin-top":"0",
                "position":"fixed",
                "top":"85px",
                "zIndex":2
            });
        }else{
            $('.bj-form').css({
                "margin-top":"15px",
                "position":"",
                "top":"",
                "zIndex":''
            });
        }
    });
</script>
</body>

</html>