<?php
return array(

    //'配置项'=>'配置值'

     //定义运行环境 方便不同的运行环境执行不同的逻辑
    //比如开发环境用不同的三方API TOKEN,微信开发环境,发单IP不受限制等。
    //具体那些地方有调用直接搜索代码可找到
    //空、不配置、false、prd都为生成环境,dev为开发环境,test为测试环境
    'APP_ENV'=>'dev',
    
    /* URL设置 */
    'URL_MODEL'             => 1, //设置路由模式

    /* 调试&&错误信息设置 */
    'SHOW_PAGE_TRACE'       => True,   // 显示页面Trace信息
    'SHOW_ERROR_MSG'        => True,   // 显示错误信息

    /* SESSION设置 */
    'SESSION_AUTO_START'    =>  True,   //自动打开session
    // session 配置数组 支持type name id path expire domain 等参数
    'SESSION_OPTIONS'       =>  array(
                          'domain' => '.qizuang.com',
                          ),

    /* 数据库设置 */
    'DB_DEPLOY_TYPE'        => 1, //启用分布式数据库
    'DB_RW_SEPARATE'        => true, //启用读写分离
    'DB_TYPE'               => 'mysql', // 数据库类型
    'DB_HOST'=>'192.168.8.8',  // msyql地址,第一个是master,配置替换,不留空格是因为方便替换
     //'DB_HOST'=>'10.10.43.169,10.10.38.75', //第一个是master
    'DB_NAME'               => 'sq_qizuang', // 数据库名
    'DB_USER'=>'chk',  // 用户名,配置替换,不留空格是因为方便替换
    'DB_PWD'=>'@1cYAXE4pDgQ',  // 密码,配置替换,不留空格是因为方便替换
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
    // 'DATA_CACHE_TYPE' => 'Redis',  // 使用Redis做为S方法底层驱动支持
    // 'REDIS_HOST'=>'',  // 配置替换,不留空格是因为方便替换
    // //'REDIS_HOST'      => '10.10.167.207', //备用
    // 'REDIS_PORT'      => 6379,
    // 'DATA_CACHE_TIME' => 60 * 60 * 8,  //过期的秒数*/


    //S方法使用 ssd 作为缓存
    //'DATA_CACHE_TYPE' => 'ssdb',  //默认是file方式进行缓存的，修改为memcache
    //'SSDB_HOST'       => '127.0.0.1',  //ssdb服务器地址
    //'SSDB_PORT'       => 8888, //ssdb服务器端口
    //'DATA_CACHE_TIME' => 60 * 60 * 8,  //过期的秒数*/


    // 子域名部署
    // 子域名部署
    'APP_SUB_DOMAIN_DEPLOY' => 1, // 开启子域名配置
    'APP_SUB_DOMAIN_RULES' => array(
            'u'   => 'User', // u.qizuang.com域名指向User模块
            'www' => 'Home', // u.qizuang.com域名指向User模块
            'api' => 'Api',  //数据接口模块
            'm'   => 'Mobile', //指向移动端模块
            'old' => 'Muser',//装修公司移动版后台
            '*'   => 'Sub',  //泛域名指向Sub模块

    ),

     //ip白名单
     //起作用的地方审核为无效咨询
     'IP_WHITE_LIST'        => array(
                                     '222.92.114.186',
                                     '223.112.69.58',
                                     '192.168.8.2',
                                     '192.168.8.15',
                                     ),

    //注册的域名
    'REGISTER_URL'   => array("http://www.qizuang.com","http://u.qizuang.com","http://api.qizuang.com"),

    // 调用七牛的域名
    'QINIU_DOMAIN'   => 'staticqn.qizuang.com',

    //静态文件服务器
    'STATIC_HOST1'   => 'static.qizuang.com',

    // 域名
    'QZ_YUMING'      => 'qizuang.com',                 //网站域名 不包含 www
    'QZ_YUMINGWWW'   => 'www.qizuang.com',             //网站域名 包含 www

    //定义移动版访问 域名
    'MOBILE_DONAMES' => 'm.qizuang.com',

);
