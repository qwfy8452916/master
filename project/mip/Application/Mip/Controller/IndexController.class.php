<?php

namespace Mip\Controller;
use Mip\Common\Controller\MipBaseController;


class IndexController extends MipBaseController
{

   public function index()
   {
       //获取轮播
       $info["lunbo"] = S("Cache:m:lunbo:www");
       if (!$info["lunbo"]) {
           //新版轮播
           $adv = $this->getNewLunboAdv("home_advbanner","000001");
           $info["lunbo"] = $adv;
           S("Cache:m:lunbo:www",$adv,900);
       }

       //装修攻略
       $info['article'] = S('C:Mobile:Index:index:article');
       if (empty($info['article'])) {
           $info['article'] = D('WwwArticle')->getArticleListByMap(array(), 3);
           S('C:Mobile:Index:index:article', $info['article'], 900);
       }

       //装修百科
       $info['baike'] = S('C:Mobile:Index:index:baike');
       if (empty($info['baike'])) {
           $info['baike'] = D('Baike')->getTopBaike(3);
           S('C:Mobile:Index:index:baike', $info['baike'], 600);
       }

       //装修经验
       $info['jingyan'] = S('C:Mobile:Index:index:jingyan:v2');
       if (empty($info['jingyan'])) {
           //流程
           $info['jingyan']['lc']['1'] = D('WwwArticle')->getArticleListByMap(array('c.pid' => 88, 'c.is_new' => 1), 1)[0];
           $info['jingyan']['lc']['2'] = D('WwwArticle')->getArticleListByMap(array('c.pid' => 93, 'c.is_new' => 1), 1)[0];
           $info['jingyan']['lc']['3'] = D('WwwArticle')->getArticleListByMap(array('c.pid' => 101, 'c.is_new' => 1), 1)[0];
           //日记
           $info['jingyan']['riji'] = D('Diary')->getMobileIndexDiaryList();
           //问答
           $info['jingyan']['wenda'] = D('Ask')->getNewQuestion(3);
           S('C:Mobile:Index:index:jingyan:v2', $info['jingyan'], 1200);
       }

       //装修公司
       $info['company'] = S('C:Mobile:Index:index:company');
       if (empty($info['company'])) {
           $info['company'] = D('Comment')->getTopCommentsByCity('', 5);
           S('C:Mobile:Index:index:company', $info['company'], 1500);
       }

       //关键字、描述、标题
       $basic["head"]["title"] = "齐装网-专业的装饰装修公司门户网站";
       $basic["head"]["keywords"] = "装修网，装修公司，装饰公司，装修报价";
       $basic["head"]["description"] = "齐装网专业的家居装饰装修门户网站，汇集全国具有性价比的装饰公司，为您和业内提供装修设计、装修公司、装修流程、装修知识等内容，让您的装修更安心！";
       //获取该城市第一个区，用于显示默认城市
       $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];

       $lunboCount = count($info['lunbo']);

       //轮播图中有mip模块的跳转mip模块
       foreach($info['lunbo'] as $key => $value){
           if(stripos($value['url'], 'gonglue')){
               $value['url'] = str_replace('m.qizuang.com', 'mip.qizuang.com', $value['url']);
               $info['lunbo'][$key] = $value;
           }

           //url全部加上发单标识
           if(!empty($value['url'])){
               $value['url'] = rtrim($value['url'], "/") . "?src=mip";
               $info['lunbo'][$key] = $value;
           }

       }

