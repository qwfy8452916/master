<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta name="renderer" content="webkit" />
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <meta name="mobile-agent" content="format=html5;url=http://<?php echo C('MOBILE_DONAMES');?>/<?php echo ($cityInfo["bm"]); ?>/caseinfo/<?php echo ($caseInfo["case"]["now"]["id"]); ?>.shtml" />
    <title><?php echo ($keys["title"]); ?>-<?php echo ($title); ?>装修效果图</title>
    <meta name="keywords" content="<?php echo ($keys["keywords"]); ?>" />
    <meta name="description" content="<?php echo ($keys["description"]); ?>" />
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



    <link href="<?php echo ($static_host); ?>/assets/common/css/step.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo ($static_host); ?>/assets/home/meitu/css/meituinfo_p260.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="/assets/home/meitu/css/meitu-popover.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link rel="canonical" href="<?php echo ($info["canonical"]); ?>"/>
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/home/meitu/css/meituheader-pub.css?v=<?php echo C('STATIC_VERSION');?>" />
    <link rel="stylesheet" type="text/css" href="/assets/common/css/daohang20180712.css?v=<?php echo C('STATIC_VERSION');?>"/>

    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/alert.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.cookie-min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/home/meitu/js/meituinfo.js?v=<?php echo C('STATIC_VERSION');?>"></script>
</head>
<body>
<script type="text/javascript">
    function resize(){
        var h = $(".right-sider").height() + $('.wlmain').height();
        $(".meitu-wrap").height(h);
    }
    $(function() {
        window.onresize = function(){
            resize();
        }
        resize();
    });
