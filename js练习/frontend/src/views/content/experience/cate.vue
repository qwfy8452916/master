<template>
  <div class="article">
    <div class="title">
      <span>经验管理 > 分类管理</span>
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
          <el-table-column align="center" prop="cate_name" label="标签名称" width="400">
          </el-table-column>
          <el-table-column align="center" prop="remark" label="备注" width="400">
            <template slot-scope="scope">
              {{scope.row.remark == '' ? '-' : scope.row.remark}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sort" label="排序值" width="400">
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
    <el-dialog title="新建/编辑类别" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标签名称 :" prop="cate_name">
          <el-input v-model.trim="ruleForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="备注 :" prop="remark">
          <el-input v-model.trim="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="排序值 :" prop="sort">
          <el-input v-model.number.trim="ruleForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getCate,addCate,editCate,delCate} from '@/api/experience'
import { filterSpecialSymbal, filterSpaceSymbal } from '@/utils/index'

export default {
  data() {
    return {
      tableData: [],
      page: [],
      dialogFormVisible: false,
      ruleForm: {
        cate_name: '',
        remark: '',
        sort: ''
      },
      id: '',
      rules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { max: 6, message: '仅支持输入6位', trigger: 'blur'}
        ],
        sort: [
          { required: true, message: '请输入排序值', trigger: 'blur' },
          { type: 'number', message:'请输入数字', trigger: 'blur'}
        ],
        remark: [
          { max: 15, message: '仅支持输入15位', trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    'ruleForm.cate_name'(val) {
      this.$nextTick(() => {
        this.ruleForm.cate_name = filterSpecialSymbal(val)
      })
    },
  },
  created() {
    this.get()
  },
  methods: {
    onSubmit() {
      console.log("submit!")
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      this.ruleForm.cate_name = row.cate_name
      this.ruleForm.remark = row.remark
      this.ruleForm.sort = row.sort
      this.id = row.id
    },
    handleDelete(index, row) {
        console.log(row.id)
      this.$confirm("确认删除该标签？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        delCate({id: row.id}).then(res => {
          if(res.data.error_code === 4000006) {
            this.$alert('该分类下存在文章，请先删除文章，谢谢！', '删除提示', {})
            return
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          })
          let current = this.page.page_current
          let total = this.page.total_number
          let flag = parseInt(total/10) + 1
          if(total % 10 == 1 && flag == current){
            current--
          }
          this.get(this.page.page_current)
        })
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },
    handleCurrentChange(val) {
      this.get(val)
    },
    submitForm(form) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if(this.id){
            console.log(this.id)
            editCate({
              cate_name: this.ruleForm.cate_name,
              remark: this.ruleForm.remark,
              sort: this.ruleForm.sort,
              id: this.id
            }).then(res => {
              console.log(res)
              this.get(this.page.page_current)
              this.id = ''
              this.dialogFormVisible = false
              this.$refs['ruleForm'].resetFields()
            })
            return
          }
          addCate(this.ruleForm).then(res => {
            this.get(this.page.page_current)
            this.dialogFormVisible = false
            this.$refs['ruleForm'].resetFields()
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.$refs['ruleForm'].resetFields()
    },
    get(current = 1) {
      getCate({page_current: current}).then(res => {
        this.tableData = res.data.data.list
        this.page = res.data.data.page
      })
    }
  }
}
</script>

<style lang="less">
.article {
  font-size: 16px;
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

