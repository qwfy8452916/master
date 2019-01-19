<?php
namespace app\common\model\logic;
use Util\Page;

class SuppliercategoryLogic
{
    public function getSupplierCategory($company_id,$order){
        $where['company_id'] = $company_id;
        //获取总条数

        $count = model('model/db/suppliercategory')->getSupplierCategoryCount($where);

        if($count>0){
            $p = new Page($count,20);
            $show = $p->show();
            $list = model('model/db/suppliercategory')->getSupplierCategory($where,$p->firstRow, $p->listRows,$order);
            //处理续费数据
            return ['list' => $list, 'page' => $show];
        }
    }

    /**
     * 获取装修公司所有供应商分类
     */
    public function getCategory($company_id){
        $where['company_id'] = $company_id;
        return model('model/db/suppliercategory')->getCategory($where);
    }


    /**
     * 获取装修公司所有供应商和公司
     */
    public function getCategoryAndSupplier($company_id){
        $where['company_id'] = $company_id;
        $result = model('model/db/suppliercategory')->getCategoryAndSupplier($where);
        $categoryList = [];
        foreach($result as $val){
            $categoryList[$val["id"]]["id"] = $val["id"];
            $categoryList[$val["id"]]["category_name"] = $val["category_name"];
            if(!empty($val["cid"])&&isset($val["cid"])){
                $categoryList[$val["id"]]["list"][$val["cid"]]['cid'] =  $val["cid"];
                $categoryList[$val["id"]]["list"][$val["cid"]]['name'] =  $val["name"];
            }
        }

        return $categoryList;
    }


    public function hasSupplierCategory($dept_name,$company_id){
        $where['category_name'] = $dept_name;
        $where['company_id'] = $company_id;
        $result =model('model/db/suppliercategory')->hasSupplierCategory($where);
       return $result;
    }

    public function addSupplierCategory($name,$company_id){
        $save['category_name'] = $name;
        $save['company_id'] = $company_id;
        $save['add_time'] = time();
        $result =model('model/db/suppliercategory')->add($save);
        return $result;
    }

    public function editSupplierCategory($name,$category_id){
        $save['category_name'] = $name;
        $save['update_time'] = time();
        $where['id'] = $category_id;
        $result =model('model/db/suppliercategory')->edit($save,$where);
        return $result;
    }


    public function delSupplierCategory($category_id){
        $where['id'] = $category_id;
        $result = model('model/db/suppliercategory')->del($where);
        return $result;
    }

    public function getmCategory($category_id,$company_id){
        $result = model('model/db/suppliercategory')->getmCategory($category_id,$company_id);
        return $result;
    }
}