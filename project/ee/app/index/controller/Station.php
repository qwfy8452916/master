<?php

namespace app\index\controller;

use app\common\controller\CommonBase;
use app\common\enums\ErrorCode;
use app\common\model\logic\MenuLogic;
use app\common\model\logic\StationLogic;
use think\facade\Cache;
use think\App;

/**
 * 岗位管理
 * Class Station
 * @package app\index\controller
 */
class Station extends CommonBase
{
    public function __construct(App $app = null, MenuLogic $menuLogic)
    {
        parent::__construct($app);
        //菜单列表
        $menu = $menuLogic->getMenuList();
        $this->assign('menu', $menu['tree_list']);
    }

    public function index(StationLogic $stationLogic)
    {
        $list = $stationLogic->getStationList(input());
        if (!empty($list['list']) && count($list['list']) > 0) {
            $this->assign('list', $list);
        }
        $this->assign('order', $stationLogic->getOrderUrl());
        return $this->fetch('station');
    }

    /**
     * 添加岗位
     * @param StationLogic $stationLogic
     * @return mixed
     */
    public function addStation(StationLogic $stationLogic)
    {
        //岗位信息
        $stationInfo = $stationLogic->getStationInfo(input());
        if (isset($stationInfo['error'])) {
            $this->error($stationInfo['error']);
        }
        if (!empty($stationInfo) && count($stationInfo) > 0) {
            $this->assign('stationInfo', $stationInfo[0]);
        }
        return $this->fetch();
    }

    /**
     * 改变状态
     * @param StationLogic $stationLogic
     * @return \think\response\Json
     */
    public function changeStation(StationLogic $stationLogic)
    {
        $status = $stationLogic->changeStation(input());
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(4,input());
            return json(['error_code' => 0, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }

    /**
     * 删除岗位
     * @param StationLogic $stationLogic
     * @return \think\response\Json
     */
    public function delStation(StationLogic $stationLogic)
    {
        $status = $stationLogic->delStation(input());
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(3,input());
            return json(['error_code' => 0, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }

    /**
     * 保存数据
     * @param StationLogic $stationLogic
     * @return \think\response\Json
     */
    public function saveStation(StationLogic $stationLogic,MenuLogic $menuLogic)
    {
        $status = $stationLogic->checkStation(input('post.'));
        if (!$status) {
            return json(['error_code' => ErrorCode::PARAMETER_DATA_REPEAT, 'error_msg' => '该岗位已存在']);
        }
        $status = $stationLogic->saveStation(input());
        if ($status) {
            //添加权限菜单
            $status = $menuLogic->saveMenu($status, input('post.'));
        }
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(2,input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }
}
