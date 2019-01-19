<?php
namespace app\common\model\db;
use \think\Db;
use think\Model;

class Materialorder extends Model{
    protected $table = 'qz_yxb_material_order';

    public function material()
    {
        return $this->hasMany('Material', 'material_order_id', 'id');
    }
    public function supplier()
    {
        return $this->belongsTo('Supplier', 'supplier_id', 'id');
    }

    public function getMaterialOrder($where,$page,$pageCount){
        $map[]  = ['a.company_id','=',$where['company_id']];
        //订单编号 精确
        if(!empty($where['erp_id'])&&isset($where['erp_id'])){
            $map[] = ['a.erp_order_id','=',trim($where['erp_id'])];
        }
        //业主姓名 模糊
        if(!empty($where['yzname'])&&isset($where['yzname'])){
            $map[] = ['e.consumer_name','like','%'.trim($where['yzname']).'%'];
        }
        //供应商模糊
        if(!empty($where['supplier_name'])&&isset($where['supplier_name'])){
            $map[] = ['c.name','like','%'.trim($where['supplier_name']).'%'];
        }
        //材料名称
        if(!empty($where['material_name'])&&isset($where['material_name'])){
            $map2[] = ["name","like",'%'.$where['material_name'].'%'];
        }
        //票据单号
        if(!empty($where['code'])&&isset($where['code'])){
            $map2[] = ["note","=",$where['code']];
        }

        if(!empty($map2)&&isset($map2)){
            $idArr = Db::name('yxb_material')->field('material_order_id')->where($map2)->select();;
            $ids = getArrayFList($idArr,'material_order_id');
            if(!empty($ids)&&isset($ids)){
                $map[] = ['a.id','in',$ids];
            }else{
                return false;
            }
        }

        $buildSql = $this->alias('a')->field('a.id as moid ,a.erp_order_id as erp_id,a.supplier_name as b_supplier_name,c.name as supplier_name,e.consumer_name')
            ->leftJoin('qz_yxb_supplier c','c.id = a.supplier_id')
            ->leftJoin('qz_yxb_orders e','e.order_no = a.erp_order_id')
            ->where($map)
            ->order('a.add_time desc')
            ->limit($page,$pageCount)
            ->buildSql();

        $result = Db::table($buildSql)->alias('t')->field('t.moid,t.erp_id,t.supplier_name,t.b_supplier_name,IFNULL(t.consumer_name,"") as consumer_name,b.id,b.material_order_id,b.name,b.amount,b.price,b.note,if(b.buy_time=0,"",FROM_UNIXTIME(b.buy_time)) as buy_time,if(b.send_time=0 ,"",FROM_UNIXTIME(b.send_time)) as send_time,b.state')
            ->leftJoin('qz_yxb_material b','b.material_order_id = t.moid')
            ->select();
        return $result;
    }


    public function getMaterialOrderCount($where){
        $map[]  = ['a.company_id','=',$where['company_id']];
        //订单编号 精确
        if(!empty($where['erp_id'])&&isset($where['erp_id'])){
            $map[] = ['a.erp_order_id','=',trim($where['erp_id'])];
        }
        //业主姓名 模糊
        if(!empty($where['yzname'])&&isset($where['yzname'])){
            $map[] = ['e.consumer_name','like','%'.trim($where['yzname']).'%'];
        }
        //供应商模糊
        if(!empty($where['supplier_name'])&&isset($where['supplier_name'])){
            $map[] = ['c.name','like','%'.trim($where['supplier_name']).'%'];
        }
        //材料名称
        if(!empty($where['material_name'])&&isset($where['material_name'])){
            $map2[] = ["name","like",'%'.$where['material_name'].'%'];
        }
        
        //票据单号
        if(!empty($where['code'])&&isset($where['code'])){
            $map2[] = ["note","=",$where['code']];
        }

        if(!empty($map2)&&isset($map2)){
            $idArr = Db::name('yxb_material')->field('material_order_id')->where($map2)->select();;
            $ids = getArrayFList($idArr,'material_order_id');
            if(!empty($ids)&&isset($ids)){
                $map[] = ['a.id','in',$ids];
            }else{
                return false;
            }
        }

        return  $this->alias('a')
            ->leftJoin('qz_yxb_supplier c','c.id = a.supplier_id')
            ->leftJoin('qz_yxb_orders e','e.order_no = a.erp_order_id')
            ->where($map)
            ->count();
    }

