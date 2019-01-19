<?php
namespace User\Controller;
use User\Common\Controller\UserBaseController;
class UserinfoController extends UserBaseController{
    public function index(){
        //获取基本信息
        $info["user"] = $this->baseInfo;

        //获取用户默认头像列表
        $options = D("Options")->getOptionName("default_logo_list","yes");
        $logos = unserialize($options["option_value"]);
        $info["logos"] = $logos;
        $this->assign("info",$info);
        //侧边栏
        $this->assign("nav",4);
        $this->display();
    }

    /**
     * 编辑用户信息
     * @return [type] [description]
     */
    public function editInfo(){
        if($_POST){
            import('Library.Org.Util.Fiftercontact');
            $logo = I("post.logo");
            if(check_imgPath($logo)){
                $filter = new \Fiftercontact();
                $data = array(
                        "name"=>$filter->filter_title(I("post.name")),
                        "cs"=>I("post.cs"),
                        "qx"=>I("post.qx"),
                        "sex"=>I("post.sex"),
                        "tel"=>I("post.tel"),
                        "mail"=>I("post.mail"),
                        "qq"=>I("post.qq"),
                        "logo"=>$logo
                              );

                $i = D("User")->edtiUserInfo($_SESSION["u_userInfo"]["id"],$data);
                if($i!== false){
                    $_SESSION["u_userInfo"]["cs"] = I("post.cs");
                    $_SESSION["u_userInfo"]["qx"] = I("post.qx");
                    $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
                }
            }
            $this->ajaxReturn(array("data"=>"","info"=>"操作失败,请稍后再试！","status"=>0));
        }
    }


}