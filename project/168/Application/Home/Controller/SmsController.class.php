<?php

namespace Home\Controller;
use Home\Common\Controller\HomeBaseController;
/**
* 短信发送模块
*/
class SmsController extends HomeBaseController
{
    /**
     * 发送业主短信通知
     * @return [type] [description]
     */
    public function sendsms()
    {
        if ($_POST) {
            //查询订单信息
            $model = D("Home/Orders");
            $result = $model->findOrderInfoAndTel(I("post.id"));
            $result = $this->send_sms($result["tel8"],1,I("post.id"));
            $this->ajaxReturn(array("code"=>$result["code"],"errmsg"=>$result["errmsg"]));
        }
    }

    /**
     * 发送已分配订单通知业主-yunrongt云融正通
     *
     * @param array  $datacompany
     * @param string $totel
     * @param int    $orderid
     *
     * @return bool
     */
    public function send_yunrongt_sms($datacompany,$totel,$orderid)
    {
        if (empty($datacompany) || empty($totel)) {
            return false;
        }
        if (count($datacompany) > 0) {
            //1发送分配装修公司的提醒
            $smsdatav[]          = '尾号为'.substr($totel,-3);
            $smsdatav[]          = '小齐';
            $smsdata['tel']      = $totel;
            $smsdata['type']     = 'toyz_fpgs';
            $smsdata['variable'] = $smsdatav;
            $smsdata['extend']['type']    = 1; //1 通知业主分配的装修公司
            $smsdata['extend']['op_user'] = (session("uc_userinfo.user") ? :'');
            $smsdata['extend']['op_id']   = (session("uc_userinfo.id") ? :'');
            $smsdata['extend']['orderid'] = $orderid ? :'';
//            sendSmsQz($smsdata);//a.1.0.17 要求刪除
            unset($smsdatav);
            unset($smsdata);
        }
        switch (count($datacompany)) { //2再发送具体分配的装修公司信息(根据1-4家区间组建不同的短信)
            case '1':
                //1个公司
                //1条短信
                $smsdataArr          = array(); //多条短信

                $smsdatav[]          = $datacompany[0]['jc']; //公司简称
                $smsdatav[]          = $datacompany[0]['receive_order_tel1_remark']. "经理"; //联系人
                $smsdatav[]          = $datacompany[0]['receive_order_tel1']; //联系电话
                $smsdata['tel']      = $totel;
                $smsdata['type']     = 'toyz_fpgs1';
                $smsdata['variable'] = $smsdatav;
                $smsdataArr[]        = $smsdata;
                unset($smsdatav);
                unset($smsdata);

                foreach ($smsdataArr as $keysms => $smsdataone) {
                    $smsdataone['extend']['type']     = 1; //1 通知业主分配的装修公司
                    $smsdataone['extend']['op_user'] = (session("uc_userinfo.user") ? :'');
                    $smsdataone['extend']['op_id']   = (session("uc_userinfo.id") ? :'');
                    $smsdataone['extend']['orderid'] = $orderid ? :'';
                    sendSmsQz($smsdataone);
                }

                break;
            case '2':
                //2个公司
                //1条短信
                $smsdataArr          = array(); //多条短信

                $smsdatav[]          = $datacompany[0]['jc']; //公司简称
                $smsdatav[]          = $datacompany[0]['receive_order_tel1_remark']. "经理"; //联系人
                $smsdatav[]          = $datacompany[0]['receive_order_tel1']; //联系电话
                $smsdatav[]          = $datacompany[1]['jc']; //公司简称
                $smsdatav[]          = $datacompany[1]['receive_order_tel1_remark']. "经理"; //联系人
                $smsdatav[]          = $datacompany[1]['receive_order_tel1']; //联系电话
                $smsdata['tel']      = $totel;
                $smsdata['type']     = 'toyz_fpgs2';
                $smsdata['variable'] = $smsdatav;
                $smsdataArr[]        = $smsdata;
                unset($smsdatav);
                unset($smsdata);

                foreach ($smsdataArr as $keysms => $smsdataone) {
                    $smsdataone['extend']['type']     = 1; //1 通知业主分配的装修公司
                    $smsdataone['extend']['op_user'] = (session("uc_userinfo.user") ? :'');
                    $smsdataone['extend']['op_id']   = (session("uc_userinfo.id") ? :'');
                    $smsdataone['extend']['orderid'] = $orderid ? :'';
                    sendSmsQz($smsdataone);
                }

                break;
            case '3':
                //3个公司
                //2条短信
                $smsdataArr          = array(); //多条短信

                $smsdatav[]          = $datacompany[0]['jc']; //公司简称
                $smsdatav[]          = $datacompany[0]['receive_order_tel1_remark']. "经理"; //联系人
                $smsdatav[]          = $datacompany[0]['receive_order_tel1']; //联系电话
                $smsdatav[]          = $datacompany[1]['jc']; //公司简称
                $smsdatav[]          = $datacompany[1]['receive_order_tel1_remark']. "经理"; //联系人
                $smsdatav[]          = $datacompany[1]['receive_order_tel1']; //联系电话
                $smsdata['tel']      = $totel;
                $smsdata['type']     = 'toyz_fpgs2';
                $smsdata['variable'] = $smsdatav;
                $smsdataArr[]        = $smsdata;
                unset($smsdatav);
                unset($smsdata);

                $smsdatav[]          = $datacompany[2]['jc']; //公司简称
                $smsdatav[]          = $datacompany[2]['receive_order_tel1_remark']. "经理"; //联系人
                $smsdatav[]          = $datacompany[2]['receive_order_tel1']; //联系电话
                $smsdata['tel']      = $totel;
                $smsdata['type']     = 'toyz_fpgs1';
                $smsdata['variable'] = $smsdatav;
                $smsdataArr[]        = $smsdata;
                unset($smsdatav);
                unset($smsdata);

                foreach ($smsdataArr as $keysms => $smsdataone) {
                    $smsdataone['extend']['type']     = 1; //1 通知业主分配的装修公司
                    $smsdataone['extend']['op_user'] = (session("uc_userinfo.user") ? :'');
                    $smsdataone['extend']['op_id']   = (session("uc_userinfo.id") ? :'');
                    $smsdataone['extend']['orderid'] = $orderid ? :'';
                    sendSmsQz($smsdataone);
                }

                break;
            case '4':
                //4个公司
                //2条短信
                $smsdataArr          = array(); //多条短信

                $smsdatav[]          = $datacompany[0]['jc']; //公司简称
                $smsdatav[]          = $datacompany[0]['receive_order_tel1_remark']. "经理"; //联系人
                $smsdatav[]          = $datacompany[0]['receive_order_tel1']; //联系电话
                $smsdatav[]          = $datacompany[1]['jc']; //公司简称
                $smsdatav[]          = $datacompany[1]['receive_order_tel1_remark']. "经理"; //联系人
                $smsdatav[]          = $datacompany[1]['receive_order_tel1']; //联系电话
                $smsdata['tel']      = $totel;
                $smsdata['type']     = 'toyz_fpgs2';
                $smsdata['variable'] = $smsdatav;
                $smsdataArr[]        = $smsdata;
                unset($smsdatav);
                unset($smsdata);

                $smsdatav[]          = $datacompany[2]['jc']; //公司简称
                $smsdatav[]          = $datacompany[2]['receive_order_tel1_remark']. "经理"; //联系人
                $smsdatav[]          = $datacompany[2]['receive_order_tel1']; //联系电话
                $smsdatav[]          = $datacompany[3]['jc']; //公司简称
                $smsdatav[]          = $datacompany[3]['receive_order_tel1_remark']. "经理"; //联系人
                $smsdatav[]          = $datacompany[3]['receive_order_tel1']; //联系电话
                $smsdata['tel']      = $totel;
                $smsdata['type']     = 'toyz_fpgs2';
                $smsdata['variable'] = $smsdatav;
                $smsdataArr[]        = $smsdata;
                unset($smsdatav);
                unset($smsdata);

                foreach ($smsdataArr as $keysms => $smsdataone) {
                    $smsdataone['extend']['type']     = 1; //1 通知业主分配的装修公司
                    $smsdataone['extend']['op_user'] = (session("uc_userinfo.user") ? :'');
                    $smsdataone['extend']['op_id']   = (session("uc_userinfo.id") ? :'');
                    $smsdataone['extend']['orderid'] = $orderid ? :'';
                    sendSmsQz($smsdataone);
                }

                break;

            default:
                return "失败!没有公司报备的手机号码!";
                break;
        }

        return true;
    }

