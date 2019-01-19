<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <title><?php echo ($vars["info"]["title"]); ?> - 齐装网</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta http-equiv="x-ua-compatible" content="IE=edge" />
    <link rel="canonical" href="http://<?php echo ($_SERVER['SERVER_NAME']); echo ($_SERVER["REQUEST_URI"]); ?>" />
    <link href="/assets/home/meitu/css/meitu-popover_20180702.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public-new.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
    <link rel="stylesheet" type="text/css" href="assets/home/meitu/css/meitu-3d-details_20180704.css?v=<?php echo C('STATIC_VERSION');?>">
</head>
<body>
    <div id="pano" class="bjpic">
    </div>
    <div class="footwaik">
        <ul class="ulwaik" img-src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($vars["info"]["face"]); ?>-w660.jpg">
            <li class="btn-sheji">
              <img src="/assets/common/img/freesign.png" alt="设计">
              <span>设计</span>
            </li>
            <li class="dianzan">
              <img class="dianzanpic" src="/assets/home/meitu/img/dianzanxin.png" alt="点赞">
              <span class="dianzanms">点赞</span>
            </li>
            <li class="fenxiangwk">
              <img src="/assets/home/meitu/img/fenxiang.png" alt="">
              <span>分享</span>
              <div class="bdsharebuttonbox gl_fx">
                    <a href="#" class="bds_more" data-cmd="more">&nbsp;&nbsp;&nbsp;</a>
                    <a href="#" class="bds_qzone hidden" data-cmd="qzone" title="分享到QQ空间"></a>
                    <a href="#" class="bds_tsina hidden" data-cmd="tsina" title="分享到新浪微博"></a>
                    <a href="#" class="bds_tqq hidden" data-cmd="tqq" title="分享到腾讯微博"> </a>
                    <a href="#" class="bds_renren hidden" data-cmd="renren" title="分享到人人网"></a>
                    <a href="#" class="bds_weixin hidden" data-cmd="weixin" title="分享到微信"></a>
                </div>
            </li>
            <li>
              <a href="/3d/" rel="nofollow">
              <img class="moreged" src="/assets/home/meitu/img/moregd.png" alt="更多设计">
              <span>更多设计</span>
              </a>
            </li>
        </ul>
        <ul class="ulright">
            <li class="allscroll">
                <img class="scrollpic" src="/assets/home/meitu/img/fullscroll.png" alt="全屏">
                <span class="scrollms">全屏</span>
            </li>
        </ul>
    </div>
    <div class="cloopen">
        <i class="cloopenicon opendak" data-biaoji="open"></i>
        <span class="mswenz">收起</span>
    </div>
    <?php if($isguide == 1): ?><div class="guide">
        <div class="pop-left"></div>
        <div class="pop-shubiao"></div>
        <div class="pop-right"></div>
    </div>
    <script type="text/javascript">
        var t = setInterval(function(){
            clearInterval(t);
            $(".guide").remove();
        },3000);
    </script><?php endif; ?>
    <script type="text/javascript" src="assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/alert.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/order.js?v=<?php echo C('ORDER_JS_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($cityfile); ?>"></script>
    <script type="text/javascript" src="/assets/common/js/disclamer.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="http://<?php echo C('QINIU_DOMAIN');?>/threedimensional/20170727/Fp-3p3Aqup6eMqYrpQWaCbC8cTPT.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <!-- S 我要设计 -->
