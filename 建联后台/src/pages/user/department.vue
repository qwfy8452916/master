<template>
    <div class="deptlist">
        <h2 class="align-left">部门管理</h2>
        <div class="deptadd"><el-button type="primary" @click="deptAdd" v-if="dataAuth['F:BJ_USERDEPART_CREATE']" class="btn-bg w-80">新增</el-button></div>
        <el-table :data="deptDataList" border style="width:100%;" stripe>
            <el-table-column prop="id" label="id" align=center></el-table-column>
            <el-table-column prop="deptName" label="部门名称" align=center></el-table-column>
            <el-table-column prop="deptDesc" label="部门描述" align=center></el-table-column>
            <el-table-column prop="deptRole" label="部门角色" align=center></el-table-column>
            <el-table-column prop="deptType" label="部门类型" align=center></el-table-column>
            <el-table-column prop="parentId" label="上级部门" align=center></el-table-column>
            <el-table-column label="操作" width="240px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" v-if="dataAuth['F:BJ_USERDEPART_UPDATE']" @click="modifyDept(scope.row.id)" class="check-text">修改</el-button>
                    <el-button type="text" size="small" v-if="dataAuth['F:BJ_USERDEPART_DELETE']" @click="deleteDept(scope.row.id)" class="check-text">删除</el-button>
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
            <span>是否确认删除该部门？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false" class="cancel-btn">取消</el-button>
                <el-button type="primary" v-if="dataAuth['F:BJ_USERDEPART_DELETE_APPROVE']" @click="ensureDelete" class="btn-mid">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import privilegeApi from '../../request/api.js'
export default {
    name: 'department',
    data() {
        return{
            deptId: '',
            deptDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            dialogVisibleDelete: false,
            deptDataUser: [],
            privilegeDataList: [],
            dataAuth:{}
                
        }
    },
    mounted(){
        this.dataAuth = this.$store.state.authData;

        this.deptList();
    },
    methods: {
        //部门列表
        deptList(){
            const params = {
                pageNo: this.pageNum,
                pageSize: 10
            };
            privilegeApi.deptList(params)
                .then(response => {

                    const result = response.data;
                    if(result.code == '0'){
                         this.deptDataList = result.data.map(item=>{
                            var roleArr='';
                            for(let i=0;i<item.deptRoles.length;i++){
                                roleArr+=  item.deptRoles[i].roleName +'、';                           
                            }                           
                            item.deptRole = roleArr;  
                            return item;                         
                        });
                        this.pageTotal = result.data.total;
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
        current(){
            this.pageNum = this.currentPage;
            this.deptList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.deptList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.deptList();
        },
        //新增
        deptAdd(){
            this.$router.push({name: 'departmentAdd'});
        },
        //修改
        modifyDept(id){
            this.$router.push({path:"/user/departmentModify/"+id});
            // this.$router.push({name: 'departmentModify', params:{id: id}});
        },
        //删除
        deleteDept(id){
            this.deptId = id;
            this.dialogVisibleDelete = true;
        },
        ensureDelete(){
            const params = {};
            const id = this.deptId;
            privilegeApi.deleteDept(params, id)
                .then(response => {

                    const result = response.data;
                    if(result.code == '0'){
                        this.dialogVisibleDelete = false;
                        this.$message.success('部门删除成功！');
                        this.deptList();
                    }else{
                        this.dialogVisibleDelete = false;
                        this.$message.error('部门删除失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        }
    }
}
</script>

<style>
.el-transfer-panel{
    text-align: left;
}
</style>

<style lang="less" scoped>
.deptlist{
    .title{
        font-weight: bold;
        font-size:26px;
        text-align: left;
    }
    .deptadd{
        float: left;
        margin-bottom: 10px;
    }
    .pagination{
        margin-top: 20px;
    }
}
</style>

