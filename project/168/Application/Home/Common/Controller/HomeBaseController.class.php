<?php
namespace Home\Common\Controller;
use Common\Controller\BaseController;
class HomeBaseController extends BaseController {
    public function _initialize(){
        parent::_initialize();
        $this->User = session('uc_userinfo');
        $this->city = array_filter(getMyCityIds());

        if(empty($this->User)){
            if(IS_AJAX){
                $this->ajaxReturn(array("data"=>"","info"=>"您的登陆超时了,请重新登陆！","status"=>0));
            }else{
                $url = 'http://168uc.'.C("QZ_YUMING");
                redirect($url);
            }
        }

        //加载菜单
        $this->initMenu();
        //检查菜单权限
        $this->check_auth();
    }

    /**
     * 获取管辖的用户列表
     * @return [type] [description]
     */
    public function getUserList(){
        if($this->User['uid'] == 1){
            $users = D("Adminuser")->getAllUserList();
        }else{
            if(!empty($this->city)){
                //管辖城市
                $users = D("Adminuser")->getMyUserList($this->User["groups"],$this->city,$this->User["id"]);
            }
        }

        //添加名称首字母
        import('Library.Org.Util.App');
        $app = new \app();
        $edition = array();
        foreach ($users as $key => $value) {
            $str = $app->getFirstCharter($value["name"]);
            $users[$key]["char_name"] = $str.$value["name"];
            $edition[] = $str;
        }
        array_multisort($edition, SORT_ASC,SORT_STRING,$users);
        return $users;
    }

    /**
     * 获取用户的角色管辖范围
     * @return [type] [description]
     */
    public function getRoleList(){
        if($this->User['uid'] == 1){
            $roles = D("RbacRole")->getAllRoles();
        }else{
            if(!empty($this->User["groups"])){
                $roles = D("RbacRole")->getMyRoleList($this->User["groups"]);
            }
        }
        return $roles;
    }


    /**
     * 获取菜单列表
     * @return [type] [description]
     */
    public function getChildMenuList($parentid = null,$data = null,$node_list = null){
        $arr = array();
        foreach ($data as $key => $value) {
            if($value["parentid"] == $parentid){
                $child = $this->getChildMenuList($value["nodeid"],$data,$node_list);
                if(!empty($child)){
                    if(!empty($child[$value["nodeid"]])){
                        $value["child"] = $child[$value["nodeid"]];
                    }
                }
                $arr[$value["parentid"]][] = $value;
            }
        }
        return $arr;
    }

    /**
     * 初始化动态菜单
     * @return [type] [description]
     */
    private function initMenu(){
        //获取所有的菜单
        $menus = getMenuList(false);

        //获取自己的权限菜单
        //如果权限菜单不存在
        if(!session("?uc_userinfo.auth_menu")){
            //非管理员加载自己的菜单
            if(session("uc_userinfo.uid") != 1){
                $roleList = D("RbacNodeRole")->getUserRoleNode(session("uc_userinfo.uid"));
                foreach ($roleList as $key => $value) {
                    $nodeList[$value["node_id"]] = $value["node_id"];
                }
            }else{
                //管理员加载全部菜单
                foreach ($menus as $key => $value) {
                    $nodeList[$value["nodeid"]] = $value["nodeid"];
                }
            }
            session("uc_userinfo.auth_menu",$nodeList);
        }

        $auth_menu = session("uc_userinfo.auth_menu");
        $url =  $_SERVER["REQUEST_URI"];
        $path = getUrlPath($url);

        //加载自己的菜单
        foreach ($menus as $key => $value) {
            foreach ($auth_menu as $val) {
                if((string)$value["nodeid"] === (string)$val && $value["version"] == 2){
                    $link = getUrlPath($value["link"]);
                    if(!empty($path) && $path == $link){
                        $value["active"] = 1;
                        $parentid = $value["parentid"];
                    }
                    $myMenu[] = $value;
                    break;
                }
            }
        }

        if(!empty($parentid)){
            foreach ($myMenu as $key => $value) {
                if($parentid == $value["nodeid"]){
                    $myMenu[$key]["active"] = 1;
                }
            }
        }

        //合并为树形菜单
        foreach ($myMenu as $key => $value) {
            if($value["level"] == 1){
                $list[$key] = $value;
                $arr = $this->getChildMenuList($value["nodeid"],$myMenu);
                if(count($arr) > 0){
                    $value["child"] = $arr[$value["nodeid"]];
                    $list[$key] = $value;
                }
            }
        }

        $this->assign("base_tree_menu",$list);
    }

    /**
     * 检查菜单权限
     * @return [type] [description]
     */
    private function check_auth($url){
        //超级管理员不检查
        $url =  $_SERVER["REQUEST_URI"];
        $path = getUrlPath($url);
        if(!empty($path)){
            $menus = getMenuList(true);
            foreach ($menus as $key => $value) {
                $link = getUrlPath($value["link"]);
                if($path == $link && $value["version"] == 2){
                    $nodeId[] = $value["nodeid"];
                    $menu[] = $value;
                }
            }

            //先找出所有符合URL的菜单的父类信息
            foreach ($menu as $key => $value) {
                foreach ($menus as $k => $val) {
                    if ($value["parentid"] == $val["nodeid"]  && $value["version"] == 2) {
                        $link =  getUrlPath($val["link"]);
                        $prentList[$link] = $val;
                        break;
                    }
                }
            }

            //获取当前的父菜单信息
            $referer = getUrlPath($_SERVER["HTTP_REFERER"]);
            $nowLink = $prentList[$referer];

            if (count($nowLink) > 0) {
                //获取父类菜单的子类信息
                foreach ($menus as $k => $val) {
                    if ($nowLink["nodeid"] == $val["parentid"]  && $value["version"] == 2) {
                       $nowLinkChild[] = $val["nodeid"];
                    }
                }
            }

            //定位当前的页面
            foreach ($menu as $key => $value) {
                if (in_array($value["nodeid"],$nowLinkChild)) {
                    $nowMenu = $value;
                    break;
                }
            }

            if (count($nowMenu) > 0 ) {
                if ($nowMenu["enabled"] == 0) {
                    if(IS_AJAX){
                        $this->ajaxReturn(array("data"=>"","info"=>"该菜单已删除！","status"=>0));
                    }else{
                        $this->_error('该菜单已删除！');
                    }
                }
            }

            if(session("uc_userinfo.uid") != 1){
                $auth_menu = session("uc_userinfo.auth_menu");
                if(count($nowMenu) > 0 ){

                    if (!array_key_exists($nowMenu["nodeid"], $auth_menu)) {
                        if(IS_AJAX){
                            $this->ajaxReturn(array("data"=>"","info"=>"您无权访问该页面！","status"=>0));
                        }else{
                            $this->_error('您无权访问该页面！');
                        }
                    }
                }
            }
        }
    }

    public function pageError(){
        header("HTTP/1.1 404 Not Found");
        header("Status: 404 Not Found");
        $this->error('您访问的页面被外星人抓走了  _(:3 」∠)_');
    }

}