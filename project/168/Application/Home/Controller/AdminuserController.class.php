<?php

namespace Home\Controller;
use Home\Common\Controller\HomeBaseController;

/**
 * 用户管理
 */

class AdminuserController extends HomeBaseController{

    public function index(){
        //获取顶级部门
        $topDept = D("Department")->getDepartmentByParentId(0);
        $tab = I("get.tab");
        if (empty($tab)) {
            $tab = $topDept[0]["id"];
        }

        if (!in_array(session("uc_userinfo.uid"),array(1,37,51))) {
            //获取当前用户的最高部门
            $info = D("Department")->getTopDepartmentInfo(session("uc_userinfo.department_id"));
            $tab = $info["id"];
            if (!empty($info["second_id"])) {
                $tab = $info["second_id"];
            }

            if (!empty($info["three_id"])) {
                $tab = $info["three_id"];
            }
            foreach ($topDept as $key => $value) {
                if ($value["id"] != $tab) {
                    unset($topDept[$key]);
                }
            }
        }

        $result = D("Department")->getAllDepartmentByID($tab);
        foreach ($result as $key => $value) {
            if (!array_key_exists($value["id"],$department)) {
                $department[$value["id"]] = array(
                    "id" => $value["id"],
                    "name" => $value["name"],
                );
            }

            if (!array_key_exists($value["second_id"],$department) && !empty($value["second_id"])) {
                $department[$value["second_id"]] = array(
                    "id" => $value["second_id"],
                    "name" => $value["name"]."/".$value["second_name"],
                );
            }

            if (!array_key_exists($value["three_id"],$department) && !empty($value["three_id"]) ) {
                $department[$value["three_id"]] = array(
                    "id" => $value["three_id"],
                    "name" => $value["name"]."/".$value["second_name"]."/".$value["three_name"],
                );
            }
        }

        if ($tab == "22") {
            //客服中心的显示客服组和客服师
            $this->assign("isKf",1);
            //获取客服师长和团长
            $users = $this->getKfGroupInfo();
            $this->assign("kfusers",$users);
        }

        //获取部门下的角色列表
        $list = $this->getAdminUserList($tab,I("get.id"),I("get.role"),I("get.dept"),I("get.state"),I("get.stat"),I("get.time"));


        //获取所有部门
        $list["department"] = $department;

        //获取部门下所有的角色ID
        $result = D("RbacRole")->getRoleListByDept($tab);
        foreach ($result as $key => $value) {
            $ids[] = $value["role_id"];
        }

        //获取部门下所有人员
        if (count($list["uids"]) > 0) {
            $users = D("Adminuser")->getUserListByUid($ids);
            $this->assign("users",$users);
        }
        $this->assign("tab",$tab);
        $this->assign("list",$list);
        $this->assign("topDept",$topDept);
        $this->display();
    }


    //禁封用户
    public function blocked(){
        if($_POST){
            $uid = $_POST["uid"];
            $type = $_POST["type"];

            if($type == '1'){
                $this->sendMessage($uid);
                $time = '0';
            }
            if($type == '2'){
                //禁言3小时
                $time = time() + 10800;
            }
            if($type == '3'){
                //禁言7小时
                $time = time() + 25200;
            }
            if($type == '4'){
                //永久
                $time = '1';
            }
            $blocked = D("User")->blockedUser($uid,$time);

            $this->ajaxReturn(array('data'=>'','info'=>'成功','status'=>1));
        }
        $this->ajaxReturn(array('data'=>'','info'=>'失败','status'=>0));
    }

    //发送站内信
    public function sendMessage($uid){

        $user = M('user')->field('*')->where(array('id' =>$uid))->find();

        $html = '用户&nbsp;'.$user['name'].'&nbsp;您好！您发布的内容违反了我们《日记、百科、问答发布标准》协议，根据协议，违反规定的根据情节严重程度会处以警告、禁言、永久封禁处理。请下次务必注意。';

        $notice['type'] = '4';
        $notice['title'] = '违反《日记、百科、问答发布标准》提示';
        $notice['cs'] = $user['cs'];
        $notice['text'] = htmlspecialchars_decode($html);
        $notice['userid'] = $uid;
        $notice['username'] = '系统';
        $notice['time'] = time();

        $noticle_id = M("user_system_notice")->add($notice);
        return M("user_notice_related")->add(array('noticle_id'=>$noticle_id,'uid'=>$uid));
    }

