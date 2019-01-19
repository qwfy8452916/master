<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title><?php echo ($basic["head"]["title"]); ?></title>
    <meta name="keywords" content="<?php echo ($basic["head"]["keywords"]); ?>" />
    <meta name="description" content="<?php echo ($basic["head"]["description"]); ?>" />
    <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
    <meta content="telephone=no" name="format-detection" />
    <meta name="applicable-device" content="mobile" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="full-screen" content="yes" />
    <meta name="browsermode" content="application" />
    <meta name="x5-orientation" content="portrait" />
    <meta name="x5-fullscreen" content="true" />
    <meta name="x5-page-mode" content="app" />
    <?php if($showlocation == 1): ?><meta name="location" content="province=<?php echo ($cityInfo["province"]); ?>;city=<?php echo ($cityInfo["name"]); ?>;coord=<?php echo ($cityInfo["lng"]); ?>,<?php echo ($cityInfo["lat"]); ?>" /><?php endif; ?>
    <link href="<?php echo ($static_host); ?>/assets/mobile/common/css/m-reset.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link href="<?php echo ($static_host); ?>/assets/mobile/common/css/m-public.new.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/mobile/common/fonts/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>" />
    
<link href="http://<?php echo C('QZ_YUMINGWWW');?>/" rel="canonical" />
<link href="/assets/mobile/meitu/css/swiper-3.3.1.min.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link href="/assets/mobile/common/css/qzCitySelect.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link href="/assets/mobile/sub/css/m-home.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css">

    
</head>
<body>
    <div class="m-wrap">
        
        <header>
            
    <?php if(empty($cityInfo["bm"])): ?><a href="/" class="m-header-left gl-logo"></a>
    <?php else: ?>
        <a href="/<?php echo ($cityInfo["bm"]); ?>/" class="m-header-left gl-logo"></a><?php endif; ?>
    <div class="m-header-city"><a href="/city/">全国<i class="fa fa-sort-desc"></i></a></div>

            <div class="new-kefu-erji" id="new-kefu-erji"><div class="new-kefu-icon"></div></div>
            <!--头部菜单-->
            <div class="m-header-right" id="m-nav-switch">
    <i class="fa fa-bars"></i>
</div>
<div class="m-header-right" id="nav-close-cha">
    <i class="close-cha-icon"></i>
</div>
<div class="nav-fixed-box" id="nav-fixed-box"></div>
<!--<div class="mask-ticket"></div>-->
<ul class="new-nav-m" id="new-nav-m">
    <li><a href="/"  data-flag="shouye"><i class="home-nav-icon nav-home-icon"></i><span>首页</span></a></li>
    <li><a href="/sheji/" data-flag="sheji" rel="nofollow"><i class="home-nav-icon nav-huxing-icon"></i><span>户型设计</span></a></li>
    <li><a href="/baojia/"  data-flag="baojia" rel="nofollow"><i class="home-nav-icon nav-baojia-icon"></i><span>装修报价</span></a></li>
    <li>
        <?php if(empty($cityInfo['bm'])): ?><a href="http://m.<?php echo C('QZ_YUMING');?>/company/" data-flag="gongsi"><i class="home-nav-icon nav-company-icon"></i><span>找装修公司</span></a>
        <?php else: ?>
            <a href="/<?php echo ($cityInfo["bm"]); ?>/company/"  data-flag="gongsi"><i class="home-nav-icon nav-company-icon"></i><span>找装修公司</span></a><?php endif; ?>
    </li>
    <li><a href="/gonglue/" data-flag="gonglue"><i class="home-nav-icon nav-gonglue-icon"></i><span>装修攻略</span></a></li>
    <li><a href="/meitu/"  data-flag="xiaoguo"><i class="home-nav-icon nav-xiaoguo-icon"></i><span>装修效果图</span></a></li>
    <li><a href="/xgt/"  data-flag="anli"><i class="home-nav-icon nav-anli-icon"></i><span>装修案例</span></a></li>
    <li><a href="/ruzhu/"  data-flag="shangjia" rel="nofollow"><i class="home-nav-icon nav-ruzhu-icon"></i><span>商家入驻</span></a></li>
</ul>
<div class="new-kefu" id="new-kefu">
    <div class="new-kefu-close" id="new-kefu-close"><i class="fa fa-close"></i></div>
    <div class="new-kefu-main">
        <div class="new-kefu-fl">
            <a rel="nofollow" href="<?php echo OP('53kf_ty');?>">
                <div class="contact-btn"></div>
                <div class="contact-text"><span>在线咨询</span></div>
            </a>
        </div>

        <div class="new-huo-text"><span class="huo-text">或</span></div>

        <div class="new-kefu-fl">
            <a href="tel:4008-659-600">
                <div class="contact-btn phone-contact"></div>
                <div class="contact-text"><span>电话咨询</span></div>
            </a>
        </div>
    </div>
