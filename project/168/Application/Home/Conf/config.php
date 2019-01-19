<?php
return array(
    //'配置项'=>'配置值'
    //文件上传七牛配置
    'UPLOAD_IMG_QINIU'    =>    array(
            'maxSize'  => 10 * 1024 * 1024,//文件大小
            'rootPath' => './',
            'saveName' => '',
            'driver'   => 'Qiniu',
            'exts'     => array("jpg","jpeg","png","gif"),
            'driverConfig'   => array (
                'secretKey' => '',
                'accessKey'  => '',
                'domain'     => '',
                'bucket'     => ''
            )
    ),

    'UPLOAD_FILE_QINIU'    =>    array(
            'maxSize'  => 10 * 1024 * 1024,//文件大小
            'rootPath' => './',
            'saveName' => '',
            'driver'   => 'Qiniu',
            'exts'     => array("txt","zip","doc","docx","xls","xlsx"),
            'driverConfig'   => array (
                'secretKey' => '',
                'accessKey'  => '',
                'domain'     => '',
                'bucket'     => ''
            )
    ),
    //路由配置
    'URL_ROUTER_ON'   => true,
    'URL_ROUTE_RULES'=>array(
        "meitu/location"=>array("Meitu/attribute",array('attribute' => 'location')),//
        "meitu/huxing"=>array("Meitu/attribute",array('attribute' => 'huxing')),//
        "meitu/fengge"=>array("Meitu/attribute",array('attribute' => 'fengge')),//
        "meitu/color"=>array("Meitu/attribute",array('attribute' => 'color')),//
        "/fdlink"=>array("Fdlink/index"),

        /** 路由 联通云总机 应用服务器的回调 **/
        "callreq"       => array("Apicuct/callreq"), //呼叫请求、鉴权或被叫查询回调
        "callestablish" => array("Apicuct/callestablish"), //呼叫建立通知回调
        "keyfeedback"   => array("Apicuct/keyfeedback"), //呼叫过程按键反馈
        "callhangup"    => array("Apicuct/callhangup"), //呼叫失败或挂机计费通知
        "voicecode"     => array("Apicuct/voicecode"), //语音验证码状态通知接口
        "voicenotify"   => array("Apicuct/voicenotify"), //语音通知状态通知回调
        'consult/deal$'=>array('Vip/addDealRecord','',array('method'=>'post')),//装修公司咨询处理记录录入接口


    ),

    'ALL_CITY_MANAGER' => array('1','37','51'),
);