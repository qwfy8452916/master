<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    
    <title>客服量房统计-控制台</title>

    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/bootstrap/css/bootstrap.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/AdminLTE.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/skins/_all-skins.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/global.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/fileinput/fileinput.min.css?v=<?php echo C('STATIC_VERSION');?>" />
    <link href="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/datetimepicker/datetimepicker.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />
    <script src="<?php echo C('168NEW_URL');?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>" type="text/javascript"></script>
    
    <link rel="stylesheet" type="text/css" href="/assets/common/js/plugins/datetimepicker/datepicker.css?v=<?php echo C('STATIC_VERSION');?>" />
    <link rel="stylesheet" type="text/css" href="/assets/common/js/plugins/select2/select2.css?v=<?php echo C('STATIC_VERSION');?>" />
    <link rel="stylesheet" type="text/css" href="/assets/home/css/customerlfstat.css?v=<?php echo C('STATIC_VERSION');?>" />
    <link href="/assets/common/phpexcel/phpexcel.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet">
    <link href="/assets/common/phpexcel/handsontable.full.min.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/assets/common/js/plugins/dataTables/dataTables.bootstrap.min.css?v=<?php echo C('STATIC_VERSION');?>" />

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
        <h1>客服量房考核统计</h1>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="row">
                        <div class="col-xs-12">
                            <ul class="fendan-statistics">
                                <li data-tab='1'>按人统计</li>
                                <li data-tab='2'>按组统计</li>
                                <li data-tab='3'>按师统计</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12" id="tab1">
                <div class="box" style="padding-bottom:20px;">
                    <div class="box-header">
                        <form action="/orderstat/customerlfstat" method="get">
                            <div class="col-xs-2">
                                <div>客服姓名</div>
                                <select id="kfList" name="kf" class="form-control select2">
                                    <option value="">选择客服</option>
                                    <?php if(is_array($users)): $i = 0; $__LIST__ = $users;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["name"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                </select>
                            </div>
                            <div class="col-xs-2">
                                <div>客服组</div>
                                <select id="groups" name="groups" class="form-control select2">
                                    <option value="">选择客服组</option>
                                    <?php if(is_array($group["groups"])): $i = 0; $__LIST__ = $group["groups"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["kfgroup"]); ?>"><?php echo ($vo["name"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                </select>
                            </div>
                            <div class="col-xs-2">
                                <div>查询时间-开始:</div>
                                <input type="text" name="begin" class="form-control datepicker" placeholder="选择日期" value="<?php echo ($_GET['begin']); ?>" autocomplete="off">
                            </div>
                            <div class="col-xs-2">
                                <div>查询时间-结束:</div>
                                <input type="text" name="end" class="form-control datepicker" placeholder="选择日期" value="<?php echo ($_GET['end']); ?>" autocomplete="off">
                            </div>
                            <div class="col-xs-2">
                                <button type="button" class="research-btn">查询</button>
                                <button type="button" class="daochu-btn export" data-tab="1">导出</button>
                                <input type="hidden" name="index" value="1" />
                            </div>
                        </form>
                    </div>
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover table-bordered">
                            <thead>
                            <tr>
                                <th>客服人员</th>
                                <th>客服组</th>
                                <th>发单量</th>
                                <th>分单量</th>
                                <th>赠单量</th>
                                <th>分-已量房</th>
                                <th>分-未量房</th>
                                <th>赠-已量房</th>
                                <th>赠-未量房</th>
                            </tr>
                            </thead>
                            <tbody>
                                <?php if(is_array($list["users"])): $i = 0; $__LIST__ = $list["users"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr>
                                    <td><?php echo ($vo["name"]); ?></td>
                                    <td><?php echo ($vo["kfgroup"]); ?></td>
                                    <td><?php echo ((isset($vo["all"]) && ($vo["all"] !== ""))?($vo["all"]):0); ?></td>
                                    <td><?php echo ((isset($vo["fen"]) && ($vo["fen"] !== ""))?($vo["fen"]):0); ?></td>
                                    <td><?php echo ((isset($vo["zen"]) && ($vo["zen"] !== ""))?($vo["zen"]):0); ?></td>
                                    <td><?php echo ((isset($vo["fen_lf_count"]) && ($vo["fen_lf_count"] !== ""))?($vo["fen_lf_count"]):0); ?></td>
                                    <td><?php echo ((isset($vo["fen_un_lf_count"]) && ($vo["fen_un_lf_count"] !== ""))?($vo["fen_un_lf_count"]):0); ?></td>
                                    <td><?php echo ((isset($vo["zen_lf_count"]) && ($vo["zen_lf_count"] !== ""))?($vo["zen_lf_count"]):0); ?></td>
                                    <td><?php echo ((isset($vo["zen_un_lf_count"]) && ($vo["zen_un_lf_count"] !== ""))?($vo["zen_un_lf_count"]):0); ?></td>
                                </tr><?php endforeach; endif; else: echo "" ;endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-xs-12" id="tab2">
                <div class="box" style="padding-bottom:20px;">
                    <div class="box-header">
                        <form action="/orderstat/customerlfstat/" method="get">
                            <div class="col-xs-2">
                                <div>客服组</div>
                                <select id="groups2" name="groups" class="select2 form-control" style="width: 100%">
                                    <option value="">选择客服组</option>
                                    <?php if(is_array($group["groups"])): $i = 0; $__LIST__ = $group["groups"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["kfgroup"]); ?>"><?php echo ($vo["name"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                </select>
                            </div>
                            <div class="col-xs-2">
                                <div>客服师</div>
                                <select id="manager" name="manager" class="select2 form-control" style="width: 100%">
                                    <option value="">选择师长</option>
                                    <?php if(is_array($group["manager"])): $i = 0; $__LIST__ = $group["manager"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["name"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                </select>
                            </div>
                            <div class="col-xs-2">
                                <div>查询时间-开始:</div>
                                <input type="text" name="begin" class="form-control datepicker" placeholder="选择日期" value="<?php echo ($_GET['begin']); ?>" autocomplete="off">
                            </div>
                            <div class="col-xs-2">
                                <div>查询时间-结束:</div>
                                <input type="text" name="end" class="form-control datepicker" placeholder="选择日期" value="<?php echo ($_GET['end']); ?>" autocomplete="off">
                            </div>
                            <div class="col-xs-2">
                                <button type="submit" class="research-btn">查询</button>
                                <button type="button" class="daochu-btn export" data-tab="2">导出</button>
                                <input type="hidden" name="index" value="2" />
                            </div>
                        </form>
                    </div>
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover table-bordered">
                            <thead>
                            <tr>
                                <th>客服组</th>
                                <th>客服师</th>
                                <th>发单量</th>
                                <th>分单量</th>
                                <th>赠单量</th>
                                <th>分-已量房</th>
                                <th>分-未量房</th>
                                <th>赠-已量房</th>
                                <th>赠-未量房</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php if(is_array($list["group"])): $i = 0; $__LIST__ = $list["group"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr>
                                <td><?php echo ($key); ?></td>
                                <td><?php echo ($vo["manager"]); ?></td>
                                <td><?php echo ((isset($vo["all"]) && ($vo["all"] !== ""))?($vo["all"]):0); ?></td>
                                <td><?php echo ((isset($vo["fen"]) && ($vo["fen"] !== ""))?($vo["fen"]):0); ?></td>
                                <td><?php echo ((isset($vo["zen"]) && ($vo["zen"] !== ""))?($vo["zen"]):0); ?></td>
                                <td><?php echo ((isset($vo["fen_lf_count"]) && ($vo["fen_lf_count"] !== ""))?($vo["fen_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($vo["fen_un_lf_count"]) && ($vo["fen_un_lf_count"] !== ""))?($vo["fen_un_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($vo["zen_lf_count"]) && ($vo["zen_lf_count"] !== ""))?($vo["zen_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($vo["zen_un_lf_count"]) && ($vo["zen_un_lf_count"] !== ""))?($vo["zen_un_lf_count"]):0); ?></td>
                            </tr><?php endforeach; endif; else: echo "" ;endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-xs-12" id="tab3">
                <div class="box" style="padding-bottom:20px;">
                    <div class="box-header">
                        <form action="/orderstat/customerlfstat/" method="get">
                            <div class="col-xs-2">
                                <div>客服师</div>
                                <select id="manager2" name="manager" class="select2 form-control"style="width:100%" >
                                    <option value="">选择师长</option>
                                    <?php if(is_array($group["manager"])): $i = 0; $__LIST__ = $group["manager"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["id"]); ?>"><?php echo ($vo["name"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                                </select>
                            </div>
                            <div class="col-xs-2">
                                <div>查询时间-开始:</div>
                                <input type="text" name="begin" class="form-control datepicker" placeholder="选择日期" value="<?php echo ($_GET['begin']); ?>" autocomplete="off">
                            </div>
                            <div class="col-xs-2">
                                <div>查询时间-结束:</div>
                                <input type="text" name="end" class="form-control datepicker" placeholder="选择日期" value="<?php echo ($_GET['end']); ?>" autocomplete="off">
                            </div>
                            <div class="col-xs-2">
                                <button type="submit" class="research-btn">查询</button>
                                <button type="button" class="daochu-btn export" data-tab="3">导出</button>
                                <input type="hidden" name="index" value="3" />
                            </div>
                        </form>
                    </div>
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover table-bordered">
                            <thead>
                            <tr>
                                <th>客服组数</th>
                                <th>负责人</th>
                                <th>发单量</th>
                                <th>分单量</th>
                                <th>赠单量</th>
                                <th>分-已量房</th>
                                <th>分-未量房</th>
                                <th>赠-已量房</th>
                                <th>赠-未量房</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php if(is_array($list["manager"])): $i = 0; $__LIST__ = $list["manager"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if(is_array($vo["child"])): $i = 0; $__LIST__ = $vo["child"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><tr>
                                <td><?php echo ($v["name"]); ?></td>
                                <td><?php echo ($vo["name"]); ?></td>
                                <td><?php echo ((isset($v["all"]) && ($v["all"] !== ""))?($v["all"]):0); ?></td>
                                <td><?php echo ((isset($v["fen"]) && ($v["fen"] !== ""))?($v["fen"]):0); ?></td>
                                <td><?php echo ((isset($v["zen"]) && ($v["zen"] !== ""))?($v["zen"]):0); ?></td>
                                <td><?php echo ((isset($v["fen_lf_count"]) && ($v["fen_lf_count"] !== ""))?($v["fen_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($v["fen_un_lf_count"]) && ($v["fen_un_lf_count"] !== ""))?($v["fen_un_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($v["zen_lf_count"]) && ($v["zen_lf_count"] !== ""))?($v["zen_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($v["zen_un_lf_count"]) && ($v["zen_un_lf_count"] !== ""))?($v["zen_un_lf_count"]):0); ?></td>
                            </tr><?php endforeach; endif; else: echo "" ;endif; ?>
                                <tr>
                                <td>汇总</td>
                                <td><?php echo ($vo["name"]); ?></td>
                                <td><?php echo ((isset($vo["all"]) && ($vo["all"] !== ""))?($vo["all"]):0); ?></td>
                                <td><?php echo ((isset($vo["fen"]) && ($vo["fen"] !== ""))?($vo["fen"]):0); ?></td>
                                <td><?php echo ((isset($vo["zen"]) && ($vo["zen"] !== ""))?($vo["zen"]):0); ?></td>
                                <td><?php echo ((isset($vo["fen_lf_count"]) && ($vo["fen_lf_count"] !== ""))?($vo["fen_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($vo["fen_un_lf_count"]) && ($vo["fen_un_lf_count"] !== ""))?($vo["fen_un_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($vo["zen_lf_count"]) && ($vo["zen_lf_count"] !== ""))?($vo["zen_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($vo["zen_un_lf_count"]) && ($vo["zen_un_lf_count"] !== ""))?($vo["zen_un_lf_count"]):0); ?></td>
                                </tr><?php endforeach; endif; else: echo "" ;endif; ?>
                            <tr>
                                <td>总计</td>
                                <td>-</td>
                                <td><?php echo ((isset($list["all"]["all"]) && ($list["all"]["all"] !== ""))?($list["all"]["all"]):0); ?></td>
                                <td><?php echo ((isset($list["all"]["fen"]) && ($list["all"]["fen"] !== ""))?($list["all"]["fen"]):0); ?></td>
                                <td><?php echo ((isset($list["all"]["zen"]) && ($list["all"]["zen"] !== ""))?($list["all"]["zen"]):0); ?></td>
                                <td><?php echo ((isset($list["all"]["fen_lf_count"]) && ($list["all"]["fen_lf_count"] !== ""))?($list["all"]["fen_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($list["all"]["fen_un_lf_count"]) && ($list["all"]["fen_un_lf_count"] !== ""))?($list["all"]["fen_un_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($list["all"]["zen_lf_count"]) && ($list["all"]["zen_lf_count"] !== ""))?($list["all"]["zen_lf_count"]):0); ?></td>
                                <td><?php echo ((isset($list["all"]["zen_un_lf_count"]) && ($list["all"]["zen_un_lf_count"] !== ""))?($list["all"]["zen_un_lf_count"]):0); ?></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="box zhushi">
                    <div class="row">
                        <div class="col-xs-12">
                            <h4>注释：</h4>
                            <p>分-已量房：1个分单分配的装修公司中有1家公司点击已量房/到店/见面/签约；</p>
                            <p>赠-已量房：1个赠单分配的装修公司中有1家公司点击已量房/到店/见面/签约；</p>
                            <p>分-未量房：1个分单分配4家公司，至少有3家公司点击未量房；分配3家公司，至少有2家公司点击未量房；分配2家公司2家都点击未量房，分配1家公司1家点击未量房。</p>
                            <p>赠-未量房：1个赠单分配4家公司，至少有3家公司点击未量房；分配3家公司，至少有2家公司点击未量房；分配2家公司2家都点击未量房，分配1家公司1家点击未量房。</p>
                            <p class="red">注：若1个订单点击未量房公司数量满足，但至少有1家点击已量房/到店/见面/签约，则计入到已量房订单里</p>
                            <p>计算次数：1个订单被点击多次，只计算1次；例：1个订单既被点击已量房，也被点击已到店/见面，在该归属客服名下只计算1次。</p>
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" class="vid">
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
    
    <script type="text/javascript" src="/assets/common/js/plugins/datetimepicker/bootstrap-datepicker.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/plugins/select2/select2.full.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="/assets/common/phpexcel/handsontable.full.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script src="/assets/common/phpexcel/phpexcel.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript" src="/assets/common/js/plugins/dataTables/jquery.dataTables.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
    <script type="text/javascript">
        $(function() {
            $('.datepicker').datepicker({
                autoclose: true,
                format: 'yyyy-mm-dd'
            });

            $(".select2").select2({
                allowClear: true,
                placeholder: "请选择"
            });
            $("select[name=kf]").val("<?php echo ($_GET['kf']); ?>").trigger('change');
            $("#groups").val("<?php echo ($_GET['groups']); ?>").trigger('change');
            $("#groups2").val("<?php echo ($_GET['groups']); ?>").trigger('change');
            $("#manager").val("<?php echo ($_GET['manager']); ?>").trigger('change');
            $("#manager2").val("<?php echo ($_GET['manager']); ?>").trigger('change');

            $('.fendan-statistics li').on('click', function() {
                var index = $(this).index();
                $("input[type=text]").val("");
                $('.fendan-statistics li').removeClass('activity');
                $(this).addClass('activity');
                $("#tab1,#tab2,#tab3").hide();
                $('#tab'+(index+1)).show();
            });
            $('.fendan-statistics li').eq(<?php echo ((isset($_GET['index']) && ($_GET['index'] !== ""))?($_GET['index']):1); ?>-1).trigger('click');
        });


        $("body").on("click",".research-btn",function () {
            var parent = $(this).parents("form");
            var begin = parent.find("input[name=begin]").val();
            var end = parent.find("input[name=end]").val();

            if ( (end == "" && begin != "") ||  toTimeStamp(begin) > toTimeStamp(end)) {
                alert("结束时间不能小于开始时间");
                return false;
            }

            parent.submit();
        });

        function toTimeStamp(time){
            if(time!=undefined){
                var date = time;
                date = date.substring(0,19);
                date = date.replace(/-/g,'/');
                var timestamp = new Date(date).getTime();
                return timestamp;
            }
        }

        $(".export").click(function(event) {
             var _this = $(this);
             var tab =  _this.attr("data-tab");
             var taget = $("#tab"+tab+" table");
             var colums = [];
             var data = [];
             taget.find("th").each(function() {
                    var text = $(this).text().trim();
                    var sub = [];
                    sub["text"] = text;
                    sub["fontColor"] = $(this).css("color");
                    sub["bgColor"] = $(this).css("background-color");
                    colums.push(sub);
             });
             data.push(colums);
             taget.find("tbody tr").each(function(i) {
                    var tr = $(this);
                    var sub = [];
                    tr.find("td").each(function() {
                        var text = $(this).text().trim();
                        var _td = {
                            text: text,
                            fontColor: $(this).css("color"),
                            bgColor: $(this).css("background-color")
                        }
                        sub.push(_td);
                    });
                    data.push(sub);
            });

             _this.exportExcel({
                    data: data,
                    title: "客服量房统计",
                    url: "/export/download",
                    show:false
             });
        });
    </script>

</body>
</html>