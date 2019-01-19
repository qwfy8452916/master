<?php

namespace Home\Controller;
use Home\Common\Controller\HomeBaseController;

/**
*
*/
class OrdersController extends HomeBaseController
{
    private $source_in = array(
        "0" => "-请选择-",
        "4" => "业主发布",
        "1" => "在线客服",
        "2" => "400电话",
        "3" => "QQ咨询",
        "10" => "微信咨询",
        "11" => "推广部",
        "5" => "赠送单生成",
        "100" => "非业主发布"
    );

    private $lf_time = array(
        "随时" => "随时",
        "下班后" => "下班后",
        "今天" => "今天",
        "3天内" => "3天内",
        "1周内" => "1周内",
        "2周内" => "2周内",
        "1个月内" => "1个月内",
        "2个月内" => "2个月内",
        "3个月内" => "3个月内",
        "3个月以上" => "3个月以上",
        "周末" => "周末",
        "拿房后" => "拿房后",
        "电话预约后" => "电话预约后",
        "看户型图后" => "看户型图后",
        "去实体店后" => "去实体店后",
        "其他" => "其他"
    );

    private $start_time = array(
        "1个月内开工" => "1个月内开工",
        "2个月内开工" => "2个月内开工",
        "3个月内开工" => "3个月内开工",
        "4个月内开工" => "4个月内开工",
        "5个月内开工" => "5个月内开工",
        "6个月内开工" => "6个月内开工",
        "6个月以上开工" => "6个月以上开工",
        "方案满意开工" => "方案满意开工",
        "满意拿房后开工" => "满意拿房后开工",
        "面议" => "面议"
    );

    private $keys = array(
        "1" => "有钥匙",
        "0" => "无钥匙",
        "3" => "其他"
    );

    private $lxs = array(
        "1" => "新房装修",
        "2" => "旧房装修",
        "3" => "旧房改造"
    );

    private $status = array(
        array("name"=>"状态未变","id"=>"-99","child"=>array(
                "无人接听",
                "未接通",
                "通话中",
                "空号",
                "装修公司",
                "拒绝服务",
                "开场挂",
                "核实一半挂机",
                "拒接",
                "只是看看",
                "寻求其他服务",
                "重复订单",
                "已开站无真会员",
                "地级市50公里以外面积200平以下",
                "关机",
                "停机",
                "假定单",
                "测试单",
                "否认发单",
                "已回访",
                "其他"
            )
        ),
        array("name"=>"次新单","id"=>"1","child"=>array(
                "无人接听",
                "未接通",
                "通话中",
                "空号",
                "装修公司",
                "拒绝服务",
                "开场挂",
                "核实一半挂机",
                "拒接",
                "只是看看",
                "寻求其他服务",
                "重复订单",
                "已开站无真会员",
                "地级市50公里以外面积200平以下",
                "关机",
                "停机",
                "假定单",
                "测试单",
                "否认发单",
                "过段时间联系",
                "等会联系",
                "已回访",
                "其他"
            )
        ),
        array("name"=>"待定单","id"=>"2","child"=>array(
                "无人接听",
                "未接通",
                "通话中",
                "空号",
                "装修公司",
                "拒绝服务",
                "开场挂",
                "核实一半挂机",
                "拒接",
                "只是看看",
                "寻求其他服务",
                "重复订单",
                "已开站无真会员",
                "地级市50公里以外面积200平以下",
                "关机",
                "停机",
                "假定单",
                "测试单",
                "否认发单",
                "过段时间联系",
                "已回访",
                "其他"
            )
        ),
        array("name"=>"分单","id"=>"4","child"=>array(
                "A级分配",
                "S级分配"
        )),
        array("name"=>"赠单","id"=>"6","child"=>array(
                "距离远",
                "预算低",
                "面积小",
                "交房时间长",
                "开工时间长",
                "城市未开",
                "需要垫资",
                "不能量房",
                "改动项目少",
                "与装修相关",
                "只要设计",
                "意向不强"
            )
        ),
        array("name"=>"无效","id"=>"8","child"=>array(
                "空号",
                "无人接听",
                "未接通",
                "装修公司",
                "已转家具单",
                "拒绝服务",
                "开场挂",
                "核实一半挂机",
                "拒接",
                "只是看看",
                "寻求其他服务",
                "重复订单",
                "已开站无真会员",
                "地级市50公里以外面积200平以下",
                "关机",
                "停机",
                "假定单",
                "测试单",
                "否认发单",
                "同行网站",
                "精装房",
                "已回访",
                "其他"
            )
        ),
        array("name"=>"暂时无效","id"=>"98","child"=>array(
                "地级市50公里以外面积200平以下",
                "已开站无真会员"
        ))
    );

    private $docking_status = array(
        array("name"=>"分没人跟","id"=>"0","child"=>array()),
        array("name"=>"赠没人跟","id"=>"1","child"=>array()),
        array("name"=>"撤回","id"=>"2","child"=>array(
                    "更改订单编辑内容",
                    "需要再次电话确认",
                    "订单分赠性质更改",
                    "上下备注不一致",
                    "转到下属城市"
        )),
        array("name"=>"待分配分单","id" => "3","child"=>array()),
        array("name"=>"待分配赠单","id" => "4","child"=>array()),
        array("name"=>"分单","id"=>"5","child"=>array(
                "A级分配",
                "S级分配"
        ))
    );

    private $shi = array(
        0=>"-",
        1=>1,
        2=>2,
        3=>3,
        4=>4,
        5=>5,
        6=>6,
        7=>7,
        8=>8,
        9=>9,
        10=>10
    );

    private $other = array(
            "装修公司做过同样小区" ,
            "要求装修公司规模大，有品牌" ,
            "施工过程中监控" ,
            "需要提供齐装网对装修公司的监管内容" ,
            "要看样板房或案例图片" ,
            "有公装装修经验" ,
            "只接本地电话号码，或提供装修公司号码业主自己联系" ,
            "只需要1-2家装修公司" ,
            "装修公司在小区有样板房" ,
            "设计师要有经验" ,
            "报价与实际内容相符" ,
            "年前装修好" ,
            "联系前先发短信"
    );

    private $timediff = array(
        1=>"≤15分钟",
        2=>"＞15分钟"
    );

    private $details_count = [
        1 => ['name' => '当前新订单总数', 'logo' => 'ordercountbrief_new'],
        2 => ['name' => '当前已抢未拨打新单', 'logo' => 'ordercountbrief_uncalled'],
        3 => ['name' => '当前发单量总数', 'logo' => 'ordercountbrief_publish']
    ];

    private $applystatus = array(
        1=>"待审核",
        2=>"通过",
        3=>"不通过"
    );

    public function index()
    {
        $admin = getAdminUser();

        //获取查询条件
        $param = I('get.');

        //初始化定义查询条件，目的是规范输入
        $id = 0;
        $cs = 0;
        $xiaoqu = '';
        $ip = '';
        $tel_encrypt = '';
        $isactivity =  $param["isactivity"];

        //修改后的订单发布时间筛选
        $time_start = empty($param['time_start']) ? '' : strtotime($param['time_start']);
        $time_end = empty($param['time_end']) ? '' : strtotime($param['time_end']) + 86400;

        /*S-真实发布订单时间限制*/
        //订单保鲜度，3分钟内发布的订单不能编辑查看，因为用户发布订单是按照步骤来的，订单信息会一步步补充完整
        $currentTime = time();
        if (empty($param['time_real_start']) && empty($param['time_real_end'])) {
            $time_real_start = strtotime("-90 day");
            $time_real_end = $currentTime - 180;
        } elseif (!empty($param['time_real_start']) && empty($param['time_real_end'])) {
            $time_real_start = strtotime($param['time_real_start']);
            $time_real_end = $currentTime - 180;
        } elseif (empty($param['time_real_start']) && !empty($param['time_real_end'])) {
            $time_real_end = strtotime($param['time_real_end']);
            if ($time_real_end > $currentTime - 180) {
                $time_real_end = $currentTime - 180;
            }
            //开始时间为结束时间减去90天的时间 90 * 24 * 3600;
            $time_real_start = $time_real_end - 7776000;
        } else {
            $time_real_start = strtotime($param['time_real_start']);
            $time_real_end = strtotime($param['time_real_end']);
            if ($time_real_end > $currentTime - 180) {
                $time_real_end = $currentTime - 180;
            }
        }
        /*S-真实发布订单时间限制*/
        //拿房时间限制
        $nf_time_start = empty($param['nf_time_start']) ? '' : $param['nf_time_start'];
        $nf_time_end = empty($param['nf_time_end']) ? '' : $param['nf_time_end'];
        $on = false;
        $on_sub = false;
        $type_fw = false;
        $remarks = empty($param['remarks']) ? '' : $param['remarks'];
        $openeye_st = false;
        $op_uid = false;
        $order = 'time_real DESC';

        //订单状态
        $main['status'] = D('Orders')->getOrderStatusDescription(true,2);
        //获取订单备注
        $main['remarks'] = $this->status2Arr($this->status);

        //获取订单操作人：次新单，扫单，待定单，撤回单时候获取帮打人的订单
        if (in_array($param['status'], array(12,13,14,22,25))) {
            $operaters = D('Adminuser')->getKfManagerListByIdAndUid($admin['id'], $admin['uid'], $admin['cs_help_user']);
        } else {
            $operaters = D('Adminuser')->getKfManagerListByIdAndUid($admin['id'], $admin['uid']);
        }

        $main['operaters'] = $operaters['list'];

        //如果是客服，客服组长，客服主管，则限制搜索人为管辖的人的id
        if (in_array($admin['uid'], array(2,31,30))) {
            if (empty($param['op_uid'])) {
                $op_uid = $operaters['ids'];
            } else {
                $op_uid = in_array($param['op_uid'], $operaters['ids']) ? intval($param['op_uid']) : $operaters['ids'];
            }
        } elseif (!empty($param['op_uid'])) {
            $op_uid = intval($param['op_uid']);
        }

        //订单号，手机号，IP，小区名字查询处理
        if (!empty($param['condition'])) {
            $condition = trim($param['condition']);
            if (is_numeric($condition)) {
                if (strlen($condition) > 15) {
                    //订单号的长度都大于15位
                    $id = addslashes($condition);
                } else {
                    //手机号码
                    $tel_encrypt = D('Orders')->getOrdersTelEncrypt($condition);
                }
            } elseif (preg_match('/(\d{1,3}\.){4}/', "$condition.")) {
                //IP号码
                $ip = $condition;
            } else {
                //小区名字
                $xiaoqu = addslashes($condition);
            }
        }

        //处理城市选择查询
        if (!empty($param['city']) && $param['city'] != 'null') {
            $cs = intval($param['city']) == 1 ? '000001' : intval($param['city']);
        }

        //处理订单状态筛选，使用isset引用上面定义的数组条件
        if (!empty($param['status'])) {
            $status = $param['status'];
            if (isset($main['status'][$status]['param']['on'])) {
                $on = $main['status'][$status]['param']['on'];
            }
            if (isset($main['status'][$status]['param']['on_sub'])) {
                $on_sub = $main['status'][$status]['param']['on_sub'];
            }
            if (isset($main['status'][$status]['param']['type_fw'])) {
                $type_fw = $main['status'][$status]['param']['type_fw'];
            }
        }

        //处理订单显号
        if (!empty($param['displaynumber'])) {
            switch ($param['displaynumber']) {
                case '1':
                    $openeye_st = 'null';
                    break;
                case '2':
                    $openeye_st = 1;
                    break;
                case '3':
                    $openeye_st = 2;
                    break;
                case '4':
                    $openeye_st = 3;
                    break;
                default:
                    break;
            }
        }

        //处理排序规则，没有排序规则使用默认排序，否则按照不同订单状态进行不同的排序
        $order = 'IF(o.remarks="已回访",0,1),priority DESC,on_sub DESC,`on` ASC,visitime ASC,case when on_sub = 9 then o.time end ASC ,case when on_sub <>9 then o.time end DESC,o.time DESC, o.id DESC';
        if (!empty($main['status'][$status]['order'])) {
            $order = $main['status'][$status]['order'];
        }
        //是否安装完整度排序
        if ('1' == $param['wzd_orrder']) {
            $order = 'o.wzd ASC, ' . $order;
        } else if ('2' == $param['wzd_orrder']) {
            $order = 'o.wzd DESC, ' . $order;
        }

        //获取订单列表和分页信息
        if (I('get.details')) {
            //如果是页面点击 总数跳转则从新获取页面数据
            $main['info'] = $this->getCountOrdersList($this->details_count[I('get.details')]);
        } else {
            $main['info'] = $this->getOrdersList($id, $cs, $xiaoqu, $ip, $tel_encrypt, $time_start, $time_end, $time_real_start, $time_real_end, $nf_time_start, $nf_time_end, $on, $on_sub, $type_fw, $remarks, $openeye_st, $op_uid, $order, 10, $isactivity);
        }

        $list = $main['info']['list'];
        //获取订单ID数组
        $ids = array();
        foreach ($list as $key => $value) {
            $ids[] = $value['id'];
        }

        //获取每个订单的电话号码的归属地
        $result = D('Phonelocation')->getOrderTelLocationByOrderIds($ids);
        foreach ($result as $key => $value) {
            $phoneLocation[$value['id']] = $value['cname'];
        }

        //获取每个订单的电话号码的重复次数
        $result = D('Orders')->getTelnumberRepaetCountByIds($ids);
        foreach ($result as $key => $value) {
            $phoneRepeats[$value['id']] = $value['repeat_count'];
        }

        //获取每个订单的通话次数
        $result = D('LogTelcenterOrdercall')->getOrderCallCountByOrderIds($ids);
        foreach ($result as $key => $value) {
            $callRepeats[$value['id']] = $value['repeat_count'];
        }

        //获取每个订单最近的订单备注添加时间
        $result = D('LogOrderRemarkTime')->getLastLogOrderRemarkTimeByOrderIds($ids);
        foreach ($result as $key => $value) {
            $remarkTime[$value['order_id']] = $value['remark_time'];
        }

        //获取每个订单的IP的重复次数
        $result = D('Orders')->getIpRepaetCountByIds($ids);
        foreach ($result as $key => $value) {
            $ipRepeats[$value['id']] = $value['repeat_count'];
        }

        //处理每条记录
        $dateArray=array('年'=>31536000,'月'=>2592000,'周'=>604800,'天'=>86400,'时'=>3600,'分'=>60,'秒'=>1);
        foreach ($list as $key => $value) {
            //电话号码位处理成星号
            $list[$key]['tel'] = substr($value['tel'], 0,3) . "*****" . substr($value['tel'], -3);
            //重复订单处理
            $list[$key]['phone_repeat_count'] = $phoneRepeats[$value['id']];
            $list[$key]['call_repeat_count'] = $callRepeats[$value['id']];
            $list[$key]['ip_repeat_count'] = $ipRepeats[$value['id']];

            //电话号码归属地处理，如果和发单填写的城市不同则显示电话号码归属地
            if (!empty($phoneLocation[$value['id']])) {
                if(false === strpos($phoneLocation[$value['id']], $value['city']) && false === strpos($value['city'], $phoneLocation[$value['id']]) && $value['city'] != '总站'){
                    $list[$key]['phone_location'] = $phoneLocation[$value['id']];
                }
            }

            //处理订单显号申请人 $apply_tel = array('申请人ID' => '审核状态')
            $apply_tel_admin = explode(',', $value['apply_tel_admin']);
            $apply_tel_status = explode(',', $value['apply_tel_status']);
            foreach ($apply_tel_admin as $k => $v) {
                $list[$key]['apply_tel'][$v] = $apply_tel_status[$k];
            }

            //处理订单发布时间记录
            $list[$key]['remark_time'] = $remarkTime[$value['id']];

            //当前时间和订单发布时间差
            $time_diff = time() -  $list[$key]['time'];
            $list[$key]['timex_ori'] =   $time_diff;//记录原时间戳时间差
            foreach ($dateArray as $k => $v) {
                if ($time_diff>=$v) {
                    $num=intval($time_diff/$v);
                    $time_diff-=$num*$v;
                    $real_diff.=$num.$k;
                }
            }
            $list[$key]['timex'] =   $real_diff;
            unset($time_diff);
            unset($real_diff);

            //订单及时度
            $time_diff = $list[$key]['callfast_time'];
            foreach ($dateArray as $k => $v) {
                if ($time_diff>=$v) {
                    $num=intval($time_diff/$v);
                    $time_diff-=$num*$v;
                    $real_diff.=$num.$k;
                }
            }
            $list[$key]['timef'] =   $real_diff;
            unset($time_diff);
            unset($real_diff);

            //最长呼叫
            $time_diff = $list[$key]['calllong_time'];
            foreach ($dateArray as $k => $v) {
                if ($time_diff>=$v) {
                    $num=intval($time_diff/$v);
                    $time_diff-=$num*$v;
                    $real_diff.=$num.$k;
                }
            }
            $list[$key]['timel'] =   $real_diff;
            unset($time_diff);
            unset($real_diff);
        }
        $main['info']['list'] = $list;



        //获取城市信息
        $main['city'] = D('Quyu')->getQuyuList();

        //显示抢单部分需满足以下条件
        //1.查看的是新单，并且是点击tab栏查看的
        //2.有‘查看订单状态指标数字’的权限
        //备注：如果还需要有抢单的需求，还要加上抢单的权限
        if (cookie('order_status_forbidden') == 1 && $param['status'] == 11 && check_menu_auth('/orders/refreshordercount/')) {
            $main['scramble']['count'] = $this->getRefreshOrderCount($admin['id']);
            $main['scramble']['new_order_interval'] = OP('new_order_interval');
        }

        //判断是否可获取订单数量简单信息
        if (check_menu_auth('/orders/getordercountbrief/') == true) {
            $main['ordercountbrief'] = $this->getOrderCountBrief();
        }

        //判断是否有查看呼叫记录的权限
        if (check_user_menu_auth('/voip/voiprecord/')) {
            $main['auth']['checkcall'] = '1';
        }

        //登录人信息
        $main['admin'] = $admin;

        //默认操作人
        $main['defaultOperater'] = in_array($admin['id'], $operaters['ids']) ? $admin['id'] : '';

        $this->assign('showList', $arr);
        $main['source_type'] = $this->source_in;
        $this->assign('main', $main);
        $this->display();
    }

