<template>
    <div class="LonganOperationAnalysis">
        <el-form :inline="true" align=left>
            <el-form-item label="酒店名称">
                <el-select v-model="hotelId">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in hotelNameList"
                        :key="item.index"
                        :label="item.hotelName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-select v-model="prodId">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in ProdNameList"
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
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
            <div>
                <el-form-item>
                    <el-button type="primary" @click="outExe">导出</el-button>
                </el-form-item>
            </div>
        </el-form>
        <el-table :data="LonganOperationAnalysisDataList" border style="width:100%;" >
            <el-table-column prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="roomFloor" label="酒店楼层" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="cabId" label="柜子id" align=center></el-table-column>
            <el-table-column prop="latticeCode" label="格子编号" align=center></el-table-column>
            <el-table-column prop="prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="salesAmount" label="销售金额（元）" align=center></el-table-column>
            <el-table-column prop="price" label="采购单价（元）" align=center></el-table-column>
            <el-table-column prop="profitAmount" label="利润额（元）" align=center></el-table-column>
            <el-table-column prop="orderAt" label="订单时间" align=center></el-table-column>
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
    name: 'LonganOperationAnalysis',
    data(){
        return{
            inquireTime: [],
            LonganOperationAnalysisDataList: [],
            hotelId: '',
            hotelNameList : [],
            prodId: '',
            ProdNameList: [],
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            oprId: ''
        }
    },
    mounted(){
        this.oprId=localStorage.getItem('orgId');
        this.HotelNameList();
        this.getProdNameList();
        this.LonganOperationAnalysis();
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
        //获取所有商品名称
        getProdNameList(){
            this.$api.getProdNameList({}).then(response=>{
                if(response.data.code==0){
                  this.ProdNameList = response.data.data;
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
        //运营分析订单查询
        LonganOperationAnalysis(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                encryptedOrgId: this.oprId,
                hotelId : this.hotelId,
                orderAtStart: this.inquireTime[0],
                orderAtEnd: this.inquireTime[1],
                prodId: this.prodId,
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.LonganOperationAnalysis({params}).then(response=>{
                if(response.data.code==0){
                  this.LonganOperationAnalysisDataList = response.data.data.list;
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
            this.LonganOperationAnalysis();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.LonganOperationAnalysis();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.LonganOperationAnalysis();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.LonganOperationAnalysis();
        },
        //导出
        outExe(){
            this.$confirm('此操作将导出excel文件，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.excelData = this.LonganOperationAnalysisDataList;
                this.export2Excel();
            }).catch(() => {

            });
        },
        export2Excel(){
            let that = this;
            require.ensure([], () => {
                const { export_json_to_excel } = require('../vendor/Export2Excel.js');
                const tHeader = ['酒店名称','酒店楼层','房间号','柜子id','格子编号','商品名称','销售金额（元）','采购单价（元）','利润额（元）','订单时间'];     // 导出的表头名
        const filterVal = ['hotelName','roomFloor','roomCode','cabId','latticeCode','prodName','salesAmount','price','Profit','orderAt'];     // 导出的表头字段名
                const list = that.excelData;
                const data = that.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '订单统计');
            })
        },
        formatJson(filterVal, jsonData){
            return jsonData.map(v => filterVal.map(j => v[j]));
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

