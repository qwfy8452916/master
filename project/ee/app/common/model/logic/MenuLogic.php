<?php

namespace app\common\model\logic;

/**
 * 权限菜单
 * Class MenuLogic
 * @package app\common\model\logic
 */
class MenuLogic
{

    public function getMenuList()
    {
        $list = model('common/db/Menu')->getMenuList();
        return ['list' => $list, 'tree_list' => build_tree(0, $list, 'parent_id')];
    }

    public function getRbacMenuList()
    {
        $map['company_id'] = session('userInfo.company_id');
        $map['id'] = session('userInfo.id');
        $list = model('common/db/Menu')->getAccountMenu($map);
        return $list;
    }

    public function getMenuInfo($url){
        return model('common/db/Menu')->getMenuInfo($url);
    }

    public function checkMenu($url,$menus)
    {
        if (isset($url) && !empty($url)) {
            foreach ($menus as $v){
                if($v['link'] == $url){
                    return true;
                }
            }
            return false;
        }else{
            return false;
        }

    }

    public function saveMenu($station_id, $data)
    {
        //判断是否是编辑过来的
        if (isset($data['edit_id']) && $data['edit_id']) {
            //编辑的岗位id保留
            $station_id = $data['edit_id'];
            //如果是编辑 ,就先删除所有数据,再做添加
            $map['station_id'] = $data['edit_id'];
            model('common/db/Menu')->delStationMenu($map);
        }
        if (isset($data['postInstall']) && count($data['postInstall']) > 0) {
            $save = [];
            foreach ($data['postInstall'] as $k => $v) {
                $save[] = [
                    'station_id' => $station_id,
                    'menu_id' => $v
                ];
            }
            return model('common/db/Menu')->saveStationMenu($save);
        } else {
            return true;
        }
    }
}