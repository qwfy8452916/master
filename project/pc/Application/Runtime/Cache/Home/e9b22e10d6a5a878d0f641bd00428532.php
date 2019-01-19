<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>装修吉日查询_装修吉日测算-齐装网</title>
    <meta name="mobile-agent" content="format=html5;url=http://<?php echo C('MOBILE_DONAMES');?>/huangli/"/>
    <meta name="keywords" content="装修吉日,装修吉日查询,黄历装修吉日查询,黄历吉日查询<?php echo date('Y');?>"/>
    <meta name="description" content="齐装网装修黄历查询频道为业主提供装修吉日查询，选择合适的装修吉日，装修才会更顺利！更多黄道吉日详细信息，尽在齐装网装修黄历频道。"/>
    <link rel="Shortcut Icon" href="<?php echo ($static_host); ?>/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/all.css?v=<?php echo C('STATIC_VERSION');?>"/>
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/minimal/red.css?v=<?php echo C('STATIC_VERSION');?>" />
<!--S小贴士-->
<link rel="stylesheet" href="/assets/home/about/css/swiper-3.3.1.min.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" href="/assets/common/css/xiaotieshi.css?v=<?php echo C('STATIC_VERSION');?>">
<!--E小贴士-->
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/public-new.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link href="<?php echo ($static_host); ?>/assets/common/css/step.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/css/window.css?v=<?php echo C('STATIC_VERSION');?>" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/tooltips/tooltips.css?v=<?php echo C('STATIC_VERSION');?>"/>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/order.js?v=<?php echo C('ORDER_JS_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/icheck/icheck.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.cookie-min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/popwin.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<!--S小贴士-->
<script type="text/javascript" src="/assets/home/about/js/swiper-3.3.1.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<!--E小贴士-->
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/tooltips/jquery.pure.tooltips.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/hm.min.js?ver=1&md=<?php echo time();?>"></script>
<script type="text/javascript" src="<?php echo ($cityfile); ?>"></script>
<!--[if lt IE 9]>
<script src="<?php echo ($static_host); ?>/assets/xiaoguotu/js/css3-mediaqueries.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="/assets/common/js/html5shiv.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<![endif]-->
<!--[if lte IE 7]>
<script  type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/json2.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<![endif]-->


    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/home/huangli/hl.css?v=<?php echo C('STATIC_VERSION');?>"/>
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/home/huangli/css/hl-result.css?v=<?php echo C('STATIC_VERSION');?>"/>
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/home/huangli/css/haungli.css?v=<?php echo C('STATIC_VERSION');?>"/>

