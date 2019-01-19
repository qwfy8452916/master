<?php
namespace Home\Model;

use Think\Model;

class RoleDepartmentModel extends Model{
    protected $autoCheckFields = false;
    /**
     * [get_role_list 获取角色列表]
     * @return [array] [返回数组]
     */
    public function getDepartmentRole($stat = "")
    {
        //查询条件
        if(!empty($stat)){
            $map['r.stat']=$stat;
        }
        $map["r.id"] = array("NEQ",1);

        //获取部门，并遍历重组数组
        $result = M('department')->select();
        $list = array();
        foreach ($result as $k => $v) {
            $list[$v['id']] = $v;
        }

        //获取角色，并添加到响应部门下
        $result = M('role_department')->alias('x')
                                    ->join('qz_rbac_role AS r ON r.id = x.role_id')
                                    ->where($map)
                                    ->select();
        foreach ($result as $k => $v) {
            if(!empty($list[$v['department_id']])){
                $list[$v['department_id']]['child'][] = $v;
            }
        }

        return $list;
    }

    /**
     * [add 添加数据]
     * @param [type] $data [description]
     */
    public function addRole($data){
        return M("role_department")->add($data);
    }

    /**
     * [delete 删除数据]
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function deleteRole($id){
        return M("role_department")->where(array("role_id"=>$id))->delete();
    }
}