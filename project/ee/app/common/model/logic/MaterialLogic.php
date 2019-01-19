<?php
namespace app\common\model\logic;
use app\common\model\db\Materialorder;
use Util\Page;

class MaterialLogic
{

    public function getOrderMaterialDetail($data=[],$user=[]){
        $where = [
            'qz_yxb_material_order.company_id'=>$user['company_id'],
            'qz_yxb_material_order.erp_order_id'=>$data['order_no'],
        ];
       return Materialorder::where($where)->with('material')->order(['qz_yxb_material_order.add_time'=>'desc'])->select();
    }

    /**
     * 获取公司所有订单材料信息
     * @param $company_id
     * @return array
     */
    public function getMaterialOrder($company_id,$where){
        $where['company_id'] = $company_id;
        //获取总条数
        $count = model('model/db/materialorder')->getMaterialOrderCount($where);
        if($count>0){
            $p = new Page($count,10);
            $show = $p->getPage();
            $list = model('model/db/materialorder')->getMaterialOrder($where,$p->firstRow, $p->listRows);

            foreach($list as $val){
                $info[$val['moid']]['id'] = $val['moid'];
                $info[$val['moid']]['erp_id'] = $val['erp_id'];
                $info[$val['moid']]['consumer_name'] = $val['consumer_name'];
                $info[$val['moid']]['supplier_name'] = isset($val['supplier_name'])?$val['supplier_name']:$val['b_supplier_name'];
                if(!empty($val['name'])&&isset($val['name'])){
                    $info[$val['moid']]['list'][] = $val;
                }else{
                     $info[$val['moid']]['list'] = [];
                }
            }
            //处理续费数据
            return ['list' => isset($info)?$info:'', 'page' => $show];
        }
    }

    /**
     * 获取单笔订单材料信息
     * @param $m_order_id
     * @param $company_id
     */
    public function getMaterialOrderOne($m_order_id,$company_id){
        //获取订单等信息
        $where['id'] = $m_order_id;
        $where['company_id'] = $company_id;
        $info = model('model/db/materialorder')->getMaterialOrderOne($where,2);
        $info['list'] = model('model/db/materialorder')->getMaterialList($where);
        //获取材料列表信息
        return $info;
    }

    /**
     * 添加材料信息
     * @param $material_id
     * @param $erp_id
     * @param $category
     * @param $supplier
     * @param $material
     */
    public function addMaterial($erp_id,$category,$supplier,$name,$material,$company_id){
        //添加到订单对相应供应商表
        $material_id = $this->addMaterialOrder($erp_id,$category,$supplier,$name,$company_id);

        //添加到日志
        //添加到材料表
        if(!empty($material)&&isset($material)){
            $all = $this->addMaterialList($material_id,$material,$company_id);
            //添加到日志

            if($all){
                return true;
            }else{
                return false;
            }
        }
    }

    /**
     * 编辑材料信息
     * @param $material_id
     * @param $erp_id
     * @param $category
     * @param $supplier
     * @param $material
     * @param $company_id
     */
    public function editMaterial($material_id,$erp_id,$category,$supplier,$name,$material,$company_id){
        //编辑订单材料信息
        $result = $this->editMaterialOrder($erp_id,$category,$supplier,$name,$company_id,$material_id);

        //添加到日志

        //编辑材料信息
        if($result){
            $all = $this->editMaterialList($material_id,$material,$company_id);
            //添加到日志
            if($all['edit'] || $all['add']){
                return true;
            }else{
                return false;
            }
        }

    }

    public function editMaterialOrder($erp_id,$category,$supplier,$name,$company_id,$material_id){
        $save["erp_order_id"] = $erp_id;
        $save["supplier_category_id"] = $category;
        $save["supplier_id"] = $supplier;
        $save["supplier_name"] = $name;
        $save["company_id"] = $company_id;
        $save["update_time"] = time();
        $where['id'] = $material_id;
        return model('model/db/materialorder')->edit($save,$where);
    }

    public function addMaterialOrder($erp_id,$category,$supplier,$name,$company_id){
        $save["erp_order_id"] = $erp_id;
        $save["supplier_category_id"] = $category;
        $save["supplier_id"] = $supplier;
        $save["supplier_name"] = $name;
        $save["company_id"] = $company_id;
        $save["add_time"] = time();
        return model('model/db/materialorder')->add($save);
    }

