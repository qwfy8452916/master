<?php
namespace User\Common\Controller;
use User\Common\Controller\UserCenterBaseController;
class CompanyBaseController extends UserCenterBaseController{
    //装修公司基础信息
    var $baseInfo = null;
    public function _initialize(){
        parent::_initialize();
        if(!isset($_SESSION["u_userInfo"])){
            if(IS_AJAX){
                $this->ajaxReturn(array("data"=>"","info"=>"您的登录已超时,请重新登录","status"=>0));
            }else{
                header("LOCATION:http://u.qizuang.com");
            }
            die();
        }

        if($_SESSION["u_userInfo"]["classid"] != 3){
            if(IS_AJAX){
                 $this->ajaxReturn(array("data"=>"","info"=>"无效的请求,请返回用户中心首页","status"=>0));
            }else{
                header("LOCATION:http://u.qizuang.com/home/");
            }
            die();
        }

        $this->baseInfo = $this->getCompanyInfoByAdmin(session("u_userInfo.id"),session("u_userInfo.cs"));
        $this->baseInfo["unreadsystem"] = $this->getUnSystemNoticeCount(session("u_userInfo.id"));
    }


    /**
     * 获取装修公司基本信息
     * @param  [type] $comid [description]
     * @param  [type] $cs    [description]
     * @return [type]        [description]
     */
    private function getCompanyInfoByAdmin($comid,$cs){
        $user =  D("User")->getCompanyInfoByAdmin($comid,$cs);
        return $user;
    }

    /**
     * 获取用户的未读信息
     * @param  [type] $comid [公司编号]
     * @param  [type] $cs    [所在城市]
     * @return [type]        [description]
     */
    private function getUnSystemNoticeCount($id){
        $count = D("Usersystemnotice")->getUnSystemNoticeCount($id);
        if(count($count)> 0){
            if (isset( $count["unreadsystem"])) {
                return $count["unreadsystem"];
            }
        }
        return 0;
    }

}