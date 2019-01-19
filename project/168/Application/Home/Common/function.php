<?php
//获取全站城市管理权利
function getAllCityManager(){
        $all_city_manager = explode(",", OP('ALL_CITY_MANAGER'));
        return $all_city_manager;
}

/**
 * [getMyCityIds 取当前登录用户城市ID列表]
 * @return [type] [description]
 */
function getMyCityIds(){
        //主管id数组
        if(in_array(session("uc_userinfo.uid"),getAllCityManager())){
            //管理员获取所有城市
            $result = R("Api/getAllCityOnly");
            foreach ($result as $key => $value) {
                $cs[] = $value["cid"];
            }
            $cs[] = '000001';
            $cs = array_unique($cs);
        }else{
            //非管理员获取管辖城市
            $cs = array_filter(explode(",", session("uc_userinfo.cs")));
            $css = array_filter(explode(",", session("uc_userinfo.css")));
            if(!empty($css)){
                $cs = array_merge($cs,$css);
            }
        }

        return $cs;
}
/**
 * [getUserCitys 取当前登录用户城市列表]
 * @return [type]       [description]
 */
function getUserCitys($flag = true){
        //获取管辖城市信息
        $cityids = getMyCityIds();
        $citys = R("Api/getAllCityInfo",array($cityids));
        //将城市排序
        $citys = R("Api/citySort",array($citys));
        if(in_array(session("uc_userinfo.uid"),getAllCityManager())){
                if($flag){
                        array_unshift($citys,array(
                                "cname" => '- 全站 -',
                                "cid" => '0',
                                "key" => ''
                        ));
                }
        }
        //以下类型的帐号 要显示城市会员数
        if (in_array(session("uc_userinfo.uid"),array(1,39,41,45,46,62))) {
                $cityVip = S("Cache:cityVip:".session("uc_userinfo.id"));
                if(!$cityVip){
                        //非管理员，查询管辖的城市
                        $map = array(
                                "a.classid" => array("EQ",3),
                                "a.on" => array("EQ",2)
                                                 );
                        if(session("uc_userinfo.uid") != 1){
                                $map["cs"] = array("IN",getMyCityIds());
                        }
                        $cityVip = M("user")->where($map)->alias("a")
                                 ->join("inner join qz_user_company b on a.id = b.userid and fake = 0")
                                 ->field("a.cs,count(if(a.on = 2,a.id,null)) as vipcnt")
                                 ->order("vipcnt desc")
                                 ->group("a.cs")
                                 ->select();
                        S("Cache:cityVip:".session("uc_userinfo.id"),$cityVip,900);
                }
                foreach ($citys as $key => $value) {
                        foreach ($cityVip as $val) {
                                if($value["cid"] == $val["cs"]){
                                        $citys[$key]["vipcnt"] = $val["vipcnt"];
                                        $allVipCnt += $val["vipcnt"];
                                        break;
                                }
                        }
                }
                session("uc_userinfo.allVipCnt",$allVipCnt);
        }
        return $citys;
}
/**
 * [getAdminCityIds 获取登录人的城市]
 * @param  boolean $cs      [是否获取管辖城市]
 * @param  boolean $css     [是否获取代管城市]
 * @param  boolean $cs_help [是否获取帮打城市]
 * @return [array]           [城市ID数组]
 */
function getAdminCityIds($cs = true, $css = false, $cs_help = false){
        //主管id数组
        $ids = [];
        if(in_array(session("uc_userinfo.uid"),getAllCityManager())){
                //管理员获取所有城市
                $result = R("Api/getAllCity");
                foreach ($result as $key => $value) {
                        $ids[] = $value["cid"];
                }
        }else{
                //非管理员获取管辖城市
                if ($cs == true) {
                        $ids = array_filter(explode(",", session("uc_userinfo.cs")));
                }
                if ($css == true) {
                        $css = array_filter(explode(",", session("uc_userinfo.css")));
                        if(!empty($css)){
                                $ids = array_merge($ids,$css);
                        }
                }
                if ($cs_help == true) {
                        $cs_help = array_filter(explode(",", session("uc_userinfo.cs_help")));
                        if(!empty($cs_help)){
                                $ids = array_merge($ids,$cs_help);
                        }
                }
        }
        $ids = array_unique($ids);
        return $ids;
}
/**
 * [getCityListByCityIds 根据城市ID获取城市列表]
 * @param  array   $cityIds [城市ID]
 * @param  boolean $flag    [是否获取全站]
 * @return [type]           [description]
 */
