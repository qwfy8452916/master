<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <title><?php echo ($keys["title"]); ?>-<?php echo ($title); ?></title>
    <meta name="keywords" content="<?php echo ($keys["keywords"]); ?>" />
    <meta name="description" content="<?php echo ($keys["description"]); ?>" />
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



    <link href="<?php echo ($static_host); ?>/assets/sub/company/css/home.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
</head>

<body>
    <div class="comptop">
  <div class="wrap">
    <ul class="topnav">
      <li><a href="/">回到首页</a></li>
      <li><a href="/zhaobiao/" target="_blank">装修招标</a></li>
      <li class="active"><a href="/company/" target="_blank">装修公司</a></li>
      <li><a href="/xgt/" target="_blank">装修效果图</a></li>
      <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/gonglue/" target="_blank">装修攻略</a></li>
    </ul>
    <ul class="login">
      <?php if(isset($_SESSION['u_userInfo'])): ?><li>
              <a href="http://u.qizuang.com/home/" target="_blank">
                  <?php switch($_SESSION['u_userInfo']['classid']): case "1": echo ($_SESSION['u_userInfo']['name']); break;?>
                    <?php case "2": echo ($_SESSION['u_userInfo']['name']); break;?>
                    <?php case "3": echo ($_SESSION['u_userInfo']['jc']); break; endswitch;?>

              </a>
              <a class="loginout" href="/loginout/">退出</a>
          </li>
          <?php else: ?>
          <li>
              <span><a href="http://u.qizuang.com">登录</a></span>
              <span><a href="http://u.qizuang.com/reg/">注册</a></span>
          </li><?php endif; ?>
      <li>|</li>
      <li><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/joinus" target="_blank">装修公司合作</a></li>
      <li><strong> 全国统一服务热线：<?php echo OP('QZ_CONTACT_TEL400');?></strong></li>
    </ul>
  </div>
</div>


<div class="complogo lbg1">
  <div class="wrap">
    <div class="comphead">
      <?php if($userInfo['user']['logo'] != ''): ?><img src="<?php echo ($userInfo["user"]["logo"]); ?>" width="193" height="110"/>
      <?php else: ?>
        <img src="http://<?php echo C('QINIU_DOMAIN');?>/<?php echo OP('DEFAULT_COMPANY_LOGO');?>" width="193" height="110"/><?php endif; ?>
    </div>
    <h1><?php echo ($userInfo["user"]["qc"]); ?></h1>
    <h2><?php echo ($userInfo["user"]["kouhao"]); ?></h2>
  </div>
