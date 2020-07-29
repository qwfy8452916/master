<template>
    <div class="userlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="员工账号">
                <el-input v-model="inquireAccount"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="inquirePhone"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <!-- <el-input v-model="inquireState"></el-input> -->
                <el-select v-model="inquireState">
                    <el-option value="" label="全部"></el-option>
                    <el-option value="0" label="启用"></el-option>
                    <el-option value="1" label="禁用"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="userInquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <div v-if="authzData['F:CM_USER_USER_ADD']"><el-button class="addbutton" @click="userAdd">新&nbsp;&nbsp;增</el-button></div>
        <el-table :data="UserDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="id" width="80px" align=center></el-table-column>
            <el-table-column prop="account" label="员工账号"></el-table-column>
            <el-table-column prop="empNo" label="工号"></el-table-column>
            <el-table-column prop="empName" label="姓名"></el-table-column>
            <el-table-column prop="empMobile" label="手机号码" width="120px" align="center"></el-table-column>
            <el-table-column prop="empEmail" label="邮箱"></el-table-column>
            <el-table-column prop="createdAt" label="注册时间" width="160px" align="center"></el-table-column>
            <el-table-column prop="isLocked" label="状态" width="80px" align="center">
                <template slot-scope="scope">{{scope.row.isLocked=='0'?'启用':'禁用'}}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:CM_USER_USER_EDIT']" type="text" size="small" @click="modifyUser(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:CM_USER_USER_USING'] && scope.row.isLocked == '0'" type="text" size="small" @click="disableUser(scope.row.id,scope.row.isLocked)">禁用</el-button>
                    <el-button v-if="authzData['F:CM_USER_USER_USING'] && scope.row.isLocked == '1'" type="text" size="small" @click="disableUser(scope.row.id,scope.row.isLocked)">启用</el-button>
                    <el-button v-if="authzData['F:CM_USER_USER_ROLE']" type="text" size="small" @click="manageRole(scope.row.id)">角色管理</el-button>
                    <el-button v-if="authzData['F:CM_USER_USER_RESETPWD']" type="text" size="small" @click="resetPWD(scope.row.id)">重置密码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="10"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibleDisable" width="30%">
            <span>确定修改用户状态？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDisable=false">取消</el-button>
                <el-button type="primary" @click="disableEnsure">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="管理角色" :visible.sync="dislogVisibleRole" width="52%">
            <el-transfer
                filterable
                :data = "roleDataList"
                v-model="userDataRole"
                :titles="['角色列表', '用户角色']"
                >
            </el-transfer>
            <div slot="footer">
                <el-button @click="dislogVisibleRole = false">取 消</el-button>
                <el-button v-if="authzData['F:CM_USER_ROLE_SUBMIT']" type="primary" @click="manageEnsure">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="重置密码" :visible.sync="dislogVisibleResetPWD" width="30%">
            <el-form :model="resetForm" :rules="resetRules" ref="resetForm" label-width="80px">
                <el-form-item label="新密码" prop="newpwd">
                    <el-input type="password" v-model.trim="resetForm.newpwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="ensurepwd">
                    <el-input type="password" v-model.trim="resetForm.ensurepwd"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleResetPWD = false">取 消</el-button>
                <el-button type="primary" @click="resetEnsure('resetForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import privilegeApi from '../request/api.js'