function getCityListByCityIds($cityIds = [], $flag = true){
        //获取管辖城市信息
        if (empty($cityIds)) {
            return false;
        } else {
            $cityIds = is_array($cityIds) ? $cityIds : array_filter(explode(',', $cityIds));
        }
        $citys = R("Api/getAllCityInfo",array($cityIds));

        //如果有总站数据
        if (in_array("000001",$cityIds )) {
            $citys[] = array(
                    "cname" => '总站',
                    "cid" => '000001',
                    "key" => 'Z'
            );
        }

        //将城市排序
        $citys = R("Api/citySort",array($citys));
        if(in_array(session("uc_userinfo.uid"),getAllCityManager())){
                if($flag){
                        array_unshift($citys,array(
                                "cname" => '- 全站 -',
                                "cid" => '0',
                                "key" => ''
                        ));
                }
        }
        return $citys;
}
/**
 * [getOrderStatus 获取订单状态]
 * @param  string $on      [订单状态]
 * @param  string $on_sub  [订单子状态]
 * @param  string $type_fw [订单分问]
 * @return [type]          [description]
 */
function getOrderStatus($on = '0', $on_sub = '0', $type_fw = '0'){
        switch ($on) {
                case '0':
                        switch ($on_sub) {
                                case '8':
                                        $status = '扫单';
                                        break;
                                case '9':
                                        $status = '次新单';
                                        break;
                                case '10':
                                        $status = '新单';
                                        break;
                                default:
                                        $status = '未审核(子状态未知)';
                                        break;
                        }
                        break;
                case '4':
                        switch ($type_fw) {
                                case '0':
                                        $status = '有效未分配';
                                        break;
                                case '1':
                                        $status = '分单';
                                        break;
                                case '2':
                                        $status = '赠单';
                                        break;
                                case '3':
                                        $status = '分没人跟';
                                        break;
                                case '4':
                                        $status = '赠没人跟';
                                        break;
                                case '5':
                                        $status = '有效(待分配)';
                                        break;
                                case '6':
                                        $status = '有效(待分配)';
                                        break;
                                default:
                                        $status = '有效(子状态未知)';
                                        break;
                        }
                        break;
                case '2':
                        $status = '待定';
                        break;
                case '5':
                        $status = '无效';
                        break;
                case '6':
                        $status = '无效(空号)';
                        break;
                case '7':
                        $status = '无效(装修公司)';
                        break;
                case '8':
                        $status = '无效(无效咨询)';
                        break;
                case '9':
                        $status = '无效(重复订单)';
                        break;
                case '98':
                        $status = '暂时无效';
                        break;
                case '99':
                        $status = '撤回单';
                        break;
                default:
                        $status = '未知状态';
                        break;
        }
        return $status;
}
/**
 * 获取IP查询的地址，抓去百度的数据
 * @param  [type] $ip [description]
 * @return [type]     [description]
 */
function getBaiduIpAddress($ip)
{
        import('Library.Org.phpQuery.phpQuery',"",".php");
        $remote = "http://www.baidu.com/s?wd=$ip&ie=utf-8";
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $remote);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 3);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        $result = curl_exec($curl);
        curl_close($curl);
        if ($result != false) {
                phpQuery::newDocumentHTML($result);
                $html =  pq('.op-ip-detail')->find('table td')->text();
                $html = str_replace(array("IP地址:",$ip),"",$html);
                return $html;
        }
}

/**
 *
 * 带敏感信息过滤的百度搜索信息获取
 *
 * @param $phone
 * @return mixed
 */
