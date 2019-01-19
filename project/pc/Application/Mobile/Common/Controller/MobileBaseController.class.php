<?php
namespace Mobile\Common\Controller;
use Think\Controller;
class MobileBaseController extends Controller {
    public $cityInfo = null;
    public function _initialize(){
        //禁止 qq管家后台扫描
        B("Home\Behavior\BrowserScanCheck");

        //如果是包含bm参数的,获取城市信息
        if(I("get.bm") !== ""){
            $bm = I("get.bm");
            //判断是否是招标，而不是城市
            if($bm != 'zhaobiao'){
                //获取城市及相邻城市的信息
                $city =  D("Common/Quyu")->getCityInfoByBm($bm);
                if(!empty($city["cid"])){
                    //将登录的城市保存到COOKIE中,下次访问的时候直接跳转到对应分站
                    setcookie("m_city_area", $bm, 0, '/', '.'.C('QZ_YUMING'));
                    //获取城市信息
                    $cityInfo = array(
                            "bm"=>$city["bm"],
                            "name"=>$city["oldName"],
                            "id" =>$city["cid"],
                            "adj_city"=>$city["adj_city"]
                                  );
                    $this->cityInfo = $cityInfo;
                    $this->assign("cityInfo",$cityInfo);
                    $_SESSION["m_cityInfo"] = $cityInfo;
                }else{
                    $this->_error();
                }
            }

        }else{
            if(isset($_SESSION["m_cityInfo"])){
                $this->assign("cityInfo",$_SESSION["m_cityInfo"]);
            }
        }
        //判断是否是搜索引擎蜘蛛
        $robotIsTrue = B("Common\Behavior\RobotCheck");
        //$robotIsTrue = true; //debug 警告线上应该为注释状态
        if (true === $robotIsTrue) {
            $this->assign('robot',1);
        }
        $this->assign('static_host',"");
        $this->assign('title',"齐装网");
        $this->assign('cityfile','http://'.OP('QINIU_DOMAIN').'/common/js/'.OP('ALL_CITY_JSON'));
    }

     //空操作
    public function _empty() {
        header("HTTP/1.1 404 Not Found");
        header("Status: 404 Not Found");
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
        $this->display('Public:404');
        die();
    }
}