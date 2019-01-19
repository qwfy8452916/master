<?php
namespace Home\Controller;
use Home\Common\Controller\HomeBaseController;
class GtverifyController extends HomeBaseController{
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
            $this->ajaxReturn(array('data' => '','info' => '验证错误，请刷新页面再尝试！','status'=>0 ));
        }
    }
}

