<template>
    <div class="hotelproInventorylist">
        <el-form :inline="true" :model="query" ref="query" align=left class="searchform">
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
            <el-form-item label="类型" prop="typeId">
                <el-select v-model="query.typeId" @change="leixing">
                    <el-option v-for="item in typedata" :key="item.dictValue" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="入驻商名称" prop="checkinValue">
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
            <el-table-column fixed prop="prodOwnerOrgKind" label="类型" align="center">
               <template slot-scope="scope">
                   <span v-if="scope.row.prodOwnerOrgKind=='2'">平台商品</span>
                   <span v-if="scope.row.prodOwnerOrgKind=='3'">酒店商品</span>
                   <span v-if="scope.row.prodOwnerOrgKind=='5'">入驻商品</span>
               </template>
            </el-table-column>
            <el-table-column prop="prodProductDTO.merName" label="入驻商名称" align="center"></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="totalProdAmount" label="总库存" align="center"></el-table-column>
            <el-table-column prop="cabProdAmount" label="迷你吧库存" align="center"></el-table-column>
            <el-table-column prop="invProdAmount" label="仓库库存" align="center"></el-table-column>
            <el-table-column prop="prodSafeCount" label="安全库存" align=center></el-table-column>
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
    name: 'hotelproInventorylist',
    components:{
        resetButton
    },
    data(){
        return{
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            currentPage: 1, //默认当前页码
            pageNum: 1,   //实际当前页码
            prodList:[],  //商品列表数据
            inventoryDataList: [],
            hotelList:[],
            typedata:[],
            MerchantList:[],

            disabledjudge:true,
            loadingH: false,
            loadingP: false,
            loadingR: false,
            query:{
               inquireHotel:'',
               inquireProdName: '',
               inquireState: '',
               typeId:"",   //选择类型ID
               checkinValue:"",   //选择入驻商ID
            }

        }
    },
    mounted(){
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                 this.query[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getProdList();
        this.getType();
        this.getLonganMerchant();
        this.hotelproInventorylist();
    },

    methods: {
        resetFunc(){
            this.query.inquireHotel = ''
            this.query.inquireProdName = ''
            this.query.inquireState = ''
            this.query.typeId = ''
            this.query.checkinValue = ''
            this.hotelproInventorylist();
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
            this.checkinValue=""
          }
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



        //库存列表
        hotelproInventorylist(){
            const params = {
                orgAs:'',
                hotelId: this.query.inquireHotel,
                prodCode: this.query.inquireProdName,
                isSafe: this.query.inquireState,
                prodOwnerOrgKind:this.query.typeId,
                merId:this.query.checkinValue,
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            };
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
                orgAs: '',
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

         //获取入驻商列表
        getLonganMerchant(rName){
            let that=this;
            console.log(rName)
            if(rName==undefined){
               rName='';
            }
            this.loadingR = true;
            const params = {
                orgAs: 2,
                name: rName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.getLonganMerchant(params)
                .then(response => {
                    that.loadingR = false;
                    const result = response.data;
                    if(result.code == 0){
                        that.MerchantList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                merchantName: item.merchantName
                            }
                        })
                        const merAll = {
                            id: '',
                            merchantName: '全部'
                        };
                        that.MerchantList.unshift(merAll);
                    }else{
                        that.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        remoteMer(val){
            this.getLonganMerchant(val);
        },

        //查询
        inquire(){
            this.pageNum = 1;
            this.hotelproInventorylist();
            this.$store.commit('setSearchList',{
                inquireHotel: this.query.inquireHotel,
                inquireProdName: this.query.inquireProdName,
                inquireState: this.query.inquireState,
                typeId: this.query.typeId,
                checkinValue: this.query.checkinValue
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
            this.hotelproInventorylist();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.hotelproInventorylist();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.hotelproInventorylist();
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
.hotelproInventorylist{
    .pagination{
        margin-top: 20px;
    }
    .resetbtn.el-button--primary{
        background-color: #71a8e0;
        border-color: #71a8e0;
    }
}
</style>

