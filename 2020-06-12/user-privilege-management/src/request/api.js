/*
 *api接口统一管理
 */
import axios from './request.js'

const api = {
    upload_file_url: 'http://', //上传附件

    //权限
    authzcontroller(params){
        return axios.get('/longan/api/authz/perm/emp/map', {params})
    },

    //修改密码
    pwdModify(params, id){
        return axios.put('/longan/api/user/emp/modifyPW/' + id, params)
    },

    /*------ 用户管理 ------*/
    //判断员工账号是否存在
    isAccount(params){
        return axios.get('/longan/api/user/emp/isExistEmpName',{params})
    },
    //用户添加
    userAdd(params){
        return axios.post('/longan/api/user/emp',params)
    },
    //用户列表 - 用户查询
    userList(params){
        return axios.get('/longan/api/user/emp',{params})
    },
    //用户查询
    // userInquire(params){
    //     return axios.post('',params)
    // },
    //用户修改
    userDetail(params, id){
        return axios.get('/longan/api/user/emp/' + id, {params})
    },
    userModify(params){
        return axios.put('/longan/api/user/emp', params)
    },
    //用户禁用、启用
    disableUser(params, id){
        return axios.patch('/longan/api/user/emp/updateEmpStatus/' + id, params)
    },
    //角色管理 - 角色列表
    getRoleList(params){
        return axios.get('/longan/api/authz/empRole', {params})
    },
    //角色管理 - 用户角色列表
    getUserRoleList(params, empId){
        return axios.get('/longan/api/authz/empRole/' + empId, {params})
    },
    //角色管理 - 修改用户角色
    modifyUserRole(params){
        return axios.patch('/longan/api/authz/empRole', params)
    },
    //重置密码
    resetPWD(params, id){
        return axios.patch('/longan/api/user/emp/resetPassword/' + id, params)
    },

    /*------ 角色管理 ------*/
    //角色列表
    roleList(params){
        return axios.get('/longan/api/authz/role', {params})
    },
    //判断角色是否存在
    isRole(params){
        return axios.get('/longan/api/authz/role/isExRoleName',{params})
    },
    //新增角色
    roleAdd(params){
        return axios.post('/longan/api/authz/role', params)
    },
    //获取角色信息
    roleDetail(params, id){
        return axios.get('/longan/api/authz/role/' + id, {params})
    },
    //修改角色信息
    roleModify(params){
        return axios.patch('/longan/api/authz/role', params)
    },
    //删除角色
    deleteRole(params, id){
        return axios.delete('/longan/api/authz/role/' + id, params)
    },
    //管理用户-所有用户列表
    getUserList(params){
        return axios.get('/longan/api/authz/role/MEmp', {params})
    },
    //管理用户-选中用户列表
    getPickUser(params, roleId){
        return axios.get('/longan/api/authz/role/MEmp/' + roleId, {params})
    },
    //管理用户-确定修改   
    manageUser(params){
        return axios.patch('/longan/api/authz/role/MEmp/update', params)
    },
    //管理权限-所有权限列表
    getPrivilegeList(params){
        return axios.get('/longan/api/authz/task', {params})
    },
    //管理权限-选中权限列表
    getPickPrivilege(params, roleId){
        return axios.get('/longan/api/authz/task/' + roleId, {params})
    },
    //管理权限-确定修改
    managePrivilege(params){
        return axios.patch('/longan/api/authz/task', params)
    }

}

export default api