    /**
     * 用户管理
     * @return [type] [description]
     */
    public function userup(){
        if ($_POST) {
            $id = I("post.id");
            $data = array(
                "user" => trim(I("post.user")),
                "uid" => I("post.role"),
                "name" => trim(I("post.name")),
                "kfgroup" => I("post.kfgroup"),
                "kfmanager" => I("post.kfmanager"),
                "state" => I("post.state")
            );

            if (empty($data["uid"])) {
                $this->ajaxReturn(array("info"=>"请选择用户角色","status"=>0));
            }

            //查询该帐号是否存在
            $info = D("Adminuser")->findUserCountByName($data["user"]);

            if (count($info) > 0 && !empty($data["user"])) {
                if (empty($id)) {
                     $this->ajaxReturn(array("info"=>"该账号已存在","status"=>0));
                } else {
                    if ($id != $info["id"]) {
                        $this->ajaxReturn(array("info"=>"该账号已存在","status"=>0));
                    }
                }
            }

            if (!empty($id)) {
                //编辑用户
                unset($data["user"]);
                $i = D("Adminuser")->editUser($id,$data);
            } else {
                //添加用户
                $data["addtime"] = date("Y-m-d H:i:s");
                $data["user"] = trim(I("post.user"));
                $data["pass"] = md5("123456");
                $id = $i = D("Adminuser")->addUser($data);
            }

            if ($i !== false) {
                //添加操作日志
                $log = array(
                    'remark' => $this->User["name"]."编辑用户信息 ID".$id,
                    'logtype' => 'adminuser',
                    'action_id' => $id,
                    'info' => $data
                );
                D('LogAdmin')->addLog($log);
                $this->ajaxReturn(array("status"=>1));
            }
            $this->ajaxReturn(array("info"=>"操作失败！","status"=>0));
        }
    }

    public function getUserInfo()
    {
        if ($_POST) {
            $id = I("post.id");
            $info = D("Adminuser")->findUserInfoById($id);
            //添加操作日志
            $log = array(
                'remark' => $this->User["name"]."查询用户信息 ID".$id,
                'logtype' => 'searchadminuser',
                'action_id' => $id,
                'info' => $info
            );
            D('LogAdmin')->addLog($log);
            $this->ajaxReturn(array("data"=> $info,"status"=> 1));
        }
    }

    /**
     * 重置密码
     * @return [type] [description]
     */
    public function reset()
    {
        if ($_POST) {
            $id = I("post.id");
            $data = array(
                "pass" => md5("123456")
            );
            $i = D("Adminuser")->editUserInfo($id,$data);
            if($i !== false){
                //添加操作日志
                $log = array(
                    'remark' => $this->User["name"]."重置了用户密码 ID".$id,
                    'logtype' => 'resetadminuser',
                    'action_id' => $id,
                    'info' => $data
                );
                D('LogAdmin')->addLog($log);
                $this->ajaxReturn(array("status"=>1,"info"=>"重置成功"));
            }
            $this->ajaxReturn(array("info"=>"操作失败！","status"=>0));
        }
    }



    public function getcityinfo(){
        if($_POST){
            $users = I("post.users");
            $users = array_filter($users);
            if(count($users) > 0){
                $result = $this->getAgentCity($users);
            }
            $this->ajaxReturn(array("data"=>$result,"status"=>1));
        }
    }

    /**
     * 禁用用户
     * @return [type] [description]
     */
    public function deleteuser(){
        if($_POST){
            $id = I("post.id");
            $data = array(
                "stat" => I("post.stat")
            );
            $i = D("Adminuser")->editUserInfo($id,$data);
            if($i !== false){
                if (I("post.stat") == 1) {
                    $remark = $this->User["name"]."启用了用户 ID".$id;
                } else {
                    $remark = $this->User["name"]."禁用了用户 ID".$id;
                }

                //添加操作日志
                $log = array(
                    'remark' => $remark,
                    'logtype' => 'enabledadminuser',
                    'action_id' => $id,
                    'info' => $data
                );
                D('LogAdmin')->addLog($log);
               $this->ajaxReturn(array("status"=>1));
            }
            $this->ajaxReturn(array("info"=>"操作失败！","status"=>0));
        }
    }

    /**
     * 查询用户信息
     * @return [type] [description]
     */
    public function findUserInfoList()
    {
        if ($_POST) {
            $param  = trim(I("post.q"));
            $list = D("Adminuser")->findUserInfoListByName($param);
            $this->ajaxReturn(array("data"=>$list,"status"=>1));
        }
    }