       $this->assign('lunboCount', $lunboCount);
       $this->assign("head", $basic['head']);
       $this->assign('source',327);//设置发单入口标识
       $this->assign("basic",$basic);
       $this->assign("info",$info);
       $this->display();
   }


   //城市分站
   public function city(){
       //如果是分站跳转
       $cityInfo = S('Cache:Mobile:CityInfo');
       if(!$cityInfo){
           //获取热门城市
           $citys = $this->getHotCitys(8);
           $cityInfo["hotCitys"] = $citys;
           //获取所有省份及城市 按省份
           $allCity = $this->getAllProvinceAndCitys();
           $cityInfo["allCity"] = $allCity;
           //获取所有省份及城市 按首字母
           $accordCity = $this->getAllProvinceAndCitys(true);
           $cityInfo["accordCity"] = $accordCity;
           S("Cache:Mobile:CityInfo",$cityInfo,3600*24);
       }

       //seo 标题/描述/关键字
       $basic["head"]["title"] = "齐装网分站导航-齐装网";
       $basic["head"]["keywords"] = "齐装网分站";
       $basic["head"]["description"] = "目前齐装网已经在全国包括苏州、上海、广州、天津、重庆、杭州、南京、武汉、福州、合肥、太原等200多个城市建立了分部！";

       //顶部热门城市列表
       $hotcitytop = D("Quyu")->getHotCityList(9);
       $this->assign('hotcitytop',$hotcitytop);

       //报价页面跳转回发单入口
       if (!empty($_SERVER['HTTP_REFERER'])) {
           $referer = parse_url($_SERVER['HTTP_REFERER']);
           if (C('MOBILE_DONAMES') == $referer['host']) {
               if ('baojia' == trim($referer['path'], '/')) {
                   $redirect['baojia'] = '/baojia/';
                   $string = '';
                   //拼接GET参数
                   if (!empty($referer['query'])) {
                       $query = explode("&", $referer['query']);
                       foreach ($query as $key => $value) {
                           $item = explode('=', $value);
                           if (2 == count($item) && 'bm' != $item['0']) {
                               $string = $string . $item['0'] . '=' . $item['1'] . '&';
                           }
                       }
                   }
                   //判断是否有GET参数
                   if (empty($string)) {
                       $redirect['baojia'] = $redirect['baojia'] . '?bm=';
                   } else {
                       $redirect['baojia'] = $redirect['baojia'] . '?' . $string . 'bm=';
                   }
               }
               if ('zxgstj' == trim($referer['path'], '/')) {
                   $redirect['zxgstj'] = '/zxgstj/';
               }
           }
       }

       $ip = get_client_ip();

       $this->assign("showall",$_SESSION["m_cityInfo"]);
       $this->assign("head", $basic['head']);
       $this->assign("ip",$ip);
       $this->assign("cityInfo",$cityInfo);
       $this->assign("redirect",$redirect);
       $this->assign("basic",$basic);
       $this->display();
   }

    /**
     * 获取新版轮播
     * @param  [type] $module  [模块名]
     * @param  [type] $city_id [城市编号]
     * @param  [type] $limit   [description]
     * @return [type]          [description]
     */
    private function getNewLunboAdv($module,$city_id,$limit)
    {
        $list = D("Advbanner")->getAdvList($module,$city_id,$limit);
        foreach ($list as $key => $value) {
            //移动端图片链接优先获取移动端的，没有的情况下获取默认的
            if (!empty($value['img_url_mobile'])) {
                $list[$key]['img_url'] = $value['img_url_mobile'];
            }
            //装修公司默认如果没有链接,替换链接到公司主页
            if (empty($value['url_mobile']) && !empty($value['company_id'])) {
                $value['url_mobile'] = "http://".C('MOBILE_DONAMES')."/".$value["bm"]."company_home/".$value["company_id"]."/";
            }
            $list[$key]['url'] = $value['url_mobile'];
        }
        return $list;
    }


    /**
     * 获取热门城市
     * @return [type] [description]
     */
    private function getHotCitys($limit = 10){
        $citys = D("Quyu")->getHotCitys($limit);
        if(count($citys) > 0){
            return $citys;
        }
        return null;
    }


    /**
     * 获取所有省份及城市
     * @flag bool 是否按省份划分
     * @return [type] [description]
     */
    public function getAllProvinceAndCitys($flag = false){
        import('Library.Org.Util.App');
        $app = new \App();
        $map = array(
            "b.cid"          => array("NEQ","000001"), //排除主站
            "b.type"         => array("EQ","1"),
            "b.is_open_city" => array("EQ","1") //开通运营的
        );
        $result = M("province")->alias("a")
            ->join("inner join qz_quyu as b on a.qz_provinceid = b.uid")
            ->join("INNER JOIN  (select count(*) as count,uid from qz_quyu GROUP BY uid ) as c on c.uid = a.qz_provinceid")
            ->field("a.*,b.cname,b.cid,b.bm,b.px,b.px_abc,b.mark_red,c.count")
            ->where($map)
            ->order("count desc,b.px")
            ->select();
        $citys = array();
        if(count($result)>0){
            if($flag){
                foreach ($result as $key => $value) {
                    $str = $app->getFirstCharter($value["cname"]);
                    if(!array_key_exists($str, $citys)){
                        $citys[$str]["pname"] = $str;
                        $citys[$str]["child"] = array();
                    }
                    $citys[$str]["child"][] = $value;
                }
                ksort($citys);
                foreach($citys as $keyc => &$valuec) { //最外层字母层
                    $px_abc = array();
                    foreach($valuec['child'] as $keycs => $valuecs) { //城市层
                        $px_abc[] =  $valuecs['px_abc'];
                    }
                    //sort($px_abc);
                    array_multisort($px_abc, SORT_ASC, $valuec['child']); //按照 px_abc升序排列
                }
            }else{
                foreach ($result as $key => $value) {
                    if(!array_key_exists($value["qz_provinceid"], $citys)){
                        $citys[$value["qz_provinceid"]]["pid"] = $value["qz_provinceid"];
                        $citys[$value["qz_provinceid"]]["pname"] = $value["qz_province"];
                        $citys[$value["qz_provinceid"]]["count"] = $value["count"];
                        if($value["qz_province"] == '重庆市'){
                            $value["qz_province"] = '重庆';
                        }
                        $citys[$value["qz_provinceid"]]["abc"] = $app->getFirstCharter($value["qz_province"]);
                        $citys[$value["qz_provinceid"]]["child"] = array();
                    }
                    $citys[$value["qz_provinceid"]]["child"][] = $value;
                }
            }
            return $citys;
        }
        return null;
    }

}
