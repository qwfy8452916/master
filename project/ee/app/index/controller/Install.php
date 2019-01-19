<?php
namespace app\index\controller;

use app\common\controller\CommonBase;
use app\common\model\logic\FeedbackLogic;
use app\common\model\logic\LoginLogic;
use app\common\model\logic\AccountLogic;
use think\Controller;

/**
 * PC端设置
 * Class Install
 * @package app\index\controller
 */
class Install extends CommonBase
{
    //供应商分类
    public function supplier()
    {
        return $this->fetch();
    }

    //工种设置
    public function worktype()
    {
        return $this->fetch();
    }

    //部门管理
    public function department()
    {
        return $this->fetch();
    }

    //岗位管理
    public function post()
    {

        return $this->fetch();
    }

    //岗位添加/编辑
    public function addpost(){

        return $this->fetch();
    }

    //个人设置
    public function userset(){
        return $this->fetch();
    }

    //反馈
    public function suggestion(){
        return $this->fetch();
    }

    //意见反馈
    public function feedback()
    {
        return $this->fetch();
    }

      //个人设置
    public function setup(AccountLogic $accountLogic)
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

    /**
     * 个人设置修改密码
     * 接收表单提交
     * @return json字符串。
     */
    public function changePassword(LoginLogic $loginLogic)
    {
        //修改密码
        $input = input('post.');
        $resetResult = $loginLogic->resetPassword($input);
        return json($resetResult);
    }

    /**
     * 修改个人信息
     * 接收表单提交的数据
     *
     */
    public function changeUserInfo(AccountLogic $accountLogic){

        $input = input('post.');
        $resetResult = $accountLogic->changeUserInfo($input);
        return json($resetResult);
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
        $feedbackContent['feedback_channel_id'] = 1;
        $resetResult = $feedbackLogic->addFeedback($feedbackContent);
        return json($resetResult);
    }

}
