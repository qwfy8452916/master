<template>
  <div class="selfTakingAdd">
     <el-form align="left" label-width="140px" :model="formdata" :rules="rules" ref="formdata" class="selfTakingwid">
         <el-form-item label="酒店名称">
             <span>{{hotelName}}</span>
            </el-form-item>
         <el-form-item label="自提点名称"  prop="selftakingName">
            <el-input maxlength="30" v-model="formdata.selftakingName"></el-input>
         </el-form-item>
         <el-form-item label="自提点说明" prop="explain">
            <el-input maxlength="250" type="textarea" v-model="formdata.explain" :rows="3"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button @click="cacel">取消</el-button>
            <el-button v-if="authzData['F:BH_HOTEL_SELTTAKING_ADDSUBMIT']" type="primary" @click="surebtn('formdata')">确定</el-button>
         </el-form-item>
     </el-form>
  </div>
</template>

<script>
export default {
   name:"HotelselfTakingAdd",
   data(){
     return {
       authzData: '',
       hotelName:'',
       hotelId:'',
       formdata:{
         selftakingName:'',
         explain:'',
       },
       rules:{
          selftakingName:{required:true,message:"请填写自提点名称",trigger:"blur"},
       },
     }
   },
   mounted(){
     (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
     this.hotelName=localStorage.hotelName;
     this.hotelId=localStorage.hotelId;
   },
   methods:{


     surebtn(formdata){
         let that=this;
         this.$refs[formdata].validate((valid,model)=>{
           if(valid){
              let params={
                 hotelId:this.hotelId,
                 pointName:this.formdata.selftakingName,
                 pointInstruction:this.formdata.explain
              }
              that.$api.createSelftake(params).then(response => {
                    const result = response.data;
                    if(result.code == 0){
                      that.$router.push({name:"HotelselfTakingList"})

                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
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

      //取消
      cacel(){
        this.$router.push({name:"HotelselfTakingList"})
      },


   }
}
</script>
<style lang="less">
.selfTakingAdd{
   .el-select,.el-input,.el-textarea{
       width:300px;
   }
}
</style>
<style lang="less" scoped>
.selfTakingAdd{
   .selfTakingwid{
     width: 60%;
   }
}
</style>



