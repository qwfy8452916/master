<template>
  <div class="container">
    <div class="module-header">
      <div class="top">
        <span class="caption">文章审核</span>
      </div>
      <div class="middle">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="文章分类:">
            <el-select v-model="formInline.value" placeholder="文章分类" >
              <el-option
                v-for="item in formInline.articleClass "
                :key="item.value"
                :value="item.value"
                :label="item.label"/>
            </el-select>
          </el-form-item>
          <el-form-item label="标题:">
            <el-input v-model="formInline.title" placeholder="标题"/>
          </el-form-item>
          <el-form-item label="创建者:">
            <el-input v-model="formInline.creater" placeholder="创建者"/>
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
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/examine/article">待审核（<span> {{ waitAudit }} </span>）</el-menu-item>
      <el-menu-item index="/examine/examinePass">审核通过（<span> {{ auditPass }} </span>）</el-menu-item>
      <el-menu-item index="/examine/examineNo">审核未通过（<span> {{ auditNoPass }} </span>）</el-menu-item>
    </el-menu>
    <div class="app-table-detail">
      <el-table
        :data="tableData3"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分类"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.classify }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建者"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.creater }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标签"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.label }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="阅读数"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.readerNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="评论数"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.discussNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收藏数"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.collectNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="喜欢数"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.loveNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="提交时间"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.commitDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="auditPassHandle(scope.row)">查看驳回理由</el-button>
            <span class="line">|</span>
            <router-link :to="{ name:'CheckArticle', query:{ articleId:scope.row.id } }">
              <el-button type="text" size="small">重新审核</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-row type="flex" justify="end" style="padding: 20px 0;">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            :total="pageTotal"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </el-row>
      </div>
    </div>
    <!--dialog-->
    <div>
      <el-dialog
        :visible.sync="passDialog"
        title="审核驳回理由"
        width="30%">
        <span>{{ rejectResult }}</span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import { fetchExaminePos, fetchExamineList } from '@/api/examine'
export default {
  data() {
    return {
      resultofaudit: '',
      // 分页
      pageTotal: 500,
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      passDialog: false,
      formInline: {
        title: '最喜爱装修风格统计',
        articleClass: [
          {
            value: '0',
            label: '美食心得'
          }
        ],
        creater: '',
        value: '',
        beginTime: '',
        endTime: ''
      },
      tableData: [],
      // 待审核
      tableData1: [],
      // 审核通过
      tableData2: [],
      // 审核不通过、
      tableData3: [],
      // 点击审核的当前项
      currentIndex: '',
      activeIndex: this.$route.path,
      // 驳回理由
      rejectResult: ''
    }
  },
  computed: {
    waitAudit() {
      const allAudits = this.tableData.filter((item) => {
        return item.status === 1
      })
      return allAudits.length
    },
    auditPass() {
      const allPass = this.tableData.filter((item) => {
        return item.status === 2
      })
      return allPass.length
    },
    auditNoPass() {
      const allPass = this.tableData.filter((item) => {
        return item.status === 3
      })
      return allPass.length
    }
  },
  created() {
    this.fetchData()
    this.fetchExaminePos()
  },
  methods: {
    fetchData() {
      fetchExamineList({
        page: this.currentPage,
        limit: this.pageSize
      }).then((res) => {
        this.tableData = res.data.data
        this.tableData3 = this.tableData.filter((item) => {
          return item.status === 3
        })
        this.pageTotal = res.data.total
      })
    },
    // 文章类别
    fetchExaminePos() {
      fetchExaminePos().then((res) => {
        res.data.data.forEach((item) => {
          this.formInline.articleClass.push(item)
        })
      })
    },
    onSubmit() {
    },
    // 驳回理由
    auditPassHandle(data) {
      this.passDialog = true
      this.rejectResult = data.result
    },
    /*  // 审核通过
      auditPassHandle(data) {
        this.passDialog = true;
        this.currentIndex = data.id
      },
      passDialogHandle() {
        this.passDialog = false
        let current = this.tableData.filter((item) => {
          return item.id == this.currentIndex
        })
        current[0].status = 2
        current[0].result = ''
        this.currentIndex = ''
      },
      // 审核不通过
      auditNoPassHandle(data) {
        this.currentIndex = data.id
        this.dialogVisible = true
      },
      noPassHandle() {
        this.dialogVisible = false
        let current = this.tableData.filter((item) => {
          return item.id == this.currentIndex
        })
        current[0].result = this.resultofaudit
        current[0].status = 3
        this.resultofaudit = ''
        this.currentIndex = ''
      },*/
    // 每页显示多少条数
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.fetchData()
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .container{
    padding: 30px;
  }
  .green{
    color: green;
  }
  .red{
    color: red;
  }
</style>
