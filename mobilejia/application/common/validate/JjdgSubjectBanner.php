<?php
// +----------------------------------------------------------------------
// | Time: 2018/6/1    专题banner验证器
// +----------------------------------------------------------------------

namespace app\common\validate;

use think\Validate;

class JjdgSubjectBanner extends Validate
{
    protected $rule = [
        'id' => 'require|integer|gt:0',
        'title' => 'require|max:254',
        'url' => 'require|url|max:500',
        'img' => 'require|max:500',
        'uid' => 'require|integer|gt:0',
        'sort' => 'integer|egt:0',
        'status' => 'require|in:1,2',
    ];

    protected $message = [
        'id.require' => '数据不存在~',
        'id.integer' => '数据不存在~',
        'id.gt' => '数据不存在~',
        'title.require' => 'banner标题为空~',
        'title.max' => 'banner标题过长',
        'url.require' => 'Url不能为空~',
        'url.url' => 'Url地址错误~',
        'url.max' => 'Url地址过长~',
        'img.require' => '图片为空~',
        'img.max' => '图片路径过长~',
        'uid.require' => '请重新登录~',
        'uid.integer' => '请重新登录~',
        'uid.gt' => '请重新登录~',
        'sort.integer' => '排序是大于0整数~',
        'sort.egt' => '排序是大于0整数~',
        'status.require' =>'状态值未选择~',
        'status.in' =>'状态值未选择~',
    ];

    protected $scene = [
        'add' => ['title', 'url','img','uid','sort','status'],
        'edit' => ['id', 'title', 'url','img','sort','status'],
    ];
}