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
                if(empty($go)){
                    header( "HTTP/1.1 302 Moved Permanently" );
                    $bm = $_COOKIE["m_city_area"];
                    $url ="http://".C("MOBILE_DONAMES")."/".$bm."/";
                    header( "Location:".$url);
                }
            }

        }
    }

    public function index(){
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
        $this->assign("cityInfo",$cityInfo);

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
        R("Home/Special/dazhuanpan");
        die();
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
        R("Home/Special/addspecialuser");
        die();
    }

    //设置首页弹窗不显示的COOKIE
    public function refresh(){
        R("Common/Zbfb/refresh");
        die();
    }

    //活动注册用户
    public function prize(){
        R("Home/Special/prize");
        die();
    }


     /**
     * 获取热门城市
     * @return [type] [description]
     */
    private function getHotCitys($limit = 10){
        $citys = D("Common/Area")->getHotCitys($limit);
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
        $citys = D("Common/Area")->getAllProvinceAndCitys($flag);
        return $citys;
    }
}