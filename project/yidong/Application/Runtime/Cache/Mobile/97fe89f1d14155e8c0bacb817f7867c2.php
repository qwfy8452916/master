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
    
    <link href="/assets/mobile/common/css/m-reset.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css">
    <link href="/assets/mobile/common/css/m-public.new.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="/assets/mobile/common/fonts/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="canonical" href="http://www.qizuang.com<?php echo ($info["canonical"]); ?>">
    <link href="/assets/mobile/zixun/css/gl-step-list.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css">
    <link href="/assets/mobile/zixun/css/gl-base.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css">
    <link href="/assets/mobile/zixun/css/redbox.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="/assets/mobile/common/css/qzCitySelect.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="/assets/mobile/css/top-sj-bj.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />
    <link href="/assets/mobile/zixun/css/flow-list.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css">



    
</head>
<body>
    <div class="m-wrap">
        
        <header>
            
                <div class="m-header-his">
                    <i class="fa fa-angle-left"></i>
                </div>
                <a href="http://<?php echo C('MOBILE_DONAMES');?>/<?php echo ($cityInfo["bm"]); ?>/" class="m-header-left"></a>
                <div class="m-header-tit"><?php echo ($basic["body"]["title"]); ?></div>

            
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
        

    <!-- <style>body{overflow-x: hidden;}</style> -->
    <article>
        <div class="head">
            <div class=" head-search">
                <form action="http://<?php echo C('MOBILE_DONAMES');?>/search">
                    <i class="fa fa-search"></i><input type="text" placeholder="电视机背景墙" id="search" name="keyword">
                </form>
            </div>
        </div>
        <div id="tab">
            <div class="tab-menus">
                <ul id="menuTitle">
                    <?php if(is_array($nav)): $i = 0; $__LIST__ = $nav;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if(($vo["shortname"]) == $cur_category_shortname): ?><li ><a class="cur" href="http://<?php echo C('MOBILE_DONAMES');?>/gonglue/<?php echo ($vo["shortname"]); ?>/"><?php echo ($vo["classname"]); ?></a></li>
                            <?php else: ?>
                            <li><a href="http://<?php echo C('MOBILE_DONAMES');?>/gonglue/<?php echo ($vo["shortname"]); ?>/"><?php echo ($vo["classname"]); ?></a></li><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                </ul>
            </div>
        </div>
        <div class="main">
            <?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$article): $mod = ($i % 2 );++$i;?><div class="list-box ">
                    <div class="list clearfix">
                        <a href="http://<?php echo C('MOBILE_DONAMES');?>/gonglue/<?php echo ($article["shortname"]); ?>/<?php echo ($article["id"]); ?>.html">
                            <div class="img">
                                <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ($article["face"]); ?>-w400.jpg" alt="">
                            </div>
                            <div class="info" style="height: 0.9rem; width: 1.7rem;">
                                <div class="title"><?php echo ($article["title"]); ?></div>
                                <div class="text"><?php echo ($article["jianjie"]); ?></div>
                                <div class="icon">
                                    <i class="fa fa-eye" style="margin-right: 0.05rem"></i><span style="margin-right: 0.25rem"><?php echo ($article["pv"]); ?></span>
                                    <span class="collect" data-id="<?php echo ($article["likes"]); ?>">
                                        <i class="fa fa-heart-o heart" style="margin-right: 0.05rem"></i>
                                        <span class="heart-no"><?php echo ($article["likes"]); ?></span>
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div><?php endforeach; endif; else: echo "" ;endif; ?>

        </div>
            <div class="page">
                <?php echo ($page_tmp); ?>
            </div>
            <link href="/assets/mobile/common/css/qzCitySelect.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="/assets/mobile/common/css/footfadantc.css?v=<?php echo C('STATIC_VERSION');?>">
