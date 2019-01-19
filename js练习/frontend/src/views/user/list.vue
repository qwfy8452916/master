<template>
  <div class="list">
    <div class="module-header">
      <div class="top"><span class="caption">用户管理</span><div class="r mr-10"><el-button type="success" @click="createAccount">新建</el-button></div></div>
      <div class="middle">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="70px" class="demo-ruleForm">
          <div class="inline-block">
            <el-form-item label="UID：" prop="uid"><el-input v-model="ruleForm.uid"/></el-form-item>
          </div>
          <div class="inline-block pl-5">
            <el-form-item label="用户名：" prop="username"><el-input v-model="ruleForm.username"/></el-form-item>
          </div>
          <div class="inline-block pl-5">
            <el-form-item label="手机号：" prop="phone"><el-input v-model="ruleForm.phone"/></el-form-item>
          </div>
          <div class="inline-block pl-5">
            <el-form-item label="状态：" >
              <el-select v-model="ruleForm.statusVal" placeholder="全部状态">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="inline-block">
            <el-form-item style="margin-left: -70px">
              <el-button type="primary" class="ml-15" @click="search">查询</el-button>
            </el-form-item>
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
        type="index"
        label="序号"
        width="50"
        header-align="center"
      />
      <el-table-column
        prop="nick_name"
        label="用户名"
        header-align="center"
      />
      <el-table-column
        prop="id"
        label="UID"
        header-align="center"
      />
      <el-table-column
        prop="address"
        label="常住地"
        header-align="center"
      />
      <el-table-column
        prop="gender"
        label="性别"
        header-align="center"
      />
      <el-table-column
        prop="itag"
        label="身份标签"
        header-align="center"
      />
      <el-table-column
        prop="tel"
        label="手机号"
        header-align="center"
      />
      <el-table-column
        prop="article_count"
        label="文章数"
        header-align="center"
      />
      <el-table-column
        prop="collection_count"
        label="收藏数"
        header-align="center"
      />
      <el-table-column
        prop="comment_count"
        label="评论数"
        header-align="center"
      />
      <el-table-column
        label="状态"
        header-align="center"
      >
        <template slot-scope="scope">
          <div :class="{active:parseInt(scope.row.status)===2}">{{ scope.row.status == 2 ? '停用' : '正常' }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="注册时间"
        header-align="center"
      />
      <el-table-column
        label="操作"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEditClick(scope.row)" >编辑</el-button> |
          <el-button type="text" size="small" @click="handleUseClick(scope.row)">{{ parseInt(scope.row.status) == 2 ? '启用' : '停用' }}</el-button>
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
        >
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>
<script>
import { fetchUserList, fetchUserSwitch } from '@/api/user'
import { filterSpecialSymbal, filterSpaceSymbal } from '@/utils/index'
export default {
  name: 'List',
  data() {
    const validateInteger = (rule, value, callback) => {
      if (value) {
        if (value < 1 || !Number.isInteger(Number(value))) {
          callback(new Error('UID输入有误'))
        } else {
          callback()
        }
      }
    }
    const validatePhone = (rule, value, callback) => {
      const reg = new RegExp('^((13[0-9])|(14[5,7,8,9])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$')
      if (value) {
        if (!reg.test(value)) {
          callback(new Error('手机号输入有误'))
        } else {
          callback()
        }
      }
    }
    return {
      status: [{
        value: '0',
        label: '全部状态'
      }, {
        value: '1',
        label: '正常'
      }, {
        value: '2',
        label: '停用'
      }],
      tableData: [],
      ruleForm: {
        uid: '',
        username: '',
        phone: '',
        statusVal: ''
      },
      rules: {
        uid: [
          { validator: validateInteger, trigger: 'change' }
        ],
        username: [
          { min: 0, max: 15, message: '最多15位', trigger: 'change' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'change' }
        ],
        statusVal: [
          { message: '请选择开始时间', trigger: 'change' }
        ]
      },
      totals: 0,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      uid: '',
      username: '',
      phone: ''
    }
  },
  watch: {
    'ruleForm.uid'(val) {
      this.$nextTick(() => {
        this.ruleForm.uid = filterSpecialSymbal(val)
      })
    },
    'ruleForm.phone'(val) {
      this.$nextTick(() => {
        this.ruleForm.phone = filterSpecialSymbal(val)
      })
    },
    'ruleForm.username'(val) {
      this.$nextTick(() => {
        this.ruleForm.username = filterSpecialSymbal(val)
      })
    }
  },
  created() {
    this.fetchUserList()
  },
  methods: {
    createAccount() {
      this.$router.push({
        path: '/user/account'
      })
    },
    argsAction() {},
    search() {
      this.ruleForm.statusVal = parseInt(this.ruleForm.statusVal) === 0 ? '' : this.ruleForm.statusVal
      this.fetchUserList()
    },
    fetchUserList(query) {
      this.argsAction()
      const queryObj = {
        page: this.currentPage,
        uid: this.ruleForm.uid,
        name: this.ruleForm.username,
        tel: this.ruleForm.phone,
        status: this.ruleForm.statusVal
      }
      this.loading = true
      fetchUserList(queryObj).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.tableData = []
          this.totals = res.data.data.page.total_number
          res.data.data.list.forEach(item => {
            const temp = Object.assign({}, item, {
              address: item.province_name + item.city_name,
              gender: parseInt(item.sex) === 1 ? '男' : '女',
              itag: this.switchItag(item.type)
            })
            this.tableData.push(temp)
          })
          this.loading = false
        }
      })
    },
    fetchUserSwitch(obj, cb) {
      fetchUserSwitch({
        id: obj.id
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          cb && cb.call(this)
        } else {
          this.$message.error('网络异常，请稍后再试')
        }
      })
    },
    switchItag(type) {
      let itag = ''
      switch (parseInt(type)) {
        case 1:
          itag = '用户'
          break
        case 2:
          itag = '官方号'
          break
        case 3:
          itag = '公司账号'
          break
      }
      return itag
    },
    // 修改每页显示多少条时触发
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.fetchUserList()
    },
    // 修改当前页码时触发
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchUserList()
    },
    handleEditClick(obj) {
      this.$router.push({
        path: '/user/account-edit/' + obj.id
      })
    },
    handleUseClick(obj) {
      let statusVal = '启用'
      if (parseInt(obj.status) === 1) {
        statusVal = '停用'
      }
      this.$confirm('您确定要' + statusVal + '吗？', statusVal + '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.fetchUserSwitch(obj, function() {
            obj.status = parseInt(obj.status) === 2 ? 1 : 2
            this.$message({
              type: 'success',
              message: statusVal + '成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.adId) {
            this.fetchAdEdit()
          } else {
            this.fetchAdAdd()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .list{
    margin: 30px;
    .active{
      color: #FF5353;
    }
    .el-input{
      width: auto;
    }
    .el-button+.el-button{
      margin-left: 0;
    }
    .el-form-item{
      margin-bottom: 0;
    }
  }
</style>
