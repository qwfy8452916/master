<?php
namespace User\Controller;
use User\Common\Controller\CompanyBaseController;
class OrdersController extends CompanyBaseController{
    public function index(){
        $user = $_SESSION["u_userInfo"];
        if($_POST){
            $pass = I("post.pass");
            //查看该用户目前是否是被锁状态
            $log = D("Logorderpass")->getLastLockLog($user["id"]);
            if(count($log) > 0){
                if($log["is_lock"] == 1 && $log["unlock_time"] > time()){
                    $this->ajaxReturn(array("data"=>"","info"=>"订单查看功能被锁中,预计可看订单时间为".date("Y-m-d H:i:s",$log["unlock_time"])));
                    die();
                }
            }

            //查询装修公司的订单查看密码
            $orderPass = D("Orderpass")->getOrderPassById($user["id"]);

            if(count($orderPass) > 0){
				$company_name = empty($user["jc"]) ? $user["qc"] : $user["jc"];
                //记录查看订单日志
                $logData = array(
                        "company_id"=>$user["id"],
                        "company_name"=> $company_name,
                        "act_name"=>"输入密码查看订单",
                        "act_status"=>"success",
                        "act_time"=>time(),
                        "is_lock"=>0
                        );
                $status = 1;
                if($orderPass["pass"] != md5($pass)){
                    $logData["act_status"] = 'failed';
                    //查询上两次的查看状态
                    $logCount = D("Logorderpass")->getLastTwiceLockStatus($user["id"]);
                    if($logCount[0]["lockcount"] == 2){
                        $logData["is_lock"] = 1;
                        //锁定时间
                        $logData["lock_time"] = time();
                        //解锁时间
                        $logData["unlock_time"] = strtotime("+10 minutes");
                    }
                    $msg = '查看订单密码不正确,请重新输入';
                    $status = 0;
                }
                D("Logorderpass")->saveLog($logData);
                //记录用户日志
                //导入扩展文件
                import('Library.Org.Util.App');
                $app = new \App();
                //记录日志
                $data = array(
                      "username"=>$user["name"],
                      "userid"=>$user["id"],
                      "ip"=>$app->get_client_ip(),
                      "user_agent"=>$_SERVER["HTTP_USER_AGENT"],
                      "info"=>"用户查看订单 失败",
                      "time"=>date("Y-m-d H:i:s"),
                      "action"=>CONTROLLER_NAME."/".ACTION_NAME
                      );
                if($status == 1){
                    $data["info"] = "用户查看订单 成功";
                    $_SESSION["u_userInfo"]["orderpass"] = 1;
                }
                D("Loguser")->addLog($data);
                $this->ajaxReturn(array("data"=>"","info"=>$msg,"status"=>$status));
                die();
            }else{
                $this->ajaxReturn(array("data"=>"","info"=>"您还没有设置密码,请先设置密码","status"=>0));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
            die();
        }else{
            //查询用户信息
            //获取装修公司的基本信息
            $info["user"] = $this->baseInfo;
            $info["user"]["orderpass"] = $user["orderpass"];
            //如果查看订单的标识存在,查询该公司的订单
            if(!empty($user["orderpass"])){
                $pageIndex = 1;
                $pageCount = 10;
                if(I("get.p") !== ""){
                    $pageIndex = I("get.p");
                }

                if(I("get.isread") !== ""){
                    $isread = I("get.isread");
                    if($isread != 0 && $isread != 1){
                        $isread = "";
                    }
                    $info['orderInfo']["isread"] = $isread;
                }

                if(I("get.keyword") !== ""){
                    $text = I("get.keyword");
                    $info['orderInfo']["keyword"] = $text;
                }

                $orders = $this->getOrders($user["id"],$text,$isread,$pageIndex,$pageCount);
                $info['orderInfo']["orderlist"] = $orders["orders"];
                $info['orderInfo']["page"] = $orders["page"];
                //订单筛选条件
                $readStatus = array(
                            array("value"=>"-1","name"=>"全部"),
                            array("value"=>"1","name"=>"已读"),
                            array("value"=>"0","name"=>"未读"),
                                    );
                 $info['orderInfo']["readStatus"] = $readStatus;
            }else{
                //查询装修公司是否有订单密码记录
                $orderpass = D("Orderpass")->getOrderPassById($info["user"]["id"]);
                if(count($orderpass) == 0){
                    $info["passinit"] = 1;
                }
            }
            $this->assign("info",$info);
            //侧边栏
            $this->assign("nav",3);
            $this->display();
        }

    }

    /**
     * 修改订单查看密码
     * @return [type] [description]
     */
    public function orderchange(){
        if($_POST){
            $data = array(
                    "pass"=>I("post.password"),
                    "confirmpassword"=>I("post.confirmpassword")
                          );
            $orderpass = D("Orderpass");
            if($orderpass->create($data)){
                    $data["pass"] = md5($data["pass"]);
                    //查询该公司的原查询密码,新密码不能和旧密码一致
                    $pass = $orderpass->getOrderPassById($_SESSION["u_userInfo"]["id"]);
                    if(count($pass) > 0){
                        if($pass["pass"] == $data["pass"]){
                           $this->ajaxReturn(array("data"=>"","info"=>"新密码不能和旧密码一致","status"=>0));
                        }
                    }

                    //查询装修公司的登录密码，查询密码不能和登录密码一致
                    $user = D("User")->getSingleUserInfoById($_SESSION["u_userInfo"]["id"]);

                    if($user["pass"] == $data["pass"]){
                        $this->ajaxReturn(array("data"=>"","info"=>"订单查看密码不能和登录密码一致","status"=>0));
                    }

                    $i = $orderpass->editPass($_SESSION["u_userInfo"]["id"],$data);

                    if($i !== false){
                        //导入扩展文件
                        import('Library.Org.Util.App');
                        $app = new \App();
                        //记录日志
                        $data = array(
                              "username"=>$user["name"],
                              "userid"=>$user["id"],
                              "ip"=>$app->get_client_ip(),
                              "user_agent"=>$_SERVER["HTTP_USER_AGENT"],
                              "info"=>"用户修改订单查看密码 修改成功",
                              "time"=>date("Y-m-d H:i:s"),
                              "action"=>CONTROLLER_NAME."/".ACTION_NAME
                              );
                        D("Loguser")->addLog($data);
                        $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
                    }
                    $this->ajaxReturn(array("data"=>"","info"=>"操作失败！","status"=>0));
            }else{
                $this->ajaxReturn(array("data"=>"","info"=>$orderpass->getError(),"status"=>0));
            }

        }else{
            //获取装修公司的基本信息
            $info["user"] = $this->baseInfo;
            //判断用户绑定了是安全邮箱还是安全电话
            if( $info["user"]["tel_safe_chk"] &&  $info["user"]["mail_safe_chk"]){
                //如果全部绑定默认发送电话
                $info["user"]["safe_account"] = "all";
            }elseif( $info["user"]["tel_safe_chk"]){
                $info["user"]["safe_account"] = "tel";
            }elseif( $info["user"]["mail_safe_chk"]){
                $info["user"]["safe_account"] = "mail";
            }
            $this->assign("info",$info);
            //侧边栏
            $this->assign("nav",3);
            //tab栏
            $this->assign("tabNav",3);
            $this->display();
        }
    }

    /**
     * 验证绑定轮询
     * @return [type] [description]
     */
    public function polling(){
        import('Library.Org.Util.Mywechat');
        $Mywechat = new \Mywechat();
        $result = $Mywechat->wxscanstatus();
        if($result["status"] == 3){
            //重新绑定二维码
            $qr = $this->getMyQrCode();
            $result["data"] = $qr["img"];
        }
        $this->ajaxReturn($result);
    }

    /**
     * 解除绑定微信订单通知
     * @return [type] [description]
     */
    public function unbindwx(){
        if($_POST){
            if(isset($_POST["action"]) && strtolower($_POST["action"]) == "all"){
                $comid = session("u_userInfo.id");
                $user = D("User");
                $i = D("Orderwechar")->unbindWechat($comid);
            }else{
                $wx_unionid = I("post.id");
                $i = D("Orderwechar")->unbindWechat($wx_unionid);
            }

            if($i !== false){
                $this->ajaxReturn(array("data"=>"","info"=>"操作成功！","status"=>1));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"操作失败！","status"=>0));
        }
         $this->ajaxReturn(array("data"=>"","info"=>"未知错误！","status"=>0));
    }