    public function getCountOrdersList($detail){
        //判断是否可获取订单数量简单信息
        if (check_menu_auth('/orders/getordercountbrief/') == true) {
            return $this->getOrderCountBrief($detail);
        }
    }

    private function getVoipRecordList($orderid)
    {
        $db = D('LogTelcenterOrdercall');
        $result = $db->getOrderCallListByOrderId($orderid);
        $result = $db->callistHuman($result, 1); //数据再加工
        foreach ($result as $key => &$value) {
            $value['tonghuasj'] = $value['endtime'] - $value['starttime']; //通话时长
            //呼叫动作
            switch ($value['action']) {
                case 'CallAuth':
                    $value['action'] = "开始";
                    break;
                case 'CallEstablish':
                    $value['action'] = "接通";
                    break;
                case 'Hangup':
                    $value['action'] = "挂断";
                    break;
                case 'CallEstablish_Sub':
                    $value['action'] = "主叫接通";
                    break;
                case 'Hangup_Sub':
                    $value['action'] = "主叫挂断";
                    break;
                default:
                    # code...
                    break;
            }
            //拨打方式
            switch ($value['calltype']) {
                case 'callBack':
                    $value['calltype'] = "回拨拨打";
                    break;
                default:
                    break;
            }
            //挂断方式
            if ($value['TelCenter_Channel'] == 'cuct') {
                //对联通云总机的挂机代码处理
                //state：状态：0-呼叫挂机（默认值）；1-通话失败。
                switch ($value['byetype']) {
                    case '0':
                        $value['byetypewz'] = '呼叫挂机';
                        break;
                    case '1':
                        $value['byetypewz'] = '通话失败';
                        break;
                    default:
                        $value['byetypewz'] = '-';
                        break;
                }
            }else{
                // 默认是 云通讯的挂机代码
                $value['byetypewz'] = $db->getByeTypeInfo($value['byetype']);
            }
        }

        return $result;
    }
    /**
     * 刷新订单状态请求
     * @return mixed
     */
    public function refreshOrderCount()
    {
        $admin = getAdminUser();
        if (!empty($admin)) {
            $result = $this->getRefreshOrderCount($admin['id']);
            $this->ajaxReturn(array('data'=>$result,'info'=>'获取成功！','status'=>1));
        }
        $this->ajaxReturn(array('data'=>'','info'=>'操作失败！','status'=>0));
    }

    /**
     * 订单数量简单信息
     * @param string $detail 是否查询列表信息
     * @return mixed
     */
    public function getOrderCountBrief($detail = '')
    {
        $db = D('OrderPool');
        //当前新订单总数：订单池的新订单数量，没有认领人的
        $cityIds = $this->getAllowScrambleOrderCityIds();
        $result['new'] = $db->getNoOwnerNewOrderCount($cityIds);

        //当前已抢未拨打新订单总数
        $result['uncalled'] = $db->getUnCalledNewOrderCount($cityIds);

        if (time() >= strtotime(date('Y-m-d 17:30:00'))) {
            $start = strtotime(date('Y-m-d 17:30:00'));
            $end = strtotime(date('Y-m-d 17:30:00') . '+1 days');
        } else {
            $start = strtotime(date('Y-m-d 17:30:00') . '-1 days');
            $end = strtotime(date('Y-m-d 17:30:00'));
        }
        //获取当天发单量
        $result['publish'] = $db->getCanGetNewOrderCount($cityIds, $start, $end);
        $result['page'] = '';
        $result['list'] = [];

        //根据页面点击的总个数来查询 对应的数据
        if($detail){
            import('Library.Org.Util.Page');
            $fields = 'o.id,o.time_real,o.time,o.cs,o.qx,o.source_type,o.tel,o.tel_encrypt,
                        o.nf_time,o.mianji,o.visitime,o.ON,o.on_sub,o.type_fw,o.type_zs_sub,o.order2com_allread,
                        o.from_old_orderid,o.remarks,o.lasttime,o.calllong_time,o.callfast_time,o.wzd,q.cname AS city,a.qz_area AS area,
                        o.wzd,GROUP_CONCAT(t. STATUS) AS apply_tel_status,GROUP_CONCAT(t.apply_id) AS apply_tel_admin,p.op_name,o.source';
            switch ($detail['logo']) {
                case 'ordercountbrief_new':
                    $p = new \Page($result['new'], 20);
                    $list = $db->getNoOwnerNewOrderList($cityIds,$p->listRows,$fields,'',$p->firstRow,'o.id');
                    break;
                case 'ordercountbrief_uncalled':
                    $p = new \Page($result['uncalled'], 20);
                    $list = $db->getUnCalledNewOrderList($cityIds, $fields, 'o.id', $p->firstRow, $p->listRows);
                    break;
                case 'ordercountbrief_publish':
                    $p = new \Page($result['publish'], 20);
                    $list = $db->getCanGetNewOrderList($cityIds, $start, $end,$fields,$p->firstRow, $p->listRows,'o.id');
                    break;
            }
            $result['page'] = isset($p) ? $p->show() : '';
            $result['list'] = isset($list) ? $list : [];
        }
        return $result;
    }

    /**
     * 获取订单刷新数量
     * @param  [int] $adminId [用户ID]
     * @return mixed
     */
    public function getRefreshOrderCount($adminId)
    {
        if (!empty($adminId)) {
            $unfinished_order_count = OP('unfinished_order_count');
            $db = D('OrderPool');
            //当前新订单总数：订单池的新订单数量，没有认领人的
            $cityIds = $this->getAllowScrambleOrderCityIds();
            $result['new'] = $db->getNoOwnerNewOrderCount($cityIds);

            //当前未完成订单数 = 新单+次新单+扫单+待定单+被撤订单*系数+当天无效单*系数-当天有效单*系数（去除被撤订单）
            $result['unfinished'] = $db->getUnfinishedOrderCountByUid($adminId);
            //可获取新订单总数 = 个人未完成订单数峰值 - 当前未完成订单数
            $result['obtain'] = $unfinished_order_count - $result['unfinished'];
            //被撤回订单数量
            $result['retracted'] = $db->getRevokedOrderCount($adminId);
            //当天每人人均应该获取的订单量，如果当前时间大于等于5点半，则重新计算
            if (time() >= strtotime(date('Y-m-d 17:30:00'))) {
                $start = strtotime(date('Y-m-d 17:30:00'));
                $end = strtotime(date('Y-m-d 17:30:00') . '+1 days');
            } else {
                $start = strtotime(date('Y-m-d 17:30:00') . '-1 days');
                $end = strtotime(date('Y-m-d 17:30:00'));
            }
            $canGetNewOrderCount = $db->getCanGetNewOrderCount($cityIds, $start, $end);
            //获取在订单池中客服数量
            $acitveAdminUserCount = D('Home/Logic/OrderPondServiceLogic')->getKfNum();
            if ($acitveAdminUserCount == 0) {
                $result['average'] = 0;
            } else {
                $result['average'] = ceil($canGetNewOrderCount / $acitveAdminUserCount);
            }
            return $result;
        }
        return false;
    }

    /**
     * [scrambleOrder 抢单，获取订单| scramble：争抢]
     * @return [type] [description]
     */
    public function scrambleOrder()
    {
        $admin = getAdminUser();
        //只有客服，客服组长能获取新订单
        if (!in_array($admin['uid'], array(2,31))) {
            $this->ajaxReturn(array('data'=>'','info'=>'当前角色不支持获取新订单！','status'=>0));
        }
        //导入RedisLibrary类库用于锁定用户操作和订单操作
        import('Library.Org.RedisLibrary.RedisLibrary');
        $redis = new \RedisLibrary();
        if ($redis != true) {
            $this->ajaxReturn(array('data'=>'','info'=>'缓存中间件连接失败，请联系技术部门！','status'=>0));
        }
        //获取新订单时间间隔，除非获取成功，其他返回结果前均要释放该锁
        $adminKey = 'ScrambleOrder:' . $admin['id'];
        $lock = $redis->lock($adminKey, OP('new_order_interval'));
        if ($lock == false) {
            $this->ajaxReturn(array('data'=>'','info'=>'请勿多次点击！','status'=>0));
        }
        //获取未完成订单量限制开关，switch = 1，开启开关
        $switch = OP('unfinished_order_switch');
        if ($switch == 1) {
            $unfinishedStart = OP('unfinished_order_start');
            $unfinishedEnd   = OP('unfinished_order_end');
            $start           = strtotime(date('Y-m-d') . ' ' . $unfinishedStart);
            $end             = strtotime(date('Y-m-d') . ' ' . $unfinishedEnd);
            $time            = time();
            //如果当前时间不在开关起作用的时间范围内，同样需要判断未完成订单量是否超出限制
            if (!(($time >= $start) && ($time <= $end))) {
                //判断当前未完成订单量是否超出限制
                $unfinishedAllow = OP('unfinished_order_count');
                $unfinishedCount = D('OrderPool')->getUnfinishedOrderCountByUid($admin['id']);
                //可获取新订单总数 = 个人未完成订单数峰值 - 当前未完成订单数
                if ($unfinishedCount >= $unfinishedAllow) {
                    $redis->unlock($adminKey);
                    $this->ajaxReturn(array('data'=>'','info'=>'未完成订单量达到峰值：' . $unfinishedAllow,'status'=>0));
                }
            }
        } else {
            //判断当前未完成订单量是否超出限制
            $unfinishedAllow = OP('unfinished_order_count');
            $unfinishedCount = D('OrderPool')->getUnfinishedOrderCountByUid($admin['id']);
            //可获取新订单总数 = 个人未完成订单数峰值 - 当前未完成订单数
            if ($unfinishedCount >= $unfinishedAllow) {
                $redis->unlock($adminKey);
                $this->ajaxReturn(array('data'=>'','info'=>'未完成订单量达到峰值：' . $unfinishedAllow,'status'=>0));
            }
        }

        //获取允许的未处理新订单个数
        $newOrderCountAllow = OP('new_order_count');
        //获取操作人的未完成新单数量
        $unfinishedNewCount = D('OrderPool')->getUnfinishedNewOrderCountByUid($admin['id']);
        if ($unfinishedNewCount >= $newOrderCountAllow) {
            //如果未完成新单量大于等于设置的新单量上限，则不允许抢单
            $redis->unlock($adminKey);
            $this->ajaxReturn(array('data'=>'','info'=>'未处理新订单数量达到峰值：' . $newOrderCountAllow,'status'=>0));
        } else {
            //所有能抢单的城市
            $cityIds = $this->getAllowScrambleOrderCityIds();
            //查询客服是否在订单池中
            $isInPond = D('Home/Logic/OrderPondLogic')->findKfInPond($admin['id']);
            //未分配客服，只能抢主池订单
            if ($isInPond === false) {
                $setCity = D('Home/Logic/OrderPondLogic')->getPondCityByKf($admin['id'],true);
                $allowCity = array_intersect($setCity['city_ids'],$cityIds);
                //查询总订单池的订单
                $result = D('OrderPool')->getNoOwnerNewOrderList($allowCity, 1, 'p.orderid', 'o.zhuanfaren DESC, o.time_real DESC')[0];
            } else {
                //查询此客服设置的城市
                $setCity = D('Home/Logic/OrderPondLogic')->getPondCityByKf($admin['id']);
                $allowCity = array_intersect($setCity['city_ids'],$cityIds);
                if (in_array(1,$setCity['id'])) {
                    //查询总订单池的订单
                    $result = D('OrderPool')->getNoOwnerNewOrderList($allowCity, 1, 'p.orderid', 'o.zhuanfaren DESC, o.time_real DESC')[0];
                } else {
                    //可获取城市为空，直接查询主池的订单
                    if (empty($allowCity)){
                        $setCity = D('Home/Logic/OrderPondLogic')->getPondCityByKf($admin['id'],true);
                        $allowCity = array_intersect($setCity['city_ids'],$cityIds);
                        $result = D('OrderPool')->getNoOwnerNewOrderList($allowCity, 1, 'p.orderid', 'o.zhuanfaren DESC, o.time_real DESC')[0];
                    } else {
                        //查询子池订单
                        $result = D('OrderPool')->getNoOwnerNewOrderList($allowCity, 1, 'p.orderid', 'o.zhuanfaren DESC, o.time_real DESC')[0];
                        if (empty($result)) {
                            //子池没有再去查询总订单池的订单
                            $setCity = D('Home/Logic/OrderPondLogic')->getPondCityByKf($admin['id'],true);
                            $allowCity = array_intersect($setCity['city_ids'],$cityIds);
                            $result = D('OrderPool')->getNoOwnerNewOrderList($allowCity, 1, 'p.orderid', 'o.zhuanfaren DESC, o.time_real DESC')[0];
                        }
                    }
                }
            }
            if (empty($result)) {
                $redis->unlock($adminKey);
                $this->ajaxReturn(array('data'=>'','info'=>'暂无新定单，请稍后再试','status'=>0));
            } else {
                $orderKey = 'OrderPool:' . $result['orderid'];
                $lock = $redis->lock($orderKey, 10);
                if ($lock == false) {
                    $redis->unlock($adminKey);
                    $this->ajaxReturn(array('data'=>'','info'=>'该订单已被抢，请再次点击获取！','status'=>0));
                } else {
                    $save['op_uid']  = $admin['id'];
                    $save['op_name'] = $admin['name'];
                    $save['addtime'] = time();
                    $save['status']  = '0';
                    $map = array(
                        'orderid' => $result['orderid'],
                        'op_uid' => 0
                    );
                    $flag = M('order_pool')->where($map)->save($save);
                    $redis->unlock($orderKey);
                    if ($flag != false) {
                        $this->ajaxReturn(array('data'=>'','info'=>'订单获取成功！','status'=>1));
                    } else {
                        $redis->unlock($adminKey);
                        $this->ajaxReturn(array('data'=>'','info'=>'订单获取失败，请重新获取！','status'=>0));
                    }
                }
            }
        }
    }

    /**
     * 获取允许抢单的城市ID
     * @return mixed
     */
    private function getAllowScrambleOrderCityIds()
    {
        //获取开放的城市ID
        $cids = D('User')->getOpenCityHaveRealVipCids();
        //获取客服系统订单设置,开放城市
        $allowCids = array_filter(explode(',', OP('open_order_city')));
        if (!empty($allowCids)) {
            //取以上城市ID的交集
            $cityIds = array_intersect($allowCids, $cids);
        } else {
            $cityIds = $cids;
        }
        return $cityIds;
    }

    /**
     * 获取显号审核列表
     * @return mixed
     */
    public function getApplyTelList()
    {
        $id = I('post.id');
        //检查
        if (empty($id)) {
            $this->ajaxReturn(array('data' => '', 'info' => '缺少参数！', 'status' => 0));
        }

        $result = D('OrdersApplyTel')->getApplyTelListByOrdersId($id);

        if (!empty($result)) {
            $this->assign('list', $result);
            $html = $this->fetch("orders_apply_tel_modal");
            $this->ajaxReturn(array('data' => $html, 'info' => '操作成功！', 'status' => 1));
        } else {
            $this->ajaxReturn(array('data' => '', 'info' => '重复订单列表为空！', 'status' => 0));
        }
        $this->ajaxReturn(array('data' => '', 'info' => '获取失败！', 'status' => 0));
    }

    /**
     * 申请显示电话号码审核操作
     * @return mixed
     */
    public function displayNumberCheck()
    {
        $admin = getAdminUser();
        $id = I('post.id');
        //检查参数
        if (empty($id)) {
            $this->ajaxReturn(array('data'=>'','info'=>'非法请求，缺少参数，请联系技术部门！','status'=>0));
        }
        $save['status'] = I('post.status');
        $save['passer_id'] = $admin['id'];
        $save['pass_time'] = time();
        $result = D('OrdersApplyTel')->saveOrdersApplyTel($id, $save);
        if ($result) {
            $this->ajaxReturn(array('data'=>'','info'=>'操作成功！','status'=>1));
        }
        $this->ajaxReturn(array('data'=>'','info'=>'审核失败！','status'=>0));
    }

    /**
     * 手机号重复订单
     * @return mixed
     */
    public function getRepeatOrderListByPhone()
    {
        $id = I('post.id');
        //检查
        if (empty($id)) {
            $this->ajaxReturn(array('data' => '', 'info' => '缺少参数！', 'status' => 0));
        }
        $order = D('Orders')->getOrdersById($id);
        if (!empty($order)) {
            $result = D('Orders')->getOrdersByTelEncrypt($order['tel_encrypt']);
            if (!empty($result)) {
                $this->assign('list', $result);
                $html = $this->fetch("order_repeat_modal");
                $this->ajaxReturn(array('data' => $html, 'info' => '操作成功！', 'status' => 1));
            } else {
                $this->ajaxReturn(array('data' => '', 'info' => '重复订单列表为空！', 'status' => 0));
            }
        }
        $this->ajaxReturn(array('data' => '', 'info' => '获取失败！', 'status' => 0));
    }

    /**
     * [getRepeatOrderListByIp IP重复订单]
     * @return [type] [description]
     */
    public function getRepeatOrderListByIp()
    {
        $id = I('post.id');
        //检查
        if (empty($id)) {
            $this->ajaxReturn(array('data' => '', 'info' => '缺少参数！', 'status' => 0));
        }
        $order = D('Orders')->getOrdersById($id);
        if (!empty($order)) {
            $result = D('Orders')->getOrdersByIp($order['ip']);
            if (!empty($result)) {
                $this->assign('list', $result);
                $html = $this->fetch("order_repeat_modal");
                $this->ajaxReturn(array('data' => $html, 'info' => '操作成功！', 'status' => 1));
            } else {
                $this->ajaxReturn(array('data' => '', 'info' => '重复订单列表为空！', 'status' => 0));
            }
        }
        $this->ajaxReturn(array('data' => '', 'info' => '获取失败！', 'status' => 0));
    }

