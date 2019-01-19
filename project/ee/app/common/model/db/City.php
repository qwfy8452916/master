<?php
namespace app\common\model\db;
use \think\Db;
use think\Model;

class City extends Model{
    protected $table = 'qz_quyu';

    /**
     * 获取所有的城市及省份
     * @return [type] [description]
     */
    public function getProvinceAndCity () {
        return $this->alias("a")
            ->field("a.cid,a.cname,a.uid as pid,c.qz_province")
            ->leftJoin('qz_province c','c.qz_provinceid = a.uid')
            ->where('a.cid','<>',"000001")
            ->select();
    }
}