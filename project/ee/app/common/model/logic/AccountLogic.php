<?php

namespace app\common\model\logic;

use app\common\enums\ErrorCode;
use app\common\enums\OrderStatus;
use app\common\enums\StationStatus;
use app\common\model\db\Account;
use app\common\model\db\OrderAccountLink;
use app\common\model\db\Orders;
use think\Db;
use think\db\Where;
use Util\Page;

/**
 * 员工管理
 * Class AccountLogic
 * @package app\common\model\logic
 */
class AccountLogic
{

    private $workType = [
        1 => ['name' => '水电工', 'alias' => 'sdg'],
        2 => ['name' => '瓦工', 'alias' => 'wg'],
        3 => ['name' => '木工', 'alias' => 'mg'],
        4 => ['name' => '油漆工', 'alias' => 'yqg']
    ];

    public function employeeList($data)
    {
        $map = $this->employeeListMap($data);
        $count = model('model/db/Account')->getEmployeeListCount($map);
        if ($count > 0) {
            $p = new Page($count, 20);
            $show = $p->show();
            $list = model('model/db/Account')->getEmployeeList($map, $p->firstRow, $p->listRows);
            return ['list' => $list, 'page' => $show];
        }
    }

    public function mobileEmployeeList($data)
    {
        $map = $this->employeeListMap($data);
        $map['status'] = 1;//只查已启用数据
        $count = model('model/db/Account')->getEmployeeListCount($map);
        if ($count > 0) {
            $p = new Page($count, 10);
            $list = model('model/db/Account')->getEmployeeList($map, $p->firstRow, $p->listRows);
            return ['list' => $list, 'page' => $p->getPage()];
        }
    }

    public function workerList($data)
    {
        $map = $this->workerListMap($data);
        $count = model('model/db/Account')->getWorkerListCount($map);
        if ($count > 0) {
            $p = new Page($count, 20);
            $show = $p->show();
            $list = model('model/db/Account')->getWorkerList($map, $p->firstRow, $p->listRows);
            return ['list' => $list, 'page' => $show];
        }
    }

    public function mobileWorkerList($data)
    {
        $map = $this->employeeListMap($data);
        $count = model('model/db/Account')->getWorkerListCount($map);
        if ($count > 0) {
            $p = new Page($count, 10);
            $list = model('model/db/Account')->getWorkerList($map, $p->firstRow, $p->listRows);
            foreach ($list as $key=>$vo)
            {
                $str = explode(',',$vo['worktype_name']);
                $list[$key]['work_type'] =$str;
            }
            return ['list' => $list, 'page' => $p->getPage()];
        }
    }

    /**
     * 编辑/添加 员工信息
     * @param $data
     * @return bool|int|string
     */
    public function saveEmployeeInfo($data)
    {
        $save = [
            //用户固定信息
            'op_uid' => session('userInfo')['id'],
            'company_id' => session('userInfo')['company_id'],
            //添加的信息
            'update_time' => time(),
            'account' => $data['Loginumber'],
            'contact_name' => $data['Staffname'],
            'contact_tel' => $data['Phonenumber'],
            'contact_wx' => $data['Weixinnumber'],
            'status' => (isset($data['Statetai']) && $data['Statetai'] ? $data['Statetai'] : 1),
            'class_type' => 2,//装修公司添加的都是员工
        ];
        if (isset($data['edit_id']) && $data['edit_id']) {
            //编辑
            return model('model/db/Account')->save($save, ['id' => $data['edit_id']]);
        } else {
            //新增
            $save['create_time'] = time();
            $save['pass'] = md5($data['Passwordtext']);
            return model('model/db/Account')->insertGetId($save);
        }
    }

    /**
     * 编辑/添加 工人信息
     * @param $data
     * @return bool|int|string
     */
    public function saveWorkerInfo($data)
    {
        $save = [
            //用户固定信息
            'op_uid' => session('userInfo')['id'],
            'company_id' => session('userInfo')['company_id'],
            //添加的信息
            'update_time' => time(),
            'account' => $data['Loginumber'],
            'contact_name' => $data['Staffname'],
            'contact_tel' => (isset($data['Phonenumber']) && $data['Phonenumber'] ? $data['Phonenumber'] : ""),
            'contact_wx' => $data['Weixinnumber'],
            'status' => (isset($data['Statetai']) && $data['Statetai'] ? $data['Statetai'] : 1),
            'class_type' => 3,//装修公司添加的都是工人
        ];
        if (isset($data['edit_id']) && $data['edit_id']) {
            //编辑
            return model('model/db/Account')->save($save, ['id' => $data['edit_id']]);
        } else {
            //新增
            $save['create_time'] = time();
            $save['pass'] = md5($data['Passwordtext']);
            return model('model/db/Account')->insertGetId($save);
        }
    }

