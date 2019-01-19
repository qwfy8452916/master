<?php
namespace app\common\model\logic;
use Util\App;
class LogLogic
{
    public $company_id;
    public function initialize()
    {
        parent::initialize();
    }

    /**
     * 添加日志
     * @param $action 操作 1 添加 2 编辑 3 删除
     * @param $detail 详细信息
     * @param $remark 备注
     * @param string $old_data 原始数据
     * @return bool
     */

    public function addLog($action=1,$detail='',$remark='',$old_data=''){
        $app = new App();
        $save['info'] = json_encode($detail);
        $save['info'] = json_encode($old_data);
        $save['action'] =$action;
        $save['action_url'] = $_SERVER["REQUEST_URI"];//"REDIRECT_URL"
        $save['company_id'] = session('userInfo.company_id');
        $save['username'] = session('userInfo.username');
        $save['userid'] = session('userInfo.id');
        $save['method'] = $_SERVER["REQUEST_METHOD"];
        $save['remark'] = $remark;
        $save['ip'] =$app->get_client_ip();
        $save['user_agent'] = $_SERVER["HTTP_USER_AGENT"];
        $save['time'] = time();
        return model('model/db/log')->save($save);
    }


}