    /**
     * 城市管辖
     * @return [type] [description]
     */
    public function city()
    {
        //获取顶级部门
        if (session("uc_userinfo.uid") != 1) {
            //获取当前用户的最高部门
            $info = D("Department")->getTopDepartmentInfo(session("uc_userinfo.department_id"));
            $tab = $info["id"];
            if (!empty($info["second_id"])) {
                $tab = $info["second_id"];
            }

            if (!empty($info["three_id"])) {
                $tab = $info["three_id"];
            }

            foreach ($topDept as $key => $value) {
                if ($value["id"] != $tab) {
                    unset($topDept[$key]);
                }
            }
        }

        //获取部门下的角色列表
        $list = $this->getAdminUserList($tab,I("get.id"),I("get.role"),I("get.dept"),I("get.state"),I("get.stat"),I("get.time"));
         //获取部门下所有人员
        if (count($list["uids"]) > 0) {
            $users = D("Adminuser")->getUserListByUid($list["uids"]);
            $this->assign("users",$users);
        }

        $this->assign("list",$list);
        $this->display();
    }

    public function cityUp()
    {
        if ($_POST) {
            $id = I("post.id");
            $cs = implode("," ,I("post.cs"));

            $data = array(
                "cs" => $cs
            );
            $i = D("Adminuser")->editUserInfo($id,$data);
            if($i !== false){
                //添加操作日志
                $log = array(
                    'remark' => $this->User["name"]."修改了用户管辖城市 ID".$id,
                    'logtype' => 'editadminusercity',
                    'action_id' => $id,
                    'info' => $data
                );
                D('LogAdmin')->addLog($log);
                $this->ajaxReturn(array("status"=>1));
            }
            $this->ajaxReturn(array("info"=>"操作失败！","status"=>0));
        } else {
            $id = I("get.id");
            //获取帐号信息
            $info = D("Adminuser")->findUserInfoById($id);
            $info["city"] = array_filter(explode(",",$info["cs"]));

            if (session("uc_userinfo.uid") == 1) {
                $quyu = D("Quyu")->getAllQuyuOnly();
            } else {
                $quyu = D("Quyu")->getCityInfoByIds(session("uc_userinfo.cs"));
            }
            $this->assign("info",$info);
            $this->assign("quyu",$quyu);
            $this->display();
        }
    }

    public function clearcity()
    {
        if ($_POST) {
            $id = I("post.id");
            $data = array(
                "cs" => ""
            );
            $i = D("Adminuser")->editUserInfo($id,$data);
            if($i !== false){
                //添加操作日志
                $log = array(
                    'remark' => $this->User["name"]."删除了用户管辖城市 ID".$id,
                    'logtype' => 'deleteadminusercity',
                    'action_id' => $id,
                    'info' => $data
                );
                D('LogAdmin')->addLog($log);
                $this->ajaxReturn(array("status"=>1));
            }
            $this->ajaxReturn(array("info"=>"操作失败！","status"=>0));
        }
    }

    private function getAgentCity($users){
        $users = D("Adminuser")->getUserInfoByIds($users);
        $cities = array();
        foreach ($users as $key => $value) {
            $cs = array_filter(explode(",",$value["cs"]));
            if(count($cs) > 0){
                $cities = array_merge($cities,$cs);
            }
        }
        if(count($cities) > 0){
            $cities = D("Quyu")->getCityInfoByIds($cities);
            //添加名称首字母
            import('Library.Org.Util.App');
            $app = new \app();
            $edition = array();
            foreach ($cities as $key => $value) {
               $str = $app->getFirstCharter($value["cname"]);
               $cities[$key]["cname"] = $str.$value["cname"];
               $edition[] = $str;
            }
            array_multisort($edition, SORT_ASC,SORT_STRING,$cities);
        }

        return $cities;
    }

    private function getDepartmentInfo($departmentId){
        //获取客服部门的角色信息
        $result = D("Department")->getDepartmentUidById($departmentId);
        if(count($result) > 0){
            $result["roles"] = array_filter(explode(",",$result["roles"]));
            return $result;
        }
        return false;
    }

