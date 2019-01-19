<?php

namespace app\index\controller;

use app\common\controller\CommonBase;
use app\common\enums\BuildStatus;
use app\common\enums\ErrorCode;
use app\common\enums\OrderSource;
use app\common\enums\OrderStatus;
use app\common\enums\StationStatus;
use app\common\model\db\OrdersHistory;
use app\common\model\logic\AccountLogic;
use app\common\model\logic\BuildLogic;
use app\common\model\logic\HuXingLogic;
use app\common\model\logic\LogLogic;
use app\common\model\logic\MaterialLogic;
use app\common\model\logic\OrderLogic;
use app\common\model\logic\WorkergroupLogic;
use app\common\model\logic\OrdersHistoryLogic;
use think\facade\Request;
use Util\Page;

/**
 * PC端跟单
 * Class Order
 * @package app\index\controller
 */
class Order extends CommonBase
{
    //跟单管理
    public function index(OrderLogic $orderLogic,WorkergroupLogic $workergroupLogic)
    {
        $user = session('userInfo');
        $data = Request::get();
        $this->assign("search_data", $data);
        //表单验证
        $validate = validate('order');
        if (!$validate->scene('search')->check($data)) {
            $this->error('输入内容不合法：' . $validate->getError(), null, '', 1);
        }
        //页码设置
        $page_size = empty($data['page_size']) ? 20 : $data['page_size'];
        $page_current = empty($data['p']) ? 1 : $data['p'];
        //特殊权限
//		if($user['default_rule']==2){
//			$this->assign('build_group', $workergroupLogic->getWorkerGroupSelect(['project_user' => $user['id']]));
//			$data['project_manager']=$user['id'];
//		}else{
//			$this->assign('build_group', $workergroupLogic->getWorkerGroupSelect());
//		}
        //数据查询
        $list = $orderLogic->selectCompanyOrder($data,$user, $page_current, $page_size);
        $count = $orderLogic->countCompanyOrder($data,$user);

        //分页
        $page = new Page($count, $page_size);
        $this->assign('list', $list);
        $this->assign('page', $page->show());

        //界面展示需要的额外数据
        //订单来源
        $this->assign('order_source', OrderSource::getAllSource());
        //订单状态
        $this->assign("order_status", OrderStatus::getAllStatus());
        $this->assign("build_status", BuildStatus::getAllStatus());

        return $this->fetch();
    }

    //添加
    public function add(AccountLogic $accountLogic,HuXingLogic $huXingLogic)
    {
        $this->assign("order_status", OrderStatus::getAllStatus());
        $this->assign('reception',$accountLogic->projectUserList([]));
        $this->assign("designer", $accountLogic->projectUserList([]));
        $this->assign("project_manager", $accountLogic->projectUserList([],StationStatus::DEFAULT_RULE_XMJL));
        $this->assign("house_type", $huXingLogic->getList());

        return $this->fetch('add');
    }

    /**
     * 添加跟单，表单处理
     * author: mcj
     * @param OrderLogic $orderLogic
     * @param LogLogic $logLogic
     * @return \think\response\Json
     */

    public function doAdd(OrderLogic $orderLogic,LogLogic $logLogic)
    {
        $user = session('userInfo');
        $data = Request::post();
        //表单验证
        $validate = validate('order');
        if (!$validate->scene('add')->check($data)) {
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => $validate->getError()]);
        }
