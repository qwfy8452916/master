<template>
    <div class="OrganDivide">
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
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in organNameList"
                        :key="item.index"
                        :label="item.orgName"
                        :value="item.id"
                    ></el-option>
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
        <el-table :data="OrganDivideDataList" border stripe style="width:100%;" >
            <el-table-column prop="orgName" label="组织" align=center></el-table-column>
            <el-table-column prop="salesAmount" label="销售总额(元)" align=center></el-table-column>
            <el-table-column prop="revenueAmount" label="分成总额(元)" align=center></el-table-column>
            <el-table-column label="操作" align=center fixed="right">
               <template slot-scope="scope">
                    <el-button type="text" size="small" @click="lookdetail(scope.row.id,scope.row.orgId)">查看详情</el-button>
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
    name: 'LonganOrganDivide',
    components:{
        resetButton
    },
    data(){
        return{
            authzData: '',
            oprId:'',
            OrganDivideDataList: [],
            query:{
              organId: '',
              inquireTime:[],
            },
            organNameList: [],
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            loadingH:false,
        }
    },
    created(){

         (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})

    },

    mounted(){
        this.oprId = localStorage.oprId;
        this.query.organId=this.$route.query.organId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this.query[item] = this.$store.state.searchList[item]
            }
        }
        this.getOrgan();
        this.OrganDivide();
    },
    methods: {
        resetFunc(){
            this.query.organId = ''
            this.query.inquireTime = []
            this.OrganDivide();
        },
          //查看详情
         lookdetail(id,orgId){
            let organId=orgId;
            this.$router.push({name:'LonganClassifyDivide',query:{id,organId}})
         },

         //重置
         resetbtn(query){
            this.$refs[query].resetFields();
         },


         //组织分成
        OrganDivide(){
            if(this.query.inquireTime==null){
              this.query.inquireTime=[];
            }
            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                orgAs: 2,
                orgId:this.query.organId,
                oprId:this.oprId,
                startDate:this.query.inquireTime[0],
                endDate:this.query.inquireTime[1],
            };
            this.$api.getDivide({params}).then(response=>{
                if(response.data.code==0){
                    this.OrganDivideDataList = response.data.data.records;
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


        //获取组织
        getOrgan(hName){
          let that=this;
          let params={
            orgName: hName,
            pageNo: 1,
            pageSize: 50
          }
          this.$api.getOrganization({params}).then(response=>{
             if(response.data.code==0){
                that.organNameList=response.data.data.records
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
            this.OrganDivide();
            this.$store.commit('setSearchList',{
                organId: this.query.organId,
                inquireTime:this.query.inquireTime
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.OrganDivide();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.OrganDivide();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.OrganDivide();
        }
    }
}
</script>

<style lang="less" scoped>
.OrganDivide{
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

