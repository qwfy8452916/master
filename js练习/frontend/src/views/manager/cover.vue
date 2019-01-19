<template>
  <div class="face">
    <div class="module-header">
      <div class="top"><span class="caption">封面管理</span><div class="r mr-10"><el-button type="success" @click="createCover">新建封面</el-button></div></div>
      <div class="middle">
        <div class="inline-block">
          位置：
          <el-select v-model="posValue" placeholder="全部位置">
            <el-option
              v-for="item in posOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" class="ml-15" @click="handleSearch">查询</el-button>
        </div>
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
        label="封面ID"
        header-align="center"
        width="150"
      />
      <el-table-column
        prop="position"
        label="位置"
        header-align="center"
        width="200"
      />
      <el-table-column
        label="封面图"
        header-align="center"
        width="500"
      >
        <template slot-scope="scope">
          <img :src="scope.row.img_url" alt="" @click="$seeImage">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        header-align="center"
      />
      <el-table-column
        prop="description"
        label="描述"
        header-align="center"
      />
      <el-table-column
        label="操作"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEditClick(scope.row)">编辑</el-button> |
          <el-button type="text" size="small" @click="handleDelClick(scope.row)">删除</el-button>
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
import { fetchCoverList, fetchCoverDel } from '@/api/cover'
export default {
  name: 'Face',
  data() {
    return {
      posOptions: [{
        value: '0',
        label: '全部位置'
      }, {
        value: '1',
        label: '品牌榜单'
      }, {
        value: '2',
        label: '分类榜单'
      }, {
        value: '3',
        label: '美家案例'
      }, {
        value: '4',
        label: '装修心得'
      }, {
        value: '5',
        label: '话题讨论'
      }, {
        value: '6',
        label: 'PK广场'
      }],
      status: [{
        value: 'all',
        label: '全部状态'
      }, {
        value: '1',
        label: '启用中'
      }, {
        value: '2',
        label: '停用中'
      }],
      tableData: [],
      posValue: '',
      totals: 0,
      currentPage: 1,
      pageSize: 10,
      loading: true
    }
  },
  created() {
    this.fetchCoverList()
  },
  methods: {
    createCover() {
      this.$router.push({
        path: '/manager/createCover'
      })
    },
    handleSearch() {
      this.currentPage = 1
      this.fetchCoverList()
    },
    argsAction() {
      this.posValue = parseInt(this.posValue) === 0 ? '' : this.posValue
    },
    fetchCoverList(query) {
      this.argsAction()
      const queryObj = {
        page_current: this.currentPage,
        position: this.posValue
      }
      this.loading = true
      fetchCoverList(queryObj).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          if (res.data.data.list.length <= 0 && this.currentPage > 1) {
            this.currentPage--
            this.fetchCoverList()
          } else {
            this.totals = res.data.data.page.total_number
            this.tableData = []
            res.data.data.list.forEach(item => {
              this.tableData.push({
                id: item.id,
                position: this.switchPos(item.position),
                img_url: item.img_url,
                title: item.title,
                description: item.description
              })
            })
            this.loading = false
          }
        } else {
          this.$message.error('网络异常，请稍后再试')
          this.loading = false
        }
      })
    },
    fetchCoverDel(obj) {
      fetchCoverDel({
        id: obj.id
      }).then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.error_code) === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // <!--todo-->
          location.reload()
        }
      })
    },
    switchPos(pos) {
      let position = ''
      switch (pos) {
        case 1:
          position = '品牌榜单'
          break
        case 2:
          position = '分类榜单'
          break
        case 3:
          position = '美家案例'
          break
        case 4:
          position = '装修心得'
          break
        case 5:
          position = '话题讨论'
          break
        case 6:
          position = 'PK广场'
          break
      }
      return position
    },
    // 修改每页显示多少条时触发
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.fetchCoverList()
    },
    // 修改当前页码时触发
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchCoverList()
    },
    handleEditClick(obj) {
      this.$router.push({
        path: '/manager/createCover/' + obj.id
      })
    },
    handleDelClick(obj, index) {
      this.$confirm('您确认删除吗', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.fetchCoverDel(obj, function() {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.tableData.splice(index, 1)
            this.fetchCoverList()
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
.face{
  margin: 30px;
  .el-button+.el-button{
    margin-left: 0;
  }
  img{
    max-width: 100%;
  }
}
</style>
