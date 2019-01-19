<?php
/**
 * 移动版招标页
 * 招标单页面
 */
namespace Mobile\Controller;
use Mobile\Common\Controller\MobileBaseController;
class ZbController extends MobileBaseController{
    public function index()
    {

        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);

        //如果有城市
        $cityInfo = $this->cityInfo;
        if ($cityInfo) {
            $this->assign('cid',$cityInfo['id']); //城市id
        }

        $this->display('mzb');//加载招标页面报价方案模版
    }
    public function sheji()
    {
        $jiage=D('Jiage')->getJiage();//查询价格区间数组
        $this->assign('jiage',$jiage);//分配赋值价格区间变量
        //安全验证码
        $safe = getSafeCode();
        $this->assign("safecode",$safe["safecode"]);
        $this->assign("safekey",$safe["safekey"]);
        $this->assign("ssid",$safe["ssid"]);
        $this->display();//加载招标页面设计方案模版
    }

    public function fb_order(){
        R("Common/Zbfb/fb_order");
        die();
    }
}