function GetPhoneBaiduPageInfoNoNum($phone){
        if (empty($phone)) {
            return false;
        }
        $url = 'http://www.baidu.com/s?wd=' . $phone . '&ie=utf-8';

        $page = get_content_by_curl_search($url);
        $page = substr($page,strpos($page,'<div id="wrapper_wrapper">'));
        //$page    = substr($page,0,strpos($page, '<div id="page" >'));
        //echo $page;

        //载入phpquery  来处理dom
        import('Library.Org.phpQuery.phpQuery',"",".php");
        $doc = phpQuery::newDocument($page);

        $list = [];

        //被限制标识
        $isAnti = false;
        $antiNotice = [];
        $antiNotice['t'] = '<lable style="color:red">未返回信息提醒</lable>';
        $antiNotice['c'] = '<lable style="color:red">百度未返回搜索网页的相关信息<br> 请显号后去百度查询,确保手机号码的有效性<lable>';

        $resulNumsText = pq('.nums_text')->text();

        $resulNumsTextArr['t'] = '搜索结果(显示第一页)';
        $resulNumsTextArr['c'] = $resulNumsText;

        // 通过判断 百度为您找到相关结果约X个 来判断是否被anti
        if (empty($resulNumsText)) {
            //如果为空那么就是anti
            $isAnti = true;
        } else {
            //如果没找到 "百度为您找到相关结果约0个"  目前也判断为anti
            if($resulNumsText == '百度为您找到相关结果约0个'){
                $isAnti = true;
            }
            //如果没找到 "百度为您找到相关结果约1个"  目前也判断为anti
            if($resulNumsText == '百度为您找到相关结果约1个'){
                $isAnti = true;
            }
        }

        $lc  = pq('.c-container');
        foreach ($lc as $key => $value) {
             //得到标题
             $list[$key]['t'] = pq($value)->find('.t > a')->text();  //网页标题
             //得到描述
             $list[$key]['c'] = pq($value)->find('.c-abstract')->text();  //网页描述

            //归属地信息处理
            if(empty($list[$key]['t'])) {
                $list[$key]['t'] = $phone;
            }
            $locationInfo = pq($value)->find('.op_mobilephone_r')->text(); //正常号码归属地
            $locationInfoK = pq($value)->find('.c-border')->text(); //百度框计算结果
            if (!empty($locationInfoK)) {
                $list[$key]['c'] = $locationInfoK;
            }
            if(!empty($locationInfo)) {
                $list[$key]['c'] = $locationInfo;
                if (empty($list[$key]['c'])) {
                    $list[$key]['c'] = "  ";
                }
            }

        }
        unset($lc);
        unset($doc);

        //头部放入搜索结果
        array_unshift($list,$resulNumsTextArr);

        //替换号码 达到隐藏目的
        safeSearchList($list, $phone);

        //放入anti提示
        if($isAnti) {
            array_unshift($list,$antiNotice);
        }

        return $list;
}

/**
 * 带敏感信息过滤的360搜索信息获取
 * @param $phone
 * @return mixed
 */
function GetPhone360searchPageInfoNoNum($phone){
        //$starttime = microtime();
        if (empty($phone)) {
            return false;
        }
        $url = 'http://www.haosou.com/s?&q=' . $phone;
        $options = array(
                     'http' => array(
                                             'timeout' => 10, //设置一个超时时间，单位为秒
                                             //'proxy'   => 'tcp://10.10.174.223:7777', //设置一个http代理服务器
                                        )
                 );
        $context = stream_context_create($options);
        $page    = file_get_contents($url, false, $context);
        $page    = substr($page,strpos($page,'<div id="container">'));
        $page    = substr($page,0,strpos($page, '<div id="page">'));
        //载入phpquery  来处理dom
        import('Library.Org.phpQuery.phpQuery',"",".php");
        $doc = phpQuery::newDocument($page);
        $lc  = pq('ul > li');
        foreach ($lc as $key => $value) {
            $ones = [];
             //得到标题
            $ones['t'] = pq($value)->find('.res-title > a')->text();  //网页标题
             //得到描述
            $ones['c'] = pq($value)->find('.res-desc')->text();  //网页描述

            // 归属地信息
            $locationInfo = pq($value)->find('.mh-detail')->text(); //正常号码归属地
            if (!empty($locationInfo)){
                $ones['t'] = pq($value)->find('#mohe-mobilecheck > div > h3 > a')->text();
                $ones['c'] = $locationInfo;
                $ones['c'] .= "<br/>". pq($value)->find('.mohe-mobileInfoContent > div > div > p:nth-child(3)')->text();
                //$list[$key]['img'] = pq($value)->find('.mohe-tips'); //360为了防止抓取 号码信息为 base64图片
            }
            if(!empty($ones['t']) || !empty($ones['c'])) {
                $list[$key] = $ones;
            }
        }
        unset($lc);
        unset($doc);

        //替换号码 达到隐藏目的
        safeSearchList($list, $phone);

        return $list;
}

/**
 * 带敏感信息过滤的搜狗搜索信息获取
 * @param $phone
 * @return mixed
 */