    /**
     * 获取单条员工信息
     * @param $id
     * @return array
     */
    public function getEmployeeInfoById($data)
    {
        //如果编辑请求不传参数则,访问报错
        $action_type = input()['action_type'];
        switch ($action_type) {
            case 'add':
                return [];
                break;
            case 'edit':
                if (!isset($data['id'])) {
                    return ['error' => '访问出错!'];
                } else {
                    return model('model/db/Account')->getEmployeeInfoById($data['id']);
                }
                break;
        }
    }

    /**
     * 获取单条工人信息
     * @param $id
     * @return array
     */
    public function getWorkerInfoById($data)
    {
        //如果编辑请求不传参数则,访问报错
        if (!isset($data['id'])) {
            return ['error' => '访问出错!'];
        } else {
            return model('model/db/Account')->getWorkerInfoById($data['id']);
        }
    }
    /**
     * 编辑/添加 员工信息
     * @param $data
     * @return bool|int|string
     */
    public function changePwd($data)
    {
        $map = $this->employeeListMap($data);
        $save = [];
        if (isset($data['pwd']) && !empty($data['pwd'])) {
            $save['pass'] = md5($data['pwd']);
        }else{
            return false;
        }
        return model('model/db/Account')->save($save, $map);
    }

    /**
     * 编辑/添加 工人信息
     * @param $data
     * @return bool|int|string
     */
    public function changeWorkerPwd($data)
    {
        $map = $this->workerListMap($data);
        $save = [];
        if (isset($data['pwd']) && !empty($data['pwd'])) {
            $save['pass'] = md5($data['pwd']);
        }else{
            return false;
        }
        return model('model/db/Account')->save($save, $map);
    }

    /**
     * 添加/编辑 员工附属信息
     * @param $id
     * @param $data
     * @return mixed
     */
    public function saveEmployeeAccountInfo($id, $data)
    {
        //如果没有$id(添加才会有返回id) ,则是编辑,将编辑id作为$id
        if (!$id || $id === true) {
            $id = $data['edit_id'];
        }
        //获取用户附属信息
        $info = model('model/db/Account')->getEmployeeAccountInfo(['account_id' => ['=', $id]]);
        $save = [
            'update_time' => time(),
            'dept_id' => $data['Departmentxz'],
            'station_id' => $data['Postxz'],
            'account_id' => $id,
        ];
        if ($info) {
            //编辑
            $where = [
                'id' => ['=', $info['id']]
            ];
            unset($info);
            return model('model/db/Account')->saveEmployeeAccountInfo($where, $save);
        } else {
            //添加
            $save['add_time'] = time();
            return model('model/db/Account')->addEmployeeAccountInfo($save);
        }
    }

    /**
     * 添加/编辑 工人附属信息
     * @param $id
     * @param $data
     * @return mixed
     */
    public function saveWorkerAccountInfo($id, $data)
    {
        //如果没有$id(添加才会有返回id) ,则是编辑,将编辑id作为$id
        if (!$id || $id === true) {
            $id = $data['edit_id'];
        }
        //获取用户附属信息
        $where['default_rule'] = StationStatus::DEFAULT_RULE_XMJL;//取职位为项目经理的人员
        $workStationId = model('model/db/Station')->getWorkerStationId();
        $info = model('model/db/Account')->getWorkerAccountInfo(['account_id' => ['=', $id]]);
        $save = [
            'update_time' => time(),
            'dept_id' => 0,
            'station_id' => $workStationId,
            'account_id' => $id,
        ];
        if ($info) {
            //编辑
            $where = [
                'id' => ['=', $info['id']]
            ];
            unset($info);
            return model('model/db/Account')->saveWorkerAccountInfo($where, $save);
        } else {
            //添加
            $save['add_time'] = time();
            return model('model/db/Account')->addWorkerAccountInfo($save);
        }
    }

    /**
     * 添加/编辑 工人附属信息
     * @param $id
     * @param $data
     * @return mixed
     */
    public function saveWorkerTypeInfo($id, $data)
    {
        //如果没有$id(添加才会有返回id) ,则是编辑,将编辑id作为$id
        if (!$id || $id === true) {
            $id = $data['edit_id'];
        }
        $info = model('model/db/Account')->getWorkerTypeInfo(['account_id' => ['=', $id]]);
        // 启动事务
        Db::startTrans();
        try {
            if ($info) {
                //编辑
                $where = [
                    'account_id' => ['=', $id]
                ];
                model('model/db/Account')->delWorkerTypeInfo($where);

            }
            //添加
            foreach ($data['WorkType'] as $value){
                $save = [
                    'account_id' => $id,
                    'worktype_id' => $value,
                ];
                model('model/db/Account')->addWorkerTypeInfo($save);
            }
            Db::commit();
            return true;
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            return false;
        }
    }

