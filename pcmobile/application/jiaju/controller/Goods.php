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
use app\common\logic\SecurityLogic;

class Goods extends  JiajuBase
{
    public function detail(JjdgGoodsLogic $jjdgGoodsLogic,ScoreLogic $scoreLogic,CollectLogic $collectLogic,SecurityLogic $securityLogic)
    {
        if(!$code = input('code')){
            $this->error('异常请求');
        }
        //商品详情 包含相似商品
        $goods = $jjdgGoodsLogic->getPcGoodsDetail($code);

        //未查询到商品
        if(!$goods){
            return $this->_empty();
        }


        //检查访问量是否有效
        if(is_robot()===false && $securityLogic->isNormalView('goods_view',$goods->getAttr('code'))=== true ){
            //浏览量加1
            $goods ->setInc('views',1);
        }


        //判断是否有商品详情
        if($goods->has_detail != 2){
            if(is_robot()===false && $securityLogic->isNormalView('goods_buy',$goods->getAttr('code'))=== true ){
                //统计点击购买量
                $goods ->setInc('buy_num',1);
            }
            //没有商品录入详情调整淘宝链接
            $this->redirect($goods->expand_link,302);
        }
        $this->assign('goods', $goods);
        //获取相关搭配商品
        $together_goods = $jjdgGoodsLogic->getTogetherGoods($code);
        $this->assign('together_goods', $together_goods);

        //TDK
        $head['title'] = $goods['title'].'-齐装家具网上商城';
        $head['description'] = "齐装家具网上商城为顾客提供完美的{$goods->goods_sub_cate->getAttr('name')}价格、尺寸、图片、品牌等信息，了解更多关于产品详情就在齐装家具网上商城。";
        $this->assign('head', $head);

        //获取商品评分
        $this->assign('avg_score',   $scoreLogic->getGoodsScoreAvg($goods) );
        //查看用户对该商品的评分状态
        $this->assign('score_status',   $scoreLogic->getUserScoreStatus($this->user,$code));
        //查看用户对该商品的收藏状态
        $this->assign('collect_status',   $collectLogic->getUserCollectStatus($this->user,$code));
        //查看该商品的收藏数量
        $this->assign('collect_num',$collectLogic->getCollectNumByObj($goods) );
        //相似推荐
        $same_goods = $jjdgGoodsLogic->getGoodsRecommend($goods->goods_specifications_value,$goods->code,$goods->sub_cate_id);
        $this->assign('same_goods', $same_goods);
        return view();
    }

}