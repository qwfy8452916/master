<template>
  <div class="create">
    <div class="module-header">
      <div class="top">
        <span>材料品牌榜单管理  >  分类管理</span>
        <div class="right">
          <el-button class="new-btn" type="success" @click="createClassify">新建分类</el-button>
        </div>
      </div>
    </div>
    <div class="main">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="类别ID"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="类别名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center">
        </el-table-column>
        <el-table-column
          prop="px"
          label="排序值"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200" align="center">
        <template slot-scope="scope">
          <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
          |<el-button @click="handleDelete(scope.$index,scope.row)" type="text" size="small">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>
    <!-- Form -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="类别名称:" :label-width="formLabelWidth" prop="name">
          <el-input v-model.trim="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序ID:" :label-width="formLabelWidth" prop="px">
          <el-input v-model.trim="form.px" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth" prop="remark">
          <el-input v-model.trim="form.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 认</el-button>
        <el-button @click="cancel('form')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchBrandClassifyList, fetchAddCategory, fetchEditCategory, fetchDelCategory,fetchGetCategory } from '@/api/materialBill'
export default {
    name: 'brandClassify',
    inject: ["reload"],
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
        tableData: [],
        arr: [],
        arrpx: [],
        pageTotal: null,
        currentPage: 1,
        pageSize: 10,
        dialogFormVisible: false,
        title: '',
        categoryId:'',
        form: {
          name: '',
          px: '',
          remark: ''
        },
        formLabelWidth: '120px',
        rules: {
          name: [
            {required: true, message: '类别名称为空，请输入', trigger: 'blur' },
            { min: 1, max: 80, message: '只支持80位字符', trigger: 'blur' }
          ],
          px: [
            {required: true, message: '排序ＩＤ为空，请输入', trigger: 'blur' },
            { validator: validateInteger, trigger: 'blur' }
          ],
          remark: [
            {required: false, message: '请填写备注'},
            { min: 1, max: 500, message: '只支持500位字符', trigger: 'blur' }
          ],
        }
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      tableData() {
        this.tableData.forEach(item => {
          this.arr.push(item.name)
          this.arrpx.push(item.px)
        })
      },
      
    },
    methods: {
      createClassify() {
        this.title = '新建类别'
        this.dialogFormVisible = true
        this.form.name = ''
        this.form.px = ''
        this.form.remark = ''
        // this.fetchAddCategory()
      },
      handleEditClick(row) {
        this.title = '编辑类别'
        this.dialogFormVisible = true
        this.categoryId = row.id
        console.log(this.categoryId)
        this.fetchGetCategory()
      },
      handleDelete(index, row) {
      this.$confirm("确认删除该分类？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        fetchDelCategory({
          id: row.id
        }).then(res => {
          if(parseInt(res.data.error_code) === 4000006){
            this.$alert('该分类下存在榜单，请先删除榜单，谢谢！', '删除提示', {
              dangerouslyUseHTMLString: true
            })
          }else{
            this.reload()
            this.$message({
              type: "success",
              message: "删除成功!"
            })
          }
        })
        
      })
      .catch(() => {
        this.$message({
        type: "info",
        message: "已取消删除"
        })
      })
    },
    submitForm(formName) {
      if( this.title == '新建类别' ) {
        if(this.arr.indexOf(this.form.name) != -1){
          this.$message.error('该类别名称已存在，请重新输入')
          return
        }
        if(this.arrpx.indexOf(Number(this.form.px)) != -1){
          this.$message.error('排序ID已存在，请重新输入')
          return
        }
      }
      if( this.title == '编辑类别' ) {
        this.arr.splice(this.arr.indexOf(this.form.name),1)
        this.arrpx.splice(this.arrpx.indexOf(this.form.px),1)
        if(this.arr.indexOf(this.form.name) != -1){
          this.$message.error('该类别名称已存在，请重新输入')
          return
        }
        if(this.arrpx.indexOf(Number(this.form.px)) != -1){
          this.$message.error('排序ID已存在，请重新输入')
          return
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.categoryId) {
            this.fetchEditCategory()
          } else {
            this.fetchAddCategory()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    fetchData() {
      fetchBrandClassifyList().then(res => {
        if(res.status == 200 && parseInt(res.data.error_code) === 0){
          this.tableData = res.data.data.list
          this.pageTotal = res.data.data.page.total_number
        }
      }).catch(function(reason){
        console.log(reason)
      })
    },
    fetchAddCategory() {
      this.loading = true
      if(this.form.remark == ''){
        this.form.remark = '-'
      }
      fetchAddCategory({
        name:this.form.name,
        remark:this.form.remark,
        px:this.form.px
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.dialogFormVisible = false
          this.reload()
        } else {
          this.$message.error(res.data.error_msg)
          this.loading = false
        }
      })
    },
    fetchGetCategory() {
      fetchGetCategory({
        id:this.categoryId
      }).then(res => {
        if(res.status == 200 && parseInt(res.data.error_code) === 0){
          this.form.name = res.data.data.name
          this.form.remark = res.data.data.remark
          this.form.px = res.data.data.px
        }
      }).catch(function(reason){
        console.log(reason)
      })
    },
    fetchEditCategory() {
      if(this.form.remark == ''){
        this.form.remark = '-'
      }
      fetchEditCategory({
        name:this.form.name,
        remark:this.form.remark,
        px:this.form.px,
        id:this.categoryId
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          this.dialogFormVisible = false
          this.reload()
        } else {
          this.$message.error('网络异常，请稍后再试')
          this.loading = false
        }
      })
    },
    
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .create {
    margin: 30px;
    .right {
        float: right;
        margin-right: 10px;
    }
    .main {
        margin-top: 20px;
    }
    .el-pagination {
        float: right;
        margin: 10px 20px;
    }
  }
</style>

