<?php
namespace Muser\Controller;
use Muser\Common\Controller\MbaseController;
class OrderController extends MbaseController{
    public function index(){

    }

    public function details(){
        $id = I("get.id");
        if(is_numeric($id)){

            //查询该订单的分配信息
            $result = D("Orders")->getAllocationOrder($id,session("u_userInfo.id"));
            if($result > 0){
                //查询订单信息
                $order = D("Orders")->getOrderInfoById($id);
                if(count($order) > 0){
                    //获取分配的装修公司信息
                    $tempResult = D("Orders")->getOrdersDistributionCompany($id);
                    //此处调整排序，谁查看谁靠前
                    $companys = array();
                    foreach ($tempResult as $key => $value) {
                        if ($_SESSION["u_userInfo"]["id"] == $value['id']) {
                            array_unshift($companys,$value);
                        } else {
                            $companys[] = $value;
                        }
                    }
                    $order["companys"] = $companys;

                    //获取签单的装修公司信息
                    if(!empty($order["qiandan_companyid"])){
                        foreach ($companys as $key => $value) {
                            if($order["qiandan_companyid"] == $value["id"]){
                                $order["qiandan_company_logo"] = $value["logo"];
                                $order["qiandan_company_jc"] = $value["jc"];
                                break;
                            }
                        }
                    }

                    //查询是否已读过订单
                    $count = D("Orders")->getOrderReadCount($id,$_SESSION["u_userInfo"]["id"]);

                    if($count == 0){
                        //修改阅读状态
                        $data = array(
                                "isread"=>1,
                                "readtime"=>time()
                                      );
                        D("Orders")->editOrderRead($id,$_SESSION["u_userInfo"]["id"],$data);
                         header("customer:error05",true);
                    }
                    $order['text'] = preg_replace('/\n/',"<br/>" ,$order['text']);
                    $this->assign("order",$order);

                    //记录日志
                    //记录 装修公司查看订单信息信息 日志
                    //导入扩展文件
                    import('Library.Org.Util.App');
                    $app = new \App();
                    $data = array(
                              "username"=>$_SESSION["u_userInfo"]["name"],
                              "userid"=>$_SESSION["u_userInfo"]["id"],
                              "ip"=>$app->get_client_ip(),
                              "user_agent"=>$_SERVER["HTTP_USER_AGENT"],
                              "info"=>"移动版【查看订单详细信息】",
                              "time"=>date("Y-m-d H:i:s"),
                              "action"=>CONTROLLER_NAME."/".ACTION_NAME,
                              "remark"=>"订单号: ".$id
                              );
                    //记录查看订单情况
                    D("Loguser")->addLog($data);

                    //如果都已读 orders表 order2com_allread 字段记录下分配的所有订单都已读
                    if (0 == $order['order2com_allread']) {
                        $isAllRead = D("Orders")->getOrderFenpeiAllIsRead($order['id']);
                        if ($isAllRead) { //如果都已读,那么修改字段order2com_allread 状态 为1
                            $data = array(
                                    "order2com_allread"=>1
                                          );
                            D("Orders")->editOrder($order['id'],$data);
                        }
                    }

                    $this->display();
                    die();
                }
                $this->msg('该订单不存在');
            }

            /*S判断是否是不同装修公司绑定的同一个微信*/
            //1.获取当前登录用户绑定的微信openid
            /*
            $wx_openid = D('User')->getCompanyWechat(session("u_userInfo.id"))['wx_openid'];
            //2.获取该订单分配的装修公司绑定的微信OpenId
            $binds = D('Orders')->getOrdersWechatOpenId($id);
            $match = false;
            foreach ($binds as $key => $value) {
                if ($value['wx_openid'] == $wx_openid) {
                    $match = true;
                    break;
                }
            }
            //匹配到不同装修公司绑定的同一个微信
            if ($match == true) {
                $this->msg('该订单不属于当前登录账号，请退出登录~');
            } else {
                $this->msg('该订单不存在~');
            }
            */
            $this->msg('本订单不属于当前登录帐号,请<a href="/loginout/">退出</a>后登陆正确的帐号。');
        }
        $this->_error();
    }

    //提示信息
    public function msg($msg){
        $info['msg'] = $msg;
        $this->assign('info',$info);
        $this->display('msg');
        die();
    }
}