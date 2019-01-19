<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>量房登录页</title>
    <meta name="keywords" content="<?php echo ($head["keywords"]); ?>" />
    <meta name="description" content="<?php echo ($head["description"]); ?>" />
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
    
    <link href="/assets/mobile/card/css/login.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css"/>

    
</head>
<body>
    <div class="m-wrap">
        
        <header>
            
    <div class="m-header-his">
       <i class="fa fa-angle-left"></i>
    </div>
    <a href="http://<?php echo C('MOBILE_DONAMES');?>/<?php echo ($cityInfo["bm"]); ?>/" class="m-header-left"></a>
    <div class="m-header-city" style="left: 35%;"><a href="/city/"><?php echo ((isset($cityInfo["name"]) && ($cityInfo["name"] !== ""))?($cityInfo["name"]):"全国"); ?><i class="fa fa-sort-desc"></i></a></div>

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
    <li><a href="/"><i class="home-nav-icon nav-home-icon"></i><span>首页</span></a></li>
    <li><a href="/sheji/"><i class="home-nav-icon nav-huxing-icon"></i><span>户型设计</span></a></li>
    <li><a href="/baojia/"><i class="home-nav-icon nav-baojia-icon"></i><span>装修报价</span></a></li>
    <li>
        <?php if(empty($cityInfo['bm'])): ?><a href="http://m.<?php echo C('QZ_YUMING');?>/company/"><i class="home-nav-icon nav-company-icon"></i><span>找装修公司</span></a>
        <?php else: ?>
            <a href="/<?php echo ($cityInfo["bm"]); ?>/company/"><i class="home-nav-icon nav-company-icon"></i><span>找装修公司</span></a><?php endif; ?>
    </li>
    <li><a href="/gonglue/"><i class="home-nav-icon nav-gonglue-icon"></i><span>装修攻略</span></a></li>
    <li><a href="/meitu/"><i class="home-nav-icon nav-xiaoguo-icon"></i><span>装修效果图</span></a></li>
    <li><a href="/xgt/"><i class="home-nav-icon nav-anli-icon"></i><span>装修案例</span></a></li>
    <li><a href="/ruzhu/"><i class="home-nav-icon nav-ruzhu-icon"></i><span>商家入驻</span></a></li>
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
       <div class="zxxianghaoli01">
           <span class="huodrule">活动规则</span>
       </div>
       <div class="zxxianghaoli02"></div>
       <div class="contentwk">
           <div class="phonewk">
               <span class="yuanquan lefttop"></span>
               <span class="yuanquan righttop"></span>
               <span class="yuanquan leftbottom"></span>
               <span class="yuanquan rightbottom"></span>
                <div class="inputwk">
                    <input class="phonehao" type="tel" maxlength="11" placeholder="请输入您预留的手机号">
                    <span class="clearniu">X</span>
                </div>
                <div class="inputwk">
                    <input class="yanzhegnma" type="tel" maxlength="6" placeholder="请输入接收到的验证码">
                    <button class="getcode" disabled>获取验证码</button>
                </div>
                <div class="inputwk">
                    <span class="lijitake">立即领券</span>
                </div>
                <div class="takezige">验证手机号以查询您的领券资格</div>
           </div>
           <div class="platformjijin">
               <div class="platformjijintop">
                   <div class="platformjijintop-title">平台通用基金</div>
                   <div class="platformjijintop-ms">量房立得装修优惠基金</div>
                   <div class="xianding"><span class="xianduse">限定装修公司使用</span></div>
               </div>
               <div class="companylogin">
                   <ul>
                       <?php if(is_array($tongyonglist)): $i = 0; $__LIST__ = $tongyonglist;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                               <a href="/couponin?comid=<?php echo ($vo["id"]); ?>">
                                   <div class="gongshilogo">
                                       <?php if($vo['logo'] != ''): ?><img src="<?php echo ($vo["logo"]); ?>" />
                                       <?php else: ?>
                                           <img src="http://<?php echo C('QINIU_DOMAIN');?>/Public/default/images/default_logo.png" /><?php endif; ?>
                                   </div>
                                   <div class="companyname"><?php echo ($vo["jc"]); ?></div>
                               </a>
                           </li><?php endforeach; endif; else: echo "" ;endif; ?>
                   </ul>
               </div>
           </div>
           <div class="zhuanshuyh">
                <div class="zhuanshuyhtop">
                    <div class="zhuanshuyhtop-title">商户专属优惠</div>
                    <div class="zhuanshuyhtop-ms">多样装修基金满足您的需求</div>
                    <div class="xianding"><span class="xianduse">量房即领</span></div>
                </div>
                <div class="gongshiyouhui">
                    <ul>
                        <?php if(is_array($specialcardlist)): $i = 0; $__LIST__ = $specialcardlist;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                                <a href="/couponin?cardid=<?php echo ($vo["card_id"]); ?>">
                                    <div class="logodiv">
                                        <?php if($vo['logo'] != ''): ?><img src="<?php echo ($vo["logo"]); ?>" />
                                            <?php else: ?>
                                            <img src="http://<?php echo C('QINIU_DOMAIN');?>/Public/default/images/default_logo.png" /><?php endif; ?>
                                    </div>
                                    <div class="gongshi-title"><?php echo ($vo["jc"]); ?></div>
                                    <div class="manjian"><?php echo ($vo["subtext"]); ?></div>
                                </a>
                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                </div>
           </div>
           <div class="followwx">
               <div class="guanzhuwx">
                   <img src="/assets/mobile/card/img/followwx.jpg" alt="">
               </div>
               <div class="guanzhums">
                   <div class="guanzhums01">微信关注齐装网公众号</div>
                   <div class="guanzhums02">齐装网装修管家</div>
                   <div class="guanzhums03">获取更多装修小技巧</div>
               </div>
           </div>
       </div>
       <!-- 活动规则 -->
       <div class="rulesyiny"></div>
       <div class="rulesneirogn">
           <div class="rules-title">活动规则</div>
           <div class="rulesshowwk">
                <p class="rulestitle">活动时间：</p>
                <p class="rulesnr">以各优惠券指定的时间为准。</p>
                <p class="rulestitle">活动参与对象：</p>
                <p class="rulesnr">通过齐装网平台预约装修公司成功的用户，凭预约时填写的手机号领取。</p>
                <p class="rulestitle">活动方式：</p>
                <p class="rulesnr">1、用户在齐装网平台预约装修公司成功，并标记装修公司已量房后即可领取该公司的优惠券。</p>
                <p class="rulesnr">2、优惠券使用规则与有效期，以各优惠券券面显示及齐装网平台规则为准。优惠券数量有限，领完即止。</p>
                <p class="rulestitle">规则说明：</p>
                <p class="rulesnr">1、用户获得的优惠券将会自动发送至账户和用户手机号，是否获得优惠券以到账为准。</p>
                <p class="rulesnr">2、活动过程中凡以不正当手段参与领券的用户，齐装网有权终止其参与活动，并取消其领取资格（如已发放，该券予以作废）。</p>
                <p class="rulesnr">3、每张优惠券仅可使用一次。</p>
                <p class="rulesnr">4、如遇不可抗力（包括但不限于重大灾害事件、活动受政府机关指令需要停办或整改的、活动中存在大面积作弊行为、活动遭受严重网络攻击或因系统故障导致中奖名单大批量出错等以致活动不能正常进行的），齐装网有权取消、修改或暂停本活动。</p>
                <p class="rulesnr">5、用户应遵守国家法律、行政法规、部门规章等规范性文件。用户使用非法手段参与营销活动而获取非法利益的，应停止损害行为、返还并赔偿损失，可能涉嫌刑事犯罪的，齐装网一经发现将立即向司法机关报案。</p>
               </div>
           <div class="knowniu">我知道了</div>
       </div>
   </article>

        
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

    
    <script src="/assets/mobile/js/jroll.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript">
        var ullilength=$('.companylogin ul li').length;
        var kuandu=$('.companylogin ul li').outerWidth(true)+2;
        var ulkuandu=kuandu*ullilength;
        var xianzhikd=kuandu*5
        if(ulkuandu>=xianzhikd){
            $('.companylogin ul').width(xianzhikd)
        }else{
            $('.companylogin ul').width(ulkuandu) 
        }

      new JRoll(".companylogin",{scrollX:true,scrollY:false});

        $(function(){
             var flag = true;
             function countDown(obj, num) {
                      if (num > 0) {
                          obj.text(num + "s");
                          num--;
                          setTimeout(function (obj, num) {
                              countDown(obj, num);
                          }, 1000, obj, num);
                      } else {
                          obj.text("获取验证码");
                          flag = true;
                      }
                }
            $('body').on('input propertychange','.phonehao',function(event) {
                if($(this).val().length>=11){    
                    $('.inputwk .getcode').attr('disabled',false);
                }else{
                    $('.inputwk .getcode').attr('disabled',true); 
                }
             });

             $('.zxxianghaoli01 .huodrule').click(function(){
                 $('.rulesyiny').fadeIn();
                 $('.rulesneirogn').fadeIn();
             })

             $('.rulesneirogn .knowniu').click(function(){
                $('.rulesyiny').fadeOut();
                $('.rulesneirogn').fadeOut();
             })

            $('.inputwk .getcode').click(function(){
                var that=this;
                var shoujival=$.trim($('.phonehao').val());
                var newReg = new RegExp("^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$"); 
                if(!newReg.test(shoujival)){
                    alert('请输入正确的手机号')
                    $('.phonehao').val("")
                    $('.phonehao').focus();
                    return false;
                }
                if(flag==true){
                    flag=false
                    $.ajax({
                     url: '/sendsms/',
                     type: 'POST',
                     dataType: 'json',
                     data: {
                         tel: shoujival
                     },
                 })
                 .done(function(data) {
                     if(data.status == 1){
                         countDown($(that), 60)
                     }else{
                         alert(data.info);
                     }
                 })
                 .fail(function() {
                     console.log("请求失败！");
                     alert('请求失败！');
                 });
                }
                 
             })

          $('.phonewk .lijitake').click(function(){
              var shoujival=$.trim($('.phonehao').val());
              var yanzhengval=$.trim($('.yanzhegnma').val());
              var newReg = new RegExp("^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$");
              if(shoujival==''){
                alert('请输入登录账号')
                $('.phonehao').focus();
                return false;
              }
              if(!newReg.test(shoujival)){
                alert('请输入正确的手机号')
                $('.phonehao').val("")
                $('.phonehao').focus();
                return false;
              }
              if(yanzhengval==""){
                alert('请输入验证码')
                $('.yanzhegnma').focus();
                return false;
              }
              //礼券页登陆
              $.ajax({
                  url: '/cardlogin/',
                  type: 'POST',
                  dataType: 'json',
                  data: {
                      tel: shoujival,
                      code:yanzhengval
                  },
              })
              .done(function(data) {
                  if(data.error_code == 1){
                      alert('登录成功');
                      window.location.href = '/card/coupoinfenpei/';
                  }else if(data.error_code == 4000102){  //没有发布订单
                      window.location.href = '/cardapply/';
                  }else{
                      alert(data.error_msg);
                  }
              })
              .fail(function() {
                  console.log("请求失败！");
                  alert('请求失败！');
              });


          })

            $('.inputwk .clearniu').click(function(){
                $('.inputwk .phonehao').val("");
            })

          if($("body").height()<$("html").height()){
            $("article").height($("html").height() - $("#footer").outerHeight()-$('header').outerHeight())
          }

        })
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