<iframe id="fadanwrap-yinying" class="fadanwrap-yinying" src="about:blank" allowtransparency="true" marginheight="0" marginwidth="0" frameborder="0"></iframe>
<div class="fadanwrap">
    <div class="footfadanwk">
        <div class="headms"></div><ul class="contentfd">
                <li class="gongsili">
                    <span>公司名称</span><input class="gongsiname" maxlength="20" type="text" placeholder="您的公司名称">
                </li><li class="lianxili">
                    <span>联系人</span><input class="linkren" maxlength="10" type="text" placeholder="您的称呼">
                </li><li class="chengshili">
                    <span>所在城市</span><button id="showCityPicker10" type="button" class="contentfd-city">
                        <i class="fa fa-map-marker">
                        </i><?php if(empty($defaultCityarea["name"])): ?>请选择您所在的区域<?php else: echo ($mapUseInfo["provincefull"]); ?> <?php echo ($mapUseInfo["name"]); ?> <?php echo ($defaultCityarea["name"]); endif; ?>
                    </button>
                        <input type="hidden" name="province" data-id="<?php echo ($mapUseInfo["pid"]); ?>">
                        <input type="hidden" name="city" data-id="<?php echo ($mapUseInfo["id"]); ?>">
                        <input type="hidden" name="area" data-id="<?php echo ($defaultCityarea["id"]); ?>">
                </li><li class="mianjili">
                    <span>房屋面积</span><input class="mianjipf" type="tel"><i class="danweipf">㎡</i>
                </li><li>
                    <span>联系方式</span><input class="phonehaoma" type="tel" maxlength="11" placeholder="请输入您的手机号">
                </li><div class="baojiatijiao">免费获取报价明细</div>
            </ul>
    </div>
    <input type="hidden" name="hide_city_id" value="<?php echo ($defaultCityarea["id"]); ?>">
</div>
<div class="footfadan">
    <ul class="footdaohang">
        <li>
            <span class="defaultdh baojia1"></span><div class="defaultms">快速报价</div>
        </li>
        <li>
            <span class="defaultdh sheji1"></span><div class="defaultms">免费设计</div>
        </li>
        <li>
            <span class="defaultdh gongshi1"></span><div class="defaultms">装修公司</div>
        </li>
        <li>
            <span class="defaultdh shangjai1"></span><div class="defaultms">商家入驻</div>
        </li>
    </ul>
</div>
<script type="text/javascript" src="/assets/mobile/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="//<?php echo C('QINIU_DOMAIN');?>/<?php echo OP('ALL_REAL_VIP_PCA_JSON');?>"></script>
<script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=12a80d1749e9de182e12c6201d5e191c"></script>
<script type="text/javascript" src="/assets/mobile/common/js/geolocation.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/mobile/js/jroll.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/mobile/js/qzCitySelect.js?v=<?php echo C('STATIC_VERSION');?>"></script>

