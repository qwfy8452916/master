<?php
namespace app\index\controller;

use app\common\controller\CommonBase;
use app\common\enums\ErrorCode;
use app\common\model\logic\MaterialLogic;
use app\common\model\logic\SuppliercategoryLogic;
use app\common\model\logic\SupplierLogic;
use app\common\model\logic\OrderLogic;
use app\common\model\logic\LogLogic;

/**
 * PC端材料
 * Class Material
 * @package app\index\controller
 */
class Material extends CommonBase
{
    public $company_id;
    public function initialize()
    {
        parent::initialize();
        $this->company_id = session('userInfo.company_id');
    }

    // 材料进销
    public function index(MaterialLogic $MaterialLogic){
        $post = input('get.');
        $where["erp_id"]  = isset($post["ordercode"])?trim($post["ordercode"]):'';
        $where["yzname"]  = isset($post["yzname"])?trim($post["yzname"]):'';
        $where["supplier_name"]  = isset($post["gys"])?trim($post["gys"]):'';
        $where["material_name"]  = isset($post["cl"])?trim($post["cl"]):'';
        $where["code"]  = isset($post["piaoju"])?preg_replace('# #','',$post["piaoju"]):'';
        $info = $MaterialLogic->getMaterialOrder( $this->company_id,$where);
        if($this->request->isAjax()){
            return json(['error_code'=>0,'data'=>$info['list'],'page'=>$info['page']]);
        }else{
            $this->assign('list',$info['list']);
            $this->assign('page',$info['page']);
            return $this->fetch();
        }

    }

    // 添加
    public function add(MaterialLogic $MaterialLogic,SuppliercategoryLogic $SuppliercategoryLogic,SupplierLogic $SupplierLogic,OrderLogic $OrderLogic){
         $m_order_id = input('get.edit_id');
         if(!empty($m_order_id)&&isset($m_order_id)){
            //获取材料订单信息
             //获取材料信息
            $info = $MaterialLogic->getMaterialOrderOne($m_order_id,$this->company_id);
            $orderInfo = $OrderLogic->searchOrderSample(['order_no_accurate'=>$info["erp_order_id"]],session('userInfo'));
            if(!empty($orderInfo)){
                $orderInfo =  $orderInfo->toArray();
            }
            $this->assign('orderinfo',$orderInfo);
            $this->assign('info',$info);
         }else{
            $this->assign('info',0);
         }
        //供应商分类
        $category = $SuppliercategoryLogic-> getCategoryAndSupplier($this->company_id);
        //供应商
        $supplier = $SupplierLogic->getCompanySupplier($this->company_id);
        //获取公司信息
        $orders = $OrderLogic->searchOrderSample('',session('userInfo'));
        $orderList = [];
        foreach($orders as $val){
            $orderList[$val["order_no"]] = $val;
        }
        unset($orders);

        $this->assign('orders',$orderList);
        $this->assign('category',$category);
        $this->assign('supplier',$supplier);

        return $this->fetch();
    }

    /**
     * 通过订单号获取订单信息
     */
    public function getorder(OrderLogic $orderLogic){
        if($this->request->isAjax()){
            $erp_id = input('get.erp_id');
            //获取公司信息
            if(!empty($erp_id)&&isset($erp_id)){
                $orders = $orderLogic->searchOrderSample(['order_no_accurate'=>$erp_id],session('userInfo'));
                if(!empty($orders)&&isset($orders)){
                    return json(['error_code'=>0,'data'=>$orders]); //成功
                }
            }
            return json(['error_code'=>1]);
        }
    }



    // 详情
    public function detail(MaterialLogic $MaterialLogic,OrderLogic $OrderLogic){
        $m_order_id = input('get.id');
        if(!empty($m_order_id)&&isset($m_order_id)){
            //获取材料订单信息
            //获取材料信息
            $info = $MaterialLogic->getMaterialOrderOne($m_order_id,$this->company_id);
            $info['supplier_name'] = isset($info['name'])?$info['name']:$info['supplier_name'];
            $orders = $OrderLogic->searchOrderSample(['order_no_accurate'=>$info['erp_order_id']],session('userInfo'));
            if(!empty($orders)&&isset($orders)){
                $orders = $orders->toArray();
            }
            $this->assign("info",$info);
            $this->assign("orders",$orders);
            //获取公司信息
        }else{
            $this->error('信息不全');
        }
        return  $this->fetch();
    }

