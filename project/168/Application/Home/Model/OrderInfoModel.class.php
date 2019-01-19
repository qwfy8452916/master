<?php

namespace Home\Model;

Use Think\Model;

/**
 *
 */
class OrderInfoModel extends Model
{
    /**
     * 删除分配订单信息
     * @return [type] [description]
     */
    public function delOrderInfo($orderid)
    {
        $map = array(
            "order" => array("eq", $orderid)
        );
        return M("order_info")->where($map)->delete();
    }

    /**
     * 获取订单分配装修公司
     * @param  [type] $orderid [description]
     * @return [type]          [description]
     */
    public function getOrderComapny($orderid)
    {
        $map = array(
            "a.order" => array("eq", $orderid)
        );
        return M("order_info")->alias("a")->where($map)
            ->join('join qz_user u on u.id = a.com')
            ->field("a.isread,a.readtime,u.jc,u.id,a.type_fw,a.addtime,u.qq,u.qq1")
            ->select();
    }

    /**
     * 删除分配订单装修公司信息
     * @return [type] [description]
     */
    public function delOrderCompany($orderid, $companys)
    {
        $map = array(
            "order" => array("eq", $orderid),
            "com" => array("IN", $companys)
        );
        return M("order_info")->where($map)->delete();
    }

    /**
     * 添加分单信息
     * @param [type] $data [description]
     */
    public function addInfo($data)
    {
        return M("order_info")->add($data);
    }

    /**
     * 获取最新的一次分单信息
     * @param  [type] $cs [description]
     * @return [type]     [description]
     */
    public function getLastTypeFw($id, $cs)
    {
        $map = array(
            "a.order" => array("NEQ", $id),
            "a.type_fw" => array("IN", array(1)),
            "o.cs" => array("EQ", $cs)
        );
        $buildSql = M("order_info")->where($map)->alias("a")->join("join qz_orders o FORCE INDEX(idx_cs_on) on o.id = a.order")->order("a.id desc")->field("order")->limit(1)->buildSql();

        return M("order_info")->table($buildSql)->alias("t")
            ->join("join qz_order_info info on info.order = t.order")
            ->join("join qz_user u on u.id = info.com")
            ->field("u.id,u.cs,u.jc")->select();
    }

    //记录后台发单内容
    public function adminPostAddContent($data)
    {
        if (empty($data)) {
            return false;
        }
        return M('admin_post_order')->add($data);
    }

    /**
     * [order_chk_tel 简单判断电话号码 允许包含数组和短杠- 位数为7-18位]
     * @param  [type] $tel [电话号码]
     * @return [type] $re array  [返回数组 status 状态 1;info 提示信息]
     */
    public function order_chk_tel($tel)
    {
        $istel = preg_match('/^[0-9-\-]{7,18}$/', $tel);
        if (!$istel) {
            $re['status'] = 0;
            $re['info'] = '电话格式不对,您可以留你的手机号码:-)';
            return $re;
        } else {
            $re['status'] = 1;
            $re['info'] = '电话号码验证成功!';
            return $re;
        }
    }

    //根据用户ID字段取管理员用户信息
    public function getAdminUserByUserID($id)
    {
        $map['id'] = array('eq', $id);
        return M("adminuser")->where($map)->find();
    }

    public function getVipOrderCountByCompanyIds($companyIds, $startTime = '', $endTime = ''){
        if (empty($companyIds)) {
            return false;
        }
        if (!is_array($companyIds)) {
            $companyIds = array($companyIds);
        }

        //默认开始时间为本月初,左开右闭
        if (empty($startTime)) {
            $startTime = strtotime(date('Y-m-01 00:00:00'));
        }

        //默认结束时间为本月末
        if (empty($endTime)) {
            $endTime = strtotime(date('Y-m-01') . ' +1 month');
        }

        $map['addtime'] = array(
            array('EGT', $startTime),
            array('LT', $endTime)
        );

        $map['com'] = array('IN', $companyIds);

        $result = M('order_info')->field('com AS company_id, count(id) AS number')->where($map)->group('com')->select();
        return $result;
    }

