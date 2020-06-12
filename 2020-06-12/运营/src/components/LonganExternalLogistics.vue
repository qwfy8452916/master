<template>
   <div class="ExternalLogistics">
       <el-form :inline="true" align="left">
           <el-form-item label="物流名称">
               <el-input v-model="lgcName"></el-input>
           </el-form-item>
           <el-form-item>
               <el-button type="primary" @click="inquire">查询</el-button>
           </el-form-item>
           <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
           </el-form-item>
       </el-form>
       <el-table :data="logisticsData" border stripe>
           <el-table-column prop="lgcName" label="物流名称" align="center"></el-table-column>
           <el-table-column prop="startPrice" label="默认计程运费设置" align="center"></el-table-column>
           <el-table-column prop="lgcUrlPrefix" label="接口路径前缀" align="center"></el-table-column>
           <el-table-column prop="lgcPlatformKey" label="安全ID" align="center"></el-table-column>
           <el-table-column prop="lgcPlatformSecret" label="安全密码" align="center"></el-table-column>
           <el-table-column prop="adapterBean" label="实现类" align="center"></el-table-column>
           <el-table-column prop="callbackUrlPrefix" label="回调路径前缀" align="center"></el-table-column>
           <el-table-column prop="liquidatedDamages" label="接单违约金" align="center"></el-table-column>
           <el-table-column prop="" label="操作" align="center">
               <template slot-scope="scope">
                  <el-button type="text" @click="detail(scope.row.id)">详情</el-button>
                  <el-button type="text" @click="edit(scope.row.id)">修改</el-button>
               </template>
           </el-table-column>
       </el-table>
       <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
       </div>
   </div>
</template>
<script>
  import resetButton from './resetButton'
  import LonganPagination from '@/components/LonganPagination'
  export default {
    name:"LonganExternalLogistics",
    components:{
      resetButton,
      LonganPagination
    },
    data(){
      return {
        logisticsData:[{name:"测试"}],
        lgcName:'',
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1,
      }
    },
    mounted(){
      if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
      this.getExternalLogistics();
    },
    methods:{

      resetFunc(){
            this.lgcName=''
            this.getExternalLogistics();
        },



        //获取列表数据
        getExternalLogistics(){
          let that=this;
          let params={
             lgcName:this.lgcName,
             pageSize:this.pageSize,
             pageNo:this.pageNum
          }
          this.$api.getlogistics({params}).then(response=>{
             let result=response.data;
             if(result.code==0){
                that.logisticsData=result.data.records
                that.pageTotal=result.data.total
             }else{
               that.$message.error(result.msg)
             }
          }).catch(err=>{
            that.$alert(err,"警告",{
              confirmButtonText:"确定"
            })
          })
        },

        //修改
        edit(id){
          this.$router.push({name:"LonganExternalLogisticsEdit",query:{id}})
        },

        //详情
        detail(id){
          this.$router.push({name:"LonganExternalLogisticsDetail",query:{id}})
        },

        //查询
        inquire(){
            this.pageNum = 1;
            this.getExternalLogistics();
            this.$store.commit('setSearchList',{
                lgcName:this.lgcName,
            })
        },

        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.getExternalLogistics();
        },

    }
  }
</script>

<style lang="less" scope>
  .ExternalLogistics{
     .pagination{
       margin-top: 20px;
     }
  }

</style>
