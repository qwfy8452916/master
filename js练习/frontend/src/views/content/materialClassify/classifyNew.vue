<template>
  <div class="create">
    <div class="title">
      <span>新建榜单</span>
    </div>
    <div class="form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="标题:" prop="title">
          <el-input v-model.trim="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="榜单分类:" prop="type">
          <el-select v-model="ruleForm.category">
            <el-option
              v-for="item in category"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="材料分类名称:" prop="name">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="材料参考价:" prop="price">
          <el-input v-model.number.trim="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="用户评分:" prop="score">
          <el-input v-model.number.trim="ruleForm.score"></el-input>
        </el-form-item>
        <el-form-item label="分类产品图:" prop="classifyPic">
          <el-upload
            class="upload-demo"
            action=""
            ref="upload"
            :before-upload="beforeAction"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="ruleForm.thumbnail"
            :http-request="upload"
            list-type="picture">
            <el-button size="small" type="primary">本地上传</el-button>
            <div slot="tip" class="el-upload__tip">{{ uploadTips }}</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="材料说明:" prop="description">
          <el-input class="textarea" type="textarea" :rows="5" v-model.trim="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="概要:" prop="outline">
          <el-input class="textarea" type="textarea" :rows="5" v-model.trim="ruleForm.outline"></el-input>
        </el-form-item>
        <el-form-item label="排序ID:" prop="px">
          <el-input v-model.trim="ruleForm.px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
          <el-button type="info" style="width: 98px;" @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetchAddClassification, fetchEditClassification, fetchGetClassification } from '@/api/materialClassify'
