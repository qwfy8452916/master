<template>
  <div v-loading="loading" class="create">
    <div class="module-header">
      <div class="top"><router-link to="/manager/ad">广告位管理</router-link>  >  新建广告</div>
    </div>
    <div class="form-block">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="位置：" prop="pos">
          <el-radio-group v-model="ruleForm.pos">
            <el-radio :label="1">首页顶部banner</el-radio>
            <el-radio :label="2">说说顶部banner</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题：" prop="title">
          <el-input v-model="ruleForm.title"/>
        </el-form-item>
        <el-form-item label="URL链接：" prop="url">
          <el-input v-model="ruleForm.url"/>
        </el-form-item>
        <el-form-item v-loading="picLoading" label="图片：" prop="banner">
          <el-upload
            :before-upload="beforeAction"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="ruleForm.banner"
            :http-request="upload"
            action=""
            class="upload-banner"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">{{ uploadTips }}</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="有效期：" required>
          <el-col :span="5">
            <el-form-item prop="start_time">
              <el-date-picker v-model="ruleForm.start_time" type="date" placeholder="选择开始时间" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="1" class="line text-center">--</el-col>
          <el-col :span="5">
            <el-form-item prop="end_time">
              <el-date-picker v-model="ruleForm.end_time" type="date" placeholder="选择结束时间" style="width: 100%;" />
            </el-form-item>
          </el-col>
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
        <el-form-item label="排序ID：" prop="sort">
          <el-input v-model="ruleForm.sort" style="width: 100px;"/>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { fetchAdAdd, fetchAdDetail, fetchAdEdit } from '@/api/ad'
