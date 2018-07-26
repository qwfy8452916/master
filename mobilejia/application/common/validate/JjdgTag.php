<?php
// +----------------------------------------------------------------------
// | Time: 2018/6/1    标签验证器
// +----------------------------------------------------------------------

namespace app\common\validate;

use think\Validate;

class JjdgTag extends Validate
{
    protected $rule = [
        'id' => 'require|integer|gt:0',
        'name' => 'require|max:254',
        'type' => 'require|in:1,2,3',
        'status' => 'require|in:1,2',
        'uid' => 'require|integer|gt:0',
        'sort' => 'integer|egt:0',
    ];

    protected $message = [
        'id.require' => '数据不存在~',
        'id.integer' => '数据不存在~',
        'id.gt' => '数据不存在~',
        'name.require' => '名称不能为空~',
        'name.max' => '名称不能太长',
        'type.require' =>'未选择类型~',
        'type.in' =>'未选择类型~',
        'status.require' =>'状态值未选择~',
        'status.in' =>'状态值未选择~',
        'uid.require' => '请重新登录~',
        'uid.integer' => '请重新登录~',
        'uid.gt' => '请重新登录~',
        'sort.integer' => '排序是大于0整数~',
        'sort.egt' => '排序是大于0整数~',
    ];

    protected $scene = [
        'add' => ['name', 'type','uid'],
        'edit' => ['id', 'name', 'type','uid'],
    ];

}