function GetPhoneSogouSearchPageInfoNoNum($phone){
    if (empty($phone)) {
        return false;
    }
    $url = 'http://www.sogou.com/web?query=' . $phone . '&ie=utf-8';

    $page = get_content_by_curl_search($url);
    //$page = substr($page,strpos($page,'<div id="wrapper_wrapper">'));
    //$page    = substr($page,0,strpos($page, '<div id="page" >'));
    //echo $page;

    //载入phpquery  来处理dom
    import('Library.Org.phpQuery.phpQuery',"",".php");
    $doc = phpQuery::newDocument($page);

    $list = [];
    //构建返回的数据结构为
    //list[0]['t'] 为title 标题
    //list[0]['c'] 为content内容

    // 搜索结果返回信息 搜狗已为您找到约68条相关结果
    $resulNumsText = pq('.num-tips')->text();
    $resulNumsTextArr['t'] = '搜索结果(显示第一页)';
    $resulNumsTextArr['c'] = $resulNumsText;

    $lc  = pq('.rb');
    foreach ($lc as $key => $value) {
        //得到标题
        $list[$key]['t'] = pq($value)->find('.pt')->text();  //网页标题
        //dump($list[$key]['t']);

        //得到描述
        $content1 = pq($value)->find('.ft')->text();  //网页描述

        //得到描述 底部内容
        $content2 = pq($value)->find('.fb > cite')->text();  //得到描述 底部内容
        $content2 = str_replace("翻译此页","",$content2);

        $list[$key]['c'] = $content1. '<br/>' . $content2;
    }
    unset($lc);
    unset($doc);

    //头部加入
    array_unshift($list, $resulNumsTextArr);

    //如果≤1条就提示未搜索到
    //默认1条为js动态的 归属地信息,无法直接从页面抓取所以忽略
    if(count($list) <= 1) {
        $list = [];
        $notice = [];
        $notice['t'] = '未返回信息提醒';
        $notice['c'] = '未返回搜索内容的相关网页信息';
        $list[] = $notice;
    }

    safeSearchList($list, $phone);

    return $list;
}

/**
 * 带敏感信息过滤的神马搜索信息获取
 * @param $phone
 * @return mixed
 */
function GetPhoneSmSearchPageInfoNoNum($phone){
    if (empty($phone)) {
        return false;
    }
    $url = 'https://m.sm.cn/s?q=' . $phone . '&by=submit&snum=0';

    $page = get_content_by_curl_search($url);
    //$page = substr($page,strpos($page,'<div id="content">'));
    //$page    = substr($page,0,strpos($page, '<div id="page" >'));
    //echo $page;

    //载入phpquery  来处理dom
    import('Library.Org.phpQuery.phpQuery',"",".php");
    $doc = phpQuery::newDocument($page);
    //dump($doc);

    $list = [];
    //构建返回的数据结构为
    //list[0]['t'] 为title 标题
    //list[0]['c'] 为content内容

    //普通搜索结果列表
    $lc  = pq('.article');
    //dump(count($lc));

    foreach ($lc as $key => $value) {
        //得到标题
        $list[$key]['t'] = pq($value)->find('h2')->text();  //网页标题
        //dump($list[$key]['t']);

        //得到描述
        $content1 = pq($value)->find('p')->text();  //网页描述

        //得到描述 底部内容
        $content2 = pq($value)->find('.other')->text();  //得到描述 底部内容

        $list[$key]['c'] = $content1. '<br/>' . $content2;

    }
    unset($lc);
    unset($doc);

    //头部放入搜索结果
    //array_unshift($list,$resulNumsTextArr);


    //如果≤0条就提示未搜索到
    if(count($list) <= 0) {
        $list = [];
        $notice = [];
        $notice['t'] = '未返回信息提醒';
        $notice['c'] = '未返回搜索内容的相关网页信息';
        $list[] = $notice;
    }

    safeSearchList($list, $phone);


    return $list;
}

/**
 *
 * 处理搜索引擎搜索结果中的号码
 * 替换为*
 *
 * @param $arr
 * @param string $phone
 * @param bool $htmlspecialchars 是否转义默认不转义
 */
function safeSearchList(&$arr, $phone='', $htmlspecialchars=false) {
    //替换号码 达到隐藏目的
    foreach ($arr as $key => &$value) {
        $search = array(
            "/$phone/",
            '/\d{7}/',
        );
        $replace = array(
            substr($phone,0,3).'*****'.substr($phone,-3),
            '8888888',
        );
        $value['t'] = preg_replace($search,$replace, $value['t']);
        $value['c'] = preg_replace($search,$replace, $value['c']);
        if($htmlspecialchars){
            $value['t'] = htmlspecialchars($value['t']);
            $value['c'] = htmlspecialchars($value['c']);
        }
    }
}

/**
 * [get_content_by_curl_search 直接抓取页面，可以抓取https]
 *
 * 注意本函数为搜索引擎抓取专用,会使用代理
 *
 * @param  [type]  $url  [地址]
 * @param  boolean $gzip [是否开启gzip]
 * @return [type]        [description]
 */
