<?php
/**
 * 订单相关模块
 */

namespace Home\Model\Logic;

class OrdersLogicModel
{

    /**
     * 获取城市订单 条件
     * @param $data
     * @param $cityIds
     * @return array
     */
    public function getCityOrdersMap($data)
    {
        //设置默认时间 , 前31天至今的数据
        $map['t.time_real'] = [
            ['EGT', empty($data['start']) ? strtotime(date("Y-m-d") . ' 00:00:00') : strtotime($data['start'] . ' 00:00:00')],
            ['ELT', empty($data['end']) ? time() : strtotime($data['end'] . ' 23:59:59')],
        ];

        //查询城市
        if ($data['city']) {
            $map['t.cs'] = ['eq', $data['city']];
        }
        //查询渠道来源组
        if ($data['group']) {
            $map['d.id'] = ['eq', $data['group']];
        }
        //查询渠道来源标识
        if ($data['src']) {
            $map['c.src'] = ['eq', $data['src']];
        }
        $order = '';
        if ($data['sort']) {
            $order = $data['sort'] . ' ' . $data['sort_type'];
        }
        //取出查询时间
        $search['start'] = $map['t.time_real'][0][1];
        $search['end'] = $map['t.time_real'][1][1];
        $error = null;
        if (($search['end'] - $search['start']) > (3600 * 24 * 31)) {
            $error = '查询时间不能大于31天';
        }
        //分页
        $page = 1;
        if ($data['p']) {
            $page = $data['p'];
        }
        return ['map' => $map, 'search' => $search, 'error' => $error, 'order' => $order, 'page' => $page];
    }

    /**
     * 获取时间范围所有订单 条件
     * @param $data
     * @return array
     */
    public function getOrdersDetailMap($data)
    {
        //设置默认时间 , 前31天至今的数据
        $map['b.time'] = [
            ['EGT', empty($data['start']) ? strtotime(date("Y-m-d") . ' 00:00:00') : strtotime($data['start'] . ' 00:00:00')],
            ['ELT', empty($data['end']) ? time() : strtotime($data['end'] . ' 23:59:59')],
        ];
        $map['t.on'] = ['eq', 4];
        //查询城市
        if ($data['city']) {
            $map['t.cs'] = ['eq', $data['city']];
        }
        //查询渠道来源标识
        if ($data['src']) {
            $map['b.src'] = ['eq', $data['src']];
        }
        //筛选订单状态
        if ($data['orders_type']) {
            switch ($data['orders_type']) {
                //分单
                case '1':
                    $map['t.type_fw'] = ['eq', 1];
                    $complex[] = array("_string" => "(t.qiandan_status is null or t.qiandan_status = 0)");
                    $map["_complex"] = $complex;
                    break;
                //赠单
                case '2':
                    $map['t.type_fw'] = ['eq', 2];
                    $complex[] = array("_string" => "(t.qiandan_status is null or t.qiandan_status = 0)");
                    $map["_complex"] = $complex;
                    break;
                //签单
                case '3':
                    $map['t.qiandan_status'] = ['eq', 1];
                    break;
            }
        }
        //筛选显号状态
        if ($data['openeye_st']) {
            switch ($data['openeye_st']) {
                //显号
                case '1':
                    $map['t.openeye_st'] = ['eq', 1];
                    break;
                //不显号
                case '2':
                    $complex[] = array("_string" => "(t.openeye_st is null or t.openeye_st = 0)");
                    $map["_complex"] = $complex;
                    break;
            }
        }
        $search = [];
        return ['map' => $map, 'search' => $search];
    }

    /**
     * 获取城市订单数据个数
     * @param $where
     * @return mixed
     */
    public function getCityOrdersCount($where)
    {
        return D('orders')->getCityOrdersCount($where);
    }

