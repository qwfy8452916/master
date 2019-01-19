<template>
  <div class="ad" v-loading="loading">
    <div class="module-header">
      <div class="top"><span class="caption">广告位管理</span><div class="r mr-10"><el-button type="success" @click="createAd">新建广告</el-button></div></div>
      <div class="middle">
        <div class="inline-block">
          位置：
          <el-select v-model="posVal" placeholder="全部位置">
            <el-option
              v-for="item in posOptions"
              :key="item.id"
              :label="item.pos"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="inline-block pl-5">
          状态：
          <el-select v-model="statusVal" placeholder="全部状态">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="inline-block pl-5">
          有效期：
          <el-date-picker
            v-model="start_time"
            type="date"
            placeholder="开始时间"
            suffix-icon="el-icon-date"
          />
          <el-date-picker
            v-model="end_time"
            type="date"
            placeholder="结束时间"
            suffix-icon="el-icon-date"
          />
          <el-button class="ml-15" type="primary" @click="search">查询</el-button>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="text-center mt-20">
      <el-table-column
        prop="id"
        label="广告ID"
        width="150"
        header-align="center"
      />
      <el-table-column
        prop="position"
        label="广告位置"
        width="150"
        header-align="center"
      />
      <el-table-column
        label="缩略图"
        header-align="center"
        width="350"
      >
        <template slot-scope="scope">
          <img :src="scope.row.img_url" alt="" @click="$seeImage">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="主题"
        header-align="center"
      />
      <el-table-column
        label="有效期"
        header-align="center"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.term[0] }}</div>
          <div>{{ scope.row.term[1] }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        header-align="center"
      >
        <template slot-scope="scope">
          <div :class="{active:parseInt(scope.row.state) == 1}">{{ scope.row.state == 1 ? '启用中' : '停用中' }}</div>
        </template>
      </el-table-column>
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
          <el-button type="text" size="small" @click="handleUseClick(scope.row)">{{ parseInt(scope.row.state) == 1 ? '停用' : '启用' }}</el-button> |
          <el-button type="text" size="small" @click="handleDelClick(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <div class="lh2 text-right mt-20">
        <el-pagination
          :current-page="currentPage"
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
import { fetchAdList, fetchAdSwitch, fetchAdDel } from '@/api/ad'
export default {
  name: 'Ad',
  data() {
    return {
      posOptions: [{
        id: '0',
        pos: '全部位置'
      }, {
        id: '1',
        pos: '首页顶部'
      }, {
        id: '2',
        pos: '说说顶部'
      }],
      status: [{
        value: '0',
        label: '全部状态'
      }, {
        value: '1',
        label: '启用中'
      }, {
        value: '2',
        label: '停用中'
      }],
      tableData: [],
      totals: 0,
      posVal: '',
      statusVal: '',
      start_time: '',
      end_time: '',
      currentPage: 1,
      pageSize: 20,
      loading: true
    }
  },
  created() {
    this.fetchAds()
    this.requestDemo()
  },
  methods: {
    createAd() {
      this.$router.push({
        path: '/manager/createAd'
      })
    },
    argsAction() {
      let s, sTmp, e, eTmp
      if (!this.start_time) {
        s = ''
      } else {
        sTmp = new Date(this.start_time)
        s = sTmp.getFullYear() + '-' + (parseInt(sTmp.getMonth()) + 1) + '-' + sTmp.getDate()
      }
      if (!this.end_time) {
        e = ''
      } else {
        eTmp = new Date(this.end_time)
        e = eTmp.getFullYear() + '-' + (parseInt(eTmp.getMonth()) + 1) + '-' + eTmp.getDate()
      }
      this.posVal = parseInt(this.posVal) === 0 ? '' : this.posVal
      this.statusVal = parseInt(this.statusVal) === 0 ? '' : this.statusVal
      this.start_time = s
      this.end_time = e
    },
    search() {
      if (this.start_time && this.end_time) {
        if (this.start_time > this.end_time) {
          this.$message.error('开始时间不能大于结束时间')
          return
        }
      }
      this.currentPage = 1
      this.fetchAds()
    },
    fetchAds(query) {
      this.argsAction()
      const queryObj = {
        page_current: this.currentPage,
        position: this.posVal,
        state: this.statusVal,
        start_time: this.start_time,
        end_time: this.end_time
      }
      this.loading = true
      fetchAdList(queryObj).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          if (res.data.data.list.length <= 0 && this.currentPage > 1) {
            this.currentPage--
            this.fetchAds()
          } else {
            this.totals = res.data.data.page.total_number
            this.pageSize = res.data.data.page.page_size
            this.tableData = []
            res.data.data.list.forEach(item => {
              const startTime = new Date(item.start_time * 1000)
              const endTime = new Date(item.end_time * 1000)
              item.term = [
                startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate(),
                endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate()
              ]
              item.position = this.posOptions[item.position].pos + 'banner'
              this.tableData.push(item)
            })
            this.loading = false
          }
        }
      })
    },
    fetchAdSwitch(obj, type, cb) {
      this.loading = true
      fetchAdSwitch({
        id: obj.id,
        switch_type: type
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          cb && cb.call(this)
          this.loading = false
        }
      })
    },
    fetchAdDel(obj, cb) {
      this.loading = true
      fetchAdDel({
        id: obj.id
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          cb && cb.call(this)
        }
      })
    },
    // 修改每页显示多少条时触发
    handleSizeChange(val) {
      this.currentPage = 1
      this.fetchAds({
        position: parseInt(this.posVal) === 0 ? '' : this.posVal,
        state: parseInt(this.statusVal) === 0 ? '' : this.statusVal,
        start_time: this.start_time,
        end_time: this.end_time
      })
    },
    // 修改当前页码时触发
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchAds({
        position: parseInt(this.posVal) === 0 ? '' : this.posVal,
        state: parseInt(this.statusVal) === 0 ? '' : this.statusVal,
        start_time: this.start_time,
        end_time: this.end_time
      })
    },
    handleEditClick(obj) {
      this.$router.push({
        path: '/manager/createAd/' + obj.id
      })
    },
    handleUseClick(obj) {
      let statusVal = '启用'
      if (parseInt(obj.state) === 1) {
        statusVal = '停用'
      }
      this.$confirm('您确定要' + statusVal + '吗？', statusVal + '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let type = 'on'
          parseInt(obj.state) === 1 ? type = 'off' : ''
          this.fetchAdSwitch(obj, type, function() {
            obj.state = parseInt(obj.state) === 1 ? 2 : 1
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
    handleDelClick(obj, index) {
      this.$confirm('您确认删除吗', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.fetchAdDel(obj, function() {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.tableData.splice(index, 1)
            this.fetchAds()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    requestDemo() {
      const ajax = new XMLHttpRequest()
      ajax.open('get', 'http://zxs.api.qizuang.com/admin/banner/list')
      ajax.send()
      ajax.onreadystatechange = function(res) {
        console.log(res)
        if (ajax.readyState === 4 && ajax.status === 200) {
          console.log(ajax.responseText)
        }
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .ad{
    margin: 30px;
    .el-table th{
      text-align: center !important;
    }
    .el-table td{
      img{
        max-width: 100%;
      }
      .active{
        color: #FF5353;
      }
    }
    .el-button+.el-button{
      margin-left: 0;
    }
  }
</style>
