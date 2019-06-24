/**
 * api接口统一管理
 */

import axios from './http.js'

const api = {
    /**
     * 公共api
     */


    login(params){
        return axios.post('https://oapi.zhuniu.com/api/backend/admin/login',params)
    },
    upload_file_url: '/ling/api/share/basic/file/upload', //上传附件

    orderList(data) { //筑牛订单列表
      return axios.get('/ling/api/zhuniu/order/order', data)
    },

    regionList(params){//地址接口
        return axios.get('/ling/api/share/basic/dict/item',{params})
    },

    getProudctSelect(id){//产品分类
        return axios.get('/ling/api/share/basic/proClass/'+id)
    },

    getProudctName(params){//产品分类获取名字
        return axios.get('/ling/api/share/basic/proClass',{params})
    },

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
    deptDetail(params, id){
        return axios.get('/ling/api/jiangjian/basic/dept/' + id, {params})
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
        return axios.put('/ling/api/jiangjian/user/password/' + id, params)
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
    //查看结算方式(没有分页)  传递一个string参数
    getSettle(params){
        return axios.get('http://192.168.1.96:9012/ling/api/jiangjian/basic/settle_style?isActive='+params)
    },
    //新增结算方式
    addSettle(params){
        return axios.post('http://192.168.1.96:9012/ling/api/jiangjian/basic/settle_style',params)
    },
    //结算单禁用、启用
    disableSettle(params,id){
        return axios.put('/ling/api/jiangjian/basic/settle_style/'+id+'/enable/?enableFlag='+params)
    },
    //删除结算单
    deleteSettle(params,id){
        return axios.delete('/ling/api/jiangjian/basic/settle_style/'+id,params)
    },
    //创建供货单
    createSupList(params){
        return axios.post('http://192.168.1.96:9012/ling/api/jiangjian/deliv/delivery', params)
    },
    //查看供货单
    getSupList(params){
        return axios.get('http://192.168.1.96:9012/ling/api/jiangjian/deliv/delivery', params)
    },
    purorderlist(params){//集团联采订单列表
        return axios.get('http://192.168.1.64:9012/ling/api/jiangjian/order/order',params)
    },
    purorderdetail(params,id){//筑牛订单详情
        return axios.get('/ling/api/zhuniu/order/order/'+id,params)
    },

}

 export default api
