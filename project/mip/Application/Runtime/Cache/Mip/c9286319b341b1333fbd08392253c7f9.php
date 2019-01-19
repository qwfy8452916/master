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
        
    <link rel="canonical" href="http://<?php echo C('MOBILE_DONAMES');?>/meitu"/>
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/meitu/css/index.css?v=<?php echo C('STATIC_VERSION');?>">

        
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
                
   <div class="m-header-tit">效果图</div>

                <a  data-type='mip' href="tel:4008-659-600" class="hot"><div class="new-kefu-erji" id="new-kefu-erji"><div class="new-kefu-icon"></div></div></a>
                <div class="m-header-right" id="m-nav-switch"><i class="fa fa-bars" on="tap:right-sidebar.open"></i></div>
            </div>
            
    <mip-carousel autoplay defer="2000" layout="responsive" width="600" height="260" indicatorId="mip-carousel-example">
        <?php if(is_array($info["lunbo"])): $i = 0; $__LIST__ = $info["lunbo"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><a data-type='mip' href="<?php echo ($vo["link"]); ?>">
                <mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vo["img_path"]); ?>" alt="<?php echo ($vo["title"]); ?>"></mip-img>
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
    <div class="xgt-list">
        <div class="xgt-list-tit"><section><i></i>局部之美<i></i></section></div>
        <div class="xgt-list-row1">
            <a data-type='mip' class="xgt-list-big" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l4f0h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/keting-w300.jpg" alt="客厅装修效果图"></mip-img><span>客厅</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l5f0h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/woshi-w300.jpg" alt="卧室装修效果图"></mip-img><span>卧室</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l6f0h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/canting-w300.jpg" alt="餐厅装修效果图"></mip-img><span>餐厅</span></a>
        </div>
        <div class="xgt-list-row2">
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l7f0h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/chufang-w300.jpg" alt="厨房装修效果图"></mip-img><span>厨房</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l8f0h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/weishengjian-w300.jpg" alt="卫生间装修效果图"></mip-img><span>卫生间</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l9f0h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/yangtai-w300.jpg" alt="阳台装修效果图"></mip-img><span>阳台</span></a>

        </div>
    </div>
    <div class="xgt-list">
        <div class="xgt-list-tit"><section><i></i>风格之美<i></i></section></div>
        <div class="xgt-list-row1">
            <a data-type='mip' class="xgt-list-big" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f12h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/jianyue-w300.jpg" alt="简约装修效果图"></mip-img><span>简约</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f8h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/oushi-w300.jpg" alt="欧式装修效果图"></mip-img><span>欧式</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f13h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/tianyuan-w300.jpg" alt="田园装修效果图"></mip-img><span>田园</span></a>

        </div>
        <div class="xgt-list-row2">
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f4h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/zhongshi-w300.jpg" alt="中式装修效果图"></mip-img><span>中式</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f5h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/xiandai-w300.jpg" alt="现代装修效果图"></mip-img><span>现代</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f6h0c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/dizhonghai-w300.jpg" alt="地中海装修效果图"></mip-img><span>地中海</span></a>
        </div>
    </div>
    <div class="xgt-list">
        <div class="xgt-list-tit"><section><i></i>户型之美<i></i></section></div>
        <div class="xgt-list-row1">
            <a data-type='mip' class="xgt-list-big" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f0h4c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/yiju-w300.jpg" alt="一居装修效果图"></mip-img><span>一居</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f0h5c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/erju-w300.jpg" alt="二居装修效果图"></mip-img><span>二居</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f0h6c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/sanju-w300.jpg" alt="三居装修效果图"></mip-img><span>三居</span></a>
        </div>
        <div class="xgt-list-row2">
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f0h7c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/fushi-w300.jpg" alt="复式楼装修效果图"></mip-img><span>复式楼</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f0h8c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/bieshu-w300.jpg" alt="别墅装修效果图"></mip-img><span>别墅</span></a>
            <a data-type='mip' class="xgt-list-small" href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f0h7c0/"><mip-img src="http://<?php echo C('QINIU_DOMAIN');?>/mobile/meitu/dahuxing-w300.jpg" alt="大户型装修效果图"></mip-img><span>大户型</span></a>
        </div>
    </div>
    <div class="zb-link-bottom">
    <mip-img src="<?php echo ($global_yuming_m); ?>/assets/mobile/meitu/img/xiaolu.png" alt="免费获取设计"></mip-img>
    <div class="tit">免费获取设计</div>
    <p>10秒免费申请户型设计</p>
    <a data-type="mip" href="<?php echo ($global_yuming_m); ?>/sheji?src=mip">获取设计</a>
</div>
    <div class="xgt-list">
        <div class="xgt-list-tit"><section><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/gongzhuang/">公装效果图</a></section></div>
        <ul class="xgt-gz-list">
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/gongzhuang-l8f0m0/"><mip-img src="/assets/meitu/images/index/p1.png" alt="办公室装修效果图"></mip-img>办公室</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/gongzhuang-l6f0m0/"><mip-img src="/assets/meitu/images/index/p2.png" alt="服装店装修效果图"></mip-img>服装店</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/gongzhuang-l7f0m0/"><mip-img src="/assets/meitu/images/index/p3.png" alt="酒店装修效果图"></mip-img>酒店</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/gongzhuang-l1f0m0/"><mip-img src="/assets/meitu/images/index/p4.png" alt="餐厅装修效果图"></mip-img>餐厅</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/gongzhuang-l5f0m0/"><mip-img src="/assets/meitu/images/index/p5.png" alt="厂房装修效果图"></mip-img>厂房</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/gongzhuang-l4f0m0/"><mip-img src="/assets/meitu/images/index/p6.png" alt="水果店装修效果图"></mip-img>水果店</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/gongzhuang-l3f0m0/"><mip-img src="/assets/meitu/images/index/p7.png" alt="美容院装修效果图"></mip-img>美容院</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/gongzhuang-l2f0m0/"><mip-img src="/assets/meitu/images/index/p8.png" alt="宾馆装修效果图"></mip-img>宾馆</a></li>
        </ul>
    </div>
    <div class="xgt-list">
        <div class="xgt-list-tit"><section>今日热搜</section></div>
        <ul class="xgt-list-tag">
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f12h0c0/">简约风格家装图片</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f0h10c0/">小户型家装图</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l4f0h0c0/">客厅效果图</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l5f0h0c0/">卧室效果图</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l9f0h0c0/">阳台效果图</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f5h0c0/">现代风格家装图片</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f0h7c0/">大户型家装图</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f8h0c0/">欧式风格家装图片</a></li>
            <li><a data-type='mip' href="http://<?php echo C('MIP_DONAMES');?>/meitu/list-l0f13h0c0/">田园风格家装图片</a></li>
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