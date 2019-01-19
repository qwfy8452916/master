<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/7
 * Time: 10:50
 */

namespace app\common\model\logic;

use app\common\enums\BuildStatus;
use app\common\enums\OrderSource;
use app\common\enums\OrderStatus;
use app\common\enums\StationStatus;
use app\common\model\db\BuildLog;
use app\common\model\db\EndRecord;
use app\common\model\db\FinishRecord;
use app\common\model\db\FollowOrder;
use app\common\model\db\HouseDesign;
use app\common\model\db\Orders;
use app\common\model\db\OrdersHistory;
use app\common\model\db\OrdersManage;
use app\common\model\db\Reception;
use app\common\model\db\SignOrder;
use Think\Db;
use think\db\Where;

class OrderLogic
{

	public function setReceptionTime($order_obj){

		if($order_obj->manage->reception_time == 0){
			$update = [
				'reception_time' => time(),
			];
			$map = [
				'order_no'=>$order_obj->order_no
			];
			OrdersManage::update($update,$map);
		}

		return true;
	}

    public function addData($data, $user)
    {
        $order_profile_obj = new Orders();
        $data['company_id'] = $user['company_id'];
        $data['order_no'] = getOrderNo(3);
        $data['add_time'] = time();
		$data['reception_time'] = time();
		$data['source'] = OrderSource::OTHER;
        $obj = $this->addOrderProfie($order_profile_obj, $data, $user);
        //添加小程序需要的消息记录 //李斌
        if(!empty($data['project_manager']) && !empty($obj)){
            $savenews = array();
            $savenews['order_no'] = $obj['order_no'];
            $savenews['comid'] = $data['company_id'];
            $savenews['consumer_tel'] = $data['consumer_tel']?$data['consumer_tel']:'';
            $savenews['project_manager'] = $data['project_manager'];
            $this->addOrdersNews($savenews,3); // 3表示分配负责人
        }
        //house_design 去掉添加页的设计图上传
//        $obj['count_design'] = 0;
//        $this->addHouseDesign($obj, $data);
        return true;
    }

    //添加消息记录操作 // 李斌
    public function addOrdersNews($savenews,$type=1){
        $savenews['type'] = $type;
        //1表示装修记录更新。 2表示上传设计图， 3表示分配负责人
        if($type == 2){
            $cominfo = Db::name('user')->where('id',$savenews['comid'])->field('id,user,jc')->find();
            $savenews['remark'] = $cominfo['jc'].'为您上传了设计图稿哦~';
            $savenews['add_time'] = time();
            Db::name('yxb_order_news')->strict(false)->insert($savenews);
        }elseif($type == 3){
            $cominfo = Db::name('user')->where('id',$savenews['comid'])->field('id,user,jc')->find();
            $projectinfo = Db::name('yxb_account')->where('id',$savenews['project_manager'])->field('id,contact_name')->find();
            $savenews['remark'] = $cominfo['jc'].'为您分配了项目经理-'.$projectinfo['contact_name'];
            $savenews['add_time'] = time();
            Db::name('yxb_order_news')->strict(false)->insert($savenews);
        }
        return  true;
    }

