<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/7
 * Time: 10:41
 */

namespace app\common\model\db;

use app\common\enums\BuildStatus;
use app\common\enums\OrderStatus;
use think\Model;

class OrdersManage extends Model
{
    protected $table = 'qz_yxb_orders_manage';

    public function receptionAccount()
    {
        return $this->belongsTo('Account', 'reception_id', 'id');
    }

    public function designerAccount()
    {
        return $this->belongsTo('Account', 'designer_id', 'id');
    }
    public function projectAccount()
    {
        return $this->belongsTo('Account', 'project_manager', 'id');
    }
    public function buildGroup(){
        return $this->hasOne('Workergroup', 'id','build_group');
    }
    public function managerWorkerGroup(){
        return $this->hasMany('Workergroup', 'manager_id','project_manager');
    }

    public function getStateAttr($value)
    {
        return OrderStatus::getStatusName($value);
    }

    public function getBuildStateAttr($value)
    {
        return BuildStatus::getStatusName($value);
    }

    public function getReceptionOrder($ids){
        $where[] = ['reception_id','in',$ids];
        $where[] = ['state','not in',[11,12]];
        return $this->field('reception_id,order_no')->where($where)->select();
    }

    public function getDesignOrder($ids){
        $where[] = ['designer_id','in',$ids];
        $where[] = ['state','not in',[11,12]];
        return $this->field('designer_id,order_no')->where($where)->select();
    }
}