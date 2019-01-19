<?php
// +----------------------------------------------------------------------
// | 家居
// +----------------------------------------------------------------------
namespace Home\Model\Logic;

use Home\Model\Db\JiajuOrdersModel;

class JiajuOrdersLogicModel
{
    public function getOrdersInfo($id)
    {
        if (empty($id)) {
            return [];
        }
        $jiajuOrderModel = new JiajuOrdersModel();
        //搜索的手机号
        if(strlen($id)<12){
            $info = $jiajuOrderModel->getOrdersInfoByTel($id);
            if($info){
                $id = $info['id'];
            }
        }
        $map['o.id'] = ['eq', $id];
        $map['o.on'] = ['eq', 0];
        $map['o.on_sub'] = ['eq', 10];
        return $jiajuOrderModel->getOrderInfo($map);
    }

    public function saveJiajuOrder($source){
        $data['ip'] = get_client_ip();//客户端IP地址
        $data['edit_id'] = $source['edit_id'];
        if (!empty($source['from'])) {
            $data['source_type'] = $source['from'];//来源 1是53客服 2是400电话 3是QQ咨询  11是推广部发单
        }

        if (!empty($source['source'])) {
            //客服发单
            if (intval($source['source']) == 1) {
                $data['source_src'] = 'jiajukffd';
            }
        }

        if (!empty($source['cs'])) {
            $data['cs'] = $source['cs'];//城市
        }
        if (!empty($source['qy'])) {
            $data['qx'] = $source['qy'];//区县
        }
        if (!empty($source['name'])) {
            $data['name'] = $source['name'];//业主姓名
        }
        if (!empty($source['sex'])) {
            $data['sex'] = $source['sex'];//性别，先生/女士
        }
        if (!empty($source['mobilemain'])) {
            $data['tel'] = trim($source['mobilemain']);//电话
        }
        if (!empty($source['secoundmobile'])) {
            $data['other_contact'] = $source['secoundmobile'];//备用联系方式
        }
        if (!empty($source['xiaoqu'])) {
            $data['xiaoqu'] = $source['xiaoqu'];//小区
        }
        if (!empty($source['dizhi'])) {
            $data['dz'] = $source['dizhi'];//地址
        }
        if (!empty($source['mianji'])) {
            $data['mianji'] = $source['mianji'];//面积
        }
        if (!empty($source['lx'])) {
            $data['lx'] = $source['lx'];//装修类型
        }
        if (!empty($source['yt'])) {
            $data['yt'] = $source['yt'];//用途
        }
        if (!empty($source['huxing'])) {
            $data['huxing'] = $source['huxing'];//户型
        }
        if (!empty($source['fengge'])) {
            $data['fengge'] = $source['fengge'];//喜欢风格
        }
        if (isset($source["yusuan"]) && !empty($source["yusuan"])) {
            $data['yusuan'] = $source["yusuan"];//预算
        }
        if (!empty($source['view_time'])) {
            $data['view_time'] = $source['view_time'];//到店时间
        }
        if (!empty($source['special_remarks'])) {
            $data['special_remarks'] = $source['special_remarks'];//需求描述
        }
        if (!empty($source['jjlx'])) {
            $data['furniture_type'] = $source['jjlx'];//家具类型
            $furniture_type_child = empty($source['furniture_type_child']) ? '' : $source['furniture_type_child'];//不限选择数据
            if (is_array($furniture_type_child)) {
                foreach ($furniture_type_child as $k => $v) {
                    $data['furniture_type_child'] .= $v . ',';
                }
            }else{
                $data['furniture_type_child'] = $furniture_type_child;
            }
        }
        if (!empty($source['step'])) {
            $data['step'] = $source['step'];//装修进度
        }
        if (!empty($source['orderfrom'])) {
            $data['source_type'] = $source['orderfrom'];//装修进度
        }

        $data['source'] = 164;//来源设置为164，此处对应发单位置设置的值

        $uid = $source["adminuser"];//来源adminuserID
        $userdata = D("OrderInfo")->getAdminUserByUserID($uid);
        $data['zhuanfaren'] = $userdata['name'];

        $jiajuLogic = new JiajuOrdersModel();
        //单子入库 新增插入
        $orderadd = $jiajuLogic->orderpublish($data); //传入插入新订单

        if (!empty($orderadd)) {
            return $orderadd;
        }
    }
}