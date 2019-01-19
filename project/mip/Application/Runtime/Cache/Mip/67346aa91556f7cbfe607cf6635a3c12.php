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
        
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/gonglue/css/article.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="canonical" href="<?php echo ($info["canonical"]); ?>"/>

        
    <style mip-custom>
        .article-box p{
            text-indent: 2em !important; text-align: left;
        }
    </style>

    </head>
    <body>
        <div class="m-wrap">
            
    <div class="top-fadan">
        <a href="<?php echo ($global_yuming_m); ?>/baojia?src=mip">
            <div class="top-fadan-img"><mip-img src="<?php echo ($global_yuming_m); ?>/assets/mobile/article/images/top-jisuan.png"></mip-img></div>
            <div class="top-fadan-center">
                <div class="top-fadan-info">
                    <p class="zx-money">装修该花多少钱？</p>
                    <p class="zx-sheji"><span class="red-color">8秒</span>免费获取报价</p>
                </div>
            </div>
            <div class="top-fadan-btn">立即获取</div>
        </a>
    </div>

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
            
    <div class="m-bread">
        <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/">装修攻略</a> &gt;
        <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/<?php echo ($category["parent"]["shortname"]); ?>/"><?php echo ($category["parent"]["classname"]); ?></a> &gt;
        <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/<?php echo ($info["article"]["shortname"]); ?>/"><?php echo ($info["article"]["classname"]); ?></a> &gt;
        正文
    </div>
    <div class="article">
        <div class="article-info">
            <p class="article-tit"><?php echo ($info["article"]["title"]); ?></p>
            <?php if(empty($info["article"]["addtime"])): ?><p class="article-time"><?php echo (date("Y-m-d H:i:s",$info["article"]["optime"])); ?></p>
                <?php else: ?>
                <p class="article-time"><?php echo (date("Y-m-d H:i:s",$info["article"]["addtime"])); ?></p><?php endif; ?>
        </div>
        <div class="article-box">
            <!--文章内容-->
            <?php echo ($info["article"]["content"]); ?>
        </div>
    </div>
    <!-- <div class="baojia">
        <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/hongbao?src=mip" rel="nofollow">
            <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/file/20171113/Fr9j9oGNEs7n29Cx3Umf1-iJujjF.png"></mip-img>
        </a>
    </div> -->
    <div class="baojia">
        <a data-type="mip" href="javascript:void(0)" rel="nofollow">
            <mip-img popup src="http://<?php echo C('QINIU_DOMAIN');?>/file/20171113/Fr9j9oGNEs7n29Cx3Umf1-iJujjF.png"></mip-img>
        </a>
    </div>
    <div class="other-article">
        <div class="other-article-box">
            <div class="other-article-word">
                <span class="red-block"></span>
                推荐阅读
            </div>
            <div class="other-article-list">
                <?php if(is_array($info["recommendArticles"])): $i = 0; $__LIST__ = $info["recommendArticles"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="other-article-item">
                        <a data-type="mip" href="<?php echo ($global_basehost); ?>/gonglue/<?php echo ($vo["shortname"]); ?>/<?php echo ($vo["id"]); ?>.html">
                            <div class="other-article-img"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["face"]); ?>-w240.jpg"></mip-img></div>
                            <div class="other-article-text"><p><?php echo ($vo["title"]); ?></p></div>
                        </a>
                    </div><?php endforeach; endif; else: echo "" ;endif; ?>
            </div>
        </div>

    </div>
    <div class="zb-link-bottom">
    <mip-img src="<?php echo ($global_yuming_m); ?>/assets/mobile/meitu/img/xiaolu.png" alt="免费获取设计"></mip-img>
    <div class="tit">免费获取设计</div>
    <p>10秒免费申请户型设计</p>
    <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/sheji?src=mip">获取设计</a>
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
        
        <!--引入熊掌号MIP组件的SDK：-->
        <script src="https://c.mipcdn.com/extensions/platform/v1/mip-cambrian/mip-cambrian.js"></script>
        <!--使用熊掌号MIP组件：-->
        <mip-cambrian site-id="1575859058891466"></mip-cambrian>
        
    <script type="application/ld+json">
        {
            "@context": "https://zhanzhang.baidu.com/contexts/cambrian.jsonld",
            "@id": "<?php echo ($baidu["url"]); ?>",
             "appid": "1575859058891466",
            "title": "<?php echo ($head["title"]); ?>",
            "images": [
                "<?php echo ($images["0"]); ?>",
                "<?php echo ($images["1"]); ?>",
                "<?php echo ($images["2"]); ?>"
                ],
            "pubDate": "<?php echo ($baidu["optime"]); ?>"
        }
    </script>

    </body>
</html>