import { filterSpecialSymbal, filterSpaceSymbal } from '@/utils/index'
export default {
  name: 'Create',
  data() {
    const validateBanner = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('图片不能为空，请上传'))
      } else {
        callback()
      }
    }
    const validateInteger = (rule, value, callback) => {
      if (!value) {
        return new Error('排序值不能为空，请输入')
      } else {
        if (value < 1 || !Number.isInteger(Number(value))) {
          callback(new Error('排序值输入有误'))
        } else {
          callback()
        }
      }
    }
    return {
      status: [{
        value: '1',
        label: '启用'
      }, {
        value: '2',
        label: '禁用'
      }],
      ruleForm: {
        pos: 2,
        title: '',
        url: '',
        banner: [],
        start_time: '',
        end_time: '',
        status: '1',
        sort: ''
      },
      rules: {
        pos: [
          { required: true, message: '请选择位置', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空，请输入', trigger: 'blur' },
          { min: 1, max: 80, message: '标题仅支持输入80位', trigger: 'blur' }
        ],
        url: [
          { type: 'url', required: true, message: '请输入URL链接', trigger: 'blur' }
        ],
        banner: [
          { validator: validateBanner, trigger: 'blur' }
        ],
        start_time: [
          { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        end_time: [
          { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '排序值不能为空，请输入' },
          { validator: validateInteger, trigger: 'blur' }
        ]
      },
      pos: '1',
      statusVal: '1',
      start_time: '',
      end_time: '',
      adId: '',
      uploadTips: '',
      picSizeIndx: 1,
      picSize: [{
        w: 750,
        h: 220
      }, {
        w: 750,
        h: 324
      }],
      loading: false,
      picLoading: false
    }
  },
  watch: {
    adId() {
      this.fetchAdDetail()
    },
    'ruleForm.pos'() {
      this.updatePicTips()
    },
    'ruleForm.title'(val) {
      this.$nextTick(() => {
        this.ruleForm.title = filterSpecialSymbal(val)
      })
    },
    'ruleForm.url'(val) {
      this.$nextTick(() => {
        this.ruleForm.url = filterSpaceSymbal(val)
      })
    },
    'ruleForm.sort'(val) {
      this.$nextTick(() => {
        this.ruleForm.sort = filterSpecialSymbal(val)
      })
    }
  },
  created() {
    if (this.$route.params.id) {
      this.adId = this.$route.params.id
    } else {
      this.updateUploadTips()
    }
  },
  methods: {
    handleRemove(file, fileList) {
      if (file.status === 'success') {
        this.ruleForm.banner = []
      }
    },
    handlePreview(file) {
      console.log(file)
    },
    upload(item) {
      console.log(item)
      const formData = new FormData()
      formData.append('file', item.file)
      this.picLoading = true
      this.$upload.post('/banner/img', formData)
        .then(res => {
          this.ruleForm.banner.push({
            name: '',
            url: 'http://zxsqn.qizuang.com/' + res.data.data.img_url
          })
          this.picLoading = false
        })
        .catch(err => {
          this.$message.error(err)
          this.picLoading = false
        })
    },
    beforeAction(file) {
      // 清空数据，保证只能上传一张图片
      this.ruleForm.banner = []
      if (!this.ruleForm.pos) {
        this.$message.error('请先选择位置')
        return false
      }
      const width = this.picSize[this.picSizeIndx].w
      const height = this.picSize[this.picSizeIndx].h
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
    submitForm(formName) {
      if (this.ruleForm.start_time && this.ruleForm.end_time) {
        if (this.ruleForm.start_time > this.ruleForm.end_time) {
          this.$message.error('开始日期不能大于结束日期')
          return
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.adId) {
            this.fetchAdEdit()
          } else {
            this.fetchAdAdd()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$confirm('提示确认要取消？', '取消提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$refs[formName].resetFields()
          this.$router.push('/manager/ad')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    fetchAdAdd() {
      const s = new Date(this.ruleForm.start_time)
      const e = new Date(this.ruleForm.end_time)
      this.loading = true
      fetchAdAdd({
        position: parseInt(this.ruleForm.pos),
        title: this.ruleForm.title,
        go_url: this.ruleForm.url,
        img_url: this.ruleForm.banner[0].url,
        start_time: s.getFullYear() + '-' + (parseInt(s.getMonth()) + 1) + '-' + s.getDate(),
        end_time: e.getFullYear() + '-' + (parseInt(e.getMonth()) + 1) + '-' + e.getDate(),
        state: this.ruleForm.status,
        sort: this.ruleForm.sort
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          history.go(-1)
        } else {
          this.$message.error(res.data.error_msg)
          this.loading = false
        }
      })
    },
    fetchAdEdit() {
      const s = new Date(this.ruleForm.start_time)
      const e = new Date(this.ruleForm.end_time)
      this.loading = true
      fetchAdEdit({
        id: this.adId,
        position: parseInt(this.ruleForm.pos),
        title: this.ruleForm.title,
        go_url: this.ruleForm.url,
        img_url: this.ruleForm.banner[0].url,
        start_time: s.getFullYear() + '-' + (parseInt(s.getMonth()) + 1) + '-' + s.getDate(),
        end_time: e.getFullYear() + '-' + (parseInt(e.getMonth()) + 1) + '-' + e.getDate(),
        state: this.ruleForm.status,
        sort: this.ruleForm.sort
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push('/manager/ad')
        } else {
          this.$message.error('网络异常，请稍后再试')
        }
      })
    },
    fetchAdDetail() {
      this.loading = true
      fetchAdDetail({
        id: this.adId
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          const data = res.data.data
          this.ruleForm.pos = data.position
          this.pos = data.position
          this.ruleForm.title = data.title
          this.ruleForm.url = data.go_url
          this.ruleForm.banner.push({
            name: '',
            url: data.img_url
          })
          this.ruleForm.start_time = data.start_time * 1000
          this.ruleForm.end_time = data.end_time * 1000
          this.ruleForm.status = String(data.state)
          this.statusVal = data.state
          this.ruleForm.sort = data.sort
          this.loading = false
          this.updatePicTips()
        }
      })
    },
    updateUploadTips() {
      this.uploadTips = '图片尺寸只能为' + this.picSize[this.picSizeIndx].w + '*' + this.picSize[this.picSizeIndx].h + '，大小不超过600k'
    },
    updatePicTips() {
      if (parseInt(this.ruleForm.pos) === 1) {
        this.picSizeIndx = 0
        this.uploadTips = '图片尺寸只能为' + this.picSize[this.picSizeIndx].w + '*' + this.picSize[this.picSizeIndx].h + '，大小不超过600k'
      } else if (parseInt(this.ruleForm.pos) === 2) {
        this.picSizeIndx = 1
        this.uploadTips = '图片尺寸只能为' + this.picSize[this.picSizeIndx].w + '*' + this.picSize[this.picSizeIndx].h + '，大小不超过600k'
      } else {
        this.uploadTips = ''
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .create{
    margin: 30px;
    .el-row{
      margin-top: 20px;
    }
  }
</style>
