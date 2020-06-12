<template>
    <div class="stocklist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称">
                <el-select
                    v-model="hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-select
                    v-model="prodCode"
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loadingP"
                    @focus="getProdList()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in prodList"
                        :key="item.prodCode"
                        :label="item.prodName"
                        :value="item.prodCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否低于安全库存">
            <el-select v-model="isSafe" placeholder="请选择">
                <el-option
                    v-for="item in safeData"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
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
        <el-table
            :data="stockDataList"
            border
            stripe
            style="width:100%;"
            :row-class-name="function({row, rowIndex}) {return   row.isSafe == 0? 'noSafe':''}">
            <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品名称"></el-table-column>
            <el-table-column prop="totalProdAmount" label="总库存" align=center></el-table-column>
            <el-table-column prop="cabProdAmount" label="迷你吧库存" align=center></el-table-column>
            <el-table-column prop="invProdAmount" label="仓库库存" align=center></el-table-column>
            <el-table-column prop="prodSafeCount" label="安全库存" align=center></el-table-column>
            <!-- <el-table-column prop="prodAmount" label="实际库存数量" align=center></el-table-column> -->
            <el-table-column prop="isSafe" label="是否低于安全库存" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isSafe == 0">是</span>
                    <span v-else>否</span>
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
import resetButton from './resetButton'
  export default {
    name: 'MerchantStockList',
    components:{
        resetButton
    },
    data() {
        return {
            merOrgId: "",  //加密的运营商组织ID
            hotelList: [], //酒店列表
            hotelId: '',  //酒店ID
            prodList: [], //商品列表
            prodCode: "", //商品编号
            isSafe: "",  //是否安全
            //分页
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            //结果数据
            stockDataList: [], //库存列表
            safeData: [{"key": "", "value": "全部"}, {"key": 0, "value": "是"}, {"key": 1, "value": "否"}],   //安全库存选择数据
            loadingH: false,
            loadingP: false
        }
    },
    mounted() {
        // this.merOrgId = localStorage.getItem('orgId');
        // this.merOrgId = this.$route.params.orgId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getProdList();
        this.merchantStockList();
    },
    methods: {
        resetFunc(){
            this.hotelId = ''
            this.prodCode = ''
            this.isSafe = ''
            this.merchantStockList();
        },
        //获取酒店列表
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 5,
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
        //获取商品数据
        getProdList(pName){
            this.loadingP = true;
            const params = {
                orgAs: 5,
                isNeedInv:1,
                prodName: pName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.ownCommodityList(params)
                .then(response => {
                    this.loadingP = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.prodList = result.data.records.map(item => {
                            return{
                                prodCode: item.prodCode,
                                prodName: item.prodName
                            }
                        })
                        const prodAll = {
                            prodCode: '',
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
        //商品库存 - 列表
        merchantStockList() {
            let that = this;
            let params = {
                pageNo: that.pageNum,
                pageSize: that.pageSize,
                hotelId: that.hotelId,
                prodCode: that.prodCode,
                isSafe: that.isSafe,
                // encryptedOrgId: that.merOrgId
                orgAs: 5
            };
            this.$api.merchantStockList(params)
                .then(response => {
                    const result = response.data;
                    if (result.code == 0) {
                        that.pageTotal = result.data.total;
                        that.stockDataList = result.data.records;
                    } else {
                        this.$message.error('商品库存获取失败！');
                    }
                }).catch(err => {
                    that.$alert(err, "警告", {
                        confirmButtonText: "确定"
                    })
                })
        },
        //查询
        inquire() {
            this.pageNum = 1;
            this.merchantStockList();
            this.$store.commit('setSearchList',{
                hotelId: this.hotelId,
                prodCode: this.prodCode,
                isSafe:this.isSafe
            })
        },
        //当前页
        current() {
            this.pageNum = this.currentPage;
            this.merchantStockList();
        },
        //上一页
        prev() {
            this.pageNum = this.pageNum - 1;
            this.merchantStockList();
        },
        //下一页
        next() {
            this.pageNum = this.pageNum + 1;
            this.merchantStockList();
        }
    }
}
</script>

<style lang="less" scoped>
.stocklist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

<style lang="less">
  .el-table .noSafe {
    color: #f00;
  }

</style>

