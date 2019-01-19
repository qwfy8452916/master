<?php
/**
 * 用户后台主页控制器
 * 装修公司、设计师、业主的主页都此控制器
 */
namespace User\Controller;
use User\Common\Controller\UserCenterBaseController;
class HomeController extends UserCenterBaseController{
    public function _initialize(){
        parent::_initialize();
        if(!isset($_SESSION["u_userInfo"])){
           header("LOCATION:http://u.qizuang.com");
        }
    }

    public function index(){
        //获取登录后的session
        $classid = $_SESSION["u_userInfo"]["classid"];
        switch ($classid) {
            case '1':
                //业主
                $tmp = "User/index";
                $user = $this->getUserInfoByAdmin($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"],1);
                $info["user"] = $user;
                $info["user"]["tel_safe"] =substr_replace($info["user"]["tel_safe"],"*****",3,5);
                $mail = strstr($info["user"]["mail_safe"],"@",true);
                $prefix = strstr($user["mail_safe"],"@");
                $info["user"]["mail_safe"] =substr_replace($mail,"*****",3,5).$prefix;
                $info["user"]["unreadsystem"] = $this->getUnSystemNoticeCount($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"],1);
                //如果城市字段为空，则先选择所在城市
                if(empty($_SESSION["u_userInfo"]["cs"])){

                    $citytmp = $this->fetch("Home/citytmp");
                    $this->assign("citytmp",$citytmp);
                }
                //获取最新的发布订单
                $order = D("Orders")->getLastOrderInfoById($user["id"],$user["tel_safe"],$user["tel_safe_chk"]);
                if(count($order) > 0){
                    $info["order"] = $order;
                }
                break;
            case '2':
                //设计师
                $tmp = "Designer/index";
                $user = $this->getDesingerInfoByAdmin($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"],2);
                //如果城市字段为空，则先选择所在城市
                if(empty($_SESSION["u_userInfo"]["cs"])){

                    $citytmp = $this->fetch("Home/citytmp");
                    $this->assign("citytmp",$citytmp);
                }
                $info["user"] = $user;
                $info["user"]["unreadsystem"] = $this->getUnSystemNoticeCount($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"],2);
                break;
            case '3':
                //装修公司
                //获取装修公司的基本信息
                $user = $this->getCompanyInfoByAdmin($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"]);
                $beforeTime = strtotime("-7 day");
                if($beforeTime > $user["check_time"]){
                    $user["check_warning"] = true;
                }
                $info["user"] = $user;
                $info["user"]["tel_safe"] =substr_replace($info["user"]["tel_safe"],"*****",3,5);
                $mail = strstr($info["user"]["mail_safe"],"@",true);
                $prefix = strstr($user["mail_safe"],"@");
                $info["user"]["mail_safe"] =substr_replace($mail,"*****",3,5).$prefix;
                $info["user"]["unreadsystem"] = $this->getUnSystemNoticeCount($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"]);
                //获取公司的完成资料信息
                $baseInfo = $this->getCompanyStatusByAdmin($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"]);
                $info["perfect"] = $baseInfo["base"]["count"];
                //获取公司的操作日志,默认1个月内
                $logs = $this->getLogs($_SESSION["u_userInfo"]["id"]);
                $info["logs"] = $logs;
                $tmp ="index";
                //如果是非会员公司,查询最新订单
                if(!($user["on"] == 2 && $user["fake"] == 0)){
                    $orders = $this->getOrders(100);
                    foreach ($orders as $k => $v) {
                        $var = trim($v['xiaoqu']);
                        $var = preg_replace(array("/[a-zA-Z0-9]+/","/[[:punct:]]/"), "",$var);
                        if(empty($var)){
                            $orders[$k]['xiaoqu'] = '-';
                        }
                    }
                    $info["orders"] = $orders;
                }
                //重庆公司的紧急通知，限时3个月
                if($_SESSION["u_userInfo"]["cs"] == "500100"){
                    $end = strtotime("+3 month",strtotime(date("2015-11-19")));
                    if(time() <= $end){
                        if(empty($_COOKIE["w_qizuang_urgent-notice"])){
                           $noticeTmp= $this->fetch("noticetmp");
                           $this->assign("urgentNotice",$noticeTmp);
                           //设置COOKIE,每天显示1次
                           $endDate = mktime(23,59,59,date("m"),date("d"),date("Y"));
                           setcookie("w_qizuang_urgent-notice",1,$endDate,'/', '.'.C('QZ_YUMING'));
                        }
                    }
                }
                break;
            default:
                header("LOCATION:http://u.qizuang.com");
                die();
                break;
        }
        $info["ssid"] = authcode(session_id(),"");
        $this->assign("info",$info);
        $this->display($tmp);
    }

    /**
     * 成功页面
     * @return [type] [description]
     */
    public function success(){
        $type = I("get.type");
        $id = I("get.id");
        $info["header"] ="恭喜,操作成功！";
        switch ($type) {
            case 'cases':
                //查询案例的信息
                $case = $this->getCaseInfoAndImgs($id,$_SESSION["u_userInfo"]["id"]);
                $info["imgs"] = $case["imgs"];
                $info["title"] =$_SESSION["u_userInfo"]["jc"].date("Y")."年全新【".$case["title"]."】效果图";
                $info["url"] = "http://".$_SESSION["u_userInfo"]["bm"].".".C("QZ_YUMING")."/caseinfo/".$id.".shtml";
                $info["redirect"]  = "http://u.qizuang.com/cases/";
                $info["share"] = true;
                break;
             case 'descases':
                //查询案例的信息
                $case = $this->getCaseInfoAndImgs($id);
                $info["imgs"] = $case["imgs"];
                $info["title"] = $_SESSION["u_userInfo"]["name"].date("Y")."年全新【".$case["title"]."】效果图";
                $info["url"] = "http://".$_SESSION["u_userInfo"]["bm"].".".C("QZ_YUMING")."/caseinfo/".$id.".shtml";
                $info["redirect"]  = "http://u.qizuang.com/descase/";
                $info["share"] = true;
                break;
            case "designer":
                $info["redirect"]  = "http://u.qizuang.com/desinfo/";
                $info["share"] = false;
                break;
            case 'team':
                $info["redirect"]  = "http://u.qizuang.com/team/";
                $info["share"] = false;
                break;
            case 'article':
                //查询公司文章信息
                $article = D("Info")->getInfoById($id,$_SESSION["u_userInfo"]["id"]);
                $info["title"] = $_SESSION["u_userInfo"]["jc"].date("Y")."年全新资讯【".$article['title']."】";
                $info["url"] = "http://".$_SESSION["u_userInfo"]["bm"].".".C("QZ_YUMING")."/zixun_info/".$id.".shtml";
                $info["redirect"]  = "http://u.qizuang.com/article/";
                $info["share"] = true;
                break;
            case 'des_article':
                //查询设计师文章信息
                $article = M('article')->find($id);
                $info["title"] = $_SESSION["u_userInfo"]["name"].date("Y")."年全新博客【".$article['title']."】";
                $info["url"] = "http://".$_SESSION["u_userInfo"]["bm"].".".C("QZ_YUMING")."/zixun_info/".$id.".shtml";
                $info["redirect"]  = "http://u.qizuang.com/desblog/";
                $info["share"] = true;
                break;
             case 'activit':
                //查询公司优惠信息
                $article = D("Info")->getInfoById($id,$_SESSION["u_userInfo"]["id"]);
                $info["title"] = $_SESSION["u_userInfo"]["jc"].date("Y")."年全新优惠【".$article["title"]."】";
                $info["url"] = "http://".$_SESSION["u_userInfo"]["bm"].".".C("QZ_YUMING")."/zixun_info/".$id.".shtml";
                $info["redirect"]  = "http://u.qizuang.com/activityinfo/";
                $info["share"] = true;
                break;
            case 'order':
                //业主订单发布
                $info["redirect"]  = "http://u.qizuang.com/need/";
                $info["share"] = false;
                break;
            case 'preuser':
                //注册用户
                $info["title"] = '注册业主帐号成功';
                $info["redirect"]  = "http://u.qizuang.com/peruser/";
                $info["share"] = false;
                break;
            case 'baike':
                //注册用户
                $info["title"] = '百科提交成功，请等待管理员审核。';
                $info["redirect"]  = "http://u.qizuang.com/baike/";
                $info["share"] = false;
                break;
            default:
                $this->_error();
                break;
        }

        $this->assign("info",$info);
        $this->display();
    }

    /**
     * 修改体检信息
     * @return [type] [description]
     */
    public function editbaseinfo(){
        if($_POST){
           if(I("post.score") !== ""){
                $data["check_score"] = I("post.score");
                $data["check_time"] = time();
                if(I("post.time") !== ""){
                    $data["check_time"] = I("post.time");
                }
           }
           D("User")->edtiUserInfo($_SESSION["u_userInfo"]["id"],$data);
        }
    }

    /**
     * 检测帐号状态
     * @return [type] [description]
     */
    public function chkstatus(){
        $company_status = $this->getCompanyStatusByAdmin($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"]);
        if(!empty($company_status) && isset($_SESSION["u_userInfo"])){
            $this->ajaxReturn(array("data"=>$company_status,"info"=>"","status"=>1));
        }
        $this->ajaxReturn(array("data"=>"","info"=>"检测失败","status"=>0));
    }

    /**
     * 绑定用户城市
     */
    public function setCity(){
         if($_POST){
            $data = array(
                    "qx"=>I("post.qx"),
                    "cs"=>I("post.cs")
                          );

            $i = D("User")->edtiUserInfo($_SESSION["u_userInfo"]["id"],$data);
            if($i!== false){
                $_SESSION["u_userInfo"]["cs"] = I("post.cs");
                $_SESSION["u_userInfo"]["qx"] = I("post.qx");
                //通过城市编号查询城市的BM
                $city = D("Area")->getCityInfoById(I("post.cs"));
                $_SESSION["u_userInfo"]["bm"] = $city["bm"];
                $_SESSION["u_userInfo"]["cname"] = $city["oldName"];
                $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"操作失败,请稍后再试！","status"=>0));
        }
    }

    /**
     * 获取最新订单
     * @return [type] [description]
     */
    private function getOrders($limit){
        $orders =  D("Orders")->getNewOrders(100);
        foreach ($orders as $key => $value) {
            //替换时间
            $min   =  rand(1,10);
            $orders[$key]["time"] = $min."分钟之前";
        }
        return $orders;
    }

    /**
     * 获取装修公司基本信息
     * @param  [type] $comid [description]
     * @param  [type] $cs    [description]
     * @return [type]        [description]
     */
    private function getCompanyInfoByAdmin($comid,$cs){
        $user =  D("User")->getCompanyInfoByAdmin($comid,$cs);
        return $user;
    }

    /**
     * 获取装修公司打分信息
     * @return [type] [description]
     */
    private function getCompanyStatusByAdmin($comid,$cs){
        $user =  D("User")->getCompanyStatusByAdmin($comid,$cs);
        if(count($user)>0){
            //上次的得分
            $status["check_score"] = $user["check_score"];
            //上次的检测时间
            $status["check_time"] = $user["check_time"];
            //获取基本信息数组
            $baseInfo = array("qc","jc","kouhao","name","cal","cals","sex","tel","qq","qq1","logo");
            //获取详细信息数组
            $detailsInfo = array("fuwu","quyu","fengge","jiawei","chengli","guimo","jianjie","qc",);
            //基础分数
            //基本信息分数
            $status['base'] = array("name"=>"企业信息","score"=>5,"percentage"=>20,"text"=>'完善了<em class="count">%s</em>%%的企业信息，得<em class="score">%s</em>分，共20分</span>',"icon"=>"icon-remove-circle","info"=>"立刻完善","href"=>"/info/basic");
            //详细信息分数
            $status['details_score'] = 10;
            //资质证书分数
            $status['fcount_score'] = 5;
            //家装分数
            $status['jz'] = array("name"=>"家装案例","score"=>10,"count"=>empty($user["jcount"])?0:$user["jcount"],"percentage"=>10,"text"=>'已上传<em class="count">%s</em>套符合要求的家装案例，得<em class="score">%s</em>分，共10分',"icon"=>"icon-remove-circle","info"=>"立刻上传","href"=>"/caseup/");
            //家装分数
            $status['gz'] = array("name"=>"公装案例","score"=>10,"count"=>empty($user["gcount"])?0:$user["gcount"],"percentage"=>10,"text"=>'已上传<em class="count">%s</em>套符合要求的公装案例，得<em class="score">%s</em>分，共10分',"icon"=>"icon-upload","info"=>"立刻上传","href"=>"/caseup/");
            //家装分数
            $status['zj'] = array("name"=>"在建工地案例","score"=>10,"count"=>empty($user["zcount"])?0:$user["zcount"],"percentage"=>10,"text"=>'已上传<em class="count">%s</em>套符合要求的在建工地案例，得<em class="score">%s</em>分，共10分',"icon"=>"icon-upload","info"=>"立刻上传","href"=>"/caseup/");
            //资讯分数
            $status['info'] = array("name"=>"文章资讯","score"=>10,"percentage"=>10,"text"=>'已发布<em class="count">%s</em>条文章资讯，得<em class="score">%s</em>分，共10分',"icon"=>"icon-upload","info"=>"立刻发布","href"=>"/articleup/");
            //设计师分数
            $status['designer'] = array("name"=>"推荐设计师","score"=>10,"percentage"=>10,"text"=>'已推荐<em class="count">%s</em>位优秀设计师，得<em class="score">%s</em>分，共10分',"icon"=>"icon-upload","info"=>"立刻推荐","href"=>"/teamup/");
            //案例更新频率分数
            $status['case'] = array("name"=>"案例更新","score"=>20,"percentage"=>20,"text"=>'依据您的案例更新频率，得<em class="score">%s</em>分，共20分',"icon"=>"icon-remove-circle","info"=>"立刻完善","href"=>"/caseup/");
            //最新活动分数
            $status['yhhd'] = array("name"=>"优惠活动","score"=>5,"percentage"=>5,"text"=>'依据您已发布的优惠活动，得<em class="score">%s</em>分，共5分',"icon"=>"icon-remove-circle","info"=>"立刻完善","href"=>"/activityinfo/");
            //绑定安全邮箱/电话
            $status["safe"] = array("name"=>"帐号安全","score"=>5,"percentage"=>5,"text"=>'绑定安全邮箱/安全手机，得<em class="score">%s</em>分，共5分',"icon"=>"icon-remove-circle","info"=>"立刻绑定","href"=>"#banging");
            if(!$user["tel_safe_chk"] || !$user["mail_safe_chk"] ){
                 $status["safe"]["score"] = 3;
            }
            $i = 0;

            //企业评分
            //1.基本资料评分
            foreach ($baseInfo as $key => $val) {
                if(empty($user[$val])){
                    $status['base']["score"] = 3;
                    $i ++;
                }
            }

            //2.详细资料评分
            foreach ($detailsInfo as $key => $val) {
               if(empty($user[$val])){
                    $status['details_score'] = 7;
                    $i ++;
               }
            }

            if($user["fcount"] < 10){
                $i += 3;
                $status['fcount_score'] = 3;
            }

            if($user["jcount"] < 10){
                $status['jz']["score"]  = empty($user["jcount"])?0:$user["jcount"];
            }

            if($user["gcount"] < 10){

                $status['gz']["score"]  = empty($user["gcount"])?0:$user["gcount"];
            }

            if($user["zcount"] < 10){
                $status['zj']["score"]  = empty($user["zcount"])?0:$user["zcount"];
            }

            if($user["infocount"] < 10){
                $status['info']["score"]  = empty($user["infocount"])?0:$user["infocount"];
            }

            if($user["dcount"] < 10){
               $status['designer']["score"]  = empty($user["dcount"])?0:$user["dcount"];
            }

            if(strtotime("-7 day") >= $user["lasttime"] ){
                //超过7天
                 $status['case']["score"]  = 0;
            }elseif(strtotime("-5 day") >= $user["lasttime"] ){
                //超过5天
                $status['case']["score"]  = 10;
            }elseif(strtotime("-3 day") >= $user["lasttime"] ){
                //超过3天
                 $status['case']["score"]  = 15;
            }

            if(strtotime("-30 day") >= $user["lastinfotime"] ){
                //超过30天
                $status['yhhd']["score"]  = 0;
            }

        }

        if($i == 0){
            $status['base']["count"] = 100;
        }else{
            $allcount = count($baseInfo)+count($detailsInfo);
            $status['base']["count"] = (1- round($i/$allcount,2))*100;
        }

        $status['base']["score"] +=  $status['details_score'] + $status['fcount_score'];

        //结算评分
        $status['base']["text"] = sprintf($status['base']["text"],$status['base']["count"],$status['base']["score"]);
        $status['jz']["text"]   = sprintf( $status['jz']["text"],$status['jz']["count"],$status['jz']["score"]);
        $status['gz']["text"]  = sprintf($status['gz']["text"],$status['gz']["count"],$status['gz']["score"]);
        $status['zj']["text"]  = sprintf($status['zj']["text"],$status['zj']["count"],$status['zj']["score"]);
        $status['info']["text"] = sprintf($status['info']["text"],$status['info']["count"],$status['info']["score"]);
        $status['designer']["text"] = sprintf($status['designer']["text"],$status['designer']["count"],$status['designer']["score"]);
        $status['case']["text"] = sprintf($status['case']["text"],$status['case']["score"]);
        $status['yhhd']["text"] = sprintf($status['yhhd']["text"],$status['yhhd']["score"]);
        $status["safe"]["text"] = sprintf($status['safe']["text"],$status['safe']["score"]);

        if($_SESSION["u_userInfo"]["on"] != 2){
            //如果非会员,去除优惠活动
            unset($status['yhhd']);
        }
        //获取模版
        $tmp = $this->fetch("companystatustmp");
        $status["tmp"] = $tmp;
        return $status;
    }

    private function getLogs($uid){
        $begin = date("Y-m-d H:i:s",strtotime("-1 week"));
        $end = date("Y-m-d H:i:s",time());
        $result = D("Loguser")->getLogList($uid,$begin,$end);
        $logs = array();
        foreach ($result as $key => $value) {
            $time = date("Y-m-d",strtotime($value["time"]));
            if(!array_key_exists($time, $logs)){
                $logs[$time]["date"] = strtotime($value["time"]);
            }
            $value["time"] = strtotime($value["time"]);
            $logs[$time]["child"][] = $value;
        }
        return $logs;
    }

    private function getCaseInfoAndImgs($id,$cid){
        $result = D("Cases")->getCaseInfoAndImgs($id,$cid);
        $cases = array();
        foreach ($result as $key => $value) {
            if($key == 0){
                $cases["title"] = $value["title"];
            }
            if($value["img_host"] == "qiniu"){
                $cases["imgs"] .="http://".C("QINIU_DOMAIN")."/".$value["img_path"]."|";
            }else{
                $cases["imgs"] .="http://".C("STATIC_HOST1").$value["img_path"].$value["img"]."|";
            }
        }
        $cases["imgs"] = substr($cases["imgs"], 0,strlen($cases["imgs"])-1);
        return $cases;
    }

     /**
     * 获取用户的未读信息
     * @param  [type] $comid [公司编号]
     * @param  [type] $cs    [所在城市]
     * @return [type]        [description]
     */
    private function getUnSystemNoticeCount($id,$cs,$classid =3){
        $count = D("Usersystemnotice")->getUnSystemNoticeCount($id,$cs,$classid);
        if(count($count)> 0){
            return $count["unreadsystem"];
        }
        return 0;
    }

    /**
     * 获取业主的信息
     * @return [type] [description]
     */
    public function getUserInfoByAdmin($id,$cs,$classid){
        $user = D("User")->getUserInfoByAdmin($id,$cs,$classid);
        return $user;
    }

    /**
     * 获取设计师的信息
     * @return [type] [description]
     */
    public function getDesingerInfoByAdmin($id,$cs){
        $user = D("User")->getDesingerInfoByAdmin($id,$cs);
        return $user;
    }


    //获取小区列表
    public function getjias(){
        $keyword = I("get.keyword");
        if(!empty($keyword)){
            $map['name'] = array("LIKE","%$keyword%");
            $map['cid'] = $_SESSION['u_userInfo']['cs'];
            $infos = M('xiaoqu')->field('id,name')->limit(15)->where($map)->select();
            if(!empty($infos)){
                $this->ajaxReturn(array("data"=>$infos,"info"=>"1","status"=>1));
            }else{
                $this->ajaxReturn(array("data"=>$infos,"info"=>"0","status"=>1));
            }
        }
    }
}