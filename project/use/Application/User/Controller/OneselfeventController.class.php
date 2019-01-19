<?php
namespace User\Controller;
use User\Common\Controller\CompanyBaseController;
class OneselfeventController extends CompanyBaseController{

    public function _initialize()
    {
        parent::_initialize();//先去走父类的构造
        //为了避免SESSION的丢失,ON字段获取不到,现从数据库中查询ON字段
        $userInfo = D("User")->getSingleUserInfoById($_SESSION["u_userInfo"]["id"]);
        if(count($userInfo) == 0){
             $this->ajaxReturn(array("data"=>"","info"=>"您的登录超时了,请重新登录！","status"=>0));
        }
        $this->assign("nav",11);
    }


    public function index()
    {
        $info["user"] = $this->baseInfo;
        //获取自主活动列表
        $pageIndex = 1;
        $pageCount = 10;
        if(I("get.p") !== ""){
            $pageIndex = I("get.p");
        }
        if (intval(I('get.state')) != '') {
            $state = intval(I('get.state'));
            //正在进行
            if($state == '1'){
                $condition['types'] = '1';
            }
            //等待中
            elseif ($state == '2') {
                $condition['types'] = '0';
            }
            //过期活动
            elseif ($state == '3') {
                $condition['types'] = '-1';
            }
            //暂停
            elseif ($state == '4') {
                $condition['types'] = '2';
            }else{
                $condition = '';
            }
        }

        $event = $this->getallevent($_SESSION["u_userInfo"]["id"],$condition,$pageIndex,$pageCount);

        $this->assign('event',$event['info']);
        $this->assign('info',$info);
        $this->assign('page',$event['page']);
        $this->display();
    }

    /**
     * 新增/编辑模块
     * @return [type] [description]
     */
    public function eventup()
    {
        $info["user"] = $this->baseInfo;
        import('Library.Org.Util.Fiftercontact');
        $filter = new \Fiftercontact();
        if ($_POST) {
            //为了避免SESSION的丢失,ON字段获取不到,现从数据库中查询ON字段
            $userInfo = D("User")->getSingleUserInfoById($_SESSION["u_userInfo"]["id"]);
            if(count($userInfo) == 0){
                 $this->ajaxReturn(array("data"=>"","info"=>"您的登录超时了,请重新登录！","status"=>0));
            }

            $content =htmlspecialchars_decode(I("post.content"));

            if($userInfo["on"] == 2){
                $content = $filter->filter_common($content,array("Sbc2Dbc","filter_empty",array("filter_sensitive_words",array(2,3,4,5)),"filter_link"));

            }else{
                $content = $filter->filter_common($content,array("Sbc2Dbc","filter_script",array("filter_sensitive_words",array(2,3,4,5)),"filter_script"));
            }
            $title =  $filter->filter_title(I("post.title"));
            $data = array(
                    "title"=>$title,
                    "text"=> $content,
                    "start"=>strtotime(I('post.start')),
                    "end"=>strtotime(I('post.end')),
                          );
            if (I("post.id") !== "") {
                //编辑提交
                $id = I("post.id");
                $log_id = $id;
                $data["uptime"] = time();
                $result = D("Oneself")->editInfo($id,$_SESSION["u_userInfo"]["id"],$data);
                $msg = "用户编辑文章【".$title."】 成功";
            }else{
                //新建提交
                $data["cid"] = $_SESSION["u_userInfo"]["id"];
                $data["time"] = time();
                $data["uptime"] = time();
                $result = D("Oneself")->addEvent($data);
                $log_id = $result;
                $msg = "用户添加文章【".$title."】 成功";
            }

            if ($result !== false) {
                //改变装修公司表活动记录数
                $this->changeUserSales($log_id);
                //记录日志
                $this->ajaxReturn(array("data"=>$result,"info"=>"","status"=>1));
            }else{
                $this->ajaxReturn(array("data"=>"","info"=>"操作失败！","status"=>0));
            }

        }else{
            if(I("get.id") !== ""){
                //编辑状态
                $id = I("get.id");
                $event = D("Oneself")->getEventByCid($id,$_SESSION["u_userInfo"]["id"]);
                //$article["text"] = preg_replace("/\s/","",$article["text"]);
                foreach ($event as $key => $value) {
                    $event[$key]['start'] = date('Y-m-d', $value['start']);
                    $event[$key]['end'] = date('Y-m-d', $value['end']);
                }
                $info['event'] = $event['0'];
            }
/*            //文章分类
            $articleType = D("Infotype")->getTypes();
            //删除优惠信息,暂时先删除最后一个
            array_pop($articleType);
            $info["articleType"] = $articleType;*/
            //基本信息
            //$info["user"] = $this->baseInfo;
            $this->assign("info",$info);
             //tab栏
            //$this->assign("tabNav",1);
            //侧边栏

            $this->display();
        }
    }
    /**
     * 暂停活动
     * @return [type] [description]
     */
    public function stopevent()
    {
        if ($_POST) {
            $id = intval(I('post.id'));
            $state = intval(I('post.state'));
            if ($state == 1) {
                $data['state'] = 0;
            }else{
                $data['state'] = 1;
            }
            $result = D('Oneself')->stopEvent($id,$_SESSION["u_userInfo"]["id"],$data);
            if ($result !== false) {
                //改变装修公司表活动记录数
                $this->changeUserSales($id);
                //记录日志
                $this->ajaxReturn(array("data"=>$result,"info"=>"","status"=>1));
            }
        }
        $this->ajaxReturn(array("data"=>'',"info"=>"操作失败","status"=>0));
    }

