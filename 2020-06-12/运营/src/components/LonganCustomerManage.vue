<template>
    <div class="customerlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="ID">
                <el-input v-model="inquireID" @change="verifyNumber"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="inquireNickname"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="inquirePhone"></el-input>
            </el-form-item>
            <el-form-item label="是否认证分享">
                <el-select v-model="inquireIsShare" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否为团长">
                <el-select v-model="inquireIsCap" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="customerDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="ID" min-width="80px" align=center></el-table-column>
            <el-table-column prop="nickName" label="昵称" min-width="120px" align=center></el-table-column>
            <el-table-column prop="mobile" label="手机号码" min-width="120px" align=center></el-table-column>
            <el-table-column prop="isConfirmShare" label="认证分享" min-width="80px" align=center>
            </el-table-column>
            <el-table-column prop="regimentalCommander" label="是否为团长" min-width="100px" align=center>
            </el-table-column>
            <el-table-column prop="firstHotelName" label="首次访问酒店" min-width="240px" align=center></el-table-column>
            <el-table-column prop="createdAt" label="首次访问时间" min-width="160px" align=center></el-table-column>
            <el-table-column prop="lastHotelName" label="最后访问酒店" min-width="240px" align=center></el-table-column>
            <el-table-column prop="lastUpdatedAt" label="最后登录时间" min-width="160px" align=center></el-table-column>
            <el-table-column prop="incomeAmount" label="收入总额" min-width="100px" align=center></el-table-column>
            <el-table-column prop="pendingIncomeAmount" label="待入账总额" min-width="100px" align=center></el-table-column>
            <el-table-column prop="withdraw" label="提现总额" min-width="100px" align=center></el-table-column>
            <el-table-column prop="balance" label="账户余额" min-width="100px" align=center></el-table-column>

            <el-table-column fixed="right" label="操作" min-width="200px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.regimentalCommander == 1" type="text" size="small" @click="customerCapDetail(scope.row.id)">社群明细</el-button>
                    <el-button v-if="authzData['F:BO_FIN_CUSTACCOUNTLIST_WAITINCOM']" type="text" size="small" @click="waitEnter(scope.row.id)">待入账收入</el-button>
                    <el-button v-if="authzData['F:BO_FIN_CUSTACCOUNTLIST_CUSTINCOME']" type="text" size="small" @click="customerMoneyDetail(scope.row.id)">收支记录</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
    </div>
</template>

<script>
import LonganPagination from '@/components/LonganPagination'
import resetButton from './resetButton'
export default {
    name: 'LonganCustomerManage',
    components: {
        LonganPagination,
        resetButton
    },
    data(){
        return {
            authzData: '', //权限数据
            inquireID: '',
            inquireNickname: '',
            inquirePhone: '',
            inquireIsShare: '',
            inquireIsCap: '',
            customerDataList: [],
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
        this.customerList();
    },
    methods: {
        resetFunc(){
            this.inquireID = '';
            this.inquireNickname = '';
            this.inquirePhone = '';
            this.inquireIsShare = '';
            this.inquireIsCap = '';
            this.customerList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.customerList();
        },
        //验证
        verifyNumber(){
            this.inquireID = this.inquireID.replace(/[^\d]/g, '');
        },
        //顾客列表
        customerList(){
            const params = {
                customerId: this.inquireID,
                nickName: this.inquireNickname,
                mobile: this.inquirePhone,
                isConfirmShare: this.inquireIsShare,
                isCap: this.inquireIsCap,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            // console.log(params);
            this.$api.customerList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.customerDataList = result.data.records;
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
            this.customerList();
            this.$store.commit('setSearchList',{
                inquireID: this.inquireID,
                inquireNickname: this.inquireNickname,
                inquirePhone: this.inquirePhone,
                inquireIsShare: this.inquireIsShare,
                inquireIsCap: this.inquireIsCap,
            })
        },
        //社群明细
        customerCapDetail(id){
            this.$router.push({name: 'LonganCustomerList', query: {id}});
        },

        //待入账收入
        waitEnter(id){
          this.$router.push({name:"LonganCustomerWaitIn", query: {id}})
        },

        //收支明细
        customerMoneyDetail(id){
               this.$router.push({name: 'LonganCustomerIncomeRecord', query: {id}});
            // this.$router.push({name: 'LonganCustomerCash', query: {id}});
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
