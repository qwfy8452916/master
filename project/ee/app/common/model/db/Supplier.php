<?php
namespace app\common\model\db;
use \think\Db;
use think\Model;

class Supplier extends Model{
    protected $table = 'qz_yxb_supplier';

    public function getSupplier($where,$page,$pageCount,$order=1){
        $map[]  = ['a.company_id','=',$where['company_id']];

        if(!empty($where['supplier_name'])&&isset($where['supplier_name'])){
            $map[]  = ['a.name', 'like', '%'.$where['supplier_name'].'%'];
        }
        if(!empty($where['contact_name'])&&isset($where['contact_name'])){
            $map[]  = ['a.contact_name', 'like', '%'.$where['contact_name'].'%'];
        }

        if(!empty($where['category_id'])&&isset($where['category_id'])){
            if($order == 2){
                $order = 't.add_time desc';
            }else{
                $order = 't.add_time';
            }

            $map2 = 'find_in_set('.$where['category_id'].',t.category_ids)';
            $buildSql =  $this->alias('a')->field('a.id,a.name,a.contact_name,a.contact_tel,a.pay_way,FROM_UNIXTIME(a.add_time,"%Y-%m-%d") as add_time,GROUP_CONCAT(category_name) as category_names,GROUP_CONCAT(b.category_id) as category_ids')
                ->leftJoin('qz_yxb_supplier_category_link b','a.id = b.supplier_id')
                ->leftJoin('qz_yxb_supplier_category c','b.category_id = c.id')
                ->where($map)
                ->group('a.id')
                ->buildSql();
            return  Db::table($buildSql)->alias('t')
                ->field('t.*')
                ->where($map2)
                ->order($order)
                ->limit($page,$pageCount)
                ->select();
        }else{
            if($order == 2){
                $order = 'a.add_time desc';
            }else{
                $order = 'a.add_time';
            }

            return $this->alias('a')->field('a.id,a.name,a.contact_name,a.contact_tel,a.pay_way,FROM_UNIXTIME(a.add_time,"%Y-%m-%d") as add_time,GROUP_CONCAT(category_name) as category_names')
                ->leftJoin('qz_yxb_supplier_category_link b','a.id = b.supplier_id')
                ->leftJoin('qz_yxb_supplier_category c','b.category_id = c.id')
                ->where($map)
                ->group('a.id')
                ->order($order)
                ->limit($page,$pageCount)
                ->select();
        }


    }
    //获取装修公司所有供应商
    public function getCompanySupplier($where){
        return $this->field('id,name')->where($where)->select();
    }

    public function getSupplierCount($where){
        $map[]  = ['a.company_id','=',$where['company_id']];

        if(!empty($where['supplier_name'])&&isset($where['supplier_name'])){
            $map[]  = ['a.name', 'like', '%'.$where['supplier_name'].'%'];
        }
        if(!empty($where['contact_name'])&&isset($where['contact_name'])){
            $map[]  = ['a.contact_name', 'like', '%'.$where['contact_name'].'%'];
        }

        if(!empty($where['category_id'])&&isset($where['category_id'])){
            $map2 = 'find_in_set('.$where['category_id'].',t.category_ids)';
            $buildSql =  $this->alias('a')->field('a.id,a.name,a.contact_name,a.contact_tel,a.pay_way,FROM_UNIXTIME(a.add_time,"%Y-%m-%d") as add_time,GROUP_CONCAT(category_name) as category_names,GROUP_CONCAT(b.category_id) as category_ids')
                ->leftJoin('qz_yxb_supplier_category_link b','a.id = b.supplier_id')
                ->leftJoin('qz_yxb_supplier_category c','b.category_id = c.id')
                ->where($map)
                ->group('a.id')
                ->buildSql();
            return  Db::table($buildSql)->alias('t')
                ->field('t.*')
                ->where($map2)
                ->count();
        }else{

            $buildSql =  $this->alias('a')->field('a.id,a.name,a.contact_name,a.contact_tel,a.pay_way,FROM_UNIXTIME(a.add_time,"%Y-%m-%d") as add_time,GROUP_CONCAT(category_name) as category_names')
                ->leftJoin('qz_yxb_supplier_category_link b','a.id = b.supplier_id')
                ->leftJoin('qz_yxb_supplier_category c','b.category_id = c.id')
                ->where($map)
                ->group('a.id')
                ->buildSql();
            return  Db::table($buildSql)->alias('t')->count();
        }
    }

