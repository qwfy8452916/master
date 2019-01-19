<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

/*
 * author:mcj
 * 注意路由上下顺序！！！
 * */

/*****************************pc端路由  Start*******************************/


Route::domain('erp', function () {
    //头像图片上传
    Route::rule('userset/uploadhead', 'index/upload/changeHeadImage','POST');


    //工种设置
    Route::rule('worktype', 'index/worktype/index');
    Route::rule('worktype/get', 'index/worktype/getWorktypeInfo','GET');
    Route::rule('worktype/edit', 'index/worktype/edit','POST');
    Route::rule('worktype/del', 'index/worktype/delWorktypeInfo','DELETE');
    // 部门管理
    Route::rule('department', 'index/department/index');
    Route::rule('department/add', 'index/department/add','POST');
    Route::rule('department/delete', 'index/department/delete','POST');
    Route::rule('department/forbid', 'index/department/forbid','POST');

    //员工
    Route::rule('employee', 'index/team/employee');
    Route::rule('employee/add', 'index/team/addemployee?action_type=add','GET');
    Route::rule('employee/edit', 'index/team/addemployee?action_type=edit','GET');
    Route::rule('employee/save', 'index/team/saveEmployee','POST');
    Route::rule('employee/change', 'index/team/changeEmployeeStatus','POST');
    Route::rule('employee/del', 'index/team/delEmployee','POST');
    Route::rule('employee/updatepwd', 'index/team/changePwd','POST');
    //施工组
    Route::rule('workgroup', 'index/team/worker');
    Route::rule('workgroup/add', 'index/team/addworker?action_type=add','GET');
    Route::rule('workgroup/edit', 'index/team/addworker?action_type=edit','GET');
    Route::rule('workgroup/getWorkerInfoById', 'index/team/getWorkerInfoById','POST');
    Route::rule('workgroup/save', 'index/team/saveWorker','POST');
    Route::rule('workgroup/detail', 'index/team/groupdetail','GET');
    Route::rule('workgroup/del', 'index/team/delWorker','POST');
    Route::rule('workgroup/updatepwd', 'index/team/changeWorkerPwd','POST');
    Route::rule('workgroup/change', 'index/team/changeWorkerStatus','POST');

    //供应商分类管理
    Route::rule('category', 'index/suppliercategory/index');
    Route::rule('category/add', 'index/suppliercategory/add','POST');
    Route::rule('category/delete', 'index/suppliercategory/delete','POST');
    //跟单模块
    //图片上传
    Route::rule('img/upload', 'index/upload/image','POST');//户型设计图
    Route::rule('build/img/upload', 'index/upload/buildImage','POST');//施工图
    Route::rule('manager/worker/group', 'index/order/managerWorkerGroup','GET');//根据项目经理获取所管理的工作组
    Route::rule('build/edit/add', 'index/build/add','POST');//施工信息添加
    Route::rule('build/unit/edit', 'index/build/editUnit','POST');//单条施工信息编辑
    Route::rule('build/unit/del', 'index/build/delUnit','POST');//单条施工信息删除
    Route::rule('build/list', 'index/build/listRecord','GET');//订单编辑--施工信息列表接口
    Route::rule('order/edit/do', 'index/order/editOrderDo','POST');//跟单信息编辑数据处理

    //add
    Route::rule('order/editstate/do', 'index/order/editOrderStateDo','POST');//跟单信息编辑数据处理
    Route::rule('order/editbasic/do', 'index/order/editOrderBasicDo','POST');//跟单信息编辑数据处理
    Route::rule('order/edituser/do', 'index/order/editOrderUserDo','POST');//跟单信息编辑数据处理
    Route::rule('order/editimg/do', 'index/order/editOrderImgDo','POST');//跟单信息编辑数据处理
    //add
    Route::rule('order/edit', 'index/order/editOrder','GET');//跟单信息编辑
    Route::rule('order/add/do', 'index/order/doAdd','POST');//订单添加数据处理
    Route::rule('order/add', 'index/order/add','GET');//订单添加路由
//    Route::rule('order/build/edit', 'index/build/edit');//施工信息编辑
    Route::rule('order/detail', 'index/order/orderDetail','GET');//订单详情--跟单
    Route::rule('order/orderhistory', 'index/order/orderHistory','GET');//订单跟单详情
    Route::rule('order/orderHistoryEdit', 'index/order/orderHistoryEdit','GET');
    Route::rule('order/build/detail/list', 'index/build/buildDetailList','GET');//订单详情--施工信息列表接口
    Route::rule('order/order/detail/list', 'index/order/orderDetailList','GET');//订单详情--跟单信息列表接口

//    Route::rule('order/build/detail', 'index/order/buildDetail','GET');//订单详情--施工
    Route::rule('order/material/detail', 'index/order/materialDetail','GET');//订单详情--施工
    Route::rule('order', 'index/order/index');//订单列表路由
    //施工管理
    Route::rule('shigong', 'index/order/shigong');//订单列表路由
//    Route::rule('shigong/build/detail', 'index/order/buildDetail','GET');//订单详情--施工
    Route::rule('shigong/build/edit', 'index/build/edit','GET');//订单详情--施工 index/build/edit
    Route::rule('shigong/material/detail', 'index/order/materialDetails','GET');//订单详情--施工
    Route::rule('shigong/build/faildesign', 'index/build/getCheckStateInfo','GET'); //施工页面验收不合格信息显示接口
    Route::rule('shigong/saveworker/', 'index/build/saveOrderWorker','POST'); //施工人员添加


    //供应商管理
    Route::rule('supplier', 'index/supplier/index');
    Route::rule('supplier/addsupplier', 'index/supplier/addsupplier','GET');
    Route::rule('supplier/detail', 'index/supplier/supplier_detail','GET');
    Route::rule('supplier/add', 'index/supplier/add','POST');
    Route::rule('supplier/delete', 'index/supplier/delete','POST');
    Route::rule('supplier/getcitys/', 'index/supplier/getcitys','GET');


    //材料管理
    Route::rule('material', 'index/material/index');
    Route::rule('material/add', 'index/material/add','GET');
    Route::rule('material/edit', 'index/material/edit','POST');
    Route::rule('material/detail', 'index/material/detail','GET');
    Route::rule('material/del', 'index/material/del','POST');
    Route::rule('category/getmCategory', 'index/suppliercategory/getmCategory','GET');
    Route::rule('material/getorder', 'index/material/getorder','GET');
    Route::rule('material/editstate', 'index/material/editstate','POST');
    Route::rule('material/delmaterial', 'index/material/delmaterial','POST');

    //岗位管理
    Route::rule('station', 'index/station/index');
    Route::rule('station/add', 'index/station/addStation?action_type=add','GET');
    Route::rule('station/edit', 'index/station/addStation?action_type=edit','GET');
    Route::rule('station/save', 'index/station/saveStation','POST');
    Route::rule('station/change', 'index/station/changeStation','POST');
    Route::rule('station/del', 'index/station/delStation','POST');


    //登陆/ 个人设置
    Route::rule('login','index/login/index');//登陆页
    Route::rule('login/reset','index/login/reset','GET');//修改密码页面
    Route::rule('login/land', 'index/login/land', 'POST');//登陆验证
    Route::rule('login/send', 'index/login/sendNumber', 'POST');//发送短信
    Route::rule('login/resetpass', 'index/login/resetPassword', 'POST');//重置密码
    Route::rule('login/clearuserinfo', 'index/login/clearUserInfo', 'GET');//清除登陆的session

    //个人设置
    Route::rule('userset', 'index/install/setup');//个人设置页面
    Route::rule('userset/setup', 'index/install/setup','GET');//个人设置
    Route::rule('userset/changepassword', 'index/install/changePassword', 'POST');//个人设置页修改密码
    Route::rule('userset/changeuserinfo', 'index/install/changeUserInfo', 'POST');//个人设置页保存个人信息
    Route::rule('userset/saveHeadImage', 'index/install/saveHeadImage','POST');//保存用户头像
    Route::rule('userset/addFeedback', 'index/install/addFeedback','POST');//提交意见反馈

    //意见反馈
    Route::rule('feedback', 'index/install/feedback','GET');


    //首页
    Route::rule('/', 'index/index/index');//首页
    Route::rule('/getStatics', 'index/index/ajaxBuildHistory');//首页获取签单统计
});

