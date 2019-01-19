<?php
namespace User\Controller;
use User\Common\Controller\UserCenterBaseController;
class IndexController extends UserCenterBaseController {
    public function index(){
        //安全验证码
        $code = substr(md5(time()), 0, 10);
        $safecode = authcode($code,"");
        $_SESSION["safecode"] = $code;
        $this->assign("safecode",$safecode);
        $this->assign("ssid",authcode(session_id(),""));


        $this->display();
    }

    /**
     * 用户确认绑定
     * @return [type] [description]
     */
    public function confirmbindaccount(){
        header("Content-type:text/html;charset=utf-8");
        $tmp = '<style>
                .c {text-align: center;  margin-top: 10px;}
                </style>
                <div class="c" style="">
                <h1 style="font-size: 68px;">%s</h1>
                </div>';
        if(I("get.code") == ""){
            die("parameter error!!!");
        }
        //根据code（ticket） 查询用户的帐号
        $wxtk =  D("Logwxticket")->getTicketmd5ToUserid(I("get.code"),I("get.sceneid"));
        $str = "绑定失败！";
        if(count($wxtk) > 0){
            //把用户信息绑定到订单通知的关联表中
            //查询用户回调是的记录
            $callback = D("Logwechatcallbak")->checkCallbackTicket(trim($wxtk["wx_ticket_now"]));
            if(count($callback) > 0){
                //查询该公司是否已经绑定2次
                $count = D("Orderwechar")->getAccountCount($wxtk["userid"]);

                if($count >= 2){
                    $str = "绑定失败！一个账号只能绑定2个微信！";
                }else{
                    //查询该用户是否绑定
                    $wechar = D("Orderwechar")->getAccountByOpenId($callback["fromusername"],$wxtk["userid"]);
                    if(count($wechar) == 0){
                        //没有绑定记录则添加
                        //用户的openid
                        $data["wx_openid"] = $callback["fromusername"];
                        $data["comid"] = $wxtk["userid"];
                        $data["time"]= time();
                        $i = D("Orderwechar")->addAccount($data);
                    }else{
                        $data = array(
                                "is_delete"=>0
                                      );
                        //如果已绑定则修改状态
                        $i = D("Orderwechar")->editAccount($wechar["wx_openid"],$wxtk["userid"],$data);
                    }

                    if($i !== false){
                        $_SESSION['u_wx_ticket_need_user_ok'] = 1;
                        $str ="绑定成功！";
                    }
                }
            }else{
                $data = array(
                    "content"=>"微信帐号绑定失败:【用户编号 ".$wxtk["userid"]."】票据 【".$wxtk["wx_ticket_now"]."】查询语句:【".m()->getlastsql()."】",
                    "time"=>time()
                          );
                M("log_debug")->add($data);
            }
        }
        $tmp = sprintf($tmp,$str);
        echo $tmp;
    }

    /**
     * 短信发送
     * @return [type] [description]
     */
    public function sendsms(){
        if($_POST){
            $code = strtolower($_POST["code"]);
            // if(check_verify($code)){
                 R("Common/Sms/sendsms");
            // }
            // $this->ajaxReturn(array("data"=>"","info"=>"图形验证码不正确！","status"=>9));
        }
        die();
    }

     /**
     * 邮件发送
     * @return [type] [description]
     */
    public function sendemail(){
        if($_POST){
            $code = strtolower($_POST["code"]);
            if(check_verify($code)){
                 R("Common/Sms/sendemail");
            }
            $this->ajaxReturn(array("data"=>"","info"=>"图形验证码不正确！","status"=>9));
        }
        die();
    }

    public function verifysmscode(){
        R("Common/Sms/verifysmscode");
    }

    /**
    * 获取验证码
    * @return [type] [description]
    */
    public function verify(){
       getVerify("",4,80,32,11,false,false,true);
    }

    /**
     * 验证验证码
     * @return [type] [description]
     */
    public function check_verify(){
        if($_POST){
            $code = strtolower($_POST["code"]);
            if(check_verify($code)){
                 $this->ajaxReturn(array("data"=>"","info"=>"验证码正确！","status"=>1));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"验证码不正确！","status"=>0));
        }
    }

    /**
     * 用户登录
     * @return [type] [description]
     */
    public function login(){
        R("Common/Login/Loginin");
        die();
    }

    /**
     * 用户登录
     * @return [type] [description]
     */
    public function mobilelogin(){
        R("Common/Login/mobileLogin");
        die();
    }

    /**
     * 用户退出
     * @return [type] [description]
     */
    public function loginout(){
         R("Common/Login/loginout");
         die();
    }

    public function account(){
        R("Common/Accountsecurity/account");
        die();
    }

    public function fb_order(){
        R("Common/Zbfb/fb_order");
        die();
    }

    public function cancelcollect(){
        R("Common/Collect/cancelcollect");
        die();
    }

    public function bindaccount(){
        R("Common/Accountsecurity/bindaccount");
        die();
    }
}