<?php
/**
 * 设计师系统消息管理
 */
namespace User\Controller;
use User\Common\Controller\DesignerBaseController;
class DesignermessageController extends DesignerBaseController{
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
        $this->assign("nav",8);
        $this->display();
    }

    private function getMyNotice($id,$cs,$pageIndex,$pageCount)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);


        $count = D("Usersystemnotice")->getSystemNoticeCount($id,$cs,2);
        if($count > 0){
            import('Library.Org.Page.Page');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \Page($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();
            $list = D("Usersystemnotice")->getSystemNotice($id,$cs,($page->pageIndex-1)*$pageCount,$pageCount,2);
            return array("notices"=>$list,"page"=>$pageTmp);
        }
        return null;
    }
}