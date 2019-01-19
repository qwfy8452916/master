<?php

namespace app\common\model\logic;

use app\common\enums\StationStatus;
use Util\Page;

class StationLogic
{

    public function getStationList($data)
    {
        $map = $this->stationMap($data);
        $field = 's.*,a.is_del,GROUP_CONCAT(a.id) as iid';
        $count = model('common/db/Station')->getStationListCount($map, $field);
        if ($count > 0) {
            $p = new Page($count, 20);
            $show = $p->show();
            $list = model('common/db/Station')->getStationList($map, $field, $p->firstRow, $p->listRows);
            return ['list' => $list, 'page' => $show];
        }
        return [];
    }

    /**
     * 岗位禁用 /启用
     * @param $data
     * @return bool
     */
    public function changeStation($data)
    {
        $map = $this->stationMap($data);
        $save = ['update_time' => time()];
        if (isset($data['status']) && $data['status']) {
            if ($data['status'] == 1) {
                $save['status'] = 2;
            } else {
                $save['status'] = 1;
            }
        }
        return model('common/db/Station')->save($save, $map);
    }

    /**
     * 获取单条数据
     * @param $data
     * @return array
     */
    public function getStationInfo($data)
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
                    $map = $this->stationMap($data);
                    $list = model('common/db/Station')->getStationInfo($map);
                    foreach ($list as $k=>$v){
                        $list[$k]['menus_array'] = explode(',',$v['menus']);
                    }
                    return $list;
                }
                break;
        }
    }

    public function delStation($data)
    {
        $map = $this->stationMap($data);
        return model('common/db/Station')->where($map)->delete();
    }

    public function checkStation($data)
    {
        if (isset($data['postName']) && $data['postName']) {
            $where[] = ['name', '=', trim($data['postName'])];
            $where[] = ['company_id', '=', session('userInfo.company_id')];
            $info = model('model/db/station')->where($where)->find();
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
     * 保存数据
     * @param $data
     * @return bool|int|string
     */
    public function saveStation($data)
    {
        $save = [
            'update_time' => time(),
            'op_uid' => session('userInfo.id'),
            'company_id' => session('userInfo.company_id'),
            'name' => $data['postName'],
        ];
        if (isset($data['edit_id']) && $data['edit_id']) {
            return model('common/db/Station')->save($save, ['id' => $data['edit_id']]);
        } else {
            $save['create_time'] = time();
            return model('common/db/Station')->insertGetId($save);
        }
    }

    /**
     * 获取岗位列表 , 用于下拉框
     */
    public function stationSelect()
    {
        $where = [
            'company_id' => ['=', session('userInfo.company_id')],
            'status' => ['=', StationStatus::DATA_STATUS_TRUE],
        ];
        $result = model('model/db/station')->getStationAllList($where);
        foreach ($result as $k => $v) {
            unset($result[$k]['status']);
            unset($result[$k]['company_id']);
            unset($result[$k]['create_time']);
            unset($result[$k]['update_time']);
        }
        return $result;
    }

    /**
     * 获取页面排序url
     * @return bool|string
     */
    public function getOrderUrl()
    {
        $order = input('get.order') == 'desc' ? 'order=asc&' : 'order=desc&';
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
                        $order .= $k . '=' . $v . '&';
                    }
                }
            }
        }

        return substr($order, -1) == '&' ? substr($order, 0, -1) : $order;
    }

    /**
     * 通用条件
     * @param array $data
     * @return array
     */
    public function stationMap($data = [])
    {
        $map = [
            'company_id' => session('userInfo.company_id')
        ];
        if (isset($data['edit_id']) && $data['edit_id']) {
            $map['id'] = $data['edit_id'];
        }
        if (isset($data['name']) && $data['name']) {
            $map['name'] = $data['name'];
        }
        if (isset($data['status']) && $data['status']) {
            $map['status'] = $data['status'];
        }
        if (isset($data['order']) && $data['order']) {
            $map['order'] = $data['order'];
        }
        return $map;
    }

    /**
     * 岗位下拉 , 用于移动端下拉框
     * @return array
     */
    public function mobileStationSelect()
    {
        $where = [
            'company_id' => ['=', session('userInfo.company_id')],
        ];
        $result = model('model/db/station')->getStationAllList($where);
        $returnData = [];
        foreach ($result as $k => $v) {
            $returnData[$k]['label'] = $v['name'];
            $returnData[$k]['value'] = $v['id'];
            unset($result[$k]);
        }
        return $returnData;
    }
}