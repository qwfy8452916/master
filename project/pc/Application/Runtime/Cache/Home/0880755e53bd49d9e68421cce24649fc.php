<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <meta name="mobile-agent" content="format=html5;url=http://<?php echo C('MOBILE_DONAMES');?>/company/" />
    <link href="http://<?php echo C('QZ_YUMINGWWW');?>/company/" rel="canonical" />
    <title><?php echo ($keys["title"]); ?>-<?php echo ($title); ?></title>
    <meta name="keywords" content="<?php echo ($keys["keywords"]); ?>" />
    <meta name="description" content="<?php echo ($keys["description"]); ?>" />
    <?php if($keyword != ''): ?><meta name="robots" content="noindex,follow"/><?php endif; ?>
    <?php if(!empty($info["header"]["canonical"])): ?><link rel="canonical" href="<?php echo ($info["header"]["canonical"]); ?>"/><?php endif; ?>
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

    <link href="<?php echo ($static_host); ?>/assets/home/company/css/company-list.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo ($static_host); ?>/assets/common/css/step.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo ($static_host); ?>/assets/home/company/css/company-foot.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
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
<div class="company-top">
    <div class="wrap top-banner">
        <img src="<?php echo ($static_host); ?>/assets/home/company/img/company-banner.png?v201712160931">
    </div>