    /**
     * 获取所有自主活动列表
     * @return [type] [description]
     */
    public function getallevent($cid,$condition,$pageIndex,$pageCount)
    {
        $count = D('Oneself')->getallEventCount($cid,$condition);
        if($count > 0){
            import('Library.Org.Page.Page');
            //自定义配置项
            $config  = array("prev","next");
            $page = new \Page($pageIndex,$pageCount,$count,$config);
            $pageTmp =  $page->show();

            $info = D('Oneself')->getallEvent($cid,$condition,($page->pageIndex-1)*$pageCount,$pageCount);
            $time = time();
            foreach ($info as $key => $value) {
                //根据时间判断状态

                //默认状态是0：等待中，当处于活动时间中，将状态变成正在经行中“1”
                if ($value['start'] <= $time && $value['end'] >= $time) {
                    if ($info[$key]['types'] != '1') {
                        $info[$key]['types'] = '1';
                        $data['types'] = 1;
                        D('Oneself')->stopEvent($value['id'],$cid,$data);
                    }
                }
                //如果结束时间小于当前时间，则活动过期
                elseif ($value['end'] < $time) {
                    if ($info[$key]['types'] != '-1') {
                        $info[$key]['types'] = '-1';
                        $data['types'] = -1;
                        D('Oneself')->stopEvent($value['id'],$cid,$data);
                    }
                }
                elseif ($value['start'] > $time) {
                    if ($info[$key]['types'] != '0') {
                        $info[$key]['types'] = '0';
                        $data['types'] = 0;
                        D('Oneself')->stopEvent($value['id'],$cid,$data);
                    }

                }

                $info[$key]['start'] = date('Y-m-d', $value['start']);
                $info[$key]['end'] = date('Y-m-d', $value['end']);
                $info[$key]['time'] = date('Y-m-d', $value['time']);
            }
            return array("info"=>$info,"page"=>$pageTmp);
        }
    }

    /**
     * 删除活动
     * @return [type] [description]
     */
    public function delevent()
    {
        if($_POST){
            $id = intval(I("post.id"));
            $i = D('Oneself')->delEvent($id,$_SESSION["u_userInfo"]["id"]);
            if($i !== false){
                //改变装修公司表活动记录数
                $this->changeUserSales($id);
                //导入扩展文件
                /*import('Library.Org.Util.App');
                $app = new \App();
                //记录日志
                $data = array(
                  "username"=>$_SESSION["u_userInfo"]["name"],
                  "userid"=>$_SESSION["u_userInfo"]["id"],
                  "ip"=>$app->get_client_ip(),
                  "user_agent"=>$_SERVER["HTTP_USER_AGENT"],
                  "info"=>"用户删除文章【id:".$id."】 成功",
                  "time"=>date("Y-m-d H:i:s"),
                  "action"=>CONTROLLER_NAME."/".ACTION_NAME
                );
                D("Loguser")->addLog($data);*/
                $this->ajaxReturn(array("data"=>"","info"=>"","status"=>1));
            }
        }
        $this->ajaxReturn(array("data"=>"","info"=>"操作失败！","status"=>0));
    }

    /**
     * 改变装修公司表活动记录数
     * @param $log_id 活动id
     */
    private function changeUserSales($log_id)
    {
        $articleInfo = D('CompanyActivity')->getCompanyActiveInfoById($log_id); //获取公司id
        $articleCount = D('CompanyActivity')->getCompanyActiveCountByIds($articleInfo['cid']);
        D('User')->edtiUserInfo($articleInfo['cid'], ['sales_count' => $articleCount]);
    }

}
