<?php
/**
 * 接口状态码定义
 * Created by PhpStorm.
 * User: mcj
 * Date: 2018/6/22
 * Time: 16:07
 */
namespace Common\Enums;

class ApiConfig
{
    const REQUEST_FAILL = 0;//请求失败默认状态
    const REQUEST_SUCCESS = 1;//请求成功
    const  PARAMETER_ILLEGAL = 7;//请求参数不合法
    const  VERIFY_CODE_ERROR = 8;//验证码错误
}