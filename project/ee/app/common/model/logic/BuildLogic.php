<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/13
 * Time: 17:01
 */

namespace app\common\model\logic;

use app\common\enums\BuildStatus;
use app\common\enums\OrderSource;
use app\common\model\db\Build;
use app\common\model\db\BuildDesign;
use app\common\model\db\Orders;
use app\common\model\db\OrdersManage;
use think\Db;

class BuildLogic
{
    public function selectBuildRecordDetail($data = [], $user = [], $page_current = 1, $page_size = 10)
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }
        $map = $this->setMap($data);
        $with = ['buildDesign'];
        $skip = ($page_current - 1) * $page_size;
        $with_join = ['orders'];
        return $this->_selectBuild($with_join, $map, $with, $skip, $page_size);
    }

	public function countBuildRecord($data = [], $user = [])
	{
		if ($user) {
			$data['company_id'] = $user['company_id'];
		}
		$map = $this->setMap($data);
		$with_join = ['orderManage'];
		return $this->_countBuild($with_join, $map);
	}

    public function selectBuildRecord($data = [], $user = [], $page_current = 1, $page_size = 10)
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }
        $map = $this->setMap($data);
        $with = ['buildDesign'];
        $skip = ($page_current - 1) * $page_size;
        $with_join = ['orderManage'];
        return $this->_selectBuild($with_join, $map, $with, $skip, $page_size);
    }

	public function updateOrderManageBuildState($order_no)
	{
		$buil_obj = Build::where('order_no','=',$order_no)->order('add_time','desc')->find();
		$build_state = BuildStatus::DEFAULT_STATE;
		$check_state = 1;
		if($buil_obj != null ){
			$build_state = $buil_obj->getData('state');
			$check_state = $buil_obj->getData('check_state');
		}
		OrdersManage::update(['build_state' => $build_state,'check_state'=>$check_state], ['order_no' => $order_no]);
	}
    public function delUnit($build_obj)
    {
        $this->delBuildDesign($build_obj);
        $build_obj->delete();
        return true;
    }

    public function editUnit($data = [], $build_obj)
    {
        $edit_data = array_only($data, ['remark', 'build_design']);
        $this->updateData($build_obj, $edit_data);
        if (!empty($build_obj->buildDesign()->select())) {
            $this->delBuildDesign($build_obj);
        }
        $this->addBuildDesign($build_obj, $data);
    }

    public function getBuildRecordDesign($data, $user)
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }
        $with = ['buildDesign'];
        return $this->getBuild($data, $with);
    }

    public function getBuildRecord($data, $user)
    {
        if ($user) {
            $data['company_id'] = $user['company_id'];
        }
        return $this->getBuild($data);
    }

    public function getBuild($data, $with = [])
    {
        $map = $this->setMap($data);
        return Build::where($map)
            ->with($with)
            ->find();
    }

    public function countBuildStateTimes($order_no, $build_state)
    {
        $map = function ($query) use ($order_no, $build_state) {
            $query->where('order_no', '=', $order_no);
            $query->where('state', '=', $build_state);
        };
        return Build::where($map)->count();
    }

    public function addData($data = [], $order_obj,$user)
    {
        $data['add_time'] = time();
        $data['company_id'] = $order_obj->company_id;
        $data['order_no'] = $order_obj->order_no;
//        $data['build_group'] = $order_obj->build_group;
		$data['contact_name'] = $user['contact_name'];
		$data['station'] = $user['station'];

		//times 计算
        $times = $this->countBuildStateTimes($order_obj->order_no, $data['build_state']);
        $data['times'] = $times;
        $build_obj = new Build();
        $this->addDataDo($build_obj, $data);
        $this->addBuildDesign($build_obj, $data);
    }

    public function addDataDo($build_obj, $data)
    {
        if (isset($data['company_id'])) {
            $build_obj->company_id = $data['company_id'];
        }
        if (isset($data['add_time'])) {
            $build_obj->add_time = $data['add_time'];
        }
        if (isset($data['order_no'])) {
            $build_obj->order_no = $data['order_no'];
        }
        if (isset($data['build_state'])) {
            $build_obj->state = $data['build_state'];
        }
        if (isset($data['times'])) {
            $build_obj->times = $data['times'];
        }
		$build_obj->contact_name = $data['contact_name'];
		$build_obj->station = $data['station'];
		$build_obj->remark = empty($data['remark']) ? '' : $data['remark'];
        $build_obj->save();
        if (isset($data['build_state'])) {
            //装修记录更新  //李斌
            if(!empty($build_obj['id'])){
                $savenews = array();
                $savenews['order_no'] = $build_obj['order_no'];
                $savenews['comid'] = $build_obj['company_id'];
                $savenews['build_id'] = $build_obj['id'];
                $this->addOrdersNews($savenews);
            }
            //更新order_manage
            OrdersManage::update(['build_state' => $data['build_state'],'check_state'=> 1 ], ['order_no' => $data['order_no']]);
        }
        return true;
    }

    //添加消息记录操作 // 李斌
    public function addOrdersNews($savenews){
        //1表示装修记录更新
        $savenews['type'] = 1;
        $getphone = Db::name('yxb_orders')->where('order_no',$savenews['order_no'])->find();
        $savenews['consumer_tel'] = $getphone['consumer_tel'];
        $savenews['remark'] = '您的装修进度更新了，请尽快验收哦~';
        $savenews['add_time'] = time();
        Db::name('yxb_order_news')->strict(false)->insert($savenews);
        return true;
    }

    public function updateData($build_obj, $data)
    {
        if (isset($data['company_id'])) {
            $build_obj->company_id = $data['company_id'];
        }
        if (isset($data['add_time'])) {
            $build_obj->add_time = $data['add_time'];
        }
        if (isset($data['order_no'])) {
            $build_obj->order_no = $data['order_no'];
        }
        if (isset($data['build_state'])) {
            $build_obj->state = $data['build_state'];
        }
        if (isset($data['times'])) {
            $build_obj->times = $data['times'];
        }
        $build_obj->remark = empty($data['remark']) ? '' : $data['remark'];

        if (isset($data['build_state'])) {
            //关联更新order_manage
            $build_obj->orderManage->build_state = $data['build_state'];
            $build_obj->together('orderManage')->save();
        } else {
            $build_obj->save();
        }
        return true;
    }

    public function addBuildDesign($build_obj, $data)
    {

        if (!empty($data['build_design'])) {
            $house_design_data = [];
            foreach ($data['build_design'] as $k => $v) {
                $house_design_data[$k]['img'] = $v['img'];
                $house_design_data[$k]['title'] = empty($v['title']) ? '' : $v['title'];
            }
            $build_obj->buildDesign()->saveAll($house_design_data);
        }
        return true;
    }

    public function delBuildDesign($build_obj)
    {
        BuildDesign::where(['build_id' => $build_obj->id])->delete();
        return true;
    }

	protected function _countBuild($with_join = [], $map = [])
	{
		return Build::withJoin($with_join)
			->where($map)
			->count();
	}

	protected function _selectBuild($with_join = [], $map = [], $with = [], $skip = 0, $limit = 10, $order = "add_time desc")
	{
		return Build::withJoin($with_join)
			->where($map)
			->append($with)
			->limit($skip, $limit)
			->order($order)
			->select();
	}

    public function selectCheckStateInfo($data){
        $map[] = ['id','=',$data['id']];
        return Build::with(['failDesign','buildDesign'])->where($map)->select();
    }


    public function setMap($data, $cache = true)
    {
        static $map = '';
        if ($cache && $map != '') {
            return $map;
        }
        $map = function ($query) use ($data) {
            if (!empty($data['build_id'])) {
                $query->where('qz_yxb_build.id', '=', $data['build_id']);
            }
            //索引顺序
			if (!empty($data['order_no'])) {
				$query->where('qz_yxb_build.order_no', '=', $data['order_no']);
			}
            if (!empty($data['company_id'])) {
                $query->where('qz_yxb_build.company_id', '=', $data['company_id']);
            }
			if (!empty($data['state'])) {
				$query->where('qz_yxb_build.state', '=', $data['state']);
			}
			if (!empty($data['check_state'])) {
				$query->where('qz_yxb_build.check_state', '=', $data['check_state']);
			}
			if (!empty($data['state_able'])) {
				$query->where('qz_yxb_build.check_state', '<>', 2);
			}
        };
        return $map;
    }
}