    /**
     * 获取城市订单数据
     * @param $where
     * @return mixed
     */
    public function getCityOrdersList($where, $count, $pageIndex, $pageCount = '20')
    {
        //强制数字整数
        $pageIndex = intval($pageIndex) <= 0 ? 1 : intval($pageIndex);
        $pageCount = intval($pageCount) <= 0 ? 1 : intval($pageCount);
        $list = D('orders')->getCityOrdersList($where['map'], $where['order'], '', ($pageIndex - 1) * $pageCount, $pageCount);
        foreach ($list as $k => $v) {
            $list[$k]['time'] = date("Y", $where['search']['start']) . '年' . date("m", $where['search']['start']) . '月' . date("d", $where['search']['start']) . '日' . '-'
                . date("Y", $where['search']['end']) . '年' . date("m", $where['search']['end']) . '月' . date("d", $where['search']['end']) . '日';
            $list[$k]['fen_qian_lv'] = is_nan($v['fen_qian_order'] / $v['fen_order']) ? 0 : $v['fen_qian_order'] / $v['fen_order'] * 100;
            $list[$k]['zeng_qian_lv'] = is_nan($v['zeng_qian_order'] / $v['zeng_order']) ? 0 : $v['zeng_qian_order'] / $v['zeng_order'] * 100;
            $list[$k]['qian_lv'] = is_nan($v['qian_order'] / $v['fa_order']) ? 0 : $v['qian_order'] / $v['fa_order'] * 100;
            $list[$k]['all_liang_order'] = (int)$v['fen_liang_order'] + (int)$v['zeng_liang_order'];
        }
        import('Library.Org.Util.Page');
        $p = new \Page($count, 20);
        $show = $p->show();
        return ['list' => $list, 'page' => $show];
    }

    /**
     * 获取 导出城市订单数据
     * @param $where
     * @return mixed
     */
    public function getExplodeCityOrdersList($where)
    {
        $list = D('orders')->getCityOrdersList($where['map'], $where['order']);
        foreach ($list as $k => $v) {
            $list[$k]['time'] = date("Y", $where['search']['start']) . '年' . date("m", $where['search']['start']) . '月' . date("d", $where['search']['start']) . '日' . '-'
                . date("Y", $where['search']['end']) . '年' . date("m", $where['search']['end']) . '月' . date("d", $where['search']['end']) . '日';
            $list[$k]['fen_qian_lv'] = $v['fen_qian_order'] / $v['fen_order'] * 100;
            $list[$k]['zeng_qian_lv'] = $v['zeng_qian_order'] / $v['zeng_order'] * 100;
            $list[$k]['qian_lv'] = $v['qian_order'] / $v['fa_order'] * 100;
            $list[$k]['all_liang_order'] = (int)$v['fen_liang_order'] + (int)$v['zeng_liang_order'];
        }
        return $list;
    }

    /**
     * 获取城市各类型  订单统计数据
     * @param $where
     * @return mixed
     */
    public function getCityOrdersAllList($where, $group = '')
    {
        $list = D('orders')->getCityOrdersAllList($where['map'], $group);
        foreach ($list as $k=>$v){
            $list[$k]['all_liang_order'] = (int)$v['fen_liang_order'] + (int)$v['zeng_liang_order'];
            $list[$k]['all_liang_rel_order'] = (int)$v['fen_liang_rel_order'] + (int)$v['zeng_liang_rel_order'];
        }
        return $list;
    }

    /**
     * 获取当前渠道时间段内 所有信息
     */
    public function getOrdersDetailList($where)
    {
        $list = D('orders')->getOrdersDetailList($where['map'], 't.id');
        return $list;
    }

    /**
     * 获取签单审核列表
     * @return [type] [description]
     */
    public function getQianDanList($city_id,$id,$begin,$end,$status,$state,$city,$company)
    {
        $monthEnd = mktime(23,59,59,date("m"),date("d"),date("Y"));
        $monthStart = strtotime("-3 month",$monthEnd);

        if (!empty($begin) && !empty($end)) {
           $monthStart = strtotime($begin);
           $monthEnd = strtotime($end) + 86400 -1;
        }

        $count = D("Orders")->getQianDanListCount($city_id,$id,$monthStart,$monthEnd,$status,$state,$city,$company);
        if ($count > 0) {
            import('Library.Org.Util.Page');
            $page = new \Page($count,20);
            $result = D("Orders")->getQianDanList($city_id,$id,$monthStart,$monthEnd,$status,$state,$city,$company,$page->firstRow, $page->listRows);
            $show = $page->show();
            foreach ($result as $key => $value) {
                $ids[] = $value["id"];
            }

            //获取订单电话记录数量
            $logs = D("Home/Logic/LogTelcenterOtherordercallLogic")->getOrderTelRecordCount($ids);
            foreach ($result as $key => $value) {
                foreach ($logs as $val) {
                    if ($value["id"] == $val["orderid"]) {
                        $result[$key]["tel_count"] = $val["count"];
                    }
                }
            }
        }

        return array("list" => $result, "page" => $show);
    }

    public function editOrder($id,$data)
    {
        return D("Orders")->editOrder($id,$data);
    }

