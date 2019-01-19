<?php
namespace Sub\Controller;
use Sub\Common\Controller\SubBaseController;
class BlogController extends SubBaseController{
    public function _initialize(){
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
    }

    public function index(){
        $cityInfo = $this->cityInfo;
        if(I("get.id") !== ""){
            $userInfo = S('Cache:SubBlog:'.$cityInfo["bm"]. ":" .intval(I("get.id") ) );
            if(!$userInfo){
                //获取设计师信息
                $designer = $this->getDesingerInfo(I("get.id"),$cityInfo["id"]);
                $userInfo["designer"] = $designer;

                S('Cache:SubBlog:'.$cityInfo["bm"]. ":" .intval(I("get.id")),$userInfo,900);
            }

            if(empty($userInfo["designer"]["name"])){
                $this->_error();
                die();
            }

            $extra  =I("get.extra");
            //更新设计师人气
            D("User")->editUvAndPv(I("get.id"),"pv");

            $pageIndex = 1;
            $pageCount = 12;
            $articlePageIndex = 1;
            $articlePageCount = 5;

            if($extra == 1){
                if(I("get.p")!==""){
                    $pageIndex = I("get.p");
                }
            }elseif($extra == 2){
                if(I("get.p")!==""){
                    $articlePageIndex = I("get.p");
                }
            }
            $this->assign("extra",$extra);
            //获取设计师作品
            $cases = $this->getDesingerCaseInfo(I("get.id"),$pageIndex,$pageCount);
            $userInfo["cases"] = $cases["cases"];
            $userInfo["page"] = $cases["page"];
            $userInfo["count"] = $cases["count"];
            if('/blog/'.I("get.id").'/' == $_SERVER['REQUEST_URI']){
                $info['head']['canonical'] = 'http://' . $cityInfo['bm'].'.'.C('QZ_YUMING').'/blog/'.I("get.id").'/';
            }

            //获取设计师文章作品
            $article = $this->getArticlesList($articlePageIndex,$articlePageCount,I("get.id"),$cityInfo["id"]);
            $userInfo["article"] = $article["article"];
            $userInfo["articlePage"] = $article["page"];
             //seo 标题/描述/关键字
            $keys["title"] = "装修设计师".$userInfo["designer"]["name"]."的博客-";
            $keys["keywords"] = $userInfo["designer"]["name"].",".$userInfo["designer"]["name"]."博客,装修设计师室内设计师";
            $keys["description"] =mb_substr($userInfo["designer"]["text"], 0,100,"utf-8");
            $this->assign("keys",$keys);
             //安全验证码
            $safe = getSafeCode();
            $this->assign("safecode",$safe["safecode"]);
            $this->assign("safekey",$safe["safekey"]);
            $this->assign("ssid",$safe["ssid"]);
            //菜单导航
            $this->assign("tabIndex",3);
            $this->assign("userInfo",$userInfo);
            $this->assign("info",$info);
            $this->display();
            die();
        }
        $this->_error();
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
            $extra = array(
                    "extra"=>1
                           );
            import('Library.Org.Page.Page');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \Page($pageIndex,$pageCount,$count,$config,$extra);
            $pageTmp =  $page->show();
            $cases = D("Cases")->getDesingerCaseInfo($id,($page->pageIndex-1)*$pageCount,$pageCount);
            return array("cases"=>$cases,"page"=>$pageTmp,"count"=>$count);
        }
        return null;
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
     * 获取设计师文章列表
     * @return [type] [description]
     */
    private function getArticlesList($pageIndex,$pageCount,$id,$cs)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Article")->getArticleListCount($id,$cs);
        if($count > 0){
            $extra = array(
                    "extra"=>2
                           );
            import('Library.Org.Page.Page');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \Page($pageIndex,$pageCount,$count,$config,$extra);
            $pageTmp =  $page->show();
            $article = D("Article")->getArticleList($id,$cs,($page->pageIndex-1)*$pageCount,$pageCount);
            return array("article"=>$article,"page"=>$pageTmp,"count"=>$count);
        }
    }
}