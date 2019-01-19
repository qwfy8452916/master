<?php
return array(
	//'配置项'=>'配置值'
	'URL_ROUTER_ON'   => true,
	'URL_ROUTE_RULES'=>array(
			"dazhuanpan"              =>    array("Index/dazhuanpan","verify=1"),//大转盘活动路由
			"city"                    =>    array("Index/index",array("go"=>"1")), //城市选择页路由
			"action"                  =>    array("Index/action"), //移动版切换到主站,加cookie标识
			"fb_order"                =>    array("Zb/fb_order"),//发布订单路由
			"muser/orderinfo/id/:id"  =>    array("Muser/index"),
			"gonglue/:category/:id"   =>    array("Article/index"), //文章详细页路由
			"gonglue/lc$"             =>    array("Zixun/zxlc",array("category"=>"shoufang")), //收房验收路由
			"gonglue/:category"       =>    array("Zixun/zxlist"), //文章列表路由带类别
			"gonglue"                 =>    array("Zixun/index"), //移动版资讯页路由
			":bm/xgt"                 =>    array("Xiaoguotu/index"), //移动版效果图页面
			":bm/company_message/:id" =>    array("Companyhome/comment"), //移动版装修公司评论页面
			":bm/blog/:id"            =>    array("Blog/index"), //移动版设计师博客页
			":bm/company_team/:id"    =>    array("Companyhome/team"), //移动版装修公司案例页路由
			":bm/caseinfo/:id"        =>    array("Cases/index"), //移动版装修公司案例页路由
			":bm/company_case/:id"    =>    array("Companyhome/cases"), //移动版装修公司案例页路由
			":bm/company_home/:id"    =>    array("Companyhome/index"), //移动版装修公司主页路由
			":bm/company"             =>    array("Company/index"), //移动版装修公司列表路由
			"company"                 =>    array("Company/index"),
			":bm/gonglue"             =>    array("Zixun/index"), //移动版文章页路由
			"xgt"                     =>    array("Xiaoguotu/index"), //移动版效果图页面路由
			"company"                 =>    array("Company/index"), //移动版装修公司列表路由
			"mzb"                     =>    array("Zb/index"), //移动端招标页路由
			"zhaobiao"                =>    array("Zb/index"), //新版本移动端招标页报价方案路由
			"sheji"                   =>    array("Zb/sheji"), //新版本移动端招标页设计方案路由
			"getLocation"             =>    array("Index/getLocation"), //获取地理信息路由
			"sendsms"                 =>    array("Index/sendsms","verify=1"),//发送短信路由
			"verifysmscode"           =>    array("Index/verifysmscode","verify=1"),//验证码路由
			"specialuser"             =>    array("Index/specialuser","verify=1"),
			"prize"                   =>    array("Index/prize","verify=1"),
			"refresh"				  =>	array("Index/refresh"),//刷新验证码路由

			"wenda$"                   		=>  array("Wenda/index"),
			'/^wenda\/ask-([0-9]+)$/'     	=>  array("Wenda/index?id=:1"),//问答列表路由
			'/^wenda\/ask-([0-9]+)(\w+)$/'	=>	array("Wenda/index?id=:1&sort=:2"),   //问答列表路由 可以优化一下
			'/^wenda\/x([0-9]+)$/'			=>	array("Wenda/show?id=:1",'',array('ext'=>'html')),      //问答详细页
			"wenda/search"					=>	array("Wenda/index"),                   //搜索

			"baike$"						=>	array("Baike/index"),                   //搜索
			'/^baike\/([0-9]+)$/'			=>	array("Baike/show?id=:1",'',array('ext'=>'html')),          //百科详细页
        	'/^baike\/([a-z]+)$/'			=>	array("Baike/category?id=:1"),      //百科分类页

        	"riji$"							=>	array("Riji/index"),
        	'/^riji\/c([0-9]+)$/'			=>	array("Riji/index?category=:1"),
	        '/^riji\/d([0-9]+)$/'			=>	array("Riji/show?id=:1",'',array('ext'=>'html')),

	        'huangli$'						=>	array("Huangli/index"),
        	'/^huangli\/bj([0-9]+)$/'		=>	array("Huangli/show?type=:1"),

        	'meitu$'						=>	array("Meitu/index"),//美图列表路由
        	'/^meitu\/p(\d+)$/'				=>	array("Meitu/show?p=:1",'',array('ext'=>'html')),//美图详情页路由
        	'/^meitu\/list-([a-z0-9]+)$/'	=>	array("Meitu/meitulist"),//美图列表路由
        	'meitu/list'					=>	array("Meitu/meitulist"), //美图列表路由

        	"about"                   		=>  array("Special/about",'',array('ext'=>'html')),//微信专页

			":bm"                     =>    array("SubIndex/index"), //分站主页路由 -- 这个一定要放在最后！！
	),
);