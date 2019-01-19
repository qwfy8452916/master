<?php

namespace Common\Controller;
use Think\Controller;
use Common\Model\Logic\JiajuZbLogicModel;
use Common\Validate\JiajuOrderValidateModel;
use Common\Enums\ApiConfig;

class JiajuZbfbController extends Controller
{
    /**
     * 家具报价页
     * @param  integer $mianji [面积]
     * @param  array   $huxing [户型 室 厅 卫 厨]
     * @param  integer $tel    [电话]
     * @return [type]          [description]
     */
    public function jiaju_boajia($tel = 0,$mianji = 0,$huxing = [],$cs = "",$qx = "",$source = 0)
    {
        $data = array(
            "mianji" => intval($mianji),
            "tel" => $tel,
            "special_remarks" => "",
            "tel_encrypt" => tel_encrypt(trim($tel)),
            "cs" => $cs,
            "qx" => $qx,
            "source" => $source,
            "huxing" => 15
        );
        if (count($huxing) > 0) {
            foreach ($huxing as $key => $value) {
                $data["special_remarks"] .= $value." ".$key.",";
            }
            rtrim($data["special_remarks"], ",");
        }

        $jiajuZbLogic = new JiajuZbLogicModel();
        $validate = new JiajuOrderValidateModel();

        //验证规则
        $rules = array(
            array('mianji','require','请输入面积!',1),
            array('mianji',array(5,1000),'请输入5-1000之间的面积!',1,"between"),
            array('tel','/1\d{10}/','请输入正确的手机号',1,"regex")
        );

        if (!$validate->validate($rules)->create($data)){
            // 如果创建失败 表示验证没有通过 输出错误提示信息
            return array("error_code" => 9000001,"error_msg" => $validate->getError());
        }

        //查询是否是黑名单
        $result = $jiajuZbLogic->getHistoryInfo($data["tel"]);

        //如果是黑名单电话直接返回
        if ($result["black_mark"] > 0) {
            return ['error_code' => 0,"error_msg" => "发单成功！"];
        }

        $order_id = "";
        if (!empty(I("post.orderid"))) {
            $order_id = I("post.orderid");
        }

        $sms_tel = $data["tel"];
        //24小时只能发送一个订单
        if (!empty($result["last_order_id"])) {
            $order_id = $result["last_order_id"];
        }

        if (empty($order_id)) {
            //新增操作
            //单个IP每天不能超过3个订单
            $ip = get_client_ip();
            $count = $jiajuZbLogic->getOrderCountByIp($ip);

            if ($count <= 3) {
                //添加操作
                $data["tel"] = substr($data["tel"],0,3) .'*****'. substr($data["tel"],-3);
                $order_id = $jiajuZbLogic->publish_order($data);

                if ($order_id !== false) {
                    //订单数据添加入缓存
                    $cacheData = array(
                        "id" => $order_id,
                        "mianji" => $mianji,
                        "huxing" => $huxing
                    );
                    setcookie("QZ_JIAJU_ORDER", serialize($cacheData), 0, '/', '.'.C('QZ_YUMING'));
                    //添加订单安全表
                    $jiajuZbLogic->public_tel_safe($order_id,$sms_tel);

                    //添加渠道数据
                    $jiajuZbLogic->public_yy_order($order_id);

                    //发送短信
                    $smsdata = array(
                        "tpl"         => OP('yunrongt_tpl_jiaju_baojia'),
                        "tel"         => $sms_tel,
                        "type"        => "nil",
                        "sms_channel" => "yunrongyx"
                    );
                    sendSmsQz($smsdata);
                    return ['error_code' => 0,"error_msg"=> ApiConfig::CODE_0];
                }
            } else {
                return ['error_code' => 9000002,"error_msg" => ApiConfig::CODE_9000002];
            }

        } else {
            //编辑操作
            $data["id"] = $order_id;
            $data["tel"] = substr($data["tel"],0,3) .'*****'. substr($data["tel"],-3);

            //编辑操作
            $i = $jiajuZbLogic->update_order($order_id,$data);
            if ($i !== false) {
                $cacheData = array(
                    "id" => $order_id,
                    "mianji" => $mianji,
                    "huxing" => $huxing
                );
                setcookie("QZ_JIAJU_ORDER", serialize($cacheData), 0, '/', '.'.C('QZ_YUMING'));
            }
            return ['error_code' => 0,"error_msg"=> ApiConfig::CODE_0];
        }
    }
}