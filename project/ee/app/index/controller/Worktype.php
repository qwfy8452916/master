<?php

namespace app\index\controller;

use app\common\controller\AbstractBase;
use app\common\controller\CommonBase;
use app\common\enums\ErrorCode;
use app\common\model\logic\WorktypeLogic;

/**
 * 工种
 * Class Worktype
 * @package app\index\controller
 */
class Worktype extends CommonBase
{
    public function index(WorktypeLogic $worktypeLogic)
    {
        $list = $worktypeLogic->getWorkTypeList(input());
        $this->assign('list', $list);
        return $this->fetch('typework');
    }

    /**
     * 获取单条数据
     * @param WorktypeLogic $worktypeLogic
     * @return \think\response\Json
     */
    public function getWorktypeInfo(WorktypeLogic $worktypeLogic)
    {
        $list = $worktypeLogic->getWorktypeInfo(input('get.edit_id'));
        if ($list) {
            return json(['status' => 1, 'info' => '获取成功', 'data' => $list]);
        } else {
            return json(['status' => 0, 'info' => '获取失败!', 'data' => '']);
        }
    }

    /**
     * 删除单条数据
     * @param WorktypeLogic $worktypeLogic
     * @return \think\response\Json
     */
    public function delWorktypeInfo(WorktypeLogic $worktypeLogic)
    {
        $list = $worktypeLogic->delWorktypeInfo(input()['edit_id']);
        $logModel = new \app\common\model\logic\LogLogic();
        $logModel->addLog(3,input());
        if ($list) {
            return json(['status' => 1, 'info' => '删除成功', 'data' => '']);
        } else {
            return json(['status' => 0, 'info' => '删除失败!', 'data' => '']);
        }
    }

    /**
     * 添加/编辑 工种
     * @param WorktypeLogic $worktypeLogic
     * @return \think\response\Json
     */
    public function edit(WorktypeLogic $worktypeLogic)
    {
        $status = $worktypeLogic->checkWorkType(input('post.'));
        if (!$status) {
            return json(['error_code' => ErrorCode::PARAMETER_DATA_REPEAT, 'error_msg' => '该工种名称已存在']);
        }
        $data = $worktypeLogic->editWorkType(input('post.'));
        if ($data) {
            $logModel = new \app\common\model\logic\LogLogic();
            $logModel->addLog(2,input());
            return json(['error_code' => ErrorCode::SUCCESS, 'error_msg' => '操作成功']);
        } else {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '操作失败']);
        }
    }
}
