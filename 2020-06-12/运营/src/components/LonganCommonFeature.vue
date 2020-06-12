<template>
    <div class="commonfeature">
        <div v-if="authzData['F:BO_HOTEL_CFEATURE_ADD']"><el-button class="addbutton" @click="commonFeatureAdd">新增客房设施分类</el-button></div>
        <el-table :data="CommonFeatureDataList" border stripe style="width:100%;" >
            <el-table-column prop="feName" label="客房设施分类"></el-table-column>
            <el-table-column prop="reviewStatus" label="审核状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.reviewStatus == '0'">驳回</span>
                    <span v-if="scope.row.reviewStatus == '1'">通过</span>
                    <span v-if="scope.row.reviewStatus == '2'">待审核</span>
                </template>
            </el-table-column>
            <el-table-column prop="isActive" label="是否有效">
                <template slot-scope="scope">
                    <span v-if="scope.row.isActive == 0">否</span>
                    <span v-if="scope.row.isActive == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_HOTEL_CFEATURE_REVIEWPROGRESS'] && scope.row.reviewStatus == 2" type="text" size="small" @click="lookReviewProcess(scope.row.wfId)">审核进度</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_CFEATURE_EDIT']" type="text" size="small" @click="modifyCommonFeature(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_CFEATURE_DELETE']" type="text" size="small" @click="deleteCommonFeature(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该客房设施分类？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganCommonFeature',
    data(){
        return{
            authzData: '',
            // orgId: '',
            CommonFeatureDataList: [],
            dialogVisibleDelete: false,
            cfId: ''
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.commonFeatureList();
    },
    methods: {
        //列表
        commonFeatureList(){
            const params = {
                // encryptedOprOrgId: this.orgId
                orgAs: 2
            };
            // console.log(params);
            this.$api.commonFeatureList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.CommonFeatureDataList = result.data;
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
        //新增分类
        commonFeatureAdd(){
            this.$router.push({name: 'LonganCommonFeatureAdd'});
        },
        //修改
        modifyCommonFeature(id){
            this.$router.push({name: 'LonganCommonFeatureModify', query: {id}});
        },
        //删除
        deleteCommonFeature(id){
            this.cfId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const params = {};
            const id = this.cfId;
            // console.log(id);
            this.$api.commonFeaturedelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('客房设施分类删除成功！');
                        this.commonFeatureList();
                        this.dialogVisibleDelete = false;
                    }else{
                        this.$message.error('当前分类在使用中，不能删除！');
                        this.dialogVisibleDelete = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //查看审核进度
        lookReviewProcess(id){
            this.$router.push({name: 'LonganProcessDetails', query: {id}});
        }
    }
}
</script>

<style>
.el-dialog__header{
    text-align: left;
}
</style>