    /**
     * 改变 员工状态
     * @return bool
     */
    public function changeEmployeeStatus($data)
    {
        if (!$data['status'] || !$data['edit_id']) {
            return [];
        }

        if ($data['status'] == 1) {
            $save['status'] = 2;
        } else {
            $save['status'] = 1;
        }
        return model('model/db/Account')->save($save, ['id' => $data['edit_id']]);
    }

    /**
     * 改变 工人状态
     * @return bool
     */
    public function changeWorkerStatus($data)
    {
        if (!$data['status'] || !$data['edit_id']) {
            return [];
        }

        if ($data['status'] == 1) {
            $save['status'] = 2;
        } else {
            $save['status'] = 1;
        }
        return model('model/db/Account')->save($save, ['id' => $data['edit_id']]);
    }

    /**
     * 验证账号唯一
     * @param $data
     * @return bool
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function checkAccount($data)
    {
        $where = [
            'account' => $data['Loginumber']
        ];
        $info = model('model/db/Account')->where($where)->find();
        if($info){
            if (isset($data['edit_id']) && $data['edit_id']) {
                if($data['edit_id'] == $info['id']){
                    return true;
                }
            }
            return false;
        }
        return true;
    }

    /**
     * 验证同一装修公司姓名唯一性
     * @param $data
     * @return bool
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function checkAccountName($data,$class_type)
    {
        $where = [
            'contact_name' => $data['Staffname'],
            'class_type' => $class_type,
            'company_id' => session('userInfo.company_id'),
            'is_del' => StationStatus::DEL_STATUS_TRUE,
        ];
        $info = model('model/db/Account')->where($where)->find();
        if($info){
            if (isset($data['edit_id']) && $data['edit_id']) {
                if($data['edit_id'] == $info['id']){
                    return true;
                }
            }
            return false;
        }
        return true;
    }

    /**
     * 删除 员工
     * @param $data
     * @return array|bool
     * @throws \Exception
     */
    public function delEmployee($data)
    {
        if (!isset($data['edit_id']) && !$data['edit_id']) {
            return [];
        }
        $save['is_del'] = 2;
        $map = $this->employeeListMap($data);
        unset($map['manager_id']);
        return model('model/db/Account')->save($save,$map);
    }

    /**
     * 删除 工人
     * @param $data
     * @return array|bool
     * @throws \Exception
     */
    public function delWorker($data)
    {
        if (!isset($data['edit_id']) && !$data['edit_id']) {
            return [];
        }
        $save['is_del'] = 2;
        $map = $this->workerListMap($data);
        unset($map['manager_id']);
        return model('model/db/Account')->save($save,$map);
    }

    /**
     * 查询员工下拉框
     * @param array $data
     * @return mixed
     */
    public function getEmployeeSelectList($data =[])
    {//如果有传 查询id($select_id) 过来,则查询当前id是否被删除,如果被删除了,则再次添加到数据中,用来回显
        $map = [
            'project_user' => (isset($data['project_user']) ? $data['project_user'] : ''),
            'project_tel' => (isset($data['project_tel']) ? $data['project_tel'] : ''),
            'group_id' => (isset($data['group_id']) ? $data['group_id'] : ''),
            'status' => 1,
        ];
        $where = $this->employeeListMap($map);//只要判断是够传值
        $where['default_rule'] = StationStatus::DEFAULT_RULE_XMJL;//取职位为项目经理的人员
        $list = model('model/db/Account')->getEmployeeSelectList($where, 'a.id,a.contact_name as name,a.image,a.account,a.contact_tel as tel');
        return $list;
    }

