<?php
// +----------------------------------------------------------------------
// | Login 重置密码控制器
// +----------------------------------------------------------------------

namespace app\jiajum\controller;

use app\common\controller\JiajumBase;

class Getpassword  extends JiajumBase
{
    //找回密码界面
    public function index()
    {
        return $this->fetch();
    }

    /**
     * 修改密码
     * @return [type] [description]
     */
    public function editPassword()
    {
        if (!$this->request->isPost()){
            $this->_empty();
        }
        $data['tel'] = strtolower(input('post.tel'));
        $data['pass'] = input('post.password');
        $data['repass'] = input('post.repassword');
        $data['code'] = input('post.code');
        $data['authcode'] = intval(input('post.authcode','0'));
        //验证输入信息
        $errorMsg = $this->validate($data,'User.register');
        if(true !== $errorMsg){
            // 验证失败 输出错误信息
            return json(['status'=>0 ,'info'=>$errorMsg]);
        }
        //验证手机号是否注册
        $valiUser['user'] = $data["tel"];
        $find = model("User")->checkAccount($valiUser);
        if ($find === false) {
            return json(["data" => "", "info" => '无效的用户名', "status" => 0]);
        }

        //验证手机验证码
        $check = checkSafeCode($data);
        if ($check['status'] == 0 ){
            return json($check);
        }

        $addFlag = model("User")->edtiUserInfo($find['id'],['pass' => $data['pass']]);
        if ($addFlag !== false){
            $rel = ["data"=>"","info"=>"密码修改成功" ,"status"=>1];
        }else{
            $rel = ["data"=>"","info"=>"密码修改失败,请稍后重试" ,"status"=>0];
        }
        return json($rel);
    }
}