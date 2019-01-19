<?php
/**
 * 移动版设计师博客页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class BlogController extends MobileBaseController{
    public function index(){
        $cityInfo = $this->cityInfo;
        $info = S("Cache:mobileBlog:".I("get.id"));
        if(!$info){
            //1.获取设计师的详细信息
            $designer = $this->getDesingerInfo(I("get.id"),$cityInfo["id"]);
            $info["designer"] = $designer;
            $info["title"] = $designer['name']."的博客";
            S("Cache:mobileBlog:".I("get.id"),$info,3600*24);
        }
        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);

        //获取设计师作品
        $pageIndex = 1;
        $pageCount = 10;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
        }
        $cases = $this->getDesingerCaseInfo(I("get.id"),$pageIndex,$pageCount);
        $info["cases"] = $cases["cases"];
        $info["page"] = $cases["page"];
        $this->assign("info",$info);
        $this->display();
    }

    /**
     * 获取设计师信息
     * @param  [type] $id [设计师编号]
     * @param  [type] $cid [公司编号]
     * @return [type]     [description]
     */
    private function getDesingerInfo($id,$cs){
       $user = D("Common/User")->getDesingerInfo($id,$cs);
       return $user;
    }

     /**
     * 获取设计师案例列表
     * @param  [type] $id        [设计师编号]
     * @param  [type] $pageIndex [description]
     * @param  [type] $pageCount [description]
     * @param  [type] $tab       [额外参数]
     * @return [type]            [description]
     */
    private function getDesingerCaseInfo($id,$pageIndex,$pageCount)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Cases")->getDesingerCaseInfoCount($id);
        if($count> 0){
            import('Library.Org.Page.MobilePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \MobilePage($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();
            $cases = D("Cases")->getDesingerCaseInfo($id,($page->pageIndex-1)*$pageCount,$pageCount);
            return array("cases"=>$cases,"page"=>$pageTmp);
        }
        return null;
    }
}