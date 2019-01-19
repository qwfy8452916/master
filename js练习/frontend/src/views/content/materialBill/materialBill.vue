<template>
  <div class="box" v-loading="loading">
    <div class="head">
      <span class="title">材料品牌榜单管理</span>
      <div class="right">
        <el-button class="new-btn" type="success" @click="createMaterialBill">新建榜单</el-button>
        <el-button class="new-btn" type="primary" @click="brandClassify">分类管理</el-button>
      </div>
    </div>
    <div class="search-box clearfix">
      <el-form :inline="true" :model="formInline" >
        <el-form-item label="" prop="category">
          <el-select v-model="formInline.category">
            <el-option
              v-for="item in category"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：">
          <el-input
            class="inline-input"
            v-model="formInline.title"
            placeholder="请输入内容"
            :trigger-on-focus="false"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建者：">
          <el-autocomplete
            class="inline-input"
            v-model="formInline.author"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="时间:" class="time">
          <el-date-picker type="date" v-model="formInline.begin" placeholder="开始时间"></el-date-picker>
          <el-date-picker type="date" v-model="formInline.end" placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
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
              type="index"
              label="排序ID"
              align="center"
              width="90">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              align="center">
            </el-table-column>
            <el-table-column
              prop="author"
              label="创建者"
              align="center">
            </el-table-column>
            <el-table-column
              prop="comment_count"
              label="评论数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="likes"
              label="喜欢数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="collect_count"
              label="收藏数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="time"
              label="发布时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="px"
              label="排序值"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="200" 
              align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
                |<el-button type="text" size="small" @click="handleDelete(scope.$index,scope.row)">移至垃圾箱</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="pageTotal">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane :label="garbageLabel" name="second">
          <el-table
            :data="garbageData"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="排序ID"
              align="center"
              width="90">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              align="center">
            </el-table-column>
            <el-table-column
              prop="author"
              label="创建者"
              align="center">
            </el-table-column>
            <el-table-column
              prop="comment_count"
              label="评论数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="likes"
              label="喜欢数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="collect_countm"
              label="收藏数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="time"
              label="发布时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="px"
              label="排序值"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="200" align="center">
              <template slot-scope="scope">
                <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
                |<el-button @click="handleForneverDelete(scope.$index,scope.row)" type="text" size="small">永久删除</el-button>
                |<el-button @click="recovery(scope.$index,scope.row)" type="text" size="small">恢复</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="garbagePageTotal">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { fetchMaterialBillList, fetchMoveTrash, fetchDelBrand, fetchResetBrand, searchUser } from '@/api/materialBill'