/*****************************pc端路由  End*******************************/

/*****************************移动端路由  Start*******************************/

Route::domain('merp', function () {
    //材料管理
    Route::rule('material', 'mobile/material/index');
    Route::rule('material/del', 'mobile/material/del','POST');
    Route::rule('material/detail', 'mobile/material/detail','GET');
    //登录页面
    Route::rule('/', 'mobile/index/index');//首页
    Route::rule('login', 'mobile/login/index');
    Route::rule('login/findpsw','mobile/login/findpsw','GET');  //手机端修改密码第一步
    Route::rule('login/newpsw','mobile/login/newpsw','GET');  //手机端修改密码第二步
    Route::rule('login/loginout', 'mobile/login/loginout','GET');
    Route::rule('login/changepassword', 'mobile/login/changePassword', 'post');//个人设置页修改密码
    Route::rule('login/land', 'mobile/login/land', 'post');//登陆验证
    Route::rule('login/send', 'index/login/sendNumber', 'post');//发送短信
    Route::rule('login/checksavecode', 'mobile/login/checkSaveCode', 'post');//点击下一步验证


    //供应商
    Route::rule('supplier', 'mobile/supplier/index');
    Route::rule('supplier/del', 'mobile/supplier/del','POST');
    Route::rule('supplier/detail', 'mobile/supplier/detail','GET');
    //员工
    Route::rule('employee', 'mobile/team/employee');
    Route::rule('employee/add', 'mobile/team/addemployee?action_type=add','GET');
    Route::rule('employee/edit', 'mobile/team/addemployee?action_type=edit','GET');
    Route::rule('employee/save', 'mobile/team/saveEmployee','POST');
    Route::rule('employee/del', 'mobile/team/delEmployee','POST');
    //施工组
    Route::rule('workgroup', 'mobile/team/yuangong');
    Route::rule('workgroup/worker', 'mobile/team/groupworker','GET');
    Route::rule('workgroup/del', 'mobile/team/delGroup','POST');
    Route::rule('worker/del', 'mobile/team/delGroupWorker','POST');

    //施工组2
    Route::rule('yuangong', 'mobile/team/yuangong');

    //订单模块
	Route::rule('open/build/image', 'mobile/openInfo/examplePic','GET');//上传施工图的example

	Route::rule('img/upload', 'mobile/upload/image','POST');//户型设计图上传

	Route::rule('manager/worker/group', 'mobile/order/managerWorkerGroup','GET');//根据项目经理获取所管理的工作组
    Route::rule('order/list', 'mobile/order/indexList','GET');
    Route::rule('shigong/list', 'mobile/order/shigongList','GET');
    Route::rule('order/add/do', 'mobile/order/doAdd','POST');//订单添加数据处理
    Route::rule('order/add', 'mobile/order/add','GET');
    Route::rule('order/detail', 'mobile/order/detail','GET');
    Route::rule('order/shigongdetail', 'mobile/order/shigongdetail','GET'); //施工详情
    Route::rule('order/shigongrenyuan', 'mobile/order/shigongrenyuan','GET'); //施工详情
    Route::rule('order/shigongrenyuan/save', 'mobile/order/shigongrenyuanSave','POST'); //添加施工人员

    Route::rule('order/orderhistory', 'mobile/order/orderHistory','GET');
    Route::rule('order/edit/do', 'mobile/order/editOrderDo','POST');//跟单信息编辑数据处理
    Route::rule('order/edit', 'mobile/order/edit','GET');
    Route::rule('order/build/list', 'mobile/build/index','GET');
    Route::rule('order/build/shigongfail', 'mobile/build/shigongfail','GET');
    Route::rule('order/build/add', 'mobile/build/add','GET');
    Route::rule('order/house/design/add', 'mobile/order/houseDesignAdd','GET');
    Route::rule('order/house/design', 'mobile/order/houseDesign','GET');
    Route::rule('order/house/todesign', 'mobile/order/toHouseDesign','GET');
    Route::rule('order', 'mobile/order/index','GET');
    Route::rule('shigong', 'mobile/order/shigong','GET');

    Route::rule('build/img/upload', 'mobile/upload/buildImage','POST');//施工图上传
    Route::rule('build/edit/add', 'mobile/build/addDo','POST');//施工信息添加
    Route::rule('build/unit/del', 'mobile/build/delUnit','POST');//单条施工信息删除
    Route::rule('build/list/api', 'mobile/build/listRecord','GET');

    Route::rule('house/design/del', 'mobile/order/delHouseDesign','POST');
    Route::rule('house/design/add/do', 'mobile/order/houseDesignAddDo','POST');

    //修改个人信息
    Route::rule('install/changeaccountinfo', 'mobile/install/changeAccountInfo','POST');
    Route::rule('userset/upload', 'mobile/upload/changeHeadImageMobile','POST');//上传头像

    //移动端个人设置路由
    Route::rule('userset', 'mobile/install/index');// 个人设置第一个页面
    Route::rule('userset/cpd', 'mobile/install/cpd','GET');// 修改密码第一步页面
    Route::rule('userset/newpsw', 'mobile/install/newpsw','GET');// 修改密码第一步页面
    Route::rule('userset/info', 'mobile/install/userset','GET');// 个人信息页面
    Route::rule('userset/avatar', 'mobile/install/avatar','GET');// 修改头像页面、
    Route::rule('userset/singleinfo', 'mobile/install/singleinfo','GET');// 修改姓名页面
    Route::rule('userset/singleinfomobile', 'mobile/install/singleinfomobile','GET');// 修改手机号页面
    Route::rule('userset/singleinfowechat', 'mobile/install/singleinfowechat','GET');// 修改微信号页面
    Route::rule('userset/saveheadimage', 'mobile/install/saveHeadImage','POST');//保存用户头像
    Route::rule('userset/changeaccountinfo', 'mobile/install/changeAccountInfo','POST'); //保存用户信息
    Route::rule('userset/addfeedback', 'mobile/install/addFeedback','POST');//提交意见反馈

    //意见反馈页面
    Route::rule('feedback', 'mobile/install/suggestion');




    //jcsGetSession   // 后续需要删除
    Route::rule('getsession', 'mobile/login/jcsGetSession','GET');
    Route::rule('showusersession', 'mobile/login/showUserSession','GET');

});




/*****************************移动端路由  End*******************************/
//pc

//m端