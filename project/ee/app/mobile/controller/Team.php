<?php

namespace app\mobile\controller;

use app\common\controller\MobileCommonBase;
use app\common\enums\ErrorCode;
use app\common\enums\StationStatus;
use app\common\model\logic\AccountLogic;
use app\common\model\logic\DepartmentLogic;
use app\common\model\logic\StationLogic;
use app\common\model\logic\WorkergroupLogic;

/**
 * 移动端团队管理
 * Class Team
 * @package app\mobile\controller
 */
class Team extends MobileCommonBase
{
    //员工管理
    public function employee(AccountLogic $accountLogic)
    {
        $list = $accountLogic->mobileEmployeeList(input('get.'));
        if ($this->request->isAjax()) {
            return json(['error_code' => ErrorCode::SUCCESS, 'data' => $list['list'], 'page' => $list['page']]); //成功
        } else {
            $this->assign('list', $list['list']);
            $this->assign('page', $list['page']);
            return $this->fetch();
        }
    }

    //添加/编辑员工
    public function addemployee(DepartmentLogic $departmentLogic, StationLogic $stationLogic, AccountLogic $accountLogic)
    {
        //部门列表
        $deptSelect = $departmentLogic->mobileDepartmentSelect();
        //岗位列表
        $stationSelect = $stationLogic->mobileStationSelect();
        $list = $accountLogic->getEmployeeInfoById(input('get.'));
        //错误信息
        if (isset($list['error'])) {
            $this->error($list['error']);
        }
        $this->assign('action_type', input()['action_type']);
        $this->assign('list', $list);
        $this->assign('deptSelect', json_encode($deptSelect));
        $this->assign('stationSelect', json_encode($stationSelect));
        return $this->fetch();
    }

    /**
     * 删除员工
     */
    public function delEmployee(AccountLogic $accountLogic)
    {
        $status = $accountLogic->delEmployee(input('post.'));
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(3, input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '删除成功']);
        } else {
            return json(['status' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '删除失败']);
        }
    }

    /**
     * 保存员工数据
     */
    public function saveEmployee(AccountLogic $accountLogic)
    {
        //验证同一装修公司姓名唯一性
        $pass = $accountLogic->checkAccountName(input());
        if (!$pass) {
            return json(['error_code' => ErrorCode::PARAMETER_DATA_NAME, 'error_msg' => '员工姓名已存在']);
        }
        //验证唯一性
        $pass = $accountLogic->checkAccount(input());
        if (!$pass) {
            return json(['error_code' => ErrorCode::PARAMETER_DATA_REPEAT, 'error_msg' => '该账号已存在']);
        }
        $status = $accountLogic->saveEmployeeInfo(input('post.'));
        if ($status) {
            //添加员工附属表
            $status = $accountLogic->saveEmployeeAccountInfo($status, input('post.'));
        }
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(2, input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }


    //施工组管理
    public function group(WorkergroupLogic $workergroupLogic)
    {
        $list = $workergroupLogic->getMobileWorkerGroupList(input('get.'));
        //施工组最新装修信息
        if(!empty($list)){
            $list['list'] = $workergroupLogic->getGroupBuildInfoList($list['list']);
        }
        if ($this->request->isAjax()) {
            if (empty($list)) {
                return json(['error_code' => ErrorCode::SUCCESS, 'info' => '未查找到数据', 'data' => [], 'page' => 0]); //没有数据
            }
            return json(['error_code' => ErrorCode::SUCCESS, 'data' => $list['list'], 'page' => $list['page']]); //成功
        } else {
            $this->assign('list', $list['list']);
            $this->assign('page', $list['page']);
            //项目经理岗位的人看到不同的页面
            if(session('userInfo.default_rule') == StationStatus::DEFAULT_RULE_XMJL){
                return $this->fetch('groupmanager');
            }
            return $this->fetch();
        }
    }

    //员工管理
    public function yuangong(AccountLogic $accountLogic)
    {
        $list = $accountLogic->mobileWorkerList(input('get.'));
        if ($this->request->isAjax()) {
            return json(['error_code' => ErrorCode::SUCCESS, 'data' => $list['list'], 'page' => $list['page']]); //成功
        } else {
            $this->assign('list', $list['list']);
            $this->assign('page', $list['page']);
            return $this->fetch();
        }

        $list = $accountLogic->mobileWorkerList(input('get.'));
        $this->assign('list', $list);
        $this->assign('order', $accountLogic->getOrderUrl('asc'));
        return $this->fetch();
    }
    /**
     * 删除施工组
     */
    public function delGroup(WorkergroupLogic $workergroupLogic)
    {
        $status = $workergroupLogic->delGroup(input('post.'));
        $logModel = new \app\common\model\logic\LogLogic();
        $logModel->addLog(3, input());
        if ($status) {
            return json(['error_code' => 0, 'error_msg' => '删除成功']);
        } else {
            return json(['error_code' => 1, 'error_msg' => '删除失败']);
        }
    }

    //施工组工人
    public function groupworker(WorkergroupLogic $workergroupLogic)
    {
        $list = $workergroupLogic->getWorkerGroupDetailInfo(input('get.'));
        if (isset($list['error'])) {
            $this->error($list['error']);
        }
        $this->assign('list', $list[0]);
        return $this->fetch();
    }

    public function delGroupWorker(WorkergroupLogic $workergroupLogic)
    {
        $status = $workergroupLogic->delGroupWorker(input());
        if ($status) {
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }

}

