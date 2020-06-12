<template>
    <div class="getcashlist">
        <el-form :model="formdata" ref="formdata" :inline="true" align=left class="searchform">
            <el-form-item label="状态" prop="status">
                <el-select v-model="formdata.status">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待处理" value="1"></el-option>
                    <el-option label="已转账" value="2"></el-option>
                    <el-option label="转账失败" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请时间" prop="inquireTime">
                <el-date-picker
                    v-model="formdata.inquireTime"
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
                <!-- <el-button type="primary" @click="reset('formdata')">重&nbsp;&nbsp;置</el-button> -->
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="WithdrawalsList" border stripe style="width:100%;" >
            <el-table-column prop="withdrawalAmount" label="提现金额（元）" align=center></el-table-column>
            <el-table-column prop="withdrawalName" label="申请人" align=center></el-table-column>
            <el-table-column prop="withdrawalTime" label="申请时间" align=center></el-table-column>
            <el-table-column prop="status" label="状态" align=center>
               <template slot-scope="scope">
                   <span v-if="scope.row.status=='1'">待处理</span>
                   <span v-if="scope.row.status=='2'">已转账</span>
                   <span v-if="scope.row.status=='3'">转账失败</span>
               </template>
            </el-table-column>
            <el-table-column label="操作" align=center fixed="right">
               <template slot-scope="scope">
                    <el-button v-if="authzlist['F:BM_FIN_GETCASH_CHECKDETAIL']" type="text" size="small" @click="lookdetail(scope.row.id)">查看详情</el-button>
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
    name: 'Merchantgetcashdetail',
    components:{
        resetButton
    },
    data(){
        return{
            authzlist: {}, //权限数据
            formdata:{
              inquireTime: [],
              status:'',
            },
            WithdrawalsList: [],

            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            oprId: ''
        }
    },
    created(){
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        // this.oprId = this.$route.params.orgId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getcashlist();

    },
    methods: {
        resetFunc(){
            this.formdata.inquireTime = []
            this.formdata.status = ''
            this.getcashlist();
        },
         //查看详情
         lookdetail(id){
            this.$router.push({name:'Merchantcheckgetcashdetail',query:{id}})
         },


        //提现明细
        getcashlist(){
          let that=this;
            if(this.formdata.inquireTime == null){
                this.formdata.inquireTime = [];
            }
            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                orgAs: 5,
                all:0,
                status:this.formdata.status,
                startDate:this.formdata.inquireTime[0],
                endDate:this.formdata.inquireTime[1]
            };
            this.$api.withdrawMoneylist({params}).then(response=>{
                if(response.data.code==0){
                    that.WithdrawalsList = response.data.data.records;
                    that.pageTotal = response.data.data.total
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




        //查询
        inquire(){
            this.pageNum = 1;
            this.getcashlist();
            this.$store.commit('setSearchList',{
                status: this.formdata.status,
                inquireTime:this.formdata.inquireTime
            })
        },

        // 重置
        reset(formName){
          this.$refs[formName].resetFields();
          this.formdata.inquireTime = [];
        },

        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.getcashlist();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.getcashlist();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.getcashlist();
        }
    }
}
</script>

<style lang="less" scoped>
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
    .export{
        float: left;
        margin-bottom: 10px;
    }
</style>

