<?php
/**
 *  活动配置表
 */
namespace Common\Model;
use Think\Model;
class AdvbannerModel extends Model{
    protected $tableName = "adv_banner";
    protected $autoCheckFields = false;
    /**
     * 获取广告列表
     * @param  [type] $module [模块名称]
     * @param  [type] $limit  [获取数量]
     * @return [type]         [description]
     */
    public function getAdvList($module,$city_id,$limit){
        $date = mktime(23,59,59,date("m"),date("d"),date("Y"));

        $map = array(
            "status"=>array("EQ",1),
            "module"=>array("EQ",$module),
            array(
                array(
                    "start_time" => array("ELT",$date),
                    "end_time"   => array("EGT",$date)
                     ),
                array(
                    "start_time" => array("EQ",0),
                    "end_time"   => array("EQ",0),
                     ),
                "_logic"=>"OR"
            ),
            "city_id"=>array(
                    array("EQ",$city_id),
                    array("EQ",""),
                    array("EXP","IS NULL"),
                    array("EQ","0"),
                    "OR"
            ),
            "img_url_mobile" => array("NEQ",'')
        );

        $buildSql = M("adv_banner")->where($map)->order("sort,id desc")->limit($limit)->buildSql();
        return M("adv_banner")->table($buildSql)->alias("a")
                              ->join("LEFT JOIN qz_user as c on a.company_id = c.id")
                              ->join("LEFT JOIN qz_quyu as b on c.cs = b.cid")
                              ->field("a.*,b.bm,c.jc")->select();
    }

}