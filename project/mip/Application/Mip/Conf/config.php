<?php
/**
 * 配置表
 */
return array(
    //'配置项'=>'配置值'

    //定义mip访问 域名
    'MIP_DONAMES' => 'mip.qizuang.com',
    'URL_ROUTER_ON'   => true,
    'URL_ROUTE_RULES'=>array(
//        "meitu/list" =>  array("Meitu/meituList"),
//        "meitu/sheji" => array("Meitu/meituSheji"),
        "details" =>array("Meitu/result"),
        'gonglue/xcdg$' =>array("Gonglue/xcdg"),
        'gonglue/lc' =>array("Gonglue/zxstep"),

        "city" => array("Index/city"),

        //收房验收路由
        "gonglue/shoufang$"=>array("Gonglue/zxlclist",array("category"=>"shoufang","type"=>"1")),
        "/^gonglue\/list\-shoufang\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"shoufang","type"=>"1"),
            array('ext'=>'html')
        ),

        //找公司路由
        "gonglue/gongsi$"=>array("Gonglue/zxlclist",array("category"=>"gongsi","type"=>"1")),
        "/^gonglue\/list\-gongsi\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"gongsi","type"=>"1"),
            array('ext'=>'html')
        ),

        //设计预算路由
        "gonglue/shejiyusuan$"=>array("Gonglue/zxlclist",array("category"=>"shejiyusuan","type"=>"1")),
        "/^gonglue\/list\-shejiyusuan\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"shejiyusuan","type"=>"1"),
            array('ext'=>'html')
        ),

        //装修选材路由
        "gonglue/xuancai$"=>array("Gonglue/zxlclist",array("category"=>"xuancai","type"=>"1")),
        "/^gonglue\/list\-xuancai\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"xuancai","type"=>"1"),
            array('ext'=>'html')
        ),

        //施工阶段 拆改路由
        "gonglue/chagai$"=>array("Gonglue/zxlclist",array("category"=>"chagai","type"=>"2")),
        "/^gonglue\/list\-chagai\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"chagai","type"=>"2"),
            array('ext'=>'html')
        ),

        //施工阶段 水电路由
        "gonglue/shuidian$"=>array("Gonglue/zxlclist",array("category"=>"shuidian","type"=>"2")),
        "/^gonglue\/list\-shuidian\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"shuidian","type"=>"2"),
            array('ext'=>'html')
        ),

        //施工阶段 防水路由
        "gonglue/fangshui$"=>array("Gonglue/zxlclist",array("category"=>"fangshui","type"=>"2")),
        "/^gonglue\/list\-fangshui\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"fangshui","type"=>"2"),
            array('ext'=>'html')
        ),

        //施工阶段 泥瓦路由
        "gonglue/niwa$"=>array("Gonglue/zxlclist",array("category"=>"niwa","type"=>"2")),
        "/^gonglue\/list\-niwa\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"niwa","type"=>"2"),
            array('ext'=>'html')
        ),

        //施工阶段 木工路由
        "gonglue/mugong$"=>array("Gonglue/zxlclist",array("category"=>"mugong","type"=>"2")),
        "/^gonglue\/list\-mugong\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"mugong","type"=>"2"),
            array('ext'=>'html')
        ),

        //施工阶段 油漆路由
        "gonglue/youqi$"=>array("Gonglue/zxlclist",array("category"=>"youqi","type"=>"2")),
        "/^gonglue\/list\-youqi\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"youqi","type"=>"2"),
            array('ext'=>'html')
        ),

        //入住阶段 检测路由
        "gonglue/jianche$"=>array("Gonglue/zxlclist",array("category"=>"jianche","type"=>"3")),
        "/^gonglue\/list\-jianche\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"jianche","type"=>"3"),
            array('ext'=>'html')
        ),

        //入住阶段 配饰路由
        "gonglue/peishi$"=>array("Gonglue/zxlclist",array("category"=>"peishi","type"=>"3")),
        "/^gonglue\/list\-peishi\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"peishi","type"=>"3"),
            array('ext'=>'html')
        ),

        //入住阶段 保养路由
        "gonglue/baoyang$"=>array("Gonglue/zxlclist",array("category"=>"baoyang","type"=>"3")),
        "/^gonglue\/list\-baoyang\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"baoyang","type"=>"3"),
            array('ext'=>'html')
        ),

        //入住阶段 家居生活
        "gonglue/jjsh$"=>array("Gonglue/zxlclist",array("category"=>"jjsh","type"=>"3")),
        "/^gonglue\/list\-jjsh\-([1-9]\d*)$/"=>array(
            "Gonglue/zxlclist",
            array("category"=>"jjsh","type"=>"3"),
            array('ext'=>'html')
        ),

        //选材导购
        "gonglue/xcdg$"=>array("Gonglue/xcdg",array("category"=>"xcdg")),//seo需求-选材导购-new
        "/^gonglue\/list\-xcdg\-([1-9]\d*)$/"=>array(
            "Gonglue/xcdg",
            array("category"=>"xcdg"),
            array('ext'=>'html')
        ),

        //装修选材导购，要放到下面的路由前面
        "/^gonglue\/list\-([a-zA-Z]+)\-([1-9]\d*)$/"=>array(
            "Mip/Gonglue/lclist?category=:1",
            "",
            array('ext'=>'html')
        ),

        "gonglue/:category$"=>array("Gonglue/lclist"),

        "gonglue/:category/:id" => array("Gonglue/artcile"), //文章详细页路由

        'hl$' =>  array("Huangli/zxhl"),



        //美图,装修公司模块路由
        "^company\/p\/(\d+)$"           =>  array("Company/index?p=:1"),
        ":bm/company_team/:id"          =>  array("Company/company_team"),
        ":bm/company_home/:id"          =>  array("Company/company_home"),
        ":bm/company_case/:id"          =>  array("Company/company_case"),
        ":bm/company_message/:id"       =>  array("Company/company_message"), //移动版装修公司评论页面
        ":bm/blog/:id"                  =>  array("Blog/index"), //移动版设计师博客页
        ":bm/company"                   =>  array("Company/index"),
        "company"                       =>  array("Company/index"),
        ":bm/caseinfo/:id"              =>  array("case/caseinfo"), //移动版装修公司案例页路由
        'meitu$'						=>	array("Meitu/index"),//美图列表路由
        '/^meitu\/p(\d+)$/'				=>	array("Meitu/meituDetails?p=:1",'',array('ext'=>'html')),//美图详情页路由
        '/^meitu\/list-([a-z0-9]+)\/p\/(\d+)$/'	=>	array("Meitu/meituList?p=:2", '', array('ext'=>'html')),//美图列表路由
