<?php
// +----------------------------------------------------------------------
// | JjdgGoodsTopCate 商品规格模型
// +----------------------------------------------------------------------

namespace app\common\model;

use think\Model;

class JjdgGoodsSpecifications extends Model
{
    public function specificationsValue()
    {
        return $this->hasMany('JjdgGoodsSpecificationsValue','pid');
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
     * 根据上级查询一定数量的子级
     * @param $subId
     * @param int $limit
     * @return bool|false|\PDOStatement|string|\think\Collection
     */
    public function getChildByPid($subId,$limit = 4)
    {
        if (empty($subId)){
            return false;
        }
        $where['JjdgGoodsSpecifications.pid'] = ['in',$subId];
        $where['JjdgGoodsSpecifications.is_lock'] = 1;
        return model('JjdgGoodsSpecifications')->has('specificationsValue',function ($query) {$query->field('JjdgGoodsSpecificationsValue.id,JjdgGoodsSpecificationsValue.name,JjdgGoodsSpecificationsValue.pid')->where('JjdgGoodsSpecificationsValue.is_lock',1);},1,'*')->where($where)->limit($limit)->order('JjdgGoodsSpecifications.sign asc')->select();
    }
}