</div>

        </header>
        
    <!--引用页面-->
    <article>
        <!--轮播-->
        <div class="white_bg">
            <div class="swiper-container index-top-banner">
              <div class="swiper-wrapper">
                <?php if(is_array($info["lunbo"])): $i = 0; $__LIST__ = $info["lunbo"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="swiper-slide">
                      <a href="<?php echo ($vo["url"]); ?>"><img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_url"]); ?>-w1210c2.jpg" alt="<?php echo ($vo["title"]); ?>" /></a>
                  </div><?php endforeach; endif; else: echo "" ;endif; ?>
              </div>
              <div class="swiper-pagination"></div>
            </div>
            <!--导航-->
            <nav class="home-nav">
                <ul>
                    <li>
                        <a href="/baojia/">
                            <img src="/assets/mobile/sub/img/nav_zxbj.png"  alt="装修报价" />装修报价
                            <span><img src="/assets/mobile/sub/img/hot.gif" alt=""></span>
                        </a>
                    </li>
                    <li>
                        <a href="/sheji/">
                            <img src="/assets/mobile/sub/img/nav_hxsj.png"  alt="户型设计" />户型设计
                            <span><img src="/assets/mobile/sub/img/free.gif" alt=""></span>
                        </a>
                    </li>
                    <li>
                        <a href="/meitu/">
                            <img src="/assets/mobile/sub/img/nav_xgt.png"  alt="装修效果图" />装修效果图
                        </a>
                    </li>
                    <li>
                        <a href="/gonglue/">
                            <img src="/assets/mobile/sub/img/nav_zxgl.png"  alt="装修攻略" />装修攻略
                        </a>
                    </li>
                </ul>
            </nav>
            <!--小导航-->
            <ul class="home-nav-bottom">
               <li>
                   <a href="/video/">
                       <div class="nav_bottom_content">
                            <div class="nav_title">装修视频</div>
                            <div class="nav_detial">视频轻松学装修</div>
                       </div>
                   </a>
               </li>
               <li>
                    <a href="/xgt/">
                       <div class="nav_bottom_content">
                            <div class="nav_title">装修案例</div>
                            <div class="nav_detial">真实的装修参考</div>
                       </div>
                    </a>
               </li>
               <li>
                    <a href="/hl/">
                        <div class="nav_bottom_content">
                            <div class="nav_title">开工吉日</div>
                            <div class="nav_detial">趣味测算吉日</div>
                       </div>
                    </a>
               </li>
                <li>
                    <a href="/ruzhu/">
                        <div class="nav_bottom_content">
                            <div class="nav_title">商家入驻</div>
                            <div class="nav_detial">邀您加入合作共赢</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
            <!--招标-->
        <div class="white_bg">
            <div class="home-zb">
                <div class="home-zb-tit"><span>抢4份免费装修设计方案</span></div>
                <div class="today_num_box">
                  <div class="num_content">
                      <div class="left_title">
                        今日还剩
                      </div>
                      <div class="num_container">
                          <div class="num-item" id="bai">
                              <span class="radiu at_left"></span>
                              <div class="top_num">
                                  <div class="inner_top">1</div>
                              </div>
                              <div class="bottom_num">
                                  <div class="inner_bottom xzt">
                                      <div class="num_yl">1</div>
                                      <div class="num_up"></div>
                                  </div>
                              </div>
                              <span class="radiu at_right"></span>
                          </div>
                          <div class="num-item" id="shi">
                              <span class="radiu at_left"></span>
                              <div class="top_num">
                                  <div class="inner_top">0</div>
                              </div>
                              <div class="bottom_num">
                                  <div class="inner_bottom xzt">
                                      <div class="num_yl">0</div>
                                      <div class="num_up"></div>
                                  </div>
                              </div>
                              <span class="radiu at_right"></span>
                          </div>
                          <div class="num-item" id="ge">
                              <span class="radiu at_left"></span>
                              <div class="top_num">
                                  <div class="inner_top">0</div>
                              </div>
                              <div class="bottom_num">
                                  <div class="inner_bottom xzt">
                                      <div class="num_yl">0</div>
                                      <div class="num_up"></div>
                                  </div>
                              </div>
                              <span class="radiu at_right"></span>
                          </div>
                      </div>
                      <div class="left_title">
                        免费名额
                      </div>
                  </div>
                </div>


                <ul class="m-bj-edit">
                    <li>
                        <?php if(($mapUseInfo["vipcount"]) > "0"): ?><button id="showCityPicker2" class="c-zb-city" type="button">
                                <i class="fa fa-map-marker"></i>
                                <?php if(empty($info["cityarea"])): ?>请选择您所在的区域
                                <?php else: ?>
                                <?php echo ($mapUseInfo["provincefull"]); ?> <?php echo ($mapUseInfo["name"]); ?> <?php echo ($info["cityarea"]["name"]); endif; ?>
                            </button>
                            <input type="hidden" name="province" data-id="<?php echo ($mapUseInfo["pid"]); ?>">
                            <input type="hidden" name="city" data-id="<?php echo ($mapUseInfo["id"]); ?>">
                            <input type="hidden" name="area" data-id="<?php echo ($info["cityarea"]["id"]); ?>">
                        <?php else: ?>
                            <button id="showCityPicker2" class="c-zb-city" type="button">
                                <i class="fa fa-map-marker"></i>
                                请选择您所在的区域
                            </button>
                            <input type="hidden" name="province" data-id="">
                            <input type="hidden" name="city" data-id="">
                            <input type="hidden" name="area" data-id=""><?php endif; ?>
                    </li>
                    <li>
                        <input class="m-row-int1 m-bj-edit-list" type="text" name="name" maxlength="13" placeholder="怎么称呼您">
                    </li>
                    <li>
                        <input class="m-row-int1 m-bj-edit-list" type="tel" name="tel" maxlength="11" placeholder="输入手机号获取装修设计方案">
                        <input type="hidden" name="fb_type" value="sheji">
                    </li>
                    <li id="shenming">
                      <input type="checkbox" checked="checked" id="mianze">
                      <label for="mianze" id="check" class="fa fa-check"></label>
                      <span>我已阅读并同意齐装网的</span>
                      <a href="http://<?php echo C('MOBILE_DONAMES');?>/about/disclaimer"><span>《免责申明》</span></a>
                    </li>
                </ul>
                <a href="javascript:void(0)" class="m-b-btn">立即领取</a>
            </div>
        </div>
        <!--精品案例-->
        <div class="home-sec">
            <div class="home-sec-title">
                <h2 class="pull-left">装修效果图</h2>
                <a href="/meitu/" class="more pull-right">更多></a>
            </div>
            <div class="type-list">
                <div class="parent-list">
                    <ul id="menu_list">
                        <li class="menu_active">大户型</li>
                        <li>小户型</li>
                        <li>复式楼</li>
                        <li>别墅</li>
                    </ul>
                </div>
                <div class="children-list">
                    <div class="list-box" id="wrapper">
                        <ul class="children-content">
                            <li>
                                <a href="/meitu/list-l0f12h7c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fkb643Zl1fmajMyYdr4WFb3_S00z-w640.jpg" alt="">
                                    <div class="img_detail">简约风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f13h7c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fl8y8UvKMOobrvCLtoJ4kl5YjS-1-w640.jpg" alt="">
                                    <div class="img_detail">田园风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f4h7c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fl1U-keP1HwM3wnCzZ-c_fuLsPxi-w640.jpg" alt="">
                                    <div class="img_detail">中式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f8h7c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fru1gVeTndfrqT-DjQM6qloRwCFb-w640.jpg" alt="">
                                    <div class="img_detail">欧式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f7h7c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FjXLELSAU6n6KlRuBzgu13oD6ADo-w640.jpg" alt="">
                                    <div class="img_detail">美式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f17h7c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FmpJZF63Zr4FS3G1-4SkhMavauAU-w640.jpg" alt="">
                                    <div class="img_detail">混搭风格</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="list-box">
                        <ul class="children-content">
                            <li>
                                <a href="/meitu/list-l0f12h10c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Flt74McbSv-noQKcfyOQYZK-VggO-w640.jpg" alt="">
                                    <div class="img_detail">简约风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f13h10c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FstFjSputBFz6iCpDS4pxh8K7nIY-w640.jpg" alt="">
                                    <div class="img_detail">田园风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f4h10c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FjMdmyEnv3rFKKQLhhtHx5htIrDl-w640.jpg" alt="">
                                    <div class="img_detail">中式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f8h10c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fh998GSRhHiTcQP2yrT5BpWfwWtg-w640.jpg" alt="">
                                    <div class="img_detail">欧式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f7h10c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Flor30npndT8MFTBIVUlIoYIlxxM-w640.jpg" alt="">
                                    <div class="img_detail">美式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f17h10c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FlYbMxGh-XwxIQ3y8SABZiLFW0ud-w640.jpg" alt="">
                                    <div class="img_detail">混搭风格</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="list-box">
                        <ul class="children-content">
                            <li>
                                <a href="/meitu/list-l0f12h9c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fo4llkgII7IpkIruFn08pPScEICw-w640.jpg" alt="">
                                    <div class="img_detail">简约风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f13h9c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FgeHIW27AVBk7DfIF8kkxb22ii6f-w640.jpg" alt="">
                                    <div class="img_detail">田园风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f4h9c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FpAu1ektPTHHM_kJcJY-vQtI2B3Z-w640.jpg" alt="">
                                    <div class="img_detail">中式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f8h9c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fg0lQuGvMZWj_B8-6fYboe8L9EYL-w640.jpg" alt="">
                                    <div class="img_detail">欧式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f7h9c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FvzO9fDZN5SdQNSCiDbHlU1ATjKh-w640.jpg" alt="">
                                    <div class="img_detail">美式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f17h9c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fu7UfwJ2xyWSkGpyJdBr0aumI1tn-w640.jpg" alt="">
                                    <div class="img_detail">混搭风格</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="list-box">
                        <ul class="children-content">
                            <li>
                                <a href="/meitu/list-l0f12h8c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fl7iKEiefgZb0gtLOYSp_6iXX1M3-w640.jpg" alt="">
                                    <div class="img_detail">简约风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f13h8c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FsLObPb5W_2R6vLmkR-e-ctOyFxi-w640.jpg" alt="">
                                    <div class="img_detail">田园风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f4h8c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FpjGQgGSNRFaxa0HU5Yt5og_6t3m-w640.jpg" alt="">
                                    <div class="img_detail">中式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f8h8c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fux28LPGFQS3nH0U1Rwtng_hWUBt-w640.jpg" alt="">
                                    <div class="img_detail">欧式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f7h8c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fim68x1W3j-wSUY24im1qcgG3io9-w640.jpg" alt="">
                                    <div class="img_detail">美式风格</div>
                                </a>
                            </li>
                            <li>
                                <a href="/meitu/list-l0f17h8c0">
                                    <img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FllbR-n6S1pMLt9W-RkmCY7QSNh0-w640.jpg" alt="">
                                    <div class="img_detail">混搭风格</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <!--学装修-->
        <div class="home-sec">
            <div class="home-sec-title">
                <h2 class="pull-left">学装修</h2>
            </div>
            <div class="type-list">
                <ul id="study_list">
                    <li class="menu_active">装修视频</li>
                    <li>装修攻略</li>
                    <li>装修百科</li>
                </ul>
                <div class="study_content">
                    <!--装修视频-->
                    <div class="study_content_list study_item menu_chose">
                        <ul class="study_content_baike">
                            <li>
                                <a href="/video/jubu/">
                                    <div class="baike_img"><div class="mask-start"><i class="fa fa-play"></i></div><img src="/assets/mobile/sub/img/video_jubu.jpg" alt="局部装修"></div>
                                    <div class="baike_content">
                                        <div class="baike_title">局部装修</div>
                                        <div class="baike_detail">
                                            准备工作做的好，将来不会有烦恼
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="/video/daogou/">
                                    <div class="baike_img"><div class="mask-start"><i class="fa fa-play"></i></div><img src="/assets/mobile/sub/img/video_saomang.jpg" alt="装修扫盲"></div>
                                    <div class="baike_content">
                                        <div class="baike_title">装修扫盲</div>
                                        <div class="baike_detail">
                                            放坑小知识，助你快乐装新家
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="/video/xuancai/">
                                    <div class="baike_img"><div class="mask-start"><i class="fa fa-play"></i></div><img src="/assets/mobile/sub/img/video_xuancai.jpg" alt="选材导购"></div>
                                    <div class="baike_content">
                                        <div class="baike_title">选材导购</div>
                                        <div class="baike_detail">
                                            验房软装，教你轻松搞定
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <a href="/video/" class="seeMore">查看更多></a>
                    </div>
                    <!--装修攻略-->
                    <div class="study_content_list study_item">
                        <ul class="study_content_baike">
                            <?php if(is_array($info["article"])): $i = 0; $__LIST__ = $info["article"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><li>
                                    <a href="/gonglue/<?php echo ($vi["shortname"]); ?>/<?php echo ($vi["id"]); ?>.html">
                                        <div class="baike_img">
                                            <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vi["face"]); ?>-w640.jpg" alt="<?php echo ($vi["title"]); ?>">
                                        </div>
                                        <div class="baike_content">
                                            <div class="baike_title"><?php echo ($vi["title"]); ?></div>
                                            <div class="baike_detail"><?php echo ($vi["subtitle"]); ?></div>
                                        </div>
                                    </a>
                                </li><?php endforeach; endif; else: echo "" ;endif; ?>
                        </ul>
                        <a href="/gonglue/" class="seeMore">查看更多></a>
                    </div>
                    <!--装修百科-->
                    <div class="study_content_list study_item">
                        <ul class="study_content_baike">
                            <?php if(is_array($info["baike"])): $i = 0; $__LIST__ = $info["baike"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><li>
                                    <a href="/baike/<?php echo ($vi["id"]); ?>.html">
                                        <div class="baike_img">
                                            <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vi["thumb"]); ?>-w640.jpg" alt="<?php echo ($vi["title"]); ?>">
                                        </div>
                                        <div class="baike_content">
                                            <div class="baike_title"><?php echo ($vi["title"]); ?></div>
                                            <div class="baike_detail">
                                                <?php echo ($vi["description"]); ?>
                                            </div>
                                        </div>
                                    </a>
                                </li><?php endforeach; endif; else: echo "" ;endif; ?>
                        </ul>
                        <a href="/baike/" class="seeMore">查看更多></a>
                    </div>
                </div>
            </div>
        </div>
        <!--学经验-->
        <div class="home-sec">
            <div class="home-sec-title">
                <h2 class="pull-left">学经验</h2>
            </div>
            <div class="type-list">
                <ul id="study_list2">
                    <li class="menu_active">装修流程</li>
                    <li>装修日记</li>
                    <li>装修问答</li>
                </ul>
                <div class="study_content">
                    <!-- 装修流程 -->
                    <div class="study_content_list study_item2 menu_chose">
                        <ul class="study_content_zxlc">
                            <li>
                                <a href="/gonglue/shoufang/">
                                    <div class="zxlc_fl">装修前</div>
                                </a>
                                <a href="/gonglue/<?php echo ($info["jingyan"]["lc"]["1"]["shortname"]); ?>/<?php echo ($info["jingyan"]["lc"]["1"]["id"]); ?>.html">
                                    <div class="zxlc_title"><?php echo ($info["jingyan"]["lc"]["1"]["title"]); ?></div>
                                    <div class="zxlc_content"><?php echo ($info["jingyan"]["lc"]["1"]["subtitle"]); ?></div>
                                </a>
                            </li>
                            <li>
                                <a href="/gonglue/chagai/">
                                    <div class="zxlc_fl">装修中</div>
                                </a>
                                <a href="/gonglue/<?php echo ($info["jingyan"]["lc"]["2"]["shortname"]); ?>/<?php echo ($info["jingyan"]["lc"]["2"]["id"]); ?>.html">
                                    <div class="zxlc_title"><?php echo ($info["jingyan"]["lc"]["2"]["title"]); ?></div>
                                    <div class="zxlc_content"><?php echo ($info["jingyan"]["lc"]["2"]["subtitle"]); ?></div>
                                </a>
                            </li>
                            <li>
                                <a href="/gonglue/jianche/">
                                    <div class="zxlc_fl">装修后</div>
                                </a>
                                <a href="/gonglue/<?php echo ($info["jingyan"]["lc"]["3"]["shortname"]); ?>/<?php echo ($info["jingyan"]["lc"]["3"]["id"]); ?>.html">
                                    <div class="zxlc_title"><?php echo ($info["jingyan"]["lc"]["3"]["title"]); ?></div>
                                    <div class="zxlc_content"><?php echo ($info["jingyan"]["lc"]["3"]["subtitle"]); ?></div>
                                </a>
                            </li>
                        </ul>
                        <a href="/gonglue/lc/" class="seeMore">查看更多></a>
                    </div>
                    <!-- 装修日记 -->
                    <div class="study_content_list study_item2">
                        <ul class="study_content_zxrj">
                            <?php if(is_array($info["jingyan"]["riji"])): $i = 0; $__LIST__ = $info["jingyan"]["riji"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><li>
                                    <div class="zxrj_tx">
                                        <img src="<?php echo ($vi["user_logo"]); ?>" class="tx_img"><span><?php echo ($vi["user_name"]); ?></span>
                                    </div>
                                    <a href="/riji/d<?php echo ($vi["id"]); ?>.html">
                                        <div class="baike_title"><?php echo ($vi["title"]); ?></div>
                                    </a>
                                     <div class="zxrj_content">
                                        <div class="pull-left"><?php echo date('Y-m-d', $vi['diary_time']);?></div>
                                        <div class="pull-right"><i class="fa fa-commenting"></i>&nbsp;<span><?php echo ($vi["reply_count"]); ?></span></div>
                                        <div class="pull-right"><i class="fa fa-eye"></i>&nbsp;<span><?php echo ($vi["page_view"]); ?></span></div>
                                    </div>
                                </li><?php endforeach; endif; else: echo "" ;endif; ?>
                        </ul>
                        <a href="/riji/" class="seeMore">查看更多></a>
                    </div>
                    <!-- 装修问答 -->
                    <div class="study_content_list study_item2">
                        <ul class="study_content_zxrj">
                            <?php if(is_array($info["jingyan"]["wenda"])): $i = 0; $__LIST__ = $info["jingyan"]["wenda"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><li>
                                    <div class="zxrj_tx">
                                        <img src="<?php echo ($vi["user_logo"]); ?>" class="tx_img"><span><?php echo ($vi["user_name"]); ?></span>
                                    </div>
                                    <a href="/wenda/x<?php echo ($vi["id"]); ?>.html">
                                        <div class="baike_title"><?php echo ($vi["title"]); ?></div>
                                    </a>
                                     <div class="zxrj_content">
                                        <div class="pull-left"><?php echo date('Y-m-d', $vi['post_time']);?></div>
                                        <div class="pull-right"> |&nbsp;&nbsp;<span class="red-color"><?php echo ($vi["anwsers"]); ?></span>人回答</div>
                                        <div class="pull-right"><span class="red-color"><?php echo ($vi["sub_category_name"]); ?></span></div>
                                    </div>
                                </li><?php endforeach; endif; else: echo "" ;endif; ?>
                        </ul>
                        <a href="/wenda/" class="seeMore">查看更多></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="home-sec">
            <div class="home-sec-title">
                <h2 class="pull-left">找装修公司</h2>
                <a href="/company/" class="more pull-right">更多></a>
            </div>
            <div class="company_box" id="wrapper1">
                <ul class="company_box_list">
                    <?php if(is_array($info["company"])): $i = 0; $__LIST__ = $info["company"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><li class="pull-left">
                            <a href="/<?php echo ($vi["bm"]); ?>/company_home/<?php echo ($vi["id"]); ?>/">
                                <div class="company_zp">
                                    <img src="/assets/mobile/sub/img/bg_xgt.jpg">
                                </div>
                                <div class="company_logo">
                                    <img src="<?php echo ($vi["logo"]); ?>" alt="<?php echo ($vi["jc"]); ?>">
                                </div>
                                <div class="company_info">
                                    <div class="company_name"><?php echo ($vi["jc"]); ?></div>
                                        <div class="company_star">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                    <div class="company_pl"><?php echo ($vi["comment_count"]); ?>条评论</div>
                                </div>
                            </a>
                        </li><?php endforeach; endif; else: echo "" ;endif; ?>
                </ul>
            </div>
        </div>
        <div class="home-sec">
            <div class="home-sec-title">
                <h2 class="pull-left">装修报价计算器</h2>
            </div>
             <div class="money-box">
                <div class="money-main">
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
                    <div class="home-style">
                        <span>客厅：?元</span>
                        <span>厨房：?元</span>
                        <span>卧室：?元</span>
                        <span>卫生间：?元</span>
                        <span>水电：?元</span>
                        <span>其他：?元</span>
                    </div>
                </div>
                <!-- from表单填写 -->
                <div class="form-once ">
                    <ul class="m-bj-edit">
                        <li id="area">
                            <div>
                                <button id="showCityPicker3" class="c-zb-city" type="button">
                                    <i class="fa fa-map-marker">
                                    </i>
                                    <?php if(empty($info["cityarea"])): ?>请选择您所在的区域
                                    <?php else: ?>
                                    <?php echo ($mapUseInfo["provincefull"]); ?> <?php echo ($mapUseInfo["name"]); ?> <?php echo ($info["cityarea"]["name"]); endif; ?>
                                </button>
                                <input type="hidden" name="province" data-id="<?php echo ($mapUseInfo["pid"]); ?>">
                                <input type="hidden" name="city" data-id="<?php echo ($mapUseInfo["id"]); ?>">
                                <input type="hidden" name="area" data-id="<?php echo ($info["cityarea"]["id"]); ?>">
                            </div>
                        </li>
                        <li>
                            <input class="m-row-int1 m-bj-edit-list" type="number" name="mianji" placeholder="请输入您的房屋面积" value="<?php echo ($_GET['mianji']); ?>">
                            <span class="dw">
                                ㎡
                            </span>
                        </li>
                        <li>
                            <input class="m-row-int1 m-bj-edit-list" type="tel" maxlength="11" name="tel-number" placeholder="请输入您的手机号获取报价结果">
                            <input type="hidden" name="fb_type" value="baojia">
                        </li>
                        <li id="shenming2">
                          <input type="checkbox" checked="checked" id="mianze2">
                          <label for="mianze2" id="check2" class="fa fa-check"></label>
                          <span>我已阅读并同意齐装网的</span>
                          <a href="http://<?php echo C('MOBILE_DONAMES');?>/about/disclaimer"><span>《免责申明》</span></a>
                        </li>
                    </ul>
                    <!-- 立即计算报价按钮 -->
                    <a class="m-b-btn save-submit">
                        立即计算报价
                    </a>
                </div>
                <!-- from2表单填写 -->
                <div class="form-again hide">
                    <div class="form-again-img"><img src="/assets/mobile/baojia/img/baojia-item4.jpg"></div>

                    <ul class="m-bj-edit">
                        <li>
                            <input class="m-row-int1 m-bj-edit-list" type="text" name="nametop" maxlength="13" placeholder="怎么称呼您">
                        </li>
                        <li>
                            <input class="m-row-int1 m-bj-edit-list" type="text" name="xiaoqu" placeholder="填写小区名称以便准确匹配">
                        </li>
                    </ul>
                    <!-- 立即计算报价按钮 -->
                    <a class="m-b-btn save-submit-again">
                        立即计算报价
                    </a>
                </div>
            </div>
            <div class="white-box"></div>
        </div>
    </article>
    <!-- <div id="zxkf">
        <a rel="nofollow" href="<?php echo OP('53kf_ty');?>"><img src="/assets/mobile/common/img/kefu.png" alt="在线客服"></a>
    </div> -->
    <input type="hidden" name="hide_city_id" value="<?php echo ($info["cityarea"]["id"]); ?>">
    <div id="gotop" style="display: none;"><i class="fa fa-angle-up fa-lg"></i><br>置顶</div>

        
            <footer id="footer">
    <p class="footer-tel">
    	<span>装修咨询热线:</span>
        <a href="tel:4008-659-600" class="hot"><span class="phone-box"><i class="fa fa-phone"></i></span><?php echo OP('QZ_CONTACT_TEL400');?></a>
    </p>
    <p class="footer-title">轻松装修乐无忧</p>
    <p class="footer-webadress">
        手机齐装网：<?php echo C('MOBILE_DONAMES');?>&nbsp;&nbsp;<?php echo OP('QZ_BEIAN_INFO');?>
    </p>
    <p>苏州云网通信息科技有限公司</p>
    <p class="foot-discliamer">本站内容齐装网保留所有权利·不承担法律责任</p>
    <script>
        window.onload=function(){
            var prevUrl=document.referrer;
            var romainUrl=new RegExp("http://m.qizuang.com");
            $(".m-header-his").click(function(){
                if($(this).length>0){
                    if(!romainUrl.test(prevUrl)){
                        window.location.href="http://m.qizuang.com";
                    }else{
                        window.history.back();
                    }
                }
            });
        }
    </script>
</footer>
        
    </div>
    <script type="text/javascript" src="/assets/mobile/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/order.js?v=<?php echo C('ORDER_JS_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/mobile/common/js/common.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/mobile/common/js/fixed.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/mobile/common/js/disclaimer.js?v=<?php echo C('STATIC_VERSION');?>"></script>

    
    <script type="text/javascript" src="/assets/mobile/common/js/swiper/swiper.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=12a80d1749e9de182e12c6201d5e191c"></script>
    <script type="text/javascript" src="/assets/mobile/common/js/geolocation.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="//<?php echo C('QINIU_DOMAIN');?>/<?php echo OP('ALL_REAL_VIP_PCA_JSON');?>"></script>
    <script type="text/javascript" src="/assets/mobile/js/jroll.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/mobile/common/js/qzCitySelect.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/mobile/sub/js/initIndex.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript">
    $(document).ready(function(){
      var mySwiper = new Swiper('.index-top-banner', {
        //移动端轮播
        loop : true,
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: true,
      });

      var mySwiper2 = new Swiper('.jiaju-sc', {
        //家具商城轮播
        loop : false,
        slidesPerView:3,
        autoplay: true,
      });



    　　// 城市选择插件
        selectQz.init({
            province:$("input[name=province]").attr("data-id"),
            city:$("input[name=city]").attr("data-id"),
            area:$("input[name=area]").attr("data-id")
        });

        $('.save-submit').on('click',function() {
            var checked2 = $("#mianze2").is(':checked');

            window.order({
                extra:{
                    cs:$('input[name=city]').attr('data-id'),
                    qx:$('input[name=area]').attr('data-id'),
                    mianji:$(".m-bj-edit input[name=mianji]").val(),
                    tel:$(".m-bj-edit input[name=tel-number]").val(),
                    fb_type:$("input[name=fb_type]").val(),
                    source: '17111550',
                    save:1
                },
                error:function(){
                    alert("发生了未知的错误,请稍后再试！");
                },
                success:function(data, status, xhr){
                    if ($('.form-again').hasClass('hide')) {
                        $('.form-again').fadeIn(300).removeClass('hide');
                        $('.form-once').hide();
                    }
                },
                validate:function(item, value, method, info){
                    if (('cs' == item || 'qx' == item) && 'notempty' == method) {
                        alert(info);
                        return false;
                    };
                    if ('mianji' == item && '' != method) {
                        alert(info);
                        $(".m-bj-edit input[name=mianji]").val("");
                        $(".m-bj-edit input[name=mianji]").focus();
                        return false;
                    };
                    if ('tel' == item && '' != method) {
                        alert(info);
                        $(".m-bj-edit input[name=tel-number]").focus();
                        return false;
                    };
                    if(!checked2){
                        alert('请勾选我已阅读并同意齐装网的《免责申明》！')
                        return false;
                    }
                    return true;
                }
            });
        });
        // 立即计算报价
        $('.save-submit-again').on('click',function(){
            window.order({
                extra:{
                    name:$(".m-bj-edit input[name=nametop]").val(),
                    xiaoqu:$(".m-bj-edit input[name=xiaoqu]").val(),
                    tel:$("input[name=tel-number]").val(),
                    source: '17111550',
                    save:1
                },
                error:function(){
                    alert("发生了未知的错误,请稍后再试！");
                },
                success:function(data, status, xhr){
                    if(data.status == 1){
                        window.location.href = "http://<?php echo C('MOBILE_DONAMES');?>/details/";
                    }else{
                        alert(data.info);
                    }
                },
                validate:function(item, value, method, info){
                    if ('name' == item && '' != method) {
                        alert(info);
                        $(".m-bj-edit input[name=nametop]").focus();
                        return false;
                    };
                    if ('xiaoqu' == item && 'notempty' == method) {
                        alert(info);
                        $(".m-bj-edit input[name=xiaoqu]").focus();
                        return false;
                    };
                    return true;
                }
            });
        });
        //切换免责对勾
        $("#check2").click(function(){
          $(this).toggleClass('fa-check');
        })
    });

    </script>
    <!--熊掌号-->
    <script type="application/ld+json">
        {
            "@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
            "@id": "http://<?php echo ($_SERVER['SERVER_NAME']); echo ($_SERVER["REQUEST_URI"]); ?>",
            "appid": "1575859058891466",
            "title": "<?php echo ($basic["head"]["title"]); ?>",
            "images": [],
            "pubDate": ""
        }
    </script>
    <script>

      +function(){
          // 置顶
          $(window).on("scroll", function(){
              if($(document).scrollTop()>="1000"){
                  $('#gotop').css('display',"block");
              }else{
                  $('#gotop').css('display',"none");
              }
          });
          $("#gotop").click(function(){
              $('body,html').animate({scrollTop:0},500);
              return false;
          });
      }()
    </script>

    <?php echo OP('baidutongji1','yes');?>
    
        <?php echo OP('yycollect','yes');?>
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


    
    
    <?php if($showTmp == 1): ?><script type="text/javascript" src="/assets/mobile/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<link rel="stylesheet" href="/assets/mobile/calculator/css/calculator.css?v=<?php echo C('STATIC_VERSION');?>">
<script src="/assets/mobile/calculator/js/calculator.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<div id="calculator">
    <div class="calculator-container">
        <div class="calculator-area">
            <div class="closed"><i id="calculator-closed" class="fa fa-times"></i></div>
            <div class="calculator-item">
                <table class="calculator-title">
                    <td style="font-size:0.2rem"><span>8</span></td><td>秒免费估算装修该花多少钱</td>
                </table>
                <p style="padding-bottom: 0">今天已有 <span id="num"><?php echo fbrs();?></span> 位业主获取装修预算</p>
            </div>
            <form>
                <div class="calculator-item">
                    <div class="input-box">
                        <input type="number" placeholder="输入您的房屋面积" name="mianji" class="mianji"/><div class="danwei">㎡</div>
                    </div>
                </div>
                <div class="calculator-item">
                    <div class="input-box">
                        <?php if(($mapUseInfo["vipcount"]) > "0"): ?><button id="showCityPicker4" class="c-zb-city" type="button">
                                <i class="site fa fa-map-marker"></i>
                                <?php if(empty($info["cityarea"])): ?>请选择您所在的区域
                                <?php else: ?>
                                <?php echo ($mapUseInfo["provincefull"]); ?> <?php echo ($mapUseInfo["name"]); ?> <?php echo ($info["cityarea"]["name"]); endif; ?>
                            </button>
                            <input type="hidden" name="province" data-id="<?php echo ($mapUseInfo["pid"]); ?>">
                            <input type="hidden" name="city" data-id="<?php echo ($mapUseInfo["id"]); ?>">
                            <input type="hidden" name="area" data-id="<?php echo ($info["cityarea"]["id"]); ?>">
                        <?php else: ?>
                            <button id="showCityPicker4" class="c-zb-city" type="button">
                                <i class="site fa fa-map-marker"></i>
                                请选择您所在的区域
                            </button>
                            <input type="hidden" name="province" data-id="">
                            <input type="hidden" name="city" data-id="">
                            <input type="hidden" name="area" data-id=""><?php endif; ?>
                    </div>
                </div>
                <div class="calculator-item">
                    <div class="input-box">
                        <input type="text" placeholder="您的小区，以便估算报价" name="xiaoqu" id="xiaoqu">
                    </div>
                </div>
                <div class="calculator-item">
                    <div class="input-box">
                        <input type="tel" maxlength="11" placeholder="输入手机号码获取报价清单" name="tel">
                    </div>
                </div>
                <div class="calculator-item" id="shenming2" style="width: 80%;margin: 0 auto;">
                    <input type="checkbox" checked="checked" id="mianze2">
                    <label for="mianze2" id="check2" class="fa fa-check"></label>
                    <span>我已阅读并同意齐装网的</span>
                    <a href="http://<?php echo C('MOBILE_DONAMES');?>/about/disclaimer"><span>《免责申明》</span></a>
                </div>
                <div class="calculator-item">
                    <div class="input-box border-none" style="margin-top:2px;">
                       <div id="btnSave">立即免费计算</div>
                    </div>
                </div>

            </form>
            <div class="prompt">
                <span>*</span> 为了您的权益，您的隐私将被严格保密
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    //切换免责对勾
    $("#check2").click(function(){
        $(this).toggleClass('fa-check');
    });
    $("#calculator #btnSave").click(function(event) {
        var container = $(this).parents("#calculator");
        var checked = $("#mianze").is(':checked');
        if(!checked){
            alert('请勾选我已阅读并同意齐装网的《免责申明》！')
            return false;
        }
        window.order({
            extra:{
                mianji:$("input[name=mianji]",container).val(),
                cs: $('input[name=city]',container).attr('data-id'),
                qx: $('input[name=area]',container).attr('data-id'),
                xiaoqu:$("input[name=xiaoqu]",container).val(),
                tel:$("input[name=tel]",container).val(),
                source: '340'
            },
            error:function(){
                return true;
            },
            success:function(data, status, xhr){
                if(data.status == 1){
                    window.location.href = "/details/";
                }else{
                    alert(data.info);
                }
            },
            validate:function(item, value, method, info){
                if (('cs' == item || 'qx' == item) && 'notempty' == method) {
                    alert(method);
                    return false;
                };
                if ('mianji' == item && '' != method) {
                    alert(info);
                    //$("input[name=mianji]",container).val("");
                    // $("input[name=mianji]",container).focus();
                    return false;
                };
                if ('xiaoqu' == item && 'notempty' == method) {
                    alert(info);
                    // $("input[name=xiaoqu]").focus();
                    return false;
                };

                if(!isNaN($("#xiaoqu").val())){
                    // $("input[name=xiaoqu]").focus();
                    alert("小区名称不能是纯数字");
                    return false;
                }
                if ('tel' == item && '' != method) {
                    alert(info);
                    // $("input[name=tel]",container).focus();
                    //$("input[name=tel]",container).val('');
                    return false;
                };
                return true;
            }
        });
    });
</script><?php endif; ?>
    <?php if($showTmp == 2): ?><script type="text/javascript" src="/assets/mobile/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<link rel="stylesheet" href="/assets/mobile/calculator/css/calculator.css?v=<?php echo C('STATIC_VERSION');?>">
<script src="/assets/mobile/calculator/js/calculator.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<div id="calculator">
    <div class="calculator-container">
        <div class="calculator-area">
            <div class="closed"><i id="calculator-closed" class="fa fa-times"></i></div>
            <div class="calculator-item">
                <table class="calculator-title">
                    <td style="font-size:0.2rem"> <span>10</span> </td><td>秒免费申请 <span>4</span> 份户型设计</td>
                </table>
                <p style="padding-bottom: 0">今天已有 <span id="num"><?php echo fbrs();?></span> 位业主获取了免费设计</p>
            </div>
            <form action="">
                <div class="calculator-item">
                    <div class="input-box">
                        <input type="number" placeholder="输入您的房屋面积" name="mianji" class="mianji"/><div class="danwei">㎡</div>
                    </div>
                </div>
                <div class="calculator-item">
                    <div class="input-box">
                        <?php if(($mapUseInfo["vipcount"]) > "0"): ?><button id="showCityPicker4" class="c-zb-city" type="button">
                                <i class="site fa fa-map-marker"></i>
                                <?php if(empty($info["cityarea"])): ?>请选择您所在的区域
                                <?php else: ?>
                                <?php echo ($mapUseInfo["provincefull"]); ?> <?php echo ($mapUseInfo["name"]); ?> <?php echo ($info["cityarea"]["name"]); endif; ?>
                            </button>
                            <input type="hidden" name="province" data-id="<?php echo ($mapUseInfo["pid"]); ?>">
                            <input type="hidden" name="city" data-id="<?php echo ($mapUseInfo["id"]); ?>">
                            <input type="hidden" name="area" data-id="<?php echo ($info["cityarea"]["id"]); ?>">
                        <?php else: ?>
                            <button id="showCityPicker4" class="c-zb-city" type="button">
                                <i class="site fa fa-map-marker"></i>
                                请选择您所在的区域
                            </button>
                            <input type="hidden" name="province" data-id="">
                            <input type="hidden" name="city" data-id="">
                            <input type="hidden" name="area" data-id=""><?php endif; ?>
                    </div>
                </div>
                <div class="calculator-item">
                    <div class="input-box">
                        <input type="text" placeholder="输入您的小区" name="xiaoqu">
                    </div>
                </div>
                <div class="calculator-item">
                    <div class="input-box">
                        <input type="text" minlength="11" maxlength="11" placeholder="输入手机号码获取设计方案" name="tel">
                    </div>
                </div>
                <div class="calculator-item" id="shenming2" style="width: 80%;margin: 0 auto;">
                        <input type="checkbox" checked="checked" id="mianze2">
                        <label for="mianze2" id="check2" class="fa fa-check"></label>
                        <span>我已阅读并同意齐装网的</span>
                        <a href="http://<?php echo C('MOBILE_DONAMES');?>/about/disclaimer"><span>《免责申明》</span></a>

                </div>
                <div class="calculator-item">
                    <div class="input-box border-none" style="margin-top:2px;margin-bottom: 10px;">
                         <div id="btnSave">免费申请</div>
                    </div>
                </div>
            </form>
            <div class="prompt">
                <span>*</span>  为了您的权益，您的隐私将被严格保密
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    //切换免责对勾
    $("#check2").click(function(){
        $(this).toggleClass('fa-check');
    });
    $("#calculator #btnSave").click(function(event) {
        var container = $(this).parents("#calculator");

        var mianji = $("input[name=mianji]",container).val();
        var xiaoqu = $("input[name=xiaoqu]",container).val();
        var tel = $("input[name=tel]",container).val();

        var cs = $('input[name=city]',container).attr('data-id');
        var qx = $('input[name=area]',container).attr('data-id');


        if (!App.validate.run(mianji)) {
           $("input[name=mianji]",container).focus();
            alert("请输入您的面积");
            return false;
        }
        if (xiaoqu == '') {
            alert("亲，您还没有填写小区名称！");
            return false;
        }
        var re = /^[0-9]+(.[0-9]{1,2})?$/gi;
        if (re.test(xiaoqu)) {
            $("input[name=xiaoqu]",container).focus();
            alert("亲，请填写正确的小区名称！");
            return false;
        }

        if (!App.validate.run(xiaoqu)) {
            $("input[name=xiaoqu]",container).focus();
            alert("请输入您的小区");
            return false;
        }
        if (!App.validate.run(tel)) {
            $("input[name=tel]",container).focus();
            $("input[name=tel]",container).val('');
            alert("请填写正确的手机号码 ^_^!");
            return false;
        }else{
            var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
            var reg2 = new RegExp("^174|175[0-9]{8}$");
            if(!reg.test(tel) || reg2.test(tel)){
                $("input[name=tel]",container).focus();
                $("input[name=tel]",container).val('');
                alert("请填写正确的手机号码 ^_^!");
                return false;
            }
        }

        if('' == cs || '' == qx){
            alert('请选择您所在的区域 ≧▽≦')
            return false;
        }

        var checked2 = $("#mianze2").is(':checked');
        if(!checked2){
            alert('请勾选我已阅读并同意齐装网的《免责申明》！')
            return false;
        }

        window.order({
            extra:{
                cs: cs,
                qx: qx,
                mianji:$("input[name=mianji]",container).val(),
                tel:$("input[name=tel]",container).val(),
                xiaoqu:$("input[name=xiaoqu]",container).val(),
                source: '341',
                step:'sheji'
            },
            error:function(){
                return true;
            },
            success:function(data, status, xhr){
                if(data.status == 1){
                     $("body").find("#calculator").remove();
                     // $("body").append(data.data.tmp);
                     location.reload();
                }else{
                    alert(data.info);
                }
            },
            validate:function(item, value, method, info){
                return true;
            }
        });
    });
</script><?php endif; ?>

    <!-- baidu AB 测试代码 -->
    <script>
        var baiduAB = baiduAB || {};
        window.baiduAB = baiduAB;
        (function(){
            baiduAB.endTime = 1543507200000;
            baiduAB.date = new Date();
            baiduAB.time = baiduAB.date.getTime();
            if (baiduAB.time <= baiduAB.endTime) {
            baiduAB.newScript = document.createElement('script');
            baiduAB.newScript.setAttribute('charset', 'utf-8');
            baiduAB.newScript.src = 'https://zz.bdstatic.com/abtest/abtest-zy-wall.js';
            baiduAB.first = document.body.firstChild;
            document.body.insertBefore(baiduAB.newScript, baiduAB.first);
            };
        })();
    </script>
</body>
</html>