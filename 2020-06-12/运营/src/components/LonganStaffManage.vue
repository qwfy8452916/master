<template>
    <div class="customerlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="组织">
                <el-select
                    v-model="inquireOrganization"
                    filterable
                    remote
                    :remote-method="remoteOrgan"
                    :loading="loadingO"
                    @focus="getOrgan()">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in organNameList" :key="item.index" :label="item.orgName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="ID">
                <el-input v-model="inquireID" @change="verifyNumber"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="inquireName"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="inquirePhone"></el-input>
            </el-form-item>
            <el-form-item label="是否有社群成员">
                <el-select v-model="inquireIsTeam" placeholder="请选择">
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
        <el-table :data="staffDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="empId" label="ID" min-width="80px" align=center></el-table-column>
            <el-table-column prop="orgName" label="组织" min-width="200px" align=center></el-table-column>
            <el-table-column prop="account" label="账号" min-width="180px" align=center></el-table-column>
            <el-table-column prop="empNo" label="工号" min-width="100px" align=center></el-table-column>
            <el-table-column prop="empName" label="姓名" min-width="100px" align=center></el-table-column>
            <el-table-column prop="empPhone" label="手机号码" min-width="120px" align=center></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="180px"></el-table-column>
            <el-table-column prop="createTime" label="添加时间" min-width="160px" align=center></el-table-column>
            <el-table-column prop="status" label="状态" min-width="80px" align=center></el-table-column>
            <el-table-column prop="isHaveTeam" label="是否有社群成员" min-width="120px" align=center></el-table-column>
            <el-table-column prop="incomeAmount" label="收入总额" min-width="100px" align=center></el-table-column>
            <el-table-column prop="pendingIncomeAmount" label="待入账总额" min-width="100px" align=center></el-table-column>
            <el-table-column prop="withdraw" label="提现总额" min-width="100px" align=center></el-table-column>
            <el-table-column prop="balance" label="账户余额" min-width="100px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="200px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isHaveTeam == '是'" type="text" size="small" @click="staffCapDetail(scope.row.id)">社群明细</el-button>
                    <el-button v-if="authzData['F:BO_FIN_EMPACCOUNTLIST_WAITINCOM']" type="text" size="small" @click="waitEnter(scope.row.empId)">待入账收入</el-button>
                    <el-button v-if="authzData['F:BO_FIN_EMPACCOUNTLIST_EMPINCOME']" type="text" size="small" @click="staffMoneyDetail(scope.row.empId)">收支记录</el-button>
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
    name: 'LonganStaffManage',
    components: {
        LonganPagination,
        resetButton
    },
    data(){
        return {
            authzData: '', //权限数据
            inquireOrganization: '',
            organNameList: [],
            loadingO:false,
            inquireID: '',
            inquireName: '',
            inquirePhone: '',
            inquireIsTeam: '',
            staffDataList: [],
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
        this.getOrgan();
        this.staffList();
    },
    methods: {
        resetFunc(){
            this.inquireOrganization = '';
            this.inquireID = '';
            this.inquireName = '';
            this.inquirePhone = '';
            this.inquireIsTeam = '';
            this.staffList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.staffList();
        },
        //组织列表
        getOrgan(oName){
            let that = this;
            this.loadingO = true;
            let params = {
                orgName: oName,
                pageNo: 1,
                pageSize: 50
            }
            this.$api.getOrganization({params})
                .then(response => {
                    this.loadingO = false;
                    const result = response.data;
                    if(result.code == 0){
                        that.organNameList = result.data.records;
                    }else{
                        this.$message.error(result.msg);
                    }
                }).catch(err=>{
                    this.$alert(err,"警告",{
                        confirmButtonText:"确定"
                    })
                })
        },
        remoteOrgan(val){
            this.getOrgan(val);
        },
        //验证
        verifyNumber(){
            this.inquireID = this.inquireID.replace(/[^\d]/g, '');
        },
        //员工列表
        staffList(){
            const params = {
                orgId: this.inquireOrganization,
                empId: this.inquireID,
                empName: this.inquireName,
                empPhone: this.inquirePhone,
                isHaveTeam: this.inquireIsTeam,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            // console.log(params);
            this.$api.staffList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.staffDataList = result.data.records;
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
            this.staffList();
            this.$store.commit('setSearchList',{
                inquireOrganization: this.inquireOrganization,
                inquireID: this.inquireID,
                inquireName: this.inquireName,
                inquirePhone: this.inquirePhone,
                inquireIsTeam: this.inquireIsTeam,
            })
        },
        //社群明细
        staffCapDetail(id){
            this.$router.push({name: 'LonganCustomerList', query: {id}});
        },

        //待入账收入
        waitEnter(id){
          this.$router.push({name:"LonganWaitAccountIncome", query: {id}})
        },

        //收支明细
        staffMoneyDetail(id){
            this.$router.push({name: 'LonganIncomeRecord', query: {id}});
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
