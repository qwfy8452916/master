<?php
return array(



     /* 显示页面Trace信息 */
    'SHOW_PAGE_TRACE'     => true,


    'ERROR_MESSAGE' =>'',//错误提示信息
    'ERROR_PAGE'    =>'/Public/404.html',//错误页面
    'TMPL_ACTION_ERROR'=>'Public:error',//指定错误页面

    //单模块设计
    'MULTI_MODULE'   => false,
    'DEFAULT_MODULE' => 'Home',

    'DEFAULT_CONTROLLER' => 'Main', // 默认控制器名称

    'URL_ROUTER_ON'        => false, //开启路由
    'URL_CASE_INSENSITIVE' => true, //默认false 表示URL区分大小写 true则表示不区分大小写
    'URL_MODEL'            => 2, //URL模式
    'URL_HTML_SUFFIX'      =>  '',


    //数据库配置信息
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => '192.168.8.8', // 服务器地址
    'DB_NAME'   => 'sq_qizuang', // 数据库名
    'DB_USER'   => 'chk', // 用户名
    'DB_PWD'    => '@1cYAXE4pDgQ', // 密码
    'DB_PORT'   => 3306, // 端口
    'DB_PREFIX' => 'qz_', // 数据库表前缀
    'DB_CHARSET'=> 'utf8', // 字符集
    'READ_DATA_MAP'=>TRUE,//开启字段自动映射

    //缓存配置
    'DATA_CACHE_TYPE'       =>  'File',    // 数据缓存类型,支持:File|Db|Apc|Memcache|Shmop|Sqlite|Xcache|Apachenote|Eaccelerator
    'DATA_CACHE_TIME'       =>  3600,      // 数据缓存有效期 0表示永久缓存
    'DATA_CACHE_SUBDIR'     =>  true,      // 使用子目录缓存 (自动根据缓存标识的哈希创建子目录)
    'DATA_PATH_LEVEL'       =>  1,         // 子目录缓存级别
    'READ_DATA_MAP'         =>  true,      //开启字段自动映射

    //开启子域名配置
    'APP_SUB_DOMAIN_DEPLOY' => 1,
    'APP_SUB_DOMAIN_RULES' => array(
            "168new"    => 'Home',         //指向管理后台
    ),


     // 自定义参数, 网站信息
    'BASE_URL'     => '',
    'QZ_YUMING'    => 'qizuang.com',                 //网站域名 不包含 www
    'QZ_YUMINGWWW' => 'www.qizuang.com',             //网站域名 包含 www
    'MOBILE_DONAMES' => 'm.qizuang.com',             //定义移动版访问 域名
    'STATIC_HOST1' => 'static.qizuang.com',
    'QINIU_DOMAIN' => 'staticqn.qizuang.com',         //调用七牛的域名
    '168NEW_URL'   => 'http://168new.qizuang.com',

    //配置Session
    'SESSION_OPTIONS'       =>  array(
                'domain'    => '.qizuang.com',
                "expire"    =>  3600*24
    ), //配置Session的一些参数

    //session配置
    'SESSION_AUTO_START'    =>  true,// 是否自动开启Session
    /*
    'SESSION_TYPE'          =>  'Redis',    //session类型
    'SESSION_CACHE_TIME'    =>  1,        //连接超时时间(秒)
    'SESSION_REDIS_HOST'    =>  '127.0.0.1', //分布式Redis,默认第一个为主服务器
    'SESSION_REDIS_PORT'    =>  '6379',           //端口,如果相同只填一个,用英文逗号分隔
    'SESSION_REDIS_AUTH'    =>  '',    //Redis auth认证(密钥中不能有逗号),如果相同只填一个,用英文逗号分隔
    */



    //密钥
    'AU_KEY' => 'qizuang@:;',
     // 自定义参数, 网站信息
    'OA_URL'            => 'http://168oa.qizuang.com',
    'UC_URL'            => 'http://168uc.qizuang.com',
    '168NEW_URL'        => 'http://168new.qizuang.com',
    '168_URL'        => 'http://168.qizuang.com',

    'ALL_CITY_MANAGER' => array('1','37','51'),
);