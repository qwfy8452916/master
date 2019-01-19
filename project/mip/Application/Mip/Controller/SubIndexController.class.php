<?php
namespace Mip\Controller;
use Mip\Common\Controller\MipBaseController;

class SubIndexController extends MipBaseController{
    public function index(){
        //判断是否有传参数
        if(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY)){
            if (substr(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), -1) != '/') {
                header("HTTP/1.1 301 Moved Permanently");
                header("Location: http://" . $_SERVER['HTTP_HOST'] . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) . "/?" . parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY));
                exit();
            }
        }else{
            //如果url末尾没有 '/' 就跳转加
            if (substr($_SERVER['REQUEST_URI'], -1) != '/') {
                header("HTTP/1.1 301 Moved Permanently");
                header("Location: http://" . $_SERVER['HTTP_HOST'] . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) . "/");
                exit();
            }
        }

        //canonical 对应跳转
        $cityInfo = $this->cityInfo;
        $bm = $cityInfo['bm'];
        if(!empty($bm)){
            $fenzhan = $bm . '.' . C('QZ_YUMING');
        }

        //获取轮播
        $info["lunbo"] = S("Cache:m:lunbo".$cityInfo["bm"]);
        if (!$info["lunbo"]) {
            $info["lunbo"] = $this->getNewLunboAdv("home_advbanner",$cityInfo["id"]);
            S("Cache:m:lunbo".$cityInfo["bm"],$info["lunbo"],900);
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
        $info['company'] = S('C:Mobile:SubIndex:index:company'.$cityInfo["bm"]);
        if (empty($info['company'])) {
            $info['company'] = D('Comment')->getTopCommentsByCity($cityInfo["id"], 5);
            S('C:Mobile:SubIndex:index:company'.$cityInfo["bm"], $info['company'], 1500);
        }

        //本地资讯
        $info["zixun"] = S("SubIndex:mobile:zixun".$cityInfo["bm"]);
        if(empty($info['zixun'])){
            $results = D("Littlearticle")->getArticleList('',$cityInfo['id'],0,3,'','a.addtime desc');
            $zxinfo = [];
            foreach ($results as $k => $result){
                $zxinfo[$k]['id'] = $result['id'];
                $zxinfo[$k]['title'] = $result['title'];
                $zxinfo[$k]['face'] = $result['face'];
                $zxinfo[$k]['addtime'] = $result['addtime'];
                if(mb_strlen(htmlToText(html_entity_decode($result['content'])),'utf-8') > 15){
                    $zxinfo[$k]['content'] = mb_substr(htmlToText(html_entity_decode($result['content'])),0,14,'utf-8') .'...';
                }else{
                    $zxinfo[$k]['content'] = htmlToText(html_entity_decode($result['content']));
                }
                $info["zixun"] = $zxinfo;
            }
            S("SubIndex:mobile:zixun".$cityInfo["bm"], $zxinfo, 1500);
        }

        //关键字、描述、标题
        $basic["head"]["title"] = $cityInfo["name"] . "装修_".$cityInfo["name"]."装修网_".$cityInfo["name"]."装修公司-".$cityInfo["name"]."齐装网";
        $basic["head"]["keywords"] = $cityInfo["name"]."装修，".$cityInfo["name"]."装修网，".$cityInfo["name"]."装修公司";
        $basic["head"]["description"] = $cityInfo["name"]."齐装网致力于为广大业主提供透明、保障、省心的装修服务！汇集".$cityInfo["name"]."各大装饰公司，并有权威".$cityInfo["name"]."装修公司排名可供参考。";

        //获取该城市第一个区，用于显示默认城市
        $info['cityarea'] = D('Quyu')->getAreaByFatherId(session('m_mapUseInfo.id'))[0];

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

        //如果分站资讯数据为空则不显示
        if(empty($info['zixun'])){
            $zixun = "empty";
        }

        //分配canonical标签
        $canonical = $_SERVER['REQUEST_URI'];

        $this->assign("canonical", $canonical);
        $this->assign("zixun", $zixun);
        $this->assign("lunboCount", count($info['lunbo']));
        $this->assign("zxInfo",$zxInfo);
        $this->assign("bm", $cityInfo["bm"]);
        $this->assign("info",$info);
        $this->assign("basic",$basic);
        $this->assign("head", $basic['head']);
        $this->assign("remainNumber", remainNumber('sheji', 2));
        $this->assign("fenzhan", $fenzhan);
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
}