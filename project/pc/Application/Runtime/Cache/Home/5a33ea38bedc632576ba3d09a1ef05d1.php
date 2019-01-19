<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    
<title><?php echo ($keys["title"]); ?>-<?php echo ($title); ?></title>
<meta name="keywords" content="<?php echo ($keys["keywords"]); ?>" />
<meta name="description" content="<?php echo ($keys["description"]); ?>" />
<?php if(!empty($articleInfo["canonical"])): ?><link rel="canonical" href="<?php echo ($articleInfo["canonical"]); ?>"/><?php endif; ?>
<meta name="mobile-agent" content="format=html5;url=http://m.qizuang.com/gonglue/<?php echo ($articleInfo["article"]["now"]["shortname"]); ?>/<?php echo ($articleInfo["article"]["now"]["id"]); ?>.html" />

    <link rel="Shortcut Icon" href="<?php echo ($static_host); ?>/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/tooltips/tooltips.css?v=<?php echo C('STATIC_VERSION');?>"/>
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public-new.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/window.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
    <link href="<?php echo ($static_host); ?>/assets/common/css/tanchuang.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="/assets/common/css/qzCitySelect.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <!--S小贴士-->
    <link rel="stylesheet" href="/assets/home/about/css/swiper-3.3.1.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="/assets/common/css/xiaotieshi.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" type="text/css" href="/assets/common/css/daohang20180712.css?v=<?php echo C('STATIC_VERSION');?>"/>
    <!--E小贴士-->
    
