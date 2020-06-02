<template>
    <div class="userlist">
        <h2 class="align-left">用户管理</h2>
        <el-form :inline="true" align=left>
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
                    <el-option value="1" label="启用"></el-option>
                    <el-option value="0" label="禁用"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="userInquire" class="btn-bg h-32">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="useradd"><el-button type="primary" v-if="dataAuth['F:BJ_USER_CREATE']" @click="userAdd" class="btn-bg w-80">新增</el-button></div>
        <el-table :data="UserDataList" border style="width:100%;" stripe>
            <!-- <el-table-column fixed prop="id" label="id" width="80px" align=center></el-table-column> -->
            <el-table-column prop="account" label="员工账号" align=center></el-table-column>
            <!-- <el-table-column prop="userNo" label="工号" align=center></el-table-column> -->
            <el-table-column prop="userName" label="姓名" width="100px" align=center></el-table-column>
            <el-table-column prop="userMobile" label="手机号码" width="120px" align=center></el-table-column>
            <el-table-column prop="userEmail" label="邮箱" align=center></el-table-column>
            <el-table-column prop="userDeptId" label="部门" align=center></el-table-column>
            <el-table-column prop="userPosition" label="职位" align=center></el-table-column>
            <el-table-column prop="createdAt" label="注册时间" width="160px" align=center></el-table-column>
            <!-- <el-table-column prop="isActive" label="状态" width="80px" align=center></el-table-column> -->
            <el-table-column prop="isActive" label="状态" width="80px" align=center>
                <template slot-scope="scope">{{scope.row.isActive=='1'?'启用':'禁用'}}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="240px" align=center>
                <template slot-scope="scope">
                    <!-- <el-button type="text" size="small" @click="modifyUser(scope.row.id)">修改</el-button> -->
                    <!-- <el-button v-if="scope.row.isActive == '1'" type="text" size="small" @click="disableUser(scope.row.id,scope.row.isActive)">禁用</el-button>
                    <el-button v-else type="text" size="small" @click="disableUser(scope.row.id,scope.row.isActive)">启用</el-button>
                    <el-button type="text" size="small" @click="manageRole(scope.row.id)">角色管理</el-button>
                    <el-button type="text" size="small" @click="resetPWD(scope.row.id)">重置密码</el-button> -->
                    <el-button type="text" size="small" v-if="dataAuth['F:BJ_USER_UPDATE']" @click="modifyUser(scope.row.id)" class="check-text">修改</el-button>
                    <el-button class="check-text" v-if="scope.row.isActive == '1'" v-show="dataAuth['F:BJ_USER_DISABLE']" type="text" size="small" @click="disableUser(scope.row.id,scope.row.isActive)">禁用</el-button>
                    <el-button class="check-text" v-else type="text" size="small" v-show="dataAuth['F:BJ_USER_ENABLE']" @click="disableUser(scope.row.id,scope.row.isActive)">启用</el-button>
                    <el-button class="check-text" type="text" v-if="dataAuth['F:BJ_USER_ROLEMANAGE']" size="small" @click="manageRole(scope.row.id)">角色管理</el-button>
                    <el-button class="check-text" type="text" v-if="dataAuth['F:BJ_USER_PASSWORD']" size="small" @click="resetPWD(scope.row.id)">重置密码</el-button>
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
                <el-button @click="dialogVisibleDisable=false" class="cancel-btn">取消</el-button>
                <el-button type="primary" v-if="dataAuth['F:BJ_USER_ENABLE'] || dataAuth['F:BJ_USER_DISABLE']" @click="disableEnsure" class="btn-mid">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="管理角色" :visible.sync="dislogVisibleRole" width="35%">
            <el-transfer
                filterable
                :data = "roleDataList"
                v-model="userDataRole"
                :titles="['角色列表', '用户角色']"
                >
            </el-transfer>
            <div slot="footer">
                <el-button @click="dislogVisibleRole = false" class="cancel-btn">取 消</el-button>
                <el-button class="btn-mid" type="primary" v-if="dataAuth['F:BJ_USER_ROLEMANAGE_APPROVE']" @click="manageEnsure">确 定</el-button>
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
                <el-button @click="dislogVisibleResetPWD = false" class="cancel-btn">取 消</el-button>
                <el-button class="btn-mid" type="primary" v-if="dataAuth['F:BJ_USER_PASSWORD_APPROVE']" @click="resetEnsure('resetForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import privilegeApi from '../../request/api.js'