    /**
     * 微信接收订单
     * @return [type] [description]
     */
    public function wechat(){
        //侧边栏
        $this->assign("nav",3);
        //tab栏
        $this->assign("tabNav",2);
        //查询该公司已绑定的微信帐号
        //查询公司微信绑定的信息
        $wechatList = D("Orderwechar")->getOrderNoticeList($_SESSION["u_userInfo"]["id"]);

        if(count($wechatList) > 0){
            foreach ($wechatList as $key => $value) {
                $wx_unionid[] = $value["wx_openid"];
            }
            //过滤重复的数据
            $wx_unionid = array_unique($wx_unionid);
            import('Library.Org.Util.Mywechat');
            $Mywechat = new \Mywechat();
            $result = $Mywechat->getWecharUserInfo($wx_unionid);
        }

        $info["users"] = $result;
        //获取装修公司的基本信息
        $baseInfo = $this->baseInfo;
        //获取二维码
        $qr = $this->getMyQrCode();
        $info["qrimg"] = $qr["img"];
        $info["user"] = $baseInfo;
        $this->assign("info",$info);
        $this->display();
    }

    /**
     * 查看订单详情
     * @return [type] [description]
     */
    public function lookorder(){
        $status = array(
                    "1"=>"电话未接通",
                    "2"=>"接通未确定量房时间",
                    "3"=>"未量房",
                    "4"=>"已量房无法联系",
                    "5"=>"已量未到店",
                    "6"=>"方案已看不满意",
                    "7"=>"方案已看在修改",
                    "8"=>"已签约",
                    "9"=>"未签约",
                    "10"=>"方案已看,对比其他方案"
                );
        if($_POST){
            //添加装修公司回访记录
            $id = I("post.id");
            //查询该订单的分配信息
            $result = D("Orders")->getAllocationOrder($id,$_SESSION["u_userInfo"]["id"]);
            if($result > 0){
                //查询上一次的追访状态
                $map = array(
                        "orderid"=>array("EQ",$id),
                        "comid"=>array("EQ",$_SESSION["u_userInfo"]["id"])
                             );
                $review = M("order_company_review")->where($map)->order("id desc")->find();
                if(count($review) > 0){
                    if($review["status"] > I("post.status")){
                        $status_name = $status[$review["status"]];
                        $this->ajaxReturn(array("data"=>"","info"=>"您上次的跟踪状态为:【".$status_name."】,请重新选择跟踪状态","status"=>0));
                    }
                }

                $data = array(
                        "orderid"=>$id,
                        "comid"=>$_SESSION["u_userInfo"]["id"],
                        "status"=>I("post.status"),
                        "time"=>time(),
                        "remark"=>I("post.remark"),
                        "isnew"=>0
                              );
                $i = D("Ordercompanyreview")->addReview($data);
                if($i !== false){
                     $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
                }
                $this->ajaxReturn(array("data"=>"","info"=>"操作失败,您可以重新登录后再试！","status"=>0));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"此订单不是贵公司的,无法添加回访记录!","status"=>0));
        }else{
            $id = I("get.id");
            //查询该订单的分配信息
            $result = D("Orders")->getAllocationOrder($id,$_SESSION["u_userInfo"]["id"]);
            if(count($result) > 0){
                //查询订单信息
                $order = D("Orders")->getOrderInfoById($id);
                if(count($order) > 0){
                    //获取分配的装修公司信息
                    $companys = D("Orders")->getOrdersDistributionCompany($id);
                    header("customer:error03",true);
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
                    $this->assign("order",$order);
                    // $tmp = $this->fetch("ordertmp");
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
                              "info"=>"查看订单详细信息",
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

                    if(in_array($result["type_fw"],array(1,3))){
                        //查询该公司的订单回访记录
                        $result = D("Ordercompanyreview")->gerOrderReviewList($id,$_SESSION["u_userInfo"]["id"]);
                        //获取公司回复的信息
                        $replyList = D("Ordercompanyreviewreply")->getReviewReply($id,$_SESSION["u_userInfo"]["id"]);

                        foreach ($result as $key => $value) {
                            $value["status_name"] = $status[$value["status"]];
                            $reviewList[$value["id"]] = $value;
                        }
                        //将回复内容合并到回访记录中
                        foreach ($replyList as $k => $val) {
                            $reviewList[$val["review_id"]]["reply"][] = $val;
                        }
                        $this->assign("reviewList",$reviewList);
                        $this->assign("isReview",1);
                    }
                    $this->assign("referer",$_SERVER["HTTP_REFERER"]);
                    $this->display("orderdetails");
                }
            }

        }
    }

    /**
     * 申请签单
     * @return [type] [description]
     */
    public function applyorder(){
        if($_POST){
            $id = I("post.id");
            $data = array(
                    "qiandan_companyid"=>$_SESSION["u_userInfo"]["id"],
                    "qiandan_jine"=>I("post.jiage"),
                    "qiandan_addtime"=>time(),
                    "qiandan_info"=>I("post.remark"),
                    "qiandan_status"=>0
                    );
            //查询该订单是否已被申请
            $result = D("Orders")->getOrderInfoById($id);
            unset($result['tel8']);
            if(count($result) > 0){
                if(empty($result["qiandan_companyid"])){
                    // 2013-10-01 后的订单方可申请签单
                    if(strtotime("2013-10-01") < $result["time"]){
                        $i = D("Orders")->editOrder($id,$data);
                        if($i !== false){
                            //导入扩展文件
                            import('Library.Org.Util.App');
                            $app = new \App();
                            //记录日志
                            $data = array(
                              "username"=>$_SESSION["u_userInfo"]["name"],
                              "userid"=>$_SESSION["u_userInfo"]["id"],
                              "ip"=>$app->get_client_ip(),
                              "user_agent"=>$_SERVER["HTTP_USER_AGENT"],
                              "info"=>"用户签单申请 成功",
                              "time"=>date("Y-m-d H:i:s"),
                              "action"=>CONTROLLER_NAME."/".ACTION_NAME,
                              "remark"=>"订单号:".$id
                            );
                            D("Loguser")->addLog($data);
                            $this->ajaxReturn(array("data"=>"","info"=>"签单申请成功！","status"=>1));
                        }
                    }
                    $this->ajaxReturn(array("data"=>"","info"=>"该订单时间太久远了,已无法签单","status"=>0));
                }
                $this->ajaxReturn(array("data"=>"","info"=>"该订单已被其他装修公司签单","status"=>0));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"该订单已被客服删除！","status"=>0));
        }else{
            $id = I("get.id");
            //获取申请签单模版
            $this->assign("orderid",$id);
            $tmp = $this->fetch("applytmp");
            $this->ajaxReturn(array("data"=>$tmp,"info"=>"","status"=>1));
        }
    }

    /**
     * 删除装修公司回访记录
     * @return [type] [description]
     */
    public function delreview(){
        if($_POST){
            $id = I("post.id");
            //查询是否是该公司的回访记录
            $result = D("Ordercompanyreview")->getReviewCountById($id,$_SESSION["u_userInfo"]["id"]);
            if($result > 0){
                $i = D("Ordercompanyreview")->deleteReview($id,$_SESSION["u_userInfo"]["id"]);
                if($i !== false){
                    $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
                }
                $this->ajaxReturn(array("data"=>"","info"=>"操作失败,请刷新重试！","status"=>0));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"这不是您的回访记录,您无权此操作！","status"=>0));
        }
    }

    /**
     * 取消订单申请
     * @return [type] [description]
     */
    public function unapplyorder(){
        if($_POST){
            $id = I("post.id");
            $data = array(
                    "qiandan_companyid"=>0,
                    "qiandan_jine"=>"",
                    "qiandan_addtime"=>"",
                    "qiandan_info"=>"",
                    "qiandan_status"=>null
                    );
            //查询该订单是否已被申请
            $result = D("Orders")->getOrderInfoById($id);
            unset($result['tel8']);
            if(count($result) > 0){
                if($result["qiandan_companyid"] == $_SESSION["u_userInfo"]["id"]){
                    $i = D("Orders")->editOrder($id,$data);
                    if($i !== false){
                        //导入扩展文件
                        import('Library.Org.Util.App');
                        $app = new \App();
                        //记录日志
                        $data = array(
                          "username"=>$_SESSION["u_userInfo"]["name"],
                          "userid"=>$_SESSION["u_userInfo"]["id"],
                          "ip"=>$app->get_client_ip(),
                          "user_agent"=>$_SERVER["HTTP_USER_AGENT"],
                          "info"=>"用户取消签单申请 成功",
                          "time"=>date("Y-m-d H:i:s"),
                          "action"=>CONTROLLER_NAME."/".ACTION_NAME
                        );
                        D("Loguser")->addLog($data);
                        $this->ajaxReturn(array("data"=>"","info"=>"取消签单成功！","status"=>1));
                    }
                }
                $this->ajaxReturn(array("data"=>"","info"=>"该签单不是您签的,无权取消！","status"=>0));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"该订单已被客服删除！","status"=>0));
        }
    }

    /**
     * 查看自主签单详细信息
     * @return [type] [description]
     */
    public function lookinitiativeorder(){
        if($_POST){
            $id = I("post.id");
            //查询自主签单信息、
            $order = D("Orderscompanyreport")->getOrderById($id,$_SESSION["u_userInfo"]["id"]);
            if(count($order) > 0){
                $this->assign("order",$order);
                $tmp = $this->fetch("initiativeordertmp");
                $this->ajaxReturn(array("data"=>$tmp,"info"=>"","status"=>1));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"该订单不是您的订单,无权查看！","status"=>0));
        }
    }


    /**
     * 添加自主签单
     * @return [type] [description]
     */
    public function addinitiativeorder(){
        if($_POST){
            $data = array(
                    "zxfs"=>I("post.zxfs"),
                    "name"=>I("post.name"),
                    "sex"=>I("post.sex"),
                    "tel168"=>I("post.tel"),
                    "cs"=>$_SESSION["u_userInfo"]["cs"],
                    "qx"=>I("post.qx"),
                    "xiaoqu"=>I("post.xiaoqu"),
                    "dz"=>I("post.dz"),
                    "huxing"=>I("post.huxing"),
                    "shi"=>I("post.shi"),
                    "ting"=>I("post.ting"),
                    "wei"=>I("post.wei"),
                    "lx"=>I("post.lx"),
                    "lxs"=>I("post.lxs"),
                    "fangshi"=>I("post.fangshi"),
                    "fengge"=>I("post.fengge"),
                    "yusuanjt"=>I("post.yusuan"),
                    "remarks"=>I("post.remarks"),
                    "order_company_id"=>$_SESSION["u_userInfo"]["id"],
                    "time_add"=>time(),
                    "mianji"=>I("post.mianji"),
                    "time_qd"=>I("post.time_qd")
                          );
            $i = D("Orderscompanyreport")->addOrder($data);
            if($i !== false){
                //导入扩展文件
                import('Library.Org.Util.App');
                $app = new \App();
                //记录日志
                $data = array(
                  "username"=>$_SESSION["u_userInfo"]["name"],
                  "userid"=>$_SESSION["u_userInfo"]["id"],
                  "ip"=>$app->get_client_ip(),
                  "user_agent"=>$_SERVER["HTTP_USER_AGENT"],
                  "info"=>"用户新增自主签单 成功",
                  "time"=>date("Y-m-d H:i:s"),
                  "action"=>CONTROLLER_NAME."/".ACTION_NAME
                );
                D("Loguser")->addLog($data);
                $this->ajaxReturn(array("data"=>"","info"=>"操作成功！","status"=>1));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"操作失败！","status"=>0));
        }else{
            //获取户型列表
            //获取户型列表
            $hx = D("Common/Huxing")->gethx();
            $this->assign("hx",$hx);
            //获取装修风格列表
            $fg = D("Common/Fengge")->getfg();
            $this->assign("fengge",$fg);
            //获取装修方式
            $fangshi  =  D("Common/Fangshi")->getfs();
            $this->assign("fangshi",$fangshi);
            //获取当前城市
            $citys = D("Area")->getCityArray($_SESSION["u_userInfo"]["cs"]);
            $citys["shen"] = $citys["shen"][0];
            $citys["shi"] = $citys["shi"][$_SESSION["u_userInfo"]["cs"]];
            $this->assign("citys",$citys);
            $tmp = $this->fetch("addinitiativeorder");
            $this->ajaxReturn(array("data"=>$tmp,"info"=>"","status"=>1));
        }
    }

    /**
     * 装修公司主动签单
     */
    public function initiative(){
        $user = $_SESSION["u_userInfo"];
        //获取装修公司的基本信息
        $baseInfo = $this->baseInfo;
        $info["user"] = $baseInfo;
        //获取订单信息
        $pageIndex = 1;
        $pageCount = 10;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
        }

        if(I("get.keyword") !== ""){
            $text = I("get.keyword");
            $info['orderInfo']["keyword"] = $text;
        }

        if(I("get.status") !== ""){
            $on = I("get.status");
            if($on != 0 && $on != 1){
                $on = null;
            }
            $info['orderInfo']["on"] = $on;
        }

        $orders = $this->getInitiativeOrders($_SESSION["u_userInfo"]["id"],$on,$text,$pageIndex,$pageCount);
        $info["orderInfo"]["orders"] = $orders["orders"];
        $info["orderInfo"]["page"] = $orders["page"];

        //状态框
        $status = array(
                array("value"=>"-1","name"=>"全部"),
                array("value"=>"1","name"=>"已审核"),
                array("value"=>"0","name"=>"未审核")
                        );
        $info["orderInfo"]["status"] = $status;
        //侧边栏
        $this->assign("nav",3);
        //tab栏
        $this->assign("tabNav",1);
        $this->assign("info",$info);
        $this->display();
    }



    /**
     * 删除自主签单
     * @return [type] [description]
     */
    public function delinitiativeorder(){
        if($_POST){
            $id = I("post.id");
            //查询自主签单信息、
            $order = D("Orderscompanyreport")->getOrderById($id,$_SESSION["u_userInfo"]["id"]);
            if(count($order) > 0){
                $data = array(
                        "deleted"=>1
                              );
                $i = D("Orderscompanyreport")->editOrder($id,$data);
                if($i !== false){
                    //导入扩展文件
                    import('Library.Org.Util.App');
                    $app = new \App();
                    //记录日志
                    $data = array(
                      "username"=>$_SESSION["u_userInfo"]["name"],
                      "userid"=>$_SESSION["u_userInfo"]["id"],
                      "ip"=>$app->get_client_ip(),
                      "user_agent"=>$_SERVER["HTTP_USER_AGENT"],
                      "info"=>"用户删除自主签单 成功",
                      "time"=>date("Y-m-d H:i:s"),
                      "action"=>CONTROLLER_NAME."/".ACTION_NAME
                    );
                    D("Loguser")->addLog($data);
                    $this->ajaxReturn(array("data"=>"","info"=>"操作成功！","status"=>1));
                }
            }
            $this->ajaxReturn(array("data"=>"","info"=>"该订单不是您的订单,无权删除！","status"=>0));
        }
    }

    /**
     * 保存订单查看密码
     * @return [type] [description]
     */
    public function saveorderpass(){
        if($_POST){
            $pass = I("post.pass");
            $data = array(
                "comid"=>$_SESSION["u_userInfo"]["id"],
                "pass"=>md5($pass),
                "addtime"=>date("Y-m-d H:i:s")
                          );
            $i = D("Orderpass")->setOrderPass($data);
            if($i !==  false){
                $_SESSION["u_userInfo"]["orderpass"] = 1;
                $this->ajaxReturn(array("data"=>"","info"=>"操作成功！","status"=>1));
            }
            $this->ajaxReturn(array("data"=>"","info"=>"操作失败！","status"=>0));
        }
    }

    var $bool = true;
    /**
     * 获取二维码图片
     * @return [type] [description]
     */
    private function getMyQrCode(){
        //获取绑定的二维码
        import('Library.Org.Util.Mywechat');
        $Mywechat = new \Mywechat();
        $qr = $Mywechat->getQRUrl(92);
        if($qr !== false ){
            //获取二维码后,添加二维码日志
            if($qr['ticket']){
                $_SESSION['u_wx_ticket'] = $qr['ticket'];
            }
            //添加获取票据日志
            $datatk                      = array();
            $datatk['wx_ticket_now']     = $qr['ticket'];
            $datatk['wx_ticket_now_md5'] = md5($qr['ticket']);
            $datatk['userid']            = $_SESSION['u_userInfo']["id"];
            $datatk['type']              = 'qizuangfw';
            $datatk['sceneid']           = $qr["scene_id"];
            $datatk['time_add']          = time();
            $i = D("Logwxticket")->addLog($datatk);
            if($i !== false){
                return $qr;
            }
        }
        return null;
    }

    /**
     * 获取装修公司自主签单
     * @return [type] [description]
     */
    private function getInitiativeOrders($comid,$on,$text,$pageIndex,$pageCount)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Orderscompanyreport")->getOrdersCount($comid,$on,$text);

        if($count > 0){
            import('Library.Org.Page.Page');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \Page($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();
            $orders =  D("Orderscompanyreport")->getOrders($comid,$on,$text,($page->pageIndex-1)*$pageCount,$pageCount);

            return array("orders"=>$orders,"page"=>$pageTmp);
        }
        return $orders;
    }

    /**
     * 查询订单信息
     * @param  [type] $comid [description]
     * @param  [type] $limit [description]
     * @return [type]        [description]
     */
    private function getOrders($comid,$text,$isread,$pageIndex,$pageCount)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Orders")->getOrderListByComidCount($comid,$text,$isread);
        if($count > 0){
            import('Library.Org.Page.Page');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \Page($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();
            $orders = D("Orders")->getOrderListByComid($comid,$text,$isread,($page->pageIndex-1)*$pageCount,$pageCount);
            return array("orders"=>$orders,"page"=>$pageTmp);
        }
        return $orders;
    }
}