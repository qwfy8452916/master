<?php
namespace app\common\model\logic;


class CityLogic
{
    public function getProvinceAndCity(){
        $result = model('model/db/city')->getProvinceAndCity();
        $i = 0;
        foreach ($result as $key => $value) {
            $cityList[$value['pid']]['id'] = $value["pid"];
            $cityList[$value['pid']]['name'] = $value["qz_province"];
            $cityList[$value['pid']]['city'][] = array(
                'id' => $value["cid"],
                'name' => $value["cname"]
            );

        }
//        print_r($cityList);exit;
        return $cityList;
    }
}