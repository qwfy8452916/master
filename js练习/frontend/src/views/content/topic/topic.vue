<template>
  <div style="padding:30px;">
    <!--<el-alert :closable="false" title="话题管理" />-->
    <div class="module-header">
      <div class="top"><span class="caption">话题管理</span>
        <div class="r mr-10">
          <el-button type="success" @click="createTopic">新建话题</el-button>
        </div>
      </div>
      <div class="middle">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="标题:">
            <el-input v-model="formInline.title" maxlength="160" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="创建者:">
            <el-autocomplete
              class="inline-input"
              v-model="formInline.creator"
              placeholder="创建者"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              @select="handleSelect">
            </el-autocomplete>
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
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table-middle">
      <el-menu :default-active="activeIndex" mode="horizontal" router>
        <el-menu-item index="/content/topic" >全部（<span> {{ this.available_number }} </span>）</el-menu-item>
        <el-menu-item index="/content/topic/top">置顶（<span> {{ this.top_number }} </span>）</el-menu-item>
        <el-menu-item index="/content/topic/grabage">垃圾箱（<span> {{ this.garbage_number }} </span>）</el-menu-item>
      </el-menu>
    </div>
    <div class="table-content">
      <el-table
        :data="tableData"
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
          label="创建者"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="围观数"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.onlookers }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="评论数"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.comment_count }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="喜欢数"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.likes }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.publish_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="editHandle(scope.row)"
            >编辑</el-button>
            <span class="line">|</span>
            <el-button
              type="text"
              size="small"
              @click="removeHandle(scope.row)"
            >移至垃圾箱</el-button>
            <span class="line">|</span>
            <el-button
              type="text"
              size="small"
              @click="isTopicHandle(scope.row)"
            >{{ scope.row.top ==1 ?'置顶':'取消置顶' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-row type="flex" justify="end" style="padding: 20px 0;">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          :total="pageTotal"
          layout="total,  prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </el-row>
    </div>
  </div>
</template>

<script>
import { fetchTopicList, fetchTopTopic, fetchSwitchTopic, fetchStatistic, fetchId } from '@/api/topic'
export default {
  name:'topic',
  data() {
    return {
      formInline: {
        title: '',
        creator: '',
        creator_id: '',
        beginTime: '',
        endTime: ''
      },
      restaurants: [],
      tableData: [],
      currentPage: 0 ,
      pageTotal: 0,
      pageSize: 0,
      available_number: 0,
      top_number: 0,
      garbage_number: 0,
      timer:null,
      activeIndex: this.$route.path
    }
  },
  created(){
    this.fetchListHandle()
    this.fetchStatistic()
  },
  methods:{
    querySearch(queryString, cb){
      if(queryString){
        fetchId({user_name: this.formInline.creator}).then((res) => {
          if(res.status === 200 && parseInt(res.data.error_code) ===0){
            this.restaurants = []
            this.restaurants = res.data.data
          }
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            cb(this.restaurants);
          }, 1000 * Math.random())
        })
      }
    },
    handleSelect(item){
      this.formInline.creator = item.value
      this.formInline.creator_id = item.id
      this.fetchListHandle({
        creator_id: item.id
      })
    },
    // 查询
    search() {
      if(this.formInline.beginTime && this.formInline.endTime){
        if (this.formInline.beginTime > this.formInline.endTime) {
          this.$message({
            type: 'error',
            message: '开始时间不能大于结束时间'
          })
          return false
        }
      }else{
        this.$message({
          type: 'error',
          message: '请输入开始和结束时间'
        })
        return false
      }
        const star = new Date(this.formInline.beginTime)
        const end = new Date(this.formInline.endTime)
        this.fetchListHandle({
          title: this.formInline.title,
          creator_id: this.formInline.creator_id,
          start_time: star.getFullYear() + '-' + + (star.getMonth() + 1) + '-' + star.getDate(),
          end_time: end.getFullYear() + '-' + + (end.getMonth() + 1) + '-' + end.getDate()
        })

    },

    fetchStatistic(){
      fetchStatistic().then((res) => {
        if(res.status === 200 && parseInt(res.data.error_code) === 0){
          this.available_number = res.data.data.available_number
          this.top_number = res.data.data.top_number
          this.garbage_number = res.data.data.garbage_number
        }
      })
    },

  fetchListHandle(query) {
      const defaultVal = {
        page_current: this.currentPage,
        is_del: 1
      }
      const queryVal = Object.assign({},defaultVal,query);
      fetchTopicList(queryVal).then((res) => {
        if(res.status === 200 && parseInt(res.data.error_code) === 0){
          this.pageTotal = res.data.data.page.total_number
          this.pageSize = res.data.data.page.page_size
          this.currentPage = res.data.data.page.page_current
          this.tableData = []
          res.data.data.list.forEach((item) => {
            const time = new Date(item.publish_time * 1000)
            item.publish_time = time.getFullYear()+ '-' + (time.getMonth()+1) + '-' + time.getDate()
          })
          this.tableData= res.data.data.list
        }
      })
    },
    // 新建话题
    createTopic() {
      this.$router.push({
        path: '/content/topic/editTopic'
      })
    },
    // 编辑话题
    editHandle(obj) {
      this.$router.push({
        path: '/content/topic/editTopic/'+obj.id
      })
    },
    fetchSwitchTopic(obj){
      fetchSwitchTopic({
        id: obj.id,
        switch_type: 'off'
      })
        .then((res) => {
          if(res.status === 200 && parseInt(res.data.error_code) === 0){
            this.$message({
              type: 'success',
              message: '移入成功'
            })
            console.log('移入')
            location.reload()
          }
      })
    },
    // 移入垃圾箱
    removeHandle(obj){
      this.$confirm('确定要移入垃圾箱', '移入垃圾箱', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          this.fetchSwitchTopic(obj)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
    },

    // 置顶/取消
    isTopicHandle(obj){
      fetchTopTopic({
        id:obj.id,
        top_type: parseInt(obj.top) === 1 ? "on" : "off"
      }).then((response) => {
        if(response.status === 200 && parseInt(response.data.error_code) === 0){
          location.reload()
        }
      })
    },
    // 每页显示多少条数
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.fetchListHandle()
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchListHandle()
    }
  }
}
</script>
