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
    
<link href="/assets/mobile/baojia/m-zxbj-a18102.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link href="/assets/mobile/zb/css/animate.min.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css">
<link href="/assets/mobile/common/css/qzCitySelect.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<script>
    window._agl = [];
    (function () {
        _agl.push(
            ['production', '_f7L2XwGXjyszb4d1e2oxPybgD']
        );
        (function () {
            var agl = document.createElement('script');
            agl.type='text/javascript';
            agl.async = true;
            agl.src = 'https://fxgate.baidu.com/angelia/fcagl.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(agl, s);
        })();
    })();
</script>
 <script type="text/javascript">
    (function(root) {
        root._tt_config = true;
        var ta = document.createElement('script'); ta.type = 'text/javascript'; ta.async = true;
        ta.src = document.location.protocol + '//' + 's1.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js';
        ta.onerror = function () {
            var request = new XMLHttpRequest();
            var web_url = window.encodeURIComponent(window.location.href);
            var js_url  = ta.src;
            var url = '//ad.toutiao.com/link_monitor/cdn_failed?web_url=' + web_url + '&js_url=' + js_url + '&convert_id=1598514552443939';
            request.open('GET', url, true);
            request.send(null);
        }
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ta, s);
    })(window);
</script>


    
</head>
<body>
    <div class="m-wrap">
        
        <header>
            
    <!-- <div class="m-header-his" >
        <i class="fa fa-angle-left"></i>
    </div> -->
    <a href="javascript:void(0)" class="m-header-left"></a>
    <!-- <div class="m-header-city"><a href="javascript:void(0)"><?php echo ((isset($cityInfo["name"]) && ($cityInfo["name"] !== ""))?($cityInfo["name"]):"全国"); ?><i class="fa fa-sort-desc"></i></a></div> -->


            <div class="new-kefu-erji" id="new-kefu-erji"><div class="new-kefu-icon"></div></div>
            <!--头部菜单-->
            <div class="m-header-right" id="m-nav-switch">
    <i class="fa fa-bars"></i>
</div>
<div class="m-header-right" id="nav-close-cha">
    <i class="close-cha-icon"></i>