    //编辑 edit
    public function edit(MaterialLogic $MaterialLogic,LogLogic $LogLogic){
        $post  = input('post.');
        //必填项
        if(!empty($post['erp_id'])&&isset($post['erp_id'])){
            $erp_id = $post['erp_id'];
        }else{
            return json(['error_code'=> ErrorCode::PARAMETER_LACK,'error_msg'=>"缺少订单"]); //成功
        }

        if(!empty($post['supplier'])&&isset($post['supplier'])){
            $supplier = $post['supplier'];
        }else{
            return json(['error_code'=> ErrorCode::PARAMETER_LACK,'error_msg'=>"缺少供应商"]); //成功
        }

        if(!empty($post['material'])&&isset($post['material'])){
            //检查是否为空
            $material = $post['material'];
            $checkResult = $MaterialLogic->checkMaterial($material);
            if(!$checkResult){
                return json(['error_code'=> ErrorCode::PARAMETER_LACK,'error_msg'=>"缺少材料信息"]); //成功
            }
        }else{
            return json(['error_code'=> ErrorCode::PARAMETER_LACK,'error_msg'=>"缺少材料信息"]); //成功
        }

        $category = isset($post['category'])?$post['category']:'';
        $material_id = isset($post['material_id'])?$post['material_id']:'';
        $suppliername = isset($post['suppliername'])?$post['suppliername']:'';
        if(!empty($material_id)&&isset($material_id)){
            //编辑
            $result = $MaterialLogic->editMaterial($material_id,$erp_id,$category,$supplier,$suppliername,$material,$this->company_id);
            if($result){
                //编辑日志
                $LogLogic->addLog(2, $post);
            }
        }else{
            //添加
            $result = $MaterialLogic->addMaterial($erp_id,$category,$supplier,$suppliername,$material,$this->company_id);
            if($result){
            //添加日志
                $LogLogic->addLog(1, $post);
            }
        }

        if($result){
            return json(['error_code'=>ErrorCode::SUCCESS]); //成功
        }else{
            return json(['error_code'=>ErrorCode::SERVICE_MYSQL_ERROR,'error_msg'=>'操作失败']);
        }
    }

    /**
     * 修改到货状态
     */
    public function editstate(MaterialLogic $MaterialLogic,LogLogic $LogLogic){
        if($this->request->isAjax()){
            $post =  input('post.');
            $mid = input('post.mid');
            if(!empty($mid)&&isset($mid)){
                //编辑状态
                $result = $MaterialLogic->editState($mid,$this->company_id);
                if($result){
                    //编辑日志
                    $LogLogic->addLog(2, $post);
                    return json(['error_code'=>ErrorCode::SUCCESS]);
                }else{
                    return json(['error_code'=>ErrorCode::SERVICE_MYSQL_ERROR,'error_msg'=>'操作失败']);
                }

            }else{
                return json(['error_code'=> ErrorCode::PARAMETER_LACK,'error_msg'=>"操作失败"]); //成功
            }

        }
    }

    /**
     * 删除材料进销信息
     */
    public function del(MaterialLogic $MaterialLogic,LogLogic $LogLogic){
        if($this->request->isAjax()){
            $post = input('post.');
            $oid = input('post.oid');
            if(!empty($oid)&&isset($oid)){
                $result = $MaterialLogic->del($oid,$this->company_id);
                if($result['order']){
                    //删除日志
                    $LogLogic->addLog(3, $post);
                    return json(['error_code'=>ErrorCode::SUCCESS]);
                }else{
                    return json(['error_code'=>ErrorCode::SERVICE_MYSQL_ERROR,'error_msg'=>'操作失败']);
                }
            }else{
                return json(['error_code'=> ErrorCode::PARAMETER_LACK,'error_msg'=>"操作失败"]); //成功
            }
        }
    }

    public function delmaterial(MaterialLogic $MaterialLogic,LogLogic $LogLogic){
        if($this->request->isAjax()){
            $post = input('post.');
            $mid = $post["material_id"];
            $result =  $MaterialLogic->delMaterial($mid,$this->company_id);
            if($result){
                //删除日志
                $LogLogic->addLog(3, $post);
                return json(['error_code'=>ErrorCode::SUCCESS]);
            }else{
                return json(['error_code'=>ErrorCode::SERVICE_MYSQL_ERROR,'error_msg'=>'操作失败']);
            }
        }
    }


}
