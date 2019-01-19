<?php

namespace Home\Model;
use Think\Model;


/**
 * VIP用户记录表
 */
class UserVipModel extends Model
{
    /**
     * 添加记录
     * @param [type] $data [description]
     */
    public function addVip($data)
    {
        return  M("user_vip")->add($data);
    }

    /**
     * 编辑记录
     * @param  [type] $id   [description]
     * @param  [type] $data [description]
     * @return [type]       [description]
     */
    public function editVip($id,$data)
    {
        $map = array(
            "id" => $id
        );
        return  M("user_vip")->where($map)->save($data);
    }

    /**
     * 获取合同信息
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function getContractList($id)
    {
        $map = array(
            "a.company_id" => array("EQ",$id)
        );
        return M("user_vip")->where($map)->alias("a")
                       ->field("a.id, a.start_time,a.end_time,a.viptype,a.parentid,a.type")
                       ->order("a.id desc")
                       ->select();
    }

    /**
     * 未开始合同
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function getNoStartContractList($id)
    {
        $map = array(
            "a.company_id" => array("EQ",$id),
            "a.start_time" => array("GT",date("Y-m-d")),
            "a.type" => array("IN",array(2,8))
        );
        return M("user_vip")->where($map)->alias("a")
                       ->field("a.id, a.start_time,a.end_time")
                       ->order("a.id desc")
                       ->find();
    }

    /**
     * 获取VIP用户当前的合同信息
     * @return [type] [description]
     */
    public function getNewContractInfo($id)
    {
        $date = date("Y-m-d");
        $map = array(
            "a.start_time" => array("ELT",$date),
            "a.end_time" => array("EGT",$date),
            "a.company_id" => array("EQ",$id),
            "a.parentid" => array("EQ",0)
        );

        $buildSql = M('user_vip a')->where($map)
                       ->join("qz_user_vip b on a.id = b.parentid and b.start_time <=  '".$date."' ","left")
                       ->field("a.id, a.start_time,a.end_time,b.id as bid, b.start_time as b_start,b.end_time as b_end,b.viptype")
                       ->order("b.id desc")
                       ->limit(1)
                       ->buildSql();
        $sql = "select t.*,c.start_time as c_start,c.end_time as c_end,c.type as c_type,c.id as cid,c.viptype as c_viptype,c.delay_day,c.delay_time from ($buildSql) t left join qz_user_vip c on t.bid = c.parentid  order by t.bid desc,c.id desc";
        return M()->query($sql);
    }

