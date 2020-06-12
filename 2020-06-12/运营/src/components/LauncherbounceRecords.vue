<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="openid">
                <el-input v-model="openid" placeholder="输入openid"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model="nickName" placeholder="输入用户昵称"></el-input>
            </el-form-item>          
            <!-- <el-form-item label="优惠券类型">
                <el-select
                    v-model="bounceType"
                    :loading="loadingH"
                    placeholder="请选择">
                    <el-option
                        v-for="item in bounceTypeList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>
            </el-form-item>           -->
            <el-form-item label="状态">
                <el-select
                    v-model="status"
                    :loading="loadingH"
                    placeholder="请选择">
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
            </el-form-item>          
            <el-form-item label="使用时间">
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
        </el-form>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="investorOpenId" label="openid" align=center></el-table-column>
            <el-table-column prop="investorNickName" label="用户呢称" align=center></el-table-column>
            <!-- <el-table-column label="优惠券类型" align=center>
                折扣券
            </el-table-column> -->
            <el-table-column prop="couponName" label="优惠券名称" align=center></el-table-column>
            <el-table-column prop="gainTime" label="领取时间" align=center></el-table-column>
            <el-table-column label="状态" align=center>
                <template slot-scope="scope">
                    {{scope.row.isUsed == 0 ? '未使用':'已使用'}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="使用时间" align=center>
                <template slot-scope="scope">
                    {{scope.row.usedTime == '1970-01-01 00:00:00' ? '-':scope.row.usedTime}}
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
    name: 'LauncherbounceRecords',
    data() {
        return{
            authzData: '',
            CabinetList:[],
            loadingH: false,
            openid:'',
            nickName:'',
            dateRange:'',
            // bounceType:'',
            status:'',
            // bounceTypeList:[
            //     {
            //         label:'全部',
            //         id:''
            //     },
            //     {
            //         label:'未使用',
            //         id: 0
            //     },
            //     {
            //         label:'已使用',
            //         id: 1
            //     },
            // ],
            statusList:[
                {
                    label:'全部',
                    value:''
                },
                {
                    label:'未使用',
                    value:0
                },
                {
                    label:'已使用',
                    value:1
                },
            ],
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            currentPage: 1, //当前页码
            pageNum: 1,
        }
    },
    created() {
    //    this.oprOgrId=localStorage.orgId
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.openid = this.$route.params.modifyid;
    },
    mounted(){
        this.Getdata()
    },
    methods: {
        //查询
        inquire(){
            this.Getdata();
        },
       
        //当前页码
        current(){
            this.pageNum = this.currentPage;
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
        //非空校验
        ifEmpty(item){
           if(item === ''){
               return undefined;
            }else{
                return item;
            }
        },
        //获取数据
        Getdata(){ 
            let that=this;
            let params = {
                openId: this.ifEmpty(this.openid),
                nickName: this.ifEmpty(this.nickName),
                userTimeFrom: this.dateRange == null ? undefined : this.dateRange[0],
                userTimeTo: this.dateRange == null ? undefined : this.dateRange[1],
                status: this.ifEmpty(this.status),
                pageNo: this.pageNum,
                pageSize: this.pageSize
            }
            this.$api.FsPersonCoupon({params}).then(response => {
                if(response.data.code == 0){
                    this.CabinetList = response.data.data.records;
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
        }
    }
}
</script>

<style lang="less" scoped>
.pagination{
    margin-top: 20px;
}
</style>

