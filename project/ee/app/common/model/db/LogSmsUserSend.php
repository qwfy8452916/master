<?php
/**
 * Created by PhpStorm.
 * User: jsb
 * Date: 2018/9/6
 * Time: 16:51
 */

namespace app\common\model\db;


use Think\Model;

class LogSmsUserSend extends Model
{
    public function addLog($data){
        self::create($data);
    }
}