    /**
     * 获取合同的信息
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function getContractInfo($id)
    {
        $map = array(
            "id" => array("EQ",$id)
        );
        return M("user_vip")->where($map)->find();
    }

    /**
     * 获取最新的一份总合同信息
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function getLastAllContract($id)
    {
        $map = array(
            "company_id" => array("EQ",$id),
            "type" => array("IN",array(1))
        );
        return M("user_vip")->where($map)->order("id desc")->find();
    }

    /**
     * 获取最后一份本次合同的信息
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function getLastNewContract($id,$contract_id)
    {
        $map = array(
            "company_id" => array("EQ",$id),
            "type" => array("IN",array(2,8))
        );
        if (!empty($contract_id)) {
            $map["id"] = array("NEQ",$contract_id);
        }
        return M("user_vip")->where($map)->order("id desc")->find();
    }

    /**
     * 获取所有的合同信息
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function getAllContractList($id)
    {
        $map = array(
            "a.company_id" => array("EQ",$id),
            "a.parentid" => array("EQ",0)
        );

        return  M("user_vip a")->where($map)
                       ->join("left join qz_user_vip b on a.id = b.parentid")
                       ->join("left join qz_user_vip c on b.id = c.parentid")
                       ->field("a.id, a.start_time,a.end_time,b.id as bid, b.start_time as b_start,b.end_time as b_end,b.viptype,c.start_time as c_start,c.end_time as c_end,c.type as c_type,c.id as cid,c.viptype as c_viptype,c.delay_day,c.delay_time")
                       ->order("a.id desc,b.id desc,c.id desc")
                       ->select();
    }

    /**
     * 根据ID获取合同信息
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function getContractInfoById($id)
    {
        $map = array(
            "id" => array("EQ",$id)
        );
        return M("user_vip")->where($map)->find();
    }

    public function getVipListCount($cs,$param)
    {
        $map = array(
            "a.cs" => array("IN",$cs),
            "a.classid" => array("EQ",3),
            "v.type" => array("EQ",$param["status"])
        );

        if (!empty($param["uid"])) {
            $map["a.id"] = array("EQ",$param["uid"]);
        }

        if (!empty($param["name"])) {
            $map["jc|qc"] = array("LIKE",'%'.$param["name"].'%');
        }

        if (!empty($param["sell"])) {
            $map["a.saler"] = array("EQ",$param["sell"]);
        }

        if (!empty($param["viptype"])) {
            $map["b.viptype"] = array("EQ",$param["viptype"]);
        }

        if (!empty($param["fake"])) {
            $map["b.fake"] = array("EQ",$param["fake"]);
        }

        if (!empty($param["begin"])) {
            $map["a.start"] = array("EGT",$param["begin"]);
        }

        if (!empty($param["end"])) {
            $map["a.end"] = array("ELT",$param["end"]);
        }

        if (!empty($param["city"]) && $param["city"] != -1 ) {
            $map["a.cs"] = array("EQ",$param["city"]);
        }

        return M("user_vip v")->where($map)
                              ->join("join qz_user a on a.id = v.company_id")
                              ->join("join qz_user_company b on a.id = b.userid")
                              ->count();
    }

    /**
     * 获取VIP用户列表
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function getVipList($cs,$param,$pageIndex,$pageCount)
    {
        $map = array(
            "a.cs" => array("IN",$cs),
            "a.classid" => array("EQ",3),
            "v.type" => array("EQ",$param["status"])
        );

        if (!empty($param["uid"])) {
            $map["a.id"] = array("EQ",$param["uid"]);
        }

        if (!empty($param["name"])) {
            $map["jc|qc"] = array("LIKE",'%'.$param["name"].'%');
        }

        if (!empty($param["sell"])) {
            $map["a.saler"] = array("EQ",$param["sell"]);
        }

        if (!empty($param["viptype"])) {
            $map["b.viptype"] = array("EQ",$param["viptype"]);
        }

        if (!empty($param["fake"])) {
            $map["b.fake"] = array("EQ",$param["fake"]);
        }

        if (!empty($param["begin"])) {
            $map["a.start"] = array("EGT",$param["begin"]);
        }

        if (!empty($param["end"])) {
            $map["a.end"] = array("ELT",$param["end"]);
        }

        if (!empty($param["city"]) && $param["city"] != -1 ) {
            $map["a.cs"] = array("EQ",$param["city"]);
        }


        return M("user_vip v")->where($map)
                        ->join("join qz_user a on a.id = v.company_id")
                        ->join("join qz_user_company b on a.id = b.userid")
                        ->join("qz_quyu q on q.cid = a.cs")
                        ->field("a.id,a.jc,a.on,q.cname,q.bm,b.saler,b.fake,a.start,a.end")
                        ->order("a.id desc")
                        ->limit($pageIndex.",".$pageCount)
                        ->select();
    }

    /**
     * 获取本次合同的上一份合同
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function getLastPrevContract($id,$parentid)
    {
        $map = array(
            "company_id" => array("ELT",$id),
            "type" => array("IN",array(2,8)),
            "parentid" => array("EQ",$parentid)
        );
        return M("user_vip")->where($map)->order("id desc")->find();
    }

    /**
     * 获取操作记录
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function getVipLog($id)
    {
        $map = array(
            "company_id" => array("EQ",$id),
            "type" => array("NEQ",1)
        );
        return M("user_vip")->where($map)->order("id desc")->select();
    }

    /**
     * 删除合同
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function delContract($id)
    {
        $map = array(
           "id" => array("EQ",$id)
        );
        return  M("user_vip")->where($map)->delete();
    }

    /**
     * [getUserVipDetailCount description]
     * @param  [type] $id         [装修公司ID]
     * @param  [type] $name       [装修公司名字]
     * @param  [type] $start_time [本次合同开始时间]
     * @param  [type] $end_time   [本次合同结束时间]
     * @param  [type] $city       [会员城市]
     * @param  [type] $department [部门]
     * @return [type]             [description]
     */
    public function getUserVipDetailCount($id, $name, $start_time, $end_time, $city = []){
        $map['v.type'] = array('IN', array(2,8));

        if (!empty($id)) {
            $map['v.company_id'] = intval($id);
        }

        if (!empty($name)) {
            $map['u.jc|u.qc'] = array('LIKE', '%' . $name . '%');
        }

        if (!empty($start_time)) {
            $map['v.start_time'] = array('EGT', $start_time);
        }

        if (!empty($end_time)) {
            $map['v.end_time'] = array('ELT', $end_time);
        }

        if ($city === false) {
            $map['u.cs'] = '';
        } else {
            if (!empty($city)) {
                if (!is_array($city)) {
                    $city = array($city);
                }
                $map['u.cs'] = array('IN', $city);
            }
        }

        $count = M('user_vip')->alias('v')
                              ->join('qz_user_vip AS z ON z.id = v.parentid')
                              ->join('qz_user AS u ON u.id = v.company_id')
                              ->where($map)
                              ->count();
        return $count;
    }

