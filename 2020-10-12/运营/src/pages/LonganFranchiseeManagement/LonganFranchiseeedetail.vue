<template>
    <div class="LonganFranchiseeedetail">
       <h3 class="alignleft">查看详情</h3>
       <el-form :model="franchisedetail" ref="franchisedetail" label-width="135px" :inline="true">
         <div class="hangitem">
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="franchisedetail.type">
                <el-radio v-if="franchisedetail.type=='c'" label="c" :disabled="true">企业</el-radio>
                <el-radio v-if="franchisedetail.type=='p'" label="p" :disabled="true">个人</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item v-if="franchisedetail.type=='c'" label="统一社会信用代码" prop="uscc">
              <el-input v-model="franchisedetail.uscc" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item v-if="franchisedetail.type=='p'" label="身份证号码" prop="idno">
              <el-input v-model="franchisedetail.idno" :disabled="true" maxlength="30"></el-input>
            </el-form-item>
          </div>

          <div class="hangitem">
            <el-form-item label="合作伙伴名称" prop="name">
              <el-input v-model="franchisedetail.name" maxlength="50" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="franchisedetail.contact" maxlength="10" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="手机号" prop="contactPhone">
              <el-input v-model="franchisedetail.contactPhone" maxlength="10" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem quyu">
            <el-form-item label="区域选择">
              <el-input v-model="provinceName" maxlength="10" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="cityName" maxlength="10" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="areaName" maxlength="10" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="franchisedetail.address" maxlength="30" :disabled="true"></el-input>
            </el-form-item>
          </div>
       </el-form>

        <el-row>
        <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">返回</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: 'LonganFranchiseeedetail',
    data() {
        return{
          partnerid:'',  //查看详情id
          query:'',
          franchisedetail:{
              type:'01',
              uscc:'',
              idno:'',
              name:'',
              contact:'',
              contactPhone:'',
              region:'江苏苏州',
              address:'',
          },
          provinceName:'',
          cityName:'',
          areaName:'',
        }
    },
    created(){
        this.partnerid=this.$route.query.id;
        this.query=this.$route.query.query
        this.Getdata()
    },
    methods: {

       //取消
      cancelbtn(){
       let query=this.query;
       this.$router.push({name:'LonganFranchiseelist',query:{query}})
      },



       //获取数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.getpartnerdetail({params},that.partnerid).then(response=>{
                if(response.data.code==0){
                  that.franchisedetail=response.data.data
                  that.provinceName=response.data.data.provinceName.dictName
                  that.cityName=response.data.data.cityName.dictName
                  that.areaName=response.data.data.areaName.dictName
                }else{
                  that.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              that.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },


    }
}
</script>

<style lang="less" scoped>
.LonganFranchiseeedetail{
    width: 80%;
    text-align: left;
    .alignleft{text-align: left;}

   .niuwrap{text-align:left;margin-top: 60px;padding-left: 160px;box-sizing: border-box;}
   .hangitem{text-align: left;}
}

</style>

<style lang="less">
   .seeordertitle .el-form-item__label{width:100px;}
   .hangitem{
      .el-input__inner{width: 280px;}
   }
   .quyu{
     .el-input__inner{width: 150px !important;}
   }
</style>


