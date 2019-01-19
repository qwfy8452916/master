<?php
namespace app\index\controller;
use app\common\controller\CommonBase;
use app\common\model\logic\LogLogic;
use app\common\model\logic\SupplierLogic;
use app\common\model\logic\SuppliercategoryLogic;
use app\common\model\logic\CityLogic;
use app\common\enums\ErrorCode;

/**
 * PC端部门管理
 * Class Install
 * @package app\index\controller
 */
class Supplier extends CommonBase
{
    public $company_id;
    public function initialize()
    {
        parent::initialize(); // 
        $this->company_id = session('userInfo.company_id');
    }


    public function index(SupplierLogic $SupplierLogic,SuppliercategoryLogic $SuppliercategoryLogic){
        $order = input('get.order');
        $name = input('get.suppliername');
        $category = input('get.categoryid');
        $contact_name = input('get.c_person');

        if(!empty($order)&&isset($order)){
            $this->assign('order',$order);
        }else{
            $this->assign('order',1);
        }

        //获取首页列表数据
        $info = $SupplierLogic->getSupplier($this->company_id,$order,$name,$category,$contact_name);
        $payType = $SupplierLogic->getPayType();
        //获取装修公司所有供应商分类
        $category = $SuppliercategoryLogic->getCategory($this->company_id);
        
        $this->assign('category',$category);
        $this->assign('payType',$payType);
        $this->assign('list',$info['list']);
        $this->assign('page',$info['page']);
        return $this->fetch();
    }

    public function addsupplier(SupplierLogic $SupplierLogic,SuppliercategoryLogic $SuppliercategoryLogic,CityLogic $CityLogic){
        $supplier_id = input('get.edit_id');
        //获取装修公司所有供应商分类
        $category = $SuppliercategoryLogic->getCategory($this->company_id);

        if($supplier_id){
            //获取供应商信息
            $info["supplier"] = $SupplierLogic->getSupplierInfo($supplier_id);
            //获取供应商银行信息
            $info["bank"] = $SupplierLogic->getSupplierBankInfo($supplier_id);
            $this->assign("info",$info);
        }
        $payType = $SupplierLogic->getPayType();

        $this->assign("payType",$payType);
        $this->assign("category",$category);
        return $this->fetch();
    }

    public function supplier_detail(SupplierLogic $SupplierLogic){
        $supplier_id = input('get.id');
        //获取供应商信息
        $info["supplier"] = $SupplierLogic->getSupplierInfo($supplier_id);
        //获取供应商银行信息
        $info["bank"] = $SupplierLogic->getSupplierBankInfo($supplier_id);

        $payType = $SupplierLogic->getPayType();
        $this->assign("payType",$payType);
        $this->assign("info",$info);
        return $this->fetch();
    }

    public function add(SupplierLogic $SupplierLogic,LogLogic $LogLogic){
        $post = input('post.');
        //格式处理
        foreach($post['data'] as $val){
            $supplierList[$val['name']] = $val["value"];
        }

        $supplier['name'] = isset($supplierList['staffname'])?trim($supplierList['staffname']):'';
        $supplier['province'] = isset($supplierList['province'])?$supplierList['province']:'';
        $supplier['city'] = isset($supplierList['city'])?$supplierList['city']:'';
        $supplier['address'] = isset($supplierList['add_detail'])?$supplierList['add_detail']:'';
        $supplier['contact_name'] = isset($supplierList['link_name'])?$supplierList['link_name']:'';
        $supplier['contact_tel'] = isset($supplierList['phonenumber'])?$supplierList['phonenumber']:'';
        $supplier['contact_wx'] = isset($supplierList['weixinnumber'])?$supplierList['weixinnumber']:'';
        $supplier['contact_email'] = isset($supplierList['email'])?$supplierList['email']:'';
        $supplier['pay_way'] =  isset($supplierList['pay_methods'])?$supplierList['pay_methods']:'';
        $supplier['ali_account'] =  isset($supplierList['pay_zfb'])?$supplierList['pay_zfb']:'';
        $supplier['wx_account'] =  isset($supplierList['pay_wx'])?$supplierList['pay_wx']:'';
        $supplier_id =  isset($supplierList['supplier_id'])?$supplierList['supplier_id']:'';

        if($supplier_id){
            //编辑
            // 判断是否已存在
            $exist = $SupplierLogic->hasSupplier($supplier['name'],$this->company_id);
            if($exist){
                if($exist['id'] !=   $supplier_id){
                    return json(['status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'该供应商已存在']);
                }
            }
           $result =  $SupplierLogic->editSupplierInfo($supplier_id,$supplier,$post,$this->company_id);
            if($result){
                //添加日志
                $LogLogic->addLog(1, $post);
            }
        }else{
            //添加
            // 判断是否已存在
            $exist = $SupplierLogic->hasSupplier($supplier['name'],$this->company_id);
            if($exist){
                return json(['status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'该供应商已存在']);
            }

            $result = $SupplierLogic->addSupplierInfo($supplier,$post,$this->company_id);
            if($result){
                //编辑日志
                $LogLogic->addLog(2, $post);
            }
        }

        if($result){
            return json(['status'=>ErrorCode::SUCCESS]);
        }else{
            return json(['status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'编辑失败']);
        }

    }


    public function delete(SupplierLogic $SupplierLogic,LogLogic $LogLogic){
        $post = input('post.');
        $supplier_id = input('post.supplier_id');
        $result = $SupplierLogic->delSupplier($supplier_id,$this->company_id);
        if($result){
            //删除日志
            $LogLogic->addLog(2, $post);
            return json()->data(array('status'=>ErrorCode::SUCCESS,'info'=>'删除成功'));
        }else{
            return json()->data(array('status'=>ErrorCode::SERVICE_MYSQL_ERROR,'info'=>'删除失败'));
        }
    }

    public function getcitys(CityLogic $CityLogic){
        //获取省市信息
        $city = $CityLogic->getProvinceAndCity();

        return json()->data(array('status'=>ErrorCode::SUCCESS,'data'=>$city));
    }

}