    /**
     * [getUserVipDetailList description]
     * @param  [type] $id         [装修公司ID]
     * @param  [type] $name       [装修公司名字]
     * @param  [type] $start_time [本次合同开始时间]
     * @param  [type] $end_time   [本次合同结束时间]
     * @param  [type] $city       [会员城市]
     * @param  [type] $department [部门]
     * @param  [type] $start      [description]
     * @param  [type] $end        [description]
     * @return [type]             [description]
     */
    public function getUserVipDetailList($id, $name, $start_time, $end_time, $city = [], $start, $end){
        $map['v.type'] = array('IN', array(2,8));

        if (!empty($id)) {
            $map['v.company_id'] = intval($id);
        }

        if (!empty($name)) {
            $map['u.jc|u.qc'] = array('LIKE', '%' . $name . '%');
        }

        if (!empty($start_time)) {
            $map['v.start_time'] = array('EGT', $start_time);
        }

        if (!empty($end_time)) {
            $map['v.end_time'] = array('ELT', $end_time);
        }

        if ($city === false) {
            $map['u.cs'] = '';
        } else {
            if (!empty($city)) {
                if (!is_array($city)) {
                    $city = array($city);
                }
                $map['u.cs'] = array('IN', $city);
            }
        }

        $result = M('user_vip')->alias('v')
                               ->field('v.*,z.start_time AS total_start_time,z.end_time AS total_end_time, q.cid, q.cname')
                               ->join('qz_user_vip AS z ON z.id = v.parentid')
                               ->join('qz_user AS u ON u.id = v.company_id')
                               ->join('qz_quyu AS q ON u.cs = q.cid')
                               ->where($map)
                               ->limit($start, $end)
                               ->select();
        return $result;
    }

    /**
     * [getCityVipCountByCityIds 根据城市ID获取某段时间该城市存在过的会员数量(包含掉的会员)]
     * @param  [type] $cityIds   [description]
     * @param  [type] $startTime [description]
     * @param  [type] $endTime   [description]
     * @return [type]            [description]
     */
    public function getCityVipCountByCityIds($cityIds = array(), $startTime = '', $endTime = ''){
        if (empty($cityIds)) {
            return false;
        }
        if (!is_array($cityIds)) {
            $cityIds = array($cityIds);
        }

        $map['u.cs'] = array('IN', $cityIds);

        $map['v.type'] = array('IN', array(2,8));

        //默认开始时间为本月初,左开右闭
        if (empty($startTime)) {
            $startTime = date('Y-m-01');
        } else {
            $startTime = date('Y-m-d', strtotime($startTime));
        }

        //默认结束时间为本月末
        if (empty($endTime)) {
            $endTime = date('Y-m-01', strtotime(date('Y-m-01') . ' +1 month'));
        } else {
            $endTime = date('Y-m-d', strtotime($endTime));
        }

        //合同开始时间小于等于查询时间且合同结束时间大于查询开始时间
        //合同开始时间大于等于查询时间且合同开始时间小于查询结束时间
        $map['_string'] = ' (v.start_time <= "' . $startTime . '" AND v.end_time > "' . $endTime . '") OR (v.start_time >= "' . $startTime . '" AND v.end_time < "' . $endTime . '")';

        $build = M('user_vip')->alias('v')
                              ->field('u.cs, v.id')
                              ->join('INNER JOIN qz_user AS u ON u.id = v.company_id')
                              ->where($map)
                              ->group('v.company_id')
                              ->buildSql();
        $result = M()->table($build)
                     ->alias('z')
                     ->field('z.cs AS cid, count(z.id) AS number')
                     ->group('z.cs')
                     ->select();
        return $result;
    }

