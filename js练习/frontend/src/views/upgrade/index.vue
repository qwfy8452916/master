<template>
  <div style="padding:30px;">
    <div class="module-header">
      <div class="top"><span class="caption">升级管理</span>
        <div class="r mr-10">
          <el-button type="success" @click="createVer">新建版本</el-button>
        </div>
      </div>
      <div class="middle">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="系统分类:">
            <el-select v-model="formInline.value" placeholder="系统分类">
              <el-option value="0" label="系统分类"/>
              <el-option value="1" label="Android"/>
              <el-option value="2" label="IOS"/>
            </el-select>
          </el-form-item>
          <el-form-item label="版本号:">
            <el-input v-model="formInline.version" placeholder="版本号"/>
          </el-form-item>
          <el-form-item label="时间:">
            <el-col :span="11">
              <el-date-picker
                v-model="formInline.beginTime"
                type="date"
                format="yyyy-MM-dd "
                placeholder="开始时间"/>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="11">
              <el-date-picker
                v-model="formInline.endTime"
                type="date"
                format="yyyy-MM-dd "
                placeholder="结束时间"/>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-menu :default-active="activeIndex" mode="horizontal" router>
      <el-menu-item index="/upgrade/index">全部 ( {{ this.pageTotal}} )</el-menu-item>
      <!--<el-menu-item index="/upgrade/rubbish">垃圾箱 ( {{ garbageData}} )</el-menu-item>-->
    </el-menu>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="排序ID"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="系统"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.category === 1 ? 'android' : 'ios' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="版本号"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.version }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="APP下载链接"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.link }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否强制升级"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.upgrade === 1 ? "强制" : "不强制" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="升级内容"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-row type="flex" justify="end" style="padding: 20px 0;">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            :total="pageTotal"
            layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {fetchUpList, fetchDelVersion} from '@/api/upgrade'

  export default {
    data() {
      return {
        formInline: {
          version: '',
          beginTime: '',
          endTime: '',
          value: ''
        },
        tableData: [],
        // 分页
        currentPage: 0,
        pageSize: 0,
        pageTotal: 0,
        activeIndex: this.$route.path
      }
    },
    created() {
      this.fetchUpItemList()
    },
    methods: {
      fetchUpItemList(query) {
        const defaultVal = {
          page: this.currentPage
        }
        let queryVal = Object.assign({}, defaultVal, query)
        fetchUpList(queryVal).then((res) => {
          if (res.status === 200 && parseInt(res.data.error_code) === 0) {
            const dataVal = res.data.data
            this.pageTotal = parseInt(dataVal.page.total_number)
            this.pageSize = parseInt(dataVal.page.page_size)
            this.currentPage = parseInt(dataVal.page.page_current)
            this.tableData = []
            this.tableData = dataVal.list
            this.tableData.forEach((item) => {
              const time = new Date(item.time * 1000)
              item.time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
            })
          }
        })
      },
      // 查询
      submitQuery() {
        if (this.formInline.beginTime && this.formInline.endTime) {
          if (this.formInline.beginTime > this.formInline.endTime) {
            this.$message({
              type: 'error',
              message: '开始时间不能大于结束时间'
            })
            return false
          }
        }
        this.fetchUpItemList({
          category: this.formInline.value,
          version: this.formInline.version,
          begin: this.formInline.beginTime,
          end: this.formInline.endTime
        })
      },
      // 每页显示多少条数
      handleSizeChange(val) {
        this.currentPage = 1
        this.pageSize = val
        this.fetchUpItemList()
      },
      // 跳转到第几页
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchUpItemList()
      },
      createVer() {
        this.$router.push({
          path: '/upgrade/editVer'
        })
      },
      fetchDelVersion(obj){
        fetchDelVersion({
          id:obj.id
        })
          .then((res) => {
          if (res.status === 200 && parseInt(res.data.error_code) === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            location.reload()
          }
        })
      },
      deleteHandle(obj){
        this.$confirm("确定要删除吗？", "删除提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.fetchDelVersion(obj)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          })
      }
    }
  }
</script>
