<template>
    <div class="godownentryadd">
        <p class="title">出库单详情</p>
        <el-form :model="invInDetail" :inline="true" align=left>
            <el-form-item label="出库单id" prop="invOutCode">
                <el-input :disabled="true" v-model="invInDetail.invOutCode"></el-input>
            </el-form-item>
            <el-form-item label="出库日期" prop="receiveAt">
                <el-date-picker
                    v-model="invInDetail.outTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :disabled="true"
                    placeholder="请选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="酒店名称" prop="hotelName">
                <el-input :disabled="true" v-model="invInDetail.hotelName"></el-input>
            </el-form-item>
        </el-form>
        <el-table :data="invInDetail.detailDTOList" border stripe style="width:100%;">
            <el-table-column prop="prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="prodUnitMeasure" label="规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center></el-table-column>
            <el-table-column prop="prodCode" label="商品编码" align=center></el-table-column>
            <el-table-column prop="prodDesc" label="商品描述" align=center></el-table-column>
        </el-table>
        <br/><br/>
        <el-form :model="invInDetail" label-width="80px" class="remarkform">
            <el-form-item label="收货人">
                <el-input :disabled="true" v-model="invInDetail.consigneeName"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input :disabled="true" v-model="invInDetail.consigneePhone"></el-input>
            </el-form-item>
            <el-form-item label="出库原因">
                <el-input :disabled="true" :rows="3" type="textarea" v-model="invInDetail.invOutReason"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input :disabled="true" :rows="3" type="textarea" v-model="invInDetail.invOutRemark"></el-input>
            </el-form-item>
            <el-form-item label="">
                <div class="commodityadd">
                    <el-button @click="returnList">返回</el-button>
                </div>
            </el-form-item>
        </el-form>
        <br/>
    </div>
</template>

<script>
export default {
    name: 'MerchantStockOutDetail',
    data() {
        return {
            invInId: '',
            invInDetail: {}
        }
    },
    mounted() {
      this.invInId = this.$route.query.id;
      this.stockOutDetail();
    },
    methods: {
        //出库单详情
        stockOutDetail() {
            const params = {};
            const id = this.invInId;
            this.$api.stockOutDetail(params, id)
                .then(response => {
                    const result = response.data;
                    // console.log(result);
                    if (result.code == '0') {
                        this.invInDetail = result.data;
                    } else {
                        this.$message.error('出库单详情获取失败！');
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
            this.$router.push({name: 'MerchantStockOutList'});
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
    }
}
</style>

