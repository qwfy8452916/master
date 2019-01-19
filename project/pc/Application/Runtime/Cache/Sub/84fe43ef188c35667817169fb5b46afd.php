<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="renderer" content="webkit" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
<title><?php echo ($header["title"]); ?></title>
<meta name="keywords" content="<?php echo ($header["keywords"]); ?>" />
<meta name="description" content="<?php echo ($header["description"]); ?>" />
<meta name="location" content="province=<?php echo ($cityInfo["province"]); ?>;city=<?php echo ($cityInfo["name"]); ?>;coord=<?php echo ($cityInfo["lng"]); ?>,<?php echo ($cityInfo["lat"]); ?>" />
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



<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/home/diary/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>" />
<link href="<?php echo ($static_host); ?>/assets/common/css/step.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="/assets/home/zixun/css/category.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="canonical" href="<?php echo ($header["canonical"]); ?>"/>
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
            <h1>
                <img class="logo-img1" src="/assets/common/pic/logo-new.jpg" alt="<?php echo ($cityInfo["name"]); ?>装修"/>
            </h1>
            <img class="logo-img2" src="/assets/common/pic/logo-fubiao.gif" width="146" alt="中国知名装修平台">
        </a>
        <div class="pub-head-nav">
            <ul class="nav">
                <?php if($cityInfo['bm'] != ''): ?><li><a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/" title="<?php echo ($cityInfo["name"]); ?>装修">首页</a></li>
                    <?php else: ?>
                    <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/" title="<?php echo ($cityInfo["name"]); ?>装修">首页</a></li><?php endif; ?>
                <?php if($cityInfo['bm'] != ''): ?><li><a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/zhaobiao/" rel="nofollow">设计与报价</a></li>
                    <?php else: ?>
                    <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/zhaobiao/" rel="nofollow">设计与报价</a></li><?php endif; ?>
                <li class="nav-list-meitu" data-pub="zxmt-nav"><a href="http://<?php echo C('MEITU_DONAMES');?>/">装修效果图<i class="fa fa-sort-desc"></i></a></li>
                <?php if($cityInfo['bm'] != ''): ?><li><a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/company/" title="<?php echo ($cityInfo["name"]); ?>装修公司">装修公司</a></li>
                    <?php else: ?>
                    <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/company/" title="<?php echo ($cityInfo["name"]); ?>装修公司">装修公司</a></li><?php endif; ?>
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

      <div class="wrap clearfix">
          <div class="bread">
              <a href="/"><?php echo ($cityinfo["name"]); ?>装修</a>&nbsp;&gt;&nbsp;
              <a href="/zxinfo/">装修资讯</a>&nbsp;&gt;&nbsp;
              <a href="javascript:void(0);" ><?php echo ($cate["name"]); ?></a>
            </div>
          <div class="fg_left">
              <div class="leftitemwk">
                  <div class="bigtitle">
                      <p>装修资讯</p>
                  </div>
                  <ul class="smalltitle">
                      <li><a <?php if(($cate["shortname"]) == "bendi"): ?>class="hotactive"<?php endif; ?> href="/zxinfo/bendi/">本地资讯</a></li>
                      <li><a <?php if(($cate["shortname"]) == "jingyan"): ?>class="hotactive"<?php endif; ?> href="/zxinfo/jingyan/">装修经验</a></li>
                      <li><a <?php if(($cate["shortname"]) == "daogou"): ?>class="hotactive"<?php endif; ?> href="/zxinfo/daogou/">建材导购</a></li>
                      <li><a <?php if(($cate["shortname"]) == "gongsi"): ?>class="hotactive"<?php endif; ?> href="/zxinfo/gongsi/">装修公司资讯</a></li>
                      <li><a <?php if(($cate["shortname"]) == "baojia"): ?>class="hotactive"<?php endif; ?> href="/zxinfo/baojia/">装修报价</a></li>
                      <li><a <?php if(($cate["shortname"]) == "xuetang"): ?>class="hotactive"<?php endif; ?> href="/zxinfo/xuetang/">装修学堂</a></li>
                      <li><a <?php if(($cate["shortname"]) == "wenwen"): ?>class="hotactive"<?php endif; ?> href="/zxinfo/wenwen/">装修问问</a></li>
                      <li><a <?php if(($cate["shortname"]) == "zxsj"): ?>class="hotactive"<?php endif; ?> href="/zxinfo/zxsj/">装修设计</a></li>
                  </ul>
              </div>

              <div class="mianfbaojia">
                  <div class="mianfbaojia_title">免费设计与报价</div>
                  <div class="fubiaoti">4套设计全面PK，让你的装修决不后悔</div>
                  <div class="fadanmid">
                      <div class="fadanmid_hang">
                          <select class="citycs" name="city" id="citycs"></select>
                          <select class="areadiqu" name="area" id="areadiqu"></select>
                      </div>
                      <div class="tishixx diqutishi"></div>
                      <div class="fadanmid_hang">
                          <input class="chenghumc" name="chenghumc" type="text" maxlength="10" placeholder="怎么称呼您">
                      </div>
                      <div class="tishixx nametishi"></div>
                      <div class="fadanmid_hang">
                          <input class="shoujihao" name="phone" type="text" maxlength="11" placeholder="输入手机号获取免费设计报价">
                      </div>
                      <div class="tishixx shoujitishi"></div>
                        <!--S-免责申明-->
                        <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                        <!--E-免责申明-->
                      <button class="lijisqniu">立即申请</button>
                      <div class="fdfoot">
                          <div class="lefcount">已有<span><?php echo ($fbrs); ?></span>位业主领取</div>
                          <a href="http://www.qizuang.com/zxbj/?source=18013029" target="_blank" class="rigzhineng">智能报价</a>
                      </div>
                  </div>
              </div>
              <div class="htocompany">
                  <div class="htocompany_title"><span class="gongsttlef">本月热门装修公司</span><a target="_blank" class="gongsttrig" href="http://<?php echo ($cityBm); ?>.<?php echo C('QZ_YUMING');?>/company/">更多>></a></div>
                  <ul class="sortcompany">
                      <?php if(is_array($leftCompanyList)): $i = 0; $__LIST__ = $leftCompanyList;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$val): $mod = ($i % 2 );++$i;?><li>
                          <a href="http://<?php echo ($cityBm); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($val["id"]); ?>/" target="_blank">
                            <div class="logoshow">
                                <img src="<?php echo ((isset($val["logo"]) && ($val["logo"] !== ""))?($val["logo"]):'http://'.C("QINIU_DOMAIN").'/'.OP("DEFAULT_COMPANY_LOGO")); ?>" alt="<?php echo ($val['qc']); ?>" >
                            </div>
                          </a>
                          <div class="gongname"><a href="http://<?php echo ($cityBm); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($val["id"]); ?>/" target="_blank" title="<?php echo ($val['qc']); ?>"><?php echo mbstr($val['qc'],0,17,'utf-8',false);?></a></div>
                          <div class="zhuanshiwk">
                              <img class="zhuanshi01" src="/assets/home/zixun/img/zhuanshi.png">
                              <img class="zhuanshi02" src="/assets/home/zixun/img/zhuanshi.png">
                          </div>
                      </li><?php endforeach; endif; else: echo "" ;endif; ?>
                  </ul>
              </div>
              <div class="hotanli">
                  <div class="hotanli_title">
                      <span class="anlilef">热门案例</span>
                      <a href="http://<?php echo ($jumpUrlBm); ?>.<?php echo C('QZ_YUMING');?>/xgt/" target="_blank" class="anlirit">更多>></a>
                  </div>
                  <ul class="anliulwk">
                      <?php if(is_array($cityCase)): $i = 0; $__LIST__ = $cityCase;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$val): $mod = ($i % 2 );++$i;?><li><a href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/caseinfo/<?php echo ($val["id"]); ?>.shtml" target="_blank"  rel="nofollow">
                             <div class="anlitupianwk">
                                 <?php if($val['img_host'] == 'qiniu' AND !empty($val['img'])): ?><img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($val["img_path"]); ?>">
                                 <?php elseif($val['img_host'] != 'qiniu' AND !empty($val['img'])): ?>
                                    <img src="http://<?php echo C('STATIC_HOST1');?>/<?php echo ($val["img_path"]); ?>s_<?php echo ($val["img"]); ?>">
                                 <?php else: ?>
                                    <img src="https://staticqn.qizuang.com/jjdg/2018/08/041613218a69d8956"><?php endif; ?>
                                 <div class="anlifootms" title="<?php echo ($val["title"]); ?>"><?php echo ($val["title"]); ?></div>
                             </div>
                          </a></li><?php endforeach; endif; else: echo "" ;endif; ?>
                  </ul>
              </div>
          </div>
          <div class="fg_right">
            <?php if(empty($articleList['articles'])): ?><div class="nojieguo">
                    <div class="nopicwk">
                        <img src="/assets/home/zixun/img/noshujv.png">
                        <p class="noshujvms">啊哦&nbsp&nbsp&nbsp小编正在努力更新文章哦</p>
                    </div>
                </div><?php endif; ?>

            <div class="itemwaik">
              <?php if(is_array($articleList["articles"])): $i = 0; $__LIST__ = $articleList["articles"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$val): $mod = ($i % 2 );++$i;?><div class="fg_right_item">
                      <div class="tuwenpic">
                          <?php if($articleList['nowpage']==1 && $key < 3): ?><div class="tuijianlg">推荐</div><?php endif; ?>
                          <a href="http://<?php echo ($cityBm); ?>.<?php echo C('QZ_YUMING');?>/zxinfo/<?php echo ($val["id"]); ?>.html" target="_blank" rel="nofollow">
                              <img src="<?php if(empty($val["face"])): echo ($val['img'][0]); else: echo ($val['face']); endif; ?>" alt="<?php echo ($val['title']); ?>">
                          </a>
                      </div>
                      <div class="tuwenmswk">
                          <p class="tuwen_title"><a href="http://<?php echo ($cityBm); ?>.<?php echo C('QZ_YUMING');?>/zxinfo/<?php echo ($val["id"]); ?>.html" target="_blank"><?php echo ($val['title']); ?></a></p>
                          <p class="tuwen_fubms"><?php echo mbstr(mytrim($val['description']),0,100,'utf-8',false);?></if><a href="http://<?php echo ($cityBm); ?>.<?php echo C('QZ_YUMING');?>/zxinfo/<?php echo ($val["id"]); ?>.html" target="_blank" rel="nofollow">...[详情]</a></p>
                          <div class="tuwen_bottom">
                              <div class="lookleft">
                                  <i class="fa fa-eye"></i><span class="yulanshu"><?php echo ($val["pv"]); ?></span>
                              </div>
                              <div class="time_right"><?php echo (date("Y-m-d H:i:s",$val["createtime"])); ?></div>
                          </div>
                      </div>
                   </div>
                <?php if(($key) == "4"): ?><!--广告-->
                   <div class="fg_right_item">
                      <div class="tuwenpic">
                        <a href="http://<?php echo ($cityBm); ?>.<?php echo C('QZ_YUMING');?>/company" target="_blank">
                            <img src="/assets/home/zixun/img/guanggaofengm.jpg">
                        </a>
                      </div>
                      <div class="tuwenmswk">
                          <p class="tuwen_title"><a href="http://<?php echo ($cityBm); ?>.<?php echo C('QZ_YUMING');?>/company/" target="_blank">找本地优质装修公司，预约属于自己的家</a></p>
                          <p class="tuwen_guanggaoms">齐装网汇集了本地装修公司排名大全，免费提供装修公司设计与报价，以及装修知识，免费拨打电话将直接转至装修公司，无额外收费...<a href="http://<?php echo ($cityBm); ?>.<?php echo C('QZ_YUMING');?>/company" target="_blank">[详情]</a></p>
                      </div>
                   </div><?php endif; endforeach; endif; else: echo "" ;endif; ?>
              <!--分页-->
              <div class="content pageContent">
                  <div class="pagebox">
                       <div class="page">
                           <?php echo ($articleList["page"]); ?>
                       </div>
                  </div>
              </div>
            </div>
          </div>
      </div>
      <!--发单成功提示框-->
    <iframe class="mask" src="about:blank" allowtransparency="true" marginheight="0" marginwidth="0" frameborder="0"></iframe>
    <div class="fd-success">
        <div class="close"></div>
        <div class="tjcgbt">
            <span class="chengglogo"></span>
            恭喜您提交成功！
        </div>
        <div class="tjcgbt2">
            还没结束呢！98%的业主还享受
        </div>
        <div class="erweima1">
            <div class="fd-tips">
                <p><i class="fa fa-circle"></i>随进了解装修进程</p>
                <p><i class="fa fa-circle"></i>美女设计师1对1对答</p>
                <p><i class="fa fa-circle"></i>“2房”变“3房”秘决</p>
                <p><i class="fa fa-circle"></i>实时装修报价动态</p>
                <p><i class="fa fa-circle"></i>装修案例抢先看</p>
            </div>
            <img class="weima" src="<?php echo ($wx_img); ?>" alt="<?php echo ($wx_title); ?>">
            <img class="meinvts" src="/assets/home/company/img/meinvsj.jpg">
        </div>
    </div>
    <?php echo ($freetel); ?>
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

