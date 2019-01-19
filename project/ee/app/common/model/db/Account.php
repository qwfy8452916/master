<?php

namespace app\common\model\db;

use app\common\enums\OrderStatus;
use think\Db;
use think\db\Where;
use think\Model;
use app\common\enums\BuildStatus;

class Account extends Model
{
    protected $table = 'qz_yxb_account';

    public function worker(){
        return $this->belongsToMany('Worktype', '\\app\\common\\model\\db\\WorkerType', 'worktype_id', 'account_id');
    }

    public function getEmployeeListCount($map)
    {
        $where[] = ['a.class_type', '=', 2];//只查询员工数据
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['a.company_id', '=', $map['company_id']];
        }
        if (isset($map['contact_name']) && $map['contact_name']) {
            $where[] = ['a.contact_name', 'like', '%' . $map['contact_name'] . '%'];
        }
        if (isset($map['status']) && $map['status']) {
            $where[] = ['a.status', '=', $map['status']];
        }
        if (isset($map['dept']) && $map['dept']) {
            $where[] = ['i.dept_id', '=', $map['dept']];
        }
        if (isset($map['station']) && $map['station']) {
            $where[] = ['i.station_id', '=', $map['station']];
        }
        if (isset($map['is_del']) && $map['is_del']) {
            $where[] = ['a.is_del', '=', $map['is_del']];
        }
        return $this->where($where)->alias('a')
            ->field('a.*,d.dept_name,s.name,i.account_id,i.dept_id,i.station_id')
            ->join('qz_yxb_account_info i', 'a.id = i.account_id')
            ->join('qz_yxb_department d', 'i.dept_id = d.id')
            ->join('qz_yxb_station s', 'i.station_id = s.id')
            ->order('a.id desc')
            ->count();
    }

    public function getEmployeeList($map, $page, $pageCount)
    {
        $where[] = ['a.class_type', '=', 2];//只查询员工数据
        if ($map['company_id']) {
            $where[] = ['a.company_id', '=', $map['company_id']];
        }
        if (isset($map['contact_name']) && $map['contact_name']) {
            $where[] = ['a.contact_name', 'like', '%' . $map['contact_name'] . '%'];
        }
        if (isset($map['status']) && $map['status']) {
            $where[] = ['a.status', '=', $map['status']];
        }
        if (isset($map['dept']) && $map['dept']) {
            $where[] = ['i.dept_id', '=', $map['dept']];
        }
        if (isset($map['station']) && $map['station']) {
            $where[] = ['i.station_id', '=', $map['station']];
        }
        if (!empty($map['mobile_search']) && isset($map['mobile_search'])) {
            $where[] = ['a.contact_name|a.contact_tel', 'like', "%" . $map['mobile_search'] . "%"];
        }
        if (isset($map['is_del']) && $map['is_del']) {
            $where[] = ['a.is_del', '=', $map['is_del']];
        }
        //排序
        $order = 'a.create_time';
        if(isset($map['order_by']) && isset($map['order']) && $map['order_by'] && $map['order']){
            switch ($map['order_by']){
                case 'order_name':
                    $order = 'CONVERT(a.`contact_name` USING gbk) COLLATE gbk_chinese_ci '.$map['order'];
                    break;
                case 'order_dept':
                    $order = 'CONVERT(d.`dept_name` USING gbk) COLLATE gbk_chinese_ci '.$map['order'];
                    break;
                case 'order_station':
                    $order = 'CONVERT(s.name USING gbk) COLLATE gbk_chinese_ci '.$map['order'];
                    break;
                case 'order_time':
                    $order = 'a.create_time '.$map['order'];
                    break;
            }
        }
        $buildSql = $this->where($where)->alias('a')
            ->field('a.id,a.company_id,a.account,a.image,a.status,a.contact_name,a.contact_tel,a.contact_wx,a.class_type,a.op_uid,a.create_time,d.dept_name,s.name,i.account_id,i.dept_id,i.station_id')
            ->join('qz_yxb_account_info i', 'a.id = i.account_id')
            ->join('qz_yxb_department d', 'i.dept_id = d.id')
            ->join('qz_yxb_station s', 'i.station_id = s.id')
            ->orderRaw($order)
            ->limit($page, $pageCount)
            ->buildSql();
        return $this->table($buildSql)->alias('t')
            ->field('t.*,a.contact_name as op_name')
            ->leftJoin('qz_yxb_account a', 'a.id = t.op_uid')
            ->select()->toArray();
    }

    public function getEmployeeInfoById($id)
    {
        $where = [
            'a.id' => $id,
            'a.company_id' => session('userInfo.company_id'),
        ];
        $returnval =  $this->alias('a')
            ->field('ac.end_time,a.id,a.account,a.image,c.user companyname,c.jc companyjc,a.company_id,a.class_type,a.contact_name,a.pass,a.contact_tel,a.contact_wx,a.status,d.dept_name,s.name,i.account_id,i.dept_id,i.station_id')
            ->leftJoin('qz_user c','a.company_id = c.id')
            ->leftJoin('qz_yxb_account_time ac','a.company_id = ac.company_id and type = 2')
            ->leftJoin('qz_yxb_account_info i', 'a.id = i.account_id')
            ->leftJoin('qz_yxb_department d', 'i.dept_id = d.id')
            ->leftJoin('qz_yxb_station s', 'i.station_id = s.id')
            ->order('ac.add_time desc')
            ->where($where)
            ->find();
        return $returnval;

    }
    /**
     * 获取需要的员工列表
     * @param $map
     */
    public function getEmployeeSelectList($map, $field = '*', $with = '')
    {
        $where = [];
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['a.company_id', '=', $map['company_id']];
        }
        if (isset($map['class_type']) && $map['class_type']) {
            $where[] = ['a.class_type', '=', $map['class_type']];
        }
        if (isset($map['default_rule']) && $map['default_rule']) {
            $where[] = ['s.default_rule', '=', $map['default_rule']];
        }
        if (isset($map['manager_id']) && $map['manager_id']) {
            $where[] = ['a.id', '=', $map['manager_id']];
        }

        if (isset($map['status']) && $map['status']) {
            $where[] = ['a.status', '=', $map['status']];
        }
        if (isset($map['is_del']) && $map['is_del']) {
            $where[] = ['a.is_del', '=', $map['is_del']];
        }
        if (!empty($map['tel']) && isset($map['tel'])) {
            $where[] = ['a.contact_tel', 'like', "%" . $map['tel'] . "%"];
        }
        return $this->alias('a')
            ->field($field)
            ->join('qz_yxb_account_info i', 'a.id = i.account_id')
            ->join('qz_yxb_station s', 'i.station_id = s.id')
            ->where($where)
            ->with($with)
            ->group('a.id')
            ->select();
    }

    public function getAccountWorkerInfoList($map,$field = '*',$with = []){
        $where = [];
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['a.company_id', '=', $map['company_id']];
        }
        if (isset($map['default_rule']) && $map['default_rule']) {
            $where[] = ['s.default_rule', '=', $map['default_rule']];
        }
        if (isset($map['status']) && $map['status']) {
            $where[] = ['a.status', '=', $map['status']];
        }
        if (isset($map['is_del']) && $map['is_del']) {
            $where[] = ['a.is_del', '=', $map['is_del']];
        }
        return $this->alias('a')
            ->field($field)
            ->join('qz_yxb_account_info i', 'a.id = i.account_id')
            ->join('qz_yxb_station s', 'i.station_id = s.id')
            ->where($where)
            ->with($with)
            ->group('a.id')
            ->select();
    }
    /**
     * 获取员工附属信息
     */
    public function getEmployeeAccountInfo($where)
    {
        return Db::name('yxb_account_info')->where($where)->find();
    }

    /**
     * 新增 员工附属智信息
     * @param $data
     * @return int|string
     */
    public function addEmployeeAccountInfo($data)
    {
        return Db::name('yxb_account_info')->insertGetId($data);
    }

    /**
     * 编辑 员工附属智信息
     * @param $where
     * @param $data
     * @return mixed
     */
    public function saveEmployeeAccountInfo($where, $data)
    {
        return Db::name('yxb_account_info')->where($where)->update($data);
    }

    /**
     * 获取工人附属信息
     */
    public function getWorkerAccountInfo($where)
    {
        return Db::name('yxb_account_info')->where($where)->find();
    }

    /**
     * 新增 工人附属智信息
     * @param $data
     * @return int|string
     */
    public function addWorkerAccountInfo($data)
    {
        return Db::name('yxb_account_info')->insertGetId($data);
    }

    /**
     * 编辑 工人附属智信息
     * @param $where
     * @param $data
     * @return mixed
     */
    public function saveWorkerAccountInfo($where, $data)
    {
        return Db::name('yxb_account_info')->where($where)->update($data);
    }

    /**
     * 获取工人附属信息
     */
    public function getWorkerTypeInfo($where)
    {
        return Db::name('yxb_worker_type_link')->where($where)->select();
    }

    /**
     * 新增 工人工种信息
     * @param $data
     * @return int|string
     */
    public function addWorkerTypeInfo($data)
    {
        return Db::name('yxb_worker_type_link')->insertGetId($data);
    }

    /**
     * 删除工种信息
     * @param $where
     * @param $data
     * @return mixed
     */
    public function delWorkerTypeInfo($where)
    {
        return Db::name('yxb_worker_type_link')->where($where)->delete();
    }

    /**
     * 编辑  保存用户信息
     */
    public function changeUserInfo($data){
        $where['id'] = session('userInfo.id');
        if($where['id']){
            $returnval =  Db::name('yxb_account')->where($where)->update($data);
        }else{
            return ['status'=> 0,'info' => '操作失败'];
        }
        if($returnval === false){
            return ['status'=> 0,'info' => '操作失败'];
        }else{
            return ['status'=> 1,'info' => '操作成功'];
        }
    }

    /**
     * 保存用户头像地址
     * @param   $imgurl 头像地址
     */
    public function saveHeadImage($imgurl){
        $where = [];
        $where['id'] = session('userInfo.id');
        $data['image'] = $imgurl;
        $dbrequest = Db::name('yxb_account')->where($where)->update($data);
        if($dbrequest ===  false){
            return ['status'=> 0,'info' => '头像修改失败'];
        }else{
            session('userInfo.accountimg',$imgurl);
            return ['status'=> 1,'info' => '操作成功'];
        }
    }

    /**
     * 根据$where条件获取account表数据【字段：id,contact_name,contact_tel,contact_wx】
     *
     */
    public function getDbUserInfo($where){
        return Db::name('yxb_account')->where($where)->field('id,contact_name,contact_tel,contact_wx')->find();
    }

    /**
     * 移动端修改个人信息
     *@param 数组| $data  查询条件
     */
    public function changeAccountInfo($data){
        $where = [];
        $where['id'] = session('userInfo.id');
        if($where['id']){
            $dbrequest = Db::name('yxb_account')->where($where)->update($data);
        }else{
            return ['error_code'=> 401001,'error_msg' => 'session未设置'];
        }
        if($dbrequest === false){
            return ['error_code'=> 500002,'error_msg' => '数据库异常'];
        }else{
            return ['error_code'=> 0,'error_msg' => '请求成功'];
        }
    }

    public function getWorkerListCount($map)
    {
        $where[] = ['a.class_type', '=', 3];//只查询工人数据
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['a.company_id', '=', $map['company_id']];
        }
        if (isset($map['contact_name']) && $map['contact_name']) {
            $where[] = ['a.contact_name', 'like', '%' . $map['contact_name'] . '%'];
        }
        if (isset($map['status']) && $map['status']) {
            $where[] = ['a.status', '=', $map['status']];
        }
        if (isset($map['is_del']) && $map['is_del']) {
            $where[] = ['a.is_del', '=', $map['is_del']];
        }
        $have = "1=1";
        if (isset($map['work_type']) && $map['work_type']) {
            $have.= " and find_in_set(".$map['work_type'].",did)";
        }
        if (isset($map['work_status']) && $map['work_status']) {
            if($map['work_status'] == 1){
                $have.= " and build_count = 0";
            }else{
                $have.= " and build_count>0";
            }
        }
        if (!empty($map['mobile_search']) && isset($map['mobile_search'])) {
            $have.= ' and (t1.contact_name like "%' .$map['mobile_search'] . '%" or t1.contact_tel like "%' .$map['mobile_search']. '%" or t1.worktype_name like "%' .$map['mobile_search'] . '%")';
        }
        $buildSql = $this->where($where)->alias('a')
            ->field('a.id,a.company_id,a.account,a.image,a.status,a.contact_name,a.contact_tel,a.contact_wx,a.class_type,a.op_uid,a.create_time,a.is_del,GROUP_CONCAT(s.name) as worktype_name,GROUP_CONCAT(d.worktype_id) AS did')
            ->join('qz_yxb_account_info i', 'a.id = i.account_id')
            ->join('qz_yxb_worker_type_link d', 'a.id = d.account_id','left')
            ->join('qz_yxb_worktype s', 'd.worktype_id = s.id','inner')
            ->group('a.id')
            ->buildSql();
        $buildSql = $this->table($buildSql)->alias('t')
            ->field('t.*,a.contact_name AS op_name,c.build_address,c.order_no,d.build_state')
            ->leftJoin('qz_yxb_account a', 'a.id = t.op_uid')
            ->leftJoin('qz_yxb_order_account b', 'b.account_id = t.id')
            ->leftJoin('qz_yxb_orders c', 'c.order_no = b.order_id')
            ->leftJoin('qz_yxb_orders_manage d', 'd.order_no = c.order_no')
            ->group('t.id,b.order_id')
            ->orderRaw('t.create_time,d.reception_time')
            ->buildSql();
        return $this->table($buildSql)->alias('t1')
            ->field('t1.*,count(if(t1.build_state = 16 or t1.build_state is NULL or t1.build_state = 0 or t1.build_state = 1,null,1)) as build_count,count(if(t1.build_state is NULL,null,1)) as count')
            ->group('t1.id')
            ->having($have)
            ->count();
    }

    public function getWorkerList($map, $page, $pageCount)
    {
        $where[] = ['a.class_type', '=', 3];//只查询工人数据
        if ($map['company_id']) {
            $where[] = ['a.company_id', '=', $map['company_id']];
        }
        if (isset($map['contact_name']) && $map['contact_name']) {
            $where[] = ['a.contact_name', 'like', '%' . $map['contact_name'] . '%'];
        }
        if (isset($map['status']) && $map['status']) {
            $where[] = ['a.status', '=', $map['status']];
        }
        if (isset($map['is_del']) && $map['is_del']) {
            $where[] = ['a.is_del', '=', $map['is_del']];
        }
        //排序
        $order = 't1.create_time';
        if(isset($map['order_by']) && isset($map['order']) && $map['order_by'] && $map['order']){
            switch ($map['order_by']){
                case 'order_name':
                    $order = 'CONVERT(t1.`contact_name` USING gbk) COLLATE gbk_chinese_ci '.$map['order'];
                    break;
                case 'order_time':
                    $order = 't1.create_time '.$map['order'];
                    break;
            }
        }


        $have = "1=1";
        if (isset($map['work_type']) && $map['work_type']) {
            $have.= " and find_in_set(".$map['work_type'].",did)";
        }
        if (isset($map['work_status']) && $map['work_status']) {
            if($map['work_status'] == 1){
                $have.= " and build_count = 0";
            }else{
                $have.= " and build_count>0";
            }

        }
        if (!empty($map['mobile_search']) && isset($map['mobile_search'])) {
            $have.= ' and (t1.contact_name like "%' .$map['mobile_search'] . '%" or t1.contact_tel like "%' .$map['mobile_search']. '%" or t1.worktype_name like "%' .$map['mobile_search'] . '%")';
        }
        $buildSql = $this->where($where)->alias('a')
            ->field('a.id,a.company_id,a.account,a.image,a.status,a.contact_name,a.contact_tel,a.contact_wx,a.class_type,a.op_uid,a.create_time,a.is_del,GROUP_CONCAT(s.name) as worktype_name,GROUP_CONCAT(d.worktype_id) AS did')
            ->join('qz_yxb_account_info i', 'a.id = i.account_id')
            ->join('qz_yxb_worker_type_link d', 'a.id = d.account_id','left')
            ->join('qz_yxb_worktype s', 'd.worktype_id = s.id','inner')
            ->group('a.id')
            ->buildSql();
        $buildSql = $this->table($buildSql)->alias('t')
            ->field('t.*,a.contact_name AS op_name,c.build_address,c.order_no,d.build_state')
            ->leftJoin('qz_yxb_account a', 'a.id = t.op_uid')
            ->leftJoin('qz_yxb_order_account b', 'b.account_id = t.id')
            ->leftJoin('qz_yxb_orders c', 'c.order_no = b.order_id')
            ->leftJoin('qz_yxb_orders_manage d', 'd.order_no = c.order_no')
            ->group('t.id,b.order_id')
            ->orderRaw('t.create_time,d.reception_time')
            ->buildSql();
        return $this->table($buildSql)->alias('t1')
            ->field('t1.*,count(if(t1.build_state = 16 or t1.build_state is NULL or t1.build_state = 0 or t1.build_state = 1,null,1)) as build_count,count(if(t1.build_state is NULL,null,1)) as count')
            ->group('t1.id')
            ->having($have)
            ->orderRaw($order)
            ->limit($page, $pageCount)
            ->select()->toArray();
    }

    public function getWorkerInfoById($id)
    {
        $where = [
            'a.id' => $id,
            'a.company_id' => session('userInfo.company_id'),
            'a.is_del' => 1,
        ];
        $returnval =  $this->alias('a')
            ->field('a.id,a.account,a.image,c.user companyname,c.jc companyjc,a.company_id,a.class_type,a.contact_name,a.pass,a.contact_tel,a.contact_wx,a.status')
            ->leftJoin('qz_user c','a.company_id = c.id')
            ->leftJoin('qz_yxb_account_info i', 'a.id = i.account_id')
            ->join('qz_yxb_worker_type_link d', 'a.id = d.account_id','left')
            ->join('qz_yxb_worktype s', 'd.worktype_id = s.id','inner')
            ->where($where)
            ->find()->toArray();
        $where = [
            'a.id' => $id,
            'a.is_del' => 1,
        ];
        $returnworktype = $this->alias('a')
            ->join('qz_yxb_worker_type_link d', 'a.id = d.account_id','left')
            ->join('qz_yxb_worktype s', 'd.worktype_id = s.id','inner')
            ->where($where)
            ->column('s.id');

        $returnval['worktype'] = $returnworktype;
        return $returnval;

    }

    /**
     * 获取装修公司的施工人员
     * @param $map
     * @return array|\PDOStatement|string|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getWorkAccountList($map){
        $where[] = ['a.class_type','=',3];
        if (isset($map['company_id']) && $map['company_id']) {
            $where[] = ['a.company_id', '=', $map['company_id']];
        }

        return $this->alias('a')
            ->field('a.id,wt.worktype_id,w.`name`,w.default_rule,a.contact_name')
            ->where($where)
            ->join('qz_yxb_worker_type_link wt','wt.account_id = a.id')
            ->join('qz_yxb_worktype w','w.id = wt.worktype_id')
            ->select();
    }

    /**
     * 获取人员关联的订单
     */
    public function getAccountOrders($user = [], $default_work = 0,$all_list)
    {
        if (empty($user)) {
            return [];
        }
        $where[] = ['oa.work_type', '=', $default_work];
        $where[] = ['oa.account_id', 'in', $user];
        $where[] = ['ym.state', '=', OrderStatus::BUILDING];
        $dd = Db::table('qz_yxb_order_account')->alias('oa')
            ->leftJoin('qz_yxb_orders_manage ym','ym.order_no = oa.order_id')
            ->where($where)
            ->select();
        if (count($dd) > 0) {
            foreach ($dd as $k => $v) {
                $all_list[$v['account_id']][] = $v['order_id'];
            }
        }
        return $all_list;
    }

    /**
     * 获取订单的人员
     */
    public function getOrderAccount($order_id = '')
    {
        if (empty($order_id)) {
            return [];
        }
        $where = [
            'oa.order_id' => ['eq', $order_id]
        ];
        return OrderAccountLink::alias('oa')
            ->field('a.id,a.contact_name as name,a.account,oa.work_type')
            ->where(new Where($where))
            ->join('qz_yxb_account a','a.id = oa.account_id')
            ->select();
    }
}