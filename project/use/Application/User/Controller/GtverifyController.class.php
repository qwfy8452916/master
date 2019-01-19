<?php
namespace User\Controller;
use Think\Controller;
class GtverifyController extends Controller{
    /**
     * 调用极验证，初始化验证参数
     * @return [type] [description]
     */
    public function getstartverify()
    {
        return D('Common/verifyserver')->startcaptchaservlet();
    }
    /**
     * 极验证二次验证
     * @return [type] [description]
     */
    public function verifylogin()
    {
        $result = D('Common/verifyserver')->verifyloginservlet();
        if ($result) {
            session("geetest_verify",true);
            $this->ajaxReturn(array('data' => '','info' => '验证成功','status'=>1 ));
        }else{
            $this->ajaxReturn(array('data' => '','info' => '验证错误，请刷新页面在尝试！','status'=>0 ));
        }
    }

    /**
     * 新的 极验证二次验证
     * @return [type] [description]
     */
    public function verifyGeetest()
    {
        $challenge = $_POST['challenge'];
        $username = $_POST['username'];
        $id = "a9cd528cfac8368c23c48f2d2d5006b1";
        $privateKey = "5c8e6a77376df1ac0e9bc2412b956be5";
        $seccode = md5($privateKey . $challenge);
        $data = array(
            "id"=> $id,  # 解决方案对应部署id
            "idType"=> 1,  # 用户标识符的类型：1:手机号2:邮箱3:昵称4:UID,用户站内编号0:其他
            "idValue"=> $_POST['tel'], # string  idType 对应的值
            "seccode"=> $seccode, # 必传  string  私钥+challenge md5的签名
            "challenge"=> $challenge,  # 必传  string  查询结果的凭证, 从前一个接口返回
            "user_ip"=> "127.0.0.1", # 必传  string  用户真实访问网站的ip
            "timestamp"=> (int)time()   # 必传  int 用户发起对应事件交互行为时的时间戳
        );

        $data = http_build_query($data);
        $url = "http://api.geetest.com/gt_verify";
        $opts = array(
            'http' => array(
                'method'  => 'POST',
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n" . "Content-Length: " . strlen($data) . "\r\n",
                'content' => $data,
                'timeout' => 2
            )
        );
        $context = stream_context_create($opts);
        $res = file_get_contents($url, false, $context);
        $res = json_decode($res,true);
        if ($res["status"] == "success") {
            $this->ajaxReturn(array("status" => 1));
        }
        $this->ajaxReturn(array("status" => 0));
    }
}

