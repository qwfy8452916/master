<?php
namespace app\common\model\logic;
use Util\Page;
use think\Db;

class SupplierLogic
{
//1.月结 2.及时付款 3.季度结 4.其他

    protected $status = [1=>'月结',2=>'及时付款',3=>'季度结',4=>'其他'];

    public function getPayType(){
        return $this->status;
    }

    public function getSupplier($company_id,$order,$name,$category,$contact_name){
        $where['supplier_name'] = $name;
        $where['category_id'] = $category;
        $where['contact_name'] = $contact_name;
        $where['company_id'] = $company_id;
        //获取总条数
        $count = model('model/db/supplier')->getSupplierCount($where);
        if($count>0){
            $p = new Page($count,20);
            $show = $p->show();
            $list = model('model/db/supplier')->getSupplier($where,$p->firstRow, $p->listRows,$order);
            if(!empty($list)&&isset($list)){
                foreach($list as $key=>$val){
                    if(!empty($val["category_names"])&&isset($val["category_names"])){
                        $list[$key]["category_names"] = str_replace(",","、",$val["category_names"]);
                    }
                }
            }
            //处理续费数据
            return ['list' => $list, 'page' => $show];
        }
    }



    public function hasSupplier($supplier_name,$company_id){
        $where['name'] = $supplier_name;
        $where['company_id'] = $company_id;
        $result =model('model/db/supplier')->hasSupplier($where);
        if(count($result)>0){
            return $result[0];
        }else{
            return [];
        }
    }

    /**
     * 单条供应商信息
     * @param $supplier_id
     * @return mixed
     */
    public function getSupplierInfo($supplier_id){
        $where['id'] =  $supplier_id ;
        $supplier =  model('model/db/supplier')->hasSupplier($where);
        $supplier[0]['category_ids'] = explode(",",$supplier[0]['category_ids']);
        $supplier[0]['category_mnames']  =  str_replace(",","/",$supplier[0]['category_names']);
        $supplier[0]['category_names']  =  explode(",",$supplier[0]['category_names']);
        $info["supplier"] = $supplier[0];
        return  $info["supplier"];
    }




    public function getSupplierBankInfo($supplier_id){
        $where['supplier_id'] =  $supplier_id ;
        return model('model/db/supplier')->hasSupplierBank($where);
    }

    public function addSupplier($supplier,$company_id){
        $supplier['add_time'] = time();
        $supplier['company_id'] = $company_id;
        $result =model('model/db/supplier')->add($supplier);
        return $result;
    }

    /**
     * 编辑供应商页
     * @param $supplier_id
     * @param $supplier
     * @param $post
     * @param $company_id
     * @return bool
     */
    public function editSupplierInfo($supplier_id,$supplier,$post,$company_id){
        //添加数据到yxb_supplier表
        $result = $this->editSupplier($supplier,$supplier_id);
        if($result){
            //删除yxb_supplier_category_link表数据
            $this->delSupplierLink($supplier_id,$company_id);
            //添加数据到yxb_supplier_category_link表
            if(!empty($post['category'])&&isset($post['category'])){
                $this->addSupplierLink($post['category'], $supplier_id,$company_id);
            }
            //删除yxb_supplier_bank表
            $this->delSupplierBank($supplier_id,$company_id);
            //添加数据到yxb_supplier_bank表
            if(!empty($post['bank'])&&isset($post['bank'])){
                $this->addSupplierBank($post['bank'],$supplier_id,$company_id);
            }
            return true;
        }else{
            return false;
        }
    }

    public function addSupplierInfo($supplier,$post,$company_id){

        //添加数据到yxb_supplier表
        $supplier_id = $this->addSupplier($supplier,$company_id);
        if($supplier_id){
            //添加数据到yxb_supplier_category_link表
            if(!empty($post['category'])&&isset($post['category'])){
                $this->addSupplierLink($post['category'], $supplier_id,$company_id);
            }

            //添加数据到yxb_supplier_bank表
            if(!empty($post['bank'])&&isset($post['bank'])){
                $this->addSupplierBank($post['bank'],$supplier_id,$company_id);
            }
            return json(['status'=>1]);
        }else{
            return json(['status'=>0,'info'=>'编辑失败']);
        }
    }

