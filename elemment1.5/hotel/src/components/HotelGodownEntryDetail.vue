<template>
    <div class="godownentryadd">
        <p class="title">入库单详情</p>
        <el-form :model="godownEntryDataDetail" :inline="true" align=left>
            <el-form-item label="入库单编号" prop="invInCode">
                <el-input :disabled="true" v-model="godownEntryDataDetail.invInCode"></el-input>
            </el-form-item>
            <el-form-item label="操作人" prop="createdByEmp">
                <el-input :disabled="true" v-model="godownEntryDataDetail.createdByEmp"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" prop="supplName">
                <el-input :disabled="true" v-model="godownEntryDataDetail.supplName"></el-input>
            </el-form-item>
            <el-form-item label="收货日期" prop="receiveAt">
                <el-date-picker
                    v-model="godownEntryDataDetail.receiveAt"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :disabled="true"
                    placeholder="请选择日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <el-table :data="commodityDataList" border style="width:100%;" >
            <el-table-column fixed prop="productName" label="商品名称" width="80px" align=center></el-table-column>
            <el-table-column prop="proSize" label="规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center></el-table-column>
            <el-table-column prop="sqSign" label="商品编码" align=center></el-table-column>
            <el-table-column prop="productiveAt" label="生产日期" align=center></el-table-column>
            <el-table-column prop="expPeriod" label="保质期" align=center></el-table-column>
        </el-table>
        <br/>
        <div class="commodityadd">
            <el-button type="primary" @click="returnList">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotelGodownEntryDetail',
    data(){
        return{
            gEId: '',
            godownEntryDataDetail: {},
            commodityDataList: []
        }
    },
    mounted(){
        this.gEId = this.$route.query.id;
        this.godownEntryDetail();
    },
    methods: {
        //入库单详情
        godownEntryDetail(){
            const params = {};
            const id = this.gEId;
            this.$api.godownEntryDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.godownEntryDataDetail = result.data;
                        this.commodityDataList = result.data.invInDetailExtraDTOList;
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
            this.$router.push({name: 'HotelGodownEntryList'});
        }
    },
}
</script>

<style lang="less" scoped>
.godownentryadd{
    .title{
        font-weight: bold;
        text-align: left;
    }
    .commodityadd{
        width: 100%;
        text-align: left;
        margin-bottom: 10px;
    }
}
</style>

