<?php
/**
 * 检查移动设备
 */
namespace Home\Behavior;
use Think\Behavior;
class MobileBrowserCheckBehavior extends Behavior {
    public function run(&$params) {
        //域名 *.qizuang.com 判断移动设备访问，跳转到移动页
        //例如移动设备访问 sz.qizuang.com
        //就会跳转到 m.qizuang.com/mzb/sz
        //如果发送了cookie  mobile_on = off 移动设备不会跳转
        if (ismobile()) {  //是移动设备
            //获取url后面的参数
            $param = explode("?", $_SERVER['REQUEST_URI']);

            //if (false == $mobile['m_to_pc']) {  //没有m_to_pc = on 标识才跳转
            // 得到访问域名, 别名
            list($csbm)   = explode('.', $_SERVER['SERVER_NAME']);
            if(empty($_COOKIE["m_to_pc"])){
                header('HTTP/1.1 302 Moved Temporarily');

                if($csbm != "www"){

                    //header("Location: http://m.".C('QZ_YUMING')."/".$csbm."/");
                    //header("Location: http://www.qizuang.com/mobile/zb?cs=". $csbm); //新版招标单页
                    header("Location: http://". C('MOBILE_DONAMES') ."/". $csbm . "/"); //新移动版招标 带城市

                }else{
                    //header("Location: http://m.".C('QZ_YUMING')."/");
                    //header("Location: http://www.qizuang.com/mobile/zb"); //新版招标单页
                    if($_SERVER['PATH_INFO'] == 'zxbj'){
                        header("Location: http://". C('MOBILE_DONAMES') ."/baojia?" . $param[count($param)-1]); //新移动版招标
                    }else{
                        header("Location: http://". C('MOBILE_DONAMES') ."/"); //新移动版招标
                    }
                    
                }
                die();
            }
        }
    }
}