//        '/^meitu\/list-([a-z0-9]+)\/p/:p$' => array("Meitu/meituList"),
        '/^meitu\/list-([a-z0-9]+)$/'	=>	array("Meitu/meituList"),//美图列表路由
        'meitu/list'					=>	array("Meitu/meituList"), //美图列表路由

        '/^meitu\/newMeiTuList-([a-z0-9]+)$/' =>array("Meitu/newMeiTuList"),//新的美图列表路由
        'meitu/newMeiTuList' 			=>array("Meitu/newMeiTuList"),//新的美图列表路由


        'meitu/gongzhuang$'=>array("Pubmeitu/pubMeituList"),//公装美图列表路由
//        '/^meitu\/gongzhuang-(l[\d+]+f[\d+]+m[\d+]+(p[\d+]+)?+(q[\d+]+)?)\/p\/(\d+)$/'=>array("Pubmeitu/pubMeituList?p=:4"),//公装美图列表路由
        '/^meitu\/gongzhuang-(l[\d+]+f[\d+]+m[\d+]+(p[\d+]+)?+(v[\d+]+)?+(q[\d+]+)?)$/'=>array("Pubmeitu/pubMeituList"),//公装美图列表路由
        '/^meitu\/gongzhuang-(l[\d+]+f[\d+]+m[\d+]+(p[\d+]+)?+(v[\d+]+)?+(q[\d+]+)?)-$/'=>array("Pubmeitu/pubMeituList"),//公装美图列表路由