    /**
     * 检查一个电话号码是否在黑名单内
     * @param  str $telNumber 电话号码
     * @return false or 找到的数量
     */
    public function checkTelIsBlock($telNumber)
    {
        if (empty($telNumber)) {
            return false;
        }
        $map = array();
        $map['tel'] = array('EQ', $telNumber); //号码
        $map['status'] = array('EQ', 1); //有效

        $res = M('order_blacklist')->where($map)->count();

        if ($res > 0) {
            return $res;
        }

        return false;
    }

    /**
     * [orderpublish 发布订单]
     * @param  [array] $data   [传入订单参数]
     * @param  [str]   $method [方法. insert 为新增. update为修改]
     * @return [str]   [成功返回 单号  失败返回 false]
     */
    public function orderpublish($data, $method)
    {
        if ($method == "insert") {
            //新增订单
            //$data['id']   = date('Ymd').substr(implode(NULL, array_map('ord', str_split(substr(uniqid(), 7, 13), 1))), 0, 8); // 生成订单号
            $data['id'] = date('Ymd') . sprintf("%05d%03d", time() % 86400, mt_rand(1, 1000)); // 生成订单号
            $data['time'] = time(); //订单发布时间. 待定订单,客服后台也许会改动这个时间
            $data['time_real'] = time(); //原始真实 订单发布时间,订单生成后就不需要再改动
            //$data['userid']    = Session::get('id');

            if (empty($data['cs'])) {
                $data['cs'] = Session::get('CITY_ID');
            }


            // 电话号码安全入库
            $tel8 = $data['tel'];
            M()->table('safe_order_tel8')->add(array(
                'orderid' => $data['id'],
                'tel8' => $tel8,
            ));

            //安全入库后. 处理入库orders表的为 星号
            //如果是手机号码11位
            if (11 == strlen($tel8)) {
                $data['tel'] = substr($tel8, 0, 3) . '*****' . substr($tel8, -3);
            } else {
                $data['tel'] = substr($tel8, 0, -3) . '***';
            }

            //存放一个加密电话号码用于订单号码搜索用途
            $data['tel_encrypt'] = D("Orders")->order_tel_encrypt($tel8);

            if ($addorder = M("orders")->add($data)) {
                $data_et['orderid'] = $data['id']; // '订单号和 orders表中的id对应',
                $data_et['source'] = (int)$data['source']; // '来源网址 和orders表中的source应该一致',
                $data_et['source_src'] = empty($data['source_src']) ? '' : $data['source_src']; //渠道标记代号src
                $data_et['source_src_id'] = (int)$data['source_src_id']; //渠道标记代号src的id

                if (!empty($data['source_in'])) {
                    $data_et['source_in'] = $data['source_in']; // '来源入口 默认0  比如微信10 和orders表中的source_in应该一致',
                }
                $data_et['source_type'] = empty($data['source_type']) ? 0 : $data['source_type']; // '1 51客服, 2 400电话, 3 QQ咨询, 4 业主发布 和orders表中的source_type应该一致',
                if (!empty($_SERVER['HTTP_REFERER'])) {
                    $data_et['referer'] = $_SERVER['HTTP_REFERER']; // ' 发布页的HTTP Referer',
                }

                $data_et['select_desid'] = (int)$data['select_desid']; // '选择的设计师',
                $data_et['select_comid'] = (int)$data['select_comid']; // '选择的装修公司',
                $data_et['display_type'] = (int)$data['display_type']; // '显示类型 默认0  1为开放给公司人员查看',
                $data_et['addtime'] = $data['time']; // '增加时间',
                $redata_et = $this->orderFieldHaveon($data); //订单项有填写标记
                if (!empty($redata_et)) {
                    $data_et = array_merge($data_et, $redata_et);
                }
                M('orders_source')->add($data_et);

                //增加订单的初始状态扩展表
                $data_sc_et = array();
                $data_sc_et['orderid'] = $data['id']; //订单id
                $data_sc_et['on'] = 0; //新单0
                $data_sc_et['on_sub'] = 10; //on=0子状态默认10
                if (empty($data['cs'])) {
                    $data_sc_et['cs'] = '000001'; //默认
                } else {
                    $data_sc_et['cs'] = (int)$data['cs']; //订单发布城市
                }
                $data_sc_et['type_fw'] = 0; // 分 赠送 默认 0
                $data_sc_et['time_add'] = $data['time']; //订单发布时间
                M('orders_status_change')->add($data_sc_et);

                //增加订单log_order_switchstatus表记录
                //订单状态改变记录表
                $switchstatus = array(
                    "orderid" => $data['id'],
                    "user_id" => session("uc_userinfo.id"),
                    "name" => session("uc_userinfo.name"),
                    "addtime" => time()
                );
                M("log_order_switchstatus")->add($switchstatus);


                // 记录当前发布IP 发过的订单
                $this->ip_order($data['ip'], $data['id']);
                return $data['id']; //返回订单号
            } else {
                return FALSE;
            }

        } else if ($method == "update") {
            //第二步完善订单
            $orderid = $data['orderid'];
            unset($data['orderid']);
            $com_list = $data['com_list'];
            unset($data['com_list']);

            //检查该订单状态 如果 不为 0，不可编辑
            $mapon['id'] = $orderid;
            $orderon = M('orders')->where($mapon)->select();
            if ($orderon[0]['on'] != 0) {
                return FALSE;
            }

            //城市信息：①最后一次若城市未填，则城市归为总站，区域为空。②最后一次若城市已填，区域未填，区域归为其他。
            if (!empty($data["cs"])) {
                if (empty($data['qx'])) {
                    //区域未填，获取城市的‘其他’区域
                    $map['fatherid'] = $data["cs"];
                    $map['qz_area'] = '其他';
                    $qx = M('area')->where($map)->field('qz_areaid')->find();
                    $data['qx'] = $qx['qz_areaid'];
                }
            }

            unset($data['time_real']);
            unset($data['time']);
            unset($data['tel']);
            /* 第二步就没有必要动电话号码了
            //orders表中电话处理
            if ($data['tel']) {
                $data['tel']   = substr($tel8,0,3) .'*****'. substr($tel8,-3);
            }*/

            $onmap['id'] = $orderid;
            $saveorder = M("orders")->where($onmap)->save($data); //保存订单信息

            if ($saveorder) {

                //如果自助选择了 喜欢的装修公司
                if ($data['type'] == 1 || !empty($com_list)) {
                    $order_info = M('order_infofb');
                    $fbmap['orderid'] = array('eq', $orderid);
                    $order_info->where($fbmap)->delete();
                    $a = rtrim($com_list, ',');
                    $b = explode(',', $a);
                    for ($i = 0; $i < count($b); $i++) {
                        $data3['comid'] = $b[$i];
                        $data3['orderid'] = $orderid;
                        $data3['addtime'] = time();
                        $order_info->data($data3)->add();
                    }

                }

                return $orderid; //返回订单号码
            } else {
                return FALSE;
            }
        } else {
            //未定义的 $method
            return FALSE;
        }
    }