</div>
<div class="nav-fixed-box" id="nav-fixed-box"></div>
<ul class="new-nav-m" id="new-nav-m">
    <li><a href="/"  data-flag="shouye"><i class="home-nav-icon nav-home-icon"></i><span>首页</span></a></li>
    <li><a href="/sheji/" data-flag="sheji"><i class="home-nav-icon nav-huxing-icon"></i><span>户型设计</span></a></li>
    <li><a href="/baojia/"  data-flag="baojia"><i class="home-nav-icon nav-baojia-icon"></i><span>装修报价</span></a></li>
    <li>
        <?php if(empty($cityInfo['bm'])): ?><a href="http://m.<?php echo C('QZ_YUMING');?>/company/" data-flag="gongsi"><i class="home-nav-icon nav-company-icon"></i><span>找装修公司</span></a>
        <?php else: ?>
            <a href="/<?php echo ($cityInfo["bm"]); ?>/company/"  data-flag="gongsi"><i class="home-nav-icon nav-company-icon"></i><span>找装修公司</span></a><?php endif; ?>
    </li>
    <li><a href="/gonglue/" data-flag="gonglue"><i class="home-nav-icon nav-gonglue-icon"></i><span>装修攻略</span></a></li>
    <li><a href="/meitu/"  data-flag="xiaoguo"><i class="home-nav-icon nav-xiaoguo-icon"></i><span>装修效果图</span></a></li>
    <li><a href="/xgt/"  data-flag="anli"><i class="home-nav-icon nav-anli-icon"></i><span>装修案例</span></a></li>
    <li><a href="/ruzhu/"  data-flag="shangjia"><i class="home-nav-icon nav-ruzhu-icon"></i><span>商家入驻</span></a></li>
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
        
    <article>
        <!-- banner图片 -->
        <div class="m-img-box-a">
            <img data-cfsrc="/assets/mobile/baojia/img/baojia-banner.jpg" width="720" height="382" alt="免费获取报价" src="/assets/mobile/baojia/img/baojia-banner.jpg">
            <noscript>
                <img src="/assets/mobile/baojia/img/baojia-banner.jpg" width="720" height="382"
                alt="免费获取报价" />
            </noscript>
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
        </div>
        <!-- from表单填写 -->
        <div class="form-once">
            <ul class="m-bj-edit">
                <li id="area">
                    <div>
                        <button id="showCityPicker2" class="c-zb-city" type="button">
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
                <li id="shenming">
                   <input type="checkbox" checked="checked" id="mianze">
                   <label for="mianze" id="check" class="fa fa-check"></label>
                   <span>我已阅读并同意齐装网的</span>
                   <a href="http://<?php echo C('MOBILE_DONAMES');?>/about/disclaimer-zst"><span>《免责申明》</span></a>
                </li>
            </ul>
            <!-- 立即计算报价按钮 -->
            <a class="m-b-btn save-submit" href="javascript:void(0)">
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
            <a class="m-b-btn save-submit-again" href="javascript:void(0)">
                立即计算报价
            </a>
        </div>
        <input type="hidden" name="source" value="<?php echo ($source); ?>">

        <!-- 客服详情介绍图片 -->
        <div class="kefu-shows">

            <img src="/assets/mobile/baojia/img/baojia-item1.jpg">
            <img src="/assets/mobile/baojia/img/baojia-item2.jpg">
            <img src="/assets/mobile/baojia/img/baojia-item3.jpg">
        </div>
    </article>
    <input type="hidden" name="hide_city_id" value="<?php echo ($info["cityarea"]["id"]); ?>">

    <!-- 滚动用户的图片信息 -->
    <div class="g-msg">
        <div class="msg msg1 animated fadeInUp">
            <img src="http://<?php echo C('QINIU_DOMAIN');?>/desLogo/201705/100.jpg" alt="">
            <span>来自杭州的李先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;13秒前</span>
        </div>
    </div>

        
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

    
<script type="text/javascript" src="//<?php echo C('QINIU_DOMAIN');?>/<?php echo OP('ALL_REAL_VIP_PCA_JSON');?>"></script>
<script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=12a80d1749e9de182e12c6201d5e191c"></script>
<script type="text/javascript" src="/assets/mobile/common/js/geolocation.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/mobile/js/jroll.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/mobile/common/js/qzCitySelect.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript">
    // 获取随机数的方法
    function GetRandomNum(Min,Max){
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }
    // 随机数
    var timer = setInterval(function(){
        var num = GetRandomNum(30000,120000)+'';
        if(num<99999){
            var num1 = 'num num-gray',
                num2 = 'num num-' + num.charAt(0),
                num3 = 'num num-' + num.charAt(1),
                num4 = 'num num-' + num.charAt(2),
                num5 = 'num num-' + num.charAt(3),
                num6 = 'num num-' + num.charAt(4);
        }else{
            var num1 = 'num num-' + num.charAt(0),
                num2 = 'num num-' + num.charAt(1),
                num3 = 'num num-' + num.charAt(2),
                num4 = 'num num-' + num.charAt(3),
                num5 = 'num num-' + num.charAt(4),
                num6 = 'num num-' + num.charAt(5);
        }
        $('#num-1').removeClass().addClass(num1);
        $('#num-2').removeClass().addClass(num2);
        $('#num-3').removeClass().addClass(num3);
        $('#num-4').removeClass().addClass(num4);
        $('#num-5').removeClass().addClass(num5);
        $('#num-6').removeClass().addClass(num6);

    },400);


    $('.save-submit').on('click',function() {
        var checked = $("#mianze").is(':checked');

        window.order({
            extra:{
                cs:$('input[name=city]').attr('data-id'),
                qx:$('input[name=area]').attr('data-id'),
                mianji:$(".m-bj-edit input[name=mianji]").val(),
                tel:$(".m-bj-edit input[name=tel-number]").val(),
                fb_type:$("input[name=fb_type]").val(),
                source: $('input[name=source]').val(),
                save:1
            },
            error:function(){
                alert("发生了未知的错误,请稍后再试！");
            },
            success:function(data, status, xhr){
                if(data.status == 0){
                    alert(data.info);
                    return
                }
                _taq.push({convert_id:"1598514552443939", event_type:"form"});
                window._agl && window._agl.push(['track', ['success', {t: 3}]]);
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
                    // $(".m-bj-edit input[name=mianji]").val("");
                    $(".m-bj-edit input[name=mianji]").focus();
                    return false;
                };
                if ('tel' == item && '' != method) {
                    alert(info);
                    $(".m-bj-edit input[name=tel-number]").focus();
                    return false;
                };
                if(!checked){
                    alert('请勾选我已阅读并同意齐装网的《免责申明》！')
                    return false;
                };
                return true;
            }
        });
    });
    //切换免责对勾
    $("#check").click(function(){
        $(this).toggleClass('fa-check');
    });
    // 立即计算报价
    $('.save-submit-again').on('click',function(){
        var src = "<?php echo ($src); ?>";
        window.order({
            extra:{
                name:$(".m-bj-edit input[name=nametop]").val(),
                xiaoqu:$(".m-bj-edit input[name=xiaoqu]").val(),
                tel:$("input[name=tel-number]").val(),
                save:1
            },
            error:function(){
                alert("发生了未知的错误,请稍后再试！");
            },
            success:function(data, status, xhr){
                if(data.status == 1){
                    if(src){
                        window.location.href = "http://<?php echo C('MOBILE_DONAMES');?>/details-zst?src="+src;
                    }else{
                        window.location.href = "http://<?php echo C('MOBILE_DONAMES');?>/details-zst/";
                    }
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
    //滚动用户信息的提示
    var msgNum=0;
    var setInval = setInterval(function(){
        var msgImg = ['http://<?php echo C('QINIU_DOMAIN');?>/desLogo/201705/100.jpg',
                    'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FmJ4GGIfw5S6TDVOjoDRkffzjaS9',
                    'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/Fi1b63xaSd-0pk3TCp9XHHl-DX7M',
                    'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FrdMGFpLBnsNb8MvcWWHE9_dJHAc',
                    'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/Fk-7YW9x8qTUAh-IILlUjsR87Mq2',
                    'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/Fj-C_o_rrHgTdDG3VCsq8857FKHZ',
                    'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FtofOIR1h8G-_4Yxn-OeS1i3BO3E',
                    'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FtofOIR1h8G-_4Yxn-OeS1i3BO3E',
                    'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FrX0mqcteABpqvNuvZiDlzOVJXsb',
                    'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FljRwrjYW6RqGzoXx94VCwv9QnML',
                    'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FhC7pnEVY5L2m_Zfqpsbxc59yKDR',
                    'http://<?php echo C('QINIU_DOMAIN');?>/desLogo/20161130/FtgfBcOanHSB2Wd7u0hQXXtMvIy5']
        <?php if(empty($info["city"])): ?>var msgArry = ["来自盐城的陈先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;1秒前",
                    "来自苏州的马女士发起了申请&nbsp;&nbsp;&nbsp;&nbsp;5秒前",
                    "来自芜湖的朱先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;7秒前",
                    "来自杭州的李先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;13秒前",
                    "来自上海的赵先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;9秒前",
                    "来自漯河的李小姐发起了申请&nbsp;&nbsp;&nbsp;&nbsp;11秒前",
                    "来自信阳的曹小姐发起了申请&nbsp;&nbsp;&nbsp;&nbsp;3秒前",
                    "来自贵阳的吴小姐发起了申请&nbsp;&nbsp;&nbsp;&nbsp;12秒前",
                    "来自南宁的钱小姐发起了申请&nbsp;&nbsp;&nbsp;&nbsp;9秒前",
                    "来自嘉兴的冯小姐发起了申请&nbsp;&nbsp;&nbsp;&nbsp;12秒前",
                    "来自银川的杨先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;16秒前",
                    "来自西安的周女士发起了申请&nbsp;&nbsp;&nbsp;&nbsp;25秒前"];
        <?php else: ?>
        var msgArry = ["来自<?php echo ($info["city"]); ?>的陈先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;1秒前",
                    "来自<?php echo ($info["city"]); ?>的马女士发起了申请&nbsp;&nbsp;&nbsp;&nbsp;5秒前",
                    "来自<?php echo ($info["city"]); ?>的朱先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;7秒前",
                    "来自<?php echo ($info["city"]); ?>的李先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;13秒前",
                    "来自<?php echo ($info["city"]); ?>的赵先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;9秒前",
                    "来自<?php echo ($info["city"]); ?>的李小姐发起了申请&nbsp;&nbsp;&nbsp;&nbsp;11秒前",
                    "来自<?php echo ($info["city"]); ?>的曹小姐发起了申请&nbsp;&nbsp;&nbsp;&nbsp;3秒前",
                    "来自<?php echo ($info["city"]); ?>的吴小姐发起了申请&nbsp;&nbsp;&nbsp;&nbsp;12秒前",
                    "来自<?php echo ($info["city"]); ?>的钱小姐发起了申请&nbsp;&nbsp;&nbsp;&nbsp;9秒前",
                    "来自<?php echo ($info["city"]); ?>的冯小姐发起了申请&nbsp;&nbsp;&nbsp;&nbsp;12秒前",
                    "来自<?php echo ($info["city"]); ?>的杨先生发起了申请&nbsp;&nbsp;&nbsp;&nbsp;16秒前",
                    "来自<?php echo ($info["city"]); ?>的周女士发起了申请&nbsp;&nbsp;&nbsp;&nbsp;25秒前"];<?php endif; ?>

        $('.msg span').html(msgArry[msgNum]);
        $('.msg img').attr('src',msgImg[msgNum]);

        msgNum++;

        if (msgNum==6) {msgNum=0}
        $('.msg').show();
        $('.msg').addClass('animated fadeInUp');

        var setTime=setTimeout(function(){
            $('.msg').removeClass('animated fadeInUp');
            $('.msg').addClass('animated fadeOutUp');
            clearTimeout(setTime);
        },10000);
        var setTime1=setTimeout(function(){
        $('.msg').removeClass('animated fadeOutUp');
        $('.msg').hide();
            clearTimeout(setTime1);
        },2000);

    },9000);


</script>
<script type="text/javascript">
    // 城市选择插件
    selectQz.init({
        province:$("input[name=province]").attr("data-id"),
        city:$("input[name=city]").attr("data-id"),
        area:$("input[name=area]").attr("data-id")
    });
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