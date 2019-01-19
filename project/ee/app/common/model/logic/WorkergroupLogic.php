<?php

namespace app\common\model\logic;
use app\common\enums\StationStatus;
use think\Db;
use Util\Page;

/**
 * 施工组
 * Class WorkergroupLogic
 * @package app\common\model\logic
 */
class WorkergroupLogic
{
    /**
     * 施工组列表
     * @param $data
     * @param string $gid 需要查询的施工组id
     * @return array
     */
    public function getWorkerGroupList($data,$gid = '')
    {
        $map = $this->workerGroupListMap($data);
        $field = 'w.id gid,w.company_id,w.create_time,w.manager_id,w.group_name,u.id uid,u.name,a.contact_name as p_name,a.contact_tel,GROUP_CONCAT(u.id) as uids,w.is_del';
        $list = model('model/db/Workergroup')->getWorkerGroupList($map, $field);
        //如果有传 查询id($select_id) 过来,则查询当前id是否被删除,如果被删除了,则再次添加到数据中,用来回显
        if ($gid) {
            $info = model('model/db/Workergroup')->getWorkerGroupInfoById(['company_id' => session('userInfo.company_id'), 'id' => $gid]);
            if (!empty($info)) {
                if (count($list) > 0) {
                    if($info['is_del'] == StationStatus::DEL_STATUS_FALSE){
                        $list = $list->toArray();
                        $info = $info->toArray();
                        array_push($list, $info);
                    }
                } else {
                    $list = [$info];
                }
            }
        }
        return $list;
    }

    public function getMobileWorkerGroupList($data)
    {
        $map = $this->workerGroupListMap($data);
        $field = 'w.id gid,w.company_id,w.manager_id,w.group_name,u.id uid,u.name,a.contact_name as p_name,a.contact_tel,GROUP_CONCAT(u.id) as uids,a.image';
        $count = model('model/db/Workergroup')->getWorkerGroupListCount($map,$field);
        if ($count > 0) {
            $p = new Page($count, 10);
            $list = model('model/db/Workergroup')->getWorkerGroupList($map, $field, $p->firstRow, $p->listRows);
            return ['list' => $list, 'page' => $p->getPage()];
        }
    }

    /**
     * 编辑/添加 施工组信息
     * @param $data
     * @return bool|int|string
     */
    public function saveWorkerGroupInfo($data)
    {
        //添加施工组信息
        $save = [
            //施工组固定信息
            'op_uid' => session('userInfo')['id'],
            'company_id' => session('userInfo')['company_id'],
            //添加的信息
            'update_time' => time(),
            'manager_id' => $data['project_user'],
            'group_name' => trim($data['group_name']),
            'manager_worktype_id' => trim($data['manager_wortype']),
        ];
        if (isset($data['edit_id']) && $data['edit_id']) {
            //编辑
            return model('model/db/Workergroup')->save($save, ['id' => $data['edit_id']]);
        } else {
            //新增
            $save['create_time'] = time();
            return model('model/db/Workergroup')->insertGetId($save);
        }
    }

    /**
     * 施工组下拉框
     * @param $data
     * @return bool|int|string
     */
    public function getWorkerGroupSelect($data = [])
    {
        $map = $this->workerGroupListMap($data);
        $list = model('model/db/Workergroup')->getWorkerGroupList($map, 'w.id gid,w.company_id,w.manager_id,w.group_name,u.id uid,u.name,a.contact_tel,a.contact_name as p_name,a.account');
        return $list;
    }