export default {
  name: 'materialBill',
  inject: ["reload"],
  data() {
    return {
      formInline: {
        category:'',
        title: '',
        author: '',
        begin: '',
        end: ''
      },
      activeName: 'first',
      centerDialogVisible2: false,
      tableData: [],
      garbageData: [],
      label: '',
      garbageLabel: '',
      pageTotal: null,
      garbagePageTotal: null,
      currentPage: 1,
      pageSize: 10,
      loading: true,
      userData: [],
      category: [
        {
          value: '0',
          label: '请选择'
        },
        {
          value: '1',
          label: '瓷砖'
        }, {
          value: '2',
          label: '地板'
        }, {
          value: '3',
          label: '油漆'
        }, {
          value: '4',
          label: '整体橱柜'
        }, {
          value: '5',
          label: '灯具'
        }, {
          value: '6',
          label: '灶具'
        }, {
          value: '7',
          label: '油烟机'
        }, {
          value: '8',
          label: '热水器'
        }, {
          value: '9',
          label: '浴霸'
        }, {
          value: '10',
          label: '冰箱电视'
        }, {
          value: '11',
          label: '洗衣机'
        }, {
          value: '12',
          label: '空调'
        }, {
          value: '13',
          label: '水槽'
        }, {
          value: '14',
          label: '龙头'
        }, {
          value: '15',
          label: '地漏'
        }, {
          value: '16',
          label: '门锁'
        }
      ],
    }
  },
  created() {
    this.fetchData()
  },
  watch:{
    'formInline.author':{
      handler () {
        this.userData  = this.loadAll()
      }
    }
  },
  methods: {
    querySearch(queryString, cb) {
      // 调用 callback 返回建议列表的数据
      let obj = { value:'未查询到创建者' }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        var userData = this.userData
        if(userData.length == 0 ) {
          userData.push(obj)
          cb(userData)
        }else {
          cb(userData)
        }
      }, 1000)
    },
    loadAll() {
      searchUser({
        user_name:this.formInline.author
      }).then(res => {
        if( res.status === 200 && parseInt(res.data.error_code) === 0 ) {
          this.userData = res.data.data
        }
      })
      return this.userData
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    search(){
      let s, sTmp, e, eTmp
      if (!this.formInline.begin) {
        s = ''
      } else {
        sTmp = new Date(this.formInline.begin)
        s = sTmp.getFullYear() + '-' + (parseInt(sTmp.getMonth()) + 1) + '-' + sTmp.getDate()
      }
      if (!this.formInline.end) {
        e = ''
      } else {
        eTmp = new Date(this.formInline.end)
        e = eTmp.getFullYear() + '-' + (parseInt(eTmp.getMonth()) + 1) + '-' + eTmp.getDate()
      }
      this.formInline.begin = s
      this.formInline.end = e

      this.currentPage = 1
      this.fetchData()
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
      fetchMaterialBillList({
        category:this.formInline.category,
        title: this.formInline.title,
        author: this.formInline.author,
        begin: this.formInline.begin,
        end: this.formInline.end,
        page:this.currentPage
      }).then(res => {
        if ( res.status === 200 && parseInt(res.data.error_code) === 0 ) {
          this.tableData = res.data.data.list
          this.pageTotal = res.data.data.page.total_number
          res.data.data.list.forEach(item => {
            const time = new Date(item.time * 1000)
            item.time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
          })
          this.label = "全部("+ this.pageTotal +')'
          this.loading = false
        }
      }).catch(function(reason){
        console.log(reason)
      })
      fetchMaterialBillList({
        type: 2
      }).then(res => {
        if ( res.status === 200 && parseInt(res.data.error_code) === 0 ) {
          this.garbageData = res.data.data.list
          this.garbagePageTotal = res.data.data.page.total_number
          res.data.data.list.forEach(item => {
            const time1 = new Date(item.time * 1000)
            item.time = time1.getFullYear() + '-' + (time1.getMonth() + 1) + '-' + time1.getDate()
          })
          this.garbageLabel = "垃圾箱("+ this.garbagePageTotal +')'
        }
      })
    },
    createMaterialBill() {
      this.$router.push({
        path: '/content/creatematerialBill'
      })
    },
    handleEditClick(obj) {
      this.$router.push({
        path: '/content/creatematerialBill/' + obj.id
      })
    },
    brandClassify() {
      this.$router.push({
        path: '/content/brandClassify'
      })
    },
    handleDelete(index, row) {
      this.$confirm("确定移至垃圾箱吗？", "移至垃圾箱提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        fetchMoveTrash(
          {id:row.id}
        ).then(res => {
          this.reload()
          this.$message({
            type: "success",
            message: "已移至垃圾箱!"
          })
        })
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
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
          fetchResetBrand(
            {id:row.id}
          ).then(res => {
            this.reload()
            this.$message({
              type: "success",
              message: "恢复成功!"
            })
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
          fetchDelBrand(
            {id:row.id}
          ).then(res => {
            this.reload()
            this.$message({
              type: "success",
              message: "删除成功!"
            })
          })
      })
        .catch(() => {
        this.$message({
        type: "info",
        message: "已取消删除"
        })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  margin: 30px;
  padding-bottom: 10px;
  .head {
    height: 50px;
    line-height: 40px;
    padding-top: 5px;
    padding-bottom: 5px;
    box-sizing: border-box;
    border:1px solid #ccc;
    .title {
      font-weight: 700;
      font-size: 16px;
      margin-left: 10px;
    }
    .right {
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
  .el-pagination {
    float: right;
    margin: 10px 20px;
  }
}
</style>

