<?php
// +----------------------------------------------------------------------
// | User 用户表
// +----------------------------------------------------------------------
// | Author: 2851986856@qq.com
// +----------------------------------------------------------------------

namespace app\common\model;


use think\Model;

class User extends Model
{
    protected $autoWriteTimestamp = false;

    /**
     * 检查帐号是否被使用
     * @return [type] [description]
     */
    public function checkAccount($where)
    {
        $find = $this->where($where)->find();
        if (empty($find)) {
            return false;
        } else {
            return $find;
        }
    }


    /**
     * 根据登录名获取用户信息
     * @param  [type] $user [用户名]
     * @return [type] [description]
     */
    public function findUserInfoByUser($user)
    {
        $where['a.user'] = $user;
        return $this->alias("a")->join('qz_quyu b','b.cid = a.cs','LEFT')->where($where)->field("a.*,b.bm,b.cname ")->find();
    }

    /**
     * 编辑用户信息
     * @return [type] [description]
     */
    public function edtiUserInfo($id,$data)
    {
        $map['id'] = $id;
        if (isset($data['pass'])){
            $data['pass'] = md5($data['pass']);
        }
        return $this->isUpdate(true)->allowField(true)->save($data,$map);
    }

    /**
     * 新增注册用户
     */
    public function addUserInfo($data)
    {
        $data['pass'] = md5($data['pass']);
        $data['logo'] = '/assets/index/images/default_logo.png';
        $data['user'] =$data['tel'];
        $data['tel_safe'] = $data['tel'];
        $data['tel_safe_chk'] = 1;
        $data['classid'] = 1;
        $data['register_time'] = time();
        return $this->isUpdate(false)->allowField(true)->save($data);
    }

}