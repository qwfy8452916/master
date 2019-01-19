<?php
return array(
    //'配置项'=>'配置值'
    'URL_ROUTER_ON' => true,
    'URL_ROUTE_RULES' => array(

        "ruzhu$" => array("CompanyConsult/zhaoshang"),//装修公司入驻落地页页面
        'zhaoshang/consult$'=>array('Home/CompanyConsult/consult','',array('method'=>'post')),//装修公司入驻落地页发起咨询接口

        /*** 熊掌号 S **/
        "xzh$" => array("Xiongzhanghao/index"),
        "xzh/baojia$" => array("Xiongzhanghao/baojia"),
        "xzh/details$" => array("Xiongzhanghao/baojia_details"),
        "xzh/company_home/:id\d$" => array("Xiongzhanghao/company_home"),
        "xzh/company_case/:id\d$" => array("Xiongzhanghao/company_case"),
        "xzh/company_team/:id\d$" => array("Xiongzhanghao/company_team"),
        "xzh/company_message/:id\d$" => array("Xiongzhanghao/company_comment"),
        /*** 熊掌号 E **/

        //引导关注微信公众号落地页
        "weixinhuodong" => array("Special/wxGuide"),

        /***********************展销活动*******************************/
       "2019zqfh"=>array("Special/zhanxiao"),// 会销落地页

        //局部落地页
        "jb" => array("Special/juBuLuoDiYe"),
        "dazhuanpan" => array("Index/dazhuanpan", "verify=1"),//大转盘活动路由
        "prize" => array("Index/prize"),//获取奖品路由
        "city" => array("Index/city", array("go" => "1")), //城市选择页路由
        "action" => array("Index/action"), //移动版切换到主站,加cookie标识
        "fb_order" => array("Zb/fb_order"),//发布订单路由
        "getroundnum" => array("Zb/getroundnum"),//生成随机数
        "muser/orderinfo/id/:id" => array("Muser/index"),
        "gonglue/:category/:id$" => array("Article/index", '', array('ext' => 'html')), //文章详细页路由

        /*******************移动端家具报价发单落地页*******************/
        "qwdzbj$"=> array("JiajuZb/baojia"),//报价页
        "jiajufb"=> array("JiajuZb/baojiaCalculate"),//报价发单请求
        "qwdbjjg"=> array("JiajuZb/baojiaDetail"),//报价结果页
        "qwdzbj/gdtfive"=> array("JiajuZb/gdtfive"),//报价页,新增模板 a.18.11.16
        "qwdzbj/toutiaojiaju" => array("JiajuZb/toutiaojiaju"),

        //攻略页面查看更多免费设计列表页
        "gonglue/sheji" => array("Meitu/glMeituList"),
        '/^gonglue\/sheji\/list-([a-z0-9]+)$/' => array("Meitu/glMeituList", '', array('ext' => '')),


        "gonglue/lc$" => array("Zixun/zxlc", '', array('ext' => '')), //收房验收路由
        "/^gonglue\/list\-lc\-([1-9]\d*)$/" => array(
            "Zixun/zxlc",
            "",
            array('ext' => 'html')
        ),
        //收房验收路由
        "gonglue/shoufang$" => array("Zixun/zxlclist", array("category" => "shoufang", "type" => "1"), array('ext' => '')),
        "/^gonglue\/list\-shoufang\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "shoufang", "type" => "1"),
            array('ext' => 'html')
        ),
        //找公司路由
        "gonglue/gongsi$" => array("Zixun/zxlclist", array("category" => "gongsi", "type" => "1"), array('ext' => '')),
        "gonglue/gongsi$" => array("Zixun/zxlclist", array("category" => "gongsi", "type" => "1"), array('ext' => '')),
        "/^gonglue\/list\-gongsi\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "gongsi", "type" => "1"),
            array('ext' => 'html')
        ),
        //量房路由
        "gonglue/liangfang$" => array("Zixun/zxlclist", array("category" => "liangfang", "type" => "1"), array('ext' => '')),
        "gonglue/liangfang$" => array("Zixun/zxlclist", array("category" => "liangfang", "type" => "1"), array('ext' => '')),
        "/^gonglue\/list\-liangfang\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "liangfang", "type" => "1"),
            array('ext' => 'html')
        ),

        //看风水
        'gonglue/kanfengshui$' => array('Zixun/empty'),
        "/^gonglue\/list\-kanfengshui\-([1-9]\d*)$/" => array('Zixun/empty'),
        //房产知识路由
        "gonglue/fangchan$" => array("Zixun/zxlclist", array("category" => "fangchan", "type" => "1"), array('ext' => '')),
        "gonglue/fangchan$" => array("Zixun/zxlclist", array("category" => "fangchan", "type" => "1"), array('ext' => '')),
        "/^gonglue\/list\-fangchan\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "fangchan", "type" => "1"),
            array('ext' => 'html')
        ),

        //设计预算路由
        "gonglue/shejiyusuan$" => array("Zixun/zxlclist", array("category" => "shejiyusuan", "type" => "1"), array('ext' => '')),
        "/^gonglue\/list\-shejiyusuan\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "shejiyusuan", "type" => "1"),
            array('ext' => 'html')
        ),
        //装修选材路由
        "gonglue/xuancai$" => array("Zixun/zxlclist", array("category" => "xuancai", "type" => "1"), array('ext' => '')),
        "/^gonglue\/list\-xuancai\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "xuancai", "type" => "1"),
            array('ext' => 'html')
        ),
        //施工阶段 拆改路由
        "gonglue/chagai$" => array("Zixun/zxlclist", array("category" => "chagai", "type" => "2"), array('ext' => '')),
        "/^gonglue\/list\-chagai\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "chagai", "type" => "2"),
            array('ext' => 'html')
        ),
        //施工阶段 水电路由
        "gonglue/shuidian$" => array("Zixun/zxlclist", array("category" => "shuidian", "type" => "2"), array('ext' => '')),
        "/^gonglue\/list\-shuidian\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "shuidian", "type" => "2"),
            array('ext' => 'html')
        ),
        //施工阶段 防水路由
        "gonglue/fangshui$" => array("Zixun/zxlclist", array("category" => "fangshui", "type" => "2"), array('ext' => '')),
        "/^gonglue\/list\-fangshui\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "fangshui", "type" => "2"),
            array('ext' => 'html')
        ),
        //施工阶段 泥瓦路由
        "gonglue/niwa$" => array("Zixun/zxlclist", array("category" => "niwa", "type" => "2"), array('ext' => '')),
        "/^gonglue\/list\-niwa\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "niwa", "type" => "2"),
            array('ext' => 'html')
        ),
        //施工阶段 木工路由
        "gonglue/mugong$" => array("Zixun/zxlclist", array("category" => "mugong", "type" => "2"), array('ext' => '')),
        "/^gonglue\/list\-mugong\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "mugong", "type" => "2"),
            array('ext' => 'html')
        ),
        //施工阶段 油漆路由
        "gonglue/youqi$" => array("Zixun/zxlclist", array("category" => "youqi", "type" => "2"), array('ext' => '')),
        "/^gonglue\/list\-youqi\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "youqi", "type" => "2"),
            array('ext' => 'html')
        ),
        //入住阶段 检测路由
        "gonglue/jianche$" => array("Zixun/zxlclist", array("category" => "jianche", "type" => "3"), array('ext' => '')),
        "/^gonglue\/list\-jianche\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "jianche", "type" => "3"),
            array('ext' => 'html')
        ),
        //入住阶段 配饰路由
        "gonglue/peishi$" => array("Zixun/zxlclist", array("category" => "peishi", "type" => "3"), array('ext' => '')),
        "/^gonglue\/list\-peishi\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "peishi", "type" => "3"),
            array('ext' => 'html')
        ),
        //入住阶段 保养路由
        "gonglue/baoyang$" => array("Zixun/zxlclist", array("category" => "baoyang", "type" => "3"), array('ext' => '')),
        "/^gonglue\/list\-baoyang\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "baoyang", "type" => "3"),
            array('ext' => 'html')
        ),
        //入住阶段 家具生活
        "gonglue/jjsh$" => array("Zixun/zxlclist", array("category" => "jjsh", "type" => "3"), array('ext' => '')),
        "/^gonglue\/list\-jjsh\-([1-9]\d*)$/" => array(
            "Zixun/zxlclist",
            array("category" => "jjsh", "type" => "3"),
            array('ext' => 'html')
        ),


        //选材导购
        "gonglue/xcdg$" => array("Zixun/xcdg", array("category" => "xcdg"), array('ext' => '')),//seo需求-选材导购-new
        "/^gonglue\/list\-xcdg\-([1-9]\d*)$/" => array(
            "Zixun/xcdg",
            array("category" => "xcdg"),
            array('ext' => 'html')
        ),

        //新家选材分类路由列表
        "gonglue/diban$" => array("Zixun/xcdg", array("category" => "diban", 'categoryId' => 145), array('ext' => '')),
        "/^gonglue\/list\-diban\-([1-9]\d*)$/" => array(
            "Zixun/xcdg",
            array("category" => "diban", 'categoryId' => 145),
            array('ext' => 'html')
        ),
        //装修选材导购，要放到下面的路由前面
        "/^gonglue\/list\-([a-zA-Z]+)\-([1-9]\d*)$/" => array(
            "Zixun/lclist?category=:1",
            "",
            array('ext' => 'html')
        ),

        //装修指南列表
        "zhinan/:category" => array(
            "Zixun/zxzn",
            array(),
            array('ext' => '')
        ),
        "zhinan" => array("Zixun/zxzn", array(), array('ext' => '')),


        "/^zhinan\/list\-([1-9]\d*)$/" => array(
            "Zixun/zxzn",
            array(),
            array('ext' => 'html')
        ),

        "/^zhinan\/list\-([a-zA-Z]+)\-([1-9]\d*)$/" => array(
            "Zixun/zxzn?category=:1",
            "",
            array('ext' => 'html')
        ),
        "/^zhinan/" => array("Zixun/zxzn", array(), array('ext' => '')),

        "/^search/" => array("Zixun/search", '', array('ext' => '')), //攻略首页搜索
        "/^search\-\d*/" => array("Zixun/search", '', array('ext' => 'html')), //攻略首页搜索

        "gonglue/:category$" => array("Zixun/lclist", '', array('ext' => '')),//装修选材导购

        "gonglue$" => array("Zixun/index", '', array('ext' => '')), //移动版资讯页路由


        ":bm/xgt$" => array("Xiaoguotu/index", '', array('ext' => '')), //移动版效果图页面
        ":bm/company_message/:id" => array("Companyhome/comment"), //移动版装修公司评论页面
        ":bm/blog/:id" => array("Blog/index"), //移动版设计师博客页
        ":bm/company_team/:id" => array("Companyhome/team"), //移动版装修公司案例页路由

        "zxgstj" => array("Company/companylandpage"), //装修公司新版落地页
        "jxxgt" => array("Company/jxxgtlandpage"),//效果图落地页
        "getLandList" => array("company/getLandList"),//效果图落地页
        "addNum" => array("company/addNum"),//效果图落地页

        "zxbaojia" => array("Company/spacelandpage"),//空间装修落地页
        "zhuangxiu" => array("Company/plateformlandpage"),//平台落地页
        "pinpai" => array("Company/pinpai"),//品牌落地页
        ":bm/caseinfo/:id" => array("Cases/index", '', array('ext' => 'shtml')), //移动版装修公司案例页路由
        ":bm/company_case/:id" => array("Companyhome/cases"), //移动版装修公司案例页路由
        ":bm/company_home/:id\d$" => array("Companyhome/index", '', array('ext' => '')), //移动版装修公司主页路由
        ":bm/company_home/:id/baojia$" => array("Companyhome/details",'', array('ext' => '')),//装修公司装修报价详细页面
        ":bm/company" => array("Company/index"), //移动版装修公司列表路由
        ":bm/gonglue" => array("Zixun/index"), //移动版文章页路由
        "xgt" => array("Xiaoguotu/index"), //移动版效果图页面路由
        "company$" => array("Company/index", '', array('ext' => '')), //移动版装修公司列表路由

        // ---老版本的报价和设计---
        "mzb" => array("Zb/index"), //移动端招标页路由
        "zhaobiao$" => array("Zb/index"), //新版本移动端招标页报价方案路由

        // --- 设计相关 ---
        "sheji$" => array("Zb/sheji", '', array('ext' => '')), //新版本移动端招标页设计方案路由
        "sheji-1" => array("Zb/sheji_1", '', array('ext' => '')),
        "shejidone" => array("Zb/shejidone"), //新版本移动端招标页设计方案路由
        "shejidone2" => array("Zb/shejidone2"),//设计弹窗完成页面
        "sheji-2"                 =>    array("Zb/sheji_paste",'',array('ext'=>'')),

        // --- 卡券相关 ---
        "cardlogin" => array("Card/login"),
        "cardapply" => array("Card/apply"),
        "cardorder" => array("Card/order"),
        "couponin" => array("Card/couponin"),
        "coupontake/:cardid" => array("Card/coupontake"),
        "getcompanybyorderid"=>array("Card/getSpecialCardByOrderId"),
        "card/coupontsuccess" => array("Card/coupontsuccess"),
        "getspecialcardinfobyid" => array('Card/getspecialcardinfobyid'),

        // --- 报价相关 ---
        "baojia$"       => array("Zb/baojia", '', array('ext' => '')),        //移动端智能报价路由
        "baojia-zst$"       => array("Zb/baojia_zst", '', array('ext' => '')),        //移动端智能报价路由
        "qudao-baojia$" => array("Zb/baojia_qd", '', array('ext' => '')),        //移动端渠道报价路由
        "baojia_dm$"    => array("Zb/baojia_dm", '', array('ext' => '')),          //移动端智能报价路由
        "baojia-1$"     => array("Zb/baojia_1",'',array('ext'=>'')),
        "baojia-2$"     => array("Zb/baojia_2",'',array('ext'=>'')),
        "baojia-dx"     => array("Zb/baojia_dx"),//0元报价落地页  m.2.10.0 0元报价落地页
        "baojia-dx-1"     => array("Zb/baojia_dx_1"),//0元报价落地页  m.2.10.0 0元报价落地页
        "baojiawanshan" => array("Zb/wanshan"),//报价完善页面
        "details" => array("Zb/details"),//装修报价详细页面
        "details-zst" => array("Zb/details_a18102"),//装修报价详细页面
        "getdetailsinfo" => array("Zb/getdetailsinfo"),// 老版 ajax获取装修报价详细
        "getdetailsbyajax"=>array("Zb/getDetailsByAjax"),// ajax获取详细报价页面路由

        //新报价
        "newbaojia$"=>array("Zb/newbaojia", '', array('ext' => '')),// 新增报价 首页
        "jznewbaojia"=>array("Zb/jznewbaojia", '', array('ext' => '')),// 新增精准报价 中间页
        "newbaojiasuccess"=>array("Zb/newbaojiasuccess", '', array('ext' => '')),// 新增精准报价 结果页

        //新报价20181119
         "baojia1$"=>array("Zb/baojia1", '', array('ext' => '')),// 新增报价 首页
         "jzbaojia1"=>array("Zb/jzbaojia1", '', array('ext' => '')),// 新增精准报价 中间页
         "baojiasuccess1"=>array("Zb/baojiasuccess1", '', array('ext' => '')),// 新增精准报价 结果页
         "baojia1-jzrk$"=>array("Zb/baojia1jzrk", '', array('ext' => '')),         //底部按钮发单成功页 20181211
         "baojia1-details"=>array("Zb/baojia1details", '', array('ext' => '')),         //新增报价完善页 20181224
         "baojia1success"=>array("Zb/baojia1success", '', array('ext' => '')),// 新增报价 结果页  20181224
         "baojia-result"=>array("Zb/baojia_result", '', array('ext' => '')),//  报价结果页
         "sheji-result"=>array("Zb/sheji_result", '', array('ext' => '')),//  设计结果页
         "xgs-result"=>array("Zb/xgs_result", '', array('ext' => '')),//  选择装修公司结果页
         "ruzhu-result"=>array("Zb/ruzhu_result", '', array('ext' => '')),//  商家入驻结果页         // 新设计页20181123
        "sheji-jzrk$"=>array("Zb/shejijzrk", '', array('ext' => '')),// 新增设计 首页
        "details-jzrk"=>array("Zb/details_jzrk", '', array('ext' => '')),// 新增设计发单成功页  中间页

        // 新设计页20181128
        "sheji-dyqd$"=>array("Zb/shejidyqd", '', array('ext' => '')),// 新增设计 首页
        // 新设计页20181217
        "sheji-dyqd-2$"=>array("Zb/shejidyqd_2", '', array('ext' => '')),// 新增设计 首页


        // 新设计页20181123
        "baojia-jzrk$"=>array("Zb/baojiajzrk", '', array('ext' => '')),// 新增报价 首页


        "getLocation" => array("Index/getLocation"), //获取地理信息路由
        "getcitybm" => array("Index/getcitybm"), //获取地理信息路由
        "getbmbycityname" => array("Index/getbmbycityname"), //获取地理信息路由
        "sendsms" => array("Index/sendsms", "verify=1"),//发送短信路由
        "verifysmscode" => array("Index/verifysmscode", "verify=1"),//验证码路由
        "specialuser" => array("Index/specialuser", "verify=1"),
        "prize" => array("Index/prize", "verify=1"),
        "refresh" => array("Index/refresh"),//刷新验证码路由
        "getCityInfoByName" => array("Index/getCityByCityName"),//百度地图获取地址信息

        "wenda$" => array("Wenda/index", '', array('ext' => '')),
        '/^wenda\/ask-([0-9]+)$/' => array("Wenda/index?id=:1"),//问答列表路由
        '/^wenda\/ask-([0-9]+)(\w+)$/' => array("Wenda/index?id=:1&sort=:2"),   //问答列表路由 可以优化一下
        '/^wenda\/x([0-9]+)$/' => array("Wenda/show?id=:1", '', array('ext' => 'html')),      //问答详细页
        "wenda/search" => array("Wenda/index"),                   //搜索

        "baike$" => array("Baike/index", '', array('ext' => '')),                   //搜索
        "baike/rss$" => array("Baikerss/category", '', array('ext' => '')),     //百科RSS订阅发布
        "baike/indexdev" => array("Baike/indexdev"),                   //搜索
        '/^baike\/([0-9]+)$/' => array("Baike/show?id=:1", '', array('ext' => 'html')),          //百科详细页
        '/^baike\/([a-z]+)$/' => array("Baike/category?id=:1"),      //百科分类页

        "riji$" => array("Riji/index", '', array('ext' => '')),
        '/^riji\/c([0-9]+)$/' => array("Riji/index?category=:1"),
        '/^riji\/d([0-9]+)$/' => array("Riji/show?id=:1", '', array('ext' => 'html')),
        "rijidev" => array("Riji/rijidev"),
        "rijidetail" => array("Riji/rijidetail"),

        'huangli$' => array("Huangli/index", '', array('ext' => '')),
        'hl$' => array("Huangli/zxhl", '', array('ext' => '')),
        ":bm/hl" => array("Huangli/zxhl"), //移动版装修公司列表路由
        '/^huangli\/bj([0-9]+)$/' => array("Huangli/show?type=:1"),

        'meitu$' => array("Meitu/index", '', array('ext' => '')),//美图列表路由
        '/^meitu\/p(\d+)$/' => array("Meitu/show?p=:1", '', array('ext' => 'html')),//美图详情页路由
        '/^meitu\/list-([a-z0-9]+)$/' => array("Meitu/meitulist", '', array('ext' => '')),//美图列表路由
        'meitu/list' => array("Meitu/meitulist"), //美图列表路由
        '/^meitu\/newMeiTuList-([a-z0-9]+)$/' => array("Meitu/newMeiTuList"),//新的美图列表路由
        'meitu/newMeiTuList' => array("Meitu/newMeiTuList"),//新的美图列表路由
        'meitu/gongzhuang$' => array("Pubmeitu/pubMeituList"),//公装美图列表路由
        '/^meitu\/gongzhuang-(l[\d+]+f[\d+]+m[\d+]+(p[\d+]+)?+(q[\d+]+)?)$/' => array("Pubmeitu/pubMeituList"),//公装美图列表路由
        '/^meitu\/g(\d+)$/' => array("Pubmeitu/show?id=:1", '', array('ext' => 'html')),     //工装美图详情页路由
        'meitu/like' => array("Meitu/like"),

        "about" => array("Special/about", '', array('ext' => 'html')),//微信专页


