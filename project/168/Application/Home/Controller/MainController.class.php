<?php
/**
 * Home 模块总控制器
 */

namespace Home\Controller;
use Home\Common\Controller\HomeBaseController;
class MainController extends HomeBaseController{
    public function index(){
        $this->display();
    }

    /**
     * 批量生成渠道标识
     * @return [type] [description]
     */
    public function importsrc()
    {
        ini_set('memory_limit', '512M');
        if (!in_array(session("uc_userinfo.uid"),array(1,37))) {
            $this->_error();
        }

        $channel = array(
            array(
                "name" =>  "百度",
                "src" => "bd"
            ),
            array(
                "name" =>  "360",
                "src" => "360"
            ),
            array(
                "name" =>  "搜狗",
                "src" => "sg"
            ),
            array(
                "name" =>  "神马",
                "src" => "sm"
            )
        );

        $groups = array(
            "bd"  => "8",
            "360" => "26",
            "sg" => "27",
            "sm" => "24"
        );

        //获取已开站城市信息
        $citys = D("Quyu")->getOpenCityList();

        foreach ($citys as $key => $value) {
            foreach ($channel as $k => $val) {
                 if ($val["src"] != "sm") {
                    $src = "p-".$val["src"]."-".$value["bm"];
                    $all[] = array(
                        "type" => "1",
                        "src" => $src,
                        "name" => $val["name"].$value["cname"]."pc端",
                        "groupid" => $groups[$val["src"]],
                        "dept" => 5,
                        "charge" => 2,
                        "description" => "系统批量添加",
                        "visible" => 0,
                        "addtime" => time()
                    );
                    $src = "m-".$val["src"]."-".$value["bm"];
                    $all[] = array(
                        "type" => "1",
                        "src" => $src,
                        "name" => $val["name"].$value["cname"]."移动端",
                        "groupid" =>  $groups[$val["src"]],
                        "dept" => 5,
                        "charge" => 2,
                        "description" => "系统批量添加",
                        "visible" => 0,
                        "addtime" => time()
                    );
                 } else {
                    $src = "m-".$val["src"]."-".$value["bm"];
                    $all[] = array(
                        "type" => "1",
                        "src" => $src,
                        "name" => $val["name"].$value["cname"]."移动端",
                        "groupid" =>  $groups[$val["src"]],
                        "dept" => 5,
                        "charge" => 2,
                        "description" => "系统批量添加",
                        "visible" => 0,
                        "addtime" => time()
                    );
                 }
            }
        }

        echo "插入数据量：".count($all)."<br/>";
        echo "插入数据开始".date("Y-m-d H:i:s")."<br/>";
        $all = array_chunk($all, 1000);
        foreach ($all as $key => $value) {
            D("OrderSource")->addAllSource($value);
        }
        echo "插入数据结束".date("Y-m-d H:i:s")."<br/>";

    }
}