    /**
     * 获取固定岗位人员下拉框(默认取项目经理的人员)
     * @param array $data
     * @param int $rule
     * @param string $select_id 需要查询的id
     * @return mixed
     */
    public function projectUserList($data =[],$rule = '',$select_id = '')
    {
        $where = $this->projectUserListMap(['default_rule' => $rule, 'project_user' => (isset($data['project_user']) ? $data['project_user'] : '')]);//只要判断是够传值
        $where['status'] = 1;//取启用状态员工
        if($rule){
            $where['default_rule'] = $rule;//取职位为项目经理的人员
        }
        $where['is_del'] = StationStatus::DEL_STATUS_TRUE;//取未删除数据
        $field = 'a.id,a.contact_name as name,a.image,a.account,a.status,a.contact_tel as tel,a.is_del';
        $list = model('model/db/Account')->getEmployeeSelectList($where, $field);
        //如果有传 查询id($select_id) 过来,则查询当前id是否被删除,如果被删除了,则再次添加到数据中,用来回显
        if ($select_id) {
            $info = model('model/db/Account')->alias('a')->field($field)->where(['company_id' => session('userInfo.company_id'), 'id' => $select_id])->find();
            if (!empty($info) && $info['is_del'] != StationStatus::DEL_STATUS_TRUE || $info['status'] != 1) {
                if (count($list) > 0) {
                    $list = $list->toArray();
                    $info = $info->toArray();
                    array_push($list, $info);
                } else {
                    $list = $info;
                }
            }
        }
        //获取人员关联订单数量
        $list_id = array_column($list->toArray(),'id');
        //获取接待客服订单信息
        $reception_order = model('model/db/OrdersManage')->getReceptionOrder($list_id)->toArray();
        $relate_order = [];
        foreach($reception_order as $val){
            $relate_order[$val['reception_id']][] = $val['order_no'];
        }
        //获取设计师订单信息
        $design_order = model('model/db/OrdersManage')->getDesignOrder($list_id)->toArray();
        foreach($design_order as $val){
            $relate_order[$val['designer_id']][] =$val['order_no'];
        }
        //去除重复订单后获得人员关联订单数量
        foreach($relate_order as $key=>$val){
            $relate_order[$key] = array_unique($val);
            $relate_order[$key] = count($relate_order[$key]);
        }
        foreach($list as $key=>$val){
            $list[$key]['order_number'] = isset($relate_order[$val['id']])?$relate_order[$val['id']]:0;
        }
        return $list;
    }

    /**
     * 获取固定角色下拉框列表(通用)
     */
    public function commonAccountSelectList($user,$rule = StationStatus::DEFAULT_RULE_XMJL, $select_id = '')
    {
        $where['company_id'] = $user['company_id'];
        $where['status'] = 1;//取启用状态员工
        $where['is_del'] = StationStatus::DEL_STATUS_TRUE;//取未删除数据
        $where['default_rule'] = $rule;//取对应固定角色 人员
        $field = 'a.id,a.contact_name as name,a.image,a.account,a.status,a.contact_tel as tel,a.is_del,s.default_rule';
        $accountDb = new Account();
        $list = $accountDb->getEmployeeSelectList($where, $field);
        return $list;
    }

