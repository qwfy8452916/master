<template>
    <div class="godownentrylist">
        <el-form :model="query" ref="query" :inline="true" align=left class="searchform">

            <el-form-item label="出库单编号" prop="inquireGodownEntryId">
                <el-input v-model="query.inquireGodownEntryId"></el-input>
            </el-form-item>

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
            <!-- <el-form-item label="供应商名称" prop="inquireSupplierName">
                <el-input v-model="query.inquireSupplierName"></el-input>
            </el-form-item> -->
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
            <el-form-item label="类型" prop="typeId">
                <el-select v-model="query.typeId" @change="leixing">
                    <el-option v-for="item in typedata" :key="item.dictValue" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>

            <!-- <el-form-item label="入驻商名称" prop="checkinValue">
                <el-select
                    :disabled="disabledjudge"
                    v-model="query.checkinValue"
                    filterable
                    remote
                    :remote-method="remoteMer"
                    :loading="loadingR"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in MerchantList"
                        :key="item.id"
                        :label="item.merchantName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> -->

            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
                <!-- <el-button class="resetbtn" type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button> -->
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>

        <el-table :data="HotelGodownEntryDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="invOutCode" label="入库单编号" width="120px" align=center></el-table-column>
            <el-table-column prop="ownerOrgKind" label="类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.ownerOrgKind == '2'">平台商品</span>
                    <span v-if="scope.row.ownerOrgKind == '3'">自营商品</span>
                    <span v-if="scope.row.ownerOrgKind == '5'">入驻商品</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="merName" label="入驻商名称"></el-table-column> -->
            <el-table-column prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="supplName" label="商品所有人组织名称" align=center></el-table-column>
            <el-table-column prop="outTime" label="出库日期" width="160px" align=center></el-table-column>
            <el-table-column prop="lastUpdatedByName" label="操作人姓名" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" width="160px" align=center></el-table-column>
            <el-table-column v-if="authzData['F:BO_INV_ALLOUT_VIEW']" fixed="right" label="操作" width="120px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="lookDetail(scope.row.id)">查看详情</el-button>
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
    name: 'alloutorderlist',
    components:{
        resetButton
    },
    data(){
        return{
            authzData: '',
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            typedata:[],
            disabledjudge:true,
            loadingH: false,
            loadingR: false,
            loadingP: false,
            MerchantList:[],
            hotelList:[],
            prodList:[],
            HotelGodownEntryDataList: [],
            query:{
               inquireGodownEntryId: '',
               inquireHotel:'',
               inquireProdName:'',
              //  inquireSupplierName: '',
               inquireTime: [],
               typeId:"",
              //  checkinValue:"",
               currentPage:''
            }

        }
    },
    created(){
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
        this.getType();
        this.getHotelList();
        this.getProdList();
        // this.getLonganMerchant();
        this.godownEntryList();
    },
    methods: {
        resetFunc(){
            this.query.inquireGodownEntryId = ''
            this.query.inquireProdName = ''
            this.query.inquireHotel = ''
            this.query.inquireTime = []
            this.query.typeId = ''
            this.godownEntryList();
        },
      //获取类型
        getType(){
          let that=this;
          let params={
             key:'PROD_KIND',
             orgId:0
          }
          this.$api.basicDataItems(params).then(response=>{
             if(response.data.code=='0'){
                that.typedata=response.data.data
                const allType={
                  dictName:"全部",
                  dictValue:""
                }
                that.typedata.unshift(allType)
             }else{
               that.$alert(response.data.msg,"警告",{
                 confirmButtonText:"确定"
               })
             }
          }).catch(error=>{
            that.$alert(error,"警告",{
              confirmButtonText:"确定"
            })
          })
        },


      //重置
      resetbtn(query){
        this.$refs[query].resetFields();
      },

      //选择类型
        leixing(e){

          if(e==5){
            this.disabledjudge=false
          }else{
            this.disabledjudge=true
            // this.checkinValue=""
          }
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


        //获取入驻商列表
        // getLonganMerchant(rName){
        //     let that=this;
        //     console.log(rName)
        //     if(rName==undefined){
        //        rName='';
        //     }
        //     this.loadingR = true;
        //     const params = {
        //         orgAs: 2,
        //         name: rName,
        //         pageNo: 1,
        //         pageSize: 50
        //     };
        //     this.$api.getLonganMerchant(params)
        //         .then(response => {
        //             that.loadingR = false;
        //             const result = response.data;
        //             if(result.code == 0){
        //                 that.MerchantList = result.data.records.map(item => {
        //                     return{
        //                         id: item.id,
        //                         merchantName: item.merchantName
        //                     }
        //                 })
        //                 const merAll = {
        //                     id: '',
        //                     merchantName: '全部'
        //                 };
        //                 that.MerchantList.unshift(merAll);
        //             }else{
        //                 that.$message.error(result.msg);
        //             }
        //         })
        //         .catch(error => {
        //             that.$alert(error,"警告",{
        //                 confirmButtonText: "确定"
        //             })
        //         })
        // },
        // remoteMer(val){
        //     this.getLonganMerchant(val);
        // },

        //入库单列表
        godownEntryList(){
            if(this.query.inquireTime == null){
                this.query.inquireTime = [];
            }
            const params = {
                orgAs:'',
                invOutCode: this.query.inquireGodownEntryId,
                hotelId:this.query.inquireHotel,
                prodCode:this.query.inquireProdName,
                outTimeStart: this.query.inquireTime[0],
                outTimeEnd: this.query.inquireTime[1],
                // supplName: this.query.inquireSupplierName,
                ownerOrgKind:this.query.typeId,
                // merId:this.query.checkinValue,
                pageNo: this.pageNum,
                pageSize: 10
            };

            this.$api.outhouselist({params})
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.HotelGodownEntryDataList = result.data.records;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('入库单列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },


        //商品列表
        getProdList(pName){
            this.loadingP = true;
            const params = {
                orgAs: "",
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
            this.godownEntryList();
            this.$store.commit('setSearchList',{
                inquireGodownEntryId: this.query.inquireGodownEntryId,
                inquireProdName: this.query.inquireProdName,
                inquireHotel: this.query.inquireHotel,
                inquireTime: this.query.inquireTime,
                typeId: this.query.typeId
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.godownEntryList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.godownEntryList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.godownEntryList();
        },
        //查看商品明细
        lookDetail(id){
            this.query.currentPage=this.currentPage
            let query=this.query
            this.$router.push({name: 'alloutorderdetail', query: {id,query}});
        },

    }
}
</script>

<style lang="less" scoped>
.godownentrylist{
    .pagination{
        margin-top: 20px;
    }
    .resetbtn.el-button--primary{
        background-color: #71a8e0;
        border-color: #71a8e0;
    }
}
</style>