    public function editOrderData($order_profile_obj, $data, $user)
    {
        $obj = $this->updateOrderProfie($order_profile_obj, $data, $user);
        if(isset($data['house_design'])){
            $house_design_obj = $obj->houseDesign()->select();
            $obj['count_design'] = count($house_design_obj);
            if ($house_design_obj != null) {
            $this->delHouseDesign($obj);
        }
        $this->addHouseDesign($obj, $data);
        }
        return true;
    }
    public function addOrderProfie($order_profile_obj, $data, $user = []){
        //记录订单状态用户端变化日志
            $this->writeConsumerOrderLog($order_profile_obj, $data, $user);
        if (!empty($data['company_id'])) {
            $order_profile_obj->company_id = $data['company_id'];
        }
        if (!empty($data['order_no'])) {
            $order_profile_obj->order_no = $data['order_no'];
        }
        if (!empty($data['add_time'])) {
            $order_profile_obj->add_time = $data['add_time'];
        }
        if (!empty($data['source'])) {
            $order_profile_obj->source = $data['source'];
        }
        $order_profile_obj->consumer_name = $data['consumer_name'];
        $order_profile_obj->consumer_tel = $data['consumer_tel'];
        $order_profile_obj->consumer_wx_no = empty($data['consumer_wx_no']) ? '': $data['consumer_wx_no'];
        $order_profile_obj->house_type = empty($data['house_type']) ? '' : $data['house_type'];
        $order_profile_obj->house_area = empty($data['house_area']) ? 0 : $data['house_area'];
        $order_profile_obj->build_address = empty($data['build_address']) ? '' : $data['build_address'];
        $order_profile_obj->link_address = empty($data['link_address']) ? '' : $data['link_address'];
		$order_profile_obj->publish_time = time();
        //e.1.1.2 ERP-前台部分模块调整 添加小区字段
        $order_profile_obj->xiaoqu = empty($data['xiaoqu'])?'':$data['xiaoqu'];
		//ordermanager
        $manage = new OrdersManage();
        $order_profile_obj->manage = $manage;
        $order_profile_obj->manage->state = $data['state'];
        $order_profile_obj->manage->company_id = $data['company_id'];
        $order_profile_obj->manage->reception_id = empty($data['reception_id']) ? 0 : $data['reception_id'];
        if (!empty($data['build_state'])) {
            $order_profile_obj->manage->build_state = $data['build_state'];
        }
        $order_profile_obj->manage->designer_id = empty($data['designer_id']) ? 0 : $data['designer_id'];
        $order_profile_obj->manage->project_manager = empty($data['project_manager']) ? 0 : $data['project_manager'];
        $order_profile_obj->manage->build_group = empty($data['build_group']) ? 0 : $data['build_group'];


		$order_profile_obj->manage->reception_time = time();
        if ($data['state'] == 3) {
            $order_profile_obj->manage->order_time = strtotime(empty($data['order_time']) ? '' : $data['order_time']);
        } else if ($data['state'] == 5) {
            $order_profile_obj->manage->lf_time = strtotime(empty($data['lf_time']) ? '' : $data['lf_time']);
        }else if ($data['state'] == 8) {
            $order_profile_obj->manage->qiandan_jine = empty($data['qiandan_jine']) ? 0 : $data['qiandan_jine'];
        }else if($data['state'] == 9){
            $order_profile_obj->manage->kaigong_time = time();
        }
		$order_profile_obj->manage->remark = empty($data['order_remark']) ? '' : $data['order_remark'];

        $order_profile_obj->together('manage')->save();
        $data['order_no'] = $order_profile_obj['order_no'];
        $this->addHistory($data,$user);
        return $order_profile_obj;
    }

    public function updateOrderProfie($order_profile_obj, $data, $user = [])
    {
        //记录订单状态用户端变化日志
        $this->writeConsumerOrderLog($order_profile_obj, $data, $user);
        if (!empty($data['company_id'])) {
            $order_profile_obj->company_id = $data['company_id'];
        }
        if (!empty($data['order_no'])) {
            $order_profile_obj->order_no = $data['order_no'];
        }
        if (!empty($data['add_time'])) {
            $order_profile_obj->add_time = $data['add_time'];
        }
        if (!empty($data['source'])) {
            $order_profile_obj->source = $data['source'];
        }
        $order_profile_obj->consumer_name = $data['consumer_name'];
        $order_profile_obj->consumer_tel = $data['consumer_tel'];
        $order_profile_obj->xiaoqu = empty($data['xiaoqu']) ? '': $data['xiaoqu'];
        $order_profile_obj->consumer_wx_no = empty($data['consumer_wx_no']) ? '': $data['consumer_wx_no'];
        $order_profile_obj->house_type = empty($data['house_type']) ? '' : $data['house_type'];
        $order_profile_obj->house_area = empty($data['house_area']) ? 0 : $data['house_area'];
        $order_profile_obj->build_address = empty($data['build_address']) ? '' : $data['build_address'];
        $order_profile_obj->link_address = empty($data['link_address']) ? '' : $data['link_address'];
        //ordermanager

        $order_profile_obj->manage->state = $data['state'];
        $order_profile_obj->manage->reception_id = empty($data['reception_id']) ? 0 : $data['reception_id'];
        if (!empty($data['build_state'])) {
            $order_profile_obj->manage->build_state = $data['build_state'];
        }
        $order_profile_obj->manage->designer_id = empty($data['designer_id']) ? 0 : $data['designer_id'];
        $order_profile_obj->manage->project_manager = empty($data['project_manager']) ? 0 : $data['project_manager'];
        $order_profile_obj->manage->build_group = empty($data['build_group']) ? 0 : $data['build_group'];
        if ($data['state'] == 3) {
            $order_profile_obj->manage->order_time = strtotime(empty($data['order_time']) ? '' : $data['order_time']);
        } else if ($data['state'] == 5) {
            $order_profile_obj->manage->lf_time = strtotime(empty($data['lf_time']) ? '' : $data['lf_time']);
        }else if ($data['state'] == 8) {
            $order_profile_obj->manage->qiandan_jine = empty($data['qiandan_jine']) ? 0 : $data['qiandan_jine'];
        }
        $order_profile_obj->manage->remark = empty($data['order_remark']) ? '' : $data['order_remark'];

        $order_profile_obj->together('manage')->save();
        $data['order_no'] = $order_profile_obj['order_no'];
        $this->addHistory($data,$user);
        return $order_profile_obj;
    }

