<template>
    <div class="CarryDetail">
        <el-form :inline="true" :model="query" ref="query" align=left class="searchform">
            <el-form-item label="组织" prop="organId">
                <el-select
                    v-model="query.organId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getOrgan()"
                    >
                    <el-option v-for="item in organNameList"
                        :key="item.index"
                        :label="item.orgName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="handlestatus">
                 <el-select v-model="query.handlestatus">
                     <el-option label="全部" value=""></el-option>
                     <el-option label="待处理" value="1"></el-option>
                     <el-option label="已转账" value="2"></el-option>
                     <el-option label="转账失败" value="3"></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="选择时间" prop="inquireTime">
                <el-date-picker
                    v-model="query.inquireTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="请选择日期"
                    end-placeholder="请选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
                <!-- <el-button class="resetbtn" type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button> -->
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="CarryDetailDataList" border stripe style="width:100%;" >
            <el-table-column prop="orgName" label="组织" align=center></el-table-column>
            <el-table-column prop="withdrawalAmount" label="提现金额" align=center></el-table-column>
            <el-table-column prop="withdrawalName" label="申请人" align=center></el-table-column>
            <el-table-column prop="withdrawalTime" label="申请时间" align=center></el-table-column>
            <el-table-column prop="status" label="状态" align=center>
               <template slot-scope="scope">
                  <span v-if="scope.row.status=='1'">待处理</span>
                  <span v-if="scope.row.status=='2'">已转账</span>
                  <span v-if="scope.row.status=='3'">转账失败</span>
               </template>
            </el-table-column>
            <el-table-column prop="dealer" label="处理人" align=center></el-table-column>
            <el-table-column prop="dealTime" label="处理时间" align=center></el-table-column>
            <el-table-column label="操作" align=center fixed="right">
               <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_FIN_WITHDRAW_DEAL'] && scope.row.status=='1'" type="text" size="small" @click="handle(scope.row.id)">处理</el-button>
                    <el-button v-else type="text" size="small" @click="lookdetail(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="10"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'LonganCarryDetail',
    components:{
        resetButton
    },
    data(){
        return{
            authzData: '',
            oprId:'',
            CarryDetailDataList: [],
            query:{
              organId: '',
              handlestatus:'',
              inquireTime:[],
              currentPage:'',
            },
            organNameList: [],
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            orgId:'',
            alljudge:'',
            loadingH: false
        }
    },
    created(){
      this.oprId = localStorage.oprId;
      this.query.organId = this.$route.query.orgId;
      if(!this.query.organId){
         this.query.organId=''
      }
      if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.currentPage=this.$route.query.query.currentPage
        }
      this.getOrgan();
      this.getnowdate();
    },

    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})

        if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.query=this.$route.query.query;
            this.pageNum=this.$route.query.query.currentPage
        }
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this.query[item] = this.$store.state.searchList[item]
            }
        }
        this.CarryDetail();
    },
    methods: {
        resetFunc(){
            this.query.organId = ''
            this.query.handlestatus = ''
            this.query.inquireTime = []
            this.CarryDetail();
        },
         //查看详情
         lookdetail(id){
            this.query.currentPage=this.currentPage
            let query=this.query
            this.$router.push({name:'LongancheckCarryDetail',query:{id,query}})
         },

         //处理
         handle(id){
            this.query.currentPage=this.currentPage
            let query=this.query
            this.$router.push({name:'LonganAccountHandle',query:{id,query}})
         },

         //重置
         resetbtn(query){
            this.$refs[query].resetFields();
            this.query.inquireTime=[];
         },


         //提现明细
        CarryDetail(){
           if(this.query.inquireTime==null){
               this.query.inquireTime=[];
           }

          //  if(this.query.organId=='' || this.query.organId==undefined){
          //     this.alljudge=0
          //  }else{
          //     this.alljudge=1
          //  }

            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                all:1,
                orgId:this.query.organId,
                oprId:this.oprId,
                status:this.query.handlestatus,
                startDate:this.query.inquireTime[0],
                endDate:this.query.inquireTime[1]
            };
            this.$api.withdrawMoneylist({params}).then(response=>{
                if(response.data.code==0){
                    this.CarryDetailDataList = response.data.data.records;
                    this.pageTotal = response.data.data.total

                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })

        },

        //获取当月日期
        getnowdate(){
          let nowdate=new Date();
          let enddate=nowdate.getFullYear()+'-'+parseInt(nowdate.getMonth()+1)+'-'+nowdate.getDate()
          let startdate=nowdate.getFullYear()+'-'+parseInt(nowdate.getMonth()+1)+'-'+'1'
          this.query.inquireTime[0]=startdate
          this.query.inquireTime[1]=enddate
        },

        //获取组织
        getOrgan(hName){
          let that=this;
          let params={
            orgName: hName,
            pageNo: 1,
            pageSize: 50
          };
          this.$api.getOrganization({params}).then(response=>{
             if(response.data.code==0){
                that.organNameList=response.data.data.records
                const allorgan={
                      id:'',
                      orgName:'全部',
                    }
                     this.organNameList.unshift(allorgan)
             }else{
               this.$alert(response.data.msg,"警告",{
                 confirmButtonText:"确定"
               })
             }
          }).catch(err=>{
             this.$alert(err,"警告",{
                confirmButtonText:"确定"
             })
          })
        },

        remoteHotel(val){
            this.getOrgan(val);
        },

        //查询
        inquire(){
            this.pageNum = 1;
            this.currentPage=1;
            this.CarryDetail();
            this.$store.commit('setSearchList',{
                organId: this.query.organId,
                handlestatus: this.query.handlestatus,
                inquireTime: this.query.inquireTime
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.CarryDetail();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.CarryDetail();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.CarryDetail();
        }
    }
}
</script>

<style lang="less" scoped>
.CarryDetail{
    .Revenue-font{
        text-align: left;
        margin-bottom: 20px;
    }
    .pagination{
        margin-top: 20px;
    }
    .cell a{
        display: block;
        margin-bottom: 10px;
    }
    .resetbtn.el-button--primary{
        background-color: #71a8e0;
        border-color: #71a8e0;
    }
}
</style>

