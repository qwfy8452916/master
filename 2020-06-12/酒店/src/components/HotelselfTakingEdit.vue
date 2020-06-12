<template>
  <div class="selfTakingEdit">
     <el-form align="left" label-width="140px" :model="formdata" :rules="rules" ref="formdata" class="selfTakingwid">
         <el-form-item label="酒店名称" prop="hotelId">
             <span>{{hotelName}}</span>
            </el-form-item>
         <el-form-item label="自提点名称"  prop="pointName">
            <el-input maxlength="30" v-model="formdata.pointName"></el-input>
         </el-form-item>
         <el-form-item label="自提点说明" prop="pointInstruction">
            <el-input maxlength="250" type="textarea" v-model="formdata.pointInstruction" :rows="3"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button @click="cancel">取消</el-button>
            <el-button v-if="authzData['F:BH_HOTEL_SELTTAKING_MODIFYSUBMIT']" type="primary" @click="surebtn('formdata')">确定</el-button>
         </el-form-item>
     </el-form>
  </div>
</template>

<script>
export default {
   name:"HotelselfTakingEdit",
   data(){
     return {
       authzData: '',
       hotelName:'',
       hotelId:'',
       editId:'',
       formdata:{
         pointName:'',
         pointInstruction:'',
       },
       rules:{
          pointName:{required:true,message:"请填写自提点名称",trigger:"blur"},
       },
     }
   },
   mounted(){
     (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
      this.hotelName=localStorage.hotelName;
      this.hotelId=localStorage.hotelId;
      this.editId=this.$route.query.id
      this.checkSelftakeDetail();
   },
   methods:{


     surebtn(formdata){
       let that=this;
         this.$refs[formdata].validate((valid,model)=>{
           if(valid){
              const params={
                hotelId:that.formdata.hotelId,
                pointName:that.formdata.pointName,
                pointInstruction:that.formdata.pointInstruction
              };
              this.$api.editSelftake(params,that.editId).then(response=>{
                   const result = response.data;
                    if(result.code == 0){
                      that.$message.success("操作成功");
                      that.$router.push({name:"HotelselfTakingList"})
                    }else{
                      this.$message.error(result.msg);
                    }
              }).catch(error=>{
                  this.$alert(error,"警告",{
                      confirmButtonText: "确定"
                  })
              })
           }else{
             console.log("error")
             return false
           }
         })
     },


     //获取信息
     checkSelftakeDetail(){
       let that=this;
       const params={};
       this.$api.checkSelftakeDetail(params,that.editId).then(response=>{
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
        }

   }
}
</script>
<style lang="less">
.selfTakingEdit{
   .el-select,.el-input,.el-textarea{
       width:300px;
   }
}
</style>
<style lang="less" scoped>
.selfTakingEdit{
   .selfTakingwid{
     width: 60%;
   }
}
</style>



