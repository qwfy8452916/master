<?php

namespace app\common\model\logic;

use app\common\enums\OrderStatus;
use app\common\model\db\OrdersHistory;

/**
 * 统计管理
 * Class StatisticsLogic
 * @package app\common\model\logic
 */
class StatisticsLogic
{
    /**
     * 签单统计
     * @param string $status 获取状态
     * @param string $start 开始时间
     * @param string $end 结束时间
     * @return array
     */
    public function SignStatistics($userInfo, $status = '', $start = '', $end = '')
    {
        if (empty($start) || empty($end)) {
            $start = strtotime(date('Y-m-d', strtotime('-30 day')) . ' 00:00:00');
            $end = time();
        }
        $historyDb = new OrdersHistory();
        //获取签单数据
        $history = $historyDb->getOrdersHistoryCount($userInfo, $status, $start, $end);
        $historyData = [];
        foreach ($history as $k => $v) {
            $historyData[$v['t']] = $v;
        }
        //用于显示当前周几
        $weekarray = ["日", "一", "二", "三", "四", "五", "六"];
        //循环查询的月份的每一天,并将数据放入
        $returnData = [];
        while ($start < $end) {
            $NewMonth = trim(date('Y-m-d', $start), ' ');
            $start += strtotime('+1 day', $start) - $start;
            //将对应数据放入
            if (isset($historyData[$NewMonth])) {
                $returnData[date('m-d', strtotime($NewMonth)) . '周' . $weekarray[date("w", strtotime($NewMonth))]]['count'] = $historyData[$NewMonth]['count'];
                unset($historyData[$NewMonth]);
            } else {
                $returnData[date('m-d', strtotime($NewMonth)) . '周' . $weekarray[date("w", strtotime($NewMonth))]]['count'] = 0;
            }
        }
        return $returnData;
    }

}