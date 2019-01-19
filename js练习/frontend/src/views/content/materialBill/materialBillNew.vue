<template>
  <div v-loading="loading" class="create">
    <div class="title">
      <span>新建榜单</span>
    </div>
    <div class="form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="ruleForm">
        <el-form-item label="标题:" prop="title">
          <el-input v-model.trim="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="榜单分类:" prop="category">
          <el-select v-model="ruleForm.category">
            <el-option
              v-for="item in category"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌名称:" prop="brand_name">
          <el-input v-model.trim="ruleForm.brand_name"></el-input>
        </el-form-item>
        <el-form-item label="品牌简介:" prop="brand_description">
          <el-input class="textarea" type="textarea" :rows="5" v-model.trim="ruleForm.brand_description"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO图:" prop="logo">
          <el-upload
            class="upload-demo"
            action=""
            ref="upload1"
            :before-upload="beforeAction"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="ruleForm.logo"
            :http-request="upload"
            list-type="picture">
            <el-button size="small" type="primary">本地上传</el-button>
            <div slot="tip" class="el-upload__tip">{{ uploadTips }}</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="热销产品名称:" prop="goods_name">
          <el-input v-model.trim="ruleForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="热销产品参考价:" prop="goods_price">
          <el-input v-model.number.trim="ruleForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="热销产品图:" prop="goods_thumbnail">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            ref="upload2"
            :before-upload="beforeAction2"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="ruleForm.goods_thumbnail"
            :http-request="upload2"
            list-type="picture">
            <el-button size="small" type="primary">本地上传</el-button>
            <div slot="tip" class="el-upload__tip">{{ uploadTips2 }}</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="综合得分:" prop="score">
          <el-input v-model.number.trim="ruleForm.score"></el-input>
        </el-form-item>
        <el-form-item label="工艺得分:" prop="gy_score">
          <el-input v-model.number.trim="ruleForm.gy_score"></el-input>
        </el-form-item>
        <el-form-item label="工艺简介:" prop="gy_description">
          <el-input class="textarea" type="textarea" :rows="5" v-model.trim="ruleForm.gy_description"></el-input>
        </el-form-item>
        <el-form-item label="实用性得分:" prop="syx_score">
          <el-input v-model.number.trim="ruleForm.syx_score"></el-input>
        </el-form-item>
        <el-form-item label="实用性简介:" prop="syx_description">
          <el-input class="textarea" type="textarea" :rows="5" v-model.trim="ruleForm.syx_description"></el-input>
        </el-form-item>
        <el-form-item label="多样性得分:" prop="dyx_score">
          <el-input v-model.number.trim="ruleForm.dyx_score"></el-input>
        </el-form-item>
        <el-form-item label="多样性简介:" prop="dyx_description">
          <el-input class="textarea" type="textarea" :rows="5" v-model.trim="ruleForm.dyx_description"></el-input>
        </el-form-item>
        <el-form-item label="耐用性得分:" prop="ny_score">
          <el-input v-model.number.trim="ruleForm.ny_score"></el-input>
        </el-form-item>
        <el-form-item label="耐用性简介:" prop="ny_description">
          <el-input class="textarea" type="textarea" :rows="5" v-model.trim="ruleForm.ny_description"></el-input>
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
import { fetchAddBrand, fetchEditBrand, fetchGetBrand } from '@/api/materialBill'
import { filterSpecialSymbal, filterSpaceSymbal } from '@/utils/index'
export default {
  name: 'materialBillNew',
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
        brand_name: '',
        brand_description: '',
        logo: [],
        goods_name: '',
        goods_price: '',
        goods_thumbnail: [],
        score: '',
        gy_score: '',
        gy_description: '',
        syx_score: '',
        syx_description: '',
        dyx_score: '',
        dyx_description: '',
        ny_score: '',
        ny_description: '',
        px: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      fileList1: [],
      fileList2: [],
      file:{},
      categoryId:'',
      uploadTips: '',
      uploadTips2: '',
      picSize: {
        w: 124,
        h: 160
      },
      picSize2: {
        w: 100,
        h: 100
      },
      text:'',
      loading:false,
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
      rules: {
        title: [
           { required: true, message: '请输入标题', trigger: 'blur' },
           { min: 1, max: 80, message: '标题仅支持输入80位', trigger: 'blur' }
        ],
        category: [
           { required: true, message: '榜单分类不能为空，请选择', trigger: 'change' }
        ],
        brand_name: [
           { required: true, message: '品牌名称为空，请输入', trigger: 'blur' },
           { min: 1, max: 80, message: '最多80位字符', trigger: 'blur' }
        ],
        brand_description: [
           { required: true, message: '品牌简介不能为空，请输入', trigger: 'blur' },
           { min: 1, max: 1000, message: '最多1000位字符', trigger: 'blur' }
        ],
        logo: [
           { required: true, message: '品牌LOGO图不能为空，请上传', trigger: 'blur' }
        ],
        goods_name: [
           { required: true, message: '热销产品名称不能为空，请输入', trigger: 'blur' },
           { min: 1, max: 80, message: '最多80位字符', trigger: 'blur' }
        ],
        goods_price: [
           { required: true, message: '热销产品参考价不能为空，请输入', trigger: 'blur' },
           { type: 'number', message: '热销产品参考价填写有误', trigger: 'blur'}
        ],
        goods_thumbnail: [
           { required: true, message: '热销产品图不能为空，请上传', trigger: 'blur' }
        ],
        score: [
           { required: true, message: '综合得分不能为空，请输入', trigger: 'blur' },
           { type: 'number', message: '综合得分填写有误', trigger: 'blur'}
        ],
        gy_score: [
           { required: true, message: '工艺得分不能为空，请输入', trigger: 'blur' },
           { type: 'number', message: '工艺得分填写有误', trigger: 'blur'}
        ],
        syx_score: [
           { required: true, message: '实用性得分不能为空，请输入', trigger: 'blur' },
           { type: 'number', message: '实用性得分填写有误', trigger: 'blur'}
        ],
        dyx_score: [
           { required: true, message: '多样性得分不能为空，请输入', trigger: 'blur' },
           { type: 'number', message: '多样性得分填写有误', trigger: 'blur'}
        ],
        ny_score: [
           { required: true, message: '耐用性得分不能为空，请输入', trigger: 'blur' },
           { type: 'number', message: '耐用性得分填写有误', trigger: 'blur'}
        ],
        px: [
           { required: true, message: '请输入排序id', trigger: 'blur' },
           { validator: validateInteger, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    categoryId() {
      this.fetchGetBrand()
    },
    'ruleForm.title'(val) {
      this.$nextTick(() => {
        this.ruleForm.title = filterSpecialSymbal(val)
      })
    },
    'ruleForm.brand_name'(val) {
      this.$nextTick(() => {
        this.ruleForm.brand_name = filterSpecialSymbal(val)
      })
    },
    'ruleForm.goods_name'(val) {
      this.$nextTick(() => {
        this.ruleForm.goods_name = filterSpecialSymbal(val)
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
            this.fetchEditBrand()
          } else {
            this.fetchAddBrand()
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
          this.ruleForm.logo.push({
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
    upload2(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      this.picLoading = true
      this.$upload.post('/classification/thumbup', formData)
        .then(res => {
          this.ruleForm.goods_thumbnail.push({
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
      this.ruleForm.logo = []
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
    beforeAction2(file) {
      // 清空数据，保证只能上传一张图片
      this.ruleForm.goods_thumbnail = []
      const width = this.picSize2.w
      const height = this.picSize2.h
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
    updateUploadTips() {
      this.uploadTips = '图片建议尺寸：宽' + this.picSize.w + 'px高小于' + this.picSize.h +'px'+ '，大小不超过600k'
      this.uploadTips2 = '图片尺寸只能为' + this.picSize2.w + '*' + this.picSize2.h + '，大小不超过600k'
    },
    fetchAddBrand() {
      this.loading = true
      fetchAddBrand({
        title: this.ruleForm.title,
        category: this.ruleForm.category,
        brand_name: this.ruleForm.brand_name,
        brand_description: this.ruleForm.brand_description,
        logo: this.ruleForm.logo[0].url,
        goods_name: this.ruleForm.goods_name,
        goods_price: this.ruleForm.goods_price,
        goods_thumbnail: this.ruleForm.goods_thumbnail[0].url,
        score: this.ruleForm.score,
        gy_score: this.ruleForm.gy_score,
        gy_description: this.ruleForm.gy_description,
        syx_score: this.ruleForm.syx_score,
        syx_description: this.ruleForm.syx_description,
        dyx_score: this.ruleForm.dyx_score,
        dyx_description: this.ruleForm.dyx_description,
        ny_score: this.ruleForm.ny_score,
        ny_description: this.ruleForm.ny_description,
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
    fetchEditBrand() {
      this.loading = true
      fetchEditBrand({
        title: this.ruleForm.title,
        category: this.ruleForm.category,
        brand_name: this.ruleForm.brand_name,
        brand_description: this.ruleForm.brand_description,
        logo: this.ruleForm.logo[0].url,
        goods_name: this.ruleForm.goods_name,
        goods_price: parseInt(this.ruleForm.goods_price),
        goods_thumbnail: this.ruleForm.goods_thumbnail[0].url,
        score: parseInt(this.ruleForm.score),
        gy_score: parseInt(this.ruleForm.gy_score),
        gy_description: this.ruleForm.gy_description,
        syx_score: parseInt(this.ruleForm.syx_score),
        syx_description: this.ruleForm.syx_description,
        dyx_score: parseInt(this.ruleForm.dyx_score),
        dyx_description: this.ruleForm.dyx_description,
        ny_score: parseInt(this.ruleForm.ny_score),
        ny_description: this.ruleForm.ny_description,
        px: parseInt(this.ruleForm.px),
        id:this.categoryId
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          history.go(-1)
        } else {
          this.$message.error('网络异常，请稍后再试')
          this.loading = false
        }
      })
    },
    fetchGetBrand() {
      fetchGetBrand({
        id:this.categoryId
      }).then(res => {
        if ( res.status === 200 && parseInt(res.data.error_code) === 0 ) {
          const data = res.data.data
          this.ruleForm.title = data.title
          this.ruleForm.category = String(data.category)
          this.ruleForm.brand_name = data.brand_name
          this.ruleForm.brand_description = data.brand_description
          this.ruleForm.logo.push({
            name:'',
            url:data.logo
          })
          this.ruleForm.goods_name = data.goods_name
          this.ruleForm.goods_price = Number(data.goods_price)
          this.ruleForm.goods_thumbnail.push({
            name:'',
            url:data.goods_thumbnail
          })
          this.ruleForm.score = data.score
          this.ruleForm.gy_score = data.gy_score
          this.ruleForm.gy_description= data.gy_description
          this.ruleForm.syx_score = data.syx_score
          this.ruleForm.syx_description = data.syx_description
          this.ruleForm.dyx_score = data.dyx_score
          this.ruleForm.dyx_description = data.dyx_description
          this.ruleForm.ny_score = data.ny_score
          this.ruleForm.ny_description = data.ny_description
          this.ruleForm.px = data.px
        }
      })
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
