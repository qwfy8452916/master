<?php

namespace Home\Model\Db;
Use Think\Model;

class OrderWechatModel extends Model
{
    /**
     * 编辑微信账号
     * @param  string $company_id [description]
     * @return [type]             [description]
     */
    public function editWechat($company_id = "",$data)
    {
        $map = array(
            "comid" => array("EQ",$company_id)
        );
        return M("order_wechat")->where($map)->save($data);
    }
}