<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/7/2
 * Time: 11:09
 */
namespace app\jiaju\controller;

use app\common\controller\JiajuBase;
use app\common\logic\CollectLogic;
use app\common\logic\JjdgGoodsLogic;
use app\common\logic\ScoreLogic;

class Goods extends  JiajuBase
{
    public function detail(JjdgGoodsLogic $jjdgGoodsLogic,ScoreLogic $scoreLogic,CollectLogic $collectLogic)
    {
        if(!$code = input('code')){
            $this->error('异常请求');
        }
        //商品详情 包含相似商品
        $goods = $jjdgGoodsLogic->getPcGoodsDetail($code);

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
        $this->assign('goods', $goods);
        //获取商品评分
        $this->assign('avg_score',   $scoreLogic->getGoodsScoreAvg($goods) );
        //查看用户对该商品的评分状态
        $this->assign('score_status',   $scoreLogic->getUserScoreStatus($this->user,$code));
        //查看用户对该商品的收藏状态
        $this->assign('collect_status',   $collectLogic->getUserCollectStatus($this->user,$code));
        //相似推荐
        $same_goods = $jjdgGoodsLogic->getGoodsRecommend($goods->goods_specifications_value,$goods->code,$goods->sub_cate_id);
        $this->assign('same_goods', $same_goods);
        return view();
    }

}