    public function add($save){
        return $this->insertGetId($save);
    }

    public function edit($save,$where){
        return  $this->update($save,$where);
    }


    public function getMaterialOrderOne($where,$type=1){
        if(!empty($where['id'])&&isset($where['id'])){
            $map[] = ['a.id','=',$where['id']];
        }else{
            return false;
        }
        if(!empty($where['company_id'])&&isset($where['company_id'])){
            $map[] = ['a.company_id','=',$where['company_id']];
        }else{
            return false;
        }

        if($type == 1){
            return $this->alias('a')->field('a.*,e.consumer_name')
                ->leftJoin('qz_yxb_orders e','e.order_no = a.erp_order_id')
                ->where($map)
                ->find();
        }else{
            return $this->alias('a')->field('a.*,s.name as name')
                ->leftJoin('qz_yxb_supplier s','s.id = a.supplier_id')
                ->where($map)
                ->find();

        }

    }

    public function getMaterialList($where){

        if(!empty($where['id'])&&isset($where['id'])){
            $map[] = ['material_order_id','=',$where['id']];
        }

        if(!empty($where['company_id'])&&isset($where['company_id'])){
            $map[] = ['company_id','=',$where['company_id']];
        }

        return Db::name('yxb_material')
            ->field("id,material_order_id,name,amount,price,note,if(buy_time=0,'',from_unixtime(buy_time, '%Y-%m-%d %H:%i:%s')) AS buy_time,if(send_time=0,'',from_unixtime(send_time, '%Y-%m-%d %H:%i:%s')) AS send_time")
            ->where($map)
            ->select();
    }

    /**
     *删除订单对应供应商信息
     * @param $oid
     * @param $company_id
     */
    public function del($oid,$company_id){
        $map[] = ['company_id','=',$company_id];
        $map[] = ['id','=',$oid];
        return $this->where($map)->delete();
    }

    /**
     * 移动端材料列表
     * @param $where
     * @param $page
     * @param $pageCount
     * @return array|\PDOStatement|string|\think\Collection
     */
    public function getmMaterialOrder($where,$page,$pageCount){
        $map[]  = ['a.company_id','=',$where['company_id']];

        $map2 = [];
        //业主姓名 模糊 供应商模糊 联系人 模糊
        if(!empty($where['yzname'])&&isset($where['yzname'])){
            $map2[] = ['t.consumer_name|t.b_supplier_name|t.contact_name','like','%'.trim($where['yzname']).'%'];
        }


        $buildSql =  $this->alias('a')->field('a.add_time ,a.id as moid ,a.erp_order_id as erp_id,c.contact_name as contact_name,a.supplier_name as b_supplier_name,c.name as supplier_name,e.consumer_name,count(b.id) as b_num')
            ->leftJoin('qz_yxb_supplier c','c.id = a.supplier_id')
            ->leftJoin('qz_yxb_orders e','e.order_no = a.erp_order_id')
            ->leftJoin('qz_yxb_material b','b.material_order_id = a.id')
            ->where($map)
            ->group('a.id')
            ->buildSql();

        $result = Db::table($buildSql)->alias('t')
            ->where($map2)
            ->order('t.add_time desc')
            ->limit($page,$pageCount)
            ->select();

        return $result;

    }

    /**
     * 移动端材料数量
     * @param $where
     * @return float|string
     */
    public function getmMaterialOrderCount($where){
        $map[]  = ['a.company_id','=',$where['company_id']];

        $map2 = [];
        //业主姓名 模糊 供应商模糊 联系人 模糊
        if(!empty($where['yzname'])&&isset($where['yzname'])){
            $map2[] = ['t.consumer_name|t.b_supplier_name|t.contact_name','like','%'.trim($where['yzname']).'%'];
        }


        $buildSql =  $this->alias('a')->field('a.add_time ,a.id as moid ,a.erp_order_id as erp_id,c.contact_name as contact_name,a.supplier_name as b_supplier_name,c.name as supplier_name,e.consumer_name,count(b.id) as b_num')
            ->leftJoin('qz_yxb_supplier c','c.id = a.supplier_id')
            ->leftJoin('qz_yxb_orders e','e.order_no = a.erp_order_id')
            ->leftJoin('qz_yxb_material b','b.material_order_id = a.id')
            ->where($map)
            ->group('a.id')
            ->buildSql();

        $result = Db::table($buildSql)->alias('t')
            ->where($map2)
            ->count();
        return $result;
    }

}