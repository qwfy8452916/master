<?php

namespace app\common\model\logic;

use app\common\enums\StationStatus;
use Util\Page;

/**
 * 意见反馈
 * Class FeedbackLogic
 * @package app\common\model\logic
 */
class FeedbackLogic
{
    /**
     * 提交意见反馈
     * @param $data 意见反馈内容
     */
    public function addFeedback($data){
        $where = $data;
        $where['account_id'] = session('userInfo.id');
        // $where['feedback_content'] = $data;
        $list = model('common/db/Feedback')->addFeedback($where);
        if($list === false){
            return ['status' => 0, 'info' => '提交失败'];
        }else{
            return ['status' => 1, 'info' => '提交成功'];
        }
    }


}