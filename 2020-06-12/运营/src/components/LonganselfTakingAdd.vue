<template>
  <div class="selfTakingAdd">
     <el-form align="left" label-width="140px" :model="formdata" :rules="rules" ref="formdata" class="selfTakingwid">
         <el-form-item label="酒店名称" prop="hotelInfo">
                <el-select
                    v-model="formdata.hotelInfo"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择"
                    >
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
         <el-form-item label="自提点名称"  prop="selftakingName">
            <el-input maxlength="30" v-model="formdata.selftakingName"></el-input>
         </el-form-item>
         <el-form-item label="自提点说明" prop="explain">
            <el-input maxlength="250" type="textarea" v-model="formdata.explain" :rows="3"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button @click="cacel">取消</el-button>
            <el-button v-if="authzData['F:BO_HOTEL_SELTTAKING_ADDSUBMIT']" type="primary" @click="surebtn('formdata')">确定</el-button>
         </el-form-item>
     </el-form>
  </div>
</template>

<script>
export default {
   name:"LonganselfTakingAdd",
   data(){
     return {
       authzData: '',
       hotelList:[],
       loadingH:true,
       formdata:{
         hotelInfo:'',
         selftakingName:'',
         explain:'',
       },
       rules:{
          hotelInfo:{required:true,message:"请选择酒店",trigger:"change"},
          selftakingName:{required:true,message:"请填写自提点名称",trigger:"blur"},
       },
     }
   },
   mounted(){
     (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
      this.getHotelList();
   },
   methods:{


     surebtn(formdata){
         let that=this;
         this.$refs[formdata].validate((valid,model)=>{
           if(valid){
              let params={
                 hotelId:this.formdata.hotelInfo,
                 pointName:this.formdata.selftakingName,
                 pointInstruction:this.formdata.explain
              }
              that.$api.createSelftake(params).then(response => {
                    const result = response.data;
                    if(result.code == 0){
                      that.$router.push({name:"LonganselfTakingList"})

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
        this.$router.push({name:"LonganselfTakingList"})
      },

       //获取酒店信息
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
                                hotelName: item.hotelName,
                                horgId: item.orgId
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



