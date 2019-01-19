<?php
namespace Sub\Controller;
use Sub\Common\Controller\SubBaseController;
class ZxbjController extends SubBaseController{
    public function _initialize(){
        parent::_initialize();
    }

    public function getDetailsByAjax(){
        if(isset($_COOKIE["w_qizuang_n"])){
            $orderid = $_COOKIE["w_qizuang_n"];
            $order = D("Orders")->getOrderInfoById($orderid);
            if(count($order) > 0){
                $result = $this->calculatePrice($order["mianji"],$order["cs"]);
                $this->ajaxReturn(array("data"=>$result,"info"=>"获取成功！","status"=>1));
            }
        }
        $this->ajaxReturn(array("data"=>'',"info"=>"获取失败，请刷新重试~","status"=>0));
    }

    /**
     * 计算价格
     * @param  [type] $mianji [面积]
     * @param  [type] $cs [城市]
     * @return [type]         [description]
     */
    private function calculatePrice($mianji,$cs)
    {
        //占比：客厅25% 卧室 18% 厨房 8% 卫生间16% 水电25% 其他 8%
        //计算公式 （城市最低半包单价*120%）*房子的面积

        //获取改订单城市的最低半包价格
        $result = D("Orders")->getCityPrice($cs);
        $price = $result["half_price_min"];
        if (empty($price)) {
            $price = 300;
        }

        $total = $price*1.2*$mianji;
        $result['kt'] = $total*0.25 ;
        $result['zw'] = $total*0.18;
        $result['wsj'] = $total*0.16;
        $result['cf'] = $total*0.08;
        $result['sd'] = $total*0.25;
        $result['other'] = $total*0.08;
        $result['total'] = $total;
        return $result;
    }

}
