<?php
// +----------------------------------------------------------------------
// | 区县模型
// +----------------------------------------------------------------------

namespace app\common\model;

use think\Model;
use Util\App;

class Area extends Model
{
    protected $autoWriteTimestamp = false;

    /**
     * 根据区县ID获取区域列表
     * @param   $fatherid  城市id
     * @return  城市区域列表
     */
    public function getFullAreaById($id = '')
    {
        if (empty($id)) {
            return null;
        }
        $AreaFull = $this->field('a.qz_areaid AS id,a.qz_area AS area,a.fatherid as sid,q.cname as city,s.qz_province as province,s.qz_provinceid as pid')->alias('a')
            ->join('quyu q','q.cid = a.fatherid')
            ->join('province s','s.qz_provinceid = q.uid')
            ->where(['a.qz_areaid' => $id])
            ->order('orders')
            ->find();
        $app = new App();
        $AreaFull['sign'] = $app->getFirstCharter($AreaFull['province']);

        return $AreaFull;
    }
}