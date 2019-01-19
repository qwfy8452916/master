<?php

namespace Home\Model;
use Think\Model;

/**
*   voip电话查询
*/
class VoipModel extends Model
{
    protected $tableName = 'admin_voip_tels'; //数据库名.表名(包含了前缀)

    public function getvoiplist()
    {
        $buildSql = M("log_telcenter_diycall")->field("fromtel,max(time_add) as time")->group("fromtel")->buildSql();

        return M("admin_voip_tels")->alias("a")
                                   ->field("a.id,a.use_id,a.use_name,a.use_time,a.time_add,a.voipAccount,a.use_on,c.time")
                                   ->join("left join ".$buildSql." as c on c.fromtel = a.voipAccount")
                                   ->order("a.voipaccount asc")
                                   ->select();
    }
}