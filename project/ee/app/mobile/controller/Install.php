<?php
namespace app\mobile\controller;
use app\common\controller\MobileCommonBase;
use app\common\model\logic\AccountLogic;
use app\common\model\logic\FeedbackLogic;
use think\Controller;

/**
 * 移动端设置
 * Class Install
 * @package app\mobile\controller
 */
class Install extends MobileCommonBase
{
    //设置中心
    public function index(AccountLogic $accountLogic){
        $userinfo = session('userInfo');
        $data['id'] = $userinfo['id'];
        $accountinfo = $accountLogic->getAccountInfoById($data);
        if(!empty($accountinfo['image'])){
            $accountinfo['image'] = 'http://'.$accountinfo['image'];
        }
        $this -> assign("accountinfo" , $accountinfo);
        return $this->fetch();
    }
    //个人设置
    public function userset(AccountLogic $accountLogic){
        $userinfo = session('userInfo');
        $data['id'] = $userinfo['id'];
        $accountinfo = $accountLogic->getAccountInfoById($data);
        if(!empty($accountinfo['image'])){
            $accountinfo['image'] = 'http://'.$accountinfo['image'];
        }
        $this -> assign("accountinfo" , $accountinfo);
        return $this->fetch();
    }

    //反馈
    public function suggestion(){
        return $this->fetch();
    }

    //密码更改
    public function cpd(AccountLogic $accountLogic){
        session('forgetPswInfo',null);
        $userinfo = session('userInfo');
        $data['id'] = $userinfo['id'];
        $accountinfo = $accountLogic->getAccountInfoById($data);
        $this -> assign("accountinfo" , $accountinfo);
        return $this->fetch();
    }

    //新密码
    public function newpsw(){
        if(!session('forgetPswInfo')){
            $this->redirect('/userset/cpd');
        }
        return $this->fetch();
    }

    //头像
    public function avatar(AccountLogic $accountLogic){
        $userinfo = session('userInfo');
        $data['id'] = $userinfo['id'];
        $accountinfo = $accountLogic->getAccountInfoById($data);
        if(!empty($accountinfo['image'])){
            $accountinfo['image'] = 'http://'.$accountinfo['image'];
        }
        $this -> assign("accountinfo" , $accountinfo);
        return $this->fetch();
    }

    // 单条信息设置-姓名
    public function singleinfo(AccountLogic $accountLogic){
        $data['id'] = session('userInfo.id');
        $accountinfo = $accountLogic->getUserinfo($data);
        $this -> assign('userinfo',$accountinfo);
        return $this->fetch();
    }

    // 单条信息设置-手机号
    public function singleinfomobile(AccountLogic $accountLogic){
        $data['id'] = session('userInfo.id');
        $accountinfo = $accountLogic->getUserinfo($data);
        $this -> assign('userinfo',$accountinfo);
        return $this->fetch();
    }

    // 单条信息设置-微信号
    public function singleinfowechat(AccountLogic $accountLogic){
        $data['id'] = session('userInfo.id');
        $accountinfo = $accountLogic->getUserinfo($data);
        $this -> assign('userinfo',$accountinfo);
        return $this->fetch();
    }

    /**
     * 移动端修改个人信息
     * POST 接收数组 | $data['contactname']：姓名 / $data['contacttel']:电话 / $data['contactwx']:微信号
     * $data['type']  : 1表示修改姓名，2表示修改电话， 3表示修改微信号
     *
     */
    public  function changeAccountInfo(AccountLogic $accountLogic){
        $data = input('post.');
        $changeRequest = $accountLogic->changeAccountInfo($data);
        return json($changeRequest);
    }

    /**
     * 更改用户头像
     * 接收post提交的数据， 头像的图片地址
     */
    public function saveHeadImage(AccountLogic $accountLogic){
        $input = input('post.');
        $imgurl = $input['headimage'];
        $resetResult = $accountLogic->saveHeadImage($imgurl);
        return json($resetResult);
    }

    /**
     * 提交意见反馈
     *
     */
    public function addFeedback(FeedbackLogic $feedbackLogic){
        $input = input('post.');
        $feedbackContent['feedback_content'] = $input['feedbackcontent'];
        $feedbackContent['feedback_channel_id'] = 2;
        $resetResult = $feedbackLogic->addFeedback($feedbackContent);
        return json($resetResult);
    }

}