    /**
     * [getRecentOperateLog 获取最近操作记录]
     * @return [type] [description]
     */
    public function getRecentOperateLog()
    {
        $id = getAdminUser('id');
        if (!empty($id)) {
            $result = D('LogOrderCsos')->getRecentOperateLogByUserId($id);
            if (!empty($result)) {
                $this->assign('list', $result);
                $html = $this->fetch("recent_operate_log");
                $this->ajaxReturn(array('data' => $html, 'info' => '操作成功！', 'status' => 1));
            } else {
                $this->ajaxReturn(array('data' => '', 'info' => '最近操作订单列表为空！', 'status' => 0));
            }
        }
        $this->ajaxReturn(array('data' => '', 'info' => '获取失败！', 'status' => 0));
    }

    public function repeatCheck(){
        if ($_POST) {
            //查询订单信息
            $info = $this->getOrderInfo(I("post.id"));
            //生成手机访问的短网址
            $orderdwz  = url_getdwz($info['id']);
            $info['dwz'] = $orderdwz;

            $this->assign("info",$info);
            $this->assign("source_in",$this->source_in);
            $this->assign("zhuanfaren",$this->zhuanfaren);
            //获取订单城市和区县
            $city = D("Quyu")->getCityInfoById($info["cs"]);
            $this->assign("city",$city);
            //户型
            $huxing = D("Huxing")->gethx();
            //预算
            $yusuan = D("Jiage")->getJiage();
            //装修方式
            $fangshi  = D("Fangshi")->getfs();
            //风格
            $fengge  = D("Fengge")->getfg();
            //获取最后审核人信息
            $csos_new = D("OrderCsosNew")->getCsosInfo(I("post.id"));

            //获取订单分配信息
            $company = D("OrderInfo")->getOrderComapny($info["id"]);

            //获取该订单所在城市的的会员公司
            $result = $this->getCompanyList($info["cs"]);

            //如果是已分配公司,默认选中
            foreach ($company as $key => $value) {
                $compnay_id[$value["id"]] = $value["id"];
            }

            foreach ($result[0] as $key => $value) {
                foreach ($value["child"] as $k => $val) {
                    if (array_key_exists($val["id"],$compnay_id)) {
                        $result[0][$key]["child"][$k]["ischeck"] = 1;
                    }
                }
            }

            foreach ($result[1] as $key => $value) {
                foreach ($value["child"] as $k => $val) {
                    if (array_key_exists($val["id"],$compnay_id)) {
                        $result[1][$key]["child"][$k]["ischeck"] = 1;
                    }
                }
            }

            //查询上次分配装修公司
            $fenpei_company = D("OrderInfo")->getLastTypeFw($info["id"],$info["cs"]);

            //本地装修公司
            foreach ($fenpei_company as $k => $val) {
                if ($val["cs"] == $info["cs"]) {
                    $fenpei_now_company[] = $val;
                    unset($fenpei_company[$k]);
                }
            }

            //其他城市
            foreach ($result[1] as $key => $value) {
                foreach ($fenpei_company as $k => $val) {
                    if ($val["cs"] == $key) {
                        $result[1][$key]["fen_company"][] = $val;
                        unset($fenpei_company[$k]);
                    }
                }
            }

            //获取最近30过期的会员信息
            $lostCompany = $this->getLastExpireCompanyList($info["cs"],date("Y-m-d"));

            //获取订单IP是否重复
            $ipCount = D("Orders")->getIpRepaetCountByIds(array($info["id"]));

            if ($ipCount[0]["repeat_count"] > 0) {
                $this->assign("ipMark",$ipCount[0]["repeat_count"]);
            }
            $this->assign("lostCompany",$lostCompany);
            $this->assign("company",$company);
            $this->assign("fenpei_now_company",$fenpei_now_company);
            $this->assign("nowCompanys",$result[0]);
            $this->assign("otherCompanys",$result[1]);
            $this->assign("logCount",$logCount);
            $this->assign("csos_new",$csos_new);
            $this->assign("status",$this->status);
            $this->assign("keys",$this->keys);
            $this->assign("lf_time",$this->lf_time);
            $this->assign("start_time",$this->start_time);
            $this->assign("shi",$this->shi);
            $this->assign("lxs",$this->lxs);
            $this->assign("fengge",$fengge);
            $this->assign("fangshi",$fangshi);
            $this->assign("yusuan",$yusuan);
            $this->assign("huxing",$huxing);
            $tmp = $this->fetch("repeat_check");
            $this->ajaxReturn(array("code"=>200,"data"=>$tmp,'info'=>$info));
        }
    }

    /**
     * 订单详细页面
     * @return [type] [description]
     */
    public function operate()
    {
        //第一次通话结束--第三次通话开始的时间差
        if ($_POST) {
            $this->assign('is_show',I('post.is_show'));
            $results = $this->getVoipRecordList(I("post.id"));
            foreach($results as $result){
                if($result['action'] =="开始"){
                    $kaishi[] = $result;
                }elseif($result['action'] == "挂断"){
                    $jieshu[] = $result;
                }
            }
            $countkaishi = count($kaishi) ;

            //新逻辑:拨号满两次且（当前时间-第一次结束通话）≥30分钟，才能正常申请显号，否则通过紧急入口
            if($countkaishi >= 2){
                $endtime = $jieshu[0]['time_add'];
                $time = time()-strtotime($endtime);
                $timemin =$time/60;
                if($timemin >= 30){
                    $jinji = 0;
                }else{
                    $jinji = 1;
                }
            }else{
                $jinji = 1;
            }
            //查询订单信息
            $info = $this->getOrderInfo(I("post.id"));
            //过滤不规则字符串
            $reg = '/[\`~!@#$%^&*\(\)+<>?"{},\/;\'\"\s]/';
            $info["xiaoqu"] = preg_replace($reg,"",$info["xiaoqu"]);

            //查询是否是活动订单
            $info["activity"] = D("Home/Logic/ActivityLogic")->getActivityInfo($info["source"]);

            $this->assign("info",$info);
            $this->assign("source_in",$this->source_in);
            //后台转发人数组
            $ids = D("Options")->getOptionNameCC("kf_admin_order_users");
            $names = D("User")->getAdminNamesById($ids['option_value']);
            foreach ($names as $k => $v) {
                $zhuanfaren[] = $v['name'];
            }
            $this->assign("zhuanfaren",$zhuanfaren);
            //获取订单城市和区县
            $city = D("Quyu")->getCityInfoById($info["cs"]);
            $this->assign("city",$city);
            //户型
            $huxing = D("Huxing")->gethx();
            //预算
            $yusuan = D("Jiage")->getJiage();
            //装修方式
            $fangshi  = D("Fangshi")->getfs();
            //风格
            $fengge  = D("Fengge")->getfg();
            //获取最后审核人信息
            $csos_new = D("OrderCsosNew")->getCsosInfo(I("post.id"));
            //获取 未接通电话短信通知 短信记录
            $logCount = D("LogSmsSend")->getOrderSendLogCount($info["id"],2);

            //获取 通知业主分配的装修公司 短信记录
            $smsCount = D("LogSmsSend")->getOrderSendLogCount($info["id"],1);

            //获取订单分配信息
            $company = D("OrderInfo")->getOrderComapny($info["id"]);

            //有分配订单的情况下，查询微信是否发送
            if (count($company) > 0) {
                //获取订单微信发送记录
                $wx = D("LogWxOrdersend")->getWeixinLog($info["id"]);
                if (count($wx) > 0) {
                    $this->assign("wxMark",1);
                }
            }

            //获取城市信息模板
            $cityTmp = $this->getCityInfoTmp($info["cs"]);

            //获取城市信息
            $quyu = D('Quyu')->getQuyuList();
            $this->assign('quyu', $quyu);

            //获取该订单所在城市的的会员公司
            $companyList = $this->getCompanyList($info["cs"]);
            $this->assign('companyList',$companyList);
            $nowCompanys = $this->fetch("nowCompanys");
            $otherCompanys = $this->fetch("otherCompanys");

            //查询小区历史签单公司
            $history = $this->orderHistory($info["xiaoqu"],$info['cs']);
            if (count($history) > 0) {
                $this->assign("history",$history);
            }

            //获取最近30天过期的会员信息
            $lostCompany = $this->getLastExpireCompanyList($info["cs"],date("Y-m-d"));

            //获取订单IP是否重复
            $ipCount = D("Orders")->getIpRepaetCountByIds(array($info["id"]));

            if ($ipCount[0]["repeat_count"] > 1) {
                $this->assign("ipMark",$ipCount[0]["repeat_count"]-1);
            }

            $this->assign("jinji",$jinji);
            $this->assign("timemin",$timemin);
            $this->assign("lostCompany",$lostCompany);
            $this->assign("company",$company);
            $this->assign("smsCount",$smsCount);
            $this->assign("nowCompanys",$nowCompanys);
            $this->assign("otherCompanys",$otherCompanys);
            $this->assign("logCount",$logCount);
            $this->assign("csos_new",$csos_new);
            $this->assign("status",$this->status);
            $this->assign("keys",$this->keys);
            $this->assign("lf_time",$this->lf_time);
            $this->assign("start_time",$this->start_time);
            $this->assign("shi",$this->shi);
            $this->assign("lxs",$this->lxs);
            $this->assign("fengge",$fengge);
            $this->assign("fangshi",$fangshi);
            $this->assign("yusuan",$yusuan);
            $this->assign("huxing",$huxing);
            $this->assign("cityTmp",$cityTmp);
            $tmp = $this->fetch("operate");
            $this->ajaxReturn(array('data'=>$tmp,'info'=>$info,'status'=>1));
        }
    }

    /**
     * 根据地址获取经纬度
     * @return [type] [description]
     */
    public function getAddressLatlong()
    {
        $url = "http://api.map.baidu.com/geocoder/v2/?address=%E5%8C%97%E4%BA%AC%E5%B8%82%E6%B5%B7%E6%B7%80%E5%8C%BA%E4%B8%8A%E5%9C%B0%E5%8D%81%E8%A1%9710%E5%8F%B7&output=json&ak=q23cg2dVNxDL71KLzs64mujph1fE6zX4";
        get_content_by_curl($url);
    }

    public function getAreaByCid(){
        $cid = I('get.cid');
        if (empty($cid)) {
            $this->ajaxReturn(array('data'=>'','info'=>'获取失败，城市ID为空！','status'=>0));
        }
        $city = D("Quyu")->getCityInfoById($cid);
        if (empty($city)) {
            $this->ajaxReturn(array('data'=>'','info'=>'区域为空！','status'=>0));
        }
        //生成模板
        $areaHtml = '<option value="">-请选择-</option>';
        foreach ($city as $key => $value) {
            if (!empty($value['qz_areaid'])) {
                $areaHtml = $areaHtml . '<option value="' . $value['qz_areaid'] . '">' . $value['qz_area'] . '</option>';
            }
        }

        //获取该城市的会员公司
        $companyList = $this->getCompanyList($cid);
        $this->assign('companyList',$companyList);
        $nowCompanys = $this->fetch("nowCompanys");
        $otherCompanys = $this->fetch("otherCompanys");

        //获取城市信息
        $cityTmp = $this->getCityInfoTmp($cid);

        $this->ajaxReturn(array(
            'data'=>array('area' => $areaHtml, 'nowCompanys'=>$nowCompanys,'otherCompanys'=>$otherCompanys,'cityTmp'=>$cityTmp),
            'info'=>'',
            'status'=>1
        ));
    }

    /**
     * 查询IP真人概率
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function searchrtbasia()
    {
        if($_GET['ipstr']){
            $ipstr    = $_GET['ipstr'];
            $info['ipstr'] = $ipstr;

            $apikey = OP('APISTORE_BAIDU');

            /*S-获取真人概率信息*/
            $ch = curl_init();
            $url = 'http://apis.baidu.com/rtbasia/non_human_traffic_screening/nht_query?ip='.$ipstr;
            $header = array(
                "apikey: $apikey",
            );
            // 添加apikey到header
            curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            //设置超时只需要设置一个秒的数量就可以
            curl_setopt($ch, CURLOPT_TIMEOUT,3);
            // 执行HTTP请求
            curl_setopt($ch , CURLOPT_URL , $url);
            $res = curl_exec($ch);
            $result = json_decode($res,true);
            if('Success' == $result['msg']){
                $istrue = ($result['data']['score'] * 10).'%';
            }else{
                $istrue = '真人概率未知!';
            }
            $info['istrue'] = $istrue;
            /*E-获取真人概率信息*/

            /*S-获取IP地区信息*/
            $ch = curl_init();
            $url = 'http://apis.baidu.com/apistore/iplookupservice/iplookup?ip='.$ipstr;
            $header = array(
                "apikey: $apikey",
            );
            // 添加apikey到header
            curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            //设置超时只需要设置一个秒的数量就可以
            curl_setopt($ch, CURLOPT_TIMEOUT,3);
            // 执行HTTP请求
            curl_setopt($ch , CURLOPT_URL , $url);
            $res = curl_exec($ch);
            $result = json_decode($res,true);
            if('success' == $result['errMsg']){
                if('None' == $result['retData']['province']){
                    $info['position'] = '未知地区';
                }else{
                    $info['position'] = $result['retData']['province'].$result['retData']['city'].$result['retData']['district'];
                }
                $info['type'] = $result['retData']['carrier'];
            }else{
                $info['position'] = '未知地区';
                $info['type'] = '未知网络类型';
            }
            /*S-获取IP地区信息*/

