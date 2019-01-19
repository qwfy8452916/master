<?php

namespace app\common\controller;

use think\Controller;

class Sms extends Controller
{
    //自定义信息
    static protected $SUCCESSCODE = 1;
    static protected $ERRORCODE = 0;
    static protected $RETURNMSG = [
        0 => '该用户帐号已被注册!',
        1 => '短信发送成功!',
        2 => '短信发送失败!',
        3 => '请求信息错误!',
        4 => '邮件发送失败!',
        5 => '邮件发送成功!',
        6 => '发送成功',
        7 => '发送失败,请稍后再试！',
        8 => '亲,帐号不符,请输入正确的手机/邮箱',
        9 => '亲,您输入的验证码不正确',
        10 => '亲,验证码输对了！',
        11 => '验证码已过期，请重新获取',
        12 => '亲,验证码不正确！',
        13 => '该用户帐号尚未注册!',
        14 => '验证码已过期'
    ];
    static protected $EMAILSUBJECT = '请验证您的邮箱账号（来自：齐装网）';

    /**
     * 发送短信验证码
     * POST请求
     * @param [string] tel 手机号码
     * @param [int] authcode 存在并且值为1代表手机加密
     * @param [int] checkUser 存在并且值为1代表验证手机是否已经被注册
     * @return [type] [description]
     */
    public function sendsms()
    {
        if (!$this->request->isPost()) {
            return json(["data" => "", "info" =>'请求类型不正确！', "status" => self::$ERRORCODE]);
        }
        //整个post赋值到data
        $data = input('post.');

        if (empty($data["tel"])) {
            return json(["data" => "", "info" =>'手机号码为空', "status" => self::$ERRORCODE]);
        }

        //注册和登录验证手机号是否注册
        if (isset($data["checkUser"]) && $data["checkUser"] == 1) {
            $valiUser['user'] = $data["tel"];
            //验证用户帐号，已经注册返回错误信息
            $find = model("User")->checkAccount($valiUser);
            if ($find !== false) {
                return json(["data" => "", "info" => self::$RETURNMSG[0], "status" => self::$ERRORCODE]);
            }
        }

        //修改密码验证手机号是否注册
        if (isset($data["checkUser"]) && $data["checkUser"] == 2) {
            $where['contact_tel'] = $data["tel"];
            //验证用户帐号，尚未注册返回错误信息
            $find = model('model/db/YxbAccount') -> getCheckAccount($where);
            if (!$find) {
                return json(["data" => "", "info" => self::$RETURNMSG[13], "status" => self::$ERRORCODE]);
            }
        }

        //产生短信验证码
        $app = new \Util\App();
        //获取6位数字
        $code = $app->getSafeCode(6, "NUMBER");
        //加密code
        $authcode = authcode($code, '');

        //authcode 是否需要解密
        //如果传入的加密的手机号码进行解密操作
        if (isset($data["authcode"]) && $data["authcode"] == 1) {
            $tel = authcode($data["tel"], "DECODE");
        } else {
            //否者$tel就为提交的明文tel
            $tel = $data["tel"];//发送的电话号码
        }

        //发送短信
        $tel_encrypt = substr_replace($tel, "*****", 3, 5); //做一个中间为星号的号码
        $tel_md5 = $app->order_tel_encrypt($tel); //做一个加密后的号码
        $time = time(); //取当前时间

        //1.1 使用不同的短信通道发送 通过配置项判断
        $smsChannel = OP('sms_channel', 'yes') ?: 'yuntongxun';

        switch ($smsChannel) {
            case 'yuntongxun':
                $Telytx = new \Yuntongxun\Telytx();  //实例化
                $data[] = $code;                     //验证码
                $data[] = OP('SMS_STEP');       //短信的有效时间
                $tmp = OP('SMS_ORDERFB_INDEX'); //发送的短信模版ID
                $result = $Telytx->sendTemplateSMS($tel, $data, $tmp); //发送

                if ($result["status"] == 1) { //发送状态为成功
                    //设置加密后的验证码session
                    $this->setSafeCodeSession($authcode, $tel);
                    //如果成功,写入成功日志
                    $this->saveLog(session('cityId'), $app->get_client_ip(), $tel_encrypt, $result["smsMessageSid"], $tel_md5, $result["dateCreated"], $result["msg"], $time, $smsChannel, true);
                    $returnMsg = ["data" => "", "info" => self::$RETURNMSG[1], "status" => self::$SUCCESSCODE];
                } else {
                    //如果失败,写入失败日志
                    $this->saveLog(session('cityId'), $app->get_client_ip(), $tel_encrypt, $result["smsMessageSid"], $tel_md5, $result["dateCreated"], $result["msg"], $time, $smsChannel, false);
                    $returnMsg = ["data" => "", "info" => self::$RETURNMSG[2], "status" => self::$ERRORCODE];
                }
                break;
            case 'ihuyi':
                //互亿无线通道
                $sms_ihuyi_56869 = str_replace("【变量】", "%s", OP('sms_ihuyi_56869')); //取短信模版并把 【变量】 替换成 s%
                $smscontent = sprintf($sms_ihuyi_56869, $code, OP('SMS_STEP')); // 做模版
                $result = xmltoarray($app->SmsSend($tel, $smscontent)); //发送

                if ($result["code"] == 2) { //发送状态为成功
                    //设置加密后的验证码session
                    $this->setSafeCodeSession($authcode, $tel);
                    //如果成功,写入成功日志
                    $this->saveLog(session('cityId'), $app->get_client_ip(), $tel_encrypt, $result["smsid"], $tel_md5, '', $result["msg"], $time, $smsChannel, true);
                    $returnMsg = ["data" => "", "info" => self::$RETURNMSG[1], "status" => self::$SUCCESSCODE];
                } else {
                    //如果成功,写入成功日志
                    $this->saveLog(session('cityId'), $app->get_client_ip(), $tel_encrypt, $result["smsid"], $tel_md5, '', $result["msg"], $time, $smsChannel, false);
                    $returnMsg = ["data" => "", "info" => self::$RETURNMSG[2], "status" => self::$ERRORCODE];
                }
                break;

            case 'yunrongt':
                //云融正通通道
                $Yunrongt = new \Util\Yunrongt();
                //做发送短信内容,取短信模版并把 【变量】 替换成 s%
                $yunrongt_tpl_yzm = str_replace("【变量】", "%s", OP('yunrongt_tpl_yzm'));
                $smscontent = sprintf($yunrongt_tpl_yzm, $code, OP('SMS_STEP')); // 做模版
                //做提交信息
                $smsdata['mobile'] = $tel; //手机号码
                $smsdata['content'] = $smscontent; //短信内容
                $result = $Yunrongt->sendMessage($smsdata);
                if ($result["errcode"] > 0) { //发送状态为成功
                    //设置加密后的验证码session
                    $this->setSafeCodeSession($authcode, $tel);
                    //如果成功,写入成功日志
                    $this->saveLog(session('cityId'), $app->get_client_ip(), $tel_encrypt, '', $tel_md5, '', '成功;yzm', $time, $smsChannel, true);
                    $returnMsg = ["data" => "", "info" => self::$RETURNMSG[1], "status" => self::$SUCCESSCODE];
                } else {
                    ///如果失败,写入失败日志
                    $this->saveLog(session('cityId'), $app->get_client_ip(), $tel_encrypt, '', $tel_md5, '', $result["errmsg"], $time, $smsChannel, false);
                    $returnMsg = ["data" => "", "info" => self::$RETURNMSG[2], "status" => self::$ERRORCODE];
                }
                break;
            default:
                $returnMsg = ["data" => "", "info" => self::$RETURNMSG[3], "status" => self::$ERRORCODE];
                break;
        }
        return json($returnMsg);
    }