    // 一个IP 发过哪些订单
    public function ip_order(&$ip_str, $order_id = '')
    {
        $retSet = array();
        $redis = new \Redis();
        if (!empty($ip_str)) {
            $res = $redis->connect(C('REDIS_HOST'), C('REDIS_PORT'), 1);
            if ($res != false) {
                $redis->select(C('REDIS_DB_STAT'));
                foreach (explode(',', $ip_str) as $ip) {
                    if (is_external_ip($ip))
                        break;
                }
                if (isset($ip)) {
                    $ol = $redis->hGet('ipcnt', $ip);
                    $ol = $ol ? unserialize($ol) : array();

                    // 这个ip 又发了一个订单
                    if (!empty($order_id) && !in_array($order_id, $ol)) {
                        $ol[] = $order_id;
                        $redis->hSet('ipcnt', $ip, serialize($ol));
                    }

                    $ip_str = $ip;
                    $retSet = count($ol);
                } else
                    $ip_str = '';
                $redis->close();
            } else {
                $map = array('ip' => $ip_str);
                $retSet = M('orders')->where($map)->count();
            }
        }
        return $retSet;
    }

    /**
     * 发布订单 订单项填写标记
     * @param  array $data 订单项目
     * @return array 标记
     */
    public function orderFieldHaveon($data)
    {
        if (!empty($data)) {
            $data = array_filter($data); //过滤空
            $redata = array(); //标记返回数据
            foreach ($data as $key => $value) {
                switch ($key) {
                    case 'name':
                        $redata['have_name'] = 1;
                        break;
                    case 'sex':
                        $redata['have_sex'] = 1;
                        break;
                    case 'cs':
                        $redata['have_cs'] = 1;
                        break;
                    case 'qx':
                        $redata['have_qx'] = 1;
                        break;
                    case 'xiaoqu':
                        $redata['have_xiaoqu'] = 1;
                        break;
                    case 'mianji':
                        $redata['have_mianji'] = 1;
                        break;
                    case 'yusuan':
                        $redata['have_yusuan'] = 1;
                        break;
                    case 'start':
                        $redata['have_start'] = 1;
                        break;
                    default:
                        # code...
                        break;
                }
            }
            return $redata;
        }
        return false;
    }

