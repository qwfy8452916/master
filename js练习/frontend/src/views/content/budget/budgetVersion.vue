<template>
  <div class="version">
    <div class="module-header">
      <div class="top"><span class="caption">预算版本管理</span><div class="r mr-10"><el-button type="success" @click="createVersion">新建版本</el-button></div></div>
      <div class="middle">
        <el-form ref="ruleForm" :model="searchForm" :rules="searchRule" label-width="150px" class="demo-ruleForm">
          <div class="inline-block">
            版本名称：
            <el-input
              v-model="searchForm.versionname"
              placeholder="请输入名称"
            />
            <el-button type="primary" class="ml-15" @click="submitSearch('ruleForm')">筛选</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      class="text-center mt-20">
      <el-table-column
        prop="id"
        label="序号"
        header-align="center"
      />
      <el-table-column
        prop="version_name"
        label="版本名称"
        header-align="center"
      />
      <el-table-column
        prop="sort"
        label="排序值"
        header-align="center"
      />
      <el-table-column
        label="操作"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEditClick(scope.row)">编辑</el-button> |
          <el-button type="text" size="small" @click="handleDelClick(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <div class="lh2 text-right mt-20">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[20, 40, 60, 80]"
          :page-size="pageSize"
          :total="totals"
          layout="total, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
  </div>
</template>
<script>
import { fetchVersionList, fetchVersionDel } from '@/api/budget'
import { filterSpecialSymbal } from '@/utils/index'
export default {
  name: 'Version',
  data() {
    return {
      tableData: [],
      searchForm: {
        versionname: ''
      },
      searchRule: {
        versionname: [
          { min: 0, max: 8, message: '最多8位', trigger: 'blur' }
        ]
      },
      totals: 0,
      currentPage: 1,
      pageSize: 10,
      loading: false
    }
  },
  watch: {
    'searchForm.versionname'(val) {
      this.$nextTick(() => {
        this.searchForm.versionname = filterSpecialSymbal(val)
      })
    }
  },
  created() {
    this.fetchVersionList()
  },
  methods: {
    createVersion() {
      this.$router.push({
        path: '/content/create-budget-version'
      })
    },
    search() {
      // if (!this.versionname) {
      //   this.$message.error('请输入版本号')
      //   return
      // }
      this.fetchVersionList()
    },
    fetchVersionList() {
      this.loading = true
      fetchVersionList({
        page: this.currentPage,
        version_name: this.searchForm.versionname
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.totals = res.data.data.page.total_number
          this.tableData = res.data.data.list
          this.loading = false
        } else {
          this.$message.error('网络异常，请稍后重试')
          this.loading = false
        }
      })
    },
    fetchVersionDel(obj, cb) {
      this.loading = true
      fetchVersionDel({
        id: obj.id
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          cb && cb.call(this)
        } else {
          this.$message.error('删除失败')
        }
        this.loading = false
      })
    },
    submitSearch(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.search()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改每页显示多少条时触发
    handleSizeChange(val) {
      this.currentPage = 1
      this.fetchVersionList()
    },
    // 修改当前页码时触发
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchVersionList()
    },
    handleEditClick(obj) {
      this.$router.push({
        path: '/content/create-budget-version/' + obj.id
      })
    },
    handleDelClick(obj, index) {
      this.$confirm('您确认删除吗', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.fetchVersionDel(obj, function() {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.tableData.splice(index, 1)
            this.fetchVersionList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .version{
    margin: 30px;
    .el-input{
      width: auto;
    }
    .el-button+.el-button{
      margin-left: 0;
    }
  }
</style>
