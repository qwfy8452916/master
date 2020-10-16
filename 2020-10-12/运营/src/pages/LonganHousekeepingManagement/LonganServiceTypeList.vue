<template>
    <div class="servicetypelist">
        <div v-if="authzData['F:BO_RMSVC_TYPE_ADD']"><el-button class="addbutton" @click="serviceTypeAdd">添加服务类型</el-button></div>
        <el-table :data="ServiceTypeDataList" border style="width:100%;" >
            <el-table-column prop="iconUrl" label="图片" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.iconUrl" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="服务类型"></el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_RMSVC_TYPE_EDIT']" type="text" size="small" @click="ModifyServiceType(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_RMSVC_TYPE_DELETE']" type="text" size="small" @click="DeleteServiceType(scope.row.id)">删除</el-button>
                    <!-- <el-button v-if="authzData['F:BO_RMSVC_TYPE_DETAILTPL']" type="text" size="small" @click="detailServiceType(scope.row.id)">明细模板</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该服务类型？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganServiceTypeList',
    data(){
        return{
            authzData: '',
            stId: '',
            ServiceTypeDataList: [],
            dialogVisibleDelete: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.serviceTypeList();
    },
    methods: {
        //服务类型列表
        serviceTypeList(){
            const params = {};
            // console.log(params);
            this.$api.serviceTypeList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.ServiceTypeDataList = result.data;
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
        //新增
        serviceTypeAdd(){
            this.$router.push({name:'LonganServiceTypeAdd'});
        },
        //修改
        ModifyServiceType(id){
            this.$router.push({name:'LonganServiceTypeModify', query: {id}});
        },
        //删除
        DeleteServiceType(id){
            this.stId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const id = this.stId;
            const params = {};
            this.$api.serviceTypeDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('删除服务类型成功！');
                        this.dialogVisibleDelete = false;
                        this.serviceTypeList();
                    }else{
                        this.$message.error(result.msg);
                        this.dialogVisibleDelete = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        // //明细模板
        // detailServiceType(id){
        //     this.$router.push({name:'LonganServiceTypeDetail', query: {id}});
        // },
    },
}
</script>

