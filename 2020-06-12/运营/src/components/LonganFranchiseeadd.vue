<template>
    <div class="LonganFranchiseeadd">
       <h3 class="alignleft">新增合作伙伴</h3>
       <el-form :model="franchiseeadd" ref="franchiseeadd" :rules="rules" label-width="135px" :inline="true">
         <div class="hangitem">
            <el-form-item label="类型" prop="classification">
              <el-radio-group v-model="franchiseeadd.classification" @change="typeselect">
                <el-radio label="c">企业</el-radio>
                <el-radio label="p">个人</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="hangitem" v-if="franchiseeadd.classification">
            <el-form-item label="统一社会信用代码" prop="creditcode" v-if="franchiseeadd.classification=='c'">
              <el-input v-model="franchiseeadd.creditcode" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="identitycode" v-if="franchiseeadd.classification=='p'">
              <el-input v-model="franchiseeadd.identitycode" maxlength="30"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="登录密码" prop="password">
              <el-input :disabled="true" v-model="franchiseeadd.password"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="合作伙伴名称" prop="franchisee">
              <el-input v-model="franchiseeadd.franchisee" maxlength="50"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="联系人" prop="contacts">
              <el-input v-model="franchiseeadd.contacts" maxlength="10"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="手机号" prop="cellphone">
              <el-input v-model="franchiseeadd.cellphone" maxlength="11"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem quyu">
              <el-form-item label="区域选择" prop="selectProvince">
                  <el-select v-model="franchiseeadd.selectProvince" placeholder="省级地区" @change="selectProvinceFun">
                      <el-option v-for="item in province" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item prop="selectCity">
                  <el-select v-model="franchiseeadd.selectCity" placeholder="市级地区" @change="selectCityFun">
                      <el-option v-for="item in city" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item prop="selectDistrict">
                <el-select v-model="franchiseeadd.selectDistrict" placeholder="区级地区">
                      <el-option v-for="item in area" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                  </el-select>
              </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="franchiseeadd.address" maxlength="30"></el-input>
            </el-form-item>
          </div>
       </el-form>



        <el-row>
        <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">取消</el-button>
                <el-button v-if="authzData['F:BO_ALLY_ALLY_ADD_SUBMIT']" type="primary" @click="addPartner('franchiseeadd')">确定</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: 'LonganFranchiseeadd',
    data() {
        return{
          authzData: '',
          franchiseeadd:{
              classification:'',
              creditcode:'',
              identitycode:'',
              password:'123456',
              franchisee:'',
              contacts:'',
              cellphone:'',
              region:'',
              address:'',
              selectProvince:'',
              selectCity:'',
              selectDistrict:'',
          },
          rules:{
            classification: {required: true, message: '请选择类型！', trigger: 'change'},
            creditcode: {required: true, message: '请输入统一社会信用代码！', trigger: 'blur'},
            identitycode: {required: true, message: '请输入身份证号码！', trigger: 'blur'},
            franchisee: {required: true, message: '请输入合作伙伴名称！', trigger: 'blur'},
            cellphone: {required: true, message: '请输入手机号！', trigger: 'blur'},
            selectProvince: {required: true, message: '请选择省份！', trigger: 'change'},
            selectCity: {required: true, message: '请选择市！', trigger: 'change'},
            selectDistrict: {required: true, message: '请选择区域！', trigger: 'change'},
            address: {required: true, message: '请输入详细地址！', trigger: 'blur'},
          },
          province: [],
            city: [],
            area: [],
        }
    },
    created(){
        // this.addPartner()
        this.provinceGet();
    },
    mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },

    methods: {
       //取消
      cancelbtn(){
       this.$router.push({name:'LonganFranchiseelist'})
      },



        //新增数据
       addPartner(formData){
            let that=this;
            let params={
               type:this.franchiseeadd.classification,
               uscc:this.franchiseeadd.creditcode,
               idno:this.franchiseeadd.identitycode,
               name:this.franchiseeadd.franchisee,
               contact:this.franchiseeadd.contacts,
               contactPhone:this.franchiseeadd.cellphone,
               province:this.franchiseeadd.selectProvince,
               city:this.franchiseeadd.selectCity,
               area:this.franchiseeadd.selectDistrict,
               address:this.franchiseeadd.address,
            };
            this.$refs[formData].validate((valid, model) => {
            if(valid){

                this.$api.addPartner(params).then(response=>{
                  if(response.data.code==0){
                      that.$message.success('操作成功！');
                      that.$router.push({name:"LonganFranchiseelist"})
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
           }
         })
        },

        typeselect(e){
          if(e=='c'){
            this.franchiseeadd.identitycode="";
          }
          if(e=='p'){
            this.franchiseeadd.creditcode="";
          }
        },

        //省
        provinceGet(){
            const params = {
                key: 'PROVINCE',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            }
            this.$api.provinceGet(params)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == 0){
                        this.province = response.data.data;
                    }else{
                        this.$message.error('获取省份失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //市
        cityGet(){
            const params = {
                key: 'CITY',
                orgId: '0',
                parentKey: 'PROVINCE',
                parentValue: this.franchiseeadd.selectProvince
            }
            this.$api.provinceGet(params)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == 0){
                        this.city = response.data.data;
                    }else{
                        this.$message.error('获取城市失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //区
        areaGet(){
            const params = {
                key: 'AREA',
                orgId: '0',
                parentKey: 'CITY',
                parentValue: this.franchiseeadd.selectCity
            }
            this.$api.provinceGet(params)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == 0){
                        this.area = response.data.data;
                    }else{
                        this.$message.error('获取区域失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },

        //选择-省
        selectProvinceFun(){
            this.franchiseeadd.selectCity = '';
            this.franchiseeadd.selectDistrict = '';
            this.cityGet();
        },
        //选择-市
        selectCityFun(){
            this.franchiseeadd.selectDistrict = '';
            this.areaGet();
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
   .quyu{
     .el-input__inner{width: 150px !important;}
   }
</style>


