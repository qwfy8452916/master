<template>
  <div class="box">
    <div class="head">
      <span class="title">对比管理</span>
      <el-button class="new-btn" type="success" @click="createContrast">新建对比</el-button>
    </div>
    <div class="search-box clearfix">
      <el-form :inline="true" :model="formInline" >
        <el-form-item label="产品名称：">
          <el-autocomplete
            class="inline-input"
            v-model="formInline.productName"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect1"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="创建者：">
          <el-autocomplete
            class="inline-input"
            v-model="formInline.creator"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect2"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="时间:" class="time">
          <el-date-picker type="date" v-model="formInline.date1" placeholder="开始时间"></el-date-picker>
          <el-date-picker type="date" v-model="formInline.date2" placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="label" name="first">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="排序ID"
              align="center">
            </el-table-column>
            <el-table-column
              prop="first_product"
              label="对比产品名称1"
              align="center">
            </el-table-column>
            <el-table-column
              prop="first_up"
              label="支持人数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="second_product"
              label="对比产品名称2"
              align="center">
            </el-table-column>
            <el-table-column
              prop="second_up"
              label="支持人数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="creator"
              label="创建者"
              align="center">
            </el-table-column>
            <el-table-column
              prop="comments"
              label="评论数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="likes"
              label="喜欢数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="publish_time"
              label="发布时间"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="300" align="center">
              <template slot-scope="scope">
                <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
                |<el-button @click="handleDelete(scope.$index,scope.row)" type="text" size="small">移至垃圾箱</el-button>
                |<el-button
                type="text"
                @click="handleChange(scope.row)">{{ parseInt(scope.row.top) == 1 ? '取消置顶' : '置顶' }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pageTotal">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane :label="sticklabel" name="second">
          <el-table
            :data="stickData"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="排序ID"
              align="center">
            </el-table-column>
            <el-table-column
              prop="first_product"
              label="对比产品名称1"
              align="center">
            </el-table-column>
            <el-table-column
              prop="first_up"
              label="支持人数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="second_product"
              label="对比产品名称2"
              align="center">
            </el-table-column>
            <el-table-column
              prop="second_up"
              label="支持人数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="creator"
              label="创建者"
              align="center">
            </el-table-column>
            <el-table-column
              prop="comments"
              label="评论数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="likes"
              label="喜欢数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="publish_time"
              label="发布时间"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="300"
              align="center">
              <template slot-scope="scope">
                <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
                |<el-button @click="handleDelete(scope.$index)" type="text" size="small">移至垃圾箱</el-button>
                |<el-button @click="delStick(scope.row)" type="text" >{{ parseInt(scope.row.top) == 1 ? '置顶' : '取消置顶' }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="stickpageTotal">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane :label="garbagelabel" name="third">
          <el-table
            :data="garbageData"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="排序ID"
              align="center">
            </el-table-column>
            <el-table-column
              prop="first_product"
              label="对比产品名称1"
              align="center">
            </el-table-column>
            <el-table-column
              prop="first_up"
              label="支持人数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="second_product"
              label="对比产品名称2"
              align="center">
            </el-table-column>
            <el-table-column
              prop="second_up"
              label="支持人数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="creator"
              label="创建者"
              align="center">
            </el-table-column>
            <el-table-column
              prop="comments"
              label="评论数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="likes"
              label="喜欢数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="publish_time"
              label="发布时间"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="300" align="center">
              <template slot-scope="scope">
                <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
                |<el-button @click="handleForneverDelete(scope.$index, scope.row)" type="text" size="small">永久删除</el-button>
                |<el-button @click="recovery" type="text" >恢复</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="garbageTotal">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>
<script>

import { fetchContrastPos,fetchContrastList,fetchGarbageList, userList } from '@/api/contrast'

export default {
  name: 'contrast',
  data() {
    return {
      formInline: {
        productName: '',
        creator: '',
        date1: '',
        date2: ''
      },
      activeName: 'first',
      centerDialogVisible2: false,
      tableData: [],
      stickData: [],
      garbageData: [],
      label: '',
      sticklabel: '',
      garbagelabel: '',
      pageTotal: null,
      stickpageTotal: null,
      garbageTotal: null,
      currentPage: 1,
      pageSize: 10,
      userData: []
    }
  },
  created() {
    this.fetchData()
    this.fetchGarbageData()
    this.fetchTopData()
  },
  methods: {
      querySearch(queryString, cb) {
        var userData = this.userData
        var results = queryString ? userData.filter(this.createFilter(queryString)) : userData
        // 调用 callback 返回建议列表的数据

        let obj = { value:'未查询到创建者' }
        if(results.length == 0 ) {
          results.push(obj)
          cb(results)
        }else {
          cb(results)
        }

      },
      createFilter(queryString) {
        return (userData) => {
          return (userData.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll() {
        userList().then(res => {
          this.userData = res.data.data.list
        })
        return this.userData
      },
      handleSelect1(item) {
        // console.log(item)
      },
      handleSelect2(item) {
        // console.log(item)
      },
      handleClick(tab, event) {
        // console.log(tab, event)
      },
      handleChange(obj) {
        obj.top = parseInt(obj.top) === 1 ? 2 : 1
        //  <!--todo-->
      },
      createContrast() {
        this.$router.push({
          path: '/content/createContrast'
        })
      },
      handleEditClick(obj) {
        this.$router.push({
          path: '/content/createContrast/' + obj.id
        })
      },
      handleDelete(index, row) {
        this.$confirm("确定移至垃圾箱吗？", "移至垃圾箱提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
      },
      recovery(index, row) {
        this.$confirm("确认要恢复吗？恢复后可在全部中查看。", "恢复提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
          this.$message({
          type: "success",
          message: "恢复成功!"
          })
        })
          .catch(() => {
          this.$message({
          type: "info",
          message: "已取消恢复"
          })
        })
      },
      handleForneverDelete(index, row) {
        this.$confirm("确认永久删除么？", "删除提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
          this.$message({
          type: "success",
          message: "删除成功!"
          })
        })
          .catch(() => {
          this.$message({
          type: "info",
          message: "已取消删除"
          })
        })
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
        fetchContrastList().then(res => {
          if ( res.status === 200 && parseInt(res.data.error_code) === 0 ) {
            this.tableData = res.data.data.list
            this.pageTotal = res.data.data.page.total
            // this.pageSize = res.data.data.page.page_size
            this.label = "全部("+ this.pageTotal +')'
          }
        }).catch(function(reason){
          console.log(reason)
        })
      },
      fetchTopData() {
        fetchContrastList().then(res => {
          if ( res.status === 200 && parseInt(res.data.error_code) === 0 ) {
            res.data.data.list.forEach(item => {
              if( item.top == 2 ) {
                this.stickData.push(item)
              }
              this.stickpageTotal = this.stickData.length
              this.sticklabel = "置顶("+ this.stickpageTotal +')'
            })
          }
        }).catch(function(reason){
          console.log(reason)
        })
      },
      fetchGarbageData() {
        fetchContrastList().then(res => {
          if ( res.status === 200 && parseInt(res.data.error_code) === 0 ) {
            res.data.data.list.forEach(item => {
              if( item.is_del == 2 ) {
                this.garbageData.push(item)
              }
              this.garbageTotal = this.garbageData.length
              this.garbagelabel = "垃圾箱("+ this.garbageTotal +')'
            })
          }
        }).catch(function(reason){
          console.log(reason)
        })
      },
      delStick(index) {
        getList().then(res => {
          const arr = res.data.items
          arr.splice(index,1)
          console.log(arr.length)
          this.tableData = arr
        }).catch(function(reason){
          console.log(reason)
        })
      },

    },
    mounted() {
      this.userData  = this.loadAll()
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  margin: 30px;
  padding-bottom: 10px;
  .head {
    height: 50px;
    line-height: 50px;
    padding-top: 5px;
    padding-bottom: 5px;
    box-sizing: border-box;
    border:1px solid #ccc;
    .title {
      font-weight: 700;
      font-size: 16px;
      margin-left: 10px;
    }
    .new-btn {
      float: right;
      margin-right: 10px;
    }
  }
  .search-box {
    height: 60px;
    padding: 10px;
    border:1px solid #ccc;
    border-top: none;
    margin-bottom: 20px;
    .el-form-item {
      float: left;
      .el-form-item__label {
        float: left;
      }
      .el-form-item__content {
        float: left;
      }
    }
  }
  .el-tabs {
    clear: both;
    padding: 0 10px;
    .el-table td, .el-table th {
      padding: 8px 0;
    }
  }
  .el-pagination {
    float: right;
    margin: 10px 20px;
  }
}
</style>