            $this->assign('info',$info);
            $this->display();
        }
    }

    //安全百度搜索号码
    public function tel_baidusearch() {
        //获取订单号码
        $model = D("Home/Orders");
        $result = $model->findOrderInfoAndTel(I("get.id"));

        if (empty($result["tel8"])) {
            $this->_error("该订单发布电话不存在");
        }

        $baidu = GetPhoneBaiduPageInfoNoNum($result["tel8"]);

        $tdk = [];
        $tdk['title'] = '百度搜索索引';
        $this->assign('tdk',$tdk);

        $this->assign('list',$baidu);
        $this->assign('type','baidu');
        $this->display("tel_search");
    }

    /**
     * 360号码搜索
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function tel_360search()
    {
        //获取订单号码
        $model = D("Home/Orders");
        $result = $model->findOrderInfoAndTel(I("get.id"));

        if (empty($result["tel8"])) {
            $this->_error("该订单发布电话不存在");
        }

        $search360 = GetPhone360searchPageInfoNoNum($result["tel8"]);

        $tdk = [];
        $tdk['title'] = '360搜索索引';
        $this->assign('tdk',$tdk);

        $this->assign('list',$search360);
        $this->assign('type','360');
        $this->display("tel_search");
    }


    /**
     * 搜狗搜索
     * pc端
     * https://www.sogou.com/web?query=11
     * @param  string $_GET['id'] 订单号
     * @return mixed 经过保密处理的搜索结果
     */
    public function tel_sogousearch()
    {
        //获取订单号码
        $model = D("Home/Orders");
        $result = $model->findOrderInfoAndTel(I("get.id"));

        if (empty($result["tel8"])) {
            $this->_error("该订单发布电话不存在");
        }

        $sogouSearch = GetPhoneSogouSearchPageInfoNoNum($result["tel8"]);

        $tdk = [];
        $tdk['title'] = '搜狗搜索索引';
        $this->assign('tdk',$tdk);

        $this->assign('list',$sogouSearch);
        $this->assign('type','sogou');
        $this->display("tel_search");
    }


    /**
     * 神马搜索搜索
     * //https://m.sm.cn/
     * 只支持移动端
     * @param  string $_GET['id'] 订单号
     * @return mixed 经过保密处理的搜索结果
     */
    public function tel_smsearch()
    {
        //获取订单号码
        $model = D("Home/Orders");
        $result = $model->findOrderInfoAndTel(I("get.id"));

        if (empty($result["tel8"])) {
            $this->_error("该订单发布电话不存在");
        }

        $smSearch = GetPhoneSmSearchPageInfoNoNum($result["tel8"]);

        $tdk = [];
        $tdk['title'] = '神马搜索索引';
        $this->assign('tdk',$tdk);

        $this->assign('list',$smSearch);
        $this->assign('type','sm');
        $this->display("tel_search");
    }


    /**
     * 申请显号
     * @return [type] [description]
     */
    public function tel_openeye()
    {
        if ($_POST) {
            if(!$_POST['text']){
                $this->ajaxReturn(array('errmsg'=> "请填写申请理由",'code'=> 100));
            }else{
                $result = $this->findOrderEyeInfo(I("post."));
                $this->ajaxReturn(array('errmsg'=> $result["errmsg"],'code'=> $result["code"]));
            }

        }
    }

    /**
     * 申请显号
     * @param  string $value [description]
     * @return [type]        [description]
     */
    private function findOrderEyeInfo($data)
    {
        $admin = getAdminUser();

        //1.判断该订单是否被该人审核显号
        //  1.已审核，已通过，直接返回
        //  2.已审核，未通过，更新申请时间和申请理由
        //2.未申请
        //  1.直接添加记录
        $apply = D('OrdersApplyTel')->getApplyTelByOrdersIdAndApplyId($data["id"], $admin['id']);

        if (!empty($apply)) {
            if ($apply['status'] == 2) {
                return array("code"=>"404","errmsg"=>"该订单已申请显号成功,请勿重新申请");
            }

            $save = array(
                'apply_reason' => $data["text"],
                'entrance' => $data['input'],
                'apply_time'   => time(),
                'status'       => 1
            );

            $result = D('OrdersApplyTel')->saveOrdersApplyTel($apply['id'], $save);
        } else {
            $save = array(
                'entrance' => $data['input'],
                'orders_id'    => $data["id"],
                'apply_id'     => $admin['id'],
                'apply_reason' => $data["text"],
                'apply_time'   => time(),
                'status' => 1
            );
            $result = D('OrdersApplyTel')->addOrdersApplyTel($save);
        }

        if ($result !== false) {
            return array("code"=>"200");
        }

        return array("code"=>"404","errmsg"=>"操作失败,请重新申请");
    }

    /**
     * 保存订单
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function orderup()
    {
        if ($_POST) {
            $result = $this->editOrder(I("post."));
            $this->ajaxReturn(array('errmsg'=> $result["errmsg"],'code'=> $result["code"]));
        }
    }

    /**
     * 修(申请修改记录)
     */
    public function showapplyedit(){
        if ($_POST) {
            $result =  D("Orders")->getOrderApplyEdit(I('post.id'),2);
            if(!empty($result)&&isset($result)){
                $result['apply_time'] = empty( $result['apply_time'])?'': date('Y-m-d H:i:s',$result['apply_time']);
                $result['pass_time'] = empty( $result['pass_time'])?'': date('Y-m-d H:i:s',$result['pass_time']);
                $result['applystatus'] = $this->applystatus[$result['status']];
                $result['passname'] = isset($result['passname'])?$result['passname']:'';
                if(check_user_menu_auth('http://168new.qizuang.com/orders/changeapplyedit/')){
                    $check = 1;
                }else{
                    $check = 2;
                }
                $this->ajaxReturn(array('info'=> $result,'code'=> 200,'data'=>$check));
            }else{
                $this->ajaxReturn(array('errmsg'=> '获取失败','code'=> 1));
            }
        }
    }

    /**
     * 是否通过
     */
    public function changeapplyedit(){
        if ($_POST) {
            $id  = I('post.id');
            $status = I('post.status');
            $data["status"] =$status;
            $data["pass_time"] = time();
            $data["pass_id"] = session("uc_userinfo.id");
            $result =  D("Orders")->changeApplyEdit($id,$data);

            if($result>0){
                //添加操作日志
                $logData = array(
                    "remark" => session("uc_userinfo.name")."申请修改订单".$id."信息状态",
                    "action_id" =>  $id,
                    "logtype" => "changeapplyedit",
                    "info"=>$data
                );
                D('LogAdmin')->addLog($logData);

                $this->ajaxReturn(array('errmsg'=> "操作成功",'code'=> 200));
            }else{
                $this->ajaxReturn(array('errmsg'=> '操作失败','code'=> 1));
            }
        }
    }



    private function editOrder($data)
    {
        $model = D("Orders");
        $id = $data["id"];
        //状态为分单或赠单情况不可保存订单信息
        $orderInfo = $model->getOrdersById($id);
        $data['pagetype'] = isset($data['pagetype'])?$data['pagetype']:1;
        // 若请求来自对接页面不走该验证
        if($data['pagetype'] == 1){
            if (($orderInfo['on'] == 4) && ($orderInfo['type_fw'] == 1 || $orderInfo['type_fw'] == 2)) {
                return array("code"=>400,"errmsg"=>'分单或赠单情况下不可保存订单信息!');
            }
        }

        //2018-10-20小区落库需求新增start
        if(!empty($data["qx"])&&!empty($data["xiaoqu"])&&!empty($data["zuobiao"])){
            $jingwei = explode(',',$data["zuobiao"]);
            $data["lng"] = $jingwei[0];
            $data["lat"] = $jingwei[1];

            if(count($jingwei)>2){
                $this->ajaxReturn(array("info"=>"坐标填写错误", "status"=>1));
            }
            $lng = '/^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/';
            $lan = '/^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/';
            if(!preg_match($lng,$jingwei[0])||!preg_match($lan,$jingwei[1])){
                $this->ajaxReturn(array("info"=>"坐标填写错误!", "status"=>1));
            }

            $existXiaoqu = D("Home/Logic/AuthLogic")->getExistXiaoqu($data["cs"],$data["xiaoqu"]);
            //若区域内不存在该小区,对小区落库做新增操作
            if(!$existXiaoqu){
                D("Home/Logic/AuthLogic")->addCommunityfromOrder($data['cs'],$data["qx"],$data["xiaoqu"], $data["lng"],$data["lat"],$data["xiaoqutype"]);
            }
        }
        unset($data["zuobiao"]);
        $data["xiaoqu_type"] = $data["xiaoqutype"];
		unset($data["xiaoqutype"]);
        //2018-10-20小区落库需求新增end

        unset($data["id"]);
        if (!empty($data["lftime_other"])) {
            $data["lftime"] = $data["lftime_other"];
            unset($data["lftime_other"]);
        }

        if (!empty($data["start_other"])) {
            $data["start"] = $data["start_other"];
            unset($data["start_other"]);
        }
        $data["lasttime"] = time();
        $data["customer"] = session("uc_userinfo.id");



        if (empty($data["nf_time"])) {
            unset($data['nf_time']);
        }
        if (empty($data["lng"])) {
            unset($data['lng']);
        }
        if (empty($data["lat"])) {
            unset($data['lat']);
        }

        if ($model->create($data,1)) {
            //保存订单信息
            $i = $model->editOrder($id,$data);
            if ($i !== false) {
                //字段统计
                //查询是否记录统计
                $result = D("Home/Logic/OrdersLogic")->getOrderFieldStat($id);

                if (count($result) > 0) {
                    foreach ($result as $key => $value) {
                        $fieldStat[$value["field"]] = $value["before_value"];
                    }

                    //修改统计记录
                    $field = ["xiaoqu","cs","qx","mianji","yusuan"];
                    foreach ($field as $key => $value) {
                        if ($fieldStat[$value] != $data[$value]) {
                            $saveField = [
                                "after" => $data[$value],
                                "op_uid" => session("uc_userinfo.id"),
                                "op_name" => session("uc_userinfo.name"),
                                "state" => 2,
                                "time" => time()
                            ];

                            if (!empty($fieldStat[$value])) {
                                $saveField["state"] = 3;
                            }

                            D("Home/Logic/OrdersLogic")->updateFieldStat($id,$value,$saveField);
                        }
                    }
                }

                /**计算小区与城市距离start**/

                /**计算小区与城市距离end**/
                $code = 200;
                //若来自客服对接页面
                if($data['pagetype'] == 2){
                    $data["save_state"] = 2;
                    $data["save_time"] = time();
                    D("Orders")->changeApplyEdit($id,$data);
                }

                //添加订单状态操作日志
                $this->orderStatusChange($id);
                //添加操作日志
                $source = array(
                    "username" => session("uc_userinfo.name"),
                    "admin_id" => session("uc_userinfo.id"),
                    "orderid"  => $id,
                    "type"     => 0,
                    "postdata" => json_encode($data),
                    "addtime"  => time()
                );
                D("LogEditorders")->addLog($source);
            }
        } else {
            $msg = $model->getError();
        }
        return array("code"=>$code,"errmsg"=>$msg);
    }

    /**
     * 生成家具订单
     * @return [type] [description]
     */
    public function jjorderup()
    {
        if ($_POST) {
            $id = I("post.id");
            $cpaModel = D("Home/Logic/CpaOrdersLogic");
            //查询是否已经生成过订单
            $count = $cpaModel->findOrderCount($id);
            if ($count > 0) {
                $this->ajaxReturn(array('info'=> "该订单已生成家具订单",'status'=> 0));
            }

            //获取订单信息
            $info = $this->getOrderInfo($id);

            if (empty($info["chk_customer"])) {
                $this->ajaxReturn(array('info'=> "请先编辑订单后再生成家具订单！",'status'=> 0));
            }

            if ($info["lng"] <= 0  || $info["lat"] <= 0) {
                $this->ajaxReturn(array('info'=> "家具订单需要地理坐标,请先编辑订单！",'status'=> 0));
            }

            $cpaId = $cpaModel->getOrderId();
            $data = array(
                "id" => $cpaId,
                "order_id" => $id,
                "on" => 1,
                "time_real" => time(),
                "time" =>  strtotime($info["time_real"]),
                "name" => $info["name"],
                "sex" => $info["sex"],
                "tel" => $info["tel"],
                "tel_encrypt" => $info["tel_encrypt"],
                "cs" => $info["cs"],
                "qx" => $info["qx"],
                "xiaoqu" => $info["xiaoqu"],
                "ip" => $info["ip"],
                "lng" => $info["lng"],
                "lat" => $info["lat"],
                "huxing" => $info["huxing"],
                "mianji" => $info["mianji"],
                "fengge" => $info["fengge"],
                "lx" => $info["lx"],
                "lxs" => $info["lxs"],
                "yusuan" => $info["yusuan"],
                "step" => I("post.step"),
                "recommend" => I("post.recbusiness"),
                "csos_time" => time(),
                "special_remarks" => $info["text"]
            );

            //计算订单和会员之间的距离
            $result = $cpaModel->setOrderDistance($cpaId,$info["cs"],$info["lng"],$info["lat"]);

            if (count($result) == 0) {
                $data["on"] = 3;
            }

            $i = $cpaModel->addOrder($data);
            if ($i !== false) {
                //添加订单电话进电话表
                $data = array(
                    "orderid" => $cpaId,
                    "tel8" => $info["tel8"]
                );
                $cpaModel->addSafeTel($data);

                //添加进日志表
                $logdata = array(
                    "order_id"=>$cpaId,
                    "add_time"=>time()
                );
                D('Home/Orders')->addJiaJuOrderLog($logdata);

                $this->ajaxReturn(array('info'=> "家具订单生成成功！",'status'=> 1));
            }
            $this->ajaxReturn(array('info'=> "家具订单生成失败！",'status'=> 0));
        }
    }

    /**
     * 定单审核状态
     * @return [type] [description]
     */
    public function orderstatus()
    {
        if ($_POST) {
            $orders = D("Home/Orders");
            $csosModel = D("OrderCsosNew");

            $data = array(
                "chk_customer" => session("uc_userinfo.id")
            );

//            if(str_replace("remark_","" , I("post.status")) == 8 && I("post.sub_status") != '已转家具单'){
//                $this->addJiaJuOrder(I("post.id"));
//                echo 'end!';
//                die;
//            }
//
//            echo 'neq hahahah';
//            die;


            $status = I("post.status");
            $status = str_replace("remark_","",$status);
            $time = time();
            switch ($status) {
                case '1':
                    //次新单
                    $data["on"] = 0;
                    $data["on_sub"] = 9;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 0;
                    break;
                case '2':
                    //待定
                    $data["on"] = 2;
                    $data["on_sub"] = 0;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 0;
                    break;
                case '3':
                    //有效未分配
                    $data["on"] = 4;
                    $data["on_sub"] = 0;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 0;
                    break;
                case '4':
                    //分单
                    $data["on"] = 4;
                    $data["on_sub"] = 0;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 1;
                    break;
                case '6':
                    //赠单
                    $data["on"] = 4;
                    $data["on_sub"] = 0;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 2;
                    break;
                case '8':
                    //无效单
                    $data["on"] = 5;
                    $data["on_sub"] = 0;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 0;
                    break;
                case '98':
                    //暂时无效
                    $data["on"] = 98;
                    $data["on_sub"] = 0;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 0;
                    break;
            }

            $data["remarks"] = I("post.sub_status");
            //查询订单信息
            $info = $this->getOrderInfo(I("post.id"));

            if (count($info) == 0) {
                $this->ajaxReturn(array('errmsg'=> "该订单不存在！",'code'=> 404));
            }

            if (empty($info['name'])) {
                $this->ajaxReturn(array('errmsg'=> "请先填写业主名称！",'code'=> 404));
            }

            if (empty($info['fangshi'])) {
                $this->ajaxReturn(array('errmsg'=> "请先选择装修方式！",'code'=> 404));
            }

            //审核为待定单，需要检查是否填写了下次联系时间 如果未填写就不给审核
            if ($status == 2) {
                if (empty($info["visitime"])) {
                    $this->ajaxReturn(array('errmsg'=> "请填写下次联系时间后审核为待定单",'code'=> 404));
                }
            }

            //扫单审核为有效单 发布订单时间 字段time 修改为当前审核有效时间
            if ($info["on"] == 0 && $info["on_sub"] == 8 &&  in_array($status,array(3,4,5,6,7))) {
                $data["time"] = $time;
            }

            //无效审核为有效单 发布订单时间 字段time 修改为当前审核有效时间
            if ($info["on"] == 5 && in_array($status,array(3,4,5,6,7))) {
                $data["time"] = $time;
            }

            //没有下次联系时间的 待定单 审核为 有效 修改time订单发布时间为当前审核时间
            if (empty($info["visitime"]) && $info["on"] == 2 && in_array($status,array(3,4,5,6,7))) {
                $data["time"] = $time;
            }
            $data["lasttime"] = $time;
            $result = $orders->editOrder(I("post.id"),$data);

            if ($result !== false) {
                //获取客服信息
                $kfInfo = D("Adminuser")->findKfInfo(session("uc_userinfo.id"));
                //记录操作统计表
                $csosData = array(
                    "order_id" => I("post.id"),
                    "order_on" => $data["on"],
                    "order_on_sub" => $data["on_sub"],
                    "order_on_sub_wuxiao" => $data["on_sub_wuxiao"],
                    "order_new_type" => $data["on"] == 2?2:1,
                    "user_id" => session("uc_userinfo.id"),
                    "user_uid" => session("uc_userinfo.uid"),
                    "kftype" => $kfInfo["kftype"],
                    "kfgroup" =>  $kfInfo["kfgroup"],
                    "user_name" => session("uc_userinfo.name"),
                    "lasttime" => $time
                );

                 //记录操作统计表
                 $csos_new = $csosModel->getCsosInfo(I("post.id"));
                 if (count($csos_new) > 0) {
                    //订单已审有效，但未分配
                    //已审核分配的订单
                    //依照谁审核有效算谁的原则
                    if (($info["on"] == 4 && $info["type_fw"] == 0 && in_array($status,array(3,4,5,6,7))) || ($info["on"] == 4 && in_array($info["type_fw"],array(1,2))) || $info["on"] == 99) {
                        unset($csosData["user_id"]);
                        unset($csosData["user_uid"]);
                        unset($csosData["kftype"]);
                        unset($csosData["kfgroup"]);
                        unset($csosData["user_name"]);
                        unset($csosData["lasttime"]);
                        if (in_array($status,array(5,7))) {
                            //删除已分配装修公司
                            D("OrderInfo")->delOrderInfo(I("post.id"));
                        }
                    }elseif($csos_new["order_on"] == 4 && $info["type_fw"] != 0 && $status == 8) {
                        //以审有效已分配，审核为无效
                        //删除已分配装修公司
                        D("OrderInfo")->delOrderInfo(I("post.id"));
                    }
                    $csosModel->editCsos(I("post.id"),$csosData);
                } else {
                    //添加新记录
                    $csosData["addtime"] = $time;
                    $csosModel->addCsos($csosData);
                }

                $this->orderStatusChange($info["id"],$data["on"],$data["on_sub"],$data["on_sub_wuxiao"]);

                 //添加审单日志
                $logData = array(
                    "orderid" => $info["id"],
                    "old_on" => $info["on"],
                    "new_on" => $data["on"],
                    "old_on_sub" => $info["on_sub"],
                    "new_on_sub" => $data["on_sub"],
                    "old_on_sub_wuxiao" => $info["on_sub_wuxiao"],
                    "new_on_sub_wuxiao" => $data["on_sub_wuxiao"],
                    "old_type_fw" => $info["type_fw"],
                    "new_type_fw" => $data["type_fw"],
                    "old_type_zs_sub" => $info["type_zs_sub"],
                    "new_type_zs_sub" => $data["type_zs_sub"],
                    "user_id" => session("uc_userinfo.id"),
                    "user_uid" => session("uc_userinfo.uid"),
                    "old_name" => $csos_new["user_name"],
                    "name" => session("uc_userinfo.name"),
                    "time" => $time,
                );
                $csosModel->addLog($logData);
                if ((I("post.sub_status") !== "") && ($info["remarks"] != I("post.sub_status"))) {
                    $save = array(
                        'order_id' => $info["id"],
                        'remark_time' => date('Y-m-d H:i:s', time())
                    );
                    D('LogOrderRemarkTime')->addLogOrderRemarkTime($save);
                }
                if(str_replace("remark_","" , I("post.status")) == 8 && I("post.sub_status") != '已转家具单'){
                    $this->addJiaJuOrder(I("post.id"));
                }
                $this->ajaxReturn(array('errmsg'=> "订单审核成功！",'code'=> 200,'info' => $status));
            }

            $this->ajaxReturn(array('errmsg'=> "订单审核失败！",'code'=> 404));
        }
    }

    /**
     * [getOrdersList 获取订单列表]
     * @param  integer $id              [订单ID]
     * @param  integer $cs              [订单城市]
     * @param  string  $xiaoqu          [订单小区]
     * @param  string  $ip              [订单IP]
     * @param  string  $tel_encrypt     [订单加密后电话号码]
     * @param  string  $time_real_start [真实发布开始时间]
     * @param  string  $time_real_end   [真实发布结束时间]
     * @param  string  $nf_time_start   [拿房开始时间]
     * @param  string  $nf_time_end     [拿房结束时间]
     * @param  boolean $on              [订单状态]
     * @param  boolean $on_sub          [订单子状态]
     * @param  boolean $type_fw         [分单问单]
     * @param  boolean $remarks         [订单备注]
     * @param  boolean $openeye_st      [显示号码状态]
     * @param  string $order            [排序]
     * @param  string $each             [每页查询]
     * @return [type]                   [description]
     */
    private function getOrdersList($id = 0,$cs = 0, $xiaoqu = '', $ip = '', $tel_encrypt = '', $time_start = '', $time_end = '',  $time_real_start = '', $time_real_end = '', $nf_time_start = '', $nf_time_end = '', $on = false, $on_sub = false, $type_fw = false, $remarks = false, $openeye_st = false, $op_uid = false, $order = 'time_real DESC', $each = '10',$isactivity){
        import('Library.Org.Util.Page');
        $db = D('Orders');
        //查询活动发单位置
        $list = D("Activity")->getActivityIds();
        $ids = array();
        foreach ($list as $key => $value) {
            if ($value["source_id"] != 0) {
                $source = array_filter(explode(",",$value["source_id"]));
                $ids = array_merge($ids,$source);
                foreach ($source as $k => $val) {
                    $active[$val] = $value["name"];
                }
            }
        }

        $count = $db->getOrdersListCountJoinOrderPool($id, $cs, $xiaoqu, $ip, $tel_encrypt, $time_start, $time_end,  $time_real_start, $time_real_end, $nf_time_start, $nf_time_end, $on, $on_sub, $type_fw, $remarks, $openeye_st, $op_uid,$isactivity,$ids);

        $Page       = new \Page($count,$each);
        $result['page'] = $Page->show();
        $result['list'] = $db->getOrdersListJoinOrderPool($id, $cs, $xiaoqu, $ip, $tel_encrypt, $time_start, $time_end,  $time_real_start, $time_real_end, $nf_time_start, $nf_time_end, $on, $on_sub, $type_fw, $remarks, $openeye_st, $op_uid, $order, $Page->firstRow,$Page->listRows,$isactivity,$ids);


        foreach ($result['list'] as $key => $value) {
            if (in_array($value["source"],$ids)) {
                $result['list'][$key]['sourceMark'] = 1;
                $result['list'][$key]['source_remark'] = $active[$value["source"]];
            }
        }


        return $result;
    }

    /**
     * 保存订单
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function applyedit()
    {
        if ($_POST) {
            $model = D("Orders");
            $post  = I("post.");
            $data['orders_id'] = $post["orders"];
            $data['apply_reason'] = $post["reason"];
            $data["apply_time"] = time();
            $data["apply_id"] = session("uc_userinfo.id");
            if ($model->addOrdersApplyEdit($data)) {
                //添加操作日志
                $logData = array(
                    "remark" => session("uc_userinfo.name")."申请修改订单".$post["orders"]."信息",
                    "action_id" =>  $post["orders"],
                    "logtype" => "applyedit",
                    "info"=>$data
                );
                D('LogAdmin')->addLog($logData);

                $code = 200;
            } else {
                $msg = $model->getError();
            }
            $this->ajaxReturn(array('errmsg'=> $msg,'code'=> $code));
        }

    }
    // +----------------------------------------------------------------------
    // |------------------------------分割线-----------------------------------
    // +----------------------------------------------------------------------
    /**
     * 参数设置
     * @return [type] [description]
     */
    public function config()
    {
        //查询订单设置的配置信息
        $result = D("Options")->getOptionByGroup("order");
        $options = [];
        foreach ($result as $key => $value) {
            $options[$value["option_name"]] = $value["option_value"];
            /*if ($value["option_name"] == "open_order_customer") {
                $options[$value["option_name"]] = array_flip(array_filter(explode(",", $value["option_value"])));
            }*/

            if ($value["option_name"] == "time_step") {
                $options[$value["option_name"]] = json_decode($value["option_value"],true);
            }

        }
        $this->assign("options",$options);
        $this->display();
    }

    /**
     * 排版管理
     * @return [type] [description]
     */
    public function scheduling()
    {
        //获取客服角色列表
        $result = D("Adminuser")->getDepartmentUidById(array(22));
        if (in_array(session("uc_userinfo.uid"),array(30,31,104))) {
            //客服师长,客服团长查看获取自己的管辖人员ID
            $roles = D("RbacNodeGroup")->getRoleGroupInfoByRoleId(session("uc_userinfo.uid"));
            $roles = array_filter(explode(",",$roles["role_id"]));
            if (count($roles) == 0) {
                 $this->_error("没有相关管辖数据,请在角色组管理中设置");
            }
            //获取客服列表
            if (session("uc_userinfo.uid") == 30) {
                //师长
                $kfmanager = session("uc_userinfo.id");
            } elseif (session("uc_userinfo.uid") == 31) {
                //团长
                $userInfo = D("Adminuser")->findUserInfoById(session("uc_userinfo.id"));
                $kfgroup = $userInfo["kfgroup"];
            }
            $res = D("Adminuser")->getKFListByUid($roles,$kfmanager,$kfgroup);

            foreach ($res as $key => $value) {
                $ids[] = $value["id"];
            }

            $ids[] = session("uc_userinfo.id");
        }

        //获取客服排班
        $list = $this->getSchedulingList($result["roles"],I("get.date"),$ids);
        //获取最近一星期的操作日志
        $end = mktime(0,0,0,date("m"),date("d"),date("Y"));
        $start = strtotime("-1 week",$end);
        $log = D("LogAdmin")->getLogListByLogType("scheduling",date("Y-m-d H:i:s",$start),date("Y-m-d 23:59:59",$end));
        $this->assign("log", $log);
        $this->assign("list",$list);
        $this->display();
    }

    public function schedulingUp()
    {
        if ($_POST) {
            $id = I("post.id");
            $name = I("post.name");
            $scheduling = I("post.data");
            $month = I("post.date");
            if (empty($month)) {
                $month = date("Y-m");
            }

            $firstDay = strtotime(date("Y-m-01",strtotime($month)));
            $lastDay = mktime(23,59,59,date("m",$firstDay),date("t",$firstDay),date("Y",$firstDay));

            //删除原纪录
            D("UserScheduling")->delSchedulingInfo($id,date("Y-m-d",$firstDay),date("Y-m-d",$lastDay));

            //获取当月日历
            $dayCount = date("t",strtotime($month));

            for ($i = 0; $i < $dayCount ; $i++) {
                $date[] = date("Y-m-d",strtotime("+$i day",$firstDay));
            }
            //获取当月日历
            $dayCount = date("t",strtotime($month));

            foreach ($scheduling as $key => $value) {
                $data[] = array(
                    "user_id" => $id,
                    "status" => $value,
                    "time" => time(),
                    "date" => $date[$key]
                );
            }

            if (count($data) > 0) {
                $i = D("UserScheduling")->addALLScheduling($data);
                if ($i !== false) {
                     //添加操作日志
                    $logData = array(
                        "remark" => session("uc_userinfo.name")."编辑了".$month." ".$name."的排班",
                        "action_id" => $id,
                        "logtype" => "scheduling"
                    );
                    D('LogAdmin')->addLog($logData);
                    $this->ajaxReturn(array("status"=>1));
                }
            }
            $this->ajaxReturn(array("status"=>0,"errmsg"=>"设置失败！"));
        }
    }

    /**
     * 订单设置
     * @return [type] [description]
     */
    public function orderconfigup()
    {
        if ($_POST) {
            $model = D("Options");
            $group = "order";
            //查询订单设置的配置信息
            $result = D("Options")->getOptionByGroup($group);
            $data = I("post.");
            //验证数据
            $reg = '/^\d+$/';
            if (!preg_match($reg, $data["new_order_interval"])) {
                $this->ajaxReturn(array("code"=>404,"errmsg"=>"新订单时间间隔设置错误！"));
            }
            if (!preg_match($reg, $data["new_order_count"])) {
                $this->ajaxReturn(array("code"=>404,"errmsg"=>"个人待处理新订单峰值！"));
            }
            if (!preg_match($reg, $data["unfinished_order_count"])) {
                $this->ajaxReturn(array("code"=>404,"errmsg"=>"个人未完成订单量峰值设置错误！"));
            }

            if (!preg_match($reg, $data["intval_time_up"]) || !preg_match($reg, $data["intval_time_down"])) {
                $this->ajaxReturn(array("code"=>404,"errmsg"=>"自动派单间隔时间设置错误！"));
            }

            if ($data["intval_time_down"] >= 60 || $data["intval_time_up"] >= 60 ) {
                $this->ajaxReturn(array("code"=>404,"errmsg"=>"自动派单间隔时间不能超过60分钟！"));
            }
            if ($data["auto_order_limit"] < 1 && $data["auto_order_limit_switch"] == 1 ) {
                $this->ajaxReturn(array("code"=>404,"errmsg"=>"当天个人最高派单量不能少于1个！"));
            }

            $description = array(
                "new_order_interval" => "获取新订单时间间隔",
                "new_order_count" => "个人待处理新订单峰值",
                "unfinished_order_count" => "个人未完成订单量峰值",
                "unfinished_order_start" => "个人未完成订单量峰值开关开始时间",
                "unfinished_order_end" => "个人未完成订单量峰值开关结束时间",
                "unfinished_order_switch" => "个人未完成订单量峰值开关，0：关，1：开",
                "revoke_rete" => "被撤回订单数计算系数",
                "invalid_rate" => "当天无效单计算系数",
                "effective_rate" => "当天有效单计算系数",
                //"open_order_customer" => "派单客服",
                "auto_order_limit" => "当天个人最高派单量",
                "auto_order_limit_switch" => "当天个人最高派单量开关，0：关，1：开",
                "auto_order_start" => "自动派单开始时间",
                "auto_order_end" => "自动派单结束时间",
                "auto_order_switch" => "自动派单开关",
                "auto_intval_time" => "自动派单间隔时间开关",
                "intval_time_up" => "自动派单上午间隔时间",
                "intval_time_down" => "自动派单下午间隔时间",
                "kf_num" => "自动派单客服数量",
                "new_kf_num" => "新客服数量",
                "time_step" => "客服个人每小时派单量",
            );

            foreach ($result as $key => $value) {
                $options[$value["option_name"]] = $value;
            }

            //查询是否有新增项目
            foreach ($data as $key => $value) {
                if ($key == "time_step") {
                    $data[$key] = json_encode($value);
                }
                if (!array_key_exists($key,$options)) {
                    $other[$key] = $data[$key];
                    unset($data[$key]);
                }
            }

            if (count($data) > 0) {
                //修改配置
                foreach ($data as $key => $value) {
                    $i = $model->setOption($key,$value);
                }
            }

            if (count($other) > 0) {
                foreach ($other as $key => $value) {
                    $sub = array(
                        "option_name" => $key,
                        "option_value" => $value,
                        "option_group" => $group,
                        "option_remark" => '客服系统订单设置,'.$description[$key],
                        "autoload" => 'yes'
                    );
                    $all[] = $sub;
                }
                //添加配置项
                $i = $model->addAllOption($all);
            }

            if ($i !== false) {
                //清除OP缓存
                S('Cache:Optionslist',null);
                //如果设置的间隔时间不一致，更新计划任务
                if (array_key_exists("intval_time",$other) || $options["intval_time_up"]["option_value"] != I("post.intval_time_up") ||  $options["intval_time_down"]["option_value"] != I("post.intval_time_down") || $options["auto_intval_time"]["option_value"] != I("post.auto_intval_time")) {
                    $timeUp = I("post.intval_time_up")*60;
                    $timeDown = I("post.intval_time_down")*60;
                    //计算分小时

                    $minUp = floor($timeUp%86400%3600/60);
                    $minUp =  $minUp == 0?"*":"*/".$minUp;

                    $minDown = floor($timeDown%86400%3600/60);
                    $minDown =  $minDown == 0?"*":"*/".$minDown;

                    $placeholder = "#";
                    if (I("post.auto_intval_time") == 1) {
                        $placeholder = "";
                    }

                    $params = http_build_query(array(
                        "name"=>"order/zxdeliveryordersync",
                        "timer"=>"$placeholder$minUp 8-12 * * *|$placeholder$minDown 13-18 * * *",
                        "whoami"=>"root"
                    ));
                    //注意需要把cronapi.cron.qz解析为 cronapi所在运行的服务器地址。 使用hosts 解析 dns服务器解析均可
                    $url = "http://cronapi.cron.qz:9090/v1/cron/?".$params;
                    $ch = curl_init();
                    $header = array(
                        "accept:application/json"
                    );
                    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
                    curl_setopt($ch, CURLOPT_URL, $url); //定义请求地址
                    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT"); //定义请求类型，当然那个提交类型那一句就不需要了
                    curl_setopt($ch, CURLOPT_HEADER,0); //定义是否显示状态头 1：显示 ； 0：不显示
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);//定义是否直接输出返回流
                    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
                    $result = curl_exec($ch);
                    if ($result != false) {
                        $json = json_decode($result,true);
                    }
                    curl_close($ch);//关闭
                }
                $this->ajaxReturn(array("code"=>200,"err_msg"=>$json["err_msg"],"err_code"=>$json["err_code"]));
            }
            $this->ajaxReturn(array("code"=>404,"errmsg"=>"设置失败！"));
        }
    }

    /**
     * 城市信息展示页
     * @return [type] [description]
     */
    public function cityinfo()
    {
        //获取城市信息列表
        $list = D("OrderCityInfo")->getCityInfoList();
        $this->assign("list",$list);
        $this->display();
    }

    public function docking()
    {
        $arr = OP("open_type_list");
        $arr = array_filter(explode(",",$arr));
        //查新订单类型
        $type = 0;
        $status = array(
            "1" => "分单",
            "2" => "赠单"
        );

        $getBegin = I("get.begin");
        $getEnd   = I("get.end");

        if (I("get.type") == 2) {
            $type = 1;
            $status[3] = "分没人跟";
            $status[4] = "赠没人跟";

            //如果是已经分配的列表,默认限制只看最近3个月的数据
            if (empty($getBegin) && empty($getEnd)) {
                $getBegin = date('Y-m-d H:i:s', strtotime("-3 month"));
                $getEnd = date('Y-m-d H:i:s', time());
            }
        }
        if(I("get.type") == 3){
            $type = 2;
            $status = array(
                "5" => "待分配分单",
                "6" => "待分配赠单"
            );
        }

        if (I("get.id") !== "") {
            $id = I("get.id");
        }

        if (I("get.cs") !== "") {
            $cs = I("get.cs");
        }

        $citys = getUserCitys();

        //获取对接客服列表信息
        $result = D("Adminuser")->getDockingKfList();
        foreach ($result as $key => $value) {
            $kfList[] = array(
                "name" => $value["name"],
                "id" => $value["id"]
            );
        }

        if(!I('get.type')){
            $gettype = 1;
        }else{
            $gettype = I('get.type');
        }
        $this->assign("gettype",$gettype);
        $this->assign("timediff",$this->timediff);
        $this->assign("citys",$citys);
        $this->assign("status",$status);
        $this->assign("kflist",$kfList);

        //获取对接的列表
        $list = $this->getDockingList($this->city,$type,$id,$cs,$getBegin,$getEnd,I("get.status"),I("get.kf"),I("get.timediff"),$arr,I("get.isactivity"));
        $this->assign("showList",$arr);
        $this->assign("list",$list["list"]);
        $this->assign("page",$list["page"]);
        $this->display();
    }

    /**
     * 对接编辑页面
     */
    public function editDocking()
    {
        if ($_POST) {
            //查询订单信息
            $info = $this->getOrderInfo(I("post.id"));
            //过滤不规则字符串
            $reg = '/[\`~!@#$%^&*\(\)+<>?"{},.\/;\'\"\s]/';
            $info["xiaoqu"] = preg_replace($reg,"",$info["xiaoqu"]);

            //生成手机访问的短网址
            $orderdwz  = url_getdwz($info['id']);
            $info['dwz'] = $orderdwz;

            $this->assign("info",$info);
            $this->assign("source_in",$this->source_in);

            //后台转发人数组
            $ids = D("Options")->getOptionNameCC("kf_admin_order_users");
            $names = D("User")->getAdminNamesById($ids['option_value']);
            foreach ($names as $k => $v) {
                $zhuanfaren[] = $v['name'];
            }
            $this->assign("zhuanfaren",$zhuanfaren);
            /*$this->assign("zhuanfaren",$this->zhuanfaren);*/
            //获取订单城市和区县
            $city = D("Quyu")->getCityInfoById($info["cs"]);
            $this->assign("city",$city);
            //户型
            $huxing = D("Huxing")->gethx();
            //预算
            $yusuan = D("Jiage")->getJiage();
            //装修方式
            $fangshi  = D("Fangshi")->getfs();
            //风格
            $fengge  = D("Fengge")->getfg();
            //获取最后审核人信息
            $csos_new = D("OrderCsosNew")->getCsosInfo(I("post.id"));

            //获取 未接通电话短信通知 短信记录
            $logCount = D("LogSmsSend")->getOrderSendLogCount($info["id"],2);

            //获取 通知业主分配的装修公司 短信记录
            $smsCount = D("LogSmsSend")->getOrderSendLogCount($info["id"],1);

            //获取订单分配信息
            $company = D("OrderInfo")->getOrderComapny($info["id"]);

            //有分配订单的情况下，查询微信是否发送
            if (count($company) > 0) {
                //获取订单微信发送记录
                $wx = D("LogWxOrdersend")->getWeixinLog($info["id"]);
                if (count($wx) > 0) {
                    $this->assign("wxMark",1);
                }
            }

            //获取该订单所在城市的的会员公司
            $result = $this->getCompanyList($info["cs"]);

            //如果是已分配公司,默认选中
            foreach ($company as $key => $value) {
                $compnay_id[$value["id"]] = $value["id"];
            }

            foreach ($result[0] as $key => $value) {
                foreach ($value["child"] as $k => $val) {
                    if (array_key_exists($val["id"],$compnay_id)) {
                        $result[0][$key]["child"][$k]["ischeck"] = 1;
                    }
                }
            }

            foreach ($result[1] as $key => $value) {
                foreach ($value["child"] as $k => $val) {
                    if (array_key_exists($val["id"],$compnay_id)) {
                        $result[1][$key]["child"][$k]["ischeck"] = 1;
                    }
                }
            }

            //查询上次分配装修公司
            $fenpei_company = D("OrderInfo")->getLastTypeFw($info["id"],$info["cs"]);

            //本地装修公司
            foreach ($fenpei_company as $k => $val) {
                if ($val["cs"] == $info["cs"]) {
                    $fenpei_now_company[] = $val;
                    unset($fenpei_company[$k]);
                }
            }

            //其他城市
            foreach ($result[1] as $key => $value) {
                foreach ($fenpei_company as $k => $val) {
                    if ($val["cs"] == $key) {
                        $result[1][$key]["fen_company"][] = $val;
                        unset($fenpei_company[$k]);
                    }
                }
            }

            //查询小区历史签单公司
            $history = $this->orderHistory($info["xiaoqu"],$info['cs']);
            if (count($history) > 0) {
                $this->assign("history",$history);
            }

            //获取最近30过期的会员信息
            $lostCompany = $this->getLastExpireCompanyList($info["cs"],date("Y-m-d"));

            //获取订单IP是否重复
            $ipCount = D("Orders")->getIpRepaetCountByIds(array($info["id"]));
            $ipCount = $ipCount[0]["repeat_count"] - 1;
            if ($ipCount > 0) {
                $this->assign("ipMark",$ipCount);
            }

            //获取群公布模版信息
            $notice = D("OrderNoticeTemplate")->getCityTemplate($info["cs"]);

            //获取城市信息模版
            $tmp = $this->getCityInfoTmp($info["cs"],true);

            //获取申请记录
            $apply = D("Orders")->getOrderApplyEdit($info["id"],1);

            $this->assign("apply",$apply);
            $this->assign("notice",$notice);
            $this->assign("tmp",$tmp);
            $this->assign("lostCompany",$lostCompany);
            $this->assign("company",$company);
            $this->assign("smsCount",$smsCount);
            $this->assign("fenpei_now_company",$fenpei_now_company);
            $this->assign("nowCompanys",$result[0]);
            $this->assign("otherCompanys",$result[1]);
            $this->assign("logCount",$logCount);
            $this->assign("csos_new",$csos_new);
            //未分配页面 订单出现的时间超过5分钟后，才能现在待分配
            if(I('post.type') != 1){
                unset($this->docking_status[3]);
                unset($this->docking_status[4]);
            }

            //如果不是是赠单,删除分单选项
            if (!($info["on"] == 4 && $info["type_fw"] == 2) && !($info["on"] == 4 && $info["type_fw"] == 6)) {
                unset($this->docking_status[5]);
            }

            $this->assign("gettype",I('post.type'));
            $this->assign("status",$this->docking_status);
            $this->assign("keys",$this->keys);
            $this->assign("lf_time",$this->lf_time);
            $this->assign("start_time",$this->start_time);
            $this->assign("shi",$this->shi);
            $this->assign("lxs",$this->lxs);
            $this->assign("fengge",$fengge);
            $this->assign("fangshi",$fangshi);
            $this->assign("yusuan",$yusuan);
            $this->assign("huxing",$huxing);
            $this->assign("applyname",session("uc_userinfo.name"));
            $tmp = $this->fetch("editDocking");
            $this->ajaxReturn(array("code"=>200,"data"=>$tmp,'info'=>$info));
        }
    }

     /**
     * 定单审核状态
     * @return [type] [description]
     */
    public function orderdockingstatus()
    {
        if ($_POST) {
            $orders = D("Home/Orders");
            $csosModel = D("OrderCsosNew");

            $status = I("post.status");
            $status = str_replace("remark_","",$status);
            $time = time();
            switch ($status) {
                case '0':
                    //分没人跟
                    $data["on"] = 4;
                    $data["on_sub"] = 0;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 3;
                    break;
                case '1':
                    //赠没人跟
                    $data["on"] = 4;
                    $data["on_sub"] = 0;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 4;
                    break;
                case '2':
                    //撤回
                    $data["on"] = 99;
                    $data["on_sub"] = 0;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 0;
                    $data["fen_customer"] = 0;
                    break;
                case '3':
                    //待分配分单
                    $data["on"] = 4;
                    $data["on_sub"] = 0;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 5;
                    break;
                case '4':
                    //待分配赠单
                    $data["on"] = 4;
                    $data["on_sub"] = 0;
                    $data["on_sub_wuxiao"] = 0;
                    $data["type_fw"] = 6;
                    break;
                case '5':
                    //分单
                    $data["on"] = 4;
                    $data["type_fw"] = 1;
                    break;
            }

            if (I("post.sub_status") !== "") {
                $data["remarks"] = I("post.sub_status");
            }

            //查询订单信息
            $info = $this->getOrderInfo(I("post.id"));

            if (empty($info["fen_customer"]) && $status != 2) {
                $data["fen_customer"] = session("uc_userinfo.id");
            }

            if (count($info) == 0 ) {
                $this->ajaxReturn(array('errmsg'=> "该订单不存在！",'code'=> 404));
            }

            $data["lasttime"] = $time;
            $result = $orders->editOrder(I("post.id"),$data);

            if ($result !== false) {
                //删除装修公司反馈信息
                D("Home/Logic/OrderCompanyReviewLogic")->delReviewInfoByOrderId(I("post.id"));

                //获取客服信息
                $kfInfo = D("Adminuser")->findKfInfo(session("uc_userinfo.id"));
                $this->orderStatusChange($info["id"],$data["on"],$data["on_sub"],$data["on_sub_wuxiao"]);

                //撤回单的时候调整订单状态
                if ($data["on"] == 99) {
                    //记录操作统计表
                    $csosData = array(
                        "order_on" => $data["on"],
                        "order_on_sub" => $data["on_sub"],
                        "order_on_sub_wuxiao" => $data["on_sub_wuxiao"]
                    );
                    $csosModel->editCsos(I("post.id"),$csosData);

                    //删除对接信息
                    D("OrderDocking")->delDocking($info["id"]);
                }
                $gettype =   I("post.gettype"); //来自待分配页面
                if ($status != 2 && $gettype != 3) {

                    //查询是否有对接信息
                    $count = D("OrderDocking")->getDockingInfoCount($info["id"]);
                    if ($count == 0) {
                        $dockingdata = array(
                            "order_id" => $info["id"],
                            "op_uid" => session("uc_userinfo.id"),
                            "op_uname" => session("uc_userinfo.name"),
                            "time" => time()
                        );
                        D("OrderDocking")->addDocking($dockingdata);
                    }
                }

                //添加审单日志
                $logData = array(
                    "orderid" => $info["id"],
                    "old_on" => $info["on"],
                    "new_on" => $data["on"],
                    "old_on_sub" => $info["on_sub"],
                    "new_on_sub" => $data["on_sub"],
                    "old_on_sub_wuxiao" => $info["on_sub_wuxiao"],
                    "new_on_sub_wuxiao" => $data["on_sub_wuxiao"],
                    "old_type_fw" => $info["type_fw"],
                    "new_type_fw" => $data["type_fw"],
                    "old_type_zs_sub" => $info["type_zs_sub"],
                    "new_type_zs_sub" => $data["type_zs_sub"],
                    "user_id" => session("uc_userinfo.id"),
                    "user_uid" => session("uc_userinfo.uid"),
                    "old_name" => $csos_new["user_name"],
                    "name" => session("uc_userinfo.name"),
                    "time" => $time,
                );

                $csosModel->addLog($logData);
                if ((I("post.sub_status") !== "") && ($info["remarks"] != I("post.sub_status"))) {
                    $save = array(
                        'order_id' => $info["id"],
                        'remark_time' => date('Y-m-d H:i:s', time())
                    );
                    D('LogOrderRemarkTime')->addLogOrderRemarkTime($save);
                }

                //删除已分配装修公司
                D("OrderInfo")->delOrderInfo(I("post.id"));
                $this->ajaxReturn(array('errmsg'=> "订单审核成功！",'code'=> 200));
            }

            $this->ajaxReturn(array('errmsg'=> "订单审核失败！",'code'=> 404));
        }
    }

    /**
     * 订单分单操作
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function orderchange()
    {
        if ($_POST) {
            //分单公司
            $companys = I("post.companys");
            $companys_yxb = I("post.companys");
            $time = time();
            if (count($companys) == 0) {
                $this->ajaxReturn(array('errmsg'=> "请选择分单装修公司",'code'=> 404));
            }

            //查询订单信息
            $info = $this->getOrderInfo(I("post.id"));
            if ($info["on"] != 4 ) {
                $this->ajaxReturn(array("code"=>404,"errmsg"=>"订单尚未审核有效,审核后再分配！"));
            }

            foreach ($companys as $key => $value) {
                if (empty($value["type_fw"])) {
                    $this->ajaxReturn(array('errmsg'=> "请选择分单状态",'code'=> 404));
                }
                $fen_status = $value["type_fw"];
                if ($value["type_fw"] == 1) {
                    $status = 1;
                }
            }

            if (isset($status)) {
                $fen_status = $status;
            }

            //如果是分单必须有一个公司是分单
            if ($info["on"] == 4 && $info["type_fw"] == 1) {
                if ($fen_status == 2) {
                    $this->ajaxReturn(array("code"=>404,"errmsg"=>"请至少选择一个分单！"));
                }
            }

            //如果是赠单必须全部是赠单
            if ($info["on"] == 4 && $info["type_fw"] == 2) {
                if ($fen_status == 1) {
                    $this->ajaxReturn(array("code"=>404,"errmsg"=>"赠单必须是全部赠单！"));
                }
            }


            if (count($companys) > 0 ) {
                //查询订单已分单情况
                $orderCompnay = D("OrderInfo")->getOrderComapny(I("post.id"));
                //删除原有分单记录
                D("OrderInfo")->delOrderInfo(I("post.id"));
                //检查原有分配装修公司和新分配装修公司
                if (count($orderCompnay) > 0) {
                    foreach ($companys as $key => $value) {
                        foreach ($orderCompnay as $k => $val) {
                            if ($value['compnay_id'] == $val["id"]) {
                                $companys[$key]["addtime"] = $val["addtime"];
                                $companys[$key]["readtime"] = $val["readtime"];
                                $companys[$key]["isread"] = $val["isread"];
                                unset($orderCompnay[$k]);
                            }
                        }
                    }
                }

                //新的装修公司
                if (count($companys) > 0) {
                    foreach ($companys as $key => $value) {
                        $subData = array(
                            "com" => $value["compnay_id"],
                            "order" => I("post.id"),
                            "type_fw" => $value['type_fw'],
                            "addtime" => $time,
                            "opid" => session("uc_userinfo.id"),
                            "opname" => session("uc_userinfo.name")
                        );

                        if (!empty($value["addtime"])) {
                            $subData["addtime"] = $value["addtime"];
                        }

                        if (!empty($value["isread"])) {
                            $subData["isread"] = $value["isread"];
                        }

                        if (!empty($value["readtime"])) {
                            $subData["readtime"] = $value["readtime"];
                        }
                        D("OrderInfo")->addInfo($subData);
                    }

                    //添加量房记录
                    foreach ($companys as $key => $value) {
                        $reviewList[] = array(
                            "orderid" => I("post.id"),
                            "comid" => $value["compnay_id"],
                            "status" => 0,
                            "time" => 0,
                            "reason" => "",
                            "remark" => "",
                            "lianxi" => 2,
                            "liangfang" => 2,
                            "lf_time" => 0,
                        );
                    }
                    //1.查询分配公司历史订单反馈记录
                    $result = D("Home/Logic/OrderCompanyReviewLogic")->getReviewInfoByOrderId(I("post.id"));

                    if (count($result) > 0) {
                        //如果已有订单反馈记录
                        foreach ($reviewList as $key => $value) {
                            foreach ($result as $k => $val) {
                                if ($val["comid"] == $value["comid"]) {
                                    $reviewList[$key] = $val;
                                }
                            }
                        }
                    }

                    //2.删除之前的订单反馈记录
                    D("Home/Logic/OrderCompanyReviewLogic")->delReviewInfoByOrderId(I("post.id"));

                    //3.添加反馈记录
                    D("Home/Logic/OrderCompanyReviewLogic")->addReviewInfo($reviewList);

                    //todo 同步订单到erp系统
                    $yxb_orders_logic = D("Home/Logic/YxbOrdersLogic");
                    $yxb_orders_logic->setYxbOrder($info,$companys_yxb);

                    $orders = D("Orders");
                    //更新订单状态，分/赠单算分单
                    $data = array(
                        "on" => 4,
                        "type_fw" => $fen_status,
                    // "customer" => session("uc_userinfo.id"),
                        "lasttime" => time()
                     );
                    $i = $orders->editOrder($info["id"],$data);
                    if ($i !== false) {
                        //获取 通知业主分配的装修公司 短信记录
                        $smsCount = D("LogSmsSend")->getOrderSendLogCount($info["id"],1);
                        if ($smsCount  == 0) {
                            //自动发送短信
                            $result = $this->sendOrderSms($info["id"]);
                            if ($result !== true) {
                                $result = 0;
                                $errmsg = $result;
                            }
                        }

                        //添加操作日志
                        $source = array(
                            "username" => session("uc_userinfo.name"),
                            "admin_id" => session("uc_userinfo.id"),
                            "orderid"  => $info["id"],
                            "type"     => $fen_status,
                            "postdata" => json_encode($data),
                            "addtime"  => time()
                        );
                        D("LogEditorders")->addLog($source);
                        //获取订单分配信息
                        $company = D("OrderInfo")->getOrderComapny($info["id"]);


                        if (empty($info["fen_customer"])) {
                            //修改订单分单人信息
                            $data = array(
                                "fen_customer" => session("uc_userinfo.id")
                            );
                            D("Orders")->editOrder($info["id"],$data);
                        }

                        //查询是否有对接信息
                        $count = D("OrderDocking")->getDockingInfoCount($info["id"]);
                        if ($count == 0) {
                            $data = array(
                                "order_id" => $info["id"],
                                "op_uid" => session("uc_userinfo.id"),
                                "op_uname" => session("uc_userinfo.name"),
                                "time" => time()
                            );
                            D("OrderDocking")->addDocking($data);
                        }

                        $this->ajaxReturn(array('code'=> 200,"data"=>$company,"info"=>$result,"msg"=>"订单分配成功！ ".$errmsg));
                    }
                }
            }
            $this->ajaxReturn(array('code'=> 404,"errmsg"=>"分单操作失败！"));
        }
    }

    /**
     * 订单状态改变
     * @param  [type] $orderid       [订单ID]
     * @param  [type] $on            [订单状态]
     * @param  [type] $on_sub        [订单子状态]
     * @param  [type] $on_sub_wuxiao [订单无效子状态]
     * @return [type]                [description]
    */
    public function orderStatusChange($orderid,$on,$on_sub,$on_sub_wuxiao)
    {
        if (empty($orderid)) {
            die();
        }
        $orders = D("Home/Orders");

        //修改订单的状态
        $data = array(
            "chk_customer" => session("uc_userinfo.id")
        );

        if (!empty($on)) {
            $data["on"] = $on;
        }

        if (!empty($on_sub_wuxiao)) {
            $data["on_sub_wuxiao"] = $on_sub_wuxiao;
        }

        if (!empty($on_sub)) {
            $data["on_sub"] = $on_sub;
        }

        $orders->editOrder($orderid,$data);

        //获取订单信息
        $orderInfo = $orders->findOrderInfo($orderid);

        //获取订单状态数据
        $orderStatusChange = D("OrdersStatusChange");
        $orderStatusInfo = $orderStatusChange->findOrderStatus($orderid,$orderInfo["on"],$orderInfo["on_sub"],$orderInfo["on_sub_wuxiao"]);

        if (count($orderStatusInfo) > 0) {
            //添加orders_status_change
            $data = array(
                "user_id" => session("uc_userinfo.id"),
                "user_user" =>  session("uc_userinfo.name"),
                "time_add" =>time()
            );
            $orderStatusChange->editOrderStatus($orderStatusInfo["orderid"],$data);
        } else {
            //添加orders_status_change
            $data = array(
                "orderid" => $orderInfo["id"] ,
                "on" => $orderInfo["on"],
                "on_sub" =>$orderInfo["on_sub"],
                "user_id" => session("uc_userinfo.id"),
                "user_user" =>  session("uc_userinfo.name"),
                "cs" => $orderInfo["cs"],
                "time_add" =>time()
            );
            $orderStatusChange->addOrderStatus($data);
        }

        //获取上一次订单的日志信息
        $log = D("Home/LogOrderSwitchstatus");
        $lastLog = $log->getLastOrderLog($orderInfo["id"]);

        //订单状态改变记录表
        $data = array(
            "orderid" => $orderInfo["id"],
            "last_on" => $lastLog["on"],
            "last_on_sub" => $lastLog["on_sub"],
            "last_on_sub_wuxiao" => $lastLog["on_sub_wuxiao"],
            "on" => $orderInfo["on"],
            "on_sub" => $orderInfo["on_sub"],
            "on_sub_wuxiao" => $orderInfo["on_sub_wuxiao"],
            "last_user_id" => $lastLog["user_id"],
            "user_id" => session("uc_userinfo.id"),
            "last_name" =>  $lastLog["name"],
            "name" => session("uc_userinfo.name"),
            "addtime" => time()
        );
        $log->addLog($data);
    }

    /**
     * 赠单不能生成新单
     * @return [type] [description]
     */
    public function ordertonewchange()
    {
        if ($_POST) {
            if (I("post.text") == "") {
                $this->ajaxReturn(array('errmsg'=> "请填写原因",'code'=> 404));
            }
            $order = D("Orders");
            $data = array(
                "order_to_new_remak" => I("post.text"),
                "order_to_new" => 2
            );
            $i = $order->editOrder(I("post.id"),$data);
            if ($i !== false) {
                $this->ajaxReturn(array('code'=> 200));
            }
            $this->ajaxReturn(array('errmsg'=> "操作失败！",'code'=> 404));
        }
    }

    /**
     * 赠单生成新单
     * @return [type] [description]
     */
    public function ordernftoneworder()
    {
        if ($_POST) {
            //查询订单信息
            $info = $this->getOrderInfo(I("post.id"));
            if ('4' != $info['on'] || !in_array($info['type_fw'],array('2','4')) ) {
                $this->ajaxReturn(array('errmsg'=> "只有赠单才允许生成新单!",'code'=> 404));
            }

            if (!empty($info['from_old_orderid'])) {
                $this->ajaxReturn(array('errmsg'=> "本订单已经是生成的订单!",'code'=> 404));
                  }

                  if ( '0' != ($info['order_to_new'])) {
                    $this->ajaxReturn(array('errmsg'=> "本订单已经被处理过了,不能够生成新订单!",'code'=> 404));
                  }

            //处理新订单的基本数据，过滤掉无关的数据
            $newInfo = $info;
            unset($newInfo["id"]);
            unset($newInfo['source']);
            unset($newInfo['tel8']);
            $newInfo["tel_encrypt"] = order_tel_encrypt($info["tel8"]);
            $newInfo["customer"] = session("uc_userinfo.id");
            $newInfo["on"] = 0;
            $newInfo['type_fw'] = 0;
            $newInfo['time_real'] = time();
            $newInfo['on_sub'] = 10;
            $newInfo['time'] = time();
            $newInfo['remarks'] = "赠送单再访生成";
            $newInfo['source_type'] = 5;
            $newInfo['lasttime'] = time();
            $newInfo['from_old_orderid'] = $info["id"];
            $newInfo["id"] =  date('Ymd'). sprintf("%05d%03d", time()%86400, mt_rand(1,1000));
            // var_dump($newInfo["id"] );die();
            $orders = D("Orders");
            $i = $orders->addOrder($newInfo);

            if ($i !== false) {
                //更新原订单标识
                $data = array(
                        "order_to_new" => 1
                );
                $orders->editOrder($info["id"],$data);

                //订单电话表插入数据
                $data = array(
                        "orderid" =>$newInfo["id"] ,
                        "tel8" => $info["tel"]
                );
                $orders->addTelEncrypt($data);

                //添加订单状态改变日志logorderStatusChange
                $this->orderStatusChange($newInfo["id"],0,10);

                //添加原订单的电话数据给新订单
                //获取最近一天的原订单电话记录
                $logTel = D("LogTelcenterOrdercall");
                $date = date("Y-m-d", strtotime("-1 day",strtotime(date("Y-m-d"))));
                $logs = $logTel->getOrderLastLogOneDay($info["id"],$date);

                if (count($logs) > 0) {
                    foreach ($logs as $key => $value) {
                        unset($value["id"]);
                        $value["orderid"] = $newInfo["id"];
                        $all[] = $value;
                    }
                    //添加电话记录
                    $logTel->addAllLog($all);
                }
                $this->ajaxReturn(array('errmsg'=> "新订单生成,订单号码： ".$newInfo["id"] ,'code'=> 200));
            }
            $this->ajaxReturn(array('errmsg'=> "生成新单失败!",'code'=> 404));
        }
    }

    /**
     * 发送微信
     * @return [type] [description]
     */
    public function sendwx()
    {
        //查询订单信息
        $info = $this->getOrderInfo(I("post.id"));
        if ($info["on"] != 4 && !in_array($info["type_fw"],array(1,2) )) {
            $this->ajaxReturn(array("code"=>404,"errmsg"=>"订单尚未分配,请审核后通知装修公司"));
        }

        $wechat_compnay = array_filter(explode(",",I("post.companys")));
        //发送装修公司
        if (count($wechat_compnay) > 0) {
            $weixin = A("Home/Orderweixin");
            $result = $weixin->send_order_to_compnay($wechat_compnay,$info["id"]);
            $this->ajaxReturn(array('errmsg'=> empty($result)?"微信推送成功": $result,'code'=> 200));
        }
        $this->ajaxReturn(array('errmsg'=> '请选择装修公司','code'=> 404));
    }

    /**
     * 发送短信
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function sendsms()
    {
        $result = $this->sendOrderSms(I("post.id"));
        if ($result) {
            $this->ajaxReturn(array('code'=> 200));
        }
        $this->ajaxReturn(array('errmsg'=> "发送失败",'code'=> 404));
    }

    /**
     * 群公布模板管理
     * @return [type] [description]
     */
    public function template()
    {
        $list = D("OrderNoticeTemplate")->getTemplateList();
        $this->assign("list",$list);
        $this->display();
    }

    /**
     * 群公布模板新增/编辑
     * @return [type] [description]
     */
    public function templateup()
    {
        if ($_POST) {
            $id = I("post.id");
            $city = implode(",", I("post.city"));
            $data = array(
                'title' => I("post.title"),
                'content' => I("post.content"),
                'city' => empty($city)?"":$city
            );
            if (!empty($id)) {
                $i = D("OrderNoticeTemplate")->editTemplate($id,$data);
            } else {
                $i = D("OrderNoticeTemplate")->addTemplate($data);
            }
            if ($i !== false) {
                $this->ajaxReturn(array('code'=> 200));
            }
            $this->ajaxReturn(array('errmsg'=> "操作失败",'code'=> 404));
        } else {
            $id = I("get.id");
            if (!empty($id)) {
                $info = D("OrderNoticeTemplate")->getTemplateInfo($id);
                $info["city"] = array_filter(explode(",",$info["city"]));
                $this->assign("info",$info);
            }
            //获取城市信息
            $api = A("Home/Api");
            $citys = $api->getAllCityInfo();
            $this->assign("citys",$citys);
            $this->display();
        }
    }

    /**
     * 复制模版信息
     * @return [type] [description]
     */
    public function copytemplate()
    {
        if ($_POST) {
            //获取订单信息
            $info = $this->getOrderInfo(I("post.id"));

            //获取订单分配信息
            $company = D("OrderInfo")->getOrderComapny($info["id"]);
            if (count($company) > 0) {
                $comStr = "";
                foreach ($company as $key => $value) {
                    $comStr .= $value["jc"]." ";
                }
            }

            //获取销售信息
            $result = D("Adminuser")->findSellsInfoByCity($info['cs']);

            foreach ($result as $key => $value) {
                if ($value["type"] == 1 && !empty($value["first_name"])) {
                    $sellInfo = $value['first_name'];
                    $sellTel = $value['first_tel'];
                    $qq =  $value["first_qq"];
                    break;
                } elseif ($value["type"] == 2 && !empty($value["first_name"])) {
                    $sellInfo = $value['first_name'];
                    $sellTel = $value['first_tel'];
                    $qq =  $value["first_qq"];
                    break;
                } elseif ($value["type"] == 3 && !empty($value["first_name"])) {
                    $sellInfo = $value['first_name'];
                    $sellTel = $value['first_tel'];
                    $qq =  $value["first_qq"];
                    break;
                } elseif ($value["type"] == 4 && !empty($value["first_name"])) {
                    $sellInfo = $value['first_name'];
                    $sellTel = $value['first_tel'];
                    $qq =  $value["first_qq"];
                    break;
                }
            }

            //公装不显示小区
            if ($info["lx"] == 2) {
                unset($info["xiaoqu"]);
            }

            $site = "http://".$info["bm"].".".C('QZ_YUMING')."/";

            if (!empty($info["lx"])) {
                $lx = $info["lx"] == 1?"家装":"公装";
            }
            // "{订单简介}" => $info['cname']." ".$info["qz_area"]." ".$info["xiaoqu"]." ".$lx,
            //获取模版信息
            $tmpid = I("post.tmpid");
            $tmpInfo = D("OrderNoticeTemplate")->getTemplateById($tmpid);
            $replace = array(
                "{区县}" => $info['cname']." ".$info["qz_area"],
                "{小区}" => $info["xiaoqu"],
                "{装修类型}" => $lx,
                "{公布会员}" => $comStr,
                "{业主要求}" => $info['text'],
                "{联系人}" => mb_substr($sellInfo,0,1,"utf-8"),
                "{联系方式}" => $sellTel,
                "{网址}" => $site,
                "{QQ}" => $qq,
                "{城市}" => $info["cname"],
                "{验证码}" => mt_rand(1,10)."+".mt_rand(1,10)
            );

            foreach ($replace as $key => $value) {
                $reg = '/'.$key.'/';
                $tmpInfo['content'] = preg_replace($reg,$value,$tmpInfo['content']);
            }

            $this->ajaxReturn(array('data'=> $tmpInfo['content'],'code'=> 200));
        }
    }

    /**
     * 删除模版
     * @return [type] [description]
     */
    public function deltemplate()
    {
        if ($_POST) {
            $id = I("post.id");
            $i = D("OrderNoticeTemplate")->delTemplate($id);
            if ($i !== false) {
                //添加操作日志
                $log = array(
                    'remark' => '群公布模版删除',
                    'logtype' => 'ordernoticetemplate',
                    'action_id' => $id,
                    'action' => __CONTROLLER__."/".__ACTION__
                );
                D('LogAdmin')->addLog($log);
                $this->ajaxReturn(array('code'=> 200));
            }
            $this->ajaxReturn(array('errmsg'=> "操作失败",'code'=> 404));
        }
    }

    /**
     * 签单审核
     * @return [type] [description]
     */
    public function qiandan()
    {
        //获取管辖城市
        if(count($this->city) > 0){
            $citys = getUserCitys(false);
            $this->assign("citys",$citys);
        } else {
            $this->_error("尚未获取城市权限！");
        }

        //获取签单审核列表
        $result = D("Home/Logic/OrdersLogic")->getQianDanList($this->city,I("get.id"),I("get.begin"),I("get.end"),I("get.status"),I("get.state"),I("get.city"),I("get.company"));
        $this->assign("info",$result);
        $this->display();
    }

    public function qiandanUp()
    {
        if ($_POST) {
            $id = I("post.id");
            $status = I("post.status");
            //获取订单信息
            $info = D("Home/Logic/OrdersLogic")->getSingleOrderInfo($id);
            $action = 'qd_chks';
            if ($info["qiandan_status"] != 1) {
                $data = array(
                    "qiandan_status" => $status,
                    "qiandan_chktime" => time()
                );

                if ($info["qiandan_status"] == 0) {
                    $action = 'qd_chkc';
                }

                if ($info["qiandan_status"] == 2) {
                    $action = 'qd_chk_on';
                }

                $i = D("Home/Logic/OrdersLogic")->editOrder($id,$data);
            }

            if (I("post.recommend") == "1") {
                //生成家具新单
                $cpaModel = D("Home/Logic/CpaOrdersLogic");

                //查询是否已经生成过订单
                $count = $cpaModel->findOrderCount($id);
                if ($count == 0) {
                    $cpaId = $cpaModel->getOrderId();
                    $data = array(
                        "id" =>  $cpaId,
                        "order_id" => $id,
                        "on" => 1,
                        "name" => $info['name'],
                        "time_real" => time(),
                        "time" => $info["time_real"],
                        "tel" => $info["tel"],
                        "tel_encrypt" => $info["tel_encrypt"],
                        "sex" => $info['sex'],
                        "other_contact" => $info['other_contact'],
                        "cs" => $info['cs'],
                        "qx" => $info['qx'],
                        "xiaoqu" => $info['xiaoqu'],
                        "lng" => $info['lng'],
                        "lat" => $info['lat'],
                        "huxing" => $info['huxing'],
                        "mianji" => $info['mianji'],
                        "fengge" => $info['fengge'],
                        "lx" => $info['lx'],
                        "lxs" => $info['lxs'],
                        "yusuan" => $info['yusuan'],
                        "ip" => $info["ip"],
                        "type" => 3
                    );
                    $cpaModel->addOrder($data);
                    //添加订单电话进电话表
                    $data = array(
                        "orderid" => $cpaId,
                        "tel8" => $info["tel8"]
                    );
                    $cpaModel->addSafeTel($data);
                }
            }

            if ($i !== false) {
                //添加签单日志 $type, $orderid, $action, $data=''
                D("Home/Logic/OrdersLogic")->addQiandanLog('fenpei',$id,$action,$data);
                $this->ajaxReturn(array('status'=> 1));
            }
            $this->ajaxReturn(array('info'=> "操作失败",'status'=> 0));
        } else {
            $id = I("get.id");
            //获取订单信息
            $info = $this->getOrderInfo($id);
            //获取订单分单信息
            $info["companys"] =  D("Home/Logic/OrdersLogic")->getOrderComapny($id);

            //获取城市信息
            $quyu = D('Quyu')->getQuyuList();
            //获取订单城市和区县
            $city = D("Quyu")->getCityInfoById($info["cs"]);

            //户型
            $huxing = D("Huxing")->gethx();
            //预算
            $yusuan = D("Jiage")->getJiage();
            //装修方式
            $fangshi  = D("Fangshi")->getfs();
            //风格
            $fengge  = D("Fengge")->getfg();

            $this->assign("lxs",$this->lxs);
            $this->assign("huxing",$huxing);
            $this->assign("yusuan",$yusuan);
            $this->assign("fangshi",$fangshi);
            $this->assign("fengge",$fengge);
            $this->assign('quyu', $quyu);
            $this->assign("city",$city);
            $this->assign("info",$info);
            $tmp = $this->fetch("qiandantmp");
            $this->ajaxReturn(array('status'=> 1,"data" => $tmp));
        }
    }

    public function qianDanCancel()
    {
        if ($_POST) {
            $id = I("post.id");
            $data = array(
                "qiandan_companyid"=> '', //签单公司 id 号
                "qiandan_mianji"=> '', // 签单面积
                "qiandan_jine"=>  '', //签单金额
                "qiandan_status"=>  '', //状态 默认空 0为申请签单确认 1为确认签单
                "qiandan_addtime"=>  '', //签单申请时间
                "qiandan_chktime"=>  '', //签单审核时间(签单或取消)
                "qiandan_remark"=>  '', //签单备注
                "qiandan_remark_lasttime"=>  '', //最后修改签单备注的时间
                "qiandan_info"=>  '', //签单信息, 由装修公司填写
            );
            $i = D("Home/Logic/OrdersLogic")->editOrder($id,$data);
            if ($i !== false) {
                 $this->ajaxReturn(array('status'=> 1));
            }
        }
        $this->ajaxReturn(array('info'=> "操作失败",'status'=> 0));
    }

    public function getOrderFieldStat()
    {
        if ($_POST) {
            $id = I("post.id");
            //获取字段修改日志
            $list = D("Home/Logic/OrdersLogic")->getOrderFieldStat($id);

            if (count($list) > 0) {
                $this->assign("list",$list);
                $tmp = $this->fetch("orderFieldTmp");

                return $this->ajaxReturn(array("status" => 1,"data" => $tmp));
            }
            return $this->ajaxReturn(array("status" => 0,"info" => "暂未查到修改信息"));
        }
        return $this->ajaxReturn(array("status" => 0,"info" => "参数错误"));
    }

    /**
     * 获取对接的订单列表
     * @param  [type] $cs           [管辖城市]
     * @param  [type] $fen_customer [分单人ID]
     * @param  [type] $id           [订单ID]
     * @param  [type] $other_cs     [城市ID]
     * @param  [type] $begin        [开始时间]
     * @param  [type] $end          [结束时间]
     * @param  [type] $status       [订单状态]
     * @param  [type] $kf           [对接客服ID]
     * @return [type]               [description]
     */
    private function getDockingList($cs,$fen_customer,$id,$other_cs,$begin,$end,$status,$kf,$time_diff,$optn_type_list,$isactivity)
    {
        if (in_array(session("uc_userinfo.uid"),$optn_type_list)) {
            //查询活动发单位置
            $result = D("Activity")->getActivityIds();
            $ids = array();
            foreach ($result as $key => $value) {
                if ($value["source_id"] != 0) {
                    $source = array_filter(explode(",",$value["source_id"]));
                    $ids = array_merge($ids,$source);
                }
            }
        }

        $model = D("Orders");
        if ($fen_customer == 1) {
            import('Library.Org.Util.Page');
            $count = $model->getOrderDockingListCount($kf, $id, $other_cs, $status, $begin, $end, $time_diff,$isactivity,$ids);

            if ($count > 0) {
                $p = new \Page($count,10);
                $p->setConfig('prev', "上一页");
                $p->setConfig('next', '下一页');
                $show    = $p->show();
                $list = $model->getOrderDockingList($kf, $id, $other_cs, $status, $begin, $end, $time_diff, $p->firstRow,$p->listRows,$isactivity,$ids);
                foreach ($list as $key => $value) {
                    if ($value["time_diff"] >= 0) {
                       $list[$key]["date_diff"] = timediff($value["time_diff"]);
                    }

                    if (in_array($value["source"],$ids)) {
                        $list[$key]['sourceMark'] = 1;
                    }
                }
            }
        } else {
            $result = $model->getDockingList($cs,$fen_customer,$id,$other_cs,$p->firstRow,$p->listRows,$begin,$end,$status,null,null,$isactivity,$ids);

            foreach ($result as $key => $value) {
                if (in_array($value["source"],$ids)) {
                    $result[$key]['sourceMark'] = 1;
                }
            }

            //a.17.06.15 客服后台-客服订单对接管理-未分配订单列表新增数据条数展示
            import('Library.Org.Util.Page');
            $p    = new \Page(count($result), count($result));
            $p->setConfig('prev', "上一页");
            $p->setConfig('next', '下一页');
            $show = $p->show();

            //按照城市归类
            foreach ($result as $key => $value) {
                $city[$value["cs"]]["child"][] = $value;
            }

            //抽取每个城市的最早的一个订单时间
            foreach ($city as $key => $value) {
                $lastime = "";
                foreach ($value["child"] as $k => $val) {
                    if (empty($lasttime)) {
                        $lasttime = $val["csos_time"];
                    } else {
                        if ($val['csos_time'] < $lasttime) {
                            $lasttime = $val["csos_time"];
                        }
                    }
                }
                $city[$key]['lasttime'] = $lasttime;
            }

            //重新排序
            $edition = array();
            foreach ($city as $key => $value) {
                $edition[] = $value["lasttime"];
            }
            array_multisort($edition, SORT_ASC, $city);

            $list = array();
            foreach ($city as $key => $value) {
                $list = array_merge($list,$value["child"]);
            }

        }

        if (count($list) > 0) {
            //查询电话重复
            foreach ($list as $key => $value) {
                $ids[] = $value["id"];
            }

            //获取每个订单的电话号码的重复次数
            $result = D('Orders')->getTelnumberRepaetCountByIds($ids);
            foreach ($result as $key => $value) {
                $phoneRepeats[$value['id']] = $value['repeat_count'];
            }

            //获取每个订单的IP的重复次数
            $result = D('Orders')->getIpRepaetCountByIds($ids);
            foreach ($result as $key => $value) {
                $ipRepeats[$value['id']] = $value['repeat_count'];
            }

            //是否显示"修"
            $applyresult = D('Orders')->getOrderApplyEditList($ids);
            foreach($applyresult as $key=>$val){
                $applyList[$val['orders_id']] = $val['status'];
            }

            foreach ($list as $key => $value) {
                $list[$key]['phone_repeat_count'] = $phoneRepeats[$value['id']];
                $list[$key]['ip_repeat_count'] = $ipRepeats[$value['id']];
                $list[$key]['applystatus'] =  $applyList[$value['id']];
            }
        }
//        var_dump($list);
        return array("page"=>$show,"list"=>$list);
    }

    /**
     * 获取订单信息
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    private function getOrderInfo($id)
    {
        //查询订单信息
        $order = D('Home/Orders');
        $info = $order->findOrderInfo($id);
        //如果经度纬度存在
        if(!empty(floatval($info["lng"]))&&!empty(floatval($info["lat"]))){
            $info["jingwei"] = $info["lng"].",".$info["lat"];
        }

        if (count($info) == 0) {
            $this->ajaxReturn(array("code"=>404,'info'=>'该订单不存在'));
        }

        if ($info["nf_time"] == "0000-00-00") {
            $info["nf_time"] = "";
        }

        //计算订单状态
        if ($info['on'] == 0 && $info['on_sub'] == 9) {
            $info["orderstatus"] = 1;
        }
        elseif ( $info['on'] == 2){
            $info["orderstatus"] = 2;
        }
        elseif ( $info['on'] == 4 && $info['type_fw'] == 0){
            $info["orderstatus"] = 3;
        }
        elseif ( $info['on'] == 4 && $info['type_fw'] == 1){
            $info["orderstatus"] = 4;
        }
        elseif ( $info['on'] == 4 && $info['type_fw'] == 2){
            $info["orderstatus"] = 6;
        }
        elseif ( $info['on'] == 4 && $info['type_fw'] == 3){
            $info["orderstatus"] = 5;
        }
        elseif ( $info['on'] == 4 && $info['type_fw'] == 4){
            $info["orderstatus"] = 7;
        }
        elseif ( $info['on'] == 5){
            $info["orderstatus"] = 8;
        }elseif ( $info['on'] == 98){
            $info["orderstatus"] = 98;
        }

        if ($info["lng"] > 0 && $info["lat"] > 0) {
            $info["coordinate"] = $info["lng"].",".$info["lat"];
        }

        $exp = array_filter(explode("；",$info["text"]));
        $info["text_array"] = $exp;

        //获取审核显号
        $admin = getAdminUser();
        $info['apply_tel'] = D('OrdersApplyTel')->getApplyTelByOrdersIdAndApplyId($info['id'], $admin['id']);

        if ($info["apply_tel"]['status'] == 2) {
            $info["tel"] = $info["tel8"];
        }

        $info["lasttime"] = empty($info["lasttime"])?"":$info["lasttime"];

        return $info;
    }

    /**
     * 获取当前城市装修公司和相邻的装修公司
     * @param  [type] $cs [description]
     * @return [type]     [description]
     */
    private function getCompanyList($cs)
    {
        //获取相邻城市
        $result = D("OrderCityRelation")->getRelationCity($cs);

        //获取订单城市会员列表
        $list = $this->getCompanyDetailsList(array($cs),2);

        foreach ($list as $key => $value) {
            if (!array_key_exists($value["qx"],$now)) {
                $now[$value["qx"]]['area_id'] = $value["qx"];
                $now[$value["qx"]]['qz_area'] = $value["qz_area"];
            }
            $now[$value["qx"]]["child"][] = $value;
        }

        if (count($result) > 0) {
            foreach ($result as $key => $value) {
                if ($cs != $value["cid"]) {
                    $adjacentCity[] = $value["cid"];
                }
            }

            if (count($adjacentCity) > 0) {
                //相邻城市会员
                $result = $this->getCompanyDetailsList($adjacentCity,2);

                foreach ($result as $key => $value) {
                    if (!array_key_exists($value["cs"],$other)) {
                        $other[$value["cs"]]["cid"] = $value["cs"];
                        $other[$value["cs"]]["cname"] = $value["cname"];
                    }
                    $other[$value["cs"]]["child"][] = $value;
                }
            }
        }
        return array($now,$other);
    }

    /**
     * 获取装修公司详细信息
     * @param  [type] $companys [description]
     * @param  [type] $on       [description]
     * @return [type]           [description]
     */
    private function getCompanyDetailsList($cs,$on,$companys){
        $companys = D("User")->getCompanyDetailsList($cs,$on,$companys);

        foreach ($companys as $key => $value) {
            //计算到期时间
            $offset = (strtotime($value["end"]) - strtotime(date("Y-m-d")))/86400+1;

            if ($offset <= 15 && empty($value["start_time"])) {
                $companys[$key]["end_time"] = $offset;
            }

            //合同开始时间如果大于本月1号显示新
            if ($value["start"] >= date("Y-m-d",mktime(0,0,0,date("m"),1,date("Y")))) {
                $companys[$key]["newMark"] = 1;
            }
            $ids[] = $value["id"];
        }

        //获取装修公司暂停信息
        if (count($ids) > 0) {
            $result = D("UserVip")->getParseContractList($ids);
            foreach ($result as $key => $value) {
                //计算到期时间
                $offset = (strtotime(date("Y-m-d")) - strtotime($value["end_time"]))/86400+1;
                if ($offset <= 15 && empty($value["start_time"])) {
                    $parseList[$value["company_id"]]["parseMark"] = 1;
                }
            }

            foreach ($companys as $key => $value) {
                if (array_key_exists($value["id"],$parseList)) {
                    $companys[$key]["parseMark"] = $parseList[$value["id"]];
                }
            }
        }
        return $companys;
    }

    /**
     * 签单小区历史
     * @return [type] [description]
     */
    public function history()
    {
        //查询小区历史签单公司
        $history = $this->orderHistory(I("get.xiaoqu"),I("get.cs"));
        $this->assign("list",$history);
        $this->display();
    }

    /**
     * 获取历史签单小区信息
     * @param  [type] $xiaoqu [description]
     * @return [type]         [description]
     */
    private function orderHistory($xiaoqu,$cs)
    {
        if (!empty($xiaoqu)) {
            //获取分词
            $result = getFenCi($xiaoqu);
            $fxList[] = $xiaoqu;
            foreach ($result as $key => $value) {  //取分词结果为2个字以上的
                if ((mb_strlen($value['word'], 'utf-8')) > 1 ) {
                    $fxList[] = $value['word'];
                }
            }

            //查询小区签单历史
            $result = D("Orders")->getQianDanHistory($fxList,$cs);

            if (count($result) > 0) {
                $list[$xiaoqu] = array();
                foreach ($result as $key => $value) {
                    if ($value["xiaoqu"] == $xiaoqu) {
                        $list[$xiaoqu]["child"][] = array(
                            "jc" => $value["jc"],
                            "count" => $value["count"],
                            "on" => $value["on"],
                            "time" => date("Y-m-d",$value["qiandan_addtime"])
                        );
                    } else {
                        $list[$value["xiaoqu"]]["child"][] = array(
                            "jc" => $value["jc"],
                            "count" => $value["count"],
                            "on" => $value["on"],
                            "time" => date("Y-m-d",$value["qiandan_addtime"])
                        );
                    }
                }
            }

        }
        return $list;
    }


    private function getLastExpireCompanyList($cs,$date)
    {
        $lostCompany = D("User")->getLastExpireCompanyList($cs,$date);
        foreach ($lostCompany as $key => $value) {
            $offset = (strtotime($date) - strtotime($value["end"]))/86400+1;
            $lostCompany[$key]["day"] = $offset;
        }
        return $lostCompany;
    }

    /**
     * 发送订单分配后通知业主的短信
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    private function sendOrderSms($id)
    {
        //查询订单信息
        $info = $this->getOrderInfo($id);
        if ($info["on"] != 4 && !in_array($info["type_fw"],array(1,2) )) {
            $this->ajaxReturn(array("code"=>404,"errmsg"=>"订单尚未分配,请审核后通知业主"));
        }
        $orderModel = D("Orders");
        //获取业主电话信息
        $tel = $orderModel->findOrderInfoAndTel($info["id"]);

        if (empty($tel["tel8"])) {
            $this->ajaxReturn(array('errmsg'=> "业主联系电话未知，发送失败",'code'=> 404));
        }

        //获取分单装修公司
        $company = D("OrderInfo")->getOrderComapny($info["id"]);
        foreach ($company as $key => $value) {
            $ids[] = $value["id"];
        }

        //查询装修公司接单报备信息,装修公司网店填写的电话优先
        $jdbbList = D("User")->getJdbbList($ids);

        foreach ($jdbbList as $key => $value) {
            if (empty($value["tel"]) && empty($value["cal"]) &&  empty($value["receive_order_tel1"])) {
                $this->ajaxReturn(array('errmsg'=> "装修公司【 ".$value["jc"]." (".$value["comid"].") 】 未设置接单联系方式,请设置后重新发送！",'code'=> 404));
            }

            $datacompany[$key]["jc"] =  $value["jc"] ? : '装修公司'; //装修公司简称
            $datacompany[$key]["receive_order_tel1_remark"] = str_replace(array('总','经理','老板'),'',$value['receive_order_tel1_remark']);
            if (!empty($value["tel"])) {
                $datacompany[$key]["receive_order_tel1"] = $value["tel"];
            } elseif (!empty($value["cal"])){
                $datacompany[$key]["receive_order_tel1"] = $value["cal"].$value["cals"];
            } else {
                $datacompany[$key]["receive_order_tel1"] = $value["receive_order_tel1"];
            }
        }

        $sms = A("Home/Sms");
        $sms_channel = OP('sms_channel','yes');
        //发送已分配的公司给业主
        //如果全局配置了 yunrongt  云融正通
        //为什么不直接调用sendSmsQz()?  目前容联云通讯不支持本类短信发送
        //为什么ihuyi 互亿无线要用redis队列发? 对同一个手机号码同一分钟内有发送限制,所以采用的redis队列的方式发送
        if ('yunrongt' == $sms_channel) {
            $result = $sms->send_yunrongt_sms($datacompany,$tel["tel8"],$info["id"]);
        }else {
            //否则就走 ihuyi 互亿无线
            $result = $sms->send_redis_sms($datacompany,$tel["tel8"],$info["id"]);
        }

        return $result;
    }

    /**
     * 获取订单城市信息页模版
     * @param  [type] $cs [description]
     * @return [type]     [description]
     */
    private function getCityInfoTmp($cs,$flag = false)
    {
        //获取订单的城市信息
        $info = D("OrderCityInfo")->findCityInfo($cs);
        if (count($info) > 0) {
            if ($flag) {
                $this->assign("isDocking",1);
            }
            $this->assign("cityInfo",$info);
        }
        return $this->fetch("cityTmp");
    }

    /**
     * 获取客服中心人员列表
     * @param  string $value [description]
     * @return [type]        [description]
     */
    private function getSchedulingList($uid,$month,$ids)
    {
        $uid = array_filter(explode(",",$uid));
        if (count($uid) > 0) {
            $result =  D("Adminuser")->getUserListByUid($uid,1);
            foreach ($result as $key => $value) {
               //非离职客服
               if ($value["uid"] != 84) {
                    $list[$value["id"]]["id"] = $value["id"];
                    $list[$value["id"]]["uid"] = $value["uid"];
                    $list[$value["id"]]["role_name"] = $value["role_name"];
                    $list[$value["id"]]["name"] = $value["name"];
                    $list[$value["id"]]["scheduling"] = array();
                    $list[$value["id"]]["workCount"] = 0;
                    $list[$value["id"]]["resetCount"] = 0;
                    $list[$value["id"]]["isedit"] = 1;
                    if (count($ids) > 0 && !in_array($value["id"],$ids)) {
                        $list[$value["id"]]["isedit"] = 0;
                    }
                }
            }

            if (empty($month)) {
                $month = date("Y-m");
            }
            $firstDay = strtotime(date("Y-m-01",strtotime($month)));
            $lastDay = mktime(23,59,59,date("m",$firstDay),date("t",$firstDay),date("Y",$firstDay));
            //获取当月日历
            $dayCount = date("t",strtotime($month));

            for ($i = 0; $i < $dayCount ; $i++) {
                $day = date("Y-m-d",strtotime("+$i day", $firstDay));
                $calendar[$day]["en"] = date("d",strtotime($day));
                $offset = date("w",strtotime($day));
                switch ($offset) {
                    case '0':
                        $calendar[$day]["cn"] = "日";
                        break;
                    case '1':
                        $calendar[$day]["cn"] = "一";
                        break;
                    case '2':
                        $calendar[$day]["cn"] = "二";
                        break;
                    case '3':
                        $calendar[$day]["cn"] = "三";
                        break;
                    case '4':
                        $calendar[$day]["cn"] = "四";
                        break;
                    case '5':
                        $calendar[$day]["cn"] = "五";
                        break;
                    case '6':
                        $calendar[$day]["cn"] = "六";
                        break;
                }
            }

            //获取当月排班数据
            $result =  D("UserScheduling")->getSchedulingList(date("Y-m-d",$firstDay),date("Y-m-d",$lastDay));

            if (count($result)) {
                foreach ($result as $key => $value) {
                    switch ($value["status"]) {
                        case '2':
                            $scheduling[$value["user_id"]]['workCount'] ++;
                            if ($value["uid"] == "2") {
                                $kfList[$value["date"]] ++;
                            }
                            break;
                        case '3':
                            $scheduling[$value["user_id"]]['workCount'] ++;
                            break;
                        case '1':
                            $scheduling[$value["user_id"]]['resetCount'] ++;
                            break;
                    }
                    $scheduling[$value["user_id"]]["date"][$value["date"]] = $value["status"];
                }


                foreach ($list as $key => $value) {
                    if (array_key_exists($value["id"],$scheduling)) {
                        $list[$key]["workCount"] = $scheduling[$value["id"]]["workCount"];
                        $list[$key]["resetCount"] = $scheduling[$value["id"]]["resetCount"];
                        $list[$key]["scheduling"] = $scheduling[$value["id"]]["date"];
                    } else {
                        foreach ($calendar as $k => $val) {
                            $list[$key]["scheduling"][$k] = "";
                        }
                    }
                }
            } else {
                foreach ($list as $key => $value) {
                    foreach ($calendar as $k => $val) {
                        $list[$key]["scheduling"][$k] = "";
                    }
                }
            }

            foreach ($calendar as $k => $val) {
                if (!array_key_exists($k,$kfList)) {
                   $kfList[$k] = 0;
                }
            }

            //重新排序
            $edition = array();
            foreach ($kfList as $key => $value) {
                 $edition[] = $key;
            }
            array_multisort($edition, SORT_ASC, $kfList);
        }

        return array("list" => $list,"calendar" => $calendar,"kfList"=>$kfList);
    }


    /**
     *
     * 把定义的 订单状态 对应的备注文字 转换为一个一维数组
     *
     * @param $statusArr
     * @return array
     */
    private function status2Arr($statusArr) {
        if (!is_array($statusArr)) {
            return [];
        }
        $reArr = [];
        foreach ($statusArr as $key => $value) {
            if (isset($value['child'])) {
                $reArr = array_merge($reArr, $value['child']);
            }
        }
        $reArr = array_unique($reArr);
       return $reArr;
    }

    /**
     * 通过城市id获取小区信息
     */
    public function getcommunitybycity(){
        $city = I('get.cs');
        $xiaoqu = I('get.xiaoqu');
        $xiaoquList =  D('Home/Logic/AuthLogic')->getcommunitybycity($city,$xiaoqu);

        $this->ajaxReturn(array('data'=>$xiaoquList, 'status'=>0));
    }

    /**
     *  如果是无效单，且备注不为“已转家具单”则实时生成家具新单
     */
    private function addJiaJuOrder($orderid){
        //查询是否已导入过，
        $hadlog = D('Home/Orders')->searchDdcLog($orderid);
        if($hadlog){
            return false;
        }
        //获取订单信息
        $orderinfo = [];
        $orderinfo = D('Home/Orders')->showOrderInfoById($orderid);
        if($orderinfo){
            //导入到家具订单池
            $orderinfo['id'] = 'J'.$orderinfo['order_id'];
            $orderinfo['time_real'] =time();
            $orderinfo['time'] = time();
            $orderinfo['type'] = 2; //审核实时转单
            D('Home/Orders')->addtoJiaJuOrder($orderinfo);
            //添加日志
            $logdata = [];
            $logdata['order_id'] = $orderinfo['order_id'];
            $logdata['add_time'] = time();
            D('Home/Orders')->addJiaJuOrderLog($logdata);
            //添加手机号
            $teldata = [];
            $teldata['orderid'] = $orderinfo['id'];
            $teldata['tel8'] = $orderinfo['tel8']?$orderinfo['tel8']:18022222222;
            D('Home/Orders')->addJiaJuOrderTelInfo($teldata);

            //添加到jiaju_order_pool表数据
            $pooldata = [];
            $pooldata['orderid'] = 'J'.$orderinfo['order_id'];
            $pooldata['time'] = time();
            D('Home/Orders')->addJiaJuOrderPoolInfo($pooldata);

            return true;
        }else{
            return false;
        }

    }


}