    public function editSupplier($supplier,$supplier_id){
        $supplier['update_time'] = time();
        $where['id'] = $supplier_id;
        $result =model('model/db/supplier')->edit($supplier,$where);
        return $result;
    }


    public function delSupplier($supplier_id,$company_id){
        // 启动事务
        $lock = true;
        model('model/db/supplier')->startTrans();
        try {
            //删除供应商表
            model('model/db/supplier')->del(["id"=>$supplier_id,'company_id'=>$company_id]);
            //删除供应商与分类关联表
            model('model/db/supplier')->delWithCategory(['company_id'=>$company_id,'supplier_id'=>$supplier_id]);
            //删除供应商与银行关联表
            model('model/db/supplier')->delWithBank(['company_id'=>$company_id,'supplier_id'=>$supplier_id]);
            $lock = true;
            // 提交事务
            model('model/db/supplier')->commit();
        } catch (\Exception $e) {
            $lock = false;
            // 回滚事务
            model('model/db/supplier')->rollback();
        }finally{
            return $lock;
        }
    }

    public function addSupplierLink($category, $supplier_id,$company_id){
        //批量插入  处理关联信息
        foreach($category as $key=>$val){
            $save[$key]["category_id"] = $val;
            $save[$key]["supplier_id"] = $supplier_id;
            $save[$key]["company_id"] = $company_id;
            $save[$key]['add_time'] = time();
        }
        $result = model('model/db/supplier')->addSupplierLink($save);
        return $result;
    }

    public function addSupplierBank($bank_info,$supplier_id,$company_id){
        //批量插入 处理银行信息
        foreach($bank_info as $key=>$val){
            $save[$key]["bank_name"] = $val["bankname"];
            $save[$key]["bank_open"] = $val["bankopen"];
            $save[$key]["bank_account"] = $val["bankaccount"];
            $save[$key]["supplier_id"] = $supplier_id;
            $save[$key]["company_id"] = $company_id;
            $save[$key]["add_time"] = time();
        }

        $result = model('model/db/supplier')->addSupplierBank($save);
        return $result;
    }

    public function delSupplierLink($supplier_id,$company_id){
        $where['supplier_id'] = $supplier_id;
        $where['company_id'] = $company_id;
        $result = model('model/db/supplier')->delSupplierLink($where);
        return $result;
    }

    public function delSupplierBank($supplier_id,$company_id){
        $where['supplier_id'] = $supplier_id;
        $where['company_id'] = $company_id;
        $result = model('model/db/supplier')->delSupplierBank($where);
        return $result;
    }

    public function getCompanySupplier($id){
        $where['company_id'] = $id;
       return $result = model('model/db/supplier')->getCompanySupplier($where);
    }

    /**
     * 移动端首页数据
     * @param $company_id
     * @param $supplier_name
     * @param $contact_name
     * @param $phone
     */
    public function getmSupplier($company_id,$supplier_name){
        $where['supplier_name'] = $supplier_name;
        $where['company_id'] = $company_id;
        //获取总条数
        $count = model('model/db/supplier')->getmSupplierCount($where);
        if($count>0){
            $p = new Page($count,10);
            $show = $p->getPage();
            $list = model('model/db/supplier')->getmSupplier($where,$p->firstRow, $p->listRows);

            $payType = $this->getPayType();
            foreach($list as $key=>$val){
                $list[$key]['pay_way'] = $payType[$val['pay_way']];
                $list[$key]['category_names'] = str_replace(',','/',$val['category_names']);
            }
            //处理续费数据
            return ['list' => $list, 'page' => $show];
        }
    }


}