<?php

namespace Home\Model;
Use Think\Model;

/**
 *
 */
class UserSchedulingModel extends Model
{
    public function addALLScheduling($data)
    {
        return M("user_scheduling")->addAll($data);
    }

    public function getSchedulingList($monthStart,$monthEnd)
    {
        $map = array(
            "a.date" => array(
                array("EGT",$monthStart),
                array("ELT",$monthEnd)
            )
        );

        return M("user_scheduling")->where($map)->alias("a")
                                   ->join("join qz_adminuser u on u.id = a.user_id")
                                   ->field("a.*,u.uid")
                                   ->order("date")->select();
    }

    /**
     * 获取用户排班信息
     * @param  [type] $user_id [description]
     * @return [type]          [description]
     */
    public function getSchedulingInfoBYUserId($user_id)
    {
        $map = array(
            "user_id" => array("EQ",$user_id)
        );

        return M("user_scheduling")->where($map)->find();
    }

    /**
     * 删除排班信息
     * @param  [type] $user_id [description]
     * @return [type]          [description]
     */
    public function delSchedulingInfo($user_id,$monthStart,$monthEnd)
    {
        $map = array(
            "user_id" => array("EQ",$user_id),
            "date" => array(
                array("EGT",$monthStart),
                array("ELT",$monthEnd)
            )
        );
        return M("user_scheduling")->where($map)->delete();
    }
}