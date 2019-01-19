<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/7
 * Time: 13:47
 */

namespace app\common\validate;

use think\Validate;

class Order extends Validate
{
    protected $rule = [
        '__token__' => 'require|token',
        'order_no' => 'max:21',
        'source' => 'in:0,2,3',
        'consumer_name' => 'max:30',
        'state' => 'integer|between:1,13',
        'order_remark' => 'max:100',
        'start_time' => 'dateFormat:Y-m-d H:i:s',
        'end_time' => 'requireWith:start_time|dateFormat:Y-m-d H:i:s|egt:start_time',
        'kaigong_start_time' => 'dateFormat:Y-m-d H:i:s',
        'kaigong_end_time' => 'requireWith:kaigong_start_time|dateFormat:Y-m-d H:i:s|egt:kaigong_start_time',
        'order_time' => 'dateFormat:Y-m-d H:i:s',
        'real_time' => 'dateFormat:Y-m-d H:i:s',
        'reason' => 'max:100',
        'qiandan_jine' => 'max:100',
        'consumer_tel' => 'number',
        'consumer_wx_no' => 'min:6|max:30',
        'house_type'=>'integer',
        'house_area' => 'float|<=:99999999.99',
        'build_address' => 'max:30',
        'link_address'=>'max:30',
        'reception_id'=>'integer|<=:4294967295',
        'build_state' => 'integer|between:1,16',
        'designer_id' => 'integer|<=:4294967295',
        'house_design'=>'array',
    ];

    protected $field = [
        '__token__' => '安全令牌',
        'order_no' => '单号',
        'source' => '订单来源',
        'consumer_name' => '业主姓名',
        'state' => '订单状态',
        'start_time' => '开始时间',
        'end_time' => '结束时间',
        'consumer_tel' => '业主手机号',
        'consumer_wx_no' => '微信号',
        'house_type'=>'户型',
        'house_area'=>'装修面积',
        'build_address'=>'装修地址',
        'link_address'=>'联系地址',
        'reception_id'=>'接待客服',
        'build_state'=>'施工状态',
        'designer_id' => '设计师',
        'house_design' =>'设计图'

    ];

    // 自定义查询时间验证规则
    protected function checkTimeSpace($value, $rule, $data = [])
    {
        $val = $this->getDataValue($data, $rule);
        if (strtotime($value) - strtotime($val) > 60 * 60 * 24 * 31) {
            return false;
        }
        return true;
    }

    /**
     * @var array
     */
    protected $scene = [
        'search' => [
            'order_no',
            'source',
            'consumer_name',
            'state',
            'start_time',
            'end_time',
            'consumer_tel',
        ],
    ];

    // 添加订单 验证场景定义
    public function sceneAdd()
    {
        return $this->only(
            [
                'consumer_name', 'consumer_tel','consumer_wx_no','house_type',
                'house_area','build_address','link_address','state',
                'reception_id','build_state','designer_id','xiaoqu'
            ])
            ->append('consumer_name', 'require')
            ->append('state', 'require');
    }

    // 添加订单 验证场景定义
    public function sceneOrderEdit()
    {
        return $this->only(
            [
                'order_no','consumer_name', 'consumer_tel','consumer_wx_no','house_type',
                'house_area','build_address','link_address','state',
                'reception_id','build_state','designer_id',
                'house_design'
            ])
			->append('order_no', 'require')
			->append('consumer_name', 'require')
            ->append('state', 'require');
    }

	// 添加施工图上传 验证场景定义
	public function sceneHouseDesign()
	{
		return $this->only(
			[
				'order_no',
				'house_design',
                'type'
			])
			->append('order_no', 'require')
            ->append('type', 'require')
			->append('house_design', 'require');
	}

    // 添加跟单信息 验证场景定义
    public function sceneOrderStateEdit()
    {
        return $this->only(
            [
                'order_no', 'state'
            ])
            ->append('order_no', 'require')
            ->append('state', 'require');
    }




}