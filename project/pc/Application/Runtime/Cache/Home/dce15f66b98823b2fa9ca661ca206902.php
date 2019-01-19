<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <title>装修招标_免费装修设计与报价-<?php echo ($title); ?></title>
    <meta name="keywords" content="装修设计,室内装修设计,装修报价,装修报价单" />
    <meta name="description" content="齐装网是国内领先的专业的家装、公装项目招标平台,业主可以在齐装网免费发布装修招标,提供装修招标、免费装修设计与报价,免费为业主提供4份室内装修设计方案与报价,并免费获得多套装修设计与报价方案,让您装修省钱省力更省心！。" />
    <meta name="mobile-agent" content="format=html5;url=http://m.<?php echo C('QZ_YUMING');?>/zhaobiao/" />
    <link rel="canonical" href="http://<?php echo C('QZ_YUMINGWWW');?>/zhaobiao/"/>
    <link rel="Shortcut Icon" href="<?php echo ($static_host); ?>/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/all.css?v=<?php echo C('STATIC_VERSION');?>"/>
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/minimal/red.css?v=<?php echo C('STATIC_VERSION');?>" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public-new.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/window.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
    <!--S小贴士-->
    <link rel="stylesheet" href="/assets/home/about/css/swiper-3.3.1.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="/assets/common/css/xiaotieshi.css?v=<?php echo C('STATIC_VERSION');?>">
    <!--E小贴士-->
    <link rel="stylesheet" type="text/css" href="<?php echo ($static_host); ?>/assets/sub/company/css/animate.min.css?v=<?php echo C('STATIC_VERSION');?>" />
    <link rel="stylesheet" type="text/css" href="/assets/home/zb/css/newzb_p220.css?v=<?php echo C('STATIC_VERSION');?>" />
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/order.js?v=<?php echo C('ORDER_JS_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/hm.min.js?ver=1&md=<?php echo time();?>"></script>
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
                <!--<div class="daohxiugitem"><a href="http://jiaju.qizuang.com/" target="_blank"><span class="jjscdh"></span><span class="jjscdhms">家居商城</span></a></div>-->
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
     <div class="zb-bg1">
        <div class="wrap">
            <div id="tab1" class="zb-bg1-bg"></div>
            <div class="order-box validate">
                <h3>免费设计与报价</h3>
                <h2>免费获取<span class="cf53">4</span>套设计方案，装修立省<span class="cf53">30%</span></h2>
                <div class="box-line">
                  <select id="tab-cs" name="cs" class="edit-city">
                  </select>
                  <select id="tab-qx" name="qx" class="edit-city" style="float: right;">
                  </select>
                </div>
                <div class="box-line">
                  <input class="edit-text" name="name" type="text" placeholder="怎么称呼您">
                </div>
                <div class="box-line">
                  <input class="edit-text" type="text" name="tel" placeholder="输入手机号获取免费设计报价" maxlength="11">
                  <input type="hidden" name="fb_type" value="sheji">
                </div>
                <!--S-免责申明-->
                    <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                <!--E-免责申明-->
                <button id="btnSave" type="button">立即申请</button>
                <p>
                    <span style="line-height: 1.8">今日还剩<i class="cf53"><?php echo releaseCount('fbsyrs');?></i>个免费名额</span><br>
                    <span>累计帮助过<i class="cf53"><?php echo releaseCount('fbzrs');?></i>位业主</span>
                    <a href="http://<?php echo C('QZ_YUMINGWWW');?>/zxbj/" target="_blank">智能报价</a>
                </p>
            </div>
        </div>
    </div>
    <div class="wrap">
        <div class="common-title">
            <p class="main-title">0元上门量房</p>
            <p class="sub-title"><span>免费上门量房，全方位了解您的装修需求</span></p>
        </div>
        <div class="liangfang-img">
            <img src="/assets/home/zb/img/liangfang01.jpg">
            <i class="fuzhu-line line-1"></i>
            <img src="/assets/home/zb/img/liangfang02.jpg">
            <i class="fuzhu-line line-2"></i>
            <img src="/assets/home/zb/img/liangfang03.jpg" class="last_liangfang">
        </div>
    </div>
    <div class="sheji">
        <div class="wrap">
            <div class="common-title">
                <p class="main-title">0元获取4份设计方案</p>
                <p class="sub-title"><span>为您量身定制，4份设计任您挑选</span></p>
            </div>
            <div class="sheji-img">
                <img src="/assets/home/zb/img/shejifangan01.jpg">
                <img src="/assets/home/zb/img/shejifangan02.jpg">
                <img src="/assets/home/zb/img/shejifangan03.jpg">
                <img src="/assets/home/zb/img/shejifangan04.jpg">
            </div>
        </div>
    </div>
    <div class="wrap">
        <div class="common-title">
            <p class="main-title">准确计算装修预算</p>
            <p class="sub-title"><span>免费帮您估价，让您合理分配预算</span></p>
        </div>
        <div class="jisuan-img">
            <img src="/assets/home/zb/img/zongtibaojia.jpg">
            <img src="/assets/home/zb/img/kongjianzaojia.jpg">
            <img src="/assets/home/zb/img/xiangqingbaojia.jpg" class="last_liangfang">
        </div>
    </div>
    <div class="fuwu">
        <div class="wrap">
            <div class="common-title">
                <p class="main-title">齐装网的特色服务</p>
            </div>
            <div class="fuwu-main">
                <div class="fuwu-hd">
                    <span class="qz-company">齐装网</span><span class="duibi">对比项目</span><span class="other-company">传统装修公司</span>
                </div>
                <img src="/assets/home/zb/img/zhaungxiufuwu.jpg">
                <img src="/assets/home/zb/img/zhaungxiubaozhang.jpg">
                <img src="/assets/home/zb/img/zhaungxiugongsi.jpg">
                <img src="/assets/home/zb/img/zhaungxiuyusuan.jpg">
                <img src="/assets/home/zb/img/yezhufuwu.jpg">
            </div>
        </div>
    </div>
    <div class="wrap ofw">
        <div class="common-title">
            <p class="main-title">业主回馈信息</p>
        </div>
        <div class="scroll-list">
            <div class="zb-tit-font">
                <h3>新申请装修服务</h3>
                <p>当前已有<span style=" color:#ff5659"><?php echo releaseCount('fbrs');?></span>位业主申请定制设计服务</p><a href="#tab1">我也要申请</a>
            </div>
            <div class="zb-scroll-box">
                <ul class="newser">
                    <li class="tlist1">业主</li>
                    <li class="tlist1">面积</li>
                    <li class="tlist1">装修类型</li>
                    <li class="tlist1">装修风格</li>
                    <li class="tlist1">预算</li>
                    <li class="tlist1">发布时间</li>
                </ul>
                <div class="maquee">
                    <ul>
                      <?php if(is_array($zbInfo["orders"])): $i = 0; $__LIST__ = $zbInfo["orders"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                            <span class="tlist1"><?php echo ($vo["name"]); ?></span>
                            <span class="tlist1"><?php echo ($vo["mianji"]); ?>㎡</span>
                            <span class="tlist1"><?php echo ($vo["leixing"]); ?></span>
                            <span class="tlist1"><?php echo ($vo["fengge"]); ?></span>
                            <span class="tlist1"><?php echo ($vo["jiage"]); ?></span>
                            <span class="tlist1"><?php echo ($vo["time"]); ?></span>
                        </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                </div>
            </div>
        </div>
        <div class="user-mes">
            <div class="zb-tit-font">
                <h3>新业主点评</h3>
            </div>
            <div class="user-mes-box">
                <div class="user-mes-list j-tab-con">
                    <?php if(is_array($zbInfo['comment'])): $i = 0; $__LIST__ = $zbInfo['comment'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><div class="user-mes-item">
                            <div class="user-info">
                                <div class="user-head">
                                    <?php if($v['logo'] != ''): ?><img src="<?php echo ($v['logo']); ?>" alt="齐装网"/>
                                        <?php else: ?>
                                        <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo OP('DEFAULT_LOGO');?>" alt="齐装网"/><?php endif; ?>
                                </div>
                                <ul class="zb-star">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <p>
                                    <span><?php echo ($v['name']); ?></span><?php echo ($v['uptime']); ?>发布了
                                    <br> 评价：<?php echo ($v['jc']); ?>
                                </p>
                            </div>
                            <div class="user-messge"><?php echo (mbstr($v['text'],0,110)); ?></div>
                        </div><?php endforeach; endif; else: echo "" ;endif; ?>
                </div>
                <div class="line-x j-tab-nav">
                    <span class="current"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>

    <div class="baodao">
      <div class="wrap">
          <div class="news-tit">权威平台报道，齐装网-中国权威装修门户网站</div>
<div id="pic_list_1" class="scroll_horizontal">
    <div class="news-box">
        <ul class="news-list">
            <li>
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/sina-new.jpg">
                <span>齐装网CEO陈世超：技术搭建传统与互联网法的桥梁</span>
                <p>——<img src="<?php echo ($static_host); ?>/assets/home/zb/img/sina-logo.png">新浪房产</p>
            </li>
            <li>
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/tengxun-new.jpg">
                <span>齐装网CEO陈世超：未来家装O2O合作共赢是王道</span>
                <p>——<img src="<?php echo ($static_host); ?>/assets/home/zb/img/tengxun-logo.png">腾讯家居</p>
            </li>
            <li>
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/fenghuang-new.jpg">
                <span>互联网装修新模式让装修省心省事更省钱</span>
                <p>——<img src="<?php echo ($static_host); ?>/assets/home/zb/img/fenghuang-logo.png">凤凰家居</p>
            </li>
            <li>
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/pchouse-new.jpg">
                <span>齐装网,将家装O2O平台做到至臻</span>
                <p>——<img class="img-size" src="<?php echo ($static_host); ?>/assets/home/zb/img/pchouse-logo.png">太平洋家居</p>
            </li>
            <li>
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/dongbei-new.jpg">
                <span>齐装网：家装行业+O2O模式的发展前景</span>
                <p>——<img src="<?php echo ($static_host); ?>/assets/home/zb/img/dongbei-logo.png">东北新闻网</p>
            </li>
            <li>
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/mingtong-new2.jpg">
                <span>O2O行业进入容易存活难 齐装网凭什么存活</span>
                <p>——<img class="img-size" src="<?php echo ($static_host); ?>/assets/home/zb/img/mingtong-logo.png">明通新闻专线</p>
            </li>
            <li>
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/jiazhuang-new.jpg">
                <span>齐装网：家装行业+O2O模式的发展前景</span>
                <p>——<img class="img-size" src="<?php echo ($static_host); ?>/assets/home/zb/img/jiazhuang-logo.png">中国家装家居网</p>
            </li>
            <li>
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/minsheng-new.jpg">
                <span>齐装网,将家装O2O平台做到至臻</span>
                <p>——<img class="img-size" src="<?php echo ($static_host); ?>/assets/home/zb/img/minsheng-logo.png">中国民声网</p>
            </li>
            <li>
                <img src="<?php echo ($static_host); ?>/assets/home/zb/img/mingtong-new1.jpg">
                <span>齐装网：家装行业+O2O模式的发展前景</span>
                <p>——<img class="img-size" src="<?php echo ($static_host); ?>/assets/home/zb/img/mingtong-logo.png">明通新闻专线</p>
            </li>
        </ul>
    </div>
</div>
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

    <!-- 滚动用户的图片信息 S-->
    <div class="g-msg">
        <div class="msg msg1 animated fadeInUp">
            <img src="http://<?php echo C('QINIU_DOMAIN');?>/desLogo/201705/100.jpg" alt="">
            <span>来自杭州的李先生申请成功&nbsp;&nbsp;&nbsp;&nbsp;13秒前</span>
        </div>
    </div>
    <!-- 滚动用户的图片信息 E-->
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/icheck/icheck.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.cookie-min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/popwin.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/tooltips/jquery.pure.tooltips.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($cityfile); ?>"></script>
    <script type="text/javascript" src="/assets/home/about/js/swiper-3.3.1.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="/assets/home/zb/js/jquery.cxscroll.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/placeholder-color-fix.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript">
      var shen = null,shi = null;
      shen = citys["shen"];
      shi = citys["shi"];


    initCity('<?php echo ($theCityId); ?>');
    function initCity(cityId){
        App.citys.init("#tab-cs", "#tab-qx", shen, shi,cityId);
    }

    $(function() {
        $("#tab").rTabs({
            auto: true
        });
        $(".user-mes-box").rTabs({
            btnClass:'.j-tab-nav',  /*按钮的父级Class*/
            conClass:'.j-tab-con',  /*内容的父级Class*/
            speed:800,
            auto:true
        });
        setInterval('autoScroll(".maquee")', 500);

        $("#pic_list_1").cxScroll({
            auto: false
        });

        $(".zb-bg1 #btnSave").click(function(event) {
            var container = $(".zb-bg1 .order-box");
            var data = {
                name:$("[name=name]",container).val(),
                tel:$("[name=tel]",container).val(),
                fb_type:$("[name=fb_type]",container).val(),
                cs:$("[name=cs]",container).val(),
                qx:$("[name=qx]",container).val(),
                step:2,
                source:163
            }
            $(".focus", container).removeClass('focus');
            $(".height_auto", container).removeClass('height_auto');
            $(".valdate-info", container).remove();

            window.order({
                extra:data,
                error:function(){},
                success:function(data, status, xhr){
                    if(data.status == 1){
                        window._agl && window._agl.push(['track', ['success', {t: 3}]]);
                        $("body").append(data.data.tmp);
                        $('input[name="mianji"]').blur();// 让其失去焦点
                    } else {
                        alert(data.info);
                    }
                },
                validate:function(item, value, method, info){
                    if ('name' == item) {
                        $("[name=name]",container).parent().addClass('height_auto');
                        $("[name=name]",container).addClass('focus').focus();
                        var span = $("<span class='valdate-info'></span>");
                        span.html(info);
                        $("[name=name]",container).parent().append(span);
                        return false;
                    };
                    if ('tel' == item) {
                        $("[name=tel]",container).parent().addClass('height_auto');
                        $("[name=tel]",container).addClass('focus').focus();
                        var span = $("<span class='valdate-info'></span>");
                        span.html(info);
                        $("[name=tel]",container).parent().append(span);
                        return false;
                    };
                    if(!checkDisclamer(".zb-bg1")){
                        return false;
                    }
                    return true;
                }
            });
        });

        //光标自动定位
        $(".zb-bg1 .order-box input[name=name]").focus();

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