    /**
     * 验证码验证
     * POST请求
     * @param [string] tel 手机号码
     * @param [string] code 验证码
     * @param [int] authcode 存在并且值为1代表手机解密
     * @return [type] [description]
     */
    public function checkSafeCode()
    {
        if (!$this->request->isPost()) {
            return json(["data" => "", "info" =>'请求类型不正确！', "status" => self::$ERRORCODE]);
        }
        $data = input('post.');
        if (!empty($data["code"])) {
            if(session('safecode.expirytime') < time()){
                session('safecode',null);
                return json(["data" => "", "info" => self::$RETURNMSG[14], "status" => self::$ERRORCODE]);
            }
            $safecode = session('safecode');
            if (!empty($safecode)) {
                $tel = $data["tel"];
                //是否需要解密电话号码/邮箱
                if (isset($data["authcode"]) && $data["authcode"] == 1) {
                    $tel = authcode($data["tel"], "DECODE");
                }
                if ($tel != $safecode["tel"]) {
                    //清除验证session
                    session('safecode',null);
                    return json(["data" => "", "info" => self::$RETURNMSG[8], "status" => self::$ERRORCODE]);
                }
                if (strtolower($data["code"]) != authcode($safecode["code"])) {
                    //清除验证session
                    session('safecode',null);
                    return json(["data" => "", "info" => self::$RETURNMSG[9], "status" => self::$ERRORCODE]);
                }
                //清除验证session
                session('safecode',null);
                return json(["data" => "", "info" => self::$RETURNMSG[10], "status" => self::$SUCCESSCODE]);
            } else {
                return json(["data" => "", "info" => self::$RETURNMSG[11], "status" => self::$ERRORCODE]);
            }
        } else {
            //清除验证session
            session('safecode',null);
            return json(["data" => "", "info" => self::$RETURNMSG[12], "status" => self::$ERRORCODE]);
        }
    }

