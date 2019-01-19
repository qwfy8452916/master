<?php
namespace Home\Model\Db;
use Think\Model;
class CityMissingOrderModel extends Model
{
    public function getCityList($date,$city_id,$city_level,$whole_month,$is_end,$is_new)
    {
        $map = array(
            "date" => array("EQ",$date)
        );

        if (!empty($city_id)) {
            $map["city_id"] = array("EQ",$city_id);
        }

        if (!empty($city_level)) {
            $map["city_level"] = array("EQ",$city_level);
        }

        if (!empty($whole_month)) {
            $map["whole_month"] = array("EQ",$whole_month);
        }

        if (!empty($is_end)) {
            $map["isend"] = array("EQ",1);
        }

        if (!empty($is_new)) {
            $map["isnew"] = array("EQ",1);
        }

        return M("city_missing_order")->where($map)->order("city_id")->select();
    }
}