    /**
     * 编辑/添加 施工员信息
     * @param $data
     * @return bool|int|string
     */
    public function saveWorkerInfo($group_id, $data)
    {
        //判断是否是编辑
        if (isset($data['edit_id']) && $data['edit_id']) {
            //如果是编辑 , 就先删除该施工组下的所有施工员
            $group_id = $data['edit_id'];
            $delWhere = ['group_id' => $group_id];
            //先删除所有
            model('model/db/Workergroup')->delWorker($delWhere);
        }
        //添加施工组员信息
        foreach ($data['group_user'] as $k => $v) {
            $save[] = [
                'worktype_id' => $v['work_type'],
                'name' => $v['work_name'],
                'tel' => $v['work_tel'],
                'wx_num' => $v['work_wx'],
                'group_id' => $group_id,
                'create_time' => time(),
            ];
        }
        return model('model/db/Workergroup')->addWorker($save);
    }

    /**
     * 编辑/添加页面获取数据
     * @param $data
     * @return array
     */
    public function getWorkerGroupInfo($data)
    {
        //如果编辑请求不传参数则,访问报错
        $action_type = input()['action_type'];
        switch ($action_type) {
            case 'add':
                return [];
                break;
            case 'edit':
                if (!isset($data['edit_id'])) {
                    return ['error' => '访问出错!'];
                } else {
                    $where = $this->workerGroupListMap();
                    $where['id'] = $data['edit_id'];
                    return model('model/db/Workergroup')->getWorkerGroupInfo(['id' => $data['edit_id']]);
                }
                break;
        }
    }

    /**
     * 获取工作组详细信息
     * @param $data
     * @return array
     */
    public function getWorkerGroupDetailInfo($data)
    {
        //如果详情请求不传参数则,访问报错
        if (!isset($data['edit_id']) || empty($data['edit_id'])) {
            return ['error' => '参数错误'];
        }
        $map = $this->workerGroupListMap($data);
        $field = 'w.id,w.company_id,w.group_name,u.worktype_id,u.`name`,u.tel,u.wx_num,u.id as worker_id,a.account,a.contact_name,a.image,a.contact_tel,a.contact_wx,e.name as ename,d.`name` as worktype_name,e.name as p_worktype_name';
        $list = model('model/db/Workergroup')->getWorkerGroupDetailInfo($map, $field);
        $returnData = [];
        //处理数据结果
        foreach ($list as $k => $v) {
            $returnData[$v['account']]['id'] = $v['id'];
            $returnData[$v['account']]['company_id'] = $v['company_id'];
            $returnData[$v['account']]['image'] = $v['image'];
            $returnData[$v['account']]['group_name'] = $v['group_name'];
            $returnData[$v['account']]['account'] = $v['account'];
            $returnData[$v['account']]['contact_mame'] = $v['contact_name'];
            $returnData[$v['account']]['contact_tel'] = $v['contact_tel'];
            $returnData[$v['account']]['contact_wx'] = $v['contact_wx'];
            $returnData[$v['account']]['p_worktype_name'] = $v['p_worktype_name'];
            $returnData[$v['account']]['work_users'][$k]['name'] = $v['name'];
            $returnData[$v['account']]['work_users'][$k]['worktype_name'] = $v['worktype_name'];
            $returnData[$v['account']]['work_users'][$k]['worktype_id'] = $v['worktype_id'];
            $returnData[$v['account']]['work_users'][$k]['tel'] = $v['tel'];
            $returnData[$v['account']]['work_users'][$k]['wx_num'] = $v['wx_num'];
            $returnData[$v['account']]['work_users'][$k]['worker_id'] = $v['worker_id'];
            unset($list[$k]);
        }
        return array_values($returnData);
    }

    /**
     * 删除 施工組
     * @param $data
     * @return array|bool
     * @throws \Exception
     */
    public function delGroup($data)
    {
        if (!isset($data['edit_id']) && !$data['edit_id']) {
            return [];
        }
        $map = $this->workerGroupListMap($data);
        $save['is_del'] = 2;
        unset($map['manager_id']);
        return model('model/db/Workergroup')->save($save,$map);
    }

