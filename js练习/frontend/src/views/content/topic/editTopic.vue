<template>
  <div style="padding: 30px;">
    <div class="module-header">
      <div class="top"><span class="caption">{{this.topicId?"编辑话题":"新建话题"}}</span>
      </div>
      <div class="middle">
        <el-form ref="formInfo" :model="ruleForm" :rules="rules" label-width="150px" class="ruleForm">
          <el-form-item label="标题:" prop="title">
            <el-col :span="10">
              <el-input v-model="ruleForm.title" maxlength="80"/>
            </el-col>
          </el-form-item>
          <el-form-item label="摘要:" prop="desc">
            <el-col :span="10">
              <el-input v-model="ruleForm.desc" rows="5" type="textarea" maxlength="500"/>
            </el-col>
          </el-form-item>
          <el-form-item label="封面图:" prop="pic">
             <div class="picture">
               <el-upload
                 ref="upload"
                 :limit="1"
                 action=""
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :before-upload="beforeAction"
                 :http-request="upload"
                 :file-list="ruleForm.pic"
                 list-type="picture">
                 <el-button size="small" type="primary">点击上传</el-button>
                 <div slot="tip" class="el-upload__tip">图片尺寸只能是750*384，且大小不超过600k</div>
               </el-upload>
             </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formInfo')">立即发布</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAddTopic, fetchEidtTopicShow, fetchEidtTopic, fetchUploadImg } from '@/api/topic'
export default {
  name: 'editTopic',
  data() {
    let titleCheck = (rule,value,callback) => {
      if(!value) {
        callback(new Error('标题不能为空，请输入'))
      }else if(value.length>80){
        callback(new Error('仅支持输入160位字符或80个中文'))
      }else{
        callback()
      }
    }
    return {
      ruleForm: {
        id: '',
        title: '',
        desc: '',
        pic: []
      },
      rules: {
        title: [
          { required: true, validator: titleCheck, trigger: 'blur' }
        ],
        desc:[
          { max:500, message: '最多输入500字', trigger: 'change' }
        ],
        pic: [
          { required: true, message: '请上传图片',trigger: 'change'}
        ]
      },
      topicId:'',
      picture:''

    }
  },
  watch:{
    topicId(){
      this.fetchEidtTopicShow()
    }
  },
  created(){
    if(this.$route.params.id){
      this.topicId = this.$route.params.id
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.topicId){
            this.fetchEidtTopic()
          }else {
            this.fetchAddTopic()
          }
        }
        else {
          return false
        }
      })
    },
    fetchEidtTopic() {
      fetchEidtTopic({
        id: this.topicId,
        title: this.ruleForm.title,
        outline: this.ruleForm.desc,
        img_url: this.ruleForm.pic[0].url
      }).then((res) => {
        if(res.status === 200 && parseInt(res.data.error_code) === 0 ){
          this.$message({
            type: 'success',
            message: '成功'
          })
          history.go(-1)
        }
      })
    },
    fetchAddTopic(){
      fetchAddTopic({
        title: this.ruleForm.title,
        outline: this.ruleForm.desc,
        img_url: this.ruleForm.pic[0].url
      }).then((res) => {
        if(res.status === 200 && parseInt(res.data.error_code) === 0 ){
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          history.go(-1)
        }
      })
    },
    fetchEidtTopicShow(){
      fetchEidtTopicShow({
        id: this.topicId
      }).then((res) => {
        this.ruleForm.title = res.data.data.title
        this.ruleForm.desc = res.data.data.outline
        this.ruleForm.pic.push({
          name: '封面',
          url:res.data.data.img_url
        })
      } )
    },
    resetForm() {
      this.$confirm("确认要取消？取消后不会保存所编写的内容!","取消提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.formInfo.resetFields()
        history.go(-1)
      }).catch(() => {

      })

    },

    handleRemove(file, fileList) {
     /* console.log('file',file);*/
    },
    handlePreview(file) {
      // console.log(file);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    upload(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      this.$upload.post('/topic/img', formData)
        .then(res => {
          this.ruleForm.pic.push({
            name: '',
            url: 'http://zxsqn.qizuang.com/' + res.data.data.img_url
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    beforeAction(file) {
      // 清空数据，保证只能上传一张图片
      this.ruleForm.pic = []
      const _this = this
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function() {
          const img = new Image()
          img.onload = function() {
            const valid = parseInt(this.width) === 750 && parseInt(this.height) === 384
            if (!valid) {
              _this.$message.error('图片尺寸不符合要求')
              reject()
            }
            resolve()
          }
          img.src = reader.result
        }
        reader.readAsDataURL(file)
      })
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-upload__tip{
  display: inline-block;
  margin-left: 10px;
}
.picture{
  width: 500px;
}
</style>
