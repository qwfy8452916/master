<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/7
 * Time: 10:41
 */

namespace app\common\model\db;

use app\common\enums\BuildStatus;
use app\common\enums\OrderSource;
use app\index\controller\Order;
use think\db\Where;
use think\Model;

class Build extends Model
{
    protected $table = 'qz_yxb_build';

    public function buildDesign()
    {
        return $this->hasMany('BuildDesign', 'build_id', 'id');
    }
    public function failDesign()
    {
        return $this->hasMany('FailDesign', 'build_id', 'id');
    }

    public function orders()
    {
        return $this->hasOne('Orders', 'order_no', 'order_no');
    }
    public function orderManage()
    {
        return $this->hasOne('OrdersManage', 'order_no', 'order_no')->bind('designer_id');
    }
    public function orderManageInfo()
    {
        return $this->hasOne('OrdersManage', 'order_no', 'order_no');
    }
    public function designerAccount()
    {
        return $this->belongsTo('Account', 'designer_id', 'id');
    }

    public function getAddTimeAttr($value)
    {
        return date('Y-m-d H:i:s', $value);
    }

    public function getStateAttr($value)
    {
        return BuildStatus::getStatusName($value);
    }
}