<link rel="stylesheet" type="text/css" href="/assets/home/zixun/css/zxgl-talk.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" type="text/css" href="/assets/home/article/css/index.css?v-2018060611180918">
<link rel="stylesheet" type="text/css" href="/assets/home/article/css/article-erweima.css?v=<?php echo C('STATIC_VERSION');?>">

    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/order.js?v=<?php echo C('ORDER_JS_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/hm.min.js?ver=1&md=<?php echo time();?>"></script>
    <script type="text/javascript" src="<?php echo ($cityfile); ?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/home/index/js/baseInit.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="/assets/common/js/disclamer.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <!--[if lte IE 8]> <link rel="stylesheet" type="text/css" href="/assets/home/ie/forie.css?v=<?php echo C('STATIC_VERSION');?>"/> <![endif]-->
    <!--[if lte IE 9]> <link rel="stylesheet" type="text/css" href="/assets/home/ie/forie.css?v=<?php echo C('STATIC_VERSION');?>"/> <![endif]-->
    <link rel="stylesheet" type="text/css" href="/assets/common/css/tanchuang.css?v=<?php echo C('STATIC_VERSION');?>"/>
</head>
<body>
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
               <!-- <div class="daohxiugitem"><a href="http://jiaju.qizuang.com/" target="_blank"><span class="jjscdh"></span><span class="jjscdhms">家居商城</span></a></div>-->
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

<div class="wrap">
    <!-- 面包屑导航 -->
    <div class="bread">
        <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/">装修攻略</a>
        <?php if(isset($cate["parent"]["parent"])): ?>&gt; <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($cate["parent"]["parent"]["shortname"]); ?>/"><?php echo ($cate["parent"]["parent"]["classname"]); ?></a><?php endif; ?>
        <?php if(isset($cate["parent"])): ?>> <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($cate["parent"]["shortname"]); ?>/"><?php echo ($cate["parent"]["classname"]); ?></a><?php endif; ?>
        >
            <?php if(($articleInfo["article"]["now"]["shortname"]) == "history"): ?><a href="javascript:void(0)"><?php echo ($articleInfo["article"]["now"]["classname"]); ?></a>
            <?php else: ?>
                <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($articleInfo["article"]["now"]["shortname"]); ?>/"><?php echo ($articleInfo["article"]["now"]["classname"]); ?></a><?php endif; ?>
        <!--&gt; <?php echo ($articleInfo["article"]["now"]["title"]); ?>-->
        > 正文
    </div>
    <div class="atl-body">
        <!-- 左边部分模块 -->
        <div class="atl-left">
            <div class="baojia-tit">装修价格不被坑就来<span>算一算</span></div>
            <!-- 报价计算器模块 -->
            <div class="atl-baojia baojia-jisuanqi-wrap">
                <div class="baojia-box">
                    <div class="baojia-value">
                        <div class="miaosuan"><span>8秒</span>计算装修需要多少钱</div>
                        <div class="house-input">
                            <input type="text" name="mianji" placeholder="输入您的房屋面积" style="color: #333333">
                            <i class="order-icon">㎡</i>
                            <p class="error-info"></p>
                        </div>
                        <div class="city-sel">
                            <select class="gl_box_cs" name="cs"></select>
                            <select class="gl_box_qx" name="qx"></select>
                            <p class="error-info"></p>
                        </div>
                        <div class="tel-num">
                            <input type="text" name="money_tel" id="baojia" placeholder="输入手机号获取报价结果" maxlength="11" style="color: #333333">
                            <input type="hidden" name="fb_type" value="baojia">
                            <p class="error-info"></p>
                        </div>
                        <div class="miaosuan_mz">
                            <!--S-免责申明-->
                            <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                            <!--E-免责申明-->
                        </div>

                    </div>
                    <div class="baojia-btn">
                        <a id="btnSave" href="javascript:;"><i>立即<br>计算</i></a>
                    </div>
                    <div class="baojia-result">
                        <div class="result-all">
                            <p>
                                您的装修预算为
                                <span class="result-all-val counter" id="total-price">?</span>元
                            </p>
                        </div>
                        <div class="money-img">
                            <div class="" style="float: right;">
                                <div class="num num-gray"></div>
                                <div class="num num-gray"></div>
                                <div class="num num-gray"></div>
                                <div class="num num-gray"></div>
                                <div class="num num-gray"></div>
                                <div id="num-1" class="num num-1"></div>
                                <div id="num-2" class="num num-2"></div>
                                <div id="num-3" class="num num-0"></div>
                                <div id="num-4" class="num num-4"></div>
                                <div id="num-5" class="num num-5"></div>
                                <div id="num-6" class="num num-8"></div>
                                <span> 元</span>
                            </div>
                </div>
                        <div class="result-item">
                            <div class="result-item-left">
                                <span>客厅：</span>
                                <span id="kt-price" class="result-item-val counter">?</span>
                                <span>元</span>
                            </div>
                            <div>
                                <span>水电：</span>
                                <span id="sd-price" class="result-item-val counter">?</span>
                                <span>元</span>
                            </div>
                        </div>
                        <div class="result-item">
                            <div class="result-item-left">
                                <span>卫生间：</span>
                                <span id="wsj-price" class="result-item-val counter">?</span>
                                <span>元</span>
                            </div>
                            <div>
                                <span>卧室：</span>
                                <span id="zw-price" class="result-item-val counter">?</span>
                                <span>元</span>
                            </div>
                        </div>
                        <div class="result-item">
                            <div class="result-item-left">
                                <span>厨房：</span>
                                <span id="cf-price"  class="result-item-val counter">?</span>
                                <span>元</span>
                            </div>
                            <div class="result-item-left">
                                <span>其他：</span>
                                <span id="other-price"  class="result-item-val counter">?</span>
                                <span>元</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 文章内容模块 -->
            <div class="atl-main">
                <div class="gl_tle">
                    <h1><?php echo ($articleInfo["article"]["now"]["title"]); ?></h1>
                </div>
                <div class="gl_tm">
                    <span>来源: 齐装网</span>
                    <span><?php echo (date("Y-m-d H:i:s",$articleInfo["article"]["now"]["addtime"])); ?></span>
                    <span>浏览量: <?php echo ($articleInfo["article"]["now"]["pv"]); ?></span>
                    <span> 分享:</span>
                    <div class="bdsharebuttonbox gl_fx bdshare-button-style0-16" data-bd-bind="1490146086907">
                        <a href="#" class="bds_more" data-cmd="more"></a>
                        <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                        <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                        <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"> </a>
                        <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
                        <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                    </div>
                    <div class="gl_d">
                        <span class="gl_xh" data-id="<?php echo ($articleInfo["article"]["now"]["id"]); ?>">
                            <i class="fa fa-heart"></i>&nbsp;<em><?php echo ($articleInfo["article"]["now"]["likes"]); ?></em>
                        </span>
                        <?php if($_SESSION['u_userInfo']['classid']!= 3): if($articleInfo['collect']): ?><span class="gl_sc active" data-on="1">
                                  <i class="fa fa-star"></i>已收藏
                                </span>
                            <?php else: ?>
                                <span class="gl_sc" data-on="0">
                                  <i class="fa fa-star"></i>收藏
                                </span><?php endif; endif; ?>
                        <div class="sendsj">
                           <div class="saoysao">
                               <div class="wzewm">
                                   <img data-on="false" id="weixinerweima" src="" alt="文章微信二维码" class="baiduab-beha">
                               </div>
                           </div>
                        </div>
                    </div>
                </div>
                <div class="gl_works">
                    <div class="works_p">
                        <?php echo ($articleInfo["article"]["now"]["content"]); ?>
                    </div>
                </div>
            </div>
            <!-- 上一篇下一篇文章 -->
            <div class="gl_tb">
                <div class="prev">
                    <?php if(!$articleInfo['article']['prv']): ?><a href="javascript:void(0)" rel="nofollow">
                            <div class="prev-btn"><i class="fa fa-angle-left"></i></div>
                            <div class="prev-info">
                                <p class="gl_f_left">上一篇</p>
                                <a href="javascript:void(0)" rel="nofollow">没有了</a>
                            </div>
                        </a>
                    <?php else: ?>
                        <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($articleInfo["article"]["prv"]["shortname"]); ?>/<?php echo ($articleInfo["article"]["prv"]["id"]); ?>.html">
                            <div class="prev-btn"><i class="fa fa-angle-left"></i></div>
                            <div class="prev-img">
                                <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($articleInfo["article"]["prv"]["face"]); ?>-w240.jpg" alt="<?php echo ($articleInfo["article"]["prv"]["title"]); ?>" class="baiduab-beha"/>
                            </div>
                            <div class="prev-info">
                                <p class="gl_f_left">上一篇</p>
                                <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($articleInfo["article"]["prv"]["shortname"]); ?>/<?php echo ($articleInfo["article"]["prv"]["id"]); ?>.html" title="<?php echo ($articleInfo["article"]["prv"]["title"]); ?>">
                                    <?php echo ($articleInfo["article"]["prv"]["title"]); ?>
                                </a>
                            </div>
                        </a><?php endif; ?>
                </div>

                <div class="next">
                    <?php if(!$articleInfo['article']['next']): ?><a href="javascript:void(0)" rel="nofollow">
                            <div class="next-btn"><i class="fa fa-angle-right"></i></div>
                            <div class="next-info">
                                <p class="gl_f_right">下一篇</p>
                                <a href="javascript:void(0)" rel="nofollow">没有了</a>
                            </div>
                        </a>
                    <?php else: ?>
                        <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($articleInfo["article"]["next"]["shortname"]); ?>/<?php echo ($articleInfo["article"]["next"]["id"]); ?>.html">
                            <div class="next-btn"><i class="fa fa-angle-right"></i></div>
                            <div class="next-img">
                                <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($articleInfo["article"]["next"]["face"]); ?>-w240.jpg" alt="<?php echo ($articleInfo["article"]["next"]["title"]); ?>" class="baiduab-beha"/>
                            </div>
                            <div class="next-info">
                                <p class="gl_f_right">下一篇</p>
                                <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($articleInfo["article"]["next"]["shortname"]); ?>/<?php echo ($articleInfo["article"]["next"]["id"]); ?>.html" title="<?php echo ($articleInfo["article"]["next"]["title"]); ?>">
                                    <?php echo ($articleInfo["article"]["next"]["title"]); ?>
                                </a>
                            </div>
                        </a><?php endif; ?>
                </div>
            </div>
            <!-- 其他相关文章模块 -->
            <div class="atl-other">
                <div class="atl-other-box">
                    <div class="atl-other-tit"><i class="red-block"></i>90%的人还看了</div>
                    <?php if(is_array($articleInfo["recommendArticles"])): $i = 0; $__LIST__ = $articleInfo["recommendArticles"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><div class="atl-other-item">
                            <div class="other-item-img">
                                <a target="_blank" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vi["shortname"]); ?>/<?php echo ($vi["id"]); ?>.html">
                                    <img alt="<?php echo ($vi["title"]); ?>" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vi["face"]); ?>-w240.jpg" class="baiduab-beha">
                                </a>
                            </div>
                            <div class="other-item-main">
                                <p class="other-item-tit">
                                    <a target="_blank" title="<?php echo ($vi["title"]); ?>" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vi["shortname"]); ?>/<?php echo ($vi["id"]); ?>.html">
                                        <?php echo (mbstr($vi["title"],0,20)); ?>
                                    </a>
                                </p>
                                <p class="other-item-info"><?php echo ($vi["subtitle"]); ?></p>
                                <div class="other-item-ref">
                                    <span class="add"><i class="fa fa-eye"></i><i><?php echo ($vi["pv"]); ?></i></span>
                                    <span class="time"><?php echo (date("Y-m-d",$vi["addtime"])); ?></span>
                                </div>
                            </div>
                        </div>
                        <!--推荐数据大于1条-->
                        <?php if($countKey > 1): if($key == 0): ?><div class="atl-other-item" id="to-baojia">
                                    <div class="other-item-img">
                                            <img alt="报价发单" src="http://<?php echo C('QINIU_DOMAIN');?>/file/20180327/Fip5sNLwG0aG9vWR2v-H153PfTXu.png" class="to-baojia baiduab-beha">
                                    </div>
                                    <div class="other-item-main">
                                        <p class="other-item-tit">
                                            <a class="to-baojia">
                                                一名业主晒出的记手账,详细记录各项装修费用,原来能省这么多钱
                                            </a>
                                        </p>
                                        <p class="other-item-info"></p>
                                        <div class="other-item-ref">
                                            <span class="add"><i class="fa fa-eye"></i><i>3580</i></span>
                                            <span class="time"></span>
                                        </div>
                                    </div>
                                </div><?php endif; ?>
                            <?php if($key == 1): ?><div class="atl-other-item" id="to-design">
                                    <div class="other-item-img">
                                            <img alt="设计发单" src="http://<?php echo C('QINIU_DOMAIN');?>/file/20180327/FgXi8ONzH8AeQXqYUnwDMVs1jzmN.png" class="to-design baiduab-beha">
                                    </div>
                                    <div class="other-item-main">
                                        <p class="other-item-tit">
                                            <a class="to-design">
                                                天呐,4套装修效果图册、设计方案免费拿,欲领从速
                                            </a>
                                        </p>
                                        <p class="other-item-info"></p>
                                        <div class="other-item-ref">
                                            <span class="add"><i class="fa fa-eye"></i><i>2988</i></span>
                                            <span class="time"></span>
                                        </div>
                                    </div>
                                </div><?php endif; ?>
                        <?php else: ?>
                            <div class="atl-other-item" id="to-baojia">
                                <div class="other-item-img">
                                    <img alt="报价发单" src="http://<?php echo C('QINIU_DOMAIN');?>/file/20180327/Fip5sNLwG0aG9vWR2v-H153PfTXu.png" class="to-baojia baiduab-beha">
                                </div>
                                <div class="other-item-main">
                                    <p class="other-item-tit">
                                        <a class="to-baojia">
                                            一名业主晒出的记手账,详细记录各项装修费用,原来能省这么多钱
                                        </a>
                                    </p>
                                    <p class="other-item-info"></p>
                                    <div class="other-item-ref">
                                        <span class="add"><i class="fa fa-eye"></i><i>3580</i></span>
                                        <span class="time"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="atl-other-item" id="to-design">
                                <div class="other-item-img">
                                    <img alt="设计发单" src="http://<?php echo C('QINIU_DOMAIN');?>/file/20180327/FgXi8ONzH8AeQXqYUnwDMVs1jzmN.png" class="to-design baiduab-beha">
                                </div>
                                <div class="other-item-main">
                                    <p class="other-item-tit">
                                        <a class="to-design">
                                            天呐,4套装修效果图册、设计方案免费拿,欲领从速
                                        </a>
                                    </p>
                                    <p class="other-item-info"></p>
                                    <div class="other-item-ref">
                                        <span class="add"><i class="fa fa-eye"></i><i>2988</i></span>
                                        <span class="time"></span>
                                    </div>
                                </div>
                            </div><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                </div>
            </div>
            <!-- 招标设计广告图模块 -->
            <div class="sp_hf">
                <a rel="nofollow" href="/zhaobiao/" target="_blank">
                    <img src="http://www.qizuang.com/assets/home/zixun/img/hf3.png" alt="招标与设计" class="baiduab-beha">
                </a>
            </div>
            <!-- 评论区模块 -->
            <div class="tk-l">
            <?php echo ($reply); ?>
            <?php if(!empty($comments)): ?><div class="tk-list">
                    <div class="list-mod clearfix">
                        <div class="mod-main">
                            <?php echo ($comments); ?>
                            <div class="main-msg">
                                <div class="pl_more">
                                    <p>
                                        <a rel="nofollow" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($articleInfo["article"]["now"]["shortname"]); ?>/<?php echo ($articleInfo["article"]["now"]["id"]); ?>/more-review/" target="_blank">
                                            >> 查看更多评论
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><?php endif; ?>
        </div>
        </div>
        <!-- 右边部分模块 -->
        <div class="atl-right">
            <!-- 微信专享文章 -->
            <?php if(!empty($info["weixinarticle"])): ?><div class="weixinzx">
                    <div class="titlewx">
                        <span class="wxtb"></span>
                        微信专享
                    </div>
                    <?php if(is_array($info["weixinarticle"])): $i = 0; $__LIST__ = $info["weixinarticle"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><div class="wrapbk" id="weixinarticle<?php echo ($vi["id"]); ?>" data-on="false">
                            <div class="wxdtb wx-article-btn" data-id="<?php echo ($vi["id"]); ?>">
                                <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vi["face"]); ?>-w240.jpg" alt="" class="baiduab-beha">
                            </div>
                            <div class="wzjs">
                                <p class="wzjsly wx-article-btn" data-id="<?php echo ($vi["id"]); ?>"><?php echo ($vi["title"]); ?></p>
                                <p class="wzjsle wx-article-btn" data-id="<?php echo ($vi["id"]); ?>"><?php echo ($vi["description"]); ?></p>
                                <p class="wzjsls"><a class="wx-article-btn" data-id="<?php echo ($vi["id"]); ?>" href="javascript:void(0)">前往>></a></p>
                            </div>
                        </div><?php endforeach; endif; else: echo "" ;endif; ?>
                </div><?php endif; ?>
            <!-- 报价计算器 -->
            <?php echo ($orderTmp); ?>
            <!-- 最新文章 -->
            <div class="atl-new">
                <div class="atl-new-head"><p>新文章</p></div>
                <div class="atl-new-list">
                    <?php if(is_array($info["newarticles"])): $i = 0; $__LIST__ = $info["newarticles"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i; if(($key) == "0"): ?><div class="atl-new-item">
                                <div class="mark actived"><span class="fa fa-bookmark"><i><?php echo ($key+1); ?></i></span></div>
                                <div class="new-item-long hide"><p><?php echo (mbstr($vi["title"],0,14)); ?></p></div>
                                <div class="atl-new-img current">
                                    <a target="_blank" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vi["shortname"]); ?>/<?php echo ($vi["id"]); ?>.html">
                                        <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vi["face"]); ?>-w240.jpg" alt="<?php echo ($vi["title"]); ?>" class="baiduab-beha">
                                    </a>
                                </div>
                                <div class="atl-new-main current">
                                    <a target="_blank" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vi["shortname"]); ?>/<?php echo ($vi["id"]); ?>.html">
                                        <p class="atl-new-tit" title="<?php echo ($vi["title"]); ?>"><?php echo (mbstr($vi["title"],0,8)); ?></p>
                                    </a>
                                    <div class="atl-new-info">
                                        <p title="<?php echo ($vi["subtitle"]); ?>">
                                            <?php echo (mbstr($vi["subtitle"],0,17)); ?>
                                            <a target="_blank" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vi["shortname"]); ?>/<?php echo ($vi["id"]); ?>.html">[详细]</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        <?php else: ?>
                            <div class="atl-new-item">
                                <div class="mark"><span class="fa fa-bookmark"><i><?php echo ($key+1); ?></i></span></div>
                                <div class="new-item-long"><p><?php echo (mbstr($vi["title"],0,16)); ?></p></div>
                                <div class="atl-new-img">
                                    <a target="_blank" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vi["shortname"]); ?>/<?php echo ($vi["id"]); ?>.html">
                                        <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vi["face"]); ?>-w240.jpg" alt="" class="baiduab-beha">
                                    </a>
                                </div>
                                <div class="atl-new-main">
                                    <a target="_blank" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vi["shortname"]); ?>/<?php echo ($vi["id"]); ?>.html">
                                        <p class="atl-new-tit" title="<?php echo ($vi["title"]); ?>"><?php echo (mbstr($vi["title"],0,8)); ?></p>
                                    </a>
                                    <div class="atl-new-info">
                                        <p title="<?php echo ($vi["subtitle"]); ?>">
                                            <?php echo (mbstr($vi["subtitle"],0,17)); ?>
                                            <a target="_blank" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vi["shortname"]); ?>/<?php echo ($vi["id"]); ?>.html">[详细]</a>
                                        </p>
                                    </div>
                                </div>
                            </div><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                </div>

            </div>

            <!-- 测算吉日 -->
            <?php echo ($hlBaoJia); ?>

        </div>

    </div>
