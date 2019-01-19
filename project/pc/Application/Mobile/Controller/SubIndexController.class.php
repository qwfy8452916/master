<?php
/**
 * 移动版分站首页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class SubIndexController extends MobileBaseController{
    public function index(){
        $cityInfo = $this->cityInfo;
        $info = S("Cache:MobileSub:".I("get.bm"));
        if(!$info){
            //获取分站的轮播
            //获取首页轮播g广告图片
            $adv = $this->getLunboAdv($cityInfo["id"],$cityInfo["bm"]);
            $info["adv"] = $adv;
             //获取最新发布订单信息
            $orders = $this->getOrders(5,4,$cityInfo["id"]);
            if(count($orders) < 5){
                //处理新开站的没有最新订单的问题,取全站的最新订单
                $orders = $this->getOrders(5,4);
            }
            $info["orders"] = $orders;
            //获取装修公司LOGO
            $logos = $this->getLogos($cityInfo["id"],6);
            $info["logos"] = $logos;
            //获取最新的装修效果图
            $cases = $this->getNewCasesList($cityInfo["id"],2);
            $info["cases"] = $cases;
            //获取风格列表
            $fengge = D("Fengge")->getfg();
            unset($fengge[count($fengge)-2]);
            $info["fengge"] = $fengge;
            //获取热门城市
            $hotCity =D("Friendlink")->getFriendLinkList($cityInfo["id"],2);
            $info["hotCity"] = $hotCity;
            //获取友情链接
            $friendLink =D("Friendlink")->getFriendLinkList($cityInfo["id"],1);
            $info["friendLink"] = $friendLink;
            //获取装修攻略
            $article =$this->getIndexArticles(4);
            $info["article"] = $article;
            S("Cache:MobileSub:".I("get.bm"),$info,900);
        }

        //dump($info['cases']);

        //关键字、描述、标题
        $keys["title"] = $cityInfo["name"]."装修_"
                         .$cityInfo["name"]."装饰公司_"
                         .$cityInfo["name"]."家装网-";
        $keys["keywords"] = $cityInfo["name"]."装修公司,"
                            .$cityInfo["name"]."装修,"
                            .$cityInfo["name"]."装修网,"
                            .$cityInfo["name"]."装饰,"
                            .$cityInfo["name"]."装饰公司,"
                            .$cityInfo["name"]."装饰网,"
                            .$cityInfo["name"]."家装,"
                            .$cityInfo["name"]."家装公司";
        $keys["description"] = $cityInfo["name"].
                              "齐装网提供市场上性价比高的"
                              .$cityInfo["name"]."装修服务，并提供"
                              .$cityInfo["name"]
                              ."家装装饰公司及排名等咨询。我们为您提供完美的服务,您的光临是我们莫大的荣幸,您的意见是我们前进的动力。";
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
     * 获取轮播列表
     * @param  string $city [description]
     * @return [type]       [description]
     */
    private function getLunboAdv($city = "",$bm){
        $adv =  D("Common/Adv")->getIndexAdv($city);
        foreach ($adv as $key => $value) {
            if($value["href"] == "#"){
                $adv[$key]["href"] = "http://m.".C('QZ_YUMING')."/".$value["bm"]."/company_home/".$value["comid"];
            }else{
                $adv[$key]["href"] =  "http://m.".C('QZ_YUMING')."/".$bm."/mzb/";
            }
        }
        return $adv;
    }

    /**
     * 获取最新订单
     * @param  [type] $limit [description]
     * @param  [type] $on    [description]
     * @param  [type] $cs    [description]
     * @return [type]        [description]
     */
    private function getOrders($limit,$on,$cs){
        $orders = D("Common/Orders")->getNewOrders($limit,$on,$cs);
        foreach ($orders as $key => $value) {
            $min   =  rand(1,10);
            $orders[$key]["time"] = $min."分钟之前";
            //业主名称处理,取第一个字符
            $orders[$key]["name"] = mb_substr($value["name"], 0,1,"utf-8");
        }
        return $orders;
    }

    /**
     * 获取装修公司LOGO
     * @return [type] [description]
     */
    private function getLogos($cityId,$limit){
        $logos = D("Common/Advs")->getMobileLogoList($cityId,$limit);
        if(count($logos) < $limit){
            //如果当月的更新不足，取当前站发布案例数最多的公司
            $offset = $limit - count($logos);
            $allLogos = D("Common/Advs")->getMobileLogoList($cityId,$offset,true);
            $logos = array_merge($logos,$allLogos);
        }
        return $logos;
    }

     /**
     * 获取最新装修案例
     * @return [type] [description]
     */
    private function getNewCasesList($cs="",$limit=3){
        $cases = D("Common/Cases")->getIndexNewsCases($limit,$cs);
        if(count($cases) > 0){
            return $cases;
        }
        return null;
    }

    /**
     * 获取最新的文章信息
     * @param  [type] $limit [description]
     * @return [type]        [description]
     */
    private function getIndexArticles($limit){
        $article = D("WwwArticle")->getIndexArticles("",$limit);
        return $article;
    }

}