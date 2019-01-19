<?php
namespace app\index\controller;
use app\common\model\logic\LoginLogic;
use app\index\model\YxbAccount as HomeModel;
use think\Controller;

/**
 * PC端登录
 * Class Login
 * @package app\index\controller
 */
class Login extends Controller
{
    //登录页
    public function index(){
        //验证pc 移动
        if($this->request->isMobile()){
            session('userInfo',null);
            $this->redirect('//'.config('m_host').'/login/');
        }
        if(session('userInfo')) {
            $this->redirect('/');
        }
        // 渲染模板输出
        return $this->fetch();

    }

    //重置密码页
    public function reset(){
        return $this->fetch();
    }

    //登录
    public function land(LoginLogic $loginLogic){
        $input = input('post.');
        if(empty($input)){
            return json(['status' => 0, 'info' => '账号或密码不能为空']);
        }
        $result = $loginLogic->checkAccount($input);
        return json($result);
    }

    //重置密码
    public function resetPassword(LoginLogic $loginLogic)
    {
        //1.0验证手机号码和验证码是否一致
        //2.0验证帐号和密码和手机号是否一致
        //3.0验证账号是否可修改密码
        //修改密码
        $input = input('post.');
        //验证账号是否存在
        $hadAccount = $loginLogic->checkedHadAccount($input['username']);
        if($hadAccount){
            $resultStatus = $this->checkOneStepSafeCode($input);
            if(!$resultStatus['status']) {
                return json($resultStatus);
            }
            //验证账号是否可以修改密码
            $yzdata['account'] = $input['username'];
            $yzdata['tel'] = $input['tel'];
            $yzaccount = $loginLogic->checkAccountCanuse($yzdata);
            if($yzaccount['status'] == 1){
                $resetResult = $loginLogic->resetPassword($input);
                //清除验证码session
                session('safecode', null);
                return json($resetResult);
            }else{
                return json($yzaccount);
            }

        }else{
            return json(["data" => "", "info" =>'您输入的账号不存在', "status" => 0]);
        }

    }

    //发送短信
    public function sendNumber(LoginLogic $loginLogic)
    {
        $data = input('post.');
        //验证账号是否存在
        $hadAccount = $loginLogic->checkedHadAccount($data['accountnum']);
        if($hadAccount){
            $verifyResult = $loginLogic->verifyAccountAndPhone($data);
            if($verifyResult){
                return $loginLogic->sendMessage();
            }else{
                return json(["data" => "", "info" =>'请输入账号绑定的正确手机号', "status" => 0]);
            }
        }else{
            return json(["data" => "", "info" =>'您输入的账号不存在', "status" => 0]);
        }

    }

    //校验验证码
    public function checkOneStepSafeCode($data)
    {
        if (!empty($data["code"])) {
            $safecode = session('safecode');
            if (!empty($safecode)) {
                $tel = $data["tel"];
                //是否需要解密电话号码/邮箱
                if (isset($data["authcode"]) && $data["authcode"] == 1) {
                    $tel = authcode($data["tel"], "DECODE");
                }
                if ($tel != $safecode["tel"]) {
                    //清除验证session
                    return ["data" => "", "info" => '发送验证码手机号错误', "status" => 0];
                }
                if (strtolower($data["code"]) != authcode($safecode["code"])) {
                    //清除验证session
                    return ["data" => "", "info" => '验证码错误', "status" => 0];
                }

                if(!empty(session('safecode')) && session('safecode.expirytime') < time()){
                    return ["data" => "", "info" => '验证码已过期，请重新获取', "status" => 0];
                }
                //清除验证session
                session('safecode', null);
                return ["data" => "", "info" => '验证码正确', "status" => 1];
            } else {
                return ["data" => "", "info" => '验证码错误', "status" => 0];
            }
        } else {
            //清除验证session
            session('safecode', null);
            return ["data" => "", "info" => '验证码错误', "status" => 0];
        }
    }

    //清除登录的session
    public function clearUserInfo(){
        session('userInfo',null);
        $this->redirect('/login/');
        echo '清除登录session成功！';die;
    }


}
