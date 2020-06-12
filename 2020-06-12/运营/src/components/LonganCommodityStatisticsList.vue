<template>
    <div class="commoditystatistics">
        <div v-if="authzData['F:BO_PROD_CATEGORY_ADD']"><el-button class="addbutton" @click="commodityStatisticsAdd">添加统计分类</el-button></div>
        <el-table :data="CommodityStatisticsDataList" border stripe style="width:100%;" >
            <el-table-column prop="categoryName" label="统计分类"></el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_PROD_CATEGORY_EDIT']" type="text" size="small" @click="modifyCommodityStatistics(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_PROD_CATEGORY_DELETE']" type="text" size="small" @click="deleteCommodityStatistics(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该商品统计分类？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganCommodityStatisticsList',
    data(){
        return {
            authzData: '',
            // orgId: '',
            csId: '',
            CommodityStatisticsDataList: [],
            dialogVisibleDelete: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.commodityStatisticsList();
    },
    methods: {
        //获取商品统计分类列表
        commodityStatisticsList(){
            const params = {
                // entryOprOrgId: this.orgId
                orgAs: 2
            };
            // console.log(params);
            this.$api.commodityStatisticsList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.CommodityStatisticsDataList = result.data;
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
        //添加统计分类
        commodityStatisticsAdd(){
            this.$router.push({name:'LonganCommodityStatisticsAdd'});
        },
        //修改
        modifyCommodityStatistics(id){
            this.$router.push({name:'LonganCommodityStatisticsModify', query: {id}});
        },
        //删除
        deleteCommodityStatistics(id){
            this.csId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const id = this.csId;
            const params = {};
            // console.log(id);
            this.$api.commodityStatisticsDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('删除商品统计分类成功！');
                        this.dialogVisibleDelete = false;
                        this.commodityStatisticsList();
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
    }
}
</script>
