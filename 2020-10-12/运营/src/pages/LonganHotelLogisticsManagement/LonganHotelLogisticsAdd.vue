<template>
  <div class="HotelLogisticsAdd">
      <div class="title">新增</div>
      <el-form align="left" style="width:70%" label-width="130px" :model="LogisticsData" ref="LogisticsData" :rules="rules">
          <el-form-item label="酒店名称" prop="hotelId">
                <el-select
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
                    @change="changeLogistics"
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
                  <el-input v-model="LogisticsData.startPrice" style="width:110px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>元
              </el-form-item>
              <el-form-item label="起步里程" label-width="80px" prop="startMileage" style="margin-bottom:20px">
                  <el-input v-model="LogisticsData.startMileage" style="width:110px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>公里
              </el-form-item>
              <el-form-item label="超出价" label-width="80px" prop="exceededMileagePrice" style="margin-bottom:20px">
                  <el-input v-model="LogisticsData.exceededMileagePrice" style="width:110px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>元/公里
              </el-form-item>
          </el-form-item> -->
          <el-form-item label="门店编码" prop="storeCode">
              <el-input maxlength="30" v-model="LogisticsData.storeCode"></el-input>
          </el-form-item>
          <el-form-item label="城市代码" prop="cityCode">
              <el-input maxlength="30" v-model="LogisticsData.cityCode"></el-input>
          </el-form-item>
          <el-form-item label="订单商品类型" prop="orderProdType">
              <el-input maxlength="30" v-model="LogisticsData.orderProdType"></el-input>
          </el-form-item>
          <el-form-item label="结算模式" prop="settlePattern">
              <el-radio-group v-model="LogisticsData.settlePattern" @change="settlePattern">
              <el-radio :label="1">统一结算</el-radio>
              <el-radio :label="2">独立结算</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开票加税" prop="invoiceTax" v-if="LogisticsData.settlePattern==1">
              <el-input maxlength="30" v-model="LogisticsData.invoiceTax" oninput ="value=value.replace(/[^0-9.]/g,'')" ></el-input> %
          </el-form-item>
          <el-form-item>
              <el-button @click="cancel">取消</el-button>
              <el-button @click="submitbtn('LogisticsData')" type="primary">确定</el-button>
          </el-form-item>

      </el-form>
  </div>
</template>

<script>
  export default {
    name:"LonganHotelLogisticsAdd",
    data(){
      return {
        loadingH:false,
        loadingL:false,
        hotelList:[],
        LogisticsList:[],
        LogisticsData:{
           hotelId:'',
           lgcId:'',
           startPrice:'',
           startMileage:'',
           exceededMileagePrice:'',
           storeCode:'',
           cityCode:'',
           orderProdType:'',
           settlePattern:'',
           invoiceTax:0,
        },

        rules:{
           hotelId:{required:true,message:"请选择酒店",trigger:"change"},
           lgcId:{required:true,message:"请选择外部物流",trigger:"change"},
           startPrice:{required:true,message:"请填写起步价",trigger:"blur"},
           startMileage:{required:true,message:"请填写起步里程",trigger:"blur"},
           exceededMileagePrice:{required:true,message:"请填写超出价格",trigger:"blur"},
           storeCode:{required:true,message:"请填写门店编码",trigger:"blur"},
           cityCode:{required:true,message:"请填写城市代码",trigger:"blur"},
           orderProdType:{required:true,message:"请填写订单商品类型",trigger:"blur"},
           settlePattern:{required:true,message:"请选择结算模式",trigger:"change"},
           invoiceTax:{required:true,message:"请填写开票加税",trigger:"blur"},
        },
      }
    },
    mounted(){

    },
    methods:{

      //结算模式
      settlePattern(){
        if(this.LogisticsData.settlePattern==2){
           this.LogisticsData.invoiceTax=0
        }
      },


       //确定
       submitbtn(LogisticsData){
         let that=this;
         let params={
            hotelId:this.LogisticsData.hotelId,
            lgcId:this.LogisticsData.lgcId,
            startPrice:this.LogisticsData.startPrice,
            startMileage:this.LogisticsData.startMileage,
            exceededMileagePrice:this.LogisticsData.exceededMileagePrice,
            storeCode:this.LogisticsData.storeCode,
            cityCode:this.LogisticsData.cityCode,
            orderProdType:this.LogisticsData.orderProdType,
            settlePattern:this.LogisticsData.settlePattern,
            invoiceTax:parseFloat(this.LogisticsData.invoiceTax).toFixed(2),
         }
         this.$refs[LogisticsData].validate((valid,model)=>{
            if(valid){
              that.$api.addHotelLogistics(params).then(response=>{
                 const result=response.data;
                 if(result.code==0){
                    that.$message.success("操作成功")
                    that.$router.push({name:"LonganHotelLogistics"})
                 }else{
                    that.$message.error(result.msg)
                 }
              }).catch(error=>{
                that.$alert(error,"警告",{
                  confirmButtonText:"确定"
                })
              })

            }else{
              console.log("error!")
            }
         })
       },

      //取消
      cancel(){
        this.$router.push({name:"LonganHotelLogistics"})
      },

      //选择外部物流
      changeLogistics(e){
         const selectItem=this.LogisticsList.find(item=>item.id===e)
         this.LogisticsData.startPrice=selectItem.startPrice
         this.LogisticsData.startMileage=selectItem.startMileage
         this.LogisticsData.exceededMileagePrice=selectItem.exceededMileagePrice
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
   .HotelLogisticsAdd{
      .title{
        margin-bottom: 20px;
        font-weight: bold;
        text-align: left;
        }
      .el-input,.el-select{
        width:260px;
      }
      .bfbunit{
        margin-left: 5px;
      }
   }
</style>
