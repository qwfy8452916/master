<?php

namespace app\common\model\db;

use think\Db;
use think\Model;

class Feedback extends Model
{
    protected $table = 'qz_yxb_feedback';

    /**
     * 提交意见反馈
     * @param [数组] $where [传过来数据， 需要保存到feedback表中]
     */
    public function addFeedback($where){

        $companyId = Db::name('yxb_account')
            ->where(array('id'=>$where['account_id']))
            ->column('company_id');
        if(!empty($companyId)){
            $where['company_id'] = $companyId[0];
        }
        $stationId = Db::name('yxb_account_info')
            ->where(array('account_id'=>$where['account_id']))
            -> column('station_id');
        if(!empty($stationId)){
            $where['station_id'] = $stationId[0];
        }
        $where['addtime'] = time();
        $where['updata_time'] = $where['addtime'];
        $dbRequest =  Db::name('yxb_feedback')->strict(false)->insert($where);
        return $dbRequest;
    }

}