</script>
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
                    $.ajax({
                        url: 'http://<?php echo C('QZ_YUMINGWWW');?>/loginout/',
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
            <img class="logo-img2" src="/assets/common/pic/logo-fubiao.gif" alt="中国知名装修平台">
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
                <li class="nav-list-more" data-pub="more-nav"><a href="">更多<i class="fa fa-sort-desc"></i></a></li>
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
                        <li  placeholder="视频学装修更简单" target="http://<?php echo C('QZ_YUMINGWWW');?>/video/jiangtang/">装修视频</li>
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
    <div class="pub-jisuanqi" style="width: 52px;height: 65px;position: absolute;right: 8px;top: 5px;">
        <a href="http://<?php echo C('QZ_YUMINGWWW');?>/zxbj/?source=18013005" target="_blank">
            <img width="50" height="39" src="/assets/common/img/zhinengbaojia.gif" alt="智能报价" />
        </a>
    </div>
</div>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
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





   /* var timer1 = null;
    $('.nav-list-meitu').mouseenter(function() {
        clearTimeout(timer1);
        $(this).addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','55px');
        $(this).siblings().removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
        $('.pub-nav-hover').show().attr('state','zxmt-nav').find('.zxmt-nav').show().siblings('.zxgl-nav').hide();
    });
    $('.nav-list-meitu').mouseleave(function() {
        clearTimeout(timer1)
        $(this).removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
        $(this).siblings().removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
        timer1 = setTimeout(function(){
            $('.pub-nav-hover').hide().removeAttr('state').find('.zxmt-nav').hide().siblings('.zxgl-nav').hide();
            clearTimeout(timer1);
        },200);
    });

    $('.nav-list-gonglue').mouseenter(function() {
        clearTimeout(timer1);
        $(this).addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','55px');
        $(this).siblings().removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
        $('.pub-nav-hover').show().attr('state','zxgl-nav').find('.zxgl-nav').show().siblings().hide();
    });
    $('.nav-list-gonglue').mouseleave(function() {
        clearTimeout(timer1);
        $(this).removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
        $(this).siblings().removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
        timer1 = setTimeout(function(){
            $('.pub-nav-hover').hide().removeAttr('state').find('.zxgl-nav').hide().siblings().hide();
            clearTimeout(timer1)
        },200);
    });
    $('.nav-list-more').mouseenter(function() {
        clearTimeout(timer1);
        $(this).addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','55px');
        $(this).siblings().removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
        $('.pub-nav-hover').show().attr('state','more-nav').find('.more-nav').show().siblings().hide();
    });
    $('.nav-list-more').mouseleave(function() {
        clearTimeout(timer1);
        $(this).removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
        $(this).siblings().removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
        timer1 = setTimeout(function(){
            $('.pub-nav-hover').hide().removeAttr('state').find('.more-nav').hide().siblings().hide();
            clearTimeout(timer1)
        },200);
    });
    $('.pub-nav-hover').mouseenter(function() {
        clearTimeout(timer1);
        $(this).show();
        if($(this).attr('state') == 'zxmt-nav'){
            $('.nav-list-meitu').addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','55px');
            $('.nav-list-gonglue').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
            $('.nav-list-more').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
            $(this).find('.zxmt-nav').show().siblings().hide();
        }else if($(this).attr('state') == 'zxgl-nav'){
            $('.nav-list-gonglue').addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','55px');
            $('.nav-list-meitu').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
            $('.nav-list-more').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
            $(this).find('.zxgl-nav').show().siblings().hide();
        }else if($(this).attr('state') == 'more-nav'){
            $('.nav-list-more').addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','55px');
            $('.nav-list-meitu').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
            $('.nav-list-gonglue').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
            $(this).find('.more-nav').show().siblings().hide();
        }
    });
    $('.pub-nav-hover').mouseleave(function() {
        $(this).removeAttr('state');
        $('.nav-list-meitu,.nav-list-gonglue,.nav-list-more').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
        $(this).hide().children().hide();;
    });*/





         var timer1 = null;
         var timer2 = null;
            $(".pub-head-nav li").mouseenter(function(event) {
                clearTimeout(timer2);
                clearTimeout(timer1);
                $(this).addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','56px');
                $(this).siblings().removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','47px');
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
                    that.removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','47px');
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
                    $('.nav-list-meitu').addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','56px');
                    $('.nav-list-gonglue').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','47px');
                    $('.nav-list-more').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','47px');
                    $(this).find('.zxmt-nav').show().siblings().hide();
                }else if($(this).attr('state') == 'zxgl-nav'){
                    $('.nav-list-gonglue').addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','56px');
                    $('.nav-list-meitu').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','47px');
                    $('.nav-list-more').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','47px');
                    $(this).find('.zxgl-nav').show().siblings().hide();
                }else if($(this).attr('state') == 'more-nav'){
                    $('.nav-list-more').addClass('on').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','56px');
                    $('.nav-list-meitu').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','47px');
                    $('.nav-list-gonglue').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','47px');
                    $(this).find('.more-nav').show().siblings().hide();
                }
            });
            $('.pub-nav-hover').mouseleave(function() {
                var that=$(this);

                timer2=setTimeout(function(){
                    that.removeAttr('state');
                $('.nav-list-meitu,.nav-list-gonglue,.nav-list-more').removeClass('on').find('i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','47px');
                    that.hide().children().hide();
                },500);
            });







    $('.pub-nav .nav li').hover(function() {
        $(this).find('a i').removeClass('fa-sort-desc').addClass('fa-sort-asc').css('line-height','55px');
    }, function() {
        $(this).find('a i').removeClass('fa-sort-asc').addClass('fa-sort-desc').css('line-height','45px');
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
</script>
<div class="meitu-bread">
    <dl>
        <dt class="bread-nav"><a href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_case/<?php echo ($caseInfo["case"]["now"]["uid"]); ?>/">全屋图集</a>
        </dt>
        <dd><i class="fa fa-angle-right"></i></dd>
        <dt>
            <a href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/caseinfo/<?php echo ($caseInfo["case"]["now"]["id"]); ?>.shtml" title="<?php echo ($caseInfo["case"]["now"]["title"]); ?>"><?php echo ($caseInfo["case"]["now"]["title"]); ?>图集</a>
        </dt>
        <dd style="margin-left:20px">发布时间：<?php echo (date('Y-m-d H:i:s',$caseInfo["case"]["now"]["time"])); ?></dd>
    </dl>
</div>
<div class="meitu-wrap">
    <div class="left-sider">
        <div class="comp mt10">
            <?php if(($caseInfo['case']['now']['uid'] != '') && ($caseInfo['case']['now']['qc'] != '')): ?><div class="company-name">
                    <div class="zx-company-img"><img src="<?php echo ($caseInfo["case"]["now"]["logo"]); ?>" alt="<?php echo ($caseInfo["case"]["now"]["qc"]); ?>"></div>
                    <!--<a href="/company_home/<?php echo ($caseInfo["case"]["now"]["uid"]); ?>" target="_blank"><?php echo (mbstr($caseInfo["case"]["now"]["qc"],0,12)); ?></a>-->
                    <a href="/company_home/<?php echo ($caseInfo["case"]["now"]["uid"]); ?>/" target="_blank"><?php echo ($caseInfo["case"]["now"]["qc"]); ?></a>
                </div>
                <p class="ico">
                    <?php if($caseInfo['case']['now']['on'] == 2 AND $caseInfo['case']['now']['fake'] == 0): ?><span title="该公司营业执照已认证"><i class="ico1 icon-tu"></i>已认证营业执照</span>
                        <span title="该公司有优惠"><i class="ico2 icon-tu"></i>优惠服务</span><?php endif; ?>
                    <span title="设计方案">
                        <a href="/company_case/<?php echo ($caseInfo["case"]["now"]["uid"]); ?>/" target="_blank">
                            <i class="ico3 icon-tu"></i>案例数：<?php echo ((isset($caseInfo["case"]["now"]["casecount"]) && ($caseInfo["case"]["now"]["casecount"] !== ""))?($caseInfo["case"]["now"]["casecount"]):0); ?>
                        </a>
                    </span>
                    <span title="设计师">
                        <a href="/company_team/<?php echo ($caseInfo["case"]["now"]["uid"]); ?>/" target="_blank">
                            <i class="ico4 icon-tu"></i>设计师：<?php echo ((isset($caseInfo["case"]["now"]["groupcount"]) && ($caseInfo["case"]["now"]["groupcount"] !== ""))?($caseInfo["case"]["now"]["groupcount"]):0); ?>
                        </a>
                    </span>
                    <span title="业主评价">
                        <a href="/company_message/<?php echo ($caseInfo["case"]["now"]["uid"]); ?>/" target="_blank">
                            <i class="ico5 icon-tu"></i>评价数：<?php echo ((isset($caseInfo["case"]["now"]["commentcount"]) && ($caseInfo["case"]["now"]["commentcount"] !== ""))?($caseInfo["case"]["now"]["commentcount"]):0); ?>
                        </a>
                    </span>
                </p>

                <a href="javascript:void(0)" id="btnsj" data-id="<?php echo ($caseInfo["case"]["now"]["uid"]); ?>" class="btn">帮我免费设计</a>
            <?php else: ?>
                <p class="no-owner">〒_〒亲，暂时无法提供该公司信息</p>

                <a href="javascript:void(0)" id="btnsj"  class="btn">帮我免费设计</a><?php endif; ?>
        </div>

        <div class="xgt-jsq">
            <div class="xgt-jsq-top">
                <div class="xgt-jsq-tit">8秒估算装修报价</div>
                <div class="xgt-jsq-fens">
                    <div class="input-select jisuanjg">
                        <span class="shuzi">109524</span>
                        <span class="danweiyuan">元</span>
                    </div>
                </div>
            </div>
            <ul class="zb-edit-list freeBaojia">
                <li><input type="text" name="mianji" placeholder="请输入房屋面积"><span>m²</span></li>
                <li>
                    <select id="meitu-bj-cs" class="half">
                        <option value="">城市</option>
                    </select>
                    <select id="meitu-bj-qy" class="half">
                        <option value="320586">其他</option>
                    </select>
                </li>
                <li><input type="text" name="name" placeholder="请输入您的称呼"></li>
                <li>
                    <input type="text" name="tel" placeholder="请输入您的手机号" maxlength="11">
                    <input type="hidden" name="fb_type" value="baojia">
                </li>
                <!--S-免责申明-->
                    <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                <!--E-免责申明-->
                <li><button type="submit" id="getBaoJia">马上提交看结果</button></li>
            </ul>
        </div>
        <div class="right-box mt20">
            <div class="right-tit">新标签</div>
            <ul class="bq-list oflow">
                <?php if(is_array($caseInfo["newTags"])): $i = 0; $__LIST__ = $caseInfo["newTags"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                        <a href="http://<?php echo C('MEITU_DONAMES');?>/tags/meitu<?php echo ($vo["id"]); ?>/" title="<?php echo ($vo["name"]); ?>" target="_blank"><?php echo ($vo["name"]); ?></a>
                    </li><?php endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>
    </div>
    <div class="right-sider">
        <div class="more-caozuo">
            <div class="fl-left" style="float: left;line-height: 56px;font-size: 26px;color: #333;"><h1><?php echo ($keys["title"]); ?></h1></div>
            <div class="f-right">
                <div class="zx-sj-bj">
                    <span id="getSJ">我要装修成这样</span>
                    <span id="getBJ">装修成这样花多少钱</span>
                </div>
                <div class="meitu-mark">
                    <?php if($caseInfo['collect']): ?><span data-id="<?php echo ($caseInfo["case"]["now"]["id"]); ?>" class="collect collect-bind" data-on="1"><i class="fa fa-star"></i></span>
                    <?php else: ?>
                        <span data-id="<?php echo ($caseInfo["case"]["now"]["id"]); ?>" class="collect" data-on="0"><i class="fa fa-star-o"></i> 收藏</span><?php endif; ?>
                </div>
                <div class="meitu-share">
                    <i class="share-alt">分享</i>
                    <div class="share-pop">
                        <ul class="bdsharebuttonbox" data-tag="share_1">
                            <li class="haoyou"><a data-cmd="weixin">&nbsp;&nbsp;微信好友</a></li>
                            <li class="qq"><a data-cmd="sqq">&nbsp;&nbsp;QQ好友</a></li>
                            <li class="weibo"><a data-cmd="tsina">&nbsp;&nbsp;微博</a></li>
                            <li class="qzone"><a data-cmd="qzone">&nbsp;&nbsp;QQ空间</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--主体内容-->
        <div class="main">
            <!--图片特效内容开始-->
            <div class="piccontext">
                <!--大图展示-->
                <div class="picshow">
                    <div class="picshowtop imgbox">
                        <?php if(is_array($caseInfo["case"]["now"]["child"])): $i = 0; $__LIST__ = $caseInfo["case"]["now"]["child"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a class="bigshow" href="#">
                                <?php if($vo['img_host'] == 'qiniu'): ?><img id="pic1" alt="<?php echo ($vo["title"]); echo ($caseInfo["case"]["now"]["fengge"]); ?>装修效果图实景图" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_path"]); ?>-s5.jpg"  />
                                    <?php else: ?>
                                    <img id="pic1" alt="<?php echo ($vo["title"]); echo ($caseInfo["case"]["now"]["fengge"]); ?>装修效果图实景图" src="http://<?php echo C('STATIC_HOST1'); echo ($vo["img_path"]); ?>m_<?php echo ($vo["img"]); ?>"  /><?php endif; ?>
                            </a><?php endforeach; endif; else: echo "" ;endif; ?>
                        <a id="preArrow" href="javascript:void(0)" class="contextDiv" title="上一张"><span id="preArrow_A"></span></a>
                        <a id="nextArrow" href="javascript:void(0)" class="contextDiv" title="下一张"><span id="nextArrow_A"></span></a>
                    </div>
                    <div class="picshowlist">
                        <!--上一个图集-->
                        <div class="picshowlist_left">
                            <div class="picleftimg">
                                <?php if($caseInfo['case']['prv'] != ''): ?><a href="/caseinfo/<?php echo ($caseInfo['case']['prv']['id']); ?>.shtml" title="<?php echo ($caseInfo['case']['prv']['title']); ?>" onclick="setCaseSelectParams();">
                                    <?php if($caseInfo['case']['prv']['child'][0]['img_host'] == 'qiniu'): ?><img alt="<?php echo ($caseInfo['case']['prv']['child'][0]['title']); ?>" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($caseInfo['case']['prv']['child'][0]['img_path']); ?>-w300.jpg"  />
                                        <?php else: ?>
                                        <img alt="<?php echo ($caseInfo['case']['prv']['child'][0]['title']); ?>" src="http://<?php echo C('STATIC_HOST1'); echo ($caseInfo['case']['prv']['child'][0]['img_path']); ?>s_<?php echo ($caseInfo['case']['prv']['child'][0]['img']); ?>"/><?php endif; ?>
                                    </a>
                                <?php else: ?> 没有了<?php endif; ?>
                            </div>
                        </div>
                        <div class="picshowlist_mid">
                            <div class="picmidleft">
                                <a href="javascript:void(0)" id="preArrow_B"><img src="<?php echo ($static_host); ?>/assets/home/meitu/img/left1.jpg" alt="上一个" /></a>
                            </div>
                            <div class="picmidmid">
                                <ul>
                                    <?php if(is_array($caseInfo["case"]["now"]["child"])): $i = 0; $__LIST__ = $caseInfo["case"]["now"]["child"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                                            <a href="javascript:void(0);">
                                                <?php if($vo['img_host'] == 'qiniu'): ?><img alt="<?php echo ($vo["title"]); ?>" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_path"]); ?>-w300.jpg"  bigimg="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_path"]); ?>-s5.jpg" curindex="<?php echo ($key); ?>" />
                                                    <?php else: ?>
                                                    <img alt="<?php echo ($vo["title"]); ?>" src="http://<?php echo C('STATIC_HOST1'); echo ($vo["img_path"]); ?>s_<?php echo ($vo["img"]); ?>"  bigimg="http://<?php echo C('STATIC_HOST1'); echo ($vo["img_path"]); ?>m_<?php echo ($vo["img"]); ?>" curindex="<?php echo ($key); ?>" /><?php endif; ?>
                                                <div class="mid-txt">
                                                    <?php echo ($key+1); ?>/<?php echo ($caseInfo["case"]["now"]["count"]); ?>
                                                </div>
                                            </a>

                                        </li><?php endforeach; endif; else: echo "" ;endif; ?>
                                </ul>
                            </div>
                            <div class="picmidright">
                                <a href="javascript:void(0)" id="nextArrow_B"><img src="<?php echo ($static_host); ?>/assets/home/meitu/img/right1.jpg" alt="下一个" /></a>
                            </div>
                        </div>
                        <!--下一个图集-->
                        <div class="picshowlist_right">
                            <div class="picleftimg">
                                <?php if($caseInfo['case']['next'] != ''): ?><a href="/caseinfo/<?php echo ($caseInfo['case']['next']['id']); ?>.shtml" title="<?php echo ($caseInfo['case']['next']['title']); ?>" onclick="setCaseSelectParams();">
                                        <?php if($caseInfo['case']['next']['child'][0]['img_host'] == 'qiniu'): ?><img alt="<?php echo ($caseInfo['case']['next']['child'][0]['title']); ?>" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($caseInfo['case']['next']['child'][0]['img_path']); ?>-w300.jpg" />
                                            <?php else: ?>
                                            <img alt="<?php echo ($caseInfo['case']['next']['child'][0]['title']); ?>" src="http://<?php echo C('STATIC_HOST1');?>/<?php echo ($caseInfo['case']['next']['child'][0]['img_path']); ?>s_<?php echo ($caseInfo['case']['next']['child'][0]['img']); ?>" /><?php endif; ?>
                                    </a>
                                    <?php else: ?> 没有了<?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
                <!--给搜索引擎看-->
                <div class="piclistshow">
                    <ul>
                        <?php if(is_array($caseInfo["case"]["now"]["child"])): $i = 0; $__LIST__ = $caseInfo["case"]["now"]["child"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                                <a href="javascript:void(0);">
                                    <?php if($vo['img_host'] == 'qiniu'): ?><img alt="<?php echo ($vo["title"]); echo ($caseInfo["case"]["now"]["fengge"]); ?>装修效果图实景图" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_path"]); ?>-s5.jpg"  curindex="<?php echo ($key); ?>" />
                                        <?php else: ?>
                                        <img alt="<?php echo ($vo["title"]); echo ($caseInfo["case"]["now"]["fengge"]); ?>装修效果图实景图" src="http://<?php echo C('STATIC_HOST1'); echo ($vo["img_path"]); ?>m_<?php echo ($vo["img"]); ?>"  curindex="<?php echo ($key); ?>" /><?php endif; ?>
                                </a>
                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <input id="safecode" type="hidden" value="<?php echo ($safecode); ?>" />
            <input id="safekey" type="hidden" value="<?php echo ($safekey); ?>" />
        </div>
        <div style="clear:both"></div>
        <input id="case_terminal_params" type="hidden" value='<?php echo ($params); ?>' />
        <?php echo OP('yycollect','yes');?>
        <script type="text/javascript">
            window._bd_share_config = {
                "common": {
                    "bdSnsKey": {},
                    "bdText": "<?php echo ($articleInfo["article"]["now"]["title"]); ?>",
                    "bdMini": "2",
                    "bdMiniList": false,
                    "bdStyle": "0",
                    "bdSize": "24"
                },
                "share": {}
            };
            with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];

            var shen, shi;
            shen = citys["shen"];
            shi = citys["shi"];
            var ip_cityid = '<?php echo (cookie('iplookup')); ?>';
            var city_id = '<?php echo ($theCityId); ?>';
            (city_id == '') ? cityId = ip_cityid : cityId = city_id;
            if(cityId == ''){
                getLocation();
            }else{
                initCity(cityId);
            }
            function initCity(cityId){
                App.citys.init(".freesj_cs",".freesj_qx",shen,shi);
                App.citys.init("#meitu-sj-cs","#meitu-sj-qy",shen,shi,cityId);
                App.citys.init("#meitu-bj-cs","#meitu-bj-qy",shen,shi,cityId);
            }
            $(function() {
                $("#getSJ").click(function(event) {
                    var _this = $(this);
                    $.ajax({
                        url: '/dispatcher/',
                        type: 'POST',
                        dataType: 'JSON',
                        data: {
                            type: "sj",
                            source: 184,
                            action: "load",
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

                $("#getBJ").click(function(event) {
                    var _this = $(this);
                    $.ajax({
                        url: '/dispatcher/',
                        type: 'POST',
                        dataType: 'JSON',
                        data: {
                            type:"bj",
                            source: 184,
                            action:"load"
                        }
                    })
                    .done(function(data) {
                        if (data.status == 1) {
                            $("body").append(data.data);
                            // $(".zxfb").show();
                            $(".zxfb").fadeIn(400,function(){
                                $(this).find("input[name='bj-xiaoqu']").focus();
                            });
                            $(".zxbj_content").removeClass('smaller');
                        }
                    });
                });



                var timer = null;
                $('.share-alt').on( "mouseenter",function(){
                    clearTimeout(timer);
                    $(this).siblings('.share-pop').show();
                });

                $('.share-alt').on( "mouseleave",function(){
                    clearTimeout(timer);
                    var _this = $(this);
                    timer = setTimeout(function(){
                        _this.siblings('.share-pop').hide();
                    },300);
                });

                $('.share-pop').on( "mouseenter",function(){
                    clearTimeout(timer);
                    $(this).show();
                });
                $('.share-pop').on( "mouseleave",function(){
                    clearTimeout(timer);
                    $(this).hide();
                });
                setInterval(function(){
                    var aa=parseInt(Math.random() * 90000+ 30000);
                    $('.shuzi').html(aa);

                },300);
                // 侧边报价
                $("#getBaoJia").click(function(event) {
                    if (!App.validate.run($("input[name=mianji]").val())) {
                        $("input[name=mianji]").addClass('focus').focus();
                        alert("请填写房屋面积");
                        return false;
                    }
                    if (!App.validate.run($("input[name=mianji]").val(), "num")) {
                        $("input[name=mianji]").addClass('focus').focus();
                        alert("无效的房屋面积");
                        return false;
                    }
                    if ($(".freeBaojia input[name=name]").val() == "") {
                        alert("请填写您的称呼噢 ^_^!");
                        $(".freeBaojia input[name=name]").addClass('fal').focus();
                        return false;
                    }
                    $(".freeBaojia input[name=name]").removeClass('fal');

                    var tel = $(".freeBaojia input[name=tel]").val();
                    if (tel == "" || tel.length == 0) {
                        alert("亲,您还没有填写手机号码!");
                        $(".freeBaojia input[name=tel]").addClass('fal').focus();
                        return false;
                    }

                    var reg = /^[0-9]{7}|[0-9]{8}|[0-9]{11}$/gi;
                    if (!$(".freeBaojia input[name=tel]").val().match(reg)) {
                        alert("请填写7位或11位纯数字的联系电话 ^_^!");
                        $(".freeBaojia input[name=tel]").addClass('fal').focus();
                        return false;
                    }

                    $(".freeBaojia input[name=tel]").removeClass('fal');

                    if ($("#meitu-bj-cs").val() == '') {
                        alert("您还没有选择所在城市噢 ^_^!");
                        $("#meitu-bj-cs").addClass('fal').focus();
                        return false;
                    }
                    $("#meitu-bj-cs").removeClass('fal');

                    if ($("#meitu-bj-qy").val() == '') {
                        alert("您还没有选择所在区域噢 ^_^!");
                        $("#meitu-bj-qy").addClass('fal').focus();
                        return false;
                    }

                    if(!checkDisclamer(".xgt-jsq")){
                        return false;
                    }
                    $("#meitu-bj-qy").removeClass('fal');

                    var data = {
                        name:$(".freeBaojia input[name=name]").val(),
                        tel:$(".freeBaojia input[name=tel]").val(),
                        fb_type:$(".freeBaojia input[name=fb_type]").val(),
                        mianji:$(".freeBaojia input[name=mianji]").val(),
                        cs:$("#meitu-bj-cs").val(),
                        qx:$("#meitu-bj-qy").val(),
                        source: '174'
                    };

                    window.order({
                        extra:data,
                        error:function(){
                            alert('发布失败,请刷新页面！');
                        },
                        success:function(data, status, xhr){
                            if (data.status == 1) {
                                $.ajax({
                                    url: '/bjdata/',
                                    type: 'POST',
                                    dataType: 'JSON',
                                    data:{
                                        ssid:""
                                    }
                                })
                                .done(function(data) {
                                    if(data.status == 1){
                                        $(".xgt-jsq-fens-main p").text(Math.round((data.data.allTotal /10000) * 100) / 100);
                                        $(".freeBaojia").html('<div class="bjresult"><p>* 本价格为毛坯房半包估算价格（不包水电报价），旧房价格由实际工程量决定。</p>* 稍后客服将致电您，为您提供免费装修咨询服务。<p class="center"><img src="<?php echo ($static_host); ?>/assets/common/img/DY-ewm.png" /></p><p class="center">扫“码”上有惊喜！</p><p class="center">关注齐装网官方微信号，体验“微装修”服务</p></div>');
                                    }else{
                                        alert(data.info);
                                    }
                                })
                                .fail(function(xhr) {
                                    alert('获取报价失败,请稍后再试！');
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

                $("input[name='name']").focus();
                $(".allsend a").click(function(event) {
                    var _this = $(this);
                    var index = $(this).attr("data-index");
                    var id = "<?php echo ($caseInfo["id"]); ?>";
                    $.ajax({
                            url: '/getComment',
                            type: 'POST',
                            dataType: 'JSON',
                            data: {
                                index: index,
                                id: id
                            }
                        })
                        .done(function(data) {
                            if (data.status == 1) {
                                $(".plcontent").append($(data.data.tmp));
                                _this.attr("data-index", data.data.index);
                                if (data.data.show == false) {
                                    $(".allsend").hide();

                                }
                                _this.attr("data-index", data.data.index);
                            }
                        })
                        .fail(function(xhr) {
                            $.pt({
                                target: _this,
                                content: "获取失败,请稍后再试",
                                width: 'auto'
                            });
                        });
                });
                $(".t1").bind("input propertychange", function() {
                    $(".send .error").html("");
                    var length = $(this).val().length;
                    if (length > 200) {
                        $(".send .info i").html(200);
                        var offset = length - 200;
                        $(".send .error").html("您已经超出了 " + offset + " 字");
                    } else {
                        $(".send .info i").html(200 - length);
                    }
                });

                $(".verify").click(function(event) {
                    $(this).find("img").attr("src", "/verify?rand=" + Math.random());
                });

                $("#btnComment").click(function(event) {
                    $(".send .error").html("");
                    var _this = $(this);
                    if ($(".t1").val() == "") {
                        $.pt({
                            target: _this,
                            content: "亲,您怎么着的也得说点什么吧！",
                            width: 'auto'
                        });
                        return false;
                    }
                    if ($(".t1").val().length > 200) {
                        $.pt({
                            target: _this,
                            content: "亲,你写的太多了,少点吧！",
                            width: 'auto'
                        });
                        return false;
                    }
                    if ($("input[name=verifyCode]").val() == "") {
                        $.pt({
                            target: _this,
                            content: "请输入验证码",
                            width: 'auto'
                        });
                        return false;
                    }

                    $.ajax({
                            url: '/casecomment',
                            type: 'POST',
                            dataType: 'JSON',
                            data: {
                                id: "<?php echo ($caseInfo["id"]); ?>",
                                content: $(".t1").val(),
                                code: $("input[name=verifyCode]").val()
                            },
                        })
                        .done(function(data) {
                            if (data.status == 1) {
                                // $(".plcontent").html($(data.data.tmp));
                                $(".textinput input,.textinput textarea").val("");
                                $(".textinput .send").find("img").attr("src", "/verify?rand=" + Math.random())
                            }
                            $.pt({
                                target: _this,
                                content: data.info,
                                width: 'auto'
                            });

                        })
                        .fail(function(xhr) {
                            $.pt({
                                target: _this,
                                content: "提交失败,请稍后再试！",
                                width: 'auto'
                            });
                        });
                });

                $("#btnsj").click(function(event) {
                    var cid = $(this).attr("data-id");
                    $.ajax({
                            url: '/dispatcher/',
                            type: 'POST',
                            dataType: 'JSON',
                            data: {
                                type: "sj",
                                action: "load",
                                cs: "<?php echo ($cityInfo["id"]); ?>",
                                source:'158',
                                select_comid : '<?php echo ($caseInfo["case"]["now"]["uid"]); ?>',
                                display_type : '1',
                                cid: cid
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
            });
        </script>
        <?php if(!isset($_SESSION['u_userInfo'])): ?><script type="text/javascript">
            $(".collect").click(function(event) {
                var _this = $(this);
                $.ajax({
                    url: '/login/',
                    type: 'POST',
                    dataType: 'JSON',
                    timeOut:3000,
                    data:{
                        ssid:"<?php echo ($ssid); ?>"
                    }
                })
                .done(function(data) {
                    if(data.status == 1){
                        $("body").append(data.data);
                        $(".win_login").fadeIn(400);
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
        </script>
        <?php elseif(isset($_SESSION['u_userInfo']) AND $_SESSION['u_userInfo']['classid'] != 3 AND !$caseInfo['collect']): ?>
            <script type="text/javascript">
            $(".collect").click(function(event) {
                var id = $(this).attr("data-id");
                var _this = $(this);
                if(_this.attr("data-on") == 1){
                    return false;
                }
                $.ajax({
                    url: '/collect/',
                    type: 'POST',
                    dataType: 'JSON',
                    data:{
                        classtype:"2",
                        classid:id,
                        ssid:"<?php echo ($ssid); ?>"
                    }
                })
                .done(function(data) {
                    if(data.status == 1){
                        _this.attr("data-on",1).addClass('collect-bind').html("已收藏").Alert({
                            css:{
                                "width":"200px",
                                "height":"60px",
                                "background":"#E76363",
                                "margin-left":"-100px",
                                "margin-top":"-30px",
                                "font-size":"20px",
                                "line-height":"60px"
                            },
                            text:"收藏成功 +1"
                        });
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
        </script><?php endif; ?>
    </div>
</div>
</body>
</html>