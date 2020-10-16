<template>
   <div class="AllCouponGroupAdd">
      <p class="title">新增优惠券分组</p>
      <el-form :model="groupdata" :rules="rules" ref="groupdata" label-width="140px" class="groupform">
            <el-form-item label="组织名称" prop="organName">
               <el-input :disabled="true" v-model="groupdata.organName"></el-input>
            </el-form-item>
            <el-form-item label="分组名称" prop="groupName">
               <el-input v-model="groupdata.groupName" maxlength="10"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="authzData['F:BH_COUPON_HOTELGROUP_ADDSUBMIT']" type="primary" @click="sureBtn('groupdata')">确 定</el-button>
            </el-form-item>

      </el-form>
   </div>
</template>

<script>
   export default {
     name:"HotelAllCouponGroupAdd",
     data(){
       return {
         authzData:'',
         groupdata:{
           organName:'', //组织名称
           groupName:'', //分组名
         },//分组数据
         rules:{
           groupName:{required:true,message:"请输入分组名称",trigger:"blur"},
         },
       }
     },
     mounted(){
       (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
       this.getOrganName();
     },
     methods:{

       //取消
       cancel(){
         this.$router.push({name:"HotelProdCouponGroup"})
       },

       //确定
       sureBtn(groupdata){
         let that=this;
         let params={
           groupOwnerOrgKind:3,
           groupName:this.groupdata.groupName
         };
         this.$refs[groupdata].validate((valid,model)=>{
            if(valid){
               this.$api.addCouponGroup(params).then(response=>{
                  if(response.data.code=='0'){
                    that.$message.success("操作成功")
                    that.$router.push({name:"HotelProdCouponGroup"})
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
            }else{
              console.log("error!")
            }
         })

       },


        //获取组织名
        getOrganName(){
          let that=this;
          let params="";
          this.$api.getOrganName(params).then(response=>{
             if(response.data.code=='0'){
                that.groupdata.organName=response.data.data;
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
        }

     },

   }
</script>

<style lang="less" scope>
   .AllCouponGroupAdd{
     .title{text-align: left;font-weight: bold;}
     .groupform{
       text-align: left;
       width: 60%;
       .el-select,.el-input{width: 320px;}
     }
   }
</style>
