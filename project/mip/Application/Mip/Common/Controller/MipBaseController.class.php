<?php
namespace Mip\Common\Controller;
use Think\Controller;
class MipBaseController extends Controller {
    public $cityInfo = null;
    public function _initialize(){
        //禁止 qq管家后台扫描
        B("Common\Behavior\BrowserScanCheck");

        // 访问来源追踪,来源进行cookie标记
        // 逻辑当有get参数 src的时候,例如 ?src=video
        // 打客户端浏览器cookie标记为  cookie('src_mark', I('get.src'), 3600 * 24); // 指定cookie保存时间为24小时
        B("Common\Behavior\MarkTrackingOrderSourceCheck");
        //如果是包含bm参数的,获取城市信息
        if(I("get.bm") !== ""){
            $bm = I("get.bm");
            //判断是否是招标，而不是城市
            if($bm != 'zhaobiao'){
                $cityInfo = S("C:M:CITYINFO:".$bm);
                $f_cityInfo = S("C:M:MAPUSEINFO:".$bm);
                if (empty($cityInfo) || empty($f_cityInfo)) {
                    //获取城市及相邻城市的信息
                    $city =  D("Common/Quyu")->getCityInfoByBm($bm);
                    if(!empty($city["cid"])){
                        //获取有多少真实会员
                        $vipcount = D('User')->getRealComapnyCount($city["cid"]);
                        //$vipcount = 0;
                        if($vipcount > 0){
                            //有真会员

                            //将登录的城市保存到COOKIE中,下次访问的时候直接跳转到对应分站
                            setcookie("m_city_area", $bm, 0, '/', '.'.C('QZ_YUMING'));
                            //获取城市信息
                            $cityInfo = array(
                                    "bm"=>$city["bm"],
                                    "name"=>$city["oldName"],
                                    "id" =>$city["cid"],
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
                            $cityInfo['vipcount'] = $vipcount;
                            $f_cityInfo = $cityInfo;
                            S("C:M:CITYINFO:".$bm, $cityInfo, 15*60);
                            S("C:M:MAPUSEINFO:".$bm, $f_cityInfo, 15*60);
                        }else{
                            setcookie("m_city_area", $bm, 0, '/', '.'.C('QZ_YUMING'));
                            //获取城市信息
                            $cityInfo = array(
                                    "bm"=>$city["bm"],
                                    "name"=>$city["oldName"],
                                    "id" =>$city["cid"],
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
                            $cityInfo['vipcount'] = $vipcount;
                            S("C:M:CITYINFO:".$bm, $cityInfo, 15*60);

                            //没有真实会员，去qz_area表查询父级城市
                            $area = D("Common/Area")->getAreaInfos($city["cid"]);

                            if(empty($area)){
                                //没有父级城市
                                $f_cityInfo['id'] = '';
                                S("C:M:MAPUSEINFO:".$bm, $f_cityInfo, 15*60);
                            }else{
                                //有父级城市
                                $cid = $area['fatherid'];
                                //查询该城市是否有会员
                                $vipnum = D('User')->getRealComapnyCount($cid);
                                //$vipnum = 0;
                                if($vipnum > 0){
                                    //有会员，查询该城市信息
                                    $f_city = D("Common/Area")->getCityById($cid);
                                    $city =  D("Common/Area")->getCityInfoByBm($f_city[0]['bm']);

                                    //获取城市信息
                                    $f_cityInfo = array(
                                            "bm"=>$city["bm"],
                                            "name"=>$city["oldName"],
                                            "id" =>$city["cid"],
                                            "pid"=>$city['uid'],
                                            "adj_city"=>$city["adj_city"],
                                            "lng"=>$city["lng"],
                                            "lat"=>$city["lat"],
                                            "province"=>str_replace("省","",$city["province"]),
                                            "provincefull"=>$city["province"]
                                    );
                                    $cityArr = D('Quyu')->getAreaByFatherId($f_cityInfo['id'])[0];
                                    $f_cityInfo['cityarea'] = $cityArr['name'];
                                    $f_cityInfo['areaid'] = $cityArr['id'];
                                    $f_cityInfo['vipcount'] = $vipnum;//有真会员
                                    S("C:M:MAPUSEINFO:".$bm, $f_cityInfo, 15*60);
                                }else{
                                    //父级城市没有会员
                                    $f_cityInfo['id'] = '';
                                }
                            }
                        }
                    }else{
                        $this->_error();
                    }
                }
                setcookie("cityId_for_coldt",$cityInfo['id'],0,'/', '.'.C('QZ_YUMING'));
                $this->cityInfo = $cityInfo;
                $this->assign("cityInfo",$cityInfo);
                $this->assign("mapUseInfo",$f_cityInfo);
                $_SESSION["m_cityInfo"] = $cityInfo;
                $_SESSION["m_mapUseInfo"] = $f_cityInfo;
            }
        }else{
            if(isset($_SESSION["m_cityInfo"])){
                //添加主站标识
                setcookie("cityId_for_coldt",'000001',0,'/', '.'.C('QZ_YUMING'));
                $this->assign("is_www",1);
                $this->assign("cityInfo",$_SESSION["m_cityInfo"]);
                $this->assign("mapUseInfo",$_SESSION["m_mapUseInfo"]);
            }
        }

        //报价页弹窗页面
        if(cookie("w_index") == null){
            $page = array();
            $explode = array_filter(explode("/",$_SERVER["REQUEST_URI"]));
            if ( $explode[0] == "http:") {
                $path = strtolower($explode[3]);
                $lc = $explode[4];
            } else {
                $path = strtolower($explode[1]);
                $lc = $explode[2];
            }

            $arr = array("baike","riji","wenda");
            if($path == "" || in_array($path,$arr) || (I("get.bm") !== "" && empty($lc))){
               $this->assign("showTmp",1);
            }

            $arr = array("meitu","xgt");
            if(in_array($path,$arr) || ($path == "gonglue" && $lc == 'lc')){
                $this->assign("showTmp",2);
            }
        }

        //判断是否是搜索引擎蜘蛛
        $robotIsTrue = B("Common\Behavior\RobotCheck");
        //$robotIsTrue = true; //debug 警告线上应该为注释状态
        if (true === $robotIsTrue) {
            $this->assign('robot',1);
        }

        //基础访问域名
        $QZ_YUMING_MIP = C('QZ_YUMING_MIP');
        if (empty($QZ_YUMING_MIP)) {
            $QZ_YUMING_MIP = 'mip.qizuang.com';
        }

        $httpScheme = getScheme(true);
        $this->assign('global_httpscheme',$httpScheme);
        $this->assign('global_basehost',$httpScheme.$QZ_YUMING_MIP);

        //mip对应的m 域名
        $MOBILE_DONAMES = C('MOBILE_DONAMES');
        $this->assign('global_yuming_m',$httpScheme.$MOBILE_DONAMES);


        //静态文件域名
        $static_host = '';
        if (!empty($QZ_YUMING_MIP)) {
            $static_host = '//'.$QZ_YUMING_MIP;
        }
        $this->assign('static_host',$static_host);
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

    private function getCityLocation() {
        //导入扩展文件
        $ip = get_client_ip(0,ture);
        //$ip = "223.112.69.58";
        $url = "http://api.map.baidu.com/location/ip?ak=12a80d1749e9de182e12c6201d5e191c&ip=$ip&coor=bd09ll";
        //初始化curl
        $ch = curl_init();
        //参数设置
        curl_setopt ($ch, CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_TIMEOUT, 10);
        curl_setopt($ch,CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $hander = curl_exec($ch);
        curl_close($ch);
        if ($hander!== false) {
            $json = json_decode($hander,true);
            if ($json["status"] == 0) {
                $city = $json["content"]["address_detail"]["city"];
                $city = mb_substr($city,0,2,"utf-8");
                $info = D("Quyu")->getCityInfoByName($city);
                $info =  D("Common/Area")->getCityInfoByBm($info['bm']);
                if (count($info) > 0) {
                    $city = $info;
                    unset($info);
                }
            }
        }
        return $city;
    }
}