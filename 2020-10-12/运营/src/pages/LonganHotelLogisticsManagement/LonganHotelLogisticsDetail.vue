<template>
  <div class="HotelLogisticsDetail">
      <div class="title">查看详情</div>
      <el-form align="left" style="width:70%" label-width="130px" :model="LogisticsData" ref="LogisticsData">
          <el-form-item label="酒店名称">
                <el-select
                    :disabled="true"
                    v-model="LogisticsData.hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="外部物流" prop="lgcId">
                <el-select
                    disabled
                    v-model="LogisticsData.lgcId"
                    filterable
                    remote
                    :remote-method="remoteLogistics"
                    :loading="loadingL"
                    @focus="getOutLogistics()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in LogisticsList"
                        :key="item.id"
                        :label="item.lgcName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
          <!-- <el-form-item label="计程运费设置">
              <el-form-item label="起步价" label-width="80px" prop="startPrice" style="margin-bottom:20px">
                  <el-input disabled v-model="LogisticsData.startPrice" style="width:110px"></el-input>元
              </el-form-item>
              <el-form-item label="起步里程" label-width="80px" prop="startMileage" style="margin-bottom:20px">
                  <el-input disabled v-model="LogisticsData.startMileage" style="width:110px"></el-input>公里
              </el-form-item>
              <el-form-item label="超出价" label-width="80px" prop="exceededMileagePrice" style="margin-bottom:20px">
                  <el-input disabled v-model="LogisticsData.exceededMileagePrice" style="width:110px"></el-input>元/公里
              </el-form-item>
          </el-form-item> -->
          <el-form-item label="门店编码" prop="storeCode">
              <el-input disabled maxlength="30" v-model="LogisticsData.storeCode"></el-input>
          </el-form-item>
          <el-form-item label="城市代码" prop="cityCode">
              <el-input disabled maxlength="30" v-model="LogisticsData.cityCode"></el-input>
          </el-form-item>
          <el-form-item label="订单商品类型" prop="orderProdType">
              <el-input disabled maxlength="30" v-model="LogisticsData.orderProdType"></el-input>
          </el-form-item>
          <el-form-item label="结算模式" prop="settlePattern">
              <el-radio-group v-model="LogisticsData.settlePattern" disabled>
              <el-radio :label="1">统一结算</el-radio>
              <el-radio :label="2">独立结算</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开票加税" prop="invoiceTax" v-if="LogisticsData.settlePattern==1">
              <el-input disabled maxlength="30" v-model="LogisticsData.invoiceTax"></el-input> %
          </el-form-item>
          <el-form-item>
              <el-button @click="cancel">返回</el-button>
          </el-form-item>

      </el-form>
  </div>
</template>

<script>
  export default {
    name:"LonganHotelLogisticsDetail",
    data(){
      return {
        detailId:'',
        loadingH:false,
        loadingL:false,
        hotelList:[],
        LogisticsList:[],
        LogisticsData:{},

      }
    },
    mounted(){
      this.detailId=this.$route.query.id;
      this.getLogisticsDetail();
      this.getHotelList();
    },
    methods:{




       //获取详情
       getLogisticsDetail(){
         let that=this;
         let params="";
         this.$api.getLogisticsDetail(params,that.detailId).then(response=>{
           const result=response.data;
           if(result.code==0){
              that.LogisticsData=result.data
              that.getOutLogistics();
           }else{
              that.$message.error(result.msg)
           }
         }).catch(error=>{
           that.$alert(error,"警告",{
             confirmButtonText:"确定"
           })
         })
       },


      //取消
      cancel(){
        this.$router.push({name:"LonganHotelLogistics"})
      },

      //酒店列表
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                hotelName: hName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.hotelList(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName
                            }
                        })
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
        remoteHotel(val){
            this.getHotelList(val);
        },

         //获取未被酒店使用的外部物流
        getOutLogistics(LName){
            let that=this;
            if(this.LogisticsData.hotelId==''){
              this.$message.error("请先选择酒店!")
              return false;
            }
            this.loadingH = true;
            const params = {
                hotelId:this.LogisticsData.hotelId,
                lgcName: LName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.selectOutLogistics({params})
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        that.LogisticsList = result.data
                        const selectitem={
                          id:that.LogisticsData.lgcId,
                          lgcName:that.LogisticsData.lgcName,
                          startPrice:that.LogisticsData.startPrice,
                          startMileage:that.LogisticsData.startMileage,
                          exceededMileagePrice:that.LogisticsData.exceededMileagePrice
                        }
                         that.LogisticsList.push(selectitem)
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
        remoteLogistics(val){
            this.getOutLogistics(val);
        },

    }
  }
</script>

<style lang="less" scope>
   .HotelLogisticsDetail{
      .title{
        margin-bottom: 20px;
        font-weight: bold;
        text-align: left;
        }
      .el-input,.el-select{
        width:260px;
      }
   }
</style>
