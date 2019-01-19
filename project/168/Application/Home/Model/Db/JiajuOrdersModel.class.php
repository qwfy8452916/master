<?php

namespace Home\Model\Db;

use Think\Model;

class JiajuOrdersModel extends Model
{
    protected $tableName = "jiaju_order";

    public function getOrderInfo($map)
    {
        return $this->alias('o')
            ->field('o.*,p.op_name as chk_name,c.cname,q.qz_area')
            ->join('left join qz_jiaju_order_pool p on o.id = p.orderid')
            ->join('left join qz_jiaju_quyu c on c.cid = o.cs')
            ->join('left join qz_area q on q.qz_areaid = o.qx')
            ->where($map)
            ->select();
    }

    /**
     * [orderpublish 发布订单]
     * @param  [array] $data   [传入订单参数]
     * @param  [str]   $method [方法. insert 为新增. update为修改]
     * @return [str]   [成功返回 单号  失败返回 false]
     */
    public function orderpublish($data)
    {
        $edit_id = $data['edit_id'];
        unset($data['edit_id']);
        $data['time'] = time(); //订单发布时间. 待定订单,客服后台也许会改动这个时间
        $data['time_real'] = time(); //原始真实 订单发布时间,订单生成后就不需要再改动
        if(!$edit_id){
            //新增订单
            $data['id'] = 'J' . date('Ymd') . sprintf("%05d%03d", time() % 86400, mt_rand(1, 1000)); // 生成订单号
            //$data['userid']    = Session::get('id');

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

            if ($addorder = M("jiaju_order")->add($data)) {
                //渠道来源只添加qz_jiaju_yy_order_info
                $yy_data = [
                    'oid' => $data['id'],
                    'src' => $data['source_src'],
                    'time' => time(),
                ];
                M('jiaju_yy_order_info')->add($yy_data);

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
                M('jiaju_orders_status_change')->add($data_sc_et);

                //增加订单log_order_switchstatus表记录
                //订单状态改变记录表
                $switchstatus = array(
                    "orderid" => $data['id'],
                    "user_id" => session("uc_userinfo.id"),
                    "name" => session("uc_userinfo.name"),
                    "addtime" => time()
                );
                M("jiaju_log_order_switchstatus")->add($switchstatus);


                // 记录当前发布IP 发过的订单
                $this->ip_order($data['ip'], $data['id']);
                return $data['id']; //返回订单号
            } else {
                return FALSE;
            }
        }else{
            return M("jiaju_order")->where(['id'=>['eq',$edit_id]])->save($data);
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
                $retSet = M('jiaju_order')->where($map)->count();
            }
        }
        return $retSet;
    }

    public function getOrdersInfoByTel($tel)
    {
        $map['t.tel8'] = ['eq',$tel];
        return M('jiaju_order')->alias('o')
            ->join('safe_order_tel8 t on t.orderid = o.id')
            ->field('o.id')
            ->where($map)->find();
    }
}