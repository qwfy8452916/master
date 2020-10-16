<template>
    <div class="LonganOperationAnalysis">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称">
                <el-select 
                    v-model="inquireHotelName"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房间号">
                <el-input v-model="roomCode"></el-input>
            </el-form-item>
            <!-- <el-form-item label="商品名称">
                <el-select 
                    v-model="inquireProdName"
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loadingP"
                    @focus="getProdList()"
                    placeholder="请选择">
                    <el-option v-for="item in prodList" :key="item.id" :label="item.prodName" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
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
        <!-- <div v-if="authzData['F:BO_OPS_ORDERSTAT_EXPORT']"><el-button class="addbutton" @click="outExe">导&nbsp;&nbsp;出</el-button></div> -->
        <el-table :data="LonganOperationAnalysisDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="orderCode" label="订单编号"></el-table-column>
            <el-table-column fixed prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="hotelRoomFloor" label="酒店楼层" align=center></el-table-column>
            <el-table-column prop="hotelRoomCoder" label="房间号" align=center></el-table-column>
            <!-- <el-table-column prop="cabId" label="柜子id" align=center></el-table-column> -->
            <!-- <el-table-column prop="latticeCode" label="格子编号" align=center></el-table-column> -->
            <el-table-column prop="prodCount" label="商品数量"></el-table-column>
            <el-table-column prop="actualPay" label="实付金额" width="120px" align=center></el-table-column>
            <el-table-column prop="customerId" label="用户ID" width="120px" align=center></el-table-column>
            <el-table-column prop="nickName" label="用户昵称" width="120px" align=center></el-table-column>
            <el-table-column prop="payTime" label="下单时间" width="160px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" v-if="authzData['F:BO_OPS_ORDERSTAT_DETAIL']" size="small" @click="detailfun(scope.row.id)">详情</el-button>
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
    name: 'LonganOperationAnalysis',
    data(){
        return{
            authzData: '',
            inquireTime: [],
            LonganOperationAnalysisDataList: [],
            hotelId: '',
            roomCode: '',
            hotelNameList : [],
            prodId: '',
            ProdNameList: [],
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            inquireHotelName: '',
            hotelList: [],
            prodList: [],
            inquireProdName: '',
            loadingH: false,
            loadingP: false
            // oprId: ''
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.getHotelList();
        // this.getProdList();
        this.LonganOperationAnalysis();
    },
    methods: {
        //酒店列表
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                hotelName: hName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.hotelList(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName
                            }
                        })
                        const hotelAll = {
                            id: '',
                            hotelName: '全部'
                        };
                        this.hotelList.unshift(hotelAll);
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
        remoteHotel(val){
            this.getHotelList(val);
        },
        //商品列表
        getProdList(pName){
            this.loadingP = true;
            const params = {
                orgAs: 2,
                prodName: pName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.platformCommodityList(params)
                .then(response => {
                    this.loadingP = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.prodList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                prodName: item.prodName
                            }
                        })
                        const prodAll = {
                            id: '',
                            prodName: '全部'
                        };
                        this.prodList.unshift(prodAll);
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
        remoteProd(val){
            this.getProdList(val);
        },
        //运营分析订单查询
        LonganOperationAnalysis(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                // encryptedOrgId: this.oprId,
                hotelId : this.inquireHotelName,
                orderAtStart: this.inquireTime[0],
                orderAtEnd: this.inquireTime[1],
                hotelRoomCode: this.roomCode,
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.LonganOperationAnalysis({params}).then(response=>{
                if(response.data.code==0){
                  this.LonganOperationAnalysisDataList = response.data.data.records;
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
            let inquireHotel_Name = this.inquireHotelName;
            let room_Code = this.roomCode;
            if(inquireHotel_Name == '' && room_Code != ''){
                this.$message.error('请选择酒店');
            }else{
                this.LonganOperationAnalysis();
            }
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
        detailfun(id){
            this.$router.push({name: 'LonganOperationAnalysisDetail', query: {id}});
        },
        //导出
        outExe(){

            // window.location.href ="http://192.168.1.51:9001/longan/api/repl/export/download?orgAs=2&oprId="+this.oprId;

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