</div>
<div class="weixintanc"></div>
 <div class="weixintanc_small">
         <span class="shut">X</span>
         <div class="biaot">家装中没必要花大钱的地方，真浪费钱！</div>
         <p class="contentnr">挑什么材料绝对不能马虎？大家可得注意看咯，不然吃亏的可是自己。</p>
         <p class="contentsm">扫描二维码</p>
         <div class="wtjh">
             即可在<span class="wxtb2"></span>微信阅读这篇干货
         </div>
         <div class="erwmlogo">
            <img src="/assets/home/article/img/erwma.png" alt="" class="baiduab-beha">
         </div>
     </div>
     <div class="wrap">
        <div class="article_menu_box">
            <div class="list-head">
                <ul>
                    <?php if(is_array($info["tags"])): $k = 0; $__LIST__ = $info["tags"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$tags): $mod = ($k % 2 );++$k;?><li id="<?php echo ($k); ?>" class="">
                            <a><?php echo ($tags["name"]); ?></a>
                            <span>
                            <i class="fa fa-sort-up"></i>
                        </span>
                        </li><?php endforeach; endif; else: echo "" ;endif; ?>
                </ul>
            </div>
            <div class="gray-back">
                <?php if(is_array($info["tags"])): $k = 0; $__LIST__ = $info["tags"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$tags): $mod = ($k % 2 );++$k;?><div class="back_item">
                        <?php if(is_array($tags["sub_tags"])): $i = 0; $__LIST__ = $tags["sub_tags"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$tag): $mod = ($i % 2 );++$i;?><a target="_blank" href="<?php echo ($tag["url"]); ?>" class="sub_tag"><?php echo ($tag["name"]); ?></a><?php endforeach; endif; else: echo "" ;endif; ?>
                    </div><?php endforeach; endif; else: echo "" ;endif; ?>
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
        <li><a style="color: #FF5353" href="http://<?php echo C('QZ_YUMINGWWW');?>/about/team" target="_blank" rel="nofollow">员工风采</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/fengcai" target="_blank" rel="nofollow">企业风采</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/media" target="_blank" rel="nofollow">媒体报道</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/legal" target="_blank" rel="nofollow">法律声明</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/liansuo" target="_blank" rel="nofollow">战略合作</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/kefu/" target="_blank" rel="nofollow">客服中心</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/city/" target="_blank" rel="nofollow">网站导航</a></li>
    </ul>
    <p class="foot-disclaimer">免责声明：任何单位或个人认为本网站转载信息涉及版权或有侵权嫌疑等问题的，敬请立即通知，齐装网将在第一时间予以更改或删除。</p>
    <p>齐装网 版权所有Copyright ©<?php echo date("Y");?> Www.QiZuang.Com. All Rights Reserved</p>
    <p>法律顾问：江苏蓝之天律师事务所 徐玲律师 苏ICP备12045334号 </p>
    <p>增值电信业务经营许可证：<a target="_blank" rel="nofollow" href="http://www.miitbeian.gov.cn/"><?php echo OP('QZ_BEIAN_JYX_INFO');?></a></p>
