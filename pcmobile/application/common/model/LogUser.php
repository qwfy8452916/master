<?php
// +----------------------------------------------------------------------
// | LogUser 用户登录日志表
// +----------------------------------------------------------------------
// | Author: 2851986856@qq.com
// +----------------------------------------------------------------------

namespace app\common\model;


use think\Model;

class LogUser extends Model
{
    protected $autoWriteTimestamp = false;

    /**
     * 添加日志
     * @param [array]$data [日志信息]
     */
    public function addLog($data){
        $result = $this->isUpdate(false)->allowField(true)->save($data);
        if ($result !== false) {
            return true;
        } else {
            return false;
        }
    }
}