<?php

//合作商表

namespace Home\Model;
Use Think\Model;

class PartnerModel extends Model{

    protected $autoCheckFields = false;
    /**
     * 添加合作商
     * @param [type] $data [description]
     */
    public function addCompany($data)
    {
        if(!empty($data["cooperate_endtime"])){
            $data["cooperate_endtime"]  = $data["cooperate_endtime"]+86399;
        }
        if(!empty($data["test_endtime"])){
            $data["test_endtime"] = $data["test_endtime"]+86399;
        }
        $result = M("hzs_company")->add($data);
//        echo M('has_company')->getLastSql();
        return $result;
    }

    /**
     * 编辑合作商
     * @param  [type] $id   [description]
     * @param  [type] $data [description]
     * @return [type]       [description]
     */
    public function editCompany($id,$data)
    {
        $map = array(
            "id" => array("EQ",$id)
        );
        if(!empty($data["cooperate_endtime"])){
            $data["cooperate_endtime"]  = $data["cooperate_endtime"]+86399;
        }
        if(!empty($data["test_endtime"])){
            $data["test_endtime"] = $data["test_endtime"]+86399;
        }
        $result = M("hzs_company")->where($map)->save($data);
        return $result;
    }

    /**
     * 获取对接人信息
     */
    public function getButtmanInfo($type = 1){
        if($type == 1){
            //角色为渠道专员的 测试上uid=90 线上88
            $map["uid"] = array('EQ',88);
        }else{
            //角色为渠道专员和渠道经理 uid=90,89
            $map["uid"] = array('IN',array(89,88));
        }
        $map['enabled'] = array('EQ',0);
        return M('adminuser')->field('id ,id as uid,name as uname')->where($map)->select();

    }
    /**
     * 获取合作商信息
     * @param  [type] $name [合作商id]
     * @param  [type] $cooperate_mode [合作模式]
     * @param  [type] $create_time [加入时间]
     * @param  [type] $yy_id [对接人id]
     * @param  [type] $state [合作状态]
     */
    public function getCompany($name,$cooperate_mode, $yy_id ,$state,$starttime,$endtime,$start,$end){

        if(!empty($end)){
            $limit = $start .','. $end;
        }
        $map['c.status'] = 1;
        if(!empty($name)){
            $map['c.id'] = $name;
        }
        if(!empty($cooperate_mode)){
            $map['c.cooperate_mode'] = $cooperate_mode;

        }

        if(!empty($yy_id)){
            $map['c.yy_id'] = $yy_id;
        }

        if(!empty($starttime)&&!empty($endtime)){
            $endtime = $endtime+86399;
            $map['c.create_time'] = array(array('egt',$starttime),array('elt',$endtime));
        }else if(!empty($starttime)&&empty($endtime)){
            $map['c.create_time'] = array(array('egt',$starttime));
        }else if(!empty($endtime)&&empty($starttime)){
            $endtime = $endtime+86399;
            $map['c.create_time'] = array(array('elt',$endtime));
        }


//        print_r($map);exit;
        //检查在合作时间内的查询start
        if(!empty($state)){
            $nowTime = time();
            if($state == 1){//合作中
                $map['_string'] = '(c.cooperate_starttime !=0  and  c.cooperate_endtime !=0 AND ('.$nowTime.' BETWEEN c.cooperate_starttime AND c.cooperate_endtime)) or (c.cooperate_starttime=0  and  c.cooperate_endtime=0 AND c.test_starttime=0 and c.test_endtime=0)';
            }else if($state == 2){//测试中
                $map['_string'] ='(c.test_starttime !=0 and c.test_endtime !=0 AND ('.$nowTime.' BETWEEN c.test_starttime AND c.test_endtime)) or (c.test_starttime !=0 and c.test_endtime !=0 AND '.$nowTime.' < c.test_starttime) or (c.cooperate_starttime !=0  and  c.cooperate_endtime !=0 AND '.$nowTime.' < cooperate_starttime)';

            }else if($state == 3){//合作终止
                $map['_string'] =  '(test_starttime !=0 and test_endtime !=0 and cooperate_starttime=0 and cooperate_endtime=0 AND '.$nowTime.' > c.test_endtime) or (c.cooperate_starttime !=0  and  cooperate_endtime !=0 AND '.$nowTime.' > c.cooperate_endtime)';
            }
        }
        //end
        $result = M('hzs_company')->alias('c')
            ->join('left join qz_adminuser as a on a.id = c.yy_id')
            ->field('c.*,a.name as aname')
            ->where($map)
            ->limit($limit)->order('c.create_time desc,c.id desc')->select();

        return $result;
    }


