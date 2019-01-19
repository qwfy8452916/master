<?php
/**
 * 移动版设计师博客页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class ZixunController extends MobileBaseController{
    public function index(){
        $info = S("Cache:Mobile:Zixun");
        if(!$info){
            $info["title"] = "装修攻略";
            //装修流程
            $step = $this->getArticleList(87,1,5,true);
            $info["steps"] = $step;
            //局部装修
            $step = $this->getArticleList(105,1,5,true);
            $info["jbzx"] = $step;
            //装修风水
            $step = $this->getArticleList(114,1,5,true);
            $info["zxfs"] = $step;
            //装修风格
            $step = $this->getArticleList(121,1,5,true);
            $info["zxfg"] = $step;
            S("Cache:Mobile:Zixun",$info,3600);
        }

        $keys["keywords"] = "装修攻略,装修流程,装修风水,装修风格,局部装修";
        $keys["title"]    ="装修攻略_装修流程_装修风水_装修风格_局部装修-";
        $keys["description"] ="齐装网官方旅游攻略基于广大业主装修真实经历和心得的装修全攻略。装修流程、装修风水、装修风格、局部装修等全新装修攻略应有尽有。";
        $this->assign("keys",$keys);
        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);
        $this->assign("info",$info);
        $this->display();
    }

    /**
     * 装修流程
     * @return [type] [description]
     */
    public function zxlc(){
        $pageIndex = 1;
        $pageCount = 5;
        if(I("get.p") != ""){
            $pageIndex = I("get.p");
        }

        //获取装修流程的子类别
        $articleClass = D("WwwArticleClass")->getArticleClassById(87);
        $zxlcInfo["zbjd"] =  $articleClass["child"][88];
        $zxlcInfo["sgjd"] =  $articleClass["child"][93];
        $zxlcInfo["rzjd"] =  $articleClass["child"][101];
        //添加关键字、描述、标题
        $keys["title"] = "装修流程";
        $keys["keywords"] = "装修流程,装修施工,装修检测";
        $keys["description"] ="齐装网为提供全新的装修流程知识分享，装修流程包括收房验收、找装修公司、设计与预算、装修选材、拆改、水电、防水、泥瓦、木工、油漆、竣工、检测验收、后期配饰、装修保养等";
        $this->assign("keys",$keys);

        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);

        $zxlcInfo["title"] = "装修流程";
        $this->assign("info",$zxlcInfo);
        $this->display("step");
    }

    /**
     * 资讯列表页
     * @return [type] [description]
     */
    public function zxList(){
        $info["title"] = "资讯列表";
        $pageIndex = 1;
        $pageCount = 5;
        if(I("get.p") != ""){
            $pageIndex = I("get.p");
            $pageContent ="第".$pageIndex."页";
        }

        if(I("get.keyword") != ""){
            $keyword = remove_xss(I("get.keyword"));
            $this->assign("keyword",$keyword);
        }

        if($_GET["category"] != ""){
            $pathInfo = pathinfo($_SERVER["PATH_INFO"]);
            if((is_numeric($_GET["category"]) || $pathInfo["basename"] == "history") ){
                //如果是老站的链接，通过ID查询该类的ID
                if(is_numeric($_GET["category"])){
                    $ids = D("WwwArticleClass")->getOldArticleClassId($_GET["category"]);
                }else{
                    $ids = D("WwwArticleClass")->getAllOldArticleClassId($_GET["category"]);
                }

                foreach ($ids as $key => $value) {
                    $result[] = $value["id"];
                }
                $categoryClass["classname"] = "历史资讯";
                 //获取该分类的分类信息
                $keys["title"]  = "齐装网资讯".$pageContent;
                $keys["keywords"]  = "齐装网资讯";
                $keys["description"] = "齐装网资讯";
            }else{

                $category = $_GET["category"];
                if(strtolower($category) == "search"){
                    //获取该分类的分类信息
                    $keys["title"] = $keyword;
                    $keys["keywords"] = $keyword;
                    $keys["description"] = "齐装网为您提供".$keyword."相关装修知识，找".$keyword."就上齐装网！";
                }else{

                    //获取该类别的编号
                    $categoryClass = D("WwwArticleClass")->getArticleClassByShortname($category);
                    //没有查询到类别的,404页面
                    if(empty($categoryClass)){
                        $this->_error();
                        die();
                    }
                    if($categoryClass["pid"] == 0){
                        $cat =  D("WwwArticleClass")->getArticleClassById($categoryClass["id"]);
                        $result = $cat["ids"];
                    }else{
                        $result[] = $categoryClass["id"];
                    }

                    //获取该分类的分类信息
                    $keys["title"] = $categoryClass["title"].$pageContent;
                    $keys["keywords"] = $categoryClass["keywords"];
                    $keys["description"] = $categoryClass["description"];
                }

            }
            $this->assign("category",$categoryClass["classname"]);
            $this->assign("keys",$keys);
        }

        if(empty($result)){
            $this->_error();
        }

        //获取资讯文章
        $pageIndex = 1;
        $pageCount = 10;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
            $pageContent ="第".$pageIndex."页";
        }
        $articles = $this->getZxArticleList($result,$pageIndex,$pageCount,$keyword,true);
        $info["articles"] = $articles["articles"];
        $info["page"] = $articles["page"];
        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);

        //关键字、描述、标题
        $keys["title"] = $categoryClass["title"].$pageContent;
        $keys["keywords"] = $categoryClass["keywords"];
        $keys["description"] = $categoryClass["description"];
        $this->assign("keys",$keys);

        $this->assign("info",$info);
        $this->display("wenz-list");
    }

    /**
     * 获取文章分类及文章
     * @return [type] [description]
     */
    private function getArticleList($id,$pageIndex,$pageCount,$isTop){
        //根据ID查询相对应的文章类别
        $result =  D("WwwArticleClass")->getArticleClassById($id);
        $ids[] = array_unique($result["ids"]);
        //根据文章类别查询出所有的文章
        $articles = D("WwwArticle")->getArticleListByIds($ids,($pageIndex-1)*$pageCount,$pageCount,'',$isTop);
        return  $articles;
    }

     /**
     * 获取资讯列表页文章列表
     * @param  string  $id        [分类编号]
     * @param  integer $pageIndex [description]
     * @param  integer $pageCount [description]
     * @param  boolean $isTop     [是否置顶]
     * @return [type]             [description]
     */
    private function getZxArticleList($category='',$pageIndex=1,$pageCount=5,$keyword ="",$isTop=true)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        //获取文章的分类
        if(empty($category)){
            $result = D("WwwArticleClass")->getAllArticleClass();
        }else{
            $result = $category;
        }
        $count = D("WwwArticle")->getArticleListCount($result,$keyword);
        if($count > 0){
            import('Library.Org.Page.MobilePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \MobilePage($pageIndex,$pageCount,$count,$config,"html");
            $pageTmp =  $page->show();
            $result = D("WwwArticle")->getArticleListByIds(array($result),($page->pageIndex-1)*$pageCount,$pageCount,$keyword);
            foreach ($result as $key => $value) {
                $result[$key]["img_host"] = "qiniu";
                //如果是老站链接过来的文章，同一用history代替
                if(empty($value["shortname"])){
                    $result[$key]["shortname"] ="history";
                    $result[$key]["title"] = str_replace("_齐装网", "", $value["title"]);
                    $result[$key]["img_host"] = "";
                }
                if(!empty($value["imgs"])){
                    $exp = explode(",", $value["imgs"]);
                    $exp = array_filter($exp);
                    $result[$key]["imgs"] = $exp;
                }
            }
            return array("articles"=>$result,"page"=>$pageTmp);
        }
    }



}