</head>
<body>
<?php echo ($headerTmp); ?>
<div class="content">
    <div class="content_midd">
        <div class="hl_step_radius">
            <span class="radiu_active"><i class="fa fa-circle"><div>1</div></i></span>
            <span><i class="fa fa-circle"><div>2</div></i></span>
            <span><i class="fa fa-circle"><div>3</div></i></span>
            <span><i class="fa fa-circle"><div>4</div></i></span>
        </div>
        <div>
            <div class="main hl_active">
                <div class="con">
                    <h3 class="title_1">你家准备什么时候开始装修</h3>
                    <div class="nert_1 step_1">
                        <label class="labll" data-id="4">
                            <span class="xuanzhong fa fa-circle-o"></span>半个月内
                        </label>
                        <label class="labll" data-id="1">
                            <span class="xuanzhong fa fa-circle-o"></span>1个月内
                        </label>
                        <label class="labll" data-id="2">
                            <span class="xuanzhong fa fa-circle-o"></span>3个月内
                        </label>
                        <label class="labll" data-id="3">
                            <span class="xuanzhong fa fa-circle-o"></span>3个月以上
                        </label>
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="con">
                    <h3 class="title_1">您家的房屋朝向</h3>
                    <div class="nert_1 nert_2">
                        <div class="chaonan">
                            <img class="kt1" src="/assets/home/huangli/images/keting1.jpg" alt="">
                            <img class="kt11" src="/assets/home/huangli/images/keting11.jpg" alt="">
                            <label class="lab22" data-id="1">
                                <span class="xuanzhong fa fa-circle-o "></span>朝南
                            </label>
                        </div>
                        <div class="chaonan">
                            <img class="kt1" src="/assets/home/huangli/images/keting2.jpg" alt="">
                            <img class="kt11" src="/assets/home/huangli/images/keting22.jpg" alt="">
                            <label class="lab22" data-id="2">
                                <span class="xuanzhong fa fa-circle-o"></span>朝北
                            </label>
                        </div>
                        <div class="chaonan">
                            <img class="kt1" src="/assets/home/huangli/images/keting3.jpg" alt="">
                            <img class="kt11" src="/assets/home/huangli/images/keting33.jpg" alt="">
                            <label class="lab22" data-id="3">
                                <span class="xuanzhong fa fa-circle-o "></span>朝东
                            </label>
                        </div>
                        <div class="chaonan">
                            <img class="kt1" src="/assets/home/huangli/images/keting4.jpg" alt="">
                            <img class="kt11" src="/assets/home/huangli/images/keting44.jpg" alt="">
                            <label class="lab22" data-id="4">
                                <span class="xuanzhong fa fa-circle-o "></span>朝西
                            </label>
                        </div>
                        <div class="chaonan">
                            <img class="kt1" src="/assets/home/huangli/images/keting5.jpg" alt="">
                            <img class="kt11" src="/assets/home/huangli/images/keting55.jpg" alt="">
                            <label class="lab22" data-id="5">
                                <span class="xuanzhong fa fa-circle-o "></span>不清楚
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="con">
                    <h3 class="title_1">您的姓氏和年龄</h3>
                    <div class="jvzhong">
                        <input name="name" class="iptagename" type="text" placeholder="请输入您的姓氏">
                    </div>

                    <div class="nert_1 step_3">
                        <div class="namekuang">
                            <img class="renwu1" src="/assets/home/huangli/images/renwu1.jpg" alt="">
                            <img class="renwu11" src="/assets/home/huangli/images/renwu11.jpg" alt="">
                            <label class="lab33" data-id="1">
                                <span class="xuanzhong fa fa-circle-o "></span>25岁以下
                            </label>
                        </div>

                        <div class="namekuang">
                            <img class="renwu1" src="/assets/home/huangli/images/renwu2.jpg" alt="">
                            <img class="renwu11" src="/assets/home/huangli/images/renwu22.jpg" alt="">
                            <label class="lab33" data-id="2">
                                <span class="xuanzhong fa fa-circle-o "></span>25~35岁
                            </label>
                        </div>
                        <div class="namekuang">
                            <img class="renwu1" src="/assets/home/huangli/images/renwu3.jpg" alt="">
                            <img class="renwu11" src="/assets/home/huangli/images/renwu33.jpg" alt="">
                            <label class="lab33" data-id="3">
                                <span class="xuanzhong fa fa-circle-o "></span>35~45岁
                            </label>
                        </div>
                        <div class="namekuang">
                            <img class="renwu1" src="/assets/home/huangli/images/renwu4.jpg" alt="">
                            <img class="renwu11" src="/assets/home/huangli/images/renwu44.jpg" alt="">
                            <label class="lab33" data-id="4">
                                <span class="xuanzhong fa fa-circle-o "></span>45岁以上
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="con">
                    <h3 class="title_1">选择房屋所在的城市</h3>
                    <div class="areadiqu">
                        <select class="sle freesj_cs" id="f_hl_cs" name="cs"></select>
                        <select class="sle freesj_qx" id="f_hl_qx" name="qy"></select>
                        <div class="phonekz">
                            <input class="phonename" name="tel" type="text" placeholder="输入手机号码，获取测算吉日" maxlength="11">
                        </div>
                        <input type="hidden" name="xztime" value=""/>
                        <input type="hidden" name="fangwei" value=""/>
                        <input type="hidden" name="nianling" value=""/>
                    </div>
                </div>
            </div>
        </div>


        <div class="jieguo">


        </div>

        <div class="chongxcs">
            <span class="resend curr">重新测算</span>
        </div>

        <div class="anniu">
            <span class="prev">&lt;上一页</span>
            <span class="next curr">下一页&gt;</span>
            <span class="next2 curr">立即测算></span>
        </div>
    </div>
    <div class="huanglilu"><img src="/assets/home/huangli/images/huanglilu.png"></div>
