<?php

namespace app\index\controller;

use app\common\controller\CommonBase;
use app\common\enums\ErrorCode;
use app\common\enums\StationStatus;
use app\common\model\logic\AccountLogic;
use app\common\model\logic\BuildLogic;
use app\common\model\logic\DepartmentLogic;
use app\common\model\logic\LoginLogic;
use app\common\model\logic\StationLogic;
use app\common\model\logic\WorkergroupLogic;
use app\common\model\logic\WorktypeLogic;
use think\App;

/**
 * PC端团队管理
 * Class Team
 * @package app\index\controller
 */
class Team extends CommonBase
{

    public function __construct(App $app = null, DepartmentLogic $departmentLogic, StationLogic $stationLogic)
    {
        parent::__construct($app);
        //部门列表
        $deptSelect = $departmentLogic->departmentSelect();
        //岗位列表
        $stationSelect = $stationLogic->stationSelect();
        $this->assign('deptSelect', $deptSelect);
        $this->assign('stationSelect', $stationSelect);
    }

    //员工列表
    public function employee(AccountLogic $accountLogic)
    {
        $list = $accountLogic->employeeList(input('get.'));
        $this->assign('list', $list);
        $this->assign('order', $accountLogic->getOrderUrl('asc'));
        return $this->fetch();
    }

    //添加/编辑员工
    public function addemployee(AccountLogic $accountLogic)
    {
        $list = $accountLogic->getEmployeeInfoById(input('get.'));
        if (isset($list['error'])) {
            $this->error($list['error']);
        }
        $this->assign('action_type', input()['action_type']);
        $this->assign('list', $list);
        return $this->fetch();
    }

    //工人列表
    public function worker(AccountLogic $accountLogic,WorktypeLogic $worktypeLogic)
    {
        $list = $accountLogic->workerList(input('get.'));
        $worktypeSelect = $worktypeLogic->worktypeSelect();
        $this->assign('list', $list);
        $this->assign('worktypeSelect', $worktypeSelect);
        $this->assign('order', $accountLogic->getOrderUrl('asc'));
        return $this->fetch();
    }

    //添加/编辑工人
    public function getWorkerInfoById(AccountLogic $accountLogic)
    {
        $list = $accountLogic->getWorkerInfoById(input('post.'));
        if (isset($list['error'])) {
            $this->error($list['error']);
        }
        if ($list) {
            return json(['data' => $list,'error_code' => ErrorCode::SUCCESS, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }

    /**
     * 更改员工状态
     */
    public function changeEmployeeStatus(AccountLogic $accountLogic)
    {
        $status = $accountLogic->changeEmployeeStatus(input('post.'));
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(4,input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }

    /**
     * 添加/编辑员工
     */
    public function saveEmployee(AccountLogic $accountLogic)
    {
        //验证同一装修公司姓名唯一性
        $pass = $accountLogic->checkAccountName(input(),2);
        if (!$pass) {
            return json(['error_code' => ErrorCode::PARAMETER_DATA_NAME, 'error_msg' => '员工姓名已存在']);
        }
        //验证账号唯一性
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
            $logModel->addLog(2,input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }

    /**
     * 删除员工
     */
    public function delEmployee(AccountLogic $accountLogic)
    {
        $status = $accountLogic->delEmployee(input('post.'));
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(3,input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '删除成功']);
        } else {
            return json(['status' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '删除失败']);
        }
    }

    /**
     * 修改密码
     * @param AccountLogic $accountLogic
     * @return \think\response\Json
     */
    public function changePwd(AccountLogic $accountLogic){
        $status = $accountLogic->changePwd(input('post.'));
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(2,input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }

    /**
     * 更改员工状态
     */
    public function changeWorkerStatus(AccountLogic $accountLogic)
    {
        $status = $accountLogic->changeWorkerStatus(input('post.'));
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(4,input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }

    /**
     * 添加/编辑工人
     */
    public function saveWorker(AccountLogic $accountLogic)
    {
        //验证同一装修公司姓名唯一性
        $pass = $accountLogic->checkAccountName(input(),3);
        if (!$pass) {
            return json(['error_code' => ErrorCode::PARAMETER_DATA_NAME, 'error_msg' => '工人姓名已存在']);
        }
        //验证账号唯一性
        $pass = $accountLogic->checkAccount(input());
        if (!$pass) {
            return json(['error_code' => ErrorCode::PARAMETER_DATA_REPEAT, 'error_msg' => '该账号已存在']);
        }
        $status = $accountLogic->saveWorkerInfo(input('post.'));
        if ($status) {
            //添加工人附属表
            $statusinfo = $accountLogic->saveWorkerAccountInfo($status, input('post.'));
            if($statusinfo){
                //添加工人工种表
                $status = $accountLogic->saveWorkerTypeInfo($status, input('post.'));
            }
        }
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(2,input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }

    /**
     * 删除工人
     */
    public function delWorker(AccountLogic $accountLogic)
    {
        $status = $accountLogic->delWorker(input('post.'));
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(3,input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '删除成功']);
        } else {
            return json(['status' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '删除失败']);
        }
    }

    /**
     * 修改密码
     * @param AccountLogic $accountLogic
     * @return \think\response\Json
     */
    public function changeWorkerPwd(AccountLogic $accountLogic){
        $status = $accountLogic->changeWorkerPwd(input('post.'));
        if ($status) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(2,input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }
}
