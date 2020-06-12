<template>
   <div class="ProdCouponGroupEdit">
      <p class="title">修改优惠券分组</p>
      <el-form :model="groupdata" :rules="rules" ref="groupdata" label-width="140px" class="groupform">
           <el-form-item label="组织名称" prop="groupOwnerOrgName">
               <el-input :disabled="true" v-model="groupdata.groupOwnerOrgName"></el-input>
            </el-form-item>
            <el-form-item label="分组名称" prop="groupName">
               <el-input v-model="groupdata.groupName"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="authzData['F:BO_COUPON_OPRGROUP_MODSUBMIT']" type="primary" @click="sureBtn('groupdata')">确 定</el-button>
            </el-form-item>

      </el-form>
   </div>
</template>

<script>
   export default {
     name:"LonganProdCouponGroupEdit",
     data(){
       return {
         authzData:'',
         groupId:'', //分组id
         groupdata:{
           groupName:'', //分组名
         },//分组数据
         rules:{
           groupName:{required:true,message:"请输入分组名称",trigger:"blur"},
         },
       }
     },
     mounted(){
       (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
       this.groupId=this.$route.query.id;
       this.checkCouponGroup();
     },
     methods:{

       //取消
       cancel(){
         this.$router.push({name:"LonganProdCouponGroup"})
       },

       //获取分组详情
       checkCouponGroup(){
          let that=this;
          let params={};
          this.$api.checkCouponGroup(params,that.groupId).then(response=>{
                  if(response.data.code=='0'){
                    that.groupdata=response.data.data;
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
          },



       //确定
       sureBtn(groupdata){
         let that=this;
         let params={
           groupName:this.groupdata.groupName
         };
         this.$refs[groupdata].validate((valid,model)=>{
            if(valid){
               this.$api.editCouponGroup(params,that.groupId).then(response=>{
                  if(response.data.code=='0'){
                    that.$message.success("操作成功")
                    that.$router.push({name:"LonganProdCouponGroup"})
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



     },

   }
</script>

<style lang="less" scope>
   .ProdCouponGroupEdit{
     .title{text-align: left;font-weight: bold;}
     .groupform{
       text-align: left;
       width: 60%;
       .el-select,.el-input{width: 320px;}
     }
   }
</style>