    //跟单添加
    public function editOrderStateData($order_profile_obj, $data, $user = [])
    {
        //记录订单状态用户端变化日志
        $this->writeConsumerOrderLog($order_profile_obj, $data, $user);
        if (!empty($data['company_id'])) {
            $order_profile_obj->company_id = $data['company_id'];
        }
        if (!empty($data['order_no'])) {
            $order_profile_obj->order_no = $data['order_no'];
        }
        if (!empty($data['add_time'])) {
            $order_profile_obj->add_time = $data['add_time'];
        }
        if (!empty($data['source'])) {
            $order_profile_obj->source = $data['source'];
        }

        //ordermanager
        $order_profile_obj->manage->state = $data['state'];
        if ($data['state'] == 3) {
            $order_profile_obj->manage->order_time = strtotime(empty($data['order_time']) ? '' : $data['order_time']);
        } else if ($data['state'] == 5) {
            $order_profile_obj->manage->lf_time = strtotime(empty($data['lf_time']) ? '' : $data['lf_time']);
        }else if ($data['state'] == 8) {
            $order_profile_obj->manage->qiandan_jine = empty($data['qiandan_jine']) ? 0 : $data['qiandan_jine'];
        }else if($data['state'] == 9){
            $order_profile_obj->manage->kaigong_time = time();
        }
        $order_profile_obj->manage->remark = empty($data['order_remark']) ? '' : $data['order_remark'];

        $order_profile_obj->together('manage')->save();
        $data['order_no'] = $order_profile_obj['order_no'];
        $this->addHistory($data,$user);
        return $order_profile_obj;
    }
    //基本信息编辑
    public function editOrderBasicData($order_profile_obj, $data, $user = [])
    {
        if (!empty($data['order_no'])) {
            $order_profile_obj->order_no = $data['order_no'];
        }
        if (!empty($data['add_time'])) {
            $order_profile_obj->add_time = $data['add_time'];
        }

        $order_profile_obj->consumer_name = $data['consumer_name'];
        $order_profile_obj->consumer_tel = empty($data['consumer_tel'])?'':$data['consumer_tel'];
        $order_profile_obj->consumer_wx_no = empty($data['consumer_wx_no']) ? '': $data['consumer_wx_no'];
        $order_profile_obj->house_type = empty($data['house_type']) ? '' : $data['house_type'];
        $order_profile_obj->house_area = empty($data['house_area']) ? 0 : $data['house_area'];
        $order_profile_obj->build_address = empty($data['build_address']) ? '' : $data['build_address'];
        $order_profile_obj->link_address = empty($data['link_address']) ? '' : $data['link_address'];
        $order_profile_obj->xiaoqu = empty($data['xiaoqu']) ? '' : $data['xiaoqu'];
        $order_profile_obj->manage->reception_id = empty($data['reception_id']) ? 0 : $data['reception_id'];
        $order_profile_obj->manage->designer_id = empty($data['designer_id']) ? 0 : $data['designer_id'];

        $order_profile_obj->together('manage')->save();
        $data['order_no'] = $order_profile_obj['order_no'];
//        $this->addHistory($data,$user);
        return $order_profile_obj;
    }
    //人员信息编辑
//    public function editOrderUserData($order_profile_obj, $data, $user = [])
//    {
//        if (!empty($data['order_no'])) {
//            $order_profile_obj->order_no = $data['order_no'];
//        }
//        if (!empty($data['add_time'])) {
//            $order_profile_obj->add_time = $data['add_time'];
//        }
//
//        //ordermanager
//        $order_profile_obj->manage->reception_id = empty($data['reception_id']) ? 0 : $data['reception_id'];
//        $order_profile_obj->manage->designer_id = empty($data['designer_id']) ? 0 : $data['designer_id'];
//        $order_profile_obj->manage->project_manager = empty($data['project_manager']) ? 0 : $data['project_manager'];
//        $order_profile_obj->manage->build_group = empty($data['build_group']) ? 0 : $data['build_group'];
//
//        $order_profile_obj->together('manage')->save();
//        $data['order_no'] = $order_profile_obj['order_no'];
////        $this->addHistory($data,$user);
//        return $order_profile_obj;
//    }
    //图片信息编辑
    public function editOrderImgData($order_profile_obj, $data,$user){
        if(isset($data['house_design'])){
            $house_design_obj = $order_profile_obj->houseDesign()->select();
            $order_profile_obj['count_design'] = count($house_design_obj);
            $order_profile_obj['type'] = $data['type'];
            if ($house_design_obj != null) {
                $this->delHouseDesign($order_profile_obj);
            }
            $this->addHouseDesign($order_profile_obj, $data);
        }
        return true;
    }