    public function getCompanyCount($name,$cooperate_mode,$yy_id ,$state,$starttime,$endtime){
        $map['c.status'] = 1;
        if(!empty($name)){
            $map['c.id'] = $name;
        }
        if(!empty($cooperate_mode)){
            $map['c.cooperate_mode'] = $cooperate_mode;
        }

        if(!empty($yy_id)){
            $map['c.yy_id'] = $yy_id;
        }

        if(!empty($starttime)&&!empty($endtime)){
            $endtime = $endtime+86399;
            $map['c.create_time'] = array(array('egt',$starttime),array('elt',$endtime));
        }else if(!empty($starttime)&&empty($endtime)){
            $map['c.create_time'] = array(array('egt',$starttime));
        }else if(!empty($endtime)&&empty($starttime)){
            $endtime = $endtime+86399;
            $map['c.create_time'] = array(array('elt',$endtime));
        }


        //检查在合作时间内的查询start
        if(!empty($state)){
            $nowTime = time();
            if($state == 1){//合作中
                $map['_string']  = '(c.cooperate_starttime !=0  and  c.cooperate_endtime !=0 AND ('.$nowTime.' BETWEEN c.cooperate_starttime AND c.cooperate_endtime)) or (c.cooperate_starttime=0  and  c.cooperate_endtime=0 AND c.test_starttime=0 and c.test_endtime=0)';
            }else if($state == 2){//测试中
                $map['_string']  ='(c.test_starttime !=0 and c.test_endtime !=0 AND ('.$nowTime.' BETWEEN c.test_starttime AND c.test_endtime)) or (c.test_starttime !=0 and c.test_endtime !=0 AND '.$nowTime.' < c.test_starttime) or (c.cooperate_starttime !=0  and  c.cooperate_endtime !=0 AND '.$nowTime.' < cooperate_starttime)';

            }else if($state == 3){//合作终止
                $map['_string']  =  '(test_starttime !=0 and test_endtime !=0 and cooperate_starttime=0 and cooperate_endtime=0 AND '.$nowTime.' > c.test_endtime) or (c.cooperate_starttime !=0  and  cooperate_endtime !=0 AND '.$nowTime.' > c.cooperate_endtime)';
            }
        }
        //end

        $result = M('hzs_company')->alias('c')->where($map)->count();

        return $result;
    }

    public function getCompanyByAccount($account){
        if(!empty($account)){
            $map["account"] = $account;
            $map["status"] = 1;
            return M('hzs_company')->where($map)->find();
        }
    }

    /**
     * 获取合作商名称
     */
    public function getCompanyAll(){
        $map['status'] = 1;
        $result = M('hzs_company')->where($map)->field('id,name')->select();
        return $result;
    }

    /**
     * 获取合作商名称
     */
    public function getCompanyByYyId($yy_id){
        $map['status'] = 1;
        $map['yy_id'] = $yy_id;
        $result = M('hzs_company')->where($map)->field('id,name')->select();
        return $result;
    }



    /**
     * [getCompanyById 根据ID查询合作商的信息]
     * @param  [string]     $id         合作商ID
     * @return [array]      $result     查询结果数组
     */
    public function getCompanyById($id,$field='*')
    {
        if($id){
            $map['id'] = $id;
            $result = M('hzs_company')
                ->where($map)->field($field)->find();
            return $result;
        }
    }

    /**
     * [delCompany 删除合作商]
     * @param  [string]     $id   要删除的用户ID
     * @return [type]
     */
    public function delCompany($id)
    {
        if(!empty($id)){
            $data['status'] = 0;
            $map['id'] = $id;
            $result = M('hzs_company')->where($map)->save($data);
        }
        return $result;
    }

    /**
     * [delCompanyAndSource 删除合作商]
     * @param  [string]     $id   要删除的用户ID
     * @return [type]
     */
    public function delCompanyAndSource($id)
    {
        if(!empty($id)){
            $map['companyid'] = $id;
            $result = M('hzs_source')->where($map)->delete();
        }
        return $result;
    }

    /**
     * [delCompany 删除合作商]
     * @param  [string]     $id   要删除的用户ID
     * @return [type]
     */
    public function delSource($id)
    {
        if(!empty($id)){
            $data['status'] = 0;
            $map['id'] = $id;
            $result = M('hzs_source')->where($map)->save($data);
        }
        return $result;
    }


    //获取渠道标识表
    public function getSourceList($id = 10){
        if($id){
            if(is_array($id)){
                $map['a.dept'] = ['in',$id];
            }else{
                $map['a.dept'] = ['eq','10']; // 默认取推广二部
            }
        }
        $map['a.visible'] = 0;
        $map['a.type'] = 1;
        $Db = M('order_source');
        $result = $Db->alias("a")->where($map)->order('a.id DESC')->select();
        return $result;
    }

