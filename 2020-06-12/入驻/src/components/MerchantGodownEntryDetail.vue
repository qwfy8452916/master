<template>
    <div class="godownentryadd">
        <p class="title">入库单详情</p>
        <el-form :model="invInDetail" :inline="true" align=left>
            <el-form-item label="入库单编号" prop="invInCode">
                <el-input :disabled="true" v-model="invInDetail.invInCode"></el-input>
            </el-form-item>
            <el-form-item label="收货日期" prop="receiveAt">
                <el-date-picker
                    v-model="invInDetail.receiveTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :disabled="true"
                    placeholder="请选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="酒店名称" prop="invInCode">
                <el-input :disabled="true" v-model="invInDetail.hotelName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="备注">
                <el-input :disabled="true" :rows="3" type="textarea" v-model="invInDetail.invInRemark"></el-input>
            </el-form-item> -->
        </el-form>
        <el-table :data="invInDetail.detailDTOList" border stripe style="width:100%;">
            <el-table-column prop="prodName" label="商品名称" width="80px" align=center></el-table-column>
            <el-table-column prop="prodUnitMeasure" label="规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center></el-table-column>
            <el-table-column prop="prodCode" label="商品编码" align=center></el-table-column>
            <el-table-column prop="productionDate" label="生产日期" align=center></el-table-column>
            <el-table-column prop="prodWarrantyPeriod" label="保质期" align=center></el-table-column>
        </el-table>
        <br/><br/>
        <el-form :model="invInDetail" label-width="50px" class="remarkform">
            <el-form-item label="备注">
                <el-input :disabled="true" :rows="3" type="textarea" v-model="invInDetail.invInRemark"></el-input>
            </el-form-item>
        </el-form>
        <br/>
        <div class="commodityadd">
            <el-button @click="returnList">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MerchantGodownEntryDetail',
    data() {
        return {
            invInId: '',
            invInDetail: {}
        }
    },
    mounted() {
      this.invInId = this.$route.query.id;
      this.godownEntryDetail();
    },
    methods: {
        //入库单详情
        godownEntryDetail() {
            const params = {};
            const id = this.invInId;
            this.$api.godownEntryDetail(params, id)
                .then(response => {
                    const result = response.data;
                    if (result.code == '0') {
                        this.invInDetail = result.data;
                    } else {
                        this.$message.error('入库单详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error, "警告", {
                        confirmButtonText: "确定"
                    })
                })
        },
        //返回
        returnList() {
            this.$router.push({name: 'MerchantGodownEntryList'});
        }
    },
}
</script>

<style lang="less" scoped>
.godownentryadd {
    .title {
        font-weight: bold;
        text-align: left;
    }
    .remarkform{
        width: 40%;
    }
    .commodityadd {
        width: 100%;
        text-align: left;
        margin-top: 10px;
    }
}
</style>

