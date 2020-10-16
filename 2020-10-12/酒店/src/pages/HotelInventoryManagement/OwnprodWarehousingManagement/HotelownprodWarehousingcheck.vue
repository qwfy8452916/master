<template>
    <div class="godownentryadd">
        <p class="title">查看自营商品入库单详情</p>
        <el-form :model="godownEntryDataDetail" :inline="true" align=left>
            <el-form-item label="入库单号" prop="invInCode">
                <el-input :disabled="true" v-model="godownEntryDataDetail.invInCode"></el-input>
            </el-form-item>
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

        <el-table :data="commodityDataList" border style="width:100%;" >
            <el-table-column fixed prop="prodName" label="商品名称" width="80px" align=center></el-table-column>
            <el-table-column prop="prodUnitMeasure" label="规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center></el-table-column>
            <el-table-column prop="prodCode" label="商品编码" align=center></el-table-column>
            <el-table-column prop="productionDate" label="生产日期" align=center></el-table-column>
            <el-table-column prop="prodWarrantyPeriod" label="保质期" align=center></el-table-column>
        </el-table>
        <el-form-item label="备注" class="wraptextarea">
              <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" v-model="godownEntryDataDetail.invInRemark"></el-input>
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
    name: 'HotelownprodWarehousingcheck',
    data(){
        return{
            gEId: '',
            godownEntryDataDetail: {},
            commodityDataList: [],
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
                    const result = response.data;
                    if(result.code == '0'){
                        console.log(result.data)
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
            this.$router.push({name: 'HotelownprodWarehousing'});
        }
    },
}
</script>

<style lang="less" scoped>
.godownentryadd{
    .wraptextarea{width:100%;margin-top:30px;
    .textarea{width:400px;}
    }
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

