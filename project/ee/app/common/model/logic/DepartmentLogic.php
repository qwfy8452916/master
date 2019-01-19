<?php
namespace app\common\model\logic;
use Util\Page;

class DepartmentLogic
{
    public function getDepartment($company_id,$order){
        $where['company_id'] = $company_id;
        //获取总条数
        $count = model('model/db/department')->getDepartmentCount($where);

        if($count>0){
            $p = new Page($count,20);
            $show = $p->show();

            $list = model('model/db/department')->getDepartment($where,$p->firstRow, $p->listRows,$order);
            //处理续费数据
            return ['list' => $list, 'page' => $show];
        }
    }

    public function hasDepartment($dept_name,$company_id){
        $where['dept_name'] = $dept_name;
        $where['company_id'] = $company_id;
        $result =model('model/db/department')->hasDepartment($where);
       return $result;
    }

    public function addDepartment($dept_name,$dept_desc,$company_id){
        $save['dept_name'] = $dept_name;
        $save['dept_depict'] = $dept_desc;
        $save['company_id'] = $company_id;
        $save['create_time'] = time();
        $result =model('model/db/department')->add($save);
        return $result;
    }

    public function editDepartment($dept_name,$dept_desc,$dept_id){
        $save['dept_name'] = $dept_name;
        $save['dept_depict'] = $dept_desc;
        $save['update_time'] = time();
        $where['id'] = $dept_id;
        $result =model('model/db/department')->edit($save,$where);
        return $result;
    }

    public function forbidDepartment($dept_status,$dept_id){
        $save['dept_status'] = $dept_status;
        $save['update_time'] = time();
        $where['id'] = $dept_id;
        $result = model('model/db/department')->edit($save,$where);
        return $result;
    }

    public function delDepartment($dept_id){
        $where['id'] = $dept_id;
        $result = model('model/db/department')->del($where);
        return $result;
    }


    /**
     * 获取部门列表 , 用于下拉框
     */
    public function departmentSelect()
    {
        $where = [
            'company_id' => ['=', session('userInfo.company_id')],
            'dept_status' => ['=', 1]
        ];
        $result = model('model/db/department')->getDeptList($where);
        foreach ($result as $k => $v) {
            unset($result[$k]['dept_status']);
            unset($result[$k]['company_id']);
            unset($result[$k]['create_time']);
            unset($result[$k]['update_time']);
        }
        return $result;
    }

    /**
     * 获取部门列表 , 用于移动端下拉框
     */
    public function mobileDepartmentSelect()
    {
        $where = [
            'company_id' => ['=', session('userInfo.company_id')],
            'dept_status' => ['=', 1]
        ];
        $result = model('model/db/department')->getDeptList($where);
        $returnData = [];
        foreach ($result as $k => $v) {
            $returnData[$k]['label'] = $v['dept_name'];
            $returnData[$k]['value'] = $v['id'];
            unset($result[$k]);
        }
        return $returnData;
    }
}