<template>
  <div v-loading="loading" class="account">
    <div class="module-header">
      <div class="top"><span class="caption"><router-link to="/user/list">用户管理</router-link> > 编辑账号</span></div>
    </div>
    <div class="form-block">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="uid：" prop="nickname">
          {{ ruleForm.id }}
        </el-form-item>
        <el-form-item label="用户名/昵称：" prop="nickname">
          {{ ruleForm.nick_name }}
        </el-form-item>
        <el-form-item label="身份标签：" prop="itag">
          <el-select v-model="ruleForm.type" placeholder="选择角色">
            <el-option
              v-for="item in indentifyData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="头像：" prop="avatar">
          <el-upload
            :before-upload="beforeAction"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="ruleForm.avatar"
            :http-request="upload"
            action=""
            class="avatar"
            list-type="picture">
            <el-button size="small" type="primary">浏览</el-button>
            <div slot="tip" class="el-upload__tip">图片尺寸只能为110*110，大小不超过600k</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          {{ ruleForm.sex }}
        </el-form-item>
        <el-form-item label="城市：">
          {{ province }}{{ city }}
        </el-form-item>
        <el-form-item label="登录密码：" prop="password">
          {{ ruleForm.user_pwd }}
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          {{ ruleForm.tel }}
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="ruleForm.status">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章数：" prop="articleSize">
          {{ ruleForm.article_count }}
        </el-form-item>
        <el-form-item label="收藏数：" prop="collectSize">
          {{ ruleForm.collection_count }}
        </el-form-item>
        <el-form-item label="评论数：" prop="disscussSize">
          {{ ruleForm.comment_count }}
        </el-form-item>
        <el-form-item label="注册时间：" prop="regTime">
          {{ ruleForm.time }}
        </el-form-item>
        <el-form-item label="第三方绑定：" prop="thirdBind">
          {{ ruleForm.thirdBind }}
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input
            :rows="4"
            v-model="ruleForm.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { fetchUserInfo, fetchUserEdit, fetchCity } from '@/api/user'
export default {
  name: 'Account',
  data() {
    return {
      status: [{
        value: '1',
        label: '启用'
      }, {
        value: '2',
        label: '禁用'
      }],
      indentifyData: [{
        value: '1',
        label: '用户'
      }, {
        value: '2',
        label: '官方号'
      }, {
        value: '3',
        label: '公司员工'
      }],
      cityData: null,
      ruleForm: {
        nick_name: '',
        type: '',
        avatar: [],
        sex: '',
        province: '',
        city: '',
        user_pwd: '',
        tel: '',
        status: '',
        article_count: '',
        collect_count: '',
        comment_count: '',
        time: '',
        thirdBind: '',
        remark: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择身份', trigger: 'change' }
        ],
        status: [
          { message: '请选择状态', trigger: 'change' }
        ],
        note: [
          { min: 0, max: 500, message: '最多500位', trigger: 'blur' }
        ]
      },
      statusVal: '1',
      gender: 1,
      start_time: '',
      end_time: '',
      itag: '',
      avatar: [],
      userId: '',
      loading: false,
      province: '',
      city: ''
    }
  },
  created() {
    this.userId = this.$route.params.id
    this.fetchUserInfo()
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    upload(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      this.$upload.post('user/logoup/', formData)
        .then(res => {
          this.ruleForm.avatar.push({
            name: '',
            url: 'http://zxsqn.qizuang.com/' + res.data.data.img_path
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    beforeAction(file) {
      // 清空数据，保证只能上传一张图片
      this.ruleForm.avatar = []
      console.log(this.ruleForm.avatar)
      const width = 110
      const height = 110
      const _this = this
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function() {
          const img = new Image()
          img.onload = function() {
            const valid = parseInt(this.width) === parseInt(width) && parseInt(this.height) === parseInt(height)
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
    },
    fetchUserInfo() {
      fetchUserInfo({
        id: this.userId
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.ruleForm = res.data.data
          this.ruleForm.type = String(this.ruleForm.type)
          this.ruleForm.status = String(this.ruleForm.status)
          this.ruleForm.sex = parseInt(this.ruleForm.sex) === 1 ? '男' : '女'
          this.ruleForm.avatar = [{
            name: '',
            url: this.ruleForm.logo
          }]
          this.fetchCity()
        }
      })
    },
    fetchUserEdit() {
      this.loading = true
      fetchUserEdit({
        id: this.userId,
        type: this.ruleForm.type,
        status: this.ruleForm.status,
        remark: this.ruleForm.remark
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.$router.push('/user/list')
        }
      })
    },
    fetchCity() {
      fetchCity().then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.cityData = res.data.data
          this.filterCityName()
        }
      })
    },
    filterCityName() {
      this.ruleForm.province = this.cityData[this.ruleForm.province_id].province_name
      this.province = this.cityData[this.ruleForm.province_id].province_name
      const cityArr = this.cityData[this.ruleForm.province_id].child
      cityArr.forEach(item => {
        if (parseInt(item.city_id) === parseInt(this.ruleForm.city_id)) {
          this.ruleForm.city = item.city_name
          this.city = item.city_name
        }
      })
      console.log(this.ruleForm.province)
      console.log(this.ruleForm.city)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fetchUserEdit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$router.push('/user/list')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .account{
    margin: 30px;
    .el-row{
      margin-top: 20px;
    }
  }
</style>
