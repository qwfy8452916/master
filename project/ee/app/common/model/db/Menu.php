<?php

namespace app\common\model\db;

use think\Db;
use think\Model;

class Menu extends Model
{
    protected $table = 'qz_yxb_menu';

    public function getMenuList()
    {
        return $this->order('nodeid,px')->select();
    }

    public function delStationMenu($where)
    {
        return Db::table('qz_yxb_station_menu')->where($where)->delete();
    }

    public function saveStationMenu($save)
    {
        return Db::table('qz_yxb_station_menu')->insertAll($save);
    }

    public function getMenuInfo($url)
    {
        $where[] = ['link','=',$url];
        return $this->where($where)->find();
    }

    public function getAccountMenu($map)
    {
        $where = [];
        if (isset($map['company_id']) && !empty($map['company_id'])) {
            $where[] = ['s.company_id', '=', $map['company_id']];
        }
        if (isset($map['id']) && !empty($map['id'])) {
            $where[] = ['a.account_id', '=', $map['id']];
        }

        if (isset($map['link']) && !empty($map['link'])) {
            $where[] = ['m.link', '=', $map['link']];
        }
        return $this->alias('m')
            ->field('m.*')
            ->join('qz_yxb_station_menu sm', 'sm.menu_id = m.id')
            ->join('qz_yxb_station s', 's.id = sm.station_id')
            ->join('qz_yxb_account_info a', 'a.station_id = s.id')
            ->where($where)
            ->select()->toArray();
    }
}