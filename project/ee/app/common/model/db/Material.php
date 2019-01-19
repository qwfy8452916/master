<?php
namespace app\common\model\db;
use \think\Db;
use think\Model;

class Material extends Model{
    protected $table = 'qz_yxb_material';

    public function editAll($list){
        return $this->saveAll($list,true);
    }

    public function editState($save,$where){
        return  $this->update($save,$where);
    }

    public function del($oid,$company_id,$type=1){
        if($type == 1){
            $map[] = ['material_order_id','=',$oid];
        }else{
            $map[] = ['id','=',$oid];
        }
        $map[] = ['company_id','=',$company_id];
        return $this->where($map)->delete();
    }

    public function getBuyTimeAttr($value)
    {
    	if($value == 0){
    		return '';
		}
        return date('Y-m-d H:i:s', $value);
    }
    public function getSendTimeAttr($value)
    {
		if($value == 0){
			return '';
		}
        return date('Y-m-d H:i:s', $value);
    }
    public function getStateAttr($value)
    {
        switch ($value){
            case 1:
                return '未到货';
            case 2:
                return '已到货';
            default:
                return '';
        }

    }
}