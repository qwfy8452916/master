<template>
  <div class="ExternalLogisticsEdit">
      <div class="title">修改</div>
      <el-form align="left" style="width:70%" label-width="130px" :model="LogisticsEditData" ref="LogisticsEditData" :rules="rules">
          <el-form-item label="物流平台名称" prop="lgcName">
              <el-input maxlength="30" v-model="LogisticsEditData.lgcName"></el-input>
          </el-form-item>
          <el-form-item label="默认计程运费设置">
              <el-form-item label="起步价" label-width="80px" prop="startPrice" style="margin-bottom:20px">
                  <el-input v-model="LogisticsEditData.startPrice" style="width:110px" oninput ="value=value.replace(/[^0-9.]/g,'')" ></el-input>元
              </el-form-item>
              <el-form-item label="起步里程" label-width="80px" prop="startMileage" style="margin-bottom:20px">
                  <el-input v-model="LogisticsEditData.startMileage" style="width:110px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>公里
              </el-form-item>
              <el-form-item label="超出价" label-width="80px" prop="exceededMileagePrice" style="margin-bottom:20px">
                  <el-input v-model="LogisticsEditData.exceededMileagePrice" style="width:110px" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>元/公里
              </el-form-item>
          </el-form-item>
          <el-form-item label="接口路径前缀" prop="lgcUrlPrefix">
              <el-input :disabled="true" v-model="LogisticsEditData.lgcUrlPrefix"></el-input>
          </el-form-item>
          <el-form-item label="安全ID" prop="lgcPlatformKey">
              <el-input :disabled="true" v-model="LogisticsEditData.lgcPlatformKey"></el-input>
          </el-form-item>
          <el-form-item label="安全密码" prop="lgcPlatformSecret">
              <el-input :disabled="true" v-model="LogisticsEditData.lgcPlatformSecret"></el-input>
          </el-form-item>
          <el-form-item label="实现类" prop="adapterBean">
              <el-input :disabled="true" v-model="LogisticsEditData.adapterBean"></el-input>
          </el-form-item>
          <el-form-item label="回调路径前缀" prop="callbackUrlPrefix">
              <el-input maxlength="30" v-model="LogisticsEditData.callbackUrlPrefix"></el-input>
          </el-form-item>
          <el-form-item label="接单违约金" prop="liquidatedDamages">
                  <el-input v-model="LogisticsEditData.liquidatedDamages" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>元
          </el-form-item>
          <el-form-item>
              <el-button @click="cancel">取消</el-button>
              <el-button @click="submitbtn('LogisticsEditData')" type="primary">确定</el-button>
          </el-form-item>

      </el-form>
  </div>
</template>

<script>
  export default {
    name:"LonganExternalLogisticsEdit",
    data(){
      var validate3 = (rule,value,callback) => {
            if(value.length>30){
                callback(new Error('输入长度在30个字符以内'));
            }else{
                callback();
            }
        }
      return {
        editId:'',
        LogisticsEditData:{
          startPrice:''
        },

        rules:{
           lgcName:{required:true,message:"请填写物流平台名称",trigger:"blur"},
           startPrice:{required:true,message:"请填写起步价",trigger:'blur'},
           startMileage:{required:true,message:"请填写起步里程",trigger:"blur"},
           exceededMileagePrice:{required:true,message:"请填写超出价格",trigger:"blur"},
           liquidatedDamages:{required:true,message:"请填写接单违约金",trigger:"blur"},
        },
      }
    },
    mounted(){
      this.editId=this.$route.query.id;
      this.getOutLogisticsDetail();
    },
    methods:{


       //获取详情
       getOutLogisticsDetail(){
         let that=this;
         let params=""
        this.$api.getOutLogisticsDetail(params,that.editId).then(response=>{
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

       //确定
       submitbtn(LogisticsEditData){
         let that=this;
         let params={
             lgcName:this.LogisticsEditData.lgcName,
             startPrice:this.LogisticsEditData.startPrice,
             startMileage:this.LogisticsEditData.startMileage,
             exceededMileagePrice:this.LogisticsEditData.exceededMileagePrice,
             lgcUrlPrefix:this.LogisticsEditData.lgcUrlPrefix,
             lgcPlatformKey:this.LogisticsEditData.lgcPlatformKey,
             lgcPlatformSecret:this.LogisticsEditData.lgcPlatformSecret,
             adapterBean:this.LogisticsEditData.adapterBean,
             callbackUrlPrefix:this.LogisticsEditData.callbackUrlPrefix,
             liquidatedDamages:this.LogisticsEditData.liquidatedDamages,
         }
         console.log(1)
         this.$refs[LogisticsEditData].validate((valid,model)=>{

            if(valid){
              console.log(2)
              that.$api.editOutLogistics(params,that.editId).then(response=>{
                const result=response.data;
                if(result.code==0){
                   that.$message.success("操作成功")
                   that.$router.push({name:"LonganExternalLogistics"})
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
        this.$router.push({name:"LonganExternalLogistics"})
      },
    }
  }
</script>

<style lang="less" scope>
   .ExternalLogisticsEdit{
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