<div class="iwantzx">
    <div class="iwantzx-box">
        <i class="fa fa-close"></i>
        <div class="left-modal">
            <div class="iwantzx-img">
                <img id="iwantPic" src="<?php echo ($static_host); ?>/assets/home/meitu/img/jz-img-top.jpg" alt="">
            </div>
            <p class="iwantzx-info"></p>
        </div>
        <div class="right-modal bj-box">
            <p class="big-title">10秒免费申请4份设计</p>
            <p class="small-info">知名设计师，为您定制4份设计方案</p>
            <p class="small-info">全面PK 不满意重新设计</p>
            <div class="form-box">
                <div class="iwantzx-sel">
                    <select class="freesj_cs" name="iwant_cs"></select>
                    <select class="freesj_qx" name="iwant_qy"></select>
                </div>
                <div class="iwantzx-input">
                    <input type="text" placeholder="怎么称呼您" name="iwant_name">
                </div>
                <div class="iwantzx-input">
                    <input type="text" placeholder="请输入手机号码获得结果" maxlength="11" name="iwant_tel">
                </div>

                   <!--S-免责申明-->
                    <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                   <!--E-免责申明-->

                <div class="iwantzx-button iwantzx-btn-1">立即获取</div>
                <input type="hidden" name="fb_type" value="sheji">
            </div>
        </div>
    </div>
</div>

<!-- S 我要装修 -->
<div class="zxmoney">
    <div class="zxmoney-box">
        <i class="fa fa-close"></i>
        <div class="left-modal">
            <div class="zxmoney-img">
                <img id="zxmoneyPic" src="<?php echo ($static_host); ?>/assets/home/meitu/img/jz-img-top.jpg" alt="">
            </div>
            <p class="zxmoney-info"></p>
        </div>
        <div class="right-modal bj-box">
            <p class="big-title">装修成这样花多少钱？</p>
            <p class="big-title1">你的装修预算为<span class="red-color"  id="total-price">？</span><span>元</span></p>
            <div class="disclaimer">*该报价为半包估算价，实际费用以上门量房实测为准。</div>
            <div class="zxmoney-result">
                <ul>
                    <li>客厅：<span id="kt-price" class="priceold">？</span><span>元</span></li>
                    <li>厨房：<span id="cf-price" class="priceold">？</span><span>元</span></li>
                    <li>卧室：<span id="zw-price" class="priceold">？</span><span>元</span></li>
                    <li>卫生间：<span id="wsj-price" class="priceold">？</span><span>元</span></li>
                    <li>水电：<span id="sd-price" class="priceold">？</span><span>元</span></li>
                    <li>其他：<span id="other-price" class="priceold">？</span><span>元</span></li>
                </ul>
            </div>
            <div class="form-box">
                <div class="zxmoney-input">
                    <input type="number" placeholder="请输入面积" name="mianji">
                    <span class="pingfang">m²</span>
                </div>
                <div class="zxmoney-sel">
                    <select class="freesj_cs" name="cs"></select>
                    <select class="freesj_qx" name="qy"></select>
                </div>
                <div class="zxmoney-input">
                    <input type="text" placeholder="怎么称呼您" name="money_name">
                </div>
                <div class="zxmoney-input">
                    <input type="text" placeholder="请输入手机号码获得结果" maxlength="11" name="money_tel">
                </div>
                <!--S-免责申明-->
                    <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                <!--E-免责申明-->
                <div class="zxmoney-button zxmoney-btn">立即获取</div>
                <input type="hidden" name="fb_type" value="baojia">
            </div>
        </div>
    </div>
</div>
<!-- E 我要装修 -->
<script type="text/javascript" >
    var Global_source1 = "<?php echo ((isset($tmpsource) && ($tmpsource !== ""))?($tmpsource):'182'); ?>";
    var Global_source2 = "<?php echo ((isset($tmpsource1) && ($tmpsource1 !== ""))?($tmpsource1):158); ?>";
