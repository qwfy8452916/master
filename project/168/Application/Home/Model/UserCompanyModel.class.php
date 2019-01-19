<?php

namespace Home\Model;
Use Think\Model;
/**
 * 用户表
 */
class UserCompanyModel extends Model
{
    /**
     * 编辑会员扩展信息
     * @param  [type] $id   [description]
     * @param  [type] $data [description]
     * @return [type]       [description]
     */
    public function editCompanyExtendInfo($id,$data)
    {
        $map = array(
            "userid" => array("EQ",$id)
        );
        return M("user_company")->where($map)->save($data);
    }

    /**
     * 查询会员的总合同时间
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function getCompanyContract($id)
    {
        $map = array(
            "userid" => array("EQ",$id)
        );
        return M("user_company")->where($map)->field("contract_start,contract_end")->find();
    }
}