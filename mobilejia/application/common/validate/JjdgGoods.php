<?php
// +----------------------------------------------------------------------
// | Time: 2018/6/1    商品验证器
// +----------------------------------------------------------------------


namespace app\common\validate;

use think\Validate;

class JjdgGoods extends Validate
{
    protected $rule = [
        'code' => 'number',
        '__token__' => 'require|token',
        'expand_link' => 'require|url',
        'title' => 'require|max:90',
        'keywords' => 'require|max:90',
        'describtion' => 'require|max:900',
        'files' => 'require|array',
        'top_cate_id' => 'require|number',
        'sub_cate_id' => 'require|number',
        'specifications' => 'array',
        'has_detail' => 'eq:2',
        'detail' => 'requireIf:has_detail,2 ',
        'same_goods' => 'array',
        'has_custom_collect' => 'eq:2',
        'custom_collect' => 'requireIf:has_detail,2|number',
        'has_custom_price' => 'eq:2',
        'custom_price' => 'requireIf:has_detail,2|float',
        'has_custom_score' => 'eq:2',
        'custom_score' => 'requireIf:has_detail,2|in:1,2,3,4,5',
        'on_sale'=>'in:0,1,2',
        'sale_change_start_time' => 'date',
        'sale_change_end_time' => 'date|egt:sale_change_start_time',
        'create_time_start' => 'date',
        'create_time_end' => 'date|egt:create_time_start',
        'manager_id' => 'number',

    ];

    protected $field = [
        '__token__' => '令牌',
        'expand_link' => '淘宝推广链接',
        'title' => '标题',
        'keywords' => '关键字',
        'describtion' => '描述',
        'files' => '图片',
        'specifications' => '分类',
        'has_detail' => '是否录入商品详情',
        'detail' => '商品详情 ',
        'same_goods' => '相关商品',
        'has_custom_collect' => '是否自定义收藏数量',
        'custom_collect' => '自定义收藏数量',
        'has_custom_price' => '是否设置自定义价格',
        'custom_price' => '自定义价格',
        'has_custom_score' => '是否设置自定义评分',
        'custom_score' => '自定义评分',
        'top_cate_id' => '分类',
        'sub_cate_id' => '分类',
        'code' => '商品编号',
        'sale_change_start_time' => '上架时间',
        'sale_change_end_time' => '下架时间',
        'manager_id' => '创建人'
    ];

    /**
     * @var array
     */
    protected $scene = [
        'add' => [
            '__token__', 'expand_link', 'title', 'keywords','describtion',
            'files','top_cate_id','sub_cate_id','specifications','has_detail',
            'detail', 'same_goods', 'has_custom_collect', 'custom_collect',
            'has_custom_price', 'custom_price', 'has_custom_score', 'custom_score'
        ],
        'search' => [
            'top_cate_id' => 'number',
            'sub_cate_id' => 'number',
            'expand_link' => 'url',
            'code',
            'has_detail' => 'in:0,1,2',
            'has_custom_price' => 'in:0,1,2',
            'sale_change_start_time',
            'sale_change_end_time',
            'create_time_start',
            'create_time_end',
            'manager_id',
            'on_sale',
        ],
        'del'=>[
            'code' => 'require|array',
        ],
        'downSale'=>[
            'code' => 'require|number',
        ],
    ];
}