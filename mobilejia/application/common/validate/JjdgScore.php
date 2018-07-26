<?php
/**
 * 用户评分模块
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/19
 * Time: 9:59
 */
namespace app\common\validate;

use think\Validate;

class JjdgScore extends Validate
{
    protected $rule = [
        'code' => 'require|number',
        '__token__' => 'require|token',
        'score' => 'require|in:1,2,3,4,5',
    ];

    protected $field = [
        '__token__' => '令牌',
        'code' => '商品编号',
        'score' => '评分'
    ];

    /**
     * @var array
     */
    protected $scene = [
        'make' => [
            // '__token__',
            'code',
            'score',
        ],
    ];
}