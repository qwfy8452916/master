<template>
  <div class="article">
    <div class="title">
      <span>经验管理</span>
      <div class="right">
        <el-button type="success" @click="$router.push('/content/experience/edit')">新增经验</el-button>
        <el-button type="primary" @click="$router.push('/content/experience/cate')">经验分类管理</el-button>
      </div>
    </div>
    <div class="middle">
      <el-form :inline="true" :model="formInline" :rules="rules" class="demo-form-inline">
        <el-form-item label="标题:" prop="title">
          <el-autocomplete
            v-model="formInline.title"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            class="inline-input"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="分类:">
          <el-select v-model="formInline.cate_id" placeholder="文章分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.cate_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间:">
          <el-date-picker
            v-model="formInline.start_time"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            placeholder="开始时间"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="formInline.end_time"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            placeholder="结束时间"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom">
      <div class="nav">
        <el-menu :default-active="activeIndex" router class="el-menu-demo" mode="horizontal">
          <el-menu-item index="/content/experience">全部 ({{this.num.available_number}})</el-menu-item>
          <el-menu-item index="/content/experience/garbage">垃圾箱 ({{this.num.garbage_number}})</el-menu-item>
        </el-menu>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column align="center" type="index" label="经验ID" width="80">
          </el-table-column>
          <el-table-column align="center" prop="title" label="经验标题" width="400">
          </el-table-column>
          <el-table-column align="center" prop="cate_name" label="分类" width="300">
          </el-table-column>
          <el-table-column align="center" prop="publish_time" label="发布时间" :formatter="formatDate" width="400">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              |<el-button
                type="text"
                size="small"
                @click="handleDelete(scope.$index, scope.row)">永久删除</el-button>
              |<el-button
                type="text"
                size="small"
                @click="handleChange(scope.$index, scope.row)">恢复</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page.page_current"
          :page-size="page.page_size"
          :total="page.total_number"
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getExp,Delete,garbage,cateGet,getNum} from '@/api/experience'
import { filterSpecialSymbal, filterSpaceSymbal } from '@/utils/index'

export default {
  data() {
    return {
      formInline: {
        title: '',
        start_time: '',
        end_time: '',
        region: '',
        is_del: 2,
        page_current: 1 
      },
      options: [],
      tableData: [],
      page: [],
      activeIndex: this.$route.path,
      restaurants: [],
      num: [],
      dialogInputVisible: false,
      title: '',
      content: '',
      rules: {
        title: [
          { max: 80, message:'标题中仅支持输入80位', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'formInline.title'(val) {
      this.$nextTick(() => {
        this.formInline.title = filterSpecialSymbal(val)
      })
    },
  },
  created() {
    cateGet().then(res => {
      this.options = res.data.data
    })
    getExp(this.formInline).then(res => {
      console.log(res.data)
      this.tableData = res.data.data.list
      this.page = res.data.data.page
    })
    getNum().then(res => {
      this.num = res.data.data
    })
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    onSubmit() {
      getExp(this.formInline).then(res => {
        console.log(res)
        this.tableData = res.data.data.list
        this.page = res.data.data.page
      })
    },
    handleEdit(index, row) {
      this.$router.push(`/content/experience/edit/${row.id}`)
    },
    handleChange(index, row) {
      this.$confirm('确认要恢复吗？恢复后将在全部中查看。', '恢复提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          garbage({
            id: row.id,
            switch_type: 'on'
          }).then(res => {
            let current = this.page.page_current
            let total = this.page.total_number
            let flag = parseInt(total/10) + 1
            if(total % 10 == 1 && flag == current){
              current--
            }
            getExp({
              is_del: 2,
              page_current: current
            }).then(res => {
              this.tableData = res.data.data.list
              this.page = res.data.data.page
              this.$message({
                type: 'success',
                message: '恢复成功!'
              })
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleDelete(index, row) {
      this.$confirm('确认永久删除么？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Delete({
          id: row.id,
        }).then(res => {
          let current = this.page.page_current
          let total = this.page.total_number
          let flag = parseInt(total/10) + 1
          if(total % 10 == 1 && flag == current){
            current--
          }
          getExp({
            is_del: 2,
            page_current: current
          }).then(res => {
            this.tableData = res.data.data.list
            this.page = res.data.data.page
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange(val) {
      this.formInline.page_current = val
      getExp(this.formInline).then(res => {
        this.tableData = res.data.data.list
        this.page = res.data.data.page
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll() {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' }
      ]
    },
    handleSelect(item) {
      console.log(item)
    },
    formatDate(row, column) {
      let date = new Date(parseInt(row.publish_time) * 1000)
      let Y = date.getFullYear() + '-'
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style lang="less">
.article {
  height: 100%;
  margin: 30px;
  .title {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    vertical-align: middle;
    border: 1px solid rgba(204, 204, 204, 1);
    >span {
      font-weight: 900;
      font-size: 16px;
    }
    .right {
      float: right;
      margin-right: 10px;
    }
  }
  .middle {
    border: 1px solid rgba(204, 204, 204, 1);
    border-top: none;
    padding-top: 15px;
    padding-left: 10px;
    .el-form-item {
      margin-bottom: 15px;
    }
  }
  .bottom {
    padding: 10px;
    .el-pagination {
      float: right;
      margin-top: 10px;
    }
  }
  .text .el-dialog__body{
    height: 500px !important;
    overflow: auto !important;
  }
}
</style>