</div>
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
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/liansuo" target="_blank" rel="nofollow">战略合作</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/kefu/" target="_blank" rel="nofollow">客服中心</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/city/" target="_blank" rel="nofollow">城市导航</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/sitemap.html" target="_blank" rel="nofollow">网站地图</a></li>
        <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/ruzhu/" target="_blank" rel="nofollow">商家入驻</a></li>
    </ul>
    <p class="foot-disclaimer">免责声明：任何单位或个人认为本网站转载信息涉及版权或有侵权嫌疑等问题的，敬请立即通知，齐装网将在第一时间予以更改或删除。</p>
    <p>苏州云网通信息科技有限公司 齐装网 版权所有Copyright ©<?php echo date("Y");?> Www.QiZuang.Com. All Rights Reserved</p>
    <p>法律顾问：江苏蓝之天律师事务所 徐玲律师 <a target="_blank" rel="nofollow" href="http://www.miitbeian.gov.cn">苏ICP备12045334号</a> </p>
    <p>增值电信业务经营许可证：<a target="_blank" rel="nofollow" href="http://www.miitbeian.gov.cn/"><?php echo OP('QZ_BEIAN_JYX_INFO');?></a></p>
</div>

<!--伸缩广告-->
<?php if($zb_bottom_s): echo ($zb_bottom_s); endif; ?>
<!-- 客服挂件，回顶按钮开关
     0 关闭, 不为0  打开 -->
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
                    <img class="weibotup" src="/assets/common/img/weibo.jpg" alt="齐装网微博" />
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

                // setTimeout(function(){
                //     $('.fix_nav .moqu_kefu .xiaotiestishi').fadeOut();
                //     },5000);

                $('.dianjixts').click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();
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
                    //alert($(".moqu_kefu").height());
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
<?php if($isOpen): ?><script type="text/javascript">
      $(function(){
        $("#s-zxzb").trigger('click');
      });
    </script><?php endif; ?>

<script type="text/javascript">
    $("#s-zxsj").click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        var _this = $(this);
        $.ajax({
            url: '/dispatcher/',
            type: 'POST',
            dataType: 'JSON',
            data: {
                type: "sj",
                source: 158,
                action: "load"
            }
        })
        .done(function(data) {
            if (data.status == 1) {
                $("body").append(data.data);

                $(".zb_box_sj").fadeIn(400, function() {
                    $(this).find("input[name=lf-name]").focus();
                });
                window.setTimeout(function(){
                    $('#quchujicheng input[name=name]').focus();
                },100);
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
                source: 159,
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
                $(".win_box .win-box-bj-mianji").addClass('focus').focus();
            }
        });
    });
</script>

