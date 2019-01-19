<template>
  <div class="create">
    <div class="title">
      <span>新建文章</span>
    </div>
    <div class="form">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类:" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择">
            <el-option label="美家案例" :value=1></el-option>
            <el-option label="装修心得" :value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="摘要:" prop="description">
          <el-input :rows="5" v-model="ruleForm.description" class="textarea" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="上传图片:" prop="imgs">
          <!-- <input type="text" v-model="ruleForm.imgs"> -->
          <div class="photo">
            <el-upload
              ref="upload"
              :limit="9"
              :auto-upload="false"
              :before-upload="beforeAction"
              :on-exceed="handleExceed"
              :on-preview="handlePictureCardPreview"
              :on-change="change"
              :on-remove="handleRemove"
              :file-list="ruleForm.imgs"
              :http-request="upload"
              action=""
              list-type="picture-card"
              multiple>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img :src="dialogImageUrl" width="100%" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-form-item>
        <el-form-item label="正文:" prop="content">
          <el-input type="textarea" :rows="8" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <input type="text" v-model="ruleForm.tags" style="display:none">
          <el-autocomplete
            v-model="resource"
            :maxlength = "15"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            class="inline-input"
            @select="handleSelect"
          ></el-autocomplete>
          <br>
          <span>单击搜索结果选项即可选中标签</span>
          <br>
          <el-tag
            v-for="(tag,index) in tags"
            :key="index"
            :disable-transitions="false"
            closable
            @close="handleClose(tag,index)">
            {{ tag }}
          </el-tag>
        </el-form-item>
        <el-form-item label="帐号(手机号):" prop="author">
          <input type="text" v-model="ruleForm.author" style="display:none">
          <el-autocomplete
            v-model="input"
            :maxlength = "15"
            :fetch-suggestions="querySearch2"
            :trigger-on-focus="false"
            class="inline-input"
            @select="handleSelect2">
            <template slot-scope="{ item }">
              <div>{{ item.value }} 已发布{{item.article_count}}篇文章</div>
            </template>
          </el-autocomplete>
          <br>
          <el-tag
            v-if="ruleForm.author != ''"
            :disable-transitions="false"
            closable
            @close="handleClose2">
            {{ author }}
          </el-tag>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button type="info" @click="cancel">  取消  </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {create,searchTag,searchUser,getArticle,editArticle} from '@/api/article'
import { filterSpecialSymbal, filterSpaceSymbal } from '@/utils/index'