    public function getOrderInfo($id)
    {
        //查询订单信息
        $order = D('Home/Orders');
        $info = $order->findOrderInfo($id);
        if (count($info) == 0) {
            $this->ajaxReturn(array("code" => 404, 'info' => '该订单不存在'));
        }
        //如果经度纬度存在
        if(!empty(floatval($info["lng"]))&&!empty(floatval($info["lat"]))){
            $info["jingwei"] = $info["lng"].",".$info["lat"];
        }

        if ($info["nf_time"] == "0000-00-00") {
            $info["nf_time"] = "";
        }

        //计算订单状态
        if ($info['on'] == 0 && $info['on_sub'] == 9) {
            $info["orderstatus"] = 1;
        } elseif ($info['on'] == 2) {
            $info["orderstatus"] = 2;
        } elseif ($info['on'] == 4 && $info['type_fw'] == 0) {
            $info["orderstatus"] = 3;
        } elseif ($info['on'] == 4 && $info['type_fw'] == 1) {
            $info["orderstatus"] = 4;
        } elseif ($info['on'] == 4 && $info['type_fw'] == 2) {
            $info["orderstatus"] = 6;
        } elseif ($info['on'] == 4 && $info['type_fw'] == 3) {
            $info["orderstatus"] = 5;
        } elseif ($info['on'] == 4 && $info['type_fw'] == 4) {
            $info["orderstatus"] = 7;
        } elseif ($info['on'] == 5) {
            $info["orderstatus"] = 8;
        }

        $exp = array_filter(explode("；", $info["text"]));
        $info["text_array"] = $exp;

        if ($info["openeye_st"] == 1) {
            $info["tel"] = $info["tel8"];
        }

        $info["lasttime"] = empty($info["lasttime"]) ? "" : $info["lasttime"];
        $info["xiaoqu"] = trim($info["xiaoqu"]);
        return $info;
    }

    public function updateOrderInfo($data)
    {
        $save = [
            'lasttime' => time()
        ];
        if ($data['visitime']) {
            $save['visitime'] = $data['visitime'];
        }
        if ($data['huifan']) {
            $save['huifan'] = $data['huifan'];
        }
        if ($data['visitime']) {
            return D("Orders")->editOrder($data['orderid'], $save);
        } else {
            return [];
        }
    }

    /**
     * 获取订单信息
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function getSingleOrderInfo($order_id)
    {
        return D("Orders")->getOrderInfo($order_id);
    }

    /**
     * 获取分单信息
     * @param  [type] $order_id [description]
     * @return [type]           [description]
     */
    public function getOrderComapny($order_id)
    {
        $result = D("OrderInfo")->getOrderComapny($order_id);
        foreach ($result as $key => $value) {
            $company[] = $value["jc"];
        }
        return $company;
    }

    public function addQiandanLog($type, $orderid, $action, $data='')
    {
       return D("Home/Db/LogQiandanchk")->add_log($type, $orderid, $action, $data='');
    }

    /**
     * 转订单城市
     * @param  [array] $data [转单信息]
     * @return mixed
     */
    public function turn_order($data)
    {
        if (empty($data['city'][0]) || empty($data['city'][1]) || empty($data['city'][2])) {
            return ['code' => '404', 'errmsg' => '请选择转单城市'];
        }
        //获取订单信息
        $info = D('Home/Orders')->findOrderInfo($data['id']);
        $subData = array(
            'sf' => $data['city'][0],
            'cs' => $data['city'][1],
            'qx' => $data['city'][2]
        );
        $result = D('Home/Orders')->editOrder($data['id'], $subData);
        if ($result !== false) {
            //添加转单日志
            $source = array(
                'username' => session('uc_userinfo.name'),
                'admin_id' => session('uc_userinfo.id'),
                'orderid' => $data['id'],
                'type' => 1,
                'postdata' => json_encode($info),
                'addtime' => time()
            );
            D('LogEditorders')->addLog($source);
            return ['code' => '200','errmsg' => '操作成功！'];
        }
        return ['code' => '404', 'errmsg' => '操作失败！'];
    }


