<?php
namespace app\index\controller;
use app\common\controller\CommonBase;
use app\common\model\logic\DepartmentLogic;
use app\common\model\logic\LogLogic;
use app\common\enums\ErrorCode;
/**
 * PC端部门管理
 * Class Install
 * @package app\index\controller
 */
class Department extends CommonBase
{
    public $company_id;
    public function initialize()
    {
        parent::initialize();
        $this->company_id = session('userInfo.company_id');
    }

    public function index(DepartmentLogic $DepartmentLogic){
        $order = input('get.order');
        if(!empty($order)&&isset($order)){
            $this->assign('order',$order);
        }else{
            $this->assign('order',1);
        }
        $info = $DepartmentLogic->getDepartment($this->company_id,$order);
        $this->assign('list',$info['list']);
        $this->assign('page',$info['page']);
        return $this->fetch();
    }

    public function add(DepartmentLogic $DepartmentLogic,LogLogic $LogLogic){
            $post = input('post.');
            // 判断是否已存在
            $dept_name = trim($post['dept_name']);
            $dept_desc = trim($post['dept_desc']);
            $exist = $DepartmentLogic->hasDepartment($dept_name,$this->company_id);
            if($post['dept_id']){
                //编辑
                if($exist){
                    if($exist['id'] != $post['dept_id']){
                        return json(['status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'该部门已存在']);
                    }
                }
                $result = $DepartmentLogic->editDepartment($dept_name,$dept_desc,$post['dept_id']);
                if($result){
                    //添加日志
                    $LogLogic->addLog(2, $post);
                }
            }else{
                //添加
                if($exist){
                    return json(['status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'该部门已存在']);
                }
                $result = $DepartmentLogic->addDepartment($dept_name,$dept_desc,$this->company_id);
                if($result){
                    //添加日志
                    $LogLogic->addLog(1, $post);
                }
            }

        if($result){
            return json(['status'=>ErrorCode::SUCCESS]);
        }else{
            return json(['status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'编辑失败']);
        }


    }

    public function forbid(DepartmentLogic $DepartmentLogic,LogLogic $LogLogic){
        $post = input('post.');
        $dept_id = $post["dept_id"];
        $dept_status =  $post["dept_status"];
        $result = $DepartmentLogic->forbidDepartment($dept_status,$dept_id);
        if($result){
            //添加日志
            $LogLogic->addLog(4,$post);
            return json(['status'=>ErrorCode::SUCCESS,'info'=>'禁用成功']);
        }else{
            return json(['status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'禁用失败']);
        }
    }


    public function delete(DepartmentLogic $DepartmentLogic,LogLogic $LogLogic){
        $post = input('post.');
        $dept_id = input('post.dept_id');
        $result = $DepartmentLogic->delDepartment($dept_id);
        if($result){
            //删除日志
            $LogLogic->addLog(3,$post);
            return json()->data(array('status'=>ErrorCode::SUCCESS,'info'=>'删除成功'));
        }else{
            return json()->data(array('status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'删除失败'));
        }
    }

}