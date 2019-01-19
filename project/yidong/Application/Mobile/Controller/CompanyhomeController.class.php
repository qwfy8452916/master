<?php
/**
 * 移动版装修公司主页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class CompanyhomeController extends MobileBaseController{
    private $user = null;
    public function _initialize(){
        parent::_initialize();
        $cityInfo = $this->cityInfo;
        if(I("get.id") == ""){
            $this->_error();
        }

        $uri = $_SERVER['REQUEST_URI'];
        preg_match('/html$/',$uri,$m);
        if (count($m) == 0) {
            preg_match('/\/$/',$uri,$m);
            $parse = parse_url($uri);
            if (count($m) == 0 && empty($parse["query"])) {
                header( "HTTP/1.1 301 Moved Permanently");
                header("Location: http://". C("MOBILE_DONAMES").$uri."/");
            }
        }

        //获取装修公司信息
        $user = $this->getUserInfo(I("get.id"),$cityInfo["id"]);
        if(count($user) > 0){
            $this->user = $user;
        }else{
            $this->_error();
        }
    }

    public function index(){
        $id = I("get.id");
        $info["user"] =  $this->user;
        $info['cases'] = D("Cases")->getCasesListByComId(0,3,$id,$this->cityInfo["id"]);
        $cityInfo = $this->cityInfo;
        //获取装修公司的文化信息图片
        $imgs = D("User")->getCompanyImg($id);
        $info["imgs"] = $imgs;
        //关键字、描述、标题
        $basic["head"]["title"] = $info["user"]["qc"]."-";
        $basic["head"]["keywords"] =  $info["user"]["qc"].",".$info["user"]["qc"]."怎么样";
        $basic["head"]["description"] =  $info["user"]["qc"].$cityInfo["name"]."为您提供"
                                .$cityInfo["name"]."装修设计方案与报价、".$cityInfo["name"]."装修优惠、免费装修咨询预约以及装修案例效果图。";
        $basic["body"]["title"] = $info['user']['jc'];
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("basic",$basic);
        $info['canonical'] = 'http://' . $cityInfo['bm'].'.'.C('QZ_YUMING'). str_ireplace('/'.$cityInfo['bm'], '', $_SERVER['REQUEST_URI']);
        $this->assign("fi", 321);
        $this->assign("info",$info);
        

        //获取店铺优惠券列表
        $cardlist = D('Card')->getSpecialCardByCompanyId($id);
        foreach ($cardlist as $key => $value){
            if($value['active_type'] == 2){
                $cardlist[$key]['name'] = '满' . $value['money3'] . '元可领';
            }else{
                if($value['money1'] > 0){
                    $cardlist[$key]['name'] = '满'.$value['money1'].'元可用';
                }else{
                    $cardlist[$key]['name'] = '立减'.$value['money2'].'元';
                }
            }
        }
        $cardCount = count($cardlist);
        $this->assign('cardlist',$cardlist);
        $this->assign('cardcount',$cardCount);
//        dump($info['user']);die;
        //公司是否是假会员？
        if($info['user']['on'] == 2 && $info['user']['fake'] == 1){  // on为2表示会员状态。 fake为1表示假会员
            $cardlists = D('Card')->getTongYongCardByJiaComid($id);
            if($cardlists){
                $cardlists['money1'] = $cardlists['money1'] ? (int)$cardlists['money1'] : 0;
                $cardlists['money2'] = $cardlists['money2'] ? (int)$cardlists['money2'] : 0;
                $cardlists['money3'] = $cardlists['money3'] ? (int)$cardlists['money3'] : 0;
                if($cardlists['active_type'] == 2){
                    $cardlists['name'] = '满'.$cardlists['money3'].'元可领';
                }else{
                    if($cardlists['money1'] > 0){
                        $cardlists['name'] = '满'.$cardlists['money1'].'元可用';
                    }else{
                        $cardlists['name'] = '立减'.$cardlists['money2'].'元';
                    }
                }
                $cardlist[0] = $cardlists;
                $cardCount = count($cardlist);
                $this->assign('cardlist',$cardlist);
                $this->assign('cardcount',$cardCount);
            }else{
                $this->assign('cardlist',array());
                $this->assign('cardcount',0);
            }
        }


        //获取src
        $src = I('get.src','');
        $this->assign("src", $src);
        $this->assign("nav_index",'bh');
        $this->display();
    }

    /**
     * 装修公司案例列表页
     * @return [type] [description]
     */
    public function cases(){
        $cityInfo = $this->cityInfo;
        $pageIndex = 1;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
        }
        $pageCount = 10;

        $id = I("get.id");
        //获取装修公司信息
        $info["user"] =  $this->user;
        $result = $this->getCasesListByComId($pageIndex,$pageCount,$id,$cityInfo["id"]);
        $info["cases"] = $result["cases"];
        $info["page"] = $result["page"];
        //关键字、描述、标题
        $basic["head"]["title"] = $info["user"]["qc"]."装修案例效果图";
        $basic["head"]["keywords"] = $info["user"]["qc"]."装修案例效果图";
        $basic["head"]["description"] = $info["user"]["qc"]."装修案例效果图";
        $basic["body"]["title"] = $info['user']['jc'];
        $info['canonical'] = 'http://' . $cityInfo['bm'].'.'.C('QZ_YUMING').str_ireplace('/'.$cityInfo['bm'], '', $_SERVER['REQUEST_URI']);
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("fi", 321);
        $this->assign("basic",$basic);
        $this->assign("info",$info);
        $this->assign("nav_cases",'bh');
        $this->display();
    }

    /**
     * 设计团队页
     * @return [type] [description]
     */
    public function team(){
        $info["title"] = "设计师团队";
        $cityInfo = $this->cityInfo;
        $id = I("get.id");
        $info["user"] =  $this->user;
        //获取设计师团队信息
        $pageIndex = 1;
        $pageCount = 10;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
        }
        $team = $this->getTeamDesignerList($id,"",2,$pageIndex,$pageCount);
        $info["team"] = $team["team"];
        $info["page"] = $team["page"];

        //seo 标题/描述/关键字
        $basic["head"]["title"] = $info["user"]["qc"]."设计团队";
        $basic["head"]["keywords"] = $info["user"]["qc"]."设计团队,".$info["user"]["qc"]."设计团师, 装修设计师";
        $basic["head"]["description"] = $info["user"]["qc"]."设计团队";
        $basic["body"]["title"] = $info['user']['jc'];
        $info['canonical'] = 'http://' . $cityInfo['bm'].'.'.C('QZ_YUMING'). str_ireplace('/'.$cityInfo['bm'], '', $_SERVER['REQUEST_URI']);
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("fi", 321);
        $this->assign("basic",$basic);
        $this->assign("info",$info);
        $this->assign("nav_team",'bh');
        $this->display();
    }

    /**
     * 装修公司评论页面
     * @return [type] [description]
     */
    public function comment(){
        $cityInfo = $this->cityInfo;
        $info["title"] = "业主牛评";
        $info["user"] =  $this->user;

        $id = I("get.id");
        //业主评论
        $pageIndex = 1;
        $pageCount = 10;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
        }
        $comments = $this->getComments($id,$cityInfo["id"],$pageIndex,$pageCount,true);
        $info["comments"] = $comments["comments"];
        $info["page"] = $comments["page"];

        //seo 标题/描述/关键字
        $basic["head"]["title"] = $info["user"]["qc"]."评价_业主点评";
        $basic["head"]["keywords"] = $info["user"]["qc"]."评价,业主点评";
        $basic["head"]["description"] = $info["user"]["qc"]."评价";
        $basic["body"]["title"] = $info['user']['jc'];
        $info['canonical'] = 'http://' . $cityInfo['bm'].'.'.C('QZ_YUMING'). str_ireplace('/'.$cityInfo['bm'], '', $_SERVER['REQUEST_URI']);
        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];
        $this->assign("fi", 321);
        $this->assign("basic",$basic);
        $this->assign("info",$info);
        $this->assign("nav_comment",'bh');
        $this->display();
    }


    /**
     * 获取用户信息
     * @param  [type] $id [用户编号]
     * @param  [type] $cs [所在城市]
     * @return [type]     [description]
     */
    private function getUserInfo($id,$cs){
        $result =  D("User")->getUserInfoById($id,$cs);
        $user = array();
        if($result[0]["id"] != 0){
            import('Library.Org.Util.Fiftercontact');
            $filter = new \Fiftercontact();
            $contact_q1 = OP('QZ_CONTACT_QQ1');
            $contact_q2 = OP('QZ_CONTACT_QQ2');
            $contact_t400 = OP("QZ_CONTACT_TEL400");
            foreach ($result as $key => $value) {
                if($key == 0){
                    $user["id"] = $value["id"];
                    $user["hengfu"] = $value["hengfu"];
                    $user["img_host"] = $value["img_host"];
                    $user["on"] = $value["on"];
                    $user["qc"] = $value["qc"];
                    $user["jc"] = $value["jc"];
                    $user["kouhao"] = $value["kouhao"];
                    $user["logo"] = $value["logo"];
                    $user["pv"] = $value["pv"];
                    $user["jianjie"] =$filter->fifter_contact($value["jianjie"]);
                    $user["jiawei"] = $value["jiawei"];
                    $user["fake"] = $value["fake"];
                    $user["nickname"] = empty($value["nickname"])== true?"家装咨询顾问":$value["nickname"];
                    $user["nickname1"] = empty($value["nickname1"])== true?"公装咨询顾问":$value["nickname1"];
                    $user["area"] = $value["area"];
                    $user["fw"] = $value["fw"];
                    $user["fg"] = $value["fg"];
                    $user["dcount"] = $value["dcount"];
                    $user["ccount"] = $value["ccount"];
                    $user["avgsj"] = round($value["avgsj"],1);
                    $user["avgfw"] = round($value["avgfw"],1);
                    $user["avgsg"] = round($value["avgsg"],1);
                    $user["avgscore"] = round(($value["avgsj"]+$value["avgfw"]+$value["avgsg"])/3,1);
                    $user["avgcount"] = round($value["avgcount"],1) == 0?1:round($value["avgcount"],1);
                    $user["casecount"] = $value["casecount"];
                    $user["video"] = $value["video"];
                    $user["qq"] =  empty($value["qq"]) ==true?$contact_q1:($value["on"] != 2 || $value["fake"] !=0)?$contact_q1:$value["qq"];
                    $user["qq1"] = empty($value["qq1"])==true?$contact_q2:($value["on"] != 2 || $value["fake"] !=0)?$contact_q2:$value["qq1"];
                    $user["dz"] = $value["dz"];
                    $user["cal"] = empty($value["cal"])?"":($value["on"] != 2 || $value["fake"] !=0)?"":$value["cal"];
                    $user["cals"] = empty($value["cals"])?$contact_t400:($value["on"] != 2 || $value["fake"] !=0)?$contact_t400:$value["cals"];
                    $user["tel"] = empty($value["tel"])?$contact_t400:($value["on"] != 2 || $value["fake"] !=0)?$contact_t400:$value["tel"];
                    $user["cs"] = $value["cs"];
                    $user["gm"] = $value["gm"];
                    $user["chengli"] = date("Y年m月",strtotime($value["chengli"]));
                    $user["good"] = round(($value["good"]/$value["newcount"])*100,2);
                    $user["oldgood"] =round(($value["oldgood"]/$value["oldcount"])*100,2);
                    $user["evaluation"] = $user["avgcuont"];
                    if($value["avgsj"] != 0 && $value["avgfw"] != 0 && $value["avgsg"] != 0){
                        $user["evaluation"] = round(($value["avgsj"]+$value["avgfw"]+$value["avgsg"])/3,2);
                    }
                }
                if(!empty($value["hid"])){
                    $sub = array(
                        "name"=>$value["shortname"],
                        "tel" =>$value["htel"],
                        "addr"=>$value["addr"],
                        "qq"=> empty($value["qq3"]) ==true?$contact_q1:($value["on"] != 2 || $value["fake"] !=0)?$contact_q1:$value["qq3"],
                        "qq1"=>empty($value["qq4"]) ==true?$contact_q1:($value["on"] != 2 || $value["fake"] !=0)?$contact_q1:$value["qq4"],
                        "nickname"=>empty($value["nickname2"])== true?"家装咨询顾问":$value["nickname2"],
                        "nickname1"=>empty($value["nickname3"])== true?"家装咨询顾问":$value["nickname3"]
                             );
                    $user["child"][] = $sub;
                }
            }
        }
        return $user;
    }

     /**
     * 获取案例图片
     * @param  string $comid   [description]
     * @param  string $cs      [description]
     * @param  string $classid [description]
     * @return [type]          [description]
     */
    private function getCasesListByComId($pageIndex,$pageCount,$comid ='',$cs ='')
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Cases")->getCasesListByComIdCount($comid,$cs,'');
        if($count > 0){
            import('Library.Org.Page.MobilePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \MobilePage($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();
            $list =D("Cases")->getCasesListByComId(($page->pageIndex-1)*$pageCount,$pageCount,$comid,$cs,'');
            return array("cases"=>$list,"page"=>$pageTmp);
       }
       return null;
    }

    /**
     * 获取设计师列表
     * @param  [type] $id        [用户编号]
     * @param  [type] $zw      [职位名称]
     * @param  [type] $pageIndex [description]
     * @param  [type] $pageCount [description]
     * @return [type]            [description]
     */
    private function getTeamDesignerList($id,$zw,$zt,$pageIndex,$pageCount)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("User")->getTeamDesignerListCount($id,$zw,$zt);
        if($count > 0){
           import('Library.Org.Page.MobilePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \MobilePage($pageIndex,$pageCount,$count,$config,"html");
            $pageTmp = $page->show();
            //查询设计师资料
            $users = D("User")->getTeamDesignerList($id,$zw,$zt,($page->pageIndex-1)*$pageCount,$pageCount);

            foreach ($users as $key => $value) {
                $ids[] = $value["userid"];
            }

            //获取设计师最新的2个案例数
            $cases = D("Cases")->getDesinerCase($ids,1);
            foreach ($users as $key => $value) {
                foreach ($cases as $k => $val) {
                    if($value["userid"] == $val["userid"]){
                        if($val['img_host'] == 'qiniu' && !empty($val['img_path'])){
                            $users[$key]["caseimg"] = array(
                                                          'url'=>'http://'.C('QINIU_DOMAIN').'/'.$val['img_path'],
                                                          'alt'=>$users[$key]["name"] . '设计作品'
                                                          );
                        }elseif(!empty($val['img_path'])){
                            $users[$key]["caseimg"] = array(
                                                          'url'=>'http://'.C('STATIC_HOST1').$val['img_path'].'s_'.$val['img'],
                                                          'alt'=>$users[$key]["name"] . '设计作品'
                                                          );
                        }
                    }
                }
            }
            return array("team"=>$users,"page"=>$pageTmp);
        }
        return null;
    }

     /**
     * 获取业主评论
     * @param  [type] $id    [公司编号]
     * @param  [type] $cs    [所在城市]
     * @param  [type] $limit [显示数量]
     * @param  [type] $reply [是否显示回复]
     * @return [type]        [description]
     */
    private function getComments($id,$cs,$pageIndex,$pageCount,$reply)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Comment")->getCommentByComIdCount($id,$cs);
        if($count > 0){
            import('Library.Org.Page.MobilePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \MobilePage($pageIndex,$pageCount,$count,$config);
            $pageTmp = $page->show();
            $comments = D("Comment")->getCommentByComId($id,$cs,($page->pageIndex-1)*$pageCount,$pageCount,$reply);
            foreach ($comments as $key => $value) {
                $total = $value["count"];
                if($value["sj"] != 0 && $value["fw"]!= 0 && $value["sg"]!= 0){
                    $total = round((($value["sj"]+$value["fw"]+$value["sg"])/3),1);

                }
                $comments[$key]["totalCount"] = $total;
            }
            return array("comments"=>$comments,"page"=>$pageTmp);
        }
        return null;
    }


    /**
     * 装修公司装修报价详细页面
     * @return [type] [description]
     */
    public function details()
    {
        $info["user"] =  $this->user;
        $src = $_GET['src'];
        $orderSourceResult = D("OrderSource")->getOne($src);

        //根据sourceid获取微信管理信息
        $result = D("YySrcWeixin")->getOneBySourceid($orderSourceResult['id']);

        if(!$result || empty($result['name'])){
            $result = D("YySrcWeixin")->getDefaultData();
        }
        if(!empty($result['name'])){
            $this->assign("name", $result['name']);
        }

        if (isset($_COOKIE["w_qizuang_n"])) {
            $orderid = $_COOKIE["w_qizuang_n"];
            $order = D("Orders")->getOrderInfoById($orderid);
            if(!empty($order)){
                $result = $this->calculatePrice($order["mianji"],$order["huxing"]);
                $basic["head"]["title"] = $order["cname"]."_".$order["fengge"]."_".$order["hxname"].$info['user']['jc']."装修报价明细-齐装网";
                $this->assign("basic",$basic);
                $this->assign("order",$order);
                $this->assign("result",$result);
                $this->assign("info",$info);
                $this->display();
                die();
            }else{
                header("LOCATION:http://m.qizuang.com/company/");
                die();
            }
        }else{
            header("LOCATION:http://m.qizuang.com/company/");
            die();
        }
    }


    /**
     * 报价计算器
     * @param  [type] $mianji [面积]
     * @param  [type] $cs [城市]
     * @return [type]         [description]
     */
    private function calculatePrice($mianji,$cs)
    {
        //占比：客厅25% 卧室 18% 厨房 8% 卫生间16% 水电25% 其他 8%
        //计算公式 （城市最低半包单价*120%）*房子的面积

        //获取改订单城市的最低半包价格
        $result = D("Orders")->getCityPrice($cs);
        $price = $result["half_price_min"];
        if (empty($price)) {
            $price = 300;
        }

        $total = $price*1.2*$mianji;
        $info["child"]['kt'] = $total*0.25 ;
        $info["child"]['zw'] = $total*0.18;
        $info["child"]['wsj'] = $total*0.16;
        $info["child"]['cf'] = $total*0.08;
        $info["child"]['sd'] = $total*0.25;
        $info["child"]['other'] = $total*0.08;
        $info['total'] = $total;

        return $info;
    }
}