    /**
     * 获取历史签单小区信息
     * @param  [string] $xiaoqu [小区]
     * @param  [string] $cs [城市ID]
     * @return mixed
     */
    public function orderHistory($xiaoqu, $cs)
    {
        $list = [];
        if (!empty($xiaoqu)) {
            //获取分词
            $result = getFenCi($xiaoqu);
            $fxList[] = $xiaoqu;
            foreach ($result as $key => $value) {  //取分词结果为2个字以上的
                if ((mb_strlen($value['word'], 'utf-8')) > 1) {
                    $fxList[] = $value['word'];
                }
            }

            //查询小区签单历史
            $result = D("Orders")->getQianDanHistory($fxList, $cs);
            if (count($result) > 0) {
                $list[$xiaoqu] = [];
                foreach ($result as $key => $value) {
                    if ($value["xiaoqu"] == $xiaoqu) {
                        $list[$xiaoqu]["child"][] = array(
                            "jc" => $value["jc"],
                            "count" => $value["count"],
                            "on" => $value["on"],
                            "time" => date("Y-m-d", $value["qiandan_addtime"])
                        );
                    } else {
                        $list[$value["xiaoqu"]]["child"][] = array(
                            "jc" => $value["jc"],
                            "count" => $value["count"],
                            "on" => $value["on"],
                            "time" => date("Y-m-d", $value["qiandan_addtime"])
                        );
                    }
                }
            }
        }
        return $list;
    }

    /**
     * 字段统计列表
     * @return [type] [description]
     */
    public function getOrderFieldStatList($begin,$end,$city,$state)
    {
        $monthStart = mktime(0,0,0,date("m"),1,date("Y"));
        $monthEnd = mktime(23,59,59,date("m"),date("t"),date("Y"));

        if (!empty($begin) && !empty($end)) {
            $monthStart = strtotime($begin);
            $monthEnd = strtotime($end)+86400-1;
        }

        if (!empty($state)) {
            $on = 4;
        }

        $result = D("Home/Orders")->getOrderFieldStatList($monthStart,$monthEnd,$city,$on);

        $list = [];
        $field = [
            "cs" => "城市",
            "qx" => "区域",
            "xiaoqu" => "小区名称",
            "mianji" => "面积(m2)",
            "yusuan" => "预算"
        ];

        foreach ($result as $key => $value) {
            if (!array_key_exists($value["field"],$list)) {
                $list[$value["field"]] = $value;
            }

            $list[$value["field"]]["name"] = $field[$value["field"]];
            //自填率=自填数量/订单总数
            $list[$value["field"]]["before_rate"] = setInfNanToN(round($value["before_count"]/$value["all_count"],4))*100;

            //修改率 = 修改数量/自填数量
            $list[$value["field"]]["update_rate"] = setInfNanToN(round($value["update_count"]/$value["before_count"],4))*100;

            //代填率=代填数量/订单总数
            $list[$value["field"]]["after_rate"] = setInfNanToN(round($value["after_count"]/$value["all_count"],4))*100;
        }

        return $list;
    }

    public function getOrderFieldStat($order_id)
    {
        $field = ["cs","qx","xiaoqu","mianji","yusuan"];
        $list = D("Home/Orders")->getOrderField($order_id,$field);
        foreach ($list as $key => $value) {
            $list[$key]["time"] = empty($value["time"])?"--":date("Y-m-d H:i:s",$value["time"]);
        }
        return $list;
    }

    public function updateFieldStat($order_id,$field,$data)
    {
        return D("Home/Orders")->editOrderField($order_id,$field,$data);
    }

