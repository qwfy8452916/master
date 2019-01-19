<?php
// +----------------------------------------------------------------------
// | OrderPondServiceLogicModel  订单池所属客服逻辑层
// +----------------------------------------------------------------------

namespace Home\Model\Logic;


class OrderPondServiceLogicModel
{
    /**
     * 查询已分配客服数量
     */
    public function getKfNum()
    {
        return D('Home/Db/OrderPondService')->getKfNum();
    }
}