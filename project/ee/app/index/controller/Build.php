<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/13
 * Time: 16:24
 */
namespace app\index\controller;

use app\common\controller\CommonBase;
use app\common\enums\BuildStatus;
use app\common\enums\ErrorCode;
use app\common\model\logic\AccountLogic;
use app\common\model\logic\BuildLogic;
use app\common\model\logic\LogLogic;
use app\common\model\logic\OrderLogic;
use think\facade\Request;

/**
 * 施工模块管理
 * Class Order
 * @package app\index\controller
 */
class Build extends CommonBase
{
    //编辑施工信息页面
    public function edit(BuildLogic $buildLogic,OrderLogic $orderLogic, AccountLogic $accountLogic)
    {
        $user = session('userInfo');
        if (!$order_no = Request::get('order_no')) {
            $this->error('异常请求', null, '', 1);
        }
        if( !$order = $orderLogic->getCompanyOrderDetail( ['order_no_accurate'=>$order_no],$user) ){
            $this->error('未找到该订单',null,'',1);
        }
        //获取接待客服,设计师的订单数量
        $order = $orderLogic->getUserOrderCount($order);
        $this->assign("order", $order);
        $this->assign("order_no", $order_no);
        $this->assign("build_status", BuildStatus::getAllStatus());
		$count = $buildLogic->countBuildRecord(['order_no'=>$order_no],$user);
		$total_page = ceil($count/10);
		$this->assign('total_page', $total_page);
		$list = $buildLogic->selectBuildRecord(['order_no'=>$order_no],$user,1,10);
        $this->assign("count", $count);
        $this->assign("listPageIndex", 0);
        $this->assign("listPageCount", 10);
        $this->assign("list", $list);
        //1.项目经理下拉数据
        $projectUser = $accountLogic->commonAccountSelectList($user);
        //1.1项目经理关联订单数
        $projectUser = $accountLogic->projectOrderCountSelectList($projectUser);
        //2.施工班组下拉数据
        $workerUser = $accountLogic->workerAccountSelectList($user);
        //2.1施工人员关联订单数
        $workerUser = $accountLogic->workerOrderCountSelectList($workerUser);

        //3.施工班组/项目经理 选中数据
        $chooseWorkerUser = $accountLogic->orderChooseWorkerAccountSelectList($order, '', $user);
        //4.施工人员数据
        $workerInfo = $accountLogic->orderChooseWorkerAccountList($order['manage']['worker_type'],$workerUser,$projectUser,$chooseWorkerUser);
        $this->assign('project_user', $projectUser);
        $this->assign('worker_info', $workerInfo);
        $this->assign('worker_type', $order['manage']['worker_type']);
        $this->assign('worker_select',$workerUser);
        $this->assign('worker_choose_select',$chooseWorkerUser);
        return $this->fetch('order/edit_build_info');
    }

    public function saveOrderWorker(AccountLogic $accountLogic)
    {
        $user = session('userInfo');
        //验证订单和装修公司
        if(!$accountLogic->checkOrder(input()['order_id'],$user)){
            return json(['error_code' => ErrorCode::PARAMETER_LACK, 'error_msg' => '订单错误!']);
        }
        $status = $accountLogic->saveOrderWorker(input());
        if ($status['error_code'] == ErrorCode::SUCCESS) {
            //重新查询
            //施工人员关联订单数
            $workerInfo = $accountLogic->orderChooseWorkerAccountInfo(input());
            //1.项目经理下拉数据
            $projectUser = $accountLogic->commonAccountSelectList($user);
            //1.1项目经理关联订单数
            $projectUser = $accountLogic->projectOrderCountSelectList($projectUser);
            //2.施工班组下拉数据
            $workerUser = $accountLogic->workerAccountSelectList($user);
            //2.1施工人员关联订单数
            $workerUser = $accountLogic->workerOrderCountSelectList($workerUser);
            //3.生成html
            $workerHtml = $accountLogic->getWorkerHtml($projectUser,$workerUser);
            return json(['error_code' => ErrorCode::SUCCESS, 'info' => $workerInfo, 'worker_html'=>$workerHtml]);
        } else {
            return json(['error_code' => $status['error_code'], 'error_msg' => $status['error_msg']]);
        }
    }

