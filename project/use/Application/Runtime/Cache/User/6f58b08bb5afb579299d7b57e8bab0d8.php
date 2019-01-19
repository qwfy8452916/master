<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
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
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/cases/css/ht-photo.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo ($static_host); ?>/assets/user/cases/css/jia-suggest.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" type="text/css" href="<?php echo ($static_host); ?>/assets/common/js/baidu/uploader/dist/webuploader.css?v=<?php echo C('STATIC_VERSION');?>">
    <link href="<?php echo ($static_host); ?>/assets/common/js/baidu/css/upload.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo ($static_host); ?>/assets/common/js/baidu/css/caseup.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/laydate.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="<?php echo ($static_host); ?>/assets/common/js/baidu/uploader/dist/webuploader.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script charset="utf-8" src="<?php echo ($static_host); ?>/assets/common/js/baidu/uploader/upload.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script charset="utf-8" src="<?php echo ($static_host); ?>/assets/common/js/jquery.dragsort.js?v=<?php echo C('STATIC_VERSION');?>"></script>
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
        <ul class="ht-nav-tit">
    <li class="active"><a href="/cases/">家装案例</a></li>
    <li><a href="/cases/gzcases/">公装案例</a></li>
    <li><a href="/cases/zzcases/">在建工地</a></li>
    <li><a href="/threed/">3D效果图</a></li>
     <li><a href="/caseup/">发布案例</a></li>
     <li><a href="/threedup/">发布3D效果图</a></li>
