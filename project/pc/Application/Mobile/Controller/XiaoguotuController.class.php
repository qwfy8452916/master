<?php
/**
 * 移动版效果图
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class XiaoguotuController extends MobileBaseController{
    public function index(){
        $cityInfo = $this->cityInfo;
        $info["title"] = "装修效果图";
        //获取效果图片列表
        $pageIndex = 1;
        $pageCount = 10;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
            $pageContent ="第".$pageIndex."页";
        }
        //获取风格
        //获取装修风格列表
        $fg = D("Common/Fengge")->getfg();
        $top = array(
                "id"=>"",
                "type"=>"fengge",
                "name" =>"不限"
                     );
        array_unshift($fg,$top);
        unset($fg[count($fg)-1]);
        $info["fg"] = $fg;

        //获取户型
        $hx = D("Common/Huxing")->gethx();
        $top = array(
                "id"=>"",
                "type"=>"hx",
                "name" =>"不限"
                     );
        array_unshift($hx,$top);
        unset($hx[count($hx)-1]);
        $info["hx"] = $hx;

        if(I("get.hx") !== ""){
            $huxing = I("get.hx");
            $info["huxing"] = I("get.hx");
        }

        if(I("get.fengge") !== ""){
            $fengge = I("get.fengge");
            $info["fengge"] = I("get.fengge");
        }
        $result = $this->getCaseImagesList($pageIndex,$pageCount,"",$huxing,$fengge,"","","","",$cityInfo["id"],false);

        $info["cases"] = $result["images"];
        $info["page"] = $result["page"];
        $this->assign("info",$info);
        $content = $cityInfo["name"];
         //户型
        foreach ($info["hx"] as $key => $value) {
            if($value["id"] == $huxing && !empty($huxing)){
                $content .= $value["name"];
                $typeName .=$value["name"];
                break;
            }
        }

         //风格
        foreach ($info["fg"] as $key => $value) {
            if($value["id"] == $fengge && !empty($fengge)){
                $content .= $value["name"];
                $typeName .=$value["name"];
                break;
            }
        }
        //关键字、描述、标题
        $keys["title"] = $typeName."装修案例_".$typeName."装修设计效果图片".$pageContent."-";
        $keys["keywords"] =  $content."装修案例,".$content."装修效果图,".$content."装修设计";
        $keys["description"] = "齐装网为您提供".date("Y")."年全新流行的".$content."装修案例设计效果图片,以及".$content."装修样板房图片！找装修案例设计效果图片就上齐装网！";
        $this->assign("keys",$keys);
        $this->display();
    }

        /**
     * 获取装修案例效果图
     * @return [type] [description]
     */
    private function getCaseImagesList($pageIndex = 1,$pageCount = 10,$classid = 1,$huxing="",$fengge="",$jiage,$ys,$sm,$keyword,$cs)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count =  D("Common/Cases")->getCaseImagesListCount($classid,$huxing,$fengge,$jiage,$ys,$sm,$keyword,$cs);

        if($count > 0){
            import('Library.Org.Page.Page');
            import('Library.Org.Page.MobilePage');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \MobilePage($pageIndex,$pageCount,$count,$config,"html");
            $pageTmp =  $page->show();

            $result = D("Common/Cases")->getCaseImagesList(($page->pageIndex-1)*$pageCount,$pageCount,$classid,$huxing,$fengge,$jiage,$ys,$sm,$keyword,$cs);

            return array("images"=>$result,"page"=>$pageTmp);
        }
        return null;
    }
}