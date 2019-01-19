<?php
namespace Common\Controller;
use Think\Controller;
class BaseController extends Controller {
    public $bm = "www";
    public $cityInfo = null;
    public function _initialize(){
        //静态文件路由地址
        $static_host = "";
        $this->assign("static_host",$static_host);

        $qizuang = array();
        //禁止 qq管家后台扫描
        B("Common\Behavior\BrowserScanCheck");

        // 访问来源追踪,来源进行cookie标记
        // 逻辑当有get参数 src的时候,例如 ?src=video
        // 打客户端浏览器cookie标记为  cookie('src_mark', I('get.src'), 3600 * 24); // 指定cookie保存时间为24小时
        B("Common\Behavior\MarkTrackingOrderSourceCheck");

        //设置合法的域名bm
        //设置后请更新Common/config文件的REGISTER_URL配置
        $bmList = array("www","api","u","oauthapi","m",'wxapp');

        //获取域名头
        $bm = explode(".", $_SERVER['HTTP_HOST']);
        $bm = $bm[0];
        $this->bm = $bm;

        $cityId =  D("Common/Quyu")->getCityIdByBm($bm);

        // 取出相关的城市
        if(empty($cityId) && !in_array($bm,$bmList)){
            // 数据库中无此主机头, 跳转操作
            // header('HTTP/1.1 301 Moved Permanently');
            // header("Location:http://".C("QZ_YUMINGWWW"));
/*

            //没有开站的域名访问就给404
            header("HTTP/1.1 404 Not Found");
            header("Status: 404 Not Found");*/

            $this->assign("nodomain",'1'); //赋值没有开这个域名

            $this->_empty();
            die(); //结束
        }else{
            if(empty($cityId)){
                $_SESSION["cityId"] = "000001";
            }else{
                $_SESSION["cityId"] = $cityId;
            }
        }

        if(!empty($cityId)){
            //获取城市及相邻城市的信息
            $city =  D("Common/Quyu")->getCityInfoByBm($bm);
            //将城市的bm信息保存在cookie中
            setcookie("w_cityid",$city["bm"],0,'/', '.'.C('QZ_YUMING'));
        }else{
            //如果cookie存在则表示分站跳转到总站
            if(!empty($_COOKIE["w_cityid"]) && !empty($_SERVER["HTTP_REFERER"])){
                $urlParse = parse_url($_SERVER["HTTP_REFERER"]);
                $http_bm = strstr($urlParse["host"],".",true);
                $explode = explode("/",$_SERVER["REQUEST_URI"]);
                $explode = array_filter($explode);
                $path = strtolower($explode[1]);
                $arr = array("gonglue","meitu","zxbj","riji","wenda","baike");
                if(in_array($path,$arr)){
                    //获取城市及相邻城市的信息
                    $city =  D("Common/Quyu")->getCityInfoByBm($_COOKIE["w_cityid"]);
                }
            }
        }

        //获取城市信息
        $cityInfo = array(
                "bm"=>$city["bm"],
                "name"=>$city["oldName"],
                "id" =>$city["cid"],
                "adj_city"=>$city["adj_city"],
                "usercount"=>$city["usercount"],
                "lng"=>$city["lng"],
                "lat"=>$city["lat"],
                "province"=>str_replace("省","",$city["province"])
        );

        $this->cityInfo = $cityInfo;
        $this->assign("cityInfo",$cityInfo);
        $this->assign("title",$city['oldName'].OP('QZ_SITE_NAME'));
        $this->assign('cityfile','http://'.OP('QINIU_DOMAIN').'/common/js/'.OP('ALL_CITY_JSON'));
    }

    //空操作
    public function _empty() {
        header("HTTP/1.1 404 Not Found");
        header("Status: 404 Not Found");

        $info = $this->getErrorPage();
        $this->assign("meitu",$info['meitu']);
        $this->assign("gonglue",$info['gonglue']);
        $this->assign("wenda",$info['wenda']);

        //$this->assign("citys",json_encode(getCityArray()));

        $headerTmp = "";
        if(empty($this->cityInfo["bm"])){
            $t = T("Home@Index:header");
        }else{
            if(!$robotIsTrue){
                $t = T("Sub@Index:header");
            }
        }
        $this->assign("headerTmp",$this->fetch($t));
        $this->display('Public:404');
        die();
    }

    /**
     * [_error description]
     * @return [type] [description]
     */
    public function _error(){
        header("HTTP/1.1 404 Not Found");
        header("Status: 404 Not Found");

        $info = $this->getErrorPage();
        $this->assign("meitu",$info['meitu']);
        $this->assign("gonglue",$info['gonglue']);
        $this->assign("wenda",$info['wenda']);

        //$this->assign("citys",json_encode(getCityArray()));

        $headerTmp = "";
        if(empty($this->cityInfo["bm"])){
            $t = T("Home@Index:header");
        }else{
            if(!$robotIsTrue){
                $t = T("Sub@Index:header");
            }
        }
        $this->assign("headerTmp",$this->fetch($t));
        $this->display('Public:404');
        die();
    }


    private function getErrorPage(){
        //取美图，攻略，问答的图片
        $info['meitu'] = D("Common/Meitu")->getRankMeitu(10);
        $info['gonglue'] = D('Common/Article')->getArticle(8);
        $info['wenda'] = D('Common/Ask')->getImgQuestion(8);
        return $info;
    }
}