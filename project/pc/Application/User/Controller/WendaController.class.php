<?php
namespace User\Controller;
use User\Common\Controller\UserBaseController;
class WendaController extends UserBaseController{

    public function _initialize(){
        if(!isset($_SESSION["u_userInfo"])){
           header("LOCATION:http://u.qizuang.com");
        }
        //如果城市字段为空，则先选择所在城市
        if(empty($_SESSION["u_userInfo"]["cs"])){

            $citytmp = $this->fetch("Home/citytmp");
            $this->assign("citytmp",$citytmp);
        }
        $this->baseInfo = $this->getUserInfo($_SESSION["u_userInfo"]["id"]);
        $this->baseInfo["unreadsystem"] = $this->getUnSystemNoticeCount($_SESSION["u_userInfo"]["id"],$_SESSION["u_userInfo"]["cs"]);
        $classid =  $this->baseInfo['classid'];
        $info["user"] = $this->baseInfo;
        $bm = $this->getQuyuByCid($info["user"]['cs']);
        $info["user"]['bm'] = $bm['bm'];

        $this->userInfo = $info;
        if($classid == 1){
            $this->assign("nav",8);
        }
        if($classid == 2){
            $this->assign("nav",9);
        }
        if($classid == 3){
            $this->assign("nav",8);
        }
        $this->assign("title","齐装网");
    }

    public function index(){
        $info = $this->userInfo;
        $time = time();

        $pageIndex = 1;
        $pageCount = 15;
        if(!empty($_GET["p"])){
            $pageIndex = remove_xss($_GET["p"]);
        }
        $condition['orderBy'] = 'a.post_time DESC';
        $condition['uid'] = array("EQ",$info["user"]['id']);
        $result = $this->getQList($condition,$pageIndex,$pageCount);
        $qList = $result['qList'];
        foreach ($qList as $k => $v) {
            $qList[$k]['status'] = $v['status'] == '0' ? 'status-no.png' : 'status-ok.png';
            $qList[$k]['status_alt'] = $v['status'] == '0' ? '未解决' : '已解决';
            $qList[$k]['edit'] = $time <= ($v['post_time'] + 3600 ) ? '<a href="http://'.C('QZ_YUMINGWWW').'/wenda/x'.$v['id'].'.html">修改</a>' : '不能修改';
        }

        $this->assign("qList",$qList);
        $this->assign('page',$result['page']);
        $this->assign("info",$info);

        if($info["user"]['classid'] == 3){
            $this->display('company_index');
        }else{
            $this->display('index');
        }
    }

    public function answer(){
        //获取基本信息
        $info = $this->userInfo;
        $time = time();

        //取问题列表
        $pageIndex = 1;
        $pageCount = 15;
        if(!empty($_GET["p"])){
            $pageIndex = remove_xss($_GET["p"]);
        }

        //取问题列表
        $condition['orderBy'] = 'a.post_time DESC';
        $condition['uid'] = array("EQ",$info["user"]['id']);

        $result = $this->getAList($condition,$pageIndex,$pageCount);
        //dump($result);
        /*
        这里可以有以下几种状态：
        1：已采纳
        2：未采纳
        3：已采纳别人
        */
        $qList = $result['qList'];
        //dump($qList);

        foreach ($qList as $k => $v) {
            $qList[$k]['content'] = mbstr(htmlspecialchars(strip_tags($v['content'])),0,95);
            $qList[$k]['status'] = $v['status'] == '0' ? 'status-no.png' : 'status-ok.png';
            $qList[$k]['status_alt'] = $v['status'] == '0' ? '未解决' : '已解决';
            $qList[$k]['agree'] = $v['agree'] == '0' ? '' : $v['agree'];
            $qList[$k]['comments'] = $v['comments'] == '0' ? '' : $v['comments'];
            $qList[$k]['edit'] = $time <= ($v['post_time'] + 3600 ) ? '<a href="http://'.C('QZ_YUMINGWWW').'/wenda/x'.$v['id'].'.html">修改</a>' : '不能修改';
        }
        $this->assign("qList",$qList);
        $this->assign('page',$result['page']);
        $this->assign("info",$info);
        if($info["user"]['classid'] == 3){
            $this->display('company_answer');
        }else{
            $this->display('answer');
        }
    }

    //获取用户基本信息
    private function getUserInfo($uid){
        return M('user')->field('*')->where(array('id' => $uid))->find();
    }

    //获取用户 BM 值
    private function getQuyuByCid($cityid){
        return M('quyu')->field('bm')->where(array('cid' => $cityid))->find();
    }

    //根据条件获取列表并分页
    private function getQList($condition,$pageIndex = 1,$pageCount = 10){
        import('Library.Org.Page.Page');
        $result = D("Common/Ask")->getQListByCategory($condition,($pageIndex-1) * $pageCount,$pageCount);
        $count = $result['count'];
        $qList = $result['result'];
        $config  = array("prev","first","last","next");
        $page = new \Page($pageIndex,$pageCount,$count,$config);
        $pageTmp =  $page->show();
        return array("qList"=>$qList,"page"=>$pageTmp);
    }

    //根据用户ID取回答列表，包括提问标题。
    private function getAList($condition,$pageIndex = 1,$pageCount = 10){
        import('Library.Org.Page.Page');
        $result = D("Common/Ask")->getMyAnwser($condition['uid'],$condition['orderBy'],($pageIndex-1) * $pageCount,$pageCount);
        $count = $result['count'];
        $qList = $result['result'];
        $config  = array("prev","first","last","next");
        $page = new \Page($pageIndex,$pageCount,$count,$config);
        $pageTmp =  $page->show();
        return array("qList"=>$qList,"page"=>$pageTmp);
    }


    /**
     * 获取业主的信息
     * @return [type] [description]
     */
    public function getUserInfoByAdmin($id,$cs){
        $user = D("User")->getUserInfoByAdmin($id,$cs);
        return $user;
    }

     /**
     * 获取用户的未读信息
     * @param  [type] $comid [公司编号]
     * @param  [type] $cs    [所在城市]
     * @return [type]        [description]
     */
    private function getUnSystemNoticeCount($id,$cs){
        $count = D("Usersystemnotice")->getUnSystemNoticeCount($id,$cs,1);
        if(count($count)> 0){
            return $count["unreadsystem"];
        }
        return 0;
    }

}