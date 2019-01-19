<?php
/**
 * Created by PhpStorm.
 * User: jsb
 * Date: 2018/9/6
 * Time: 11:50
 */

namespace app\common\model\db;


use think\Model;

class YxbLoginLog extends Model
{
    protected $table = 'qz_yxb_login_log';
    public static function loginRecord($data){
        self::create($data);
    }

    public function getUserLoginInfo($where)
    {
        $buildSql = $this->where($where)->order('id desc')->buildSql();
        return $this->table($buildSql)->alias('a')
            ->group('a.account')
            ->select();
    }
}