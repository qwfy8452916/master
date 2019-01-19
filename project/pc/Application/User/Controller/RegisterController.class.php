<?php
namespace User\Controller;
use User\Common\Controller\UserCenterBaseController;
class RegisterController extends UserCenterBaseController{
    public function index(){
        if(!empty($_COOKIE["w_cityid"])){
            $bm = $_COOKIE["w_cityid"];
            $cityId = D("Common/Quyu")->getCityIdByBm($bm);
            $this->assign("cityId",$cityId);
        }
        $city =  D("Common/Area")->getCityArray("",true);
        $this->assign("citys",json_encode($city));
        $this->display();
    }

    /**
     * 从新获取注册密码
     * @return [type] [description]
     */
    public function repass(){
        if(!empty($_COOKIE["w_company_id"])){
            $id = authcode($_COOKIE["w_company_id"],"DECODE");
            //查询是否有该公司
            $company = D("User")->getSingleUserInfoById($id);
            if(count($company) > 0){
                import('Library.Org.Util.App');
                $app = new \App();
                $code = $app->getSafeCode(8,"NUMBER");
                $data["pass"] = md5($code);
                //重新修改注册公司的登录密码
                $data = array(
                        "pass"=>md5($code)
                              );
                $i = D("User")->edtiUserInfo($id,$data);
                if($i !== false){
                    $result = $this->sendSMS($company["tel_safe"],$code);
                    if($result){
                        $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
                    }
                    $this->ajaxReturn(array("data"=>"","info"=>"发送短信失败,请重试！","status"=>0));
                }
            }
        }
        $this->ajaxReturn(array("data"=>"","info"=>"发送失败,请联系客服","status"=>0));
    }

    public function checkVerifyCode(){
        $code = I("post.code");
        if(!check_verify($code)){
            $this->ajaxReturn(array("data"=>"","info"=>"文字验证码输入错误！","status"=>0));
            die();
        }
    }
    /**
     * 注册成功页面
     * @return [type] [description]
     */
    public function registersuccess(){
        $this->display("success");
    }

