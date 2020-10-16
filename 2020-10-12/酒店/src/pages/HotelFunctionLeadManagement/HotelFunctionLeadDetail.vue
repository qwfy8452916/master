
<template>
  <div class="CabTypeListAdd">
     <p class="title">功能区导航详情</p>
     <el-form align="left" :model="addLinkData" label-width="120px" :rules="rules" ref="addLinkData">
         <el-form-item label="功能区" prop="hotelFuncId">
            <el-select :disabled="true" v-model="addLinkData.hotelFuncId" placeholder="选择功能区">
                <el-option v-for="item in funcList" :value="item.id" :label="item.label" :key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="关联酒店" prop="hotelRelateId">
            <el-select :disabled="true" v-model="addLinkData.hotelRelateId" placeholder="选择关联酒店">
                <el-option v-for="item in relateHotelList" :value="item.id" :label="item.label" :key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="排序" label-width="120px" prop="sort">
           <el-input :disabled="true" v-model="addLinkData.sort" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="创建人" label-width="120px" prop="sort">
           <el-input :disabled="true" v-model="addLinkData.createrName" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" label-width="120px" prop="sort">
           <el-input :disabled="true" v-model="addLinkData.createdAt" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label-width="120px">
           <el-button @click="cancelBtn">返回</el-button>
        </el-form-item>
     </el-form>
  </div>
</template>

<script>
  export default{
    name:'LonganCabTypeListAdd',
    data(){
      var validator = (rule, value, callback) => {
        if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(value)){
            callback(new Error('请规范填写金额'));
        }else{
            callback();
        }
      }
      return {
        authzData:'',
        loadingH:false,
        relateHotelList:[],
        funcList:[],
        addLinkData:{
            hotelFuncId:'',
            hotelRelateId:'',
            sort:'',
        },
        hotelId:"",
        guideID:"",
        rules:{
            hotelFuncId:[{required:true,message:"请选择功能区",trigger:"change"}],
            hotelRelateId:[{required:true,message:"请选择关联酒店",trigger:"change"}],
            sort:[{required:true,message:"请填写排序",trigger:"blur"}],
        },

      }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hotelId = localStorage.getItem('hotelId');
        this.guideID = this.$route.query.modifyid;
        this.hotelFunctionList()
        this.relateHotel()
        this.getFillbackData()

    },
    methods:{
        getFillbackData(){
            let that = this
            this.$api.getOneHotelGuidance(this.guideID).then(response => {
                if(response.data.code == 0){
                    let ralateData = response.data.data
                    this.addLinkData = {
                        hotelFuncId: ralateData.hotelFuncId,
                        hotelRelateId: ralateData.hotelRelateId,
                        sort: ralateData.sort,
                        createdAt: ralateData.createdAt,
                        createrName: ralateData.createrName,
                    }
                }else{
                    that.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                that.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //取消
        cancelBtn(){
            this.$router.push({name:'HotelFunctionLeadList'})
        },
        hotelFunctionList(){
            const params = {
                hotelId: this.hotelId,
                funcType: 7,
            }
            this.$api.getFuncType({params}).then(response => {
                if(response.data.code==0){
                    let recordsData = response.data.data;
                    let areaList = recordsData.map(item=>{
                        return {
                            label: item.funcCnName,
                            id: item.id,
                        }
                    })
                    this.funcList = areaList;
                }else{
                    this.$alert(response.data.msg,"警告",{
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
        relateHotel(){
            const params = {
                hotelId: this.hotelId,
                pageNo:1,
                pageSize:50,
            }
            this.$api.getRelateHotel({params}).then(response => {
                if(response.data.code==0){
                    let recordsData = response.data.data.records;
                    let areaList = recordsData.map(item=>{
                        return {
                            label: item.relateHotelName,
                            id: item.id,
                        }
                    })
                    this.relateHotelList = areaList;
                }else{
                    this.$alert(response.data.msg,"警告",{
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
        //确定
        sureBtn(addLinkData){
            let that=this;
            let params = this.addLinkData
            this.$refs[addLinkData].validate((valid,model)=>{
            if(valid){
                this.$api.changeHotelGuidance(params,this.guideID).then(response=>{
                    if(response.data.code=='0'){
                        that.$message.success("操作成功")
                        that.$router.push({name:"HotelFunctionLeadList"})
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




