</div>
<div class="compnav">
  <ul>
    <li class="allserve"> <span class="btn"> <img src="<?php echo ($static_host); ?>/assets/common/pic/5step.gif" width="154" height="45"> </span>
       <div id="stepall">
          <dl class="fstep">
              <dt class="st1" data-title="一键免费申请"> <i>免费量房验房</i> 专业检测仪器，验房有保障
                  <div class="fstep-int">
                      <div class="fstep-int-left"><img src="/assets/common/img/1-1.png">
                          <h2>拒绝开发商用各项理由"大事化小"<br>不放过自己的每一项权利！</h2>
                          <h3>漏水、裂缝、气泡等质量问题一网打尽！</h3>
                      </div>
                  </div>
              </dt>
              <dt class="st2"  data-title="获取4套设计方案"><i>免费4份不同设计</i> 严格审核图纸，不收任何费用
                  <div class="fstep-int">
                      <div class="fstep-int-left"><img src="/assets/common/img/1-2.png">
                          <h2>合理的采光色调及空间布局！<br>理想的风水规划,专业人办专业事儿！</h2>
                          <h3>4套设计全面PK,让你的装修绝不后悔！</h3>
                      </div>
                  </div>
              </dt>
              <dt class="st3"  data-title="获取详细预算清单"><i>免费<?php echo date("Y");?>新报价</i>准确预算，货比三家不上当
                  <div class="fstep-int">
                      <div class="fstep-int-left"><img src="/assets/common/img/1-3.png">
                          <h2>主材辅料费用,运输及人工成本等一目了然！<br>您千万不要当"冤大头"！</h2>
                          <h3>全照国家标准,0漏项,0增项,远离被"蒙"！</h3>
                      </div>
                  </div>
              </dt>
              <dt class="st4"  data-title="马上获取预算报价"><i>免费申请第三方监管</i>细致装修，后期有保障
                  <div class="fstep-int">
                      <div class="fstep-int-left"><img src="/assets/common/img/1-4.png">
                          <h2>详细预算清单,4份不同报价挤干水份！<br>花1分钟可省万元！</h2>
                          <h3>环保材料,透明报价,土豪也能省！</h3>
                      </div>
                  </div>
              </dt>
          </dl>
          <form class="secbox_form" onsubmit="return false;">
              <div class="fstep-int-right">
                  <h1>快速免费申请</h1>
                  <ul>
                      <li><span>您的姓名:</span>
                          <input name="name" type="text" placeholder="您的姓名">
                      </li>
                      <li><span>您的手机:</span>
                          <input name="tel" type="text" placeholder="接收方案的手机">
                          <input type="hidden" name="fb_type" value="sheji">
                      </li>
                      <li><span>装修类型:</span>
                          <input name="lx" type="radio" id="house1" class="icheck" value="1" checked>
                          <label class="mr" for="house1">家装</label>
                          <input id="house2" name="lx" type="radio" class="icheck" value="2">
                          <label for="house2">公装</label>
                      </li>
                  </ul>
                  <a id="fstep-btn" href="javascript:void(0)" class="btn">一键免费申请</a>
                  <p>今日已有 <em class="red"><?php echo releaseCount("fbrs");?></em> 户业主成功免费申请！
                      <br>本月申请人数已达 <em class="red"><?php echo releaseCount("fbzrs");?></em> 人</p>
              </div>
          </form>
      </div>
      <script type="text/javascript">
          $('.icheck').iCheck({
              checkboxClass: 'icheckbox_minimal-red',
              radioClass: 'iradio_minimal-red',
              increaseArea: '' // optional
          });

          $(".fstep dt").mouseover(function(event) {
              $(".fstep-int").hide();
              $(this).find(".fstep-int").show();
              $(".fstep-int-right").find(".btn").html($(this).attr("data-title"));
              $(".fstep-int-right").find("input[name=name]").focus();
          });

          $(".allserve").mouseleave(function(event) {
             $(".fstep-int").hide();
          });

          $("#fstep-btn").click(function(event) {
              var  _this = $(this);
              $(".secbox_focus").removeClass('secbox_focus');
              if (!App.validate.run($(".fstep-int-right input[name=tel]").val(),"moblie")) {
                 $(".fstep-int-right input[name=tel]").focus().addClass('secbox_focus');
                  //显示提示
                  $.pt({
                      target: $(".fstep-int-right input[name=tel]"),
                      content: '请输入正确的手机号码!',
                      width: 'auto'
                  });
                  return false;
              }

              window.order({
                  extra:{
                      cs:"<?php echo ($cityInfo["id"]); ?>",
                      name:$(".fstep-int-right input[name=name]").val(),
                      tel:$(".fstep-int-right input[name=tel]").val(),
                      fb_type:$(".fstep-int-right input[name=fb_type]").val(),
                      lx:$(".fstep-int-right input[name=lx]").val(),
                      source: 166,
                      safecode: $("#safecode").val(),
                      safekey: $("#safekey").val(),
                      ssid: "<?php echo ($ssid); ?>",
                      step: 2
                  },
                  error:function(){
                      $.pt({
                          target: _this,
                          content: "发布失败,请刷新页面！",
                          width: 'auto'
                      });
                  },
                  success:function(data, status, xhr){
                      $("#safecode").val(data.data.safecode);
                      $("#safekey").val(data.data.safekey);
                      if (data.status == 1) {
                          $("body").append(data.data.tmp);
                      } else {
                          $.pt({
                              target: _this,
                              content: data.info,
                              width: 'auto'
                          });
                      }
                  },
                  validate:function(item, value, method, info){
                      return true;
                  }
              });
          });
      </script>
    </li>
    <li><a href="/company_home/<?php echo ($userInfo["user"]["id"]); ?>">首页</a></li>
    <li><a href="/company_about/<?php echo ($userInfo["user"]["id"]); ?>">关于我们</a></li>
    <li><a href="/company_case/<?php echo ($userInfo["user"]["id"]); ?>">装修案例</a></li>
    <li><a href="/company_team/<?php echo ($userInfo["user"]["id"]); ?>">设计师</a></li>
    <li><a href="/company_message/<?php echo ($userInfo["user"]["id"]); ?>">业主评价</a></li>
    <li><a href="/company_zixun/<?php echo ($userInfo["user"]["id"]); ?>">装修资讯</a></li>
    <li><a href="/wenda/<?php echo ($userInfo["user"]["id"]); ?>">装修问答</a></li>
  </ul>
  <input id="safecode" type="hidden" value="<?php echo ($safecode); ?>" />
  <input id="safekey" type="hidden" value="<?php echo ($safekey); ?>" />
</div>
<script type="text/javascript">
  $(function(){
      $(".compnav >ul> li").removeClass('active').eq(<?php echo ($tabIndex); ?>).addClass('active');
  });