<script>
   


       +(function($){

        $(".fadanwrap-yinying").on("touchmove",function(event){
            event.preventDefault();
        });
        
            var indexpanduan
            $('.footdaohang li').click(function(){
               $('.footfadanwk input').val("");
               indexpanduan=$(this).index();
                   if(indexpanduan==0){
                     $('.footfadanwk .headms').attr("class","headms headms0")
                     $('.contentfd .baojiatijiao').text("免费获取报价明细")
                     $('.contentfd li.gongsili').hide()
                     $('.contentfd li.lianxili').hide()
                     $('.contentfd li.chengshili').show()
                     $('.contentfd li.mianjili').show()
                   }else if(indexpanduan==1){
                     $('.footfadanwk .headms').attr("class","headms headms1")
                     $('.contentfd .baojiatijiao').text("立即领取")
                     $('.contentfd li.gongsili').hide()
                     $('.contentfd li.lianxili').hide()
                     $('.contentfd li.chengshili').show()
                     $('.contentfd li.mianjili').show()
                     
                   }else if(indexpanduan==2){
                     $('.footfadanwk .headms').attr("class","headms headms2")
                     $('.contentfd .baojiatijiao').text("立即申请")
                     $('.contentfd li.gongsili').hide()
                     $('.contentfd li.lianxili').hide()
                     $('.contentfd li.chengshili').show()
                     $('.contentfd li.mianjili').show()
                   }else if(indexpanduan==3){
                     $('.contentfd li.chengshili').hide()
                     $('.contentfd li.mianjili').hide()
                     $('.contentfd li.gongsili').show()
                     $('.contentfd li.lianxili').show()
                     $('.footfadanwk .headms').attr("class","headms headms3")
                     $('.contentfd .baojiatijiao').text("立即申请")
                      
                   }

                if($(this).hasClass('activeys')){
                     $("body,html").css("overflow","auto"); 
                        $(this).removeClass('activeys')
                        $('.fadanwrap-yinying').hide();
                        $('.footfadanwk').stop().animate({bottom:"-2.989rem"},500)
                    }else{
                        $(this).addClass('activeys')
                        $(this).siblings().removeClass('activeys')
                        $('.fadanwrap-yinying').fadeIn(100);
                        $("body,html").css("overflow-y","hidden");
                        $('.footfadanwk').css("bottom","-2.989rem")
                        $('.footfadanwk').stop().animate({bottom:"0.42rem"},500)
                    }
            })

            $('.contentfd .baojiatijiao').click(function(){
                var containerft = $(this).closest(".footfadanwk");
                var dataobj,
                    cityzhi=$('input[name=city]',containerft).attr('data-id'),
                    areazhi=$('input[name=area]',containerft).attr('data-id'),
                    gongshizhi=$.trim($('.contentfd .gongsiname').val()),
                    lianxizhi=$.trim($('.contentfd .linkren').val()),
                    mianjizhi=$.trim($('.contentfd .mianjipf').val()),
                    phonezhi=$.trim($('.contentfd .phonehaoma').val());
                    var zimureg=/^[\u4e00-\u9fa5-a-zA-Z]+$/
                    if(indexpanduan==3){
                        if(gongshizhi==""){
                        alert("请输入您的公司名称");
                        $('.contentfd .gongsiname').focus();
                        return false;
                        }
                        if(!zimureg.test(gongshizhi)){
                            alert("公司名称只能输入汉字和字母");
                            $('.contentfd .gongsiname').focus();
                            return false;
                        }
                        if(lianxizhi==""){
                         alert("请输入您的称呼");
                         $('.contentfd .linkren').focus();
                         return false;
                        }
                        if(!zimureg.test(lianxizhi)){
                            alert("联系人只能输入汉字和字母");
                            $('.contentfd .gongsiname').focus();
                            return false;
                        }
                    }else{
                        if(cityzhi=="" && areazhi==""){
                        alert("请输入所在区域");
                        return false;
                        }
                        if(mianjizhi==""){
                        alert("请输入您的房屋面积");
                        $('.contentfd .mianjipf').focus();
                        return false;
                       }
                       if(mianjizhi>10000){
                        alert("请输入正确的面积");
                        $('.contentfd .mianjipf').focus();
                        return false;
                       }
                       if(mianjizhi==0){
                        alert("请输入正确的面积");
                        $('.contentfd .mianjipf').focus();
                        return false;
                       }
                    }
                    if(phonezhi==""){
                        alert("请输入您的手机号");
                        $('.contentfd .phonehaoma').focus();
                        return false;
                    }
                    var newReg = new RegExp("^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$");
                    if(!newReg.test(phonezhi)){
                        alert("请输入正确的手机号");
                        $('.contentfd .phonehaoma').focus();
                        return false;
                    }
                    if(indexpanduan!=3){
                      
                        var src = "<?php echo ($src); ?>";
                        window.order({
                            extra:{
                                cs:$('input[name=city]',containerft).attr('data-id'),
                                qx:$('input[name=area]',containerft).attr('data-id'),
                                mianji:$('.contentfd .mianjipf').val(),
                                tel:$('.contentfd .phonehaoma').val(),
                                save:1
                            },
                            error:function(){
                                alert("发生了未知的错误,请稍后再试！");
                            },
                            success:function(data, status, xhr){
                                if(data.status == 1){
                                    if(indexpanduan==0){
                                        if(src){
                                        window.location.href = "http://<?php echo C('MOBILE_DONAMES');?>/baojia-result?src="+src;
                                    }else{
                                        window.location.href = "http://<?php echo C('MOBILE_DONAMES');?>/baojia-result/";
                                     }
                                    }
                                    if(indexpanduan==1){
                                        if(src){
                                        window.location.href = "http://<?php echo C('MOBILE_DONAMES');?>/sheji-result?src="+src;
                                    }else{
                                        window.location.href = "http://<?php echo C('MOBILE_DONAMES');?>/sheji-result/";
                                     }
                                    }
                                    if(indexpanduan==2){
                                        if(src){
                                        window.location.href = "http://<?php echo C('MOBILE_DONAMES');?>/xgs-result?src="+src;
                                    }else{
                                        window.location.href = "http://<?php echo C('MOBILE_DONAMES');?>/xgs-result/";
                                     }
                                    }

                                }else{
                                    alert(data.info);
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
                                    $('.contentfd .mianjipf').focus();
                                    return false;
                                };
                                if ('tel' == item && '' != method) {
                                    alert(info);
                                    $('.contentfd .phonehaoma').focus();
                                    return false;
                                };
                                return true;
                            }
                        });
                    }else{
                        $.ajax({
                        url:'/zhaoshang/consult',
                        type:'post',
                        dataType:'json',
                        data:{name:gongshizhi,linkman:lianxizhi,tel:phonezhi},
                        success:function(res){
                          if(res.status==1){
                            alert(res.info)
                            if(res.info=="操作成功"){
                                window.location.href = "http://<?php echo C('MOBILE_DONAMES');?>/ruzhu-result/";
                            }
                          }
                        },
                        error:function(xhr){
                          alert("网络错误,请稍后再试")
                        }
                       })
                    }

            })



        })(jQuery)

 // 城市选择插件
   selectQz.init({
        province:$("input[name=province]").attr("data-id"),
        city:$("input[name=city]").attr("data-id"),
        area:$("input[name=area]").attr("data-id")
    });

