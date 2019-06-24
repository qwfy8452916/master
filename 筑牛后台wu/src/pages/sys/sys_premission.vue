<template>
  <div class="">
    <el-row :gutter="20" style="margin: 20px;margin-left: 0">
      <el-button type="primary" size="small" @click="createPower">新增</el-button>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <el-tree
            :data="powerList"
            :props="defaultProps"
            @node-click="handleNodeClick"
            node-key="powerId"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <el-form ref="form" label-width="80px" :model="power">
            <el-form-item label="父级">
              <el-cascader
              :options="powerList"
              v-model="power.pid"
              :props="defaultProps"
              :check-strictly="true"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="名称"
            prop="powerName"
            :rules="[
              { required: true, message: '请输入权限名称', trigger: 'blur' }
            ]"
          >
            <el-input v-model="power.powerName"></el-input>
          </el-form-item>
          <el-form-item label="唯一key"
            prop="powerKey"
            :rules="[
              { required: true, message: '请输入唯一key', trigger: 'blur' }
            ]"
          >
            <el-input v-model="power.powerKey"></el-input>
          </el-form-item>
          <el-form-item label="链接"
            prop="powerUrl"
          >
            <el-input v-model="power.powerUrl"></el-input>
          </el-form-item>
          <el-form-item label="是否跳转">
            <el-radio-group v-model="power.jmp">
              <el-radio :label="1">不跳转</el-radio>
              <el-radio :label="0">跳转</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSavePower('form')">{{status == 'save' ? '新增' : '保存'}}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    </el-row>
  </div>
</template>

<script>
  import  apiRequest  from '../../api/api'
  let constPower = {
    pid: [],
    powerName: '',
    powerUrl: '',
    jmp: 1,
    powerId: null
  };
  export default {
    data() {
      return {
        power: {
          pid: [],
          powerName: '',
          powerUrl: '',
          jmp: 1,
          powerId: null
        },
        status: 'save', // save edit
        powerList: [],
        defaultProps: {
          children: 'childs',
          label: 'powerName',
          value: 'powerId'
        }
      }
    },
    created() {
      this.fetchPowerList()
    },
    methods: {
      fetchPowerList() {
        apiRequest('post', 'admin/power/query', {}).then(res => {
          if (res.status == '0') {
            this.powerList = res.data.treeNodeList || []
          }
        })
      },
      onSavePower(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let temp = Object.assign({}, this.power)
            temp.pid = temp.pid.length > 0 ? temp.pid[temp.pid.length - 1] : 0
            if (this.status == 'save') {
              apiRequest('post', 'admin/power/create', temp).then((res) => {
                if (res.status == '0') {
                  this.power = Object.assign({}, constPower)
                  this.fetchPowerList()
                  this.$message({
                    type: 'success',
                    message: '权限添加成功!'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg || '权限编辑失败!'
                  });
                }
              })
            } else {
              temp.id = temp.powerId
              apiRequest('post', 'admin/power/update', temp).then((res) => {
                if (res.status == '0') {
                  this.power = Object.assign({}, constPower)
                  this.fetchPowerList()
                  this.$message({
                    type: 'success',
                    message: '权限修改成功!'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg || '权限编辑失败!'
                  });
                }
              })
            }
          } else {
            return false;
          }
        })
      },
      createPower() {
        this.status = 'save'
        this.power = Object.assign({}, constPower)
      },
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      remove(node, data) {
        this.$confirm(`此操作将永久删除<span style="color: red;"> ${data.powerName} </span>权限, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(() => {
          apiRequest('post', 'admin/power/delete', {id: data.powerId, deleteFlag: 1}).then((res) => {
            if (res.status == '0') {
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.powerId === data.powerId);
              children.splice(index, 1);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: res.msg || '删除失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      edit(node, data) {
        this.status = 'edit'
        let {powerId, jmp, powerName, powerUrl, powerKey} = data
        let pid = []
        function getPid(node) {
          if (node.data.pid == 0) {
            return
          } else {
            pid.unshift(node.data.pid)
            return getPid(node.parent)
          }
        }
        getPid(node)
        this.power = {
          powerId, jmp, pid: pid || [], powerName, powerUrl, powerKey
        }
      },
      renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.data.powerName}</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.edit(node, data) }>编辑</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
      },
      handleChange(data) {
      },
      handleNodeClick(data) {
      }
    }
  };
</script>
