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
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/home/order/css/index.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="/assets/common/js/plugins/bootstrap-dialog/bootstrap-dialog.min.css?v=<?php echo C('STATIC_VERSION');?>">

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
            <li><a href="/order/">订单列表</a></li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-default">
                    <div class="box-body">
                        <div class="row">
                            <form id="search_form" class="form-horizontal" method="get">
                                <div class="col-xs-12">
                                    <div class="col-xs-2 reset-padding">
                                        <div>订单查询：</div>
                                        <input type="text" name="condition" class="form-control clear-target" placeholder="
订单号、IP或电话、小区名称" value="<?php echo ($_GET['condition']); ?>">
                                    </div>
                                    <div class="col-xs-2">
                                        <div>所属区域：</div>
                                        <select id="city" name="city" type="text" placeholder="选择城市" class="form-control">
                                            <option value="0">请选择</option>
                                            <?php if(is_array($city)): $i = 0; $__LIST__ = $city;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["cid"]); ?>"><?php echo ($vo["cname"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                        </select>
                                    </div>
                                    <div class="col-xs-2">
                                        <div>订单状态：</div>
                                        <select name="status" class="form-control" type="text">
                                            <option value="0">请选择</option>
                                            <option value="-1">未量房</option>
                                            <?php if(is_array($backstatus)): $i = 0; $__LIST__ = $backstatus;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo == $_GET['city']): ?><option value="<?php echo ($key); ?>" selected="selected"><?php echo ($vo); ?></option>
                                                    <?php else: ?>
                                                    <option value="<?php echo ($key); ?>"><?php echo ($vo); ?></option><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                                            <option value="-2">已回访</option>
                                        </select>
                                    </div>
                                    <div class="col-xs-2">
                                        <div>订单备注：</div>
                                        <select name="remark" type="text" class="form-control">
                                            <option value="0">请选择备注</option>
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
                                            <?php if(is_array($operaters)): $i = 0; $__LIST__ = $operaters;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["cname"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xs-12 set-mt16">
                                    <button type="submit" id="search" class="btn btn-success col-xs-1">搜索</button>
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
                        <h3 class="box-title">未量房单列表<div class="ques-mark" data-type="ques-mark">?<p>装修公司均反馈未量房的订单</p></div></h3>
                    </div>
                    <div class="call-box clearfix" data-hook="call-flag">
                        <div class="uncall"><span><a href="/CompanyLiangFang?status=-1">当前未回访总数</a></span><span><?php echo ($allCount["statistics"]["no_back"]); ?></span></div>
                        <div class="called"><span><a href="/CompanyLiangFang?status=-2">历史回访总数</a></span><span><?php echo ($allCount["statistics"]["back"]); ?></span></div>
                    </div>
                    <div class="box-body no-padding">
                        <table class="table table-hover table-bordered" id="tablelist">
                            <thead>
                            <tr>
                                <th class="width-150">发布日期</th>
                                <th>订单备注</th>
                                <?php if(in_array(session('uc_userinfo.uid'),$showList)): ?><th>订单类型</th><?php endif; ?>
                                <th>城市区县</th>
                                <th>完整度</th>
                                <th>面积㎡</th>
                                <th>手机号码</th>
                                <th>订单状态</th>
                                <th>订单归属人</th>
                                <th class="width-210">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php if(is_array($list["list"])): $i = 0; $__LIST__ = $list["list"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr>
                                <td><?php echo (date("Y-m-d",$vo["time_real"])); ?></td>
                                <td><?php if($vo["back_remark"] != null): echo ($vo["back_remark"]); if($vo["update_time"] != null): ?>(<span style="color: red"><?php echo (date("Y-m-d H:i",$vo["update_time"])); ?></span>)<?php endif; endif; ?></td>
                                <td><?php echo ($vo["city"]); echo ($vo["area"]); ?></td>
                                <td><?php echo ($vo["wzd"]); ?>%</td>
                                <td><?php echo ($vo["mianji"]); ?></td>
                                <td><?php echo ($vo["tel"]); ?></td>
                                <td><?php echo ($vo["back_status"]); ?></td>
                                <td><?php echo ($vo["op_name"]); ?></td>
                                <td data-id="<?php echo ($vo["orderid"]); ?>">
                                    <a href="javascript:void(0)" class="btn-order-edit">编辑</a>
                                    <?php if($vo["backtel"] != null and $vo["backtel"] != ''): ?><if>
                                            <a href="javascript:void(0)" title="点击查看" class="tel-history" data-id="<?php echo ($vo["orderid"]); ?>">
                                                呼叫记录(<?php echo count(explode(',',$vo['backtel'])) ?>)
                                            </a><?php endif; ?>
                                    </if>
                                </td>
                            </tr><?php endforeach; endif; else: echo "" ;endif; ?>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-xs-12">
                        <?php echo ($list["page"]); ?>
                    </div>
                </div>
            </div>
        </div>
        <!--编辑订单模态框-->
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
    <script src="/assets/common/js/plugins/bootstrap-dialog/bootstrap-dialog.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="/assets/common/js/plugins/zeroclipboard/ZeroClipboard.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script>
        $(document).ready(function() {
            /*S-当前未拨总数及历史拨打总数样式标记*/
            var status = "<?php echo ($_GET['status']); ?>",
                $callFlag = $("div[data-hook='call-flag']");
            if( status == -2 ){
                $callFlag.find(".called>span:first-child").addClass("active")
            }else if( status == -1 ){
                $callFlag.find(".uncall>span:first-child").addClass("active")
            }
            /*E-当前未拨总数及历史拨打总数样式标记*/
            /*S-初始化插件*/
            $('#city').select2();
            $('#op_uid').select2();
            $('#op_uid').select2("val","<?php echo ($_GET['op_uid']); ?>");
            $('#city').select2("val","<?php echo ($_GET['city']); ?>");

            $('.datepicker').datepicker({
                autoclose: true,
                format: 'yyyy-mm-dd'
            });
            /*E-初始化插件*/
            /*S-初始化筛选条件*/
            $("select[name=city]").select2('val', '<?php echo ($_GET['city']); ?>' == '' ? 0 : '<?php echo ($_GET['city']); ?>');
            $("select[name=status]").val('<?php echo ($_GET['status']); ?>' == '' ? 0 : '<?php echo ($_GET['status']); ?>');
            $('select[name=remarks]').val('<?php echo ($_GET['remarks']); ?>' == '' ? "全部" : '<?php echo ($_GET['remarks']); ?>');
            $('select[name=displaynumber]').val('<?php echo ($_GET['displaynumber']); ?>' == '' ? 0 : '<?php echo ($_GET['displaynumber']); ?>');
            /*E-初始化筛选条件*/

            /*S-重置搜索条件*/
            $('#reset').on('click', function() {
                clearSearchCondition();
                $('select[name=status]').removeAttr('disabled');
            });
            /*E-重置搜索条件*/

            /*S-订单状态为回访失败或无效时订单备注选项切换*/
            var html = '<option value="0">请选择备注</option>';
            var backremarkfalse = <?php echo ($backremarkfalse); ?>;
            var backremarkbust = <?php echo ($backremarkbust); ?>;
            $("select[name=status]").on("change", function () {
                html = '<option value="0">请选择备注</option>';
                if (this.value == 5) {
                    //无效
                    for (var k in backremarkfalse) {
                        html += '<option value="' + k + '">' + backremarkfalse[k] + '</option>';
                    }
                } else if (this.value == 4) {
                    //回访失败
                    for (var k in backremarkbust) {
                        html += '<option value="' + k + '">' + backremarkbust[k] + '</option>';
                    }
                }
                $("select[name=remark]").html(html);
            });
            //订单备注回显操作
            if ('<?php echo ($_GET["status"]); ?>' == 5) {
                //无效
                for (var k in backremarkfalse) {
                    if('<?php echo ($_GET["remark"]); ?>' == k){
                        html += '<option value="' + k + '" selected>' + backremarkfalse[k] + '</option>';
                    }else {
                        html += '<option value="' + k + '">' + backremarkfalse[k] + '</option>';
                    }
                }
                $("select[name=remark]").html(html);
            } else if (this.value == 4) {
                //回访失败
                for (var k in backremarkbust) {
                    if('<?php echo ($_GET["remark"]); ?>' == k){
                        html += '<option value="' + k + '" selected>' + backremarkbust[k] + '</option>';
                    }else {
                        html += '<option value="' + k + '">' + backremarkbust[k] + '</option>';
                    }
                }
                $("select[name=remark]").html(html);
            }
            /*E-订单状态为回访失败或无效时订单备注选项切换*/

            /*S-呼叫记录查看*/
            $('.tel-history').click(function(event) {
                var id = $(this).attr('data-id');
                var _this = $(this);
                $.ajax({
                    url: '/voip/voiprecord/',
                    type: 'GET',
                    dataType: 'JSON',
                    data: {
                        id: id,'callback':1
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

            /*S-清空筛选条件*/
            function clearSearchCondition() {
                $('.clear-target').val('');
                $("select[name=city]").select2('val', '0');
                $("select[name=status]").val('0');
                $('select[name=remarks]').val('全部');
                $('select[name=displaynumber]').val('0');
                $('.ol-tab').removeClass('ol-tab-active');
            }
            /*E-清空筛选条件*/


            $("body").on("click",".btn-order-edit",function(event) {
                var id = $(this).parent().attr("data-id");
                $.ajax({
                    url: '/CompanyLiangFang/operate/',
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
                            alert(data.info);
                        }
                    });
            });

            $("#myModel .modal-header em").click(function(event) {
                if (confirm("确定关闭？")) {
                    $(".my-dialog").modal("hide");
                }
            });
        });
    </script>
    <?php if(($main["auth"]["turnorder"]) == "1"): ?><script src="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/cxselect/jquery.cxselect.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
        <script>
            $(document).ready(function() {
                /*S-转单插件初始化*/
                //城区数据获取，不点击按钮则不获取
                var cityDate = false;
                var cxSelectApi = $.cxSelect($('.city-change-select'), {
                    selects: ['province', 'city', 'area'],
                    jsonValue: 'id',
                    jsonName: 'text', // 数据标题字段名称
                    jsonSub: 'children', // 子集数据字段名称
                });
                $('.change-city').click(function(event) {
                    var id = $(this).attr('data-id');
                    var city = $(this).attr('data-city');
                    var area = $(this).attr('data-area');
                    $('#changecity').find('input[name=orderid]').val(id);
                    $('#changecity').find('input[name=cityarea]').val(city + '-' + area);
                    if (cityDate == false) {
                        $.ajax({
                            url: '/city/getcityforcxselect/',
                            type: 'GET',
                            dataType: 'JSON'
                        })
                            .done(function(data) {
                                if (data.status == '1') {
                                    cityDate = data.data;
                                    cxSelectApi.setOptions({
                                        data: JSON.parse(cityDate)
                                    });
                                    $('#changecity').modal('show');
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
                    } else {
                        $('#changecity').modal('show');
                    }
                });
                /*E-转单插件初始化*/
            })
        </script><?php endif; ?>
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
    <script>
        // 未量房订单列表说明标签
        $(function () {
            var $quesMark = $("div[data-type='ques-mark']"),
                $introBox = $quesMark.find("p");
            $quesMark.on("click",function (event) {
                event.stopPropagation();
                $introBox.toggle();
            });
            $(document).on('click',function () {
                $introBox.fadeOut();
            });
        })
    </script>

</body>
</html>