    //获取当前人员所在组
    public function getUserDeptList($uid){
        if(!$uid){
            return [];
        }
        $where['user_id'] = ['eq',$uid];
        return M('order_source_relate')->field('department_id')->where($where)->select();
    }

//    public function
    //添加匹配标识
    public function addSource($companyId,$sourceId,$uv,$ip,$zhuce,$real_zhuce){
        $data['status'] = 1;
        $data['create_time'] = time();
        $data['companyid'] = $companyId;
        $data['sourceid'] = $sourceId;
        $data['uv_show'] = $uv;
        $data['ip_show'] = $ip;
        $data['order_show'] = $zhuce;
        $data['real_order_show'] = $real_zhuce;
        $result = M("hzs_source")->add($data);
        return $result;
    }
    //修改匹配标识
    public function editSource($sid,$uv,$ip,$zhuce,$real_zhuce){
        if($sid){
            $data['uv_show'] = $uv;
            $data['ip_show'] = $ip;
            $data['order_show'] = $zhuce;
            $data['real_order_show'] = $real_zhuce;
            $result = M("hzs_source")->where(array('id'=>$sid))->save($data);
//            echo M('hsz_source')->getLastSql();
            return $result;
        }
    }

    public function getCountSource($id){
        if(!empty($id)){
            $result = M('hzs_source')->where(array('companyid'=>$id,'status'=>1))->count();
//            echo M('hzs_source')->getLastSql();
            return $result;
        }

    }

    public function getSource($id,$source_src,$source_name,$start,$end){
        if(!empty($id)){
            if(!empty($end)){
                $limit = $start .','. $end;
            }

            $map['s.status'] = 1;
            $map['s.companyid'] = $id;
            if(!empty($source_src)){
                $map['o.src'] = $source_src;
            }
            if(!empty($source_name)){
                $map['o.name'] = $source_name;
            }
            $result = M('hzs_source')->alias('s')
                ->join('left join qz_order_source as o on o.id = s.sourceid')
                ->field('o.* , s.uv_show,s.ip_show,s.order_show,s.real_order_show,s.id as sid')
                ->where($map)->limit($limit)->select();
            return $result;
        }

    }

    public function getSourceSearch($id){
        if(!empty($id)){
            $map['s.status'] = 1;
            $map['s.companyid'] = $id;
            $result = M('hzs_source')->alias('s')
                ->join('left join qz_order_source as o on o.id = s.sourceid')
                ->field('o.* ')
                ->where($map)->select();
            return $result;
        }
    }

    public function getSourceCount($id,$source_src,$source_name){
        if(!empty($id)){
            $map['s.status'] = 1;
            $map['s.companyid'] = $id;
            if(!empty($source_src)){
                $map['o.src'] = $source_src;
            }
            if(!empty($source_name)){
                $map['o.name'] = $source_name;
            }
            $result = M('hzs_source')->alias('s')
                ->join('left join qz_order_source as o on o.id = s.sourceid')
                ->field('o.* , s.uv_show,s.ip_show,s.order_show,s.real_order_show,s.id as sid')
                ->where($map)->count();
            return $result;
        }

    }


    public function isExistSrc($source){
        $map['sourceid'] = $source;
        $map['status'] = 1;
        $complete = M('hzs_source')->where($map)->find();

        if (!empty($complete)){
            return true;
        }else{
            return false;
        }
    }

    public function isExistAccount($account){
        $map["account"] = $account;
        $map["status"] = 1;
        $complete = M('hzs_company')->where($map)->find();
        if (!empty($complete)){
            return true;
        }else{
            return false;
        }
    }

    public function addLog($remark,$logtype,$infos,$id){

        $info["info"] = json_encode($infos);
        $admin = getAdminUser();
        import('Library.Org.Util.App');
        $app = new \App();
        $ip =  $app->get_client_ip();
        $extra = array(
            'logtype'=> $logtype,
            'time' => date("Y-m-d H:i:s"),
            'username' => $admin['name'],
            'userid' => $admin['id'],
            'action' => CONTROLLER_NAME.'/'.ACTION_NAME,
            'ip' => $ip,
            'user_agent' => $_SERVER["HTTP_USER_AGENT"],
            'action_id'=>$id,
            'remark'=>$remark
        );
        $data = array_merge($info,$extra);

        return M('log_admin')->add($data);
    }

    /**
     * 查询已被添加到匹配标识表的数据
     */
    public function getExistSource(){
        $map['status'] = 1;
        $result = M('hzs_source')->alias('s')
            ->join('left join qz_order_source as o on o.id = s.sourceid')
            ->field('o.src ')
            ->where($map)->select();
        return $result;
    }


}

