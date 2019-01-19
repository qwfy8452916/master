<?php


namespace Home\Model\Db;
use Think\Model;

class YyOrderInfoModel extends Model
{
    protected $autoCheckFields = false;
    /**
     * 统计发单量
     * @param  [type] $ids [description]
     * @return mixed
     */
    public function getIssuanceCountByMonthWithDept($ids, $yearStart, $yearEnd, $is_char = false)
    {
        if (empty($ids)){
            return [];
        }
        $map['s.dept'] = ['in' , $ids];
        $map['s.visible'] = 0;
        $map['s.type'] = 1;
        if ($is_char === 2) {
            $map['s.charge'] = 2;
        } elseif($is_char === 1) {
            $map['s.charge'] = 1;
        }
        $map['o.time_real'] = ['between',[$yearStart,$yearEnd]];
        return M('yy_order_info')->alias('a')
            ->field('s.dept,FROM_UNIXTIME(o.time_real,"%m") as count_time,FROM_UNIXTIME(o.time_real,"%Y-%m") as month_val,count(*) as count1')
            ->join('inner join qz_orders o on o.id = a.oid')
            ->join('inner join qz_order_source s on s.src = a.src')
            ->where($map)
            ->group('s.dept,count_time')
            ->select();
    }

    /**
     * 统计实际分单量
     * @param  [type] $ids [description]
     * @return mixed
     */
    public function getDivideCountByMonthWithDept($ids, $yearStart, $yearEnd, $is_char = false)
    {
        if (empty($ids)){
            return [];
        }
        $map['s.dept'] = ['in' , $ids];
        $map['s.visible'] = 0;
        $map['s.type'] = 1;
        if ($is_char === 2) {
            $map['s.charge'] = 2;
        } elseif($is_char === 1) {
            $map['s.charge'] = 1;
        }
        $map['v.lasttime'] = ['between',[$yearStart,$yearEnd]];
        return M('yy_order_info')->alias('a')
            ->field('s.dept,FROM_UNIXTIME(v.lasttime,"%m") AS count_time,FROM_UNIXTIME(v.lasttime,"%Y-%m") AS month_val,count(if(v.order_id is not null AND o.on = 4 AND o.type_fw = 1,1,null)) AS count2')
            ->join('INNER JOIN qz_orders o ON o.id = a.oid')
            ->join('INNER JOIN qz_order_source s ON s.src = a.src')
            ->join('INNER JOIN qz_order_csos_new v ON v.order_id  = a.oid')
            ->where($map)
            ->group('s.dept,count_time')
            ->select();
    }
}