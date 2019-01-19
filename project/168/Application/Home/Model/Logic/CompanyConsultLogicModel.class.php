<?php
/**
 * 装修公司咨询
 * Created by PhpStorm.
 * User: mcj
 * Date: 2019/1/16
 * Time: 13:27
 */

namespace Home\Model\Logic;

class CompanyConsultLogicModel
{

    public function getMap($data)
    {
        $where = [];
        //城市
        if (!empty($data['city'])) {
            $where['a.cs'] = $data['city'];
        }
        //公司名称
        if (!empty($data['company'])) {
            $where['a.name'] =  ['like', "%{$data['company']}%"];
        }
        //合作状态
        if (!empty($data['join_status'])) {
            $where['a.record_status'] = $data['join_status'];
        }
        //合作类型
        if (!empty($data['cooperation_type'])) {
            $where['a.cooperation_type'] = $data['cooperation_type'];
        }
        //咨询日期
        if (!empty($data['start_time'])) {
            $where['a.add_time'][] = ['egt', strtotime($data['start_time'].' 00:00:00')];
        }
        if (!empty($data['end_time'])) {
            $where['a.add_time'][] = ['elt', strtotime($data['end_time'].' 23:59:59')];
        }
        return $where;
    }

    public function selectConsult($where=[],$order=[],$p=1,$page_size=20){
        $skip = ($p-1) * $page_size;
        $order_by = array_merge($order,['a.add_time'=>'desc']);
        return D("CompanyConsult")->selectConsult($where,$order_by,$skip,$page_size);
    }


}