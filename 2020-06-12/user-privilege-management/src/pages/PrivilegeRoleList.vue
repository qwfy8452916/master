<template>
    <div class="rolelist">
        <div v-if="authzData['F:CM_AUTHZ_ROLE_ADD']"><el-button class="addbutton" @click="addRole">新&nbsp;&nbsp;增</el-button></div>
        <el-table :data="RoleDataList" border stripe style="width:100%;" >
            <el-table-column prop="id" label="id" width="80px" align=center></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="roleDesc" label="描述"></el-table-column>
            <el-table-column label="操作" width="240px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:CM_AUTHZ_ROLE_EDIT'] && scope.row.isSys == 0" type="text" size="small" @click="modifyRole(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:CM_AUTHZ_ROLE_DELETE'] && scope.row.isSys == 0" type="text" size="small" @click="deleteRole(scope.row.id)">删除</el-button>
                    <el-button v-if="authzData['F:CM_AUTHZ_ROLE_USER']" type="text" size="small" @click="manageUser(scope.row.id)">管理用户</el-button>
                    <el-button v-if="authzData['F:CM_AUTHZ_ROLE_AUTHZ'] && scope.row.isSys == 0" type="text" size="small" @click="managePrivilege(scope.row.id)">管理权限</el-button>
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
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该用户？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="ensureDelete">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="管理用户" :visible.sync="dislogVisibleUser" width="52%">
            <el-transfer
                filterable
                :data = "UserDataList"
                v-model="RoleDataUser"
                :titles="['用户列表', '选中用户']">
            </el-transfer>
            <div slot="footer">
                <el-button @click="dislogVisibleUser = false">取 消</el-button>
                <el-button v-if="authzData['F:CM_AUTHZ_USER_SUBMIT']" type="primary" @click="ensureUser">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="管理权限" :visible.sync="dislogVisiblePrivilege" width="52%">
            <el-transfer
                filterable
                :data = "privilegeDataList"
                v-model="pickDataPrivilege"
                :titles="['权限列表', '选中权限']">
            </el-transfer>
            <div slot="footer">
                <el-button @click="dislogVisiblePrivilege = false">取 消</el-button>
                <el-button v-if="authzData['F:CM_AUTHZ_AUTHZ_SUBMIT']" type="primary" @click="ensurePrivilege">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import privilegeApi from '../request/api.js'
import privilegeJuris from '../request/jurisdiction.js'
export default {
    name: 'PrivilegeRoleList',
    data() {
        return{
            authzData: '',
            // orgType: '',
            // orgId: '',
            RoleId: '',
            RoleDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            dialogVisibleDelete: false,
            dislogVisibleUser: false,
            UserDataList: [],
            RoleDataUser: [],
            dislogVisiblePrivilege: false,
            privilegeDataList: [],
            pickDataPrivilege: []
        }
    },
    mounted(){
        (privilegeJuris.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgType = localStorage.getItem('orgType');
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.roleList();
    },
    methods: {
        //角色列表
        roleList(){
            const params = {
                pageNo: this.pageNum,
                pageSize: 10
            };
            privilegeApi.roleList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.RoleDataList = result.data.records;
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
            this.roleList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.roleList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.roleList();
        },
        //新增
        addRole(){
            this.$emit('role-add');
        },
        //修改
        modifyRole(id){
            this.$emit('role-modify', id)
        },
        //删除
        deleteRole(id){
            this.RoleId = id;
            this.dialogVisibleDelete = true;
        },
        ensureDelete(){
            const paramsDelete = {};
            const id = this.RoleId;
            privilegeApi.deleteRole(paramsDelete, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.dialogVisibleDelete = false;
                        this.$message.success('角色删除成功！');
                        this.roleList();
                    }else{
                        this.dialogVisibleDelete = false;
                        this.$message.error('角色删除失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //管理用户
        manageUser(id){
            this.RoleId = id;
            this.UserDataList = [];
            this.RoleDataUser = [];
            this.getUserList();
            this.getPickUser();
            this.dislogVisibleUser = true;
        },
        //获取用户列表
        getUserList(){
            const params = {};
            // const orgId = this.orgId;
            // console.log(orgId);
            privilegeApi.getUserList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const userList = result.data;
                        if(userList != null){
                            this.UserDataList = userList.map(item => {
                                return{
                                    key: item.id,
                                    label: item.empName +'（'+ item.account +'）',
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
        //获取选中用户
        getPickUser(){
            const params = {};
            // const orgId = this.orgId;
            const roleId = this.RoleId;
            // console.log(orgId, roleId);
            privilegeApi.getPickUser(params, roleId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const pickUserList = result.data;
                        if(pickUserList != null){
                            for(let i = 0; i < pickUserList.length; i++){
                                this.RoleDataUser.push(pickUserList[i].id);
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
        ensureUser(){
            // var paramsUser;
            // if(this.orgType == 2){
            //     paramsUser = {
            //         empIds: this.RoleDataUser,
            //         roleId: this.RoleId,
            //         encryOrgId: this.orgId
            //     };
            // }else{
            //     paramsUser = {
            //         empIds: this.RoleDataUser,
            //         roleId: this.RoleId,
            //         encryOtherId: this.orgId
            //     };
            // }
            const paramsUser = {
                    empIds: this.RoleDataUser,
                    roleId: this.RoleId
                };
            // console.log(params);
            privilegeApi.manageUser(paramsUser)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('管理用户成功！');
                        this.dislogVisibleUser = false;
                    }else{
                        this.$message.error('管理用户失败！');
                        this.dislogVisibleUser = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //管理权限
        managePrivilege(id){
            this.RoleId = id;
            this.privilegeDataList = [];
            this.pickDataPrivilege = [];
            this.getPrivilegeList();
            this.getPickPrivilege();
            this.dislogVisiblePrivilege = true;
        },
        //获取权限列表
        getPrivilegeList(){
            const params = {};
            // const orgId = this.orgId;
            // console.log(orgId);
            privilegeApi.getPrivilegeList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const privilegeList = result.data;
                        if(privilegeList != null){
                            this.privilegeDataList = privilegeList.map(item => {
                                return{
                                    key: item.id,
                                    label: item.taskName,
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
        //获取选中权限
        getPickPrivilege(){
            const params = {};
            // const orgId = this.orgId;
            const roleId = this.RoleId;
            // console.log(orgId, roleId);
            privilegeApi.getPickPrivilege(params, roleId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const pickPrivilegeList = result.data;
                        if(pickPrivilegeList != null){
                            for(let i = 0; i < pickPrivilegeList.length; i++){
                                this.pickDataPrivilege.push(pickPrivilegeList[i].id);
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
        ensurePrivilege(){
            const params = {
                taskIds: this.pickDataPrivilege,
                roleId: this.RoleId
            };
            // console.log(params);
            privilegeApi.managePrivilege(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('管理权限成功！');
                        this.dislogVisiblePrivilege = false;
                    }else{
                        this.$message.error('管理权限失败！');
                        this.dislogVisiblePrivilege = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
    }
}
</script>

<style lang="less" scoped>
.rolelist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

