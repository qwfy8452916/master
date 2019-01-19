<template>
  <div class="article">
    <div class="title">
      <span>文章管理 > 标签管理</span>
      <div class="right">
        <el-button type="success" @click="dialogFormVisible = true">新建标签</el-button>
      </div>
    </div>
    <div class="bottom">
      <div class="nav">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column align="center" type="index" label="排序ID" width="80">
          </el-table-column>
          <el-table-column align="center" prop="tag_name" label="标签名称" width="400">
          </el-table-column>
          <el-table-column align="center" prop="type" label="所属分类" width="400">
            <template slot-scope="scope">
              {{scope.row.type == 1 ? '美家案例' :'装修心得'}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" label="备注" width="400">
            <template slot-scope="scope">
              {{scope.row.remark == '' ? '-' : scope.row.remark}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              |<el-button
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page.page_current"
          :page-size="page.page_size"
          layout="total, prev, pager, next, jumper"
          :total="page.total_number">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新建/编辑标签" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标签名称 :" prop="tag_name">
          <el-input v-model.trim="ruleForm.tag_name"></el-input>
        </el-form-item>
        <el-form-item label="所属分类 :" prop="type">
          <el-select v-model="ruleForm.type" placeholder="文章分类">
            <el-option label="美家案例" value="1"></el-option>
            <el-option label="装修心得" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注 :" prop="remark">
          <el-input v-model.trim="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          <el-button @click="cancel('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getTagList,createTag,editTag,deleteTag,getTag} from '@/api/article'
import { filterSpecialSymbal, filterSpaceSymbal } from '@/utils/index'

export default {
  data() {
    return {
      tableData: [],
      page: {},
      dialogFormVisible: false,
      id: '',
      ruleForm: {
        tag_name: '',
        remark: '',
        type:''
      },
      rules: {
        tag_name: [
          { required: true, message: '标签名称不能为空', trigger: 'blur' },
          { max: 15, message: '请输入小于15个字符', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        remark: [
          { max: 500, message: '请输入小于500个字符', trigger: 'change' },
        ]
      }
    }
  },
  watch: {
    'ruleForm.tag_name'(val) {
      this.$nextTick(() => {
        this.ruleForm.tag_name = filterSpecialSymbal(val)
      })
    },
  },
  created() {
    getTagList().then(res => {
      this.tableData = res.data.data
      this.page = res.data.page
    })
  },
  methods: {
    onSubmit() {
      console.log("submit!")
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      getTag({id: row.id}).then(res => {
        this.ruleForm = res.data.data.info
        this.ruleForm.type = this.ruleForm.type.toString()
      })
      console.log(this.ruleForm);
      
    },
    handleDelete(index, row) {
      this.$confirm("确认删除该标签？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        deleteTag({id:row.id}).then(res => {
          let current = this.page.page_current
          let total = this.page.total_number
          let flag = parseInt(total/10) + 1
          if(total % 10 == 1 && flag == current){
            current--
          }
          getTagList({page: current}).then(res => {
            this.tableData = res.data.data
            this.page = res.data.page
          })
        })
        this.$message({
          type: "success",
          message: "删除成功!"
        })
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      getTagList({page: val}).then(res => {
        this.tableData = res.data.data
        this.page.page_current = val
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.ruleForm.id){
            editTag(this.ruleForm).then(res => {
              let val = this.page.page_current
              getTagList({page: val}).then(res => {
                this.tableData = res.data.data
                this.page = res.data.page
              })
            })
            this.$refs[formName].resetFields()
            this.dialogFormVisible = false
            return
          }
          createTag(this.ruleForm).then(res => {
            let val = this.page.page_current
            getTagList({page: val}).then(res => {
              this.tableData = res.data.data
              this.page = res.data.page
            })
            this.$refs[formName].resetFields()
          })
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          // this.$alert('该标签下存在文章，请先删除文章，谢谢!','删除提示')
          return false;
        }
      })
    },
    cancel(formName){
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    trimString(obj){
      for(let i in obj) {
        obj[i] = obj[i].trim()
      }
    }
  },
  // watch: {
  //   ruleForm(val) {
  //     val.remark = val.remark.trim()
  //     console.log(val.remark)
  //   }
  // }
}
</script>

<style lang="less">
.article {
  height: 100%;
  margin: 30px;
  .title {
    >span{
      font-size: 16px;
    }
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    vertical-align: middle;
    border: 1px solid rgba(204, 204, 204, 1);
    span {
      font-weight: 900;
    }
    .right {
      float: right;
      margin-right: 10px;
    }
  }
  .bottom {
    padding: 10px;
    .el-pagination {
      float: right;
      margin-top: 10px;
    }
  }
}
</style>

