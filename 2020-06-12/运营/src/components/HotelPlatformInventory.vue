<template>
    <div class="HotelPlatformInventory">
      <el-form :model="query" ref="query" :inline="true" align=left class="searchform">

            <el-form-item label="酒店名称" prop="inquireHotel">
                <el-select
                    v-model="query.inquireHotel"
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
            <el-form-item label="商品名称" prop="inquireProdName">
                <el-select
                    v-model="query.inquireProdName"
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loadingP"
                    @focus="getProdList()"
                    placeholder="请选择">
                    <el-option v-for="item in prodList" :key="item.id" :label="item.prodName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否低于安全库存" prop="inquireState">
                <el-select v-model="query.inquireState">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="0"></el-option>
                    <el-option label="否" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
                <!-- <el-button class="resetbtn" type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button> -->
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table
            :data="inventoryDataList"
            border
            stripe
            style="width:100%;"
            :row-class-name="noSafeClass">
            <el-table-column fixed prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品名称"></el-table-column>
            <el-table-column prop="totalProdAmount" label="总库存"></el-table-column>
            <el-table-column prop="cabProdAmount" label="迷你吧库存"></el-table-column>
            <el-table-column prop="invProdAmount" label="仓库库存"></el-table-column>
            <el-table-column prop="prodSafeCount" label="安全库存" align=center></el-table-column>
            <!-- <el-table-column prop="prodAmount" label="实际库存数量" align=center></el-table-column> -->
            <el-table-column fixed="right" prop="isSafe" label="是否低于安全库存" align=center>
                <template slot-scope="scope">{{scope.row.isSafe == '0' ?'是':'否'}}</template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="pageSize"
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
    name: 'HotelPlatformInventory',
    components:{
        resetButton
    },
    data(){
        return{
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            currentPage: 1, //默认当前页码
            pageNum: 1,   //实际当前页码
            encryptedOrgId: '',
            loadingH: false,
            loadingP: false,
            prodList:[],  //商品列表
            inventoryDataList: [],
            hotelList:[],

            query:{
               inquireHotel:'',
               inquireProdName: '',
               inquireState: '',
            }

        }
    },
    mounted(){
        // this.encryptedOrgId = localStorage.getItem('orgId');
        this.encryptedOrgId = this.$route.params.orgId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                 this.query[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getProdList();
        this.HotelPlatformInventory();
    },
    methods: {
        resetFunc(){
            this.query.inquireHotel = ''
            this.query.inquireProdName = ''
            this.query.inquireState = ''
            this.HotelPlatformInventory();
        },
      //重置
       resetbtn(query){
         this.$refs[query].resetFields();
       },


        //库存列表
        HotelPlatformInventory(){
            const params = {
                orgAs:2,
                hotelId: this.query.inquireHotel,
                prodCode: this.query.inquireProdName,
                isSafe: this.query.inquireState,
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            };
            // console.log(params);
            this.$api.checkstock({params})
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.inventoryDataList = result.data.records;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('库存列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },


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
                isNeedInv:1,
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
                                id: item.prodCode,
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


        //查询
        inquire(){
            this.pageNum = 1;
            this.HotelPlatformInventory();
            this.$store.commit('setSearchList',{
                inquireHotel: this.query.inquireHotel,
                inquireProdName: this.query.inquireProdName,
                inquireState:this.query.inquireState
            })
        },
        //低库存状态-样式
        noSafeClass({row, rowIndex}){
            const noSafeState = row.isSafe;
            if(noSafeState == 0){
                return 'noSafe'
            }else{
                return ''
            }
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.HotelPlatformInventory();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.HotelPlatformInventory();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.HotelPlatformInventory();
        },
    },
}
</script>

<style>
.el-table .noSafe{
    color: #f00;
}
</style>

<style lang="less" scoped>
.HotelPlatformInventory{
    .pagination{
        margin-top: 20px;
    }
    .resetbtn.el-button--primary{
        background-color: #71a8e0;
        border-color: #71a8e0;
    }

}
</style>