//        '/^meitu\/list-(l[\d+]+f[\d+]+h[\d+]+c[\d+]+(p[\d+]+)?+(v[\d+]+)?+(q[\d+]+)?)$/'=>array("Meitu/meituList"),//美图列表路由
//        '/^meitu\/list-(l[\d+]+f[\d+]+h[\d+]+c[\d+]+(p[\d+]+)?+(v[\d+]+)?+(q[\d+]+)?)-$/'=>array("Meitu/meituList"),//美图列表路由


        '/^meitu\/g(\d+)$/'=>array("Pubmeitu/show?id=:1",'',array('ext'=>'html')),     //工装美图详情页路由
        'meitu/like'=>array("Meitu/like"),

        //视频路由
        "video/:category$"  => array("Video/index",'',array('ext'=>'')),//视频分类
        '/^video\/v(\d+)$/' =>array("Video/video?id=:1",'',array('ext'=>'html')),//工装美图详情页路由

//--------------------------------------------------------------
        // 案例
        "xgt" => array("Case/index"),//效果图
        "caseinfo/:id" => array("Case/caseinfo"), //案例详情
        //日记
        '/riji\/c([0-9]+)/' => array("Diary/index?category=:1"), //日记
        '/riji\/d([0-9]+)/' => array("Diary/content?id=:1",array('ext'=>'html')), //日记详情
        'riji'=>array("Diary/index"),

        //百科
        '/^baike\/([0-9]+)$/'=>	array("Baike/content?id=:1",'',array('ext'=>'html')),          //百科详细页
        '/^baike\/([a-z]+)$/'=>	array("Baike/index?id=:1"),      //百科分类页

        //问答
        "wenda$"                   		=>  array("Wenda/index"),
        '/^wenda\/ask-([0-9]+)$/'     	=>  array("Wenda/index?id=:1"),//问答列表路由
        '/^wenda\/ask-([0-9]+)(\w+)$/'	=>	array("Wenda/index?id=:1&sort=:2"),   //问答列表路由 可以优化一下
        '/^wenda\/x([0-9]+)$/'			=>	array("Wenda/content?id=:1",'',array('ext'=>'html')),      //问答详细页
        "wenda/search"					=>	array("Wenda/index"),                   //搜索


        //分站资讯
        ':bm/zxinfo/:id\d'               =>  array("Zixun/content",'',array('ext'=>'html')),//资讯详情页
        ":bm/zxinfo/:category$"           =>  array("Zixun/index",'',array('ext'=>'')),//资讯列表页
        //":bm/zxinfo/list-/:category-:\d"           =>  array("Zxinfo/index",'',array('ext'=>'html')),

        "/^(\w+)\/zxinfo\/list-(\w+)-(\d+)$/"  => array("Zixun/index?bm=:1&category=:2&page=:3",'',array('ext'=>'html')),

        ":bm/zxinfo$"                    =>  array("Zixun/index"),

//-----------------------------------------------------------------
        "company_home" => array("Company/company_home"),//装修公司首页
        "company_case" => array("Company/company_case"),//装修案例
        "company_team" => array("Company/company_team"),//装修团队
        "company_message" => array("Company/company_message"),//装修团队


        "gonglue$" => array("Gonglue/index"),
        "activity" => array("activity/index"),
        "video$" => array("Video/index"),
        "baike$" => array("Baike/index"),
        ":bm$" => array("SubIndex/index",'',array('ext'=>'')), //分站主页路由 -- 这个一定要放在最后！！

    ),


);