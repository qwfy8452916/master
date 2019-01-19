<?php
namespace Muser\Common\Controller;
use Think\Controller;
class MbaseController extends Controller{
    public function _initialize(){
        if(!session("?u_userInfo")){
            if(IS_AJAX){
                $this->ajaxReturn(array("data"=>"","info"=>"您的登录已超时,请重新登录","status"=>0));
            }else{
                header("LOCATION:http://old.qizuang.com");
            }
            die();
        }


        if(session("u_userInfo.classid") != 3){
            if(IS_AJAX){
                 $this->ajaxReturn(array("data"=>"","info"=>"无效的请求,请返回用户中心首页","status"=>0));
            }else{
                header("LOCATION:http://old.qizuang.com/home/");
            }
            die();
        }
    }

        //空操作
    public function _empty() {
        header("HTTP/1.1 404 Not Found");
        header("Status: 404 Not Found");
        $this->display('Public:404');
        die();
    }

    /**
     * [_error description]
     * @return [type] [description]
     */
    public function _error(){
        header("HTTP/1.1 404 Not Found");
        header("Status: 404 Not Found");
        $this->assign("headerTmp",$this->fetch($t));
        $this->display('Public:404');
        die();
    }
}