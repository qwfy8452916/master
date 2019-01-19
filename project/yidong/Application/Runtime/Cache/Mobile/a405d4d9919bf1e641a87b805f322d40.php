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
    
<?php if(!empty($info["canonical"])): ?><link href="<?php echo ($info["canonical"]); ?>" rel="canonical" /><?php endif; ?>
<link href="/assets/mobile/companyhome/css/m-public-ch.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link href="/assets/mobile/companyhome/css/m-sheji.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link href="/assets/mobile/zixun/css/redbox.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link href="/assets/mobile/common/css/qzCitySelect.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link href="/assets/mobile/css/top-sj-bj.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />

    
</head>
<body>
    <div class="m-wrap">
        
        <header>
            
    <div class="m-header-his">
        <i class="fa fa-angle-left"></i>
    </div>
    <a href="/" class="m-header-left"></a>
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
        
    <article class="under-line">
        <!--头部-->
<div class="company_box">
    <div class="company_img">
        <div class="company_size"><img src="<?php echo ((isset($info["user"]["logo"]) && ($info["user"]["logo"] !== ""))?($info["user"]["logo"]):'http://staticqn.qizuang.com/Public/default/images/default_logo.png'); ?>" alt="<?php echo ($info["user"]["qc"]); ?>"></div>
    </div>
    <div class="company_title">
        <h4><?php echo ($info["user"]["qc"]); ?> <em><img src="/assets/mobile/companyhome/img/v.jpg" alt=""></em></h4>
        <p>
            <em> <img src="/assets/mobile/companyhome/img/xian.jpg" alt=""></em>
            <?php echo ((isset($info["user"]["kouhao"]) && ($info["user"]["kouhao"] !== ""))?($info["user"]["kouhao"]):"为你打造更好的生活 !"); ?>
            <em> <img src="/assets/mobile/companyhome/img/xian.jpg" alt=""></em>
        </p>
    </div>
    <div class="company_img2">
        <img src="/assets/mobile/companyhome/img/t1.jpg" alt="">
    </div>
</div>
<!--切换-->
<div class="change">
    <ul class="change_title">
        <li class="<?php echo ($nav_index); ?>"><a href="/<?php echo ($cityInfo["bm"]); ?>/company_home/<?php echo ($info["user"]["id"]); ?>/">首页</a></li>
        <li class="<?php echo ($nav_cases); ?>"><a href="/<?php echo ($cityInfo["bm"]); ?>/company_case/<?php echo ($info["user"]["id"]); ?>/">装修案例</a></li>
        <li class="<?php echo ($nav_team); ?>"><a href="/<?php echo ($cityInfo["bm"]); ?>/company_team/<?php echo ($info["user"]["id"]); ?>/">设计团队</a></li>
        <li class="<?php echo ($nav_comment); ?>"><a href="/<?php echo ($cityInfo["bm"]); ?>/company_message/<?php echo ($info["user"]["id"]); ?>/">业主牛评</a></li>
    </ul>