    /**
     * 获取施工组施工信息
     */
    public function getGroupBuildInfoList($data)
    {
        $gids = getArrayFList($data, 'gid');
        if (!empty($gids) && count($gids) > 0) {
            $where[] = ['a.company_id', '=', session('userInfo.company_id')];
            $where[] = ['a.id', 'in', $gids];
            $field = 'a.id,b.build_state,b.build_group,b.order_no,b.reception_time,o.build_address';
            $list = model('model/db/Workergroup')->getGroupBuildInfoList($where, $field);
            $buildGroup = [];
            foreach ($list as $k => $v) {
                $buildGroup[$v['id']] = $v;
            }
            foreach ($data as $k => $v) {
                $data[$k]['build_address'] = isset($buildGroup[$v['gid']]['build_address']) ? $buildGroup[$v['gid']]['build_address'] : '';
                $data[$k]['build_count'] = isset($buildGroup[$v['gid']]['build_count']) ? $buildGroup[$v['gid']]['build_count'] : 0;
            }
            unset($list);
            unset($buildGroup);
        }
        return $data;
    }

    /**
     * 验证施工组
     */
    public function checkWorkerGroup($data)
    {
        if (isset($data['group_name']) && $data['group_name']) {
            $where[] = ['group_name', '=', $data['group_name']];
            $where[] = ['company_id', '=', session('userInfo.company_id')];
            $info = model('model/db/Workergroup')->where($where)->find();
            if ($info) {
                if (isset($data['edit_id']) && $data['edit_id']) {
                    if ($info['id'] == $data['edit_id']) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
        return false;
    }

    /**
     * 删除施工组的工人
     * @param $data
     * @return array|bool
     * @throws \Exception
     */
    public function delGroupWorker($data)
    {
        if (!isset($data['edit_id']) && !$data['edit_id']) {
            return [];
        }
        $map = $this->workerGroupListMap($data);
        $info = model('model/db/Workergroup')->checkGroupWorkerAccount($map);
        if (!$info && count($info) == 0) {
            return false;
        }
        return Db::table('qz_yxb_worker')->where(['id' => $data['edit_id']])->delete();
    }

    private function workerGroupListMap($data = [])
    {
        //默认条件
        $map = [
            'company_id' => session('userInfo.company_id'),
            'is_del' => StationStatus::DEL_STATUS_TRUE
        ];

        if (session('userInfo.default_rule') == 2) {
            $map['manager_id'] = session('userInfo.id');
        }
        //如果当前人员是固定角色 项目经理,就只能查看他自己的施工组
        if (session('userInfo.default_rule') == 2) {
            $map['manager_id'] = session('userInfo.id');
        } else {
            //用作筛选框下拉框选择
            if (isset($data['project_user']) && $data['project_user']) {
                $map['manager_id'] = $data['project_user'];
            }
            //用作列表页左侧筛选项目经理
            if (isset($data['up_project_user']) && $data['up_project_user']) {
                $map['manager_id'] = $data['up_project_user'];
            }
        }
        if (isset($data['group_id']) && $data['group_id']) {
            $map['group_id'] = $data['group_id'];
        }
        if (isset($data['project_tel']) && $data['project_tel']) {
            $map['tel'] = $data['project_tel'];
        }

        if (isset($data['mobile_search']) && $data['mobile_search']) {
            $map['mobile_search'] = $data['mobile_search'];
        }
        //主要用于删除/编辑
        if (isset($data['edit_id']) && $data['edit_id']) {
            $map['id'] = $data['edit_id'];
        }
        return $map;
    }

    /**
     * 保留查询条件
     * @param $data 条件
     * @param string $sendField 过滤的字段
     * @return bool|string
     */
    public function getGroupSearchCondition($data,$sendField = 'up_project_user')
    {
        $searchArr = ['group_id', 'project_user', 'project_tel', 'up_project_user'];
        $returnData = '';
        foreach ($searchArr as $k => $v) {
            if($v != $sendField){
                if(isset($data[$v])){
                    $returnData .= $v . '=' . $data[$v] . '&';
                }
            }
        }
        return substr($returnData, -1) == '&' ? substr($returnData, 0, -1) : $returnData;
    }
}