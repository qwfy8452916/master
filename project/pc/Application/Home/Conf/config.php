<?php
return array(
    //'配置项'=>'配置值'
    //路由配置
    'URL_ROUTER_ON'   => true,
    'URL_ROUTE_RULES'=>array(
        "ruzhu$"=>array("Home/CompanyConsult/zhaoshang"),//装修公司入驻落地页
        'zhaoshang/consult$'=>array('Home/CompanyConsult/consult','',array('method'=>'post')),//装修公司入驻落地页发起咨询
        'liansuo/verify'=>array('Home/About/verify'),//战略合作落地页验证码
        'liansuo/join'=>array('Home/About/linkUs','',array('method'=>'post')),//战略合作留言接口

        "index"=>array("http://www.qizuang.com/"),//主站带有index方法的路由
        ":a/index"=>array("http://www.qizuang.com/:1/"),//带有INDEX方法的路由
        "xiaoguotu"=>array("http://www.qizuang.com/xgt/"),//原xiaotutu访问路由
        "zixun/:category/:id"=>array("http://www.qizuang.com/gonglue/:1/:2.html"),//带参数的资讯控制器路由
        "zixun"=>array("http://www.qizuang.com/gonglue/"),//咨询控制器路由
        "tools/:id"=>array('Home/Index/tools?t=:1'),//计算器路由
        "city/baidulocation$"=>array("Home/City/BaiduLocation"),//百度城市定位接口
        "city"=>array("Home/City/index"),//城市导航路由
        "getbmbycityname"=>array("Home/City/getbmbycityname"),//城市导航路由
        'getcidbycity'=>array('Home/City/getCidByCname'),
        'getcityinfobyip' => array('Home/City/getCityInfoByIp'),
        "zhaobiao$"=>array("Home/Zb/index"),//城市导航路由
        "sheji$"=>array("Home/Zb/sheji"),//城市导航路由
        "verifyArticle"=>array("Home/Article/Verify"),//验证码路由
        "articlecomment"=>array("Home/Article/addArticleComment"),//提交评论路由
        "getComment"=>array("Home/Article/getComment"),//案例显示查询评论的路由
        "xgt/list-h0f0z0t0"=>array("http://www.qizuang.com/xgt/",301),//效果图301
        '/^xgt\/list-(h[\d+]+f[\d+]+z[\d+]+(t[\d+]+)?(p[\d+]+)?)$/'=>array("Home/Xiaoguotu/index"),//效果图无参数路由
        '/^xgt\/list-(lx[\d+]+f[\d+]+z[\d+]+(t[\d+]+)?(p[\d+]+)?)$/'=>array("Home/Xiaoguotu/index"),//效果图无参数路由
        "/^xgt$/"=>array("Home/Xiaoguotu/index"),//效果图路由

        /*S-Home/Zixun/模块*/
        //资讯首页路由
        "gonglue$"=>array("Home/zixun/index"),
        //资讯频道页路由
        "gonglue/lc$" => array("Home/zixun/lcpindao"),
        //装修指南频道页
        "zhinan$" => array("Home/zixun/zxznpindao"),
        //选材导购频道页
        "gonglue/xcdg$" => array("Home/zixun/xcdgpindao"),
        //文章搜索
        "gonglue/search$"=>array("Home/Zixun/search"),
        //装修流程路由
        //"gonglue/lc$"=>array("Home/Zixun/zxlc"),
        "/^gonglue\/list\-lc\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            "",
            array('ext'=>'html')
        ),
		//收房验收路由
        "gonglue/shoufang$"=>array("Home/Zixun/zxlc",array("category"=>"shoufang")),
        "/^gonglue\/list\-shoufang\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"shoufang"),
            array('ext'=>'html')
        ),
        //量房路由
        "gonglue/liangfang$"=>array("Home/Zixun/zxlc",array("category"=>"liangfang")),
        "/^gonglue\/list\-liangfang\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"liangfang"),
            array('ext'=>'html')
        ),
        //房产知识路由
        "gonglue/fangchan$"=>array("Home/Zixun/zxlc",array("category"=>"fangchan")),
        "/^gonglue\/list\-fangchan\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"fangchan"),
            array('ext'=>'html')
        ),
        //新闻路由
        "gonglue/xinwen$"=>array("Home/Zixun/zxlc",array("category"=>"xinwen")),
        "/^gonglue\/list\-xinwen\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"xinwen"),
            array('ext'=>'html')
        ),
        //新闻news页面路由
        "gonglue/news$"=>array("Home/Zixun/zxlc",array("category"=>"news")),
        "/^gonglue\/list\-news\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"news"),
            array('ext'=>'html')
        ),
        //看风水路由 404
        'gonglue/kanfengshui'=>array('Home/Zixun/empty'),
        "/^gonglue\/list\-kanfengshui\-([1-9]\d*)$/"=>array('Home/Zixun/empty'),
        //找公司路由
        "gonglue/gongsi$"=>array("Home/Zixun/zxlc",array("category"=>"gongsi")),
        "/^gonglue\/list\-gongsi\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"gongsi"),
            array('ext'=>'html')
        ),
        //设计预算路由
        "gonglue/shejiyusuan$"=>array("Home/Zixun/zxlc",array("category"=>"shejiyusuan")),
        "/^gonglue\/list\-shejiyusuan\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"shejiyusuan"),
            array('ext'=>'html')
        ),
        //装修选材路由
        "gonglue/xuancai$"=>array("Home/Zixun/zxlc",array("category"=>"xuancai")),
        "/^gonglue\/list\-xuancai\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"xuancai"),
            array('ext'=>'html')
        ),
        //施工阶段 拆改路由
        "gonglue/chagai$"=>array("Home/Zixun/zxlc",array("category"=>"chagai")),
        "/^gonglue\/list\-chagai\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"chagai"),
            array('ext'=>'html')
        ),
        //施工阶段 水电路由
        "gonglue/shuidian$"=>array("Home/Zixun/zxlc",array("category"=>"shuidian")),
        "/^gonglue\/list\-shuidian\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"shuidian"),
            array('ext'=>'html')
        ),
        //施工阶段 防水路由
        "gonglue/fangshui$"=>array("Home/Zixun/zxlc",array("category"=>"fangshui")),
        "/^gonglue\/list\-fangshui\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"fangshui"),
            array('ext'=>'html')
        ),
        //施工阶段 泥瓦路由
        "gonglue/niwa$"=>array("Home/Zixun/zxlc",array("category"=>"niwa")),
        "/^gonglue\/list\-niwa\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"niwa"),
            array('ext'=>'html')
        ),
        //施工阶段 木工路由
        "gonglue/mugong$"=>array("Home/Zixun/zxlc",array("category"=>"mugong")),
        "/^gonglue\/list\-mugong\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"mugong"),
            array('ext'=>'html')
        ),
        //施工阶段 油漆路由
        "gonglue/youqi$"=>array("Home/Zixun/zxlc",array("category"=>"youqi")),
        "/^gonglue\/list\-youqi\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"youqi"),
            array('ext'=>'html')
        ),
        //入住阶段 检测路由
        "gonglue/jianche$"=>array("Home/Zixun/zxlc",array("category"=>"jianche")),
        "/^gonglue\/list\-jianche\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"jianche"),
            array('ext'=>'html')
        ),
        //入住阶段 配饰路由
        "gonglue/peishi$"=>array("Home/Zixun/zxlc",array("category"=>"peishi")),
        "/^gonglue\/list\-peishi\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"peishi"),
            array('ext'=>'html')
        ),
        //入住阶段 保养路由
        "gonglue/baoyang$"=>array("Home/Zixun/zxlc",array("category"=>"baoyang")),
        "/^gonglue\/list\-baoyang\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"baoyang"),
            array('ext'=>'html')
        ),
        //入住阶段 家具生活
        "gonglue/jjsh$"=>array("Home/Zixun/zxlc",array("category"=>"jjsh")),
        "/^gonglue\/list\-jjsh\-([1-9]\d*)$/"=>array(
            "Home/Zixun/zxlc",
            array("category"=>"jjsh"),
            array('ext'=>'html')
        ),
        //seo需求-选材导购
        //"gonglue/xcdg$"=>array("Home/Zixun/xcdg",array("category"=>"xcdg")),
        "/^gonglue\/list\-xcdg\-([1-9]\d*)$/"=>array(
            "Home/Zixun/xcdg",
            array("category"=>"xcdg"),
            array('ext'=>'html')
        ),
        //新家选材分类路由列表
        //"gonglue/diban$"=>array("Home/Zixun/xcdg",array("category"=>"diban",'categoryId'=>145)),
        "/^gonglue\/list\-diban\-([1-9]\d*)$/"=>array(
            "Home/Zixun/xcdg",
            array("category"=>"diban",'categoryId'=>145),
            array('ext'=>'html')
        ),
		//SEO需求 start
		//准备阶段
		'gonglue/zhunbei$'=>array('Home/Zixun/zxlc',array('category'=>'zhunbei')),
		'/^gonglue\/list\-zhunbei\-([1-9]\d*)$/'=>array(
			'Home/Zixun/zxlc',
			array('category'=>'zhunbei'),
			array('ext'=>'html')
		),
		//准备阶段
		'gonglue/shigong$'=>array('Home/Zixun/zxlc',array('category'=>'shigong')),
		'/^gonglue\/list\-shigong$\-([1-9]\d*)$/'=>array(
			'Home/Zixun/zxlc',
			array('category'=>'shigong$'),
			array('ext'=>'html')
		),
		//入驻阶段
		'gonglue/ruzhu$'=>array('Home/Zixun/zxlc',array('category'=>'ruzhu')),
		'/^gonglue\/list\-ruzhu$\-([1-9]\d*)$/'=>array(
			'Home/Zixun/zxlc',
			array('category'=>'ruzhu$'),
			array('ext'=>'html')
		),
		//SEO需求 end

		//装修选材导购
		"/^gonglue\/list\-([a-zA-Z]+)\-([1-9]\d*)$/"=>array(
			"Home/Zixun/lclist?category=:1",
			"",
			array('ext'=>'html')
		),
		"gonglue/:category$"=>array("Home/Zixun/lclist"),
        //更多评论
        "gonglue/:category/:id/more-review$"=>array("Home/Article/more"),
        //文章路由
        "gonglue/:category/:id"=>array("Home/Article/index",'',array('ext'=>'html')),
        /*E-Home/Zixun/模块*/

        //老站文章路由
        "wwwinfo/:id$" => array("http://www.qizuang.com/gonglue/history/:1.html",301),//文章链接路由
        "wwwlist/[:id]$" =>array("http://www.qizuang.com/gonglue/history/",301),//老站总站文章列表页路由

        "public/reg"=>array("http://wlmq.qizuang.com/public/reg?from=www",301),
        "zxgs"=>array("http://www.qizuang.com/company/",301),//原主站装修公司跳转路由
        "getdetailsbyajax"=>array("Home/Zxbj/getDetailsByAjax"),//获取详细报价页面路由
        "zxbj$/[:bm]"=>array("Home/Zxbj/index"),//只能报价路由

        "verify"=>array("Home/Index/Verify"),//验证码路由
        "checkverify"=>array("Home/Index/check_verify"),//验证码验证路由

        "getconstructionprice"=>array("Home/Zxbj/getprice"),//获取装修报价路由
        "details"=>array("Home/Zxbj/getdetails"),//获取详细报价页面路由
        "caseinfo/:id"=>array("Home/Index/caseinfo"),//老版主站效果图路由
        "zixun_index"=>array("http://www.qizuang.com/gonglue/",301),//老站资讯首页路由
        "zixun_info/:id"=>array("Home/Index/zixun"),//从www主站访问的装修公司文章301到对应的分站上去
        "goodcase"=>array("http://www.qizuang.com/xgt/",301),//老版效果图页面路由
        "company_home/:id"=>array("Home/Index/company_home"),//老版装修公司
        "blog/:id"=>array("Home/Index/blog"),//老版装修公司
        "works_info/:id"=>array("Home/Index/works_info"),//老版设计师文章路由
        "works/:id"=>array("Home/Index/works"),//老版设计师设计作品路由
        "company_case/:id"=>array("Home/Index/company_case"),//老版装修公司案例路由
        "company/:id"=>array("Home/Index/company"),
        "zxgstj"=>array("Home/company/companylandpage"),//装修公司新版落地页
        "zxbaojia"=>array("Home/company/spacelandpage"),//空间装修落地页
        "jxxgt"=>array("Home/company/jxxgtLandPage"),//装修公司3d美图落地页
        "getLandList"=>array("Home/company/getLandList"),//列表页
        "addNum"=>array("Home/company/addNum"),//列表页

        "zhuangxiu" =>array("Home/company/platformlandpage"),
        // "designer/[:web]"=>array("http://www.qizuang.com",404),//老版设计师路由

        "zhuanti/2015/children"=>array("Home/Special/children"),//儿童专题页路由
        "baozhang"=>array("Home/Special/security",'',array('ext'=>'html')),             //六大保障专题页
        "zhuanti/lanren"=>array("Home/Special/lanren",'',array('ext'=>'html')),         //懒人大法专题页
            "act/qixi"=>array("Home/Special/qixi"),
            "act/guoqing"=>array("Home/Special/guoqing"),
            "activity/huanxinjia"=>array("Home/Special/huanxinjia"),//十一月活动
			":bm/activity/suning"=>array("Mobile/Special/suning"),//苏宁
            "activity/zxj"=>array("Home/Special/zxj"),//十二月活动(预热)
            "activity/zxj-1"=>array("Home/Special/zxj_zhengshi"),//十二月活动(正式)
            "activity/zxj-2"=>array("Home/Special/zxj_end"),//十二月活动(结束)
            "activity/voucher-hgj"=>array("Home/Special/voucher_hgj"),

        "mobile/zb"=>array("Home/Mobilesingle/szb"),//移动招标单页
        "zxbjwz"=>array("Zxbj/zxbjwz"),//获取装修报价位置路由
        "zxtc" => array("Zxbj/zxtc"),//获取装修报价弹窗
        '/^meitu\/p(\d+)$/'=>array("Meitu/caseinfo?p=:1",'',array('ext'=>'html')),//美图详情页路由
        '/^meitu\/list-(l[\d+]+f[\d+]+h[\d+]+c[\d+]+(p[\d+]+)?+(q[\d+]+)?)$/'=>array("Meitu/meitulist"),//美图列表路由
        "mingshi/[:shortname]/"=>array("Meitu/mingshi"),//美图大师列表
        'meitu/list$'=>array("Meitu/meitulist"),//美图列表路由
        'meitu/like'=>array("Meitu/like"),
        'meitu/closetip'=>array("Meitu/closetip"),
        'meitu/download'=>array("Meitu/download"),
        'pubmeitu/like'=>array("Pubmeitu/like"),
        "meitu/gongzhuang-l0f0m0"=>array("http://www.qizuang.com/meitu/gongzhuang/",301),//美图
        'meitu/gongzhuang$'=>array("Pubmeitu/pubMeituList"),//公装美图列表路由
        '/^meitu\/gongzhuang-(l[\d+]+f[\d+]+m[\d+]+(p[\d+]+)?+(q[\d+]+)?)$/'=>array("Pubmeitu/pubMeituList"),//公装美图列表路由
        '/^meitu\/g(\d+)$/'=>array("Pubmeitu/pubMeituInfo?id=:1",'',array('ext'=>'html')),     //工装美图详情页路由


        '/^wenda\/ask-([0-9]+)$/'=>array("Home/Wenda/category?id=:1"),              //问答列表路由
        '/^wenda\/ask-([0-9]+)\/(time|anwsers)?$/'=>array("Home/Wenda/category?id=:1&sort=:2"), //问答列表路由
        "/^wenda\/ask-([0-9]+)\/p-(\d+)$/"=>array(
            "Home/Wenda/category?id=:1&page=:2",
            "",
            array('ext'=>'html')
        ),

        '/^wenda\/x([0-9]+)$/'=>array("Home/Wenda/question?id=:1",'',array('ext'=>'html')),      //问答详细页
        "wenda/search"=>array("Home/Wenda/questionList"),                               //搜索
        "wenda/new"=>array("Home/Wenda/questionList?action=new"),                       //最新问答
        "wenda/unanswer"=>array("Home/Wenda/questionList?action=unanswer"),             //无人问答
        "wenda/hot"=>array("Home/Wenda/questionList?action=hot"),                       //最热问答
        "wenda/dist"=>array("Home/Wenda/questionList?action=dist"),                     //精华问答
        "wenda/newanswer"=>array("Home/Wenda/questionList?action=newanswer"),           //精华问答


        "wenda/addquestion"=>array("Home/Wenda/addquestion"),                           //新增问题
        "wenda/addanwser$"=>array("Home/Wenda/addanwser"),                              //新增答案
        "wenda/addcomment$"=>array("Home/Wenda/addcomment"),                            //新增回复
        "wenda/askaction$"=>array("Home/Wenda/askaction"),
        "wenda/postquestionsbycurl"=>array("Home/Wenda/postquestionsbycurl"),                              //问答操作 from Ajax action

        "wenda/upload$"=>array("Home/Wenda/upload"),                                    //问答操作 from Ajax action

        "tags$"=>array("Home/Tags/index"),                                              //标签首页
        '/^tags\/meitu([0-9]+)$/'=>array("http://meitu.qizuang.com/tags/meitu:1",301),        //美图分类
        '/^tags\/gonglue([0-9]+)$/'=>array("Home/Tags/category?cate=gonglue&id=:1"),    //攻略分类
        '/^tags\/wenda([0-9]+)$/'=>array("Home/Tags/category?cate=wenda&id=:1"),        //问答分类
        '/^tags\/riji([0-9]+)$/'=>array("Home/Tags/category?cate=riji&id=:1"),          //日记分类
        '/^tags\/baike([0-9]+)$/'=>array("Home/Tags/category?cate=baike&id=:1"),        //百科分类

        "baike$"=>array("Home/Baike/index"),                                            //百科首页
        '/^baike\/([0-9]+)$/'=>array("Home/Baike/show?id=:1",'',array('ext'=>'html')),  //百科详细页
        '/^baike\/([a-z]+)$/'=>array("Home/Baike/baikeList?url=:1", 301),                //百科分类页
        "/^baike\/([a-z]+)\/p-(\d+)$/"=>array(
            "Home/Baike/baikeList?url=:1&page=:2",
            "",
            array('ext'=>'html')
        ),
        '/^baike\/pid\/([0-9]+)$/'=>array("Home/Baike/baikeUrlJump?pid=:1"),               //一级列表页
        '/^baike\/cid\/([0-9]+)$/'=>array("Home/Baike/baikeUrlJump?cid=:1"),               //二级列表页

        //装修日记的路由
        '/^riji\/home([0-9]+)$/'=>array("Home/Diary/diary_user_list?id=:1"),            //装修日记个人主页
        '/^riji\/s([0-9]+)(-[a-z]+)?$/'=>array("Home/Diary/diary_info_list?id=:1&type=:2"),//装修日记单篇日记的列表页
        '/^riji\/d([0-9]+)$/'=>array("Home/Diary/diary_detail_info?id=:1",'',array('ext'=>'html')),//装修日记单篇日记的详情页面
        '/^riji\/list-(f[\d+]+h[\d+]+m[\d+]+s[\d+]+(p{1}[\d+]+)?)$/'=>array("Home/Diary/index?list=:1"),//日记首页列表路由
        'riji$'=>array("Home/Diary/index"),                                             //日记首页列表路由
        'add_diary_comment'=>array("Home/Diary/add_diary_comment"),                     //装修日记添加评论

        '/^huangli\/([0-9]+)-([0-9]+)$/'=>array("Home/Huangli/showlist?year=:1&month=:2"),
        '/^huangli\/([0-9]+)-([0-9]+)-([0-9]+)$/'=>array("Home/Huangli/showlist?year=:1&month=:2&day=:3",'',array('ext'=>'html')),
        '/^huangli\/bj([0-9]+)$/'=>array("Home/Huangli/showlist?type=:1"),
        "hl"=>array("Home/Huangli/zxhl"),//城市导航路由
        '/^kefu\/([a-z]+)$/'=>array("Home/Kefu/category?id=:1",'',array('ext'=>'html')),        //客服详细页

        "login"=>array("Home/Index/login"),//用户登录
        "loginin"=>array("Home/Index/loginin"),//用户登录
        "loginout"=>array("Home/Index/loginout"),//用户退出
        "run"=>array("Home/Index/run"),//登录轮询
        "collect"=>array("Home/Index/collect"),//收藏的路由

        "setwindowswitch"=>array("Home/Index/setwindowswitch"),//设置首页弹窗的cookie路由
        "refresh"=>array("Home/Index/refresh"),//刷新验证码路由
        "dispatcher"=>array("Home/Index/dispatcher"),//选择弹窗路由
        "guide"=>array("Home/Index/guide"),//装修小贴士路由
        "feedback"=>array("Home/Index/feedback"),//订单报价结果反馈
        "zbprice"=>array("Home/Index/getZbPrice"),//获取订单报价
        "fb_order"=>array("Home/Index/fb_order"),//发布订单路由
        "bjresult"=>array("Home/Index/getBJResult"),//获取订单报价
        "bjdata"=>array("Home/Zxbj/getBJData"),//获取订单报价

        "sendsms"=>array("Home/Index/sendsms"),//发送短信路由
        "verifysmscode" => array("Home/Index/verifysmscode"),//验证码路由
        "run"=>array("Home/Index/run"),//轮询查询用户是否登录路由

        "freetel"=>array("Home/Index/freetel"),                                                 //免费电话咨询
        "dazhuanpan"=>array("Special/dazhuanpan"),                                              //购物节专题页面
        "specialuser"=>array("Special/addspecialuser"),                                         //添加活动用户注册
        "prize"=>array("Special/prize"),                                                        //获取奖品路由

        '/^zt\/([0-9]+)$/'=>array("Home/Zt/show?id=:1",'',array('ext'=>'html')),                //专题详细页


        'reply' => array("Home/Index/reply"),//评论回复路由
        'replyup' => array("Home/Index/replyup"),//评论顶的路由
        'replydown' => array("Home/Index/replydown"),//评论踩的路由

        "video/jiangtang$"=>array("Home/Video/category",array("type"=>"1")),//视频讲堂路由
        "/^video\/jiangtang\/p-(\d+)$/"=>array(
            "Home/Video/category?page=:1",
            array("type"=>"1"),
            array('ext'=>'html')
        ),
        "video/toutiao$"=>array("Home/Video/category",array("type"=>"2")),//视频头条路由
        "/^video\/toutiao\/p-(\d+)$/"=>array(
            "Home/Video/category?page=:1",
            array("type"=>"2"),
            array('ext'=>'html')
        ),
        //'/^video\/v(\d+)$/'=>array("Home/Video/terminal?id=:1",'',array('ext'=>'html')),//工装美图详情页路由
        "video/:id/more-review$"=>array("Home/Video/comment"),//更多评论
        'dolike' => array("Home/Article/dolike"),//文章喜欢路由

        /**专题文章**/
        'zhuanti/jjdg$' => array("Home/Articlespecial/articlelist",array("type"=>11)),//家具导购路由
        'zhuanti/jjsh$' => array("Home/Articlespecial/articlelist",array("type"=>9)),//家居生活路由
        'zhuanti/zxsm$' => array("Home/Articlespecial/articlelist",array("type"=>10)),//装修扫盲路由
        '/^zhuanti\/([0-9]+)$/'=>array("Home/Articlespecial/module?id=:1"),//专题终端页路由
        "zhuanti/:category/:id"=>array("Home/Articlespecial/terminal",'',array('ext'=>'html')),//文章路由
        "zhuanti/likeaction"=>array("Home/Articlespecial/likeAction"),
        "zhuanti/:category/:id/more-review$"=>array("Home/Articlespecial/comment"),//更多评论
        'zhuanti$'=>array("Home/Articlespecial/index"),//文章专题路由
        "pinpai$"=>array("Home/Company/pplandpage"),
        "jb$"=>array("Home/Company/jubuzxlandpage"),//局部装修落地页

        '/^biaoqian\/tag(\d+)$/' => array("Home/Biaoqian/taglist?id=:1"),//便签页路由
        'exhibition' => array("Home/Grandprix/jiancaijz"),
        // 'hm' => array("Home/Index/hm"),//采集
        "adv"=>array("Home/Grandprix/adv"),//广告审核
        "advcity"=>array("Home/Grandprix/advcity"),//广告审核
        "getCityInfoByName" => array("Home/Index/getCityByCityName"),

        "video/videolist" => array("Home/video/videolist"),//装修视频改版列表页
        //"videolist$" => array("Home/video/videolist"),//装修视频改版列表页
        "video/videodetail" => array("Home/video/videodetail"),
        "video$" => array("Home/video/index"),//装修视频首页改版
        '/^video\/v(\d+)$/'=>array("Home/Video/videodetail?id=:1",'',array('ext'=>'html')),//装修视频详情页

        /*装修视频列表页静态路由*/
        "video/zhuangxiusj$" => array("Home/Video/videolist", array("pid"=>1)),//装修设计路由
        "video/kongjian$" => array("Home/Video/videolist", array("pid"=>1, "cid"=>1)),//装修设计下的空间利用路由
        "video/dongxian" => array("Home/Video/videolist", array("pid"=>1, "cid"=>2)),//装修设计下的动线设计路由
        "video/anli$" => array("Home/Video/videolist", array("pid"=>1, "cid"=>3)),//装修设计下的案例分享路由

        "video/jubuzx$" => array("Home/Video/videolist", array("pid"=>2)),//局部装修路由
        "video/keting$" => array("Home/Video/videolist", array("pid"=>2, "cid"=>4)),//局部装修下的客厅路由
        "video/weishengjian$" => array("Home/Video/videolist", array("pid"=>2, "cid"=>5)),//局部装修下的卫生间路由
        "video/chufang$" => array("Home/Video/videolist", array("pid"=>2, "cid"=>6)),//局部装修下的厨房路由
        "video/yangtai$" => array("Home/Video/videolist", array("pid"=>2, "cid"=>7)),//局部装修下的阳台路由
        "video/woshi$" => array("Home/Video/videolist", array("pid"=>2, "cid"=>8)),//局部装修下的卧室路由
        "video/jubuqita$" => array("Home/Video/videolist", array("pid"=>2, "cid"=>9)),//局部装修下的局部其他路由

        "video/zhuangxiusm$" => array("Home/Video/videolist", array("pid"=>3)),//装修扫盲路由
        "video/hetong$" => array("Home/Video/videolist", array("pid"=>3, "cid"=>10)),//装修扫盲下的合同签订路由
        "video/zengjian$" => array("Home/Video/videolist", array("pid"=>3, "cid"=>11)),//装修扫盲下的装修增减项路由
        "video/maoni$" => array("Home/Video/videolist", array("pid"=>3, "cid"=>12)),//装修扫盲下的装修猫腻路由
        "video/changjian$" => array("Home/Video/videolist", array("pid"=>3, "cid"=>13)),//装修扫盲下的常见问题路由

        "video/xuancaidg$" => array("Home/Video/videolist", array("pid"=>4)),//选材导购路由
        "video/cailiao$" => array("Home/Video/videolist", array("pid"=>4, "cid"=>14)),//选材导购下的装修材料路由
        "video/ruanzhuang$" => array("Home/Video/videolist", array("pid"=>4, "cid"=>15)),//选材导购下的软装搭配路由

        "quanbao"  => array("Home/company/quanbao"),//装修类型落地页

        "/^(zxbj|zhaobiao|sheji)\/([a-z]+)(\/)?$/" => array("Tui/index", '', array('ext' => '')), //推广投放页面
       //装修公司落地页
         "jxxgt"=>array("Home/company/jxxgtLandPage"),//装修公司3d美图落地页




    ),
);