function get_content_by_curl_search($url, $gzip=false){

    //如果配置的代理不为空那么加上代理
    $httproxy_server = D("Options")->getOptionNameCC("order_tel_search_httpproxy_server");
    $httpproxy_userpwd = D("Options")->getOptionNameCC("order_tel_search_httpproxy_userpwd");
    $httproxy_server = $httproxy_server['option_value'];
    $httpproxy_userpwd = $httpproxy_userpwd['option_value'];

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($curl,CURLOPT_TIMEOUT,15);//数据接收超时15秒
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    if(!empty($httproxy_server)){
        curl_setopt($curl, CURLOPT_PROXY, $httproxy_server);
        curl_setopt($curl, CURLOPT_PROXYUSERPWD,$httpproxy_userpwd);
    }
    if($gzip) curl_setopt($curl, CURLOPT_ENCODING, "gzip"); // 关键在这里
    $content = curl_exec($curl);
    curl_close($curl);
    return $content;
}

/**
 * [get_content_by_curl 直接抓取页面，可以抓取https]
 * @param  [type]  $url  [地址]
 * @param  boolean $gzip [是否开启gzip]
 * @return [type]        [description]
 */
function get_content_by_curl($url, $gzip=false){
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($curl,CURLOPT_TIMEOUT,15);//数据接收超时15秒
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        if($gzip) curl_setopt($curl, CURLOPT_ENCODING, "gzip"); // 关键在这里
        $content = curl_exec($curl);
        curl_close($curl);
        return $content;
}
/**
 * 分词
 * @param  [type] $str [description]
 * @return [type]      [description]
 */
function getFenCi($str)
{
    $url = 'http://www.xunsearch.com/scws/api.php';
    $data = array(
            "data" => $str,
            "respond" => "json",
            "charset" => "utf8",
            "ignore" => "yes"
    );
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
    curl_setopt($ch, CURLOPT_POST, 1 );
    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data );
    $hander = curl_exec($ch);
    curl_close($ch);
    if($hander !==false){
                $json = json_decode($hander, true);
                if($json['status'] == "ok"){
                        $result = $json['words'];
                }
    }else{
        return false;
    }
    return $result;
}
/**
     * [order_tel_encrypt 电话号码加密 手动加盐]
     * @param  [type] $tel [电话号码]
     * @return [type]      [md5($tel.$salt)密文]
*/
function order_tel_encrypt($tel) {
            return md5($tel . C('QZ_YUMING'));
}
function url_getdwz($orderid)
{
        //判断传入的url不能为空
        if (empty($orderid)) {
                return "";
        }
     //先去查redis缓存
     $retSet = array();
     $redis  = new Redis();
        if ($redis->connect(C('REDIS_HOST'), C('REDIS_PORT'), 1)) {
                 $redis->select(C('REDIS_DB_STAT')); //选择库
                 $tl = $redis->hGet('muser_dwz',$orderid);  //取hash值
                 if (!empty($tl)) {
                         return$tl;
                 }
        }
        //网络 sina api接口生成短网址
        import('Library.Org.Util.App');
        $app = new \app();
        $dwzurl   = $app->GetSinaDwz('http://old.qizuang.com/muser/orderinfo/id/'.$orderid);
        if (!empty($dwzurl)) {
                return  $dwzurl;
        }
        return "";
}
//Tags处理：新标签，旧标签，类型
function getTags($tagsName,$oldTags,$type){
        $edit = false;
        //原来的Tags 旧标签 全部清理原来的旧标签。
        if(!is_array($oldTags)){
                $oldTags = array_filter(explode(",",$oldTags));
        }
        //**一。如果新标签和旧标签都为空直接返回 - 没有标签**//
        if(empty($tagsName) && empty($oldTags)){
                return array('result' => '', 'edit'=>$edit);
        }
        //规定字段
        $countField = array('1'=>'article_count','2'=>'meitu_count','3'=>'diary_count','4'=>'ask_count','5'=>'subarticle_count','6'=>'baike_count');
        $countField = $countField[$type];
        //二。如果新标签为空，旧标签不为空，可以理解为删除标签**//
        if(empty($tagsName) && !empty($oldTags)){
                foreach ($oldTags as $k => $v) {
                        $v = trim($v);
                        //如果值不为空
                        if(!empty($v)){
                                //dump('新标签为空，旧标签不为空: '.$v.'从数据库中减1');
                                //从数据库中减1
                                $edit = true;
                                D("Tags")->setTagsNum($v,'Dec',$countField);
                        }
                }
                return array('result' => '', 'edit'=>$edit);
        }
        //三。分割，合并，清理标签**//
        $tagsName = str_replace(array(' ','，',',','?','？','!','！','~','-','@'),',',$tagsName);
        $tag_arr = array_unique(array_filter(explode(",",$tagsName))); //数组形式
        $tagsName = implode($tag_arr,",");//字符串形式
        //查询标签是否已存在数据库 （数据库中不应有重复标签）
        $isInTags = D("Tags")->findTagsByName($tagsName);
        //重组数据 $newTags 为 数据库中存在的Tags
        foreach ($isInTags as $k => $v){
                $newTags[$v['name']] = $v;
        }
        //循环输入的Tags
        foreach ($tag_arr as $k => $v){
                $v = trim($v);
                //如果值不为空
                if(!empty($v)){
                        //如果数据库中已存在此Tags
                        if(!empty($newTags[$v])){
                                //记录此Tag的ID
                                $tagsId .= $newTags[$v]['id'].',';
                                //如果本次Tag不存在于之前的Tags
                                if(!in_array($newTags[$v]['id'],$oldTags)){
                                        //数据库中加 1
                                        D("Tags")->setTagsNum($newTags[$v]['id'],'Inc',$countField);
                                        $edit = true;
                                }
                        }else{
                                //不存在，增加l，注意：此处已经为该字段的tag增加1了
                                $tagData = array("name" => $v,"type" => $type,"time" => time(),$countField => '1',);
                                $i = D("Tags")->addTags($tagData);
                                $tagsId .= $i.",";
                                $edit = true;
                        }
                }
        }
        //取最新Tags的ID数组
        $newTagsArray = array_unique(array_filter(explode(",",$tagsId)));
        $tags = implode($newTagsArray,",").',';
        //开始删除Tags统计处理
        foreach ($oldTags as $k => $v) {
                if(!in_array($v,$newTagsArray)){
                        //从数据库中减1
                        D("Tags")->setTagsNum($v,'Dec',$countField);
                        $edit = true;
                }
        }
        return array('result' => $tags, 'edit'=>$edit);
}
//分割，合并，清理标签
function clearTags ($tags){
    $tags = str_replace(array(' ','，',',','?','？','!','！','~','-','@'),',',$tags);
    $tags = array_unique(array_filter(explode(",",$tags))); //数组形式
    return implode($tags,",");//字符串形式
}
//检测字符串长度是否合格
function checkLength($str,$min,$max){
    return (strlen($str)>$max||strlen($str)<$min) ? false : true;
}