    /**
     * 获取公司施工人员下拉数据
     * @param $user
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function workerAccountSelectList($user){
        $accountDb = new Account();
        $where['company_id'] = $user['company_id'];
        //获取下拉框数据
        $list = $accountDb->getWorkAccountList($where);
        $selectData = [];
        $userList = [];
        if(count($list) > 0){
            $userList = array_column($list->toArray(),'id');
            foreach ($list as $k=>$v){
                switch ($v['default_rule']){
                    //1、水电工
                    case '1':
                        $selectData[$this->workType[1]['alias']][] = $v;
                        break;
                    //2、瓦工
                    case '2':
                        $selectData[$this->workType[2]['alias']][] = $v;
                        break;
                    //3、木工
                    case '3':
                        $selectData[$this->workType[3]['alias']][] = $v;
                        break;
                    //4、油漆工
                    case '4':
                        $selectData[$this->workType[4]['alias']][] = $v;
                        break;
                }
            }
        }
        return ['select_data'=>$selectData,'user_list'=>$userList];
    }

    public function getCommonWorkerAccountSelectList($user){
        $userList = $this->workerAccountSelectList($user);
        $returnData = [];
        if(!empty($userList['select_data'])){
            foreach ($userList['select_data'] as $k=>$v){
                foreach ($v as $kk=>$vv){
                    $returnData[$vv['id']]['id'] = $vv['id'];
                    $returnData[$vv['id']]['name'] = $vv['contact_name'];
                }
            }
        }
        return $returnData;
    }

    public function workerOrderCountSelectList($user)
    {
        //获取每个人员关联的订单数据
        if (!empty($user['user_list'])) {
            $accountDb = new Account();
            $userList = array_unique($user['user_list']);
            $all_list = [];
            //1、水电工
            $all_list = $accountDb->getAccountOrders($userList, 1, $all_list);
            //2、瓦工
            $all_list = $accountDb->getAccountOrders($userList, 2, $all_list);
            //3、木工
            $all_list = $accountDb->getAccountOrders($userList, 3, $all_list);
            //4、油漆工
            $all_list = $accountDb->getAccountOrders($userList, 4, $all_list);
            foreach ($all_list as $k => $v) {
                $all_list[$k] = count(array_unique($v));
            }
            $user = $user['select_data'];
            foreach ($user as $k => $v) {
                foreach ($v as $kk => $vv) {
                    $user[$k][$kk]['order_number'] = isset($all_list[$vv['id']]) ? $all_list[$vv['id']] : 0;
                }
            }
            return $user;
        }
        return [];
    }

    public function projectOrderCountSelectList($projectUser){
        if(count($projectUser) > 0){
            $all_list = [];
            $accountDb = new Account();
            $userList = array_column((gettype($projectUser)=='object')?$projectUser->toArray():$projectUser,'id');
            $all_list = $accountDb->getAccountOrders($userList, 0, $all_list);
            foreach ($all_list as $k => $v) {
                $all_list[$k] = count(array_unique($v));
            }
            foreach ($projectUser as $k => $v) {
                $projectUser[$k]['order_number'] = isset($all_list[$v['id']]) ? $all_list[$v['id']] : 0;
            }
            return $projectUser;
        }
        return [];
    }

    public function orderChooseWorkerAccountSelectList($order,$rule = StationStatus::DEFAULT_RULE_GR,$user){
        $ordersDb = new Orders();
        $where['order_id'] = $order['order_no'];
        $where['company_id'] = $user['company_id'];
        //获取选中数据
        $list = $ordersDb->getOrderAccountList($where);
        $chooseData = [];
        //选择的项目经理
        if($order['manage']['worker_type'] == 1){
            $chooseData['project'] = [];
            $chooseData['worker'] = [];
            if(count($list) > 0){
                $chooseData['project'] = $list;
            }
        }else{
            $workerList = [];
            //选择的施工队
            if(count($list) > 0){
                foreach ($list as $k=>$v){
                    switch ($v['work_type']){
                        //1、水电工
                        case '1':
                            $workerList['sdg'][] = $v;
                            break;
                        //2、瓦工
                        case '2':
                            $workerList['wg'][] = $v;
                            break;
                        //3、木工
                        case '3':
                            $workerList['mg'][] = $v;
                            break;
                        //4、油漆工
                        case '4':
                            $workerList['yqg'][] = $v;
                            break;
                    }
                }
            }
            $chooseData['worker'] = $workerList;
            $chooseData['project'] = [];
        }
        return $chooseData;
    }

    //获取员工信息
    public function orderChooseWorkerAccountList($work_type,$workerUser,$projectUser, $chooseWorkerUser)
    {
        $userList = [];
        foreach ($workerUser as $k => $v) {
            foreach ($v as $kk=>$vv){
                $userList[$vv['id']] = $vv;
            }
        }
        foreach ($projectUser as $k=>$v){
            $userList[$v['id']] = $v;
        }
        //选择了项目经理
        if($work_type == 1){
            if(!empty($chooseWorkerUser['project'])){
                foreach ($chooseWorkerUser['project'] as $k=>$v){
                    if(isset($userList[$v['account_id']])){
                        $chooseWorkerUser['project'][$k]['order_number'] = $userList[$v['account_id']]['order_number'];
                    }else{
                        $chooseWorkerUser['project'][$k]['order_number'] = 0;
                    }
                }
            }
        }else{
            //选择了施工班组
            foreach ($chooseWorkerUser['worker'] as $k=>$v){
                foreach ($v as $kk=>$vv){
                    if(isset($userList[$vv['account_id']])){
                        $chooseWorkerUser['worker'][$k][$kk]['order_number'] = $userList[$vv['account_id']]['order_number'];
                    }else{
                        $chooseWorkerUser['worker'][$k][$kk]['order_number'] = 0;
                    }
                }
            }
        }
        return $chooseWorkerUser;
    }

    public function orderChooseWorkerAccountInfo($input)
    {
        if (empty($input['order_id'])) {
            return ['error_code' => ErrorCode::PARAMETER_LACK, 'error_msg' => '缺少数据'];
        }
        $userDb = new Account();
        $list = $userDb->getOrderAccount($input['order_id']);

        //区分项目经理还是施工班组
        $info = [];
        if($input['worker_type'] == 1){
            if(count($list) > 0){
                $info = $this->projectOrderCountSelectList($list);
            }
        }else{
            $workerList = [];
            //选择的施工队
            if(count($list) > 0){
                foreach ($list as $k=>$v){
                    switch ($v['work_type']){
                        //1、水电工
                        case '1':
                            $workerList['sdg'][] = $v;
                            break;
                        //2、瓦工
                        case '2':
                            $workerList['wg'][] = $v;
                            break;
                        //3、木工
                        case '3':
                            $workerList['mg'][] = $v;
                            break;
                        //4、油漆工
                        case '4':
                            $workerList['yqg'][] = $v;
                            break;
                    }
                }
            }
            $userList = array_unique(array_column((gettype($list) == 'object') ? $list->toArray() : $list, 'id'));
            $info = $this->workerOrderCountSelectList(['select_data' => $workerList, 'user_list' => $userList]);
        }
        return ['list' => $info, 'worker_type' => $input['worker_type']];
    }

    public function saveOrderWorker($input){
        $save = [];
        //1.获取选中数据
        //1.1选了项目经理
        if (!empty($input['worker_type']) && $input['worker_type'] == OrderStatus::WORKER_TYPE_P) {
            $save[] = [
                'order_id' => $input['order_id'],
                'account_id' => $input['project'],
                'work_type' => 0,
            ];
        }
        //1.2选了施工班组
        if (!empty($input['worker_type']) && $input['worker_type'] == OrderStatus::WORKER_TYPE_WORK) {
            //水电工
            if (!empty($input['sdg'])) {
                foreach ($input['sdg'] as $k => $v) {
                    $save[] = [
                        'order_id' => $input['order_id'],
                        'account_id' => $v,
                        'work_type' => OrderStatus::WORKER_SDG,
                    ];
                }
            }
            //瓦工
            if (!empty($input['wg'])) {
                foreach ($input['wg'] as $k => $v) {
                    $save[] = [
                        'order_id' => $input['order_id'],
                        'account_id' => $v,
                        'work_type' => OrderStatus::WORKER_WG,
                    ];
                }
            }
            //木工
            if (!empty($input['mg'])) {
                foreach ($input['mg'] as $k => $v) {
                    $save[] = [
                        'order_id' => $input['order_id'],
                        'account_id' => $v,
                        'work_type' => OrderStatus::WORKER_MG,
                    ];
                }
            }
            //油漆工
            if (!empty($input['yqg'])) {
                foreach ($input['yqg'] as $k => $v) {
                    $save[] = [
                        'order_id' => $input['order_id'],
                        'account_id' => $v,
                        'work_type' => OrderStatus::WORKER_YQG,
                    ];
                }
            }
        }

        //2.删除原有数据
        if (count($save) > 0) {
            Db::table('qz_yxb_order_account')->where(['order_id' => $input['order_id']])->delete();
        }
        //3.添加
        $status = Db::table('qz_yxb_order_account')->insertAll($save);
        if ($status) {
            //4.修改订单人员的状态
            Db::table('qz_yxb_orders_manage')->where(['order_no' => $input['order_id']])->update(['worker_type' => $input['worker_type']]);
            return ['error_code' => ErrorCode::SUCCESS];
        } else {
            return ['error_code'=>ErrorCode::SERVICE_MYSQL_ERROR,'error_msg'=>'添加失败!'];
        }
    }

    /**
     * 验证订单是否是该公司的
     */
    public function checkOrder($order_id,$user_info){
        $orderDb = new Orders();
        $info = $orderDb->getOrderInfo($order_id,$user_info['company_id']);
        if(!empty($info)){
            return true;
        }else{
            return false;
        }
    }

