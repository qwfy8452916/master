<?php

namespace app\common\model\db;

use app\common\enums\StationStatus;
use \think\Db;
use think\Model;

class Station extends Model
{
    protected $table = 'qz_yxb_station';

    public function getStationListCount($map, $field = '*')
    {
        $order = '';
        $where = [];
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['s.company_id', '=', $map['company_id']];
        }
        if (isset($map['name']) && $map['name']) {
            $where[] = ['s.name', 'like', '%' . $map['name'] . '%'];
        }
        if (isset($map['status']) && $map['status']) {
            $where[] = ['s.status', '=', $map['status']];
        }
        if (isset($map['order']) && $map['order']) {
            $order = $map['order'];
        }
        return $this->alias('s')
            ->field($field)
            ->leftJoin('qz_yxb_account_info i', 'i.station_id = s.id')
            ->leftJoin('qz_yxb_account a', 'i.account_id = a.id and a.is_del = 1')
            ->where($where)
            ->group('s.id')
            ->order('s.create_time '.$order)
            ->count();
    }

    public function getStationList($map, $field = '*', $page, $pageCount)
    {
        $where = [];
        $order = '';
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['s.company_id', '=', $map['company_id']];
        }
        if (isset($map['name']) && $map['name']) {
            $where[] = ['s.name', 'like', '%' . $map['name'] . '%'];
        }
        if (isset($map['status']) && $map['status']) {
            $where[] = ['s.status', '=', $map['status']];
        }
        if (isset($map['order']) && $map['order']) {
            $order = $map['order'];
        }
        return $this->alias('s')
            ->field($field)
            ->leftJoin('qz_yxb_account_info i', 'i.station_id = s.id')
            ->leftJoin('qz_yxb_account a', 'i.account_id = a.id and a.is_del = 1')
            ->where($where)
            ->group('s.id')
            ->order('s.default,s.create_time '.$order)
            ->limit($page, $pageCount)
            ->select();
    }

    public function getStationAllList($map)
    {
        return $this->where($map)->select();
    }

    public function getStationInfo($map)
    {
        $where = [];
        if (isset($map['company_id'])) {
            $where[] = ['s.company_id', '=', $map['company_id']];
        }
        if (isset($map['id'])) {
            $where[] = ['s.id', '=', $map['id']];
        }
        return $this->alias('s')
            ->field('s.*,GROUP_CONCAT(i.menu_id) as menus')
            ->leftJoin('qz_yxb_station_menu i','i.station_id = s.id')
            ->where($where)
            ->group('s.id')
            ->select();
    }


    /**
     * 获取工人岗位id
     */
    public function getWorkerStationId()
    {
        $where = [
            'a.default_rule' => 4,
            'a.status' => 1
        ];
        return $this->alias('a')
            ->where($where)
            ->value('id');
    }
}