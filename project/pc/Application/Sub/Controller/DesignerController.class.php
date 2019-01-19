<?php
namespace Sub\Controller;
use Sub\Common\Controller\SubBaseController;
class DesignerController extends SubBaseController
{
    public function _initialize()
    {
        parent::_initialize();
        $uri = $_SERVER['REQUEST_URI'];
        preg_match('/html$/',$uri,$m);
        if (count($m) == 0) {
            preg_match('/\/$/',$uri,$m);
            $parse = parse_url($uri);
            if (count($m) == 0 && empty($parse["query"])) {
                header( "HTTP/1.1 301 Moved Permanently");
                header("Location: http://".$this->bm.".".C("QZ_YUMING").$uri."/");
            }
        }
        //添加顶部搜索栏信息
        $this->assign('serch_uri', 'xgt');
        $this->assign('serch_type', '装修案例');
        $this->assign('holdercontent', '全国超过十万家装修公司为您免费设计');
        //导航栏标识
        $this->assign("tabIndex", 2);
        $this->assign("choose_menu", 'xgt');
    }

    public function index()
    {
        $bm = $this->bm;
        $designersinfo = S('Cache:DesignersInfo:'.$bm);
        $cityInfo = $this->cityInfo;
        if(!$designersinfo){
            $designersinfo["worktime"] = array(
                                        array('id' => '','name' => '不限'),
                                        array('id' => '1','name' => '应届'),
                                        array('id' => '2','name' => '一年'),
                                        array('id' => '3','name' => '两年'),
                                        array('id' => '4','name' => '三年~五年'),
                                        array('id' => '5','name' => '五年~八年'),
                                        array('id' => '6','name' => '八年~十年'),
                                        array('id' => '7','name' => '十年以上')
                                            );

            $designersinfo["level"] = array(
                                    array('id' => '','name' => '不限'),
                                    array('id' => '1','name' => '设计师'),
                                    array('id' => '2','name' => '精英设计师'),
                                    array('id' => '3','name' => '主任设计师'),
                                    array('id' => '4','name' => '首席设计师'),
                                    array('id' => '5','name' => '高级首席设计师'),
                                    array('id' => '6','name' => '设计总监'),
                                    array('id' => '7','name' => '艺术总监')
                                        );

            //获取装修风格列表
            $fg = D("Common/Fengge")->getfg();
            $top = array(
                    "id"=>"0",
                    "name" =>"不限"
                         );
            array_unshift($fg,$top);
            $designersinfo["fengge"] = $fg;
            S('Cache:DesignersInfo:'.$bm,$designersinfo,900);
            $designersinfo = S('Cache:DesignersInfo:'.$bm);
        }
        //获取当前URL，切割URL
        preg_match("/[a-z0-9]{2}-[a-z0-9]{2}-[a-z0-9]{2}/",__SELF__,$url);
        if (!empty($url)) {
            $keyword = preg_split("/-/",$url['0']);
            //赋值对应的搜索条件
            foreach ($keyword as $key => $value) {
                $condition[$value['0']] = $value['1'];
                if ($value['1'] != '0') {
                    switch ($value['0']) {
                        case 't':
                            $condition['jobtime'] = $designersinfo["worktime"][$value['1']]['name'];
                            $map['ud.jobtime'] = array("EQ",$condition['jobtime']);
                            break;
                        case 'l':
                            $condition['zw'] = $designersinfo["level"][$value['1']]['name'];
                            $map['t1.zw'] = array("EQ",$condition['zw']);
                            break;
                        case 'f':
                            $condition['fengge'] = $designersinfo["fengge"][$value['1']]['name'];
                            $map['ud.fengge'] = array("like",'%'.$condition['fengge'].'%');
                            break;
                        default:
                            # code...
                            break;
                    }
                }
            }
        }else{
            $condition['t'] =  $condition['l'] = $condition['f'] = '0';
        }
        //dump($condition);
        /*//处理搜索条件，去除“不限”
        foreach ($condition as $key => $value) {
            if($value != "不限"){
                switch ($key) {
                    case 'jobtime':
                        $map['ud.jobtime'] = array("EQ",$condition['jobtime']);
                        break;
                    case 'zw':
                        $map['t1.zw'] = array("EQ",$condition['zw']);
                        break;
                    case 'fengge':
                        $map['ud.fengge'] = array("like",'%'.$condition['fengge'].'%');
                        break;
                    default:
                        # code...
                        break;
                }
            }
        }*/
        //dump($map);
        //拼接短链接
        $designersinfo["worktime"] = $this->getParams("t",$url,$designersinfo["worktime"],$condition['t']);
        $designersinfo["level"] = $this->getParams("l",$url,$designersinfo["level"],$condition['l']);
        $designersinfo["fengge"] = $this->getParams("f",$url,$designersinfo["fengge"],$condition['f']);
        //分页
        $pageIndex = 1;
        $pageCount = 6;
        if (I("get.p") !== "") {
            $pageIndex = I("get.p");
        }


        //获取设计师列表
        $designers = $this->getDesigners($_SESSION["cityId"],$map,$pageIndex,$pageCount);
        $info["designers"] = $designers["users"];
        $info["page"] = $designers["page"];
        $this->assign("info",$info);

        //设计师前5
        $listFive = S('Cache:Designersfive:'.$bm);
        if (!$listFive) {
            $listFive = D("Common/Designer")->getDesignerListFive($_SESSION["cityId"]);
            S('Cache:Designersfive:'.$bm,$listFive,900);
            $listFive = S('Cache:Designersfive:'.$bm);
        }

        /*if($condition['t'] == '0' && $condition['l'] == '0' && $condition['f'] == '0'){
            $keys['title'] = $cityInfo['name']."齐装网-中国领先的装修门户网站-装修_装修公司_装修效果图";
            $keys['keywords'] = "装修公司,装修网,装修效果图,装饰,齐装网";
            $keys['description'] = "齐装网是中国家居装修装饰门户网站，汇集了全国性价比高的家居装修装饰公司，为您提供最专业的装修服务以及装修设计效果图、案例和装修知识；专业服务、品质保障，让您的装修更安心！";
        }else{
            $keys['title'] = $condition['jobtime'].$condition['fengge'].$condition['zw']."-齐装网";
            $keys['keywords'] = $condition['jobtime'].$condition['fengge'].$condition['zw']."-齐装网";
            $keys['description'] = "齐装网设计师频道是国内专业室内装修网站及设计招标服务平台，每日更新大量室内设计效果图、优质室内设计案例等，并提供专业的软装搭配、室内装修设计知识。";
        }*/

        $keys['title'] = $cityInfo['name']."装修设计师_".$cityInfo['name']."室内设计师 - ".$cityInfo['name']."齐装网";
        $keys['keywords'] = $cityInfo['name']."装修设计师，".$cityInfo['name']."室内设计师， ".$cityInfo['name']."家装设计师";
        $keys['description'] = $cityInfo['name']."齐装网装修设计师频道汇集了".$cityInfo['name']."工装、家装、别墅等优秀的室内设计师，按照设计师从业时间、设计师设计级别和设计师擅长风格来综合考核，供您选设计师时参考";

        if('/designer/' == $_SERVER['REQUEST_URI']){
            $info['head']['canonical'] = 'http://' . $cityInfo['bm'].'.'.C('QZ_YUMING').'/designer/';
        }else{
            $staticUrl = explode('?',$_SERVER['REQUEST_URI']);
            $info['head']['canonical'] = 'http://' . $cityInfo['bm'].'.'.C('QZ_YUMING').$staticUrl['0'];
        }



        //设计师筛选项
        $this->assign("designersinfo",$designersinfo);
        //设置导航栏
        $this->assign("tabIndex",2);
        //城市bm头
        $this->assign("bm",$bm);
        //设计榜
        $this->assign("listFive",$listFive);
        //TDK
        $this->assign("keys",$keys);
        //获取报价模版
        $this->assign("order_source",25);
        $t = T("Common@Order/orderTmp");
        $orderTmp = $this->fetch($t);
        $this->assign("orderTmp",$orderTmp);
        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);
        $this->assign("info",$info);
        $this->display();
    }

    /**
     * 获取当前城市设计师列表
     * @param  [type] $cs [description]
     * @return [type]     [description]
     */
    private function getDesigners($cs,$map,$pageIndex,$pageCount)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Common/Designer")->getDesignerListCount($cs,$map);
        if ($count > 0) {
            import('Library.Org.Page.LitePage');
            //自定义配置项
            $config  = array("prev","first","last","next");
            $page = new \LitePage($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();

            //获取当前城市设计案例最多的设计师,会员公司设计师优先
            $users = D("Common/Designer")->getDesignerList($cs,$map,($page->pageIndex-1)*$pageCount,$pageCount);

            foreach ($users as $key => $value) {
                $ids[] = $value["userid"];
                if ($value['zw'] == '0') {
                    $users[$key]['zw'] = '';
                }
            }
            if (empty($ids)) {
                $ids = '';
            }
            //获取设计师最新的2个案例数
            $cases = D("Common/Designer")->getDesinerCase($ids);

            foreach ($users as $key => $value) {
                foreach ($cases as $k => $val) {
                    if($value["userid"] == $val["userid"]) {
                        $users[$key]["child"][]=$val;
                    }
                }
            }
            return array("users"=>$users,"page"=>$pageTmp);
        }
        return null;
    }

    /**
     * [getParams description]
     * @param  [type] $prefix [前缀]
     * @param  [type] $url    [url]
     * @param  [type] $data   [数据源]
     * @param  [type] $val    [选中值]
     * @return [type]         [description]
     */
    private function getParams($prefix,$url,$data,$val){
        if(!empty($url)){
            $url = $url["0"];
        }else{
            $links = "t0-l0-f0";
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
            }
        }
        return $data;
    }
}
