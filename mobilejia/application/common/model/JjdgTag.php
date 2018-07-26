<?php
// +----------------------------------------------------------------------
// | JjdgSubjectTag 标签模型
// +----------------------------------------------------------------------

namespace app\common\model;

use think\Model;

class JjdgTag extends Model
{
    /**
     * 获取商品使用次数
     * @param $value
     * @param $data
     * @return int|string
     */
    public function getGoogsUseAttr($value,$data)
    {
        $count = 0;
        if ($data['type'] == 2 || $data['type'] == 3){
            $count =  model('JjdgGoodsTagRelation')->count('goods_code');
        }
        return $count;
    }

    /**
     * 获取专题使用次数
     * @param $value
     * @param $data
     * @return int|string
     */
    public function getSubjectUseAttr($value,$data)
    {
        $count = 0;
        if ($data['type'] == 1 || $data['type'] == 3){
            $count =  model('JjdgSubjectTagRelation')->count('subject_id');
        }
        return $count;
    }
}