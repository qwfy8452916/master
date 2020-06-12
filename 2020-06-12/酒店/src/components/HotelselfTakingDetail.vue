<template>
  <div class="selfTakingDetail">
     <el-form align="left" label-width="140px" :model="formdata" class="selfTakingwid">
         <el-form-item label="酒店名称">
               <span>{{hotelName}}</span>
            </el-form-item>
         <el-form-item label="自提点名称"  prop="pointName">
            <el-input :disabled='true' maxlength="30" v-model="formdata.pointName"></el-input>
         </el-form-item>
         <el-form-item label="自提点说明" prop="pointInstruction">
            <el-input :disabled='true' maxlength="250" type="textarea" v-model="formdata.pointInstruction" :rows="3"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button @click="cancel">返回</el-button>
         </el-form-item>
     </el-form>
  </div>
</template>

<script>
export default {
   name:"HotelselfTakingDetail",
   data(){
     return {
       hotelName:'',
       checkId:'',
       formdata:{
         pointName:'',
         pointInstruction:'',
       },
     }
   },
   mounted(){
      this.hotelName=localStorage.hotelName;
      this.checkId=this.$route.query.id;
      this.checkSelftakeDetail();
   },
   methods:{



     //获取详情信息
     checkSelftakeDetail(){
       let that=this;
       const params={};
       this.$api.checkSelftakeDetail(params,that.checkId).then(response=>{
          const result = response.data;
                if(result.code == 0){
                   that.formdata=result.data
                }else{
                   this.$message.error(result.msg);
                }
          }).catch(error=>{
            this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
          })
        },


        cancel(){
          this.$router.push({name:"HotelselfTakingList"})
        },

   }
}
</script>
<style lang="less">
.selfTakingDetail{
   .el-select,.el-input,.el-textarea{
       width:300px;
   }
}
</style>
<style lang="less" scoped>
.selfTakingDetail{
   .selfTakingwid{
     width: 60%;
   }
}
</style>



