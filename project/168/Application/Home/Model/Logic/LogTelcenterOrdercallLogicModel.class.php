<?php
/**
 * 通话相关模块
 */

namespace Home\Model\Logic;

class LogTelcenterOrdercallLogicModel
{
    public function getOrderCallCountDetailByOrderIds($info){
        $tel = D('LogTelcenterOrdercall')->getOrderCallCountDetailByOrderIds(array_column($info,'id'));
        $telData = [];
        foreach ($tel as $k=>$v){
            $telData[$v['orderid']] = $v;
        }
        foreach ($info as $k => $v) {
            $info[$k]['boda_count'] = empty($telData[$v['id']]['boda_count']) ? 0 : $telData[$v['id']]['boda_count'];
            $info[$k]['botong_count'] = empty($telData[$v['id']]['botong_count']) ? 0 : $telData[$v['id']]['botong_count'];
            $info[$k]['time_real'] = date("Y", $v['time_real']) . '年' . date("m", $v['time_real']) . '月' . date("d", $v['time_real']) . '日';
        }
        return $info;
    }
}