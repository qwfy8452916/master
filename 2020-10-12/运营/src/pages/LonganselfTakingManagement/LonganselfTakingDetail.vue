<template>
  <div class="selfTakingDetail">
     <el-form align="left" label-width="140px" :model="formdata" class="selfTakingwid">
         <el-form-item label="酒店名称" prop="hotelId">
                <el-select
                    :disabled='true'
                    v-model="formdata.hotelId"
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
   name:"LonganselfTakingDetail",
   data(){
     return {
       checkId:'',
       hotelList:[],
       loadingH:true,
       formdata:{
         hotelId:'',
         pointName:'',
         pointInstruction:'',
       },
     }
   },
   mounted(){
      this.checkId=this.$route.query.id;
      console.log(this.checkId)
      this.getHotelList();
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

        cancel(){
          this.$router.push({name:"LonganselfTakingList"})
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



