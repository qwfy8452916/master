<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="keywords" content="<?php echo ($keys["keywords"]); ?>">
        <meta name="description" content="<?php echo ($keys["description"]); ?>">
        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <title><?php echo ($keys["title"]); ?>-<?php echo ($title); ?></title>
        <link rel="Shortcut Icon" href="<?php echo ($static_host); ?>/favicon.ico" type="image/x-icon" />
<link href="<?php echo ($static_host); ?>/assets/common/css/public.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/common/js/tooltips/tooltips.css?v=<?php echo C('STATIC_VERSION');?>">
<link href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/all.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet">
<link href="<?php echo ($static_host); ?>/assets/common/js/icheck/skins/minimal/red.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet">
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/order.js?v=<?php echo C('ORDER_JS_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jQuery.rTabs.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/tooltips/jquery.pure.tooltips.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/icheck/icheck.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/App.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/cors.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/jquery.cookie.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/popwin.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="<?php echo ($cityfile); ?>"></script>
<!--[if lte IE 7]>
    <script  type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/json2.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<![endif]-->
        <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/home/css/ht-public.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/home/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>">
<link href="<?php echo ($static_host); ?>/assets/common/css/step.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
<!--[if lte IE 7]>
     <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/home/css/font-awesome-ie7.min.css?v=<?php echo C('STATIC_VERSION');?>">
<![endif]-->
        <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/home/css/ht-info.css?v=<?php echo C('STATIC_VERSION');?>" />
        <link rel="stylesheet" type="text/css" href="<?php echo ($static_host); ?>/assets/common/js/baidu/uploader/dist/webuploader.css?v=<?php echo C('STATIC_VERSION');?>">
        <link href="<?php echo ($static_host); ?>/assets/common/js/baidu/css/upload.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
        <link href="<?php echo ($static_host); ?>/assets/common/js/baidu/css/companyinfo.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/baidu/uploader/dist/webuploader.js?v=<?php echo C('STATIC_VERSION');?>"></script>
        <script charset="utf-8" src="<?php echo ($static_host); ?>/assets/common/js/baidu/uploader/comlogo.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    </head>
    <body>
        <!-- <div class="ht-wrap">
    <img src="<?php echo ($static_host); ?>/assets/user/home/img/qd.jpg" width="1210" height="80"></div> -->
<div class="ht-top">
    <div class="ht-wrap">
        <h2 class="mr20"><?php echo ($info["user"]["qc"]); ?></h2>
        <ul class="ht-link ht-pull-right">
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_home/<?php echo ($info["user"]["id"]); ?>" target="_blank">公司首页</a></li>
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_case/<?php echo ($info["user"]["id"]); ?>" target="_blank">公司案例</a></li>
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company_zixun/<?php echo ($info["user"]["id"]); ?>" target="_blank">公司资讯</a></li>
            <li>
                 <a class="red" href="/loginout">退出</a>
            </li>
        </ul>
        <div class="info-box"><i class="icon-envelope-alt mr10"></i>消息通知
            <?php if($info['user']['unreadcount'] != 0 OR $info['user']['unreadsystem'] != 0): ?><span class="ml10 tips"><?php echo ($info['user']['unreadcount']+$info['user']['unreadsystem']); ?></span><?php endif; ?>
            <i class="icon-angle-down ml10"></i>
            <div class="info">
                <ul>
                    <li><a href="/orders/"><i class="icon-copy mr10"></i>订单信息
                    <?php if($info['user']['unreadcount'] != 0): ?><span class="ml10 tips"><?php echo ($info['user']['unreadcount']); ?></span><?php endif; ?>
                    </a></li>
                    <li><a href="/message/"><i class="icon-bullhorn mr10"></i>系统消息
                     <?php if($info['user']['unreadsystem'] != 0): ?><span class="ml10 tips"><?php echo ($info['user']['unreadsystem']); ?></span><?php endif; ?>
                    </a></li>
                </ul>
                <!---暂时没有消息-->
            </div>
        </div>
        <ul class="ht-link">
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/" target="_blank">齐装网首页</a></li>
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/company/" target="_blank">装修公司大全</a></li>
            <li><a href="http://<?php echo ($info["user"]["bm"]); ?>.<?php echo C('QZ_YUMING');?>/xgt/" target="_blank">装修案例</a></li>
        </ul>
    </div>
</div>
<div class="ht-tit">用户管理中心</div>
        <div class="ht-wrap oflow ht-relative">
            <div class="ht-nav">
                <div class="ht-nav subMenu">
    <ul>
        <li><a href="/home/"><i class="icon-home mr10"></i>首页<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/info/basic"><i class="icon-tasks mr10"></i>企业信息<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/message/"><i class="icon-bullhorn mr10"></i>系统信息
            <?php if($info['user']['unreadsystem'] != 0): ?><span class="tips ml10"><?php echo ($info['user']['unreadsystem']); ?></span><?php endif; ?>
            <i class=" icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/orders/"><i class="icon-paste mr10"></i>装修订单
            <?php if($info['user']['unreadcount'] != 0): ?><span class="tips ml10"><?php echo ($info['user']['unreadcount']); ?></span><?php endif; ?>
            <i class=" icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/team/"><i class="icon-group mr10"></i>设计团队<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/cases/"><i class="icon-picture mr10"></i>图库案例<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/article/"><i class="icon-edit mr10"></i>文章信息<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/comment/"><i class="icon-comments-alt mr10"></i>评价留言<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/wenda/"><i class="icon-question-sign mr10"></i>装修问答<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <li><a href="/baike/"><i class="icon-book mr10"></i>装修百科<i class="icon-double-angle-right pull-right"></i></a>
        </li>
        <?php if($info['user']['on'] == 2): ?><li><a href="/peruser/"><i class="icon-user mr10"></i>业主帐号<i class="icon-double-angle-right pull-right"></i></a></li>
            <li class="active"><a href="/oneselfevent"><i class="icon-flag mr10"></i>优惠活动<i class="icon-double-angle-right pull-right"></i></a></li><?php endif; ?>
    </ul>
    <div class="mt20">
        <img src="<?php echo ($static_host); ?>/assets/user/home/img/hezuo.jpg" width="280" height="159">
    </div>
</div>
<script type="text/javascript">
$(".subMenu ul li").removeClass('active').eq("<?php echo ((isset($nav) && ($nav !== ""))?($nav):0); ?>").addClass('active');
</script>
            </div>
            <ul class="ht-nav-tit">
  <li><a href="/info/basic">基本资料</a></li>
  <li><a href="/info/detail">详细资料</a></li>
  <li><a href="/info/tag">公司标签</a></li>
  <li><a href="/info/img">企业图片</a></li>
  <?php if(1 == 2): ?><li><a href="/info/tonglan">通栏管理</a></li><?php endif; ?>
  <li><a href="/info/store">分店管理</a></li>
  <li><a href="/getpassword/" target="_blank">密码修改</a></li>
  <li><a href="/info/businesslicence/">营业执照审核</a></li>
</ul>
<script type="text/javascript">
$(".ht-nav-tit li").removeClass("active").eq("<?php echo ((isset($tabNav) && ($tabNav !== ""))?($tabNav):'0'); ?>").addClass('active');
</script>
            <div class="ht-main">
                <div class="ht-normal-form">
                    <ul class="normal-info">
                        <li>
                            <span class="pull-left">
                                <i class="red">*</i>公司LOGO:
                            </span>
                            <div class="pull-left com-logo">
                                <div class="logo-wrap">
                                    <div id="uploader" class="uploader" data-data='<?php echo ($logo); ?>'></div>
                                </div>
                                <input type="hidden" name="imgs" />
                            </div>
                            <div class="clearfix waring-tips">
                                提示：<br>
                                1.在此上传您的企业logo标志，最好为126*63像素且为白底。<br>
                                2.标志图片上不得有联系方式及网址, 否则就会被取消上传logo权限。
                            </div>
                            <i class="red err-tips">
                            </i>
                        </li>
                        <li>
                            <span>
                                <i class="red">*</i>公司全称:
                            </span>
                            <input class="full in-focus" name="qc" type="text" placeholder="公司全称" value="<?php echo ($info["user"]["qc"]); ?>" data-focus="请输入公司名称" />
                            <i class="red err-tips">
                            </i>
                        </li>
                        <li>
                            <span>
                                <i class="red">*</i>公司简称:
                            </span>
                            <input class="full in-focus" name="jc" type="text" placeholder="公司简称，最多8个中文" value="<?php echo ($info["user"]["jc"]); ?>" data-focus="请输入公司简称" />
                            <i class="red err-tips">
                            </i>
                        </li>
                        <li>
                            <span>
                                公司口号:
                            </span>
                            <input class="full in-focus" type="text" name="kouhao" placeholder="最好输入9个字" value="<?php echo ($info["user"]["kouhao"]); ?>" data-focus="请输入公司口号" />
                            <i class="red err-tips">
                            </i>
                        </li>
                        <li>
                            <span>
                                所在区域:
                            </span>
                            <select class="half mr20" name="cs">
                                <?php if(is_array($city)): $i = 0; $__LIST__ = $city;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$s): $mod = ($i % 2 );++$i;?><option value="<?php echo ($s["id"]); ?>">
                                        <?php echo ($s["oldname"]); ?>
                                    </option><?php endforeach; endif; else: echo "" ;endif; ?>
                            </select>
                            <select class="half" name="qx">
                                <?php if(is_array($quyu)): $i = 0; $__LIST__ = $quyu;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$q): $mod = ($i % 2 );++$i;?><option value="<?php echo ($q["qz_areaid"]); ?>" <?php if($info['user']['qx'] == $q['qz_areaid']): ?>selected="selected"<?php endif; ?>
                                        ><?php echo ($q["oldName"]); ?>
                                    </option><?php endforeach; endif; else: echo "" ;endif; ?>
                            </select>
                        </li>
                        <li>
                            <span>
                                联系人:
                            </span>
                            <input class="half mr20" type="text" name="name" placeholder="称呼" value="<?php echo ($info["user"]["name"]); ?>"
                            />
                            <input name="sex" id="man" type="radio" value="先生" />
                            <label for="man">
                                先生
                            </label>
                            <input class="ml10" name="sex" id="woman" type="radio" value="女士" />
                            <label for="woman">
                                女士
                            </label>
                            <br/>
                            <i class="red err-tips">
                            </i>
                        </li>
                        <li>
                            <span>
                                手机号:
                            </span>
                            <input class="full in-focus" type="text" name="tel" placeholder="手机号" value="<?php echo ($info["user"]["tel"]); ?>" data-focus="请输入11位手机号" />
                            <i class="red err-tips">
                            </i>
                        </li>
                        <li>
                            <span>
                                固定电话:
                            </span>
                            <input class="shorted mr20 in-focus" type="text" name="cals" placeholder="区号"
                            value="<?php echo ($info["user"]["cals"]); ?>" data-focus="请输入正确区号" />
                            —
                            <input class="half ml20 in-focus" type="text" name="cal" placeholder="可直接输入400电话"
                            value="<?php echo ($info["user"]["cal"]); ?>" data-focus="请输入正确的固话号" />
                            <br/>
                            <i class="red err-tips">
                            </i>
                        </li>
                        <li>
                            <span>
                                公司地址:
                            </span>
                            <input class="full" type="text" name="dz" placeholder="公司详细地址" value="<?php echo ($info["user"]["dz"]); ?>"
                            />
                            <i class="red err-tips">
                            </i>
                        </li>
                        <li>
                            <span>
                                QQ客服1:
                            </span>
                            <input type="text" class="half mr20" name="nickname" placeholder="客服昵称1"
                            value="<?php echo ($info["user"]["nickname"]); ?>" />
                            <input type="text" class="half" placeholder="客服qq1" value="<?php echo ($info["user"]["qq"]); ?>"
                            name="qq" />
                            <i class="red err-tips">
                            </i>
                        </li>
                        <li>
                            <span>
                                QQ客服2:
                            </span>
                            <input type="text" class="half mr20" name="nickname1" placeholder="客服昵称2"
                            value="<?php echo ($info["user"]["nickname1"]); ?>" />
                            <input type="text" class="half" name="qq1" placeholder="客服qq2" value="<?php echo ($info["user"]["qq1"]); ?>"
                            />
                            <i class="red err-tips">
                            </i>
                        </li>
                    </ul>
                </div>
                <div class="ht-map">
                    <h3>
                        请在地图上设置公司的位置
                    </h3>
                    <!-- 展示地图开始 -->
                    <style type="text/css">
                        #stage { width: 400px; height: 400px; margin: 2px auto; text-align: left;
                        } .toolbox { float: right; height: 22px; } .tool { margin: 0px; cursor:
                        pointer; position: relative; padding-left: 22px; } .tool > b { position:
                        absolute; width: 7px; height: 12px; top: 2px; left: 9px; zoom: 1; background:
                        url("<?php echo ($static_host); ?>/assets/common/js/baidu_map/tools_img_yr3cul.png") no-repeat;
                        } #container { clear: both; width: 100%; height: 100%; }
                    </style>
                    <script type="text/javascript" src="http://api.map.baidu.com/api?v=1.4">
                    </script>
                    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/baidu_map/DistanceTool_min.js?v=<?php echo C('STATIC_VERSION');?>">
                    </script>
                    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/baidu_map/EventWrapper.min.js?v=<?php echo C('STATIC_VERSION');?>">
                    </script>
                    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/baidu_map/MarkerTool.js?v=<?php echo C('STATIC_VERSION');?>">
                    </script>
                    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/baidu_map/MapBaidu.js?r=2">
                    </script>
                    <div id="stage" style="">
                        <span id="map_msg">
                            如果想修改标记 请先删除已有标记
                        </span>
                        <div class="toolbox">
                            <?php if($can_make_map == 1): ?><span class="tool">
                                    <b>
                                    </b>
                                    标记
                                </span>
                                <?php else: ?>
                                <span class="tool" style="display:none;">
                                    <b>
                                    </b>
                                    标记
                                </span><?php endif; ?>
                        </div>
                        <div id="container">
                        </div>
                    </div>
                    <script type="text/javascript">
                        $(function() {
                            var city = '<?php echo ($city["0"]["oldname"]); ?>';
                            var cityid = '<?php echo ($info["user"]["cs"]); ?>';
                            var marks   = <?php echo ($marks); ?>;

                            var map = MapBaidu('container', city);

                            $('.tool > b').each(function(idx, me) {
                                idx = '-30px -183px';
                                $(me).parent().click(function() {
                                    map.startMark();
                                });
                                $(me).css('background-position', idx);
                            });

                            // 撒点
                            for (var pt, i = marks.length; i--;) {
                                pt = new BMap.Point(marks[i]['lng'], marks[i]['lat']);
                                map.mark(pt, marks[i]['map_info'], marks[i]['map_address'], marks[i]['id']);
                            }

                            // 加强
                            (function() {
                                var ancestor = {
                                    delMark: MapBaidu.fn.delMark,
                                    saveMark: MapBaidu.fn.saveMark
                                };
                                MapBaidu.fn.delMark = function(point, id) {
                                    var me = this;
                                    ancestor.delMark.call(me, point);

                                    $.post('/Companyinfo/company_map_del', {},
                                    function(res) {
                                        if (res.status != 1) {
                                            alert("删除失败！请立即联系客服。");
                                        } else {
                                            ancestor.delMark.call(me, point);
                                            $(".tool").show();
                                        }
                                    },
                                    'json');
                                }
                                MapBaidu.fn.saveMark = function(point, data) {
                                    var me = this;
                                    data['cityid'] = cityid;
                                    $.post('/Companyinfo/company_map', data,
                                    function(res) {
                                        if (res.status != 1) {
                                            alert("标记失败！请立即联系客服。");
                                        } else {
                                            ancestor.saveMark.call(me, point, data);
                                            $(".tool").hide();
                                        }
                                    },
                                    "json");
                                }
                            })();
                        });
                    </script>
                    <!-- 展示地图结束 -->
                </div>
                <div class="ht-yes">
                    <a href="javascript:;" id="edit_info_btn">更新</a>
                    <i class="red err-tips">
                    </i>
                </div>
            </div>
        </div>
        <div class="footer mt50">
    <div class="wrap cbox">
    <div class="leftbox">
        <div class="l">
            <p class="t">关于齐装网</p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/about" target="_blank">齐装网简介</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/culture" target="_blank">企业文化</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/contactus" target="_blank">联系我们</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/zhaopin" target="_blank">诚聘英才</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/team" target="_blank">员工风采</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/media" target="_blank">媒体报道</a></p>
        </div>
        <div class="r">
            <p class="t">帮助中心</p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/legal" target="_blank">法律声明</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/about/joinus" target="_blank">战略合作</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/city/" target="_blank">网站导航</a></p>
            <p><a href="http://<?php echo C('QZ_YUMINGWWW');?>/kefu/" target="_blank">客户服务</a></p>
        </div>
    </div>
    <div class="centerbox">
        <p><span>全国统一商务热线：</span></p>
        <p><span style="font-size: 20px;color: #FF9900;"><?php echo OP('QZ_CONTACT_TEL400');?></span></p>
        <p><span>全国统一</span><span>客服</span><span>QQ</span><span>：
            <a rel="external nofollow" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=<?php echo OP('QZ_CONTACT_QQ1');?>&site=qq&menu=yes" title="点击这里给 <?php echo OP('QZ_CONTACT_QQ1_NAME');?> 发消息">
                <img src="/assets/common/img/qq_bottom.gif" style="position: relative; top: 6px;" alt="齐装网官方客服" />
            </a>
            <a rel="external nofollow" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=<?php echo OP('QZ_CONTACT_QQ2');?>&site=qq&menu=yes" title="点击这里给 <?php echo OP('QZ_CONTACT_QQ2_NAME');?> 发消息">
                <img src="/assets/common/img/qq_bottom.gif" style="position: relative; top: 6px;" alt="齐装网官方客服"/>
            </a>
            </span></p>
        <p><span>服务邮箱</span><span>：<?php echo OP('QZ_CONTACT_EMAIL');?></span></p>
        <p><span>友情链接</span><span>QQ</span><span>：<a rel="external nofollow" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=<?php echo OP('QZ_FRIENDLINK_QQ');?>&site=qq" title="点击这里联系交换链接">
        <img src="/assets/common/img/qq_bottom.gif" style="position: relative; top: 6px;" alt="齐装网官方客服"/></a></span></p>
    </div>
    <div class="rightbox">
        <div class="l">
            <img src="/assets/common/img/weixin_f.jpg" width="128" height="120" alt="齐装网官方微信">
            <p>微信扫一扫，工资省半年</p>
        </div>
        <div class="r">
            <a href="http://weibo.com/337807899" target="_blank">
            <img src="/assets/common/img/weibo_f.png" width="157" height="68" alt="齐装网官方微博"></a>
            <p><a href="http://weibo.com/337807899" target="_blank">@齐装网-装修管家</a></p>
        </div>
    </div>
    <div class="clearfix"></div>
    <div style="padding:10px">
        <p><?php echo OP('QZ_LAWYER1');?> <a rel="external nofollow" href="http://www.miitbeian.gov.cn/" target="_blank"> <?php echo OP('QZ_BEIAN_INFO');?> </a>&nbsp;Copyright &copy;<?php echo date('Y');?> Www.QiZuang.Com. All Rights Reserved</p>
        <?php echo OP('baidutongji1');?>
        <div class="wechat"></div>
    </div>
