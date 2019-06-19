<template>
    <div class="commonfeature">
        <div class="commonfeatureadd"><el-button type="primary" @click="commonFeatureAdd">新增分类</el-button></div>
        <el-table :data="CommonFeatureDataList" border style="width:100%;" >
            <el-table-column prop="name" label="分类" align=center></el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="modifyCommonFeature(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteCommonFeature(scope.row.id)">删除</el-button>
                    <el-button type="text" size="small" @click="detailCommonFeature(scope.row.id)">特色分类</el-button>
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
    name: 'LonganCommonFeature',
    data(){
        return{
            CommonFeatureDataList: [],
            dialogVisibleDelete: false,
            cfId: ''
        }
    },
    mounted(){

    },
    methods: {
        //列表
        commonFeatureList(){
            // const params = {
            //     oprOrgId: this.oprOrgId
            // };
            // // console.log(params);
            // this.$api.commonFeatureList(params)
            //     .then(response => {
            //         // console.log(response);
            //         const result = response.data;
            //         if(result.code == '0'){
            //             this.CommonFeatureDataList = result.data;
            //         }else{
            //             this.$message.error('特色列表获取失败！');
            //         }
            //     })
            //     .catch(error => {
            //         this.$alert(error,"警告",{
            //             confirmButtonText: "确定"
            //         })
            //     })
        },
        //新增分类
        commonFeatureAdd(){
            this.$router.push({name: 'LonganCommonFeatureAdd'});
        },
        //修改
        modifyCommonFeature(id){
            this.$router.push({name: 'LonganCommonFeatureModify', query: id});
        },
        //删除
        deleteCommonFeature(id){
            this.cfId = id;
            //验证是否可以删除
            // const params = {
            //     oprOrgId: this.oprOrgId
            // };
            // // console.log(params);
            // this.$api.commonFeatureList(params)
            //     .then(response => {
            //         // console.log(response);
            //         const result = response.data;
            //         if(result.code == '0'){
            //             this.dialogVisibleDelete = true;
            //         }else{
            //             this.$message.warning('当前分类在使用中，不能删除！');
            //         }
            //     })
            //     .catch(error => {
            //         this.$alert(error,"警告",{
            //             confirmButtonText: "确定"
            //         })
            //     })
        },
        EnsureDetail(){

        },
        //特色分类
        detailCommonFeature(id){

        }
    }
}
</script>

<style lang="less" scoped>
.commonfeature{
    .commonfeatureadd{
        float: left;
        margin-bottom: 10px;
    }
}
</style>

