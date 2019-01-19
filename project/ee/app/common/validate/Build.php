<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/7
 * Time: 13:47
 */

namespace app\common\validate;

use think\Validate;

class Build extends Validate
{
    protected $rule = [
        '__token__' => 'require|token',
        'build_state' => 'require|integer|between:1,16',
        'remark'=>'max:100',
        'build_design'=>'array',
        'order_no' => 'length:15,21',
        'build_id' => 'integer|<=:4294967295',


    ];

    protected $field = [
        '__token__' => '安全令牌',
        'build_state' => '施工状态',
        'remark' => '施工描述',
        'build_design' => '施工图',
        'order_no' => '单号',
        'build_id' => '施工记录'
    ];


    // 添加订单 验证场景定义
    public function sceneAdd()
    {
        return $this->only(
            [
                'build_state', 'remark','build_design'
            ]);
    }

    // 添加订单 验证场景定义
    public function sceneUnitEdit()
    {
        return $this->only(
            [
               'build_id', 'remark','build_design'
            ])
            ->append('build_id', 'require');

    }
}