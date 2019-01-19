<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <title>法律声明-<?php echo ($title); ?></title>
    <meta name="keywords" content="法律声明" />
    <meta name="description" content="法律声明" />
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

    <link href="<?php echo ($static_host); ?>/assets/home/about/css/default.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
</head>

<body>
    <link rel="stylesheet" type="text/css" href="/assets/common/css/tanchuang.css?v=<?php echo C('STATIC_VERSION');?>"/>
<link rel="stylesheet" type="text/css" href="/assets/common/css/daohang20180712.css?v=<?php echo C('STATIC_VERSION');?>"/>
<!--[if lte IE 8]>
    <link rel="stylesheet" type="text/css" href="/assets/home/ie/forie.css?v=<?php echo C('STATIC_VERSION');?>"/>
<![endif]-->
<!--[if lte IE 9]>
    <link rel="stylesheet" type="text/css" href="/assets/home/ie/forie.css?v=<?php echo C('STATIC_VERSION');?>"/>
<![endif]-->
<?php if($topbanner != null): ?><div class="header-top-img">
     <a target="_blank" href="<?php echo ($topbanner["url"]); ?>" rel="nofollow"><img class="header-top-pic" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($topbanner["img_url"]); ?>" alt="<?php echo ($topbanner["title"]); ?>"></a>
    <div class="top-close"><img src="/assets/home/index/img/shanchu.png"></div>