    public function getCustomerLfStat($id,$group,$manager,$begin,$end)
    {
        $month_start = mktime(00,00,00,date("m"),1,date("Y"));
        $month_end =   mktime(23,59,59,date("m"),date("t"),date("Y"));

        if (!empty($begin) && !empty($end)) {
            $month_start = strtotime($begin);
            $month_end =   strtotime($end)+86400-1;
        }

        //1.获取客服数据
        $users = D("Adminuser")->getKfLoginDayByPool($id,$group,$manager,$month_start,$month_end);

        //获取发单量/实际分单量
        $result = D("OrderPool")->getKfOrdereffective($id,$group,$manager,$month_start,$month_end);

        foreach ($result as $key => $value) {
            $orders[$value["op_uid"]] = array(
                "all" => $value["all"],
                "fen" => $value["fen"],
                "zen" => $value["zen"]
            );
        }

        //获取量房数据
        $result = D('OrderPool')->getCustomerLfList($month_start,$month_end);

        foreach ($result as $key => $value) {
            $lfList[$value["user_id"]] = array(
                "fen_lf_count" => $value["fen_lf_count"],
                "fen_un_lf_count" => $value["fen_un_lf_count"],
                "zen_lf_count" => $value["zen_lf_count"],
                "zen_un_lf_count" => $value["zen_un_lf_count"]
            );
        }

        //合并数据
        foreach ($users as $key => $value) {
            $value["kfmanager"] = str_replace(",", "", $value["kfmanager"]);
            //统计人
            $users[$key]["all"] = $orders[$value["id"]]["all"];
            $users[$key]["fen"] = $orders[$value["id"]]["fen"];
            $users[$key]["zen"] = $orders[$value["id"]]["zen"];
            $users[$key]["fen_lf_count"] = $lfList[$value["id"]]["fen_lf_count"];
            $users[$key]["fen_un_lf_count"] = $lfList[$value["id"]]["fen_un_lf_count"];
            $users[$key]["zen_lf_count"] = $lfList[$value["id"]]["zen_lf_count"];
            $users[$key]["zen_un_lf_count"] = $lfList[$value["id"]]["zen_un_lf_count"];

            //按组
            $groups[$value["kfgroup"]]["name"] = $value["groupmanager"];
            $groups[$value["kfgroup"]]["manager"] = $value["manager"];
            $groups[$value["kfgroup"]]["all"] += $orders[$value["id"]]["all"];
            $groups[$value["kfgroup"]]["fen"] += $orders[$value["id"]]["fen"];
            $groups[$value["kfgroup"]]["zen"] += $orders[$value["id"]]["zen"];
            $groups[$value["kfgroup"]]["fen_lf_count"] += $lfList[$value["id"]]["fen_lf_count"];
            $groups[$value["kfgroup"]]["fen_un_lf_count"] += $lfList[$value["id"]]["fen_un_lf_count"];
            $groups[$value["kfgroup"]]["zen_lf_count"] += $lfList[$value["id"]]["zen_lf_count"];
            $groups[$value["kfgroup"]]["zen_un_lf_count"] += $lfList[$value["id"]]["zen_un_lf_count"];

            //按师
            $managers[$value["manager"]]["child"][$value["kfgroup"]]["name"] = $value["kfgroup"];
            $managers[$value["manager"]]["child"][$value["kfgroup"]]["all"] += $orders[$value["id"]]["all"];
            $managers[$value["manager"]]["child"][$value["kfgroup"]]["fen"] += $orders[$value["id"]]["fen"];
            $managers[$value["manager"]]["child"][$value["kfgroup"]]["zen"] += $orders[$value["id"]]["zen"];
            $managers[$value["manager"]]["child"][$value["kfgroup"]]["fen_lf_count"] += $lfList[$value["id"]]["fen_lf_count"];
            $managers[$value["manager"]]["child"][$value["kfgroup"]]["fen_un_lf_count"] += $lfList[$value["id"]]["fen_un_lf_count"];
            $managers[$value["manager"]]["child"][$value["kfgroup"]]["zen_lf_count"] += $lfList[$value["id"]]["zen_lf_count"];
            $managers[$value["manager"]]["child"][$value["kfgroup"]]["zen_un_lf_count"] += $lfList[$value["id"]]["zen_un_lf_count"];

            $managers[$value["manager"]]["name"] = $value["manager"];
            $managers[$value["manager"]]["all"] += $orders[$value["id"]]["all"];
            $managers[$value["manager"]]["fen"] += $orders[$value["id"]]["fen"];
            $managers[$value["manager"]]["zen"] += $orders[$value["id"]]["zen"];
            $managers[$value["manager"]]["fen_lf_count"] += $lfList[$value["id"]]["fen_lf_count"];
            $managers[$value["manager"]]["fen_un_lf_count"] += $lfList[$value["id"]]["fen_un_lf_count"];
            $managers[$value["manager"]]["zen_lf_count"] += $lfList[$value["id"]]["zen_lf_count"];
            $managers[$value["manager"]]["zen_un_lf_count"] += $lfList[$value["id"]]["zen_un_lf_count"];

            //总计
            $all["all"] += $orders[$value["id"]]["all"];
            $all["fen"] += $orders[$value["id"]]["fen"];
            $all["zen"] += $orders[$value["id"]]["zen"];
            $all["fen_lf_count"] += $lfList[$value["id"]]["fen_lf_count"];
            $all["fen_un_lf_count"] += $lfList[$value["id"]]["fen_un_lf_count"];
            $all["zen_lf_count"] += $lfList[$value["id"]]["zen_lf_count"];
            $all["zen_un_lf_count"] += $lfList[$value["id"]]["zen_un_lf_count"];
        }
        return array("users"=>$users,"group" => $groups,"manager" => $managers,"all" => $all);
    }
}