import { filterSpecialSymbal, filterSpaceSymbal } from '@/utils/index'
export default {
  name: 'materialClassifyNew',
  data() {
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
      ruleForm: {
        title: '',
        category: '',
        name: '',
        price: '',
        score: '',
        thumbnail: [],
        description: '',
        outline:'',
        px: ''
      },
      categoryId:'',
      dialogImageUrl: '',
      uploadTips: '',
      dialogVisible: false,
      picSize: {
        w: 124,
        h: 160
      },
      loading:false,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 80, message: '最多80位字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '榜单分类不能为空，请选择', trigger: 'change' }
        ],
        name: [
          { required: true, message: '材料分类名称为空，请输入', trigger: 'blur' },
          { min: 1, max: 80, message: '最多80位字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '材料参考价不能为空，请输入', trigger: 'blur' },
          { type: 'number', message: '材料参考价填写有误', trigger: 'blur'}
        ],
        thumbnail: [
          { required: true, message: '分类产品图不能为空，请上传', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '用户评分不能为空，请输入', trigger: 'blur' },
          { type: 'number', message: '用户评分填写有误'}
        ],
        description: [
          { required: true, message: '材料说明不能为空，请输入', trigger: 'blur' },
          { min: 1, max: 1000, message: '最多1000位字符', trigger: 'blur' }
        ],
        outline: [
          { required: true, message: '摘要不能为空，请输入', trigger: 'blur' },
          { min: 1, max: 1000, message: '最多1000位字符', trigger: 'blur' }
        ],
        px: [
          { required: true, message: '请输入排序id', trigger: 'blur' },
          { validator: validateInteger, trigger: 'blur' }
        ]
      },
      category: [
        {
          value: '0',
          label: '请选择'
        },
        {
          value: '1',
          label: '瓷砖'
        }, {
          value: '2',
          label: '地板'
        }, {
          value: '3',
          label: '油漆'
        }, {
          value: '4',
          label: '整体橱柜'
        }, {
          value: '5',
          label: '灯具'
        }, {
          value: '6',
          label: '灶具'
        }, {
          value: '7',
          label: '油烟机'
        }, {
          value: '8',
          label: '热水器'
        }, {
          value: '9',
          label: '浴霸'
        }, {
          value: '10',
          label: '冰箱电视'
        }, {
          value: '11',
          label: '洗衣机'
        }, {
          value: '12',
          label: '空调'
        }, {
          value: '13',
          label: '水槽'
        }, {
          value: '14',
          label: '龙头'
        }, {
          value: '15',
          label: '地漏'
        }, {
          value: '16',
          label: '门锁'
        }
      ],
    }
  },
  watch: {
    categoryId() {
      this.fetchGetClassification()
    },
    'ruleForm.title'(val) {
      this.$nextTick(() => {
        this.ruleForm.title = filterSpecialSymbal(val)
      })
    },
    'ruleForm.name'(val) {
      this.$nextTick(() => {
        this.ruleForm.name = filterSpecialSymbal(val)
      })
    },
  },
  created() {
    if (this.$route.params.id) {
      this.categoryId = this.$route.params.id
    } else {
      this.updateUploadTips()
    }
  },
  methods: {
    submitForm(formName) {
      if (parseInt(this.ruleForm.category) === 0) {
        this.$message.error('榜单分类不能为空，请选择')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.categoryId) {
            this.fetchEditClassification()
          } else {
            this.fetchAddClassification()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.$confirm("确认要取消？取消后不会保存所编写的内容！", "取消提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        history.go(-1)
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        })
      })
    },
    fetchAddClassification() {
      fetchAddClassification({
        title: this.ruleForm.title,
        category: this.ruleForm.category,
        name:this.ruleForm.name,
        price:this.ruleForm.price,
        score:this.ruleForm.score,
        thumbnail: this.ruleForm.thumbnail[0].url,
        description: this.ruleForm.description,
        outline:this.ruleForm.outline,
        px: this.ruleForm.px,
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
    fetchEditClassification() {
      fetchEditClassification({
        title: this.ruleForm.title,
        category: this.ruleForm.category,
        name:this.ruleForm.name,
        price:this.ruleForm.price,
        score:this.ruleForm.score,
        thumbnail: this.ruleForm.thumbnail[0].url,
        description: this.ruleForm.description,
        outline:this.ruleForm.outline,
        px: this.ruleForm.px,
        id:this.categoryId
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          history.go(-1)
        } else {
          this.$message.error(res.data.error_msg)
          this.loading = false
        }
      })
    },
    fetchGetClassification() {
      fetchGetClassification({
        id:this.categoryId
      }).then(res => {
        const data = res.data.data
        this.ruleForm.title = data.title
        this.ruleForm.category = String(data.category)
        this.ruleForm.name = data.name
        this.ruleForm.price = Number(data.price)
        this.ruleForm.score = Number(data.score)
        this.ruleForm.thumbnail.push({
          name:'',
          url:data.thumbnail
        })
        this.ruleForm.description = data.description
        this.ruleForm.outline = data.outline
        this.ruleForm.px = data.px
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleExceed(file, fileList) {
      console.log(file, fileList)
      this.$message.error('错了哦，这是一条错误消息')
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleSelect(item) {
      console.log(item)
    },
    upload(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      this.picLoading = true
      this.$upload.post('/classification/thumbup', formData)
        .then(res => {
          this.ruleForm.thumbnail.push({
            name: '',
            url: 'http://zxsqn.qizuang.com/' + res.data.data.img_path
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
      this.ruleForm.thumbnail = []
      const width = this.picSize.w
      const height = this.picSize.h
      const _this = this
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function() {
          const img = new Image()
          img.onload = function() {
            const valid = parseInt(this.width) === parseInt(width) && parseInt(this.height) < parseInt(height)
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
    updateUploadTips() {
      this.uploadTips = '图片建议尺寸：宽' + this.picSize.w + 'px高小于' + this.picSize.h +'px'+ '，大小不超过600k'
    }
  }
}
</script>

<style lang="less">
  .create {
    height: 100%;
    margin: 30px;
    .title {
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      vertical-align: middle;
      border: 1px solid rgba(204, 204, 204, 1);
      span {
        font-weight: 700;
        font-size: 16px;
      }
    }
    .form {
      padding: 20px 40% 0 10px;
      .photo {
        min-height: 300px;
        width: 100%;
        border: 1px solid rgba(204, 204, 204, 1);
        padding: 20px;
      }
      .ql-toolbar {
        line-height: initial;
      }
      .ql-editor {
        min-height: 200px;
      }
      .inline-input {
        width: 50%;
      }
    }
  }
</style>
