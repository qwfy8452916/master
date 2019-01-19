<?php

namespace Home\Model;
Use Think\Model;

/**
*
*/
class OrderCsosNewModel extends Model
{

    /**
     * 获取订单操作记录
     * @param  [type] $orderid [description]
     * @return [type]          [description]
     */
    public function getCsosInfo($orderid)
    {
        $map = array(
            "order_id" => array("EQ",$orderid)
        );

        return M("order_csos_new")->where($map)->find();
    }

    /**
     * 添加记录
     * @param [type] $data [description]
     */
    public function addCsos($data)
    {
       return M("order_csos_new")->add($data);
    }

    /**
     * 编辑记录
     * @param  [type] $orderid [description]
     * @param  [type] $data    [description]
     * @return [type]          [description]
     */
    public function editCsos($orderid,$data)
    {
        $map = array(
            "order_id" => array("EQ",$orderid)
        );
        return M("order_csos_new")->where($map)->save($data);
    }

    /**
     * 添加订单记录
     * @param [type] $data [description]
     */
    public function addLog($data)
    {
        return M("log_order_csos")->add($data);
    }

    /**
     * 获取分单列表
     * 开始时间和结束时间的时间格式为Y-m-d格式，
     * 举例：开始2017-06-01 结束2017-06-01 查询的是 2017-06-01 00:00:00 到 2017-06-01 23:59:59 中的数据
     * @param  string $start_time 开始时间
     * @param  string $end_time   结束时间
     * @return array              列表数组
     */
    public function getFenDanDataAnalysisList($start_time = '', $end_time = '')
    {
        if (empty($start_time) || empty($end_time)) {
            return false;
        }

        //注意此处的时间，结束时间要加1天，小于
        $map = array(
            'c.lasttime' => array(
                array('EGT', strtotime($start_time)),
                array('LT', strtotime($end_time . ' +1 day')),
            ),
            'o.type_fw' => 1
        );

        $build =  M('order_csos_new')->alias('c')
                                     ->field('c.lasttime,c.user_id')
                                     ->join('INNER JOIN qz_orders AS o ON c.order_id = o.id')
                                     ->where($map)
                                     ->buildSql();
        return M()->table($build)->alias('z')
                                 ->field('z.lasttime,u.kfgroup')
                                 ->join('INNER JOIN qz_adminuser AS u ON u.id = z.user_id')
                                 ->select();
    }

    /**
     * 获取有效订单列表
     * @param  integer $start     开始时间
     * @param  integer $end       结束时间
     * @param  array   $source_id 来源ID数组
     * @return array
     */
    public function getYouXiaoListBySourceId($start = 0, $end = 0, $source_id = array(),$src = array())
    {
        if (empty($start) || empty($end) || empty($source_id)) {
            return false;
        }

        $map = array(
            'c.lasttime'  => array(array('LT', $end),array('EXP', 'IS NULL'),'OR'),
            'o.time_real' => array('EGT', $start),
            'o.source'    => array('IN', $source_id)
        );
        //如果有筛选渠道来源
        if ($src) {
            $map['s.source_src'] = ['IN', $src];
        }
        return M('orders')->alias('o')
                          ->field('c.lasttime, o.time_real, c.order_on, o.type_fw')
                          ->join('LEFT JOIN qz_order_csos_new AS c ON c.order_id = o.id')
                          ->join('LEFT JOIN qz_orders_source AS s ON s.orderid = o.id')
                          ->where($map)
                          ->select();
    }

    /**
     * 获取发单列表
     * @param  integer $start     开始时间
     * @param  integer $end       结束时间
     * @param  array   $source_id 来源ID数组
     * @return array
     */
    public function getOrderListBySourceId($start = 0, $end = 0, $source_id = array(),$src = array())
    {
        if (empty($start) || empty($end) || empty($source_id)) {
            return false;
        }
        $map = array(
            'o.time_real' => array(array('EGT', $start), array('LT', $end)),
            'o.source'    => array('IN', $source_id)
        );
        //如果有筛选渠道来源
        if ($src) {
            $map['s.source_src'] = ['IN', $src];
        }
        return M('orders')->alias('o')
                          ->field('o.time_real')
                          ->join('LEFT JOIN qz_orders_source AS s ON s.orderid = o.id')
                          ->where($map)
                          ->select();
    }
}