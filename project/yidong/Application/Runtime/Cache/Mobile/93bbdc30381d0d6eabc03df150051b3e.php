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
    <link href="/assets/mobile/company/css/m-zxgs-list.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="/assets/mobile/zixun/css/redbox.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="/assets/mobile/common/css/qzCitySelect.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="/assets/mobile/company/css/company.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />
    <link href="/assets/mobile/common/css/m-page.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />
    <link href="/assets/mobile/company2815/css/company_2815.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />

    
</head>
<body>
    <div class="m-wrap">
        
        <header>
            
    <div class="m-header-his">
        <i class="fa fa-angle-left"></i>
    </div>
    <a href="http://<?php echo C('MOBILE_DONAMES');?>/<?php echo ($cityInfo["bm"]); ?>/" class="m-header-left"></a>
    <div class="m-header-tit">装修公司</div>

            <div class="new-kefu-erji" id="new-kefu-erji"><div class="new-kefu-icon"></div></div>
            <!--头部菜单-->
            <div class="m-header-right" id="m-nav-switch">
    <i class="fa fa-bars"></i>
</div>
<div class="m-header-right" id="nav-close-cha">
    <i class="close-cha-icon"></i>
</div>
<div class="nav-fixed-box" id="nav-fixed-box"></div>
<!--<div class="mask-ticket"></div>-->
<ul class="new-nav-m" id="new-nav-m">
    <li><a href="/"  data-flag="shouye"><i class="home-nav-icon nav-home-icon"></i><span>首页</span></a></li>
    <li><a href="/sheji/" data-flag="sheji" rel="nofollow"><i class="home-nav-icon nav-huxing-icon"></i><span>户型设计</span></a></li>
    <li><a href="/baojia/"  data-flag="baojia" rel="nofollow"><i class="home-nav-icon nav-baojia-icon"></i><span>装修报价</span></a></li>
    <li>
        <?php if(empty($cityInfo['bm'])): ?><a href="http://m.<?php echo C('QZ_YUMING');?>/company/" data-flag="gongsi"><i class="home-nav-icon nav-company-icon"></i><span>找装修公司</span></a>
        <?php else: ?>
            <a href="/<?php echo ($cityInfo["bm"]); ?>/company/"  data-flag="gongsi"><i class="home-nav-icon nav-company-icon"></i><span>找装修公司</span></a><?php endif; ?>
    </li>
    <li><a href="/gonglue/" data-flag="gonglue"><i class="home-nav-icon nav-gonglue-icon"></i><span>装修攻略</span></a></li>
    <li><a href="/meitu/"  data-flag="xiaoguo"><i class="home-nav-icon nav-xiaoguo-icon"></i><span>装修效果图</span></a></li>
    <li><a href="/xgt/"  data-flag="anli"><i class="home-nav-icon nav-anli-icon"></i><span>装修案例</span></a></li>
    <li><a href="/ruzhu/"  data-flag="shangjia" rel="nofollow"><i class="home-nav-icon nav-ruzhu-icon"></i><span>商家入驻</span></a></li>
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
     <div class="mask-ticket"></div>
