<?php
// +----------------------------------------------------------------------
// | OrderPondLogicModel  订单池逻辑层
// +----------------------------------------------------------------------

namespace Home\Model\Logic;

class OrderPondLogicModel
{
    /**
     * 订单池信息
     */
    public function getPondList()
    {
        return D('Home/Db/OrderPond')->getPondList();
    }

    /**
     * 订单池具体信息
     */
    public function getPondDetail($id)
    {
        return D('Home/Db/OrderPond')->getPondDetail($id);
    }

    /**
     * 验证订单池信息
     * @param $data
     */
    public function validatePond($data, $flag = 0)
    {
        if ($flag != 0) {
            if (empty($data['id'])) {
                return ['status' => 0, 'info' => '参数错误，请重试'];
            }
            if ($data['id'] == 1) {
                return ['status' => 0, 'info' => '主池暂时不支持修改'];
            }
        }
        if (empty($data['pond_name'])) {
            return ['status' => 0, 'info' => '订单池名称为空'];
        }
        if (!empty(D('Home/Db/OrderPond')->getDetail(['pond_name' => $data['pond_name']]))) {
            return ['status' => 0, 'info' => '订单池名称重复'];
        }
        return true;
    }

    /**
     * 验证订单池信息
     * @param $data
     */
    public function validatePondDetail($data)
    {
        if (empty($data['pond_id'])) {
            return ['status' => 0, 'info' => '订单池未选择'];
        }
        if (empty($data['city'])) {
            return ['status' => 0, 'info' => '城市未选择'];
        }
        if (empty($data['service'])) {
            return ['status' => 0, 'info' => '客服未选择'];
        }
        return true;
    }

    /**
     * 新增/编辑订单池
     * @param $data
     * @param array $map
     * @return mixed
     */
    public function addOrderPond($data,$map = [])
    {
        return D('Home/Db/OrderPond')->addOrderPond($data,$map);
    }

    /**
     * 删除订单池
     * @param $id
     * @return mixed
     */
    public function delOrderPond($id)
    {
        $map['id'] = ['EQ', $id];
        //分池城市返回主池
        D('Home/Db/OrderPondCity')->editOrderPondCity(['pond_id' => 1], ['pond_id' => $map['id']]);
        //删除分池的客服
        D('Home/Db/OrderPondService')->delOrderPondService(['pond_id' => $map['id']]);
        return D('Home/Db/OrderPond')->delOrderPond($map);
    }

    /**
     * 添加客服和城市
     * @param $data
     */
    public function addCityAndServ($data)
    {
        $now = time();
        $city = $service = [];
        if ($data['pond_id'] == 1) {
            D('Home/Db/OrderPondCity')->delOrderPondCity(['pond_id' => 1]);
            foreach ($data['city'] as $k1 => $v1) {
                $city[] = [
                    'pond_id' => 1,
                    'city_id' => $v1,
                    'create_time' => $now,
                ];
            }
            $flag1 = D('Home/Db/OrderPondCity')->addOrderPondCity($city);
        } else {
            //先查询未入库的城市入库
            foreach ($data['city'] as $k1 => $v1) {
                if (empty(D('Home/Db/OrderPondCity')->findCity($v1))) {
                    $city[] = [
                        'pond_id' => 1,
                        'city_id' => $v1,
                        'create_time' => $now,
                    ];
                }
            }
            D('Home/Db/OrderPondCity')->addOrderPondCity($city);
            //城市直接返回总订单池
            D('Home/Db/OrderPondCity')->editOrderPondCity(['pond_id' => 1], ['pond_id' => $data['pond_id']]);
            //更新城市与订单池关系
            $flag1 = D('Home/Db/OrderPondCity')->editOrderPondCity(['pond_id' => $data['pond_id']], ['city_id' => ['in', $data['city']]]);
        }
        //删除当前订单池的客服
        D('Home/Db/OrderPondService')->delOrderPondService(['pond_id' => $data['pond_id']]);
        if ($data['pond_id'] !== 1) {
            //如果不是主池，则删除在主订单池的包含的当前分配客服
            D('Home/Db/OrderPondService')->delOrderPondService(['pond_id' => 1, 'kf_id' => ['in', $data['service']]]);
        }
        //重新写入新客服
        foreach ($data['service'] as $k2 => $v2) {
            $service[] = [
                'pond_id' => $data['pond_id'],
                'kf_id' => intval($v2),
                'create_time' => $now,
            ];
        }
        $flag2 = D('Home/Db/OrderPondService')->addOrderPondService($service);
        if ($flag1 !== false && $flag2 !== false) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取已分配城市
     * @param int $except_pond_id 去除的订单池编号
     * @return mixed
     */
    public function getUsedCity($except_pond_id = false)
    {
        return D('Home/Db/OrderPondCity')->getCityUsed($except_pond_id);
    }

    /**
     * 获取已分配客服
     * @param int $except_pond_id 去除的订单池编号
     * @return mixed
     */
    public function getUsedService($except_pond_id = false)
    {
        return D('Home/Db/OrderPondService')->getServerUsed($except_pond_id);
    }

    /**
     * 根据客服ID获取订单池列表详细信息
     * @param $kfid
     * @param bool $withMainPond
     * @return mixed
     */
    public function getPondCityByKf($kfid, $withMainPond = false)
    {
        $list = D('Home/Db/OrderPond')->getPondCityByKf($kfid, $withMainPond);
        if (empty($list)) {
            $result = [];
        } else {
            $result['id'] = array_unique(array_column($list,'id'));
            $result['city_ids'] = array_unique(array_column($list,'city_id'));
            $result['kf_id'] = array_unique(array_column($list,'kf_id'));
        }
        return $result;
    }


    /**
     * 根据客服ID检测客服是否分配
     */
    public function findKfInPond($kfid)
    {
        $isFind = D('Home/Db/OrderPondService')->isFind($kfid);
        return !empty($isFind) ? true : false;
    }
}