export default {
  data() {
    return {
      ruleForm: {
        title: '',
        category: '',
        description: '',
        content: '',
        author: '',
        tags: [],
        imgs: []
      },
      resource: '',
      tags: [],
      author: '',
      input: '',
      restaurants: [],
      user: [],
      dialogImageUrl: '',
      dialogVisible: false,
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { max: 80, message: '标题中仅支持输入80位', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '文章分类不能为空', trigger: 'change' }
        ],
        description: [
          { max: 80, message: '摘要中仅支持输入80位', trigger: 'blur' }
        ],
        tags: [
          { required: true, message: '请填写标签', trigger: 'change' },
        ],
        imgs: [
          { required: true, message: '图片不能为空', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写正文', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请填写手机号', trigger: 'blur' }
        ]
      },
      res: [{ 'value': '三全鲜食（北新泾店)', 'id': '长宁区新渔路144号' }]
    }
  },
  created() {
    if(this.$route.params.id){
      getArticle(this.$route.params).then(res => {
        let data = res.data.data.info
        this.ruleForm.title = data.title
        this.ruleForm.category = data.category
        this.ruleForm.description = data.description
        data.tags.forEach((index) => {
          this.ruleForm.tags.push(index.tag_id)
          this.tags.push(index.tag_name)
        })
        this.ruleForm.content = data.content
        this.ruleForm.description = data.description
        data.imgs.forEach((ele,index) => {
          this.ruleForm.imgs.push({url: ele})
        })
        this.author = data.author.nick_name
        this.ruleForm.author = data.author.id
      })
    }
  },
  watch: {
    'ruleForm.title'(val) {
      this.$nextTick(() => {
        this.ruleForm.title = filterSpaceSymbal(val)
      })
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let img = []
          let copy = this.deepClone(this.ruleForm)
          this.ruleForm.imgs.forEach((ele) => {
            img.push(ele.url)
          })
          copy.imgs = img
          if(this.$route.params.id){
            copy.id = parseInt(this.$route.params.id)
            editArticle(copy).then(res => {
              this.$router.push('/content/article/article')
            })
            return
          }
          create(copy).then(res => {
            this.$router.push('/content/article/article')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    upload(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      this.picLoading = true
      this.$upload.post('/article/imgup', formData)
        .then(res => {
          this.ruleForm.imgs.push({
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
      const width = 710
      const height = 220
      const _this = this
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function() {
          const img = new Image()
          img.onload = function() {
            const valid = parseInt(this.width) === parseInt(width) && parseInt(this.height) === parseInt(height)
            if (!valid) {
              _this.$message.error('图片尺寸不符合要求请上传710*220尺寸图片')
              reject()
            }
            resolve()
          }
          img.src = reader.result
        }
        reader.readAsDataURL(file)
      })
    },
    cancel() {
      this.$confirm('确认要取消？取消后不会保存所编写的内容！', '取消提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.history.go(-1)
      }).catch(() => {
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    change(file, fileList) {
      console.log(file, fileList)
    },
    handleRemove(file, fileList) {
      this.ruleForm.imgs.forEach((v,i,arr) => {
        if(file.url == v.url) {
          arr.splice(i,1)
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleExceed(file, fileList) {
      this.$message.error('最多上传9张图片')
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    querySearch(queryString, cb) {
      if(this.ruleForm.category == '') {
        this.$message.error('请先选择分类')
        return
      }
      this.searchT(queryString)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(this.restaurants)
      }, 1000)
    },
    handleSelect(item) {
      this.ruleForm.tags.push(item.id)
      this.tags.push(item.value)
    },
    handleSelect2(item) {
      this.ruleForm.author = item.id
      this.author = item.value
    },
    handleClose(tag,index) {
      this.tags.splice(index, 1)
      this.ruleForm.tags.splice(index, 1)
    },
    querySearch2(queryString, cb) {
      this.searchU(queryString)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(this.user)
      }, 1000)
    },
    handleClose2() {
      this.author = ''
      this.ruleForm.author = ''
    },
    searchT(query){
      let cate = this.ruleForm.category
      searchTag({param: query, category: cate}).then(res => {
        let data = res.data.data
        this.restaurants = []
        data.forEach((e,i) => {
          this.restaurants[i] = {}
          this.restaurants[i].value = e.text
          this.restaurants[i].id = e.id
        })
      })
    },
    searchU(query){
      searchUser({param: query}).then(res => {
        let data = res.data.data
        this.user = []
        data.forEach((e,i) => {
          this.user[i] = {}
          this.user[i].value = e.text
          this.user[i].id = e.id
          this.user[i].article_count = e.article_count
        })
      })
    },
    deepClone(obj) {
	    let _tmp = JSON.stringify(obj)
      let result = JSON.parse(_tmp)
      return result
    }
  }
}
</script>

<style lang="less">
  .create{
    height: 100%;
    margin: 30px;
    .title {
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      vertical-align: middle;
      border: 1px solid rgba(204, 204, 204, 1);
      span {
        font-weight: 900;
        font-size: 16px;
      }
    }
    .form{
      padding: 20px 40% 0 10px;
      .photo{
        min-height: 300px;
        width: 100%;
        border: 1px solid rgba(204, 204, 204, 1);
        padding: 20px;
      }
      .ql-editor{
        min-height: 200px;
      }
      .inline-input{
        width: 50%;
      }
      .el-tag + .el-tag {
        margin-left: 10px;
      }
    }
  }
</style>
