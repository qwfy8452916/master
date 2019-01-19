<template>
  <div class="feedback">
    <div class="module-header">
      <div class="top"><span class="caption">用户反馈</span></div>
      <div class="middle">
        <div class="inline-block pl-5">
          反馈时间：
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
          <el-button type="primary" class="ml-15" @click="search">查询</el-button>
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
        label="序号"
        header-align="center"
      />
      <el-table-column
        prop="id"
        label="UID"
        header-align="center"
      />
      <el-table-column
        prop="content"
        label="反馈内容"
        header-align="center"
      />
      <el-table-column
        prop="tel"
        label="手机号"
        header-align="center"
      />
      <el-table-column
        prop="time"
        label="反馈时间"
        header-align="center"
      />
      <el-table-column
        label="操作"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDetailClick(scope.row)">查看详情</el-button>
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
    <el-dialog :visible.sync="dialogFormVisible" title="反馈详情" class="feedback-detail">
      <el-row>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="22">UID：{{ feedbackDetail.uid }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="22">反馈内容：{{ feedbackDetail.content }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="22">图片：</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="22">
          <img v-for="item in feedbackDetail.imgs" :src="item" alt="">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="22">手机号：{{ feedbackDetail.phone }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="22">反馈时间：{{ feedbackDetail.time }}</el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { fetchFeedbackList } from '@/api/user'
export default {
  name: 'Feedback',
  data() {
    return {
      tableData: [],
      feedbackDetail: {
        uid: 2222,
        content: '这里是反馈内容',
        imgs: ['https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'],
        phone: '13402515810',
        time: '208-9-6'
      },
      value: '',
      start_time: '',
      end_time: '',
      dialogFormVisible: false,
      totals: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    this.fetchFeedbackList()
  },
  methods: {
    search() {
      if (this.start_time > this.end_time) {
        alert('开始时间不能大于结束时间')
      }
      this.fetchFeedbackList({
        start_time: this.start_time,
        end_time: this.end_time
      })
    },
    fetchFeedbackList(query) {
      const defaultQ = {
        page: this.currentPage
      }
      const queryObj = Object.assign({}, defaultQ, query || {})
      fetchFeedbackList(queryObj).then(res => {
        this.totals = res.data.data.page.total
        this.tableData = res.data.data.list
      })
    },
    // 修改每页显示多少条时触发
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.fetchFeedbackList()
    },
    // 修改当前页码时触发
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchFeedbackList()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .feedback{
    margin:30px;
    .el-row{
      line-height: 2.3;
    }
    .feedback-detail{
      img{
        width: 150px;
        margin-right: 15px;
      }
    }
  }
</style>
