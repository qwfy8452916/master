<?php

namespace app\jiajum\controller;

use app\common\controller\JiajumBase;
use app\common\enums\ApiConfig;
use app\common\logic\BannerLogic;
use app\common\logic\JjdgGoodsLogic;
use app\common\logic\SceneLogic;
use app\common\logic\SubjectLogic;
use app\common\logic\TopCateLogic;

class Index extends JiajumBase
{
    //家居导购首页
    public function index(JjdgGoodsLogic $jjdgGoodsLogic, BannerLogic $bannerLogic,TopCateLogic $topCateLogic, SubjectLogic $subjectLogic)
    {
        //banner
        $this->assign('banners', $bannerLogic->getBanner());

        //今日特价
        $this->assign('discount_goods', $jjdgGoodsLogic->getDiscount());

        //使用场景
        $this->assign('scene_info', $topCateLogic->selectAvailbleCate([]));

        //今日畅销
        $this->assign('best_selling', $jjdgGoodsLogic->getBestSelling());

        //今日最热专题
        $this->assign('subject', $subjectLogic->getTop());

        //猜你喜欢
        $this->assign('recommend', $jjdgGoodsLogic->getRecommend());

        //TDK
        $this->assign('head', '齐装家具网上商城_中国专业网上家具导购平台_买家具就上齐装家居网');
        $this->assign('keywords', '网上买家具,家具导购平台,家具网上商城,齐装家具网');
        $this->assign('description', '齐装家具网上商城,中国专业家具网购平台,2018网上买家具一站式服务。为您提供客厅、卧室、卫浴、厨房、餐厅的全屋家具网购全程服务，国内外品牌家具任您挑选，网上买家具首选齐装家具网上商城。');
        return view();
    }

    //首页下拉加载接口

    public function indexAjaxList(JjdgGoodsLogic $jjdgGoodsLogic)
    {
        $p = (int)input('p',1);
        $recommend = $jjdgGoodsLogic->getListByWhereMultipleOrderSample([], ['goodsImgs'], $p, 10);
        $this->assign('recommend', $recommend);
        $data = $this->fetch('list_content');
        return json(['status' => ApiConfig::REQUEST_SUCCESS, 'info' => '获取数据成功', 'data' => $data]);
    }


    public function searchView()
    {
        $this->assign('head', '搜索商品-齐装家具网上商城');
        return view();
    }




}
