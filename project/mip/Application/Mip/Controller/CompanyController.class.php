<?php
namespace Mip\Controller;
use Mip\Common\Controller\MipBaseController;

class CompanyController extends MipBaseController
{
    public function index()
    {
        $cityInfo = $this->cityInfo;
        $content = $cityInfo["name"];
        if(I("get.keyword") !== ""){
            $keyword = I("get.keyword");
            if(!checkKeyword($keyword)){
                $this->_error();
            }
            $info["keyword"] = $keyword;
            $content .= $keyword;
        }

        if(!empty($cityInfo)){
            $prefix = "http://".C("QZ_YUMING_MIP").'/'.$cityInfo['bm'].'/company/list-';
            $result = $this->analyseUrl($_SERVER['REQUEST_URI'], $prefix, array('fu','f','g'));

            if(!$result['checked']){
                $this->_error('页面不存在');
            }

            $navurl = $result['realurl'];
            $param = $result['config'];

            $navbar["area"] = S("Cache:m:navbar:area:".$cityInfo['id']);
            if (!$navbar["area"]) {
                //获取城市信息
                $company["area"] = D("Common/Area")->getAreaByFatherId($cityInfo['id']);
                $navbar['area'] = $this->getNavUrl($company["area"],'fu',$navurl,$param['fu'], $prefix.'fu0f0g0');
                S("Cache:m:navbar:area:".$cityInfo['id'],$navbar['area'],3600);
            }

            $navbar["fenge"] = S("Cache:m:navbar:fengge");
            if (!$navbar["fenge"]) {
                //获取风格列表
                $company["fenge"] = D("Common/Fengge")->getfg();
                $navbar['fenge'] = $this->getNavUrl($company["fenge"],'f',$navurl,$param['f'], $prefix.'fu0f0g0');
                S("Cache:m:navbar:fengge",$navbar['fenge'],3600);
            }

            $navbar["guimo"] = S("Cache:m:navbar:guimo");
            if (!$navbar["guimo"]) {
                //获取公司规模选项
                $company["guimo"] = D("Common/Guimo")->gethGm();
                $navbar['guimo'] = $this->getNavUrl($company["guimo"],'g',$navurl,$param['g'], $prefix.'fu0f0g0');
                S("Cache:m:navbar:guimo",$navbar['guimo'],3600);
            }
        }

        //最新上传装修案例
        $info["cases"] = S("Cache:m:c:case:".$cityInfo['id']);
        if (!$info["cases"]) {
            $info["cases"] = D("Cases")->getIndexNewsCases(6,$cityInfo['id']);
            S("Cache:m:c:case:".$cityInfo['id'],$info["cases"],900);
        }


        //获取装修公司列表
        $pageIndex = 1;
        $pageCount = 10;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
            $pageContent ="第".$pageIndex."页";
        }

        $list =  $this->getCompanyList($pageIndex,$pageCount,$keyword,$cityInfo["id"],$param);
        if(empty($keyword)){
            $area = [];
            foreach ($company["area"] as $key => $val) {
                $area[$val['id']] = $val['name'];
            }
            if(empty($area[$param['fu']])){
                $basic["head"]["title"] = $cityInfo["name"] . "装修公司排名_" . $cityInfo["name"] . "装修公司大全-" . $cityInfo["name"] . "齐装网";
                $basic["head"]["keywords"] = $content."装修公司,".$content."装修公司排名,".$content."装修公司大全".$pageContent;
                $basic["head"]["description"] ="齐装网为您提供".$content."装修公司排名以及".$content."装修公司大全查询,并提供免费设计服务，注册即可免费获得4份装修设计与报价！";
            }else{
                $content = $cityInfo["name"] . $area[$param['fu']];
                $basic["head"]["title"] = $content . '装修公司排名 - '. $cityInfo["name"] .'齐装网';
                $basic["head"]["keywords"] = $content . '装修公司，'. $content .'装修设计';
                $basic["head"]["description"] = $cityInfo["name"] . '齐装网汇集了'.$content.'装修公司排名大全，免费为您提供'.$content.'装修公司的装修案例和装修预算方案，让您知道'.$content.'装修公司哪家好，彻底为您解决装修难题。';
            }
        }else{
            //关键字、描述、标题
            $basic["head"]["title"] = $content.",".$content."怎么样".$pageContent;
            $basic["head"]["keywords"] =  $content;
            $basic["head"]["description"] = "齐装网为您提供".$content."的相关信息，".$content."怎么样，找".$content."就上齐装网！";
        }

