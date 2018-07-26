<?php
// +----------------------------------------------------------------------
// | JjdgSubject 专题模型
// +----------------------------------------------------------------------

namespace app\common\model;

use think\Model;
use think\Db;

class JjdgSubject extends Model
{

    //专题远程关联商品
    public function relatedGoods()
    {
        return $this->belongsToMany('JjdgGoods', 'JjdgSubjectGoods', 'goods_code','subject_id')->where(['is_del' => 2,'on_sale' => 1])->order('pivot.id desc');
    }

    //content获取器
    public function getContentAttr($value)
    {
        return htmlspecialchars_decode($value);
    }

    /**
     * 获取商品使用次数
     * @param $value
     * @param $data
     * @return int|string
     */
    public function getTagAttr($value,$data)
    {
        $result = [];
        $tagIds =  model('JjdgSubjectTagRelation')->where(['subject_id'=>$data['id']])->column('tag_id');
        if (!empty($tagIds)){
            $result = model('JjdgTag')->field('id,name,type')->where(['id'=>['in',$tagIds],'type'=>['in','1,3']])->select();
        }
        return $result;
    }
}