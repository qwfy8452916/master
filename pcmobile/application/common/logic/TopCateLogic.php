<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/5/24
 * Time: 14:44
 * 处理banner业务逻辑
 */

namespace app\common\logic;

use app\common\model\JjdgGoodsTopCate;
use think\Model;

class TopCateLogic extends Model
{
    public function getAvailbleCate($map)
    {
        $where = array_merge($map, ['is_lock' => 1]);
        return $topCate = JjdgGoodsTopCate::Where($where)
            ->field('id,name,short_name')
            ->order('sort desc,update_time desc')
            ->find();
    }

    public function selectAvailbleCate($map=[])
    {
        $where = array_merge($map, ['is_lock' => 1]);
        return $topCate = JjdgGoodsTopCate::Where($where)
            ->field('id,name,short_name,image')
            ->order('sort desc,update_time desc')
            ->select();
    }
}