/**
 * Gets the sale user name.
 *
 * @param      integer  $uid    The user id
 *
 * @return     string   The sale user name.
 */
function getSaleUserName($uid){
    $userList = S("Cache:User:Sales");

    if(empty($userList)){
        $saleUsers = D('SalesSetting')->getSaleUsers();
        foreach ($saleUsers as $key => $value) {
            $userList[$value['id']] = $value;
        }
        S('Cache:User:Sales',$userList,900);
    }
    if(empty($uid)){
        $userList[$uid]['name'] = '-';
    }else{
        $userList[$uid]['name']= str_replace('商务', '', $userList[$uid]['name']);
        $userList[$uid]['name']= str_replace('外销', '', $userList[$uid]['name']);
    }

    return $userList[$uid]['name'];
}

/**
 * 获取时间段内本月天数
 *
 * @param      integer  $startTime     The start time
 * @param      integer  $endTime       The end time
 * @param      integer  $beginOfMonth  The begin of month
 * @param      integer  $endOfMonth    The end of month
 *
 * @return     integer  The this month day.
 */
function getThisMonthDay($startTime,$endTime,$BeginOfMonth){

    $BOM = date('Y-m'.'-01',$BeginOfMonth);
    $EOM = date('Y-m-t',$BeginOfMonth);

    $day = '0';

    //开始时间 小于 本月开始时间
    if($startTime <= $BOM){
        //结束时间 小于 本月结束时间
        if($endTime <= $EOM){
            $day = date('j',strtotime($endTime));
        }
        //结束时间 大于 本月结束时间
        if($endTime > $EOM){
            $day = date('t',$BeginOfMonth);
        }
    }

    //开始时间 大于 本月开始时间
    if($startTime > $BOM){
        //结束时间 小于 本月结束时间
        if($endTime < $EOM){
            $day = ((strtotime($endTime) - strtotime($startTime)) / 86400) + 1;
        }
        //结束时间 大于 本月结束时间
        if($endTime > $EOM){
            $day = ((strtotime($EOM) - strtotime($startTime)) / 86400) + 1;
        }
    }
    return $day;
}


/**
 * 导入excel文件
 * @param  string $file excel文件路径
 * @return array        excel文件内容数组
 */
