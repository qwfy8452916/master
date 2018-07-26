<?php
// +----------------------------------------------------------------------
// | JjdgOpreateLog 日志模型
// +----------------------------------------------------------------------
// | Author: 2851986856@qq.com
// +----------------------------------------------------------------------

namespace app\common\model;

use think\Model;

class JjdgOpreateLog extends Model
{
    //old_value写入器
    public function setOldDataAttr($value)
    {
        return is_array($value)&&!empty($value) ?json_encode($value) : '';
    }

    //new_value写入器
    public function setNewDataAttr($value)
    {
        return is_array($value)&&!empty($value) ?json_encode($value) : '';
    }

    //old_value获取器
    public function getOldDataAttr($value)
    {
        return !empty($value)?json_decode($value,true) : '';
    }

    //new_value获取器
    public function getNewDataAttr($value)
    {
        return !empty($value)?json_decode($value,true) : '';
    }

}