    public function checkMaterial($material){
        $list = [];
        foreach($material as $key=>$val){
            if(!empty($val["mname"])&&isset($val["mname"])){
                $list[$key]['name'] = $val["mname"];
            }
        }
        if(count($list)>0){
            return true;
        }else{
            return false;
        }
    }
    public function addMaterialList($material_id,$material,$company_id){

        foreach($material as $key=>$val){
            if(!empty($val["mname"])&&isset($val["mname"])){
                $list[$key]['material_order_id'] = $material_id;
                $list[$key]['company_id'] = $company_id;
                $list[$key]['name'] = trim($val["mname"]);
                $list[$key]['amount'] = trim($val["mamount"]);
                $list[$key]['price'] = trim($val["mprice"]);
                $list[$key]['note'] = preg_replace('# #','',$val["piaoju"]);
                $list[$key]['buy_time'] = isset($val["mbuytime"])?strtotime($val["mbuytime"]):'';
                $list[$key]['send_time'] = isset($val["msendtime"])?strtotime($val["msendtime"]):'';
                $list[$key]['add_time'] = time();
            }
        }

        return model('model/db/material')->editAll($list);
    }

    /**
     * 编辑材料列表信息
     * @param $material_id
     * @param $material
     * @param $company_id
     * @return bool
     */
    public function editMaterialList($material_id,$material,$company_id){

        foreach($material as $key=>$val){
            if(!empty($val["mname"])&&isset($val["mname"])){
                if(!empty($val["id"])&&isset($val["id"])){
                    $list[$key]['id'] = $val["id"];
                    $list[$key]['material_order_id'] = $material_id;
                    $list[$key]['company_id'] = $company_id;
                    $list[$key]['name'] = trim($val["mname"]);
                    $list[$key]['amount'] = trim($val["mamount"]);
                    $list[$key]['price'] = trim($val["mprice"]);
                    $list[$key]['note'] =  preg_replace('# #','',$val["piaoju"]);
                    $list[$key]['buy_time'] = isset($val["mbuytime"])?strtotime($val["mbuytime"]):'';
                    $list[$key]['send_time'] = isset($val["msendtime"])?strtotime($val["msendtime"]):'';
                    $list[$key]['update_time'] = isset($val["update_time"])?strtotime($val["update_time"]):'';
                }else{
                    $save[$key]['material_order_id'] = $material_id;
                    $save[$key]['company_id'] = $company_id;
                    $save[$key]['name'] = trim($val["mname"]);
                    $save[$key]['amount'] = trim($val["mamount"]);
                    $save[$key]['price'] = trim($val["mprice"]);
                    $save[$key]['note'] = preg_replace('# #','',$val["piaoju"]);
                    $save[$key]['buy_time'] = isset($val["mbuytime"])?strtotime($val["mbuytime"]):'';
                    $save[$key]['send_time'] = isset($val["msendtime"])?strtotime($val["msendtime"]):'';
                    $save[$key]['add_time'] = isset($val["update_time"])?strtotime($val["update_time"]):'';
                }
            }
        }
        $result = '';
        $resultTwo = '';
        if(!empty($list)&&isset($list)){
           $result =  model('model/db/material')->editAll($list);
        }
        if(!empty($save)&&isset($save)){
           $resultTwo = model('model/db/material')->editAll($save);
        }

        return ['edit'=>$result,'add'=>$resultTwo];
    }

    /**
     * 编辑到货状态
     * @param $mid
     * @param $company_id
     */
    public function editState($mid,$company_id){
        $save['state'] = 2;
        $save['update_time'] = time();
        $where['company_id'] = $company_id;
        $where['id'] = $mid;
        $result = model('model/db/material')->editState($save,$where);
        return $result;
    }

    /**
     * 删除材料进销信息
     * @param $oid
     * @param $company_id
     */
    public function del($oid,$company_id){
        //删除关联表
        $resultOne = model('model/db/materialorder')->del($oid,$company_id);
        //删除材料列表
        $resultTwo = model('model/db/material')->del($oid,$company_id);
        return ['order'=>$resultOne,'material'=>$resultTwo];
    }

    public function delMaterial($mid,$company_id){
        return model('model/db/material')->del($mid,$company_id,2);
    }

    /**
     * 移动端获取公司所有订单材料信息
     * @param $company_id
     * @return array
     */
    public function getmMaterialOrder($company_id,$where){
        $where['company_id'] = $company_id;
        //获取总条数
        $count = model('model/db/materialorder')->getmMaterialOrderCount($where);
        if($count>0){
            $p = new Page($count,10);
            $show = $p->getPage();
            $list = model('model/db/materialorder')->getmMaterialOrder($where,$p->firstRow, $p->listRows);
            foreach($list as $key=>$val){
                $list[$key]["supplier_name"] = isset($val["supplier_name"])?$val["supplier_name"]:$val["b_supplier_name"];

           }

            //处理续费数据
            return ['list' => isset($list)?$list:'', 'page' => $show];
        }
    }

}