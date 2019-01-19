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
            <el-select v-model="formInline.value" placeholder="系统分类" >
              <el-option value="系统分类"/>
              <el-option value="Android"/>
              <el-option value="IOS"/>
            </el-select>
          </el-form-item>
          <el-form-item label="版本号:">
            <el-input v-model="formInline.version" placeholder="版本号" maxlength="50"/>
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
      <el-menu-item index="/upgrade/index">全部 ( {{ allData }} )</el-menu-item>
      <el-menu-item index="/upgrade/rubbish">垃圾箱 ( {{ garbageData}} )</el-menu-item>
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
            <span>{{ scope.row.category }}</span>
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
            <span>{{ scope.row.upgrade === 1?"是":"否" }}</span>
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
            <span>{{ scope.row.release_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editHandle(scope.row)">编辑</el-button>
            <span class="line">|</span>
            <el-button
              type="text"
              size="small"
              @click="deleteHandle(scope.row)"
            >永久删除</el-button>
            <span class="line">|</span>
            <el-button
              type="text"
              size="small"
              @click="recorveHandle(scope.row)"
            >恢复</el-button>
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
  </div>
</template>

<script>
import { fetchUpList, fetchDelVersion, fetchResetversion } from '@/api/upgrade'
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
      rubbishData: [],
      garbageData: 0,
      allData:0,
      // 分页
      currentPage: 1,
      pageSize:1,
      pageTotal: 100,
      activeIndex: this.$route.path
    }
  },
  computed: {
  },
  created() {
    this.fetchUpItemList({
      type:2  //1 全部 2 垃圾箱
    })
  },
  methods: {
    fetchUpItemList(query){
      const defaultVal = {
        page: this.currentPage,
        limit: this.pageSize
      }
      const queryVal = Object.assign({},defaultVal,query);
      fetchUpList(queryVal).then((res) => {
        if(res.status ===200 && parseInt(res.data.error_code) === 0){
          const dataVal = res.data.data
          this.pageTotal = dataVal.page.total_number
          this.pageSize = dataVal.page.page_size
          this.tableData = dataVal.list
          this.allData = dataVal.info.all_count
          this.garbageData = dataVal.info.trash_count
        }
      }).catch(() => {
      })
    },
    createVer() {
      this.$router.push({
        path: '/upgrade/createVer'
      })
    },
    // 查询
    submitQuery() {
      if(this.formInline.beginTime === '' || this.formInline.endTime === ''){
        this.$message('请输入查询时间')
        return false
      }
      if(this.formInline.beginTime > this.formInline.endTime){
        this.$message("开始时间不能大于结束时间？")
        return false
      }
      this.fetchUpItemList({
        category: this.formInline.value,
        version: this.formInline.version,
        begin: this.formInline.beginTime,
        end: this.formInline.endTime,
        type: 2
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
    // 永久删除
    deleteHandle(obj) {
      this.$confirm("确定要永久删除？", "永久删除提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((attr) =>{
          if(attr === 'confirm'){
            fetchDelVersion({
              id: obj.id
            }).then((res) => {
              if(res.status === 200 && parseInt(res.data.error_code) === 0){
                this.$message({
                  type: 'success',
                  message: '永久删除成功'
                })
              }
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消移入垃圾桶'
          })
        })
    },
    // 恢复
    recorveHandle(obj) {
       this.$confirm("确认要恢复吗?恢复后将在全部中查看","恢复提示",{
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then((attr) => {
         if(attr === 'confirm'){
           fetchResetversion({
             id:obj.id
           }).then((res) => {
             if(res.status == 200 && parseInt(res.data.error_code) === 0){
               this.$message({
                 type:'success',
                 message:'恢复成功'
               })
             }
           })
         }
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消恢复'
         });
       })
    },
    createVer() {
      this.$router.push({
        path: '/upgrade/editVer'
      })
    },
    editHandle(obj){
      this.$router.push({
        path: '/upgrade/editVer/'+obj.id
      })
    }
  }
}
</script>
