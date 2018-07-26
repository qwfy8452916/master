<?php
// +----------------------------------------------------------------------
// | Time: 2018/6/1    用户验证器
// +----------------------------------------------------------------------

namespace app\common\validate;

use think\Validate;

class User extends Validate
{
    protected $rule = [
        'user' => 'require|max:254',
        'pass' => 'require|max:254',
        'name' => 'require',
        'tel'  => ['require','regex'=>'/^(0|86|17951)?(13|14|15|16|17|18|19)[0-9]{9}$/'],
        'repass' => 'require|confirm:pass',
        'code' => 'require|min:4',
    ];

    protected $message = [
        'user.require' => '无效的用户帐号!',
        'user.max' => '无效的用户帐号!',
        'tel.require' => '无效的用户帐号!',
        'tel.max' => '无效的用户帐号!',
        'pass.require' =>'密码不能为空!',
        'pass.max' =>'密码错误!',
        'repass.require' =>'确认密码错误!',
        'repass.confirm' =>'确认密码错误!',
        'code.require' =>'手机验证码错误!',
        'code.min' =>'手机验证码错误!',
    ];

    protected $scene = [
        'login' => ['user', 'pass'],
        'register' => ['tel', 'pass', 'repass', 'code'],
        'pcregister' => ['tel', 'pass', 'repass', 'code','name'],
    ];

}