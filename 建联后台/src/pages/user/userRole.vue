<template>
    <div class="rolelist">
        <h2 class="align-left">权限管理</h2>
        <div class="roleadd"><el-button type="primary" v-if="dataAuth['F:BJ_AUTHZ_CREATE']" @click="addRole" class="btn-bg w-80">新增</el-button></div>
        <el-table :data="RoleDataList" border style="width:100%;" stripe>
            <el-table-column prop="id" label="id" align=center width="150px"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" align=center></el-table-column>
            <el-table-column prop="roleDesc" label="描述" align=center></el-table-column>
            <el-table-column label="操作" width="240px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" v-if="dataAuth['F:BJ_AUTHZ_UPDATE']" @click="modifyRole(scope.row.id)" class="check-text">修改</el-button>
                    <el-button type="text" size="small" v-if="dataAuth['F:BJ_AUTHZ_DELETE']" @click="deleteRole(scope.row.id)" class="check-text">删除</el-button>
                    <el-button type="text" size="small" v-if="dataAuth['F:BJ_AUTHZ_USERMANAGE']" @click="manageUser(scope.row.id)" class="check-text">管理用户</el-button>
                    <el-button type="text" size="small" v-if="dataAuth['F:BJ_AUTHZ_AUTHZMANAGE']" @click="managePrivilege(scope.row.id)" class="check-text">管理权限</el-button>
                    <!-- <el-button type="text" size="small"  @click="modifyRole(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small"  @click="deleteRole(scope.row.id)">删除</el-button>
                    <el-button type="text" size="small" @click="manageUser(scope.row.id)">管理用户</el-button>
                    <el-button type="text" size="small" @click="managePrivilege(scope.row.id)">管理权限</el-button> -->
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
                <el-button @click="dialogVisibleDelete=false" class="cancel-btn">取消</el-button>
                <el-button class="btn-mid" type="primary" v-if="dataAuth['F:BJ_AUTHZ_DELETE_APPROVE']" @click="ensureDelete">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="管理用户" :visible.sync="dislogVisibleUser" width="42%">
            <el-transfer
                filterable
                :data = "UserDataList"
                v-model="RoleDataUser"
                :titles="['用户列表', '选中用户']">
            </el-transfer>
            <div slot="footer">
                <el-button @click="dislogVisibleUser = false" class="cancel-btn">取 消</el-button>
                <el-button class="btn-mid" type="primary" v-if="dataAuth['F:BJ_AUTHZ_USERMANAGE_APPROVE']" @click="ensureUser">确 定</el-button>
                <!-- <el-button type="primary" v-if="dataAuth['F:BJ_AUTHZ_USERMANAGE_APPROVE']" @click="ensureUser">确 定</el-button> -->

            </div>
        </el-dialog>
        <el-dialog title="管理权限" :visible.sync="dislogVisiblePrivilege" width="42%">
            <el-transfer
                filterable
                :data = "privilegeDataList"
                v-model="pickDataPrivilege"
                :titles="['权限列表', '选中权限']">
            </el-transfer>
            <div slot="footer">
                <el-button @click="dislogVisiblePrivilege = false" class="cancel-btn">取 消</el-button>
                <el-button class="btn-mid" type="primary" v-if="dataAuth['F:BJ_AUTHZ_AUTHZMANAGE_APPROVE']" @click="ensurePrivilege">确 定</el-button>
                <!-- <el-button type="primary"  @click="ensurePrivilege">确 定</el-button> -->

            </div>
        </el-dialog>
    </div>
</template>

<script>
import privilegeApi from '../../request/api.js'
export default {
    name: 'userRole',
    data() {
        return{
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
            pickDataPrivilege: [],
            dataAuth:{
         
            }
        }
    },
    mounted(){
        this.roleList();
        this.dataAuth = this.$store.state.authData;

    },
    methods: {
        //角色列表
        roleList(){
            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
            };
            privilegeApi.roleList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.RoleDataList = result.data.records;
                        this.pageTotal = result.data.total;
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
            this.$router.push({name:'userRoleAdd'});
        },
        //修改
        modifyRole(id){
            this.$router.push({name:'userRoleModify', params:{id: id}});
        },
        //删除
        deleteRole(id){
            this.RoleId = id;
            this.dialogVisibleDelete = true;
        },
        ensureDelete(){
            const params = {};
            const id = this.RoleId;
            privilegeApi.deleteRole(params, id)
                .then(response => {
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
            privilegeApi.getUserList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        const userList = result.data;
                        this.UserDataList = userList.map(item => {
                            return{
                                key: item.id,
                                label: item.account,
                                disable: ''
                            }
                        })
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
        //获取选中用户
        getPickUser(){
            const params = {};
            const roleId = this.RoleId;
            privilegeApi.getPickUser(params, roleId)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        const pickUserList = result.data;
                        for(let i = 0; i < pickUserList.length; i++){
                            this.RoleDataUser.push(pickUserList[i].id);
                        }
                    }else{
                        this.$message.error('获取选中用户列表失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        ensureUser(){
            const params = {
                userIds: this.RoleDataUser,
                roleId: this.RoleId
            };
            privilegeApi.manageUser(params)
                .then(response => {
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
            privilegeApi.getPrivilegeList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        const privilegeList = result.data;
                        this.privilegeDataList = privilegeList.map(item => {
                            return{
                                key: item.id,
                                label: item.taskName,
                                disable: ''
                            }
                        })
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
        //获取选中权限
        getPickPrivilege(){
            const params = {};
            const roleId = this.RoleId;
            privilegeApi.getPickPrivilege(params, roleId)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        const pickPrivilegeList = result.data;
                        for(let i = 0; i < pickPrivilegeList.length; i++){
                            this.pickDataPrivilege.push(pickPrivilegeList[i].id);
                        }
                    }else{
                        this.$message.error('获取选中用户列表失败！');
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
            privilegeApi.managePrivilege(params)
                .then(response => {
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

<style>
.el-transfer-panel{
    text-align: left;
}
</style>

<style lang="less" scoped>
.rolelist{
    .title{
        font-weight: bold;
        text-align: left;
        font-size:26px;
    }
    .roleadd{
        float: left;
        margin-bottom: 10px;
    }
    .pagination{
        margin-top: 20px;
    }
}
</style>

