<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/7
 * Time: 10:41
 */
namespace app\common\model\db;

use think\Model;

class HouseDesign extends Model
{
    protected $table = 'qz_yxb_house_design';
    public function orderManage()
    {
        return $this->hasOne('OrdersManage', 'order_no', 'order_no')->bind('designer_id');
    }
}