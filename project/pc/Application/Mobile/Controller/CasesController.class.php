<?php
/**
 * 移动版案例详情页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class CasesController extends MobileBaseController{
    public function index(){
        $cityInfo = $this->cityInfo;
        $info = S("Cache:".I("get.bm").I("get.id"));
        if(!$info){
            //查询案例的详细信息
            $case = $this->getCaseInfo(I("get.id"),$cityInfo["id"]);
            if(!empty($case)){
                $info["case"] = $case;
                $info["title"] = "装修案例";
                S("Cache:".I("get.bm").I("get.id"),$info,3600);
            }else{
                $this->_error();
            }
        }
        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);
        //seo 标题/描述/关键字
        $keys["title"] = $info["case"]["title"].$info["case"]["mianji"]."平米".$info["case"]["hname"].$info["case"]["fengge"]."家装装修图片设计";
        $keys["keywords"] = $info["case"]["title"].",".$info["case"]["fengge"].$info["case"]["hname"]
                            .",".$info["case"]["fengge"].$info["case"]["hname"]
                            ."设计,".$info["case"]["fengge"].$info["case"]["hname"]
                            ."装修图片,".$info["case"]["mianji"]."平米".$info["case"]["now"]["hname"]."装修图片";
        $keys["description"] ="齐装网装修效果图频道为您提供".$info["case"]["title"].$info["case"]["mianji"]."平米".$info["case"]["hname"].$info["case"]["fengge"].
                            "家装装修图片设计，以及".date("Y")."年国内外流行的装修效果图大全，".$info["case"]["text"];
        $this->assign("keys",$keys);

        $this->assign("info",$info);
        $this->display();
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

}