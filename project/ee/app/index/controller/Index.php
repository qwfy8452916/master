<?php
namespace app\index\controller;

use app\common\controller\CommonBase;
use app\common\enums\ErrorCode;
use app\common\enums\OrderStatus;
use app\common\model\db\Orders;
use app\common\model\logic\BuildLogic;
use app\common\model\logic\OrderLogic;
use app\common\model\logic\StatisticsLogic;

/**
 * PC端首页
 * Class Index
 * @package app\index\controller
 */
class Index extends CommonBase
{
    //首页
    public function index(BuildLogic $buildLogic,StatisticsLogic $statisticsLogic,OrderLogic $orderLogic)
    {
        $user = session('userInfo');
        //获取最新订单
        $list = $orderLogic->newOrderList($user,5);
        //获取签单统计
        $statistics = $statisticsLogic->SignStatistics($user,OrderStatus::BUILD_SIGN);
        $this->assign('list',$list);
        $this->assign('statistics',json_encode($statistics));
        return $this->fetch();
    }

    public function ajaxBuildHistory(StatisticsLogic $statisticsLogic){
        $user = session('userInfo');
        if(empty(input()['start']) || empty(input()['end'])){
            return json(['error_code' => ErrorCode::PARAMETER_LACK, 'error_msg' => '缺少参数!']);
        }
        //获取签单统计
        $statistics = $statisticsLogic->SignStatistics($user, OrderStatus::BUILD_SIGN, strtotime(input()['start']), strtotime(input()['end'].' 23:59:59'));
        return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '', 'info' => $statistics]);
    }
}
