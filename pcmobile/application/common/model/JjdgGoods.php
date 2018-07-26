<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/5/24
 * Time: 14:44
 * 商品数据处理模型
 */
namespace app\common\model;


use think\Model;

class JjdgGoods extends Model
{

    //定义模型
    public function goodsImgs()
    {
        return $this->hasMany('JjdgGoodsImgs', 'goods_code')->field('goods_code,img_url');
    }

    public function goodsTopCate()
    {
        return $this->belongsTo('JjdgGoodsTopCate', 'top_cate_id', 'id');
    }

    public function goodsSubCate()
    {
        return $this->belongsTo('JjdgGoodsSubCate', 'sub_cate_id');
    }

    public function goodsSpecificationsRelationship()
    {
        return $this->hasMany('JjdgGoodsSpecificationRelationship', 'goods_code');
    }

    public function goodsSpecificationsValue()
    {
        return $this->belongsToMany('JjdgGoodsSpecificationsValue', 'JjdgGoodsSpecificationRelationship', 'goods_specifications_value_id', 'goods_code')->field('id,name,pid');
    }

    public function sameGoodsInfo()
    {
        return $this->belongsToMany('JjdgGoods', 'JjdgSameGoods','same_goods_code','goods_code')->field('title,code,zk_final_price,sub_cate_id');
    }

    //关联收藏
    public function collection()
    {
        return $this->hasMany('JjdgGoodsCollection', 'goods_code');

    }

    //定义获取器
    public function getCustomPriceAttr($value)
    {
        return round($value / 100, 2);
    }

    public function getZkFinalPriceAttr($value)
    {
        return round($value / 100, 2);
    }

    public function getDetailAttr($value)
    {
        return htmlspecialchars_decode($value);
    }

}