<?php
/**
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/7/6
 * Time: 10:03
 */

namespace app\common\logic;

use app\common\model\JjdgGoodsSpecifications;
use think\Model;

class SpecificationsLogic extends Model
{
    public function selectAvailbleSpeByPid($pid)
    {
        $map['pid'] = $pid;
        $with = [
            'SpecificationsValue'=>function($query){
                $query->where(['is_lock'=>1]);
            }
        ];
        return $this->selectCate($map, $with);
    }

    public function selectCate($map, $with = [], $order = 'sort desc,update_time desc')
    {
        $where = array_merge($map, ['is_lock' => 1]);
        return $topCate = JjdgGoodsSpecifications::Where($where)
            ->field('id,name')
            ->with($with)
            ->order($order)
            ->select();
    }

}