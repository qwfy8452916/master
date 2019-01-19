<template>
  <div class="article">
    <div class="title">
      <span>文章管理</span>
      <div class="right">
        <el-button type="success" @click="$router.push('/content/article/create')">新建文章</el-button>
        <el-button type="primary" @click="$router.push('/content/article/tag')">标签管理</el-button>
      </div>
    </div>
    <div class="middle">
      <el-form :inline="true" :model="formInline" :rules="rules"  class="demo-form-inline">
        <el-form-item>
          <el-select v-model="formInline.category" placeholder="文章分类">
            <el-option label="美家案例" :value= 1 ></el-option>
            <el-option label="装修心得" :value= 2 ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="formInline.title"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            class="inline-input"
            @select="handleSelect"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建者:">
          <input type="text" v-model="formInline.author" style="display:none">
          <el-autocomplete
            v-model="input"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            class="inline-input"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="时间:">
          <el-date-picker
            v-model="formInline.begin"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="formInline.end"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="结束时间">
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
          <el-menu-item index="/content/article/article">全部</el-menu-item>
          <el-menu-item index="/content/article/backstage">后台发布</el-menu-item>
          <el-menu-item index="/content/article/usersub">用户投稿</el-menu-item>
          <el-menu-item index="/content/article/top">置顶</el-menu-item>
          <el-menu-item index="/content/article/garbage">垃圾箱</el-menu-item>
        </el-menu>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column align="center" type="index" label="排序ID" width="80">
          </el-table-column>
          <el-table-column align="center" prop="title" label="标题" width="220">
          </el-table-column>
          <el-table-column align="center" prop="category" label="分类" width="150">
            <template slot-scope="scope">
              {{scope.row.category == 1 ? '美家案例' :'装修心得'}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="author" label="创建者" width="120">
          </el-table-column>
          <el-table-column align="center" prop="tags" label="标签" width="180">
          </el-table-column>
          <el-table-column align="center" prop="views" label="阅读数" width="120">
          </el-table-column>
          <el-table-column align="center" prop="comment_count" label="评论数" width="120">
          </el-table-column>
          <el-table-column align="center" prop="likes" label="喜欢数" width="120">
          </el-table-column>
          <el-table-column align="center" prop="collection_count" label="收藏数" width="120">
          </el-table-column>
          <el-table-column align="center" prop="time" label="发布时间" width="180">
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
                @click="handleDelete(scope.$index, scope.row)">移至垃圾箱</el-button>
              |<el-button
                type="text"
                size="small"
                @click="handleChange(scope.$index, scope.row)">取消置顶</el-button>
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
import {getData,moveIn,topUp,searchInfo} from '@/api/article'
import { filterSpecialSymbal, filterSpaceSymbal } from '@/utils/index'

export default {
  data() {
    return {
      all: '',
      back: '',
      user: '',
      top: '',
      garbage: '',
      formInline: {
        title: '',
        author: '',
        begin: '',
        end: '',
        category: ''
      },
      tableData: [],
      page: {},
      currentPage4: 1,
      total: 400,
      pageSize: 10,
      activeIndex: this.$route.path,
      input: '',
      author: [],
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
    this.getArticle({page:1})
  },
  methods: {
    onSubmit() {
      this.getArticle(this.formInline)
    },
    handleEdit(index, row) {
      this.$router.push(`/content/article/create/${row.id}`)
    },
    handleChange(index, row) {
      topUp({id:row.id}).then(res => {
        let current = this.page.page_current
        let total = this.page.total_number
        let flag = parseInt(total/10) + 1
        if(total % 10 == 1 && flag == current){
          current--
        }
        this.getArticle({page:current})
      })
    },
    handleDelete(index, row) {
      this.$confirm('确定移至垃圾箱吗？', '移至垃圾箱提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          moveIn({id:row.id}).then(res => {
            let current = this.page.page_current
            let total = this.page.total_number
            let flag = parseInt(total/10) + 1
            if(total % 10 == 1 && flag == current){
              current--
            }
            this.getArticle({page:current})
            this.$message({
              type: 'success',
              message: '删除成功!'
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
      let params = {page: val}
      this.getArticle(params)
    },
    querySearch(queryString, cb) {
      this.searchU(queryString)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(this.author)
      }, 3000 * Math.random())
    },
    handleSelect(item) {
      this.formInline.author = item.id
    },
    searchU(query){
      searchInfo({user_name: query}).then(res => {
        let data = res.data.data
        this.author = data
      })
    },
    getArticle(query){
      query.status = 3
      getData(query).then(res => {
        this.tableData = res.data.data.list
        this.page = res.data.data.page
      })
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
}
</style>