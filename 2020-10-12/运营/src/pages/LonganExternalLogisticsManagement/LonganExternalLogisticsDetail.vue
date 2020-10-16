<template>
  <div class="ExternalLogisticsDetail">
      <div class="title">详情</div>
      <el-form align="left" style="width:70%" label-width="130px" :model="LogisticsEditData" ref="LogisticsEditData">
          <el-form-item label="物流平台名称" prop="lgcName">
              <el-input :disabled="true" maxlength="30" v-model="LogisticsEditData.lgcName"></el-input>
          </el-form-item>
          <el-form-item label="默认计程运费设置">
              <el-form-item label="起步价" label-width="80px">
                  <el-input :disabled="true" v-model="LogisticsEditData.startPrice" style="width:110px"></el-input>元
              </el-form-item>
              <el-form-item label="起步里程" label-width="80px">
                  <el-input :disabled="true" v-model="LogisticsEditData.startMileage" style="width:110px"></el-input>公里
              </el-form-item>
              <el-form-item label="超出价" label-width="80px">
                  <el-input :disabled="true" v-model="LogisticsEditData.exceededMileagePrice" style="width:110px"></el-input>元/公里
              </el-form-item>
          </el-form-item>
          <el-form-item label="接口路径前缀">
              <el-input :disabled="true" v-model="LogisticsEditData.lgcUrlPrefix"></el-input>
          </el-form-item>
          <el-form-item label="安全ID">
              <el-input :disabled="true" v-model="LogisticsEditData.lgcPlatformKey"></el-input>
          </el-form-item>
          <el-form-item label="安全密码">
              <el-input :disabled="true" v-model="LogisticsEditData.lgcPlatformSecret"></el-input>
          </el-form-item>
          <el-form-item label="实现类">
              <el-input :disabled="true" v-model="LogisticsEditData.adapterBean"></el-input>
          </el-form-item>
          <el-form-item label="回调路径前缀">
              <el-input :disabled="true" maxlength="30" v-model="LogisticsEditData.callbackUrlPrefix"></el-input>
          </el-form-item>
          <el-form-item label="接单违约金">
                  <el-input :disabled="true" v-model="LogisticsEditData.liquidatedDamages"></el-input>元
          </el-form-item>
          <el-form-item>
              <el-button @click="cancel">返回</el-button>
          </el-form-item>

      </el-form>
  </div>
</template>

<script>
  export default {
    name:"LonganExternalLogisticsDetail",
    data(){
      return {
        detailId:'',
        LogisticsEditData:{},

      }
    },
    mounted(){
       this.detailId=this.$route.query.id;
       this.getOutLogisticsDetail();
    },
    methods:{


     //获取详情
       getOutLogisticsDetail(){
         let that=this;
         let params=""
        this.$api.getOutLogisticsDetail(params,that.detailId).then(response=>{
          const result=response.data;
          if(result.code==0){
            that.LogisticsEditData=result.data
          }else{
            that.$message.error(Response.msg)
          }
        }).catch(error=>{
          that.$alert(error,"警告",{
            confirmButtonText:"确定"
          })
        })
       },


      //返回
      cancel(){
        this.$router.push({name:"LonganExternalLogistics"})
      },
    }
  }
</script>

<style lang="less" scope>
   .ExternalLogisticsDetail{
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
