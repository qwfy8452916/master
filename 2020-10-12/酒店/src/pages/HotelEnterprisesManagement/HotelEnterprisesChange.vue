
<template>
  <div class="CabTypeListAdd">
     <p class="title">修改协议单位</p>
     <el-form align="left" :model="enterprisesData" label-width="120px" :rules="rules" ref="enterprisesData">
        <el-form-item label="单位名称" prop="enterpiseName">
           <el-input v-model="enterprisesData.enterpiseName" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="enterpiseAddr">
           <el-input v-model="enterprisesData.enterpiseAddr" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="enterpiseContact">
           <el-input v-model="enterprisesData.enterpiseContact" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="enterpiseContactMobile">
           <el-input v-model.number="enterprisesData.enterpiseContactMobile" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="协议开始时间" prop="contractTimeStart">
            <el-date-picker
                v-model="enterprisesData.contractTimeStart"
                type="datetime"
                value-format='yyyy-MM-dd HH:mm:ss'
                placeholder="选择日期时间"
                :picker-options="pickerOptions0"
                align="right">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="协议结束时间" prop="contractTimeEnd">
            <el-date-picker
                v-model="enterprisesData.contractTimeEnd"
                value-format='yyyy-MM-dd HH:mm:ss'
                type="datetime"
                :picker-options="pickerOptions1"
                placeholder="选择日期时间"
                align="right">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="默认折扣" prop="defaultDiscount">
           <el-input v-model="enterprisesData.defaultDiscount"></el-input>%
        </el-form-item>
        <el-form-item label-width="120px">
           <el-button @click="cancelBtn">取消</el-button>
           <el-button type="primary" @click="sureBtn('enterprisesData')">确定</el-button>
        </el-form-item>
     </el-form>
  </div>
</template>

<script>
  export default{
    name:'HotelEnterprisesChange',
    data(){
      var validator = (rule, value, callback) => {
        if(!/^1[3456789]\d{9}$/.test(value)){
            callback(new Error('请规范填写联系方式'));
        }else{
            callback();
        }
      }
      var validator1 = (rule, value, callback) => {
        if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)){
            callback(new Error('请规范填写比例'));
        }else{
            callback();
        }
      }
      return {
        authzData:'',
        enterprisesData:{
            enterpiseName:'',
            enterpiseAddr:'',
            enterpiseContact:'',
            enterpiseContactMobile:'',
            contractTimeStart:'',
            contractTimeEnd:'',
            defaultDiscount:'',
        },
        modifyid:"",
        pickerOptions0: {
            disabledDate: (time) => {
                if (this.enterprisesData.contractTimeEnd != "") {
                    return time.getTime() < Date.now() - 86400000 || time.getTime() < this.contractTimeEndC;
                } else {
                    return time.getTime() < Date.now() - 86400000;
                }
            }
        },
        pickerOptions1: {
            disabledDate: (time) => {
                if (this.enterprisesData.contractTimeStart != "") {
                    return time.getTime() < Date.now() - 86400000 || time.getTime() < this.contractTimeStartC;
                } else {
                    return time.getTime() < Date.now() - 86400000;
                }
            }
        },
        hotelId:"",
        rules:{
            enterpiseName:[{required:true,message:"请填写单位名称",trigger:"blur"}],
            enterpiseAddr:[{required:true,message:"请填写地址",trigger:"blur"}],
            enterpiseContact:[{required:true,message:"请填写联系人",trigger:"blur"}],
            enterpiseContactMobile:[{required:true,message:"请填写联系方式",trigger:"blur"},{validator: validator,trigger: 'blur'}],
            contractTimeStart:[{required:true,message:"请填写协议开始时间",trigger:"change"}],
            defaultDiscount:[{required:true,message:"请填写默认折扣",trigger:"blur"},{validator: validator1,trigger: 'blur'}],
        },

      }
    },
    computed: {
        contractTimeStartC(){
            let data = new Date(this.enterprisesData.contractTimeStart)
            return data.getTime(data)
        },
        contractTimeEndC(){
            let data = new Date(this.enterprisesData.contractTimeEnd)
            return data.getTime(data) 
        },
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hotelId = localStorage.getItem('hotelId');
        this.modifyid = this.$route.query.modifyid;
        this.getFillbackData();
    },
    methods:{
        getFillbackData(){
            this.$api.getOneEnterprises(this.modifyid).then(response => {
                if(response.data.code == 0){
                    this.enterprisesData = {
                        enterpiseName:response.data.data.enterpiseName,
                        enterpiseAddr:response.data.data.enterpiseAddr,
                        enterpiseContact:response.data.data.enterpiseContact,
                        enterpiseContactMobile:response.data.data.enterpiseContactMobile,
                        contractTimeStart:response.data.data.contractTimeStart,
                        contractTimeEnd:response.data.data.contractTimeEnd,
                        defaultDiscount:response.data.data.defaultDiscount,
                    }
                }else{
                    this.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //取消
        cancelBtn(){
            this.$router.push({name:'HotelEnterprisesList'})
        },
        //确定
        sureBtn(enterprisesData){
            let that=this;
            let params = this.enterprisesData
            params.hotelId = this.hotelId
            this.$refs[enterprisesData].validate((valid,model)=>{
                if(valid){
                    this.$api.changeEnterprises(params,this.modifyid).then(response=>{
                        if(response.data.code=='0'){
                            that.$message.success("操作成功")
                            that.$router.push({name:"HotelEnterprisesList"})
                        }else{
                            that.$alert(response.data.msg,"警告",{
                            confirmButtonText:"确定"
                                })
                            }
                        })
                }else{
                    console.log("error!")
                }
            })
        },
    }
  }
</script>

<style lang="less" scope>
  .CabTypeListAdd{
    .title{font-weight: bold;text-align: left;}
    .el-input,.el-select,.el-textarea{
      width: 270px;
    }
    .cancelleft.el-button--primary{
      margin-left: 50px;
    }
  }
</style>




















