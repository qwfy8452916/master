
<template>
  <div class="CabTypeListAdd">
     <p class="title">新增链接</p>
     <el-form align="left" :model="addLinkData" :rules="rules" ref="addLinkData">
        <el-form-item label="链接名称" label-width="120px" prop="linkName">
           <el-input v-model="addLinkData.linkName" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="120px" prop="linkType">
           <el-select @change="changeLink" v-model="addLinkData.linkType">
              <el-option label="内部链接" value="1"></el-option>
              <el-option label="外部链接" value="2"></el-option>
           </el-select>
           <el-popover
              placement="right-start"
              title="提示"
              width="200"
              trigger="hover"
              content="外部链接指在浏览器可以直接访问的链接；内部链接指只有指定终端内部才有意义的页面路径，内部链接必须指定适用的终端，不同终端可以定义不同格式的路径">
              <el-button style="border:none;padding:0;vertical-align:middle" slot="reference">
                  <i class="el-icon-warning-outline" style="font-size:18px;"></i>
              </el-button>
            </el-popover>
        </el-form-item>
        <el-form-item label="终端" label-width="120px" prop="linkTerminal">
            <el-select :disabled="addLinkData.linkType == 2" v-model="addLinkData.linkTerminal">
              <el-option label="购物小程序" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="链接路径" label-width="120px" prop="linkUrl">
           <el-input v-model="addLinkData.linkUrl"></el-input>
        </el-form-item>
        <el-form-item label="需要参数" label-width="120px" prop="isNeedParameter">
           <el-switch v-model="addLinkData.isNeedParameter"></el-switch>
           <el-popover
              placement="right-start"
              title="提示"
              width="200"
              trigger="hover"
              content="默认为不需要；不需要参数的链接不能设置参数如果打开此开关，则新增的链接状态为“禁用”，且必须设置参数后才可以启用">
              <el-button style="border:none;padding:0;vertical-align:middle" slot="reference">
                  <i class="el-icon-warning-outline" style="font-size:18px;"></i>
              </el-button>
            </el-popover>
        </el-form-item>
        <el-form-item label="备注" label-width="120px" prop="linkRemark">
            <el-input v-model="addLinkData.linkRemark" maxlength="250" type="textarea" :rows="8"></el-input>
        </el-form-item>
        <el-form-item label-width="120px">
           <el-button @click="cancelBtn">取消</el-button>
           <el-button type="primary" @click="sureBtn('addLinkData')">确定</el-button>
        </el-form-item>
     </el-form>
  </div>
</template>

<script>
  export default{
    name:'LonganCabTypeListAdd',
    data(){
      var validate = (rule,value,callback) => {
        if(this.addLinkData.linkType == 1){
          if(!value){
            callback(new Error('请选择终端'))
          }else{
            callback()
          }
        }else{
          callback()
        }
      }
      return {
         authzData:'',
         addLinkData:{
            linkName:'',
            linkType:'',
            linkTerminal:'',
            linkUrl:'',
            isNeedParameter:false,
            linkRemark:'',
         },
         rules:{
            linkName:{required:true,message:"请填写链接名称",trigger:"blur"},
            linkUrl:{required:true,message:"请填写链接路径",trigger:"blur"},
            linkType:{required:true,message:"请选择类型",trigger:"change"},
            linkTerminal:{validator:validate,trigger:"change"},
         },

      }
    },
    mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods:{
      changeLink(){
        if(this.addLinkData.linkType == 2){
          this.addLinkData.linkTerminal = ''
        }
      },
      //取消
      cancelBtn(){
        this.$router.push({name:'LonganFuncLinkList'})
      },

      //确定
      sureBtn(addLinkData){
        let that=this;
        let params = this.addLinkData
        params.isNeedParameter = params.isNeedParameter?1:0;
        this.$refs[addLinkData].validate((valid,model)=>{
          if(valid){
            this.$api.addNewLink(params).then(response=>{
               if(response.data.code=='0'){
                  that.$message.success("操作成功")
                  that.$router.push({name:"LonganFuncLinkList"})
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




