    //获取验收不合格信息
    public function getCheckStateInfo(BuildLogic $buildLogic){
        if(!$build_no = Request::get('build_no')){
            $this->error('异常请求',null,'',1);
        }
        $info = $buildLogic->selectCheckStateInfo(['id'=>$build_no]);
        $this->assign('info',$info[0]);
        $data = $this->fetch('order/edit_build_module');
        return json(['error_code' => ErrorCode::SUCCESS, 'data' =>$data]);
    }


    public function listRecord(BuildLogic $buildLogic){
        $user = session('userInfo');
        $data = Request::get();
        //页码设置
        $page_current = empty($data['page_current']) ? 2 : $data['page_current'];
        if(empty($data['order_no'])){
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '订单号为空']);
        }
		$count = $buildLogic->countBuildRecord(['order_no'=>$data['order_no']],$user);
		$total_page = ceil($count/10);
		$page = [
			'total_page'=>$total_page,
			'page_current'=>$page_current
		];

        $list = $buildLogic->selectBuildRecord(['order_no'=>$data['order_no']],$user,$page_current,10);
        $this->assign("list", $list);
        $this->assign("count", $count);
        $this->assign("listPageIndex", $page_current-1);
        $this->assign("listPageCount", 10);

        $data = $this->fetch('order/edit_build_list');
        return json(['error_code' => ErrorCode::SUCCESS, 'data' =>$data,'page'=>$page]);
    }

    //施工信息添加接口
    public function add(OrderLogic $orderLogic,BuildLogic $buildLogic,LogLogic $logLogic)
    {
        $user = session('userInfo');
        $data = Request::post();
        //表单验证
        $validate = validate('build');
        if (!$validate->scene('add')->check($data)) {
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => $validate->getError()]);
        }
		if (isset($data['build_design']) && count($data['build_design']) > 9) {
			return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '上传图片数量超限']);
		}
		//验证是否已经添加施工状态
		$has_build_obj = $buildLogic->getBuild(['order_no'=>$data['order_no'],'state_able'=>1,'state'=>$data['build_state']]);
		if($has_build_obj != null){
			return json(['error_code' => ErrorCode::BUILD_STATE_HAS_ADD, 'error_msg' => '施工状态已被添加']);
		}
       $order_profile_obj = $orderLogic->getCompanyOrderProfile(['order_no_accurate'=>$data['order_no']],$user);
        if($order_profile_obj ==null){
            return json(['error_code' => ErrorCode::DATA_NOT_ORDER, 'error_msg' => '未找到订单']);
        }
        if ( $buildLogic->addData($data,$order_profile_obj,$user) === false) {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入施工信息出错']);
        }
        $logLogic->addLog(1,$data,'施工添加',$order_profile_obj->toArray());
        return json(['error_code' => ErrorCode::SUCCESS]);
    }

    public function editUnit(BuildLogic $buildLogic,LogLogic $logLogic){
        $user = session('userInfo');
        $data = Request::post();
        //表单验证
        $validate = validate('build');
        if (!$validate->scene('unitEdit')->check($data)) {
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => $validate->getError()]);
        }
        $build_obj = $buildLogic->getBuildRecord(['build_id'=>$data['build_id']],$user);
        if($build_obj==null){
            return json(['error_code' => ErrorCode::DATA_NOT_BUILD, 'error_msg' => '未找到施工记录']);
        }
        if ( $buildLogic->editUnit($data,$build_obj) === false) {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入施工信息出错']);
        }
        $logLogic->addLog(2,$data,'施工编辑',$build_obj->toArray());
        return json(['error_code' => ErrorCode::SUCCESS]);

    }

    public function delUnit(BuildLogic $buildLogic,LogLogic $logLogic){
        $user = session('userInfo');
        //表单验证
        if (!$build_id = Request::post('build_id')) {
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '异常操作-没有施工记录标识']);
        }
        $build_obj = $buildLogic->getBuildRecord(['build_id'=>$build_id,'check_state'=>1],$user);
        if($build_obj==null){
            return json(['error_code' => ErrorCode::DATA_NOT_BUILD, 'error_msg' => '未找到施工记录']);
        }
		if ( $buildLogic->delUnit($build_obj) === false) {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库清除施工记录出错']);
        }
		$buildLogic->updateOrderManageBuildState($build_obj->order_no);
        $logLogic->addLog(3,Request::post(),'施工编辑',$build_obj->toArray());
        return json(['error_code' => ErrorCode::SUCCESS]);
    }


}