</div>
<div class="wrap ofw company-content">
    <div class="new-box-l">
        <div class="company-trust">
            <div class="trust-top">
                <div class="trust-title fl">装修公司信赖榜</div>
                <div class="check-city fr"><?php if($info['city'] != ''): ?><a href="http://<?php echo ($info["city"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company/" target="_blank" rel="nofollow">查看<span><?php echo ($info["city"]["cname"]); ?></span>装修公司 ></a><?php endif; ?>
                </div>
            </div>
            <ul class="trust-list">
                <?php if(is_array($info["trust"])): $i = 0; $__LIST__ = $info["trust"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li>
                    <div class="trust-num"></div>
                    <div class="trust-item">
                        <div class="item-company">
                            <?php if($v['url'] == '' AND $v['company_id'] != 0 ): ?><a href="http://<?php echo ($v["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($v["company_id"]); ?>/" target="_blank" rel="nofollow">
                                    <?php if($v['img_url'] == '' ): ?><img alt="<?php echo ($v["qc"]); ?>" data-imgurl='<?php echo ($v["img_url"]); ?>' width="126" height="63"  src="http://<?php echo C('QINIU_DOMAIN');?>/Public/default/images/default_logo.png" >
                                    <?php else: ?>
                                        <img alt="<?php echo ($v["qc"]); ?>" data-imgurl='<?php echo ($v["img_url"]); ?>' width="126" height="63"  src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($v["img_url"]); ?>" ><?php endif; ?>
                                </a>
                            <?php elseif($v['url'] != '' AND $v['company_id'] != 0 ): ?>
                                <a href="<?php echo ($v["url"]); ?>" target="_blank" rel="nofollow">
                                    <?php if($v['img_url'] == '' ): ?><img alt="<?php echo ($v["qc"]); ?>" data-imgurl='<?php echo ($v["img_url"]); ?>' width="126" height="63"  src="http://<?php echo C('QINIU_DOMAIN');?>/Public/default/images/default_logo.png" >
                                    <?php else: ?>
                                        <img alt="<?php echo ($v["qc"]); ?>" data-imgurl='<?php echo ($v["img_url"]); ?>' width="126" height="63"  src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($v["img_url"]); ?>" ><?php endif; ?>
                                </a>
                            <?php elseif($v['url'] != '' AND $v['company_id'] == 0 ): ?>
                                <a href="<?php echo ($v["url"]); ?>" target="_blank" rel="nofollow">
                                    <?php if($v['img_url'] == '' ): ?><img alt="<?php echo ($v["qc"]); ?>" data-imgurl='<?php echo ($v["img_url"]); ?>' width="126" height="63"  src="http://<?php echo C('QINIU_DOMAIN');?>/Public/default/images/default_logo.png" >
                                    <?php else: ?>
                                        <img alt="<?php echo ($v["qc"]); ?>" data-imgurl='<?php echo ($v["img_url"]); ?>' width="126" height="63"  src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($v["img_url"]); ?>" ><?php endif; ?>
                                </a>
                            <?php else: ?>
                                <?php if($v['img_url'] == '' ): ?><img alt="<?php echo ($v["qc"]); ?>" data-imgurl='<?php echo ($v["img_url"]); ?>' width="126" height="63"  src="http://<?php echo C('QINIU_DOMAIN');?>/Public/default/images/default_logo.png" >
                                <?php else: ?>
                                    <img alt="<?php echo ($v["qc"]); ?>" data-imgurl='<?php echo ($v["img_url"]); ?>' width="126" height="63"  src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($v["img_url"]); ?>" ><?php endif; endif; ?>
                        </div>
                        <div class="company-btn">
                            <p class="company-name">
                                <?php if($v['url'] == '' AND $v['company_id'] != 0 ): ?><a href="http://<?php echo ($v["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($v["company_id"]); ?>/" rel="nofollow"><?php echo (mbstr($v["title"],0,16)); ?></a>
                                <?php elseif($v['url'] != '' AND $v['company_id'] != 0 ): ?>
                                    <a href="<?php echo ($v["url"]); ?>" rel="nofollow"><?php echo (mbstr($v["title"],0,16)); ?></a>
                                <?php elseif($v['url'] != '' AND $v['company_id'] == 0 ): ?>
                                    <a href="<?php echo ($v["url"]); ?>" rel="nofollow"><?php echo (mbstr($v["title"],0,16)); ?></a>
                                <?php else: ?>
                                    <?php echo (mbstr($v["title"],0,16)); endif; ?>
                            </p>
                        </div>
                    </div>
                </li><?php endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>
        <div class="company-rank">
            <div class="company-rank-popul fl">
                <div class="company-rank-top">
                    <div class="top-title"><span>全国装修公司口碑排行榜</span></div>
                    <div class="top-explain">
                        <span class="fl">排行</span>
                        <span class="fr">口碑值</span>
                    </div>
                </div>
                <div class="company-rank-content">
                    <ul class="rank-list">
                        <?php if(is_array($info["koubei"])): $k = 0; $__LIST__ = $info["koubei"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($k % 2 );++$k;?><li <?php if($k == '1'): ?>class="rank-active"<?php endif; ?>>
                            <div class="company-head">
                                <div class="fl">
                                    <span class="rank-num"><?php echo ($k); ?></span>
                                    <span class="company-name"><?php echo (mbstr($v["qc"],0,16)); ?></span>
                                    <span class="company-name-click"><a href="http://<?php echo ($v["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($v["id"]); ?>/" target="_blank" rel="nofollow"><?php echo (mbstr($v["qc"],0,16)); ?></a></span>
                                </div>
                                <div class="fr"><?php echo ($v["rank"]); ?></div>
                            </div>
                            <div class="company-info <?php if($k == '1'): ?>rank-active<?php endif; ?>">
                                <div class="fl">
                                    <a href="http://<?php echo ($v["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($v["id"]); ?>/" target="_blank" rel="nofollow"><?php if($v['logo'] != ''): ?><img alt="<?php echo ($v["qc"]); ?>" src="<?php echo ($v["logo"]); ?>" width="126" height="63"  ><?php else: ?><img alt="<?php echo ($v["qc"]); ?>" width="126" height="63"  src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo OP('DEFAULT_COMPANY_LOGO');?>" ><?php endif; ?></a>
                                </div>
                                <div class="fl goodnews">
                                    <p><span class="good-comment fl">评</span><span><?php echo (commentPercent($v["comment_score"])); ?>%</span></p>
                                    <p><span class="good-case fl">案</span><span><?php echo ($v["case_count"]); ?></span></p>
                                </div>
                                <div class="fr des-btn">
                                    <a href="javascript:;" data-id="<?php echo ($v["id"]); ?>">免费帮我设计</a>
                                </div>
                            </div>
                        </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                </div>
            </div>
            <div class="company-rank-ask fr">
                <div class="company-rank-top">
                    <div class="top-title"><span>全国装修公司活跃排行榜</span></div>
                    <div class="top-explain">
                        <span class="fl">排行</span>
                        <span class="fr">活跃度</span>
                    </div>
                </div>
                <div class="company-rank-content">
                    <ul class="rank-list">
                        <?php if(is_array($info["activerank"])): $k = 0; $__LIST__ = $info["activerank"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($k % 2 );++$k;?><li <?php if($k == '1'): ?>class="rank-active"<?php endif; ?>>
                            <div class="company-head">
                                <div class="fl">
                                    <span class="rank-num"><?php echo ($k); ?></span>
                                    <span class="company-name"><?php echo (mbstr($v["qc"],0,16)); ?></span>
                                    <span class="company-name-click"><a href="http://<?php echo ($v["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($v["id"]); ?>/" target="_blank" rel="nofollow"><?php echo (mbstr($v["qc"],0,16)); ?></a></span>
                                </div>
                                <div class="fr"><?php echo ($v["rank"]); ?></div>
                            </div>
                            <div class="company-info <?php if($k == '1'): ?>rank-active<?php endif; ?>">
                                <div class="fl">
                                    <a href="http://<?php echo ($v["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($v["id"]); ?>/" target="_blank" rel="nofollow"><?php if($v['logo'] != ''): ?><img alt="<?php echo ($v["qc"]); ?>" src="<?php echo ($v["logo"]); ?>" width="126" height="63"  ><?php else: ?><img alt="<?php echo ($v["qc"]); ?>" width="126" height="63"  src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo OP('DEFAULT_COMPANY_LOGO');?>" ><?php endif; ?></a>
                                </div>
                                <div class="fl goodnews">
                                    <p><span class="good-comment fl">评</span><span><?php echo (commentPercent($v["comment_score"])); ?>%</span></p>
                                    <p><span class="good-case fl">案</span><span><?php echo ($v["case_count"]); ?></span></p>
                                </div>
                                <div class="fr des-btn">
                                    <a href="javascript:;" data-id="<?php echo ($v["id"]); ?>">免费帮我设计</a>
                                </div>
                            </div>
                        </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="new-box-r">
        <div class="bj-form">
            <div class="bj-content">
                <p class="bj-free-title">免费设计方案</p>
                <div class="bj-box">
                      <div class="input-select bord">
                        <input type="text" placeholder="请输入您的房屋面积" name="mianji">
                        <i class="pingfang">m²</i>
                    </div>

                    <div class="input-select">
                        <select id="cs" class="freesj_cs" name="cs"></select>
                        <select id="qy" class="freesj_qx" name="qy"></select>
                    </div>
                    <div class="input-select bord">
                        <input type="text" placeholder="您的小区,以便准确计算" name="xiaoqu">
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
                        <a class="right-now-btn kjg" href="javascript:void(0)">马上提交看结果</a>
                    </div>
                </div>
            </div>
        </div>


        <div class="bj-cal">
            <img src="<?php echo ($static_host); ?>/assets/home/company/img/cal-img.jpg">
            <div class="bj-info">
                <p>10秒获取报价清单</p>
                <p>避免装修陷阱</p>
                <a href="http://<?php echo C('QZ_YUMINGWWW');?>/zxbj/" target="_blank">立即查看 > </a>
            </div>
        </div>
        <div class="zxfw">
            <p>为什么在齐装网上找装修公司?</p>
            <ul>
                <li>
                    <i class="icon icon1"></i>
                    <em>高效率  附近的公司</em>
                    <span>10分钟内筛选成功并发送至您的手机坐等装修公司联系您！</span>
                </li>
                <li>
                    <i class="icon icon2"></i>
                    <em>免费  4套免费设计方案</em>
                    <span>全套图纸，包括原始结构图、平面图、效果图等，不满意重做！</span>
                </li>
                <li>
                    <i class="icon icon3"></i>
                    <em>健康环保  运用高质量环保材料</em>
                    <span>以每一位业主的健康利益为重,确保性价比高于同行！</span>
                </li>
            </ul>
            <a class="good-get" href="javascript:;">获取高质量装修服务</a>
        </div>
    </div>
</div>
<div class="wrap ofw case-content">
    <div class="case-title">新上传的案例</div>
    <ul class="case-list">
        <?php if(is_array($info["cases"])): $i = 0; $__LIST__ = $info["cases"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li>
            <a href="http://<?php echo ($v["bm"]); ?>.<?php echo C('QZ_YUMING');?>/caseinfo/<?php echo ($v["id"]); ?>.shtml" target="_blank" rel="nofollow">
                <img alt="<?php echo ($v["title"]); ?>" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($v["src"]); ?>-w280.jpg">
                <div class="case-mark for_ie_bg">
                    <p class="village-name"><?php echo ($v["title"]); ?></p>
                    <p class="village-style"><span><?php echo ($v["zstyle"]); ?></span><span class="village-money"><?php echo ($v["zcost"]); ?></span><span><?php echo ($v["writer"]); ?></span></p>
                </div>
            </a>
        </li><?php endforeach; endif; else: echo "" ;endif; ?>
    </ul>
</div>
<div class="pop-bj">

    <div class="ten-bj">
        <div class="bj-head">
            <span class="red-color">10秒快速申请4份户型设计</span>
            <i class="ten-close"></i>
        </div>
        <div class="ten-bj-from">
            <p>知名设计师，为您定制</p>
            <p>4份设计方案 全面PK 不满意重新设计</p>
            <div class="input-select">
                <select class="cs_getnow" name="cs_getnow"></select>
                <select class="qx_getnow" name="qx_getnow"></select>
            </div>
            <div class="input-select">
                <input type="text" placeholder="请输入您的称呼" name="username">
            </div>
            <div class="input-select">
                <input type="text" placeholder="请输入您的手机号" name="phone" maxlength="11">
            </div>
             <!--S-免责申明-->
                    <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                   <!--E-免责申明-->
            <div class="input-select">
                <a class="right-now-get getnow" href="javascript:;">马上获取</a>
            </div>
        </div>
    </div>

    <div class="free-bj">
        <div class="bj-head">
            <span>免费做设计与报价</span><span class="red-color">装修立省30%</span>
            <i class="ten-close"></i>
        </div>
        <div class="ten-bj-from ls30">
            <div class="free-bj-box">
                <div class="input-select">
                    <select class="cs_lisheng" name="cs_lisheng"></select>
                    <select class="qx_lisheng" name="qx_lisheng"></select>
                </div>
                <div class="input-select">
                    <input type="text" placeholder="请输入您的称呼" name="username">
                </div>
                <div class="input-select">
                    <input type="text" placeholder="请输入您的手机号" name="phone" maxlength="11">
                </div>
                <!--S-免责申明-->
                    <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                   <!--E-免责申明-->
                <div class="input-select">
                    <a class="right-now-get lisheng" href="javascript:;">立即申请</a>
                </div>
            </div>
        </div>
    </div>

    <input id="companyid" name="companyid" type="hidden" value="">
</div>

    <!-- 底部弹窗s -->
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
                                <select id="cs" class="cs_tijiao" name="cs_freesj"></select>
                                <select id="qy" class="qx_tijiao" name="qy_freesj"></select>
                            </div>

                        </li>
                        <li>
                            <span>房屋面积：</span>
                            <div class="shurudiv"><input class="mianji" type="text" placeholder="输入您的房屋面积"></div>
                        </li>
                        <li>
                            <span>手机号码：</span>
                            <div class="shurudiv"><input class="shouji" type="text" maxlength="11" placeholder="输入手机号码获取推荐结果"></div>
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
                <div class="tijiao">

                </div>

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
<script type="text/javascript">
    var shen = null,shi = null;
    shen = citys["shen"];
    shi = citys["shi"];
    //App.citys.init(".freesj_cs",".freesj_qx",shen,shi);
    initCity('<?php echo ($theCityId); ?>');
    function initCity(cityId){
        App.citys.init(".freesj_cs",".freesj_qx",shen,shi,cityId);
        App.citys.init(".cs_getnow",".qx_getnow",shen,shi,cityId);
        App.citys.init(".cs_lisheng",".qx_lisheng",shen,shi,cityId);
         App.citys.init(".cs_tijiao",".qx_tijiao",shen,shi,cityId);
    }
    function up(){
        $('.jiantou01').animate({top:20},600,function(){
            $('.jiantou01').animate({top:41},650,function(){
                up()
            })
        });
    }
    $('.jiantou01').animate({top:41},600,function(){
        up();
    });

    $(function(){
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
    });
    //底部发单
    $(".tijiao").click(function(event) {
        var cs_name=$('.btul .freesj_cs option:selected').text();
        var qy_name=$('.btul .freesj_qy option:selected').text();
        var cs = $('.cs_tijiao');
        if (cs.val() == '') {
            alert("您还没有选择所在城市噢 ^_^!");
            cs.focus();
            return false;
        }

        var qy = $('.qx_tijiao');
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
            alert("请填写正确的手机号");
            return false;
        } else {
            var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
            if (!tel.val().match(reg)) {
                tel.focus();
                alert("请填写正确的手机号");
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
        if(!checkDisclamer(".biaodanqu")){
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
            extra:data,
            error:function(){alert("网络发生错误,请稍后重试！");},
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
    $(".ten-bj input").click(function(){
        $(this).removeClass("focus");
    });
    $('.rank-list').on('mouseenter','.company-head',function(){
        if(!$(this).parent('li').hasClass('rank-active')){
            $(this).find('.company-name').hide();
            $(this).find('.company-name-click').show();
            $(this).parent('li').siblings().find('.company-name').show();
            $(this).parent('li').siblings().find('.company-name-click').hide();
            $(this).parent('li').addClass('rank-active').siblings().removeClass('rank-active').find('.company-info').stop().hide(300);
            $(this).siblings('.company-info').stop().show(300);
        }
    });

    $('.des-btn').each(function(index, el) {
        $(this).find('a').click(function(){
            var cid = $(this).attr("data-id");
            $("#companyid").val(cid);
            $('.pop-bj').fadeIn(300).find('.ten-bj').fadeIn(300);
        });
    });

    $('.ten-close').click(function(event) {
        $('.pop-bj').fadeOut(300).find('.ten-bj').fadeOut(300);
        $('.pop-bj').find('.free-bj').fadeOut(300);
    });

    $('.good-get').click(function(){
        $('.pop-bj').fadeOut(300).find('.ten-bj').fadeOut(300);
        $('.pop-bj').fadeIn(300).find('.free-bj').fadeIn(300);
    });


//马上提交看结果
    $(".kjg").click(function(event) {
        var _this = $(this).parents(".bj-form");
        var mianji = _this.find("input[name=mianji]");
        var cs = _this.find("select[name=cs]");
        var qy = _this.find("select[name=qy]");
        var xiaoqu = _this.find("input[name=xiaoqu]");
        var tel = _this.find("input[name=tel]");
        var comid = $("#companyid").val();

        window.order({
            wrap:'.bj-form',
            extra:{
                mianji:mianji.val(),
                xiaoqu:xiaoqu.val(),
                tel:tel.val(),
                cs:cs.val(),
                qx:qy.val(),
                source: "159" || 30,
                step:2
            },
            error:function(){
                alert("网络发生错误,请稍后重试！");
            },
            success:function(data, status, xhr){
                if (data.status == 1) {
                    $('.pop-bj').fadeOut(300).find('.ten-bj').fadeOut(300).find('.free-bj').fadeOut(300);
                    $("body").append(data.data.tmp);
                }else{
                    alert("发生错误,请稍后重试！");
                }
            },
            validate:function(item, value, method, info){
                if ('mianji' == item) {
                    if ("" == value) {
                        mianji.focus();
                        alert("亲，您还没有填写房屋面积！");
                        return false;
                    }
                    var re = /^[0-9]+(.[0-9]{1,2})?$/gi;
                    if (!re.test(value)) {
                        mianji.focus();
                        alert("亲，房屋面积只能填纯数字！");
                        return false;
                    }
                };

                if ('xiaoqu' == item) {
                    if ("" == value) {
                        xiaoqu.focus();
                        alert("亲，您还没有填写小区名称！");
                        return false;
                    }
                    var re = /^[0-9]+(.[0-9]{1,2})?$/gi;
                    if (re.test(value)) {
                        xiaoqu.focus();
                        alert("亲，请填写正确的小区名称！");
                        return false;
                    }
                };

                if ('tel' == item && 'notempty' == method) {
                    tel.focus();
                    alert("亲，您还没有填写手机号码！");
                    return false;
                };

                if ('tel' == item && 'ismobile' == method) {
                    tel.focus();
                    alert("亲，请输入11位手机号码！");
                    return false;
                };

                if ('cs' == item && 'notempty' == method) {
                    alert("您还没有选择所在城市噢 ^_^!");
                    cs.focus();
                    return false;
                };

                if ('qx' == item && 'notempty' == method) {
                    alert("您还没有选择所在区域噢 ^_^!");
                    qy.focus();
                    return false;
                };
                if(!checkDisclamer(".new-box-r")){
                    return false;
                }
                return true;
            }
        });
        return false;
    });


    //马上获取四份设计
    $(".getnow").click(function(event) {

        var _this = $(this).parents(".ten-bj");
        var username = _this.find("input[name=username]");
        var tel = _this.find("input[name=phone]");
        var cs = _this.find("select[name=cs_getnow]");
        var qx = _this.find("select[name=qx_getnow]");
        var comid = $("#companyid").val();
        window.order({
            wrap:'.ten-bj',
            extra:{
                name:username.val(),
                tel:tel.val(),
                cs:cs.val(),
                qx:qx.val(),
                select_comid :comid,
                source: "159" || 30,
                step:2
            },
            error:function(){
                alert("网络发生错误,请稍后重试！");
            },
            success:function(data, status, xhr){
                if (data.status == 1) {
                    $('.pop-bj').fadeOut(300).find('.ten-bj').fadeOut(300).find('.free-bj').fadeOut(300);
                    $("body").append(data.data.tmp);
                }else if('undefined' != typeof(data.info)){
                    alert(data.info);
                } else{
                    alert("发生错误,请稍后重试！");
                }
            },
            validate:function(item, value, method, info){
                if ('name' == item && 'notempty' == method) {
                    username.focus().addClass('focus');
                    alert("亲,您还没有填写称呼呢!");
                    return false;
                };
                if ('name' == item && 'isword' == method) {
                    username.focus().addClass('focus');
                    alert("请输入正确的名称，只支持中文和英文");
                    return false;
                };
                if ('tel' == item && 'notempty' == method) {
                    tel.focus().addClass('focus');
                    alert("亲,您还没有填写手机号码!");
                    return false;
                };
                if ('tel' == item && 'ismobile' == method) {
                    tel.focus().addClass('focus');
                    alert("请填写正确的手机号码 ^_^!");
                    return false;
                };
                if ('cs' == item && 'notempty' == method) {
                    alert("您还没有选择所在城市噢 ^_^!");
                    cs.focus().addClass('focus');
                    return false;
                };
                if ('qx' == item && 'notempty' == method) {
                    alert("您还没有选择所在区域噢 ^_^!");
                    qy.focus().addClass('focus');
                    return false;
                };
                if(!checkDisclamer(".ten-bj")){
                    return false;
                }

                return true;
            }
        });
        return false;
    });




    //立省30%
    $(".lisheng").click(function(event) {
        var _this = $(this).parents(".ls30");
        var username = _this.find("input[name=username]");
        var tel = _this.find("input[name=phone]");
        var cs = _this.find("select[name=cs_lisheng]");
        var qx = _this.find("select[name=qx_lisheng]");
        var comid = $("#companyid").val();
        window.order({
            wrap:'.ls30',
            extra:{
                name:username.val(),
                tel:tel.val(),
                cs:cs.val(),
                qx:qx.val(),
                select_comid :comid,
                source: "159" || 30,
                step:2
            },
            error:function(){
                alert("网络发生错误,请稍后重试！");
            },
            success:function(data, status, xhr){
                if (data.status == 1) {
                    $('.pop-bj').fadeOut(300).find('.ten-bj').fadeOut(300).find('.free-bj').fadeOut(300);
                    $("body").append(data.data.tmp);
                }else if('undefined' != typeof(data.info)){
                    alert(data.info);
                } else{
                    alert("发生错误,请稍后重试！");
                }
            },
            validate:function(item, value, method, info){
                if ('name' == item && 'notempty' == method) {
                    username.focus().addClass('focus');
                    alert("亲,您还没有填写称呼呢!");
                    return false;
                };
                if ('name' == item && 'isword' == method) {
                    username.focus().addClass('focus');
                    alert("请输入正确的名称，只支持中文和英文");
                    return false;
                };
                if ('tel' == item && 'notempty' == method) {
                    tel.focus().addClass('focus');
                    alert("亲,您还没有填写手机号码!");
                    return false;
                };
                if ('tel' == item && 'ismobile' == method) {
                    tel.focus().addClass('focus');
                    alert("请填写正确的手机号码 ^_^!");
                    return false;
                };
                if ('cs' == item && 'notempty' == method) {
                    alert("您还没有选择所在城市噢 ^_^!");
                    cs.focus().addClass('focus');
                    return false;
                };
                if ('qx' == item && 'notempty' == method) {
                    alert("您还没有选择所在区域噢 ^_^!");
                    qy.focus().addClass('focus');
                    return false;
                };
                if(!checkDisclamer(".ls30")){
                    return false;
                }

                return true;
            }
        });
        return false;
    });
});
</script>
</html>