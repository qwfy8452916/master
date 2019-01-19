<?php
/**
 *  微信令牌表
 */
namespace Common\Model;
use Think\Model;
class WechattokenModel extends Model{
    protected $tableName = 'wechat_token';
    public function getLastToken(){
        return M("wechat_token")->order("id desc")->find();
    }

    public function addToken($data){
        return M("wechat_token")->add($data);
    }
}