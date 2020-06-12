<template>
    <div class="LonganFranchiseeedit">
       <h3 class="alignleft">修改合作伙伴</h3>
       <el-form :model="franchiseedit" ref="franchiseedit" :rules="rules" label-width="135px" :inline="true">
         <div class="hangitem">
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="franchiseedit.type" :disabled="true">
                <el-radio v-if="franchiseedit.type=='c'" label="c">企业</el-radio>
                <el-radio v-if="franchiseedit.type=='p'" label="p">个人</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item v-if="franchiseedit.type=='c'" label="统一社会信用代码" prop="uscc">
              <el-input :disabled="true" v-model="franchiseedit.uscc"></el-input>
            </el-form-item>
            <el-form-item v-if="franchiseedit.type=='p'" label="身份证号码" prop="idno">
              <el-input :disabled="true" v-model="franchiseedit.idno" maxlength="30"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="合作伙伴名称" prop="name">
              <el-input v-model="franchiseedit.name" maxlength="50"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="franchiseedit.contact" maxlength="10"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="手机号" prop="contactPhone">
              <el-input v-model="franchiseedit.contactPhone" maxlength="11"></el-input>
            </el-form-item>
          </div>
          <div class="hangitem quyu">
              <el-form-item label="区域选择" prop="province">
                  <el-select v-model="franchiseedit.province" placeholder="省级地区" @change="selectProvinceFun">
                      <el-option v-for="item in province" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item prop="city">
                  <el-select v-model="franchiseedit.city" placeholder="市级地区" @change="selectCityFun">
                      <el-option v-for="item in city" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item prop="area">
                <el-select v-model="franchiseedit.area" placeholder="区级地区">
                      <el-option v-for="item in area" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                  </el-select>
              </el-form-item>
          </div>
          <div class="hangitem">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="franchiseedit.address" maxlength="30"></el-input>
            </el-form-item>
          </div>
       </el-form>



        <el-row>
        <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">取消</el-button>
                <el-button v-if="authzData['F:BO_ALLY_ALLY_EDIT_SUBMIT']" type="primary" @click="surebtn('franchiseedit')">确定</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: 'LonganFranchiseeedit',
    data() {
        return{
          authzData: '',
          partberid:'',  //伙伴id
          franchiseedit:{
              type:'',
              uscc:'',
              idno:'',
              name:'',
              contact:'',
              contactPhone:'',
              address:'',
              province:'',
              city:'',
              area:'',
          },
          rules:{
            type: {required: true, message: '请选择类型！', trigger: 'change'},
            uscc: {required: true, message: '请输入统一社会信用代码！', trigger: 'blur'},
            idno: {required: true, message: '请输入身份证号码！', trigger: 'blur'},
            name: {required: true, message: '请输入合作伙伴名称！', trigger: 'blur'},
            contactPhone: {required: true, message: '请输入手机号！', trigger: 'blur'},
            province: {required: true, message: '请选择省份！', trigger: 'change'},
            city: {required: true, message: '请选择市！', trigger: 'change'},
            area: {required: true, message: '请选择区域！', trigger: 'change'},
            address: {required: true, message: '请输入详细地址！', trigger: 'blur'},
          },
          province: [],
            city: [],
            area: [],
        }
    },
    created(){
        this.partberid=this.$route.query.id;
        this.Getdata()

    },
    mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})

        this.provinceGet();

    },

    methods: {

       //取消
      cancelbtn(){
       this.$router.push({name:'LonganFranchiseelist'})
      },

      surebtn(formData){
        let that=this;
        let params={
               type:this.franchiseedit.type,
               uscc:this.franchiseedit.uscc,
               idno:this.franchiseedit.idno,
               name:this.franchiseedit.name,
               contact:this.franchiseedit.contact,
               contactPhone:this.franchiseedit.contactPhone,
               province:this.franchiseedit.province,
               city:this.franchiseedit.city,
               area:this.franchiseedit.area,
               address:this.franchiseedit.address,
        }
        this.$refs[formData].validate((valid, model) => {
           if(valid){
              this.$api.editpartner(params,that.partberid).then(response=>{
                if(response.data.code==0){
                    that.$message.success("操作成功")
                    that.$router.push({name:"LonganFranchiseelist"})
                }else{
                  that.$alert(response.data.msg,"警告",{
                    confirmButtonText:"确定"
                  })
                }
              }).catch(err=>{
                that.$alert(err,"警告",{
                  confirmButtonText:"确定"
                })
              })
           }
        })
      },

        //获取数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.getpartnerdetail({params},that.partberid).then(response=>{
                if(response.data.code==0){
                  that.franchiseedit.province=response.data.data.provinceName.dictValue
                  that.franchiseedit.city=response.data.data.cityName.dictValue
                  that.franchiseedit=response.data.data;
                  that.franchiseedit.area=response.data.data.areaName.dictValue
                  that.cityGet();
                  that.areaGet();
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
                parentValue: this.franchiseedit.province
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
                parentValue: this.franchiseedit.city
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
            this.franchiseedit.city = '';
            this.franchiseedit.area = '';
            this.cityGet();
        },
        //选择-市
        selectCityFun(){
            this.franchiseedit.area = '';
            this.areaGet();
        },

    }
}
</script>

<style lang="less" scoped>
.LonganFranchiseeedit{
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


