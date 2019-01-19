<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="renderer" content="webkit" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
<?php if(isset($info["mobileagent"])): ?><meta name="mobile-agent" content="format=html5;url=<?php echo ($info["mobileagent"]); ?>" /><?php endif; ?>
<title><?php echo ($keys["title"]); ?>-<?php echo ($title); ?></title>
<meta name="keywords" content="<?php echo ($keys["keywords"]); ?>" />
<meta name="description" content="<?php echo ($keys["description"]); ?>" />
<link href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_case/<?php echo ($userInfo["user"]["id"]); ?>" rel="canonical" />
<link rel="stylesheet" type="text/css" href="<?php echo ($static_host); ?>/assets/sub/companyhome/css/company-pub.css?v=<?php echo C('STATIC_VERSION');?>" />
<link rel="stylesheet" type="text/css" href="<?php echo ($static_host); ?>/assets/sub/companyhome/css/company-imgs.css?v=<?php echo C('STATIC_VERSION');?>" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/tooltips/tooltips.css?v=<?php echo C('STATIC_VERSION');?>"/>
<link href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/all.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet"/>
<link href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/minimal/red.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet"/>
<link href="<?php echo ($static_host); ?>/assets/common/css/step.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link href="<?php echo ($static_host); ?>/assets/common/css/window.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />

<!--S小贴士-->
<link rel="stylesheet" href="/assets/home/about/css/swiper-3.3.1.min.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" href="/assets/common/css/xiaotieshi.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" type="text/css" href="/assets/common/css/daohang20180712.css?v=<?php echo C('STATIC_VERSION');?>"/>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<!--E小贴士-->

<!--[if IE]>
    <script src="<?php echo ($static_host); ?>/assets/common/js/html5shiv.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="<?php echo ($static_host); ?>/assets/xiaoguotu/js/css3-mediaqueries.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<![endif]-->
<!--[if lte IE 7]>
    <script  type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/json2.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<![endif]-->