//      e.1.1.2 ERP-前台部分模块调整 要求删除
//		if (isset($data['house_design']) && count($data['house_design']) > 9) {
//			return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '上传图片数量超限']);
//		}

        //存储数据
        if ($orderLogic->addData($data,$user) === false) {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入订单信息出错']);
        }

        $logLogic->addLog(1,$data,'跟单录入');
        return json(['error_code' => ErrorCode::SUCCESS]);

    }

    //根据项目经理获取所管理的工作组
    public function managerWorkerGroup(AccountLogic $accountLogic, WorkergroupLogic $workergroupLogic)
    {
//        if (!$manager_id = Request::get('manager_id')) {
//            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '缺少项目经理参数']);
//        }
//        $manager = $accountLogic->getEmployeeSelectList(['project_user' => $manager_id]);
//        if (empty($manager)) {
//            return json(['error_code' => ErrorCode::DATA_NOT_PROJECT_MANAGER, 'error_msg' => '该项目经理不存在']);
//        }
        $manager_id = Request::get('manager_id');
        if (!$manager_id) {
            $manager = $accountLogic->getEmployeeSelectList(['project_user' => $manager_id]);
            if (empty($manager)) {
                return json(['error_code' => ErrorCode::DATA_NOT_PROJECT_MANAGER, 'error_msg' => '该项目经理不存在']);
            }
        }
        $group = $workergroupLogic->getWorkerGroupList(['project_user' => $manager_id]);
        return json(['error_code' => ErrorCode::SUCCESS, 'data' => $group]);
    }
    //编辑跟单信息页面
    public function editOrder(OrderLogic $orderLogic,AccountLogic $accountLogic,HuXingLogic $huXingLogic,WorkergroupLogic $workergroupLogic)
    {
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        $user = session('userInfo');
        if( !$order = $orderLogic->getCompanyOrder(['order_no_accurate'=>$order_no],$user) ){
            $this->error('未找到该订单',null,'',1);
        }
		$orderLogic->setReceptionTime($order);
        $this->assign('order', $order);
		//界面展示需要的额外数据
		$this->assign("build_sign", OrderStatus::BUILD_SIGN);
		$this->assign("house_type", $huXingLogic->getList());
        $this->assign("order_status", OrderStatus::getAllStatus());
        $this->assign("build_status", BuildStatus::getAllStatus());
        $this->assign('reception',$accountLogic->projectUserList([],'',$order->manage->reception_id));
        $this->assign("designer", $accountLogic->projectUserList([],'',$order->manage->designer_id));
        $this->assign("project_manager", $accountLogic->projectUserList([],StationStatus::DEFAULT_RULE_XMJL,$order->manage->project_manager));
		$build_group = [];
        if($order->manage->project_manager){
        	$build_group = $workergroupLogic->getWorkerGroupList(['project_user' => $order->manage->project_manager],$order->manage->build_group);
		}else{
            $build_group = $workergroupLogic->getWorkerGroupList(0,0);
        }
		$this->assign('build_group',$build_group);
        return $this->fetch('edit_order');
    }
    //编辑跟单信息接口
    public function editOrderDo(OrderLogic $orderLogic,LogLogic $logLogic){
        $user = session('userInfo');
        $data = Request::post();
        //表单验证
        $validate = validate('order');
        if (!$validate->scene('orderEdit')->check($data)) {
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => $validate->getError()]);
        }
		if (isset($data['house_design']) && count($data['house_design']) > 9) {
			return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '上传图片数量超限']);
		}
        $order_profile_obj = $orderLogic->getCompanyOrderSample(['order_no_accurate'=>$data['order_no']],$user);
        $tempstate = $order_profile_obj['manage']->getData('state');
        if($order_profile_obj==null){
            return json(['error_code' => ErrorCode::DATA_NOT_ORDER, 'error_msg' => '未找到订单']);
        }
        //更新数据
        if ($orderLogic->editOrderData($order_profile_obj,$data,$user) === false) {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入订单信息出错']);
        }
        if( $tempstate!= $data['state']){
            if($data['state'] == 5){
                $kk = $order_profile_obj->getData('source');
                if($kk == '2'){
                    //添加editCompanyReviewData
                    if(isset($data['remark'])){
                        $data['reason'] = $data['remark'];
                    }
                    $history = $orderLogic->editCompanyReviewDataByLiangfang($data);
                    if ($history['status']=='0') {
                        return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入订单信息出错']);
                    }
                }
            }else{
                if($order_profile_obj['source']=='2'){
                    //添加editCompanyReviewData
                    $data['reason'] = $data['remark'];
                    $history = $orderLogic->editCompanyReviewData($data,$user);
                    if ($history['status']=='0') {
                        return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入订单信息出错']);
                    }
                }
            }

        }

        $logLogic->addLog(2,$data,'跟单编辑',$order_profile_obj->toArray());
        return json(['error_code' => ErrorCode::SUCCESS]);
    }
    //跟单部分添加
    public function editOrderStateDo(OrderLogic $orderLogic,LogLogic $logLogic){
        $user = session('userInfo');
        $data = Request::post();
        //表单验证
        $validate = validate('order');
        if (!$validate->scene('orderStateEdit')->check($data)) {
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => $validate->getError()]);
        }

        $order_profile_obj = $orderLogic->getCompanyOrderSample(['order_no_accurate'=>$data['order_no']],$user);
        $tempstate = $order_profile_obj['manage']->getData('state');
        if($order_profile_obj==null){
            return json(['error_code' => ErrorCode::DATA_NOT_ORDER, 'error_msg' => '未找到订单']);
        }
        //更新数据
        if ($orderLogic->editOrderStateData($order_profile_obj,$data,$user) === false) {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入订单信息出错']);
        }
        if( $tempstate!= $data['state']){
            if($data['state'] == 5){
                $kk = $order_profile_obj->getData('source');
                if($kk == '2'){
                    //添加editCompanyReviewData
                    if(isset($data['remark'])){
                        $data['reason'] = $data['remark'];
                    }
                    $history = $orderLogic->editCompanyReviewDataByLiangfang($data);
                    if ($history['status']=='0') {
                        return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入订单信息出错']);
                    }
                }
            }else{
                if($order_profile_obj['source']=='2'){
                    //添加editCompanyReviewData
                    $data['reason'] = $data['remark'];
                    $history = $orderLogic->editCompanyReviewData($data,$user);
                    if ($history['status']=='0') {
                        return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入订单信息出错']);
                    }
                }
            }

        }

        $logLogic->addLog(2,$data,'跟单编辑',$order_profile_obj->toArray());
        return json(['error_code' => ErrorCode::SUCCESS]);
    }

    //基本信息编辑
    public function editOrderBasicDo(OrderLogic $orderLogic,LogLogic $logLogic,AccountLogic $accountLogic)
    {
        $user = session('userInfo');
        $data = Request::post();
        if (!$data['order_no']) {
            return json(['error_code' => ErrorCode::DATA_NOT_ORDER, 'error_msg' => '未找到订单']);
        }

        $order_profile_obj = $orderLogic->getCompanyOrderSample(['order_no_accurate'=>$data['order_no']],$user);
        if($order_profile_obj==null){
            return json(['error_code' => ErrorCode::DATA_NOT_ORDER, 'error_msg' => '未找到订单']);
        }
        //更新数据
        if ($orderLogic->editOrderBasicData($order_profile_obj,$data,$user) === false) {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入订单信息出错']);
        }
        //获取接待客服,设计师的订单数量
        $user = session('userInfo');
        $orderinfo = $orderLogic->getCompanyOrderDetail( ['order_no_accurate'=>$data['order_no']],$user);
        $orderinfo = $orderLogic->getUserOrderCount($orderinfo);
        $info['reception_id_num'] = isset($orderinfo->reception_id_num)?$orderinfo->reception_id_num:'';
        $info['designer_id_num'] = isset($orderinfo->designer_id_num)?$orderinfo->designer_id_num:'';
        $info['reception'] = $accountLogic->projectUserList([],'',$orderinfo->reception_id);
        $info['designer'] =  $accountLogic->projectUserList([],'',$orderinfo->designer_id);
        $logLogic->addLog(2,$data,'跟单编辑',$order_profile_obj);

        return json(['error_code' => ErrorCode::SUCCESS,'data'=>$info]);
    }

    //人员信息编辑
    public function editOrderUserDo(OrderLogic $orderLogic,LogLogic $logLogic)
    {
        $user = session('userInfo');
        $data = Request::post();
        if(empty($data['order_no'])){
            return json(['error_code' => ErrorCode::DATA_NOT_ORDER, 'error_msg' => '未找到订单']);
        }

        $order_profile_obj = $orderLogic->getCompanyOrderSample(['order_no_accurate'=>$data['order_no']],$user);
        $tempstate = $order_profile_obj['manage']->getData('state');
        if($order_profile_obj==null){
            return json(['error_code' => ErrorCode::DATA_NOT_ORDER, 'error_msg' => '未找到订单']);
        }
        //更新数据
        if ($orderLogic->editOrderUserData($order_profile_obj,$data,$user) === false) {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入订单信息出错']);
        }

        $user = session('userInfo');
        $orderinfo = $orderLogic->getCompanyOrderDetail( ['order_no_accurate'=>$data['order_no']],$user);

        //获取接待客服,设计师,项目经理,施工组的订单数量
        $orderinfo = $orderLogic->getUserOrderCount($orderinfo);
        $info['reception_id_num'] = isset($orderinfo->reception_id_num)?$orderinfo->reception_id_num:'';
        $info['designer_id_num'] = isset($orderinfo->designer_id_num)?$orderinfo->designer_id_num:'';
        $info['project_manager_num'] = isset($orderinfo->project_manager_num)?$orderinfo->project_manager_num:'';
        $info['build_group_num'] = isset($orderinfo->build_group_num)?$orderinfo->build_group_num:'';

        $logLogic->addLog(2,$data,'跟单编辑',$order_profile_obj->toArray());
        return json(['error_code' => ErrorCode::SUCCESS,'data'=>$info]);
    }

    //设计图编辑
    public function editOrderImgDo(OrderLogic $orderLogic,LogLogic $logLogic)
    {
        $user = session('userInfo');
        $data = Request::post();

        if (isset($data['house_design']) && count($data['house_design']) > 9) {
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '上传图片数量超限']);
        }

        $order_profile_obj = $orderLogic->getCompanyOrderSample(['order_no_accurate'=>$data['order_no']],$user);
        $tempstate = $order_profile_obj['manage']->getData('state');
        if($order_profile_obj==null){
            return json(['error_code' => ErrorCode::DATA_NOT_ORDER, 'error_msg' => '未找到订单']);
        }
        //更新数据
        if ($orderLogic->editOrderImgData($order_profile_obj,$data,$user) === false) {
            return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入订单信息出错']);
        }


        $logLogic->addLog(2,$data,'跟单编辑',$order_profile_obj->toArray());
        return json(['error_code' => ErrorCode::SUCCESS]);
    }
    //详情
    public function orderDetail(OrderLogic $orderLogic,HuXingLogic $huXingLogic,AccountLogic $accountLogic)
    {
        $user = session('userInfo');
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        if( !$order = $orderLogic->getCompanyOrderDetail( ['order_no_accurate'=>$order_no],$user) ){
            $this->error('未找到该订单',null,'',1);
        }

		$orderLogic->setReceptionTime($order);
        //获取接待客服,设计师,项目经理,施工组的订单数量
        $order = $orderLogic->getUserOrderCount($order);
        //start-图片分成4类显示
        $houseimg[1] = []; //原始平面图
        $houseimg[2] = []; //原始结构图

        $orderarr =  $order->toArray();
        $orderarr['houseDesign'] = $orderarr['houseDesign']->toArray();
        if(count($orderarr['houseDesign'])>0){
            foreach ($orderarr['houseDesign'] as $val){
                $houseimg[$val['type']][] = $val;
            }
        }

        //end-图片分成2类显示
        $this->assign('houseimg', $houseimg);
		$this->assign('order', $order);
        $this->assign("build_sign", OrderStatus::BUILD_SIGN);
        $this->assign("order_no", $order_no);
        //add

        $this->assign("house_type", $huXingLogic->getList());
        $this->assign("order_status", OrderStatus::getAllStatus());
        $this->assign("build_status", BuildStatus::getAllStatus());
        $this->assign('reception', $accountLogic->projectUserList([],'',$order->manage->reception_id));
        $this->assign("designer", $accountLogic->projectUserList([],'',$order->manage->designer_id));
        return $this->fetch('detail_order');
    }


    public function buildDetailList(BuildLogic $buildLogic)
    {
        $user = session('userInfo');
        $data = Request::get();
        //页码设置
        $page_current = empty($data['page_current']) ? 2 : $data['page_current'];
        if(!$order_no = Request::get('order_no')){
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '订单号为空']);
        }
		$count = $buildLogic->countBuildRecord(['order_no'=>$order_no],$user);
		$total_page = ceil($count/10);
		$page = [
			'total_page'=>$total_page,
			'page_current'=>$page_current
		];
        $list = $buildLogic->selectBuildRecord(['order_no'=>$order_no],$user,$page_current,10);

        $this->assign("list", $list);
        $this->assign("count", $count);
        $this->assign("listPageIndex", $page_current-1);
        $this->assign("listPageCount", 10);
        $data = $this->fetch('order/detail_build_list');
		return json(['error_code' => ErrorCode::SUCCESS, 'data' =>$data,'page'=>$page]);
    }

    //跟单历史记录接口
    public function orderDetailList(BuildLogic $buildLogic)
    {
        $user = session('userInfo');
        $data = Request::get();
        //页码设置
        $page_current = empty($data['page_current']) ? 2 : $data['page_current'];
        if(!$order_no = Request::get('order_no')){
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '订单号为空']);
        }
        $OrderHistoryLogic = new OrdersHistoryLogic();
        $count = $OrderHistoryLogic->countOrderHistoryRecord(['order_no'=>$order_no]);
        $total_page = ceil($count/10);
        $page = [
            'total_page'=>$total_page,
            'page_current'=>$page_current
        ];
        $this->assign('total_page', $total_page);
        $list = $OrderHistoryLogic->selectOrderHistoryRecord(['order_no'=>$order_no],$page_current,10);

        $this->assign("list", $list);
        $this->assign("count", $count);
        $this->assign("listPageIndex", $page_current-1);
        $this->assign("listPageCount", 10);
        $data = $this->fetch('order/detail_order_history_list');
        return json(['error_code' => ErrorCode::SUCCESS, 'data' =>$data,'page'=>$page]);
    }

    public function materialDetail(MaterialLogic $materialLogic,huXingLogic $huXingLogic,accountLogic $accountLogic,OrderLogic $orderLogic)
    {
        $user = session('userInfo');
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        if( !$order = $orderLogic->getCompanyOrderDetail( ['order_no_accurate'=>$order_no],$user) ){
            $this->error('未找到该订单',null,'',1);
        }

        //获取接待客服,设计师的订单数量
        $order = $orderLogic->getUserOrderCount($order);

        $this->assign("order_no", $order_no);
        $this->assign("order", $order);
        $this->assign("house_type", $huXingLogic->getList());
        $reception = $accountLogic->projectUserList([],'',$order->manage->reception_id)->toArray();
        $this->assign('reception', $accountLogic->projectUserList([],'',$order->manage->reception_id));
        $this->assign("designer", $accountLogic->projectUserList([],'',$order->manage->designer_id));
        $list = $materialLogic->getOrderMaterialDetail(['order_no'=>$order_no],$user);
        $this->assign("list", $list);

        return $this->fetch('detail_material');
    }

    //跟单详情
    public function orderHistory(OrderLogic $orderLogic,HuXingLogic $huXingLogic,AccountLogic $accountLogic)
    {
        $user = session('userInfo');
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        if( !$order = $orderLogic->getCompanyOrderDetail( ['order_no_accurate'=>$order_no],$user) ){
            $this->error('未找到该订单',null,'',1);
        }
        $orderLogic->setReceptionTime($order);
        $order = $orderLogic->getUserOrderCount($order);
        $this->assign('order', $order);
        $this->assign("order_no", $order_no);
        $this->assign("build_sign", OrderStatus::BUILD_SIGN);
        $this->assign("house_type", $huXingLogic->getList());
        $this->assign('reception', $accountLogic->projectUserList([],'',$order->manage->reception_id));
        $this->assign("designer", $accountLogic->projectUserList([],'',$order->manage->designer_id));

        $OrderHistoryLogic = new OrdersHistoryLogic();
        $count = $OrderHistoryLogic->countOrderHistoryRecord(['order_no'=>$order_no]);
        $total_page = ceil($count/10);
        $this->assign('total_page', $total_page);
        $list = $OrderHistoryLogic->selectOrderHistoryRecord(['order_no'=>$order_no],1,10);
        $this->assign("list", $list);
        $this->assign("count", $count);
        $this->assign("listPageIndex", 0);
        $this->assign("listPageCount", 10);

        return $this->fetch('detail_order_history');
    }
    //跟单详情
    public function orderHistoryEdit(OrderLogic $orderLogic)
    {
        $user = session('userInfo');
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        if( !$order = $orderLogic->getCompanyOrderDetail( ['order_no_accurate'=>$order_no],$user) ){
            $this->error('未找到该订单',null,'',1);
        }
        $orderLogic->setReceptionTime($order);
        $this->assign('order', $order);
        $this->assign("order_no", $order_no);
        $this->assign("build_sign", OrderStatus::BUILD_SIGN);
        $OrderHistoryLogic = new OrdersHistoryLogic();
        $count = $OrderHistoryLogic->countOrderHistoryRecord(['order_no'=>$order_no]);
        $total_page = ceil($count/10);
        $this->assign('total_page', $total_page);
        $list = $OrderHistoryLogic->selectOrderHistoryRecord(['order_no'=>$order_no],1,10);
        $this->assign("list", $list);

        return $this->fetch('detail_order_history_edit');
    }



    /****************************************************************************************************************************************************/
    //施工管理
    public function shigong(OrderLogic $orderLogic,WorkergroupLogic $workergroupLogic,AccountLogic $accountLogic)
    {
        $user = session('userInfo');
        $data = Request::get();
        $this->assign("search_data", $data);
        //表单验证
        $validate = validate('order');
        if (!$validate->scene('search')->check($data)) {
            $this->error('输入内容不合法：' . $validate->getError(), null, '', 1);
        }
        //页码设置
        $page_size = empty($data['page_size']) ? 20 : $data['page_size'];
        $page_current = empty($data['p']) ? 1 : $data['p'];

        //数据查询
        //只查询施工状态的订单 8签订装修合同 9施工中 10延期单 11已竣工
        if(empty($data['state'])|| !in_array( $data['state'],[8,9,10,11])){
            $data['state'] = [8,9,10,11];
        }

        $list = $orderLogic->selectCompanyShigongOrder($data,$user, $page_current, $page_size);
//        var_dump($list->toArray());exit; //$list->toArray()[0]['order_account_link']
        $count = $orderLogic->countCompanyShigongOrder($data,$user);

        //分页
        $page = new Page($count, $page_size);
        $this->assign('list', $list);
        $this->assign('page', $page->show());

        //界面展示需要的额外数据
        //订单来源
        $this->assign('order_source', OrderSource::getAllSource());
        //订单状态
        $this->assign("order_status", OrderStatus::getAllShigongStatus());
        $this->assign("build_status", BuildStatus::getAllStatus());
        //获取项目经理
        $projectUser = $accountLogic->commonAccountSelectList($user);
        $this->assign('projectUser', $projectUser);
        //获取施工人员
        $workerUser = $accountLogic->getCommonWorkerAccountSelectList($user);
        $this->assign('workerUser', $workerUser);
        return $this->fetch();
    }

    //施工管理-施工信息
    public function buildDetail(BuildLogic $buildLogic)
    {
        $user = session('userInfo');
        $data = Request::get();
        //页码设置
        if(empty($data['order_no'])){
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '订单号为空']);
        }
        $count = $buildLogic->countBuildRecord(['order_no'=>$data['order_no']],$user);
        $total_page = ceil($count/10);
        $this->assign('total_page', $total_page);
        $list = $buildLogic->selectBuildRecord(['order_no'=>$data['order_no']],$user,1,10);
        $this->assign("list", $list);
        $this->assign("order_no", $data['order_no']);
        return $this->fetch('detail_build');
    }

    //施工管理-材料进销
    public function materialDetails(MaterialLogic $materialLogic,OrderLogic$orderLogic)
    {
        $user = session('userInfo');
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        if( !$order = $orderLogic->getCompanyOrderDetail( ['order_no_accurate'=>$order_no],$user) ){
            $this->error('未找到该订单',null,'',1);
        }
        //获取接待客服,设计师,项目经理,施工组的订单数量
        $order = $orderLogic->getUserOrderCount($order);

        $this->assign("order", $order);

        $this->assign("order_no", $order_no);

        $list = $materialLogic->getOrderMaterialDetail(['order_no'=>$order_no],$user);
        $this->assign("list", $list);

        return $this->fetch('detail_materials');
    }


}
