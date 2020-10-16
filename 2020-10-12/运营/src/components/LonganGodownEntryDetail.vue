<template>
    <div class="godownentrydetail">
        <p class="title">入库单详情</p>
        <el-form :model="godownEntryInfo" :inline="true" align=left>
            <el-form-item label="入库单id" prop="invInCode">
                <el-input :disabled="true" v-model="godownEntryInfo.invInCode"></el-input>
            </el-form-item>
             <el-form-item label="酒店名称" prop="hotelName">
                <el-input :disabled="true" v-model="godownEntryInfo.hotelName"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" prop="supplName">
                <el-input :disabled="true" v-model="godownEntryInfo.supplName"></el-input>
            </el-form-item>
            <el-form-item label="添加时间" prop="createdAt">
                <el-input :disabled="true" v-model="godownEntryInfo.createdAt"></el-input>
            </el-form-item>
            <el-form-item label="操作人姓名" prop="empName">
                <el-input :disabled="true" v-model="godownEntryInfo.empName"></el-input>
            </el-form-item>
        </el-form>
        <el-table 
            :data="godownEntryDetailList" 
            border 
            style="width:100%;">
            <el-table-column prop="productName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="proSize" label="规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center></el-table-column>
            <el-table-column prop="sqSign" label="商品编号" align=center></el-table-column>
            <el-table-column prop="productiveAt" label="生产日期" width="160px" align=center></el-table-column>
            <el-table-column prop="expPeriod" label="保质期" align=center></el-table-column>
            <!-- <el-table-column prop="prodRemark" label="备注" align=center></el-table-column> -->
        </el-table><br/>
        <el-button type="primary" @click="returnList">返回</el-button>
    </div>
</template>

<script>
export default {
    name: 'LonganGodownEntryDetail',
    data(){
        return{
            id: '',
            godownEntryInfo: {},
            godownEntryDetailList: []
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        this.godownEntryDetail();
        this.godownEntryList();
    },
    methods: {
        //详情
        godownEntryDetail(){
            const params = {};
            const id = this.id;
            // console.log(params);
            this.$api.godownEntryDetailInfo(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.godownEntryInfo = result.data;
                    }else{
                        this.$message.error('入库单详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //详情-列表
        godownEntryList(){
            const params = {
                invInId: this.id
            };
            // console.log(params);
            this.$api.godownEntryDetail(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.godownEntryDetailList = result.data.list;
                    }else{
                        this.$message.error('入库单详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //返回
        returnList(){
            this.$router.push({name: 'LonganGodownEntryList'});
        }
    }
}
</script>

<style lang="less" scoped>
.godownentrydetail{
    text-align: left;
    .title{
        font-weight: bold;
    }
}
</style>

