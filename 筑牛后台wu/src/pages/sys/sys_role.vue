<template>
  <div>
    <el-row :gutter="20" style="margin: 20px;margin-left: 0">
      <el-button type="primary" size="small" @click="createRole()">新增</el-button>
    </el-row>
    <el-table
        :data="roleList"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名字">
        </el-table-column>
        <el-table-column
          prop="deleteFlag"
          label="删除状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editRole(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="assignPower(scope.row)">配置权限</el-button>
            <el-button type="text" size="small" @click="removeRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="getTitle()"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <el-form ref="form" label-width="80px" :model="editItem">
          <el-form-item label="角色名称"
            prop="roleName"
            :rules="[
              { required: true, message: '请输入角色名称', trigger: 'blur' }
            ]"
          >
            <el-input v-model="editItem.roleName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleClose('form')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="配置权限"
        :visible.sync="assigndDialogVisible"
        width="30%"
        >
        <el-tree
          :data="powerList"
          :props="defaultProps"
          ref="powerListTree"
          node-key="powerId"
          default-expand-all
          show-checkbox
          :expand-on-click-node="false">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="assigndDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="assignPowerBtn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import  apiRequest  from '../../api/api'
  export default {
    data() {
      return {
        roleList: [],
        dialogVisible: false,
        assigndDialogVisible: false,
        editItem: {},
        roleState: 'save',
        powerList: [],
        defaultProps: {
          children: 'childs',
          label: 'powerName',
          value: 'powerId'
        }
      }
    },
    created() {
      this.fetchRoleList()
      this.fetchPowerList()
    },
    methods: {
      fetchRoleList() {
        apiRequest('post', 'admin/role/findRoles', {}).then(res => {
          if (res.status == '0') {
            this.roleList = res.data || []
          }
        })
      },
      fetchPowerList() {
        apiRequest('post', 'admin/power/query', {}).then(res => {
          if (res.status == '0') {
            this.powerList = res.data.treeNodeList || []
          } else {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
      },
      handleClose(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {id, roleName} = this.editItem
            if (this.roleState == 'edit') {
              apiRequest('post', 'admin/role/updateRole', {id, roleName}).then((res) => {
                this.dialogVisible = false
                if (res.status == '0') {
                  this.fetchRoleList()
                  this.$message({
                    type: 'success',
                    message: '编辑成功!'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg
                  });
                }
              })
            } else {
              apiRequest('post', 'admin/role/saveRole', {roleName}).then((res) => {
                this.dialogVisible = false
                if (res.status == '0') {
                  this.fetchRoleList()
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg
                  });
                }
              })
            }
          } else {
            return false
          }
        })
      },
      getTitle() {
        return this.roleState == 'edit'? '编辑角色' : '添加角色'
      },
      createRole() {
        this.roleState = 'save'
        this.dialogVisible = true
        this.editItem = {}
      },
      editRole(data) {
        this.roleState = 'edit'
        this.dialogVisible = true
        this.editItem = Object.assign({}, data)
      },
      assignPower(data) {
        this.assigndDialogVisible = true
        this._assignPowerData = data
        let {id} = data
        apiRequest('post', 'admin/role/findPowersByRole', {id}).then((res) => {
          if (res.status == '0') {
            let defaultCheckedKeys = res.data.map((item) => {
              return item.powerId
            })
            this.$refs.powerListTree.setCheckedKeys(defaultCheckedKeys)
          }
        })
      },
      assignPowerBtn() {
        let keys = this.$refs.powerListTree.getCheckedKeys(true)
        if (keys.length == 0) {
          this.$message({
            type: 'info',
            message: '请选择权限!'
          });
        } else {
          apiRequest('post', 'admin/role/editRolePower', {id: this._assignPowerData.id, powerList: keys}).then((res) => {
            if (res.status == '0') {
              this.assigndDialogVisible = false
              this.$message({
                type: 'success',
                message: '设置权限成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '删除成功!'
              });
            }
          })
        }
      },
      removeRole(data) {
        this.$confirm(`此操作将永久删除<span style="color: red;"> ${data.roleName} </span>角色, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(() => {
          apiRequest('post', 'admin/role/updateRole', {id: data.id, deleteFlag: 1}).then((res) => {
            if (res.status == '0') {
              this.fetchRoleList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>
  span{
    color: #5a5e66;
  }
</style>