<!-- 装修公司搜索 -->
    <div class="box">
        <div class="form_control">
            <input type="text" name="keyword" value="<?php echo ($_GET['keyword']); ?>" placeholder="请输入您想了解的装修公司">
            <button id="btnSearch" type="button"><i class="fa fa-search"></i></button>
        </div>
    </div>

    <div class="companybanner">
        <img class="anniutc" src="/assets/mobile/company2815/img/lijimfsq.png">
    </div>
   <div class="beijingtm"></div>
   <?php if($bmflag == 1): ?><div class="fixguding">
       <ul class="daohangquyu">
        <li><span class="fuwudiqu">服务区域</span><i class="fa fa fa-angle-down"></i></li>
        <li><span class="gongsbz">公司规模</span><i class="fa fa fa-angle-down"></i></li>
        <li><span class="fuwubaoz">服务保障</span><i class="fa fa fa-angle-down"></i></li>
        <li class="noborder"><span class="hotsort">热门排序</span><i class="fa fa fa-angle-down"></i></li>
    </ul>

    <div class="xialakz">
        <ul class="choseul" style="display: none">
            <?php if(is_array($navbar["area"]["result"])): $k = 0; $__LIST__ = $navbar["area"]["result"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($k % 2 );++$k;?><li>
                    <?php if(($k == 1)): ?><a rel="nofollow"  href="<?php echo ($vo["link"]); ?>/" <?php if(($param['fu'] == 0)): ?>class="xuanze"<?php endif; ?>><?php echo ($vo["name"]); ?></a>
                    <?php else: ?>
                    <a href="<?php echo ($vo["link"]); ?>/" <?php if($param['fu'] == $vo['id']): ?>class="xuanze"<?php endif; ?> ><?php echo ($vo["name"]); ?></a><?php endif; ?>
                </li><?php endforeach; endif; else: echo "" ;endif; ?>
        </ul>
        <ul class="choseul" style="display: none">
            <?php if(is_array($navbar["guimo"]["result"])): $k = 0; $__LIST__ = $navbar["guimo"]["result"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($k % 2 );++$k;?><li>
                    <?php if(($k == 1)): ?><a  rel="nofollow"  href="<?php echo ($vo["link"]); ?>/" <?php if(($param['g'] == 0)): ?>class="xuanze"<?php endif; ?>><?php echo ($vo["name"]); ?></a>
                    <?php else: ?>
                    <a  href="<?php echo ($vo["link"]); ?>/" <?php if($param['g'] == $vo['id']): ?>class="xuanze"<?php endif; ?> ><?php echo ($vo["name"]); ?></a><?php endif; ?>
                </li><?php endforeach; endif; else: echo "" ;endif; ?>
        </ul>
        <ul class="choseul" style="display: none">
            <?php if(is_array($navbar["baozhang"]["result"])): $i = 0; $__LIST__ = $navbar["baozhang"]["result"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                    <?php if($param['bz'] == $vo['id']): ?><a rel="nofollow" href="<?php echo ($vo["link"]); ?>/" class="xuanze"><?php echo ($vo["name"]); ?></a>
                        <?php elseif(($param['bz'] == 0) and ($vo['id'] == '')): ?>
                        <a rel="nofollow" href="<?php echo ($vo["link"]); ?>/" class="xuanze"><?php echo ($vo["name"]); ?></a>
                        <?php else: ?>
                        <a rel="nofollow" href="<?php echo ($vo["link"]); ?>/"><?php echo ($vo["name"]); ?></a><?php endif; ?>
                </li><?php endforeach; endif; else: echo "" ;endif; ?>
        </ul>
        <ul class="choseul" style="display: none">
            <?php if($url_2 == ''): ?><li><a href="http://<?php echo C('MOBILE_DONAMES'); echo ($url); ?>"  rel="nofollow"  class="xuanze">默认排序</a></li>
            <?php else: ?>
                <li><a href="http://<?php echo C('MOBILE_DONAMES'); echo ($url); ?>"  rel="nofollow" >默认排序</a></li><?php endif; ?>
            <?php if(($url_2 == 'orderby=star') or ($url_2 == 'orderby=star&issale=1')): ?><li><a href="http://<?php echo C('MOBILE_DONAMES'); echo ($url); ?>?orderby=star"  rel="nofollow"  class="xuanze">口碑</a></li>
            <?php else: ?>
                <li><a href="http://<?php echo C('MOBILE_DONAMES'); echo ($url); ?>?orderby=star"  rel="nofollow" >口碑</a></li><?php endif; ?>
            <?php if(($url_2 == 'orderby=shili') or ($url_2 == 'orderby=shili&issale=1')): ?><li><a href="http://<?php echo C('MOBILE_DONAMES'); echo ($url); ?>?orderby=shili"  rel="nofollow"  class="xuanze">综合实力</a></li>
            <?php else: ?>
                <li><a href="http://<?php echo C('MOBILE_DONAMES'); echo ($url); ?>?orderby=shili"  rel="nofollow" >综合实力</a></li><?php endif; ?>
            <?php if(($url_2 == 'issale=1') or ($url_2 == 'orderby=star&issale=1') or ($url_2 == 'orderby=shili&issale=1')): ?><li><a href="<?php echo ($companyInfo["saleUrl"]); ?>" class="xuanze"  rel="nofollow" >优惠</a></li>
            <?php else: ?>
                <li><a href="<?php echo ($companyInfo["saleUrl"]); ?>"  rel="nofollow" >优惠</a></li><?php endif; ?>
        </ul>
    </div>

   </div><?php endif; ?>

     <!--列表页-->
    <div class="liebiaodkz">
        <div class="liebiaozj">
            <ul class="liebiaoul">
                <?php if(is_array($companyInfo["companyList"])): $i = 0; $__LIST__ = $companyInfo["companyList"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                        <div class="tupiankz"><a href="/<?php echo ($vo["bm"]); ?>/company_case/<?php echo ($vo["id"]); ?>/"><img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo ((isset($vo['img']) && ($vo['img'] !== ""))?($vo['img']):'file/20180123/FsmhNCcgLnXA8gVgmUMbK2uwqlSd.jpg'); ?>-w300.jpg"></a></div>
                        <div class="wenzims">
                            <a href="/<?php echo ($vo["bm"]); ?>/company_home/<?php echo ($vo["id"]); ?>/">
                                    <div class="title_bt"><?php echo (mbstr($vo["qc"],0,8)); ?></div>
                                    <div class="anlipl">
                                        <div class="anlipl_left">案例数：<span><?php echo ((isset($vo["case_count"]) && ($vo["case_count"] !== ""))?($vo["case_count"]):"0"); ?></span></div>
                                        <div class="anlipl_right">评论数：<span><?php echo ((isset($vo["comment_count"]) && ($vo["comment_count"] !== ""))?($vo["comment_count"]):"0"); ?></span></div>
                                    </div>
                                <div class="addressdz"><span class="ditulogo"></span><?php echo ($vo["dz"]); ?></div>
                                <?php if($vo["active_title"] != ''): ?><div class="zhekou"><span class="youhui">惠</span><?php echo ($vo["active_title"]); ?></div><?php endif; ?>
                                <?php if($vo['cardcount'] != 0): ?><div class="c-ticket">
                                    <p class="c-ticket-total">优惠券(<?php echo ($vo["cardcount"]); ?>) <i class="fa fa-chevron-right left-arrow" aria-hidden="true"></i></p>
                                     <?php if(is_array($vo["cardlist"])): $i = 0; $__LIST__ = $vo["cardlist"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$kk): $mod = ($i % 2 );++$i;?><div class="c-ticket-detail ticket-2" data-cardid="<?php echo ($kk["id"]); ?>">
                                             <span class="ticket-name  ticket-name_1">券</span>
                                             <p class="ticket-intro ticket-intro_1"><?php echo ($kk["name"]); ?></p>
                                             <!--<span class="ticket-arrow ticket-arrow_1">></span>-->
                                         </div><?php endforeach; endif; else: echo "" ;endif; ?>
                                </div><?php endif; ?>
                            </a>

                        </div>
                    </li><?php endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>

        <!--分页-->
        <?php echo ($companyInfo["page"]); ?>

        <!--找不到装修公司-->
        <?php if($noresult == 1): ?><div class="wujieguo">
                <div class="wenzitis">没搜索到该结果...</div>
                <img src="/assets/mobile/company2815/img/searchku.png">
            </div><?php endif; ?>

        <!--找不到合适的咋办-->
            <div class="get-recommend">
                <p class="howtodo">找不到合适的装修公司？怎么办</p>
                <form id="myForm">
                    <div class="input-box">
                        <?php if(($mapUseInfo["vipcount"]) > "0"): ?><button id="showCityPicker2" class="c-zb-city" type="button">
                            <i class="fa fa-map-marker"></i>
                            <?php if(empty($info["cityarea"])): ?>请选择您所在的区域
                            <?php else: ?>
                            <?php echo ($mapUseInfo["provincefull"]); ?> <?php echo ($mapUseInfo["name"]); ?> <?php echo ($info["cityarea"]["name"]); endif; ?>
                        </button>
                        <input type="hidden" name="province" data-id="<?php echo ($mapUseInfo["pid"]); ?>">
                        <input type="hidden" name="city" data-id="<?php echo ($mapUseInfo["id"]); ?>">
                        <input type="hidden" name="area" data-id="<?php echo ($info["cityarea"]["id"]); ?>">
                    <?php else: ?>
                        <button id="showCityPicker2" class="c-zb-city" type="button">
                            <i class="fa fa-map-marker"></i>
                            请选择您所在的区域
                        </button>
                        <input type="hidden" name="province" data-id="">
                        <input type="hidden" name="city" data-id="">
                        <input type="hidden" name="area" data-id=""><?php endif; ?>

                    </div>
                    <div class="input-box">
                        <input type="text" name="name" placeholder="请输入您的名称">
                    </div>
                    <div class="input-box">
                        <input type="tel" name="tel" maxlength="11" placeholder="请输入您的手机号码">
                    </div>
                    <div class="input-box" id="shenming">
                        <input type="checkbox" checked="checked" id="mianze">
                        <label for="mianze" id="check" class="fa fa-check"></label>
                        <span>我已阅读并同意齐装网的</span>
                        <a href="http://<?php echo C('MOBILE_DONAMES');?>/about/disclaimer"><span>《免责申明》</span></a>
                    </div>
                    <div class="input-box submit">
                        <input id="btnSave" type='button' value="获取推荐（1-4家星级装修公司）"/>
                    </div>
                </form>
            </div>


            <!--发单弹窗-->
   <div class="free_get_window"></div>
        <div class="fadan_area" style="display: none;">
            <div class="closed"><i id="calculator-closed" class="fa fa-times"></i></div>
            <div class="calculator-item">
                <div class="calculator-title">
                    获取4家靠谱装修公司
                </div>
            </div>
            <div class="calculator-item">
                <div class="input-box">
                    <button id="showCityPicker4" class="c-zb-city" type="button">
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
            </div>
            <div class="calculator-item">
                <div class="input-box">
                    <input type="text" placeholder="怎么称呼您" name="size" class="mianji">
                </div>
            </div>

            <div class="calculator-item">
                <div class="input-box">
                    <input type="tel" minlength="11" maxlength="11" placeholder="请输入手机号码获取结果" name="phone">
                </div>
            </div>
            <div class="calculator-item" id="shenming2" style="width: 80%;margin: 0 auto;">
                        <input type="checkbox" checked="checked" id="mianze2">
                        <label for="mianze2" id="check2" class="fa fa-check"></label>
                        <span>我已阅读并同意齐装网的</span>
                        <a href="http://<?php echo C('MOBILE_DONAMES');?>/about/disclaimer"><span>《免责申明》</span></a>

            </div>
            <div class="calculator-item">
                <div class="input-box border-none">
                     <div id="btnSave2">立即免费申请</div>
                </div>
            </div>
        </div>
         <!--发单弹窗-->

         <!--发单成功弹窗-->
         <div class="tjsuccess">
        <div class="tjcgbt">
            <span class="chengglogo"></span>
            恭喜您提交成功
        </div>
        <div class="tjcgbt2">
            <span>*</span>
            稍后会有专业人员联系您，请注意接听
        </div>
        <div class="erweima">
            <div class="detail-text">
                <P>随进了解装修进程</P>
                <P>美女设计师1对1对答</P>
                <P>“2房”变“3房”秘决</P>
                <P>实时装修报价动态</P>
                <P>装修案例抢先看</P>
            </div>
            <div class="erweimatw">
                <img src="/assets/mobile/company2815/img/erweimabj.jpg" alt="">
                <!-- <img src="<?php echo ($img); ?>" alt="二维码"> -->
            </div>
        </div>
        <div class="guanbiniu"></div>
    </div>
    <!--发单成功弹窗-->

    </div>

    <input type="hidden" name="hide_city_id" value="<?php echo ($info["cityarea"]["id"]); ?>">

</article>
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

    

    <script type="text/javascript">


         $(function(){

            $('.xuanze').each(function(index,el){
            var text01 = $($('.xuanze')[0]).text();
            var text02 = $($('.xuanze')[1]).text();
            var text03 = $($('.xuanze')[2]).text();
            var text04 = $($('.xuanze')[3]).text();

            if(text01!="不限"){
               $('.fuwudiqu').text(text01);
            }else if(text01==""){
                 $('.fuwudiqu').text("服务区域");
            }
            if(text02!="不限"){
               $('.gongsbz').text(text02);
            }else if(text02==""){
                 $('.gongsbz').text("公司规模");
            }
            if(text03!="不限"){
               $('.fuwubaoz').text(text03);
            }else if(text03==""){
                 $('.fuwubaoz').text("服务保障");
            }
            if(text04==""){
               $('.hotsort').text("热门排序");
            }else{
               $('.hotsort').text(text04);
            }

         });


            var searchList=["服务区域","公司规模","服务保障","热门排序"];

            $('.daohangquyu li').click(function(){
                // $('.xialakz').animate({height:0,padding:0},500)
                var panduan=$(".xialakz .choseul")[$(this).index()].style.display;
                if(panduan=="none"){
                    $(".beijingtm").fadeIn();
                  $($(".daohangquyu li i")[$(this).index()]).addClass('yansexz')
                  $($(".daohangquyu li i")[$(this).index()]).parents().siblings().children('i').removeClass('yansexz')
                  $(this).addClass('yanse')
                  $(this).siblings().removeClass('yanse')
                  $($(".xialakz .choseul")[$(this).index()]).css("display","block")
                  $($(".xialakz .choseul")[$(this).index()]).siblings().css("display","none")
                  $($(".xialakz .choseul")[$(this).index()]).siblings().animate({"margin-top":"-1000px"}, 300)
                  $($(".xialakz .choseul")[$(this).index()]).stop().animate({"margin-top":"0px"},500)
                }else{
                  $(".beijingtm").fadeOut();
                  $(this).removeClass('yanse')
                  $($(".xialakz .choseul")[$(this).index()]).css("display","none")
                  $($(".xialakz .choseul")[$(this).index()]).stop().animate({"margin-top":"-1000px"},300)

                  $($(".daohangquyu li i")[$(this).index()]).parents().siblings().children('i').removeClass('yansexz')
                  $($(".daohangquyu li i")[$(this).index()]).removeClass('yansexz')
                }
            });

            $(".choseul").on('click','li',function(){
                var wenzith=$(this).parent();
                var index=wenzith.index();
                var daohanghuan=$($('.daohangquyu li')[index]).children('span')[0];
                $(this).addClass('xuanze');
                $(this).siblings().removeClass('xuanze')

                 $(".beijingtm").fadeOut();
                 $(".xialakz .choseul").css("display","none")
                 $(".xialakz .choseul").stop().animate({"margin-top":"-1000px"},300)
                if($(this).text()!="不限"){
                   $(daohanghuan).text($(this).text())
                }else{
                    $(daohanghuan).text(searchList[index])
                }
            })

             $(".beijingtm").click(function(){
                $(this).fadeOut();
                $(".xialakz .choseul").css("display","none")
                $(".xialakz .choseul").stop().animate({"margin-top":"-1000px"},300)
                $(".daohangquyu li").removeClass('yanse')
                $(".daohangquyu li i").removeClass('yansexz')
             });

             $(".companybanner .anniutc").click(function(event) {

                if(navigator.userAgent.indexOf('UCBrowser') > -1) {
                    $(window).scrollTop(0);
                    $(".free_get_window").css("position","absolute");
                    // $(".free_get_window").css("height",$("body").height());
                    $(".fadan_area").css({"top":"100px"});
                    $(".footfd").css("position","absolute");
                }else{
                    $("html,body").css({"height":$(window).height(),"overflow":"hidden"})
                    $(".free_get_window").css("position","fixed");
                    $(".fadan_area").css({"position":"fixed","bottom":"0px"});

                }



                $(".free_get_window").fadeIn();
                $(".fadan_area").fadeIn();

                });

                 $("#calculator-closed").click(function(){
                     $("body,html").css({"overflow":"auto","height":"auto"});
                     $(".free_get_window").fadeOut();
                     $(".fadan_area").fadeOut();
                });

                 $("#btnSave").click(function(event) {
                var container = $(this).parents("#myForm");

                var name = $("input[name=name]",container).val();
                var tel = $("input[name=tel]",container).val();

                var cs = $('input[name=city]',container).attr('data-id');
                var qx = $('input[name=area]',container).attr('data-id');

                if (!App.validate.run(name)) {
                    $("input[name=name]",container).focus();
                    alert("请输入您的称呼");
                    return false;
                }else{
                    var reg = new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$");
                    if(!reg.test(name)){
                        $("input[name=name]",container).focus();
                        alert("请输入正确的名称，只支持中文和英文");
                        return false;
                    }
                }

                if (!App.validate.run(tel)) {
                    $("input[name=tel]",container).focus();
                    $("input[name=tel]",container).val('');
                    alert("请输入您的手机号码 ^_^!");
                    return false;
                }else{
                    var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
                    var reg2 = new RegExp("^140|141|142|143|144|146|148|149|154|171|172|174|179[0-9]{8}$");
                    if(!reg.test(tel)){
                        $("input[name=tel]",container).focus();
                        $("input[name=tel]",container).val('');
                        alert("请填写正确的手机号码 ^_^!");
                        return false;
                    }
                    if(reg2.test(tel)){
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
                var checked = $("#mianze").is(':checked');
                if(!checked){
                    alert('请勾选我已阅读并同意齐装网的《免责申明》！')
                    return false;
                }
                window.order({
                    extra:{
                        cs: cs,
                        qx: qx,
                        name:name,
                        tel:tel,
                        source: '329'
                    },
                    error:function(){},
                    success:function(data, status, xhr){
                        if(data.status == 1){
                            window.location.href = "/baojiawanshan/";
                        }else{
                            alert(data.info);
                        }
                    },
                    validate:function(item, value, method, info){
                        return true;
                    }
                });
            });


                $("#btnSave2").click(function(){

                var xingming = $("input[name=size]");
                var tel = $("[name='phone']").val();
                if(xingming.val()=="" || xingming.val().length==0){
                    xingming.focus();
                    alert("请输入您的称呼");
                    return false;
                  }else{
                    var reg= new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$");
                    if(!reg.test(xingming.val())){
                        xingming.focus();
                        alert("请输入正确的称呼，只支持中文和英文 ^_^!");
                        return false;
                    }

                  }

                if (!App.validate.run(tel,'phone')) {
                    $("[name='phone']").focus();
                    alert("请输入您的手机号码 ^_^!");
                    return false;
                }else{
                    var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
                    var reg2 = new RegExp("^140|141|142|143|144|146|148|149|154|171|172|174|179[0-9]{8}$");
                    if(!reg.test(tel)){
                        $("[name='phone']").focus();
                        alert("请填写正确的手机号码 ^_^!");
                        App.pop.run($("[name='phone']"),"请填写正确的手机号码1 ^_^!");
                        return false;
                    }
                    if(reg2.test(tel)){
                        $("input[name=tel]").focus();
                        $("input[name=tel]").val('');
                        alert("请填写正确的手机号码 ^_^!");
                        return false;
                    }

                }
                var checked2 = $("#mianze2").is(':checked');
                if(!checked2){
                    alert('请勾选我已阅读并同意齐装网的《免责申明》！')
                    return false;
                }
                window.order({
                    extra:{
                        cs:$("[name=city]").attr('data-id'),
                        qy:$("[name=area]").attr('data-id'),
                        mianji:$("[name=size]").val(),
                        tel:$("[name=phone]").val(),
                        source: '18032143'
                    },
                    error:function(){
                        alert("发生了未知的错误,请稍后再试！");
                    },
                    success:function(data, status, xhr){

                        if(data.status == 1){

                            $(".fadan_area").fadeOut();
                            $(".tjsuccess,.free_get_window").fadeIn();
                            $(".footfd").css("position","fixed");
                        }else{
                            alert(data.info);
                        }
                    },
                    validate:function(item, value, method, info){
                        return true;
                    }
                });

             });

        $('.tjsuccess .guanbiniu').click(function() {
                $("body,html").css({"overflow":"auto","height":"auto"});
                $(".free_get_window").fadeOut();
                $('.tjsuccess').hide();
            });

         /*导航栏固定*/
            window.onscroll=function(){
                var top=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
                if(top>270){
                    $(".fixguding").addClass('tofixed')
                }else{
                    $(".fixguding").removeClass('tofixed')
                }
            }
                var dayin=$('#page-count #current-page');
                var zongpage=$('#page-count #page-num')
                var nowpage=parseInt(dayin.text())
                var zongpagenumber=parseInt(zongpage.text())
                if(nowpage>1){
                   $('#prev-page a').addClass('yanse')
                }else if(nowpage==1){
                   $('#prev-page a').removeClass('yanse')
                }
                if(nowpage==zongpagenumber){
                   $('#next-page a').removeClass('yanse')
                }else{
                    $('#next-page a').addClass('yanse')
                }


             $("#btnSearch").click(function(event) {
                 var keyword = $("input[name=keyword]").val();

                 if("<?php echo ($is_www); ?>" != "1"){
                     window.location.href="/<?php echo ($cityInfo["bm"]); ?>/company/?keyword="+keyword;
                 }else{
                     window.location.href="/company/?keyword="+keyword;
                 }
             });
             //切换免责对勾
            $("#check").click(function(){
                $(this).toggleClass('fa-check');
            });
            $("#check2").click(function(){
                $(this).toggleClass('fa-check');
            });
         })

        // 优惠券
        /*$('.c-ticket-detail').on('click',function (){
            //清空数据
            $('.ticket-names').text('');
            $('.fa-jpy').hide();
            $('.money1').text('');
            $('.money2').text('');
            $('.start_time').text('');
            $('.end_time').text('');
            $('.card_userule').text('');
            var cardid = $(this).data('cardid');
            // alert
            $.ajax({
                url: '/company/getcardinfobyid/',
                type: 'GET',
                dataType: 'JSON',
                data: {
                    cardid:cardid,
                }
            })
                .done(function(result) {
                    if(result.error_code == '1'){
                        //填写数据
                        $('.ticket-names').text(result.data.name);
                        if(result.data.money1 > 0){
                            $('.fa-jpy').show();
                            $('.money1').text(result.data.money1);
                        }
                        $('.money2').text(result.data.money2);
                        $('.start_time').text(result.data.start);
                        $('.end_time').text(result.data.end);
                        $('.card_userule').text(result.data.rule);

                    }else{
                        alert(result.error_msg);
                    }
                }).fail(function(xhr) {
                alert('操作失败,请稍后再试！');
            });
            $('.ticket-box').show()
            $('.mask-ticket').show()
        })*/
        /*$(".close-icon").on('click',function () {
            $('.mask-ticket').hide()
            $('.ticket-box').hide()
            //清空数据
            $('.ticket-names').text('');
            $('.fa-jpy').hide();
            $('.money1').text('');
            $('.money2').text('');
            $('.start_time').text('');
            $('.end_time').text('');
            $('.card_userule').text('');
        })*/
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