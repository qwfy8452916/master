<?php
// +----------------------------------------------------------------------
// | OrderPondModel  订单池所属城市关联模型
// +----------------------------------------------------------------------

namespace Home\Model\Db;

use Think\Model;

class OrderPondCityModel extends Model
{
    protected $autoCheckFields = false;
    protected $table = 'qz_order_pond_city';
    /**
     * 新增操作
     * @param $data
     * @param array $map
     */
    public function addOrderPondCity($data)
    {
        return $this->addAll($data);
    }
    /**
     * 编辑操作
     */
    public function editOrderPondCity($data,$map = [])
    {
        if (empty($map)) {
            return false;
        }
        return $this->where($map)->save($data);
    }
    /**
     * 删除操作
     * @param $map
     * @return mixed
     */
    public function delOrderPondCity($map)
    {
        return $this->where($map)->delete();
    }

    /**
     * 获取已经分配的城市
     */
    public function getCityUsed($exceptid = false)
    {
        $map['pond_id'] = ['not in', [1]];
        if ($exceptid !== false) {
            $map['pond_id'] = ['not in', [$exceptid, 1]];
        }
        $result = $this->where($map)->getField('city_id',true);
        if (empty($result)){
            return [];
        } else {
            return $result;
        }
    }

    /**
     * 查找有无城市在表
     */
    public function findCity($cityid)
    {
        $map['city_id'] = $cityid;
        return $this->where($map)->find();
    }
}