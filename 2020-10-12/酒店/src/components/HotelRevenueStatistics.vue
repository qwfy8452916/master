<template>
    <div class="HotelRevenueStatistics">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="商品名称">
                <el-select v-model="ProdName">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in prodNameList"
                        :key="item.index"
                        :label="item.productName"
                        :value="item.id"
                    ></el-option>
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
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <div class="Revenue-font">预计分成总收入：{{GrossIncome}}(元)</div>
        <el-table :data="HotelRevenueStatisticsDataList" border stripe style="width:100%;" >
            <el-table-column prop="prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="salesCount" label="销售数量" align=center></el-table-column>
            <el-table-column prop="actualPay" label="销售金额（元）" align=center></el-table-column>
            <el-table-column prop="dividedPay" label="分成金额（元)" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="200px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="lookDetail(scope.row.prodId)">查看详情</el-button>
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
    name: 'HotelRevenueStatistics',
    data(){
        return{
            inquireTime: [new Date(),new Date()],
            HotelRevenueStatisticsDataList: [],
            ProdName: '',
            prodNameList: [],
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            GrossIncome: '',
            orgId: ''
        }
    },
    mounted(){
        // this.orgId = localStorage.getItem('orgId');
        this.orgId = this.$route.params.orgId;
        this.getProdNameList();
        this.HotelRevenueStatistics();
        this.getGrossIncome();
    },
    methods: {
        //获取所有商品名称
        getProdNameList(){
            this.$api.getProdNameList({}).then(response=>{
                if(response.data.code==0){
                  this.prodNameList = response.data.data;
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
        //获取预计分成总收入
        getGrossIncome(){
            const params2 = {
                encryptedOrgId: this.orgId,
            };
            this.$api.getGrossIncome({params2}).then(response=>{
                console.log(response.data.dividedAmoun);
                if(response.data.code==0){
                  this.GrossIncome = response.data.data.dividedAmoun;
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
        //营收统计
        HotelRevenueStatistics(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                encryptedOrgId: this.orgId,
                prodId: this.ProdName,
                orderAtStart: this.inquireTime[0],
                orderAtEnd: this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.HotelRevenueStatistics({params}).then(response=>{
                if(response.data.code==0){
                  this.HotelRevenueStatisticsDataList = response.data.data.list;
                  this.pageTotal = response.data.data.total;
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
            this.HotelRevenueStatistics();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.HotelRevenueStatistics();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.HotelRevenueStatistics();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.HotelRevenueStatistics();
        },
        lookDetail(id){
            this.$router.push({name: 'HotelRevenueDetail', query: {id}});
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