    /**
     * 注册用户
     * @return [type] [description]
     */
    public function save(){
        $code = I("post.verifyCode");

        // if(!check_verify($code)){
        //     $this->ajaxReturn(array("data"=>"","info"=>"文字验证码输入错误！","status"=>0));
        //     die();
        // }

        if($_POST){
            //导入扩展文件
            import('Library.Org.Util.App');
            $app = new \App();
            $data = array(
                "user"          => $_POST["tel"],
                "classid"       => $_POST["classid"],
                "register_time" => time(),
                "ip"            =>$app->get_client_ip()
                          );
            import('Library.Org.Util.Fiftercontact');
            $filter = new \Fiftercontact();
            if(I("post.classid") ==  3){
                //装修公司
                $data["user"]         = I("post.name","","htmlspecialchars");
                $data["name"]         = $filter->filter_title(I("post.contact","","htmlspecialchars"));
                $data["qc"]           = I("post.qc","","htmlspecialchars");
                $data["tel"]          = I("post.tel","","htmlspecialchars");
                $data["cs"]           = I("post.cs","","htmlspecialchars");
                $data["qx"]           = I("post.qy","","htmlspecialchars");
                // $data["tel_safe"]     = I("post.tel","","htmlspecialchars");
                // $data["tel_safe_chk"] = 1;
                $data["tel"]          = I("post.tel","","htmlspecialchars");
                //默认头像
                $data["logo"] = "http://".C("QINIU_DOMAIN")."/".OP("DEFAULT_COMPANY_LOGO");
                //注册随机8位密码
                // import('Library.Org.Util.App');
                // $app = new \App();
                // $code = $app->getSafeCode(8,"NUMBER");
                // $data["pass"] = md5($code);
                $data["pass"] = md5(I("post.password"));
                $user = D("User");
                if($user->create($data,7)){
                    $user->startTrans();
                    $id = $user->addUser($data);
                    //自动插入装修公司详细信息
                    $saveData = array(
                            "userid"=>$id,
                            "lunxian"=>""
                                    );
                    $result = D("Usercompany")->AddCompanyDetails($saveData);

                    if($result !== false){
                        $user->commit();
                        // $this->sendSMS($data["tel"],$code);
                        //注销验证码
                        setcookie("w_ordersafecode",$serialize,time()-1,'/', '.'.C('QZ_YUMING'));
                        // //添加装修公司注册成功后的公司ID，用于重新接收密码用
                        // setcookie("w_company_id",authcode($id,""),time()+600,'/', '.'.C('QZ_YUMING'));
                        //查询注册公司城市的信息
                        $cityInfo = D("Area")->getCityById($data["cs"]);
                        //添加session
                        $_SESSION["u_userInfo"] = array(
                                                "id"      =>  $id,
                                                "name"    =>  $data["name"],
                                                "user"    =>  $data["user"],
                                                "cs"      =>  $data["cs"],
                                                "qx"      =>  $data["qy"],
                                                "logo"    =>  $data["logo"],
                                                "classid" =>  $data["classid"],
                                                "bm"      =>  $cityInfo[0]["bm"],
                                                "cname"   =>  $cityInfo[0]["oldName"],
                                                "qc"      =>  $data["qc"],
                                                "jc"      =>  $data["qc"],
                                                "on"      =>  0
                                                      );

                        $this->ajaxReturn(array("data"=>"","info"=>'注册成功',"status"=>1));
                    }else{
                        $user->rollback();
                        $this->ajaxReturn(array("data"=>"","info"=>'注册失败,请稍后再试！',"status"=>0));
                    }
                }else{
                    $this->ajaxReturn(array("data"=>"","info"=>$user->getError(),"status"=>0));
                }
            }else{
                //业主,设计师
                if(I("post.password") !== ""){
                    $data["pass"] =I("post.password","","htmlspecialchars");
                }
                $data["name"] = $filter->filter_title(I("post.name","","htmlspecialchars"));
                //传入的tel是否为电话
                if($_POST["istel"] != 2){
                    $data["tel_safe"] = $_POST["tel"];
                    $data["tel_safe_chk"] = 1;
                    $data["tel"] = I("post.tel","","htmlspecialchars");
                }else{
                    $data["mail_safe"] =  I("post.tel","","htmlspecialchars");
                    $data["mail_safe_chk"] = 1;
                    $data["mail"] =  I("post.tel","","htmlspecialchars");
                }
                //默认头像
                $data["logo"] = "http://".C("QINIU_DOMAIN")."/".OP("DEFAULT_LOGO");
                $data["account_chk"] = 1;
                $user = D("User");
                if($user->create($data,4)){
                    $user->startTrans();
                    $data["pass"] = md5($data["pass"]);
                    $result = $user->addUser($data);
                    if($result !== false){
                        $i = true;
                        if($data["classid"] == 2){
                            //如果是设计师,添加设计师详细数据
                            $saveData = array(
                                        "userid"=>$result
                                              );
                            $i = D("Userdes")->addDes($saveData);
                        }
                        if($i !== false){
                            $user->commit();
                            $_SESSION["u_userInfo"] = array(
                                                "id"      =>  $result,
                                                "name"    =>  $data["name"],
                                                "user"    =>  $data["user"],
                                                "classid" =>  $_SESSION['classid'],
                                                "cs"      =>  $data["cs"],
                                                "qy"      =>  $data["qy"],
                                                "logo"    =>  $data["logo"],
                                                "classid" =>  $data["classid"]
                                                      );
                            setcookie("w_ordersafecode",$serialize,time()-1,'/', '.'.C('QZ_YUMING'));
                            $this->ajaxReturn(array("data"=>"","info"=>'注册成功',"status"=>1));
                        }
                    }else{
                        $user->rollback();
                        $this->ajaxReturn(array("data"=>"1","info"=>'注册失败,请稍后再试！',"status"=>0));
                    }
                }else{
                    $this->ajaxReturn(array("data"=>"2","info"=>$user->getError(),"status"=>0));
                }
            }
        }
    }

    /**
     * 发送短信
     * @param  [type] $tel  [发送的电话]
     * @param  [type] $code [登录密码]
     * @return [type]       [description]
     */
    private function sendSMS($tel,$code){
        import('Library.Org.Util.App');
        $app = new \App();
        //发送短信
        import('Library.Org.yuntongxun.Telytx');
        $data[] = $code;
        $tmp = OP('SMS_REGISTER_INDEX');//发送的短信模版
        $Telytx = new \Telytx();
        $result = $Telytx->sendTemplateSMS($tel,$data,$tmp);
        $tel_encrypt = substr_replace($tel,"*****",3,5);
        $tel_md5 =  $app->order_tel_encrypt($tel);
        $logsend =  D("Common/LogSmsUserSend");
        //添加短信发送的记录
        if($result["status"] == 1){
            $smsData = array(
                "cid"           =>  $_SESSION["cityId"],
                "ip"            =>  $app->get_client_ip(),
                "tel"           =>  $tel_encrypt,
                "smsMessageSid" =>  $result["smsMessageSid"],
                "tel_encrypt"   =>  $tel_md5,
                "dateCreated"   =>  $result["dateCreated"],
                "remark"        =>  $result["msg"],
                "addtime"       =>  time(),
                "status"        =>  1
                );
        }else{
            $smsData = array(
                "cid"=>$_SESSION["cityId"],
                "ip"=>$app->get_client_ip(),
                "tel"=>$tel_encrypt,
                "tel_encrypt"=>$tel_md5,
                "remark"=>$result["msg"],
                "addtime"=>time(),
                "status"=>0
                );
        }
        $logsend->addLog($smsData);
        return $result["status"] == 1?true:false;
    }
}