import privilegeJuris from '../request/jurisdiction.js'
export default {
    name: 'PrivilegeUserList',
    data() {
        var validateNewPwd = (rule,value,callback) =>{
            if(!value){
                callback(new Error('请输入新密码'));
            }else if(value.toString().length < 6 || value.toString().length > 18){
                callback(new Error('密码长度为6 ~ 18个字符'));
            }else{
                callback();
            }
        };
        var validateEnsurePwd = (rule,value,callback) =>{
            if(value === ''){
                callback(new Error('请再次输入密码'));
            }else if(value !== this.resetForm.newpwd){
                callback(new Error('两次输入密码不一致！'));
            }else{
                callback();
            }
        };
        return{
            authzData: '',
            // orgType: '',
            // orgId: '',
            inquireAccount: '',
            inquirePhone: '',
            inquireState: '',
            UserDataList: [],
            UserId: '',
            UserState: '',
 
            roleDataList: [],
            userDataRole: [],

            dialogVisibleDisable: false,
            dislogVisibleRole: false,
            dislogVisibleResetPWD: false,
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            //重置密码
            resetForm: {
                newpwd: '',
                ensurepwd: ''
            },
            resetRules: {
                newpwd: [
                    {required: true, validator: validateNewPwd, trigger: ['blur','change']}
                ],
                ensurepwd: [
                    {required: true, validator: validateEnsurePwd, trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (privilegeJuris.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        // this.orgType = localStorage.getItem('orgType');
        this.userList(1);
    },
    methods: {
        //用户列表
        userList(page){
            const params = {
                pageNo: page,
                pageSize: 10,
                account: this.inquireAccount,
                empMobile: this.inquirePhone,
                isLocked: this.inquireState,     // 0 启用  1 禁用
                // orgId: privilegeApi.orgId
                // orgId: this.orgId
            };
            privilegeApi.userList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == 0){
                        this.UserDataList = result.data.records;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        current(){
            this.pageNum = this.currentPage;
            this.userList(this.pageNum);
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.userList(this.pageNum);
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.userList(this.pageNum);
        },
        //查询
        userInquire(){
            this.pageNum = 1;
            this.userList(this.pageNum);
        },
        //新增
        userAdd(){
            this.$emit('user-add');
        },
        //修改
        modifyUser(id){
            this.$emit('user-modify', id)
            // privilegeRouter.push({name:'PrivilegeUserModify', params:{id: id}});
        },
        //禁用、启用
        disableUser(id,state){
            this.UserId = id;
            if(state == 0){
                this.UserState = 1;
            }else{
                this.UserState = 0;
            }
            this.dialogVisibleDisable = true;
        },
        disableEnsure(){
            const id = this.UserId;
            // var params;
            // if(this.orgType == 2){
            //     params = {
            //         isLocked: this.UserState,
            //         encryOrgId: this.orgId
            //     };
            // }else{
            //     params = {
            //         isLocked: this.UserState,
            //         encryOtherId: this.orgId
            //     };
            // }
            const params = {
                isLocked: this.UserState,
            };
            // console.log(id,params);
            privilegeApi.disableUser(params,id)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == 0){
                        if(this.UserState == 1){
                            this.$message.success('禁用成功！');
                        }else{
                            this.$message.success('启用成功！');
                        }
                        this.userList(this.pageNum);
                        this.dialogVisibleDisable = false;
                    }else{
                        if(this.UserState == 1){
                            this.$message.error('禁用失败！');
                        }else{
                            this.$message.error('启用失败！');
                        }
                        this.dialogVisibleDisable = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                    this.dialogVisibleDisable = false;
                })
        },
        //角色管理
        manageRole(id){
            this.UserId = id;
            this.roleDataList = [];
            this.userDataRole = [];
            this.getRoleList();
            this.getUserRoleList();
            this.dislogVisibleRole = true;
        },
        //获取角色列表
        getRoleList(){
            const params = {};
            // const orgId = this.orgId;
            // console.log(orgId);
            privilegeApi.getRoleList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const roleList = result.data;
                        if(roleList != null){
                            this.roleDataList = roleList.map(item => {
                                return{
                                    key: item.id,
                                    label: item.roleName,
                                    disable: ''
                                }
                            })
                        } 
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //获取用户拥有的角色列表
        getUserRoleList(){
            const params = {};
            // const orgId = this.orgId;
            const empId = this.UserId;
            // console.log(empId);
            privilegeApi.getUserRoleList(params, empId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const userRoleList = result.data;
                        if(userRoleList != null){
                            for(let i = 0; i < userRoleList.length; i++){
                                this.userDataRole.push(userRoleList[i].id);
                            }
                        }
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        manageEnsure(){
            // console.log(this.roleDataList);
            // console.log(this.userDataRole);
            // var paramsRole;
            // if(this.orgType == 2){
            //     paramsRole = {
            //         empId: this.UserId,
            //         roleIds: this.userDataRole,
            //         encryOrgId: this.orgId
            //     };
            // }else{
            //     paramsRole = {
            //         empId: this.UserId,
            //         roleIds: this.userDataRole,
            //         encryOtherId: this.orgId
            //     };
            // }
            const paramsRole = {
                empId: this.UserId,
                roleIds: this.userDataRole
            };
            // console.log(params);
            privilegeApi.modifyUserRole(paramsRole)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('角色管理成功！');
                        this.dislogVisibleRole = false;
                    }else{
                        this.$message.error('角色管理失败！');
                        this.dislogVisibleRole = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //重置密码
        resetPWD(id){
            this.resetForm.newpwd = '';
            this.resetForm.ensurepwd = '';
            this.UserId = id;
            this.dislogVisibleResetPWD = true;
        },
        resetEnsure(resetForm){
            const id = this.UserId;
            // var paramsPWD;
            // if(this.orgType == 2){
            //     paramsPWD = {
            //         newPassword: this.resetForm.newpwd,
            //         encryOrgId: this.orgId
            //     };
            // }else{
            //     paramsPWD = {
            //        newPassword: this.resetForm.newpwd,
            //         encryOtherId: this.orgId
            //     };
            // }
            const paramsPWD = {
                newPassword: this.resetForm.newpwd
            };
            // console.log(id,params);
            this.$refs[resetForm].validate((valid) => {
                if (valid) {
                    privilegeApi.resetPWD(paramsPWD,id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                this.$message.success('重置密码成功！');
                                this.dislogVisibleResetPWD = false;
                            }else{
                                this.$message.error(result.msg);
                                this.dislogVisibleResetPWD = false;
                            }
                        })
                        .catch(error => {
                            this.dislogVisibleResetPWD = false;
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    // console.log('error!');
                    return false
                }
            })
        }
    }
}
</script>

<style>
.el-dialog__header{
    text-align: left;
}
.el-transfer-panel{
    text-align: left;
    width: 320px !important;
    height: 413px !important;
}
.el-transfer-panel__body{
    height: 356px !important;
}
.el-transfer-panel__list.is-filterable{
    height: 304px !important;
}
.el-form--inline .el-form-item{
    margin-left: 15px;
}
</style>

<style lang="less" scoped>
.userlist{
    .searchform{
        background: #f2f2f2;
        padding-top: 20px;
    }
    .pagination{
        margin-top: 20px;
    }
}
</style>