</div><?php endif; ?>
<div class="pub-top">
    <div class="wrap">
        <div class="city">
            <strong><a href="http://<?php echo C('QZ_YUMINGWWW');?>/" rel="nofollow">全国</a></strong>
            <div class="pub-city">
                <a class="city-link" href="http://<?php echo C('QZ_YUMINGWWW');?>/city/" rel="nofollow">[切换]</a>
                <span class="pull-left separator"></span>
                <span class="pull-left">快速进入</span>
                <i class="fa fa-angle-right"></i>
                <a class="quick-link f-red" href="http://<?php echo json_decode(cookie('QZ_CITY'),true)['bm'];?>.<?php echo C('QZ_YUMING');?>/" rel="nofollow" target="_blank" ><?php echo json_decode(cookie('QZ_CITY'),true)["cname"];?></a>
            </div>
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
                        url: '/loginout/',
                        type: 'GET',
                        dataType: 'JSON',
                        data: {
                          ssid:"<?php echo ($ssid); ?>"
                        }
                    })
                    .done(function(data) {
                        if(data.status == 1){
                            window.location.href = window.location.href;
                        }else{
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
            <li><a class="active" href="http://<?php echo C('QZ_YUMINGWWW');?>/zhaobiao/" rel="nofollow">我要装修</a></li>
            <li class="guanzhuli"><a href="javascript:void(0);" rel="nofollow"><span class="guanzhupic"></span><span>关注有礼</span><div class="erweimawk"><img src="/assets/common/img/topyouhuama.png" alt="关注有礼二维码"><div class="guanzhums">关注微信</div><div class="guanzhums">随身看攻略</div></div></a></li>
            <li class="header-last-li">全国统一服务热线：<span class="menu-telnum"><?php echo OP("QZ_CONTACT_TEL400");?></span></li>
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
                <li class="nav-list-meitu" data-pub="zxmt-nav"><a href="http://<?php echo C('MEITU_DONAMES');?>/" >装修效果图<i class="fa fa-sort-desc"></i></a></li>
                <?php if($cityInfo['bm'] != ''): ?><li><a href="http://<?php echo ($cityInfo['bm']); ?>.<?php echo C('QZ_YUMING');?>/company/">装修公司</a></li>
                    <?php else: ?>
                    <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/company/">装修公司</a></li><?php endif; ?>
                <li class="nav-list-gonglue" data-pub="zxgl-nav" ><a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/">装修攻略<i class="fa fa-sort-desc"></i></a></li>
                <li class="nav-list-more" data-pub="more-nav"><a>更多<i class="fa fa-sort-desc"></i></a></li>
                <li class="search-box"><a><img src="/assets/common/pic/sousuo.png"></a>
                </li>
            </ul>
        </div>
        <div class="pub-search">
            <div class="search-nav">
                <?php if($serch_uri == 'meitu' ): ?><form class="search-form" method="GET" action="http://meitu.<?php echo C('QZ_YUMING');?>/list/">
                <?php else: ?>
                <form class="search-form" method="GET" action="http://<?php echo C('QZ_YUMINGWWW');?>/<?php echo ($serch_uri); ?>/"><?php endif; ?>
                    <?php if($serch_uri == 'meitu' ): ?><div class="first-search" placeholder="<?php echo ($holdercontent); ?>" target="http://meitu.<?php echo C('QZ_YUMING');?>/list"><?php echo ($serch_type); ?><i class="fa  fa-sort-desc"></i></div>
                    <?php else: ?>
                    <div class="first-search" placeholder="<?php echo ($holdercontent); ?>" target="http://<?php echo C('QZ_YUMINGWWW');?>/<?php echo ($serch_uri); ?>/"><?php echo ($serch_type); ?><i class="fa  fa-sort-desc"></i></div><?php endif; ?>
                    <ul>
                        <li  placeholder="全国超过十万家装修公司为您免费设计" target="http://<?php echo C('QZ_YUMINGWWW');?>/companysearch/">装修公司</li>
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
                <div class="daohxiugitem"><a href="http://jiaju.qizuang.com/" target="_blank"><span class="jjscdh"></span><span class="jjscdhms">家居商城</span></a></div>
            </div>
        </div>
    </div>
    <div class="pub-jisuanqi" style="width: 72px;height: 65px;position: absolute;right: 8px;top: 12px;">
        <a href="http://<?php echo C('QZ_YUMINGWWW');?>/zxbj/?source=18013034" target="_blank" rel="nofollow">
            <img width="72" height="56" src="/assets/common/img/zhinengbaojia.gif" alt="智能报价" />
        </a>
    </div>
</div>
<div class="pub-head-empty"></div>

<script type="text/javascript" src="/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
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
    //顶部广告
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
    <div class="wrap oflow">
        <div class="bread">
          <a href="/">首页</a>>关于我们
        </div>
        <div class="aboutnav">
  <ul>
    <li><a href="/about/about">公司简介</a></li>
    <li><a href="/about/contactus">联系我们</a></li>
    <li><a href="/about/zhaopin">诚聘英才</a></li>
    <li><a href="/about/culture">企业文化</a></li>
    <li><a href="/about/team">员工风采</a></li>
    <li><a href="/about/fengcai">企业风采</a></li>
    <li><a href="/about/media">媒体报道</a></li>
    <li><a href="/about/legal">法律声明</a></li>
    <li ><a href="/about/liansuo">战略合作</a></li>
    <li ><a href="/about/disclamer">免责申明</a></li>
  </ul>
</div>
<script type="text/javascript">
$(".aboutnav li").removeClass('active').eq(<?php echo ($navIndex); ?>).addClass('active');
</script>
        <div class="aboutmain">
            <div class="abouttit">免责申明<span>Disclaimer</span></div>
            <p style="text-indent: 2em">尊敬的用户：</p>
            <p style="text-indent: 2em">齐装网提醒您：在使用齐装网各项服务前，请您务必仔细阅读并透彻理解本声明。您可以选择不使用齐装网装修平台服务，但如果您使用齐装网平台服务，您的使用行为将被视为对本声明全部内容的认可。“齐装网”指由苏州云网通信息科技有限公司运营的网络装修平台，域名为www.qizuang.com（m.qizuang.com）。</p>
            <p style="text-indent: 2em">一、特此说明</p>
            <p style="text-indent: 2em">1、齐装网将严格保障用户隐私权，对用户的个人信息严格保密，未经用户同意不得向他人泄露，但法律另有规定除外，用户自愿注册个人信息，基于用户的自愿性，用户有权在任何时候拒绝提供自身基本信息。</p>
            <p style="text-indent: 2em">2、注册个人信息的用户默认同意齐装网对这些信息善意利用，并且用户明确同意使用齐装网网络服务所存在的风险将由用户自己承担。</p>
            <p style="text-indent: 2em">3、在本网站发布招标任务、设计案例，其版权均归原作者所有，内容必须真实合法，本网站不负任何责任。</p>
            <p style="text-indent: 2em">4、其他任何媒体、网站或个人从本网下载使用，须自负版权等法律责任，本网站不负任何责任。<p></p></p>
            <p style="text-indent: 2em">5、任何由于黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营的不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等，齐装网均得免责。</p>
            <p style="text-indent: 2em">二、免责申明</p>
            <p style="text-indent: 2em">齐装网作为独立的第三方，提供网络平台，对于齐装网推荐的装修公司与您签订的装修合同行为，是您与该装修公司的自主行为，与本网站没有关系。齐装网只起到引导、见证、监督和调解作用，因此对于工程质量、纠纷以及您与装修公司之间的其他任何问题不承担包括但不限于担保、赔偿在内的任何责任。
            注：齐装网之免责声明以及其修改权、更新权及最终解释权均属苏州云网通信息科技有限公司所有。</p>


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

</body>

</html>