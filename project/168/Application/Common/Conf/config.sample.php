<?php
return array(

    //'配置项'=>'配置值'

    //定义运行环境 方便不同的运行环境执行不同的逻辑
    //比如开发环境用不同的三方API TOKEN,微信开发环境,发单IP不受限制等。
    //具体那些地方有调用直接搜索代码可找到
    //空、不配置、false、prd都为生成环境,dev为开发环境,test为测试环境
    'APP_ENV'=>'prd',

    // 定义静态文件版本 代码发布后需被替换成时间 例如 20180912164602
    'STATIC_VERSION' => 'REPLACEME_STATIC_VERSION',

    /* URL设置 */
    'URL_ROUTER_ON'        => false, //开启路由
    'URL_CASE_INSENSITIVE' => true, //默认false 表示URL区分大小写 true则表示不区分大小写
    'URL_MODEL'            => 2, //URL模式
    'URL_HTML_SUFFIX'      =>  '',

    /* 调试&&错误信息设置 */
    'SHOW_PAGE_TRACE'       => false,   // 显示页面Trace信息
    'SHOW_ERROR_MSG'        => false,   // 显示错误信息

     //定义运行环境 方便不同的运行环境跑不同的逻辑
     //比如开发环境不发送短信,电话,短信通知
     //空,不配置,false为生成环境,dev为开发环境
     //'APP_ENV'=>'dev',

    /* SESSION设置 */
    'SESSION_AUTO_START'    =>  True,   //自动打开session
    // session 配置数组 支持type name id path expire domain 等参数
    'SESSION_OPTIONS'       =>  array(
                   'domain' => '.qizuang.com',
                   'expire' =>  3600*24,
                          ),
    /*
    'SESSION_TYPE'          =>  'Redis',    //session类型
    'SESSION_CACHE_TIME'    =>  1,        //连接超时时间(秒)
    'SESSION_REDIS_HOST'    =>  '127.0.0.1', //分布式Redis,默认第一个为主服务器
    'SESSION_REDIS_PORT'    =>  '6379',           //端口,如果相同只填一个,用英文逗号分隔
    'SESSION_REDIS_AUTH'    =>  '',    //Redis auth认证(密钥中不能有逗号),如果相同只填一个,用英文逗号分隔
    */

    /* 数据库设置 */
    'DB_DEPLOY_TYPE'        => 1, //启用分布式数据库
    'DB_RW_SEPARATE'        => true, //启用读写分离
    'DB_TYPE'               => 'mysql', // 数据库类型
    'DB_HOST'=>'', // msyql地址,第一个是master,配置替换,不留空格是因为方便替换
     //'DB_HOST'=>'10.10.43.169,10.10.38.75', //第一个是master
    'DB_NAME'               => 'sq_qizuang', // 数据库名
    'DB_USER'=>'', // 用户名,配置替换,不留空格是因为方便替换
    'DB_PWD'=>'', // 密码,配置替换,不留空格是因为方便替换
    'DB_PORT'               => 3306, // 端口
    'DB_PREFIX'             => 'qz_', // 数据库表前缀
    'DB_CHARSET'            => 'utf8', // 字符集
    'READ_DATA_MAP'         => true,//开启字段自动映射

    /* 数据缓存设置 */
    'DATA_CACHE_TYPE'       =>  'File',      // 数据缓存类型,支持:File|Db|Apc|Memcache|Shmop|Sqlite|Xcache|Apachenote|Eaccelerator
    'DATA_CACHE_TIME'       =>  60*30,     // 数据缓存有效期 0表示永久缓存
    'DATA_CACHE_SUBDIR'     =>  true,        // 使用子目录缓存 (自动根据缓存标识的哈希创建子目录)
    'DATA_PATH_LEVEL'       =>  1,           // 子目录缓存级别

    //S方法使用 redis作为底层缓存
    //'DATA_CACHE_TYPE' => 'Redis',  // 使用Redis做为S方法底层驱动支持
    //'REDIS_HOST'=>'', //  配置替换,不留空格是因为方便替换
    //'REDIS_HOST'      => '10.10.167.207', //备用
    //'REDIS_PORT'      => 6379,
    //'DATA_CACHE_TIME' => 60 * 60 * 8,  //过期的秒数*/


    //S方法使用 ssd 作为缓存
    //'DATA_CACHE_TYPE' => 'ssdb',  //默认是file方式进行缓存的，修改为memcache
    //'SSDB_HOST'       => '127.0.0.1',  //ssdb服务器地址
    //'SSDB_PORT'       => 8888, //ssdb服务器端口
    //'DATA_CACHE_TIME' => 60 * 60 * 8,  //过期的秒数*/


    //单模块设计
    'MULTI_MODULE' => false,
    'DEFAULT_MODULE' => 'Home',
    'DEFAULT_CONTROLLER' => 'Main', // 默认控制器名称

    //检查文件的大小写
    'APP_FILE_CASE' => true,

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
    'QINIU_PRIVATE_DOMAIN' => 'privateqn.qizuang.com',         //调用七牛私有空间的域名


    //密钥
    'AU_KEY' => 'qizuang@:;',
     // 自定义参数, 网站信息
    'OA_URL'            => 'http://168oa.qizuang.com',
    'UC_URL'            => 'http://168uc.qizuang.com',
    '168NEW_URL'        => 'http://168new.qizuang.com',
    '168_URL'           => 'http://168.qizuang.com',
    '168CPA'            => 'http://168cpa.qizuang.com',
    '168JIAJU'          => 'http://168jiaju.qizuang.com',

    /*定义IP获取函数get_client_ip()取值顺序自定义配置*/
    //当前使用百度云加速
    //HTTP_CF_CONNECTING_IP 百度云加速 和 CloudFlare 会把客户端IP存入本项  如果(CDN、LB、GATEWAY)未重写会有伪造
    //HTTP_X_REAL_IP 大多数CDN会把客户端IP存入本项  如果(CDN、LB、GATEWAY)未重写会有伪造
    //HTTP_X_FORWARDED_FOR 可为多个以","分割的IP,第一个IP是客户端IP,后面的为代理服务器IP,多个代理服务器IP顺序增加 如果(CDN、LB、GATEWAY)未重写会有伪造
    //HTTP_CLIENT_IP 代理服务器传过来的客户端IP 如果(CDN、LB、GATEWAY)未重写会有伪造
    //REMOTE_ADDR 对于运行本函数的应用服务器来说的远程地址,如果前面有(CDN、LB、GATEWAY)则是(CDN、LB、GATEWAY)的节点IP地址
    'GET_IP_VARS_ORDER' => 'HTTP_CF_CONNECTING_IP,HTTP_X_REAL_IP,HTTP_X_FORWARDED_FOR,HTTP_CLIENT_IP,REMOTE_ADDR',

    'ALL_CITY_MANAGER' => array('1','37','51'),

    'REDIS_HOST'   => '',
    'REDIS_PORT'   => 6379,
    'REDIS_DB_STAT' => 9,


    //从库配置
    'DB_CONFIG1' => array(
        'db_type'  => 'mysql',
        'db_user'  => '',
        'db_pwd'   => '',
        'db_host'  => '',
        'db_port'  => '3306',
        'db_name'  => 'sq_qizuang',
        'db_charset'=>    'utf8',
    ),
);