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
    
<link href="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/datetimepicker/datepicker.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />
<link href="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/datetimepicker/datetimepicker.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />
<link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/home/order/css/index.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" href="/assets/common/js/plugins/bootstrap-dialog/bootstrap-dialog.min.css?v=<?php echo C('STATIC_VERSION');?>">
<link rel="stylesheet" type="text/css" href="/assets/common/js/plugins/select2/select2.css?v=<?php echo C('STATIC_VERSION');?>" />
<link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/home/orders/css/modifyriz.css?v=<?php echo C('STATIC_VERSION');?>">
<style>
.rizhitanchuan {
    left: 3px !important;
    top: 46px !important;
}
</style>

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
            
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-default">
                <div class="box-header">
                    <div class="row">
                        <div class="col-xs-12 no-padding">
                            <div class="col-xs-1">
                                <p>对接客服：</p>
                                <select class="select2 select2-offscree form-control" name="kf" type="text" placeholder="对接客服" tabindex="-1">
                                    <option value="">请选择</option>
                                    <?php if(is_array($kflist)): $i = 0; $__LIST__ = $kflist;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["name"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                </select>
                            </div>
                            <div class="col-xs-2">
                                <p>订单查询：</p>
                                <input class="form-control" type="text" name="id" placeholder="订单号、小区名称" value="<?php echo ($_GET['id']); ?>">
                            </div>
                            <div class="col-xs-1">
                                <p>所属区域：</p>
                                <select class="select2 select2-offscree form-control" name="cs" type="text" placeholder="城市" tabindex="-1">
                                    <option value="">请选择</option>
                                    <?php if(is_array($citys)): $i = 0; $__LIST__ = $citys;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["cid"]); ?>"><?php echo ($vo["cname"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                </select>
                            </div>
                            <div class="col-xs-1">
                                <p>订单状态：</p>
                                <select class="select2 select2-offscree form-control" name="status" type="text" placeholder="城市" tabindex="-1">
                                    <option value="">请选择</option>
                                    <?php if(is_array($status)): $i = 0; $__LIST__ = $status;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($key); ?>"><?php echo ($vo); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                </select>
                            </div>
                            <?php if($_GET['type'] != 2): ?><div class="col-xs-2">
                                <p>推送时间：</p>
                                <input class="form-control datetimepicker" type="text" name="begin" placeholder="订单推送时间" value="<?php echo ($_GET['begin']); ?>">
                            </div>
                            <div class="col-xs-2">
                                <p>&nbsp;</p>
                                <input class="form-control datetimepicker" type="text" name="end" placeholder="订单推送时间" value="<?php echo ($_GET['end']); ?>">
                            </div>
                            <?php else: ?>
                            <div class="col-xs-1">
                                <p>分配时间：</p>
                                <input class="form-control datetimepicker" type="text" name="begin" placeholder="订单分配时间" value="<?php echo ($_GET['begin']); ?>">
                            </div>
                            <div class="col-xs-1">
                                <p>&nbsp;</p>
                                <input class="form-control datetimepicker" type="text" name="end" placeholder="订单分配时间" value="<?php echo ($_GET['end']); ?>">
                            </div>
                            <div class="col-xs-1">
                                <p>对接时长：</p>
                                <select class="select2 select2-offscree form-control" name="timediff" type="text" placeholder="订单对接时长：" tabindex="-1">
                                    <option value="">请选择</option>
                                    <?php if(is_array($timediff)): $i = 0; $__LIST__ = $timediff;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($key); ?>"><?php echo ($vo); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                </select>
                            </div><?php endif; ?>
                            <?php if(in_array(session('uc_userinfo.uid'),$showList)): ?><div class="col-xs-1">
                                <p>订单类型:</p>
                                <select name="isactivity" class="form-control">
                                    <option value="0">全部</option>
                                    <option value="1">活动订单</option>
                                    <option value="2">普通订单</option>
                                </select>
                            </div><?php endif; ?>
                            <div class="col-xs-2">
                               <p>&nbsp;</p>
                               <div id="btnreact" class="btn btn-primary btn-sm btn-flat"><i class="fa fa-wrench"></i>&nbsp;重置</div>
                               <div id="btnSearch" class="btn btn-primary btn-sm btn-flat  ml10"><i class="fa fa-search"></i>&nbsp;搜索</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-body">
                    <div>
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" data-id="1"><a class="btn-sm" href="javascript:void(0)" aria-controls="unallocated" role="tab" data-toggle="tab">未分配订单</a></li>
                            <li role="presentation" data-id="2"><a class="btn-sm" href="javascript:void(0)" aria-controls="allocated" role="tab" data-toggle="tab">已分配订单</a></li>
                            <li role="presentation" data-id="3"><a class="btn-sm" href="javascript:void(0)" aria-controls="allocated" role="tab" data-toggle="tab">待分配订单</a></li>
                        </ul>
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active fade in" id="unallocated">
                                <!-- 未分配订单 -->
                                <div class="col-xs-12 no-padding">
                                    <table id="" class="table table-bordered table-hover dataTable no-footer" role="grid" aria-describedby="myTable_info">
                                        <thead>
                                            <tr role="row">
                                                <th>发布日期</th>
                                                <th>订单备注</th>
                                                <?php if(in_array(session('uc_userinfo.uid'),$showList)): ?><th>订单类型</th><?php endif; ?>
                                                <th>城市区县</th>
                                                <th>完整度</th>
                                                <th>面积㎡</th>
                                                <th>手机号码</th>
                                                <th>订单状态</th>
                                                <?php if($_GET['type'] != 2): ?><th>订单推送时间</th>
                                                <?php else: ?>
                                                <th>订单分配时间</th><?php endif; ?>
                                                <?php if($_GET['type'] == 2): ?><th>对接客服</th><?php endif; ?>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr role="row" class="odd">
                                                <td><?php echo (date("Y-m-d H:i:s",$vo["time_real"])); ?></td>
                                                <td><span class="text-red"><?php echo ($vo["remarks"]); ?></span></td>
                                                <?php if(in_array(session('uc_userinfo.uid'),$showList)): ?><td>
                                                    <?php if($vo['sourceMark'] == 1): ?>活动
                                                    <?php else: ?>
                                                        普通<?php endif; ?>
                                                </td><?php endif; ?>
                                                <td><span><?php echo ($vo["cname"]); echo ($vo["qz_area"]); ?></span></td>
                                                <td><?php echo ($vo["wzd"]); ?></td>
                                                <td><?php echo ($vo["mianji"]); ?></td>
                                                <td>
                                                    <?php echo ($vo["tel"]); ?>
                                                    <?php if($vo['phone_repeat_count'] > 1): ?><a title="手机号码重复次数" class="phone-repeat-order red" href="javascript:void(0)" data-id="<?php echo ($vo["id"]); ?>">重<?php echo ($vo['phone_repeat_count'] - 1); ?>
                                                        </a><?php endif; ?>
                                                    <?php if($vo['ip_repeat_count'] > 1): ?><a title="IP重复次数" class="ip-repeat-order" href="javascript:void(0)" data-id="<?php echo ($vo["id"]); ?>">重<?php echo ($vo['ip_repeat_count'] - 1); ?>
                                                        </a><?php endif; ?>
                                                    <?php if(isset($vo["applystatus"])): echo ($vo['applystatus']); ?>
                                                        <?php if($vo['applystatus'] == 1): ?><span class="redcolor repairtel" data-id="<?php echo ($vo["id"]); ?>">修</span>
                                                            <?php else: ?>
                                                            <span class="repairtel" style="color:#008000;cursor:pointer;" data-id="<?php echo ($vo["id"]); ?>">修</span><?php endif; endif; ?>

                                                </td>
                                                <td>
                                                    <?php switch($vo["type_fw"]): case "1": ?>分单<?php break;?>
                                                    <?php case "2": ?>赠单<?php break;?>
                                                    <?php case "3": ?>分没人跟<?php break;?>
                                                    <?php case "4": ?>赠没人跟<?php break;?>
                                                    <?php case "5": ?>待分配分单<?php break;?>
                                                    <?php case "6": ?>待分配赠单<?php break;?>
                                                    <?php default: ?>
                                                    -<?php endswitch;?>
                                                </td>
                                                <?php if($_GET['type'] != 2): ?><td><?php echo ($vo["csos_time"]); ?></td>
                                                <?php else: ?>
                                                <td title="订单对接所用时长:<?php echo ($vo["date_diff"]); ?>"><?php echo (date('Y-m-d H:i:s',$vo["time"])); ?><br/>
                                                <?php if($vo['time_diff'] <= 15): ?><span class="green"><?php echo ($vo["date_diff"]); ?></span>
                                                <?php else: ?>
                                                    <span class="red"><?php echo ($vo["date_diff"]); ?></span><?php endif; ?>
                                                </td><?php endif; ?>
                                                <?php if($_GET['type'] == 2): ?><td ><?php echo ($vo["op_uname"]); ?></td><?php endif; ?>
                                                <td>
                                                    <span class="btn btn-default btn-sm btn-flat btnEdit" data-id="<?php echo ($vo["id"]); ?>">编辑</span>
                                                    <span class="btn btn-default btn-sm btn-flat ml10 tel-history" data-id="<?php echo ($vo["id"]); ?>">呼叫记录</span>
                                                </td>
                                            </tr><?php endforeach; endif; else: echo "" ;endif; ?>
                                        </tbody>
                                    </table>
                                    <?php echo ($page); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--编辑订单模态框-->
    <div class="modal fade my-dialog" id="operate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width: 1400px;">
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
    <div class="modal fade common-model" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 1049; ">
            <div class="modal-dialog" >
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

        <div class="modal fade common-phone" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 1049; ">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×
                        </button>
                        <h4 class="modal-title">记录列表</h4>
                    </div>
                    <div class="modal-body common-model-phone">
                        <table class="table table-bordered table-hover dataTable no-footer" role="grid">
                            <thead>
                                <tr role="row">
                                    <th class="sorting" tabindex="0" aria-controls="myTable">申请人</th>
                                    <th class="sorting" tabindex="0" aria-controls="myTable">修改理由</th>
                                    <th class="sorting" tabindex="0" aria-controls="myTable">申请时间</th>
                                    <th class="sorting" tabindex="0" aria-controls="myTable">审核人</th>
                                    <th class="sorting" tabindex="0" aria-controls="myTable">审核时间</th>
                                    <th class="sorting" tabindex="0" aria-controls="myTable">审核状态</th>
                                    <th class="sorting applyset" tabindex="0" aria-controls="myTable">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr role="row">
                                    <td class="sorting applyname" tabindex="0" aria-controls="myTable">123</td>
                                    <td class="sorting applyreason" tabindex="0" aria-controls="myTable"></td>
                                    <td class="sorting applytime" tabindex="0" aria-controls="myTable"></td>
                                    <td class="sorting passname" tabindex="0" aria-controls="myTable"></td>
                                    <td class="sorting passtime" tabindex="0" aria-controls="myTable"></td>
                                    <td class="sorting applystatus" tabindex="0" aria-controls="myTable"></td>
                                    <td class="sorting applyset" tabindex="0" aria-controls="myTable" data-id=""><span class="adopt">通过</span><span class="noadopt">不通过</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
    
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/datetimepicker/bootstrap-datepicker.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/datetimepicker/bootstrap-datetimepicker.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="/assets/common/js/plugins/zeroclipboard/ZeroClipboard.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="/assets/common/js/plugins/bootstrap-dialog/bootstrap-dialog.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/select2/select2.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script src="<?php echo C('168NEW_URL');?>/assets/home/orders/js/calculator.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript">
    if ($('select[name=timediff]').length > 0) {
        $('select[name=timediff]').select2();
        $('select[name=timediff]').select2("val","<?php echo ($_GET['timediff']); ?>");
    }


    $('select[name=kf]').select2();
    $('select[name=kf]').select2("val","<?php echo ($_GET['kf']); ?>");

    $(".nav-tabs li").eq(<?php echo ((isset($_GET['type']) && ($_GET['type'] !== ""))?($_GET['type']):"1"); ?>-1).addClass('active');
    $('select[name=cs]').select2();
    $('select[name=cs]').select2("val","<?php echo ($_GET['cs']); ?>");

    $('select[name=status]').select2();
    $('select[name=status]').select2("val","<?php echo ($_GET['status']); ?>");

    $('select[name=isactivity]').val('<?php echo ($_GET['isactivity']); ?>' == '' ? 0 : '<?php echo ($_GET['isactivity']); ?>');

    $(".datepicker").datepicker({
        format:"yyyy-mm-dd"
    });

    $(".datetimepicker").datetimepicker({
        weekStart: 1,
        todayHighlight: 1,
        todayBtn:true,
        minView:0,
        autoclose: true
    });

    $("body").on("click",".repairtel",function(){
        var id = $(this).attr("data-id");
        $.ajax({
            url: '/orders/showapplyedit/',
            type: 'POST',
            async:false,
            dataType: 'json',
            data: {id:id}
        })
                .done(function(data) {
                    var info = data.info;
                    if (data.code == 200) {
                        $('.applyname').html(info.applyname);
                        $('.applyreason').html(info.apply_reason);
                        $('.applytime').html(info.apply_time);
                        $('.passname').html(info.passname);
                        $('.passtime').html(info.pass_time);
                        $('.applystatus').html(info.applystatus);
                        $('.applyset').attr('data-id',info.orders_id);

                        if(info.status!=1 || data.data !=1){
                            $('.applyset').hide();
                        }else{
                            $('.applyset').show();
                        }
                        $('.common-phone').modal('show');
                    }else{
                        alert(data.errmsg);
                    }
                });

    })

    //通过
    $("body").on("click",".adopt",function(){
        var id = $(this).parent().attr("data-id");
        changeapply(id,2);
    })

    //不通过
    $("body").on("click",".noadopt",function(){
        var id = $(this).parent().attr("data-id");
        changeapply(id,3);
    })

    function changeapply(id,status){
        $.ajax({
            url: '/orders/changeapplyedit/',
            type: 'POST',
            async:false,
            dataType: 'json',
            data: {id:id,status:status}
        })
                .done(function(data) {
                    if (data.code == 200) {
                        alert("操作成功");
                        $('.common-phone').modal('hide');
                    }else{
                        alert(data.errmsg);
                    }
                });
    }





    $("body").on("click",".btnEdit",function(event) {
        var id = $(this).attr("data-id");
        $.ajax({
            url: '/orders/editDocking/',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id,
                type:<?php echo ($gettype); ?>
            }
        })
        .done(function(data) {
            if (data.code == 200) {
                $('.common-model').modal('hide');
                $("#operate .modal-header span").html("  修改订单  " + data.info.id + " (上次修改  " + data.info.lasttime + "  )   |   实际发布时间:" + data.info.time_real + " |   订单发布完整度：" + data.info.wzd + " %");
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

                    var template = new ZeroClipboard( $("#copy-template") );
                    template.on('copy', function (event) {
                        var copytxt ="";
                        $.ajax({
                            url: '/orders/copytemplate',
                            type: 'POST',
                            async:false,
                            dataType: 'json',
                            data: {tmpid: $("#template").val(),id:$("#copy-template").attr("data-id")}
                        })
                        .done(function(data) {
                            if (data.code == 200) {
                                copytxt = data.data;
                                event.clipboardData.setData('text/plain', copytxt);
                                alert("复制成功");
                            }
                        });
                    });
                });
            } else {
                alert(data.info);
            }
        });
    });

    $("#operate .modal-header em").click(function(event) {
        if (confirm("确定关闭？")) {
            $(".my-dialog").modal("hide");
        }
    });

    $(".nav-tabs li a").click(function(event) {
        $type = $(this).parent().attr("data-id");
        window.location.href = "/orders/docking?type="+$type+"&id="+$("input[name=id]").val()+"&cs="+$("select[name=cs]").val();
    });

    $("#btnSearch").click(function(event) {
        $type = $(".nav-tabs li.active").attr("data-id");
        window.location.href = "/orders/docking?type="+$type+"&id="+$("input[name=id]").val()+"&cs="+$("select[name=cs]").val()+"&begin="+$("input[name=begin]").val()+"&end="+$("input[name=end]").val()+"&status="+$("select[name=status]").val()+"&kf="+$("select[name=kf]").val()+"&timediff="+$("select[name=timediff]").val()+"&isactivity="+$("select[name=isactivity]").val();
    });

    $('.tel-history').click(function(event) {
        var id = $(this).attr('data-id');
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

    /*S-手机号重复订单*/
    $('.phone-repeat-order').click(function(event) {
        var id = $(this).attr('data-id');
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

    /*S-IP重复订单*/
    $('.ip-repeat-order').click(function(event) {
        var id = $(this).attr('data-id');
        var _this = $(this);
        $.ajax({
            url: '/orders/getrepeatorderlistbyip/',
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
                $("#operate .modal-header span").html("  修改订单  " + data.info.id + " (上次修改  " + data.info.lasttime + "  )   |   实际发布时间:" + data.info.time_real + " |   订单发布完整度：" + data.info.wzd + " %");
                $("#operate .modal-body").html(data.data);
                $("#operate").modal({
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

                    var template = new ZeroClipboard( $("#copy-template") );
                    template.on('copy', function (event) {
                        var copytxt ="";
                        $.ajax({
                            url: '/orders/copytemplate',
                            type: 'POST',
                            async:false,
                            dataType: 'json',
                            data: {tmpid: $("#template").val(),id:$("#copy-template").attr("data-id")}
                        })
                        .done(function(data) {
                            if (data.code == 200) {
                                copytxt = data.data;
                                event.clipboardData.setData('text/plain', copytxt);
                                alert("复制成功");
                            }
                        });
                    });
                });
            } else {
                alert(data.info);
            }
        });
    });

    $("#btnreact").click(function(event) {
        $('select[name=cs]').select2("val","");
        $("input[name=id]").val("");
    });
</script>

</body>
</html>