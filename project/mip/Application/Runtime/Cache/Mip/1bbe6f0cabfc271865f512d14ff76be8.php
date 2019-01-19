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
        
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/meitu/css/meitu_list.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="canonical" href="<?php echo ($global_yuming_m); echo ($canonical); ?>">

        
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
                
   <div class="m-header-tit">装修效果图</div>

                <a  data-type='mip' href="tel:4008-659-600" class="hot"><div class="new-kefu-erji" id="new-kefu-erji"><div class="new-kefu-icon"></div></div></a>
                <div class="m-header-right" id="m-nav-switch"><i class="fa fa-bars" on="tap:right-sidebar.open"></i></div>
            </div>
            
    <div class="box">
        <div class="form_control">
            <mip-form method="get" url="http://mip.qizuang.com/meitu/list-l0f0h0c0/" target="_self">
                <input type="text" name="keyword" placeholder="请输入您想找的效果图" validatetarget="keyword" validatetype="must" value="<?php echo ($keyword); ?>" >
                <div target="keyword">关键词不能为空</div>
                <button type="submit"><i class="fa fa-search"></i></button>
           </mip-form>
        </div>
    </div>
    <div class="menu_list">
        <ul class="pull_down_list">
           <mip-accordion sessions-key="mip_4" expaned-limit>
                <section>
                    <li class="parten_menu"><?php echo ((isset($info["nav"]["fg"]) && ($info["nav"]["fg"] !== ""))?($info["nav"]["fg"]):"风格"); ?> <i class="fa fa-angle-down"></i></li>
                    <div class="tab_container">
                        <a data-type='mip' rel="nofollow" href="<?php echo ($info['select']['fengge']); ?>">不限</a>
                <?php if(is_array($info["fg"])): $i = 0; $__LIST__ = $info["fg"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i; if(empty($v["nofollow"])): if($info['navParams']['fengge'] == $v["id"] ): ?><a data-type='mip' href="<?php echo ($v["link"]); ?>/" rel="nofollow"  class="now"><?php echo ($v["name"]); ?></a>
                        <?php else: ?>
                        <a data-type='mip' href="<?php echo ($v["link"]); ?>/" rel="nofollow"><?php echo ($v["name"]); ?></a><?php endif; ?>
                    <?php else: ?>
                         <?php if($info['navParams']['fengge'] == $v["id"] ): ?><a data-type='mip' href="<?php echo ($v["link"]); ?>/" class="now"><?php echo ($v["name"]); ?></a>
                         <?php else: ?>
                        <a data-type='mip' href="<?php echo ($v["link"]); ?>/"><?php echo ($v["name"]); ?></a><?php endif; endif; endforeach; endif; else: echo "" ;endif; ?>
                    </div>
                    <div class="active_mask"></div>
                </section>
                <section>
                    <li class="parten_menu"><?php echo ((isset($info["nav"]["hx"]) && ($info["nav"]["hx"] !== ""))?($info["nav"]["hx"]):"户型"); ?> <i class="fa fa-angle-down"></i></li>
                    <div class="tab_container">
                        <a data-type='mip' rel="nofollow"  href="<?php echo ($info['select']['huxing']); ?>">不限</a>
                <?php if(is_array($info["hx"])): $i = 0; $__LIST__ = $info["hx"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i; if(empty($v["nofollow"])): if($info['navParams']['huxing'] == $v["id"] ): ?><a data-type='mip' href="<?php echo ($v["link"]); ?>/" rel="nofollow"  class="now"><?php echo ($v["name"]); ?></a>
                        <?php else: ?>
                            <a data-type='mip' href="<?php echo ($v["link"]); ?>/" rel="nofollow"><?php echo ($v["name"]); ?></a><?php endif; ?>
                    <?php else: ?>
                        <?php if($info['navParams']['huxing'] == $v["id"] ): ?><a data-type='mip' href="<?php echo ($v["link"]); ?>/" class="now"><?php echo ($v["name"]); ?></a>
                        <?php else: ?>
                            <a data-type='mip' href="<?php echo ($v["link"]); ?>/"><?php echo ($v["name"]); ?></a><?php endif; endif; endforeach; endif; else: echo "" ;endif; ?>
                    </div>
                    <div class="active_mask"></div>
                </section>
                <section>
                    <li class="parten_menu"><?php echo ((isset($info["nav"]["wz"]) && ($info["nav"]["wz"] !== ""))?($info["nav"]["wz"]):"局部"); ?> <i class="fa fa-angle-down"></i></li>
                    <div class="tab_container">
                        <a data-type='mip' rel="nofollow"  href="<?php echo ($info['select']['location']); ?>">不限</a>
                <?php if(is_array($info["wz"])): $i = 0; $__LIST__ = $info["wz"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i; if(empty($v["nofollow"])): if($info['navParams']['location'] == $v["id"] ): ?><a data-type='mip' href="<?php echo ($v["link"]); ?>/" rel="nofollow"  class="now"><?php echo ($v["name"]); ?></a>
                        <?php else: ?>
                            <a data-type='mip' href="<?php echo ($v["link"]); ?>/" rel="nofollow"><?php echo ($v["name"]); ?></a><?php endif; ?>
                    <?php else: ?>
                        <?php if($info['navParams']['location'] == $v["id"] ): ?><a data-type='mip' href="<?php echo ($v["link"]); ?>/" class="now"><?php echo ($v["name"]); ?></a>
                        <?php else: ?>
                            <a data-type='mip' href="<?php echo ($v["link"]); ?>/"><?php echo ($v["name"]); ?></a><?php endif; endif; endforeach; endif; else: echo "" ;endif; ?>
                    </div>
                    <div class="active_mask"></div>
                </section>
                <section>
                    <li class="parten_menu"><?php echo ((isset($info["nav"]["ys"]) && ($info["nav"]["ys"] !== ""))?($info["nav"]["ys"]):"颜色"); ?> <i class="fa fa-angle-down"></i></li>
                    <div class="tab_container">
                        <ul class="color-list">
                        <li ><a data-type='mip' rel="nofollow"  href="<?php echo ($info['select']['color']); ?>" class="border_ccc">不限</a></li>
                        <?php if(is_array($info["ys"])): $i = 0; $__LIST__ = $info["ys"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li>
                                <?php if(empty($v["nofollow"])): if($info['navParams']['color'] == $v["id"] ): ?><a data-type='mip'  rel="nofollow"  href="<?php echo ($v["link"]); ?>/" rel="nofollow"  class="now <?php echo ($v["style"]); ?>" ></a>
                                        <?php else: ?>
                                        <a data-type='mip'  rel="nofollow"  href="<?php echo ($v["link"]); ?>/" rel="nofollow" class="<?php echo ($v["style"]); ?>"></a><?php endif; ?>
                                    <?php else: ?>
                                    <?php if($info['navParams']['color'] == $v["id"] ): ?><a data-type='mip'  rel="nofollow"  href="<?php echo ($v["link"]); ?>/" class="now <?php echo ($v["style"]); ?>" ></a>
                                        <?php else: ?>
                                        <a data-type='mip'  rel="nofollow"  href="<?php echo ($v["link"]); ?>/" class="<?php echo ($v["style"]); ?>"></a><?php endif; endif; ?>
                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
                        </ul>
                    </div>
                    <div class="active_mask"></div>
                </section>
           </mip-accordion>
        </ul>
    </div>

    <div class="box-body meitu-list-body">
    <ul>
        <?php if(is_array($info["meitu"])): $i = 0; $__LIST__ = $info["meitu"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li class="back-white">
                <a data-type='mip' href="<?php echo ($global_basehost); ?>/meitu/p<?php echo ($v["id"]); ?>.html" class="imgs-box" rel="nofollow">
                    <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($v["img_path"]); ?>-w300.jpg" alt="<?php echo ($v["title"]); ?>"></mip-img>
                </a>
                <div class="details">
                    <a data-type='mip' href="<?php echo ($global_basehost); ?>/meitu/p<?php echo ($v["id"]); ?>.html">
                        <p><?php echo ($v["title"]); ?></p>
                    </a>
                    <div class="details-content">
                        <span><?php echo ($v["wz"]); ?></span>
                        <span><?php echo ($v["fg"]); ?></span>
                        <span><?php echo ($v["hx"]); ?></span>
                        <span><?php echo ($v["ys"]); ?></span>
                        <div class="rightIcon" data-id="<?php echo ($v["id"]); ?>" data-on="0">
                            <i class="fa fa fa-thumbs-up"></i><span><?php echo ($v["likes"]); ?></span>
                        </div>
                    </div>
                </div>
            </li><?php endforeach; endif; else: echo "" ;endif; ?>
    </ul>
</div>
    <?php echo ($info["page"]); ?>
    <mip-lightbox id="tab-5" layout="nodisplay" class="mip-hidden"></mip-lightbox>

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
        
     <!--搜索框-->
    <script src="https://mipcache.bdstatic.com/static/v1/mip-form/mip-form.js"></script>
    <!--下拉菜单切换-->
    <script src="https://c.mipcdn.com/static/v1/mip-accordion/mip-accordion.js"></script>

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