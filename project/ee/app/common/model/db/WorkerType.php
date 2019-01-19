<?php
// +----------------------------------------------------------------------
// | WorkerType 用户工种关联表
// +----------------------------------------------------------------------

namespace app\common\model\db;

use think\model\Pivot;

class WorkerType extends Pivot
{
    protected $table = 'qz_yxb_worker_type';
    protected $autoWriteTimestamp = false;
}