    public function getWorkerHtml($projectUser,$workerUser){
        $pOption = '';
        $sdgOption = '';
        $wgOption = '';
        $mgOption = '';
        $yqgOption = '';
        if(count($projectUser) > 0){
            foreach ($projectUser as $k => $v) {
                $pOption .= '<option value="' . $v['id'] . '" >' . $v['name'] . '-'. $v['order_number']. '</option>';
            }
        }
        if(count($workerUser) > 0){
            foreach ($workerUser as $k=>$v){
                switch ($k){
                    case 'sdg':
                        foreach ($v as $kk=>$vv){
                            $sdgOption .= '<option value="' . $vv['id'] . '" >' . $vv['contact_name'] . '-'. $vv['order_number'].'</option>';
                        }
                        break;
                    case 'wg':
                        foreach ($v as $kk=>$vv){
                            $wgOption .= '<option value="' . $vv['id'] . '" >' . $vv['contact_name'] .  '-'. $vv['order_number'].'</option>';
                        }
                        break;
                    case 'mg':
                        foreach ($v as $kk=>$vv){
                            $mgOption .= '<option value="' . $vv['id'] . '" >' . $vv['contact_name'] . '-'. $vv['order_number']. '</option>';
                        }
                        break;
                    case 'yqg':
                        foreach ($v as $kk=>$vv){
                            $yqgOption .= '<option value="' . $vv['id'] . '" >' . $vv['contact_name'] . '-'. $vv['order_number']. '</option>';
                        }
                        break;
                }
            }
        }
        $projectHtml = '<div class="col-xs-3 pro">
            <span class="p-form-title">项目经理：</span>
            <select class="p-input" name="state" id="selectmanager">
                <option value="">请选择</option>
                '.$pOption.'
            </select>
        </div>';
        $workerHtml = '<div class="col-xs-3">
            <span class="p-form-title">水电工:
            </span>
            <select class="p-input workselect" name="state" id="selectshuidian">
                <option value="">请选择</option>
                '.$sdgOption.'
            </select>
        </div>
        <div class="col-xs-3">
            <span class="p-form-title">瓦工:
            </span>
            <select class="p-input workselect" name="state" id="selectwa">
                <option value="">请选择</option>
                ' . $wgOption . '
            </select>
        </div>
        <div class="col-xs-3">
            <span class="p-form-title">木工:
            </span>
            <select class="p-input workselect" name="state" id="selectwood">
                <option value="">请选择</option>
                ' . $mgOption . '
            </select>
        </div>
        <div class="col-xs-3">
            <span class="p-form-title">油漆工:
            </span>
            <select class="p-input workselect" name="state" id="selectyouqi">
                <option value="">请选择</option>
                ' . $yqgOption . '
            </select>
        </div>';
        return ['project_html' => $projectHtml, 'worker_html' => $workerHtml];
    }

