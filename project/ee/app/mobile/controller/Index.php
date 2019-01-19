<?php
namespace app\mobile\controller;
use app\common\controller\MobileCommonBase;
use app\common\model\logic\AccountLogic;
use think\Controller;

/**
 * 移动端首页
 * Class Index
 * @package app\mobile\controller
 */
class Index extends MobileCommonBase
{
    public function index(AccountLogic $accountLogic)
    {
        $userinfo = session('userInfo');
        $data['id'] = $userinfo['id'];
        $accountinfo = $accountLogic->getAccountInfoById($data);
        if(!empty($accountinfo['image'])){
            $accountinfo['image'] = 'http://'.$accountinfo['image'];
        }
        $this -> assign("accountinfo" , $accountinfo);
        return $this->fetch();
    }


}