function importExcel($file){
    $type = pathinfo($file);
    $type = strtolower($type["extension"]);

    if ($type == 'xlsx') {
        $type = 'Excel2007';
    } elseif ($type == 'xls') {
        $type = 'Excel5';
    }

    ini_set('max_execution_time', '0');
    import('Library.Org.Phpexcel.PHPExcel',"",".php");
    import('Library.Org.Phpexcel.PHPExcel.Writer.Excel2007',"",".php");

    $objReader = PHPExcel_IOFactory::createReader($type);
    return $objReader->load($file)->getActiveSheet()->toArray();
}

/**
 * 新销售---根据角色职位和ID查询管辖城市
 */
function getUserSaleCitys(){
    $map['dept'] = $_SESSION['uc_userinfo']['department_id'];
    $map['role_name'] = $_SESSION['uc_userinfo']['role_name'];
    $map['id'] = $_SESSION['uc_userinfo']['id'];

    //超级权限类别
    $manager = array(1,37,46,51);

    if(in_array($_SESSION['uc_userinfo']['uid'], $manager)){
        $citys = D('SaleSetting')->getAllCitys();//超级管理员及销售司令能查看所有城市
    }else{
        //部门
        if($map['dept'] == 5){
            //外销
            $where['dept'] = 2;
        }elseif($map['dept'] == 6){
            //商务
            $where['dept'] = 1;
        }
        if (count($where) == 0) {
             return $citys;
        }
        //根据商务、外销职位数组
        $position = getUserPosition($where['dept'],$map['role_name']);
        if($position != 'assistant'){
            $where[$position] = $map['id'];
        }
        $citys = D('SaleSetting')->getManageCitys($where);//普通职位只能查看自己管辖的城市
    }

    return $citys;
}

/**
 * 新销售---根据角色职位和ID返回部门
 */
function getUserDepartment()
{
    $map['dept'] = $_SESSION['uc_userinfo']['department_id'];
    $map['role_name'] = $_SESSION['uc_userinfo']['role_name'];
    //超级权限类别
    $manager = ['超级管理员','销售副总','技术-后端管理'];
    if(in_array($map['role_name'], $manager)){
        $department = 0;//超级管理员及销售司令能查看所有
    }else{
        //部门
        if($map['dept'] == 5){
            //外销
            $department = 2;
        }elseif($map['dept'] == 6){
            //商务
            $department = 1;
        }
    }
    return $department;
}

function getUserPosition($dept,$role)
{
    //根据商务、外销职位数组
    //商务职位数组
    $shangwu = [
        '商务经理'      => 'corps',//军长
        '商务助理'      => 'assistant',//助理
        '商务拓展经理'    => 'dev_division',//拓展师长
        '商务拓展督导'    => 'dev_regiment',//拓展团长
        '商务拓展城市经理'    => 'dev_manage',//城市经理
        '商务品牌经理'      => 'brand_division',//品牌师长
        '商务品牌督导'      => 'brand_regiment',//品牌团长
        '商务品牌师'       => 'brand_manage'//品牌师
    ];

    //外销职位数组
    $waixiao = [
        '外销经理'      => 'corps',//军长
        '外销助理'      => 'assistant',//助理
        '拓展经理'      => 'dev_division',//拓展师长
        '外销区域经理'    => 'dev_regiment',//拓展团长
        '销售'            => 'dev_manage',//城市经理
        '督导'            => 'dev_manage',//城市经理
        '品牌经理'      => 'brand_division',//品牌师长
        '品牌督导'      => 'brand_regiment',//品牌团长
        '品牌师'       => 'brand_manage'//品牌师
    ];
    //获取职位字段名称
    if($dept == 1){
        $position = $shangwu[$role];
    }elseif($dept == 2){
        $position = $waixiao[$role];
    }
    return $position;
}

//快速将后台销售快递信息按照邮寄时间分组
function array_val_chunk($array){
    $result = array();
    foreach ($array as $key => $value) {
      $result[$value['signtime']][] = $value;
    }
    $ret = array();
    foreach ($result as $key => $value) {
      array_push($ret, $value);
    }
    return $ret;
}

if (!function_exists('array_column')) {
    function array_column(array $array, $column_key, $index_key = null)
    {
        $result = [];
        foreach ($array as $arr) {
            if (!is_array($arr)) continue;

            if (is_null($column_key)) {
                $value = $arr;
            } else {
                $value = $arr[$column_key];
            }

            if (!is_null($index_key)) {
                $key = $arr[$index_key];
                $result[$key] = $value;
            } else {
                $result[] = $value;
            }
        }
        return $result;
    }
}

/**
 * 不重复随机数组
 * @param  [type] $min [description]
 * @param  [type] $max [description]
 * @param  [type] $num [description]
 * @return [type]      [description]
 */
