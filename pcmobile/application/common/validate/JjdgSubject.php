<?php
// +----------------------------------------------------------------------
// | Time: 2018/6/1    专题验证器
// +----------------------------------------------------------------------

namespace app\common\validate;

use think\Validate;

class JjdgSubject extends Validate
{
    protected $rule = [
        'id' => 'require|integer|gt:0',
        'title' => 'require|max:254',
        'keywords' => 'require|max:499',
        'description' => 'require|max:499',
        'headimg' => 'require',
        'tag' => 'max:254',
        'content' => 'require',
        'uid' => 'require|integer|gt:0',
        'uname' => 'require',
        'sort' => 'require|integer|egt:0',
        'status' => 'require|in:1,2',
    ];

    protected $message = [
        'id.require' => '数据不存在~',
        'id.integer' => '数据不存在~',
        'id.gt' => '数据不存在~',
        'title.require' => '请填写标题~',
        'title.max' => '标题不能超过255字符~',
        'keywords.require' => '请填写关键词~',
        'keywords.max' => '关键词不能超过500个字符~',
        'description.require' => '专题简介不能为空~',
        'description.max' => '专题简介不能超过500个字符~',
        'headimg.require' => '专题封面不能为空~',
        'tag.max' => '标签不能过多~',
        'content.require' => '内容不能为空~',
        'uid.require' => '请重新登录~',
        'uid.integer' => '请重新登录~',
        'uid.gt' => '请重新登录~',
        'uname' =>'请重新登录~',
        'sort.require' => '排序必须是大于零整数~',
        'sort.integer' => '排序必须是大于零整数~',
        'sort.egt' => '排序必须是大于零整数~',
        'status.require'=>'状态未勾选~',
        'status.in'=>'状态未勾选~',
    ];

    protected $scene = [
        'add' => ['title', 'keywords','description','headimg','tag','content','uid','uname','status'],
        'edit' => ['id', 'title', 'keywords','description','headimg','tag','content','status'],
    ];
}