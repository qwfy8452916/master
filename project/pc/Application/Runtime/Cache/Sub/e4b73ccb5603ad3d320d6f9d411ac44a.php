<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <meta name="mobile-agent" content="format=html5;url=http://<?php echo C('MOBILE_DONAMES');?>/<?php echo ($cityInfo["bm"]); ?>/" />
    <title><?php echo ($keys["title"]); ?></title>
    <meta name="keywords" content="<?php echo ($keys["keywords"]); ?>" />
    <meta name="description" content="<?php echo ($keys["description"]); ?>" />
    <meta name="location" content="province=<?php echo ($cityInfo["province"]); ?>;city=<?php echo ($cityInfo["name"]); ?>;coord=<?php echo ($cityInfo["lng"]); ?>,<?php echo ($cityInfo["lat"]); ?>" />
    <link rel="canonical" href="http://<?php echo ($cityInfo["bm"]); ?>.qizuang.com/"/>
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



    <link rel="stylesheet" type="text/css" href="/assets/common/plugin/bxslider/bxslider.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" type="text/css" href="/assets/home/index/css/home_20180709.css?v=<?php echo C('STATIC_VERSION');?>" />
    <link rel="stylesheet" type="text/css" href="<?php echo ($static_host); ?>/assets/sub/company/css/animate.min.css?v=<?php echo C('STATIC_VERSION');?>" />
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

    <div class="play">
        <div class="home-slider">
            <div class="ck-slide">
                <ul class="ck-slide-wrapper">
                    <?php if(is_array($info["lunbo"])): $i = 0; $__LIST__ = $info["lunbo"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($key == 0): ?><li data-value="<?php echo ($vo["value"]); ?>">
                                <a rel="nofollow" href="<?php echo ($vo["url"]); ?>" target="_blank">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_url"]); ?>-w1920h400.jpg" height="400" alt="<?php echo ($vo["title"]); ?>" />
                                </a>
                            </li>
                        <?php else: ?>
                            <li data-value="<?php echo ($vo["value"]); ?>" style="display:none;">
                                <a rel="nofollow" href="<?php echo ($vo["url"]); ?>" target="_blank">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_url"]); ?>-w1920h400.jpg" height="400" alt="<?php echo ($vo["title"]); ?>" />
                                </a>
                            </li><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                </ul>
                <div class="ck-slidebox">
                    <div class="slideWrap">
                        <ul class="dot-wrap">
                            <?php if(is_array($info["lunbo"])): $k = 0; $__LIST__ = $info["lunbo"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($k % 2 );++$k; if($k == 1): ?><li class="current"><i class="fa fa-circle-o"></i></li>
                                    <?php else: ?>
                                    <li><i class="fa fa-circle-o"></i></li><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap">
            <div class="order-box validate">
                <strong class="h1">免费设计与报价</strong>
                <strong class="h2">免费获取<span class="cf53">4</span>套设计方案，装修立省<span class="cf53">30%</span></strong>
                <div class="box-line">
                    <select class="edit-city"></select>
                    <select class="edit-quyu"></select>
                </div>
                <div class="box-line">
                    <input class="edit-text" type="text" name="name" placeholder="怎么称呼您">
                </div>
                <div class="box-line">
                    <input class="edit-text" type="text" name="tel" placeholder="输入手机号获取免费设计与报价" maxlength="11">
                    <input type="hidden" name="fb_type" value="sheji">
                </div>
                <!--S-免责申明-->
                    <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                <!--E-免责申明-->
                <button class="box-line" id="btnSave" type="button">立即申请</button>
                <div class="order-box-tip">
                    <span>今日还剩<i><?php echo releaseCount('fbsyrs');?></i>个免费名额</span><br/>
                    <span>累计帮助过<i><?php echo releaseCount('fbzrs');?></i>位业主</span>
                    <a href="http://<?php echo C('QZ_YUMINGWWW');?>/zxbj/?source=18013029" rel="nofollow">智能报价</a>
                </div>
            </div>
        </div>
    </div>
    <div class="zx-step">
        <div class="wrap">
            <ul>
                <li class="s1">
                    <a href="http://<?php echo C('QZ_YUMINGWWW');?>/zxbj/" target="_blank" rel="nofollow">
                        <div>
                            <span class="img"></span>
                            <span class="text">智能报价</span>
                        </div>
                        <p>8秒获取准确报价</p>
                    </a>
                </li>
                <li class="s2">
                        <a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/sheji/" target="_blank" rel="nofollow">
                        <div >
                            <span class="img"></span>
                            <span class="text">免费设计</span>
                        </div>
                        <p>领取4份设计方案</p>
                    </a>
                </li>
                <li class="s3">
                        <a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/company/" target="_blank" rel="nofollow">
                        <div>
                            <span class="img"></span>
                            <span class="text">找装修公司</span>
                        </div>
                        <p>精选优质装修公司</p>
                    </a>
                </li>
                <li class="s4">
                    <a href="http://<?php echo C('QZ_YUMINGWWW');?>/baozhang.html" target="_blank" rel="nofollow">
                        <div>
                            <span class="img"></span>
                            <span class="text">六大保障</span>
                        </div>
                        <p>轻松装修乐无忧</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <!-- 美图模块 S -->
    <div class="wrap">
        <div class="box">
            <div class="box-tit">
                <div class="tit"><a href="http://<?php echo C('MEITU_DONAMES');?>/" target="_blank">装修效果图</a></div>
                <div class="heng-line"></div>
                <div class="tit-sm"><i class="f-red"><?php echo ($info["caseimgsCount"]); ?>张</i>装修美图任您挑选，帮您找到您喜欢的装修风格</div>
            </div>
            <ul class="box-list-link">
                <?php if(is_array($info["location"])): $i = 0; $__LIST__ = $info["location"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li class="active"><a href="<?php echo ($vo["url"]); ?>"><?php echo ($vo["title"]); ?></a></li><?php endforeach; endif; else: echo "" ;endif; ?>
            </ul>
            <div class="xgt-box">
                <ul class="row-1">
                    <li>
                        <a href="http://<?php echo C('MEITU_DONAMES');?>/3d/" target="_blank">
                            <img src="/assets/home/index/img/meitu-3D.jpg" alt="3D装修效果图" />
                            <span class="for_ie_bg">
                                <div class="three-bg"></div>
                            </span>
                            <div class="big-tit-3d"></div>
                            <i>3D效果图</i>
                        </a>
                    </li>
                </ul>
                <ul class="row-3">
                    <li>
                        <a href="http://<?php echo C('MEITU_DONAMES');?>/list-l0f15h6c0/" target="_blank">
                            <img src="/assets/home/index/img/meitu-jianou.jpg" alt="简欧风格"/>
                            <span class="for_ie_bg">
                                <i>简欧</i>
                                <div class="fengge-info">
                                    <p class="big-tit">简欧风格</p>
                                    <p class="big-tuji">简欧风格三居室设计图集</p>
                                    <p class="big-num">550套</p>
                                </div>
                            </span>
                        </a>
                    </li>
                </ul>
                <ul class="row-2">
                    <li>
                        <a href="http://<?php echo C('MEITU_DONAMES');?>/list-l0f6h6c0/" target="_blank">
                            <img src="/assets/home/index/img/meitu-dizhonghai.jpg" alt="地中海风格" />
                            <span class="for_ie_bg">
                                <i>地中海</i>
                                <div class="fengge-info">
                                    <p class="big-tit">地中海风格</p>
                                    <p class="big-tuji">地中海风格三居室设计图集</p>
                                    <p class="big-num">421套</p>
                                </div>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="http://<?php echo C('MEITU_DONAMES');?>/list-l0f13h5c0/" target="_blank">
                            <img src="/assets/home/index/img/meitu-tianyuan.jpg" alt="田园风格" />
                            <span class="for_ie_bg">
                                <i>田园</i>
                                <div class="fengge-info">
                                    <p class="big-tit">田园风格</p>
                                    <p class="big-tuji">田园风格两居室设计图集</p>
                                    <p class="big-num">398套</p>
                                </div>
                            </span>
                        </a>
                    </li>
                </ul>
                <ul class="row-4">
                    <li>
                        <a href="http://<?php echo C('MEITU_DONAMES');?>/list-l0f7h6c0/" target="_blank">
                            <img src="/assets/home/index/img/meitu-meishi.jpg" alt="美式风格" />
                            <span class="for_ie_bg">
                                <i>美式</i>
                                <div class="fengge-info">
                                    <p class="big-tit">美式风格</p>
                                    <p class="big-tuji">美式风格三居室设计图集</p>
                                    <p class="big-num">632套</p>
                                </div>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="http://<?php echo C('MEITU_DONAMES');?>/list-l0f4h6c0/" target="_blank">
                            <img src="/assets/home/index/img/meitu-zhongshi.jpg" alt="中式风格" />
                            <span class="for_ie_bg">
                                <i>中式</i>
                                <div class="fengge-info">
                                    <p class="big-tit">中式风格</p>
                                    <p class="big-tuji">中式风格三居室设计图集</p>
                                    <p class="big-num">738套</p>
                                </div>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="http://<?php echo C('MEITU_DONAMES');?>/list-l0f10h5c0/" target="_blank">
                            <img src="/assets/home/index/img/meitu-rishi.jpg" alt="日式风格" />
                            <span class="for_ie_bg">
                                <i>日式</i>
                                <div class="fengge-info">
                                    <p class="big-tit">日式风格</p>
                                    <p class="big-tuji">日式风格两居室设计图集</p>
                                    <p class="big-num">256套</p>
                                </div>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="http://<?php echo C('MEITU_DONAMES');?>/list-l0f12h5c0/" target="_blank">
                            <img src="/assets/home/index/img/meitu-jianyue.jpg" alt="简约风格" />
                            <span class="for_ie_bg">
                                <i>简约</i>
                                <div class="fengge-info">
                                    <p class="big-tit">简约风格</p>
                                    <p class="big-tuji">简约风格两居室设计图集</p>
                                    <p class="big-num">1387套</p>
                                </div>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            <a rel="nofollow" class="more" href="http://<?php echo C('MEITU_DONAMES');?>/" target="_blank">查看更多效果图</a>
        </div>
    </div>
    <!-- 美图模块 E -->

    <!-- 广告轮播模块 S -->
    <div class="wrap">
        <div class="newsbanner">
            <ul>
                <?php if(is_array($info["bigbanner_a"])): $i = 0; $__LIST__ = $info["bigbanner_a"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                        <?php if($vo['url'] != ''): ?><a rel="nofollow" href="<?php echo ($vo["url"]); ?>" target="_blank">
                                <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo (addImgExt($vo["img_url"])); ?>" width="1210" height="110" alt="<?php echo ((isset($vo["company_name"]) && ($vo["company_name"] !== ""))?($vo["company_name"]):'装修公司'); ?>" />
                            </a>
                        <?php else: ?>
                            <?php if($vo['company_id'] != 0): ?><a rel="nofollow" href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($vo["company_id"]); ?>/" target="_blank">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo (addImgExt($vo["img_url"])); ?>" width="1210" height="110" alt="<?php echo ((isset($vo["company_name"]) && ($vo["company_name"] !== ""))?($vo["company_name"]):'装修公司'); ?>" />
                                </a>
                            <?php else: ?>
                                <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo (addImgExt($vo["img_url"])); ?>" width="1210" height="110" alt="<?php echo ((isset($vo["company_name"]) && ($vo["company_name"] !== ""))?($vo["company_name"]):'装修公司'); ?>" /><?php endif; endif; ?>
                    </li><?php endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>
    </div>
    <!-- 广告轮播模块 E -->

    <!-- 装修公司模块 S -->
    <div class="wrap ofw">
        <div class="box">
            <div class="box-tit">
                <div class="tit"><a href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company/" target="_blank">装修公司</a></div>
                <div class="heng-line"></div>
                <div class="tit-sm">甄选<i class="f-red">优质装修公司</i>为您提供优质的装修服务</div>
            </div>
            <div class="company-lunbo">
                <div class="company-slider">
                    <?php if(is_array($info["brands"])): $i = 0; $__LIST__ = $info["brands"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><!--判断是否是假会员(假会员图片路径是全的)-->
                        <?php if($vo['img_is_all'] == '1'): ?><div class="slide-item">
                                <div class="company-anli">
                                    <a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($vo["company_id"]); ?>/">
                                        <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ((isset($vo['img']) && ($vo['img'] !== ""))?($vo['img']):'file/20180123/FsmhNCcgLnXA8gVgmUMbK2uwqlSd.jpg'); ?>" alt="<?php echo ($vo['jc']); ?>">
                                    </a>
                                </div>
                                <div class="company-img">
                                    <a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($vo["company_id"]); ?>/"><img src="<?php echo ($vo["logo"]); ?>" alt="<?php echo ($vo['jc']); ?>"></a>
                                </div>
                                <div class="company-info">
                                    <div class="company-name"><?php echo ($vo['jc']); ?></div>
                                    <div class="company-star">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                    <div class="company-ap">
                                        <span>案例数：<i><?php echo ($vo['case_count']); ?></i></span>
                                        <span>评论数：<i><?php echo ($vo['comment_count']); ?></i></span>
                                    </div>
                                    <div class="company-sheji">免费设计</div>
                                </div>
                            </div>
                            <?php else: ?>
                            <div class="slide-item">
                                <div class="company-anli">
                                    <a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($vo["company_id"]); ?>/">
                                       <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ((isset($vo['img']) && ($vo['img'] !== ""))?($vo['img']):'file/20180123/FsmhNCcgLnXA8gVgmUMbK2uwqlSd.jpg'); ?>" alt="<?php echo ($vo['jc']); ?>">
                                    </a>
                                </div>
                                <div class="company-img">
                                    <a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($vo["company_id"]); ?>/"><img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_url"]); ?>" alt="<?php echo ($vo['jc']); ?>"></a>
                                </div>
                                <div class="company-info">
                                    <div class="company-name"><?php echo ($vo['jc']); ?></div>
                                    <div class="company-star">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                    <div class="company-ap">
                                        <span>案例数：<i><?php echo ($vo["case_count"]); ?></i></span>
                                        <span>评论数：<i><?php echo ($vo['comment_count']); ?></i></span>
                                    </div>
                                    <div class="company-sheji">免费设计</div>
                                </div>
                            </div><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                </div>
            </div>
            <a rel="nofollow" class="more" href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company/" target="_blank">查看更多装修公司</a>
        </div>
    </div>
    <!-- 装修公司模块 E -->

     <!-- 装修视频模块 S -->
    <div class="wrap">
        <div class="box">
            <div class="box-tit">
                <div class="tit"><a href="http://<?php echo C('QZ_YUMINGWWW');?>/video/jiangtang/" target="_blank">装修视频</a></div>
                <div class="heng-line"></div>
                <div class="tit-sm">施工<i class="f-red">现场直击</i>，重点细节归纳解析</div>
            </div>
            <div class="video-container ofw">
                <div class="pay-area pull-left">
                    <a href="http://<?php echo C('QZ_YUMINGWWW');?>/video/v453.html" target="_blank">
                        <img src="http://<?php echo C('QINIU_DOMAIN');?>/vedio/20180905/5b8fa7d9da231-w660.jpg" class="cover-img">
                        <img src="/assets/home/index/img/playIcon.png" class="playIcon">
                    </a>
                </div>
                <div class="video-list-box pull-left">
                    <ul>
                        <?php if(is_array($videos)): $i = 0; $__LIST__ = $videos;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vol): $mod = ($i % 2 );++$i;?><li>
                                <div class="video-icon">
                                    <a href="http://<?php echo C('QZ_YUMINGWWW');?>/video/v<?php echo ($vol["id"]); ?>.html" target="_blank">
                                        <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vol["cover_img"]); ?>-w400.jpg" alt="<?php echo ($vol["title"]); ?>">
                                    </a>
                                </div>
                                <div class="video-text">
                                    <h3><a href="http://<?php echo C('QZ_YUMINGWWW');?>/video/v<?php echo ($vol["id"]); ?>.html" target="_blank"><?php echo (mbstr($vol["title"],0,14)); ?></a></h3>
                                    <p><?php echo (mbstr($vol["description"],0, 15)); ?></p>
                                </div>
                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                </div>
            </div>
            <a rel="nofollow" class="more" href="http://<?php echo C('QZ_YUMINGWWW');?>/video/" target="_blank">查看更多装修视频</a>
        </div>
    </div>
    <!-- 装修视频模块 E -->


    <!-- 装修攻略模块 S -->
    <div class="zx-gl">
        <div class="wrap">
            <div class="box">
                <div class="box-tit">
                    <div class="tit"><a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/" target="_blank">装修攻略</a></div>
                    <div class="heng-line"></div>
                    <div class="tit-sm">轻松学习<i class="f-red">装修知识</i>，避免掉入装修陷阱</div>
                </div>
                <div class="gl-list">
                    <ul>
                        <li>
                            <div class="gl-img">
                                <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/lc/" target="_blank">
                                    <img src="assets/home/index/img/gl-liucheng.jpg" alt="装修流程">
                                    <div>装修流程</div>
                                </a>
                            </div>
                            <div class="gl-list-wz">
                                <?php if(is_array($info["liucheng"])): $i = 0; $__LIST__ = $info["liucheng"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="gl-list-item">
                                        <a href="http://www.<?php echo C('QZ_YUMING');?>/gonglue/<?php echo ($vo["shortname"]); ?>/" title="<?php echo ($vo["classname"]); ?>" target="_blank">
                                            <span class="wz-fenlei"><?php echo ($vo["classname"]); ?></span>
                                        </a>
                                            <a title="<?php echo ($vo["title"]); ?>" href="http://www.<?php echo C('QZ_YUMING');?>/gonglue/<?php echo ($vo["shortname"]); ?>/<?php echo ($vo["id"]); ?>.html" target="_blank">
                                        <span class="wz-det"><?php echo ($vo["title"]); ?></span>
                                        </a>
                                    </div><?php endforeach; endif; else: echo "" ;endif; ?>
                                <div class="to-gl"><p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/lc/">GO<i class="go-to"></i></a></p></div>
                            </div>
                        </li>
                        <li>
                            <div class="gl-img">
                                <a href="http://<?php echo C('QZ_YUMINGWWW');?>/wenda/" target="_blank">
                                    <img src="assets/home/index/img/gl-wenda.jpg" alt="装修问答">
                                    <div>装修问答</div>
                                </a>
                            </div>
                            <div class="gl-list-wd">
                                <?php if(is_array($info["wenda"])): $i = 0; $__LIST__ = $info["wenda"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="gl-list-item">
                                        <a title="<?php echo ($vo["title"]); ?>" href="http://<?php echo C('QZ_YUMINGWWW');?>/wenda/x<?php echo ($vo["id"]); ?>.html">
                                            <span class="wz-det"><?php echo ($vo["title"]); ?></span>
                                        </a>
                                        <span class="wz-shijian"><?php echo ($vo["anwsers"]); ?>个回答</span>
                                    </div><?php endforeach; endif; else: echo "" ;endif; ?>
                                <div class="to-gl"><p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/wenda/">GO<i class="go-to"></i></a></p></div>
                            </div>
                        </li>
                        <li>
                            <div class="gl-img">
                                <a href="http://<?php echo C('QZ_YUMINGWWW');?>/baike/" target="_blank">
                                    <img src="assets/home/index/img/gl-baike.jpg" alt="装修百科">
                                    <div>装修百科</div>
                                </a>
                            </div>
                            <div class="gl-list-wz">
                                <?php if(is_array($info["baike"])): $i = 0; $__LIST__ = $info["baike"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="gl-list-item">
                                        <a title="<?php echo ($vo["sub_category"]); ?>" href="http://<?php echo C('QZ_YUMINGWWW');?>/baike/<?php echo ($vo["url"]); ?>/" target="_blank"><span class="wz-fenlei"><?php echo ($vo["sub_category"]); ?></span></a>
                                        <a title="<?php echo ($vo["title"]); ?>" href="http://<?php echo C('QZ_YUMINGWWW');?>/baike/<?php echo ($vo["id"]); ?>.html" target="_blank">
                                            <span class="wz-det"><?php echo ($vo["title"]); ?></span>
                                        </a>
                                    </div><?php endforeach; endif; else: echo "" ;endif; ?>
                                <div class="to-gl"><p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/baike/" target="_blank">GO<i class="go-to"></i></a></p></div>
                            </div>
                        </li>

                        <li>
                            <?php if(count($info['bdzx']) > 0): ?><div class="gl-img">
                                <a href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/zxinfo/" target="_blank">
                                    <img src="assets/home/index/img/gl-riji.jpg" alt="本地资讯">
                                    <div>本地资讯</div>
                                </a>
                            </div>
                            <div class="<!--gl-list-wd --> gl-list-wz">
                                <?php if(is_array($info["bdzx"])): $i = 0; $__LIST__ = $info["bdzx"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="gl-list-item">
                                        <a title="<?php echo ($vo["name"]); ?>" href="<?php if(empty($vo["shortname"])): ?>/zxinfo/<?php else: ?>http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/zxinfo/<?php echo ($vo["shortname"]); ?>/<?php endif; ?>" target="_blank">
                                            <span class="wz-fenlei"><?php if(empty($vo["name"])): ?>本地资讯<?php else: echo ($vo["name"]); endif; ?></span>
                                        </a>
                                        <a title="<?php echo ($vo["title"]); ?>" href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/zxinfo/<?php echo ($vo["id"]); ?>.html" target="_blank">
                                            <span class="wz-det"><?php echo ($vo["title"]); ?></span>
                                        </a>
                                        <!--<span class="wz-shijian"><i class="fa  fa-eye"></i>&nbsp;&nbsp;<?php echo ($vo["pv"]); ?></span>-->
                                    </div><?php endforeach; endif; else: echo "" ;endif; ?>
                                <div class="to-gl"><p><a href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/zxinfo/" target="_blank">GO<i class="go-to"></i></a></p></div>
                            </div>
                            <?php else: ?>
                            <div class="gl-img">
                                <a href="http://<?php echo C('QZ_YUMINGWWW');?>/riji/" target="_blank">
                                    <img src="assets/home/index/img/gl-riji.jpg" alt="装修日记">
                                    <div>装修日记</div>
                                </a>
                            </div>
                            <div class="gl-list-wd">
                                <?php if(is_array($info["riji"])): $i = 0; $__LIST__ = $info["riji"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="gl-list-item">
                                    <a href="http://<?php echo C('QZ_YUMINGWWW');?>/riji/s<?php echo ($vo["id"]); ?>.html" target="_blank"><span class="wz-det"><?php echo ($vo["title"]); ?></span></a>
                                    <span class="wz-shijian"><?php echo (date('Y-m-d',$vo["add_time"])); ?></span>
                                </div><?php endforeach; endif; else: echo "" ;endif; ?>
                                <div class="to-gl"><p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/riji/" target="_blank">GO<i class="go-to"></i></a></p></div>
                            </div><?php endif; ?>
                        </li>
                    </ul>
                </div>
                <a rel="nofollow" class="more" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/" target="_blank">查看更多本地资讯</a>
            </div>
        </div>
    </div>
    <!-- 装修攻略模块 E -->

    <!-- 广告轮播模块 S -->
    <div class="wrap">
        <div class="newsbanner">
            <ul>
                <?php if(is_array($info["bigbanner_b"])): $i = 0; $__LIST__ = $info["bigbanner_b"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                        <?php if($vo['url'] != ''): ?><a rel="nofollow" href="<?php echo ($vo["url"]); ?>" target="_blank">
                                <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo (addImgExt($vo["img_url"])); ?>" width="1210" height="110" alt="<?php echo ((isset($vo["company_name"]) && ($vo["company_name"] !== ""))?($vo["company_name"]):'装修公司'); ?>" />
                            </a>
                        <?php else: ?>
                            <?php if($vo['company_id'] != 0): ?><a rel="nofollow" href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($vo["company_id"]); ?>/" target="_blank">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo (addImgExt($vo["img_url"])); ?>" width="1210" height="110" alt="<?php echo ((isset($vo["company_name"]) && ($vo["company_name"] !== ""))?($vo["company_name"]):'装修公司'); ?>" />
                                </a>
                            <?php else: ?>
                                <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo (addImgExt($vo["img_url"])); ?>" width="1210" height="110" alt="<?php echo ((isset($vo["company_name"]) && ($vo["company_name"] !== ""))?($vo["company_name"]):'装修公司'); ?>" /><?php endif; endif; ?>
                    </li><?php endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>
    </div>
    <!-- 广告轮播模块 E -->

    <!-- 装修案列模块 S -->
    <div class="wrap">
        <div class="box">
            <div class="box-tit">
                <div class="tit"> <a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/xgt/" target="_blank">真实案例，任你挑选</a></div>
                <div class="heng-line"></div>
                <div class="tit-sm">目前已有<i class="f-red"><?php echo ($info["casesCount"]); ?></i>套业主真实的装修案例</div>
            </div>
            <div class="al-box">
                    <ul class="al-list">
                        <?php if(is_array($info["cases"])): $i = 0; $__LIST__ = $info["cases"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($key == 0): ?><li class="active">
                                    <div class="shupai"><?php echo ($vo["title"]); ?></div>
                                    <a href="<?php echo ($vo["url"]); ?>" target="_blank"><img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_url"]); ?>-s800x360.jpg" width="800" height="360" alt="<?php echo ($vo["title"]); ?>" /></a>
                                    <div class="p-bg">
                                        <p>
                                            <span><?php echo ($vo["title"]); ?></span>
                                            <a></a>
                                            <i><a rel="nofollow" href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($vo["company_id"]); ?>/" target="_blank"><?php echo ($vo["company_name"]); ?></a></i>
                                        </p>
                                    </div>
                                </li>
                                <?php else: ?>
                                <li>
                                    <div class="shupai"><?php echo ($vo["title"]); ?></div>
                                    <a href="<?php echo ($vo["url"]); ?>" target="_blank"><img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_url"]); ?>-s800x360.jpg" width="800" height="360" alt="<?php echo ($vo["title"]); ?>" /></a>
                                    <div class="p-bg">
                                        <p>
                                            <span><?php echo ($vo["title"]); ?></span>
                                            <a></a>
                                            <i><a rel="nofollow" href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($vo["company_id"]); ?>/" target="_blank"><?php echo ($vo["company_name"]); ?></a></i>
                                        </p>
                                    </div>
                                </li><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
            </div>
            <a rel="nofollow" class="more" href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/xgt/" target="_blank">查看更多装修案例</a>
        </div>
    </div>
    <!-- 装修案列模块 E -->

    <!-- 服务流程模块 S -->
    <div class="wrap">
        <div class="box">
            <div class="box-tit">
                <div class="tit"> <a href="javascript:;" style="color: #333;cursor: auto;">服务流程</a></div>
                <div class="heng-line"></div>
                <div class="tit-sm">一站式<i class="f-red">贴心服务</i>满足您的所有需求</div>
            </div>
            <div class="fw-step">
                <div class="fw-step-box">
                    <div class="step-item">
                        <div class="yuyue"></div>
                        <p>在线预约</p>
                    </div>
                    <i class="arrow-right"></i>
                    <div class="step-item">
                        <div class="yusuan"></div>
                        <p>方案+预算</p>
                    </div>
                    <i class="arrow-right"></i>
                    <div class="step-item">
                        <div class="hetong"></div>
                        <p>签订合同</p>
                    </div>
                    <i class="arrow-right"></i>
                    <div class="step-item">
                        <div class="shigong"></div>
                        <p>装修施工</p>
                    </div>
                    <i class="arrow-right"></i>
                    <div class="step-item">
                        <div class="yanshou"></div>
                        <p>装修验收</p>
                    </div>
                    <i class="arrow-right"></i>
                    <div class="step-item">
                        <div class="shouhou"></div>
                        <p>售后服务</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 服务流程模块 E -->

    <!-- 为什么选择齐装网 S -->
    <div class="why-select">
        <div class="wrap">
            <div class="why-bg">
                <div class="why-list">
                    <p class="why-tit">为什么选择齐装网?</p>
                    <p class="why-fuwu"><i class="fuwu-icon"></i><span>贴心的一站式服务</span></p>
                    <p class="why-tip">健全的服务体系 优质的服务质量</p>
                    <p class="why-fuwu"><i class="baozhang-icon"></i><span>靠谱的六大保障</span></p>
                    <p class="why-tip">官方监管质量保证 装修过程0增项</p>
                </div>
                <div class="xiang-list">
                    <ul class="ul-1">
                        <li class="li-1">
                            <p class="xiang-list-one">1500万</p>
                            <p class="xiang-list-two">服务业主</p>
                        </li>
                        <li class="li-2">
                            <p class="xiang-list-one">6万</p>
                            <p class="xiang-list-two">合作设计师</p>
                        </li>
                        <li>
                            <p class="xiang-list-one">86万</p>
                            <p class="xiang-list-two">业主点评</p>
                        </li>
                    </ul>
                    <ul class="ul-2">
                        <li class="li-3">
                            <p class="xiang-list-one">500个</p>
                            <p class="xiang-list-two">开通城市分站</p>
                        </li>
                        <li>
                            <p class="xiang-list-one">6万</p>
                            <p class="xiang-list-two">合作装修公司</p>
                        </li>
                    </ul>
                </div>
                <div class="erweima-di weixin">
                    <img src="/assets/home/index/img/weixingongzhao.jpg" alt="齐装网二维码" />
                    <p>关注微信公众号</p>
                    <p>装修费用降30%</p>
                </div>
                <div class="erweima-di">

                    <img src="/assets/home/index/img/weibo.jpg" alt="齐装网二维码" />
                    <p>关注官方微博</p>
                    <p>了解更多装修知识</p>
                </div>
            </div>
        </div>
    </div>

      <div class="footerpopup">
        <div class="midcen">
            <div class="shejipic"></div>
            <div class="footerfadan">
                <input type="text" class="footername" name="name" placeholder="怎么称呼您">
                <input type="text" class="footerphone" name="phone" maxlength="11" placeholder="输入手机号获取装修服务">
                <button class="footertj">立即报名</button>
                <span class="footerxian">( 限每日前<span>100</span>名 )</span>
            </div>
        </div>
    </div>

    <div class="footerpopup2">
        <div class="cenzhongjian">
            <div class="zhongjiangx">恭喜小主,报名成功！</div>
            <div class="footerhuo">您将获得以下福利:<span>1</span>免费量房<span>2</span>四分设计方案<span>3</span>一份装修报价</div>
            <div class="footshao">稍后客服将给您致电为您奉上以上福利,请耐心等待哦~</div>
            <span class="footerclose">x</span>
        </div>
    </div>
    <!-- 为什么选择齐装网 S -->
    <!-- 滚动用户的图片信息 S-->
    <div class="g-msg">
        <div class="msg msg1 animated fadeInUp">
            <img src="http://<?php echo C('QINIU_DOMAIN');?>/desLogo/201705/100.jpg" alt="">
            <span>来自杭州的李先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;13秒前</span>
        </div>
    </div>
    <!-- 滚动用户的图片信息 E-->
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

    <script type="text/javascript" src="/assets/home/index/js/slider.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/home/index/js/pic_script.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="/assets/home/index/js/jquery.luara.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/home/index/js/base.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="/assets/home/index/js/jquery.scrollbox.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="/assets/home/index/js/jquery.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="/assets/common/plugin/bxslider/bxslider.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="/assets/common/js/webticker/js/jquery.webticker.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript">
    var shen = null,shi = null;
    shen = citys["shen"];
    shi = citys["shi"];

    initCity('<?php echo ($theCityId); ?>');
    function initCity(cityId){
        App.citys.init(".order-box .edit-city", ".order-box .edit-quyu", shen, shi,cityId);
        App.citys.init(".edit-city-qa", ".edit-quyu-qa", shen, shi,cityId);
        App.citys.init(".edit-city-ds", ".edit-quyu-ds", shen, shi, cityId);
    }

    $('.ck-slide').ckSlide({
        autoPlay: true
    });
    // 装修公司案列图片居中
    $('.company-lunbo .slide-item').each(function(index, el) {
        var img = $(el).find('.company-anli').find('img');
        if( img.height()<$(el).find('.company-anli').height()){
            img.css({'height':'100%','width':'auto'})
        }
    });
    // 装修公司轮播
    $('.company-slider').bxSlider({
        slideWidth: 287,
        minSlides: 4,
        maxSlides: 4,
        slideMargin: 20,
        auto: true,
        stopAutoOnClick:true,
        autoHover: true,
        autoStart:true
    });
    // 广告轮播
    $('.newsbanner ul').bxSlider({
        mode:'vertical',
        slideWidth: 1210,
        minSlides: 1,
        maxSlides: 1,
        auto: true
    });
    // 案例切换
    $(".al-box ul li").hover(function(){
        $(this).find('.shupai').hide();
        $(this).siblings().find('p').hide()
        $(this).stop(true).animate({width:"800px"},1000,function(){
            $(this).find('.shupai').siblings('.p-bg').find('p').show();
        }).siblings().stop(true).animate({width:"100px"},1000);
        $(this).siblings().find('.shupai').show();
    },function(){
        $(this).siblings().find('p').hide();
        $(this).find('p').show();
    });
    // 页面滚动到美图模块透明度变化
    $(window).on('scroll',function(){
        var a = $('.xgt-box').parent('.box').offset().top;
        if(a>=$(document).scrollTop()){
            $('.xgt-box ul li').stop(true).animate({opacity: 1}, 1500)
        }

    });

    //友链
    $("#friend").rTabs({
        speed:2000
    });

    $('#disigner').scrollbox({
        direction: 'h',
        distance: 183,
        switchItems:1
    });

    //装修百科标题截取

    $(function(){


       $('.gl-list .gl-list-item .wz-fenlei').each(function(){
        if($(this).text().length>=7){
          $(this).text($(this).text().substring(0,7)+'...')
        }
       })

       $('.gl-list .gl-list-item .wz-det').each(function(){
        if($(this).text().length>=7){
            $(this).text($(this).text().substring(0,7)+'...')
        }
       })
    })

    $(".play #btnSave").click(function(event) {
        var container = $(".play");
        $(".focus", container).removeClass('focus');
        $(".height_auto", container).removeClass('height_auto');
        $(".valdate-info", container).remove();

        if (!App.validate.run($("input[name=name]", container).val())) {
            $("input[name=name]", container).parent().addClass('height_auto');
            $("input[name=name]", container).addClass('focus').focus();
            var span = $("<i class='valdate-info'></i>");
            span.html("您输入的姓名有误，请重新输入");
            $("input[name=name]", container).parent().append(span);
            return false;
        } else {
            var reg = new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$");
            if (!reg.test($("input[name=name]", container).val())) {
                $("input[name=name]", container).parent().addClass('height_auto');
                $("input[name=name]", container).addClass('focus').focus();
                $("input[name=name]", container).val('');
                var span = $("<i class='valdate-info'></i>");
                span.html("请输入正确的名称，只支持中文和英文");
                $("input[name=name]", container).parent().append(span);
                return false;
            }
        }

        if (!App.validate.run($("input[name=tel]", container).val())) {
            $("input[name=tel]", container).parent().addClass('height_auto');
            $("input[name=tel]", container).addClass('focus').focus();
            var span = $("<i class='valdate-info'></i>");
            span.html("请输入正确的手机号");
            $("input[name=tel]", container).parent().append(span);
            return false;
        } else {
            var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
            if (!reg.test($("input[name=tel]", container).val())) {
                $("input[name=tel]", container).parent().addClass('height_auto');
                $("input[name=tel]", container).addClass('focus').focus();
                $("input[name=tel]", container).val('');
                var span = $("<i class='valdate-info'></i>");
                span.html("请输入正确的手机号");
                $("input[name=tel]", container).parent().append(span);
                return false;
            }
        }

        if (!App.validate.run($(".edit-city", container).val())) {
            $(".edit-city", container).parent().addClass('height_auto');
            $(".edit-city", container).addClass('focus').focus();
            var span = $("<i class='valdate-info'></i>");
            span.html("请输入选择您的城市");
            $(".edit-city", container).parent().append(span);
            return false;
        }
        if(!checkDisclamer(".validate")){
            return false;
        }


        window.order({
            extra:{
                cs: $(".edit-city", container).val(),
                qx: $(".edit-quyu", container).val(),
                name: $("input[name=name]", container).val(),
                tel: $("input[name=tel]", container).val(),
                fb_type: $("input[name=fb_type]", container).val(),
                source: '156',
                step: 2
            },
            error:function(){},
            success:function(data, status, xhr){
                $("#safecode").val(data.data.safecode);
                $("#safekey").val(data.data.safekey);
                if (data.status == 1) {
                    $("body").append(data.data.tmp);
                } else {
                    if(data.info=="请输入正确的手机号"){
                        $("input[name=tel]", container).parent().addClass('height_auto');
                        $("input[name=tel]", container).addClass('focus').focus();
                        var span = $("<i class='valdate-info'></i>");
                        span.html("请输入正确的手机号");
                        $("input[name=tel]", container).parent().append(span);
                        return false;
                    }
                    $(".edit-city", container).parent().addClass('height_auto');
                    $(".edit-city", container).addClass('focus').focus();
                    var span = $("<i class='valdate-info'></i>");
                    span.html(data.info);
                    $(".edit-city", container).parent().append(span);
                }

            },
            validate:function(item, value, method, info){
                return true;
            }
        });
    });
    $(".company-sheji").click(function(event) {
        var type = 'sj';
        var source = '0';
        if ('lf' === type) {
            source = '157';
        }
        if ('sj' === type || 'sjnew' == type) {
            source = '158';
        }
        if ('ys' === type) {
            source = '160';
        }
        if (typeof type != "undefined") {
            $.ajax({
                url: '/dispatcher/',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    type: type,
                    source:source,
                    action: "load"
                }
            })
                .done(function(data) {
                    if (data.status == 1) {
                        $("body").append(data.data);
                        $(".zb_box_" + type).fadeIn(400, function() {
                            $(this).find("input[name=lf-name]").focus();
                        });
                    }
                });
        }
    });

    (function(){

          var indexfootertc=localStorage.indexfootertc;


            $('.midcen .footerfadan .footertj').click(function(event) {
                var zongkuo=$('.footerpopup');
                window.order({
                wrap:'.quickdesi',
                extra:{
                    name: $("input[name=name]", zongkuo).val(),
                    tel: $("input[name=phone]", zongkuo).val(),
                    source: '18062835',
                    step: 2
                },
                success:function(data, status, xhr){
                    if (data.status == 1) {
                       localStorage.indexfootertc=100;
                       $('.footerpopup').hide();
                       $('.footerpopup2').show();
                    } else {

                    }
                },
                validate:function(item, value, method, info){
                    if ('name' == item && 'notempty' == method) {
                        alert("请输入您的称呼");
                        return false;
                    };
                    if ('name' == item && 'isword' == method) {
                        alert("请输入正确的名称，只支持中文和英文");
                        return false;
                    };
                    if ('tel' == item && 'notempty' == method) {
                        alert("请输入您的手机号码");
                        return false;
                    };

                    if ('tel' == item && 'ismobile' == method) {
                        alert("请输入11位手机号码");
                        return false;
                    };
                    return true;
                }
            });


            });

            $('.cenzhongjian .footerclose').click(function(event) {
                $('.footerpopup2').hide();
            });

         })()
        // 底部悬浮框滚动显示隐藏效果
        $(function () {
            var indexfootertc=localStorage.indexfootertc, $footerPopup = $('.footerpopup');
            $(window).on("scroll",function () {
                console.log($(this).scrollTop())
                if( $(window).scrollTop() > 740 && $(window).scrollTop() < 3740 && !indexfootertc ){
                    $footerPopup.show();
                }else{
                    $footerPopup.hide();
                };
            });
        });
    </script>
    <script type="text/javascript">
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
        //滚动用户信息的提示
        var msgNum=0;
        setTimeout(function () {
            var setInval = setInterval(function(){
                var msgImg = ['http://<?php echo C('QINIU_DOMAIN');?>/desLogo/201705/100.jpg',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FmJ4GGIfw5S6TDVOjoDRkffzjaS9',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/Fi1b63xaSd-0pk3TCp9XHHl-DX7M',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FrdMGFpLBnsNb8MvcWWHE9_dJHAc',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/Fk-7YW9x8qTUAh-IILlUjsR87Mq2',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/Fj-C_o_rrHgTdDG3VCsq8857FKHZ',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FtofOIR1h8G-_4Yxn-OeS1i3BO3E',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FtofOIR1h8G-_4Yxn-OeS1i3BO3E',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FrX0mqcteABpqvNuvZiDlzOVJXsb',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FljRwrjYW6RqGzoXx94VCwv9QnML',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FhC7pnEVY5L2m_Zfqpsbxc59yKDR',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FtgfBcOanHSB2Wd7u0hQXXtMvIy5',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FtofOIR1h8G-_4Yxn-OeS1i3BO3E',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/Fi1b63xaSd-0pk3TCp9XHHl-DX7M',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FljRwrjYW6RqGzoXx94VCwv9QnML',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FljRwrjYW6RqGzoXx94VCwv9QnML',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FtgfBcOanHSB2Wd7u0hQXXtMvIy5',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/Fk-7YW9x8qTUAh-IILlUjsR87Mq2',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FmJ4GGIfw5S6TDVOjoDRkffzjaS9',
                        'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FtgfBcOanHSB2Wd7u0hQXXtMvIy5']
                    <?php if(empty($info["city"])): ?>var msgArry = ["来自盐城的王先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;1秒前",
                    "来自苏州的李女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;5秒前",
                    "来自芜湖的张先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;7秒前",
                    "来自杭州的刘先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;9秒前",
                    "来自上海的陈女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;13秒前",
                    "来自漯河的杨先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;14秒前",
                    "来自信阳的黄女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;16秒前",
                    "来自贵阳的赵女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;18秒前",
                    "来自南宁的周女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;20秒前",
                    "来自嘉兴的吴先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;22秒前",
                    "来自苏州的徐女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;1分钟前",
                    "来自杭州的孙先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;2分钟前",
                    "来自合肥的马女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;3分钟前",
                    "来自开封的胡先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;4分钟前",
                    "来自六安的朱先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;5分钟前",
                    "来自合肥的郭先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;6分钟前",
                    "来自南昌的何先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;7分钟前",
                    "来自泰安的罗女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;8分钟前",
                    "来自济南的高女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;9分钟前",
                    "来自南京的林女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;10分钟前"];
            <?php else: ?>
                var msgArry = ["来自<?php echo ($info["city"]); ?>的王先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;1秒前",
                    "来自<?php echo ($info["city"]); ?>的李女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;5秒前",
                    "来自<?php echo ($info["city"]); ?>的张先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;7秒前",
                    "来自<?php echo ($info["city"]); ?>的刘先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;9秒前",
                    "来自<?php echo ($info["city"]); ?>的陈女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;13秒前",
                    "来自<?php echo ($info["city"]); ?>的杨女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;14秒前",
                    "来自<?php echo ($info["city"]); ?>的黄女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;16秒前",
                    "来自<?php echo ($info["city"]); ?>的赵女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;18秒前",
                    "来自<?php echo ($info["city"]); ?>的周女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;20秒前",
                    "来自<?php echo ($info["city"]); ?>的吴先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;22秒前",
                    "来自<?php echo ($info["city"]); ?>的徐女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;1分钟前",
                    "来自<?php echo ($info["city"]); ?>的孙先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;2分钟前",
                    "来自<?php echo ($info["city"]); ?>的马女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;3分钟前",
                    "来自<?php echo ($info["city"]); ?>的胡先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;4分钟前",
                    "来自<?php echo ($info["city"]); ?>的朱先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;5分钟前",
                    "来自<?php echo ($info["city"]); ?>的郭先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;6分钟前",
                    "来自<?php echo ($info["city"]); ?>的何先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;7分钟前",
                    "来自<?php echo ($info["city"]); ?>的罗女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;8分钟前",
                    "来自<?php echo ($info["city"]); ?>的高女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;9分钟前",
                    "来自<?php echo ($info["city"]); ?>的林女士申请成功&nbsp;&nbsp;&nbsp;&nbsp;10分钟前"];<?php endif; ?>

                $('.msg span').html(msgArry[msgNum]);
                $('.msg img').attr('src',msgImg[msgNum]);

                msgNum++;

                if (msgNum >= 20) {msgNum=0}
                if( IEVersion() == 8 || IEVersion() == 9 ){
                    $('.msg').css({
                        "display" : 'block',
                        "opacity" : "0"
                    });
                    $('.msg').animate({
                        "top":"0",
                        "opacity" : 1
                    }, 1500)
                    var s1 = setTimeout(function () {
                        $('.msg').animate({
                            "top":"-50px",
                            "opacity" : 0
                        }, 1500, function () {
                            $('.msg').css("top","50px");
                        });
                        clearTimeout(s1);
                    }, 6500);
                }else{
                    $('.msg').removeClass('fadeOutUp');
                    $('.msg').show();
                    $('.msg').addClass('animated fadeInUp');
                    var setTime1=setTimeout(function(){
                        $('.msg').addClass('fadeOutUp');
                        clearTimeout(setTime1);
                    },5000);
                }

            },10000);
            setTimeout(function () {
                clearInterval(setInval);
            },180000)
        }, 10000)
    </script>
</body>

</html>