    public function addHistory($data, $user)
    {
        $orderHistoryNew = OrdersHistory::where('order_no', $data['order_no'])->order(['add_time'=>'desc'])
            ->find();

        if(!empty($orderHistoryNew)) {
            if(isset( $data['state'])||isset($data['order_remark'])||isset($data['order_time'])||isset($data['lf_time'])||isset($data['qiandan_jine'])){
                if (!($orderHistoryNew->getData('status') == $data['state'] && $orderHistoryNew->getData('remark') == $data['order_remark'] && $orderHistoryNew->getData('order_time') == strtotime($data['order_time']) && $orderHistoryNew->getData('lf_time') == strtotime($data['lf_time']) && $orderHistoryNew->getData('qiandan_jine') == $data['qiandan_jine'])) {
                    $orderHistory = new OrdersHistory();
                    $orderHistory->status = $data['state'];
                    $orderHistory->order_no = $data['order_no'];
                    $orderHistory->contact_name = $user['contact_name'];
                    $orderHistory->station = $user['station'];
                    $orderHistory->remark = empty($data['order_remark']) ? '' : $data['order_remark'];
                    if ($data['state'] == 3) {
                        $orderHistory->order_time = strtotime(empty($data['order_time']) ? '' : $data['order_time']);
                    } else if ($data['state'] == 5) {
                        $orderHistory->lf_time = strtotime(empty($data['lf_time']) ? '' : $data['lf_time']);
                    }else if ($data['state'] == 8) {
                        $orderHistory->qiandan_jine =  empty($data['qiandan_jine']) ? '' : $data['qiandan_jine'];
                    }
                    $orderHistory->account_id = $user['id'];
                    $orderHistory->add_time = time();

                    if ($orderHistory->save() == false) {
                        return array('status' => 0, 'info' => '更新订单签单失败');
                    }else {
                        return array('status' => 1, 'info' => '更新订单签单成功');
                    }
                }
            }
        }else{
            $orderHistory = new OrdersHistory();
            $orderHistory->status = $data['state'];
            $orderHistory->order_no = $data['order_no'];
            $orderHistory->contact_name = $user['contact_name'];
            $orderHistory->station = $user['station'];
            $orderHistory->remark = empty($data['order_remark']) ? '' : $data['order_remark'];
            if ($data['state'] == 3) {
                $orderHistory->order_time = strtotime(empty($data['order_time']) ? '' : $data['order_time']);
            } else if ($data['state'] == 5) {
                $orderHistory->lf_time = strtotime(empty($data['lf_time']) ? '' : $data['lf_time']);
            }else if ($data['state'] == 8) {
                $orderHistory->qiandan_jine =  empty($data['qiandan_jine']) ? '' : $data['qiandan_jine'];
            }
            $orderHistory->account_id = $user['id'];
            $orderHistory->add_time = time();

            if ($orderHistory->save() == false) {
                return array('status' => 0, 'info' => '更新订单签单失败');
            }else {
                return array('status' => 1, 'info' => '更新订单签单成功');
            }
        }

    }

    //仅处理已量房
    public function editCompanyReviewDataByLiangfang($data){
	    $info = $this->getOrderInfo($data['order_no']);
        $data['company_id'] = $this->getYxbOrderComid($data['order_no']);

	    //已量房
        $reviewData['lf_time'] = strtotime(empty($data['lf_time']) ? '' : $data['lf_time']);
        $reviewData['status'] = 1;
        $reviewData['vip_channel'] = 1;
        $reviewData['time'] = time();
        $reviewData['remark'] = $data['order_remark'];
        $reviewData['comid'] = $data['company_id'];
        if ($info) {
            $map = array(
                "orderid" => array("EQ", $info['orderid']),
                "comid" => array("EQ", $data['company_id'])
            );
            $reviewResult =  Db::name("order_company_review")->where($map)->update($reviewData);
        } else {
            return array("status" => 0, 'error_code'=> 500002,'msg' => '操作失败');
        }
        if ($reviewResult !== false) {
            return ["status" => 1, 'error_code'=> 1,'msg' => '操作成功'];
        }else{
            return ["status" => 0, 'error_code'=> 500002,'msg' => '操作失败'];
        }


    }

