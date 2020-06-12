<template>
    <div class="godownentryadd">
        <p class="title">查看入库单详情</p>
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

            <el-form-item label="类型">
                <el-select :disabled="disabledjudge" v-model="godownEntryDataDetail.ownerOrgKind" @change="leixing">
                    <el-option v-for="item in typedata" :key="item.dictValue" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入驻商名称">
                <el-select
                    :disabled="disabledjudge"
                    v-model="godownEntryDataDetail.merId"
                    filterable
                    remote
                    :remote-method="remoteMer"
                    :loading="loadingR"
                    @focus="getLonganMerchant()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in MerchantList"
                        :key="item.id"
                        :label="item.merchantName"
                        :value="item.id">
                    </el-option>
                </el-select>
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
    name: 'allenterorderdetail',
    data(){
        return{
            disabledjudge:true,
            loadingR: false,
            typedata:[],
            MerchantList:[],

            gEId: '',
            godownEntryDataDetail: {},
            commodityDataList: [],
            query:'',
        }
    },
    created(){
        this.gEId = this.$route.query.id;
        this.query=this.$route.query.query
        this.getType();
        this.getLonganMerchant();
        this.godownEntryDetail();

    },
    methods: {

      //获取类型
        getType(){
          let that=this;
          let params={
             key:'PROD_KIND',
             orgId:0
          }
          this.$api.basicDataItems(params).then(response=>{
             if(response.data.code=='0'){
                that.typedata=response.data.data.map(item=>{
                   return {
                     dictName:item.dictName,
                     dictValue:parseInt(item.dictValue)
                   }
                })
             }else{
               that.$alert(response.data.msg,"警告",{
                 confirmButtonText:"确定"
               })
             }
          }).catch(error=>{
            that.$alert(error,"警告",{
              confirmButtonText:"确定"
            })
          })
        },

      //选择类型
        leixing(e){

          if(e==5){
            this.disabledjudge=false
          }else{
            this.disabledjudge=true
          }
        },

          //获取入驻商列表
        getLonganMerchant(rName){
            let that=this;
            console.log(rName)
            if(rName==undefined){
               rName='';
            }
            this.loadingR = true;
            const params = {
                orgAs: 2,
                name: rName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.getLonganMerchant(params)
                .then(response => {
                    that.loadingR = false;
                    const result = response.data;
                    if(result.code == 0){
                        that.MerchantList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                merchantName: item.merchantName
                            }
                        })
                        const merAll = {
                            id: '',
                            merchantName: '全部'
                        };
                        that.MerchantList.unshift(merAll);
                    }else{
                        that.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        remoteMer(val){
            this.getLonganMerchant(val);
        },

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
            this.$router.push({name: 'allenterorderlist',query:{query}});
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

