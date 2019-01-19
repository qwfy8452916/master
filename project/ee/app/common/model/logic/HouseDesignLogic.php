<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/13
 * Time: 17:01
 */

namespace app\common\model\logic;


use app\common\model\db\HouseDesign;

class HouseDesignLogic
{

    public function delDesign($design_obj){
        $design_obj->delete();
    }

    public function countDesign($data){
		$map = $this->setMap($data);
		return HouseDesign::where($map)->count();
	}
    /**
     * 获取户型列表
     * author: mcj
     * @return array|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getDesignOrder($data,$user=[])
    {
        if($user){
            $data['company_id'] = $user['company_id'];
        }
        $map = $this->setMap($data);
        return HouseDesign::withJoin('orderManage', 'INNER')->where($map)->find();
    }

    public function setMap($data, $cache = true)
    {
		static $map = '';
		if ($cache && $map != '') {
			return $map;
		}
		$map = function ($query) use ($data) {
			if (!empty($data['design_id'])) {
				$query->where('qz_yxb_house_design.id', '=', $data['design_id']);
			}
			if (!empty($data['order_no'])) {
				$query->where('qz_yxb_house_design.order_no', '=', $data['order_no']);
			}
			if (!empty($data['company_id'])) {
				$query->where('orderManage.company_id', '=', $data['company_id']);
			}
            if (!empty($data['type'])) {
                $query->where('qz_yxb_house_design.type', '=', $data['type']);
            }
        };
        return $map;
    }

}