<template>
  <div class="box">
    <div class="head">
      <span class="title">{{title}}</span>
    </div>
    <el-form ref="formLabelAlign" :label-position="labelPosition" :rules="rules" :model="formLabelAlign" label-width="130px">
      <el-form-item label="对比产品名称1:" prop="first_product">
        <el-input v-model="formLabelAlign.first_product"></el-input>
      </el-form-item>
      <el-form-item label="产品图片:" prop="first_img_url">
        <el-upload
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList1"
          class="upload-demo"
          action="/content/contrast/edit/"
          list-type="picture">
          <el-button size="small" type="primary">本地上传</el-button>
          <div slot="tip" class="el-upload__tip">大图片建议尺寸：xx像素 * xx像素</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="*对比产品名称2:" prop="second_product">
        <el-input v-model="formLabelAlign.second_product"></el-input>
      </el-form-item>
      <el-form-item label="产品图片:" prop="second_img_url">
        <el-upload
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          class="upload-demo"
          action="/content/contrast/edit/"
          list-type="picture">
          <el-button size="small" type="primary">本地上传</el-button>
          <div slot="tip" class="el-upload__tip">大图片建议尺寸：xx像素 * xx像素</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动摘要:">
        <el-input v-model="formLabelAlign.outline" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="submitForm('formLabelAlign')">立即发布</el-button>
        <el-button type="info" style="width: 98px;" @click="resetForm('formLabelAlign')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchAdd, fetchDetail, fetchEdit } from '@/api/contrast'
export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        first_product: '',
        first_img_url: '',
        second_product: '',
        second_img_url: '',
        outline: ''
      },
      fileList1: [],
      fileList2: [],
      rules: {
        first_product: [
          { required: true, message: '请输入对比产品名称1' }
        ],
        second_product: [
          { required: true, message: '请输入对比产品名称2' }
        ],
        first_img_url: [
          { required: true, message: '请上传图片' }
        ],
        second_img_url: [
          { required: true, message: '请上传图片' }
        ]
      },
      title: '',
      id:''
    }
  },
  watch: {
    id() {
      this.fetchDetail()
    }
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.title = '编辑对比'
    }else{
      this.title = '新建对比'
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    fetchAdd() {
      fetchAdd({
        first_product: this.formLabelAlign.first_product,
        first_img_url: this.formLabelAlign.first_img_url,
        second_product: this.formLabelAlign.second_product,
        second_img_url: this.formLabelAlign.second_img_url,
        outline: this.formLabelAlign.outline,
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          history.go(-1)
        }
      })
    },
    fetchEdit() {
      fetchEdit({
        first_product: this.formLabelAlign.first_product,
        first_img_url: this.formLabelAlign.first_img_url,
        second_product: this.formLabelAlign.second_product,
        second_img_url: this.formLabelAlign.second_img_url,
        outline: this.formLabelAlign.outline,
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          history.go(-1)
        }
      })
    },
    fetchDetail() {
      fetchDetail({
        id: this.id
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          let data = res.data.data
          // console.log(data)
          this.formLabelAlign.first_product = data.first_product
          this.fileList1.push({
            name: 'test1',
            url: data.first_img_url
          })
          this.formLabelAlign.second_product = data.second_product
          this.formLabelAlign.first_img_url = data.first_img_url
          this.formLabelAlign.second_img_url = data.second_img_url
          this.fileList2.push({
            name: 'test2',
            url: data.second_img_url
          })
          this.formLabelAlign.outline = data.outline
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  border:1px solid #eee;
  margin: 30px;
  padding-bottom: 10px;
  .head {
    height: 50px;
    line-height: 50px;
    padding-top: 5px;
    padding-bottom: 5px;
    box-sizing: border-box;

    .title {
      font-weight: 700;
      font-size: 16px;
      margin-left: 10px;
    }
  }
  .upload-demo {
    width: 50%;
  }
  .el-form {
    padding-top: 10px;
    border-top: 1px solid #eee;
  }
  .el-input , .el-textarea {
    width: 50%;
  }
  .el-textarea textarea {
      height: 120px;
  }
  .el-upload__tip {
    position: absolute;
    top: 0;
    left: 100px;
    margin-top: 0;
  }
}
</style>
