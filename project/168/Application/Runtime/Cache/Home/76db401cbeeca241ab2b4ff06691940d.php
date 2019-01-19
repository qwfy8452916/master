<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    
    <title>地图标注 - 控制台</title>

    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/bootstrap/css/bootstrap.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/font-awesome.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/AdminLTE.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/skins/_all-skins.min.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/css/global.css?v=<?php echo C('STATIC_VERSION');?>">
    <link rel="stylesheet" href="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/fileinput/fileinput.min.css?v=<?php echo C('STATIC_VERSION');?>" />
    <link href="<?php echo C('168NEW_URL');?>/assets/common/js/plugins/datetimepicker/datetimepicker.css?v=<?php echo C('STATIC_VERSION');?>" rel="stylesheet" />
    <script src="<?php echo C('168NEW_URL');?>/assets/common/js/jquery.min.js?v=<?php echo C('STATIC_VERSION');?>" type="text/javascript"></script>
    
<link rel="stylesheet" type="text/css" href="/assets/common/css/select2_metro.css?v=<?php echo C('STATIC_VERSION');?>" />
<style type="text/css">
    label.BMapLabel{max-width: 200px !important;}
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
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">地图标注</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <div class="col-sm-2">
                    城市:
                    <br/>
                    <select id="city" name="city" >
                        <option value="">-请选择-</option>
                        <?php if(is_array($citys)): $i = 0; $__LIST__ = $citys;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["cid"]); ?>"><?php echo ($vo["cname"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                    </select>
                </div>
                <label class="col-sm-6 label-control" style="text-align: left; font-size: 20px;">
                    <br/>此地图仅供客服和销售标注装修公司位置，如果要查看订单位置，请直接百度地图
                </label>
                <div class="col-sm-3 pull-right">
                    <br/>
                    <button id="tack" type="button" class="btn btn-primary"><i class="fa fa-thumb-tack"></i> &nbsp;测距</button>
                    <button id="marker" type="button" class="btn btn-primary"><i class="fa fa-map-marker"></i> &nbsp;标记</button>
                </div>
            </div>
        </div>
        <div class="box-body">
            <div id="container" class="col-sm-9" style="height: 600px;">

            </div>
            <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">公司列表</div>
                <ul class="list-group">
                    <?php if(is_array($companys)): $i = 0; $__LIST__ = $companys;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li class="list-group-item"><?php echo ($vo["companies"]); ?>(<?php echo ($vo["lng"]); ?>,<?php echo ($vo["lat"]); ?>) - <?php echo ($vo["last_modified_by"]); ?></li><?php endforeach; endif; else: echo "" ;endif; ?>
                </ul>
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
    
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.3"></script>
<script type="text/javascript" src="/assets/common/js/plugins/baidu/DistanceTool_min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/plugins/baidu/EventWrapper.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/plugins/baidu/MarkerTool.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript" src="/assets/common/js/plugins/baidu/\MapBaidu.js?r=2"></script>
<script type="text/javascript" src="/assets/common/js/select2.min.js?v=<?php echo C('STATIC_VERSION');?>"></script>
<script type="text/javascript">
    var map = MapBaidu('container', '<?php echo ($city); ?>');
    $("#city").select2({
        allowClear: true,
        placeholder: "选择城市"
    }).on("change",function(evt){
        window.location.href = "/map/mapmarker?city="+evt.val;
    });
    $("#city").select2("val","<?php echo ($cityId); ?>");

    var companys =<?php echo (json_encode($json_companys)); ?>;
    if (companys.length > 0) {
        //添加标注
        for(var i in companys){
            var pt  = new BMap.Point(companys[i]['lng'], companys[i]['lat']);
            map.mark(pt, companys[i]['companies'],
                        companys[i]['address'], companys[i]['id']);
        }
    };

    $("#tack").click(function(event) {
        map.startDis();
    });

    $("#marker").click(function(event) {
        map.startMark();
    });

    var ancestor    = {
        delMark:    MapBaidu.fn.delMark,
        saveMark:   MapBaidu.fn.saveMark
    };

    MapBaidu.fn.delMark     = function(point, id) {
        var _this  = this;
        if (!id){
            return  ancestor.delMark.call(_this, point);
        }

        $.ajax({
            url: '/map/delmarker',
            type: 'POST',
            dataType: 'JSON',
            data: {id:id},
        })
        .done(function(data) {
            if (data.code == 200) {
                ancestor.delMark.call(_this, point);
                window.location.href = window.location.href;
            } else {
                alert(data.errmsg);
            }
        });
    }

    MapBaidu.fn.saveMark    = function(point, data) {
        var me  = this;
        data['cityid'] = $("#city").select2().val();
        $.ajax({
            url: '/map/addmarker',
            type: 'POST',
            dataType: 'JSON',
            data: data
        })
        .done(function(data) {
            if (data.code == 200) {
                ancestor.saveMark.call(me, point, data);
                window.location.href = window.location.href;
            } else {
                alert(data.errmsg);
            }
        });
    }
</script>

</body>
</html>