</script>
    <div class="wrap">
        <div class="bread"><a href="/company_home/<?php echo ($userInfo["user"]["id"]); ?>">首页</a>><a href="/company_zixun/<?php echo ($userInfo["user"]["id"]); ?>">公司资讯</a>
            <?php if($userInfo['article']['title'] != ''): ?>><?php echo ($userInfo["article"]["title"]); endif; ?>
        </div>
    </div>
    <div class="wrap oflow">
        <div class="compleft">
           <dl class="compzxtit">
              <dt>
                文章资讯
              </dt>
              <?php if(is_array($userInfo["types"]["zxType"])): $i = 0; $__LIST__ = $userInfo["types"]["zxType"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><dd><a href="/company_zixun/<?php echo ($userInfo["user"]["id"]); ?>/<?php echo ($vo["id"]); ?>"><?php echo ($vo["name"]); ?><em>(<?php echo ($vo["count"]); ?>)</em>></a></dd><?php endforeach; endif; else: echo "" ;endif; ?>
              <dt>
                优惠活动
              </dt>
              <dd><a href="/company_zixun/<?php echo ($userInfo["user"]["id"]); ?>/1/1">正在进行<em>(<?php echo ($userInfo["types"]["yxhd"]["hd"]); ?>)</em>></a></dd>
              <dd><a href="/company_zixun/<?php echo ($userInfo["user"]["id"]); ?>/1/2">往期活动<em>(<?php echo ($userInfo["types"]["yxhd"]["historyhd"]); ?>)</em>></a></dd>
            </dl>
        </div>
        <div class="compright">
            <div class="compwzmain">
                <h1><?php echo ($userInfo["article"]["title"]); ?></h1>
                <div class="fenx">
                    <div class="laiy">来源：<?php echo ($userInfo["user"]["qc"]); ?></div>
                    <span><?php echo (date("Y年m月d日",$userInfo["article"]["time"])); ?></span>
                    &nbsp;
                    <?php if($userInfo['collect']): ?><a href="javascript:javascript:void(0)" data-id="<?php echo ($userInfo["article"]["id"]); ?>"  class="collect collect-bind" data-on="1">已收藏</a>
                    <?php else: ?>
                     <a href="javascript:javascript:void(0)" data-id="<?php echo ($userInfo["article"]["id"]); ?>"  class="collect" data-on="0">收藏</a><?php endif; ?>
                    <?php if($isshow): ?><a href="javascript:;" class="pricebox">咨询获取该优惠</a><?php endif; ?>
                    <div class="bdsharebuttonbox fx">
                        <a href="#" class="bds_more" data-cmd="more"></a>
                        <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                        <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                        <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
                        <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
                        <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                    </div>
                    <script>
                    window._bd_share_config = {
                        "common": {
                            "bdSnsKey": {},
                            "bdText": "",
                            "bdMini": "2",
                            "bdPic": "",
                            "bdStyle": "0",
                            "bdSize": "16"
                        },
                        "share": {}
                    };
                    with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
                    </script>
                </div>
                <div class="wzcontent">
                  <?php echo ($userInfo["article"]["text"]); ?>
                  <br style="clear:both;"/>
                </div>
            </div>
        </div>
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
<script type="text/javascript">
    var shen = null,shi = null;
    shen = citys["shen"];
    shi = citys["shi"];

    $(".pricebox").click(function(event) {
        $.ajax({
            url: '/dispatcher/',
            type: 'POST',
            dataType: 'JSON',
            data: {
               type:"zixunfb",
               action:"load",
               select_comid : '<?php echo ($userInfo["user"]["id"]); ?>',
               display_type : '1',
               cs:"<?php echo ($cityid); ?>"
            }
        })
        .done(function(data) {
            if (data.status == 1) {
                $("body").append(data.data);
                $("input[name='name']").focus();
            }
        });
    });


</script>
<?php if(!isset($_SESSION['u_userInfo'])): ?><script type="text/javascript">
    $(".collect").click(function(event) {
        $.ajax({
            url: '/login/',
            type: 'POST',
            dataType: 'JSON',
            data:{
                ssid:"<?php echo ($ssid); ?>"
            }
        })
        .done(function(data) {
            if(data.status == 1){
                $("body").append(data.data);
                $(".win_login").fadeIn(400);
            }
        }).fail(function(xhr) {
            //显示提示
            $.pt({
                target: _this,
                content: '操作失败,请稍后再试！',
                width: 'auto'
            });
        });
    });
</script>
<?php elseif(isset($_SESSION['u_userInfo']) AND $_SESSION['u_userInfo']['classid'] != 3 AND !$caseInfo['collect']): ?>
    <script type="text/javascript">
    $(".collect").click(function(event) {
        var id = $(this).attr("data-id");
        var _this = $(this);
        if(_this.attr("data-on") == 1){
            return false;
        }
        $.ajax({
            url: '/collect/',
            type: 'POST',
            dataType: 'JSON',
            data:{
                classtype:"5",
                classid:id,
                ssid:"<?php echo ($ssid); ?>"
            }
        })
        .done(function(data) {
            if(data.status == 1){
                _this.attr("data-on",1).addClass('collect-bind').html("已收藏").Alert({
                    css:{
                        "width":"200px",
                        "height":"60px",
                        "background":"#E76363",
                        "margin-left":"-100px",
                        "margin-top":"-30px",
                        "font-size":"20px",
                        "line-height":"60px"
                    },
                    text:"收藏成功 +1"
                });
            }
        }).fail(function(xhr) {
            //显示提示
            $.pt({
                target: _this,
                content: '操作失败,请稍后再试！',
                width: 'auto'
            });
        });
    });
</script><?php endif; ?>
</html>