    public function getAccountInfo($data){
        $map = [];
        if (isset($data['account']) && !empty($data['account'])) {
            $map[] = ['account', '=', $data['account']];
        }
        if (isset($data['id']) && !empty($data['id'])) {
            $map[] = ['id', '=', $data['id']];
        }
        if(empty($map)){
            return [];
        }
        return model('model/db/Account')->where($map)->find();
    }

    private function employeeListMap($data = [])
    {
        //默认条件
        $map = [
            'company_id' => session('userInfo.company_id'),
            'class_type' => 2, //只取员工数据
            'is_del' => StationStatus::DEL_STATUS_TRUE, //只取未删除的
        ];

        //如果当前人员是固定角色 项目经理,就只能查看他自己的施工组
        if (session('userInfo.default_rule') == StationStatus::DEFAULT_RULE_XMJL) {
            $map['manager_id'] = session('userInfo.id');
        } else {
            if (isset($data['project_user']) && $data['project_user']) {
                $map['manager_id'] = $data['project_user'];
            }
        }
        if (isset($data['name']) && $data['name']) {
            $map['contact_name'] = $data['name'];
        }
        if (isset($data['status']) && $data['status']) {
            $map['status'] = $data['status'];
        }
        if (isset($data['dept']) && $data['dept']) {
            $map['dept'] = $data['dept'];
        }
        if (isset($data['station']) && $data['station']) {
            $map['station'] = $data['station'];
        }
        if (isset($data['edit_id']) && $data['edit_id']) {
            $map['id'] = $data['edit_id'];
        }
        if (isset($data['group_id']) && $data['group_id']) {
            $map['group_id'] = $data['group_id'];
        }
        if (isset($data['project_tel']) && $data['project_tel']) {
            $map['tel'] = $data['project_tel'];
        }
        //排序条件
        if (isset($data['order_by']) && $data['order_by']) {
            $map['order_by'] = $data['order_by'];
        }
        if (isset($data['order']) && $data['order']) {
            $map['order'] = $data['order'];
        }

        if (isset($data['mobile_search']) && $data['mobile_search']) {
            $map['mobile_search'] = trim($data['mobile_search']);
        }
        return $map;
    }

