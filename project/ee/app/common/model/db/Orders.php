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
use app\common\enums\OrderStatus;
use app\index\controller\Order;
use think\Db;
use think\db\Where;
use think\Model;

class Orders extends Model
{
    protected $table = 'qz_yxb_orders';

    public function manage()
    {
        return $this->hasOne('OrdersManage', 'order_no', 'order_no')->bind('reception_id,designer_id');
    }

    public function houseDesign()
    {
        return $this->hasMany('HouseDesign', 'order_no', 'order_no');
    }

    public function receptionAccount()
    {
        return $this->belongsTo('Account', 'reception_id', 'id');
    }

    public function receptionShigongAccount()
    {
        return $this->belongsTo('Account', 'manage__reception_id', 'id');
    }


    public function designerAccount()
    {
        return $this->belongsTo('Account', 'designer_id', 'id');
    }

    public function designerShigongAccount()
    {
        return $this->belongsTo('Account', 'manage__designer_id', 'id');
    }

    public function projectManagerAccount()
    {
        return $this->belongsTo('Account', 'project_manager', 'id');
    }
    public function managerWorkerGroup(){
        return $this->hasMany('Workergroup', 'manager_id','project_manager');
    }
    public function workerGroup()
    {
        return $this->belongsTo('Workergroup', 'build_group', 'id');
    }

    public function receptionRecord()
    {
        return $this->hasMany('Reception', 'order_no', 'order_no');
    }

    public function followRecord(){
        return $this->hasMany('FollowOrder', 'order_no', 'order_no');
    }

    public function signRecord(){
        return $this->hasMany('SignOrder', 'order_no', 'order_no');
    }
    public function endRecord(){
        return $this->hasMany('EndRecord', 'order_no', 'order_no');
    }
    public function finishRecord(){
        return $this->hasMany('FinishRecord', 'order_no', 'order_no');
    }
    public function orderAccount(){
        return $this->belongsToMany('Account','\\app\\common\\model\\db\\','account_id', 'order_no');
    }

    public function orderAccountLink(){
        return $this->hasMany('OrderAccountLink','order_id','order_no')->with('orderAccountBelong');
    }


    public function huXing(){
        return $this->belongsTo('HuXing', 'house_type', 'id')->bind(['name']);
    }

    public function getAddTimeAttr($value)
    {
        return date('Y-m-d H:i:s', $value);
    }

    public function getSourceAttr($value)
    {
        return OrderSource::getSourceName($value);
    }

    public function getHouseAreaAttr($value)
    {
        if (empty($value)) {
            return '';
        } else {
            return $value;
        }
    }

    /**
     * 获取订单的施工人员
     * @param $map
     * @return array|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getOrderAccountList($map){
        $where = [];
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['o.company_id', '=', $map['company_id']];
        }
        if (isset($map['order_id']) && $map['order_id']) {
            $where[] = ['o.order_no', '=', $map['order_id']];
        }
        return $this->alias('o')
            ->field('o.order_no,a.id account_id,a.contact_name,oa.work_type,om.worker_type order_worker_type')
            ->where($where)
            ->join('qz_yxb_order_account oa','oa.order_id = o.order_no')
            ->join('qz_yxb_account a','oa.account_id = a.id')
            ->leftJoin('qz_yxb_orders_manage om','o.order_no = om.order_no')
            ->select();
    }

    public function getOrderInfo($order_id = '',$company_id = ''){
        if(empty($order_id) || empty($company_id)){
            return [];
        }
        $where = [
            'order_no' => ['eq', $order_id],
            'company_id' => ['eq', $company_id],
        ];
        return $this->where(new Where($where))->find();
    }

    /**
     * 获取最新订单数
     * @param $where
     * @param $limit
     * @return array|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getIndexOrderBuildList($where,$limit){
        if (empty($where['company_id']) || !is_numeric($where['company_id'])) {
            return [];
        }
        //获取商家最新的施工状态
        $buildSql = Build::field('order_no,add_time')
            ->where(['company_id' => $where['company_id']])
            ->order('add_time desc')
            ->buildSql();
        $buildSql = Db::table($buildSql)->alias('b')->group('b.order_no')->buildSql();
        //获取商家最新的跟单状态
        $historySql = OrdersHistory::field('h.order_no,h.add_time')->alias('h')
            ->join('qz_yxb_orders o','h.order_no = o.order_no')
            ->where(['o.company_id' => $where['company_id']])
            ->order('h.add_time desc')
            ->buildSql();
        $historySql = Db::table($historySql)->alias('h')->group('h.order_no')->buildSql();
        //合并数据
        $buildSql = Db::table($buildSql)->alias('d')->union($historySql)->buildSql();
        //筛选出最新的五条数据(去重,取数据)
        $buildSql = Db::table($buildSql)->alias('t')->group('t.order_no')->buildSql();
        $buildSql = Db::table($buildSql)->alias('t')->order('t.add_time desc')->buildSql();
        return Db::table($buildSql)->alias('t1')->limit($limit)->select();
    }

    /**
     * 获取订单部分数据
     * @param string $orders
     * @return array|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getOrdersInfo($orders = '')
    {
        $map = [];
        if (count($orders) > 0) {
            $map[] = ['o.order_no', 'in', $orders];
        }
        return $this->alias('o')->field('o.order_no,o.company_id,o.build_address,o.consumer_name,a.contact_name reception_name,a1.contact_name designer_name')
            ->where($map)
            ->leftJoin('qz_yxb_orders_manage om','om.order_no = o.order_no')
            ->leftJoin('qz_yxb_account a','a.id = om.reception_id')
            ->leftJoin('qz_yxb_account a1','a1.id = om.designer_id')
            ->select();
    }

    public function getOrdersProjectInfo($orders = ''){
        $map[] = [
            'om.worker_type','=',OrderStatus::WORKER_TYPE_P
        ];
        if (count($orders) > 0) {
            $map[] = ['o.order_no', 'in', $orders];
        }
        return $this->alias('o')->field('o.order_no,a.contact_name project_name,a.id account_id')
            ->where($map)
            ->join('qz_yxb_orders_manage om','om.order_no = o.order_no')
            ->join('qz_yxb_order_account oa','oa.order_id = o.order_no')
            ->join('qz_yxb_account a','a.id = oa.account_id')
            ->select();
    }

    public function getOrdersStatusInfo($orders = ''){
        $map = [];
        if (count($orders) > 0) {
            $map[] = ['o.order_no', 'in', $orders];
        }
        $buildSql = $this->alias('o')->field('o.order_no,h.`status`')
            ->where($map)
            ->join('qz_yxb_orders_history h','h.order_no = o.order_no')
            ->order('h.add_time desc')
            ->buildSql();
        return $this->table($buildSql)->alias('t')->group('t.order_no')->select();
    }
    public function getOrdersBuildStatusInfo($orders = ''){
        $map = [];
        if (count($orders) > 0) {
            $map[] = ['o.order_no', 'in', $orders];
        }
        $buildSql = $this->alias('o')->field('o.order_no,b.`state`')
            ->where($map)
            ->join('qz_yxb_build b','b.order_no = o.order_no')
            ->order('b.add_time desc')
            ->buildSql();
        return $this->table($buildSql)->alias('t')->group('t.order_no')->select();
    }
}