    /**
     * 发送已分配订单通知业主-ihuyi互亿无线-通过redis队列
     *
     * @param array  $datacompany
     * @param string $totel
     * @param int    $orderid
     *
     * @return bool
     */
    public function send_redis_sms($datacompany,$totel,$orderid)
    {
        if (empty($datacompany) || empty($totel)) {
            return false;
        }

        $redis  = new \Redis();

        if ($redis->connect(C('REDIS_HOST'), C('REDIS_PORT'), 1)) {
            $redis->select(C('REDIS_DB_STAT')); //选择库
        }

        //尊敬的齐装网会员【变量】：我是您的专属客服【变量】，根据您的需求已选出最适合您的装修公司并通知与您联系，谢谢！
        $smstmp_119008 = str_replace("【变量】","%s",OP('sms_ihuyi_119008')); //取短信模版 ，做短信模板
        $smstmp_119008 = sprintf($smstmp_119008,'尾号为'.substr($totel,-3),'小齐'); //模版替换好数据 替换2个变量
        //尊敬的齐装网会员：您已成功预约：【变量】;联系人:【变量】;电话:【变量】，【变量】;联系人:【变量】;电话:【变量】
        $smstmp_40343 = str_replace("【变量】","%s",OP('sms_ihuyi_40343')); //取短信模版 6个变量 可以替换2个公司
        //尊敬的齐装网会员：您已成功预约【变量】;联系人:【变量】;电话:【变量】
        $smstmp_40335  = str_replace("【变量】","%s",OP('sms_ihuyi_40335')); //取短信模版 3个变量 可以替换1个公司
        // $datacompany   = array_values($jdbbList); //把公司id的key变成数字索引

        $smsdata       = array();
        $smssendresutl = array(); //短信发送结果
        //unset($datacompany[3]);unset($datacompany[2]);unset($datacompany[1]);  //本项 仅供调试使用. 线上 必须是注释状态
        switch (count($datacompany)) { //根据公司数量生成模版
            case '1':
                //只有一个公司
                $smstmp_40335_1 = sprintf($smstmp_40335,$datacompany[0]['jc'],
                                        $datacompany[0]['receive_order_tel1_remark']. "经理",$datacompany[0]['receive_order_tel1']);
                //把数据存入redis 有序集合
                unset($smsdata);
                $smsdata[] = $totel;
                $smsdata[] = $smstmp_119008;
                $smsdata[] = $orderid;
                $smsdata[] = session("uc_userinfo.name");
                $smsdata[] = session("uc_userinfo.id");
                $redis->ZADD('sms_queue',time(),serialize($smsdata));
                unset($smsdata);
                $smsdata[] = $totel;
                $smsdata[] = $smstmp_40335_1;
                $smsdata[] = $orderid;
                $smsdata[] = session("uc_userinfo.name");
                $smsdata[] = session("uc_userinfo.id");
                $redis->ZADD('sms_queue',time() + 63,serialize($smsdata));
                break;
            case '2':
                //2个公司
                $smstmp_40343_1 = sprintf($smstmp_40343,
                                        $datacompany[0]['jc'],
                                        $datacompany[0]['receive_order_tel1_remark']. "经理",
                                        $datacompany[0]['receive_order_tel1'],
                                        $datacompany[1]['jc'],
                                        $datacompany[1]['receive_order_tel1_remark']. "经理",
                                        $datacompany[1]['receive_order_tel1']
                                        );
                //把数据存入redis 有序集合
                unset($smsdata);
                $smsdata[] = $totel;
                $smsdata[] = $smstmp_119008;
                $smsdata[] = $orderid;
                $smsdata[] = session("uc_userinfo.name");
                $smsdata[] = session("uc_userinfo.id");
                $redis->ZADD('sms_queue',time(),serialize($smsdata));

                unset($smsdata);
                $smsdata[] = $totel;
                $smsdata[] = $smstmp_40343_1;
                $smsdata[] = $orderid;
                $smsdata[] = session("uc_userinfo.name");
                $smsdata[] = session("uc_userinfo.id");
                $redis->ZADD('sms_queue',time() + 63,serialize($smsdata));
                break;
            case '3':
                //3个公司
                $smstmp_40343_1 = sprintf($smstmp_40343,
                                        $datacompany[0]['jc'],
                                        $datacompany[0]['receive_order_tel1_remark']. "经理",
                                        $datacompany[0]['receive_order_tel1'],
                                        $datacompany[1]['jc'],
                                        $datacompany[1]['receive_order_tel1_remark']. "经理",
                                        $datacompany[1]['receive_order_tel1']
                                        );
                $smstmp_40335_1 = sprintf($smstmp_40335,
                                        $datacompany[2]['jc'],
                                        $datacompany[2]['receive_order_tel1_remark']. "经理",
                                        $datacompany[2]['receive_order_tel1']
                                        );
                //把数据存入redis 有序集合
                unset($smsdata);
                $smsdata[] = $totel;
                $smsdata[] = $smstmp_119008;
                $smsdata[] = $orderid;
                $smsdata[] = session("uc_userinfo.name");
                $smsdata[] = session("uc_userinfo.id");
                $redis->ZADD('sms_queue',time(),serialize($smsdata));

                unset($smsdata);
                $smsdata[] = $totel;
                $smsdata[] = $smstmp_40343_1;
                $smsdata[] = $orderid;
                $smsdata[] = session("uc_userinfo.name");
                $smsdata[] = session("uc_userinfo.id");
                $redis->ZADD('sms_queue',time() + 63,serialize($smsdata));

                unset($smsdata);
                $smsdata[] = $totel;
                $smsdata[] = $smstmp_40335_1;
                $smsdata[] = $orderid;
                $smsdata[] = session("uc_userinfo.name");
                $smsdata[] = session("uc_userinfo.id");
                $redis->ZADD('sms_queue',time() + 126,serialize($smsdata));

                break;
            case '4':
                //4个公司
                $smstmp_40343_1 = sprintf($smstmp_40343,
                                        $datacompany[0]['jc'],
                                        $datacompany[0]['receive_order_tel1_remark']. "经理",
                                        $datacompany[0]['receive_order_tel1'],
                                        $datacompany[1]['jc'],
                                        $datacompany[1]['receive_order_tel1_remark']. "经理",
                                        $datacompany[1]['receive_order_tel1']
                                        );
                $smstmp_40343_2 = sprintf($smstmp_40343,
                                        $datacompany[2]['jc'],
                                        $datacompany[2]['receive_order_tel1_remark']. "经理",
                                        $datacompany[2]['receive_order_tel1'],
                                        $datacompany[3]['jc'],
                                        $datacompany[3]['receive_order_tel1_remark']. "经理",
                                        $datacompany[3]['receive_order_tel1']
                                        );
                //把数据存入redis 有序集合
                unset($smsdata);
                $smsdata[] = $totel;
                $smsdata[] = $smstmp_119008;
                $smsdata[] = $orderid;
                $smsdata[] = session("uc_userinfo.name");
                $smsdata[] = session("uc_userinfo.id");
                $redis->ZADD('sms_queue',time(),serialize($smsdata));

                unset($smsdata);
                $smsdata[] = $totel;
                $smsdata[] = $smstmp_40343_1;
                $smsdata[] = $orderid;
                $smsdata[] = session("uc_userinfo.name");
                $smsdata[] = session("uc_userinfo.id");
                $redis->ZADD('sms_queue',time() + 63,serialize($smsdata));

                unset($smsdata);
                $smsdata[] = $totel;
                $smsdata[] = $smstmp_40343_2;
                $smsdata[] = $orderid;
                $smsdata[] = session("uc_userinfo.name");
                $smsdata[] = session("uc_userinfo.id");
                $redis->ZADD('sms_queue',time() + 126,serialize($smsdata));
                break;

            default:
                return "失败!没有公司报备的手机号码!";
                break;
        }

        return true;
    }

