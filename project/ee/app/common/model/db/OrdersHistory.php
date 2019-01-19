<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/7
 * Time: 10:41
 */

namespace app\common\model\db;

use app\common\enums\OrdersHistoryStatus;
use think\db\Where;
use think\Model;

class OrdersHistory extends Model
{
    protected $table = 'qz_yxb_orders_history';

    public function orders()
    {
        return $this->hasOne('Orders', 'order_no', 'order_no');
    }

    public function orderManage()
    {
        return $this->hasOne('OrdersManage', 'order_no', 'order_no');
    }

    public function getAllStatus($value)
    {
        return OrdersHistoryStatus::getAllStatus($value);
    }

    public function getOrderHistoryStatusAttr($value)
    {
        return OrdersHistoryStatus::getStatusName($value);
    }

    public function getOrdersHistoryCount($userInfo,$status = '', $start, $end)
    {
        $where = [
            'o.company_id'=>['eq',$userInfo['company_id']]
        ];
        if (!empty($status)) {
            $where['h.status'] = ['eq', $status];
        }
        if (!empty($start) && !empty($end)) {
            $where['h.add_time'][] = ['egt', $start];
            $where['h.add_time'][] = ['elt', $end];
        }
        $buildSql = $this->alias('h')
            ->join('qz_yxb_orders o','o.order_no = h.order_no')
            ->field('h.id,h.order_no,h.add_time,FROM_UNIXTIME(h.add_time,"%Y-%m-%d") t')
            ->where(new Where($where))
            ->order('h.add_time desc')
            ->buildSql();
        $buildSql = $this->table($buildSql)->alias('h')->group('h.order_no')->buildSql();
        return $this->table($buildSql)->alias('t')->field('count(t.order_no) as count,t.t')->group('t.t')->select();
    }
}