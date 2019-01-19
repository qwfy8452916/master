<?php

namespace app\common\model\logic;

use app\common\enums\ErrorCode;
use app\common\enums\StationStatus;
use Util\Page;

/**
 * 工种
 * Class WorktypeLogic
 * @package app\common\model\logic
 */
class WorktypeLogic
{
    public function getWorkTypeList($data)
    {
        $order = '';
        if (isset($data['order']) && $data['order']) {
            $order = $data['order'];
        }
        $where['company_id'] = session('userInfo.company_id');
        $where['is_del'] = StationStatus::DEL_STATUS_TRUE;
        //获取总条数
        $count = model('model/db/worktype')->getWorkTypeListCount($where);
        if ($count > 0) {
            $p = new Page($count, 20);
            $show = $p->show();
            $list = model('model/db/worktype')->getWorkTypeList($where, $p->firstRow, $p->listRows, $order);
            //处理续费数据
            return ['list' => $list, 'page' => $show];
        }
    }

    /**
     * 获取单条数据
     * @param $id
     * @return mixed
     */
    public function getWorktypeInfo($id)
    {
        return model('model/db/worktype')->getWorktypeInfo($id);
    }

    public function delWorktypeInfo($id)
    {
        return model('model/db/worktype')->del($id);
    }

    public function editWorkType($data)
    {
        $save = [
            'update_time' => time(),
            'op_uid' => session('userInfo.id'),
            'company_id' => session('userInfo.company_id'),
            'name' => $data['type_name'],
        ];
        if ($data['edit_id']) {
            //编辑
            return model('model/db/worktype')->save($save, ['id' => $data['edit_id']]);
        } else {
            //新增
            $save['create_time'] = time();
            return model('model/db/worktype')->add($save);
        }
    }

    /**
     * 验证能否添加
     * @param $data
     */
    public function checkWorkType($data)
    {
        if (isset($data['type_name']) && $data['type_name']) {
            $where[] = ['name', '=', $data['type_name']];
            $where[] = ['is_del', '=', StationStatus::DEL_STATUS_TRUE];
            $where[] = ['company_id', '=', session('userInfo.company_id')];
            $info = model('model/db/worktype')->where($where)->find();
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
     * 获取工种列表 , 用于下拉框
     */
    public function worktypeSelect()
    {
        $where = [
            ['company_id', '=', session('userInfo.company_id')],
            ['is_del', '=', StationStatus::DEL_STATUS_TRUE],
        ];
        return model('model/db/worktype')->getWorktypeSelectList($where, 'id,name');
    }
}