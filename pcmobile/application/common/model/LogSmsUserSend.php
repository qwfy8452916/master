<?php
// +----------------------------------------------------------------------
// | LogSmsUserSend
// +----------------------------------------------------------------------
// | Author: 2851986856@qq.com
// +----------------------------------------------------------------------
namespace app\common\model;

use think\Model;

class LogSmsUserSend extends Model
{
    protected $autoWriteTimestamp = false;

    //写入日志
    public function addLog($data)
    {
        $this->allowField(true)->isUpdate(false)->save($data);
    }
}