        if(empty($cityInfo)){
            $info['canonical'] = 'http://'.C('QZ_YUMINGWWW').'/company/';
        }else{
            $info['canonical'] = $cityInfo['bm'].'/company' == trim($_SERVER['REQUEST_URI'],'/') ? 'http://'.$cityInfo['bm'].'.'.C('QZ_YUMING').'/company/' : '';

            if(empty($info['canonical'])){
                $pcUrl = explode('?',$_SERVER['REQUEST_URI']);
                $pcUrl = str_replace($cityInfo['bm'].'/','',$pcUrl['0']);
                $info['canonical'] = 'http://'.$cityInfo['bm'].'.'.C('QZ_YUMING').$pcUrl;
            }
        }

        $this->assign("navbar",$navbar);
        $info["list"] = $this->getStar($list["companyList"]);
        $info["page"] = $list["page"];

        //分配canonical标签
        $canonical = "http://" . C("MIP_DONAMES") . $_SERVER['REQUEST_URI'];

        $this->assign("canonical", $canonical);
        $this->assign("head", $basic['head']);
        $this->assign("info",$info);
        $this->assign("basic",$basic);
        $this->display();
    }



    public function company_home(){

        $id = I("get.id");
        $cityInfo = $this->cityInfo;
        $info["user"] =  $this->getUserInfo(I("get.id"),$cityInfo["id"]);
        $info['cases'] = D("Cases")->getCasesListByComId(0,3,$id,$this->cityInfo["id"]);


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

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];


        $this->assign("basic",$basic);
        $info['canonical'] = 'http://' . $cityInfo['bm'].'.'.C('QZ_YUMING'). str_ireplace('/'.$cityInfo['bm'], '', $_SERVER['REQUEST_URI']);

        $this->assign("canonical", $canonical);
        $this->assign("nav_home", "company_active");
        $this->assign("head", $basic['head']);
        $this->assign("info",$info);
        $this->assign("nav_index",'bh');
        $this->display();
    }

    /**
     * 装修公司案例列表页
     * @return [type] [description]
     */
    public function company_case(){
        $cityInfo = $this->cityInfo;
        $pageIndex = 1;

        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
        }
        $pageCount = 10;

        $id = I("get.id");

        //获取装修公司信息
        $info["user"] =  $this->getUserInfo(I("get.id"),$cityInfo["id"]);
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

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];

        $this->assign("canonical", $canonical);
        $this->assign("head", $basic['head']);
        $this->assign("navCases", "company_active");
        $this->assign("basic",$basic);
        $this->assign("info",$info);
        $this->assign("nav_cases",'bh');
        $this->display();
    }

    /**
     * 设计团队页
     * @return [type] [description]
     */
    public function company_team(){
        $info["title"] = "设计师团队";
        $cityInfo = $this->cityInfo;
        $id = I("get.id");
        $info["user"] =  $this->getUserInfo(I("get.id"),$cityInfo["id"]);

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

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];

        $this->assign("canonical", $canonical);
        $this->assign("head", $basic['head']);
        $this->assign("navTeam", "company_active");
        $this->assign("basic",$basic);
        $this->assign("info",$info);
        $this->assign("nav_team",'bh');
        $this->display();
    }


    /**
     * 装修公司评论页面
     * @return [type] [description]
     */
    public function company_message(){
        $cityInfo = $this->cityInfo;
        $info["title"] = "业主牛评";
        $info["user"] =  $this->getUserInfo(I("get.id"),$cityInfo["id"]);

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

        //分配canonical标签
        $canonical = "http://" . C("MOBILE_DONAMES") . $_SERVER['REQUEST_URI'];

        $this->assign("canonical", $canonical);
        $this->assign("head", $basic['head']);
        $this->assign("nav_message", "company_active");
        $this->assign("basic",$basic);
        $this->assign("info",$info);
        $this->assign("nav_comment",'bh');
        $this->display();
    }


    /**
     * 获取装修公司列表
     * @return [type] [description]
     */
    private function getCompanyList($pageIndex,$pageCount,$keyword,$cs,$param)
    {
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);
        $count = D("Common/User")->getUserInfoListCount(3,$keyword,$cs,$param['fu'],$param['f'],$param['g']);

        if ($count >= $pageCount*100) {
            $count = $pageCount*100;
        }

        if ($pageIndex > 100) {
            $pageIndex = 100;
        }

        if($count > 0){
            import('Library.Org.Page.MobilePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \MobilePage($pageIndex,$pageCount,$count,$config,"html");
            $pageTmp =  $page->show2();

            //mip分页
            import('Library.Org.Page.Page');
            $pagemip = new \Page($pageIndex, $pageCount, (int)$count, $config, 'html');
            $pageMipTmp = $pagemip->show3();

            $result = D("Common/User")->getUserInfoList(($page->pageIndex-1)*$pageCount,$pageCount,3,$keyword,$cs,$param['fu'],$param['f'],$param['g']);
            import('Library.Org.Util.Fiftercontact');
            $filter = new \Fiftercontact();
            foreach ($result as $key => $value) {
                $result[$key]["qc"] = $filter->filter_title($value["qc"]);
                $result[$key]["uv"] = ceil($value["uv"]) < 1?1:ceil($value["uv"]) ;
                $result[$key]["qd"] = $value["qdcount"] +$value["zzqd"];
            }
            return array("companyList"=>$result,"page"=>$pageMipTmp);
        }
        return null;
    }


    //计算星星
    private function getStar($list){
        foreach ($list as $key => $value) {
            if(empty($value['logo'])){
                $list[$key]["logo"] = "http://".C('QINIU_DOMAIN').'/'.OP('DEFAULT_LOGO');
            }
            if($value["comment_score"] >= 9 ){
                $list[$key]["star"] = 5;
            }elseif($value["comment_score"] >= 8 && $value["comment_score"] < 9){
                $list[$key]["star"] = 4;
            }elseif($value["comment_score"] >= 6 && $value["comment_score"] < 8){
                $list[$key]["star"] = 3;
            }elseif($value["comment_score"] >= 4 && $value["comment_score"] < 6){
                $list[$key]["star"] = 2;
            }else{
                $list[$key]["star"] = 1;
            }
        }
        return $list;
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
//            $pageTmp =  $page->show();

            //mip分页
            import('Library.Org.Page.Page');
            $pagemip = new \Page($pageIndex, $pageCount, (int)$count, $config, 'html');
            $pageMipTmp = $pagemip->show3();

            $list =D("Cases")->getCasesListByComId(($page->pageIndex-1)*$pageCount,$pageCount,$comid,$cs,'');
            return array("cases"=>$list,"page"=>$pageMipTmp);
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
//            $pageTmp = $page->show();

            //mip分页
            import('Library.Org.Page.Page');
            $pagemip = new \Page($pageIndex, $pageCount, (int)$count, $config, 'html');
            $pageMipTmp = $pagemip->show3();

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
            return array("team"=>$users,"page"=>$pageMipTmp);
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
//            $pageTmp = $page->show();

            //mip分页
            import('Library.Org.Page.Page');
            $pagemip = new \Page($pageIndex, $pageCount, (int)$count, $config, 'html');
            $pageMipTmp = $pagemip->show3();

            $comments = D("Comment")->getCommentByComId($id,$cs,($page->pageIndex-1)*$pageCount,$pageCount,$reply);
            foreach ($comments as $key => $value) {
                $total = $value["count"];
                if($value["sj"] != 0 && $value["fw"]!= 0 && $value["sg"]!= 0){
                    $total = round((($value["sj"]+$value["fw"]+$value["sg"])/3),1);

                }
                $comments[$key]["totalCount"] = $total;
            }
            return array("comments"=>$comments,"page"=>$pageMipTmp);
        }
        return null;
    }


    /**
     * 获取案例信息
     * @param  string $id [案例编号]
     * @param  string $cs [所在城市]
     * @return [type]     [description]
     */
    private function getCaseInfo($id = '',$cs = ''){
        $caseInfo = D("Common/Cases")->getMobileCaseInfo($id,$cs);
        if(count($caseInfo) > 0){
            foreach ($caseInfo as $key => $value) {
                if($key == 0){
                    $case = $value;
                }
                $case["child"][] = $value;
            }
            return $case;
        }
        return null;
    }

    /**
     * [analyseUrl /company/list-fu320582f4g27]
     * @param  [type]  $url    [当前访问URL]
     * @param  [type]  $prefix [前缀]
     * @param  [type]  $param  [短参数]
     * @param  boolean $check  [是否检查非法输入]
     * @return [type]          [description]
     */
    private function analyseUrl($url, $prefix, $param, $check = true)
    {
        $realurl = rtrim(strstr($url, '?', true), '/');

        if(empty($realurl)){
            $realurl = rtrim($url,'/');
        }
        //去掉前缀
        $count = 0;
        $result = str_ireplace($prefix, '', $realurl, $count);

        //对非法url输入过滤
        if($check){
            if($count == 0){
                $checked = true;
            }else{
                $str = str_ireplace('/', '\/', $prefix);
                //拼接正则表达式
                $pattern = '/^'.$str.'(';
                foreach ($param as $key => $val) {
                    $pattern = $pattern . $val . '[\d]' . '+';
                }
                $pattern = $pattern . ')$/';
                $i = preg_match($pattern, $realurl);
                $checked = $i == 0 ? false : true;
            }
            $return['checked'] = $checked;
        }

        foreach ($param as $key => $val) {
            $pattern = '/'. $val .'\d+/i';
            $count = preg_match($pattern, $result, $match);
            if($count > 0){
                $k = preg_replace('/\d/s', '', $match[0]);
                $v = preg_replace('/\D/s', '', $match[0]);
                $config[$k] = $v;
            }else{
                //如果没有匹配到设置默认值为0
                $config[$val] = 0;
            }
        }

        //重组url，避免他人乱输入URL造成死链接
        if(array_sum($config) > 0){
            $realurl = $prefix;
            foreach ($config as $key => $val) {
                $realurl = $realurl . $key .$val;
            }
        }

        $return['config'] = $config;
        $return['realurl'] = $realurl;
        return $return;
    }

    /**
     * [getNavUrl 获取导航URL]
     * @param  [type] $datas [该类型下的所有类型]
     * @param  [type] $type  [静态参数和动态参数数组]
     * @param  [type] $urls  [当前页面去掉分页和动态参数之后的URL]
     * @return [type]        [description]
     */
    public function getNavUrl($datas, $type, $url, $present, $init = '')
    {
        //如果去掉自己之后的分类数后分类ID组合小于等于零,说明是初始化
        if(intval(preg_replace('/\D/s', '', $url)) == 0 && !empty($init)){
            $url = $init;
        }
        $selected = array();

        //去掉当前的
        $reg = '/' . $type . '\d+/i';

        foreach ($datas as $key => $value) {
            $datas[$key]["link"] = preg_replace($reg, $type.$value["id"], $url);
            if($value['id'] == $present){
                $selected = $value;
            }
        }

        $array = array(
            'name' => '不限',
            'link' => preg_replace($reg, $type.'0', $url)
        );
        array_unshift($datas, $array);
        return array('result' => $datas, 'selected' => $selected);
    }

}