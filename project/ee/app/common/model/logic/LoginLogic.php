<?php
/**
 * Created by PhpStorm.
 * User: jsb
 * Date: 2018/9/5
 * Time: 14:07
 */

namespace app\common\model\logic;

use app\common\model\db\YxbLoginLog;
//需要引用类库
use think\Db;

class LoginLogic
{
    //验证帐号和密码
    public function checkAccount($data){
        $where = [];
        $nowTime = time();
        !empty($data['username']) && $where['account'] = trim($data['username']);
        !empty($data['password']) && $where['a.pass'] = md5(trim($data['password']));
        $hadaccount = $this->checkedHadAccount($data['username']);
        if($hadaccount){
        }else{
            return ['status' => 0, 'info' => '您输入的账号不存在。'];
        }
        $result = model('model/db/YxbAccount')->getCheckAccount($where);
        if(!$result){
            return ['status' => 0, 'info' => '用户名或密码不正确！'];
        }
        if($result['is_del'] == 2){
            return ['status' => 0, 'info' => '您输入的账号不存在。'];
        }

        //获取时间满足的数据
        $timeinreal = model('model/db/YxbAccount')->getAllTimeReal($result['company_id']);
        if($timeinreal){
            $result['start_time'] = $timeinreal['start_time'];
            $result['end_time'] = $timeinreal['end_time'];
            $result['type'] = $timeinreal['type'];
        }


        if($result['start_time'] < $nowTime && $nowTime < $result['end_time']){
            if($result['status'] == 2){
                return ['status' => 0, 'info' => '您的账号暂时无法使用，如有疑问请联系您公司的管理员'];
            }

            if($result['type'] != 2){
                return ['status' => 0, 'info' => '您的账号不在使用有效期内,如有疑问请联系客服。'];
            }
            //区分账号大小写？
            if(md5($data['username']) === md5($result['account'])){
                $getdefault_rule = model('model/db/YxbAccount')->getDefaultRuleByAccountId($result['id']);
                //用户信息
                $sessionData = ['jc' => $result['jc'],'id' => $result['id'],'account' => $result['account'],'accountimg' => $result['image'], 'company_id' => $result['company_id'], 'pass_check' => md5($result['pass'] . 'qizuang.com'), 'class_type'=> $result['class_type'], 'default_rule'=>$getdefault_rule, 'contact_name' => $result['contact_name'], 'station' => $result['postname'], 'isLogin' => 1];
                session('userInfo', $sessionData);
                //记录登陆日志
                $this -> loginRecord($result);
                return ['status' => 1, 'info' => '登陆成功。'];
            }else{
                return ['status' => 0, 'info' => '用户名或密码不正确。'];
            }

        }
        return ['status' => 0, 'info' => '您的账号不在使用有效期内,如有疑问请联系客服。'];
    }
    //记录登陆日志
    public function loginRecord($result){
        $app = new \Util\App();
        $data['ip'] = $app -> get_client_ip();
        $data['time'] = time();
        $data['account'] = $result['account'];
        $data['company_id'] = $result['company_id'];
        $data['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
        YxbLoginLog::loginRecord($data);
    }
    //重置密码的信息发送
    public function sendMessage(){
       return controller('common/Sms')->sendsms();
    }
    //重置密码
    public function resetPassword($data){
        !empty($data['username']) && $where['account'] = trim($data['username']);
        !empty($data['tel']) && $where['contact_tel'] = trim($data['tel']);
        !empty($data['password']) && $where['pass'] = md5(trim($data['password']));
        $result = model('model/db/YxbAccount')->updataPass($where);
        if(!$result){
            return ['status' => 0, 'info' => '密码修改失败'];
        }
        if(session('forgetPswInfo')){
            session('forgetPswInfo',null);
        }
        session('userInfo',null);
        return ['status' => 1, 'info' => '密码修改成功'];
    }
    //检测验证码
    public function checkSafeCode(){
        return controller('common/Sms')->checkSafeCode();
    }

    /**
     * 通过账号查询登陆数据最新的一条
     * @param $data 查询账号 , [对象|数组|单条]
     * @param int $count
     * @return mixed
     */
    public function getUserLoginInfoByAccount($data){
        if(is_object($data) || is_array($data)){
            $accounts = getArrayFList($data,'account');
        }else{
            $accounts = $data;
        }
        $accounts = array_unique($accounts);
        $where = [];
        //获取用户的登陆数据
        if(is_array($accounts)){
            $where[] = ['account','in',$accounts];
        }else{
            $where[] = ['account','=',$accounts];
        }
        if (is_object($data) || is_array($data)) {
            $loginList = model('model/db/YxbLoginLog')->getUserLoginInfo($where);
            $loginData = [];
            foreach ($loginList as $k => $v) {
                $loginData[$v['account']] = $v;
            }
            unset($loginList);
            foreach ($data as $k => $v) {
                if (isset($loginData[$v['account']]) && !empty($loginData[$v['account']])) {
                    $data[$k]['login'] = $loginData[$v['account']];
                } else {
                    $data[$k]['login'] = [];
                }
            }
            return $data;
        } else {
            return model('model/db/YxbLoginLog')->getUserLoginInfo($where,1);
        }
    }

    /**
     * 验证手机号和账号是否匹配
     * $data | 数组    $data['accountnum']:登陆账号    $data['tel']:手机号码
     *
     */
    public function verifyAccountAndPhone($data){
        $where = [];
        !empty($data['accountnum']) && $where['account'] = trim($data['accountnum']);
        !empty($data['tel']) && $where['contact_tel'] = trim($data['tel']);
        return model('model/db/YxbAccount')->verifyAccountAndPhone($where);
    }


    //移动端校验验证码
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
                    return ["data" => "", "info" => '验证码错误，请重新输入', "status" => 0];
                }
                //清除验证session
                session('safecode', null);
                return ["data" => "", "info" => '亲,验证码输对了！', "status" => 1];
            } else {
                return ["data" => "", "info" => '验证码错误，请重新输入', "status" => 0];
            }
        } else {
            //清除验证session
            session('safecode', null);
            return ["data" => "", "info" => '验证码错误，请重新输入', "status" => 0];
        }
    }

    /**
     * 验证账号是否存在
     * @param  [string] $accountname [用户登录名]
     * @return [type]              [description]
     */
    public function checkedHadAccount($accountname){
        $where['account'] = $accountname;
        return model('model/db/YxbAccount')->checkedHadAccount($where);
    }

    /**
     * 验证账号是否可以修改密码
     */
    public function checkAccountCanuse($data){
        $nowTime = time();
        !empty($data['account']) && $where['account'] = trim($data['account']);
        !empty($data['tel']) && $where['contact_tel'] = trim($data['tel']);
        $hadaccount = $this->checkedHadAccount($data['account']);
        if($hadaccount){
        }else{
            return ['status' => 0, 'info' => '您输入的账号不存在。'];
        }
        $result = model('model/db/YxbAccount')->getCheckAccount($where);
        if(!$result){
            return ['status' => 0, 'info' => '帐号验证失败！'];
        }
        if($result['start_time'] < $nowTime && $nowTime < $result['end_time']){
            if($result['status'] == 2){
                return ['status' => 0, 'info' => '您的账号暂时无法使用，如有疑问请联系您公司的管理员'];
            }
            if($result['type'] != 2){
                return ['status' => 0, 'info' => '您的账号不在使用有效期内,如有疑问请联系客服。'];
            }else{
                //可修改密码
                return ['status' => 1];
            }
        }
        return ['status' => 0, 'info' => '您的账号不在使用有效期内,如有疑问请联系客服。'];
    }

}