    public function editCompanyReviewData($data, $user)
    {
            $company_review_logic_obj = new CompanyReviewLogic();
            $info = $company_review_logic_obj->getInfo($data['order_no'], $data['company_id']);

            if ($data['state'] == 3) {
                $reviewData['status'] = 1;
            } else if ($data['state'] == 5) {
                $reviewData['lf_time'] = strtotime(empty($data['lf_time']) ? '' : $data['lf_time']);
                $reviewData['status'] = 2;
            }else if ($data['state'] == 6) {
                $reviewData['remark'] =  empty($data['order_remark']) ? '' : $data['order_remark'];
                $reviewData['status'] = 3;
            }else if ($data['state'] == 8) {
                $reviewData['status'] = 4;
            }
            $reviewData['remark'] = $data['order_remark'];
            $reviewData['time'] = time();
            $reviewData['comid'] = $data['company_id'];
            $reviewData['orderid'] = $data['order_no'];
            if (count($info) > 0) {
                $map = array(
                    "orderid" => array("EQ", $data['order_no']),
                    "comid" => array("EQ", $data['company_id'])
                );
                $reviewResult =  M("order_company_review")->where($map)->save($reviewData);
            } else {
                $reviewResult = M("order_company_review")->add($reviewData);
            }
            //
            if ($reviewResult !== false) {
                return array("status" => 1, 'error_code'=> ErrorCode::DATA_NOT_ORDER,'msg' => '操作成功');
            }else{
                return array("status" => 0, 'error_code'=> ErrorCode::DATA_NOT_ORDER,'msg' => '操作成功');
            }
    }
    public function writeConsumerOrderLog($order_profile_obj, $data, $user)
    {
        if(!empty($order_profile_obj->getData())){
            $order_no =$order_profile_obj->getData('order_no');
            $order_manage = $order_profile_obj->manage()->find();
            if ($order_manage->getData('state') == $data['state']) {
                return true;
            }
        }else{
            $order_no = $data['order_no'];
        }
        $insert_data = [
            'account_id' => $user['id'],
            'add_time' => time(),
            'order_no'=>$order_no,
			'contact_name'=>empty($user['contact_name'])?'':$user['contact_name'],
            'station'=>empty($user['station'])?'':$user['station'],
		];
        if (in_array($data['state'], OrderStatus::RECEPTION)) {
            Reception::create($insert_data);
        } elseif (in_array($data['state'], OrderStatus::FOLLOW)) {
            $insert_data['state'] = $data['state'];
            FollowOrder::create($insert_data);
        } elseif (in_array($data['state'], OrderStatus::ORDER_SIGN)) {
			SignOrder::create($insert_data);
		}elseif (in_array($data['state'],OrderStatus::ORDER_BUILDING)){
			$insert_data['state'] = $data['state'];
			BuildLog::create($insert_data);
        } elseif (in_array($data['state'], OrderStatus::ORDER_END)) {
            EndRecord::create($insert_data);
        } elseif (in_array($data['state'], OrderStatus::ORDER_OVER)) {
            FinishRecord::create($insert_data);
        }
        return true;
    }


    public function addHouseDesign($order_obj, $data)
    {
        if (!empty($data['house_design'])){
            $house_design_data = [];
            foreach ($data['house_design'] as $k => $v) {
                $house_design_data[$k]['img'] = $v['img'];
                $house_design_data[$k]['title'] = empty($v['title']) ? '' : $v['title'];
                $house_design_data[$k]['type'] = $data['type'];
            }

            $order_obj->houseDesign()->saveAll($house_design_data);

            //添加订单消息表记录。  //edit:李斌
            if(isset($order_obj['count_design'])){
                $where[] = ['order_no','EQ',$order_obj['order_no']];
                $where[] = ['type','EQ',$data['type']];
                $design_count = Db::name('yxb_house_design')->where($where)->count();
                if($order_obj['count_design'] < $design_count){
                    $savenews = array();
                    $savenews['order_no'] = $order_obj['order_no'];
                    $savenews['comid'] = $order_obj['company_id'];
                    $savenews['consumer_tel'] = $order_obj['consumer_tel']?$order_obj['consumer_tel']:'';
                    $savenews['project_manager'] = isset($data['project_manager'])?$data['project_manager']:'';
                    $this->addOrdersNews($savenews,2); //2表示上传设计图
                }
            }
        }
        return true;
    }


    public function getHouseDesign($order_obj,$type){
        return $order_obj->houseDesign()->where(['type'=>$type])->select();
    }

    public function delHouseDesign($order_profile_obj)
    {
        HouseDesign::where(['order_no' => $order_profile_obj->order_no,'type'=>$order_profile_obj->type])->delete();
        return true;
    }

