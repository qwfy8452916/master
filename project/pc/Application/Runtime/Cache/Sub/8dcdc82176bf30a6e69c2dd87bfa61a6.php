<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <link rel="Shortcut Icon" href="<?php echo ($static_host); ?>/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/all.css?v=<?php echo C('STATIC_VERSION');?>"/>
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/minimal/red.css?v=<?php echo C('STATIC_VERSION');?>" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public-new.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link href="<?php echo ($static_host); ?>/assets/common/css/step.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/tooltips/tooltips.css?v=<?php echo C('STATIC_VERSION');?>"/>
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/window.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/order.js?v=<?php echo C('ORDER_JS_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/icheck/icheck.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.cookie-min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/popwin.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/tooltips/jquery.pure.tooltips.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<!--S小贴士-->
<link rel="stylesheet" href="/assets/home/about/css/swiper-3.3.1.min.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" href="/assets/common/css/xiaotieshi.css?v=<?php echo C('STATIC_VERSION');?>">
<script type="text/javascript" src="/assets/home/about/js/swiper-3.3.1.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<!--E小贴士-->
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/hm.min.js?ver=1&md=<?php echo time();?>"></script>
<script type="text/javascript" src="<?php echo ($cityfile); ?>"></script>



    <link href="<?php echo ($static_host); ?>/assets/home/index/css/home.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo ($static_host); ?>/assets/common/css/404.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/all.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />
    <link href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/minimal/red.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/icheck/icheck.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/cors.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <title><?php echo OP('QZ_SITE_NAME');?> - 404</title>
</head>
<body>
<?php echo ($headerTmp); ?>
<!--S 404-->
<!--404begain-->
<div class="ntf-main">
<div class="content">
<div class="info">你别找我啦,我已经飞走啦/(ToT)/~~</div>
<img class="logo404" src="/assets/common/img/logo404.png" alt=""  rel="nofollow" >
<?php $var = '404'; ?>
<div class="nav">
    <a class="" href="/">返回首页</a>
    <a class="" href="javascript:void(0)" onclick="open_pic_chat()" rel="nofollow">联系我们</a>
</div>
</div>
</div>
<script type="text/javascript">
var shen = null,shi = null;
shen = citys["shen"];
shi = citys["shi"];
$(function(){
    $(".sjfa").click(function(event){
        $.ajax({
            url: '/dispatcher/',
            type: 'POST',
            dataType: 'JSON',
            data: {
                type: "sj",
                source:'158',
                action: "load",
                cs: ""
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
});
</script>
<!--E 404-->
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

<?php if($zb_bottom_s): ?><!--伸缩广告-->
<?php echo ($zb_bottom_s); endif; ?>
<?php if($adv_bottom): ?><!--伸缩广告-->
<?php echo ($adv_bottom); endif; ?>

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