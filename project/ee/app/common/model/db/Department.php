<?php
namespace app\common\model\db;
use \think\Db;
use think\Model;

class Department extends Model{
    protected $table = 'qz_yxb_department';

    public function getDepartment($where,$page,$pageCount,$order=1){
        if($order == 2){
            $order = 'a.create_time desc';
        }else{
            $order = 'a.create_time';
        }

        $map[]  = ['a.company_id','=',$where['company_id']];
        return $this->alias('a')->field('a.id,a.dept_name,a.dept_depict,a.company_id,a.dept_status,FROM_UNIXTIME(a.create_time) as add_time,count(c.id) as amount')
            ->leftJoin('qz_yxb_account_info b','b.dept_id = a.id')
            ->leftJoin('qz_yxb_account c','c.id = b.account_id and c.class_type=2 and is_del=1')
            ->where($map)
            ->group('a.id')
            ->order($order)
            ->limit($page,$pageCount)
            ->select();
    }

    public function getDepartmentCount($where){
        return $this->where($where)->count();
    }

    public function add($save){
        return $this->insert($save);
    }

    public function edit($save,$where){
        return  $this->update($save,$where);
    }

    public function del($where){
       return $this->where($where)->delete();
    }

    public function hasDepartment($where){
        return $this->where($where)->find();
    }

    public function getDeptList($where){
        return $this->where($where)->select();
    }
}