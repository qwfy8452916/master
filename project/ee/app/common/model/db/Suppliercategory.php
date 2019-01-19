<?php
namespace app\common\model\db;
use \think\Db;
use think\Model;

class SupplierCategory extends Model{
    protected $table = 'qz_yxb_supplier_category';

    public function getSupplierCategory($where,$page,$pageCount,$order=1){
        if($order == 2){
            $order = 'a.add_time desc';
        }else{
            $order = 'a.add_time';
        }
        $map[] = ['a.company_id','=',$where['company_id']];
        return $this->alias('a')->field('a.id,a.category_name,a.add_time,FROM_UNIXTIME(a.add_time) as add_time,count(c.id) as amount')
            ->leftJoin('qz_yxb_supplier_category_link b','a.id = b.category_id')
            ->leftJoin('qz_yxb_supplier c','c.id = b.supplier_id')
            ->where($map)
            ->group('a.id')
            ->order($order)
            ->limit($page,$pageCount)
            ->select();
    }

    public function getCategory($where){

        return $this->alias('a')->field('a.id,a.category_name')
            ->where('a.company_id','=',$where['company_id'])
            ->leftJoin('qz_yxb_supplier_category_link b','a.id = b.category_id')
            ->group('a.id')
            ->select();
    }

    public function getCategoryAndSupplier($where){

        return $this->alias('a')
            ->field('a.id,a.category_name,c.id as cid,c.name')
            ->where('a.company_id','=',$where['company_id'])
            ->leftJoin('qz_yxb_supplier_category_link b','a.id = b.category_id')
            ->leftJoin('qz_yxb_supplier c','c.id = b.supplier_id')
            ->select();
    }
    
    public function getSupplierCategoryCount($where){
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

    public function hasSupplierCategory($where){
        return $this->where($where)->find();
    }


    public function getmCategory($id,$company_id){

        $map[] = ['c.company_id','=',$company_id];
        if(!empty($id)&&isset($id)){
            $map[] = ['a.category_id','=',$id];
            return  Db::name("yxb_supplier")->alias('c')
                ->field('c.*')
                ->leftJoin('qz_yxb_supplier_category_link a','c.id = a.supplier_id')
                ->where($map)
                ->select();
        }else{
            Db::name("yxb_supplier")->alias('c')->where($map)->select();
        }

    }

}