</ul>
<script type="text/javascript">
$(".ht-nav-tit li").removeClass("active").eq("<?php echo ((isset($tabNav) && ($tabNav !== ""))?($tabNav):'0'); ?>").addClass('active');
</script>
        <div class="ht-main">
            <form id="myForm" onsubmit="return false">
            <ul  class="ht-moreinfo">
                <li>
                    <span><i class="red">*</i>案例类型：</span>
                    <select name="class" class="select">
                        <?php if(is_array($info["class"])): $i = 0; $__LIST__ = $info["class"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($info['case'] AND $info['case']['classid'] == $vo['value']): ?><option value="<?php echo ($vo["value"]); ?>" selected="selected"><?php echo ($vo["name"]); ?></option>
                            <?php else: ?>
                            <option value="<?php echo ($vo["value"]); ?>"><?php echo ($vo["name"]); ?></option><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </select>
                </li>
                <li>
                    <span><i class="red">*</i>所在区域：</span>
                    <select name="cs" class="select">
                        <option value="<?php echo ($info["citys"]["shen"]["id"]); ?>"><?php echo ($info["citys"]["shen"]["oldname"]); ?></option>
                    </select>
                    <select name="qx" class="select">
                        <?php if(is_array($info["citys"]["shi"])): $i = 0; $__LIST__ = $info["citys"]["shi"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($info['case'] AND $info['case']['qx'] == $vo['qz_areaid']): ?><option value="<?php echo ($vo["qz_areaid"]); ?>" selected="selected"><?php echo ($vo["oldName"]); ?></option>
                            <?php else: ?>
                            <option value="<?php echo ($vo["qz_areaid"]); ?>"><?php echo ($vo["oldName"]); ?></option><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </select>
                </li>

                <div class="gover_search">
                    <div class="gover_search_form clearfix">
                            <span><i class="red">*</i>小区名称：</span>
                            <input name="xiaoqu" type="text" id="gover_search_key" placeholder="小区" value="<?php echo ($info["case"]["title"]); ?>" lang="default">
                            <i class="gray">
                                <i class="icon-info-sign mr10"></i>为该案例命名，使用小区、楼盘名称，最好输入提示小区
                            </i>
                            <i class="red err-tips"></i>
                            <div class="search_suggest" id="gov_search_suggest">
                                <ul></ul>
                            </div>
                    </div>
                </div>

                <li>
                    <span><i class="red">*</i>户型结构：</span>
                    <select name="huxing" class="select">
                        <?php if(is_array($info["huxing"])): $i = 0; $__LIST__ = $info["huxing"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($info['case'] AND $info['case']['huxing'] == $vo['id']): ?><option value="<?php echo ($vo["id"]); ?>" selected="selected"><?php echo ($vo["name"]); ?></option>
                            <?php else: ?>
                            <option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["name"]); ?></option><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </select>
                </li>
                <li style="display:none;">
                    <span><i class="red">*</i>房屋类型：</span>
                    <select name="leixing" class="select">
                        <?php if(is_array($info["leixing"])): $i = 0; $__LIST__ = $info["leixing"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($info['case'] AND $info['case']['lx'] == $vo['id']): ?><option value="<?php echo ($vo["id"]); ?>" selected="selected"><?php echo ($vo["name"]); ?></option>
                            <?php else: ?>
                            <option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["name"]); ?></option><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </select>
                </li>
                <!-- <li>
                    <span>装修方案：</span>
                    <select name="fangshi" class="select">
                        <?php if(is_array($info["fangshi"])): $i = 0; $__LIST__ = $info["fangshi"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($info['case'] AND $info['case']['fs'] == $vo['id']): ?><option value="<?php echo ($vo["id"]); ?>" selected="selected"><?php echo ($vo["name"]); ?></option>
                            <?php else: ?>
                            <option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["name"]); ?></option><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </select>
                </li> -->
                <li>
                    <span><i class="red">*</i>房屋面积：</span>
                    <input name="mianji" type="text" placeholder="面积" value="<?php echo ($info["case"]["mianji"]); ?>">
                    <i class="gray">
                        <i class="icon-info-sign mr10"></i>面积请使用整数
                    </i>
                    <i class="red err-tips"></i>
                </li>
                <li>
                    <span><i class="red">*</i>装修风格：</span>
                    <select name="fengge" class="select">
                        <?php if(is_array($info["fengge"])): $i = 0; $__LIST__ = $info["fengge"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($info['case'] AND $info['case']['fengge'] == $vo['id']): ?><option value="<?php echo ($vo["id"]); ?>" selected="selected"><?php echo ($vo["name"]); ?></option>
                            <?php else: ?>
                            <option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["name"]); ?></option><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </select>
                </li>
                <li>
                    <span><i class="red">*</i>合同总价：</span>
                    <select name="zaojia" class="select">
                         <?php if(is_array($info["jiage"])): $i = 0; $__LIST__ = $info["jiage"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($info['case'] AND $info['case']['jiage'] == $vo['id']): ?><option value="<?php echo ($vo["id"]); ?>" selected="selected"><?php echo ($vo["name"]); ?></option>
                            <?php else: ?>
                            <option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["name"]); ?></option><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </select>
                </li>
                <li>
                    <span>装修时间：</span>
                    <i id="ht-date">
                        <input id="start" name="start" class="laydate-icon" placeholder="请选择开始日期" value="<?php echo ($info["case"]["start"]); ?>">
                         到 <input id="end" name="end" class="laydate-icon" placeholder="请选择结束日期"  value="<?php echo ($info["case"]["end"]); ?>">
                    </i>
                    <i class="red err-tips"></i>
                </li>
                <li>
                    <span><i class="red">*</i>设计师：</span>
                    <select name="designer" class="select">
                        <?php if(is_array($info["designers"])): $i = 0; $__LIST__ = $info["designers"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($info['case'] AND $info['case']['userid'] == $vo['id']): ?><option value="<?php echo ($vo["id"]); ?>" selected="selected"><?php echo ($vo["name"]); ?></option>
                            <?php else: ?>
                            <option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["name"]); ?></option><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                    </select>
                    <i class="red err-tips"></i>
                </li>
                <!-- <li>
                    <span><i class="red">*</i>案例描述：</span>
                    <textarea class="jianjiemain" placeholder="案例描述" name="text" ><?php echo ($info["case"]["text"]); ?></textarea>
                    <p>
                        <i class="red" style="margin-left:90px;">
                            <i class="icon-info-sign mr10"></i>请尽量填写该案例的详细描述，方便业主全方位的了解您的公司(100字内)
                        </i>
                    </p>
                    <p>
                         <i class="red err-tips" style="margin-left:90px;"></i>
                    </p>
                </li> -->
                <li>
                    <span><i class="red">*</i>案例图片：</span>
                    <div class="ht-comp-phot">
                        <div id="uploader" class="uploader" data-data='<?php echo ($info["case"]["imgs"]); ?>'>
                        </div>
                    </div>
                    <input type="hidden" name="imgs"/>
                    <input name="caseid" type="hidden" value="<?php echo ($info["case"]["id"]); ?>"/>
                </li>
            </ul>
            </form>
            <div class="ht-yes">
                <ul class="red" style="margin-bottom:20px;">
                    <li> 1、带*为必填项</li>
                    <li> 2、案例信息、图片上,请勿包含 联系方式\网址\其他网站LOGO\微博、微信帐号\二维码 等"相关联系方式",否则将会封号处理。</li>
                    <li> 3、请上传高清优质图片，齐装网会重点推荐高清优质的图片，增加您的曝光率，像素底质量差的图片将审核不通过。</li>
                    <li> 4、图片展示最佳的尺寸宽为 <em style="font-size:16px;">660</em> 像素,最大尺寸为 <em style="font-size:16px;">860</em> 像素,最小尺寸为 <em style="font-size:16px;">460</em> 像素</li>
                </ul>
                <button id="btnSave" type="button"><i class="icon-ok mr10"></i>提交</button>
                <i class="red err-tips"></i>
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

</body>
<script type="text/javascript">
//实现搜索输入框的输入提示js类
function oSearchSuggest(searchFuc){
    var input = $('#gover_search_key');
    var suggestWrap = $('#gov_search_suggest');
    var key = "";
    var init = function(){
        input.bind('keyup',sendKeyWord);
        input.bind('blur',function(){setTimeout(hideSuggest,500);})
    }
    var hideSuggest = function(){
        suggestWrap.hide();
    }

    //发送请求，根据关键字到后台查询
    var sendKeyWord = function(event){

        //键盘选择下拉项
        if(suggestWrap.css('display')=='block'&&event.keyCode == 38||event.keyCode == 40){
            var current = suggestWrap.find('li.hover');
            if(event.keyCode == 38){
                if(current.length>0){
                    var prevLi = current.removeClass('hover').prev();
                    if(prevLi.length>0){
                        prevLi.addClass('hover');
                        input.val(prevLi.html());
                        input.attr("lang",prevLi.attr('lang'));
                    }
                }else{
                    var last = suggestWrap.find('li:last');
                    last.addClass('hover');
                    input.val(last.html());
                    input.attr("lang",last.attr('lang'));
                }

            }else if(event.keyCode == 40){
                if(current.length>0){
                    var nextLi = current.removeClass('hover').next();
                    if(nextLi.length>0){
                        nextLi.addClass('hover');
                        input.val(nextLi.html());
                        input.attr("lang",nextLi.attr('lang'));
                    }
                }else{
                    var first = suggestWrap.find('li:first');
                    first.addClass('hover');
                    input.val(first.html());
                    input.attr("lang",first.attr('lang'));
                }
            }

        //输入字符
        }else{
            var valText = $.trim(input.val());
            if(valText ==''||valText==key){
                return;
            }
            searchFuc(valText);
            key = valText;
        }

    }
    //请求返回后，执行数据展示
    this.dataDisplay = function(data,ids){
        if(data.length<=0){
            suggestWrap.hide();
            return;
        }

        //往搜索框下拉建议显示栏中添加条目并显示

        suggestWrap.find('ul').html('');
        for(var i=0; i<data.length; i++){
            var li = $('<li></li>');
            li.attr("lang",ids[i]);
            li.html(data[i]);
            suggestWrap.find('ul').append(li);
        }

        suggestWrap.show();
        //为下拉选项绑定鼠标事件
        suggestWrap.find('li').hover(function(){
                suggestWrap.find('li').removeClass('hover');
                $(this).addClass('hover');

            },function(){
                $(this).removeClass('hover');
        }).bind('click',function(){
            input.attr("lang",$(this).attr('lang'));
            input.val(this.innerHTML);
            suggestWrap.hide();
        });
    }
    init();
};

//实例化输入提示的JS,参数为进行查询操作时要调用的函数名
var searchSuggest =  new oSearchSuggest(sendKeyWordToBack);
function sendKeyWordToBack(keyword){
    var obj = {
        "keyword" : keyword
    };
    $.ajax({
        url: '/getjias/',
        type: 'GET',
        dataType: 'JSON',
        data: obj
    })
    .done(function(data) {
        if(data.status == 1){
            //如果搜索出为空，则小区lang为空
            if(data.info == '0'){
                $("input[name=xiaoqu]").removeAttr('lang');
            }
            var datas = data.data;
            var aData = [];
            var ids = [];
            $.each(datas,function(name,value) {
                if(value!=""){
                    ids.push(value.id);
                    aData.push(value.name);
                }
            });
            //将返回的数据传递给实现搜索输入框的输入提示js类
            searchSuggest.dataDisplay(aData,ids);
        }
    })
}
</script>

<script type="text/javascript">
    laydate({
        elem: '#ht-date',
        event: 'focus'
    });
    //绑定元素
    //日期范围限制
      var start = {
          elem: '#start',
          format: 'YYYY-MM-DD',
          max: '<?php echo date("Y-m-d");?>', //最大日期
          istime: true,
          istoday: false
      };

      var end = {
          elem: '#end',
          format: 'YYYY-MM-DD',
          //min: laydate.now(),
          istime: true,
          istoday: false,
          choose: function(datas) {
              start.max = datas; //结束日选好后，充值开始日的最大日期
          }
      };
      laydate(start);
      laydate(end);

      $(".ht-comp-phot").uploader({
            host:"<?php echo C('QINIU_DOMAIN');?>",
            old_host:"<?php echo C('STATIC_HOST1');?>",
            server:"/uploader/",
            drag:true,
            prefix:"zxgscase",
            formData:{
                prefix:"zxgscase"
            },
            removePath:"/removeImg/",
            callback:function(res){
                var data =  $("input[name=imgs]").data("data");
                if(typeof data == "undefined"){
                    data = [];
                }
                img = {
                    id:res["id"],
                    img:res.data["hash"],
                    path:res.data["key"],
                    tabIndex:res.tabIndex
                }
                data.push(img);
                $("input[name=imgs]").data("data",data);
            }
      });

      $("#btnSave").click(function(event) {
            var _this = $(this);
            $(".err-tips").html("");
            $(".focus").removeClass('focus');
            if(!App.validate.run($("input[name=xiaoqu]").val())){
                $("input[name=xiaoqu]").addClass('focus');
                $("input[name=xiaoqu]").focus();
                $("input[name=xiaoqu]").parent().find(".err-tips").html("请填写案例小区");
                return false;
            }

            if(!App.validate.run($("input[name=mianji]").val())){
                $("input[name=mianji]").addClass('focus');
                $("input[name=mianji]").focus();
                $("input[name=mianji]").parent().find(".err-tips").html("请填写面积");
                return false;
            }

            if(!App.validate.run($("input[name=mianji]").val(),"decimal")){
                $("input[name=mianji]").addClass('focus');
                $("input[name=mianji]").focus();
                $("input[name=mianji]").parent().find(".err-tips").html("无效的面积");
                return false;
            }

            if($("select[name=designer]").val() == null || !App.validate.run($("select[name=designer]").val())){
                $("select[name=designer]").addClass('focus');
                $("select[name=designer]").focus();
                $("select[name=designer]").parent().find(".err-tips").html("请选择设计师");
                return false;
            }

            if($("input[name=start]").val() != "" && $("input[name=end]").val() != ""){
                if($("input[name=start]").val() > $("input[name=end]").val()){
                    $("input[name=start]").addClass('focus');
                    $("input[name=start]").focus();
                    $("input[name=start]").parents("#ht-date").next(".err-tips").html("装修开始时间不能超过装修结束时间");
                    return false;
                }
            }


            // if(App.validate.run($("textarea[name=text]").val())){
            //     if(!App.validate.run($("textarea[name=text]").val().length,"maxlength",100)){
            //         $("textarea[name=text]").addClass('focus');
            //         $("textarea[name=text]").focus();
            //         $("textarea[name=text]").parent().find(".err-tips").html("请精简您的案例描述！");
            //         return false;
            //     }
            // }

            var imgData = $("input[name=imgs]").data("data");

            if(typeof imgData == "undefined" && $("input[name=caseid]").val() == ""){
                $(".ht-comp-phot").find(".uploader-info").html("请上传案例图片");
                return false;
            }else{
                if($(".filelist li").length == 0){
                    $(".ht-comp-phot").find(".uploader-info").html("请上传案例图片");
                    return false;
                }
            }

            var data = $("#myForm").serializeArray();
            var xiaoquid = $("input[name=xiaoqu]").attr('lang');
            data.push({name:"xiaoquid",value:xiaoquid});
            var imgs = [];
            $(".ht-comp-phot li").each(function(){
                var li = $(this);
                if(typeof li.attr("data-id") != "undefined"){
                    imgs.push({
                        id:li.attr("data-id"),
                        index:li.attr("tabIndex"),
                        on:li.hasClass("img_on")?2:0
                    });
                }
            });
            data.push({name:"imgs",value:JSON.stringify(imgs)});
            if(typeof imgData != "undefined"){
                for(var i = 0; i< imgData.length;i++ ){
                    var index = $("#"+imgData[i].id).attr("tabIndex");
                    imgData[i].tabIndex = index;
                    imgData[i].on = typeof $("#"+imgData[i].id).attr("data-on") =="undefined"?0:2;
                }
                data.push({name:"newData",value:JSON.stringify(imgData)});
            }
            _this.attr("disabled","disabled");
            $.ajax({
                url: '/caseup/',
                type: 'POST',
                dataType: 'JSON',
                data: data
            })
            .done(function(data) {
                if(data.status == 1){
                    window.location.href="/success/cases/"+data.info;
                }else{
                     $(".ht-yes").find(".err-tips").html(data.info);
                     _this.attr("disabled",false);
                }
            })
            .fail(function(xhr) {
                 $(".ht-yes").find(".err-tips").html("上传案例操作失败,请刷新再试！");
                 _this.attr("disabled",false);
            });
      });

     $("select[name=class]").change(function(event) {
        $("select[name=leixing]").parent().hide();
        $("select[name=huxing]").parent().hide();

        if($(this).val() == 2){
            $("select[name=leixing]").parent().show();
        }else{
            $("select[name=huxing]").parent().show();
        }
     });
</script>
</html>