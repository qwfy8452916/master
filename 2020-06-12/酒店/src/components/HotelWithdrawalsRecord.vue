<template>
    <div class="HotelWithdrawalsRecord">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="选择时间">
                <el-date-picker
                    v-model="inquireTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="请选择日期"
                    end-placeholder="请选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待审核" value="3"></el-option>
                    <el-option label="已完成" value="1"></el-option>
                    <el-option label="转账失败" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="HotelWithdrawalsRecordDataList" border stripe style="width:100%;" >
            <el-table-column prop="hotelWithdrawalTime" label="申请时间" align=center></el-table-column>
            <el-table-column prop="hotelWithdrawalAmount" label="提现金额（元）" align=center></el-table-column>
            <el-table-column prop="hotelWithdrawalName" label="提现人" align=center></el-table-column>
            <el-table-column prop="withdrawalStatus" label="状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.withdrawalStatus == '3'">待审核</span>
                    <span v-else-if="scope.row.withdrawalStatus == '1'">已完成</span>
                    <span v-else-if="scope.row.withdrawalStatus == '2'">转账失败</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzlist['F:BH_FIN_WITHDRAWALSRECORD_DETAIL']" type="text" size="small" @click="lookDetail(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination" style="margin-top: 20px;">
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
export default {
    name: 'HotelWithdrawalsRecord',
    data(){
        return{
            authzlist: {}, //权限数据
            inquireTime: [],
            HotelWithdrawalsRecordDataList: [],
            formInline: '',
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            oprOgrId: ''
        }
    },
    mounted(){
        // this.oprOgrId=localStorage.orgId;
        // this.oprOgrId = this.$route.params.orgId;
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.HotelWithdrawalsRecord();
    },
    methods: {
        //提现记录
        HotelWithdrawalsRecord(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                // encryptedOrgId: this.oprOgrId,
                orgAs: 3,
                applyStartTime: this.inquireTime[0],
                applyEndTime: this.inquireTime[1],
                withdrawalStatus: this.formInline,
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.HotelWithdrawalsRecord({params}).then(response=>{
                if(response.data.code==0){
                    this.pageTotal = response.data.data.total;
                    this.HotelWithdrawalsRecordDataList = response.data.data.list;
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
            this.HotelWithdrawalsRecord();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.HotelWithdrawalsRecord();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.HotelWithdrawalsRecord();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.HotelWithdrawalsRecord();
        },
        //查看详情
        lookDetail(id){
            this.$router.push({name: 'HotelWithdrawalsRecordDetail', query: {id}});
        }
    }
}
</script>

<style lang="less" scoped>
</style>