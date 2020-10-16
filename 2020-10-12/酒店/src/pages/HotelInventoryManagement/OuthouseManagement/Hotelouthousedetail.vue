<template>
    <div class="godownentryadd">
        <p class="title">出库单详情</p>
        <el-form :model="godownEntryDataDetail" :inline="true" align=left>
            <el-form-item label="出库单编号" prop="invOutCode">
                <el-input :disabled="true" v-model="godownEntryDataDetail.invOutCode"></el-input>
            </el-form-item>
            <el-form-item label="出库日期" prop="outTime">
                <el-date-picker
                    v-model="godownEntryDataDetail.outTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :disabled="true"
                    placeholder="请选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="类型">
                <el-input v-model="godownEntryDataDetail.ownerKindName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="入驻商名称">
                <el-input v-model="godownEntryDataDetail.merName" :disabled="true"></el-input>
            </el-form-item>

        <el-table :data="commodityDataList" border style="width:100%;"  class="tablebott">
            <el-table-column fixed prop="prodName" label="商品名称" width="80px" align=center></el-table-column>
            <el-table-column prop="prodUnitMeasure" label="规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center></el-table-column>
            <el-table-column prop="prodCode" label="商品编码" align=center></el-table-column>
            <el-table-column prop="prodDesc" label="商品描述" align=center></el-table-column>
        </el-table>
        <el-form-item label="收货人" prop="consigneeName" class="widthlimit">
            <el-input v-model="godownEntryDataDetail.consigneeName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="consigneePhone" class="widthlimit">
            <el-input v-model="godownEntryDataDetail.consigneePhone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="出库原因" class="wraptextarea widthlimit">
          <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" v-model="godownEntryDataDetail.invOutReason" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注" class="wraptextarea widthlimit">
              <el-input class="textarea" :rows="3" placeholder="请输入" type="textarea" v-model="godownEntryDataDetail.invOutRemark" :disabled="true"></el-input>
        </el-form-item>
        </el-form>
        <br/>
        <div class="commodityadd">
            <el-button type="primary" @click="returnList">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Hotelouthousedetail',
    data(){
        return{
            gEId: '',
            godownEntryDataDetail: {},
            commodityDataList: [],
            encryptedHotelOrgId:"",
            godownEntryCode:"",
        }
    },
    mounted(){
        // this.encryptedHotelOrgId = localStorage.getItem('orgId');
        this.encryptedHotelOrgId = this.$route.params.orgId;
        this.gEId = this.$route.query.id;
        this.outhouseDetail();
    },
    methods: {

        //出库单详情
        outhouseDetail(){
            const params = {};
            const id = this.gEId;
            this.$api.outhouseDetail(params, id)
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
            this.$router.push({name: 'Hotelouthouselist'});
        }
    },
}
</script>
<style>
   .widthlimit .el-form-item__label{width: 80px;}
</style>

<style lang="less" scoped>
.godownentryadd{
    .tablebott{margin-bottom: 30px;}
    .el-date-editor.el-input{
      width: 160px;
      }
      .widthlimit{width: 100%;}
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

