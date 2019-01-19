<?php
// +----------------------------------------------------------------------
// | OrderAccountLink 订单用户关联表
// +----------------------------------------------------------------------

namespace app\common\model\db;

use think\model\Pivot;

class OrderAccountLink extends Pivot
{
    protected $table = 'qz_yxb_order_account';
    protected $autoWriteTimestamp = false;

    public function orderAccountBelong(){
        return $this->hasOne('Account','id','account_id')->bind('id,contact_name');
    }

}