    /**
     * 获取用户的详细列表
     * @param  [type] $citys [管辖城市]
     * @param  [type] $name  [用户名]
     * @param  [type] $uid   [用户组]
     * @return [type]        [description]
     */
    private function getUserDetailsList($citys,$name,$uid){
        //非管理员状态下
        if($this->User['uid'] != 1){
            if(!empty($uid) && !in_array($uid,$this->User["groups"])){
                $this->_error("该用户组您无权查阅");
                die();
            }

            if(empty($citys)){
                return false;
            }
        }

        $pageIndex = 1;
        $count = D("Adminuser")->getUserDetailsListCount($this->User["groups"],$citys, $name, $uid);

        if($count > 0){
            import('Library.Org.Util.Page');
            $p = new \Page($count,10);
            $p->setConfig('header','');
            $p->setConfig('prev', "上一页");
            $p->setConfig('next', '下一页');
            $p->setConfig('theme','%UP_PAGE% %LINK_PAGE% %DOWN_PAGE%');
            $show    = $p->show();

            $list = D("Adminuser")->getUserDetailsList($p->firstRow,$p->listRows,$this->User["groups"],$citys,$name,$uid);

            foreach ($list as $key => $value) {
                $list[$key]["cs"] = explode(",", $value["cs"]);
                $list[$key]["css"] = explode(",", $value["css"]);
                $list[$key]["help_cs"] = explode(",", $value["cs_help"]);
            }
            return array("page"=>$show,"list"=>$list);
        }
    }

    /**
     * 获取用户列表
     * @param  [type] $deptid [部门ID]
     * @return [type]         [description]
     */
    private function getAdminUserList($deptId,$id,$role,$subDept,$state,$stat,$time)
    {
        if (!in_array(session("uc_userinfo.uid"),array(1,37,51))) {
            //只能看到自己管辖的角色
            $group = D("RbacNodeGroup")->getRoleGroupInfoByRoleId(session("uc_userinfo.uid"));
            if (count($group) > 0) {
                $uids =  array_filter(explode(",",$group["role_id"]));
                $result = D("RbacRole")->getMyRoleList($uids);
                foreach ($result as $key => $value) {
                    if (!array_key_exists($value["id"],$roles)) {
                        $roles[$value["id"]] = $value["role_name"];
                    }
                }
            } else {
                $this->_error("该用户未有管辖用户！");
            }
        } else {
            //获取部门下所有的角色信息
            $result = D("RbacRole")->getRoleListByDept($deptId);
            foreach ($result as $key => $value) {
                $uids[] = $value["role_id"];
                if (!array_key_exists($value["role_id"],$roles)) {
                    $roles[$value["role_id"]] = $value["role_name"];
                }
            }
        }

        if (count($uids) > 0) {
            $kfgroup = session("uc_userinfo.kfgroup");
            $count = D("Adminuser")->getUserDetailsListCount($uids,$id,$role,$subDept,$state,$stat,$time,$kfgroup);

            if ($count > 0) {
                import('Library.Org.Util.Page');
                $p = new \Page($count,20);
                $show = $p->show();

                //获取人员列表
               $list =  D("Adminuser")->getUserDetailsList($uids,$id,$role,$subDept,$state,$stat,$time,$kfgroup,$p->firstRow, $p->listRows);
               foreach ($list as $key => $value) {
                    $list[$key]["department"] = $value["first_name"];
                    if (!empty($value["second_name"])) {
                        $list[$key]["department"] = $value["second_name"]."/".$list[$key]["department"];
                    }

                    if (!empty($value["three_name"])) {
                        $list[$key]["department"] = $value["three_name"]."/".$list[$key]["department"];
                    }

                    if (!array_key_exists($value["first_id"],$department)) {
                        $department[$value["first_id"]] = $list[$key]["department"];
                    }
               }

               //查询城市信息
                $result = D("Quyu")->getAllQuyuOnly();
                foreach ($result as $key => $value) {
                    $quyu[$value["cid"]] = $value["cname"];
                }

                foreach ($list as $key => $value) {
                    $exp = array_filter(explode(",",$value["cs"]));
                    foreach ($exp as $k => $val) {
                        if (array_key_exists($val,$quyu)) {
                             $list[$key]["city"][]= $quyu[$val];
                        }
                    }
                }
            }
        }
        return array("list" => $list,"page" => $show,"roles" => $roles, "department" =>$department,"uids"=>$uids);
    }

    /**
     * 获取客服组长和师长
     * @return [type] [description]
     */
    private function getKfGroupInfo()
     {
        //获取客服团
        $result = D("Adminuser")->getUserListByUid(array("30","31"));
        foreach ($result as $key => $value) {
            if ($value["uid"] == 30) {
                //客服师
                $list["manager"][] = $value;
            } elseif ($value["uid"] == 31) {
                //客服团
                $list["groups"][] = $value;
            }
        }
        return $list;
     }
}