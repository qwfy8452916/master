<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="组织">
                <el-select
                    filterable
                    remote
                    :remote-method="remoteOrganType"
                    @focus="getOrganization()"
                    @change="changeOrg()"
                    v-model="organId"
                    placeholder="请选择">
                    <el-option
                        v-for="item in organization"
                        :key="item.id"
                        :label="item.orgName"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="员工">
                <el-select
                    v-model="empId"
                    placeholder="请选择">
                    <el-option
                        v-for="item in employeeList"
                        :key="item.id"
                        :label="item.empName"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="ID" align=center></el-table-column>
            <el-table-column prop="fatherOrgName" label="组织" align=center></el-table-column>
            <el-table-column prop="empAccount" label="员工账号" align=center></el-table-column>
            <el-table-column prop="empName" label="员工姓名" align=center></el-table-column>
            <el-table-column prop="empMobile" label="员工号码" align=center></el-table-column>
            <el-table-column label="收支类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.businessType == 1">购物红包</span>
                    <span v-if="scope.row.businessType == 2">订房红包</span>
                    <span v-if="scope.row.businessType == 3">提现</span>
                    <span v-if="scope.row.businessType == 4">好物分享佣金</span>
                    <span v-if="scope.row.businessType == 5">订房分享佣金</span>
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="收支金额" align=center></el-table-column>
            <el-table-column prop="createdAt" label="交易时间" align=center></el-table-column>
            <el-table-column label="交易状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">成功</span>
                    <span v-if="scope.row.status == 2">失败</span>
                    <span v-if="scope.row.status == 0">处理中</span>
                    <span v-if="scope.row.status == 3">失效</span>
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
                :current-page.sync="pageNum"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import resetButton from '@/components/resetButton'
export default {
    name: 'LonganEmployeeCash',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            CabinetList:[],
            loadingH: false,
            organId:'',
            organization:[],
            empId:'',
            employeeList:[],

            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            pageNum: 1, //当前页码
        }
    },
    created() {
    //    this.oprOgrId=localStorage.orgId
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    mounted(){
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.getOrganization()
        this.getEmployeeList()
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.organId = ''
            this.empId = ''
            this.Getdata();
        },
        changeOrg(){
            this.empId = ''
            this.getEmployeeList(this.organId)
        },
        //查询
        inquire(){
            this.pageNum = 1
            this.Getdata();
            this.$store.commit('setSearchList',{
                organId: this.organId,
                empId: this.empId
            })
        },
       
        //详情
        CabinetglManager(index,row){
            let guiId=row[index].id
            this.$router.push({name:'LonganEmployeeReDetail',query:{modifyid: guiId}});
        },
        //当前页码
        current(){
            // this.pageNum = this.currentPage;
            this.Getdata();
        },
        //获取组织
        remoteOrganType(val){
            this.getOrganization(val);
        },
        //组织列表
        getOrganization(hName){
            let that=this;
            let params={
                orgName: hName,
                pageNo: 1,
                pageSize: 50
            }
            this.$api.getOrganization({params}).then(response=>{
                if(response.data.code==0){
                    that.organization=response.data.data.records
                    const hotelAll = {
                        id: '',
                        orgName: '全部'
                    };
                    that.organization.unshift(hotelAll);
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
        remoteEmpType(val){
            this.getEmployeeList(val);
        },
         //员工列表
        getEmployeeList(hName){
            this.loadingH = true;
            const params = {
                orgId:hName
            };
            this.$api.empRelationList({params})
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.employeeList = result.data.map(item => {
                            return{
                                id: item.id,
                                empName: item.empName
                            }
                        })
                        const hotelAll = {
                            id: '',
                            empName: '全部'
                        };
                        this.employeeList.unshift(hotelAll);
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
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.Getdata();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.Getdata();
        },
        
        Getdata(){ 
            let that=this;
            let params = {
                memberUserId:  this.empId,
                orgId:  this.organId,
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            }
            this.$api.cusEmpRecords({params}).then(response => {
                if(response.data.code == 0){
                    that.CabinetList = response.data.data.records;
                    that.pageTotal = response.data.data.total;
                }else{
                    that.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                that.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
    }
}
</script>

<style lang="less" scoped>
.pagination{
    margin-top: 20px;
}
</style>