</div>
<!--伸缩广告-->
<?php if($adv_bottom): echo ($adv_bottom); endif; ?>
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
                    <a rel="nofollow" class="moqu_top" href="javascript:void(0)">
                        <span class="icon"></span>
                        <span class="icon-tips">回到顶部</span>
                    </a>
                </div>
        </div>
        <!--S小贴士-->
        <script type="text/javascript" src="/assets/home/about/js/swiper-3.3.1.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
        <!--E小贴士-->
        <script type="text/javascript">
            //装修小贴士
            // setTimeout(function(){
            //     $('.fix_nav .moqu_kefu .xiaotiestishi').fadeOut();
            //     },5000);
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
                //alert($(".moqu_kefu").height());
                var top = $(document).scrollTop();
                if (top > 600) {
                    $('.moqu_kefu .moqu_top').show();
                    // $('.moqu_kefu').height(340);
                    $(".moqu_qq").css("border-bottom","1px solid #EBEBEB");
                } else {
                    $('.moqu_kefu .moqu_top').hide();
                    // $('.moqu_kefu').height(276);
                    $(".moqu_qq").css("border-bottom","none");
                }
            }
            goToHeader();
            $(window).scroll(function() {
                goToHeader();
            });
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
        </script><?php endif; ?>
</div><?php endif; ?>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/tooltips/jquery.pure.tooltips.js?v=<?php echo C('STATIC_VERSION');?>"></script>