</div>
        <?php if(!empty($info["team"])): if(is_array($info["team"])): $i = 0; $__LIST__ = $info["team"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="plan_box">
                <div class="plan_img">
                    <img src="<?php echo ((isset($vo["caseimg"]["url"]) && ($vo["caseimg"]["url"] !== ""))?($vo["caseimg"]["url"]):'/assets/mobile/companyhome/img/pic.gif'); ?>" alt="<?php echo ((isset($vo["caseimg"]["alt"]) && ($vo["caseimg"]["alt"] !== ""))?($vo["caseimg"]["alt"]):'默认设计图片'); ?>">
                    <a rel="nofollow" class="mask-a" href="http://<?php echo C('MOBILE_DONAMES');?>/<?php echo ($cityInfo["bm"]); ?>/blog/<?php echo ($vo["uid"]); ?>/">
                        <div class="mask_box">
                            <a rel="nofollow" class="mask_box_sj" href="/baojia/">免费报价</a>
                            <div class="head">
                                <a rel="nofollow" href="http://<?php echo C('MOBILE_DONAMES');?>/<?php echo ($cityInfo["bm"]); ?>/blog/<?php echo ($vo["uid"]); ?>">
                                    <img src="<?php echo ($vo["logo"]); ?>" alt="<?php echo ($vo["name"]); ?>">
                                </a>
                            </div>
                            <div class="pre">
                                <a href="http://<?php echo C('MOBILE_DONAMES');?>/<?php echo ($cityInfo["bm"]); ?>/blog/<?php echo ($vo["uid"]); ?>/"><?php echo ($vo["name"]); ?></a> <br>
                                <em>从业时间：<?php echo ($vo["jobtime"]); ?> &nbsp; <?php echo ($vo["zw"]); ?></em>
                            </div>
                        </div>
                    </a>
                    <div class="dase"></div>
                </div>
            </div><?php endforeach; endif; else: echo "" ;endif; ?>
        <?php echo ($info["page"]); ?>
        <?php else: ?>
            <img class="ch-blank" src="/assets/mobile/common/img/blank.png" alt="暂无相关数据">
            <p class="ch-blank-text">该公司还没有注册设计师哦~</p><?php endif; ?>
    </article>

    <input type="hidden" name="hide_city_id" value="<?php echo ($info["cityarea"]["id"]); ?>">
    <div id="gotop"><i class="fa fa-angle-up fa-lg"></i><br>置顶</div>
    <!--<div class="zb-link-bottom">
    <img src="/assets/mobile/meitu/img/xiaolu.png" width="188" height="305" alt="免费获取设计" />
    <div class="tit">免费获取设计</div>
    <p>10秒免费申请户型设计</p>
    <a href="/sheji/?fi=<?php echo ($source); ?>">获取设计</a>
</div>-->
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

    
    <script>
        $(document).ready(function(){
            udpage(".page-change");
        })
    </script>
    <script language="javascript">
        $(function(){
            var hongbao = localStorage.hongbao;
            if(hongbao == 1){
                $('.red_box').css('display','none');
            }
        });
        // 置顶
        $(window).on("scroll", function(){
            if($(document).scrollTop()>="1000"){
                $('#gotop').addClass('show');
            }else{
                $('#gotop').removeClass('show');
            }
        });

        // 红包部分
        /*(function(){
            var timer = setTimeout(function(){
                $('.red_box').addClass('animated wobble show');

                var timer1 = setTimeout(function(){
                    //$('.red_box').removeClass('animated wobble');
                    clearTimeout(timer1);
                },1000)
                clearTimeout(timer);
            },800);
        })();
        $('.red_box').on('touchend', function(){
            $('.red_box_pop').addClass('show').find('.start_box').addClass('show')

        });
        $('.close_red_box').on('touchend', function(e){
            $('.red_box').hide();
            return false;
        });
        $('.start_box .close_start').on('touchend', function(){
            $('.start_box').removeClass('show').parent().removeClass('show');
            return false;
        });

        $('.end_box .close_start,.close_ok').on('touchend', function(){
            $('.end_box').removeClass('show').parent().removeClass('show');
            $('.red_box').css('display','none');
            return false;
        });*/
        //发单
        $(function() {
            $(".home-zb .get_free").click(function(event) {
                var container = $(this).parents(".home-zb");
                var name = $(".m-bj-edit input[name=name]").val();
                var tel = $(".m-bj-edit input[name=tel]").val();
                var cs = $('input[name=city]').attr('data-id');
                var qx = $('input[name=area]').attr('data-id');
                if (!App.validate.run(name)) {
                    $(".m-bj-edit input[name=name]").focus();
                    alert("请输入您的称呼");
                    return false;
                } else {
                    var reg = new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$");
                    if (!reg.test(name)) {
                        $(".m-bj-edit input[name=name]").focus();
                        alert("请输入正确的名称，只支持中文和英文");
                        return false;
                    }
                }
                if (!App.validate.run(tel)) {
                    $(".m-bj-edit input[name=tel]").focus();
                    alert("请填写正确的手机号码 ^_^!");
                    return false;
                } else {
                    var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
                    if (!reg.test(tel)) {
                        $(".m-bj-edit input[name=tel]").focus();
                        $(".m-bj-edit input[name=tel]").val('');
                        alert("请填写正确的手机号码 ^_^!");
                        return false;
                    }
                }
                if ('' == cs || '' == qx) {
                    alert('请选择您所在的区域 ≧▽≦');
                    return false;
                }

                window.order({
                    extra:{
                        cs: cs,
                        qx: qx,
                        name: $("input[name=name]", container).val(),
                        tel: $("input[name=tel]", container).val(),
                        fb_type: $("input[name=fb_type]", container).val(),
                        source: '318'
                    },
                    error:function(){},
                    success:function(data, status, xhr){
                        if (data.status == 1) {
                            localStorage.hongbao = 1;
                            $('.start_box').removeClass('show');
                            $('.end_box').addClass('show bounceIn animated')
                            var timer2 = setTimeout(function(){
                                $('.end_box').removeClass('bounceIn animated');
                                clearTimeout(timer2)
                            },800)
                        } else {
                            alert(data.info);
                        }
                    },
                    validate:function(item, value, method, info){
                        return true;
                    }
                });
            });
        });
    </script>

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