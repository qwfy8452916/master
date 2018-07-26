<?php
/**
 * 接口状态码定义
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/15
 * Time: 16:07
 */

namespace app\common\enums;

class ApiConfig
{
    const REQUEST_FAILL = 0;//请求失败默认状态
    const REQUEST_SUCCESS = 1;//请求成功
    const UP_SALE_SUCCESS = 2;//上架成功
    const DOWN_SALE_SUCCESS = 3;//下架成功
    const SAME_GOODS_SEARCH_NULL = 4;//相关商品搜索结果为空
    const SAME_GOODS_INCLUDE_SELF = 5;//搜索相关的商品时，检索条件为商品自己
    const  NOT_LOGGED_IN = 6;//用户未登陆
    const  PARAMETER_ILLEGAL = 7;//请求参数不合法
    const  HAS_COLLECTED = 8;//用户已经收藏
    const  COLLECT_IN = 9;//收藏操作成功
    const  COLLECT_OUT = 10;//取消收藏操作成功
    const  HAS_SCORE = 11;//已评过分


}