<template>
    <div class="godownentryadd">
        <p class="title">平台商品入库单详情</p>
        <el-form :model="godownEntryDataDetail" :inline="true" align=left>
            <el-form-item label="入库单编号" prop="invInCode">
                <el-input :disabled="true" v-model="godownEntryDataDetail.invInCode"></el-input>
            </el-form-item>

            <!-- <el-form-item label="供应商名称" prop="supplName">
                <el-input :disabled="true" v-model="godownEntryDataDetail.supplName"></el-input>
            </el-form-item> -->
            <el-form-item label="收货日期" prop="receiveTime">
                <el-date-picker
                    v-model="godownEntryDataDetail.receiveTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :disabled="true"
                    placeholder="请选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="酒店名称">
                <el-input :disabled="true" v-model="godownEntryDataDetail.hotelName"></el-input>
            </el-form-item>

        <el-table :data="commodityDataList" border style="width:100%;" >
            <el-table-column fixed prop="prodName" label="商品名称" width="80px" align=center></el-table-column>
            <el-table-column prop="prodUnitMeasure" label="规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center></el-table-column>
            <el-table-column prop="prodCode" label="商品编码" align=center></el-table-column>
            <el-table-column prop="productionDate" label="生产日期" align=center></el-table-column>
            <el-table-column prop="prodWarrantyPeriod" label="保质期" align=center></el-table-column>
        </el-table>
          <el-form-item label="备注" class="invInRemark">
                <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" :disabled="true" v-model="godownEntryDataDetail.invInRemark"></el-input>
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
    name: 'PlatformenterOrderdetail',
    data(){
        return{
            gEId: '',
            query:'',
            godownEntryDataDetail: {},
            commodityDataList: []
        }
    },
    created(){
        this.gEId = this.$route.query.id;
        this.query=this.$route.query.query

    },
    mounted(){

        this.godownEntryDetail();
    },
    methods: {
        //平台商品入库单详情
        godownEntryDetail(){
            const params = {};
            const id = this.gEId;
            this.$api.godownEntryDetailInfo(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.godownEntryDataDetail = result.data;
                        this.commodityDataList = result.data.detailDTOList;
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
            let query=this.query;
            this.$router.push({name: 'PlatformenterOrderlist',query:{query}});
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
    .textarea{width: 330px;}
    .invInRemark{margin-top: 20px;}
}
</style>

