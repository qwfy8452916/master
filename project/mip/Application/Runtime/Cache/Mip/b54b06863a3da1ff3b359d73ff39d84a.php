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
        
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/meitu/css/meitu_datail.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="canonical" href="<?php echo ($canonical); ?>">

        
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
                
   <div class="m-header-tit">装修美图</div>

                <a  data-type='mip' href="tel:4008-659-600" class="hot"><div class="new-kefu-erji" id="new-kefu-erji"><div class="new-kefu-icon"></div></div></a>
                <div class="m-header-right" id="m-nav-switch"><i class="fa fa-bars" on="tap:right-sidebar.open"></i></div>
            </div>
            
    <!-- 多图 -->
    <?php if($count > 1): ?><div class="imgView">
        <div class="center_view">
             <mip-carousel
               defer="3000"
               layout="responsive"
               height="300"
               width="400"
               indicator
               >
               <?php if(is_array($info["now"]["child"])): $i = 0; $__LIST__ = $info["now"]["child"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($v["img_path"]); ?>-s3.jpg" alt="<?php echo ($v["title"]); ?>" data-preview-src="" data-preview-group="1"></mip-img><?php endforeach; endif; else: echo "" ;endif; ?>
           </mip-carousel>

            <div class="page-box">
                <div class="img_title">
                    <?php echo ($info["now"]["title"]); ?>
                </div>
                <div class="page-box-container">
                    <div id="prev-page">
                        <a data-type="mip" href="<?php echo ($url["prev"]); ?>" class="page-change">上一图集</a>
                    </div>
                    <div id="next-page" class="red-active">
                        <a data-type="mip" href="<?php echo ($url["next"]); ?>" class="page-change">下一图集</a>
                    </div>
                </div>
            </div>
        </div>
    </div><?php endif; ?>

    <!-- 单图 -->
    <?php if($count == 1): ?><div class="no-cou">
        <div class="center_view">
            <?php if(is_array($info["now"]["child"])): $i = 0; $__LIST__ = $info["now"]["child"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><mip-img  src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($v["img_path"]); ?>-s3.jpg" alt="<?php echo ($v["title"]); ?>" data-preview-src="" data-preview-group="1"></mip-img><?php endforeach; endif; else: echo "" ;endif; ?>
        </div>
    </div>
    <div class="page_fenye">
            <div class="img_title">
                <?php echo ($info["now"]["title"]); ?>
            </div>
            <div class="page-box">
                <div class="page-box-container">
                    <div id="prev-page">
                        <a data-type="mip" href="<?php echo ($url["prev"]); ?>" class="page-change">上一图集</a>
                    </div>
                    <div id="next-page" class="red-active">
                        <a data-type="mip" href="<?php echo ($url["next"]); ?>" class="page-change">下一图集</a>
                    </div>
                </div>
            </div>
        </div><?php endif; ?>



    <div class="btn">
        <a data-type="mip" href="http://<?php echo C('MOBILE_DONAMES');?>/sheji/">
            <div class="btn_box">
                <mip-img src="/assets/meitu/images/details/icon11.png"></mip-img><span>免费设计</span>
            </div>
        </a>
        <a data-type="mip" href="http://<?php echo C('MOBILE_DONAMES');?>/baojia/">
            <div class="btn_box">
                <mip-img src="/assets/meitu/images/details/icon22.png"></mip-img><span>免费报价</span>
            </div>
        </a>
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
        
     <!--搜索框-->
    <script src="https://mipcache.bdstatic.com/static/v1/mip-form/mip-form.js"></script>
    <!--下拉菜单切换-->
    <script src="https://mipcache.bdstatic.com/static/v1/mip-lightbox/mip-lightbox.js"></script>

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
            "pubDate": "<?php echo ($baidu['optime']); ?>"
        }
    </script>

    </body>
</html>