    /**
     * 查询单个客服人员在某个途径的订单数量
     * @param  [type]       []
     * @return [type]       [descri ption]
     */
    public function getOrderWithName($source_type, $name, $time = null)
    {
        //查询某人的400订单总量（分1|赠2）
        //关联查询某人的后台400订单量（分1|赠2）
        //前台400订单量 = 总 - 后台量 (分1|赠2)
        //1 53客服, 2 400电话, 3 QQ咨询


        //分单
        //1,查询某人的400电话分单
        $map_fen['o.zhuanfaren'] = array('eq', $name);
        $map_fen['o.source_type'] = array('eq', $source_type);
        $map_fen['o.type_fw'] = array('eq', 1);//1是分单 2是赠单
        if (!empty($time)) {
            $map_fen['o.lasttime'] = array(array('gt', $time['start']), array('lt', $time['end']));
        }
        $fen_zong = M('orders')->alias("o")
            ->where($map_fen)
            ->field("count(*) as num")
            ->select();
        //2，关联查询某人的后台发单数量
        $where_fen = array(
            "o.zhuanfaren" => array("EQ", $name),
            "o.source_type" => array("EQ", $source_type),
            "o.type_fw" => array("EQ", 1),
            's.source_src_id' => array('eq', 164)
        );//强制为客服类别订单
        if (!empty($time)) {
            $where_fen['o.lasttime'] = array(array('gt', $time['start']), array('lt', $time['end']));
        }
        $houtai_fen = M('orders')->alias("o")
            ->join("INNER JOIN qz_admin_post_order p on p.orderid = o.id")
            ->join("INNER JOIN qz_orders_source s on o.id = s.orderid")
            ->where($where_fen)
            ->field("count(*) as num")
            ->select();
        $arr['houtai_fen'] = $houtai_fen[0]['num'];
        $arr['qiantai_fen'] = ($fen_zong[0]['num'] - $houtai_fen[0]['num']);

        //赠单
        //1,查询某人的400电话赠单
        $map_zeng['o.zhuanfaren'] = array('eq', $name);
        $map_zeng['o.source_type'] = array('eq', $source_type);
        $map_zeng['o.type_fw'] = array('eq', 2);//1是分单 2是赠单
        if (!empty($time)) {
            $map_zeng['o.lasttime'] = array(array('gt', $time['start']), array('lt', $time['end']));
        }
        $zeng_zong = M('orders')->alias("o")
            ->where($map_zeng)
            ->field("count(*) as num")
            ->select();
        //2，关联查询某人的后台赠单数量
        $where_zeng = array(
            "o.zhuanfaren" => array("EQ", $name),
            "o.source_type" => array("EQ", $source_type),
            "o.type_fw" => array("EQ", 2),
            's.source_src_id' => array('eq', 164)
        );
        if (!empty($time)) {
            $where_zeng['o.lasttime'] = array(array('gt', $time['start']), array('lt', $time['end']));
        }
        $houtai_zeng = M('orders')->alias("o")
            ->join("INNER JOIN qz_orders_source s on o.id = s.orderid")
            ->join("INNER JOIN qz_admin_post_order p on p.orderid = o.id")
            ->where($where_zeng)
            ->field("count(*) as num")
            ->select();
        $arr['houtai_zeng'] = $houtai_zeng[0]['num'];
        $arr['qiantai_zeng'] = ($zeng_zong[0]['num'] - $houtai_zeng[0]['num']);

        return $arr;
    }


