<?php
/**
 * Created by PhpStorm.
 * author: mcj
 * Date: 2018/9/7
 * Time: 14:01
 */
namespace app\common\enums;

class ErrorCode
{

    const  SUCCESS = 0;//请求成功

    //400开头为请求参数不合法 主要用于表单校验 具体情况往下排列
    const  PARAMETER_MINI_PROGRAM_CODE = 400001;//小程序code值无效
    const  PARAMETER_CATEGORY_ILLEGAL = 400002;//分类参数格式不合法
    const  PARAMETER_MINI_PROGRAM_CATEGORY = 400003;//小程序视频分类参数不合法
    const  PARAMETER_ARTICLE_CATEGORY = 400004;//文章分类id参数不合法
    const  PARAMETER_SEARCH_TYPE = 400005;//搜索类型不合法
    const  PARAMETER_SEARCH_KEYWORDS = 400006;//搜索关键字不合法
    const  PARAMETER_SEARCH_SORT = 400007;//排序不合法
    const  PARAMETER_CITY_SHORT_NAME = 400008;//城市缩写名不合法
    const  PARAMETER_COMPANY_ID = 400009;//公司ID不合法
    const  FILE_SIZE_OVER = 400010;//上传文件超出限制
    const  FORM_ILLEGAL = 400011;//表单验证不通过
	const  FILE_NOT = 400012;//未获取到文件
	const  PARAMETER_LACK = 400020;//缺少主要参数
    const  PARAMETER_DATA_REPEAT = 400021;//数据重复
    const  PARAMETER_DATA_NAME = 400022;//姓名重复


    //500开头为服务器问题 具体情况往下排列
    const   SERVICE_MINI_PROGRAM_INFO = 500001;//小程序的APPID相关信息未写入数据系统
    const   SERVICE_MYSQL_ERROR = 500002;//数据库异常


    //401开头为请求需要用户认证
    const  PERMISSION_SESSION_NEED = 401001; //未设置session
    const  PERMISSION_TOKEN_NEED = 401002; //未设置token


    //403开头为设置了认证但是但是权限不足访问应用
    const REFUSE_VISIT = 403001; //没有新会员模块权限
    const QINIU_UPTOKEN = 403002; //七牛云上传令牌不合法


    //其他状态码按错误原因模块划分

    //81数据源不存在
    const DATA_NOT_ARTICLE = 810101; //该文章不存在
    const DATA_NOT_PROJECT_MANAGER = 810102; //该项目经理不存在
    const DATA_NOT_ORDER = 810103; //订单不存在
    const DATA_NOT_BUILD = 810104; //施工记录不存在

    //82数据源已被锁定模块
    const DATA_LOCK_GOOODS_DOWN = 820101; //该商品下架
    const DATA_LOCK_ARTICLE_DOWN = 820201; //该文章下架
    const DATA_LOCK_CATEGORY_HAS_GOODS = 820301; //该分类已经关联商品不可以操作
    const DATA_LOCK_CATEGORY_HAS_ARTICLE = 820302; //该分类已经关联文章不可以操作
	const BUILD_STATE_HAS_ADD = 820401; //该分类已经关联文章不可以操作


}