    /**
     * 发送业主短信通知
     *
     * @param string $toTele  号码
     * @param int $type 类型 当前只有1
     * @param int $orderid 订单id
     *
     * @return array or bool
     */
    private function send_sms($toTel,$type,$orderid)
    {
        if (empty($toTel)) {
            return  array("code"=>"404","errmsg"=>"该电话不存在");
        }

        switch ($type) {
            case '1':
                //未接电话短信通知
                $datetime_h = date('m').'月'.date('d').'日'.date('H').'时'.date('i').'分'; // 07月20日11时16分
                $smsdatav[]                = $datetime_h; //变量1
                $smsdatav[]                = OP('QZ_CONTACT_TELNUM400'); //变量2 齐装网400电话
                $smsdata['tel']            = $toTel;
                $smsdata['type']           = 'toyz_wjt';
                $smsdata['variable']       = $smsdatav;
                $smsdata['extend']['type'] = 2; //2 未接通电话短信通知
                break;
            default:
                return false;
                break;
        }

        //发送短信
        //扩展信息,传入后可打日志
        $smsdata['extend']['op_user'] = (session("uc_userinfo.user") ? :'');
        $smsdata['extend']['op_id']   = (session("uc_userinfo.id") ? :'');
        $smsdata['extend']['orderid'] = $orderid ? :'';

        $result              = sendSmsQz($smsdata);

        if ($result["errcode"] != 0) {
           return array("code"=>"404","errmsg"=> $result["msg"]);
        }
        return array("code"=>"200");
    }
}