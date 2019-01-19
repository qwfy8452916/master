<?php
namespace User\Controller;
use User\Common\Controller\CompanyBaseController;
class MessageController extends CompanyBaseController{
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
        //获取装修公司的基本信息
        $info["user"] = $this->baseInfo;
        $this->assign("info",$info);
        //侧边栏
        $this->assign("nav",2);
        $this->display();
    }

    public function history(){
        //获取装修公司的基本信息
        $info["user"] = $this->baseInfo;
        //搜索操作记录
         //默认1个月
        $begin = date("Y-m-d H:i:s",strtotime("-1 month"));
        $end = date("Y-m-d H:i:s",time());
        if(I("get.begin") !== ""){
            $begin = I("get.begin");
            $info["begin"] = $begin;
        }
        if(I("get.end") !== ""){
            $end = I("get.end");
            $info["end"] = $end;
            $end = date("Y-m-d H:i:s",strtotime("+1 day",strtotime($end)));
        }

        //限定逻辑 筛选时间，起止时间最多只能选一个月
        if (
            (strtotime($end)- strtotime($begin)) > 3600 * 24 * 31
            ) {
            $this->_error();
        }

        $logs = $this->getLogs($_SESSION["u_userInfo"]["id"],$begin,$end);
        $info["logs"] = $logs;
        $this->assign("info",$info);
        //侧边栏
        $this->assign("nav",2);
        //侧边栏
        $this->assign("tabNav",1);
        $this->display();
    }

    private function getLogs($uid,$begin,$end){
        $result = D("Loguser")->getLogList($uid,$begin,$end);
        $logs = array();
        foreach ($result as $key => $value) {
            $time = date("Y-m-d",strtotime($value["time"]));
            if(!array_key_exists($time, $logs)){
                $logs[$time]["date"] = strtotime($value["time"]);
            }
            $value["time"] = strtotime($value["time"]);
            $logs[$time]["child"][] = $value;
        }
        return $logs;
    }

    private function getMyNotice($id,$cs,$pageIndex,$pageCount)
    {
        //过滤
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);

        $count = D("Usersystemnotice")->getSystemNoticeCount($id,$cs);
        if($count > 0){
            import('Library.Org.Page.Page');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \Page($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();
            $list = D("Usersystemnotice")->getSystemNotice($id,$cs,($page->pageIndex-1)*$pageCount,$pageCount);
            return array("notices"=>$list,"page"=>$pageTmp);
        }
        return null;
    }
}