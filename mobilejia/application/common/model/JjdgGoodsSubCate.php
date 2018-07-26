<?php
// +----------------------------------------------------------------------
// | JjdgGoodsTopCate 商品子分类模型
// +----------------------------------------------------------------------

namespace app\common\model;

use think\Model;

class JjdgGoodsSubCate extends Model
{

    public function specifications()
    {
        return $this->hasMany('JjdgGoodsSpecifications','pid');
    }

    public function specificationsValue()
    {
        return $this->hasManyThrough('JjdgGoodsSpecificationsValue','JjdgGoodsSpecifications','pid','pid');
    }

    /**
     * 根据条件查询分类
     * @param $where
     * @return array|false|\PDOStatement|string|Model
     */
    public function getInfoByWhere($where)
    {
        return $this->where($where)->find();
    }

    /**
     * 根据条件查询分类
     * @param $where
     * @return array|false|\PDOStatement|string|Model
     */
    public function getListByWhere($where)
    {
        return $this->where($where)->select();
    }
}