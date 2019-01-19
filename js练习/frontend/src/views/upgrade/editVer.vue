<template>
  <div style="padding: 30px;">
    <div class="module-header">
      <div class="top"><span class="caption">{{ this.verId ? "编辑版本" : "新建版本" }}</span>
      </div>
      <div class="middle">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="ruleForm">
          <el-form-item label="升级系统:" prop="category">
            <el-radio-group v-model="ruleForm.category" @change="changeHandle">
              <el-radio :label="1">ios</el-radio>
              <el-radio :label="2">android</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="版本号:" prop="version">
            <el-col :span="5">
              <el-input v-model="ruleForm.version" maxlength="50"/>
            </el-col>
          </el-form-item>
          <el-form-item label="app下载链接地址:" prop="link">
            <el-col :span="5">
              <el-input v-model="ruleForm.link"/>
            </el-col>
          </el-form-item>
          <el-form-item label="是否强制升级:" prop="upgrade">
              <el-radio-group v-model="ruleForm.upgrade" @change="isUpgrade">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="升级内容:" prop="content">
            <el-col :span="5">
              <el-input v-model="ruleForm.content" type="textarea" maxlength="500"/>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchAddVersion, } from '@/api/upgrade'
export default {
  data() {
    let versionCheck =  (rule,value,callback) => {
      const reg = /^v[0-9]+\.[0-9]+\.[0-9]+$/
        if(!value){
          return callback('版本号不能为空')
        }else if(! reg.test(value.toLowerCase())){
          return callback('版本号输入有误')
        }else if(value.length>50){
          return callback('版本号长度超过限制')
        }else {
          callback()
        }
    }
    let appCheck = (rule,value,callback) => {
      const reg = /^[^\u4e00-\u9fa5]+$/
      if(!reg.test(value)){
        callback('APP下载链接输入有误')
      }else if(!value){
        callback('APP下载链接不能为空')
      }else {
        callback()
      }
    }
    let contentCheck = (rule,value,callback) => {
      if(!value){
        callback('升级内容不能为空，请输入')
      }else if(value.length >500){
        callback('最多500个中文/1000个字符')
      }else {
        callback()
      }
    }
    return {
      ruleForm: {
        id: '',
        category: '',
        version: '',
        link: '',
        upgrade: '',
        content: ''
      },
      rules: {
        category: [
          { required: true, message: '升级系统不能为空', trigger: 'change' }
        ],
        version: [
          { required: true, validator: versionCheck, trigger: 'blur' }
        ],
        link: [
          { required: true, validator: appCheck, trigger: 'change' }
        ],
        upgrade: [
          { required: true, message: '是否强制升级不能为空', trigger: 'change' }
        ],
        content: [
          { required: true, validator: contentCheck, trigger: 'blur' }
        ]
      },
      verId:''
    }
  },
  watch: {
    verId(){
        this.fetchGetVersion()
    }
  },
  created(){
    if(this.$route.params.id){
      this.verId = this.$route.params.id
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fetchAddVersion()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$confirm("确认要取消？取消后不保存所编写内容！", "取消提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((attr) => {
        if(attr === 'confirm'){
          this.$message({
            type: 'success',
            message: '取消成功'
          })
          this.$refs[formName].resetFields()
          // history.go(-1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已经取消'
        })
      })
    },
    fetchAddVersion(){
      fetchAddVersion({
        category: this.ruleForm.category,
        version: this.ruleForm.version,
        link: this.ruleForm.link,
        upgrade: this.ruleForm.upgrade,
        content: this.ruleForm.content
      }).then((res) => {
        if(res.status === 200 && parseInt(res.data.error_code) === 0){
          this.$message({
            type: 'success',
            message: '成功'
          })
          history.go(-1)
        }
      })
    },
    changeHandle(val){
     // console.log(val)
    },
    isUpgrade(val){
     // console.log(val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .middle{
    padding: 30px;
    .line{
      width: 15px;
      text-align: center;
    }
    .el-textarea{
      width: 500px;
    }
  }

</style>