</body>
<script type="text/javascript">

    var shen = null,
        shi = null;
    shen = citys["shen"];
    shi = citys["shi"];

    var ip_cityid = '<?php echo (cookie('iplookup')); ?>';
    var city_id = '<?php echo ($theCityId); ?>';
    (city_id == '') ? cityId = ip_cityid : cityId = city_id;
    if(cityId == ''){
        getLocation();
    }else{
        initCity(cityId);
    }
    function initCity(cityId){
        App.citys.init("#f_hl_cs","#f_hl_qx",shen,shi,cityId);
    }
    var shuzi = 0;
    var kuai = $('.main');
    var radius=$(".hl_step_radius span");
    $('.labll').click(function () {
        $("input[name=xztime]").val($(this).attr('data-id'));
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
        $(this).children('.xuanzhong').removeClass('fa-circle-o')
        $(this).children('.xuanzhong').addClass('fa-check-circle')
        $(this).siblings().children('.xuanzhong').removeClass('fa-check-circle')
        $(this).siblings().children('.xuanzhong').addClass('fa-circle-o')
    });

      $('.chaonan').click(function () {
      	$("input[name=fangwei]").val($(this).children('.lab22').attr('data-id'));
        $(this).children('.lab22').addClass('active')
        $(this).siblings().children('.lab22').removeClass('active')
        $(this).children(".kt11").css('display', 'block')
        $(this).children(".kt1").css('display', 'none')
        $(this).siblings().children('.kt11').css('display', 'none')
        $(this).siblings().children('.kt1').css('display', 'block')

        $(this).children('.lab22').children('.xuanzhong').removeClass('fa-circle-o')
        $(this).children('.lab22').children('.xuanzhong').addClass('fa-check-circle')
        $(this).siblings().children('.lab22').children('.xuanzhong').removeClass('fa-check-circle')
        $(this).siblings().children('.lab22').children('.xuanzhong').addClass('fa-circle-o')
    });



    $('.namekuang').click(function () {
    	$("input[name=nianling]").val($(this).children('.lab33').attr('data-id'));
        $(this).children('.lab33').addClass('active')
        $(this).siblings().children('.lab33').removeClass('active')
        $(this).children(".renwu11").css('display', 'block')
        $(this).children(".renwu1").css('display', 'none')
        $(this).siblings().children('.renwu11').css('display', 'none')
        $(this).siblings().children('.renwu1').css('display', 'block')

        $(this).children('.lab33').children('.xuanzhong').removeClass('fa-circle-o')
        $(this).children('.lab33').children('.xuanzhong').addClass('fa-check-circle')
        $(this).siblings().children('.lab33').children('.xuanzhong').removeClass('fa-check-circle')
        $(this).siblings().children('.lab33').children('.xuanzhong').addClass('fa-circle-o')
    });



    $('.next').click(function () {
//1.第一步
        //判断是否选装修时间
        if(!$("input[name=xztime]").val()){
            alert("请选择装修时间！");
            return;
        }
//2.第二步
        if(shuzi == 1){
            //判断是否选房屋朝向
            if(!$("input[name=fangwei]").val()){
                alert("请选择您家的房屋朝向！");
                return;
            }
        }
//3.第三步
        if (shuzi == 2) {
            //判断提交数据
            var name = $("input[name=name]").val();
            if (!name) {
                alert("请输入您的姓氏！");
                return;
            }else {
                var reg = new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$");
                if (!reg.test(name)) {
                    alert("请输入正确的姓名，只支持中文和英文 ^_^!");
                    return;
                }
            }
            //判断是否选年龄
            if(!$("input[name=nianling]").val()){
                alert("请选择您的年龄！");
                return;
            }
            $(this).css('display', 'none')
            $('.next2').show();
        }
        if (shuzi < 3) {
            shuzi++;
            kuai.eq([shuzi]).show();
            radius.eq([shuzi]).addClass('radiu_active');
            radius.eq([shuzi]).siblings().removeClass('radiu_active');
            kuai.eq([shuzi]).siblings().hide();
            $('.anniu').show();
            $('.next').addClass('curr');
            $('.prev').removeClass('curr');
            $('.prev').show();
        }
    })

    $('.next2').click(function () {
        window.order({
            extra:{
                name:$("input[name=name]").val(),
                tel:$("input[name=tel]").val(),
                hltime:$("input[name=xztime]").val(),
                cs:$("select[name=cs]").val(),
                qx:$("select[name=qy]").val(),
                source: '451',
                ssid:"",
                step:99,
                huangli_new:1,
            },
            error:function(){
                $("#f_next_butt").parent().addClass('height_auto');
                $("#f_next_butt").addClass('focus').focus();
                var span = $("<i class='valdate-info'></i>");
                span.html("发送失败,请稍后重试！");
                $("#f_next_butt").parent().append(span);
            },
            success:function(data, status, xhr){
                if (data.status == 1) {
                    html = getHtml(data.info);
                    $('.jieguo').html(html);
                    $('.jieguo').show();
                    $('.jieguo').siblings().hide();
                    $('.chongxcs').show();
                }else{
                    alert(data.info)
                    if(data.info=="请填写正确的手机号码 ^_^!"){
                        $(".phonename").focus()
                    }
                }
            },
            validate:function(item, value, method, info){
                if ('name' == item && 'notempty' == method) {
                    $("input[name=name]").focus();
                    $.pt({
                        target: $("input[name=name]"),
                        content: '请输入您的姓名!',
                        width: 'auto'
                    });
                    return false;
                };
                if ('name' == item && 'isword' == method) {
                    return false;
                };
                if ('tel' == item && 'notempty' == method) {
                    $("input[name=tel]").focus();
                    $.pt({
                        target: $("input[name=tel]"),
                        content: '请填写您的电话!',
                        width: 'auto'
                    });
                    return false;
                };
                if ('tel' == item && 'ismobile' == method) {
                    $("input[name=tel]").focus();
                    $.pt({
                        target: $("input[name=tel]"),
                        content: info,
                        width: 'auto'
                    });
                    return false;
                };
                if ('cs' == item && 'notempty' == method) {
                    $("select[name=cs]").focus();
                    $.pt({
                        target: $("select[name=cs]"),
                        content: '请选择您的所在城市',
                        width: 'auto'
                    });
                    return false;
                };
                if ('qx' == item && 'notempty' == method) {
                    $("select[name=qy]").focus();
                    $.pt({
                        target: $("select[name=qy]"),
                        content: '请选择您的所在区域',
                        width: 'auto'
                    });
                    return false;
                };
                return true;
            }
        });
    });

    $('.resend').click(function () {
        window.location.reload()
    });

    $('.prev').click(function () {
        if (shuzi > 0) {
            var radius=$(".hl_step_radius span");
            shuzi--;
            kuai.eq([shuzi]).show();
            kuai.eq([shuzi]).siblings().hide();
            $(".radiu_active").removeClass("radiu_active");
            radius.eq([shuzi]).addClass('radiu_active');
            $('.anniu').show();
            $('.next').removeClass('curr');
            $('.next').show();
            $('.next2').hide();
            $('.prev').addClass('curr');

        }
    })

    function getHtml(data) {
        var html = '<h3 class="title_1 jiri">您的装修吉日</h3>\
            <div class="jieguo_left">\
            <div class="time01">' + data[0].y + '年' + data[0].m + '月' + data[0].d + '日</div>\
        <div class="time02">' + data[0].d + '</div>\
            <div class="time03">' + data[0].n_month + '&nbsp;' + data[0].n_day + '</div>\
        <div class="time04">吉日评分：<span>' + data[0].score + '分</span></div>\
        <div class="time05" title=' + data[0].yi + ' >宜：' + data[0].desc + '</div>\
        </div>\
        <div class="jieguo_right">\
            <div class="jgtop">\
            <div class="qifu01">\
            <div class="right_time01">' + data[1].y + '年' + data[1].m + '月' + data[1].d + '日</div>\
        <div class="right_time02">' + data[1].d + '</div>\
            <div class="right_time03">' + data[1].n_month + '&nbsp;' + data[1].n_day + '</div>\
        <div class="right_time04" title=' + data[1].yi + '>宜：' + data[1].desc + '</div>\
        </div>\
        <div class="qifu02">\
            <div class="jiri_pf01">吉日评分</div>\
            <div class="jiri_pf02">' + data[1].score + '分</div>\
        </div>\
        </div>\
        <div class="jgbottom">\
            <div class="qifu01">\
            <div class="right_time01">' + data[2].y + '年' + data[2].m + '月' + data[2].d + '日</div>\
        <div class="right_time02">' + data[2].d + '</div>\
            <div class="right_time03">' + data[2].n_month + '&nbsp;' + data[2].n_day + '</div>\
        <div class="right_time04" title=' + data[2].yi + '>宜：' + data[2].desc + '</div>\
        </div>\
        <div class="qifu02">\
            <div class="jiri_pf01">吉日评分</div>\
            <div class="jiri_pf02">' + data[2].score + '分</div>\
        </div>\
        </div>\
        </div>';
        return html;
    }
</script>
</html>