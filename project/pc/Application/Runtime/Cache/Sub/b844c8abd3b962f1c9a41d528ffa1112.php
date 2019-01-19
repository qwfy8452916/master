<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="renderer" content="webkit" />
<title><?php echo ($keys["title"]); ?></title>
<?php if(empty($keys["keywords"])): ?><meta name="keywords" content="<?php echo ($keys["keywords"]); ?>" />
    <meta name="description" content="<?php echo ($keys["description"]); ?>" />
<?php else: ?>
    <meta name="keywords" content="<?php echo ($keys["keywords"]); ?>" />
    <meta name="description" content="<?php echo ($keys["description"]); ?>" /><?php endif; ?>
<?php if($keyword != ''): ?><meta name="robots" content="noindex,follow"/><?php endif; ?>
<?php if(!empty($info["head"]["mobile_agent"])): ?><meta name="mobile-agent" content="format=html5;url=<?php echo ($info["head"]["mobile_agent"]); ?>" /><?php endif; ?>
<link rel="canonical" href="<?php echo ($info["head"]["canonical"]); ?>" />
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



<link href="/assets/home/meitu/css/imglist_p260.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link href="/assets/home/meitu/css/meitu-popover.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/home/xiaoguotu/js/jQueryColor.js?v=<?php echo C('STATIC_VERSION');?>"></script>
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

    <div class="wrap">
        <div class="top-baojia-img">
            <a href="javascript:void(0)" id="meituTopImgBaojia">
                <img src="<?php echo ($static_host); ?>/assets/home/meitu/img/jz-img-top.jpg" alt="在线报价神器">
            </a>
        </div>
    </div>
    <div class="wrap">
        <div class="meitu-bread">
            <ul>
                <li><a href="<?php echo ($urlFenzhan); ?>/"><?php echo ($cityinfo["name"]); ?>装修</a><i class="angle-right"></i></li>
                <li><a href="/xgt/">全屋图集</a><i class="angle-right"></i></li>
                <?php if($info['typeName'] != '' ): ?><li>
                        <em><a rel="nofollow" href="javascript:;"><?php echo ($xiaoguotuInfo['tabs'][$param['classid']-1]['name']); ?></a>
                        <i class="fa fa-angle-down"></i></em>
                        <div class="hover-sel">
                            <div class="hover-sel-reset">
                                <?php if(is_array($xiaoguotuInfo["tabs"])): $i = 0; $__LIST__ = $xiaoguotuInfo["tabs"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($param['classid'] == $vo['id']): ?><span data-type="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="javascript:;"><?php echo ($vo["name"]); ?></a></span>
                                    <?php else: ?>
                                        <span data-type="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="javascript:;"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                            </div>
                        </div>
                        <i class="angle-right"></i>
                    </li><?php endif; ?>
                <!-- 家装 -->
                <?php if($info["typeid"] == '1' ): if(isset($info["selectType"]["h"])): ?><li>
                            <em><a rel="nofollow" href="javascript:;"><?php echo ($info['selectType']['h']['name']); ?></a>
                            <i class="fa fa-angle-down"></i></em>
                            <div class="hover-sel">
                                <div class="hover-sel-reset">
                                    <?php if(is_array($xiaoguotuInfo["hx"])): $i = 0; $__LIST__ = $xiaoguotuInfo["hx"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                        <?php else: ?>
                                            <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                                </div>
                            </div>
                            <i class="angle-right"></i>
                        </li><?php endif; ?>

                    <?php if(isset($info["selectType"]["f"])): ?><li>
                            <em><a rel="nofollow" href="javascript:;"><?php echo ($info['selectType']['f']['name']); ?></a>
                            <i class="fa fa-angle-down"></i></em>
                            <div class="hover-sel">
                                <div class="hover-sel-reset">
                                <?php if(is_array($xiaoguotuInfo["fenge"])): $i = 0; $__LIST__ = $xiaoguotuInfo["fenge"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                    <?php else: ?>
                                        <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                                </div>
                            </div>
                            <i class="angle-right"></i>
                        </li><?php endif; ?>

                    <?php if(isset($info["selectType"]["z"])): ?><li>
                            <em><a rel="nofollow" href="javascript:;"><?php echo ($info['selectType']['z']['name']); ?></a>
                            <i class="fa fa-angle-down"></i></em>
                            <div class="hover-sel">
                                <div class="hover-sel-reset">
                                <?php if(is_array($xiaoguotuInfo["jiage"])): $i = 0; $__LIST__ = $xiaoguotuInfo["jiage"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                    <?php else: ?>
                                        <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                                </div>
                            </div>
                           <i class="angle-right"></i>
                        </li><?php endif; endif; ?>

                <!-- 公装 -->
                <?php if($info["typeid"] == '2' ): if(isset($info["selectType"]["lx"])): ?><li>
                            <em><a rel="nofollow" href="javascript:;"><?php echo ($info['selectType']['lx']['name']); ?></a>
                            <i class="fa fa-angle-down"></i></em>
                            <div class="hover-sel limit-gongzhuang">
                                <div class="hover-sel-reset">
                                    <?php if(is_array($xiaoguotuInfo["gzleixing"])): $i = 0; $__LIST__ = $xiaoguotuInfo["gzleixing"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                        <?php else: ?>
                                            <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                                </div>
                            </div>
                            <i class="angle-right"></i>
                        </li><?php endif; ?>

                    <?php if(isset($info["selectType"]["f"])): ?><li>
                            <em><a rel="nofollow" href="javascript:;"><?php echo ($info['selectType']['f']['name']); ?></a>
                            <i class="fa fa-angle-down"></i></em>
                            <div class="hover-sel">
                                <div class="hover-sel-reset">
                                    <?php if(is_array($xiaoguotuInfo["gzfenge"])): $i = 0; $__LIST__ = $xiaoguotuInfo["gzfenge"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                        <?php else: ?>
                                            <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                                </div>
                            </div>
                            <i class="angle-right"></i>
                        </li><?php endif; ?>

                    <?php if(isset($info["selectType"]["z"])): ?><li>
                            <em><a rel="nofollow" href="javascript:;"><?php echo ($info['selectType']['z']['name']); ?></a>
                            <i class="fa fa-angle-down"></i></em>
                            <div class="hover-sel">
                                <div class="hover-sel-reset">
                                <?php if(is_array($xiaoguotuInfo["gzjiage"])): $i = 0; $__LIST__ = $xiaoguotuInfo["gzjiage"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                    <?php else: ?>
                                        <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                                </div>
                            </div>
                            <i class="angle-right"></i>
                        </li><?php endif; endif; ?>

                <!-- 工地 -->
                <?php if($info["typeid"] == '3' ): if(isset($info["selectType"]["h"])): ?><li>
                            <em><a rel="nofollow" href="javascript:;"><?php echo ($info['selectType']['h']['name']); ?></a>
                            <i class="fa fa-angle-down"></i></em>
                            <div class="hover-sel">
                                <div class="hover-sel-reset">
                                <?php if(is_array($xiaoguotuInfo["zjhx"])): $i = 0; $__LIST__ = $xiaoguotuInfo["zjhx"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                    <?php else: ?>
                                        <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                                </div>
                            </div>
                            <i class="angle-right"></i>
                        </li><?php endif; ?>
                    <?php if(isset($info["selectType"]["f"])): ?><li>
                            <em><a rel="nofollow" href="javascript:;"><?php echo ($info['selectType']['f']['name']); ?></a>
                            <i class="fa fa-angle-down"></i></em>
                            <div class="hover-sel">
                                <div class="hover-sel-reset">
                                <?php if(is_array($xiaoguotuInfo["zjfenge"])): $i = 0; $__LIST__ = $xiaoguotuInfo["zjfenge"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                    <?php else: ?>
                                        <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                                </div>
                            </div>
                            <i class="angle-right"></i>
                        </li><?php endif; ?>

                    <?php if(isset($info["selectType"]["z"])): ?><li>
                            <em><a rel="nofollow" href="javascript:;"><?php echo ($info['selectType']['z']['name']); ?></a>
                            <i class="fa fa-angle-down"></i></em>
                            <div class="hover-sel">
                                <div class="hover-sel-reset">
                                    <?php if(is_array($xiaoguotuInfo["zjjiage"])): $i = 0; $__LIST__ = $xiaoguotuInfo["zjjiage"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                        <?php else: ?>
                                            <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                                </div>
                            </div>
                            <i class="angle-right"></i>
                        </li><?php endif; endif; ?>
            </ul>
        </div>
        <div class="meitu-kong-bread"></div>
        <div class="classify">
            <div class="classify-box">
                <div class="classify-title">
                    <span>类型：</span>
                </div>
                <div class="classify-list" list-state="1">
                    <div class="reset-with">
                        <div class="item-span leixingwk">
                            <?php if(is_array($xiaoguotuInfo["tabs"])): $i = 0; $__LIST__ = $xiaoguotuInfo["tabs"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($param['classid'] == $vo['id']): ?><span data-type="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="javascript:;"><?php echo ($vo["name"]); ?></a></span>
                                <?php else: ?>
                                    <span data-type="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="javascript:;"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                        </div>
                    </div>
                </div>
            </div>

            <div class="classify-box">
                <div class="classify-title">
                    <span>户型：</span>
                </div>
                <div class="classify-list" list-state="2">
                    <div class="reset-with">
                        <div class="huxing-1 item-span <?php if($info["typeid"] == '1' ): ?>block<?php endif; ?>">
                            <?php if(is_array($xiaoguotuInfo["hx"])): $i = 0; $__LIST__ = $xiaoguotuInfo["hx"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                <?php else: ?>
                                    <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                        </div>

                        <div class="huxing-2 item-span <?php if($info["typeid"] == '2' ): ?>block<?php endif; ?>">
                            <?php if(is_array($xiaoguotuInfo["gzleixing"])): $i = 0; $__LIST__ = $xiaoguotuInfo["gzleixing"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                <?php else: ?>
                                    <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                        </div>
                        <div class="huxing-3 item-span <?php if($info["typeid"] == '3' ): ?>block<?php endif; ?>">
                            <?php if(is_array($xiaoguotuInfo["zjhx"])): $i = 0; $__LIST__ = $xiaoguotuInfo["zjhx"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                <?php else: ?>
                                    <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                        </div>
                    </div>
                </div>
            </div>

            <div class="classify-box">
                <div class="classify-title">
                    <span>风格：</span>
                </div>
                <div class="classify-list" list-state="3">
                    <div class="reset-with">
                        <div class="fengge-1 item-span <?php if($info["typeid"] == '1' ): ?>block<?php endif; ?>">
                            <?php if(is_array($xiaoguotuInfo["fenge"])): $i = 0; $__LIST__ = $xiaoguotuInfo["fenge"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                <?php else: ?>
                                    <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                        </div>
                        <div class="fengge-2 item-span <?php if($info["typeid"] == '2' ): ?>block<?php endif; ?>">
                            <?php if(is_array($xiaoguotuInfo["fenge"])): $i = 0; $__LIST__ = $xiaoguotuInfo["fenge"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                <?php else: ?>
                                    <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                        </div>
                        <div class="fengge-3 item-span <?php if($info["typeid"] == '3' ): ?>block<?php endif; ?>">
                            <?php if(is_array($xiaoguotuInfo["zjfenge"])): $i = 0; $__LIST__ = $xiaoguotuInfo["zjfenge"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                                <?php else: ?>
                                    <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                        </div>
                    </div>
                </div>
                <!-- <div class="classify-operate">
                    <span>展开</span><i class="fa fa-angle-down"></i>
                </div> -->
            </div>
            <div class="classify-box">
                <div class="classify-title">
                    <span>造价：</span>
                </div>
                <div class="classify-list" list-state="4">
                    <div class="reset-with">
                    <div class="zaojia-1 item-span <?php if($info["typeid"] == '1' ): ?>block<?php endif; ?>">
                        <?php if(is_array($xiaoguotuInfo["jiage"])): $i = 0; $__LIST__ = $xiaoguotuInfo["jiage"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                            <?php else: ?>
                                 <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </div>
                    <div class="zaojia-2 item-span <?php if($info["typeid"] == '2' ): ?>block<?php endif; ?>">
                        <?php if(is_array($xiaoguotuInfo["gzjiage"])): $i = 0; $__LIST__ = $xiaoguotuInfo["gzjiage"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                            <?php else: ?>
                                 <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </div>
                    <div class="zaojia-3 item-span <?php if($info["typeid"] == '3' ): ?>block<?php endif; ?>">
                        <?php if(is_array($xiaoguotuInfo["zjjiage"])): $i = 0; $__LIST__ = $xiaoguotuInfo["zjjiage"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['checked']): ?><span data-id="<?php echo ($vo["id"]); ?>" class="actived"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span>
                            <?php else: ?>
                                 <span data-id="<?php echo ($vo["id"]); ?>"><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a></span><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </div>
                    </div>
                </div>
                <!-- <div class="classify-operate">
                    <span>展开</span><i class="fa fa-angle-down"></i>
                </div> -->
            </div>
        </div>
    </div>
    <div class="wrap">
        <?php if($xiaoguotuInfo['images']): if(($robot) == "1"): ?><div class="list-content">
                    <ul class="imgBox" id="imgBox">
                        <?php if(is_array($xiaoguotuInfo["images"])): $i = 0; $__LIST__ = $xiaoguotuInfo["images"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li class="pic">

                                <div class="item-bd">
                                    <div class="img-box">
                                        <!-- S 判断图片是七牛上的还是本地的 -->
                                        <?php if(($vo["img_host"]) == "qiniu"): ?><img class="lazy"  alt="<?php echo ($vo["title"]); ?>" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["src"]); ?>-w280.jpg">
                                        <?php else: ?>
                                            <img class="lazy" alt="<?php echo ($vo["title"]); ?>" src="http://<?php echo C('STATIC_HOST1'); echo ($vo["src"]); ?>s_<?php echo ($vo["img"]); ?>"><?php endif; ?>
                                        <!-- E 判断图片是七牛上的还是本地的 -->
                                    </div>
                                    <div class="btn-fd">

                                    </div>
                                    <div class="item-mark" data-href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/caseinfo/<?php echo ($vo["id"]); ?>.shtml">

                                            <span><?php echo ($vo["zstyle"]); ?>/<?php echo ($vo["zcost"]); ?>/<?php echo ($vo["zarea"]); ?>m²</span>

                                    </div>
                                </div>
                                <div class="item-ft">
                                    <p class="item-ft-tit a-img" data-href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/caseinfo/<?php echo ($vo["id"]); ?>.shtml">
                                        <a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/caseinfo/<?php echo ($vo["id"]); ?>.shtml" target="_blank"   ><?php echo ($vo["title"]); ?></a>
                                    </p>
                                    <p class="item-ft-msg"><span><?php echo ($vo["writer"]); ?></span><span class="fr"><i class="eye"></i> <?php echo ($vo["looked"]); ?></span></p>
                                </div>

                        </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                </div>
            <?php else: ?>
                <div class="list-content">
                    <ul class="imgBox" id="imgBox">
                        <?php if(is_array($xiaoguotuInfo["images"])): $i = 0; $__LIST__ = $xiaoguotuInfo["images"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li class="pic">

                                    <div class="item-bd">
                                        <div class="img-box">
                                            <!-- S 判断图片是七牛上的还是本地的 -->
                                            <?php if(($vo["img_host"]) == "qiniu"): ?><img class="lazy"  alt="<?php echo ($vo["title"]); ?>" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["src"]); ?>-w280.jpg">
                                            <?php else: ?>
                                                <img class="lazy" alt="<?php echo ($vo["title"]); ?>" src="http://<?php echo C('STATIC_HOST1'); echo ($vo["src"]); ?>s_<?php echo ($vo["img"]); ?>"><?php endif; ?>
                                            <!-- E 判断图片是七牛上的还是本地的 -->
                                        </div>
                                            <?php if(($vo["img_host"]) == "qiniu"): ?><div class="btn-fd" img-title="<?php echo ($vo["title"]); ?>" img-src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["src"]); ?>-w300.jpg">
                                            <?php else: ?>
                                                <div class="btn-fd" img-title="<?php echo ($vo["title"]); ?>" img-src="http://<?php echo C('STATIC_HOST1'); echo ($vo["src"]); ?>s_<?php echo ($vo["img"]); ?>"><?php endif; ?>

                                        </div>
                                        <div class="item-mark" data-href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/caseinfo/<?php echo ($vo["id"]); ?>.shtml">

                                                <span><?php echo ($vo["zstyle"]); ?>/<?php echo ($vo["zcost"]); ?>/<?php echo ($vo["zarea"]); ?>m²</span>

                                        </div>
                                    </div>
                                    <div class="item-ft">
                                        <p class="item-ft-tit a-img" data-href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/caseinfo/<?php echo ($vo["id"]); ?>.shtml">
                                           <a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/caseinfo/<?php echo ($vo["id"]); ?>.shtml" target="_blank"  > <?php echo ($vo["title"]); ?></a>
                                        </p>
                                        <p class="item-ft-msg"><span><?php echo ($vo["writer"]); ?></span><span class="fr"><i class="eye"></i> <?php echo ($vo["looked"]); ?></span></p>
                                    </div>
                                </a>
                        </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                </div><?php endif; ?>
        <?php else: ?>
        <div class="leftsilder search-none">
            <div class="search-none-t">
            </div>
            <div class="search-none-b">
                <dl>
                    <dt><h1>对不起,还没有搜索到您需要的装修案例</h1></dt>
                    <dd>您搜索的关键词不匹配，您可以与<span class="red"><?php echo releaseCount("fbzrs");?></span>户业主一起参与<a class="red" href="/zhaobiao/" target="_blank">发布装修招标</a>,享受多重免费服务及装修保障，让您轻松搞定装修！</dd>
                </dl>
                <p>
                    【建议】:
                </p>
                <p>
                    1.由于每个房屋情况均不一致，需要根据您房屋的户型结构及具体要求，方可制定出适合您的方案
                </p>
                <p>
                2.目前80%的业主选择了该项服务:<a class="red" href="/zhaobiao/" target="_blank">免费帮我做设计方案</a> 为了您的利益及我们的口碑，您的资料我们将严格保密，我们将在10分钟之内及时与您联系！
                </p>
            </div>
        </div><?php endif; ?>
    </div>
    <div class="wrap fenye">
        <?php echo ($xiaoguotuInfo["page"]); ?>
    </div>
    <div class="wrap">
        <div class="footer-sheji-img"></div><a target="_blank" href="http://<?php echo C('QZ_YUMINGWWW');?>/zhaobiao/" rel="nofollow"><img src="<?php echo ($static_host); ?>/assets/home/meitu/img/jz-img-bottom.jpg" alt=""></a>
    </div>
    <!-- S 我要设计 -->
<div class="iwantzx">
    <div class="iwantzx-box">
        <i class="fa fa-close"></i>
        <div class="left-modal">
            <div class="iwantzx-img">
                <img id="iwantPic" src="<?php echo ($static_host); ?>/assets/home/meitu/img/jz-img-top.jpg" alt="">
            </div>
            <p class="iwantzx-info"></p>
        </div>
        <div class="right-modal bj-box">
            <p class="big-title">10秒免费申请4份设计</p>
            <p class="small-info">知名设计师，为您定制4份设计方案</p>
            <p class="small-info">全面PK 不满意重新设计</p>
            <div class="form-box">
                <div class="iwantzx-sel">
                    <select class="freesj_cs" name="iwant_cs"></select>
                    <select class="freesj_qx" name="iwant_qy"></select>
                </div>
                <div class="iwantzx-input">
                    <input type="text" placeholder="怎么称呼您" name="iwant_name">
                </div>
                <div class="iwantzx-input">
                    <input type="text" placeholder="请输入手机号码获得结果" maxlength="11" name="iwant_tel">
                </div>

                   <!--S-免责申明-->
                    <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                   <!--E-免责申明-->

                <div class="iwantzx-button iwantzx-btn-1">立即获取</div>
                <input type="hidden" name="fb_type" value="sheji">
            </div>
        </div>
    </div>
</div>

<!-- S 我要装修 -->
<div class="zxmoney">
    <div class="zxmoney-box">
        <i class="fa fa-close"></i>
        <div class="left-modal">
            <div class="zxmoney-img">
                <img id="zxmoneyPic" src="<?php echo ($static_host); ?>/assets/home/meitu/img/jz-img-top.jpg" alt="">
            </div>
            <p class="zxmoney-info"></p>
        </div>
        <div class="right-modal bj-box">
            <p class="big-title">装修成这样花多少钱？</p>
            <p class="big-title1">你的装修预算为<span class="red-color"  id="total-price">？</span><span>元</span></p>
            <div class="disclaimer">*该报价为半包估算价，实际费用以上门量房实测为准。</div>
            <div class="zxmoney-result">
                <ul>
                    <li>客厅：<span id="kt-price" class="priceold">？</span><span>元</span></li>
                    <li>厨房：<span id="cf-price" class="priceold">？</span><span>元</span></li>
                    <li>卧室：<span id="zw-price" class="priceold">？</span><span>元</span></li>
                    <li>卫生间：<span id="wsj-price" class="priceold">？</span><span>元</span></li>
                    <li>水电：<span id="sd-price" class="priceold">？</span><span>元</span></li>
                    <li>其他：<span id="other-price" class="priceold">？</span><span>元</span></li>
                </ul>
            </div>
            <div class="form-box">
                <div class="zxmoney-input">
                    <input type="number" placeholder="请输入面积" name="mianji">
                    <span class="pingfang">m²</span>
                </div>
                <div class="zxmoney-sel">
                    <select class="freesj_cs" name="cs"></select>
                    <select class="freesj_qx" name="qy"></select>
                </div>
                <div class="zxmoney-input">
                    <input type="text" placeholder="怎么称呼您" name="money_name">
                </div>
                <div class="zxmoney-input">
                    <input type="text" placeholder="请输入手机号码获得结果" maxlength="11" name="money_tel">
                </div>
                <!--S-免责申明-->
                    <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                <!--E-免责申明-->
                <div class="zxmoney-button zxmoney-btn">立即获取</div>
                <input type="hidden" name="fb_type" value="baojia">
            </div>
        </div>
    </div>
</div>
<!-- E 我要装修 -->
<script type="text/javascript" >
    var Global_source1 = "<?php echo ((isset($tmpsource) && ($tmpsource !== ""))?($tmpsource):'182'); ?>";
    var Global_source2 = "<?php echo ((isset($tmpsource1) && ($tmpsource1 !== ""))?($tmpsource1):158); ?>";
</script>
<script src="<?php echo ($static_host); ?>/assets/home/meitu/js/popover_20180702.js?v=<?php echo C('STATIC_VERSION');?>"></script>




    <?php if(!empty($friendLink["link"])): if($friendLink['hotCity'] || $friendLink['link'] || $friendLink['provinceCity'] || $friendLink['recentCity'] || $friendLink['tags']): ?><div class="friend" id="friend">
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
                    <?php if(is_array($friendLink["hotCity"])): $i = 0; $__LIST__ = $friendLink["hotCity"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>" target="_blank"><?php echo ($vo["cname"]); ?>装修</a><?php endforeach; endif; else: echo "" ;endif; ?>
                </div><?php endif; ?>
                <?php if($friendLink['recentCity']): ?><div class="tab-con-item">
                    <?php if(is_array($friendLink["recentCity"])): $i = 0; $__LIST__ = $friendLink["recentCity"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>" target="_blank"><?php echo ($vo["cname"]); ?>装修</a><?php endforeach; endif; else: echo "" ;endif; ?>
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
    <script type="text/javascript" src="/assets/home/meitu/js/frendlink.js?v=<?php echo C('STATIC_VERSION');?>"></script><?php endif; endif; ?>
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
    <script src="<?php echo ($static_host); ?>/assets/common/plugin/wookmark/js/wookmark.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/placeholder-color-fix.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript">
        //设置索引值
        var offset = 1;
        var shen = null,shi = null;
        shen = citys["shen"];
        shi = citys["shi"];
        App.citys.init(".freesj_cs",".freesj_qx",shen,shi,'<?php echo ($theCityId); ?>');

        /*必须使用onload函数，不然会出现排版问题*/
        window.onload = function () {
            var wookmark = new Wookmark('.imgBox', {
                offset: 12,
                align:'left',
                itemWidth:295,
                fillEmptySpace: true
            });
        };
        jQuery(document).ready(function($) {
            $(".angle-right").eq($(".angle-right").length-1).css("display","none");
            $("#meituTopImgBaojia").click(function(event) {
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
                    }
                });
            });

            /* 面包屑导航悬浮 */
            $(document).on('scroll',function(){
                if($(this).scrollTop() > 340){
                    $('.meitu-bread').css({'position':'fixed',top:0,margin:0,'z-index':10});
                    $('#meitu-kong-bread').show();
                }else{
                    $('.meitu-bread').css({'position':'relative',top:'0',margin:'5px 0px 5px 0'});
                    $('#meitu-kong-bread').hide();
                }
            });

            /*S-导航栏动画*/
            $(".classify-operate").click(function(){
                var touch = $(this).attr('data-on');
                if('show' == touch){
                    $(this).attr('data-on','hidden');
                    $(this).find('span').html('展开');
                    $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
                    $(this).parent().stop().animate({"height":"38px"},600);
                    $(this).parent().find('.classify-title').stop().animate({height: '38px'},600);
                }else{
                    $(this).attr('data-on','show');
                    var type= $(this).attr('data-type');
                    var count = $(this).parent().find('.classify-list item-span span').length;
                    var height = $(this).parent().find('.classify-list').height();
                    $(this).find('span').html('收起');
                    $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
                    $(this).parent().stop().animate({height: height},600);
                    $(this).parent().find('.classify-title').stop().animate({height: height},600);
                }
            });

            /* S 分类选择 */
            $(".classify-list span").click(function(){
                $(".meitu-bread ul li").eq(2).children('.angle-right').css("display","none");
                $(".meitu-bread ul li").eq(3).css("display","none");
                $(this).addClass('actived').siblings('span').removeClass('actived');
                var state = $(this).parent().parent().attr('list-state');
                var breadState=[];
                var leixingindex = $(this).index();
                var lexingtext = $('.leixingwk span').eq(leixingindex).children('a').text();
                $('.meitu-bread li').each(function(index, el) {
                    breadState.push($(this).attr('state'));
                });
                var item = $(this).html();
                var dom = $(this).parent('.item-span').html();
                var str = '<li state="'+state+'"><em>'+item+' <i class="fa fa-angle-down"></i></em><div class="hover-sel">'+dom+'</div><i class="fa fa-angle-right"></i></li>';

                // if(state==='1'){
                    if($(this).attr('data-type')==='1'){
                        $('.classify-list').find('.huxing-1').show().siblings().hide();
                        $('.classify-list').find('.fengge-1').show().siblings().hide();
                        $('.classify-list').find('.zaojia-1').show().siblings().hide();
                        $('.hover-sel span').eq(leixingindex).addClass('actived');
                        $('.hover-sel span').eq(leixingindex).siblings().removeClass('actived');
                        $('.meitu-bread ul li em a').text(lexingtext)

                    }else if($(this).attr('data-type')==='2'){
                        $('.classify-list').find('.huxing-2').show().siblings().hide();
                        $('.classify-list').find('.fengge-2').show().siblings().hide();
                        $('.classify-list').find('.zaojia-2').show().siblings().hide();
                        $('.hover-sel span').eq(leixingindex).addClass('actived');
                        $('.hover-sel span').eq(leixingindex).siblings().removeClass('actived');
                        $('.meitu-bread ul li em a').text(lexingtext)
                    }else if($(this).attr('data-type')==='3'){
                        $('.classify-list').find('.huxing-3').show().siblings().hide();
                        $('.classify-list').find('.fengge-3').show().siblings().hide();
                        $('.classify-list').find('.zaojia-3').show().siblings().hide();
                        $('.hover-sel span').eq(leixingindex).addClass('actived');
                        $('.hover-sel span').eq(leixingindex).siblings().removeClass('actived');
                        $('.meitu-bread ul li em a').text(lexingtext)
                    }
                // }
            });

            $('.meitu-bread ul').on('click','li em',function(){
                var currentState = $(this).attr('state');
                var stateArr = [];
                $li = $(this).parent();
                if($li.attr('state')){
                    $li.nextAll().remove();
                    $('.meitu-bread ul').find('li[state]').each(function(index, el) {
                        stateArr.push($(this).attr('state'))
                    });
                    $('.classify-box').each(function(index, el) {
                        var num = $(this).find('.classify-list').attr('list-state');
                        if($.inArray(num,stateArr)<0){
                            $(this).find('.classify-list span').removeClass('actived');
                        }
                    });
                }
            });

            $('.meitu-bread').on('click','.hover-sel span',function(){
                $(".meitu-bread ul li").eq(2).children('.angle-right').css("display","none");
                $(".meitu-bread ul li").eq(3).css("display","none");
                var state = $(this).parent().parent('li').attr('state');
                var item =  $(this).html();
                var $li = $(this).parent().parent('li');
                var stateArr = [];
                var mianbaoindex=$(this).index();
                var mianbaotext=$('.hover-sel-reset span').eq(mianbaoindex).children('a').text();
                if($li.attr('state')==='1'){
                    $li.nextAll().remove();
                    if($li.attr('state')){

                        $('.meitu-bread ul').find('li[state]').each(function(index, el) {
                            stateArr.push($(this).attr('state'))
                        });
                        $('.classify-box').each(function(index, el) {
                            var num = $(this).find('.classify-list').attr('list-state');
                            if($.inArray(num,stateArr)<0){
                                $(this).find('.classify-list span').removeClass('actived');
                            }
                        });
                    }
                }

                $(this).parent('.hover-sel').siblings('em').html(item+' <i class="fa fa-angle-down"></i>');
                $(this).addClass('actived').siblings('span').removeClass('actived');
                $('.classify-list[list-state="'+state+'"]').find('span').each(function(index, el) {
                    if($(el).html() === item){
                        $(el).addClass('actived').siblings('span').removeClass('actived');
                    }
                });
                if($(this).attr('data-type')==='1'){
                    $('.classify-list').find('.huxing-1').show().siblings().hide();
                    $('.classify-list').find('.fengge-1').show().siblings().hide();
                    $('.classify-list').find('.zaojia-1').show().siblings().hide();
                    $('.leixingwk span').eq(mianbaoindex).addClass('actived');
                    $('.leixingwk span').eq(mianbaoindex).siblings().removeClass('actived');
                    $('.meitu-bread ul li em a').text(mianbaotext)

                }else if($(this).attr('data-type')==='2'){
                    $('.classify-list').find('.huxing-2').show().siblings().hide();
                    $('.classify-list').find('.fengge-2').show().siblings().hide();
                    $('.classify-list').find('.zaojia-2').show().siblings().hide();
                    $('.leixingwk span').eq(mianbaoindex).addClass('actived');
                    $('.leixingwk span').eq(mianbaoindex).siblings().removeClass('actived');
                    $('.meitu-bread ul li em a').text(mianbaotext)
                }else if($(this).attr('data-type')==='3'){
                    $('.classify-list').find('.huxing-3').show().siblings().hide();
                    $('.classify-list').find('.fengge-3').show().siblings().hide();
                    $('.classify-list').find('.zaojia-3').show().siblings().hide();
                    $('.leixingwk span').eq(mianbaoindex).addClass('actived');
                    $('.leixingwk span').eq(mianbaoindex).siblings().removeClass('actived');
                    $('.meitu-bread ul li em a').text(mianbaotext)
                }
            });

            // 导航条
            var timer = null;
            $('.meitu-bread ul').on( "mouseenter",'em',function(){
                clearTimeout(timer);
                $(this).parent('li').find('.hover-sel').show();
                $(this).parent('li').siblings('li').find('.hover-sel').hide();
            });

            $('.meitu-bread ul').on( "mouseleave",'em',function(){
                clearTimeout(timer);
                var _this = $(this);
                timer = setTimeout(function(){
                    _this.parent('li').find('.hover-sel').hide();
                },300);
            });

            $('.meitu-bread ul').on( "mouseenter",'.hover-sel',function(){
                clearTimeout(timer);
                $(this).show();
            });
            $('.meitu-bread ul').on( "mouseleave",'.hover-sel',function(){
                clearTimeout(timer);
                $(this).hide();
            });

            $('.pic').on('mouseenter','.item-bd',function(){
                $('.btn-fd').html('<span class="btn-sheji">我要装修成这样</span><span class="btn-baojia">装修成这样花多少钱</span>')
            })
            $('.pic').on('mouseleave','.item-bd',function(){
                $('.btn-fd').html('')
            });
            $(".btn-fd").on("mouseenter",".btn-sheji,.btn-baojia",function(){
                $(this).parent().parent().parent("a").attr("href","javascript:void(0)");
                $(this).parent().parent().parent("a").attr("target","_self");
            });
             $(".btn-fd").on("mouseleave",".btn-sheji,.btn-baojia",function(){
                $(this).parent().parent().parent("a").attr("href",$(this).parent().parent().parent("a").attr("data-href") );
                $(this).parent().parent().parent("a").attr("target","_blank");
            });
             $(".item-mark ").click(function(event) {
                var url=$(this).attr("data-href");
                window.open(url);
            });
            /* E 分类选择 */

        });
    </script>
</body>
</html>