    /**
     * 根据条件查询简单订单信息 (根据业主名字获取订单数据)
     * author: mcj
     * @param $data
     * @param array $user
     * @return array|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function searchOrderSample($data, $user = [])
    {
        if ($user) {
        	$data['company_id'] = $user['company_id'];
            if($user['default_rule'] == StationStatus::DEFAULT_RULE_XMJL){
            	$data['project_manager'] = $user['id'];
			}
        }
        $map = $this->setMap($data);
        if (isset($data['order_no_accurate'])) {
        return Orders::withJoin('manage', 'INNER')->where($map)
                ->append(['huXing'])
                ->find();
        }
		return Orders::withJoin('manage', 'INNER')->where($map)
			->append(['huXing'])
			->select();
    }


    public function getCompanyOrderSample($data, $user = [])
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }
        $map = $this->setMap($data);
        return Orders::where($map)
            ->find();
    }

    public function getCompanyOrderProfile($data, $user = [])
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }
        $with = [];
        return $this->_getOrder($data, $with);
    }

    public function getCompanyOrderDetail($data, $user = [])
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }
        $with = ['receptionAccount', 'designerAccount', 'houseDesign','huXing'];
        $result =  $this->_getOrder($data, $with);
        $result->orderAccountLink;
        return $result;
    }
    public function getCompanyOrderAccount($data, $user = [])
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }
        $with = ['receptionAccount', 'designerAccount', 'houseDesign','huXing'];
        $result =  $this->_getOrder($data, $with);
        return $result;
    }

    public function getCompanyOrder($data, $user = [])
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }
        $with = ['houseDesign'];
        return $this->_getOrder($data, $with);
    }


    /**
     * 获取装修公司的订单信息
     * author: mcj
     * @param $data
     * @param array $user
     * @param $page_current
     * @param $page_size
     * @return array|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function selectCompanyOrder($data, $user = [], $page_current, $page_size)
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }
        $skip = ($page_current - 1) * $page_size;
        return $this->selectOrder($data, $skip, $page_size);
    }

    /**
     * 获取装修公司的订单信息
     * author: mcj
     * @param $data
     * @param array $user
     * @param $page_current
     * @param $page_size
     * @return array|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function selectCompanyShigongOrder($data, $user = [], $page_current, $page_size)
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }
        $skip = ($page_current - 1) * $page_size;
        return $this->selectShigongOrder($data, $skip, $page_size);
    }

    

    /**
     * 计算装修公司的订单数量
     * author: mcj
     * @param $data
     * @param array $user
     * @return float|string
     */
    public function countCompanyOrder($data, $user = [])
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }

        return $this->countOrder($data);
    }

    /**
     * 根据前台数据查询订单信息
     * author: mcj
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function selectOrder($data, $skip, $page_size)
    {

		$map = $this->setMap($data);
		return Orders::withJoin('manage', 'INNER')
            ->where($map)
            ->limit($skip, $page_size)
            ->append(['receptionAccount', 'designerAccount'])
            ->order('add_time','desc')
            ->select();
    }

    /**
     * 根据前台数据查询订单信息
     * author: mcj
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function selectShigongOrder($data, $skip, $page_size)
    {
        $where = [];
        if(!empty($data['project_account_id'])){
            $where['o2.account_id'] = ['eq', $data['project_account_id']];
            $where['o2.manage__worker_type'] = ['eq', 1];
        }
        if(!empty($data['worker_account_id'])){
            $where['o2.account_id'] = ['eq', $data['worker_account_id']];
            $where['o2.manage__worker_type'] = ['eq', 2];
        }
        $map = $this->setMap($data);
        $buildSql = Orders::withJoin('manage','inner')
            ->where($map)
            ->buildSql();
        $buildSql2 = Orders::table($buildSql)->alias('o')
        ->field('o.*,tl.account_id,yxb_account.contact_name as shigong_name,tl.work_type')
        ->leftJoin('qz_yxb_order_account tl','tl.order_id = o.order_no')
        ->leftJoin('qz_yxb_account yxb_account','yxb_account.id = tl.account_id')
        ->buildSql();

        $buildSql3 = Orders::table($buildSql2)->alias('o2')
            ->field('o2.*,group_concat(o2.shigong_name) as shigong_name_group')
            ->where(new Where($where))
            ->group('o2.order_no')
            ->buildSql();

        return Orders::table($buildSql3)->alias('o3')
            ->limit($skip, $page_size)
            ->append(['receptionShigongAccount', 'designerShigongAccount'])
            ->orderRaw('if(manage__state=8,0,1) ASC,manage__kaigong_time DESC')
            ->select();
    }

    /**
     * 根据前台数据查询订单信息
     * author: mcj
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function countCompanyShigongOrder($data)
    {
        $where = [];
        if(!empty($data['project_account_id'])){
            $where['o2.account_id'] = ['eq', $data['project_account_id']];
            $where['o2.manage__worker_type'] = ['eq', 1];
        }
        if(!empty($data['worker_account_id'])){
            $where['o2.account_id'] = ['eq', $data['worker_account_id']];
            $where['o2.manage__worker_type'] = ['eq', 2];
        }

        $map = $this->setMap($data);
        $buildSql = Orders::withJoin('manage','inner')
            ->where($map)
            ->buildSql();
        $buildSql2 = Orders::table($buildSql)->alias('o')
            ->field('o.*,tl.account_id,yxb_account.contact_name as shigong_name')
            ->leftJoin('qz_yxb_order_account tl','tl.order_id = o.order_no')
            ->leftJoin('qz_yxb_account yxb_account','yxb_account.id = tl.account_id')
            ->buildSql();

        $buildSql3 = Orders::table($buildSql2)->alias('o2')
            ->field('o2.*,group_concat(o2.shigong_name) as shigong_name_group')
            ->where(new Where($where))
            ->group('o2.order_no')
            ->buildSql();

        return Orders::table($buildSql3)->alias('o3')->count('1');
    }

    /**
     * 根据前台数据查询订单数量
     * author: mcj
     */
    public function countOrder($data)
    {

        $map = $this->setMap($data);
        return  Orders::withJoin('manage', 'INNER')
            ->where($map)
            ->count();
    }
    
    

    /**
     * 设置查询条件
     * author: mcj
     * @param $data
     * @param bool $cache
     * @return array
     */
    public function setMap($data, $cache = true)
    {
        static $map = '';
        if ($cache && $map != '') {
            return $map;
        }
        $map = function ($query) use ($data) {
        	//主键优先查询，注意顺序
			if (!empty($data['order_no_accurate'])) {
				$query->where('qz_yxb_orders.order_no', '=', $data['order_no_accurate']);
			}
			//订单编号
			if (!empty($data['order_no'])) {
				$query->where('qz_yxb_orders.qz_order|qz_yxb_orders.order_no', '=', $data['order_no']);
			}
            if (!empty($data['start_time'])) {
                $query->where('qz_yxb_orders.add_time', '>=', strtotime($data['start_time']));
            }
            if (!empty($data['end_time'])) {
                $query->where('qz_yxb_orders.add_time', '<=', strtotime($data['end_time']));
            }
            //新增开工日期字段-start
            if (!empty($data['kaigong_start_time'])) {
                $query->where('manage.kaigong_time', '>=', strtotime($data['kaigong_start_time']));
            }
            if (!empty($data['kaigong_end_time'])) {
                //因搜索框只精确到天 处理到秒
                $query->where('manage.kaigong_time', '<=',strtotime(date('Y-m-d 23:59:59',strtotime($data['kaigong_end_time']))));
            }
            //新增开工日期字段-end

            if (!empty($data['company_id'])) {
                $query->where('qz_yxb_orders.company_id', '=', $data['company_id']);
            }
            if (!empty($data['consumer_tel'])) {
                $query->where('qz_yxb_orders.consumer_tel', '=', $data['consumer_tel']);
            }
            if (!empty($data['consumer_name'])) {
                $query->where('qz_yxb_orders.consumer_name', 'like', "%{$data['consumer_name']}%");
            }

            if (!empty($data['source'])) {
                $query->where('qz_yxb_orders.source', '=', $data['source']);
            }
            if (!empty($data['state'])) {
                if(is_array($data['state'])){
                    $query->whereIn('manage.state', $data['state']);
                }else{
                    $query->where('manage.state','=', $data['state']);
                }
            }
            if (!empty($data['build_state'])) {
                $query->where('manage.build_state', '=', $data['build_state']);
            }
            if (!empty($data['search'])) {
                $query->where('qz_yxb_orders.order_no|qz_yxb_orders.consumer_tel|qz_yxb_orders.consumer_name', 'like', "%{$data['search']}%");
            }


        };
        return $map;
    }

    /**
     * 获取最新订单信息
     * @param array $data
     * @param array $user
     * @param int $page_current
     * @param int $page_size
     * @return array|\PDOStatement|string|\think\Collection
     */
    public function newOrderList($user = [],$limit)
    {
        $where = [];
        if ($user) {
            $where['company_id'] = $user['company_id'];
        }
        $order = new Orders();
        $orderList = $order->getIndexOrderBuildList($where,$limit);
        if (count($orderList) > 0) {
            $orderIds = array_column($orderList,'order_no');
            //1.获取订单详情(装修地址,业主姓名,接待客服,设计师)
            $orderInfo = [];
            $data = $order->getOrdersInfo($orderIds);
            foreach ($data as $k=>$v){
                $orderInfo[$v['order_no']] = $v;
            }
            //2.获取项目经理(可能没有)
            $data = $order->getOrdersProjectInfo($orderIds);
            $projectInfo = [];
            foreach ($data as $k=>$v){
                $projectInfo[$v['order_no']] = $v;
            }
            //3.获取订单状态
            $data = $order->getOrdersStatusInfo($orderIds);
            $ordersStatusInfo = [];
            foreach ($data as $k=>$v){
                $ordersStatusInfo[$v['order_no']] = $v;
            }
            //4.施工状态
            $data = $order->getOrdersBuildStatusInfo($orderIds);
            $ordersBuildStatusInfo = [];
            foreach ($data as $k=>$v){
                $ordersBuildStatusInfo[$v['order_no']] = $v;
            }
            //5.整理所需数据
            foreach ($orderList as $k=>$v){
                $orderList[$k]['build_address'] = !empty($orderInfo[$v['order_no']]['build_address'])?$orderInfo[$v['order_no']]['build_address']:'';
                $orderList[$k]['consumer_name'] = !empty($orderInfo[$v['order_no']]['consumer_name'])?$orderInfo[$v['order_no']]['consumer_name']:'';
                $orderList[$k]['reception_name'] = !empty($orderInfo[$v['order_no']]['reception_name'])?$orderInfo[$v['order_no']]['reception_name']:'';
                $orderList[$k]['designer_name'] = !empty($orderInfo[$v['order_no']]['designer_name'])?$orderInfo[$v['order_no']]['designer_name']:'';
                $orderList[$k]['project_name'] = !empty($projectInfo[$v['order_no']]['project_name'])?$projectInfo[$v['order_no']]['project_name']:'';
                $orderList[$k]['order_status'] = !empty($ordersStatusInfo[$v['order_no']]['status'])?OrderStatus::getStatusName($ordersStatusInfo[$v['order_no']]['status']):'';
                $orderList[$k]['build_state'] = !empty($ordersBuildStatusInfo[$v['order_no']]['state'])?BuildStatus::getStatusName($ordersBuildStatusInfo[$v['order_no']]['state']):'';
            }
        }
        return $orderList;
    }

    protected function _getOrder($data, $with = [])
    {
        $map = $this->setMap($data);
        return Orders::withJoin('manage', 'INNER')
            ->append($with)
            ->where($map)
            ->find();
    }

    private  function getOrderInfo($orderno){
        $searchmap = [];
        $searchmap[] = ['order_no','=',$orderno];
//        $searchmap[] =['comid','=',$data['company_id']];
        $yxborderinfo = Db::name('yxb_orders')->where($searchmap)->find();
        if($yxborderinfo && $yxborderinfo['qz_order']){
//            echo '111'.'<br/>';
            $searchmap = [];
            $searchmap[] = ['orderid','=',$yxborderinfo['qz_order']];
            $searchmap[] =['comid','=',$yxborderinfo['company_id']];
            $info = Db::name('order_company_review')->where($searchmap)->find();
            return $info ? $info : array();
        }else{
            return array();
        }
    }
    private function getYxbOrderComid($orderno){
        $searchmap = [];
        $searchmap[] = ['order_no','=',$orderno];
        $yxborderinfo = Db::name('yxb_orders')->where($searchmap)->find();
        return $yxborderinfo['company_id'] ? $yxborderinfo['company_id'] : 0;
    }

    public function getUserOrderCount($order){
        //接待客服
        if(!empty($order->reception_id)){
            $where[] = ['state','not in',[11,12]];
            $where[] = ['reception_id|designer_id','=',$order->reception_id];
            $buildSql =  Db::name('yxb_orders_manage')->where($where)->group('order_no')->buildSql();
            $order->reception_id_num  = Db::name('yxb_orders_manage')->table($buildSql)->alias('t')->count(1);
        }
        //设计师
        if(!empty($order->designer_id)){
            $where[] = ['state','not in',[11,12]];
            $where[] = ['reception_id|designer_id','=',$order->designer_id];
            $buildSql = Db::name('yxb_orders_manage')->where($where)->group('order_no')->buildSql();
            $order->designer_id_num = Db::name('yxb_orders_manage')->table($buildSql)->alias('t')->count(1);
        }
        return $order;
    }

}
