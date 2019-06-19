<template>
    <div class="LonganWithdrawalsRecord">
        <el-form :inline="true" align=left>
            <el-form-item label="酒店名称">
                <el-select v-model="HotelId">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in hotelNameList"
                        :key="item.index"
                        :label="item.hotelName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="dealStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待审核" value="3"></el-option>
                    <el-option label="成功" value="1"></el-option>
                    <el-option label="失败" value="2"></el-option>
                </el-select>
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
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="LonganWithdrawalsRecordDataList" border style="width:100%;" >
            <el-table-column prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="hotelWithdrawalTime" label="申请时间" align=center></el-table-column>
            <el-table-column prop="hotelWithdrawalAmount" label="提现金额" align=center></el-table-column>
            <el-table-column prop="hotelWithdrawalName" label="提现人" align=center></el-table-column>
            <el-table-column prop="withdrawalStatus" label="状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.withdrawalStatus == '3'">待处理</span>
                    <span v-else-if="scope.row.withdrawalStatus == '1'">已转账</span>
                    <span v-else-if="scope.row.withdrawalStatus == '2'">转账失败</span>
                </template>  
            </el-table-column>
            <el-table-column prop="withdrawalStatus" fixed="right" label="操作" width="200px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.withdrawalStatus == '3'" type="text" size="small" @click="HandleDetail(scope.row.id,scope.row.hotelId)">处理</el-button>
                    <el-button type="text" size="small" @click="lookDetail(scope.row.id)">查看详情</el-button>
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
export default {
    name: 'LonganWithdrawalsRecord',
    data(){
        return{
            inquireTime: [],
            LonganWithdrawalsRecordDataList: [],
            HotelId: '',
            hotelNameList: [],
            dealStatus: '',
            inquireCommodityName: '',
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            GrossIncome: '',
            oprId: ''
        }
    },
    mounted(){
        this.oprId=localStorage.getItem('orgId');
        this.HotelNameList();
        this.LonganWithdrawalsRecord();
    },
    methods: {
        //获取所有酒店名称
        HotelNameList(){
            let id = this.oprId;
            this.$api.HotelNameList(id).then(response=>{
                if(response.data.code==0){
                  this.hotelNameList = response.data.data;
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
        //酒店提现记录
        LonganWithdrawalsRecord(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                encryptedOrgId: this.oprId,
                hotelId: this.HotelId,
                withdrawalStatus: this.dealStatus,
                applyStartTime: this.inquireTime[0],
                applyEndTime: this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.LonganWithdrawalsRecord({params}).then(response=>{
                if(response.data.code==0){
                    this.pageTotal = response.data.data.total;
                    this.LonganWithdrawalsRecordDataList = response.data.data.list;
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
            this.LonganWithdrawalsRecord();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.LonganWithdrawalsRecord();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.LonganWithdrawalsRecord();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.LonganWithdrawalsRecord();
        },
        //查看详情
        lookDetail(id){
            this.$router.push({name: 'LonganWithdrawalsRecordDetail', query: {id}});
        },
        //处理
        HandleDetail(id,hotelId){
            this.$router.push({name: 'LonganWithdrawalsRecordHandle', query: {id,hotelId}});
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
</style>