    /**
     * [getCityOrderCountByCityIds 根据城市ID获取某段时间该城市存在过的会员数量(包含掉的会员)]
     * @param  [type] $cityIds   [description]
     * @param  [type] $startTime [description]
     * @param  [type] $endTime   [description]
     * @return [type]            [description]
     */
    public function getCityOrderCountByCityIds($cityIds = array(), $startTime = '', $endTime = ''){
        if (empty($cityIds)) {
            return false;
        }
        if (!is_array($cityIds)) {
            $cityIds = array($cityIds);
        }

        $map['u.cs'] = array('IN', $cityIds);

        $map['v.type'] = array('IN', array(2,8));

        //默认开始时间为本月初,左开右闭
        if (empty($startTime)) {
            $startTime = date('Y-m-01');
        } else {
            $startTime = date('Y-m-d', strtotime($startTime));
        }

        //默认结束时间为本月末
        if (empty($endTime)) {
            $endTime = date('Y-m-01', strtotime(date('Y-m-01') . ' +1 month'));
        } else {
            $endTime = date('Y-m-d', strtotime($endTime));
        }

        //合同开始时间小于等于查询时间且合同结束时间大于查询开始时间
        //合同开始时间大于等于查询时间且合同开始时间小于查询结束时间
        $map['_string'] = ' (v.start_time <= "' . $startTime . '" AND v.end_time > "' . $endTime . '") OR (v.start_time >= "' . $startTime . '" AND v.end_time < "' . $endTime . '")';

        $build = M('user_vip')->alias('v')
                              ->field('u.cs, v.id, v.company_id')
                              ->join('INNER JOIN qz_user AS u ON u.id = v.company_id')
                              ->where($map)
                              ->group('v.company_id')
                              ->buildSql();
        $where['addtime'] = array(
            array('EGT', strtotime($startTime)),
            array('LT', strtotime($endTime))
        );

        $buildTwo = M('order_info')->field('com,addtime')->where($where)->buildSql();

        $result = M()->table($build)
                     ->alias('z')
                     ->field('z.cs AS cid, count(z.id) AS number')
                     ->join('INNER JOIN ' . $buildTwo .' AS i ON i.com = z.company_id')
                     ->where($where)
                     ->group('z.cs')
                     ->select();
        return $result;
    }


    /*
     * 获取上会员信息
     * @param  [type] $begin [操作开始时间]
     * @param  [type] $end   [操作结束时间]
     * @param  [type] $cs    [会员城市]
     * @return [type]        [description]
     */
    public function getVipStatiitics($begin,$end,$cs)
    {
        $map = array(
            "a.time" => array(
                array("EGT",$begin),
                array("ELT",$end)
            ),
            "a.parentid" => array("NEQ",0)
        );

        if (!empty($cs)) {
            $map["b.cs"] = array("EQ",$cs);
        }

        return M("user_vip")->where($map)->alias("a")
                     ->join("join qz_user b on a.company_id = b.id")
                     ->join("join qz_user_vip v on v.id = a.parentid")
                     ->join("join qz_quyu q on q.cid = b.cs")
                     ->field("a.company_id,b.jc,a.type,FROM_UNIXTIME(a.time) as time,a.start_time,a.end_time,v.start_time as p_start,v.end_time as p_end,q.cname,a.op_uname,a.delay_time,a.to_name,a.delay_day,a.to_company")
                     ->select();
    }

    /**
     * 获取装修公司暂停信息
     */
    public function getParseContractList($company_id)
    {
        $map = array(
            "type" => array("EQ",4),
            "company_id" => array("IN",$company_id)
        );

        return M("user_vip")->where($map)->field("company_id,end_time")->select();
    }
}