function unique_rand($limit = 12) {
    $numbers = str_replace(" ","",microtime());
    $numbers = str_replace("0.","",$numbers);
    $numbers = str_split($numbers);
    shuffle($numbers);
    return implode(array_slice($numbers,$limit));
}

/**
 * 验证用户菜单权限
 * @param  string $path [description]
 * @return [type]       [description]
 */
function check_user_menu_auth($path = "")
{
    //获取自己的菜单
    $path = getUrlPath($path);
    $flag = true;
    if(!empty($path)){
        $menus = getMenuList(true);
        foreach ($menus as $key => $value) {
            $link = getUrlPath($value["link"]);
            if($path == $link && $value["version"] == 2){
                $nodeId[] = $value["nodeid"];
                $menu[] = $value;
            }
        }

        //先找出所有符合URL的菜单的父类信息
        foreach ($menu as $key => $value) {
            foreach ($menus as $k => $val) {
                if ($value["parentid"] == $val["nodeid"]  && $value["version"] == 2) {
                    $link =  getUrlPath($val["link"]);
                    $prentList[$link] = $val;
                    break;
                }
            }
        }

        //获取当前的父菜单信息
        if (count($prentList) > 1) {
            //获取当前的父菜单信息
            $referer = getUrlPath($_SERVER["REQUEST_URI"]);
            $nowLink = $prentList[$referer];
        } else {
            $nowLink = current($prentList);
        }

        if (count($nowLink) > 0) {
            //获取父类菜单的子类信息
            foreach ($menus as $k => $val) {
                if ($nowLink["nodeid"] == $val["parentid"]  && $value["version"] == 2) {
                    $nowLinkChild[] = $val["nodeid"];
                }
            }
        }

        //定位当前的页面
        foreach ($menu as $key => $value) {
            if (in_array($value["nodeid"],$nowLinkChild)) {
                $nowMenu = $value;
                break;
            }
        }

        if (count($nowMenu) > 0 ) {
            if ($nowMenu["enabled"] == 0) {
                $flag = false;
            } else {
                if(session("uc_userinfo.uid") != 1){
                    $auth_menu = session("uc_userinfo.auth_menu");
                    if(count($nowMenu) > 0 ){
                        if (!array_key_exists($nowMenu["nodeid"], $auth_menu)) {
                            $flag = false;
                        }
                    }
                }
            }
        }
    }
    return $flag;
}

function getUrlPath($url) {
    $urlParse = parse_url($url);
    $path = $urlParse["path"];
    //过滤掉多余的反斜杠
    $reg = '/\/+/';
    $path = preg_replace($reg, "/", $path);
    //过滤最后一个反斜杠
    $reg = '/\/$/';
    $path = preg_replace($reg, "", $path);
    return $path;
}

/**
 * 获取所有的系统菜单
 * @param  boolean $all [全部显示标识]
 * @return [type]       [description]
 */
function getMenuList($all = true){
    $menus = S("Cache:system_menus");
    if(!$menus){
        $result = D("SystemMenu")->getMenuList();
        $menus = $result;
        S("Cache:system_menus",$menus,3600*24);
    }

    if(!$all){
        foreach ($menus as $key => $value) {
            if(!$value["enabled"]){
                unset($menus[$key]);
            }
        }
    }
    return $menus;
}

/**
 *计算日期差
 * author: mcj
 */
if (!function_exists('day_diff')) {
    function day_diff($date1, $date2)
    {
        $datetime1 = date_create($date1);
        $datetime2 = date_create($date2);
        $interval = date_diff($datetime1, $datetime2);
        return $interval->format('%R%a');
    }
}

/**
 * 根据起点坐标和终点坐标测距离
 * @param  [array]   $from  [起点坐标(经纬度),例如:array(118.012951,36.810024)]
 * @param  [array]   $to    [终点坐标(经纬度)]
 * @param  [bool]    $km        是否以公里为单位 false:米 true:公里(千米)
 * @param  [int]     $decimal   精度 保留小数位数
 * @return [string]  距离数值
 */
function get_distance($from,$to,$km = true,$decimal = 2){
    sort($from);
    sort($to);
    $EARTH_RADIUS = 6370.996; // 地球半径系数

    $distance = $EARTH_RADIUS*2*asin(sqrt(pow(sin( ($from[0]*pi()/180-$to[0]*pi()/180)/2),2)+cos($from[0]*pi()/180)*cos($to[0]*pi()/180)* pow(sin( ($from[1]*pi()/180-$to[1]*pi()/180)/2),2)))*1000;

    if($km){
        $distance = $distance / 1000;
    }
    return round($distance, $decimal);
}