</body>
<script type="text/javascript" src="/assets/common/js/placeholder-color-fix.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript">
    var shen = null,
        shi = null;
    shen = citys["shen"];
    shi = citys["shi"];

    $(function(){
        initCity('<?php echo ($theCityId); ?>');

        function initCity(cityId){
            App.citys.init(".citycs", ".areadiqu", shen, shi,cityId);
        }


        if( navigator.userAgent.indexOf("MSIE 8.0") > -1 ){
            $("input").on("keyup",function () {
                $(this).val($(this).val().replace(/\s+/g,""));
            });
        }else{
            $("input").on("input",function () {
                $(this).val( $(this).val().replace(/\s+/,"") );
            });
        }

        $("input[name='chenghumc']").on("keyup",function (event) {
            var value = $(this).val();
            var lastV = value.substring(value.length-1,value.length);
            var pattern = /[`~!@#$%^&*()_+=<>?:"{}|,.\/;'\\[\]·~！@#￥%&*（）+={}|《》？：“”【】、；‘’，。、]/im;
            var pattern1 = /[……——]/im;
            if(pattern.test(lastV)){
                $(this).val(value.slice(0,value.length-1));
            }
            if(pattern1.test(lastV)){
                $(this).val(value.slice(0,value.length-2));
            }
        });

       $("input[name='phone']").on("keyup",function (event) {
            $(this).val($(this).val().replace(/\D/g,""));
        });

       $('.fd-success .close').click(function(event) {
           $('.mask').fadeOut();
           $('.fd-success').fadeOut();
       });

       $('.fadanmid .lijisqniu').click(function(event) {
           var cityval = $('.fadanmid_hang select.citycs').val(),
               areaval = $('.fadanmid_hang select.areadiqu').val(),
               chenghumcval = $('.fadanmid_hang .chenghumc').val(),
               shoujihaoval = $('.fadanmid_hang .shoujihao').val(),
               regname=/^[\u4e00-\u9fa5_a-zA-Z]+$/;
               if(cityval=="" || areaval==""){
                   $('.diqutishi').html("请选择城市");
                   return false;
               }
               if(chenghumcval==""){
                 $('.tishixx').html("");
                 $('.fadanmid_hang .chenghumc').focus();
                 $('.nametishi').html("请输入用户名称");
                 return false;
               }else{
                  if(!regname.test(chenghumcval)){
                         $('.tishixx').html("");
                         $('.fadanmid_hang .chenghumc').val("");
                         $('.fadanmid_hang .chenghumc').focus();
                         $('.nametishi').html("请输入正确的姓名，只支持中文和英文 ^_^!");
                         return false;
                    }
               }
               if(shoujihaoval==""){
                 $('.tishixx').html("");
                 $('.fadanmid_hang .shoujihao').focus();
                 $('.shoujitishi').html("请输入手机号");
                 return false
               }else{
                 var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
                 var reg2 = new RegExp("^174|175[0-9]{8}$");
                 if(!reg.test(shoujihaoval)){
                     $('.tishixx').html("");
                     $('.fadanmid_hang .shoujihao').val("");
                     $('.fadanmid_hang .shoujihao').focus();
                     $('.shoujitishi').html("请输入正确的手机号");
                    return false;
                 }
                 if(reg2.test(shoujihaoval)){
                     $('.tishixx').html("");
                     $('.fadanmid_hang .shoujihao').val("");
                     $('.fadanmid_hang .shoujihao').focus();
                     $('.shoujitishi').html("请输入正确的手机号");
                    return false;
                 }
               }
               $('.tishixx').html("");
               if(!checkDisclamer(".fadanmid")){
                return false;
            }
             window.order({
                extra:{
                    name:$('.fadanmid_hang .chenghumc').val(),
                    tel:$('.fadanmid_hang .shoujihao').val(),
                    cs:$('.fadanmid_hang select.citycs').val(),
                    qx:$('.fadanmid_hang select.areadiqu').val(),
                    source:'<?php echo ($order_source); ?>'

                },
                success:function(data, status, xhr){
                    console.log(data);
                    if (data.status == 1) {
                        $('.fadanmid_hang input').val("");
                        $('.mask').fadeIn();
                        $('.fd-success').fadeIn();
                        $(".fadanmid").find("input").each(function (index, item) {
                            fixPlaceholder($(item));
                        });

                        $(".fdfoot .lefcount span").text(parseInt($(".fdfoot .lefcount span").text()) + 1);
                        localStorage.setItem("fdinfo",JSON.stringify({
                            size : $(".fdfoot .lefcount span").text(),
                            time : new Date()
                        }))
                    }
                },
                 error:function(){
                    alert("不知道哪里出错了")
                },
                validate:function(item, value, method, info){
                    return true;
                }
            });


       });

       var $fdNumBox = $(".fdfoot .lefcount span"),
            fdInfo = getStorage("fdinfo");
        if(fdInfo && fdInfo.size && fdInfo.time){
            if( checkTime(fdInfo.time) ){
                if( fdInfo.size > parseInt($fdNumBox.text()) ){
                    $fdNumBox.text(fdInfo.size);
                }
            }
        }
        function getStorage(storageName){
            if( !storageName || typeof storageName != "string"){
                return;
            }
            return localStorage.getItem(storageName) ? JSON.parse(localStorage.getItem(storageName)) : null;
        }
        function checkTime(t) {
            if( !isNaN(t) && isNaN(Date.parse(t)) ){
                return;
            }
            t = new Date(t);
            var date = new Date(),
                y = date.getFullYear(),
                m = date.getMonth()+1,
                d = date.getDate(),
                start = new Date(y+"/"+m+"/"+d+" 00:00:00"),
                end = new Date(y+"/"+m+"/"+d+" 23:59:59");
            return t.getTime() >= start.getTime() && t.getTime() <= end.getTime();
        }

    })

</script>

</html>