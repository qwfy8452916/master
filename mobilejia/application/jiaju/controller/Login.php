<?php
// +----------------------------------------------------------------------
// | Login 登录路由控制器
// +----------------------------------------------------------------------

namespace app\jiaju\controller;

use app\common\controller\JiajumBase;
use app\common\enums\ApiConfig;

class Login extends JiajumBase
{
    public function _initialize()
    {
        parent::_initialize(); // TODO: Change the autogenerated stub
    }
    /**
     * 用户登录接口
     * POST方式
     * @param [string] name 注册时手机号码
     * @param [string] password 密码
     * @return [json]
     */
    public function login()
    {
        if (!$this->request->isPost()) {
            $this->_empty();
        }
        $data['user'] = strtolower(input('post.name'));
        $data['pass'] = input('post.password');

        $errorMsg = $this->validate($data, 'User.login');
        if (true !== $errorMsg) {
            // 验证失败 输出错误信息
            return json(['status' => 0, 'info' => $errorMsg]);
        }
        $user = model("User")->findUserInfoByUser($data["user"]);

        if (!empty($user)) {
            if ($user["pass"] == md5($data["pass"])) {
                //更新登陆时间
                $flag = model('User')->edtiUserInfo($user["id"], ["login_time" => time()]);
                if ($flag === false) {
                    return json(["data" => "", "info" => "登录失败,请稍后重试", "status" => 0]);
                }
                //记录登录日志
                $this->saveLoginLog($user['name'], $user["id"]);
                //设置用户session信息
                $this->setUserSession($user);
                return json(["data" => "", "info" => "登录成功", "status" => 1]);
            } else {
                return json(["data" => "", "info" => "用户帐号/密码错误", "status" => 0]);
            }
        } else {
            return json(["data" => "", "info" => "用户帐号/密码错误", "status" => 0]);
        }
    }

    /**
     * 记录登录日志
     * @param $name
     * @param $id
     */
    protected function saveLoginLog($name, $id)
    {
        $app = new \Util\App();
        //记录日志
        $data['username'] = $name;
        $data['userid'] = $id;
        $data['ip'] = $app->get_client_ip();
        $data['user_agent'] = $_SERVER["HTTP_USER_AGENT"];
        $data['info'] = '用户登录成功';
        $data['time'] = date("Y-m-d H:i:s");
        $data['action'] = $this->request->controller() . "/" . $this->request->action();
        model("LogUser")->addLog($data);
    }

    /**
     * 设置用户session信息
     * @param [array]$user 用户信息
     */
    protected function setUserSession($user)
    {
        switch ($user["classid"]) {
            //普通用户
            case "1":
            case "2":
                //企业用户
            case '3':
                session('u_userInfo', [
                    "id" => $user["id"],
                    "name" => $user["name"],
                    "user" => $user["user"],
                    "cs" => $user["cs"],
                    "qx" => $user["qx"],
                    "logo" => $user["logo"],
                    "classid" => $user["classid"],
                    "bm" => $user["bm"],
                    "cname" => $user["cname"],
                    "jc" => $user["name"],
                    "on" => $user["on"],
                    'blocked' => $user['blocked']]);
                break;
            default:
                break;
        }
    }

    //退出操作
    public function loginout()
    {
        //分站域名
        $bm = session('u_userInfo.bm');
        //清除用户session
        cache('Cache:User:ID' . session('u_userInfo.id'), null);
        session('u_userInfo', null);
        if ($this->request->isAjax()) {
            return json(["info" => "退出成功", "status" => 1]);
        } else {
            if (session('?denyPcNum')){
                $url = url('jiaju/index/index');
                session('denyNum',null);
            }else{
                session('denyPcNum',1);
                $referUlr = $this->request->header('referer');
                $url = ($referUlr === $this->request->url(true) || $referUlr ===null)?url('jiaju/index/index'):$this->request->header('referer');
            }
            @header("location:" . $url);
            exit();
        }
    }

    /**
     * 修改密码
     * @return [type] [description]
     */
    public function editPassword()
    {
        if (!$this->request->isPost()) {
            $this->_empty();
        }
        $data['tel'] = strtolower(input('post.tel'));
        $data['pass'] = input('post.pass');
        $data['repass'] = input('post.repass');
        $data['code'] = input('post.code');
        $data['authcode'] = intval(input('post.authcode', '0'));
        //验证输入信息
        $errorMsg = $this->validate($data, 'User.register');
        if (true !== $errorMsg) {
            // 验证失败 输出错误信息
            return json(['status' => 0, 'info' => $errorMsg]);
        }
        //验证手机号是否注册
        $valiUser['user'] = $data["tel"];
        $find = model("User")->checkAccount($valiUser);
        if ($find === false) {
            return json(["data" => "", "info" => '无效的用户名', "status" => 0]);
        }

        //验证手机验证码
        $check = checkSafeCode($data);
        if ($check['status'] == 0) {
            return json($check);
        }

        $addFlag = model("User")->edtiUserInfo($find['id'], ['pass' => $data['pass']]);
        if ($addFlag !== false) {
            $rel = ["data" => "", "info" => "密码修改成功", "status" => 1];
        } else {
            $rel = ["data" => "", "info" => "密码修改失败,请稍后重试", "status" => 0];
        }
        return json($rel);
    }

