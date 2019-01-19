<?php
namespace app\mobile\controller;
use app\common\model\logic\LoginLogic;
use app\index\model\YxbAccount as HomeModel;
use think\Controller;

/**
 * 移动端登录
 * Class Install
 * @package app\mobile\controller
 */
class Login extends Controller
{
    //登录页
    public function index()
    {
        //验证pc 移动
        if(!$this->request->isMobile()){
            session('userInfo',null);
            $this->redirect('//'.config('pc_host').'/login/');
        }
        if(session('userInfo')) {
            $this->redirect('/');
        }
        return $this->fetch();
    }

    //找回密码
    public function findpsw(){
        session('forgetPswInfo',null);
        return $this->fetch();
    }

    //新密码
    public function newpsw(){
        if(!session('forgetPswInfo')){
            $this->redirect('login/findpsw');
        }
        return $this->fetch();
    }

    //清除登陆的session
    public function clearUserInfo(){
        session('userInfo',null);
        echo '清除登陆session成功！';die;
    }

    //登陆
    public function land(LoginLogic $loginLogic){
        $input = input('post.');
        if(empty($input)){
            return json(['status' => 0, 'info' => '账号或密码不能为空']);
        }
        $result = $loginLogic -> checkAccount($input);
        return json($result);
    }

    //发送短信
    public function sendNumber(LoginLogic $loginLogic){
        $data = input('post.');
        $hadaccount = $loginLogic->checkedHadAccount($data['accountnum']);
        if($hadaccount){
        }else{
            return json(["data" => "", "info" =>'您输入的账号不存在。', "status" => 0]);
        }
        $verifyResult = $loginLogic -> verifyAccountAndPhone($data);
        if($verifyResult){
            return $loginLogic -> sendMessage();
        }else{
            return json(["data" => "", "info" =>'请输入正确的手机号', "status" => 0]);
        }
    }

    /**
     * 手机端输入验证码输入完成后点击下一步验证
     *
     */
    public function checkSaveCode(LoginLogic $loginLogic){
        $data = input('post.');
        // 1.0 验证账号和手机号是否匹配
        // 2.0 验证手机号和验证码是否匹配
        // 3.0 验证账号是否可以修改密码
        $where = [];
        $where['accountnum'] = $data['account'];
        $where['tel'] = $data['tel'];
        $hadaccount = $loginLogic->checkedHadAccount($data['account']);
        if($hadaccount){
        }else{
            return json(["data" => "", "info" =>'您输入的账号不存在。', "status" => 0]);
        }
        $mobileAndCode = $loginLogic->verifyAccountAndPhone($where);
        if($mobileAndCode){
            //验证第二步
            $resultStatus = $loginLogic->checkOneStepSafeCode($data);
            if($resultStatus['status'] == 1){
                //验证第三步
                $resultStatus = $loginLogic->checkAccountCanuse($data);
                if($resultStatus['status'] == 1){
                    session('forgetPswInfo',$data);
                }
            }
            return json($resultStatus);

        }else{
            return json(["data" => "", "info" =>'手机号和账号不匹配', "status" => 0]);
        }

    }


    /**
     * 手机端修改密码第二步-修改密码
     * 接收表单提交
     * @return json字符串。
     */
    public function changePassword(LoginLogic $loginLogic)
    {
        //修改密码
        $input = input('post.');
        $data = [];
        $data['username'] = session('forgetPswInfo.account'); //用户账号
        $data['tel'] =  session('forgetPswInfo.tel');//用户手机号码
        $data['password'] = $input['password'];//新密码
        $resetResult = $loginLogic->resetPassword($data);//重置密码
        session('safecode', null);
        return json($resetResult);
    }


    //暂时加一个session
    public function jcsGetSession(){
        session('userInfo',null);
        $sessionData = ['id' => 74, 'company_id' => 377842, 'class_type'=> 1, 'default_rule'=>1 , 'isLogin' => 1];
        session('userInfo', $sessionData);
        dump(session('userInfo'));
    }


    public function showUserSession(){
        dump(session('userInfo'));
    }

    /**
     * 退出登录
     */
    public function loginout(){
        session('userInfo',null);
        return json(["error_code" => 0, "error_msg" =>'请求成功']);
    }


}
