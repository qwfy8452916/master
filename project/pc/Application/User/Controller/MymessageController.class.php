<?php
namespace User\Controller;
use User\Common\Controller\UserBaseController;
class MymessageController extends UserBaseController{
    public function index(){
        if(I("get.id") !== ""){
            //查看消息详细信息
            $id = I("get.id");
            $notice = D("Usersystemnotice")->getNoticeInfoById($id);
            //记录查看日志
            $data = array(
                    "noticeid"=>$id,
                    "userid"=>$_SESSION["u_userInfo"]["id"],
                    "time"=>time()
                          );
            D("Logusersystemnotice")->addLog($data);
            if(count($notice) > 0 ){
                $this->assign("notice",$notice);
            }else{
                $this->_error();
                die();
            }
        }else{
            //获取消息列表
            $pageIndex = 1;
            $pageCount = 10;
            if(I("get.p") !== ""){
                $pageIndex = I("get.p");
            }
            $notices = $this->getMyNotice($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"],$pageIndex,$pageCount);
            $info["notices"] = $notices["notices"];
            $info["page"] = $notices["page"];
        }
        //获取基本信息
        $info["user"] = $this->baseInfo;
        $this->assign("info",$info);
        //侧边栏
        $this->assign("nav",5);
        $this->display();
    }

    private function getMyNotice($id,$cs,$pageIndex,$pageCount){
        $count = D("Usersystemnotice")->getSystemNoticeCount($id,$cs,1);
        if($count > 0){
            import('Library.Org.Page.Page');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \Page($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();
            $list = D("Usersystemnotice")->getSystemNotice($id,$cs,($page->pageIndex-1)*$pageCount,$pageCount,1);
            return array("notices"=>$list,"page"=>$pageTmp);
        }
        return null;
    }
}