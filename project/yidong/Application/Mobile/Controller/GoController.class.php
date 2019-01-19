<?php
/**
 * 移动版 - 推广跳转页
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;

class GoController extends MobileBaseController{

    public function index(){
        //获取Src
        $src = I('get.src');
        if (empty($src)) {
            redirect('http://'.C('QZ_YUMINGWWW').'/');
        }

        //获取Src对应URL
        $srcInfo = D('Common/TrackingOrderSource')->getPromoteSrc($src);
        if (empty($srcInfo)) {
            redirect('http://'.C('QZ_YUMINGWWW').'/');
        }

        //跳转URL
        redirect($srcInfo['redirect']);
        die;
    }
}