<!--[if lte IE 8]> <link rel="stylesheet" type="text/css" href="/assets/home/ie/forie.css?v=<?php echo C('STATIC_VERSION');?>"/> <![endif]-->
<!--[if lte IE 9]> <link rel="stylesheet" type="text/css" href="/assets/home/ie/forie.css?v=<?php echo C('STATIC_VERSION');?>"/> <![endif]-->
</head>
<body>
<!-- 新头部 -->
<div class="pub-top">
    <div class="wrap">
        <div class="city">
            <i class="fa fa-map-marker location" style=" margin-top: 6px;"></i>
            <strong><?php echo ($cityInfo["name"]); ?></strong>
            <?php if($cityInfo['adj_city']): ?><i style="font-size: 14px; margin-top:0;font-style:normal">[</i>
                <?php if(is_array($cityInfo["adj_city"])): $i = 0; $__LIST__ = $cityInfo["adj_city"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if(!empty($vo['bm'])): ?><a href="http://<?php echo ($vo["bm"]); ?>.<?php echo C('QZ_YUMING');?>" rel="nofollow" target="_blank" style=" margin:0 2px;"><?php echo ($vo["name"]); ?></a><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                <i style="margin-right:3px;font-size: 14px;margin-top:0;font-style:normal">]</i><?php endif; ?>
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
        <a href="http://<?php echo C('QZ_YUMINGWWW');?>/zxbj/?source=18013034" target="_blank">
            <img width="50" height="39" src="/assets/common/img/zhinengbaojia.gif" alt="智能报价" />
        </a>
    </div>
</div>
<div class="pub-head-empty"></div>

<!--S 头-->
<div class="c-head">
    <div class="c-wrap">
        <div class="c-mark">
            <?php if($userInfo['user']['logo'] != ''): ?><img src="<?php echo ($userInfo["user"]["logo"]); ?>" width="126" height="63" alt="<?php echo ($userInfo["user"]["qc"]); ?>"/>
            <?php else: ?>
            <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo OP('DEFAULT_COMPANY_LOGO');?>" width="126" height="63" alt="齐装网" /><?php endif; ?>
        </div>
        <div class="c-info-box">
            <h1 class="com-tit"><?php echo ($userInfo["user"]["qc"]); if($userInfo['user']['fake'] == 0 AND $userInfo['user']['on'] == 2): ?><i  title="该公司已认证"></i><?php endif; ?>
            </h1>
            <div class="com-tit2"><?php echo (mbstr($userInfo["user"]["kouhao"],0,30)); ?></div>
            <div class="com-info">
                <ul class="com-star">
                    <li><span>设计水平</span>
                    <?php if((($userInfo['user']['avgsj'] != 0 AND $userInfo['user']['avgsj'] >= 9) OR($userInfo['user']['avgsj'] == 0 AND $userInfo['user']['avgcount'] >= 9))): ?><i></i><i></i><i></i><i></i><i></i>
                    <?php elseif((($userInfo['user']['avgsj'] != 0 AND$userInfo['user']['avgsj'] >= 8 AND $userInfo['user']['avgsj'] < 9)OR($userInfo['user']['avgsj'] == 0 AND $userInfo['user']['avgcount'] >= 8 AND $userInfo['user']['avgcount'] < 9))): ?>
                    <i></i><i></i><i></i><i></i>
                    <?php elseif((($userInfo['user']['avgsj'] != 0 AND$userInfo['user']['avgsj'] >= 4 AND $userInfo['user']['avgsj'] < 8)OR($userInfo['user']['avgsj'] == 0 AND $userInfo['user']['avgcount'] >= 4 AND $userInfo['user']['avgcount'] < 8))): ?>
                    <i></i><i></i><i></i>
                    <?php elseif((($userInfo['user']['avgsj'] != 0 AND$userInfo['user']['avgsj'] >= 2 AND $userInfo['user']['avgsj'] < 4)OR($userInfo['user']['avgsj'] == 0 AND $userInfo['user']['avgcount'] >= 2 AND $userInfo['user']['avgcount'] < 4))): ?>
                    <i></i><i></i>
                    <?php else: ?>
                    <i></i><?php endif; ?></li>
                    <li><span>服务态度</span>
                    <?php if((($userInfo['user']['avgfw'] != 0 AND $userInfo['user']['avgfw'] >= 9) OR($userInfo['user']['avgfw'] == 0 AND $userInfo['user']['avgcount'] >= 9))): ?><i></i><i></i><i></i><i></i><i></i>
                    <?php elseif((($userInfo['user']['avgfw'] != 0 AND$userInfo['user']['avgfw'] >= 8 AND $userInfo['user']['avgfw'] < 9)OR($userInfo['user']['avgfw'] == 0 AND $userInfo['user']['avgcount'] >= 8 AND $userInfo['user']['avgcount'] < 9))): ?>
                    <i></i><i></i><i></i><i></i>
                    <?php elseif((($userInfo['user']['avgfw'] != 0 AND$userInfo['user']['avgfw'] >= 4 AND $userInfo['user']['avgfw'] < 8)OR($userInfo['user']['avgfw'] == 0 AND $userInfo['user']['avgcount'] >= 4 AND $userInfo['user']['avgcount'] < 8))): ?>
                    <i></i><i></i><i></i>
                    <?php elseif((($userInfo['user']['avgfw'] != 0 AND$userInfo['user']['avgfw'] >= 2 AND $userInfo['user']['avgfw'] < 4)OR($userInfo['user']['avgfw'] == 0 AND $userInfo['user']['avgcount'] >= 2 AND $userInfo['user']['avgcount'] < 4))): ?>
                    <i></i><i></i>
                    <?php else: ?>
                    <i></i><?php endif; ?>
                    </li>
                    <li><span>施工质量</span>
                    <?php if((($userInfo['user']['avgsg'] != 0 AND $userInfo['user']['avgsg'] >= 9) OR($userInfo['user']['avgsg'] == 0 AND $userInfo['user']['avgcount'] >= 9))): ?><i></i><i></i><i></i><i></i><i></i>
                    <?php elseif((($userInfo['user']['avgsg'] != 0 AND$userInfo['user']['avgsg'] >= 8 AND $userInfo['user']['avgsg'] < 9)OR($userInfo['user']['avgsg'] == 0 AND $userInfo['user']['avgcount'] >= 8 AND $userInfo['user']['avgcount'] < 9))): ?>
                    <i></i><i></i><i></i><i></i>
                    <?php elseif((($userInfo['user']['avgsg'] != 0 AND$userInfo['user']['avgsg'] >= 4 AND $userInfo['user']['avgsg'] < 8)OR($userInfo['user']['avgsg'] == 0 AND $userInfo['user']['avgcount'] >= 4 AND $userInfo['user']['avgcount'] < 8))): ?>
                    <i></i><i></i><i></i>
                    <?php elseif((($userInfo['user']['avgsg'] != 0 AND$userInfo['user']['avgsg'] >= 2 AND $userInfo['user']['avgsg'] < 4)OR($userInfo['user']['avgsg'] == 0 AND $userInfo['user']['avgcount'] >= 2 AND $userInfo['user']['avgcount'] < 4))): ?>
                    <i></i><i></i>
                    <?php else: ?>
                    <i></i><?php endif; ?>
                    </li>
                </ul>
                <a class="com-btn" id="btnTop" href="javascript:;">免费设计与报价</a>
            </div>
        </div>
    </div>
</div>
<!--E 头-->
<div class="c-nav-box">
    <ul class="c-nav">
        <li class="c-top-step allserve"><a href="#">&nbsp;</a>
        <div id="stepall">
            <dl class="fstep">
              <dt class="st1" data-title="一键免费申请"> <i>免费量房验房</i> 专业检测仪器，验房有保障
                  <div class="fstep-int">
                      <div class="fstep-int-left"><img src="/assets/common/img/1-1.png">
                          <h2>拒绝开发商用各项理由"大事化小"<br>不放过自己的每一项权利！</h2>
                          <h3>漏水、裂缝、气泡等质量问题一网打尽！</h3>
                      </div>
                  </div>
              </dt>
              <dt class="st2"  data-title="获取4套设计方案"><i>免费4份不同设计</i> 严格审核图纸，不收任何费用
                  <div class="fstep-int">
                      <div class="fstep-int-left"><img src="/assets/common/img/1-2.png">
                          <h2>合理的采光色调及空间布局！<br>理想的风水规划,专业人办专业事儿！</h2>
                          <h3>4套设计全面PK,让你的装修绝不后悔！</h3>
                      </div>
                  </div>
              </dt>
              <dt class="st3"  data-title="获取详细预算清单"><i>免费<?php echo date("Y");?>新报价</i>准确预算，货比三家不上当
                  <div class="fstep-int">
                      <div class="fstep-int-left"><img src="/assets/common/img/1-3.png">
                          <h2>主材辅料费用,运输及人工成本等一目了然！<br>您千万不要当"冤大头"！</h2>
                          <h3>全照国家标准,0漏项,0增项,远离被"蒙"！</h3>
                      </div>
                  </div>
              </dt>
              <dt class="st4"  data-title="马上获取预算报价"><i>免费申请第三方监管</i>细致装修，后期有保障
                  <div class="fstep-int">
                      <div class="fstep-int-left"><img src="/assets/common/img/1-4.png">
                          <h2>详细预算清单,4份不同报价挤干水份！<br>花1分钟可省万元！</h2>
                          <h3>环保材料,透明报价,土豪也能省！</h3>
                      </div>
                  </div>
              </dt>
          </dl>
          <form class="secbox_form" onsubmit="return false;">
              <div class="fstep-int-right">
                    <span class="zbtitle">快速免费申请</span>
                    <div class="lines"><span>您的姓名:</span><input name="name" type="text" placeholder="您的姓名"></div>
                    <div class="lines"><span>您的手机:</span>
                        <input name="tel" type="text" placeholder="接收方案的手机">
                        <input type="hidden" name="fb_type" value="sheji">
                    </div>
                    <div class="lines" style="height:26px"><span>装修类型:</span>
                          <input name="lx" type="radio" id="house1" class="icheck" value="1" checked>
                          <label class="mr" for="house1">家装</label>
                          <input id="house2" name="lx" type="radio" class="icheck" value="2">
                          <label for="house2">公装</label>
                    </div>
                    <a id="fstep-btn" href="javascript:void(0)" class="btn">一键免费申请</a>
                    <p>今日已有 <em class="red"><?php echo releaseCount("fbrs");?></em> 户业主成功免费申请！
                    <br>本月申请人数已达 <em class="red"><?php echo releaseCount("fbzrs");?></em> 人</p>
              </div>
          </form>
        </div>
        </li>
        <li><a href="/company_home/<?php echo ($userInfo["user"]["id"]); ?>/">首页</a></li>
        <li><a href="/company_team/<?php echo ($userInfo["user"]["id"]); ?>/">设计师</a></li>
        <li><a href="/company_case/<?php echo ($userInfo["user"]["id"]); ?>/">装修案例</a></li>
        <li><a href="/company_event/<?php echo ($userInfo["user"]["id"]); ?>/">优惠活动</a></li>
        <li><a href="/company_about/<?php echo ($userInfo["user"]["id"]); ?>/">关于我们</a></li>
    </ul>
</div>
<script type="text/javascript" src="/assets/common/js/hm.min.js?ver=1&md=<?php echo time();?>"></script>
<script type="text/javascript" src="/assets/home/about/js/swiper-3.3.1.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="/assets/common/js/disclamer.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript">

jQuery(document).ready(function($) {

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
            if(scrollTop>30){
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
});
</script>


<div class="c-wrap ofw">
    <div class="c-bread">
        <a href="/"><?php echo ($cityinfo["name"]); ?>装修</a> >
        <a href="/company/"><?php echo ($cityinfo["name"]); ?>装修公司</a> >
        <a href="/company_home/<?php echo ($userInfo["user"]["id"]); ?>/" title="<?php echo ($userInfo["user"]["qc"]); ?>">公司详情</a> >
        <span>装修案例</span>
    </div>
    <div class="c-long-zb">
        <p class="form">
            <span>免费获取4份户型设计与报价方案</span>
            <input type="text" name="name" placeholder="请填写您的姓名">
            <input type="tel" name="tel" placeholder="请填写您的手机号" maxlength="11">
            <button class="sjbjbtn">立即申请</button>
        </p>
        <p class="bottom-tip">极速获取，已有<?php echo releaseCount("fbrs");?>人成功申请</p>
    </div>
    <div class="c-left-box">
        <ul class="c-left-nav">
            <li>
                <b>家装案例</b>
                <?php if(is_array($userInfo["jzTypes"])): $i = 0; $__LIST__ = $userInfo["jzTypes"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a rel="nofollow" href="/company_case/<?php echo ($userInfo["user"]["id"]); ?>/?cl=1&t=<?php echo ($vo["huxing"]); ?>" <?php if($choose_menu == 'cl=1&t='.$vo['huxing']): ?>class="active"<?php endif; ?>><?php echo ($vo["name"]); ?>(<?php echo ($vo["count"]); ?>)&gt;</a><?php endforeach; endif; else: echo "" ;endif; ?>
                <b>公装案例</b>
                <?php if(is_array($userInfo["gzTypes"])): $i = 0; $__LIST__ = $userInfo["gzTypes"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a rel="nofollow" href="/company_case/<?php echo ($userInfo["user"]["id"]); ?>/?cl=2&t=<?php echo ($vo["leixing"]); ?>" <?php if($choose_menu == 'cl=2&t='.$vo['leixing']): ?>class="active"<?php endif; ?>><?php echo ($vo["name"]); ?>(<?php echo ($vo["count"]); ?>)&gt;</a><?php endforeach; endif; else: echo "" ;endif; ?>
                <b>在建工地</b>
                <?php if(is_array($userInfo["zjTypes"])): $i = 0; $__LIST__ = $userInfo["zjTypes"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a rel="nofollow" href="/company_case/<?php echo ($userInfo["user"]["id"]); ?>/?cl=3&t=<?php echo ($vo["huxing"]); ?>" <?php if($choose_menu == 'cl=3&t='.$vo['huxing']): ?>class="active"<?php endif; ?>><?php echo ($vo["name"]); ?>(<?php echo ($vo["count"]); ?>)&gt;</a><?php endforeach; endif; else: echo "" ;endif; ?>
                <b><a href="/company_case/<?php echo ($userInfo["user"]["id"]); ?>/?cl=4">3D效果图</a></b>
            </li>
        </ul>
    </div>

    <div class="c-right-box">
        <ul class="c-anli">
            <?php if(is_array($userInfo["cases"])): $i = 0; $__LIST__ = $userInfo["cases"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                <?php if($_GET['cl'] == 4): ?><a href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/3d-case<?php echo ($vo["id"]); ?>.html" target="_blank">
                <?php else: ?>
                    <a href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/caseinfo/<?php echo ($vo["id"]); ?>.shtml" target="_blank"><?php endif; ?>
                <?php if($vo['img_host'] == 'qiniu' AND !empty($vo['img'])): ?><img alt="<?php echo ($vo["title"]); ?>" src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_path"]); ?>-w240.jpg">
                <?php elseif($vo['img_host'] != 'qiniu' AND !empty($vo['img'])): ?>
                <img alt="<?php echo ($vo["title"]); ?>" src="http://<?php echo C('STATIC_HOST1'); echo ($vo["img_path"]); ?>s_<?php echo ($vo["img"]); ?>">
                <?php else: ?>
                <img alt="<?php echo ($vo["title"]); ?>"  src="https://staticqn.qizuang.com/jjdg/2018/08/041613218a69d8956-w240.jpg"><?php endif; ?>
                </a>
                <div class="c-anli-list for_ie_bg">
                    <h3><a title="<?php echo ($vo["title"]); ?>" href="http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/caseinfo/<?php echo ($vo["id"]); ?>.shtml" target="_blank">
                        <?php echo ($vo["title"]); ?></a>
                    </h3>
                    <p><span><?php echo ($vo["mianji"]); ?>M²</span><span>|</span><span><?php echo ($vo["jiage"]); ?></span><span>|</span><span><?php echo ($vo["fg"]); ?></span></p>
                </div>
            </li><?php endforeach; endif; else: echo "" ;endif; ?>
        </ul>
    </div>
    <!--S 分页-->
    <div class="pagebox">
    <?php echo ($userInfo["page"]); ?>
    </div>
    <!--E 分页-->
</div>

<script type="text/javascript" src="<?php echo ($cityfile); ?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/order.js?v=<?php echo C('ORDER_JS_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/tooltips/jquery.pure.tooltips.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/icheck/icheck.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/cors.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.cookie.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/popwin.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript">
var shen = null,shi = null;
shen = citys["shen"];
shi = citys["shi"];

$(function(){


		$(".sjbjbtn").click(function(event) {
			var _this = $(this);
			var container = $(".c-long-zb");
			//检查姓名
            if (!App.validate.run($("input[name=name]",container).val())) {
                $.pt({
					target: _this,
					content: "请输入您的称呼",
					width: 'auto'
				});
				return false;
            } else {
                var reg = new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$");
                if (!reg.test($("input[name=name]",container).val())) {
                    $("input[name=name]",container).focus();
                    $("input[name=name]",container).val('');
                    $.pt({
						target: _this,
						content: "请输入正确的名称，只支持中文和英文",
						width: 'auto'
					});
					return false;
                }
            }


			if (!App.validate.run($("input[name=tel]", container).val())) {
					$.pt({
							target: _this,
							content: "请填写正确的手机号码 ^_^!",
							width: 'auto'
					});
					return false;
			} else {
                var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
                if (!reg.test($("input[name=tel]", container).val())) {
                    $("input[name=tel]", container).addClass('focus').focus();
                    $("input[name=tel]", container).val('');
                    alert("请填写正确的手机号码 ^_^!");
                    return false;
                }
            }
			var data = {
					tel: $("input[name=tel]",container).val(),
					fb_type: $("input[name=fb_type]",container).val(),
					name: $("input[name=name]",container).val(),
					cs: "<?php echo ($cityInfo["id"]); ?>",
					select_comid : '<?php echo ($userInfo["user"]["id"]); ?>',
					source: '167',
					step:2
			};

			window.order({
			    extra:data,
			    error:function(){},
			    success:function(data, status, xhr){
			    	if (data.status == 1) {
							$("body").append(data.data.tmp);
					} else {
						$.pt({
								target: _this,
								content: data.info,
								width: 'auto'
						});
					}
			    },
			    validate:function(item, value, method, info){
			        return true;
			    }
			});
		});


		$('.icheck').iCheck({
				checkboxClass: 'icheckbox_minimal-red',
				radioClass: 'iradio_minimal-red',
				increaseArea: ''
		});

		$(".allserve").mouseover(function(event) {
				$('#stepall').show();
		});

		$(".fstep dt").mouseover(function(event) {
				$(".fstep-int").hide();
				$(this).find(".fstep-int").show();
				$('.fstep-int-right').show();
				$(".fstep-int-right").find(".btn").html($(this).attr("data-title"));
				$(".fstep-int-right").find("input[name=name]").focus();
		});

		$(".allserve").mouseleave(function(event) {
				$('.fstep-int-right').hide();
				$(".fstep-int").hide();
				$('#stepall').hide();
		});

		$("#fstep-btn").click(function(event) {
			var  _this = $(this);
			$(".secbox_focus").removeClass('secbox_focus');
			if (!App.validate.run($(".fstep-int-right input[name=tel]").val())) {
				 	$(".fstep-int-right input[name=tel]").focus().addClass('secbox_focus');
					//显示提示
					$.pt({
							target: $(".fstep-int-right input[name=tel]"),
							content: '请填写正确的手机号码 ^_^!',
							width: 'auto'
					});
					return false;
			} else {
	            var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
	            if (!reg.test($(".fstep-int-right input[name=tel]").val())) {
	                $(".fstep-int-right input[name=tel]").focus().addClass('secbox_focus');
	                $(".fstep-int-right input[name=tel]").val('');
					//显示提示
					$.pt({
							target: $(".fstep-int-right input[name=tel]"),
							content: '请填写正确的手机号码 ^_^!',
							width: 'auto'
					});
					return false;
	            }
	        }

	        window.order({
			    extra:{
			    	cs:"<?php echo ($cityInfo["id"]); ?>",
					name:$(".fstep-int-right input[name=name]").val(),
					tel:$(".fstep-int-right input[name=tel]").val(),
					fb_type:$(".fstep-int-right input[name=fb_type]").val(),
					lx:$(".fstep-int-right input[name=lx]").val(),
					source: 166,
					safecode: $("#safecode").val(),
					safekey: $("#safekey").val(),
					ssid: "<?php echo ($ssid); ?>",
					select_comid : '<?php echo ($userInfo["user"]["id"]); ?>',
					step: 2
			    },
			    error:function(){
			    	$.pt({
							target: _this,
							content: "发布失败,请刷新页面！",
							width: 'auto'
					});
			    },
			    success:function(data, status, xhr){
			    	$("#safecode").val(data.data.safecode);
					$("#safekey").val(data.data.safekey);
					if (data.status == 1) {
							$("body").append(data.data.tmp);
					} else {
							$.pt({
									target: _this,
									content: data.info,
									width: 'auto'
							});
					}
			    },
			    validate:function(item, value, method, info){
			        return true;
			    }
			});
		});

		$("#btnTop").click(function(event) {
				$.ajax({
						url: '/dispatcher/',
						type: 'POST',
						dataType: 'JSON',
						data: {
								type:"step1",
								cid:"<?php echo ($cityInfo["id"]); ?>",
								select_comid : '<?php echo ($userInfo["user"]["id"]); ?>',
								source:169
						}
				})
				.done(function(data) {
						if(data.status == 1){
								$("body").append(data.data);
						}
				});
		});

		$(".c-nav-box >ul> li").removeClass('active').eq(<?php echo ($tabIndexOld); ?>).addClass('active');
})
</script>

<script type="text/javascript">
$(function(){
    $('.c-left-nav').find("[href='<?php echo ($userInfo["url"]); ?>']").addClass('active');
});
</script>
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

<!--伸缩广告-->
<?php if($zb_bottom_s): echo ($zb_bottom_s); endif; ?>

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
</html>