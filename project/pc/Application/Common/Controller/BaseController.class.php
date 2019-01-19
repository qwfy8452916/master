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
        B("Home\Behavior\BrowserScanCheck");

        // 访问来源追踪,来源进行cookie标记
        // 逻辑当有get参数 src的时候,例如 ?src=video
        // 打客户端浏览器cookie标记为  cookie('src_mark', I('get.src'), 3600 * 24); // 指定cookie保存时间为24小时
        B("Common\Behavior\MarkTrackingOrderSourceCheck");

        //设置合法的域名bm
        //设置后请更新Common/config文件的REGISTER_URL配置
        $bmList = array("www","api","u","oauthapi","m","meitu");

        //获取域名头
        $bm = explode(".", $_SERVER['HTTP_HOST']);

        $url_houst= $bm = $bm[0];

        $this->bm = $bm;
        $cityId =  D("Common/Quyu")->getCityInfoByBm($bm);
        $cityId = $cityId["cid"];
        // 取出相关的城市
        if(empty($cityId) && !in_array($bm,$bmList)){
            $this->_empty();
            die(); //结束
        }else{
            if(empty($cityId)){
                $_SESSION["cityId"] = "000001";
            }else{
                $_SESSION["cityId"] = $cityId;
            }
        }

        //首次访问之前并访问过其他分站的,主站首页访问跳转到分站首页
        if(cookie("w_cityid") != null && empty($_SERVER["HTTP_REFERER"])){
            $this->assign("redirect_url","http://".cookie("w_cityid").".".C('QZ_YUMING')."");
        }

        //如果当前的分站存在分站信息
        if (!empty($cityId)) {
            $city = getCityInfo($bm);
            cookie('w_cityid',$bm,array('expire'=>0,'domain' => '.'.C('QZ_YUMING')));
        } elseif (cookie("w_cityid") != null) {
            //如果存在分站城市标识
            $bm = cookie("w_cityid");
            $city = getCityInfo($bm);
        } else {
            //域名是主站时,如果有推广参数，www.qizuang.com/zxbj/?src=p-bd-hz-abc&bm=hz,则按照推广参数
            $bm = I("get.ct");
            if (!empty($bm)) {
                $city = getCityInfo($bm);
                setcookie("w_cityid",$city["bm"],0,'/', '.'.C('QZ_YUMING'));
            }
        }

        //非分站域名并且首次进入时
        if (in_array($bm,$bmList) && count($city) == 0) {
            if (cookie("w_cityid") != null) {
                $bm = cookie("w_cityid");
                $city = getCityInfo($bm);
            }
        }

        //如果没有获取到城市信息，IP定位
        if (count($city) == 0) {
            //ip定位
            $cityInfoByIp = json_decode(getCityInfoByIp(), true);
            if ($cityInfoByIp["status"] == 1) {
                $cookie_city = $cityInfoByIp['data'];
                $city = getCityInfo($cookie_city["bm"]);
            }
        }

        if (count($city) > 0) {
            //获取城市信息
            $cityInfo = array(
                "bm"=>$city["bm"],
                "name"=>$city["oldName"],
                "cname" => $city["oldName"],
                "id" =>$city["cid"],
                "adj_city"=>$city["adj_city"],
                "usercount"=>$city["usercount"],
                "lng"=>$city["lng"],
                "lat"=>$city["lat"],
                "province"=>str_replace("省","",$city["province"]),
                "child" => $city['child']
            );

            //添加cityInfo到cookie，用户中心使用
            $userCity = [
                "bm"=>$cityInfo["bm"],
                "name"=>$cityInfo["name"],
                "cname"=>$cityInfo["name"],
                "id" =>$cityInfo["id"]
            ];

            cookie('QZ_CITY',json_encode($userCity),array('expire'=>86400 * 7,'domain' => '.'.C('QZ_YUMING')));
            cookie('QZ_USERCITY',json_encode($userCity),array('expire'=>86400,'domain' => '.'.C('QZ_YUMING')));
            //记录PC端登陆的城市站点ID
            cookie('cityId_for_coldt',$cityInfo['id'],array('expire'=>86400,'domain' => '.'.C('QZ_YUMING')));
            $this->assign("theCityId",$cityInfo["id"]);
        } else {
            setcookie("QZ_CITY",-1,time()-1,'/', '.'.C('QZ_YUMING'));
        }

        //获取当前城市的城市信息
        if (in_array($this->bm,$bmList)) {
            $w_cityid = cookie('w_cityid');
            if ($w_cityid !== null) {
                $this->bm =  $w_cityid;
            }
        }

        $result = D("Quyu")->getCityInfoByBm($this->bm);

        if (count($result) > 0) {
            $city = array(
                "bm"=>$result["bm"],
                "name"=>$result["oldName"],
                "cname" => $result["oldName"],
                "id" =>$result["cid"],
                "adj_city"=>$result["adj_city"],
                "usercount"=>$result["usercount"],
                "lng"=>$result["lng"],
                "lat"=>$result["lat"],
                "province"=>str_replace("省","",$result["province"]),
                "child" => $result['child']
            );

            $this->cityInfo = $city;
            $this->assign("cityInfo",$city);
            //seo需求： 以www为前缀的页面，去除title中的“城市”
            if($url_houst === 'www'){
				$this->assign('title',OP('QZ_SITE_NAME'));
			}else{
				$this->assign('title',$city['name'].OP('QZ_SITE_NAME'));
			}
        }

        $this->assign('cityfile','http://'.OP('QINIU_DOMAIN').'/common/js/'.OP('ALL_CITY_JSON'));
        //获取顶部广告
        $topBanner = $this->getTopBanner($cityInfo);
        $this->assign("topbanner",$topBanner);
    }

    /**
     * 获取标识是否打开弹窗
     * @return [type] [description]
     */
    public function getShowWindowTmp()
    {
        $src = I("get.src");
        if (!empty($src)) {
            //判断来源标识是否可以打开弹窗
            $OrderSources = D("OrderSource")->findSource($src);
            if ((array_key_exists($src, $OrderSources) && !$OrderSources[$src]["isshow"])) {
                return true;
            }
        }
        return false;
    }

    //空操作
    public function _empty() {
        header("HTTP/1.1 404 Not Found");
        header("Status: 404 Not Found");

        // $info = $this->getErrorPage();
        // $this->assign("meitu",$info['meitu']);
        // $this->assign("gonglue",$info['gonglue']);
        // $this->assign("wenda",$info['wenda']);


        $headerTmp = "";
        if(empty($this->cityInfo["bm"])){
            $t = T("Home@Index:header");
        }else{
            $robotIsTrue = B('Common\Behavior\RobotCheck');
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

        // $info = $this->getErrorPage();
        // $this->assign("meitu",$info['meitu']);
        // $this->assign("gonglue",$info['gonglue']);
        // $this->assign("wenda",$info['wenda']);



        $headerTmp = "";
        if(empty($this->cityInfo["bm"])){
            $t = T("Home@Index:header");
        }else{
            $robotIsTrue = B('Common\Behavior\RobotCheck');
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

    /**
     * 获取顶部广告
     */
    private function getTopBanner($cityInfo)
    {
        //判断是否是分站
        if ($cityInfo['id']) {
            $topBannerF = D('Common/Advbanner')->getTopList('home_topbanner', $cityInfo['id']);
            if($topBannerF){
                return $topBannerF;
            }
        }
        //获取总站数据
        $topBannerZ = D('Common/Advbanner')->getTopList('home_topbanner', '000001');
        //获取全站数据
        $topBannerQ = D('Common/Advbanner')->getTopList('home_topbanner', '0');
        //同时有数据, 选开始时间后面的
        if ($topBannerZ && $topBannerQ) {
            if ($topBannerZ['start_time'] > $topBannerQ['start_time']) {
                return $topBannerZ;
            } else {
                return $topBannerQ;
            }
        }
        //一条有,一条没有
        if (!$topBannerZ && $topBannerQ) {
            return $topBannerQ;
        } else {
            return $topBannerZ;
        }
    }
}