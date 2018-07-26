<?php

namespace app\jiajum\controller;


use app\common\controller\JiajumBase;
use app\common\logic\CollectLogic;
use app\common\logic\JjdgGoodsLogic;
use app\common\logic\ScoreLogic;

class Goods extends JiajumBase
{

    public function index(JjdgGoodsLogic $jjdgGoodsLogic, ScoreLogic $scoreLogic,CollectLogic $collectLogic)
    {
        $code = input('code');

        //商品详情 包含相似商品
        $goods = $jjdgGoodsLogic->getMGoodsDetail($code);
        //未查询到商品
        if(!$goods){
            $this->error('该商品已不存在');
        }
        //浏览量加1
        $goods ->setInc('views',1);

        //判断是否有商品详情
        if($goods->has_detail != 2){
            //统计点击购买量
            $goods ->setInc('buy_num',1);
            //没有商品录入详情调整淘宝链接
            $this->redirect($goods->expand_link,302);
        }
        //TDK
        $head['title'] = $goods['title'].'-齐装家具网上商城';
        $head['description'] = "齐装家具网上商城为顾客提供完美的{$goods->goods_sub_cate->getAttr('name')}价格、尺寸、图片、品牌等信息，了解更多关于产品详情就在齐装家具网上商城。";
        $this->assign('head', $head);
        //赋值
        $this->assign('goods', $goods);
        //商品属性
        $goods_detail_specifications_format = $jjdgGoodsLogic->specificationsFormat($goods->goods_specifications_value);
        $this->assign('specifications', $goods_detail_specifications_format);
        //相似推荐
        $same_goods = $jjdgGoodsLogic->getGoodsRecommend($goods->goods_specifications_value,$goods->code,$goods->sub_cate_id);
        $this->assign('same_goods', $same_goods);
        //查看用户对该商品的评分状态
        $this->assign('score_status',   $scoreLogic->getUserScoreStatus(session('u_userInfo'),$code));
        //查看用户对该商品的收藏状态
        $this->assign('collect_status',   $collectLogic->getUserCollectStatus(session('u_userInfo'),$code));

        //获取商品评分
        $this->assign('avg_score',   $scoreLogic->getGoodsScoreAvg($goods) );
        return view();
    }

    public function goBuy(JjdgGoodsLogic $jjdgGoodsLogic){
        $code = input('code');
        $goods = $jjdgGoodsLogic->getGoodsProfile($code);
        if($goods->has_detail == 2) {
            //统计点击购买量
            $goods ->setInc('buy_num',1);
            //没有商品录入详情调整淘宝链接
            $this->redirect($goods->expand_link,302);
        }

    }



}