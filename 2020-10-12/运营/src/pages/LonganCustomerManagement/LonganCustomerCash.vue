<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="顾客ID：">
                <el-input v-model="customId" placeholder="请输入顾客ID"></el-input>
            </el-form-item>
            <el-form-item label="顾客昵称：">
                <el-input v-model="customNickName" placeholder="请输入顾客昵称"></el-input>
            </el-form-item>
            <el-form-item label="顾客手机：">
                <el-input v-model="mobile" placeholder="请输入顾客手机"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="CabinetList" border stripe style="width:100%;">
            <el-table-column fixed prop="id" label="ID" align=center></el-table-column>
            <el-table-column prop="customId" label="顾客ID" align=center></el-table-column>
            <el-table-column prop="customName" label="顾客昵称" align=center></el-table-column>
            <el-table-column prop="customMobile" label="顾客手机" align=center></el-table-column>
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
    name: 'LonganCustomerCash',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            CabinetList:[],
            loadingH: false,
            customId:'',
            customNickName:'',
            mobile:'',

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
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.customId = ''
            this.customNickName = ''
            this.mobile = ''
            this.Getdata();
        },
       
        //查询
        inquire(){
            this.pageNum = 1
            this.Getdata();
            this.$store.commit('setSearchList',{
                customId: this.customId,
                customNickName: this.customNickName,
                mobile: this.mobile
            })
        },
       
    
        //当前页码
        current(){
            // this.pageNum = this.currentPage;
            this.Getdata();
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
                customId:  this.customId,
                customNickName:  this.customNickName,
                mobile:  this.mobile,
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            }
            this.$api.cusFinRecords({params}).then(response => {
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

