<?php
namespace Sub\Controller;
use Sub\Common\Controller\SubBaseController;
class XiaoguotuController extends SubBaseController{

    public $selectType = array();
    public function _initialize(){
        parent::_initialize();
        $uri = $_SERVER['REQUEST_URI'];
        preg_match('/html$/',$uri,$m);
        if (count($m) == 0) {
            preg_match('/\/$/',$uri,$m);
            if (count($m) == 0) {
                header( "HTTP/1.1 301 Moved Permanently");
                header("Location: http://".$this->cityInfo["bm"].".". C("QZ_YUMING").$uri."/");
            }
        }
        //添加顶部搜索栏信息
        $this->assign('serch_uri','xgt');
        $this->assign('serch_type','装修案例');
        $this->assign('holdercontent','海量装修案例任你挑选');
        //导航栏标识
        $this->assign("tabIndex", 2);
        $this->assign("choose_menu", 'xgt');
    }

    public function index(){
        //判断是否是搜索引擎蜘蛛
        $robotIsTrue = B("Common\Behavior\RobotCheck");
        //$robotIsTrue = true; //debug 警告线上应该为注释状态
        if (true === $robotIsTrue) {
            $this->assign('robot',1);
        }
        $bm =  $this->bm;
        $xiaoguotuInfo = S('Cache:XiaoguotuInfo:'.$bm);
        $cityInfo = $this->cityInfo;
        if(!$xiaoguotuInfo){
            //获取装修案例图片数量
            $xiaoguotuInfo["caseimgsCount"] = releaseCount("caseimgs",$_SESSION["cityId"]);
            //获取户型
            $hx = D("Common/Huxing")->gethx();
            $top = array(
                    "id"=>"",
                    "type"=>"hx",
                    "name" =>"不限"
                         );
            array_unshift($hx,$top);
            $xiaoguotuInfo["hx"] = $hx;
            //获取装修风格列表
            $fg = D("Common/Fengge")->getfg();
            $top = array(
                    "id"=>"",
                    "type"=>"fengge",
                    "name" =>"不限"
                         );
            array_unshift($fg,$top);
            $xiaoguotuInfo["fenge"] = $fg;
            //获取造价
            $jiage = D("Common/Jiage")->getJiage();
            $top = array(
                    "id"=>"",
                    "type"=>"zaojia",
                    "name" =>"不限"
                         );
            unset($jiage[count($jiage)-1]);
            array_unshift($jiage,$top);
            $xiaoguotuInfo["jiage"] = $jiage;
            //获取类型
            $leixing = D("Common/Leixing")->getlx();
            $top = array(
                    "id"=>"",
                    "type"=>"leixing",
                    "name" =>"不限"
                         );
            array_unshift($leixing,$top);
            //删除无用的最后两个选项
            array_pop($leixing);
            array_pop($leixing);
            $xiaoguotuInfo["leixing"] = $leixing;
            //获取选项卡
            $tabs = array(
                    array("id"=>1,"name"=>家装案例),
                    array("id"=>2,"name"=>公装案例),
                    array("id"=>3,"name"=>在建工地),
                          );
            $xiaoguotuInfo["tabs"] =  $tabs;

            S('Cache:XiaoguotuInfo:'.$bm,$xiaoguotuInfo,900);
        }

        $keyword = I("get.keyword");
        if(!checkKeyword($keyword)){
            $this->_error();
        }
        if(!empty($_GET["lx"])){
            $lx = remove_xss($_GET["lx"]);
        }

        if(!empty($_GET["ys"])){
            $ys = remove_xss($_GET["ys"]);
        }

        if(!empty($_GET["sm"])){
            $sm = remove_xss($_GET["sm"]);
        }
        //获取效果图片列表
        $pageIndex = 1;
        $pageCount = 48;
        $result = $this->getCaseImagesList($pageIndex,$pageCount,$classid,$huxing,$fengge,$zaojia,$ys,$sm,$keyword,$_SESSION["cityId"]);
        //默认的URL链接
        $param['classid'] = 1;
        //家装选择项
        $xiaoguotuInfo["hx"] = $this->getParams("h","",$xiaoguotuInfo["hx"],1,"");
        $xiaoguotuInfo["fenge"] = $this->getParams("f","",$xiaoguotuInfo["fenge"],1,"");
        $xiaoguotuInfo["jiage"] = $this->getParams("z","",$xiaoguotuInfo["jiage"],1,"");

        //公装选择项
        $xiaoguotuInfo["gzleixing"] = $this->getParams("lx","",$xiaoguotuInfo["leixing"],2,"");
        $xiaoguotuInfo["gzfenge"] = $this->getParams("f","",$xiaoguotuInfo["fenge"],2,"");
        $xiaoguotuInfo["gzjiage"] = $this->getParams("z","",$xiaoguotuInfo["jiage"],2,"");

        //在建工地选择项
        $xiaoguotuInfo["zjhx"] = $this->getParams("h","",$xiaoguotuInfo["hx"],3,"");
        $xiaoguotuInfo["zjfenge"] = $this->getParams("f","",$xiaoguotuInfo["fenge"],3,"");
        $xiaoguotuInfo["zjjiage"] = $this->getParams("z","",$xiaoguotuInfo["jiage"],3,"");
        if(count($result["params"]) > 0){
            //在有搜索条件的情况下
            switch ($result["params"]["type"]) {
                case '1':
                    //家装选择项
                    $xiaoguotuInfo["hx"] = $this->getParams("h",$result["url"],$xiaoguotuInfo["hx"],1,$result["params"]["huxing"]);
                    $xiaoguotuInfo["fenge"] = $this->getParams("f",$result["url"],$xiaoguotuInfo["fenge"],1,$result["params"]["fengge"]);
                    $xiaoguotuInfo["jiage"] = $this->getParams("z",$result["url"],$xiaoguotuInfo["jiage"],1,$result["params"]["jiage"]);
                    break;
             case '2':
                    $param['classid'] = 2;
                    //公装装选择项
                    $xiaoguotuInfo["gzleixing"] = $this->getParams("lx",$result["url"],$xiaoguotuInfo["leixing"],2,$result["params"]["leixing"]);
                    $xiaoguotuInfo["gzfenge"] = $this->getParams("f",$result["url"],$xiaoguotuInfo["fenge"],2,$result["params"]["fengge"]);
                    $xiaoguotuInfo["gzjiage"] = $this->getParams("z",$result["url"],$xiaoguotuInfo["jiage"],2,$result["params"]["jiage"]);
                    break;
            case '3':
                    $param['classid'] = 3;
                    //在建工地选择项
                    $xiaoguotuInfo["zjhx"] = $this->getParams("h",$result["url"],$xiaoguotuInfo["hx"],3,$result["params"]["huxing"]);
                    $xiaoguotuInfo["zjfenge"] = $this->getParams("f",$result["url"],$xiaoguotuInfo["fenge"],3,$result["params"]["fengge"]);
                    $xiaoguotuInfo["zjjiage"] = $this->getParams("z",$result["url"],$xiaoguotuInfo["jiage"],3,$result["params"]["jiage"]);
                    break;
            }
        }

        //添加页面关键字、描述
        $keys    = array();
        $tdk     = array();
        switch ($result["params"]["type"]) {
            case '1':
                $typeName = "家装";
                break;
            case '2':
                 $typeName = "公装";
                break;
            case '3':
                $typeName = "在建工地";
                break;
        }


        //造价
        foreach ($xiaoguotuInfo["jiage"] as $key => $value) {
            if(!empty($value["id"]) &&$value["id"] == $result["params"]["jiage"]){
                $tdk['jiage'] = $value["name"];
            }
        }

        //户型
        foreach ($xiaoguotuInfo["hx"] as $key => $value) {
            if(!empty($value["id"]) &&$value["id"] == $result["params"]["huxing"]){
                $tdk['huxing'] = $value["name"];
            }
        }

         //风格
        foreach ($xiaoguotuInfo["fenge"] as $key => $value) {
            if(!empty($value["id"]) &&$value["id"] == $result["params"]["fengge"]){
                $tdk['fengge'] = $value["name"];
            }
        }

        //类型
        foreach ($xiaoguotuInfo["leixing"] as $key => $value) {
            if(!empty($value["id"]) && $value["id"] == $result["params"]["leixing"]){
                $tdk['leixing'] = $value["name"];
            }
        }

        $info['typeName'] = $typeName;
        $info['typeid'] = $param['classid'];
        $info['selectType'] = $this->selectType;

        if(!empty($result["pageIndex"])){
            $pageContent ="第" . $result["pageIndex"] . "页";
        }

        if(!empty($_GET["keyword"])){
            $keyword = remove_xss($_GET["keyword"]);
            $this->assign("keyword",$keyword);
            $keys["title"]    = '搜索结果页';
            $keys["keywords"] = '';
            $keys["description"] ='';
        }else{
            $keys["title"] = $cityInfo["name"] . $tdk['huxing'] . $tdk['fengge'] . $tdk['jiage'] . $tdk['leixing'] . '装修案例_' . $tdk['leixing'] . '装修设计效果图片 ' . $pageContent . '-' . $cityInfo["name"] . '齐装网';
            $keys["keywords"] = $cityInfo["name"] . $tdk['huxing'] . $tdk['fengge'] . $tdk['jiage'] . $tdk['leixing'] . '装修案例_' . $tdk['leixing'] . '装修设计效果图片 ' . $pageContent . '-' . $cityInfo["name"] .'齐装网';
            $keys["description"] = $cityInfo["name"] . '齐装网为您提供' . date("Y") . '年流行的' . $tdk['huxing'] . $tdk['fengge'] . $tdk['leixing'] . '装修案例设计效果图片,以及' . $tdk['huxing'] . $tdk['fengge'] . '装修样板房图片！找装修案例设计效果图片就上齐装网！';
        }

        if(!empty($result)){
            $xiaoguotuInfo["images"] = $result["images"];
            $xiaoguotuInfo["page"] = $result["page"];
        }

        if($_SERVER['REQUEST_URI'] == '/xgt/'){
            $info['head']['mobile_agent'] = 'http://' . $cityInfo['bm'].'.'.C('QZ_YUMING').'/xgt/';
        }

        $info['head']['canonical'] = 'http://' . $cityInfo['bm'].'.'.C('QZ_YUMING').$_SERVER['REQUEST_URI'];

        $urlFenzhan = 'http://' . $cityInfo['bm'].'.'.C('QZ_YUMING');
        $this->assign("urlFenzhan", $urlFenzhan);

        if(!isset($_SERVER['REQUEST_URI'][5])){
            //获取友情链接
            $friendLink = S("C:FL:XGT:".$cityInfo['id']);
            if (!$friendLink) {
                $friendLink['link'] = D("Friendlink")->getFriendLinkList($cityInfo['id'],1,'xgt');
                S("C:FL:XGT:".$cityInfo['id'], $friendLink, 900);
            }
            $this->assign("friendLink",$friendLink);
        }


        $this->assign("keys",$keys);
        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);
        $this->assign("param",$param);

