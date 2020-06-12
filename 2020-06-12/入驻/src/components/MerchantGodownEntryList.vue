<template>
  <div class="godownentrylist">
    <el-form :inline="true" align=left class="searchform">
      <el-form-item label="酒店名称">
        <el-select class="termput"
          v-model="hotelId"
          filterable
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getHotelList()"
          placeholder="请选择">
          <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="inquireProdName">
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
            </el-form-item>
      <el-form-item label="状态">
        <el-select class="termput" v-model="reviewStatus" placeholder="请选择">
          <el-option v-for="item in reviewStatusList" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收货日期">
        <el-date-picker
            v-model="receiveTime"
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
      <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
    </el-form>
    <el-table :data="godownEntryDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="invInCode" label="入库单id" width="120px" align=center></el-table-column>
      <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
      <el-table-column prop="receiveTime" label="收货日期" width="160px" align=center></el-table-column>
      <el-table-column prop="lastUpdatedByName" label="操作人姓名" align=center></el-table-column>
      <el-table-column prop="createdAt" label="添加时间" width="160px" align=center></el-table-column>
      <el-table-column prop="invInRemark" label="说明"></el-table-column>
      <el-table-column prop="reviewStatus" label="审核状态" width="80px" align=center>
        <template slot-scope="scope">
          <span v-if="scope.row.reviewStatus == 0">驳回</span>
          <span v-if="scope.row.reviewStatus == 1">通过</span>
          <span v-if="scope.row.reviewStatus == 2">待审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="isActive" label="是否有效" align=center>
          <template slot-scope="scope">
              <span v-if="scope.row.isActive == 0">无效</span>
              <span v-if="scope.row.isActive == 1">有效</span>
          </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align=center>
        <template slot-scope="scope">
          <el-button v-if="scope.row.reviewStatus==2 && authzData['F:BM_INV_WAREHOUSINGTRIAL']" type="text" size="small" @click="examineDetail(scope.row.wfId)">审核进度</el-button>
          <el-button v-if="authzData['F:BM_INV_WAREHOUSINGCHECK']" type="text" size="small" @click="godownEntryDetail(scope.row.id)">查看详情</el-button>
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
    name: 'MerchantGodownEntryList',
    components:{
        resetButton
    },
    data() {
        return {
            authzData:'',
            loadingP: false,
            merOrgId: '',//加密的运营商组织ID
            hotelList: [], //酒店列表
            prodList:[],
            hotelId: '',  //酒店ID
            reviewStatus: "", // 审核状态
            inquireProdName:"", //选中商品
            receiveTimeStart: "",  //收货时间区间起始
            receiveTimeEnd: "",  //收货时间区间截止
            receiveTime: [],   //收货时间区间
            //分页
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            //结果数据
            godownEntryDataList: [], //入库单存列表
            reviewStatusList: [
                {"key": "", "value": "全部"},
                {"key": 2, "value": "待审核"},
                {"key": 1, "value": "通过"},
                {"key": 0, "value": "驳回"}
            ],
            loadingH: false,
        }
    },
    created(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    mounted() {
    //   this.merOrgId = localStorage.orgId;
    //   this.merOrgId = this.$route.params.orgId;
    if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
      this.getHotelList();
      this.getProdList();
      this.godownEntryList();
    },
    methods: {
        resetFunc(){
            this.hotelId = ''
            this.inquireProdName = ''
            this.reviewStatus = ''
            this.receiveTime = []
            this.godownEntryList();
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
        //入库单列表
        godownEntryList() {
            let that = this;
            if(!that.outTime){
                that.outTime = [];
            }
            const params = {
                // encryptedOrgId: that.merOrgId,
                orgAs: 5,
                hotelId: that.hotelId,
                reviewStatus: that.reviewStatus,
                prodCode:that.inquireProdName,
                receiveTimeStart: that.receiveTime[0],
                receiveTimeEnd: that.receiveTime[1],
                pageNo: that.pageNum,
                pageSize: that.pageSize
            };
            this.$api.godownEntryList(params)
                .then(response => {
                    const result = response.data;
                    if (response.data.code == '0') {
                        that.pageTotal = result.data.total;
                        that.godownEntryDataList = result.data.records;
                    } else {
                        this.$message.error('入库单列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error, "警告", {
                        confirmButtonText: "确定"
                    })
            })
        },

        //商品列表
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

        //查询按钮
        inquire() {
            this.pageNum = 1;
            this.godownEntryList();
            this.$store.commit('setSearchList',{
                hotelId: this.hotelId,
                inquireProdName: this.inquireProdName,
                reviewStatus: this.reviewStatus,
                receiveTime:this.receiveTime
            })
        },
        //页面跳转
        current() {
            this.pageNum = this.currentPage;
            this.godownEntryList();
        },
        //上一页
        prev() {
            this.pageNum = this.pageNum - 1;
            this.godownEntryList();
        },
        //下一页
        next() {
            this.pageNum = this.pageNum + 1;
            this.godownEntryList();
        },
        //查看详情
        godownEntryDetail(id) {
            this.$router.push({name: 'MerchantGodownEntryDetail', query: {id}});
        },
        //审核
        godownEntryAudit(id) {
            this.$router.push({name: 'DealerWarehousingenter', query: {id}});
        },
        //审核详情
       examineDetail(id) {
            this.$router.push({name:'MerchantProcessDetails',query:{id: id}});
        },
    }
}
</script>

<style lang="less" scoped>
  .godownentrylist {
    .pagination{
        margin-top: 20px;
    }
  }
</style>

