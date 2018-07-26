<?php
namespace app\common\model;

use think\Model;

class JjdgGoodsTopCate extends Model
{
    public function subCate()
    {
        return $this->hasMany('JjdgGoodsSubCate','pid');
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
     * 根据条件查询分类列表
     * @param $where
     * @return array|false|\PDOStatement|string|Model
     */
    public function getListByWhere($where)
    {
        return $this->where($where)->select();
    }

}