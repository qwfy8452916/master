<template>
  <div v-loading="loading" class="account">
    <div class="module-header">
      <div class="top"><span class="caption"><router-link to="/user/list">用户管理</router-link> > 新建账号</span></div>
    </div>
    <div class="form-block">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="用户名/昵称：" prop="nickname">
          <el-input v-model="ruleForm.nickname"/>
        </el-form-item>
        <el-form-item label="身份标签：" prop="itag">
          <el-select v-model="ruleForm.itag" placeholder="选择角色">
            <el-option
              v-for="item in indentifyData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-loading="picLoading" label="头像：" prop="avatar">
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
          <el-radio v-model="ruleForm.gender" label="1">男</el-radio>
          <el-radio v-model="ruleForm.gender" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="城市：" required>
          <el-col :span="5">
            <el-form-item prop="province">
              <el-select v-model="ruleForm.province" placeholder="请选择">
                <el-option
                  v-for="item in provinceData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="5">
            <el-form-item prop="city">
              <el-select v-model="ruleForm.city" placeholder="请选择">
                <el-option
                  v-for="item in areaData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="登录密码：" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请设置6-16位密码"/>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="ruleForm.phone"/>
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
        <el-form-item label="备注：" prop="note">
          <el-input
            :rows="4"
            v-model="ruleForm.note"
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
import { isvalidPhone } from '@/utils/validate'
import { fetchUserAdd, fetchCity } from '@/api/user'
import { filterSpecialSymbal, filterSpaceSymbal, checkPureSymbal } from '@/utils/index'
const validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}
const validPsw = (rule, value, callback) => {
  if (!value) {
    callback(new Error('登录密码不能为空，请输入'))
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('密码输入错误，6-16位数字、英文字母，特殊符号组成的密码'))
  } else if (!checkPureSymbal(value)) {
    callback(new Error('密码输入错误，6-16位数字、英文字母，特殊符号组成的密码'))
  } else {
    callback()
  }
}
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
        value: '0',
        label: '选择角色'
      }, {
        value: '1',
        label: '用户'
      }, {
        value: '2',
        label: '官方号'
      }, {
        value: '3',
        label: '公司员工'
      }],
      provinceData: [],
      areaData: [],
      ruleForm: {
        nickname: '',
        itag: '0',
        avatar: [],
        gender: '',
        province: '',
        city: '',
        password: '',
        phone: '',
        status: '2',
        note: ''
      },
      rules: {
        nickname: [
          { required: true, message: '用户名/昵称不能为空，请输入', trigger: 'blur' },
          { min: 1, max: 15, message: '最多支持15位', trigger: 'blur' }
        ],
        itag: [
          { required: true, message: '身份标签不能为空，请选择', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '性别不能为空，请选择', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        password: [
          { required: true, trigger: 'change', validator: validPsw }
        ],
        phone: [
          { required: true, message: '手机号不能为空，请输入', trigger: 'change' },
          { required: true, trigger: 'change', validator: validPhone }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
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
      cityData: null,
      loading: false,
      picLoading: false
    }
  },
  watch: {
    'ruleForm.province'() {
      this.handleCityData()
    },
    'ruleForm.nickname'(val) {
      this.$nextTick(() => {
        this.ruleForm.nickname = filterSpecialSymbal(val)
      })
    },
    'ruleForm.phone'(val) {
      this.$nextTick(() => {
        this.ruleForm.phone = filterSpecialSymbal(val)
      })
    },
    'ruleForm.password'(val) {
      this.$nextTick(() => {
        this.ruleForm.password = filterSpaceSymbal(val)
      })
    },
    'ruleForm.note'(val) {
      this.$nextTick(() => {
        this.ruleForm.note = filterSpaceSymbal(val)
      })
    }
  },
  created() {
    this.fetchCity()
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
      this.picLoading = true
      this.$upload.post('user/logoup/', formData)
        .then(res => {
          this.ruleForm.avatar.push({
            name: '',
            url: 'http://zxsqn.qizuang.com/' + res.data.data.img_path
          })
          this.picLoading = false
        })
        .catch(err => {
          console.log(err)
          this.picLoading = false
        })
    },
    beforeAction(file) {
      // 清空数据，保证只能上传一张图片
      this.ruleForm.avatar = []
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
    fetchUserAdd() {
      this.loading = true
      fetchUserAdd({
        nick_name: this.ruleForm.nickname,
        type: this.ruleForm.itag,
        logo: this.ruleForm.avatar[0].url,
        sex: this.ruleForm.gender,
        province_id: this.ruleForm.province,
        city_id: this.ruleForm.city,
        user_pwd: this.ruleForm.password,
        tel: this.ruleForm.phone,
        status: this.ruleForm.status,
        remark: this.ruleForm.note
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({
            path: '/user/list'
          })
        } else {
          this.$message({
            type: 'error',
            message: '添加失败!'
          })
          this.loading = false
        }
      })
    },
    fetchCity() {
      fetchCity().then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.cityData = res.data.data
          this.handleProvinceData()
        }
      })
    },
    handleProvinceData() {
      for (const p in this.cityData) {
        this.provinceData.push({
          value: this.cityData[p].province_id,
          label: this.cityData[p].province_name
        })
      }
    },
    handleCityData() {
      this.areaData = []
      this.ruleForm.city = ''
      this.cityData[this.ruleForm.province].child.forEach(item => {
        this.areaData.push({
          value: item.city_id,
          label: item.city_name
        })
      })
    },
    submitForm(formName) {
      if (parseInt(this.ruleForm.itag) === 0) {
        this.$message.error('身份标签不能为空，请选择')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fetchUserAdd()
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
