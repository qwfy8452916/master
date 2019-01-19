<?php
/**
 * Created by PhpStorm.
 * author: sp
 * Date: 2018/11/21
 * Time: 17:01
 */

namespace app\common\model\logic;

use app\common\model\db\OrdersHistory;
use think\Db;

class OrdersHistoryLogic
{

    public function getOrderHistory($data, $with = [])
    {
        $map = $this->setMap($data);
        return OrdersHistory::where($map)
            ->with($with)
            ->find();
    }

    public function setMap($data, $cache = true)
    {
        static $map = '';
        if ($cache && $map != '') {
            return $map;
        }
        $map = function ($query) use ($data) {
            if (!empty($data['orders_history_id'])) {
                $query->where('qz_yxb_orders_history.id', '=', $data['orders_history_id']);
            }
			if (!empty($data['order_no'])) {
				$query->where('qz_yxb_orders_history.order_no', '=', $data['order_no']);
			}
			if (!empty($data['state'])) {
				$query->where('qz_yxb_orders_history.status', '=', $data['state']);
			}
        };
        return $map;
    }

    public function countOrderHistoryRecord($data = [])
    {
        $map = $this->setMap($data);
        return $this->_countOrderHistory( $map);
    }
    protected function _countOrderHistory($map = [])
    {
        return OrdersHistory::where($map)->count();
    }
    public function selectOrderHistoryRecord($data = [], $page_current = 1, $page_size = 10)
    {
        $map = $this->setMap($data);
        $skip = ($page_current - 1) * $page_size;
        $with_join = ['orderManage'];
        return $this->_selectOrderHistory($with_join, $map,  $skip, $page_size);
    }
    protected function _selectOrderHistory($with_join, $map, $skip = 0, $limit = 10, $order = [])
    {
        $order['add_time'] = 'desc';
        return OrdersHistory::withJoin($with_join)->where($map)
            ->limit($skip, $limit)
            ->order($order)
            ->select();
    }
}