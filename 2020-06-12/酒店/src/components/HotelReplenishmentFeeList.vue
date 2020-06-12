<template>
    <div class="HotelReplenishmentFeeList">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="商品名称">
                <el-input v-model="prodName"></el-input>
            </el-form-item>
            <el-form-item label="补货人">
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
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="HotelReplenishmentFeeListDataList" border stripe style="width:100%;" >
            <el-table-column prop="roomFloor" label="楼层" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="latticeCode" label="补货格子" align=center></el-table-column>
            <el-table-column prop="prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="empName" label="补货人" align=center></el-table-column>
            <el-table-column prop="replAmount" label="补货费（元）" align=center></el-table-column>
            <el-table-column prop="replTime" label="补货时间" align=center></el-table-column>
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
    name: 'HotelReplenishmentFeeList',
    data(){
        return{
            inquireTime: [],
            HotelReplenishmentFeeListDataList: [],
            prodName: '',
            empName: '',
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            encryptedOrgId: ''
        }
    },
    
    mounted(){
        // this.encryptedOrgId=localStorage.getItem('orgId');
        // this.encryptedOrgId = this.$route.params.orgId;
        this.HotelReplenishmentFeeList();
    },
    methods: {
        //
        HotelReplenishmentFeeList(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                // encryptedOrgId: this.encryptedOrgId,
                orgAs: 3,
                applyEndTime: this.inquireTime[1],
                applyStartTime: this.inquireTime[0],
                prodName: this.prodName,
                empName: this.empName,
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.HotelReplenishmentFeeList({params}).then(response=>{
                if(response.data.code==0){
                    this.HotelReplenishmentFeeListDataList = response.data.data.list;
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
            this.HotelReplenishmentFeeList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.HotelReplenishmentFeeList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.HotelReplenishmentFeeList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.HotelReplenishmentFeeList();
        }
    }
}
</script>

<style lang="less" scoped>
</style>

