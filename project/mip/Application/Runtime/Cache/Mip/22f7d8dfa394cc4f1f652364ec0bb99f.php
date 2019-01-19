<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html mip>
    <head>
        <meta charset="utf-8" />
        <title><?php echo ((isset($head["title"]) && ($head["title"] !== ""))?($head["title"]):装修效果图_2017室内家装装饰设计效果图大全-齐装网装修效果图); ?></title>
        <meta name="keywords" content="<?php echo ($head["keywords"]); ?>" />
        <meta name="description" content="<?php echo ($head["description"]); ?>" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <meta content="telephone=no" name="format-detection" />
        <meta name="applicable-device" content="mobile" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="full-screen" content="yes" />
        <meta name="browsermode" content="application" />
        <meta name="x5-orientation" content="portrait" />
        <meta name="x5-fullscreen" content="true" />
        <meta name="x5-page-mode" content="app" />
        <link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/v1/mip.css">
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public.css?v=<?php echo C('STATIC_VERSION');?>">
        
    <link rel="canonical" href="http://m.qizuaung.com"/>
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/index/css/css.css?v=<?php echo C('STATIC_VERSION');?>">

        
    </head>
    <body>
        <div class="m-wrap">
            
            <div class="header">
                <div class="m-header-his">
                    <a data-type="mip" href="<?php echo ($global_basehost); ?>/"><i class="fa fa-angle-left"></i></a>
                </div>
                <a  data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/<?php echo ($cityInfo["bm"]); ?>/" class="m-header-left">
                    <mip-img src="/assets/mobile/common/img/logonew.png" class></mip-img>
                </a>
                
   <div class="m-header-tit">
        <div class="m-header-city"><a href="<?php echo ($global_basehost); ?>/city/">全国<i class="fa fa-sort-desc"></i></a></div>
   </div>

                <a  data-type='mip' href="tel:4008-659-600" class="hot"><div class="new-kefu-erji" id="new-kefu-erji"><div class="new-kefu-icon"></div></div></a>
                <div class="m-header-right" id="m-nav-switch"><i class="fa fa-bars" on="tap:right-sidebar.open"></i></div>
            </div>
            
    <mip-carousel
        autoplay
        defer="2000"
        layout="responsive"
        width="600"
        height="260"
        indicatorId="mip-carousel-example">
        <?php if(is_array($info["lunbo"])): $i = 0; $__LIST__ = $info["lunbo"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a data-type="mip" href="<?php echo ($vo["url"]); ?>">
                <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_url"]); ?>-w1210c2.jpg" alt="<?php echo ($vo["title"]); ?>"></mip-img>
            </a><?php endforeach; endif; else: echo "" ;endif; ?>
    </mip-carousel>
    <div class="mip-carousel-indicator-wrapper">
        <div class="mip-carousel-indicatorDot" id="mip-carousel-example">
            <div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>
            <?php for($i=0; $i<$lunboCount-1; $i++){ ?>
                <div class="mip-carousel-indecator-item"></div>
            <?php } ?>
        </div>
    </div>
    <div class="white_bg">
        <div class="home-nav">
            <ul>
                <li>
                    <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/baojia?src=mip">
                        <mip-img src="/assets/index/images/nav_zxbj.png"></mip-img>
                        装修报价
                    </a>
                    <span>
                        <mip-img src="/assets/index/images/hot.gif"></mip-img>
                    </span>
                </li>
                <li>
                    <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/sheji?src=mip">
                        <mip-img src="/assets/index/images/nav_hxsj.png"></mip-img>
                        户型设计
                    </a>
                    <span>
                        <mip-img src="/assets/index/images/free.gif"></mip-img>
                    </span>
                </li>
                <li>
                    <a data-type="mip" href="<?php echo ($global_basehost); ?>/meitu">
                        <mip-img src="/assets/index/images/nav_xgt.png"></mip-img>
                        装修效果图
                    </a>
                </li>
                <li>
                    <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/">
                        <mip-img src="/assets/index/images/nav_zxgl.png"></mip-img>
                        装修攻略
                    </a>
                </li>
            </ul>
        </div>
        <div class="home-nav-bottom">
            <li>
                <a data-type="mip" href="http://mip.qizuang.com/video/">
                    <div class="nav_bottom_content">
                        <div class="nav_title">装修视频</div>
                        <div class="nav_detial">视频轻松学装修</div>
                   </div>
                </a>
            </li>
            <li>
                <a data-type="mip" href="http://mip.qizuang.com/xgt/">
                    <div class="nav_bottom_content">
                        <div class="nav_title">装修案例</div>
                        <div class="nav_detial">真实的装修参考</div>
                   </div>
                </a>
            </li>
            <li>
                <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/hl/">
                    <div class="nav_bottom_content">
                        <div class="nav_title">开工吉日</div>
                        <div class="nav_detial">趣味测算吉日</div>
                   </div>
                </a>
            </li>
            <li>
                <a data-type="mip" href="http://mip.qizuang.com/activity/">
                    <div class="nav_bottom_content">
                        <div class="nav_title">活动专题</div>
                        <div class="nav_detial">精彩活动不停</div>
                   </div>
                </a>
            </li>
        </div>
    </div>
    <div class="white_bg">
        <div class="link-banner">
            <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/sheji?src=mip">
                <mip-img src="/assets/index/images/sheji.jpg"></mip-img>
            </a>
        </div>
    </div>
    <div class="white_bg">
        <div class="home-sec">
            <div class="home-sec-title">
                <h2 class="pull-left">装修效果图</h2>
                <a data-type="mip" href="http://mip.qizuang.com/meitu/" class="more pull-right">更多 ></a>
            </div>
        </div>
        <div class="zxxgt">
            <mip-vd-tabs>
                <section>
                    <li>大户型</li>
                    <li>小户型</li>
                    <li>复式楼</li>
                    <li>别墅</li>
                </section>
                <div class="tab-content">
                    <mip-vd-tabs allow-scroll>
                        <section>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f12h7c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fkb643Zl1fmajMyYdr4WFb3_S00z"></mip-img>
                                    <div class="img_detail">简约风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f13h7c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fl8y8UvKMOobrvCLtoJ4kl5YjS-1"></mip-img>
                                    <div class="img_detail">田园风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f4h7c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fl1U-keP1HwM3wnCzZ-c_fuLsPxi"></mip-img>
                                    <div class="img_detail">中式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f8h7c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fru1gVeTndfrqT-DjQM6qloRwCFb"></mip-img>
                                    <div class="img_detail">欧式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f7h7c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FjXLELSAU6n6KlRuBzgu13oD6ADo"></mip-img>
                                    <div class="img_detail">美式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f17h7c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FmpJZF63Zr4FS3G1-4SkhMavauAU"></mip-img>
                                    <div class="img_detail">混搭风格</div>
                                </a>
                            </li>
                    </mip-vd-tabs>
                </div>
                <div class="tab-content">
                    <mip-vd-tabs allow-scroll>
                        <section>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f12h10c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Flt74McbSv-noQKcfyOQYZK-VggO"></mip-img>
                                    <div class="img_detail">简约风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f13h10c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FstFjSputBFz6iCpDS4pxh8K7nIY"></mip-img>
                                    <div class="img_detail">田园风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f4h10c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FjMdmyEnv3rFKKQLhhtHx5htIrDl"></mip-img>
                                    <div class="img_detail">中式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f8h10c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fh998GSRhHiTcQP2yrT5BpWfwWtg"></mip-img>
                                    <div class="img_detail">欧式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f7h10c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Flor30npndT8MFTBIVUlIoYIlxxM"></mip-img>
                                    <div class="img_detail">美式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f17h10c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FlYbMxGh-XwxIQ3y8SABZiLFW0ud"></mip-img>
                                    <div class="img_detail">混搭风格</div>
                                </a>
                            </li>
                    </mip-vd-tabs>
                </div>
                <div class="tab-content">
                    <mip-vd-tabs allow-scroll>
                        <section>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f12h9c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fo4llkgII7IpkIruFn08pPScEICw"></mip-img>
                                    <div class="img_detail">简约风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f13h9c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FgeHIW27AVBk7DfIF8kkxb22ii6f"></mip-img>
                                    <div class="img_detail">田园风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f4h9c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FpAu1ektPTHHM_kJcJY-vQtI2B3Z"></mip-img>
                                    <div class="img_detail">中式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f8h9c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fg0lQuGvMZWj_B8-6fYboe8L9EYL"></mip-img>
                                    <div class="img_detail">欧式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f7h9c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FvzO9fDZN5SdQNSCiDbHlU1ATjKh"></mip-img>
                                    <div class="img_detail">美式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f17h9c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fu7UfwJ2xyWSkGpyJdBr0aumI1tn"></mip-img>
                                    <div class="img_detail">混搭风格</div>
                                </a>
                            </li>
                    </mip-vd-tabs>
                </div>
                <div class="tab-content">
                    <mip-vd-tabs allow-scroll>
                        <section>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f12h8c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fl7iKEiefgZb0gtLOYSp_6iXX1M3"></mip-img>
                                    <div class="img_detail">简约风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f13h8c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FsLObPb5W_2R6vLmkR-e-ctOyFxi"></mip-img>
                                    <div class="img_detail">田园风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f4h8c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FpjGQgGSNRFaxa0HU5Yt5og_6t3m"></mip-img>
                                    <div class="img_detail">中式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f8h8c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fux28LPGFQS3nH0U1Rwtng_hWUBt"></mip-img>
                                    <div class="img_detail">欧式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f7h8c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/Fim68x1W3j-wSUY24im1qcgG3io9"></mip-img>
                                    <div class="img_detail">美式风格</div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="http://mip.qizuang.com/meitu/list-l0f17h8c0">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/20171108/FllbR-n6S1pMLt9W-RkmCY7QSNh0"></mip-img>
                                    <div class="img_detail">混搭风格</div>
                                </a>
                            </li>
                    </mip-vd-tabs>
                </div>
            </mip-vd-tabs>
        </div>
    </div>
    <div class="white_bg">
        <div class="home-sec">
            <div class="home-sec-title">
                <h2 class="pull-left">学装修</h2>
                <!--<a data-type="mip" href="" class="more pull-right">更多 ></a>-->
            </div>
        </div>
        <div class="zxxgt">
            <mip-vd-tabs>
                <section>
                    <li>装修视频</li>
                    <li>装修攻略</li>
                    <li>装修百科</li>
                </section>
                <div class="study_content">
                    <ul class="study_content_baike">
                        <li>
                            <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/video/jubu/">
                                <div class="baike_img"><div class="mask-start"><i class="fa fa-play"></i></div><mip-img src="/assets/index/images/video_jubu.jpg" alt="局部装修"></mip-img></div>
                                <div class="baike_content">
                                    <div class="baike_title">局部装修</div>
                                    <div class="baike_detail">
                                        准备工作做的好，将来不会有烦恼
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/video/daogou/">
                                <div class="baike_img"><div class="mask-start"><i class="fa fa-play"></i></div><mip-img src="/assets/index/images/video_saomang.jpg" alt="装修扫盲"></mip-img></div>
                                <div class="baike_content">
                                    <div class="baike_title">装修扫盲</div>
                                    <div class="baike_detail">
                                        放坑小知识，助你快乐装新家
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/video/xuancai/">
                                <div class="baike_img"><div class="mask-start"><i class="fa fa-play"></i></div><mip-img src="/assets/index/images/video_xuancai.jpg" alt="选材导购"></mip-img></div>
                                <div class="baike_content">
                                    <div class="baike_title">选材导购</div>
                                    <div class="baike_detail">
                                        验房软装，教你轻松搞定
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/video/" class="seeMore">查看更多&gt;</a>
                </div>

                <!--装修攻略-->
                <div class="study_content">
                    <ul class="study_content_baike">
                        <?php if(is_array($info["article"])): $i = 0; $__LIST__ = $info["article"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><li>
                                <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/<?php echo ($vi["shortname"]); ?>/<?php echo ($vi["id"]); ?>.html">
                                    <div class="baike_img">
                                        <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vi["face"]); ?>" alt="<?php echo ($vi["title"]); ?>"></mip-img>
                                    </div>
                                    <div class="baike_content">
                                        <div class="baike_title"><?php echo ($vi["title"]); ?></div>
                                        <div class="baike_detail"><?php echo ($vi["subtitle"]); ?></div>
                                    </div>
                                </a>
                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                    <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/" class="seeMore">查看更多&gt;</a>
                </div>

                <!--装修百科-->
                <div class="study_content">
                    <ul class="study_content_baike">
                        <?php if(is_array($info["baike"])): $i = 0; $__LIST__ = $info["baike"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><li>
                                <a data-type="mip" href="<?php echo ($global_basehost); ?>/baike/<?php echo ($vi["id"]); ?>.html">
                                    <div class="baike_img">
                                        <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vi["thumb"]); ?>" alt="<?php echo ($vi["title"]); ?>"></mip-img>
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
                    <a data-type="mip" href="<?php echo ($global_basehost); ?>/baike/" class="seeMore">查看更多&gt;</a>
                </div>
            </mip-vd-tabs>
        </div>
    </div>

    <!--学装修-->
    <div class="white_bg">
        <div class="home-sec">
            <div class="home-sec-title">
                <h2 class="pull-left">学经验</h2>
                <!--<a data-type="mip" href="" class="more pull-right">更多 ></a>-->
            </div>
        </div>
        <div class="zxxgt">
            <mip-vd-tabs>
                <section>
                    <li>装修流程</li>
                    <li>装修日记</li>
                    <li>装修问答</li>
                </section>
                <!--装修流程-->
                <div class="study_content">
                    <div class="study_content">
                        <ul class="study_content_zxlc">
                            <li>
                                <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/shoufang/">
                                    <div class="zxlc_fl">装修前</div>
                                </a>
                                <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/<?php echo ($info["jingyan"]["lc"]["1"]["shortname"]); ?>/<?php echo ($info["jingyan"]["lc"]["1"]["id"]); ?>.html">
                                    <div class="zxlc_title"><?php echo ($info["jingyan"]["lc"]["1"]["title"]); ?></div>
                                    <div class="zxlc_content"><?php echo ($info["jingyan"]["lc"]["1"]["subtitle"]); ?></div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/chagai/">
                                    <div class="zxlc_fl">装修中</div>
                                </a>
                                <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/<?php echo ($info["jingyan"]["lc"]["2"]["shortname"]); ?>/<?php echo ($info["jingyan"]["lc"]["2"]["id"]); ?>.html">
                                    <div class="zxlc_title"><?php echo ($info["jingyan"]["lc"]["2"]["title"]); ?></div>
                                    <div class="zxlc_content"><?php echo ($info["jingyan"]["lc"]["2"]["subtitle"]); ?></div>
                                </a>
                            </li>
                            <li>
                                <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/jianche/">
                                    <div class="zxlc_fl">装修后</div>
                                </a>
                                <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/<?php echo ($info["jingyan"]["lc"]["3"]["shortname"]); ?>/<?php echo ($info["jingyan"]["lc"]["3"]["id"]); ?>.html">
                                    <div class="zxlc_title"><?php echo ($info["jingyan"]["lc"]["3"]["title"]); ?></div>
                                    <div class="zxlc_content"><?php echo ($info["jingyan"]["lc"]["3"]["subtitle"]); ?></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/lc/" class="seeMore">查看更多&gt;</a>
                </div>

                <!--装修日记-->
                <div class="study_content">
                    <ul class="study_content_zxrj">
                        <?php if(is_array($info["jingyan"]["riji"])): $i = 0; $__LIST__ = $info["jingyan"]["riji"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><li>
                                <div class="zxrj_tx">
                                    <mip-img src="<?php echo ($vi["user_logo"]); ?>" class="tx_img"></mip-img><span><?php echo ($vi["user_name"]); ?></span>
                                </div>
                                <a data-type="mip" href="<?php echo ($global_basehost); ?>/riji/d<?php echo ($vi["id"]); ?>.html">
                                    <div class="baike_title"><?php echo ($vi["title"]); ?></div>
                                </a>
                                <div class="zxrj_content">
                                    <div class="pull-left"><?php echo date('Y-m-d', $vi['diary_time']);?></div>
                                    <div class="pull-right"><i class="fa fa-commenting"></i>&nbsp;<span><?php echo ($vi["reply_count"]); ?></span></div>
                                    <div class="pull-right"><i class="fa fa-eye"></i>&nbsp;<span><?php echo ($vi["page_view"]); ?></span></div>
                                </div>
                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                    <a data-type="mip" href="<?php echo ($global_basehost); ?>/riji/" class="seeMore">查看更多&gt;</a>
                </div>

                <!--装修问答-->
                <div class="study_content">
                    <ul class="study_content_zxrj">
                        <?php if(is_array($info["jingyan"]["wenda"])): $i = 0; $__LIST__ = $info["jingyan"]["wenda"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><li>
                                <div class="zxrj_tx">
                                    <mip-img src="<?php echo ($vi["user_logo"]); ?>" class="tx_img"></mip-img><span><?php echo ($vi["user_name"]); ?></span>
                                </div>
                                <a data-type="mip" href="http://mip.qizuang.com/wenda/x<?php echo ($vi["id"]); ?>.html">
                                    <div class="baike_title"><?php echo ($vi["title"]); ?></div>
                                </a>
                                <div class="zxrj_content">
                                    <div class="pull-left"><?php echo date('Y-m-d', $vi['post_time']);?></div>
                                    <div class="pull-right"> |&nbsp;&nbsp;<span class="red-color"><?php echo ($vi["anwsers"]); ?></span>人回答</div>
                                    <div class="pull-right"><span class="red-color"><?php echo ($vi["sub_category_name"]); ?></span></div>
                                </div>
                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                    <a data-type="mip" href="<?php echo ($global_basehost); ?>/wenda/" class="seeMore">查看更多&gt;</a>
                </div>
            </mip-vd-tabs>
        </div>
    </div>
    <div class="white_bg zxgs">
        <div class="home-sec">
            <div class="home-sec-title">
                <h2 class="pull-left">找装修公司</h2>
                <a data-type="mip" href="<?php echo ($global_basehost); ?>/company/" class="more pull-right">更多 ></a>
            </div>
            <mip-vd-tabs allow-scroll>
                <section class="company_box_list">
                    <?php if(is_array($info["company"])): $i = 0; $__LIST__ = $info["company"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vi): $mod = ($i % 2 );++$i;?><li>
                            <a data-type="mip" href="http://mip.qizuang.com/<?php echo ($vi["bm"]); ?>/company_home/<?php echo ($vi["id"]); ?>">
                                <div class="company_zp">
                                    <mip-img src="/assets/mobile/sub/img/bg_xgt.jpg"></mip-img>
                                </div>
                                <div class="company_logo">
                                    <mip-img src="<?php echo ($vi["logo"]); ?>" alt="<?php echo ($vi["jc"]); ?>"></mip-img>
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
                </section>
            </mip-vd-tabs>
        </div>
    </div>
    <div class="white_bg">
        <div class="link-banner">
            <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/baojia?src=mip">
                <mip-img src="<?php echo ($global_yuming_m); ?>/assets/mobile/baojia/img/baojia-banner.jpg" ></mip-img>
            </a>
        </div>
    </div>

            <footer id="footer">
                <p class="footer-tel">
                    <span>装修咨询热线:</span>
                    <a  data-type='mip' href="tel:4008-659-600" class="hot"><span class="phone-box"><i class="fa fa-phone"></i></span>4008-659-600</a>
                </p>
                <p class="footer-title">轻松装修乐无忧</p>
                <p class="footer-webadress">
                    手机齐装网：m.qizuang.com&nbsp;&nbsp;苏ICP备12045334号</p>
                <p>苏州云网通信息科技有限公司</p>
                <p class="foot-disclaimer">本站内容齐装网保留所有权利·不承担法律责任</p>
            </footer>
            <mip-fixed type="gototop">
                <mip-gototop></mip-gototop>
            </mip-fixed>
            <mip-sidebar
                id="right-sidebar"
                layout="nodisplay"
                side="right"
                class="mip-hidden">
                <ul class="new-nav-m" id="new-nav-m">
                    <li><a data-type='mip' href="<?php echo ($global_basehost); ?>/"><i class="home-nav-icon nav-home-icon"></i><span>首页</span></a></li>
                    <li><a data-type='mip' href="<?php echo ($global_yuming_m); ?>/sheji?src=mip"><i class="home-nav-icon nav-huxing-icon"></i><span>户型设计</span></a></li>
                    <li><a data-type='mip' href="<?php echo ($global_yuming_m); ?>/baojia?src=mip"><i class="home-nav-icon nav-baojia-icon"></i><span>装修报价</span></a></li>
                    <li><a data-type='mip' href="<?php echo ($global_basehost); ?>/company/"><i class="home-nav-icon nav-company-icon"></i><span>找装修公司</span></a></li>
                    <li><a data-type='mip' href="<?php echo ($global_basehost); ?>/gonglue/"><i class="home-nav-icon nav-gonglue-icon"></i><span>装修攻略</span></a></li>
                    <li><a data-type='mip' href="<?php echo ($global_basehost); ?>/meitu"><i class="home-nav-icon nav-xiaoguo-icon"></i><span>装修效果图</span></a></li>
                    <li><a data-type='mip' href="<?php echo ($global_basehost); ?>/xgt"><i class="home-nav-icon nav-anli-icon"></i><span>装修案例</span></a></li>
                </ul>
            </mip-sidebar>
        </div>
        <!-- <mip-stats-baidu token="2663702a52860056a7cfaa9a79ea3d02"></mip-stats-baidu> -->
        <script src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>
        <!--分享组件 代码-->
        <script src="https://mipcache.bdstatic.com/static/v1/mip-share/mip-share.js"></script>
        <!--百度统计组件 代码-->
        <script src="https://mipcache.bdstatic.com/static/v1/mip-stats-baidu/mip-stats-baidu.js"></script>
        <mip-stats-baidu>
            <script type="application/json">
                {
                    "token": "2663702a52860056a7cfaa9a79ea3d02",
                    "_setCustomVar": [1, "login", "1", 2],
                    "_setAutoPageview": [true]
                }
            </script>
        </mip-stats-baidu>

        <script src="https://mipcache.bdstatic.com/static/v1/mip-gototop/mip-gototop.js"></script>
        <script src="https://mipcache.bdstatic.com/static/v1/mip-sidebar/mip-sidebar.js"></script>
        
    <script src="https://c.mipcdn.com/static/v1/mip-vd-tabs/mip-vd-tabs.js"></script>

        <!--引入熊掌号MIP组件的SDK：-->
        <script src="https://c.mipcdn.com/extensions/platform/v1/mip-cambrian/mip-cambrian.js"></script>
        <!--使用熊掌号MIP组件：-->
        <mip-cambrian site-id="1575859058891466"></mip-cambrian>
        
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
        
    </body>
</html>