    /**
     * 发送邮件验证码
     * POST请求
     * @param [string] email 邮箱
     * @param [int] authcode 存在并且值为1代表邮箱加密
     * @param [int] checkUser 存在并且值为1代表验证邮箱是否注册
     * @return [type] [description]
     */
    public function sendemail()
    {
        if (!$this->request->isPost()) {
            return json(["data" => "", "info" =>'请求类型不正确！', "status" => self::$ERRORCODE]);
        }

        $data = input('post.');
        if (isset($data["checkUser"]) && $data["checkUser"] == 1) {
            //验证用户帐号
            $find = model("User")->checkAccount(['user' => $data["email"]]);
            if ($find !== false) {
                return json(["data" => "", "info" => self::$RETURNMSG[0], "status" => self::$ERRORCODE]);
            }
        }
        $to = $data["email"];

        //是否需要解密电话号码/邮箱
        if (isset($data["authcode"]) && $data["authcode"] == 1) {
            $to = authcode($data["email"], "DECODE");
        }

        //产生验证码
        $app = new \Util\App();
        //获取6位数字
        $code = $app->getSafeCode(6, "NUMBER");
        //加密code
        $authcode = authcode($code, '');
        //保存验证码
        $this->setSafeCodeSession($authcode,$to);

        $tmp = $this->fetch('common@email/registeremail');
        $html = sprintf($tmp, $code);
        $data = array(
            "api_user" => OP('SENDCLOUD_ACCOUNT'),
            "api_key" => OP('SENDCLOUD_KEY'),
            "from" => OP('SENDCLOUD_FROM'),
            "to" => $to,
            "subject" => self::$EMAILSUBJECT,
            "html" => $html
        );
        $url = "http://sendcloud.sohu.com/webapi/mail.send.json";
        //初始化curl
        $ch = curl_init();
        //参数设置
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($ch);

        $data = array(
            "uid" => session('u_userInfo.id'),
            "from" => OP('SENDCLOUD_FROM'),
            "to" => $to,
            "status" => self::$ERRORCODE,
            "remark" => self::$RETURNMSG[4],
            "time" => time()
        );
        if ($result !== FALSE) {
            $json = json_decode($result, true);
            if (strtolower($json["message"]) !== "error") {

                $data["status"] = 1;
                $data["remark"] = self::$RETURNMSG[5];
                $array = array("data" => '', "info" => self::$RETURNMSG[6], "status" => self::$SUCCESSCODE);
            } else {
                $errMsg = "";
                foreach ($json["errors"] as $key => $value) {
                    $errMsg .= $value . "/";
                }
                $data["remark"] = $errMsg;
                $array = array("data" => "", "info" => self::$RETURNMSG[7], "status" => self::$ERRORCODE);
            }
        } else {
            $array = array("data" => "", "info" => self::$RETURNMSG[7], "status" => self::$ERRORCODE);
        }
        model("model/db/LogSmsUserSend")->addLog($data);
        curl_close($ch);
        return json($array);
    }

    /**
     * 设置加密后的验证码Session
     * @param  [string]$code 加密后的验证码
     * @param  [string]$tel  手机号
     * @param  [int]$time 当前时间戳
     */
    private function setSafeCodeSession($authcode, $tel)
    {
        //做一个数组记录 加密的验证码 和 手机号码
        $arr = ["code" => $authcode, "tel" => $tel , 'expirytime'=> time()+1800];
        session('safecode',$arr);
    }

    /**
     *
     * 写入日志
     */
    protected function saveLog($cityId, $ip, $tel, $smsMessageSid, $tel_encrypt, $dateCreated, $remark, $addtime, $sms_channel, $flag = true)
    {
        //做一个日志
        $smsData = [
            "cid" => $cityId,
            "ip" => $ip,
            "tel" => $tel,
            "smsMessageSid" => $smsMessageSid,
            "tel_encrypt" => $tel_encrypt,
            "dateCreated" => $dateCreated,
            "remark" => $remark,
            "addtime" => $addtime,
            "sms_channel" => $sms_channel,
        ];
        if ($flag == true) {
            $smsData['status'] = 1;
        } else {
            $smsData['status'] = 0;
        }
        model("model/db/LogSmsUserSend")->addLog($smsData); //写日志
    }
}