</div>
</div>
        <script type="text/javascript">
            $(document).ready(function(){
                //加载图片上传控件
                $(".logo-wrap").uploader({
                    host: "<?php echo C('QINIU_DOMAIN');?>",
                    old_host: "<?php echo C('STATIC_HOST1');?>",
                    server: "/uploader/",
                    drag: false,
                    fileNumLimit: 1,
                    threads: 1,
                    prefix: "qzlogo",
                    formData: {
                        prefix: "qzlogo",
                        width: 126,
                        height: 63,
                        offset: 10
                    },
                    removePath: "/Companyinfo/del_company_logo/",
                    callback: function(res) {
                        var data = $("input[name=imgs]").data("data");
                        if (typeof data == "undefined") {
                            data = [];
                        }
                        img = {
                            id: res["id"],
                            img: res.data["hash"],
                            path: res.data["key"],
                            tabIndex: res.tabIndex
                        }
                        data.push(img);
                        $("input[name=imgs]").data("data", data);
                        $("input[name='imgs']").val(data[0].path);
                        if (res.status == '1') {
                            submitInfo($(this));
                        }
                    }
                });
            })

            $('.in-focus').blur(function(event) {
                var content = $(this).val();
                var name = $(this).attr('name');
                if(!content){
                    if('cals' == name){
                        return false;
                    }
                    $(this).parent().find(".err-tips").html($(this).attr('data-focus'));
                    $(this).css("border","1px solid #F15858");
                }else{

                    if('tel' == name){
                        if (!App.validate.run(content, "moblie")) {
                            $(this).parent().find(".err-tips").html($(this).attr('data-focus'));
                            $(this).css("border","1px solid #F15858");
                            return false;
                        }
                    }
                    if('cal' == name){
                        var reg = new RegExp("^[0-9]{7,10}$");
                        if(!reg.test(content)){
                            $(this).parent().find(".err-tips").html($(this).attr('data-focus'));
                            return false;
                        }
                    }
                    if('cals' == name){
                        if(content){
                            var reg = new RegExp("^[0-9]{3,4}$");
                            if(!reg.test(content)){
                                $(this).parent().find(".err-tips").html($(this).attr('data-focus'));
                                return false;
                            }
                        }
                    }
                    $(this).parent().find(".err-tips").empty();
                    $(this).css("border","1px solid #ccc");
                }
            });

            //提交修改资料
            function submitInfo(obj) {
                /* 修改资料的提交 */
                var _this = obj;
                var id = "<?php echo ($info["user"]["id"]); ?>";
                var qc = $("input[name='qc']").val(); //获取全称
                var jc = $("input[name='jc']").val(); //获取简称
                var kouhao = $("input[name='kouhao']").val(); //获取口号
                var cs = $("select[name='cs']").val(); //获取城市
                var qx = $("select[name='qx']").val(); //获取区县
                var name = $("input[name='name']").val(); //获取联系人
                var sex = $("input[name='sex']:checked").val(); //获取性别
                var tel = $("input[name='tel']").val(); //获取手机号
                var cals = $("input[name='cals']").val(); //获取电话区号
                var cal = $("input[name='cal']").val(); //获取电话号码
                var nickname = $("input[name='nickname']").val(); //获取QQ客服1昵称
                var qq = $("input[name='qq']").val(); //获取QQ
                var nickname1 = $("input[name='nickname1']").val(); //获取QQ客服1昵称
                var qq1 = $("input[name='qq1']").val(); //获取QQ1
                var dz = $("input[name='dz']").val(); //获取公司地址
                //验证提交的表单信息
                $(".err-tips").html("");
                var qc_obj = $("input[name='qc']");
                var jc_obj = $("input[name='jc']");
                var kouhao_obj = $("input[name='kouhao']");
                var name_obj = $("input[name='name']");
                var tel_obj = $("input[name='tel']");
                var cal_obj = $("input[name='cal']");
                var cals_obj = $("input[name='cals']");
                var qq_obj = $("input[name='qq']");
                var qq1_obj = $("input[name='qq1']");
                var dz_obj = $("input[name='dz']");
                if (!App.validate.run(qc_obj.val())) {
                    qc_obj.focus();
                    qc_obj.parent().find(".err-tips").html("请填写公司全称");
                    return false;
                };
                if (!App.validate.run(jc_obj.val())) {
                    jc_obj.focus();
                    jc_obj.parent().find(".err-tips").html("请填写公司简称");
                    return false;
                };
                if (!App.validate.run(kouhao_obj.val())) {
                    kouhao_obj.focus();
                    kouhao_obj.parent().find(".err-tips").html("请填写公司口号");
                    return false;
                };

                if (!App.validate.run(name_obj.val())) {
                    name_obj.focus();
                    name_obj.parent().find(".err-tips").html("请填写联系人");
                    return false;
                };
                if (!App.validate.run(tel, "moblie")) {
                    $("input[name=tel]").addClass('focus');
                    $("input[name=tel]").focus();
                    $("input[name=tel]").parent().find(".err-tips").html("请填写正确的手机号码");
                    return false;
                }

                if (!App.validate.run(cal_obj.val())) {
                    cal_obj.focus();
                    cal_obj.parent().find(".err-tips").html("请填写固定电话或400电话");
                    return false;
                }

                var reg = new RegExp("^[0-9]{7,10}$");
                if(!reg.test(cal_obj.val())){
                    cal_obj.focus();
                    cal_obj.parent().find(".err-tips").html("请填写固定电话或400电话");
                    return false;
                }

                if(cals_obj.val()){
                    var reg = new RegExp("^[0-9]{3,4}$");
                    if(!reg.test(cals_obj.val())){
                        cals_obj.focus();
                        cals_obj.parent().find(".err-tips").html("请填写固定电话或400电话");
                        return false;
                    }
                }


                if (!App.validate.run(qq_obj.val(), "num")) {
                    qq_obj.focus();
                    qq_obj.parent().find(".err-tips").html("请填写正确的QQ");
                    return false;
                }
                //如果填写了第二个QQ 则格式必须正确
                if (qq1_obj.val() != "") {
                    if (!App.validate.run(qq1_obj.val(), "num")) {
                        qq1_obj.focus();
                        qq1_obj.parent().find(".err-tips").html("请填写正确的QQ");
                        return false;
                    }
                }
                if (!App.validate.run(dz_obj.val())) {
                    dz_obj.focus();
                    dz_obj.parent().find(".err-tips").html("请填写公司地址");
                    return false;
                };
                $.post("/Companyinfo/edit_info", {
                    id: id,
                    qc: qc,
                    jc: jc,
                    kouhao: kouhao,
                    cs: cs,
                    qx: qx,
                    name: name,
                    sex: sex,
                    tel: tel,
                    cals: cals,
                    cal: cal,
                    nickname: nickname,
                    qq: qq,
                    nickname1: nickname1,
                    qq1: qq1,
                    dz: dz
                },
                function(res) {
                    console.log(res);
                    if (res.status == 0) {
                        _this.parent().find(".err-tips").html(res.info);
                    } else {
                        window.location.href = window.location.href;
                    }
                },
                'json');
            }

            $(function() {
                var sex = '<?php echo ($info["user"]["sex"]); ?>';
                if (sex == '先生') {
                    $('#man').attr("checked", "checked");
                } else {
                    $('#woman').attr("checked", "checked");
                }

                $("#edit_info_btn").click(function() {
                    submitInfo($(this));
                });

                //加载图片上传控件
                resetuploader();
                function resetuploader(){
                    $(".ht-comp-phot").uploader({
                        host: "<?php echo C('QINIU_DOMAIN');?>",
                        old_host: "<?php echo C('STATIC_HOST1');?>",
                        server: "/uploader/",
                        drag: false,
                        fileNumLimit: 1,
                        threads: 1,
                        prefix: "qzlogo",
                        formData: {
                            prefix: "qzlogo",
                            width: 126,
                            height: 63,
                            offset: 10
                        },
                        removePath: "/Companyinfo/del_company_logo/",
                        callback: function(res) {
                            var data = $("input[name=imgs]").data("data");
                            if (typeof data == "undefined") {
                                data = [];
                            }
                            img = {
                                id: res["id"],
                                img: res.data["hash"],
                                path: res.data["key"],
                                tabIndex: res.tabIndex
                            }
                            data.push(img);
                            $("input[name=imgs]").data("data", data);
                            $("input[name='imgs']").val(data[0].path);
                            if (res.status == '1') {
                                $.ajax({
                                    url: '/companyinfo/editlogo/',
                                    type: 'POST',
                                    dataType: 'JSON',
                                    data: {
                                        logo:$("input[name='imgs']").val()
                                    }
                                })
                                .done(function(data) {
                                    if(data.status == 1){
                                        window.location.href = window.location.href
                                    }else{
                                        alert(data.info)
                                    }
                                })
                                .fail(function(xhr) {
                                    alert("发生未知错误")
                                })
                            }
                        }
                    });
                }
            });
        </script>
    </body>
</html>