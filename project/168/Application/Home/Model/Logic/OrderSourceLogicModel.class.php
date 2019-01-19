<?php
/**
 * 订单相关模块
 */

namespace Home\Model\Logic;

use Home\Model\OrderSourceModel;

class OrderSourceLogicModel
{
    private $dept = array(
        "总裁办" => "zcb",
        "推广二部" => "tg2",
        "推广一部" => "tg1",
        "渠道部" => "qd"
    );

    /**
     * 获取渠道组
     * @return array
     */
    public function getSourceGroupList(){
        //来源组
        $result = D('OrderSource')->getSourceGroup('1','');
        $info["group"] = array(
            array(
                'id' => "",
                'name' => '请选择渠道组',
                'children' => array(
                    array(
                        'id' => "",
                        'name' => '请选择'
                    )
                )
            )
        );
        $group = [];
        $groupChild = [];//子级
        foreach ($result as $key => $value) {
            if (!empty($value["id"])) {
                if (!array_key_exists($value["parentid"],$group)) {
                    $group[$value["parentid"]]["id"] = $value["parentid"];
                    $group[$value["parentid"]]["name"] = $value["parent_name"];
                    $group[$value["parentid"]]["children"][] = array(
                        "id" => "",
                        "name" => "请选择"
                    );
                }
                $group[$value["parentid"]]["children"][] = array(
                    "id" => $value["id"],
                    "name" => $value["name"]
                );
                //因为页面只有一层显示,原本父级和子级联动 , 现在把子级直接取出 , 和父级放一起(原逻辑不变 , 在第一层添加子级数据)
                $groupChild[$value["id"]]['id'] = $value["id"];
                $groupChild[$value["id"]]['name'] = $value["name"];
                $groupChild[$value["id"]]['parentid'] = $value["parentid"];
            } else {
                if (!array_key_exists($value["parentid"],$info["group"])) {
                    if (!empty($value["parent_name"])) {
                        $group[$value["parentid"]]["id"] = $value["parentid"];
                        $group[$value["parentid"]]["name"] = $value["parent_name"];
                        $group[$value["parentid"]]["children"][] = array(
                            "id" => "",
                            "name" => "请选择"
                        );
                    }
                }
            }
        }
        $group = array_merge($info["group"],$group,$groupChild);
        return $group;
    }

    /**
     * 获取当前渠道组的所有渠道
     * @param $get
     * @return mixed
     */
    public function getSrcByGroup($get){
        if(!$get['group']){
            return [];
        }
        //获取当前渠道组的子渠道(可能没有)
        $groups = D("OrderSource")->getSourceGroupChild($get['group']);
        //再将自身和子级 合并
        $groups = array_merge(array_column($groups,'id'),[$get['group']]);
        //取出所有数据
        $list = D("OrderSource")->getAllSourceList($groups);
        return $list;
    }

    public function getOrderSourcesList($get,$depts){
        $map = [];
        if($get['start'] && $get['end']){
            $map['time'] = [['EGT', strtotime($get['start'] . ' 00:00:00')], ['ELT', strtotime($get['end'] . ' 23:59:59')], 'AND'];
            $StartMonth = $get['start'].' 00:00:00'; //开始日期
            $EndMonth = $get['end'].' 23:59:59'; //结束日期
        } else {
            $map['time'] =[['EGT', strtotime(date('Y-m').'-01 00:00:00')],['ELT', time()], 'AND'];
            $StartMonth   = date('Y-m').'-01 00:00:00'; //开始日期
            $EndMonth     = date('Y-m-d').' 23:59:59'; //结束日期
        }
        if(count($depts)>0){
            $map['dept'] = ['in',$depts];
        }
        if($get['group']){
            $map['group'] = ['eq',$get['group']];
        }
        if($get['src']){
            $map['src'] = ['eq',$get['src']];
        }
        $orderSourceModel = new OrderSourceModel();
        //1.查询出的数据
        $list = $orderSourceModel->getOrderSourcesList($map);
        $dayData = [];
        //1.1将时间作为索引
        foreach ($list as $k=>$v){
            $dayData[$v['t']] = $v;
            unset($list[$k]);
        }
        //2.循环查询的月份的每一天,并将数据放入
        $ToStartMonth = strtotime($StartMonth); //转换一下
        $ToEndMonth = strtotime($EndMonth); //一样转换一下
        $returnData = [];

        while ($ToStartMonth < $ToEndMonth) {
            $NewMonth = trim(date('Y-m-d',$ToStartMonth),' ');
            $ToStartMonth += strtotime('+1 day',$ToStartMonth) - $ToStartMonth;
            //2.1将对应数据放入
            if($dayData[$NewMonth]){
                $returnData[$NewMonth] = $dayData[$NewMonth];
                unset($dayData[$NewMonth]);
            }else{
                $returnData[$NewMonth]['t'] = $NewMonth;
            }
        }

        return $returnData;
    }

    public function getDepartmentList(){
        $department = [];
        $result = D("DepartmentIdentify")->findAllDept();
        foreach ($result as $key => $value) {
            if (!array_key_exists($value["dept_belong"], $department)) {
                $department[$value["dept_belong"]]["name"] = $value["dept_belong"];
            }
            $tag = $this->dept[$value["dept_belong"]];
            if (!array_key_exists($tag, $department[$value["dept_belong"]]["child"])) {
                $department[$value["dept_belong"]]["child"][$tag] = array(
                    "id" => $tag,
                    "name" => $value["dept_belong"].'全部'
                );
            }

            if (!array_key_exists($value["id"], $department[$value["dept_belong"]]["child"])) {
                $department[$value["dept_belong"]]["child"][$value["id"]] = array(
                    "id" => $value["id"],
                    "name" => $value["name"]
                );
            }
        }
        return $department;
    }
}