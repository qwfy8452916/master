<template>
    <div class="customerlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="顾客id">
                <el-input v-model="inquireCustomerID"></el-input>
            </el-form-item>
            <el-form-item label="申请人">
                <el-input v-model="inquireCustomerName"></el-input>
            </el-form-item>
            <el-form-item label="提现金额">
                <el-input v-model="inquireWithdrawNum"></el-input>
            </el-form-item>
            <el-form-item label="申请时间">
                <el-date-picker
                    v-model="inquireApplyTime"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <!-- <el-form-item>
                <el-button class="inquireReset" @click="userReset">重&nbsp;&nbsp;置</el-button>
            </el-form-item> -->
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="withdrawRecordDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="customId" label="顾客id" min-width="100px" align=center></el-table-column>
            <el-table-column prop="customNickName" label="申请人" min-width="200px"></el-table-column>
            <el-table-column prop="createdAt" label="申请时间" min-width="160px" align=center></el-table-column>
            <el-table-column prop="balance" label="账户余额" min-width="120px" align=center></el-table-column>
            <el-table-column prop="amount" label="提现金额" min-width="120px" align=center></el-table-column>
            <el-table-column prop="status" label="申请状态" min-width="100px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">处理中</span>
                    <span v-else-if="scope.row.status == 1">成功</span>
                    <span v-else-if="scope.row.status == 2">失败</span>
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
    name: 'LonganCustomerWithdrawRecord',
    components: {
        LonganPagination,
        resetButton
    },
    data(){
        return {
            authzlist: {}, //权限数据
            inquireCustomerID: '',
            inquireCustomerName: '',
            inquireWithdrawNum: '',
            inquireApplyTime: [],
            withdrawRecordDataList: [],
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.withdrawRecordList();
    },
    methods: {
        resetFunc(){
            this.inquireCustomerID = ''
            this.inquireCustomerName = ''
            this.inquireWithdrawNum = ''
            this.inquireApplyTime = []
            this.withdrawRecordList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.customerList();
        },
        //顾客提现记录列表
        withdrawRecordList(){
            if(this.inquireApplyTime == null){
                this.inquireApplyTime = [];
            }
            const params = {
                customId: this.inquireCustomerID,
                customNickName: this.inquireCustomerName,
                amount: this.inquireWithdrawNum,
                applTimeFrom: this.inquireApplyTime[0],
                applTimeTo: this.inquireApplyTime[1],
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            // console.log(params);
            this.$api.withdrawRecordList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.withdrawRecordDataList = result.data.records;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.withdrawRecordList();
            this.$store.commit('setSearchList',{
                inquireCustomerID: this.inquireCustomerID,
                inquireCustomerName: this.inquireCustomerName,
                inquireWithdrawNum: this.inquireWithdrawNum,
                inquireApplyTime:this.inquireApplyTime
            })
        },
        //重置
        userReset(){
            this.inquireCustomerID = '';
            this.inquireCustomerName = '';
            this.inquireWithdrawNum = '';
            this.inquireApplyTime = [];
            this.inquire();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.withdrawRecordList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.withdrawRecordList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.withdrawRecordList();
        },
    }
}
</script>

<style lang="less" scoped>
.customerlist{
    .pagination{
        margin-top: 20px;
    }
}
</style>
