<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/13
 * Time: 16:24
 */
namespace app\mobile\controller;

use app\common\controller\MobileCommonBase;
use app\common\enums\BuildStatus;
use app\common\enums\ErrorCode;
use app\common\model\logic\BuildLogic;
use app\common\model\logic\LogLogic;
use app\common\model\logic\OrderLogic;
use app\common\validate\Buid;
use think\facade\Request;

/**
 * 施工模块管理
 * Class Order
 * @package app\index\controller
 */
class Build extends MobileCommonBase
{
	public function delUnit(BuildLogic $buildLogic,LogLogic $logLogic){
		$user = session('userInfo');
		//表单验证
		if (!$build_id = Request::post('build_id')) {
			return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '异常操作-没有施工记录标识']);
		}
		$build_obj = $buildLogic->getBuildRecord(['build_id'=>$build_id],$user);
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

	//施工信息添加接口
	public function addDo(OrderLogic $orderLogic,BuildLogic $buildLogic,LogLogic $logLogic)
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
    //编辑施工信息页面
    public function index(BuildLogic $buildLogic,OrderLogic $orderLogic)
    {
        $user = session('userInfo');
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        $order_profile_obj = $orderLogic->getCompanyOrderProfile(['order_no_accurate'=>$order_no],$user);
        if($order_profile_obj == null){
            $this->error('异常请求未找到订单',null,'',1);
        }
        $this->assign("order", $order_profile_obj->toArray());
//        $this->assign("build_status", BuildStatus::getAllStatus());
        $list = $buildLogic->selectBuildRecord(['order_no'=>$order_no],$user,1,10);
        $this->assign("list", $list);
        return $this->fetch();
    }

    public function listRecord(BuildLogic $buildLogic){
        $user = session('userInfo');
        $data = Request::get();
        //页码设置
        $page_current = empty($data['page_current']) ? 1 : $data['page_current'];
        if(empty($data['order_no'])){
            return json(['error_code' => ErrorCode::FORM_ILLEGAL, 'error_msg' => '订单号为空']);
        }
        //todo 测试代码
        $list = $buildLogic->selectBuildRecord(['order_no'=>$data['order_no']],$user,$page_current,10);
        $this->assign("list", $list);
        $data = $this->fetch('build/index_list');
        return json(['error_code' => ErrorCode::SUCCESS, 'data' =>$data]);
    }

    // 上传施工图页面
    public function add(){
        if(!$order_no = Request::get('order_no')){
            $this->error('异常请求',null,'',1);
        }
        $this->assign('order_no', $order_no);
        $build_state = Request::get('build_state');
		$this->assign('build_state', $build_state);
		$this->assign('build_state_name', BuildStatus::getStatusName($build_state));

		$this->assign('build_status', BuildStatus::getAllStatus());
        return $this->fetch('build_add');
    }

	//获取验收不合格信息
	public function shigongfail(BuildLogic $buildLogic){
		if(!$build_no = Request::get('build_no')){
			$this->error('异常请求',null,'',1);
		}
		$info = $buildLogic->selectCheckStateInfo(['id'=>$build_no])->toArray();

		$this->assign('info',$info[0]);
		return $this->fetch();
	}


}
