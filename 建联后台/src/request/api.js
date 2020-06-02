/**
 * api接口统一管理
 */
import axios from './http.js'

const api = {
    /**
     * 公共api
     */
    upload_file_url: '/ling/api/share/basic/file/upload', //上传附件
    // upload_file_url: 'http://ap.zhuniu.com/api/frontend/upload', 
    // 图片域名
    img_url:'http://res.zhuniu.com/ling/',
    regionList(params){//地址接口
        return axios.get('/ling/api/share/basic/dict/item',{params})
    },

    getProudctSelect(id){//产品分类
        return axios.get('/ling/api/share/basic/proClass/'+id)
    },

    getProudctName(params){//产品分类获取名字
        return axios.get('/ling/api/share/basic/proClass',{params})
    },
    
    /*---分公司---*/
    //分公司创建需求单
    demand_list(params){//需求单列表
        return axios.get('/ling/api/jiangjian/req/req',{params})
    },

    demand_detail(id){//需求单详情
        return axios.get('/ling/api/jiangjian/req/req/'+id)
    },

    demand_add(params){//新增需求单
        return axios.post('/ling/api/jiangjian/req/req',params)
    },

    demand_edit(id,params){//编辑需求单
        return axios.put('/ling/api/jiangjian/req/req/'+id,params)
    },

    checkOffer(id,params){//分公司选择中标报价
        return axios.put('/ling/api/jiangjian/req/offer/'+id+'/check',params)
    },


    /*---集团---*/
    demand_check(id,params){//成本部审核需求单
        return axios.put('/ling/api/jiangjian/req/req/'+id+'/check',params)
    },

    supplierCompany(params){//供应商信息列表
        return axios.get('/ling/api/share/basic/ent',{params})
    },

    paymentList(params) { //付款方式列表
		return axios.get('/ling/api/jiangjian/basic/settle_style', { params })
    },
    
    pushSupplier(params) { //推送供应商
		return axios.put('/ling/api/jiangjian/req/offer', params)
    },
    
    selectOffer(id){//联采部选择中标报价
        return axios.put('/ling/api/jiangjian/req/offer/'+id+'/choose')
    },

    /*------ 部门管理 ------*/
    //部门列表
    deptList(params){
        return axios.get('/ling/api/jiangjian/basic/dept', {params})
    },
    // //判断部门是否存在
    // isDept(params){
    //     return axios.get('/ling/api/jiangjian/basic/dept',{params})
    // },
    //新增部门
    deptAdd(params){
        return axios.post('/ling/api/jiangjian/basic/dept', params)
    },
    //获取部门信息
    deptDetail(id){
        return axios.get('/ling/api/jiangjian/basic/dept/' + id)
    },
    //修改部门信息
    deptModify(params, id){
        return axios.put('/ling/api/jiangjian/basic/dept/' +id, params)
    },
    //删除部门
    deleteDept(params, id){
        return axios.delete('/ling/api/jiangjian/basic/dept/' + id, params)
    },
    //判断部门是否存在
    isDept(params){
        return axios.get('/ling/api/jiangjian/basic/dept/check',{params})
    },
    /*------ 用户管理 ------*/
    //判断员工账号是否存在
    isAccount(account){
        return axios.put('/ling/api/jiangjian/user/user/check/'+account)
    },
    //用户添加
    userAdd(params){
        return axios.post('/ling/api/jiangjian/user/user',params)
    },
    //用户列表 - 用户查询
    userList(params){
        return axios.get('/ling/api/jiangjian/user/user',{params})
    },
    //用户信息 
    userDetail(params, id){
        return axios.get('/ling/api/jiangjian/user/user/' + id, {params})
    },
    //用户修改
    userModify(params,id){
        return axios.put('/ling/api/jiangjian/user/user/'+id,params)
    },
    //用户禁用、启用
    disableUser(params, id){
        return axios.put('/ling/api/jiangjian/user/user/'+id,params)
    },
    //角色管理 - 角色列表
    getRoleList(params){
        return axios.get('/ling/api/jiangjian/authz/userRole', {params})
    },
    //角色管理 - 用户角色列表
    getUserRoleList(params, userId){
        return axios.get('/ling/api/jiangjian/authz/userRole/'  + userId, {params})
    },
    //角色管理 - 修改用户角色
    modifyUserRole(params){
        return axios.patch('/ling/api/jiangjian/authz/userRole', params)
    },
    //重置密码
    resetPWD(params, id){
        return axios.put('/ling/api/resetPassword/'+id,params)
    },
    /*------ 角色管理 ------*/
    //角色列表
    roleList(params){
        return axios.get('/ling/api/jiangjian/authz/role', {params})
    },
    //判断角色是否存在
    isRole(params){
        return axios.get('/ling/api/jiangjian/authz/role/isExRoleName',{params})
    },
    //新增角色
    roleAdd(params){
        return axios.post('/ling/api/jiangjian/authz/role', params)
    },
    //获取角色信息
    roleDetail(params, id){
        return axios.get('/ling/api/jiangjian/authz/role/' + id, {params})
    },
    //修改角色信息
    roleModify(params){
        return axios.patch('/ling/api/jiangjian/authz/role', params)
    },
    //删除角色
    deleteRole(params, id){
        return axios.delete('/ling/api/jiangjian/authz/role/' + id, params)
    },
    //管理用户-所有用户列表
    getUserList(params){
        return axios.get('/ling/api/jiangjian/authz/role/MUser/', {params})
    },
    //管理用户-选中用户列表
    getPickUser(params, roleId){
        return axios.get('/ling/api/jiangjian/authz/role/MUser/' + roleId, {params})
    },
    //管理用户-确定修改   
    manageUser(params){
        return axios.patch('/ling/api/jiangjian/authz/role/MUser/update', params)
    },
    //管理权限-所有权限列表
    getPrivilegeList(params){
        return axios.get('/ling/api/jiangjian/authz/task/', {params})
    },
    //管理权限-选中权限列表
    getPickPrivilege(params, roleId){
        return axios.get('/ling/api/jiangjian/authz/task/' + roleId, {params})
    },
    //管理权限-确定修改
    managePrivilege(params){
        return axios.patch('/ling/api/jiangjian/authz/task', params)
    },


    //创建供货单
    createSupList(params){
        return axios.post('/ling/api/jiangjian/deliv/delivery', params)
    },
    //查看供货单
    getSupList(params){
        return axios.get('/ling/api/jiangjian/deliv/delivery', {params})
    },
    //查看供货单详情
    getDetail(params,id){
        return axios.get('/ling/api/jiangjian/deliv/delivery/'+id, {params})
    },
    //确认收货
    confirmdeliv(params,id){
        return axios.put('/ling/api/jiangjian/deliv/delivery/'+id+'/receive', params)
    },
    //查看结算单列表
    getSetList(params){
        return axios.get('/ling/api/jiangjian/sett/settlement', { params })
    },
    //生成/更新结算单
    createSettle(params,id){
        return axios.put('/ling/api/jiangjian/sett/settlement/'+ id,params)
    },
    //查看结算单详情
    getSetDetail(params){
        return axios.get('/ling/api/jiangjian/sett/settlement/'+ params )
    },
    //查看结算方式(没有分页)  传递一个string参数
     getSettle(params){
        return axios.get('/ling/api/jiangjian/basic/settle_style',{params})
    },
    //新增结算方式
    addSettle(params){
        return axios.post('/ling/api/jiangjian/basic/settle_style',params)
    },
    //结算方式禁用、启用
    disableSettle(params,id){
        return axios.put('/ling/api/jiangjian/basic/settle_style/'+id+'/enable'+'?enableFlag='+params)
    },
    //删除结算方式
    deleteSettle(params,id){
        return axios.delete('/ling/api/jiangjian/basic/settle_style/'+id,params)
    },
    purorderlist(params){//集团联采订单列表
        return axios.get('/ling/api/jiangjian/order/order',{params})
    },
    purorderdetail(params,id){//集团联采订单详情
        return axios.get('/ling/api/jiangjian/order/order/'+id,{params})
    },
    trialclose(params,id){//审核关闭
        return axios.put('/ling/api/jiangjian/order/order/'+id,params)
    },
    supplydatalist(params){//集团/分公司供货单列表
        return axios.get('/ling/api/jiangjian/deliv/delivery',{params})
    },

    // 付款单
    paylist(params){ //集团/分公司付款单列表
        return axios.get('/ling/api/jiangjian/pay/pay',{params})
    },
    paydetail(params,id){ //集团/分公司付款单详情
        return axios.get('/ling/api/jiangjian/pay/pay/'+id,params)
    },
    payverify(params,id){ //集团/分公司付款单审核
        return axios.put('/ling/api/jiangjian/pay/pay/'+id+'/check',params)
    },

    //登录
    loginIn(params){
        return axios.post('/ling/api/jiangjianLogin',params)
    },
    //退出
    loginOut(){
        return axios.post('/ling/api/jiangjianLogout')
    },
    //修改密码
    changePWD(params,id){
        return axios.put('/ling/api/updatePassword/'+id,params)
    },
    //获取用户信息
    getUserInfo(){
        return axios.get('/ling/api/getUserInfo')
    },

    // 权限
    authzcontroller(params,userId){
        return axios.get('/ling/api/jiangjian/authz/check/permission/'+userId,{params})
    },

    //获取系统消息列表
    getSystemInfo(params){
        return axios.get('/ling/api/jiangjian/message/templete/list',{params})
    },
    // 保存用户消息模板
    saveUserInfo(params){
        return axios.post('/ling/api//jiangjian/message/user/settemp',params)
    },
    //用户接收到的系统消息
    reciveSystemInfo(params){
        return axios.get('/ling/api/jiangjian/message/user/templete',{params})
    },
    // 集团/分公司消息列表
    groupInfoList(params){
        return axios.get('/ling/api/jiangjian/message/list',{params})
    },
    // 标记消息为已读
    signInfoRead(params){
        return axios.get('/ling/api/jiangjian/message/read',{params}) 
    },
    // 批量删除消息
    batchDeleteInfo(params){
        return axios.delete('/ling/api/jiangjian/message/del', params)
    },
    // 数据统计 
    dataStatistics(){
        return axios.get('/ling/api/jiangjian/order/ordercount')
    },
    // 获取分公司采购需求
    companyDemand(params){
        return axios.get('/ling/api/jiangjian/req/branchreq',{params})
    },
    // 获取分公司采购订单
    companyOrder(params){
        return axios.get('/ling/api/jiangjian/order/branchorder',{params})
    },
    // 获取未读消息列表
    getUnread(){
        return axios.get('/ling/api/jiangjian/message/unread/num')
    }

}

 export default api