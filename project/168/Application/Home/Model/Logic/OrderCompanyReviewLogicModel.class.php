<?php

namespace Home\Model\Logic;
/**
 * 装修订单反馈表
 */
class OrderCompanyReviewLogicModel
{
    /**
     * 根据订单信息获取反馈信息
     * @param  [type] $order_id [description]
     * @return [type]           [description]
     */
    public function getReviewInfoByOrderId($order_id)
    {
        return D("Home/Db/OrderCompanyReview")->getReviewInfoByOrderId($order_id);
    }

    /**
     * 删除订单反馈信息
     * @param  [type] $order_id [description]
     * @return [type]           [description]
     */
    public function delReviewInfoByOrderId($order_id)
    {
       return D("Home/Db/OrderCompanyReview")->delReviewInfoByOrderId($order_id);
    }

    /**
     * 添加订单反馈信息
     * @param [type] $data [description]
     */
    public function addReviewInfo($data)
    {
        return D("Home/Db/OrderCompanyReview")->addAllInfo($data);
    }

}