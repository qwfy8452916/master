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
        
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/gonglue/css/index.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="canonical" href="http://m.qizuang.com/gonglue/">

        
    <style mip-custom>
       .mip-carousel-indicator-wrapper{position: absolute; width: 100%; margin-top: -20px}
       .mip-carousel-indecator-item{width:8px !important; height: 8px !important;background: #000 !important; opacity: 0.3}
       .mip-carousel-activeitem{background: #007aff !important; opacity: 1;}
       mip-vd-tabs .mip-vd-tabs-nav-li{height: 33px !important; line-height: 33px;}
       mip-vd-tabs .mip-vd-tabs-nav{height: 32px; border-bottom: 1px solid #DEDEDE;}
       .mip-vd-tabs-nav-selected{border-bottom: 2px solid #ff5659 !important; color:#333 !important;}
       mip-vd-tabs .mip-vd-tabs-nav{padding:0px; margin:0px 16px;}
    </style>

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
                
   <div class="m-header-tit">装修攻略</div>

                <a  data-type='mip' href="tel:4008-659-600" class="hot"><div class="new-kefu-erji" id="new-kefu-erji"><div class="new-kefu-icon"></div></div></a>
                <div class="m-header-right" id="m-nav-switch"><i class="fa fa-bars" on="tap:right-sidebar.open"></i></div>
            </div>
            

    <div class="bg-white">
        <mip-carousel
                defer="1000"
                layout="responsive"
                width="600"
                height="221"
                indicatorId="mip-carousel-example">
                <?php if(is_array($info["lunbo"])): $i = 0; $__LIST__ = $info["lunbo"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a href="http://<?php echo C('MOBILE_DONAMES');?>/zhuanti/<?php echo ($vo["id"]); ?>/">
                        <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["cover_bigimg"]); ?>-slt930.jpg" alt="<?php echo ($vo["title"]); ?>"></mip-img>
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
            <mip-vd-tabs>
                <section>
                    <li>装修前</li>
                    <li>装修中</li>
                    <li>装修后</li>
                </section>
                <div class="hidetab">
                    <ul>
                        <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/shoufang/">
                                <p class="bjtplogo tpimg"></p>
                                <p>收房验房</p>
                            </a>
                        </li>
                        <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/gongsi/">
                                <p class="bjtplogo tpimg3"></p>
                                <p>找装修公司</p>
                            </a>
                        </li>
                        <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/shejiyusuan/">
                                <p class="bjtplogo tpimg2"></p>
                                <p>设计与预算</p>
                            </a>
                        </li>
                        <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/xuancai/">
                                <p class="bjtplogo tpimg4"></p>
                                <p>装修选材</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="hidetab">
                    <ul>
                         <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/shuidian/">
                                <p class="bjtplogo tpimg5"></p>
                                <p>水电</p>
                            </a>
                        </li>
                        <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/niwa/">
                                <p class="bjtplogo tpimg6"></p>
                                <p>泥瓦</p>
                            </a>
                        </li>
                        <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/mugong/">
                                <p class="bjtplogo tpimg7"></p>
                                <p>木工</p>
                            </a>
                        </li>
                        <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/youqi/">
                                <p class="bjtplogo tpimg8"></p>
                                <p>油漆</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="hidetab">
                    <ul>
                         <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/jianche/">
                                <p class="bjtplogo tpimg9"></p>
                                <p>检测验收</p>
                            </a>
                        </li>
                        <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/peishi/">
                                <p class="bjtplogo tpimg10"></p>
                                <p>后期配饰</p>
                            </a>
                        </li>
                        <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/baoyang/">
                                <p class="bjtplogo tpimg11"></p>
                                <p>装修保养</p>
                            </a>
                        </li>
                        <li>
                            <a type-data="mip" href="http://<?php echo C('MIP_DONAMES');?>/gonglue/jjsh/">
                                <p class="bjtplogo tpimg12"></p>
                                <p>家居生活</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </mip-vd-tabs>
            <div class="jrzxlc">
                <a type-data="mip" href="/gonglue/lc/">进入装修流程<span>&gt;</span></a>
            </div>
    </div>
    <div class="bg-white">
        <!--<a mip-type="mip" href="http://<?php echo C('MIP_DONAMES');?>/hl/">-->
        <a mip-type="mip" href="http://m.qizuang.com/hl?src=mip">
            <mip-img src="http://staticqn.qizuang.com/qzmbbanner/20171113/5a095239506f7-w1210c2.jpg" alt="开工吉日"></mip-img>
        </a>
    </div>

    <div class="zhuagnxiuxg">
        <ul>
            <div class="zxstyle">
                <span>选材导购</span>
                <a href="http://<?php echo C('MIP_DONAMES');?>/gonglue/xcdg/">更多></a>
            </div>
            <?php if(is_array($info["xcdg"])): $i = 0; $__LIST__ = $info["xcdg"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li class="new_style_list">
                    <a href="http://<?php echo C('MIP_DONAMES');?>/gonglue/<?php echo ($vo["shortname"]); ?>/<?php echo ($vo["id"]); ?>.html">
                        <div class="new_style_img">
                            <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["face"]); ?>-w400.jpg" alt="<?php echo ($vo["title"]); ?>"></mip-img>
                        </div>
                        <div class="new_style_content">
                            <p class="xdjyfg new_style_title"><?php echo ($vo["title"]); ?></p>
                            <p class="xdjyfg_xq new_style_xq"><?php echo ($vo["subtitle"]); ?></p>
                        </div>
                    </a>
                </li><?php endforeach; endif; else: echo "" ;endif; ?>
        </ul>
       </div>

       <div class="zhuagnxiuxg">
           <ul>
               <div class="zxstyle">
                   <span>局部装修</span>
                   <a href="http://<?php echo C('MIP_DONAMES');?>/gonglue/jubu/">更多></a>
               </div>
               <?php if(is_array($info["jbzx"])): $i = 0; $__LIST__ = $info["jbzx"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li class="new_style_list">
                       <a href="http://<?php echo C('MIP_DONAMES');?>/gonglue/<?php echo ($vo["shortname"]); ?>/<?php echo ($vo["id"]); ?>.html">
                           <div class="new_style_img">
                               <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["face"]); ?>-w400.jpg" alt="<?php echo ($vo["title"]); ?>"></mip-img>
                           </div>
                           <div class="new_style_content">
                               <p class="xdjyfg new_style_title"><?php echo ($vo["title"]); ?></p>
                               <p class="xdjyfg_xq new_style_xq"><?php echo ($vo["subtitle"]); ?></p>
                           </div>
                       </a>
                   </li><?php endforeach; endif; else: echo "" ;endif; ?>
           </ul>
           </div>
           <div class="zhuagnxiuxg">
               <ul>
                   <div class="zxstyle">
                       <span>装修风格</span>
                       <a href="http://<?php echo C('MIP_DONAMES');?>/gonglue/fg/">更多></a>
                   </div>
                   <?php if(is_array($info["zxfg"])): $i = 0; $__LIST__ = $info["zxfg"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li class="new_style_list">
                           <a href="http://<?php echo C('MIP_DONAMES');?>/gonglue/<?php echo ($vo["shortname"]); ?>/<?php echo ($vo["id"]); ?>.html">
                               <div class="new_style_img">
                                   <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["face"]); ?>-w400.jpg" alt="<?php echo ($vo["title"]); ?>"></mip-img>
                               </div>
                               <div class="new_style_content">
                                   <p class="xdjyfg new_style_title"><?php echo ($vo["title"]); ?></p>
                                   <p class="xdjyfg_xq new_style_xq"><?php echo ($vo["subtitle"]); ?></p>
                               </div>
                           </a>
                       </li><?php endforeach; endif; else: echo "" ;endif; ?>
               </ul>
            </div>
            <div class="zhuagnxiuxg">
                <ul>
                    <div class="zxstyle">
                        <span>装修风水</span>
                        <a href="http://<?php echo C('MIP_DONAMES');?>/gonglue/fs/">更多></a>
                    </div>
                    <?php if(is_array($info["zxfs"])): $i = 0; $__LIST__ = $info["zxfs"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li class="new_style_list">
                            <a href="http://<?php echo C('MIP_DONAMES');?>/gonglue/<?php echo ($vo["shortname"]); ?>/<?php echo ($vo["id"]); ?>.html">
                                <div class="new_style_img">
                                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["face"]); ?>-w400.jpg" alt="<?php echo ($vo["title"]); ?>"></mip-img>
                                </div>
                                <div class="new_style_content">
                                    <p class="xdjyfg new_style_title"><?php echo ($vo["title"]); ?></p>
                                    <p class="xdjyfg_xq new_style_xq"><?php echo ($vo["subtitle"]); ?></p>
                                </div>
                            </a>
                        </li><?php endforeach; endif; else: echo "" ;endif; ?>
                </ul>
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
        
    <script src="https://mipcache.bdstatic.com/static/v1/mip-vd-tabs/mip-vd-tabs.js"></script>

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