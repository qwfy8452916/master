<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="分享类型">
                <el-select v-model="shareType">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="员工" value="1"></el-option>
                    <el-option label="顾客" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="人员ID">
                <el-input v-model="inquireId"></el-input>
            </el-form-item>
            <el-form-item label="分享级别">
                <el-select v-model="shareGrade">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="分销推广员" value="0"></el-option>
                    <el-option label="分销管理员" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="统计时间">
                <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column label="分享人类型" min-width="100" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.userType == 1">员工</span>
                    <span v-if="scope.row.userType == 2">顾客</span>
                </template>
            </el-table-column>
            <el-table-column fixed label="人员ID" min-width="80" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.userId}}</span>
                </template>
            </el-table-column>
            <el-table-column label="人员昵称" min-width="100" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.userNickName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="人员手机号" min-width="120" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.userMobile}}</span>
                </template>
            </el-table-column>
            <el-table-column label="分享级别" min-width="100" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isCaptain == 0">分销推广员</span>
                    <span v-if="scope.row.isCaptain == 1">分销管理员</span>
                </template>
            </el-table-column>
            <el-table-column label="分享次数" min-width="80" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.shareCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="分享访问次数" min-width="100" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.shareVisitCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="售出商品数量" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.prodSaleCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="订单数量" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.orderCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="订单总额" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.orderAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="分享奖励总额" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.shareBonus}}</span>
                </template>
            </el-table-column>
            <el-table-column label="管理奖励总额" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.shareManageBonus}}</span>
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
import resetButton from './resetButton'
export default {
    name: 'LaunchCabinetManagement',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            CabinetList:[],
            loadingH: false,
            hotelId:"",
            shareType:"",
            inquireId:"",
            shareGrade:"",
            dateRange:[],
            hotelList:[],
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
        if(this.$route.query.modifyid){
            this.hotelId = this.$route.query.modifyid;
        }
        this.hotelId = parseInt(localStorage.hotelId);
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.shareType = ''
            this.inquireId = ''
            this.shareGrade = ''
            this.dateRange = []
            this.Getdata();
        },
        //查询
        inquire(){
            this.pageNum = 1
            this.Getdata();
            this.$store.commit('setSearchList',{
                inquireId: this.inquireId,
                shareType: this.shareType,
                shareGrade: this.shareGrade,
                dateRange: this.dateRange,
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
                isCaptain:  this.shareGrade,
                censusTimeFrom:  this.dateRange[0],
                censusTimeTo:  this.dateRange[1],
                hotelId:  this.hotelId,
                userId:  this.inquireId,
                userType:  this.shareType,
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            }
            this.$api.empShareTotal(params).then(response => {
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