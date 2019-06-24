<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item label="姓名">
          <el-input v-model="filter.userName" placeholder="请输入姓名" type="tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="inquiry">查询</el-button>
          <el-button @click="resetting" >重置</el-button>
          <el-button @click="createUser()" type="primary" >新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="序号">
      </el-table-column>
      <el-table-column prop="accountNo" label="账号">
      </el-table-column>
      <el-table-column prop="userName" label="姓名">
      </el-table-column>
      <el-table-column prop="userType" label="类型">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
                <el-button @click="editUser(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="assignRole(scope.row)" type="text">配置角色</el-button>
                <el-button type="text" size="small" @click="removeUser(scope.row)">删除</el-button>
</template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        style="padding-top: 20px; text-align: right;"
        @current-change="handleCurrentChange"
        >
      </el-pagination>

      <el-dialog
        :title="getTitle()"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <el-form ref="form" label-width="80px" :model="editItem">
          <el-form-item label="用户名"
            prop="accountNo"
            :rules="[
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ]"
          >
            <el-input v-model="editItem.accountNo"></el-input>
          </el-form-item>
          <el-form-item label="密码"
            prop="password"
            :rules="[
              { required: userState == 'edit' ? false : true, message: '请输入密码', trigger: 'blur' }
            ]"
          >
            <el-input v-model="editItem.password"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名"
            prop="userName"
            :rules="[
              { required: true, message: '请输入真实姓名', trigger: 'blur' }
            ]"
          >
            <el-input v-model="editItem.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-radio-group v-model="editItem.userType">
              <el-radio :label="1">内部用户</el-radio>
              <el-radio :label="2">外部用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="邮箱"
            prop="email"
            :rules="[
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            ]"
          >
            <el-input v-model="editItem.email"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="editItem.idNumber"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleClose('form')">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="配置角色"
        :visible.sync="assignRoleDialogVisible"
        width="50%"
        >
        <el-checkbox-group v-model="checkList">
          <el-checkbox :label="role.id" v-for="role in roleList" :key="index">
            {{role.roleName}}
          </el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="assignRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAssignClose">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import $api from '../../api/api'
export default {
  data() {
    return {
      filter: {
        relName: ''
      },
      userList: [],
      dialogVisible: false,
      assignRoleDialogVisible: false,
      userState: '',
      editItem: {},
      roleList: [],
      checkList: [],
      total: 0
    }
  },
  created() {
    this.fetchUserList()
    this.fetchRoleList()
  },
  methods: {
    getTitle() {
      return this.userState == 'save' ? '新建用户' : '编辑用户'
    },
    fetchUserList(obj) {
      // apiRequest('post', 'admin/user/getUserLs', obj || {}).then(res => {
      //   if (res.status == '0') {
      //     this.userList = res.data.list || []
      //     this.total = res.data.total
      //   }
      // })
    },
    inquiry() {
      // apiRequest('post', 'admin/user/findByName', {
      //   userName: this.filter.userName
      // }).then(res => {
      //   if (res.status == '0') {
      //     this.userList = res.data || []
      //     this.total = 0
      //   } else {
      //     this.$message({
      //       message: res.msg || '请输入正确的姓名',
      //       type: 'error'
      //     })
      //   }
      // })
    },
    resetting() {
      this.filter.userName = ''
    },
    fetchRoleList() {
      // apiRequest('post', 'admin/role/findRoles', {}).then(res => {
      //   if (res.status == '0') {
      //     this.roleList = res.data || []
      //   }
      // })
    },
    createUser() {
      this.userState = 'save'
      this.dialogVisible = true
      this.editItem = {
        userType: 2
      }
    },
    editUser(data) {
      this.userState = 'edit'
      this.dialogVisible = true
      this.editItem = Object.assign({}, data)
      this.editItem.password = ''
    },
    assignRole(data) {
      this.checkList = []
      this.editItem = data
      // apiRequest('post', 'admin/user/findRolesByUser', {
      //   id: data.id
      // }).then(res => {
      //   if (res.status == '0') {
      //     this.checkList = res.data.map(r => {
      //       return r.roleId
      //     })
      //   }
      // })
      this.assignRoleDialogVisible = true
    },
    handleAssignClose() {
      this.assignRoleDialogVisible = false
      // apiRequest('post', 'admin/user/editUserRole', {
      //   id: this.editItem.id,
      //   roleList: this.checkList
      // }).then(res => {
      //   if (res.status == '0') {
      //     this.$message({
      //       type: 'success',
      //       message: '编辑用户角色成功!'
      //     })
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: '编辑用户角色失败!'
      //     })
      //   }
      // })
    },
    handleClose(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.userState == 'save') {
            // apiRequest('post', 'admin/user/saveUser', this.editItem).then(
            //   res => {
            //     if (res.status == '0') {
            //       this.dialogVisible = false
            //       this.fetchUserList()
            //     } else {
            //       this.$message({
            //         type: 'error',
            //         message: res.msg
            //       })
            //     }
            //   }
            // )
          } else {
            // apiRequest('post', 'admin/user/updateUser', this.editItem).then(
            //   res => {
            //     if (res.status == '0') {
            //       this.dialogVisible = false
            //       this.fetchUserList()
            //     } else {
            //       this.$message({
            //         type: 'error',
            //         message: res.msg
            //       })
            //     }
            //   }
            // )
          }
        } else {
          return false
        }
      })
    },
    removeUser(data) {
      this.$confirm(
        `此操作将永久删除<span style="color: red;"> ${
          data.userName
        } </span>用户, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          // apiRequest('post', 'admin/user/updateUser ', {
          //   accountNo: data.accountNo,
          //   deleteFlag: 1
          // }).then(res => {
          //   if (res.status == '0') {
          //     this.fetchUserList()
          //     this.$message({
          //       type: 'success',
          //       message: '删除成功!'
          //     })
          //   } else {
          //     this.$message({
          //       type: 'error',
          //       message: '删除失败!'
          //     })
          //   }
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleCurrentChange(pageNum) {
      this.fetchUserList({
        pageNum
      })
    }
  }
}
</script>

<style scoped>
span {
  color: #5a5e66;
}
</style>