    /**
     * 查询后台发单人的总订单数
     * @param  [zhuanfastr]         [转发人姓名拼接字符串]
     * @return [time]               [时间数组]
     */
    //前台+后台所有订单
    public function getAllOrders($zhuanfastr, $time)
    {
        //主要参数 source_type  1为53客服  2为400客服  3为QQ客服
        //type_fw 1为分单 2为赠单
        if (!empty($time)) {
            $map['n.lasttime'] = array(array('gt', $time['start']), array('lt', $time['end']));
            $map['o.on'] = 4;
        }
        $map['o.source_type'] = array('lt', 4);
        $map['o.zhuanfaren'] = array('in', $zhuanfastr);
        $map['o.type_fw'] = array('lt', 3);

        $totalorders = M('orders')->alias('o')
            ->join('qz_order_csos_new as n on o.id = n.order_id')
            ->where($map)
            ->field('o.id,o.type_fw,o.zhuanfaren,o.source_type')
            ->select();
        return $totalorders;
    }

    /**
     * 查询后台发单人在后台发单入口发单总数
     * @param  [zhuanfastr]         [转发人姓名拼接字符串]
     * @return [time]               [时间数组]
     */
    public function getAllAdOrders($zhuanfastr, $time)
    {
        if (!empty($time)) {
            $map['n.lasttime'] = array(array('gt', $time['start']), array('lt', $time['end']));
        }
        $map['o.source_type'] = array('lt', 4);
        $map['o.zhuanfaren'] = array('in', $zhuanfastr);
        $map['o.type_fw'] = array('lt', 3);
        //'s.source_src_id'=>array('eq', 164)
        $map['s.source_src_id'] = array('eq', 164);//强制查询后台入口的发单
        $adtotals = M('orders')->alias("o")
            ->join("INNER JOIN qz_orders_source s on o.id = s.orderid")
            ->join("INNER JOIN qz_admin_post_order p on p.orderid = o.id")
            ->join('INNER JOIN qz_order_csos_new as n on o.id = n.order_id')
            ->where($map)
            ->field('o.id,o.type_fw,o.zhuanfaren,o.source_type')
            ->select();
//        var_dump(M()->getLastSql());
        return $adtotals;
    }

    /**
     * 查询后台发单人的总订单数
     * @return [time]               [时间数组]
     */
    //前台+后台所有订单
    public function getAllOrder($zhuanfastr,$time)
    {
        //主要参数 source_type  1为53客服  2为400客服  3为QQ客服
        //type_fw 1为分单 2为赠单
        if (!empty($time)) {
            $map['n.lasttime'] = array(array('gt', $time['start']), array('lt', $time['end']));
            $map['n.order_on'] = 4;
        }
        $map['o.source_type'] = array('lt', 4);
        $map['o.zhuanfaren'] = array('in', $zhuanfastr);
        $map['o.type_fw'] = array('lt', 3);

        $totalorders = M('orders')->alias('o')
            ->join('qz_order_csos_new as n on o.id = n.order_id')
            ->where($map)
            ->field('o.id,o.type_fw,o.source_type,n.lasttime')
            ->select();
         return $totalorders;
    }

//* 查询后台发单人在后台发单入口发单总数
//* @param  [zhuanfastr]         [转发人姓名拼接字符串]
//* @return [time]               [时间数组]
//*/
    public function getAllAdOrder($zhuanfastr, $time)
    {
        if (!empty($time)) {
            $map['n.lasttime'] = array(array('gt', $time['start']), array('lt', $time['end']));
        }
        $map['o.source_type'] = array('lt', 4);
        $map['o.zhuanfaren'] = array('in', $zhuanfastr);

        $map['o.type_fw'] = array('lt', 3);
        //'s.source_src_id'=>array('eq', 164)
        $map['s.source_src_id'] = array('eq', 164);//强制查询后台入口的发单
        $adtotals = M('orders')->alias("o")
            ->join("INNER JOIN qz_orders_source s on o.id = s.orderid")
            ->join("INNER JOIN qz_admin_post_order p on p.orderid = o.id")
            ->join('INNER JOIN qz_order_csos_new as n on o.id = n.order_id')
            ->where($map)
            ->field('o.id,o.type_fw,o.source_type,n.lasttime')
            ->select();
//        dump(M()->getLastSql());
         return $adtotals;

    }
}