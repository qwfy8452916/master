<template>
  <div class="create">
    <div class="title">
      <span>经验管理 > 发布/编辑经验</span>
    </div>
    <div class="form">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm">
        <el-form-item label="分类:" prop="cate_id">
          <el-select v-model="ruleForm.cate_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.cate_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题:" prop="title">
          <el-input v-model.trim="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要:" prop="outline">
          <el-input :rows="5" v-model.trim="ruleForm.outline" class="textarea" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="正文:" prop="content">
          <!-- <input type="text" v-model="ruleForm.content" style="display:none"> -->
          <el-row v-for="(item,index) in ruleForm.content" :key="index">
            <el-col :span="23"><el-button type="text" @click="open(item)">{{ item.title }}</el-button></el-col>
            <el-col :span="1"><el-button type="danger" @click="artDelete(index)" icon="el-icon-delete" size="mini" circle></el-button></el-col>
          </el-row>
          <el-button icon="el-icon-plus" size="medium" @click="dialogFormVisible = true">添加文章</el-button>
        </el-form-item>
        <el-form-item label="标签:" prop="tag">
          <el-input v-model.trim="ruleForm.tag"></el-input>
        </el-form-item>
        <el-form-item label="标签颜色">
          <el-select v-model="ruleForm.tag_colour" placeholder="活动区域">
            <el-option label="红色" :value= 1></el-option>
            <el-option label="蓝色" :value= 2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model.trim="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
          <el-button type="info" @click="cancel">  取消  </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="text">
      <el-dialog title="预览" :visible.sync="dialogInputVisible">
        <h1 v-html="title"></h1>
        <div v-html="content">
        </div>
      </el-dialog>
    </div>
    <el-dialog title="新建/编辑标签" :visible.sync="dialogFormVisible">
      <el-form :model="artruleForm" :rules="artrules" ref="artruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标签名称 :" prop="title">
          <el-input v-model.trim="artruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="正文:" prop="content">
          <el-input type="textarea" :rows="8" v-model.trim="artruleForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitContent('artruleForm')">确认</el-button>
          <el-button @click="cancelForm('artruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {createContent,getEditExp,editExp,cateGet} from '@/api/experience'
import { filterSpecialSymbal, filterSpaceSymbal } from '@/utils/index'

export default {
  data() {
    return {
      ruleForm: {
        title: '',
        outline: '',
        cate_id: '',
        tag: '',
        remark: '',
        tag_colour: 1,
        content: []
      },
      options: [],
      title: '',
      content: '',
      dialogInputVisible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { max: 15, message: '标题中仅支持输入15位', trigger: 'blur' }
        ],
        outline: [
          { max: 80, message: '摘要中仅支持输入80位', trigger: 'blur' }
        ],
        tag: [
          { max: 15, message: '标签中仅支持输入15位', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写正文', trigger: 'blur' },
        ],
        remark: [
          { max: 15, message: '备注中仅支持输入15位', trigger: 'blur' }
        ]
      },
      artruleForm: {
        title: '',
        content: ''
      },
      artrules: {
        title: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { max: 20, message: '标题中仅支持输入20位', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写正文', trigger: 'blur' },
          { max: 10000, message: '正文中仅支持输入10000位', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'ruleForm.title'(val) {
      this.$nextTick(() => {
        this.ruleForm.title = filterSpecialSymbal(val)
      })
    },
    'ruleForm.tag'(val) {
      this.$nextTick(() => {
        this.ruleForm.tag = filterSpecialSymbal(val)
      })
    },
  },
  created() {
    cateGet().then(res => {
      this.options = res.data.data
    })
    if(this.$route.params.id) {
      getEditExp(this.$route.params).then(res => {
        this.ruleForm = res.data.data
      })
    }

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.$route.params.id) {
            this.ruleForm.id = this.$route.params.id
            editExp(this.ruleForm).then(res => {
              this.$router.push('/content/experience')
            })
          }
          createContent(this.ruleForm).then(res => {
            this.$router.push('/content/experience')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitContent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let copy = this.deepClone(this.artruleForm)
          this.ruleForm.content.push(copy)
          this.$refs[formName].resetFields()
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
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
    cancelForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    open(cont) {
      this.dialogInputVisible = true
      this.title = cont.title
      this.content = cont.content
    },
    artDelete(item) {
      this.$confirm('确认删除章节'+ (item+1) +'吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(item)
        this.ruleForm.content.splice(item,1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })          
      })
    },
    deepClone(obj) {
	    let _tmp = JSON.stringify(obj)
      let result = JSON.parse(_tmp)
      return result
    },
    alertValue(e,strValue,decimalNum){
      e.quill.deleteText(decimalNum,1,strValue);//保留 strValue 的 前 decimalNum 位字符，
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
      .inline-input{
        width: 50%;
      }
    }
  }
  .text .el-dialog__body{
    height: 500px !important;
    overflow: auto !important;
  }
  .ql-editor{
    min-height: 200px;
  }
</style>
