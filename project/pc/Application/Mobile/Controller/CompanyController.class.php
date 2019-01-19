<?php
/**
 * 移动版装修公司列表页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class CompanyController extends MobileBaseController{
    public function index(){
        $cityInfo = $this->cityInfo;
        $info["title"] = "装修公司列表";
        $content = $cityInfo["name"];
        if(I("get.keyword") !== ""){
            $keyword = I("get.keyword");
            $info["keyword"] = $keyword;
            $content .= $keyword;
        }
        //获取装修公司列表
        $pageIndex = 1;
        $pageCount = 20;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
            $pageContent ="第".$pageIndex."页";
        }

        $list =  $this->getCompanyList($pageIndex,$pageCount,$keyword,$cityInfo["id"]);

        $info["companyList"] = $list["companyList"];
        $info["page"] = $list["page"];
        $this->assign("info",$info);

        if(empty($keyword)){
            $keys["title"] = $content."装修公司排名_".$content."装修公司大全_".$cityInfo["name"];
            $keys["keywords"] = $content."装修公司,".$content."装修公司排名,".$content."装修公司大全".$pageContent;
            $keys["description"] ="齐装网为您提供".$content."装修公司排名以及".$content."装修公司大全查询,并提供免费设计服务，注册即可免费获得4份装修设计与报价！";
        }else{
            //关键字、描述、标题
            $keys["title"] = $content.",".$content."怎么样".$pageContent;
            $keys["keywords"] =  $content;
            $keys["description"] = "齐装网为您提供".$content."的相关信息，".$content."怎么样，找".$content."就上齐装网！";
        }

        $this->assign("keys",$keys);
        $this->display();
    }

    /**
     * 获取装修公司列表
     * @return [type] [description]
     */
    private function getCompanyList($pageIndex,$pageCount,$keyword,$cs)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Common/User")->getUserInfoListCount(3,$keyword,$cs);
        if($count > 0){
            import('Library.Org.Page.MobilePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \MobilePage($pageIndex,$pageCount,$count,$config,"html");
            $pageTmp =  $page->show();
            $result = D("Common/User")->getUserInfoList(($page->pageIndex-1)*$pageCount,$pageCount,3,$keyword,$cs);

            import('Library.Org.Util.Fiftercontact');
            $filter = new \Fiftercontact();
            foreach ($result as $key => $value) {
                $result[$key]["qc"] = $filter->filter_title($value["qc"]);
                $result[$key]["uv"] = ceil($value["uv"]) < 1?1:ceil($value["uv"]) ;
                $result[$key]["qd"] = $value["qdcount"] +$value["zzqd"];
            }
            return array("companyList"=>$result,"page"=>$pageTmp);
        }
        return null;
    }
}