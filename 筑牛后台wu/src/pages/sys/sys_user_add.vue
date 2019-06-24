<template>
  <div>
    <el-row :gutter="20" style="margin: 20px;margin-left: 0">
      <el-button type="primary" size="small">新增</el-button>
    </el-row>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text">配置角色</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        style="padding-top: 20px; text-align: right;"
        >
      </el-pagination>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
            id: 1,
            date: '2016-05-02',
            userName: '王小虎',
            email: 'xiaoge@gg.com',
            password: '123123',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: 2,
            date: '2016-05-04',
            userName: '王小虎',
            email: 'xiaoge@gg.com',
            password: '123123',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            id: 3,
            date: '2016-05-01',
            userName: '王小虎',
            email: 'xiaoge@gg.com',
            password: '123123',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 4,
            date: '2016-05-03',
            userName: '王小虎',
            email: 'xiaoge@gg.com',
            password: '123123',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      }
    }
  }
</script>

<style scoped>
  span{
    color: #5a5e66;
  }
</style>
