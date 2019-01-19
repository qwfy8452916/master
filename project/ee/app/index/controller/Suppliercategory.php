<?php
namespace app\index\controller;
use app\common\controller\CommonBase;
use app\common\model\logic\SuppliercategoryLogic;
use app\common\model\logic\LogLogic;
use app\common\enums\ErrorCode;

/**
 * PC端部门管理
 * Class Install
 * @package app\index\controller
 */
class Suppliercategory extends CommonBase
{
    public $company_id;
    public function initialize()
    {
        parent::initialize(); 
        $this->company_id = session('userInfo.company_id');
    }


    public function index(SuppliercategoryLogic $SuppliercategoryLogic){
        $order = input('get.order');
        if(!empty($order)&&isset($order)){
            $this->assign('order',$order);
        }else{
            $this->assign('order',1);
        }

        $info = $SuppliercategoryLogic->getSupplierCategory($this->company_id,$order);
        $this->assign('list',$info['list']);
        $this->assign('page',$info['page']);
        return $this->fetch();
    }

    public function add(SuppliercategoryLogic $SuppliercategoryLogic,LogLogic $LogLogic){
            $post = input('post.');
            // 判断是否已存在
            $category_name = trim($post['category_name']);
            //验证不能为空
            if(!$category_name){
                return json(['status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'请输入供应商分类名称']);
            }

            $exist = $SuppliercategoryLogic->hasSupplierCategory($category_name,$this->company_id);
            if($post['category_id']){
                //编辑
                if($exist){
                    if($exist['id'] != $post['category_id']){
                        return json(['status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'该供应商分类已存在']);
                    }
                }
                $result = $SuppliercategoryLogic->editSupplierCategory($category_name,$post['category_id']);
                if($result){
                    // 添加日志
                    $LogLogic->addLog(2,$post);
                }
            }else{
                //添加
                if($exist['id']){
                    return json(['status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'该供应商分类已存在']);
                }
                $result = $SuppliercategoryLogic->addSupplierCategory($category_name,$this->company_id);
                if($result){
                    // 添加日志
                    $LogLogic->addLog(1,$post);
                }
            }

        if($result){
            return json(['status'=>ErrorCode::SUCCESS]);
        }else{
            return json(['status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'编辑失败']);
        }

    }




    public function delete(SuppliercategoryLogic $SuppliercategoryLogic,LogLogic $LogLogic){
        $post = input('post.');
        $category_id = $post['category_id'];
        $result = $SuppliercategoryLogic->delSupplierCategory($category_id);
        if($result){
            $LogLogic->addLog(3,$post);
            return json()->data(array('status'=>ErrorCode::SUCCESS,'info'=>'删除成功'));
        }else{
            return json()->data(array('status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'删除失败'));
        }
    }

    //根据供应商分类获取供应商
    public function getmCategory(SuppliercategoryLogic $SuppliercategoryLogic){
        //供应商分类
        if($this->request->isAjax()){
            $category_id = input('get.id');
            $data = $SuppliercategoryLogic->getmCategory($category_id,$this->company_id);
            return json(['error_code'=>ErrorCode::SERVICE_MYSQL_ERROR,'data'=>$data]);
        }
    }

}