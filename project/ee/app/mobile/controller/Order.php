<?php
namespace app\mobile\controller;
use app\common\enums\ErrorCode;
use app\common\enums\OrderStatus;
use app\common\enums\StationStatus;
use app\common\model\logic\AccountLogic;
use app\common\model\logic\HouseDesignLogic;
use app\common\model\logic\HuXingLogic;
use app\common\model\logic\OrderLogic;
use app\common\model\logic\WorkergroupLogic;
use app\common\model\logic\OrdersHistoryLogic;
use think\facade\Request;
use app\common\controller\MobileCommonBase;
use app\common\model\logic\LogLogic;

/**
 * 移动端 跟单管理
 */
class Order extends MobileCommonBase
{

	//根据项目经理获取所管理的工作组
	public function managerWorkerGroup(AccountLogic $accountLogic, WorkergroupLogic $workergroupLogic)
	{
		if (!$manager_id = Request::get('manager_id')) {
			return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '缺少项目经理参数']);
		}
		$manager = $accountLogic->getEmployeeSelectList(['project_user' => $manager_id]);
		if (empty($manager)) {
			return json(['error_code' => ErrorCode::DATA_NOT_PROJECT_MANAGER, 'error_msg' => '该项目经理不存在']);
		}
		$group = $workergroupLogic->getWorkerGroupList(['project_user' => $manager_id]);
		return json(['error_code' => ErrorCode::SUCCESS, 'data' => $group]);
	}

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
		$logLogic->addLog(2,$data,'跟单编辑',$order_profile_obj->toArray());
		return json(['error_code' => ErrorCode::SUCCESS]);
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
		if (isset($data['house_design']) && count($data['house_design']) > 9) {
			return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '上传图片数量超限']);
		}
		//存储数据
		if ($orderLogic->addData($data,$user) === false) {
			return json(['error_code' => ErrorCode::SERVICE_MYSQL_ERROR, 'error_msg' => '数据库写入订单信息出错']);
		}
		$logLogic->addLog(1,$data,'跟单录入');
		return json(['error_code' => ErrorCode::SUCCESS]);

	}

    //跟单列表
    public function index(OrderLogic $orderLogic)
    {
        $user = session('userInfo');
        $search = Request::get('search');
        $data =[];
        if($search){
            $data['search'] = $search ;
        }
        $this->assign('search', $search);
		//特殊权限
		if($user['default_rule']==2){
			$data['project_manager']=$user['id'];
		}
		$this->assign("build_sign", OrderStatus::BUILD_SIGN);

		$list = $orderLogic->selectCompanyOrder($data,$user, 1, 10);
        $this->assign('list', $list);
        $this->assign('type', 1); //用于页面是否显示编辑和施工图
        return $this->fetch();
    }

    //施工列表
    public function shigong(OrderLogic $orderLogic)
    {
        $user = session('userInfo');
        $search = Request::get('search');
        $data =[];
        if($search){
            $data['search'] = $search ;
        }
        $this->assign('search', $search);
        //特殊权限
        if($user['default_rule']==2){
            $data['project_manager']=$user['id'];
        }
        $this->assign("build_sign", OrderStatus::BUILD_SIGN);
        //只查询施工状态的订单 8签订装修合同 9施工中 10延期单 11已竣工
        $data['state'] = [8,9,10,11];
        $list = $orderLogic->selectCompanyShigongOrder($data,$user, 1, 10);
        $this->assign('list', $list);
        $this->assign('type', 2); //用于页面是否显示编辑和施工图
        return $this->fetch();
    }

    //设计图新增过渡页


    public function indexList(OrderLogic $orderLogic)
    {
        $user = session('userInfo');
        $page_current = Request::get('page_current',2);
        $search = Request::get('search');
        $data =[];
        if($search){
            $data['search'] = $search ;
        }
		//特殊权限
		if($user['default_rule']==2){
			$data['project_manager']=$user['id'];
		}
		$this->assign("build_sign", OrderStatus::BUILD_SIGN);
		$list = $orderLogic->selectCompanyOrder($data,$user, $page_current, 10);
        $this->assign("list", $list);
        $this->assign("type", 1);
        $data = $this->fetch('order/index_list');
        return json(['error_code' => ErrorCode::SUCCESS, 'data' =>$data]);
    }

    public function shigongList(OrderLogic $orderLogic)
    {
        $user = session('userInfo');
        $page_current = Request::get('page_current',2);
        $search = Request::get('search');
        $data =[];
        if($search){
            $data['search'] = $search ;
        }
        //特殊权限
        if($user['default_rule']==2){
            $data['project_manager']=$user['id'];
        }
        $this->assign("build_sign", OrderStatus::BUILD_SIGN);
        $list = $orderLogic->selectCompanyShigongOrder($data,$user, $page_current, 10);
        $this->assign("list", $list);
        $this->assign("type", 2);
        $data = $this->fetch('order/index_list');
        return json(['error_code' => ErrorCode::SUCCESS, 'data' =>$data]);
    }
    //添加
    public function add(AccountLogic $accountLogic,HuXingLogic $huXingLogic)
    {
		$this->assign('reception',$accountLogic->projectUserList([]));
		$this->assign("designer", $accountLogic->projectUserList([]));
		$this->assign("project_manager", $accountLogic->projectUserList([],StationStatus::DEFAULT_RULE_XMJL));
		$this->assign("house_type", $huXingLogic->getList());

		return $this->fetch();
    }

    //编辑
    public function edit(OrderLogic $orderLogic,HuXingLogic $huXingLogic,AccountLogic $accountLogic,WorkergroupLogic $workergroupLogic){
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        $user = session('userInfo');
        if( !$order = $orderLogic->getCompanyOrder(['order_no_accurate'=>$order_no],$user) ){
            $this->error('未找到该订单',null,'',1);
        }
		$orderLogic->setReceptionTime($order);

		//界面展示需要的额外数据
        $this->assign("house_type", $huXingLogic->getList());
		$this->assign("project_manager", $accountLogic->projectUserList([],StationStatus::DEFAULT_RULE_XMJL));
        $this->assign('reception',$accountLogic->projectUserList([]));
        $this->assign("designer", $accountLogic->projectUserList([]));
		$this->assign('order', $order);
        return $this->fetch();
    }

    //详情
    public function detail(OrderLogic $orderLogic){
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
		$this->assign('order', $order);
        return $this->fetch();
    }

    //施工详情
    public function shigongdetail(OrderLogic $orderLogic){
        $user = session('userInfo');
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        if( !$order = $orderLogic->getCompanyOrderDetail( ['order_no_accurate'=>$order_no],$user) ){
            $this->error('未找到该订单',null,'',1);
        }
        $orderLogic->setReceptionTime($order);
//        dump($order);exit;
        //获取
//        $orderLogic->getCompanyOrderAccount();
        $this->assign('order', $order);
        return $this->fetch();
    }

    //施工人员
    public function shigongrenyuan(OrderLogic $orderLogic,AccountLogic $accountLogic){
        $user = session('userInfo');
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        if( !$order = $orderLogic->getCompanyOrderDetail( ['order_no_accurate'=>$order_no],$user) ){
            $this->error('未找到该订单',null,'',1);
        }
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

        $this->assign('project_user', $projectUser);
        $this->assign('worker_select',$workerUser);
        $this->assign('worker_choose',$chooseWorkerUser);
        $this->assign('worker_type', $order['manage']['worker_type']);
        $this->assign('order', $order);
        return $this->fetch();
    }

    public function shigongrenyuanSave(AccountLogic $accountLogic)
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
            return json(['error_code' => ErrorCode::SUCCESS, 'info' => $workerInfo]);
        } else {
            return json(['error_code' => $status['error_code'], 'error_msg' => $status['error_msg']]);
        }
    }

    //过渡到设计图
    public function toHouseDesign(OrderLogic $orderLogic){
        $user = session('userInfo');
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        $order = $orderLogic->getCompanyOrderSample(['order_no_accurate'=>$order_no],$user);
        if($order == null){
            $this->error('异常请求未找到订单信息',null,'',1);
        }
        $this->assign('order',$order);
        return $this->fetch('todesigndraw');
    }

    //设计图
    public function houseDesign(OrderLogic $orderLogic){
        $user = session('userInfo');
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        $order = $orderLogic->getCompanyOrderSample(['order_no_accurate'=>$order_no],$user);
        if($order == null){
            $this->error('异常请求未找到订单信息',null,'',1);
        }
        $this->assign('order', $order);
        if(!$type = Request::get('type')){
            $this->error('异常请求',null,'',1);
        }
        if(!in_array($type,[1,2,3,4])){
            $this->error('异常请求',null,'',1);
        }

        if($type == 1){
            $title = '设计图';
        }else{
            $title = '效果图';
        }

        $design = $orderLogic->getHouseDesign($order,$type);
        $this->assign('title', $title);
        $this->assign('type', $type);
        $this->assign('design', $design);
        return $this->fetch('designdraw');
    }
    //删除设计图
    public function delHouseDesign(HouseDesignLogic $houseDesignLogic){
        $user = session('userInfo');
        if(!$design_id = Request::post('design_id')){
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '设计图标识不存在']);
        }
        $design_obj = $houseDesignLogic->getDesignOrder(['design_id'=>$design_id],$user);
        if($design_obj == null){
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '异常请求']);
        }
        $houseDesignLogic->delDesign($design_obj);
        return json(['error_code' => ErrorCode::SUCCESS,]);

    }

    // 上传设计图页面
    public function houseDesignAdd(HouseDesignLogic $houseDesignLogic){
		if(!$order_no = Request::get('order_no')){
			$this->error('异常请求',null,'',1);
		}
        if(!$type = Request::get('type')){
            $this->error('异常请求',null,'',1);
        }
        if(!in_array($type,[1,2,3,4])){
            $this->error('异常请求',null,'',1);
        }

        $this->assign('type', $type);
		$this->assign('order_no', $order_no);
		$number = $houseDesignLogic->countDesign(['order_no'=>$order_no,'type'=>$type]);
		$this->assign('number', $number);
		return $this->fetch('uploadpic');
    }

    public function houseDesignAddDo(OrderLogic $orderLogic){
		$data = Request::post();
		//表单验证
		$validate = validate('order');
		if (!$validate->scene('houseDesign')->check($data)) {
			return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => $validate->getError()]);
		}
		if (isset($data['house_design']) && count($data['house_design']) > 9) {
			return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '上传图片数量超限']);
		}
		$user = session('userInfo');
		$order_obj = $orderLogic->getCompanyOrderSample(['order_no_accurate'=>$data['order_no']],$user);
		if($order_obj ==null){
			return json(['error_code' => ErrorCode::DATA_NOT_ORDER, 'error_msg' => '未找到订单']);
		}

		$orderLogic->addHouseDesign($order_obj,$data);
		return json(['error_code' => ErrorCode::SUCCESS]);

	}


    // 业主反馈
    public function feedback(){
        return $this->fetch();
    }


    //跟单详情
    public function orderHistory(OrderLogic $orderLogic)
    {
        $user = session('userInfo');
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        if( !$order = $orderLogic->getCompanyOrderDetail( ['order_no_accurate'=>$order_no],$user) ){
            $this->error('未找到该订单',null,'',1);
        }
        $orderLogic->setReceptionTime($order);
        $this->assign('qz_order', $order['qz_order']);
        $this->assign("order_no", $order_no);
        $this->assign("order", $order);
        $OrderHistoryLogic = new OrdersHistoryLogic();
        $count = $OrderHistoryLogic->countOrderHistoryRecord(['order_no'=>$order_no]);
        $total_page = ceil($count/10);
        $this->assign('total_page', $total_page);
        $list = $OrderHistoryLogic->selectOrderHistoryRecord(['order_no'=>$order_no],1,$count);
        $this->assign("list", $list);
        $this->assign("count", $count);
        $this->assign("listPageIndex", 0);
        $this->assign("listPageCount", $count);
        return $this->fetch();
    }
    
}
