<template>
  <div class="create">
    <div class="module-header">
      <div class="top"><router-link to="/manager/cover">封面管理</router-link> > 新建封面</div>
    </div>
    <div class="form-block">
      <el-form v-loading="loading" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="位置：" prop="pos">
          <el-select v-model="ruleForm.pos">
            <el-option
              v-for="item in pos"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标题：" prop="title">
          <el-input v-model="ruleForm.title"/>
        </el-form-item>
        <el-form-item label="描述：" prop="desc">
          <el-input
            v-model="ruleForm.desc"
            :rows="4"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item v-loading="picLoading" label="图片：" prop="cover">
          <el-upload
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="ruleForm.cover"
            :before-upload="beforeAction"
            :http-request="upload"
            action=""
            class="upload-banner"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">{{ uploadTips }}</div>
          </el-upload>
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
import { fetchCoverDetail, fetchCoverEdit, fetchCoverAdd } from '@/api/cover'
import { filterSpecialSymbal, filterSpaceSymbal } from '@/utils/index'
export default {
  name: 'Create',
  data() {
    return {
      pos: [{
        value: '0',
        label: '请选择'
      }, {
        value: '1',
        label: '品牌榜单'
      }, {
        value: '2',
        label: '分类榜单'
      }, {
        value: '3',
        label: '美家案例'
      }, {
        value: '4',
        label: '装修心得'
      }, {
        value: '5',
        label: '话题讨论'
      }, {
        value: '6',
        label: 'PK广场'
      }],
      ruleForm: {
        pos: '0',
        title: '',
        cover: [],
        desc: ''
      },
      rules: {
        pos: [
          { required: true, message: '位置不能为空，请选择', trigger: 'change' }
        ],
        title: [
          { message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 80, message: '标题仅支持输入80位', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '图片不能为空，请上传', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '描述不能为空，请输入', trigger: 'blur' },
          { min: 1, max: 500, message: '描述中仅支持输入500位', trigger: 'blur' }
        ]
      },
      coverId: '',
      uploadTips: '',
      picSize: [{
        w: 750,
        h: 260
      }, {
        w: 750,
        h: 440
      }],
      picSizeIndx: 0,
      loading: false,
      picLoading: false
    }
  },
  watch: {
    coverId() {
      this.fetchCoverDetail()
    },
    'ruleForm.pos'() {
      if ([1, 2].indexOf(parseInt(this.ruleForm.pos)) > -1) {
        this.picSizeIndx = 0
        this.uploadTips = '图片尺寸只能为' + this.picSize[this.picSizeIndx].w + '*' + this.picSize[this.picSizeIndx].h + '，大小不超过600k'
      } else if ([3, 4, 5, 6].indexOf(parseInt(this.ruleForm.pos)) > -1) {
        this.picSizeIndx = 1
        this.uploadTips = '图片尺寸只能为' + this.picSize[this.picSizeIndx].w + '*' + this.picSize[this.picSizeIndx].h + '，大小不超过600k'
      } else {
        this.uploadTips = ''
      }
    },
    'ruleForm.title'(val) {
      this.$nextTick(() => {
        this.ruleForm.title = filterSpecialSymbal(val)
      })
    },
    'ruleForm.desc'(val) {
      this.$nextTick(() => {
        this.ruleForm.desc = filterSpaceSymbal(val)
      })
    }
  },
  created() {
    if (this.$route.params.id) {
      this.coverId = this.$route.params.id
    }
  },
  methods: {
    handleRemove(file, fileList) {
      if (file.status === 'success') {
        this.ruleForm.cover = []
      }
    },
    handlePreview(file) {
      console.log('handlePreview')
      console.log(file)
    },
    upload(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      this.picLoading = true
      this.$upload.post('/face/img', formData)
        .then(res => {
          this.ruleForm.cover.push({
            name: '',
            url: 'http://zxsqn.qizuang.com/' + res.data.data.img_url
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
      this.ruleForm.cover = []
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
      if (parseInt(this.ruleForm.pos) === 0) {
        this.$message.error('位置不能为空，请选择')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.coverId) {
            this.fetchCoverEdit()
          } else {
            this.fetchCoverAdd()
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
          this.$router.push('/manager/cover')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    fetchCoverAdd() {
      this.loading = true
      fetchCoverAdd({
        position: this.ruleForm.pos,
        title: this.ruleForm.title,
        img_url: this.ruleForm.cover[0].url,
        description: this.ruleForm.desc
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({
            path: '/manager/cover/'
          })
        }
      })
    },
    fetchCoverEdit() {
      this.loading = true
      fetchCoverEdit({
        id: this.coverId,
        position: this.ruleForm.pos,
        title: this.ruleForm.title,
        img_url: this.ruleForm.cover[0].url,
        description: this.ruleForm.desc
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push('/manager/cover')
        } else {
          this.$message.error('网络异常，请稍后再试')
        }
      })
    },
    fetchCoverDetail() {
      this.loading = true
      fetchCoverDetail({
        id: this.coverId
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          const data = res.data.data
          this.ruleForm.pos = String(data.position)
          this.ruleForm.title = data.title
          this.ruleForm.cover.push({
            name: '',
            url: data.img_url
          })
          this.ruleForm.desc = data.description
          this.loading = false
        } else {
          this.loading = false
          this.$message.erro('网络异常，请稍后再试')
        }
      })
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