</script>



















    </article>
    <input type="hidden" name="hide_city_id" value="<?php echo ($info["cityarea"]["id"]); ?>">
    <input type="hidden" name="search_url" value="<?php echo ($search_url); ?>">

    <div id="gotop"><i class="fa fa-angle-up fa-lg"></i><br>置顶</div>

    


        
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

    
    <script type="text/javascript" src="/assets/mobile/zixun/js/jroll-scroll.js?v=<?php echo C('STATIC_VERSION');?>"></script>

    <script language="javascript">
       

        var jroll = new JRoll(".tab-menus", {scrollX:true,scrollY:false});

        var leftWidth  = $('.cur').parent().offset().left;
        if($("#menuTitle li").find('a').hasClass('cur')){
            if($('.cur').parent().offset().left > 677) {
                jroll.scrollTo(-leftWidth+320, 0, 300, false);
            }else {
                jroll.scrollTo(-leftWidth+10, 0, 300, true);
            }

        }

         



        // jroll.options.bounce = false;
        // 置顶
        $(window).on("scroll", function(){
            if($(document).scrollTop()>="1000"){
                $('#gotop').addClass('show');
            }else{
                $('#gotop').removeClass('show');
            }
        });
        $('#calculator-closed').click(function () {
            $(this).hide();
            return false;
        })
        $('#menuTitle li').on('click','a',function(){
            $(this).addClass('cur').parent().siblings('li').children('a').removeClass('cur');
        })
        // 点击心变色
        $('.collect').click(function () {
            $(this).find("i").toggleClass('current');
            $(this).find("i").toggleClass('fa-heart-o').addClass('fa-heart');
            var _this = $(this);
            $.ajax({
                url: '/dolike/',
                type: 'POST',
                dataType: 'JSON',
                data:{
                    id:_this.attr("data-id")
                }
            })
            .done(function(data) {
                if(data.status == 1){
                    _this.unbind("click");
                    var i = _this.find("span").text();
                    i = parseInt(i)+1;
                    _this.find("span").html(i);
                }
            });

            return false;
        });
    // 搜索框文字随机切换
    +function($){
        var $search = $("#search");
        var randomNum = 0;
        var kyw = ["客厅墙漆颜色","卧室墙漆颜色","热水器漏水","高层窗户漏风的小窍门","合格地板","浴霸灯","圆柱空调","马桶","小空间创意装饰","隔音毡"];
        randomNum = Math.floor(Math.random() * 10);
        $search.attr("placeholder",kyw[randomNum]);
    }(jQuery)

    // 搜索跳转
    + function ($) {
        var $search = $("#search");
        var kyw = ""
        var submitKyw = function () {
            kyw = $search.val();
            if (!kyw) {
                kyw = kyws[randomNum];
            }
            location.href = "http://m.qizuang.com/search?keyword=" + kyw;
        };
        // document.getElementById('search_form').onsubmit = function(){
        //     submitKyw();
        // }
        $("#search").blur(function(){
            submitKyw();
        })
        document.addEventListener("keyup", function(evnet){
            if(event.keyCode == 13){
                submitKyw();
            }
            return false;
        }, false)
    }(jQuery)
    </script>
    <!-- <script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=12a80d1749e9de182e12c6201d5e191c"></script> -->
    <!-- <script type="text/javascript" src="/assets/mobile/common/js/geolocation.js?v=<?php echo C('STATIC_VERSION');?>"></script> -->
    <script type="text/javascript" src="//<?php echo C('QINIU_DOMAIN');?>/<?php echo OP('ALL_REAL_VIP_PCA_JSON');?>"></script>
    <script type="text/javascript" src="/assets/mobile/js/jroll.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/mobile/common/js/qzCitySelect.js?v=<?php echo C('STATIC_VERSION');?>"></script>
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