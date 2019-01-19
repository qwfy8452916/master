<?php

namespace app\common\model\db;

use app\common\enums\BuildStatus;
use think\Db;
use think\Model;

class Workergroup extends Model
{
    protected $table = 'qz_yxb_workergroup';


    public function getWorkerGroupListCount($map, $field = '*')
    {
        $where[] = ['a.status', '=', 1];//只取 启用的员工
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['w.company_id', '=', $map['company_id']];
        }
        if (isset($map['group_id']) && $map['group_id']) {
            $where[] = ['w.id', '=', $map['group_id']];
        }
        if (isset($map['manager_id']) && $map['manager_id']) {
            $where[] = ['w.manager_id', '=', $map['manager_id']];
        }
        if (isset($map['tel']) && $map['tel']) {
            $where[] = ['a.contact_tel', 'like', '%' . $map['tel'] . '%'];
        }
        if (isset($map['mobile_search']) && $map['mobile_search']) {
            $where[] = ['a.contact_name|a.contact_tel|w.group_name', 'like', '%' . $map['mobile_search'] . '%'];
        }
        if (isset($map['is_del']) && $map['is_del']) {
            $where[] = ['w.is_del', '=', $map['is_del']];
        }
        return $this->alias('w')
            ->field($field)
            ->leftJoin('qz_yxb_worker u', 'u.group_id = w.id')
            ->leftJoin('qz_yxb_account a', 'a.id = w.manager_id')
            ->where($where)
            ->group('w.id')
            ->count();
    }

    public function getWorkerGroupList($map, $field = '*',$page = '',$pageCount = '')
    {
        $where[] = ['a.status', '=', 1];//只取 启用的员工
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['w.company_id', '=', $map['company_id']];
        }
        if (isset($map['group_id']) && $map['group_id']) {
            $where[] = ['w.id', '=', $map['group_id']];
        }
        if (isset($map['manager_id']) && $map['manager_id']) {
            $where[] = ['w.manager_id', '=', $map['manager_id']];
        }
        if (isset($map['tel']) && $map['tel']) {
            $where[] = ['a.contact_tel', 'like', '%' . $map['tel'] . '%'];
        }
        if (isset($map['mobile_search']) && $map['mobile_search']) {
            $where[] = ['a.contact_name|a.contact_tel|w.group_name', 'like', '%' . $map['mobile_search'] . '%'];
        }
        if (isset($map['is_del']) && $map['is_del']) {
            $where[] = ['w.is_del', '=', $map['is_del']];
        }
        return $this->alias('w')
            ->field($field)
            ->leftJoin('qz_yxb_worker u', 'u.group_id = w.id')
            ->leftJoin('qz_yxb_account a', 'a.id = w.manager_id')
            ->where($where)
            ->group('w.id')
            ->order('w.id desc')
            ->limit($page,$pageCount)
            ->select();
    }

    public function delWorker($where)
    {
        return Db::table('qz_yxb_worker')->where($where)->delete();
    }

    public function addWorker($save)
    {
        return Db::table('qz_yxb_worker')->insertAll($save);
    }

    public function getWorkerGroupInfo($map)
    {
        $where = [];
        if (isset($map['id']) && $map['id']) {
            $where[] = ['w.id','=',$map['id']];
        }
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['w.company_id','=',$map['company_id']];
        }
        return $this->alias('w')
            ->join('qz_yxb_worker u', 'u.group_id = w.id')
            ->where($where)
            ->select();
    }

    public function getWorkerGroupInfoById($map){
        $where = [];
        if (isset($map['id']) && $map['id']) {
            $where[] = ['w.id','=',$map['id']];
        }
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['w.company_id','=',$map['company_id']];
        }
        return $this->alias('w')
            ->field('w.id as gid,w.company_id,w.manager_id,w.group_name,w.is_del')
            ->where($where)
            ->find();
    }

    /**
     * 获取施工组施工信息
     */
    public function getGroupBuildInfoList($where, $field = '*')
    {
        $buildSql = $this->alias('a')
            ->field($field)
            ->leftJoin('qz_yxb_orders_manage b', 'b.build_group = a.id')
            ->leftJoin('qz_yxb_orders o', '`o`.`order_no` = `b`.`order_no`')
            ->where($where)
            ->order('b.reception_time DESC')
            ->group('b.order_no')
            ->buildSql();
        return $this->table($buildSql)->alias('t')
            ->field('t.*,count(if(t.build_state = '.BuildStatus::HAND_OVER.' or t.build_state is NULL or t.build_state = 0 or t.build_state = 1,null,1)) as build_count')
            ->group('t.id')
            ->select();
    }

    public function getWorkerGroupDetailInfo($map,$field='*')
    {
        $where = [];
        if (isset($map['id']) && $map['id']) {
            $where[] = ['w.id', '=', $map['id']];
        }
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['w.company_id', '=', $map['company_id']];
        }
        if (isset($map['manager_id']) && $map['manager_id']) {
            $where[] = ['w.manager_id', '=', $map['manager_id']];
        }
        if (isset($map['is_del']) && $map['is_del']) {
            $where[] = ['w.is_del', '=', $map['is_del']];
        }
        return $this->alias('w')
            ->field($field)
            ->join('qz_yxb_worker u', 'u.group_id = w.id')
            ->join('qz_yxb_account a', 'w.manager_id = a.id')
            ->leftJoin('qz_yxb_worktype d', 'd.id = u.worktype_id')
            ->leftJoin('qz_yxb_worktype e', 'e.id = w.manager_worktype_id')
            ->where($where)
            ->select();
    }

    public function checkGroupWorkerAccount($map){
        $where = [];
        if (isset($map['id']) && $map['id']) {
            $where[] = ['u.id', '=', $map['id']];
        }
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['w.company_id', '=', $map['company_id']];
        }
        if (isset($map['is_del']) && $map['is_del']) {
            $where[] = ['w.is_del', '=', $map['is_del']];
        }
        return $this->alias('w')
            ->field('w.id')
            ->join('qz_yxb_worker u', 'u.group_id = w.id')
            ->join('qz_yxb_account a', 'w.manager_id = a.id')
            ->where($where)
            ->select()->toArray();
    }
}