        //获取报价模版
        $this->assign("order_source",103);
        $t = T("Common@Order/orderTmp");
        $orderTmp = $this->fetch($t);
        $this->assign("orderTmp",$orderTmp);

        //获取底部弹层
        $t = T("Common@Order/zb_bottom_s");
        $zb_bottom_s = $this->fetch($t);
        $this->assign("zb_bottom_s",$zb_bottom_s);

        //header搜索框搜索条件绑定
        $this->assign("header_search",1);
        $this->assign("xiaoguotuInfo",$xiaoguotuInfo);
        //显示头部导航栏效果
        $this->assign("nav_show",true);
        $this->assign("info",$info);
        $this->assign("cityinfo",$this->cityInfo);
        $this->display('index_p260');
    }


    /**
     * 获取装修案例效果图
     * @return [type] [description]
     */
    private function getCaseImagesList($pageIndex = 1,$pageCount = 10,$classid,$huxing,$fengge,$jiage,$ys,$sm,$keyword,$cs,$robotIsTrue = false)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);
        $normal_params = array(
                "huxing" => 0,
                "fengge" => 0,
                "jiage" => 0,
                "type" => 0
                );
        import('Library.Org.Page.Page');
        //自定义配置项
        $config  = array("prev","next");
        $page = new \Page($pageIndex,$pageCount,$count,$config,null,$normal_params);
         //解析参数
        $params= $page->analyticalAddress();
        $count =  D("Common/Cases")->getCaseImagesListCount($params["params"]["type"],$params["params"]["huxing"],$params["params"]['fengge'],$params["params"]['jiage'],$ys,$sm,$keyword,$cs,$params["params"]["leixing"]);

        if($count > 0){
            $result =  $page->show_short($params["url"],$count,true);
            $pageTmp = $result;
            $result = D("Common/Cases")->getCaseImagesList(($page->pageIndex-1)*$pageCount,$pageCount,$params["params"]["type"],$params["params"]["huxing"],$params["params"]['fengge'],$params["params"]['jiage'],$ys,$sm,$keyword,$cs,$params["params"]["leixing"]);
            if(count($result) > 0){
                $images = array();
                $index = 0;
                foreach ($result as $key => $value) {
                    if(empty($value['bm'])){
                        $value["bm"] = $value["bmt"];
                    }
                    $date =floor((time()-$value["time"])/3600) <=0?1:floor((time()-$value["time"])/3600);
                    $rand = rand(2000,10000);
                    $value["date"] = $date;
                    $value["looked"] = $rand;
                    $value['writetime'] = timeFormatToMouth($value['time']);
                    $value["writer"] = empty($value["writer"])?"齐装网":$value["writer"];
                    $images[] = $value;
                }
                return array("images"=>$images,"page"=>$pageTmp,"params"=>$params["params"],"url"=>$params["url"],"pageIndex"=>$page->pageIndex);
            }
        }
        return null;
    }

    /**
     * [getParams description]
     * @param  [type] $prefix [前缀]
     * @param  [type] $url    [url]
     * @param  [type] $data   [数据源]
     * @param  [type] $type   [类型]
     * @param  [type] $val    [选中值]
     * @return [type]         [description]
     */
    private function getParams($prefix,$url,$data,$type,$val){
        if($url != ""){
            //获取短链接
            $url = $url["short_url"];
            $reg = '/t\d+/i';
            $url = preg_replace($reg, "t".$type,$url);
        }else{
            switch ($type) {
                 case '1':
                 case '3':
                     $links = "/xgt/list-h0f0z0t".$type;
                     break;
                 case '2':
                     $links = "/xgt/list-lx0f0z0t".$type;
                     break;
             }
        }

        foreach ($data as $key => $value) {
            $reg = '/'.$prefix.'\d+/i';
            if(empty($value["id"])){
                $value["id"] = 0;
            }
            if(!empty($url)){
                $link = preg_replace($reg, $prefix.$value["id"],$url);
                preg_match($reg, $url,$m);
            }else{
                $link = preg_replace($reg, $prefix.$value["id"],$links);
            }
            $data[$key]["link"] = $link;
            $data[$key]["checked"] = 0;
            if($val == $value["id"]){
                $data[$key]["checked"] = 1;
                if(!empty($value['id']) && !empty($value['name'])){
                    $this->selectType[$prefix] = $data[$key];
                }
            }
        }
        return $data;
    }
}