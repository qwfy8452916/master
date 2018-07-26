<?php
// +----------------------------------------------------------------------
// | JjdgGoodsTopCate 商品规格参数模型
// +----------------------------------------------------------------------

namespace app\common\model;

use think\Model;

class JjdgGoodsSpecificationsValue extends Model
{

    public function specifications()
    {
        return $this->belongsTo('JjdgGoodsSpecifications','pid','id');
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

    /**
     * 查询自己和上级
     */
    public function getParentAndSelfByIds($ids = '')
    {
        if (empty($ids)){
            return false;
        }
        return $this->where(['id'=>['in',$ids]])->with('specifications')->select();
    }
}