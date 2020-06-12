<template>
    <div class="PlatformoutOrderlist">
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
            <!-- <el-form-item label="供应商名称" prop="suppliername">
                <el-input v-model="query.suppliername"></el-input>
            </el-form-item> -->
            <el-form-item label="状态" prop="inquireState">
                <el-select v-model="query.inquireState">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="驳回" value="0"></el-option>
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="待审核" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出库日期" prop="inquireTime">
                <el-date-picker
                    v-model="query.inquireTime"
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
            <el-table-column fixed prop="invOutCode" label="出库单编号"></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <!-- <el-table-column prop="supplName" label="供应商名称" align=center></el-table-column> -->
            <el-table-column prop="outTime" label="出库日期" align=center></el-table-column>
            <el-table-column prop="consigneePhone" label="联系电话" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" align=center></el-table-column>
            <el-table-column prop="invOutRemark" label="说明" align=center></el-table-column>
            <el-table-column prop="reviewStatus" label="审核状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.reviewStatus == '0'">驳回</span>
                    <span v-if="scope.row.reviewStatus == '1'">通过</span>
                    <span v-if="scope.row.reviewStatus == '2'">待审核</span>
                </template>
            </el-table-column>
            <el-table-column prop="isActive" label="审核状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isActive == 0">无效</span>
                    <span v-if="scope.row.isActive == 1">有效</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_INV_OPROUT_REVIEWPROGRESS'] && scope.row.reviewStatus==2" type="text" size="small" @click="examineDetail(scope.row.wfId)">审核进度</el-button>
                    <el-button v-if="authzData['F:BO_INV_OPROUT_VIEW']" type="text" size="small" @click="lookDetail(scope.row.id)">查看详情</el-button>
                </template>
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
    name: 'PlatformoutOrderlist',
    components:{
        resetButton
    },
    data(){
        return{
            authzData: '',
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            currentPage: 1, //默认当前页码
            pageNum: 1,   //实际当前页码
            inventoryDataList: [],
            hotelList:[],
            prodList:[],

            loadingH: false,
            loadingP:false,
            query:{
               inquireHotel:'',
               inquireProdName:'',
              //  suppliername: '',
               inquireState: '',
               inquireTime: [],
               currentPage:'',
            }
        }
    },
    create(){
       if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.currentPage=this.$route.query.query.currentPage
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})

        if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.query=this.$route.query.query;
            this.pageNum=this.$route.query.query.currentPage
        }
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                 this.query[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getProdList();
        this.PlatformoutOrderlist();
    },
    methods: {
        resetFunc(){
            this.query.inquireHotel = ''
            this.query.inquireProdName = ''
            this.query.inquireState = ''
            this.query.inquireTime = []
            this.PlatformoutOrderlist();
        },
        //重置
        resetbtn(query){
          this.$refs[query].resetFields();
        },

        //列表
        PlatformoutOrderlist(){
            const params = {
                orgAs:2,
                hotelId: this.query.inquireHotel,
                prodCode:this.query.inquireProdName,
                reviewStatus:this.query.inquireState,
                outTimeStart:this.query.inquireTime[0],
                outTimeEnd:this.query.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            };
            this.$api.outhouselist({params})
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
            this.pageNum=1;
            this.currentPage=1;
            this.PlatformoutOrderlist();
            this.$store.commit('setSearchList',{
                inquireHotel: this.query.inquireHotel,
                inquireProdName: this.query.inquireProdName,
                inquireTime: this.query.inquireTime,
                inquireState:this.query.inquireState
            })
        },

       //查看详情

       lookDetail(id){
         this.query.currentPage=this.currentPage
        let query=this.query
        this.$router.push({name:'PlatformoutOrderdetail',query:{id,query}})
       },

       //审核详情
       examineDetail(id) {
            this.$router.push({name:'LonganProcessDetails',query:{id: id}});
        },

        //低库存状态-样式
        noSafeClass({row, rowIndex}){
            const noSafeState = row.isSafe;
            if(noSafeState < 0){
                return 'noSafe'
            }else{
                return ''
            }
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.PlatformoutOrderlist();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.PlatformoutOrderlist();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.PlatformoutOrderlist();
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
.PlatformoutOrderlist{
    .pagination{
        margin-top: 20px;
    }
    .resetbtn.el-button--primary{
        background-color: #71a8e0;
        border-color: #71a8e0;
    }
}
</style>