//        'zt$' => array("Meitu/meituztlist"), (a.18.06.02 需求删除,已认证)
//        'meitu/meituztlist$' => array("Meitu/meituztlist"),
        'meitu/zt$' => array("Meitu/meituztlist"),
        'zt/[:id]' => array("Meitu/meituztdetails"),
        'zt/baoming' => array("Zt/baoming"),//老客户活动报名页
        "zt/baomingok" => array("Zt/baomingok"),  //报名结果页
        "zt/complain" => array("Zt/complain"),  //报名结果页
        "zt/complain" => array("Zt/complain"),  //报名结果页 2018-3-19
        '/^zt\/([a-z]+)$/' => array("Zt/special?name=:1"),//专题详细页

        "video/jiangtang" => array("http://m.qizuang.com/video/", 301),//视频讲堂301
        "video/toutiao" => array("http://m.qizuang.com/video/", 301),//视频头条路由
        '/^video\/v(\d+)$/' => array("Mobile/Video/terminal?id=:1", '', array('ext' => 'html')),//工装美图详情页路由
        "video/likeaction" => array("Video/likeAction"),  //报名结果页
        "video/:category$" => array("Mobile/Video/index", '', array('ext' => '')),//视频分类
        "video$" => array("Mobile/Video/index", '', array('ext' => '')),//视频讲堂路由

        '/^zhuanti\/([0-9]+)$/' => array("Articlespecial/module?id=:1"),//专题模块路由
        "zhuanti/:category/:id" => array("Mobile/Articlespecial/terminal", '', array('ext' => 'html')),//文章路由
        "zhuanti/likeaction" => array("Mobile/Articlespecial/likeAction"),//文章路由
        'dolike' => array("Article/dolike"),//文章喜欢路由
        'go' => array("Go/index"),//推广跳转路由
        // 'hm' => array('Index/hm'),
        "act/qixi" => array("Mobile/Special/qixi"),//七夕
        "act/guoqing" => array("Mobile/Special/guoqing"),//国庆
        "act/zhuli" => array("Mobile/Special/zhuli"),//助力
        "act/zhulijin" => array("Mobile/Special/zhulijin"),//助力金
        "act/rules" => array("Mobile/Special/rules"),//助力规则
        "act/xinyunqiang" => array("Mobile/Special/xinyunqiang"),//幸运抢
        "act/updateUserInfo" => array("Mobile/Special/updateUserInfo"),//更新用户信息
        "act/updateMoney" => array("Mobile/Special/updateMoney"),//更新用户金钱
        "act/funcBack" => array("Mobile/Special/funcBack"),//回调
        "act/xinyunqiangFuncBack" => array("Mobile/Special/xinyunqiangFuncBack"),//幸运抢回调
        "activity/huanxinjia" => array("Mobile/Special/huanxinjia"),//幸运抢回调
        "activity/travel" => array("Mobile/Special/travel", '', array('ext' => '')),//港澳豪华游
        "activity/coupon$" => array("Mobile/Special/coupon", '', array('ext' => '')),//大礼包免费领
        "activity/qudao/:id" => array("Mobile/Special/qudao", '', array('ext' => 'html')),//流量活动推广
        "activity/zxj" => array("Mobile/Special/zxj"),//12月活动
        "activity/coupon-2" => array("Mobile/Special/zxlb"),//12月活动,2万元装修礼包
        "activity/coupon-3" => array("Mobile/Special/zxlb2"),//移动端活动广告落地页增加效果优化JS
        "activity/coupon-4" => array("Mobile/Special/zxlb4"),//移动端活动广告落地页增加效果优化JS
        "activity/coupon-5" => array("Mobile/Special/zxlb5"),//移动端活动广告落地页增加效果优化JS
        "activity/coupon-6" => array("Mobile/Special/zxlb6"),//移动端活动广告落地页增加效果优化JS
        "activity/result" => array("Mobile/Special/successResult"),//移动端活动广告落地页增加效果优化JS
        "activity/zxj-1" => array("Mobile/Special/zxj_zhengshi"),//十二月活动(正式)
        "activity/voucher-1"=>array("Mobile/Activity/voucher_paste"),
        "activity/voucher-hgj" => array("Mobile/Activity/voucher_hgj"),
        ":bm/activity/suning" => array("Mobile/Special/suning"),//12月苏宁活动
        "about/disclaimer" => array("Mobile/Article/getLegal"),//免责申明
        "about/disclaimer-zst" => array("Mobile/Article/getLegal_zst"),//复制无链接免责申明
        "activity$" => array("Activity/index", '', array('ext' => '')),
        "xzh/baojia" => array("Mobile/Xiongzhanghao/baojia"),//百度熊掌号报价页
        "xzh/details" => array("Mobile/Xiongzhanghao/baojia_details"),//百度熊掌号报价页
        ":bm/xzh/company$" => array("Mobile/Xiongzhanghao/index"),//熊掌号装修公司列表页
        ":bm/xzh/company_home/:id" => array("Mobile/Xiongzhanghao/company_home"),//熊掌号装修公司主页
        ":bm/xzh/company_case/:id" => array("Mobile/Xiongzhanghao/company_case"),//熊掌号装修公司案例页
        ":bm/xzh/company_team/:id" => array("Mobile/Xiongzhanghao/company_team"),//熊掌号装修公司设计团队页
        ":bm/xzh/company_message/:id" => array("Mobile/Xiongzhanghao/company_comment"),//熊掌号装修公司设计团队页
        "qud" => array("Mobile/Newfadan/index"),//发单2.0

        // 会销落地页
        "2019zqfh"=>array("Home/special/zhanxiao"),

        ':bm/zxinfo/:id\d' => array("Zxinfo/details", '', array('ext' => 'html')),
        ":bm/zxinfo/:category$" => array("Zxinfo/index", '', array('ext' => '')),
        //":bm/zxinfo/list-/:category-:\d"           =>  array("Zxinfo/index",'',array('ext'=>'html')),

        "/^(\w+)\/zxinfo\/list-(\d+)$/" => array("Zxinfo/index?bm=:1&page=:2", '', array('ext' => 'html')),
        "/^(\w+)\/zxinfo\/list-(\w+)-(\d+)$/" => array("Zxinfo/index?bm=:1&category=:2&page=:3", '', array('ext' => 'html')),


        ":bm/zxinfo$" => array("Zxinfo/index"),
        "hongbao" => array("Zb/hongbao"),

        /**静态设计师页面**/
        '/^designer\/(\d+)$/' => array("Mobile/Designer/index?id=:1", '', array('ext' => 'html')),
        //局部落地页
        "quanbao"              =>    array("Company/quanbao"), //装修类型落地页

        "liangfang$"              =>    array("Company/liangfang"), //免费量房落地页
        "company/recommend" => array("Mobile/Company/huanYiHuan", '', array('method' => 'post')), //推荐公司换一换
        "/^(baojia|zhaobiao|sheji|liangfang|newbaojia|baojia1|sheji-jzrk|baojia-zst|sheji-dyqd|sheji-dyqd-2|baojia-jzrk|baojia1-jzrk)\/([a-z]+)(\/)?$/" => array("Tui/index", '', array('ext' => '')), // 落地页生成 渠道JS代码 渠道推广

        ":bm$" => array("SubIndex/index", '', array('ext' => '')), //分站主页路由 -- 这个一定要放在最后！！

    ),
    'WX_APPID' => 'wx051e36a624bd7c2c',
    'WX_APPSECRET' => '14e18528a889e35e8d08d27d8331cf7b',
    'WX_URL' => 'http://m.qizuang.com/',
);
