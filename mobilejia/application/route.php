<?php

use think\Route;

/**
 * 移动端路由
 */
Route::domain('jiajum', function () {
//普通批量注册
    Route::rule([
        '/' => 'jiajum/index/index',         //首页
        'changjing$' => 'jiajum/channel/sceneGuide',                 //场景
        'search$' => 'jiajum/index/searchView',                 //搜索页面
        'user$' => 'jiajum/user/index',                   //用户首页
        'login$' => 'jiajum/login/index',                 //登录页面
        'register$' => 'jiajum/register/index',           //注册页面
        'getpassword$' => 'jiajum/getpassword/index',     //找回密码页面
        'user/info$' => 'jiajum/user/info',                //个人信息详情
        'user/nickname$' => 'jiajum/user/nickname',        //修改昵称页面
        'user/mobile$' => 'jiajum/user/mobile',            //修改手机页面
        'user/pwd$' => 'jiajum/user/pwd',                  //修改密码页面
        'user/feedback$' => 'jiajum/user/feedback',        //修改昵称页面
        'user/store$' => 'jiajum/user/store',              //用户收藏页面
        'user/sex$' => 'jiajum/user/sex',                  //修改性别页面
        'user/area$' => 'jiajum/user/area',                //修改地区页面
        'loginout$' => 'jiajum/login/loginout',           //退出登录
        'agreement$' => ['jiajum/Register/agreement', ['ext' => 'html']],  //用户服务协议
        'zt$' => 'jiajum/subject/index',                  //专题列表页
        'zt/:id' => ['jiajum/subject/detail', ['ext' => 'html'], ['id' => '\d+']],              //专题详情页
        'goods/buy/:code$' => ['jiajum/goods/goBuy', ['ext' => 'html'], ['code' => '\d+']],     //点击购买
    ], '', 'get', ['callback' => 'setUrlOver']                                //此处进行回掉保证路由闭合
    );

    Route::rule([
        'user/collect' => 'jiajum/user/collect',                 //收藏接口
        'user/score' => 'jiajum/user/score',                     //评分接口
        'user/changenick' => 'jiajum/user/changeNick',           //修改昵称接口
        'user/changemobile' => 'jiajum/user/changeMobile',       //修改手机接口
        'user/changepwd' => 'jiajum/user/changePwd',             //修改密码接口
        'user/addfeedback' => 'jiajum/user/addfeedback',         //意见反馈接口
        'user/cancelcollect' => 'jiajum/user/cancelCollect',     //取消收藏接口
        'user/changesex' => 'jiajum/user/changeSex',             //修改性别接口
        'user/changearea' => 'jiajum/user/changeArea',           //修改地区接口
        'sendsms$' => 'jiajum/sms/sendsms',                       //发送短信接口
        'login/do$' => 'jiajum/login/login',                      //用户登录接口
        'register/do$' => 'jiajum/register/register',             //用户注册接口
        'editpassword/do$' => 'jiajum/Getpassword/editPassword',  //找回密码接口
        'loginout$' => 'jiajum/login/loginout',                   //退出登录接口
        'upload$' => 'jiajum/upload/ueditorUpload',               //图片上传接口
    ], '', 'post', []
    );
//特殊路由
    Route::get(':sub_cate/:code$', 'jiajum/goods/index', ['callback' => 'setUrlOver','ext' => 'html'],['sub_cate' => '/^[a-z]+$/','code'=>'/^\d+$/']);//商品详情
//分类列表页默认状态路由 一定要写在最下面！！！
    Route::get(':cate$', 'jiajum/cate/index', ['callback' => 'setUrlOver'],['cate' => '/^[a-z]+$/',]);
//分类列表页筛选路由 一定要写在最下面！！！
    Route::get(':cate/:par$', 'jiajum/cate/index', ['callback' => 'setUrlOver'], ['cate' => '/^[a-z]+$/','par' => '/^([a-z]{1}\d+)*$/']);

});

/************************************************************分割线****************************************************/

/**
 * pc端路由
 */
Route::domain('jiaju', function () {

    Route::rule([
        '/' => 'jiaju/index/index',                         //首页
        'search$' => 'jiaju/index/searchView',              //搜索页面
        'user$' => 'jiaju/user/index',                      //用户首页
        'user/store$' => 'jiaju/user/store',                //用户收藏页面
        'zt/:id' => ['jiaju/subject/detail', ['ext' => 'html'], ['id' => '\d+']],           //专题详情页
        'agreement$' => ['jiaju/login/agreement', ['ext' => 'html']],                       //齐装网在线商城用户服务协议
    ], '', 'get', ['callback' => 'setUrlOver'] );                                //此处进行回掉保证路由闭合

    Route::rule([
        'checkstepone$'  =>'jiaju/login/checkCode',             //第一步验证手机验证码
        'user/collect$' => 'jiaju/user/collect',                //收藏接口
        'user/score$' => 'jiaju/user/score',                    //评分接口
        'user/changenick$' => 'jiaju/user/changeNick',          //修改昵称接口
        'user/changemobile$' => 'jiaju/user/changeMobile',      //修改手机接口
        'user/checkcode$' => 'jiaju/user/checkcode',            //第一步验证接口
        'user/changepwd$' => 'jiaju/user/changePwd',            //修改密码接口
        'user/addfeedback$' => 'jiaju/user/addfeedback',        //意见反馈接口
        'user/cancelcollect$' => 'jiaju/user/cancelCollect',    //取消收藏接口
        'user/changesex$' => 'jiaju/user/changeSex',            //修改性别接口
        'user/changearea$' => 'jiaju/user/changeArea',          //修改地区接口
        'sendsms$' => 'jiaju/sms/sendsms',                      //发送短信接口
        'login/do$' => 'jiaju/login/login',                     //用户登录接口
        'register/do$' => 'jiaju/login/register',               //用户注册接口
        'editpassword/do$' => 'jiaju/login/editPassword',       //找回密码接口
        'loginout$' => 'jiaju/login/loginout',                  //退出登录接口
        'upload$' => 'jiaju/upload/ueditorUpload',              //图片上传接口
    ], '', 'post', [] );

    //特殊路由
    Route::get(':sub_cate/:code$', 'jiaju/goods/detail', ['callback' => 'setUrlOver','ext' => 'html'],['sub_cate' => '/^[a-z]+$/','code'=>'/^\d+$/']);//商品详情
//分类列表页默认状态路由 一定要写在最下面！！！
    Route::get(':cate/[:p]', 'jiaju/cate/index', ['callback' => 'setUrlOver'], ['cate' => '/^[a-z]+$/', 'p' => '/^p\d+$/']);
//分类列表页筛选路由 一定要写在最下面！！！
    Route::get(':cate/:par/[:p]', 'jiaju/cate/index', ['callback' => 'setUrlOver'], ['cate' => '/^[a-z]+$/', 'par' => '/^([a-oq-z]{1}\d+)*$/', 'p' => '/^p\d+$/']);
});
