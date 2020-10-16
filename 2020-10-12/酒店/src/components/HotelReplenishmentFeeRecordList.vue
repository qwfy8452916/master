<template>
    <div class="HotelReplenishmentFeeRecordList">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="提现人">
                <el-input v-model="empName"></el-input>
            </el-form-item>
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
            <el-form-item label="提现状态">
                <el-select v-model="empWithdrawalStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="成功" value="1"></el-option>
                    <el-option label="失败" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="HotelReplenishmentFeeRecordListDataList" border stripe style="width:100%;" >
            <el-table-column prop="empName" label="提现人" align=center></el-table-column>
            <el-table-column prop="empWithdrawalAmount" label="提现金额（元）" align=center></el-table-column>
            <el-table-column prop="createdAt" label="提现时间" align=center></el-table-column>
            <el-table-column prop="empWithdrawalStatus" label="提现状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.empWithdrawalStatus == '1'">提现成功</span>
                    <span v-else-if="scope.row.empWithdrawalStatus == '2'">提现失败</span>
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
    name: 'HotelReplenishmentFeeRecordList',
    data(){
        return{
            inquireTime: [],
            HotelReplenishmentFeeRecordListDataList: [],
            empName: '',
            empWithdrawalStatus: '',
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            formInline: ''
        }
    },
    mounted(){
        this.HotelReplenishmentFeeRecordList();
    },
    methods: {
        //营收统计
        HotelReplenishmentFeeRecordList(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                applyStartTime: this.inquireTime[0],
                applyEndTime: this.inquireTime[1],
                empName: this.empName,
                empWithdrawalStatus: this.empWithdrawalStatus,
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.HotelReplenishmentFeeRecordList({params}).then(response=>{
                if(response.data.code==0){
                    this.HotelReplenishmentFeeRecordListDataList = response.data.data.list;
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
        //查询
        inquire(){
            this.pageNum = 1;
            this.HotelReplenishmentFeeRecordList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.HotelReplenishmentFeeRecordList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.HotelReplenishmentFeeRecordList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.HotelReplenishmentFeeRecordList();
        }
    }
}
</script>

<style lang="less" scoped>
</style>

