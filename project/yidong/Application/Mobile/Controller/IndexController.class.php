<?php
/**
 * 移动端首页，城市选择页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class IndexController extends MobileBaseController {
    public function _initialize(){
        parent::_initialize();
        if(!empty($_COOKIE["m_city_area"])){
            $verify = I("get.verify");
            if(empty($verify)){
                $go = I("get.go");
                $cityname = I('get.cityname');
                if(empty($go) && empty($cityname)){
                    header( "HTTP/1.1 302 Moved Permanently" );
                    $bm = $_COOKIE["m_city_area"];
                    $url ="http://".C("MOBILE_DONAMES")."/".$bm."/";
                    header( "Location:".$url);
                }
            }
        }
    }

    public function index()
    {
        //获取轮播
        $info["lunbo"] = S("Cache:m:lunbo:www");
        if (!$info["lunbo"]) {
            //新版轮播
            $adv = $this->getNewLunboAdv("home_advbanner","000001");
            $info["lunbo"] = $adv;
            S("Cache:m:lunbo:www",$adv,900);
        }

        //装修攻略
        $info['article'] = S('C:Mobile:Index:index:article');
        if (empty($info['article'])) {
            $info['article'] = D('WwwArticle')->getArticleListByMap(array(), 3);
            S('C:Mobile:Index:index:article', $info['article'], 900);
        }

        //装修百科
        $info['baike'] = S('C:Mobile:Index:index:baike');
        if (empty($info['baike'])) {
            $info['baike'] = D('Baike')->getTopBaike(3);
            S('C:Mobile:Index:index:baike', $info['baike'], 600);
        }

        //装修经验
        $info['jingyan'] = S('C:Mobile:Index:index:jingyan:v2');
        if (empty($info['jingyan'])) {
            //流程
            $info['jingyan']['lc']['1'] = D('WwwArticle')->getArticleListByMap(array('c.pid' => 88, 'c.is_new' => 1), 1)[0];
            $info['jingyan']['lc']['2'] = D('WwwArticle')->getArticleListByMap(array('c.pid' => 93, 'c.is_new' => 1), 1)[0];
            $info['jingyan']['lc']['3'] = D('WwwArticle')->getArticleListByMap(array('c.pid' => 101, 'c.is_new' => 1), 1)[0];
            //日记
            $info['jingyan']['riji'] = D('Diary')->getMobileIndexDiaryList();
            //问答
            $info['jingyan']['wenda'] = D('Ask')->getNewQuestion(3);
            S('C:Mobile:Index:index:jingyan:v2', $info['jingyan'], 1200);
        }

        //装修公司
        $info['company'] = S('C:Mobile:Index:index:company');
        if (empty($info['company'])) {
            $info['company'] = D('Comment')->getTopCommentsByCity('', 5);
            S('C:Mobile:Index:index:company', $info['company'], 1500);
        }

        //关键字、描述、标题
        $basic["head"]["title"] = "齐装网-专业的装饰装修公司门户网站";
        $basic["head"]["keywords"] = "装修网，装修公司，装饰公司，装修报价";
        $basic["head"]["description"] = "齐装网专业的家居装饰装修门户网站，汇集全国具有性价比的装饰公司，为您和业内提供装修设计、装修公司、装修流程、装修知识等内容，让您的装修更安心！";
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];


        $this->assign('source',327);//设置发单入口标识
        $this->assign("basic",$basic);
        $this->assign("info",$info);
        $this->display();
    }

    public function city(){
        //如果是分站跳转
        $cityInfo = S('Cache:Mobile:CityInfo');
        if(!$cityInfo){
            //获取热门城市
            $citys = $this->getHotCitys(8);
            $cityInfo["hotCitys"] = $citys;
            //获取所有省份及城市 按省份
            $allCity = $this->getAllProvinceAndCitys();
            $cityInfo["allCity"] = $allCity;
            //获取所有省份及城市 按首字母
            $accordCity = $this->getAllProvinceAndCitys(true);
            $cityInfo["accordCity"] = $accordCity;
            S("Cache:Mobile:CityInfo",$cityInfo,3600*24);
        }

        //seo 标题/描述/关键字
        $basic["head"]["title"] = "齐装网分站导航-齐装网";
        $basic["head"]["keywords"] = "齐装网分站";
        $basic["head"]["description"] = "目前齐装网已经在全国包括苏州、上海、广州、天津、重庆、杭州、南京、武汉、福州、合肥、太原等200多个城市建立了分部！";

        //顶部热门城市列表
        $hotcitytop = D("Quyu")->getHotCityList(9);
        $this->assign('hotcitytop',$hotcitytop);

        //报价页面跳转回发单入口
        if (!empty($_SERVER['HTTP_REFERER'])) {
            $referer = parse_url($_SERVER['HTTP_REFERER']);
            if (C('MOBILE_DONAMES') == $referer['host']) {
                if ('qwdzbj' == trim($referer['path'], '/')||'baojia' == trim($referer['path'], '/')||'quanbao' == trim($referer['path'], '/')) {
                    $redirect['baojia'] = $referer['path'];
                    $string = '';
                    //拼接GET参数
                    if (!empty($referer['query'])) {
                        $query = explode("&", $referer['query']);
                        foreach ($query as $key => $value) {
                            $item = explode('=', $value);
                            if (2 == count($item) && 'bm' != $item['0']) {
                                $string = $string . $item['0'] . '=' . $item['1'] . '&';
                            }
                        }
                    }
                    //判断是否有GET参数
                    if (empty($string)) {
                        $redirect['baojia'] = $redirect['baojia'] . '?bm=';
                    } else {
                        $redirect['baojia'] = $redirect['baojia'] . '?' . $string . 'bm=';
                    }
                }

                if ('zxgstj' == trim($referer['path'], '/')) {
                    $redirect['zxgstj'] = '/zxgstj/';
                }
            }
        }

        $ip = get_client_ip();
        $this->assign("showall",$_SESSION["m_cityInfo"]);
        $this->assign("ip",$ip);
        $this->assign("cityInfo",$cityInfo);
        $this->assign("redirect",$redirect);
        $this->assign("basic",$basic);
        $this->display();
    }

     /**
     * 根据坐标获取当前城市
     * @return [type] [description]
     */
    public function getLocation(){
        //给定城市默认值
        $cityInfo = array(
                    "bm"=>"sz",
                    "id"=>"320500",
                    "cname"=>"苏州1",
                    "link"=>"http://m.".C('QZ_YUMING')."/sz/"
                );
        if($_POST){
            $lat = $_POST["lat"];
            $lan = $_POST["lan"];
            $url = "http://api.map.baidu.com/geocoder?location=$lat,$lan&output=json&key=D61aab638db7b99b7633e73f02f4ff7b";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_TIMEOUT, 2);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
            $hander = curl_exec($ch);
            if($hander){
                $json = json_decode($hander,true);
                $fix = array("市","区","县");
                if(strtolower($json["status"]) == "ok"){
                   $json["result"]["addressComponent"]["city"] = str_replace($fix, "", $json["result"]["addressComponent"]["city"]);
                   //根据城市名称查询城市信息
                   $city = D("Area")->getCityIdByName($json["result"]["addressComponent"]["city"]);
                   $cityInfo = array(
                            "bm"=> $city["bm"],
                            "id"=>$city["cid"],
                            "cname"=>$city["oldName"],
                            "link"=>"http://m.".C('QZ_YUMING')."/".$city["bm"]."/"
                        );
                }
            }
            $this->ajaxReturn(array("data"=>$cityInfo,"info"=>"","status"=>1));
        }
        $this->ajaxReturn(array("data"=>"","info"=>"","status"=>0));
    }


    /**
     * 返回电脑版页面
     * @return [type] [description]
     */
    public function action(){
        //设置跳转开关
        setcookie("m_to_pc", "on", time()+3600, '/', '.'.C('QZ_YUMING'));
        //获取城市简写
        if($_GET){
            if(isset($_GET["bm"]) && !empty($_GET["bm"])){
                $bm = $_GET["bm"];
            }
        }
        header('HTTP/1.1 302 Moved Temporarily');
        if(!empty($bm)){
            header("Location:http://".$bm.".".C('QZ_YUMING'))."?f=mzb";
        }else{
            header("Location:http://".C('QZ_YUMINGWWW'))."?f=mzb";
        }
    }

    public function dazhuanpan(){
        if(empty($_COOKIE["w_qizuang_first"])){
            //如果首次登陆，显示填写信息的信息框
            $this->assign("isFirst",1);
        }

        //获取中奖用户信息
        //假名单
        $prize_list = array(
                array("tel"=>"135*****565","prize"=>"智能扫地机器人"),
                array("tel"=>"189*****874","prize"=>"智能蓝牙耳机"),
                array("tel"=>"132*****314","prize"=>"精美餐具"),
                array("tel"=>"134*****234","prize"=>"音响机器人"),
                array("tel"=>"181*****786","prize"=>"精美餐具"),
                array("tel"=>"139*****125","prize"=>"智能蓝牙耳机"),
                array("tel"=>"156*****822","prize"=>"精美餐具"),
                array("tel"=>"189*****845","prize"=>"音响机器人"),
                array("tel"=>"137*****651","prize"=>"精美餐具"),
                array("tel"=>"139*****118","prize"=>"精美餐具")
        );
        //获取真名单
        $prize = D("Logactivity")->getPrizeUserList("dazhuanpan");
        $count = count($prize);
        if($count < count($prize_list)){
            //真名单数量小于家名单时
            $offset =  count($prize_list) - $count;
            shuffle($prize_list);
            $prize_list = array_slice($prize_list,0,$offset);
        }else{
            $prize_list = array();
            foreach ($prize as $key => $value) {
                $prize_list[] = array(
                            "tel"=>substr_replace($value["tel"],"*****",3,5),
                            "prize"=>$value["prize"]
                                      );
            }
        }
        $this->assign("prize_list",$prize_list);
        $this->display("m_dazhuanpan");
    }


    /**
     * 短信发送
     * @return [type] [description]
     */
    public function sendsms(){
        R("Common/Sms/sendsms");
        die();
    }

    //验证验证码是否正确
    public function verifysmscode(){
        R("Common/Sms/verifysmscode");
        die();
    }

    //活动注册用户
    public function specialuser(){
        if($_POST){
            $code = I("post.code");
            if(!empty($_SESSION["isverify"])){
                //删除认证标示
                unset($_SESSION["isverify"]);
                $data = array(
                    "name"=>I("post.name"),
                    "tel"=>I("post.tel"),
                    "address"=>I("post.address"),
                    "source"=>I("post.source"),
                    "time"=>time()
                            );
                $i = D("Activityuserinfo")->addUserInfo($data);
                if($i !== false){
                    //设置COOKIE，防止重复显示注册信息框
                    $cookie_data = serialize(array(
                            "name"=>I("post.name"),
                            "tel"=>I("post.tel")
                                         ));
                    setcookie("w_qizuang_first",$cookie_data,time()+3600*24*365,'/', '.'.C('QZ_YUMING'));
                    $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
                }
                $this->ajaxReturn(array("data"=>"","info"=>"活动发生了异常,请稍后再试！","status"=>0));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"验证码错误!","status"=>0));
        }
        $this->ajaxReturn(array("data"=>"","info"=>"非法提交","status"=>0));
    }

    //设置首页弹窗不显示的COOKIE
    public function refresh(){
        R("Common/Zbfb/refresh");
        die();
    }

    //活动注册用户
    public function prize(){
        if($_POST){
            $type = I("post.type");
            //是否已经注册
            if(empty($_COOKIE["w_qizuang_first"])){
                $this->ajaxReturn(array("data"=>"","info"=>"","status"=>4));
            }
            //查询该活动的活动信息
            $config = D("Activityconfig")->getConfig($type);
            //判断活动是否开启
            if(!$config["enabled"]){
                $this->ajaxReturn(array("data"=>"","info"=>"活动尚未开启,请耐心等待噢！","status"=>0));
            }



            //判断活动时间是否过期
            if(count($config) == 0){
                $this->ajaxReturn(array("data"=>"","info"=>"活动配置项错误,请稍后再试！","status"=>0));
            }
            //判断后动是否结束
            $date = strtotime(date("Y-m-d"));
            if($date > $config["end"]){
                $this->ajaxReturn(array("data"=>"","info"=>"活动已经结束，欢迎下次参与！","status"=>0));
            }

            //判断后动是否开始
            if($date < $config["start"]){
                $this->ajaxReturn(array("data"=>"","info"=>"活动尚未开始,请耐心等待噢！","status"=>0));
            }

            //查询该号码是否参与过活动
            $userInfo = unserialize($_COOKIE["w_qizuang_first"]);
            $count = D("Logactivity")->getActivityNowCount($userInfo["tel"]);
            if($count > 0){
                $this->ajaxReturn(array("data"=>"","info"=>"","status"=>5));
            }

            //解析COOKIE
            $userInfo = unserialize($_COOKIE["w_qizuang_first"]);

            //导入扩展文件
            import('Library.Org.Util.Prizecalculation');


            //查询活动的奖品信息
            $prizeList = D("Activityprize")->getPrizeList($type);
            if(count($prizeList) > 0){
                foreach ($prizeList as $key => $value) {
                    $data[$key] = array(
                            "prizeid"=>$key,
                            "angle"=>$value["angle"],
                            "prize"=>$value["prize"],
                            "fixed"=>$value["fixed"],
                            "v"=>$value["rate"],
                            "id"=>$value["id"]
                                    );
                    if($value["fixed"] == 1){
                        $fixed = $data[$key];
                    }
                }

                $prize = new \Prizecalculation($data);
                $result = $prize->culation($type);

                //记录抽奖日志
                $logData = array(
                        "user"=> $userInfo["name"],
                        "tel"=>$userInfo["tel"],
                        "level"=>$result["id"],
                        "status"=>0,
                        "time"=>time(),
                        "type"=>$type
                                 );
                if($result["fixed"] == 0){
                    //中奖状态
                    $logData["prize"] = $result["prize"];
                    $logData["status"] = 1;
                    //如果奖品已经发送完毕，则显示未中奖,否则修改该奖品的库存数
                    $total = $prizeList[$result["prizeid"]]["total"];
                    $use_count = $prizeList[$result["prizeid"]]["use_count"];

                    if($total == $use_count){
                        $result = $fixed;
                    }else{
                        D("Activityprize")->setPrizeCount($result["id"]);
                    }
                }
                D("Logactivity")->addLog($logData);
                $this->ajaxReturn(array("data"=>$result,"info"=>"","status"=>1));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"","status"=>0));
        }
    }

     /**
     * 获取热门城市
     * @return [type] [description]
     */
    private function getHotCitys($limit = 10){
        $citys = D("Quyu")->getHotCitys($limit);
        if(count($citys) > 0){
            return $citys;
        }
        return null;
    }
    /**
     * 获取所有省份及城市
     * @return [type] [description]
     */
    private function getAllProvinceAndCitys($flag = false){
        $citys = D("Quyu")->getAllProvinceAndCitys($flag);
        return $citys;
    }

    /**
     * 获取最新订单
     * @param  [type] $limit [description]
     * @param  [type] $on    [description]
     * @param  [type] $cs    [description]
     * @return [type]        [description]
     */
    private function getOrders($limit,$on,$cs){
        $orders = D("Common/Orders")->getNewOrders($limit,$on,$cs);
        foreach ($orders as $key => $value) {
            $min   =  rand(1,10);
            $orders[$key]["time"] = $min."分钟之前";
            //业主名称处理,取第一个字符
            $orders[$key]["name"] = mb_substr($value["name"], 0,1,"utf-8");
        }
        return $orders;
    }

    /**
     * 获取装修三步骤
     * @return [type] [description]
     */
    private function getStep($id,$limit,$isTop){
        //根据ID查询相对应的文章类别
        $result =  D("WwwArticleClass")->getArticleClassById($id);
        $category = array();
        foreach ($result["child"] as $key => $value) {
            //获取子类的文章
            $articles = D("WwwArticle")->getArticleListByIds($value["ids"],0,$limit,"",true);
            shuffle($articles);
            $articles = array_slice($articles, 0,$limit);
            foreach ($articles as $k => $val) {
               unset($articles[$k]["content"]);
               unset($articles[$k]["content"]);
               unset($articles[$k]["keywords"]);
               unset($articles[$k]["face"]);
               unset($articles[$k]["subtitle"]);
               unset($articles[$k]["imgs"]);
            }
            $category["child"][$key]["child"] = $articles;
        }
        return $category;
    }

    /**
     * 获取新版轮播
     * @param  [type] $module  [模块名]
     * @param  [type] $city_id [城市编号]
     * @param  [type] $limit   [description]
     * @return [type]          [description]
     */
    private function getNewLunboAdv($module,$city_id,$limit)
    {
        $list = D("Advbanner")->getAdvList($module,$city_id,$limit);
        foreach ($list as $key => $value) {
            //移动端图片链接优先获取移动端的，没有的情况下获取默认的
            if (!empty($value['img_url_mobile'])) {
                $list[$key]['img_url'] = $value['img_url_mobile'];
            }
            //装修公司默认如果没有链接,替换链接到公司主页
            if (empty($value['url_mobile']) && !empty($value['company_id'])) {
                $value['url_mobile'] = "http://".C('MOBILE_DONAMES')."/".$value["bm"]."company_home/".$value["company_id"]."/";
            }
            $list[$key]['url'] = $value['url_mobile'];
        }
        return $list;
    }

    //ajax,通过城市id获取BM头
    public function getcitybm()
    {
        $cityid = I("get.cs");
        $list = D("Quyu")->getCityBmById($cityid);
        if(!empty($list)){
            $this->ajaxReturn(array("data"=>"","info"=>$list['bm'],"status"=>1));
        }
        $this->ajaxReturn(array("data"=>"","info"=>'',"status"=>0));
    }

    //ajax,通过城市名获取BM头
    public function getbmbycityname()
    {
        $cname = I('get.city');
        $citys = D("Quyu")->getCityByName($cname);
        if(!empty($citys)){
            $this->ajaxReturn(array("data"=>$citys['0'],"info"=>$citys['0']['bm'],"status"=>1));
        }
        $this->ajaxReturn(array("data"=>"","info"=>"","status"=>0));
    }

    /**
     * 通过浏览器获取的城市名称，获取$cityinfo
     * @return [type] JSON [城市信息，状态： 1成功|0失败]
     */
    public function getCityByCityName() {

        $cityname = $_GET['cityname'];
        if (empty($cityname)) {
            $this->ajaxReturn(array("data"=>"","info"=>"","status"=>0));
            exit();
        }

        $cityname = mb_substr($cityname,0,2,"utf-8");
        $result = D("Quyu")->getCityInfoByName($cityname);

        if (count($result) > 0) {
            $bm = $result["bm"];
            $city = S("C:M:CITYINFO:V1:".$bm);
            if ($city === false) {
                $city = getCityInfo($bm);
                if ($city === false || count($city) == 0){
                    $this->ajaxReturn(array("info"=>"","status"=>0));
                }
            }

            if ($city !== false && count($city) > 0) {
                $cityInfo = array(
                        "bm"=>$city["bm"],
                        "name"=>$city["oldName"],
                        "id" =>$city["cid"],
                        'cid' =>$city["cid"],
                        "pid"=>$city['uid'],
                        "adj_city"=>$city["adj_city"],
                        "lng"=>$city["lng"],
                        "lat"=>$city["lat"],
                        "province"=>str_replace("省","",$city["province"]),
                        "provincefull"=>$city["province"]
                );
                $cityArr = D('Quyu')->getAreaByFatherId($cityInfo['id'])[0];
                $cityInfo['cityarea'] = $cityArr['name'];
                $cityInfo['areaid'] = $cityArr['id'];
                $cityInfo['vipcount'] = $city['vipcount'];

                $_SESSION["m_cityInfo"] = $cityInfo;
                $_SESSION["m_mapUseInfo"] = $cityInfo;

                setcookie("m_city_area", $bm, 0, '/', '.'.C('QZ_YUMING'));
                setcookie("cityId_for_coldt",$cityInfo['id'],0,'/', '.'.C('QZ_YUMING'));

                $this->ajaxReturn(array("info"=>$cityInfo,"status"=>1));
            }
            $this->ajaxReturn(array("info"=>"","status"=>0));
        }else {
            $this->ajaxReturn(array("info"=>"","status"=>0));
        }

    }
}