<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>齐装网管理后台-控制台</title>
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/bootstrap/css/bootstrap.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/AdminLTE.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/skins/_all-skins.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/global.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/fileinput/fileinput.min.css?v=<?php echo C('STATIC_VERSION');?>" />
    <link href="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/datetimepicker/datetimepicker.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />
    <script src="<?php echo C('168NEW_URL');?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>" type="text/javascript"></script>
    
<link rel="stylesheet" type="text/css" href="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/artdialog/ui-dialog.css?v=<?php echo C('STATIC_VERSION');?>" />
<link href="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/datetimepicker/datepicker.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />
<link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/select2/select2.min.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" href="/assets/common/js/plugins/bootstrap-dialog/bootstrap-dialog.min.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/home/orders/css/modifyriz.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/home/orders/css/index.css?v=<?php echo C('STATIC_VERSION');?>">

</head>
    <body id="switch-menu" class='<?php if(session('uc_userinfo.showmenu') !== false): ?>hold-transition skin-blue sidebar-mini<?php else: ?>skin-blue sidebar-mini sidebar-collapse<?php endif; ?>' >
    <div class="wrapper">
        <header class="main-header">
            <a href="/" class="logo">
                <span class="logo-mini">QZ</span>
                <span class="logo-lg">齐装后台管理系统</span>
            </a>
            <nav class="navbar navbar-static-top" role="navigation">
                <a href="javascript:void(0)" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span class="sr-only"></span>
                </a>
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <li>
                            <a href="<?php echo C('UC_URL');?>/loginout" title="退出"><i class="fa fa-power-off fa-lg"></i></a>
                        </li>
                        <li>
                            <a href="<?php echo C('UC_URL');?>/main" title="切换至用户中心">
                                <i class="fa fa-exchange"></i>
                            </a>
                        </li>
                        <li>
                            <a href="http://168.qizuang.com/wwgadmins/chklogin" target="_blank" title="切换老版后台(168)">
                                <i class="fa fa-paper-plane"></i>
                            </a>
                        </li>
                        <li>
                            <a href="http://www.qizuang.com" target="_blank" title="前台">
                                <i class="fa fa-home fa-lg"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-toggle="control-sidebar"><i class="fa fa-magic"></i>&nbsp;换肤</a>
                        </li>
                    </ul>
                </div>


            </nav>
        </header>
        
        <aside class="main-sidebar">
            <section class="sidebar">
                <a href="<?php echo C('UC_URL');?>/main/">
                    <div class="user-panel">
                        <div class="pull-left image">
                            <img src="<?php echo ((isset($_SESSION['uc_userinfo']['logo']) && ($_SESSION['uc_userinfo']['logo'] !== ""))?($_SESSION['uc_userinfo']['logo']):'/assets/common/img/default_logo.gif'); ?>" class="img-circle" alt="User Image">
                        </div>
                        <div class="pull-left info">
                            <p><?php echo session('uc_userinfo.name');?></p>
                            <i class="fa fa-circle text-success"></i>&nbsp;<?php echo session('uc_userinfo.role_name');?>
                        </div>
                    </div>
                </a>
                <ul class="sidebar-menu">

                    <?php if(is_array($base_tree_menu)): $i = 0; $__LIST__ = $base_tree_menu;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo['active'] == 1): ?><li class="treeview active" id="sidebar-li-1">
                    <?php else: ?>
                    <li class="treeview" id="sidebar-li-1"><?php endif; ?>
                        <a href="javascript:void(0)">
                            <i class="<?php echo ((isset($vo["icon"]) && ($vo["icon"] !== ""))?($vo["icon"]):'fa fa-home'); ?>"></i>
                            <span><?php echo ($vo["name"]); ?></span> <i class="fa fa-angle-left pull-right"></i>
                        </a>
                        <?php if(count($vo['child']) > 0): ?><ul class="treeview-menu">
                            <?php if(is_array($vo["child"])): $i = 0; $__LIST__ = $vo["child"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i; if($v['active'] == 1): ?><li class="active">
                                <?php else: ?>
                                <li><?php endif; ?>
                                    <a href="<?php echo ($v["link"]); ?>">
                                    <i class="<?php echo ((isset($v["icon"]) && ($v["icon"] !== ""))?($v["icon"]):'fa fa-circle-o'); ?>"></i> <?php echo ($v["name"]); ?>
                                    &nbsp;&nbsp;&nbsp;
                                    <?php if($v['auditCount']): ?><span class="label label-warning"><?php echo ($v["auditCount"]); ?></span><?php endif; ?>
                                    </a>
                                </li><?php endforeach; endif; else: echo "" ;endif; ?>
                            </ul><?php endif; ?>
                    </li><?php endforeach; endif; else: echo "" ;endif; ?>
                </ul>
            </section>
        </aside>
        
        <div class="content-wrapper">
            
<section class="content-header">
    <h1>订单列表</h1>
    <ol class="breadcrumb">
        <li><a href="/"><i class="fa fa-dashboard"></i> 控制面板</a></li>
        <li><a href="/orders/">订单列表</a></li>
    </ol>
</section>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-default">
                <div class="box-body">
                    <div class="row">
                        <form class="form-horizontal">
                            <div class="col-xs-12">
                                <div class="col-xs-2 reset-padding">
                                    <div>订单查询：</div>
                                    <input type="text" name="condition" class="form-control clear-target" placeholder="订单号、IP或电话、小区名称" value="<?php echo ($_GET['condition']); ?>">
                                </div>
                                <div class="col-xs-2">
                                    <div>发单时间-开始：</div>
                                    <input type="text" name="time_start" class="form-control datetimepicker clear-target" placeholder="选择日期" value="<?php echo ($_GET['time_start']); ?>">
                                </div>
                                <div class="col-xs-2">
                                    <div>发单时间-结束：</div>
                                    <input type="text" name="time_end" class="form-control datetimepicker clear-target" placeholder="选择日期" value="<?php echo ($_GET['time_end']); ?>">
                                </div>
                                <div class="col-xs-2">
                                    <div>实际发单时间-开始：</div>
                                    <input type="text" name="time_real_start" class="form-control datetimepicker clear-target" placeholder="选择日期" value="<?php echo ($_GET['time_real_start']); ?>">
                                </div>
                                <div class="col-xs-2">
                                    <div>实际发单时间-结束：</div>
                                    <input type="text" name="time_real_end" class="form-control datetimepicker clear-target" placeholder="选择日期" value="<?php echo ($_GET['time_real_end']); ?>">
                                </div>
                                <div class="col-xs-2">
                                    <div>所属区域：</div>
                                    <select id="city" name="city" type="text" placeholder="选择城市" class="form-control">
                                        <option value="">请选择</option>
                                        <?php if(is_array($main["city"])): $i = 0; $__LIST__ = $main["city"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["cid"]); ?>"><?php echo ($vo["char_name"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-12 set-mt16">
                                <div class="col-xs-2">
                                    <div>拿房时间-开始：</div>
                                    <input type="text" name="nf_time_start" class="form-control datepicker clear-target" placeholder="选择日期" value="<?php echo ($_GET['nf_time_start']); ?>">
                                </div>
                                <div class="col-xs-2">
                                    <div>拿房时间-结束：</div>
                                    <input type="text" name="nf_time_end" class="form-control datepicker clear-target" placeholder="选择日期" value="<?php echo ($_GET['nf_time_end']); ?>">
                                </div>
                                <div class="col-xs-2">
                                    <div>订单状态：</div>
                                    <select name="status" class="form-control"  type="text">
                                        <?php if(is_array($main["status"])): $i = 0; $__LIST__ = $main["status"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($key); ?>"><?php echo ($vo["text"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                    </select>
                                </div>
                                <div class="col-xs-2">
                                    <div>订单备注：</div>
                                    <select name="remarks" type="text" class="form-control">
                                        <option value="全部">全部</option>
                                        <?php if(is_array($main["remarks"])): $i = 0; $__LIST__ = $main["remarks"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo); ?>"><?php echo ($vo); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                    </select>
                                </div>
                                <div class="col-xs-2">
                                    <div>显号：</div>
                                    <select name="displaynumber" type="text" class="form-control">
                                        <option value="0">全部</option>
                                        <option value="1">未申请</option>
                                        <option value="2">待审核</option>
                                        <option value="3">已审核通过</option>
                                        <option value="4">已拒绝</option>
                                    </select>
                                </div>
                                <div class="col-xs-2">
                                    <div>订单归属人：</div>
                                    <select id="op_uid" name="op_uid" type="text" class="form-control">
                                        <option value="0">请选择</option>
                                        <?php if(is_array($main["operaters"])): $i = 0; $__LIST__ = $main["operaters"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["cname"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                    </select>
                                </div>
                                <div class="col-xs-2">
                                    <div>订单类型:</div>
                                    <select name="isactivity" class="form-control">
                                        <option value="0">全部</option>
                                        <option value="1">活动</option>
                                        <option value="2">普通</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-12 set-mt16">
                                <button type="button" id="search" class="btn btn-success col-xs-1">搜索</button>
                                <button type="button" id="reset" class="btn btn-download col-xs-1">重置</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">订单列表</h3>
                    <button type="button" class="log-info btn pull-right">最近操作记录</button>
                    <a class="btn pull-right abtnbj" href="/CompanyLiangFang?status=-1">未量房订单</a>
                    <!-- <button type="button" class="btn pull-right"><a href="/CompanyLiangFang?status=-1">未量房订单</a></button> -->
                </div>
                <ul class="ol-tab-wrap">
                    <li class="ol-tab" data-tab='11'>新单</li>
                    <li class="ol-tab" data-tab='12'>次新单</li>
                    <li class="ol-tab" title="前日17：30至昨日17：30间的次订单" data-tab='13'>
                        扫单 <i class="fa fa-question-circle"></i>
                    </li>
                    <li class="ol-tab" data-tab='14'>待定单</li>
                    <li class="ol-tab" data-tab='23'>有效单</li>
                    <li class="ol-tab" data-tab='22'>无效单</li>
                    <li class="ol-tab" data-tab='24'>暂时无效</li>
                    <li class="ol-tab" data-tab='25'>撤回单</li>
                    <li class="ol-tab" data-tab='0'>订单总览</li>
                </ul>
                <?php if(isset($main["ordercountbrief"])): ?><div class="new-order-wrap">
                        <div class="ol-neworder-wrap">
                            <ul class="ol-neworder-info">
                                <a href="/orders/?details=1"><li>当前新订单总数</li>
                                    <li><?php echo ($main["ordercountbrief"]["new"]); ?></li></a>
                            </ul>
                            <ul class="ol-neworder-info">
                                <a href="/orders/?details=2"><li>当前已抢未拨打新单</li>
                                    <li><?php echo ($main["ordercountbrief"]["uncalled"]); ?></li></a>
                            </ul>
                            <ul class="ol-neworder-info">
                                <a href="/orders/?details=3"><li>当前发单量总数</li>
                                    <li><?php echo ($main["ordercountbrief"]["publish"]); ?></li></a>
                            </ul>
                        </div>
                    </div><?php endif; ?>
                <?php if(isset($main["scramble"])): ?><div class="new-order-wrap">
                        <?php if(check_menu_auth('/orders/scrambleorder/')): ?><button type="button" id="obtain" class="btn btn-success pull-right ol-obtain-order" >获取新的订单</button><?php endif; ?>
                        <button id="refresh" type="button" class="btn btn-success ol-new-order-reset">刷新</button>
                        <div class="ol-neworder-wrap">
                            <ul class="ol-neworder-info">
                                <li>当前新订单总数</li>
                                <li id="currentNewOrderCount"><?php echo ($main["scramble"]["count"]["new"]); ?></li>
                            </ul>
                            <ul class="ol-neworder-info" title="新单+次新单+扫单+被撤订单*系数+当天无效单*系数-当天有效单*系数（去除被撤订单）">
                                <li>当前未完成订单数 <i class="fa fa-question-circle"></i></li>
                                <li id="currentUnfinishedOrderCount"><?php echo ($main["scramble"]["count"]["unfinished"]); ?></li>
                            </ul>
                            <ul class="ol-neworder-info">
                                <li>可获取新订单总数</li>
                                <li id="canObtainOrderCount"><?php echo ($main["scramble"]["count"]["obtain"]); ?></li>
                            </ul>
                            <ul class="ol-neworder-info">
                                <li>当前被撤回订单数</li>
                                <li id="retractedOrderCount"><?php echo ($main["scramble"]["count"]["retracted"]); ?></li>
                            </ul>
                            <ul class="ol-neworder-info">
                                <li>当前人均发单量</li>
                                <li id="averageOrderCount"><?php echo ($main["scramble"]["count"]["average"]); ?></li>
                            </ul>
                        </div>
                    </div><?php endif; ?>
                <div class="box-body table-responsive no-padding">
                    <table class="table table-hover table-bordered" id="tablelist">
                        <thead>
                            <tr>
                                <th class="width-150">发布日期</th>
                                <th>订单备注</th>
                                <th>订单类型</th>
                                <th>城市区县</th>
                                <?php if(I('get.wzd_orrder') == '1'): ?><th class="wzd_orrder" data-order='1'>完整度&nbsp;<span><i class="glyphicon glyphicon-sort-by-attributes"></i></span></th>
                                <?php elseif(I('get.wzd_orrder') == '2'): ?>
                                    <th class="wzd_orrder" data-order='2'>完整度&nbsp;<span><i class="glyphicon glyphicon-sort-by-attributes-alt"></i></span></th>
                                <?php else: ?>
                                    <th class="wzd_orrder" data-order='0'>完整度&nbsp;<span><i class="glyphicon glyphicon-sort"></i></span></th><?php endif; ?>
                                <th>面积㎡</th>
                                <th>手机号码</th>
                                <th>订单状态</th>
                                <th>订单归属人</th>
                                <th class="width-210">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if(is_array($main["info"]["list"])): $i = 0; $__LIST__ = $main["info"]["list"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr data-id="<?php echo ($vo["id"]); ?>" class='<?php if(($vo["on"] == 4) && ($vo["order2com_allread"] == 0)): ?>fuchsia<?php endif; ?>'>
                                    <td>
                                        <?php echo (date('Y-m-d H:i',$vo["time"])); ?>
                                        <?php if(($vo["from_old_orderid"]) != ""): ?><span href="javascript:void(0)" class="red" title="从赠送单(<?php echo ($vo["from_old_orderid"]); ?>)生成的新单">生</span><?php endif; ?>
                                    </td>
                                    <td title="<?php echo ($vo["remarks"]); ?>">
                                        <!--新单且不为空则可选择备注-->
                                        <?php if(!empty($vo["remarks"])): echo ($vo["remarks"]); endif; ?>
                                        <?php if(!empty($vo["remark_time"])): ?><div class="red" title="最近修改订单备注时间"><?php echo ($vo["remark_time"]); ?></div><?php endif; ?>
                                    </td>
                                    <td>
                                        <?php if($vo['sourceMark'] == 1): ?>活动<?php else: ?>普通<?php endif; ?>
                                    </td>
                                    <td>
                                        <?php echo ($vo["city"]); echo ($vo["area"]); ?>
                                        <?php if(($vo["timef"]) == ""): if($vo['timex_ori'] > 180): ?><div class="green" title="订单发布距现在已经有:<?php echo ($vo["timex"]); ?>"><?php echo ($vo["timex"]); ?></div>
                                            <?php else: ?>
                                                <div class="red" title="订单发布距现在已经有:<?php echo ($vo["timex"]); ?>"><?php echo ($vo["timex"]); ?></div><?php endif; ?>
                                        <?php else: ?>
                                        <div class="red" title="拨打及时度(订单发布时间 到 第一次拨打电话时间):<?php echo ($vo["timef"]); ?>"><?php echo ($vo["timef"]); ?></div><?php endif; ?>
                                    </td>
                                    <td><?php echo ((isset($vo["wzd"]) && ($vo["wzd"] !== ""))?($vo["wzd"]):0); ?>%</td>
                                    <td><?php echo ($vo["mianji"]); ?></td>
                                    <td>
                                        <?php if(!empty($vo['apply_tel'][$main['admin']['id']])): if(($vo['apply_tel'][$main['admin']['id']]) == "1"): ?><span class="text-yellow "><?php echo ($vo["tel"]); ?></span><?php endif; ?>
                                            <?php if(($vo['apply_tel'][$main['admin']['id']]) == "2"): ?><span class="text-green"><?php echo ($vo["tel"]); ?></span><?php endif; ?>
                                            <?php if(($vo['apply_tel'][$main['admin']['id']]) == "3"): ?><span class="text-red"><?php echo ($vo["tel"]); ?></span><?php endif; ?>
                                        <?php else: ?>
                                        <?php echo ($vo["tel"]); endif; ?>&nbsp;
                                        <?php if(!empty($vo["apply_tel_status"])): ?><!--显号审核，此处必须要用全等于-->
                                            <?php if(in_array('1', explode(',', $vo['apply_tel_status']))): ?><!--如果有正在申请状态则显示蓝色审核按钮-->
                                                <a class="apply_tel" href="javascript:void(0)">
                                                    <span title="请审核显号" class="fa fa-eye-slash text-primary"></span>
                                                </a>
                                            <?php else: ?>
                                                <a class="apply_tel" href="javascript:void(0)">
                                                    <span title="已处理显号审核" class="fa fa-eye text-gray"></span>
                                                </a><?php endif; endif; ?>
                                        <?php if(!empty($vo["phone_location"])): echo ($vo["phone_location"]); endif; ?>
                                        <!--号码其他状态-->
                                        <?php if(($vo["phone_repeat_count"]) > "1"): ?><a title="手机号码重复次数" class="phone-repeat-order red" href="javascript:void(0)">
                                                重<?php echo ($vo['phone_repeat_count'] -1); ?>
                                            </a><?php endif; ?>
                                        <?php if(($vo["ip_repeat_count"]) > "1"): ?><a title="IP重复次数" class="ip-repeat-order" href="javascript:void(0)">
                                                重<?php echo ($vo['ip_repeat_count'] -1); ?>
                                            </a><?php endif; ?>
                                        <?php if(($vo["order_blacklist_status"]) == "1"): ?><a href="javascript:void(0)" class="red" title="本订单号码在黑名单当中">黑</a><?php endif; ?>
                                        <?php if(!empty($vo["visitime"])): ?><div class="red" title="下次联系时间">
                                                <?php echo (date('Y-m-d',strtotime($vo["visitime"]))); ?>
                                            </div><?php endif; ?>
                                    </td>
                                    <!--不同状态不同颜色-->
                                    <td style="
                                        <?php switch($vo["on"]): case "0": ?>color: #0f0<?php break;?>
                                            <?php case "2": ?>color: #f00<?php break;?>
                                            <?php case "3": ?>color: #00f<?php break;?>
                                            <?php case "4": ?>color: #f0f<?php break;?>
                                            <?php case "5": ?>color: #0ff<?php break;?>
                                            <?php case "8": ?>color: #0ff<?php break;?>
                                            <?php case "9": ?>color: #0ff<?php break;?>
                                            <?php default: ?> color:#0f0<?php endswitch;?>
                                    ">
                                        <?php echo getOrderStatus($vo['on'], $vo['on_sub'], $vo['type_fw']);?>
                                        <?php if(($vo["on"]) == "4"): ?><div class="red">
                                                <?php switch($vo["type_zs_sub"]): case "1": ?>距离远<?php break;?>
                                                    <?php case "2": ?>价格低<?php break;?>
                                                    <?php case "3": ?>时间长<?php break;?>
                                                    <?php case "4": ?>城市未开<?php break;?>
                                                    <?php default: endswitch;?>
                                                <?php if(!empty($vo["nf_time"])): if(($vo["nf_time"]) != "0000-00-00"): ?><span title="拿房时间"><?php echo ($vo["nf_time"]); ?></span><?php endif; endif; ?>
                                            </div><?php endif; ?>
                                    </td>
                                    <td><?php echo ($vo["op_name"]); ?></td>
                                    <td data-id="<?php echo ($vo["id"]); ?>">
                                        <?php if(($vo["lasttime"]) > "0"): ?><a href="javascript:void(0)" title="编辑订单:<?php echo ($vo["id"]); ?>|上次修改:<?php echo (date('Y-m-d H:i',$vo["lasttime"])); ?>|实际发布时间:<?php echo (date('Y-m-d H:i',$vo["time_real"])); ?>|活动名称:<?php echo ($vo["source_remark"]); ?>" class="btn-order-edit">编辑</a>
                                        <?php else: ?>
                                            <a href="javascript:void(0)" title="编辑订单:<?php echo ($vo["id"]); ?>|实际发布时间:<?php echo (date('Y-m-d H:i',$vo["time_real"])); ?>|活动名称:<?php echo ($vo["source_remark"]); ?>" class="btn-order-edit">编辑</a><?php endif; ?>
                                        <?php if(($main["auth"]["checkcall"]) == "1"): if(($vo["call_repeat_count"]) > "0"): ?><a href="javascript:void(0)" title="点击查看" class="tel-history">
                                                    呼叫记录(<?php echo ((isset($vo["call_repeat_count"]) && ($vo["call_repeat_count"] !== ""))?($vo["call_repeat_count"]):0); ?>)
                                                </a><?php endif; endif; ?>
                                        <div class="red" title="未审核 或 待定的单子(最长呼叫):<?php echo ($vo["timel"]); ?>"><?php echo ($vo["timel"]); ?></div>
                                    </td>
                                </tr><?php endforeach; endif; else: echo "" ;endif; ?>
                        </tbody>
                    </table>
                </div>
                <div class="col-xs-12">
                    <?php echo ($main["info"]["page"]); ?>
                </div>
            </div>
        </div>
    </div>
    <!--公用记录模态框-->
    <div class="modal fade common-model" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×
                    </button>
                    <h4 class="modal-title">记录列表</h4>
                </div>
                <div class="modal-body common-model-content"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>

    <!--显号审核模态框-->
    <div class="modal fade" id="apply" tabindex="-1" role="dialog" aria-labelledby="myModalLabe1l" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                    <h4>审核显号</h4>
                </div>
                <div class="modal-body" data-id="" style="height: auto;overflow: hidden;">
                    <div class="form-group">
                        <label>申请人</label>
                        <div class="row">
                            <div class="col-xs-8">
                                <input type="input" class="form-control" disabled="disabled" name="applyuser" value="张三">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>申请理由</label>
                        <div class="row">
                            <div class="col-xs-12">
                                <textarea disabled="disabled" class="form-control" name="applyreason" value=""></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-xs-8 modal-error-wrap"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary btn-ok">同意</button>
                </div>
            </div>
        </div>
    </div>
    <!--编辑订单模态框-->
    <div class="modal fade my-dialog" id="operate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-gray">
                    <em class="close" aria-hidden="true" style="font-style: normal;">×
                </em>
                    <span></span>
                </div>
                <div class="modal-body">
                </div>
            </div>
        </div>
    </div>

    <!--重复订单查看模态框-->
    <div class="modal fade my-dialog" id="myModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-gray">
                    <em class="close" aria-hidden="true" style="font-style: normal;">×
                </em>
                    <span></span>
                </div>
                <div class="modal-body">
                </div>
            </div>
        </div>
    </div>
</section>

        </div>
        <div class="mask-self">
            <div class="loadingWrap" style="">
                    <div class="loding-5">

                    </div>
                    <div class="loding-5-1">

                    </div>
                    <div class="loding-5-2">

                    </div>
                    <div class="loding-5-3">

                    </div>
            </div>
        </div>


        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
            </ul>
            <div class="tab-content">
                <div class="tab-pane" id="control-sidebar-home-tab"></div>
            </div>
        </aside>
        <div class="control-sidebar-bg"></div>
    </div>
    <script src="<?php echo C('168NEW_URL');?>/assets/common/css/bootstrap/js/bootstrap.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/fileinput/fileinput.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/fileinput/fileinput_locale_zh.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/datetimepicker/bootstrap-datetimepicker.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="<?php echo C('168NEW_URL');?>/assets/common/js/app.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="<?php echo C('168NEW_URL');?>/assets/common/js/global.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <!--[if lt IE 9]>
    <script src="/assets/common/js/html5shiv/3.7.3/html5shiv.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="/assets/common/js/respond.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/placeholders.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <![endif]-->
    <script type="text/javascript">

        var isLoading = true;
        $(document).ajaxStart(function(params){
            if (isLoading) {
                $(".mask-self").show();
            }
        }).ajaxComplete(function(){
            setTimeout(hideProgress,1000);
            $(".mask-self").hide();
        }).ajaxStop(function() {
            $(".mask-self").hide();
        });

        //链接监控
        $('[href]').on('click',function(event) {
            if($(this).attr("target") != '_blank'){
                if($(this).attr("href").substring(0,10) != 'javascript'){
                    if($(this).attr("href").substring(0,1) != '#'){
                        setTimeout(iProgress,300);
                    }
                }
            }
        });

        //表单监控
        $("form").on("submit",function(event){
            setTimeout(iProgress,300);
        });

        //手工隐藏Loading
        $('.hideLoading').on('click',function(event) {
            setTimeout(hideProgress,500);
        });

        function iProgress(){
            $(".mask-self").show();
        }
        function hideProgress(){
            $(".mask-self").hide();
        }

        //监听全局键盘事件
        $(document).ready(function(){
            document.onkeydown = function(e) {
                // 兼容FF和IE和Opera
                var theEvent = e || window.event;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                if (code == 13) {
                    var target =$('.key-down-event').attr('data-triger');
                    if (target != '') {
                        $(target).trigger('click');
                    };
                }
            }

            /*左侧菜单切换保存到服务器*/
            $('.sidebar-toggle').click(function(event) {
                var showmenu = $('#switch-menu').hasClass('sidebar-collapse');
                $.ajax({
                    url: '/api/switchmenushow/',
                    type: 'GET',
                    async:false,
                    dataType: 'JSON',
                    data: {
                        showmenu:showmenu
                    }
                })
            });
        })
    </script>
    
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/artdialog/dialog.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/datetimepicker/bootstrap-datepicker.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/select2/select2.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/jscookie/js/jscookie-1.0.2.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/dataTables/metisMenu.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/dataTables/jquery.dataTables.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/dataTables/dataTables.bootstrap.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/bootstrap-dialog/bootstrap-dialog.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/zeroclipboard/ZeroClipboard.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/home/orders/js/calculator.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="//api.map.baidu.com/api?v=1.4"></script>
<?php if(isset($main["scramble"])): ?><!--S-抢单相关JS文件-->
    <script>
        $(document).ready(function(){
            //定时器定时检查获取新订单时间
            var setTimeInterval = setInterval(function(){
                var lastTime = typeof(localStorage.lastTime) == 'undefined' ? 0 : localStorage.lastTime;
                var nowTime = new Date().getTime();
                var obtainButton = $('#obtain');
                var intervalTime = parseInt('<?php echo ($main["scramble"]["new_order_interval"]); ?>');
                if (nowTime - lastTime > intervalTime * 1000) {
                    //此处的判断条件不能合并在一起写
                    if (typeof(obtainButton.attr('disabled')) != 'undefined') {
                        obtainButton.removeAttr('disabled').html('获取新的订单');
                    };
                } else {
                    obtainButton.attr('disabled','disabled').html((intervalTime-parseInt((nowTime-lastTime)/1000) ) + 's后再次获取');
                }
            }, 1000);

            //刷新订单状态请求
            $('#refresh').click(function(event) {
                $.ajax({
                    url: '/orders/refreshordercount/',
                    type: 'POST',
                    dataType: 'JSON'
                })
                .done(function(data) {
                    if(data.status == '1'){
                        var data = data.data;
                        $('#currentNewOrderCount').text(data.new);
                        $('#currentUnfinishedOrderCount').text(data.unfinished);
                        $('#canObtainOrderCount').text(data.obtain);
                        $('#retractedOrderCount').text(data.retracted);
                        $('#averageOrderCount').text(data.average);
                    }else{
                        var e = dialog({
                            title: '消息',
                            content: data.info,
                            okValue: '确 定',
                            quickClose: true,
                            ok: function () {}
                        });
                        e.show();
                        return false;
                    }
                })
                .fail(function(xhr) {
                    var e = dialog({
                        title: '消息',
                        content: '发生未知错误，请联系技术部门~',
                        okValue: '确 定',
                        quickClose: true,
                        ok: function () {}
                    });
                    e.show();
                    return false;
                })
            });
            //点击获取新订单
            $('#obtain').click(function(event) {
                $.ajax({
                    url: '/orders/scrambleorder/',
                    type: 'POST',
                    dataType: 'JSON'
                })
                .done(function(data) {
                    if(data.status == '1'){
                        //只有成功获取到订单才需要30s等待，未成功获取则无需等待
                        localStorage.lastTime = new Date().getTime();
                        //点击获取新订单无需再次查询，直接请求给出提示就可以
                        var e = dialog({
                            title: '消息',
                            content: '获取新订单成功！',
                            okValue: '确 定',
                            cancelValue: '取 消',
                            quickClose: true,
                            ok: function () {
                                window.location.href = window.location.href;
                            },
                            cancel: function () {
                                window.location.href = window.location.href;
                            }
                        });
                        e.show();
                        return false;
                    }else{
                        var e = dialog({
                            title: '消息',
                            content: data.info,
                            okValue: '确 定',
                            quickClose: true,
                            ok: function () {}
                        });
                        e.show();
                        return false;
                    }
                })
                .fail(function(xhr) {
                    var e = dialog({
                        title: '消息',
                        content: '发生未知错误，请联系技术部门~',
                        okValue: '确 定',
                        quickClose: true,
                        ok: function () {}
                    });
                    e.show();
                    return false;
                })
            });
        })
    </script>
    <!--E-抢单相关JS文件--><?php endif; ?>
<script>
    $(document).ready(function(){
        /*S-初始化插件*/
        $('#city').select2();
        $('#op_uid').select2();

        $('.datepicker').datepicker({
            autoclose: true,
            format: 'yyyy-mm-dd'
        });
        $('.datetimepicker').datetimepicker({
            weekStart: 1,
            todayHighlight: 1,
            todayBtn:true,
            minView:0,
            autoclose: true
        });
        $('.wzd_orrder').click(function(event) {
            var order = $(this).attr('data-order');
            if ('1' == order) {
                $(this).attr('data-order', '2');
                $(this).find('span').html('<i class="glyphicon glyphicon-sort-by-attributes-alt"></i>');
            } else if ('2' == order) {
                $(this).attr('data-order', '0');
                $(this).find('span').html('<i class="glyphicon glyphicon-sort"></i>');
            } else {
                $(this).attr('data-order', '1');
                $(this).find('span').html('<i class="glyphicon glyphicon-sort-by-attributes"></i>');
            }
            $('.wzd_orrder').unbind('click');
            $('#search').trigger('click');
        });
        /*E-初始化插件*/

        /*S-申请显号*/
        $('.apply_tel').click(function(event) {
            var id = $(this).parent().parent().attr('data-id');
            if (id == '' || typeof(id) == 'undefined' || id == null) {
                return false;
            };
            $.ajax({
                url: '/orders/getapplytellist/',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    id: id
                }
            })
            .done(function(data) {
                if (data.status == '1') {
                    $('.common-model-content').empty();
                    $('.common-model-content').html(data.data);
                    $('.common-model').modal('show');
                } else {
                    var e = dialog({
                        title: '消息',
                        content: data.info,
                        okValue: '确 定',
                        quickClose: true,
                        ok: function() {}
                    });
                    e.show();
                    return false;
                }
            })
            .fail(function(xhr) {
                var e = dialog({
                    title: '消息',
                    content: '发生未知错误，请联系技术部门~',
                    okValue: '确 定',
                    quickClose: true,
                    ok: function() {}
                });
                e.show();
                return false;
            })
        });
        $("body").on("click",".btn-apply-tel",function(event) {
            $.ajax({
                url: '/orders/displaynumbercheck/',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    id:$(this).parent().attr('data-id'),
                    status:$(this).attr('data-status')
                }
            })
            .done(function(data) {
                alert(data.info);
                $('.common-model').modal('hide');
            })
            .fail(function(xhr) {
                alert('操作失败,网络错误，请稍后重试或联系技术部门');
            })
        })
        /*E-申请显号*/

        /*S-IP重复订单*/
        $('.ip-repeat-order').click(function(event) {
            var id = $(this).parent().parent().attr('data-id');
            var _this = $(this);
            $.ajax({
                url: '/orders/getrepeatorderlistbyip/',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    id:id
                }
            })
            .done(function(data) {
                if(data.status == '1'){
                    $('.common-model-content').empty();
                    $('.common-model-content').html(data.data);
                    $('.common-model').modal('show');
                }else{
                    var e = dialog({
                        title: '消息',
                        content: data.info,
                        okValue: '确 定',
                        quickClose: true,
                        ok: function () {}
                    });
                    e.show();
                    return false;
                }
            })
            .fail(function(xhr) {
                var e = dialog({
                    title: '消息',
                    content: '发生未知错误，请联系技术部门~',
                    okValue: '确 定',
                    quickClose: true,
                    ok: function () {}
                });
                e.show();
                return false;
            })
        });
        /*E-IP重复订单*/

        /*S-手机号重复订单*/
        $('.phone-repeat-order').click(function(event) {
            var id = $(this).parent().parent().attr('data-id');
            var _this = $(this);
            $.ajax({
                url: '/orders/getrepeatorderlistbyphone/',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    id: id
                }
            })
            .done(function(data) {
                if (data.status == '1') {
                    $('.common-model-content').empty();
                    $('.common-model-content').html(data.data);
                    $('.common-model').modal('show');
                } else {
                    var e = dialog({
                        title: '消息',
                        content: data.info,
                        okValue: '确 定',
                        quickClose: true,
                        ok: function() {}
                    });
                    e.show();
                    return false;
                }
            })
            .fail(function(xhr) {
                var e = dialog({
                    title: '消息',
                    content: '发生未知错误，请联系技术部门~',
                    okValue: '确 定',
                    quickClose: true,
                    ok: function() {}
                });
                e.show();
                return false;
            })
        });
        /*E-手机号重复订单*/

        /*S-最近操作记录*/
        $('.log-info').click(function(event) {
            $.ajax({
                url: '/orders/getrecentoperatelog/',
                type: 'POST',
                dataType: 'JSON',
                data: {}
            })
            .done(function(data) {
                if (data.status == '1') {
                    $('.common-model-content').empty();
                    $('.common-model-content').html(data.data);
                    $('.common-model').modal('show');
                } else {
                    var e = dialog({
                        title: '消息',
                        content: data.info,
                        okValue: '确 定',
                        quickClose: true,
                        ok: function() {}
                    });
                    e.show();
                    return false;
                }
            })
            .fail(function(xhr) {
                var e = dialog({
                    title: '消息',
                    content: '发生未知错误，请联系技术部门~',
                    okValue: '确 定',
                    quickClose: true,
                    ok: function() {}
                });
                e.show();
                return false;
            })
        });
        /*E-最近操作记录*/

        /*S-编辑订单*/
        $("body").on("click",".btn-order-edit",function(event) {
            var id = $(this).parent().attr("data-id");
            $.ajax({
                url: '/orders/operate/',
                type: 'POST',
                dataType: 'json',
                data: {
                    id: id
                }
            })
            .done(function(data) {
                if (data.status == 1) {
                    var header = "  修改订单  " + data.info.id + " (上次修改  " + data.info.lasttime + "  )   |   实际发布时间:" + data.info.time_real + " |   订单发布完整度：" + data.info.wzd + " %";

                    if (data.info.activity != null) {
                        header +=  " | 活动名称: "+ data.info.activity.name;
                    }

                    $("#operate .modal-header span").html(header);
                    $("#operate .modal-body").html(data.data);
                    $("#operate").modal({
                        backdrop: false
                    }).on("shown.bs.modal",function(){
                            ZeroClipboard.destroy();
                            var client = new ZeroClipboard( $("#copy") );
                            client.on('copy', function (event) {
                                var command_need=$("textarea[name=text]").val();//获取装修要求文本
                                var pre_string = new Array("【1.设计施工要求】：", "【2.材料要求】：", "【3.不含家具家电总预算】：","【4.对装修公司的要求】：","【5.量房注意事项】：","【6.工期】：","【2.不含家具家电总预算】：","【3.对装修公司的要求】：","【4.量房注意事项】：");
                                for(var i=0;i<pre_string.length;i++)
                                {
                                    command_need=command_need.replace(pre_string[i], "");//遍历替换前缀说明
                                }
                                //第一条的时候要加换行\r\n
                                var copytxt = "【齐装网】" + $("[name=qx]").find("option:selected").text() + " "
                                              + $("[name=xiaoqu]").val()  + " "
                                              + $("[name=dz]").val() + " "
                                              +"\r\n "+ command_need + " 业主:" +  $("[name=name]").val()
                                              + $("[name=sex]").find("option:selected").text()
                                              + " 手机上直接查看: " + $("input[name=dwz]").val() ;

                                event.clipboardData.setData('text/plain', copytxt);

                                alert("复制成功");
                            });

                            var company = new ZeroClipboard( $("#copy-company") );
                            company.on('copy', function (event) {
                                var copytxt = "";
                                $(".fen-company").each(function(){
                                        copytxt += $(this).text()+" ";
                                });

                                event.clipboardData.setData('text/plain', copytxt);
                                alert("复制成功");
                            });
                    });
                } else {
                    var e = dialog({
                        title: '消息',
                        content: data.info,
                        okValue: '确 定',
                        quickClose: true,
                        ok: function () {}
                    });
                    e.show();
                    return false;
                }
            });
        });
        $("#operate .modal-header em").click(function(event) {
            if (confirm("确定关闭？")) {
                $(".my-dialog").modal("hide");
            }
        });
        /*E-编辑订单*/

        /*S-重复订单编辑查看*/
        $("body").on("click",".btn-repeatcheck",function(event) {
            var id = $(this).parent().attr("data-id");
            $.ajax({
                url: '/orders/repeatcheck/',
                type: 'POST',
                dataType: 'json',
                data: {
                    id: id
                }
            })
            .done(function(data) {
                if (data.code == 200) {
                    $("#myModel .modal-header span").html("  修改订单  " + data.info.id + " (上次修改  " + data.info.lasttime + "  )   |   实际发布时间:" + data.info.time_real + " |   订单发布完整度：" + data.info.wzd + " %");
                    $("#myModel .modal-body").html(data.data);
                    $("#myModel").modal({
                        backdrop: true
                    }).on("shown.bs.modal",function(){
                            ZeroClipboard.destroy();
                            var client = new ZeroClipboard( $("#copy") );
                            client.on('copy', function (event) {
                                   var command_need=$("textarea[name=text]").val();//获取装修要求文本
                                    var pre_string = new Array("【1.设计施工要求】：", "【2.材料要求】：", "【3.不含家具家电总预算】：","【4.对装修公司的要求】：","【5.量房注意事项】：","【6.工期】：","【2.不含家具家电总预算】：","【3.对装修公司的要求】：","【4.量房注意事项】：");
                                    for(var i=0;i<pre_string.length;i++)
                                    {
                                        command_need=command_need.replace(pre_string[i], "");//遍历替换前缀说明
                                    }
                                    //第一条的时候要加换行\r\n
                                    var copytxt = "【齐装网】" + $("[name=qx]").find("option:selected").text() + " "
                                                  + $("[name=xiaoqu]").val()  + " "
                                                  + $("[name=dz]").val() + " "
                                                  +"\r\n "+ command_need + " 业主:" +  $("[name=name]").val()
                                                  + $("[name=sex]").find("option:selected").text()
                                                  + " 手机上直接查看: " + $("input[name=dwz]").val() ;

                                event.clipboardData.setData('text/plain', copytxt);

                                alert("复制成功");
                            });

                            var company = new ZeroClipboard( $("#copy-company") );
                            company.on('copy', function (event) {
                                var copytxt = "";
                                $(".fen-company").each(function(){
                                        copytxt += $(this).text()+" ";
                                });
                                event.clipboardData.setData('text/plain', copytxt);
                                alert("复制成功");
                            });
                    });
                } else {
                    alert(data.info);
                }
            });
        });
        $("#myModel .modal-header em").click(function(event) {
            if (confirm("确定关闭？")) {
                $(".my-dialog").modal("hide");
            }
        });
        /*E-重复订单编辑查看*/

        /*S-初始化筛选条件*/
        $("select[name=city]").select2('val','<?php echo ($_GET['city']); ?>' == '' ? 0 : '<?php echo ($_GET['city']); ?>');
        $("select[name=op_uid]").select2('val','<?php echo ($_GET['op_uid']); ?>' == '' ? 0 : '<?php echo ($_GET['op_uid']); ?>');
        $("select[name=status]").val('<?php echo ($_GET['status']); ?>' == '' ? 0 : '<?php echo ($_GET['status']); ?>');
        $('select[name=remarks]').val('<?php echo ($_GET['remarks']); ?>' == '' ? '全部' : '<?php echo ($_GET['remarks']); ?>');
        $('select[name=displaynumber]').val('<?php echo ($_GET['displaynumber']); ?>' == '' ? 0 : '<?php echo ($_GET['displaynumber']); ?>');
        $('select[name=isactivity]').val('<?php echo ($_GET['isactivity']); ?>' == '' ? 0 : '<?php echo ($_GET['isactivity']); ?>');
        /*E-初始化筛选条件*/

        //tab切换
        $('.ol-tab').on('click', function() {
            cookies.set('order_status_forbidden',1,365);
            $('.ol-tab').removeClass('ol-tab-active');
            $(this).addClass('ol-tab-active');
            var status = $(this).attr('data-tab');
            if (status == '0') {
                cookies.set('order_status_forbidden',0,365);
                window.location.href = '/orders/';
            } else {
                var hasAdminId = ['12', '13', '14'];
                if (hasAdminId.indexOf(status) > -1) {
                    window.location.href = '/orders/?status=' + status + '&op_uid=' + '<?php echo ($main["defaultOperater"]); ?>';
                } else {
                    window.location.href = '/orders/?status=' + status;
                }
            }
        });

        /*S-重置搜索条件*/
        $('#reset').on('click', function() {
            clearSearchCondition();
            $('select[name=status]').removeAttr('disabled');
        });
        /*E-重置搜索条件*/

        /*S-搜索按钮*/
        $('#search').on('click', function() {
            var condition = $('input[name=condition]').val();
            var time_start = $('input[name=time_start]').val();
            var time_end = $('input[name=time_end]').val();
            var time_real_start = $('input[name=time_real_start]').val();
            var time_real_end = $('input[name=time_real_end]').val();
            var city = $('select[name=city]').val();
            var nf_time_start = $('input[name=nf_time_start]').val();
            var nf_time_end = $('input[name=nf_time_end]').val();
            var status = $('select[name=status]').val();
            var remarks = $('select[name=remarks]').val();
            var displaynumber = $('select[name=displaynumber]').val();
            var op_uid = $('select[name=op_uid]').val();
            var isactivity = $('select[name=isactivity]').val();
            if ($('select[name=isactivity]').length <= 0) {
                isactivity = '';
            }
            var wzd_orrder = $('.wzd_orrder').attr('data-order');
            //判断时间间隔
            if ((time_real_end != '') && (time_real_start > time_real_end)) {
                var e = dialog({
                    title: '消息',
                    content: '发单开始时间不能大于结束时间~',
                    okValue: '确 定',
                    quickClose: true,
                    ok: function () {}
                });
                e.show();
                return false;
            };
            if ((nf_time_end != '') && (nf_time_start > nf_time_end)) {
                var e = dialog({
                    title: '消息',
                    content: '拿房开始时间不能大于结束时间~',
                    okValue: '确 定',
                    quickClose: true,
                    ok: function () {}
                });
                e.show();
                return false;
            };
            window.location.href = '/orders/?condition=' + condition + '&time_start=' + time_start  + '&time_end=' + time_end  + '&time_real_start=' + time_real_start + '&time_real_end=' + time_real_end + '&city=' + city + '&nf_time_start=' + nf_time_start + '&nf_time_end=' + nf_time_end + '&status=' + status + '&remarks=' + remarks + '&displaynumber=' + displaynumber + '&op_uid=' + op_uid+"&isactivity="+isactivity + '&wzd_orrder=' + wzd_orrder;
        });
        /*E-搜索按钮*/

        /*S-清空筛选条件*/
        function clearSearchCondition() {
            $('.clear-target').val('');
            $("select[name=city]").select2('val','0');
            $("select[name=status]").val('0');
            $('select[name=remarks]').val('全部');
            $('select[name=displaynumber]').val('0');
            $('.ol-tab').removeClass('ol-tab-active');
            cookies.set('order_status_forbidden',0,365);
        }
        /*E-清空筛选条件*/

        /*S-订单状态筛选条件禁用相关*/
        if (cookies.get('order_status_forbidden') == 1) {
            if ("<?php echo ($_GET['status']); ?>" != '') {
                var status = "<?php echo ($_GET['status']); ?>";
                //需要禁用的订单状态
                var forbidden = [11,12,13,14,23,22,25,24];
                if (forbidden.indexOf(parseInt(status)) > -1) {
                    $('.ol-tab').removeClass('ol-tab-active');
                    $('.ol-tab-wrap .ol-tab[data-tab="' + status + '"]').addClass('ol-tab-active');
                    $('select[name=status]').attr('disabled', 'disabled');
                }
                $('select[name=status]').val(status);
            } else {
                cookies.set('order_status_forbidden',0,365);
            }
        } else {
            $('.ol-tab').removeClass('ol-tab-active');
            $('.ol-tab-wrap .ol-tab[data-tab="0"]').addClass('ol-tab-active');
        }
        /*E-订单状态筛选条件禁用相关*/

    })
</script>
<?php if(($main["auth"]["checkcall"]) == "1"): ?><script>
        $(document).ready(function(){
            /*S-呼叫记录查看*/
            $('.tel-history').click(function(event) {
                var id = $(this).parent().parent().attr('data-id');
                var _this = $(this);
                $.ajax({
                    url: '/voip/voiprecord/',
                    type: 'GET',
                    dataType: 'JSON',
                    data: {
                        id: id
                    }
                })
                .done(function(data) {
                    if (data.status == '1') {
                        $('.common-model-content').empty();
                        $('.common-model-content').html(data.data);
                        $('.common-model').modal('show');
                    } else {
                        var e = dialog({
                            title: '消息',
                            content: data.info,
                            okValue: '确 定',
                            quickClose: true,
                            ok: function() {}
                        });
                        e.show();
                        return false;
                    }
                })
                .fail(function(xhr) {
                    var e = dialog({
                        title: '消息',
                        content: '发生未知错误，请联系技术部门~',
                        okValue: '确 定',
                        quickClose: true,
                        ok: function() {}
                    });
                    e.show();
                    return false;
                })
            });
            /*E-呼叫记录查看*/
        });
    </script><?php endif; ?>

</body>
</html>