<template>
    <div class="LonganFranchiseeadd">
       <h3 class="alignleft">新增加盟商</h3>
       <el-form :model="franchiseeadd" ref="franchiseeadd" :rules="rules" label-width="135px" :inline="true">
          <div class="hangitem widthlimit">
              <el-form-item label="类型" prop="classification">
                  <el-select v-model="franchiseeadd.classification" placeholder="请选择" @change="classselect">
                      <el-option value="">全部</el-option>
                      <el-option value="1">合伙人</el-option>
                      <el-option value="2">城市运营商</el-option>
                  </el-select>
              </el-form-item>
          </div>
          <div class="hangitem widthlimit">
              <el-form-item label="名称" prop="franchiseename">
                  <el-select v-model="franchiseeadd.franchiseename" placeholder="请选择" @change="franchiseename">
                     <el-option value="01">加盟商01</el-option>
                  </el-select>
              </el-form-item>
          </div>
          <div class="hangitem widthlimit">
              <el-form-item label="酒店名称" prop="hotelname">
                  <el-select v-model="franchiseeadd.hotelname" placeholder="请选择" @change="hotelname">
                     <el-option value="01">思思大酒店</el-option>
                  </el-select>
              </el-form-item>
          </div>
       </el-form>

        <el-row>
        <el-col :span="24" class="niuwrap">
                <el-button type="primary" @click="cancelbtn()">取消</el-button>
                <el-button v-if="authzData['F:BO_ALLY_HOTELADD_SUBMIT']" type="primary" @click="surebtn('franchiseeadd')">确定</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: 'LonganFranchiseehoteladd',
    data() {
        return{
            authzData: '',
          franchiseeadd:{
              classification:'',
              franchiseename:'',
              hotelname:'',
          },
          rules:{

          },
          province: [],
            city: [],
            area: [],
        }
    },
    created(){
        // this.Getdata()
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {


       //取消
      cancelbtn(){
       this.$router.push({name:'LonganFranchiseehotellist'})
      },

      surebtn(formData){
        // console.log(this.classification)
        this.$refs[formData].validate((valid, model) => {
           if(valid){
              console.log('通过')
           }
        })
      },

      classselect(e){

      },

      franchiseename(e){

      },

      hotelname(e){

      },


    }
}
</script>

<style lang="less" scoped>
.LonganFranchiseeadd{
    width: 80%;
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
   .widthlimit{
     .el-input__inner{width: 300px;}
   }
</style>


