<?php
namespace Muser\Controller;
use Muser\Common\Controller\MbaseController;
class HomeController extends MbaseController{

    public function index(){

        //初始化持久化的已读/未读订单的pageindex
        session("order_read_pageindex",1);
        session("order_unread_pageindex",1);
        $readOrder = $this->getOrders(session("u_userInfo.id"),1);
        $this->assign("readOrder",$readOrder["tmp"]);

        $unreadOrder = $this->getOrders(session("u_userInfo.id"),0);
        if(!empty($unreadOrder)){
            $this->assign("unReadOrder",$unreadOrder["tmp"]);
            $this->assign("unReadOrderCount",$unreadOrder["count"]);
        }
        //添加修改密码提醒(每隔60天修改一次密码)
        $this->checkPassTime(session("u_userInfo"));
        $this->display();
    }

    public function orderlist(){
        if($_POST){
            if(I("post.index") == 0){
                $pageIndex = session("order_read_pageindex");
                session("order_read_pageindex",$pageIndex+1);
                $isread = 1;
            }else{
                $pageIndex = session("order_unread_pageindex");
                $pageIndex = session("order_unread_pageindex",$pageIndex+1);
                $isread = 0;
            }

            //如果pageindex非数字或者是负数
            $reg = '/^[0-9]*[1-9][0-9]*$/';
            preg_match($reg,$pageIndex,$m);
            if(empty($m)){
                $pageIndex = 1;
            }

            $pageIndex = $pageIndex+1;

            $result = $this->getOrders(session("u_userInfo.id"),$isread,$pageIndex);
            $status = 0;
            if($result != ""){
                $tmp = $result["tmp"];
                $status = 1;
            }
            $this->ajaxReturn(array("data"=>$tmp,"info"=>"","status"=>$status));
        }
    }


    private function getOrders($company_id,$isread,$pageIndex = 1){
        $pageCount = 10;
        $count = D("Orders")->getMobileOrderListCount($company_id,$isread);
        $rowCount = ceil($count/$pageCount);
        if($pageIndex > $rowCount){
            return "";
        }
        $pageIndex = ($pageIndex-1)*$pageCount;
        $orders = D("Orders")->getMobileOrderList($company_id,$isread,$pageIndex,$pageCount);
        $this->assign("orders",$orders);
        $tmp = $this->fetch("orderlist");
        if(count($orders) > 0){
           $orderCount = count($orders);
        }
        return array("tmp"=>$tmp,"count"=> $orderCount);
    }

    /**
     * 添加修改密码提醒(每隔30天修改一次密码)
     */
    private function checkPassTime($user)
    {
        $check_alert = S('User:Muser:Home:CheckAlert:id' . $user['id']);
        if ($check_alert != 1 || $check_alert == false) {
            S('User:Muser:Home:CheckAlert:id' . $user['id'], 1, 2592000);
            $this->assign('check_alert', 1);
        }
    }

}