    //注册和修改密码的第一步验证手机号码
    public function checkCode()
    {
        $data['tel'] = input('post.tel');
        $data['code'] = input('post.code');
        $data['checkUser'] = input('post.checkUser');

        if (empty($data['code'])) {
            return json(['status' => ApiConfig::REQUEST_FAILL, 'info' => '']);
        }
        if (empty($data['tel'])) {
            return json(['status' => ApiConfig::REQUEST_FAILL, 'info' => '']);
        }

        //注册和登录验证手机号是否注册
        if (isset($data["checkUser"]) && $data["checkUser"] == 1) {
            $valiUser['user'] = $data["tel"];
            //验证用户帐号，已经注册返回错误信息
            $find = model("User")->checkAccount($valiUser);
            if ($find !== false) {
                return json(["data" => "", "info" => '手机已经注册', "status" => ApiConfig::REQUEST_FAILL]);
            }
        }

        //修改密码验证手机号是否注册
        if (isset($data["checkUser"]) && $data["checkUser"] == 2) {
            $valiUser['user'] = $data["tel"];
            //验证用户帐号，尚未注册返回错误信息
            $find = model("User")->checkAccount($valiUser);
            if ($find === false) {
                return json(["data" => "", "info" => '手机尚未注册', "status" => ApiConfig::REQUEST_FAILL]);
            }
        }

        //验证第一步手机验证码(正确不会清除session，方便下一步调用)
        $check = checkOneStepSafeCode($data);
        return json($check);
    }

    /**
     * 用户注册接口
     * @param [string] tel 手机号码
     * @param [string] password 密码
     * @param [string] repassword 重复密码
     * @param [int] code 验证码
     * @param [int] checkUser 存在并且值为1代表验证手机是否已经被注册
     * @param [int] nick_name 昵称
     * @return [type] [description]
     * @return \think\response\View
     */
    public function register()
    {
        if (!$this->request->isPost()) {
            $this->_empty();
        }
        $data['tel'] = strtolower(input('post.tel'));
        $data['pass'] = input('post.pass');
        $data['repass'] = input('post.repass');
        $data['code'] = input('post.code');
        $data['name'] = input('post.nick_name');
        $data['authcode'] = intval(input('post.authcode', '0'));

        //验证输入信息
        $errorMsg = $this->validate($data, 'User.pcregister');
        if (true !== $errorMsg) {
            // 验证失败 输出错误信息
            return json(['status' => 0, 'info' => $errorMsg]);
        }
        //验证手机号是否注册
        $valiUser['user'] = $data["tel"];
        //验证用户帐号
        $find = model("User")->checkAccount($valiUser);
        if ($find !== false) {
            return json(["data" => "", "info" => '该手机已被注册', "status" => 0]);
        }

        //验证手机验证码
        $check = checkSafeCode($data);
        if ($check['status'] == 0) {
            return json($check);
        }
        //注册并登录
        db()->startTrans();
        try {
            $addFlag = model("User")->addUserInfo($data);
            $user = model("User")->findUserInfoByUser($data['tel']);
            if ($addFlag !== false) {
                //更新登陆时间
                $flag = model('User')->edtiUserInfo($user["id"], ["login_time" => time()]);
                if ($flag === false) {
                    throw new \Exception('"注册失败,请稍后重试"');
                }
                //记录登录日志
                $this->saveLoginLog($data['name'], $user["id"]);
                //设置用户session信息
                $this->setUserSession($user);
                $rel = ["data" => "", "info" => "注册成功", "status" => 1];
            } else {
                $rel = ["data" => "", "info" => "注册失败,请稍后重试", "status" => 0];
            }
        }catch (\Exception $e){
            db()->rollback();
            $rel = ["data" => "", "info" => "注册失败,请稍后重试", "status" => 0];
        }
        return json($rel);
    }

    /**
     * 用户协议条款界面
     * @return mixed
     */
    public function agreement()
    {
        return $this->fetch();
    }
}
