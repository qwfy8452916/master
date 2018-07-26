<?php
// +----------------------------------------------------------------------
// | IndexBase  前台目录根操作
// +----------------------------------------------------------------------
namespace app\common\controller;

use think\Controller;
use think\Session;

class JiajuBase extends Controller
{
    protected $user = null;

    public function _initialize()
    {
        parent::_initialize(); // TODO: Change the autogenerated stub
        $this->assign('controller', $this->request->controller());
        if( !session('?refer_url') || parse_url(session('refer_url'))['scheme'].'://'.parse_url(session('refer_url'))['host'] != $this->request->domain()) {
            session('refer_url',url('jiaju/login/index',[],''));
        }

        $this->user = Session::get('u_userInfo');
        if (!$this->request->isAjax()) {
            $this->assign('user', $this->user);
        }

    }

    /**
     * 空操作/或者错误操作
     * @return mixed
     */
    public function _empty()
    {
        if($this->request->isAjax()){
            @header("HTTP/1.1 404 Not Found");
            @header("status: 404 Not Found");
            exit(json_encode(['status'=>0,'info'=>'服务器去火星了~']));
        }else{
            return view('public/error',[],[],404);
        }
    }
}