export default {
    name: 'userManager',
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
                ensurepwd: '',
            },
            dataAuth:{
               
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
        this.dataAuth = this.$store.state.authData;

        this.userList();
        this.deptList();
    },
    methods: {
        //用户列表
        deptList(){
            privilegeApi.deptList()
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.UserDataList.forEach(item1=>{
                            let findIndex = result.data.filter(item2=>{
                                return item2.id == item1.userDeptId
                            })
                            if(findIndex[0]){

                                item1.userDeptId = findIndex[0].deptName;
                            }
                        })
                    }else{
                        this.$message.error('获取部门列表失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        userList(){
            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                account: this.inquireAccount,
                userMobile: this.inquirePhone,
                isActive: this.inquireState==''?this.inquireState:parseInt(this.inquireState) // 0 启用  1 禁用
            };
            privilegeApi.userList(params)
                .then(response => {
                    if(response.data.code == 0){
                        this.UserDataList = response.data.data.records;
                        this.pageTotal = response.data.data.total;
                    }else{
                        this.$message.error('获取用户列表失败！');
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
            this.userList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.userList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.userList();
        },
        //查询
        userInquire(){
            this.pageNum = 1;
            this.userList();
        },
        //新增
        userAdd(){
            this.$router.push({name: 'userManagerAdd'});
        },
        //修改
        modifyUser(id){
            this.$router.push({name: 'userManagerModify',params:{id: id}});
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
            const params = {
                isActive: this.UserState
            };
            privilegeApi.disableUser(params,id)
                .then(response => {
                    if(response.data.code == 0){
                        if(this.UserState == 0){
                            this.$message.success('禁用成功！');
                        }else{
                            this.$message.success('启用成功！');
                        }
                        this.userInquire();
                        this.dialogVisibleDisable = false;
                    }else{
                        if(this.UserState == 0){
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
            privilegeApi.getRoleList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        const roleList = result.data;
                        this.roleDataList = roleList.map(item => {
                            return{
                                key: item.id,
                                label: item.roleName,
                                disable: ''
                            }
                        })
                    }else{
                        this.$message.error('获取角色列表失败！');
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
            const userId = this.UserId;
            privilegeApi.getUserRoleList(params, userId)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        const userRoleList = result.data;
                        for(let i = 0; i < userRoleList.length; i++){
                            this.userDataRole.push(userRoleList[i].id);
                        }
                    }else{
                        this.$message.error('获取用户角色列表失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        manageEnsure(){
            const params = {
                userId: this.UserId,
                roleIds: this.userDataRole
            };
            privilegeApi.modifyUserRole(params)
                .then(response => {
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
            const params = {
                newPassword: this.resetForm.newpwd,
            };
            this.$refs[resetForm].validate((valid) => {
                if (valid) {
                    this.$api.resetPWD(params,id)
                        .then(response => {
                            if(response.data.code == 0){
                                this.$message.success('重置密码成功！');
                                this.dislogVisibleResetPWD = false;
                                this.userInquire();
                            }else{
                                this.$message.error('重置密码失败！');
                                this.dislogVisibleResetPWD = false;
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                            this.dislogVisibleResetPWD = false;
                        })
                }else{
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
}
</style>

<style lang="less">
.userlist{
    .title{
        font-weight: bold;
        font-size:26px;
        text-align: left;
    }
    .useradd{
        float: left;
        margin-bottom: 10px;
    }
    .pagination{
        margin-top: 20px;
    }
}
.el-dialog__header {
    background: #0066CC !important; 
    text-align: left !important;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.el-dialog__title{
    color:#fff;
}
.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
}
</style>

