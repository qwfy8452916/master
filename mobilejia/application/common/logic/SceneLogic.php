<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/9
 * Time: 14:34
 * 场景模块业务逻辑
 */

namespace app\common\logic;

use app\common\model\JjdgGoodsTopCate;
use think\Model;

class SceneLogic extends Model
{
    /**
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getSceneAndCate()
    {
        $with = [
            'subCate'=> function ($query) {
                $query->where(['is_lock' => 1]);
            },
        ];
        $where =  ['is_lock' => 1];
        $data = JjdgGoodsTopCate::Where($where)
            ->field('id,name,short_name,image')
            ->with($with)
            ->order('sort desc,update_time desc')
            ->select();
        $res = [];
        foreach ($data as $k => $v){
            $res[$k]['name'] = $v->getAttr('name');
            $res[$k]['image'] = $v->getAttr('image');
            $res[$k]['children'] = $this->getSubCate($v->getAttr('sub_cate'));
        }
        return $res;
    }

    public function getSubCate($obj){
        $arr = [];
        if($obj){
            $arr = collection($obj)->toArray();
        }
        return sort_arr_by_many_field($arr,'sort',SORT_DESC,'update_time',SORT_DESC);
    }


}