    private function workerListMap($data = [])
    {
        //默认条件
        $map = [
            'company_id' => session('userInfo.company_id'),
            'class_type' => 3, //只取员工数据
            'is_del' => StationStatus::DEL_STATUS_TRUE, //只取未删除的
        ];

        //如果当前人员是固定角色 项目经理,就只能查看他自己的施工组
        if (session('userInfo.default_rule') == StationStatus::DEFAULT_RULE_XMJL) {
            $map['manager_id'] = session('userInfo.id');
        } else {
            if (isset($data['project_user']) && $data['project_user']) {
                $map['manager_id'] = $data['project_user'];
            }
        }
        if (isset($data['name']) && $data['name']) {
            $map['contact_name'] = $data['name'];
        }
        if (isset($data['status']) && $data['status']) {
            $map['status'] = $data['status'];
        }

        if (isset($data['edit_id']) && $data['edit_id']) {
            $map['id'] = $data['edit_id'];
        }

        if (isset($data['project_tel']) && $data['project_tel']) {
            $map['tel'] = $data['project_tel'];
        }
        if (isset($data['work_status']) && $data['work_status']) {
            $map['work_status'] = $data['work_status'];
        }
        if (isset($data['work_type']) && $data['work_type']) {
            $map['work_type'] = $data['work_type'];
        }
        //排序条件
        if (isset($data['order_by']) && $data['order_by']) {
            $map['order_by'] = $data['order_by'];
        }
        if (isset($data['order']) && $data['order']) {
            $map['order'] = $data['order'];
        }
        if (isset($data['mobile_search']) && $data['mobile_search']) {
            $map['mobile_search'] = trim($data['mobile_search']);
        }
        return $map;
    }

    //项目经理条件查询
    private function projectUserListMap($data = [])
    {
        //默认条件
        $map = [
            'company_id' => session('userInfo.company_id'),
            'class_type' => 2, //只取员工数据
        ];

        //如果当前人员是固定角色 项目经理,就只能查看他自己的施工组
        if (session('userInfo.default_rule') == StationStatus::DEFAULT_RULE_XMJL) {
            $map['manager_id'] = session('userInfo.id');
        } else {
            if (isset($data['project_user']) && $data['project_user']) {
                $map['project_user'] = $data['project_user'];
            }
        }
        //只有查询项目经理才限制
        if(isset($data['default_rule']) && $data['default_rule'] != StationStatus::DEFAULT_RULE_XMJL){
            unset($map['manager_id']);
        }
        if (isset($data['edit_id']) && $data['edit_id']) {
            $map['id'] = $data['edit_id'];
        }
        return $map;
    }

    /**
     * 获取员工信息
     * @param  $data  数组 只有一个， $data['id']:  登陆账号id
     */
    public function getAccountInfoById($data){
        return model('model/db/Account')->getEmployeeInfoById($data['id']);
    }

    /**
     * 保存账户信息
     */
    public function changeUserInfo($data){
        return model('model/db/Account')->changeUserInfo($data);
    }

    /**
     * 更改用户头像地址
     * $imgurl    头像的七牛地址
     */
    public function saveHeadImage($imgurl){
        return model('model/db/Account')->saveHeadImage($imgurl);
    }

    /**
     * 获取account表信息[根据已保存的userInfo]
     */
    public function getUserinfo(){
        $where['id'] = session('userInfo.id');
        return model('model/db/Account')->getDbUserInfo($where);
    }

    /**
     * 移动端修改用户信息
     * @param $data | 数组  $data['contactname']：姓名 / $data['contacttel']:电话 / $data['contactwx']:微信号
     *
     */
    public function changeAccountInfo($data){
        $newdata = [];
        if(!empty($data['contactname'])){ //修改姓名
            $newdata['contact_name'] = $data['contactname'];
        }
        if(!empty($data['contacttel'])){  //修改手机号
            $newdata['contact_tel'] = $data['contacttel'];
        }
        if(!empty($data['type']) && $data['type'] == 3){
            if(!empty($data['contactwx'])){  //修改微信号
                $newdata['contact_wx'] = $data['contactwx'];
            }else{
                $newdata['contact_wx'] = '';
            }
        }
        return model('model/db/Account')->changeAccountInfo($newdata);
    }

    /**
     * 获取页面排序url
     * @param string $dataOrder 原数据排序
     * @return bool|string
     */
    public function getOrderUrl($dataOrder = 'desc')
    {
        $nowOrder = $dataOrder == 'desc' ? 'asc' : 'desc';
        $order = input('get.order') == $dataOrder ? 'order=' . $nowOrder . '&' : 'order=' . $dataOrder . '&';
        parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $params);
        if (!empty($params)) {
            foreach ($params as $k => $v) {
                if (!strstr($order, $k)) {
                    if ($k == 'order') {
                        if ($v == 'asc') {
                            $order .= $k . '=' . 'desc' . '&';
                        } else {
                            $order .= $k . '=' . 'asc' . '&';
                        }
                    } else {
                        if($k != 'order_by'){
                            $order .= $k . '=' . $v . '&';
                        }
                    }
                }
            }
        }
        return substr($order, -1) == '&' ? substr($order, 0, -1) : $order;
    }


}