</script>
<script src="<?php echo ($static_host); ?>/assets/home/meitu/js/popover_20180702.js?v=<?php echo C('STATIC_VERSION');?>"></script>




    <script type="text/javascript">
        var shen = null,
        shi = null;
        shen = citys["shen"];
        shi = citys["shi"];

        /*分享*/
        window._bd_share_config=
            {"common":{"bdSnsKey":{},"bdText":$(".video_name").text().trim()+"-装修视频-齐装网","bdMini":"2","bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
        var krpano;
        embedpano({swf:"http://<?php echo C('QINIU_DOMAIN');?>/threedimensional/20170727/FtEWulwizchYadFOFcOkRbZR5f0D.swf", xml:"http://<?php echo ($cityInfo["bm"]); ?>.<?php echo C('QZ_YUMING');?>/threedimension/xml/<?php echo ($vars["info"]["path"]); ?>/pano.xml?update_time=<?php echo strtotime($vars['info']['update_time']);?>", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true,onready:function(krpano_interface){
            krpano = krpano_interface;

        }});


        +function($){
            initCity('<?php echo ($theCityId); ?>');
        function initCity(cityId){
            App.citys.init(".freesj_cs",".freesj_qx",shen,shi,cityId);
        }

        $('.cloopen').click(function(event) {
            var valzhi = $(this).children('.cloopenicon').attr('data-biaoji');
            if("open"==valzhi){
              $(this).children('.cloopenicon').removeClass('opendak');
              $(this).children('.cloopenicon').addClass('closegb');
              $(this).children('.cloopenicon').attr('data-biaoji','close');
              $(this).children('.mswenz').text("展开");
              $('.footwaik').hide();
              $(this).addClass('beijing');
            }else{
              $(this).children('.cloopenicon').removeClass('closegb');
              $(this).children('.cloopenicon').addClass('opendak');
              $(this).children('.cloopenicon').attr('data-biaoji','open');
              $(this).children('.mswenz').text("收起");
              $('.footwaik').show();
              $(this).removeClass('beijing');
            }
        });

        $(".dianzan").click(function(event) {
            var _this = $(this);
            if (_this.hasClass('icon-heart-full')) {
                _this.Alert({
                    css:{
                        "width":"200px",
                        "height":"60px",
                        "background":"#E76363",
                        "margin-left":"-100px",
                        "margin-top":"-10%",
                        "font-size":"20px",
                        "line-height":"60px"
                    },
                    text:"已经点过了",
                    speed:3000
                });
                return false;
            }

            $.ajax({
                url: '/dolike/',
                type: 'POST',
                dataType: 'JSON',
                data:{
                    id:"<?php echo ($_GET['id']); ?>"
                }
            })
            .done(function(data) {
                if(data.status == 1){
                    _this.addClass('icon-heart-full');
                    _this.children('.dianzanpic').attr("src","/assets/home/meitu/img/dianzanxin2.png")
                    _this.Alert({
                        css:{
                            "width":"200px",
                            "height":"60px",
                            "background":"#E76363",
                            "margin-left":"-100px",
                            "margin-top":"-10%",
                            "font-size":"20px",
                            "line-height":"60px"
                        },
                        text:"点赞成功",
                        speed:3000
                    });
                } else {
                    _this.Alert({
                        css:{
                            "width":"200px",
                            "height":"60px",
                            "background":"#E76363",
                            "margin-left":"-100px",
                            "margin-top":"-10%",
                            "font-size":"20px",
                            "line-height":"60px"
                        },
                        text:data.info,
                        speed:3000
                    });
                }
            });
        });

        $('.allscroll').click(function(event) {
            if ($(this).hasClass('fullscroll')) {
                $(this).removeClass('fullscroll');
                $(".scrollpic").attr("src","/assets/home/meitu/img/fullscroll.png");
                $(".scrollms").text("全屏");
            } else {
                $(this).addClass('fullscroll');
                $(".scrollpic").attr("src","/assets/home/meitu/img/fulscroll-2.png");
                $(".scrollms").text("窗口");
            }
            krpano.call("full_screen()");
        });

        function arrowFnLeft(){
            $('.guide .pop-left').animate({left:0},600,function(){
                $('.guide .pop-left').animate({left:-15},650,function(){
                    arrowFnLeft()
                })
            });
        }
        function arrowFnRight(){
            $('.guide .pop-right').animate({right:0},600,function(){
                $('.guide .pop-right').animate({right:-15},650,function(){
                    arrowFnRight()
                })
            });
        }
        $('.guide .pop-left').animate({left:0},600,function(){
            arrowFnLeft();
        });

        $('.guide .pop-right').animate({right:0},600,function(){
            arrowFnRight();
        });
     }(jQuery);
</script>
</body>
</html>