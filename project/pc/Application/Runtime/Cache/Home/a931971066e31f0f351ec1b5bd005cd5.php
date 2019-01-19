<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    
    <title><?php echo ($keys["title"]); ?>-齐装网</title>
    <meta name="keywords" content="<?php echo ($keys["keywords"]); ?>">
    <meta name="description" content="<?php echo ($keys["description"]); ?>">
    <?php if($keyword != ''): ?><meta name="robots" content="noindex,follow"/><?php endif; ?>

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
    
    <?php if(!empty($info["canonical"])): ?><meta name="mobile-agent" content="format=html5;url=http://<?php echo C('MOBILE_DONAMES'); echo ($info["canonical"]); ?>"/>
        <link rel="canonical" href="http://<?php echo C('QZ_YUMINGWWW'); echo ($info["canonical"]); ?>"/><?php endif; ?>
    <link rel="stylesheet" type="text/css" href="/assets/home/zixun/css/zxgl-home.css?v=<?php echo C('STATIC_VERSION');?>"/>
    <link rel="stylesheet" type="text/css" href="/assets/home/zixun/css/zxgl-articletopic_p2111.css?v=<?php echo C('STATIC_VERSION');?>"/>
    <link rel="stylesheet" type="text/css" href="/assets/home/zixun/css/leftnavchange.css?v=<?php echo C('STATIC_VERSION');?>"/>

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

    <div class="wrap clearfix">
        <?php if(!$category): ?><div class="bread redcolor">
                <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/">装修攻略</a>&nbsp;&gt;&nbsp;装修流程
            </div>
            <?php else: ?>
            <div class="bread">
                <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/">装修攻略</a>&nbsp;&gt;&nbsp;<a
                    href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/lc/">装修流程</a>&nbsp;&gt;&nbsp;<?php echo ($category["classname"]); ?>
            </div><?php endif; ?>
        <div class="fg-l">
            <div class="sort-box">
                <div class="sort-box-tit"><p>装修流程</p></div>
                <div class="sort-box-list">
                    <div class="list-mod">
                        <p>装修前-准备阶段</p>
                    </div>
                    <ul>
                        <?php if(is_array($zxlc_nav["zxq"])): $i = 0; $__LIST__ = $zxlc_nav["zxq"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li>
                                <?php if($category['shortname'] == $v['shortname']): ?><a class="redcolor" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($v["shortname"]); ?>/"><?php echo ($v["classname"]); ?></a>
                                    <?php else: ?>
                                    <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($v["shortname"]); ?>/"><?php echo ($v["classname"]); ?></a><?php endif; ?>
                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                </div>

                <div class="sort-box-list">
                    <div class="list-mod">
                        <p>装修中-施工阶段</p>
                    </div>
                    <ul>
                        <?php if(is_array($zxlc_nav["zxz"])): $i = 0; $__LIST__ = $zxlc_nav["zxz"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li>
                                <?php if($category['shortname'] == $v['shortname']): ?><a class="redcolor" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($v["shortname"]); ?>/"><?php echo ($v["classname"]); ?></a>
                                    <?php else: ?>
                                    <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($v["shortname"]); ?>/"><?php echo ($v["classname"]); ?></a><?php endif; ?>
                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                </div>

                <div class="sort-box-list">
                    <div class="list-mod">
                        <p>装修后-入住阶段</p>
                    </div>
                    <ul>
                        <?php if(is_array($zxlc_nav["zxh"])): $i = 0; $__LIST__ = $zxlc_nav["zxh"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li>
                                <?php if($category['shortname'] == $v['shortname']): ?><a class="redcolor" href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($v["shortname"]); ?>/"><?php echo ($v["classname"]); ?></a>
                                    <?php else: ?>
                                    <a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($v["shortname"]); ?>/"><?php echo ($v["classname"]); ?></a><?php endif; ?>
                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                </div>

            </div>
        </div>
        <div id="tab" class="fg-r">
            <div class="tab-con fg-main">
                <div class="j-tab-con">
                    <div class="tab-con-item" style="display:block;">
                        <?php if(is_array($listInfo["articles"])): $k = 0; $__LIST__ = $listInfo["articles"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($k % 2 );++$k;?><div class="fg-main-item clearfix">

                                <div class="item-img">
                                    <?php if($vo["istop"] == 1): ?><div class="tuijian">推荐</div><!-- 推荐注释 --><?php endif; ?>
                                    <a target="_blank"
                                       href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vo['shortname']); ?>/<?php echo ($vo['id']); ?>.html"
                                       rel="nofollow">
                                        <img alt="<?php echo ($vo['title']); ?>"
                                             src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo['face']); ?>-w240.jpg" class="baiduab-beha">
                                    </a>
                                </div>

                                <div class="item-con">
                                    <p class="h1"><a
                                            href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vo['shortname']); ?>/<?php echo ($vo['id']); ?>.html"
                                            target="_blank"><?php echo ($vo['title']); ?></a></p>
                                    <p><?php echo (mbstr($vo['subtitle'],0,120)); ?>...<a rel="nofollow"
                                                                          href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vo['shortname']); ?>/<?php echo ($vo['id']); ?>.html"
                                                                          target="_blank">[详情]</a></p>
                                    <div class="item-bottom">
                                        <ul>
                                            <li><i class="fa fa-eye"></i><?php echo ((isset($vo['pv']) && ($vo['pv'] !== ""))?($vo['pv']):"0"); ?></li>
                                            <li class="item-time"><?php echo (date("Y-m-d H:i:s",$vo['addtime'])); ?></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <?php if($k == 3): ?><div class="fg-ad">
                                    <a rel="nofollow" href="/zhaobiao/" target="_blank"><img
                                            src="/assets/home/zixun/img/fg-ad.jpg" class="baiduab-beha"></a>
                                </div>
                                <?php elseif($k == 6): ?>
                                <div class="fg-ad">
                                    <a rel="nofollow" href="/zhaobiao/" target="_blank"><img
                                            src="/assets/home/zixun/img/fg-ad1.jpg" class="baiduab-beha"/></a>
                                </div><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </div>
                    <div class="tab-con-item" style="display:none;">
                        <?php if(is_array($listInfo["hotarticles"])): $k = 0; $__LIST__ = $listInfo["hotarticles"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($k % 2 );++$k;?><div class="fg-main-item clearfix">
                                <div class="item-img">
                                    <a target="_blank"
                                       href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vo['shortname']); ?>/<?php echo ($vo['id']); ?>.html"
                                       rel="nofollow">
                                        <img alt="<?php echo ($vo['title']); ?>"
                                             src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo['face']); ?>-w240.jpg" class="baiduab-beha">
                                    </a>
                                </div>
                                <div class="item-con">
                                    <p class="h1"><a
                                            href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vo['shortname']); ?>/<?php echo ($vo['id']); ?>.html"
                                            target="_blank"><?php echo ($vo['title']); ?></a></p>
                                    <p><?php echo (mbstr($vo['subtitle'],0,120)); ?>...<a rel="nofollow"
                                                                          href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/<?php echo ($vo['shortname']); ?>/<?php echo ($vo['id']); ?>.html"
                                                                          target="_blank">[详情]</a></p>
                                    <div class="item-bottom">
                                        <ul>
                                            <li><i class="fa fa-eye"></i><?php echo ((isset($vo['pv']) && ($vo['pv'] !== ""))?($vo['pv']):"0"); ?></li>
                                            <li class="item-time"><?php echo (date("Y-m-d H:i:s",$vo['addtime'])); ?></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <?php if($k == 3): ?><div class="fg-ad">
                                    <a rel="nofollow" href="/zhaobiao/" target="_blank"><img
                                            src="/assets/home/zixun/img/fg-ad.jpg" class="baiduab-beha"></a>
                                </div>
                                <?php elseif($k == 6): ?>
                                <div class="fg-ad">
                                    <a rel="nofollow" href="/zhaobiao/" target="_blank"><img
                                            src="/assets/home/zixun/img/fg-ad1.jpg" class="baiduab-beha"/></a>
                                </div><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </div>
                </div>
            </div>
            <div class="content pageContent">
                <?php echo ($listInfo["page"]); ?>
            </div>
        </div>
    </div>
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

    <script type="text/javascript" src="/assets/home/zixun/js/zxgl-slider.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript">
        $(function () {
            $("#tab").rTabs({
                bind: 'click',
                animation: 'fadein',
                auto: false
            });
        });
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