<template>
    <div class="LonganOperationAnalysisDetail">
        <el-table :data="DetailList" border stripe style="width:100%;" >
            <el-table-column fixed prop="prodOwnerOrgKind" label="商品类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.prodOwnerOrgKind == '1'">平台</span>
                    <span v-else-if="scope.row.prodOwnerOrgKind == '2'">运营商</span>
                    <span v-else-if="scope.row.prodOwnerOrgKind == '3'">酒店</span>
                    <span v-else-if="scope.row.prodOwnerOrgKind == '4'">供应商</span>
                    <span v-else-if="scope.row.prodOwnerOrgKind == '5'">入驻商家</span>
                </template>
            </el-table-column>
            <el-table-column fixed prop="prodShowName" label="商品名称"></el-table-column>
            <el-table-column prop="totalAmount" label="商品价格（元）" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="实付金额（元）" align=center></el-table-column>
        </el-table>
        <div style="text-align: left;margin-top: 30px;">
            <el-button type="primary" @click="returnList">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LonganOperationAnalysisDetail',
    data(){
        return{
            DetailList: []
        }
    },
    mounted(){
        this.LonganOperationAnalysisDetail();
    },
    methods: {
        //运营分析订单查询
        LonganOperationAnalysisDetail(){
            this.$api.LonganOperationAnalysisDetail(this.$route.query.id).then(response=>{
                if(response.data.code==0){
                  this.DetailList = response.data.data;
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },
        //返回
        returnList(){
            this.$router.push({name: 'LonganOperationAnalysis'});
        }
    }
}
</script>

<style lang="less" scoped>
    .Revenue-font{
        text-align: left;
        margin-bottom: 20px;
    }
    .pagination{
        margin-top: 20px;
    }
</style>

