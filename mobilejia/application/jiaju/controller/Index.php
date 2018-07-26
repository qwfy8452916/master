<?php

namespace app\jiaju\controller;

use app\common\controller\JiajuBase;
use app\common\logic\BannerLogic;
use app\common\logic\JjdgGoodsLogic;
use app\common\logic\SubjectLogic;

class Index extends JiajuBase
{
    public function index(BannerLogic $bannerLogic, JjdgGoodsLogic $jjdgGoodsLogic, SubjectLogic $subjectLogic)
    {
        //banner
        $this->assign('banners', $bannerLogic->getBanner());
        //今日特价
        $this->assign('discount_goods', $jjdgGoodsLogic->getDiscount());
        //今日畅销
        $this->assign('best_selling', $jjdgGoodsLogic->getBestSelling());
        //今日最热专题
        $this->assign('subject', $subjectLogic->getPcTop());
        return view();
    }

    public function searchView()
    {
        return view();
    }
}