<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/countUp.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/alert.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/initcomment.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript">
    $(function () {
        //默认选中效果
        $(".article_menu_box li:eq(0)").addClass('head-active');
        $(".gray-back .back_item:eq(0)").addClass('item_active');
        $(".sub_tag").on('mouseover', function () {
            $(this).attr('style', 'color:#ff5353 !important;');
        }).on('mouseout', function () {
            $(this).attr('style', 'color:#333 !important;');
        })
    });

// 获取随机数的方法
    function GetRandomNum(Min,Max){
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }
    // 随机数
    var timer = setInterval(function(){
        var num = GetRandomNum(30000,120000)+'';
        if(num<99999){
            var num1 = 'num num-gray',
                num2 = 'num num-' + num.charAt(0),
                num3 = 'num num-' + num.charAt(1),
                num4 = 'num num-' + num.charAt(2),
                num5 = 'num num-' + num.charAt(3),
                num6 = 'num num-' + num.charAt(4);
        }else{
            var num1 = 'num num-' + num.charAt(0),
                num2 = 'num num-' + num.charAt(1),
                num3 = 'num num-' + num.charAt(2),
                num4 = 'num num-' + num.charAt(3),
                num5 = 'num num-' + num.charAt(4),
                num6 = 'num num-' + num.charAt(5);
        }
        $('#num-1').removeClass().addClass(num1);
        $('#num-2').removeClass().addClass(num2);
        $('#num-3').removeClass().addClass(num3);
        $('#num-4').removeClass().addClass(num4);
        $('#num-5').removeClass().addClass(num5);
        $('#num-6').removeClass().addClass(num6);

    },400);

    /*var shen = citys["shen"];
    var shi  = citys["shi"];
    App.citys.init(".baojia-jisuanqi-wrap .gl_box_cs", ".baojia-jisuanqi-wrap .gl_box_qx", shen, shi, "", "");*/
    $(document).ready(function(){
        initCity('<?php echo ($theCityId); ?>');
        function initCity(cityId){
            App.citys.init(".baojia-jisuanqi-wrap .gl_box_cs", ".baojia-jisuanqi-wrap .gl_box_qx", shen, shi,cityId);
            App.citys.init(".baojia-jisuanqi-wrap .gl_box_cs", ".baojia-jisuanqi-wrap .gl_box_qx", shen, shi,cityId);
            App.citys.init(".baojia-jisuanqi-wrap .gl_box_cs", ".baojia-jisuanqi-wrap .gl_box_qx", shen, shi,cityId);
        }

        $(".list-head ul li").hover(function(){
            var index=$(this).index();
            $(this).addClass("head-active");
            $(this).siblings().removeClass("head-active");
            $($(".back_item")[index]).addClass("item_active");
            $($(".back_item")[index]).siblings().removeClass("item_active");
        });
    });
    $(".baojia-jisuanqi-wrap input[name=mianji]").blur(function(event) {
        var _this = $(this);
        var container = $(".baojia-jisuanqi-wrap");
        $(".focus", container).removeClass('focus');
        $(".error-info", container).html("");
        if (!App.validate.run($(this, container).val())) {
            $(this, container).addClass('focus');
            _this.siblings('.error-info').html("请填写房屋面积");
            return false;
        }
        if ($(this, container).val() !="" && !App.validate.run($(this, container).val(),"num")) {
            $(this, container).addClass('focus');
            _this.siblings('.error-info').html("无效的房屋面积");
            return false;
        }
    });

    $(".baojia-btn").click(function(event) {
        var container = $(".baojia-jisuanqi-wrap");
        var that=$(this);
        $(".focus", container).removeClass('focus');
        $(".error-info", container).html("");
        if($("input[name=mianji]",container).val()>10000){
            $("input[name=mianji]", container).addClass('focus').focus();
            $("input[name=mianji]", container).siblings('.error-info').html("面积不能大于10000");
            return false;
        }
        window.order({
            wrap:'.baojia-jisuanqi-wrap',
            extra:{
                mianji:$("input[name=mianji]",container).val(),
                cs:$("select[name=cs]",container).val(),
                qx:$("select[name=qx]",container).val(),
                name:$("input[name=name]",container).val(),
                tel:$("input[name=money_tel]",container).val(),
                fb_type:$("input[name=fb_type]",container).val(),
                source:182
            },
            error:function(){
                alert('获取报价失败,请刷新页面');
            },
            success:function(data, status, xhr){
                if(data.status == 1){
                    $.ajax({
                        url: '/getdetailsbyajax/',
                        type: 'GET',
                        dataType: 'JSON'
                    })
                    .done(function(data) {
                        if(data.status == 1){
                            $('#kt-price').text(data.data.kt);
                            $('#zw-price').text(data.data.zw);
                            $('#wsj-price').text(data.data.wsj);
                            $('#cf-price').text(data.data.cf);
                            $('#sd-price').text(data.data.sd);
                            $('#other-price').text(data.data.other);
                            $('#total-price').text(data.data.total);
                            $(".counter").countTo({
                                lastSymbol:"", //显示在最后的字符
                                firstSymbol:"", //显示在最后的字符
                                from: 0,  // 开始时的数字
                                speed: 550,  // 总时间
                                refreshInterval: 10,  // 刷新一次的时间
                                beforeSize:0, //小数点前最小显示位数，不足的话用0代替
                                decimals: 2,  // 小数点后的位数，小数做四舍五入
                                onComplete: function () {
                                    var dd = data.data.total+'';
                                    //反转字符串
                                    dd = dd.split("").reverse().join("");
                                    var html = '<div class="" style="float: right;">\
                                <div class="num num-gray"></div>\
                                <div class="num num-gray"></div>\
                                <div class="num num-gray"></div>\
                                <div class="num num-gray"></div>\
                                <div class="num num-gray"></div>\
                                <div  class="num num-' + dd.charAt(5) + '"></div>\
                                <div  class="num num-' + dd.charAt(4) + '"></div>\
                                <div  class="num num-' + dd.charAt(3) + '"></div>\
                                <div  class="num num-' + dd.charAt(2) + '"></div>\
                                <div class="num num-' + dd.charAt(1) + '"></div>\
                                <div  class="num num-' + dd.charAt(0) + '"></div>\
                                <span> 元</span>';
                                    $(".money-img").html(html);
                                    that.children('#btnSave').html("<i>重新<br/>计算</i>")
                                }
                            });

                        }else{
                            alert(data.info);
                        }
                    })
                    .fail(function(xhr) {
                        alert('获取报价失败,请刷新页面');
                    });
                }else{
                    alert(data.info);
                    if(data.info=="请填写正确的手机号码 ^_^!"){
                        $("#baojia").addClass("focus").focus();
                        return false;
                    }
                }
            },
            validate:function(item, value, method, info){
                if ('mianji' == item) {
                    if (!App.validate.run($("input[name=mianji]", container).val())) {
                        $("input[name=mianji]", container).addClass('focus').focus();
                        $("input[name=mianji]", container).siblings('.error-info').html("请填写房屋面积");
                        return false;
                    }
                    if (!App.validate.run($("input[name=mianji]", container).val(), "num")) {
                        $("input[name=mianji]", container).addClass('focus').focus();
                        $("input[name=mianji]", container).siblings('.error-info').html("无效的房屋面积");
                        return false;
                    }
                };
                if ('cs' == item && 'notempty' == method) {
                    $("select[name=cs]", container).addClass('focus').focus();
                    $("select[name=cs]", container).siblings('.error-info').html("请选择城市");
                    return false;
                };


                if (!App.validate.run($("input[name=money_tel]", container).val())) {
                    $("input[name=money_tel]", container).parent().addClass('height_auto');
                    $("input[name=money_tel]", container).addClass('focus').focus();
                    var span = $("<i class='error-info'></i>");
                    span.html("请填写正确的手机号码 ^_^!");
                    $("input[name=money_tel]", container).parent().append(span);
                    return false;
                } else {
                    var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
                    if (!reg.test($("input[name=money_tel]", container).val())) {
                        $("input[name=money_tel]", container).parent().addClass('height_auto');
                        $("input[name=money_tel]", container).addClass('focus').focus();
                        $("input[name=money_tel]", container).val('');
                        var span = $("<i class='error-info'></i>");
                        span.html("请填写正确的手机号码 ^_^!");
                        $("input[name=money_tel]", container).parent().append(span);
                        return false;
                    }
                }


                if(!checkDisclamer(".miaosuan_mz")){
                    return false;
                }
                return true;
            }
        });
    });

    //不可删除，用于评论标识
    var module = "wwwarticle";

    $("body").forbidmenu({copy:false});
    window._bd_share_config=
    {"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
    $(".gl_xh").click(function(event) {
        var _this = $(this);
        $.ajax({
            url: '/dolike/',
            type: 'POST',
            dataType: 'JSON',
            data:{
                id:_this.attr("data-id")
            }
        })
        .done(function(data) {
            if(data.status == 1){
                _this.addClass('active').unbind("click");
                var i = _this.find("em").text();
                i = parseInt(i)+1;
                _this.find("em").html(i);
            }
        });
    });

    // 最新文章
    $('.atl-new-item').each(function(index, el) {
        $(el).on('mouseenter', function(){
            $(this).find('.mark').addClass('actived');
            $(this).find('.new-item-long').addClass('hide');
            $(this).find('.atl-new-img').addClass('current');
            $(this).find('.atl-new-main').addClass('current');
            $(this).siblings().find('.mark').removeClass('actived');
            $(this).siblings().find('.new-item-long').removeClass('hide');
            $(this).siblings().find('.atl-new-img').removeClass('current');
            $(this).siblings().find('.atl-new-main').removeClass('current');
        });
    });
    // 设计报价滚动到1830px 悬浮
    $(window).scroll(function(event) {
        if($(window).scrollTop() >= 1830){
            $('.secbox_form').css({
                "width":"260px",
                "margin-top":"0",
                "position":"fixed",
                "top":"80px",
                "zIndex":2
            });
        }else{
            $('.secbox_form').css({
                "margin-top":"20px",
                "position":"",
                "top":"",
                "zIndex":''
            });
        }
    });
</script>
<!--收藏文章-->
<?php if(!session('u_userInfo')): ?><script type="text/javascript">
$(".gl_sc").click(function(event) {
    $.ajax({
        url: '/login/',
        type: 'POST',
        dataType: 'JSON',
        data:{
          ssid:"<?php echo ($ssid); ?>"
        }
    })
    .done(function(data) {
        if(data.status == 1){
            $("body").append(data.data);
            $(".win_login").fadeIn(400);
        }
    });
});
</script>
<?php else: ?>
<script type="text/javascript">
$(".gl_sc").click(function(event) {
    var id = "<?php echo ($articleInfo["article"]["now"]["id"]); ?>";
    var _this = $(this);
    if(_this.attr("data-on") == 1){
        // alert("您已经收藏过了");
        _this.Alert({
            css:{
                "width":"200px",
                "height":"60px",
                "background":"#E76363",
                "margin-left":"-100px",
                "margin-top":"-30px",
                "font-size":"20px",
                "line-height":"60px"
            },
            text:"您已经收藏过了"
        });
        return false;
    }
    $.ajax({
        url: '/collect/',
        type: 'POST',
        dataType: 'JSON',
        data:{
            classtype:"1",
            classid:id,
            ssid:"<?php echo ($ssid); ?>"
        }
    })
    .done(function(data) {
        if(data.status == 1){
            _this.attr("data-on",1).addClass('active').Alert({
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
        }else{
            _this.Alert({
                css:{
                    "width":"200px",
                    "height":"60px",
                    "background":"#E76363",
                    "margin-left":"-100px",
                    "margin-top":"-30px",
                    "font-size":"20px",
                    "line-height":"60px"
                },
                text:"收藏失败！"
            });
        }
    });
});


</script><?php endif; ?>

<script>

$(document).ready(function(){
    //微信专享文章按钮
    $('.wx-article-btn').click(function(event) {
        var _this = $(this);
        var id = _this.attr('data-id');
        var obj = $('#weixinarticle' + id);
        var title = obj.find('.wzjsly').text();
        var description = obj.find('.wzjsle').text();
        var qrcode_url = "<?php echo OP('WX_CONFIG_ZGZX_ERWEIMA');?>";

        //只有第一次点击的时候请求二维码地址
        var on = obj.attr('data-on');
        if (on == 'false') {
            $.ajax({
                url: '/article/getweixinarticleerweima/',
                type: 'GET',
                dataType: 'JSON',
                async:false,
                data:{
                    id:id,
                }
            })
            .done(function(data) {
                if (data.status == 1) {
                    _this.attr('data-qrcode-url', data.data);
                } else {
                    _this.attr('data-qrcode-url', qrcode_url);
                }
            })
            .fail(function(xhr) {
                _this.attr('data-qrcode-url', qrcode_url);
            });
        }
        obj.attr('data-on', 'true');

        //弹窗赋值
        $('.weixintanc_small .biaot').text(title);
        $('.weixintanc_small .contentnr').text(description);
        $('.weixintanc_small .erwmlogo img').attr('src',_this.attr('data-qrcode-url'));
        $('.weixintanc').show();
        $('.weixintanc_small').show();
        $('.weixintanc').click(function(e){
            $('.weixintanc').hide();
            $('.weixintanc_small').hide();;
        })
        e.stopPropagation();
    });
    //关闭微信专享文章弹窗
    $('.shut').click(function(){
        $('.weixintanc').hide();
        $('.weixintanc_small').hide();
    })
    /*文章二维码鼠标动作*/
    $('.sendsj').mouseover(function(){
        var on = $("#weixinerweima").attr('data-on');
        if (on == 'false') {
            $.ajax({
                url: '/article/getwwwarticleerweima/',
                type: 'GET',
                dataType: 'JSON',
                data:{
                    id:'<?php echo ($articleInfo["article"]["now"]["id"]); ?>',
                }
            })
            .done(function(data) {
                $("#weixinerweima").attr('data-on', 'true');
                if (data.status == 1) {
                    $("#weixinerweima").attr('src', data.data);
                } else {
                    $("#weixinerweima").attr('src', "<?php echo OP('WX_CONFIG_ZGZX_ERWEIMA');?>");
                }
            })
            .fail(function(xhr) {
                $("#weixinerweima").attr('data-on', 'true');
                $("#weixinerweima").attr('src', "<?php echo OP('WX_CONFIG_ZGZX_ERWEIMA');?>");
            });
        };
        $('.saoysao').show();
    });
    $('.sendsj').mouseout(function(){
        $('.saoysao').hide();
    });


    $("#to-design .to-design").on("click",function(){
        var _this = $(this);
        $.ajax({
            url: '/dispatcher/',
            type: 'POST',
            dataType: 'JSON',
            data: {
                type:"sj",
                source: '<?php echo ($source); ?>',
                action:"load"
            }
        })
            .done(function(data) {
                if (data.status == 1) {
                    $("body").append(data.data);
                    if(navigator.appName == "Microsoft Internet Explorer"){
                        $(".zxfb").show();
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


    $("#to-baojia .to-baojia").on("click",function(){
        var _this = $(this);
        $.ajax({
            url: '/dispatcher/',
            type: 'POST',
            dataType: 'JSON',
            data: {
                type:"bj",
                source: '<?php echo ($source); ?>',
                action:"load"
            }
        })
            .done(function(data) {
                if (data.status == 1) {
                    $("body").append(data.data);
                    if(navigator.appName == "Microsoft Internet Explorer"){
                        $(".zxfb").show();
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



})
</script>

<?php echo OP('baidutongji1'); echo OP('yycollect','yes');?>
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
</script>


<?php if($isOpen): ?><script type="text/javascript">
      $(function(){
            $("#s-zxzb").trigger('click');
      });
    </script><?php endif; ?>
<script type="text/javascript">
    var QZ_YUMINGWWW = "<?php echo C('QZ_YUMINGWWW');?>";
    var tabIndex = "<?php echo ($tabIndex); ?>";
    var cityId = "<?php echo ($cityInfo["id"]); ?>";

    var shen = null,shi = null;
    shen = citys["shen"];
    shi = citys["shi"];
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
<script>
    var baiduAB = baiduAB || {};
    window.baiduAB = baiduAB;
    (function(){
        baiduAB.endTime = 1540364400000;
        baiduAB.date = new Date();
        baiduAB.time = baiduAB.date.getTime();
        if (baiduAB.time <= baiduAB.endTime) {
            baiduAB.newScript = document.createElement('script');
            baiduAB.newScript.setAttribute('charset', 'utf-8');
            baiduAB.newScript.src = 'https://zz.bdstatic.com/abtest/abtest-zy-pall.js';
            baiduAB.first = document.body.firstChild;
            document.body.insertBefore(baiduAB.newScript, baiduAB.first);
        };
    })();
</script>
</body>
</html>