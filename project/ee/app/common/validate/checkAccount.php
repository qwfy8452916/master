<?php
/**
 * Created by PhpStorm.
 * User: jsb
 * Date: 2018/9/7
 * Time: 9:42
 */
namespace app\common\validate;

use think\Validate;

class checkAccount extends Validate
{
    protected $rule = [
            'account' => 'require',
            'tel'     => 'require',
            'code'    => 'require',
            'pass'    => 'require',
            'repass'  => 'require',
        ];

    protected $message = [];

    protected $scene = [
        'login' => ['account', 'pass'],
        'resetpass' => ['account', 'tel', 'code', 'pass', 'repass', ]
    ];
}