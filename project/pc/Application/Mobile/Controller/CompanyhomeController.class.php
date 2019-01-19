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
        //获取装修公司信息
        $user = $this->getUserInfo(I("get.id"),$cityInfo["id"]);
        if(count($user) > 0){
            $this->user = $user;
        }else{
            $this->_error();
        }
    }

    public function index(){
        $info["title"] = "装修公司";
        $id = I("get.id");
        $info["user"] =  $this->user;
        //获取装修公司的文化信息图片
        $imgs = D("User")->getCompanyImg($id);
        $info["imgs"] = $imgs;
        //关键字、描述、标题
        $keys["title"] = $info["user"]["qc"]."-";
        $keys["keywords"] =  $info["user"]["qc"].",".$info["user"]["qc"]."怎么样";
        $keys["description"] =  $info["user"]["qc"].$cityInfo["name"]."为您提供"
                                .$cityInfo["name"]."装修设计方案与报价、".$cityInfo["name"]."装修优惠、免费装修咨询预约以及装修案例效果图。";
        $this->assign("keys",$keys);
        $this->assign("info",$info);
        $this->assign("tabIndex",0);
        $this->display();
    }

    /**
     * 装修公司案例列表页
     * @return [type] [description]
     */
    public function cases(){
        $cityInfo = $this->cityInfo;
        $pageIndex = 1;
        $pageCount = 10;

        if($_POST){
            //提交查询案例
            $id = I("post.id");
            if(isset($_COOKIE["w_page_index"])){
                $pageIndex = remove_xss($_COOKIE["w_page_index"])+1;
                $scrollTop = remove_xss(I("post.scroll"));
                $time = time()+600;
                setcookie("w_page_index",$pageIndex, $time,'/', '.'.C('QZ_YUMING'));
                //设置滚动条高度
                setcookie("w_page_scrolltop",$scrollTop, $time,'/', '.'.C('QZ_YUMING'));
                $cases = $this->getCasesListByComId($pageIndex,$pageCount,$id,$cityInfo["id"]);
                if(!empty($cases)){
                   $this->ajaxReturn(array("data"=>$cases["cases"],"info"=>"","status"=>1));
                }
                $this->ajaxReturn(array("data"=>"","info"=>"","status"=>0));
            }else{
                //清除图片的缓存
                S("Cache:Mobile:".$id.$cityInfo["id"]."CompanyCases",null);
            }
            //如果COOKIE过期,则刷新页面
            $this->ajaxReturn(array("data"=>"","info"=>"","status"=>2));
        }else{
            $info["title"] = "装修公司";
            $id = I("get.id");
            //获取装修公司信息
            $info["user"] =  $this->user;
            $cacheCases = S("Cache:Mobile:".session_id().$id.$cityInfo["id"]."CompanyCases");

            //案例图缓存
            if($cacheCases){
                //如果缓存图片存在,则说明用户已经浏览过了这些图片
                //如果缓存还在，cookie未失效
                if(isset($_COOKIE["w_page_index"])){
                    //将所有图片合并
                    $pageIndex = remove_xss($_COOKIE["w_page_index"]);
                    //设置滚动条的高度
                    $info["scrollTop"] = $_COOKIE["w_page_scrolltop"];
                }
                $cases = $this->getCasesListByComId($pageIndex,$pageCount,$id,$cityInfo["id"]);
                $allCases = array_merge_recursive($cacheCases,$cases["cases"]);
            }else{
                //如果缓存案例图不存在,重新开始查询
                //获取装修公司案例
                $time = time()+600;
                $cases = $this->getCasesListByComId($pageIndex,$pageCount,$id,$cityInfo["id"]);
                $allCases = $cases["cases"];
                //设置pageIndex 索引
                setcookie("w_page_index",$pageIndex,$time,'/', '.'.C('QZ_YUMING'));
                //设置图片缓存，缓存时间10分钟
                S("Cache:Mobile:".session_id().$id.$cityInfo["id"]."CompanyCases",$cases["cases"],600);
            }
            //关键字、描述、标题
            $content = $info["user"]["qc"];
            $keys["title"] = $content."装修案例效果图";
            $keys["keywords"] = $content."装修案例效果图";
            $keys["description"] = $content."装修案例效果图";
            $this->assign("keys",$keys);

            $info["cases"] = $allCases;
            $this->assign("info",$info);
            $this->assign("tabIndex",1);
            $this->display("company-case");
        }
    }

    /**
     * 设计团队页
     * @return [type] [description]
     */
    public function team(){
        $info["title"] = "设计师团队";
        $id = I("get.id");
        $info["user"] =  $this->user;
        //获取设计师团队信息
        $pageIndex = 1;
        $pageCount = 10;
        if(I("get.p") !== ""){
            $pageIndex = I("get.page");
        }
        $team = $this->getTeamDesignerList($id,"",2,$pageIndex,$pageCount);
        $info["team"] = $team["team"];
        $info["page"] = $team["page"];

        //seo 标题/描述/关键字
        $keys["title"] = $info["user"]["qc"]."设计团队";
        $keys["keywords"] = $info["user"]["qc"]."设计团队,".$info["user"]["qc"]."设计团师, 装修设计师";
        $keys["description"] = $info["user"]["qc"]."设计团队";
        $this->assign("keys",$keys);
        $this->assign("info",$info);
        $this->assign("tabIndex",2);
        $this->display("company-team");
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
        $keys["title"] = $info["user"]["qc"]."评价_业主点评";
        $keys["keywords"] = $info["user"]["qc"]."评价,业主点评";
        $keys["description"] = $info["user"]["qc"]."评价";
        $this->assign("keys",$keys);
        $this->assign("info",$info);
        $this->assign("tabIndex",3);
        $this->display("company-pj");
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


}