    public function add($save){
        return $this->insertGetId($save);
    }

    public function edit($save,$where){
        return  $this->update($save,$where);
    }

    public function del($where){
       return $this->where($where)->delete();
    }

    public function delWithCategory($where){
        return Db::name("yxb_supplier_category_link")->where($where)->delete();
    }

    public function delWithBank($where){
        return Db::name("yxb_supplier_bank")->where($where)->delete();
    }

    public function hasSupplier($where){
        if(!empty($where['id'])&&isset($where['id'])){
            $map[] = ['a.id','=',$where['id']];
        }

        if(!empty($where['name'])&&isset($where['name'])){
            $map[] = ['a.name','=',$where['name']];
        }
        if(!empty($where['company_id'])&&isset($where['company_id'])){
            $map[] = ['a.company_id','=',$where['company_id']];
        }

        return $this->alias('a')->field('a.*,GROUP_CONCAT(b.category_id) as category_ids,GROUP_CONCAT(c.category_name) as category_names,q.cname as cname,p.qz_province as pname')
            ->leftJoin('qz_yxb_supplier_category_link b','a.id = b.supplier_id')
            ->leftJoin('qz_yxb_supplier_category c','b.category_id = c.id')
            ->leftJoin('qz_quyu q','a.city=q.cid')
            ->leftJoin('qz_province p','p.qz_provinceid = a.province')
            ->where($map)
            ->group('a.id')
            ->select();
    }

    public function hasSupplierBank($where){
        return Db::name('yxb_supplier_bank')->where('supplier_id','=',$where['supplier_id'])->select();
    }

    /**
     * 获取供应商选中的供应商分类
     * @param $where
     * @return array|\PDOStatement|string|\think\Collection
     */
    public function getSupplierLink($where){
        return Db::name('yxb_supplier_category_link')->alias('a')
            ->field('a.category_id ,b.category_name')
            ->join('qz_yxb_supplier_category b','a.category_id = b.id')
            ->where('a.supplier_id','=',$where['supplier_id'])
            ->select();
    }




    /**
     * 批量插入到供应商,供应商分类关联表
     * @param $save
     */
    public function addSupplierLink($save){
        return Db::name('yxb_supplier_category_link')->insertAll($save);
    }

    /**
     * 删除供应商和供应商关联信息
     * @param $save
     * @return int|string
     */
    public function delSupplierLink($where){
        return Db::name('yxb_supplier_category_link')->where($where)->delete();
    }

    public function addSupplierBank($save){
        return Db::name('yxb_supplier_bank')->insertAll($save);
    }

    /**
     *删除供应商银行信息
     * @param $where
     * @return int
     */
    public function delSupplierBank($where){
        return Db::name('yxb_supplier_bank')->where($where)->delete();
    }


    /**
     * 移动端首页数量
     * @param $where
     * @return float|string
     */
    public function getmSupplierCount($where){
        $map[]  = ['company_id','=',$where['company_id']];
        if(!empty($where['supplier_name'])&&isset($where['supplier_name'])){
            $map[]  = ['name|contact_name|contact_tel', 'like', '%'.$where['supplier_name'].'%'];
        }
        return $this->where($map)->count();
    }

    /**
     * 移动端首页数据
     * @param $where
     * @param $page
     * @param $pageCount
     * @return array|\PDOStatement|string|\think\Collection
     */
    public function getmSupplier($where,$page,$pageCount){

        $map[]  = ['a.company_id','=',$where['company_id']];

        if(!empty($where['supplier_name'])&&isset($where['supplier_name'])){
            $map[]  = ['a.name|a.contact_name|contact_tel', 'like', '%'.$where['supplier_name'].'%'];
        }

        $buildSql = $this->alias('a')->field('a.id,a.name,a.contact_name,a.contact_tel,a.pay_way,a.add_time as create_time,FROM_UNIXTIME(a.add_time) as add_time,GROUP_CONCAT(category_name) as category_names')
            ->leftJoin('qz_yxb_supplier_category_link b','a.id = b.supplier_id')
            ->leftJoin('qz_yxb_supplier_category c','b.category_id = c.id')
            ->where($map)
            ->group('a.id')
            ->buildSql();
        $result = Db::table($buildSql)->alias('t1')
            ->field('t1.*')
            ->order('t1.create_time desc')
            ->limit($page,$pageCount)
            ->select();
        return $result;

    }


}