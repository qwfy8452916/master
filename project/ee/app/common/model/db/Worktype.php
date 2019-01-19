<?php

namespace app\common\model\db;

use app\common\enums\StationStatus;
use think\Model;

class Worktype extends Model
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 'qz_yxb_worktype';

    public function getWorkTypeListCount($where)
    {
        return $this->where($where)->order('id desc')->count();
    }

    public function getWorkTypeList($where, $page, $pageCount, $orderType = 'asc')
    {
        return $this->where($where)->order('default asc,id' . ' ' . $orderType)->limit($page, $pageCount)->select()->toArray();
    }

    public function getWorktypeInfo($id)
    {
        return $this->field('id,name')->find($id);
    }

    public function add($data)
    {
        return $this->insertGetId($data);
    }

    public function save($data = [], $where = [], $sequence = null)
    {
        return parent::save($data, $where, $sequence);
    }

    public function del($id)
    {
        return $this->save(['is_del'=>StationStatus::DEFAULT_RULE_XMJL],['id' => $id]);
    }

    public function getWorktypeSelectList($where, $field = '*')
    {
        return $this->field($field)->where($where)->order('id desc')->select();
    }
}