<template>
    <div class="commoditymanage">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店">
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
            <el-form-item label="形式">
              <el-select v-model="prodType">
                 <el-option label="全部" value=""></el-option>
                 <el-option label="实物" value="1"></el-option>
                 <el-option label="电子" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品">
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
            <el-form-item label="类型">
                <el-select v-model="inquireCommodityType" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="平台商品" value="2"></el-option>
                    <el-option label="自营商品" value="3"></el-option>
                    <el-option label="入驻商品" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <!-- <div><el-button class="addbutton" @click="addBtn">添加酒店入驻商品</el-button></div> -->
        <div><el-button class="addbutton" @click="addHotelMerProd">添加酒店入驻商品</el-button></div>
        <el-table :data="CommodityDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="ID" min-width="80px" align=center></el-table-column>
            <el-table-column prop="hotelName" label="酒店" min-width="200px"></el-table-column>
            <!-- <el-table-column prop="marketList" label="市场分类" width="120px"></el-table-column> -->
            <el-table-column prop="prodLogoUrl" label="商品图片" min-width="80px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.prodLogoUrl" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品" min-width="240px"></el-table-column>
            <el-table-column prop="prodShowName" label="显示名称" min-width="240px"></el-table-column>
            <el-table-column prop="prodProductDTO.prodCode" label="商品编码" min-width="140px" align=center></el-table-column>
            <el-table-column label="商品形式" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.prodType == 1">实物</span>
                    <span v-if="scope.row.prodType == 2">电子</span>
                </template>
            </el-table-column>
            <el-table-column prop="prodKindName" label="类型" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodSupplName" label="供应商" min-width="160px"></el-table-column>
            <el-table-column prop="prodProductDTO.prodWarrantyPeriod" label="保质期" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodUnitMeasure" label="单位" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodSupplyPrice" label="供货价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodRetailPrice" label="零售价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="specQty" label="规格数量" min-width="80px" align=center></el-table-column>
            <el-table-column prop="delivWayNames" label="配送方式" min-width="160px">
            </el-table-column>
            <el-table-column prop="prodSafeCount" label="安全库存" min-width="80px" align=center></el-table-column>
            <el-table-column prop="availableSaleQty" label="可售数量" min-width="80px" align=center></el-table-column>
            <el-table-column prop="reviewStatus" label="审核状态" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.reviewStatus == 0">驳回</span>
                    <span v-if="scope.row.reviewStatus == 1">通过</span>
                    <span v-if="scope.row.reviewStatus == 2">待审核</span>
                </template>
            </el-table-column>

            <!-- <el-table-column v-if="authzData['F:BO_HOTEL_PROD_ONLINE']" prop="onShelfProd" label="商城上架" align=center>
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.onShelfProd" @change="updateStatus(scope.row.id, scope.row.onShelfProd)"></el-switch>
                </template>
            </el-table-column> -->
            <el-table-column prop="isActive" label="是否有效" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isActive == 0">否</span>
                    <span v-if="scope.row.isActive == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdByName" label="创建人" min-width="100px"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" min-width="160px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="200px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="hotelAllCommodityDetail(scope.row.id)">详情</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_PROD_EDIT']" type="text" size="small" @click="hotelAllCommodityModify(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="hotelAllCommodityDelete(scope.row.id)">移除</el-button>
                    <el-button v-if="scope.row.prodProductDTO.isSupportSpec == 1" type="text" size="small" @click="hotelAllProdSpecs(scope.row.id)">规格管理</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>确定要移除此酒店商品吗？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
        <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
        <!-- <el-dialog :visible.sync="dialogProdVisible" :close-on-click-modal="false" width="80%">
            <el-form :inline="true" align=left>
                <el-form-item label="酒店">
                  <el-select
                      v-model="diainquireHotel"
                      filterable
                      remote
                      :remote-method="remoteHotel"
                      :loading="loadingH"
                      @focus="getHotelList()"
                      placeholder="请选择">
                      <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="供应商">
                <el-select
                    v-model="diamerchant"
                    filterable
                    remote
                    :remote-method="remoteMer"
                    :loading="loadingR"
                    @focus="getLonganMerchant()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in MerchantList"
                        :key="item.id"
                        :label="item.merchantName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="inquireHotelProd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="inquireProd">查&nbsp;&nbsp;询</el-button>
                </el-form-item>
                <el-form-item>
                    <resetButton @resetFunc='diaresetFunc'/>
                </el-form-item>
            </el-form>
            <el-form :model="prodFormData" :rules="prodFormData.rules" ref="prodFormData">
                <el-table
                    :data="prodFormData.prodTableData"
                    border
                    stripe
                    @selection-change="selectUnusedProdChange"
                    style="width:100%;" >
                    <el-table-column type="selection" width="40px"></el-table-column>
                    <el-table-column prop="id" label="ID" align=center></el-table-column>
                    <el-table-column prop="prodProductDTO.prodLogoUrl" label="商品图片" align=center></el-table-column>
                    <el-table-column prop="prodProductDTO.prodName" label="商品名称" align=center></el-table-column>
                    <el-table-column prop="prodShowName" label="显示名称" align=center>
                    </el-table-column>
                    <el-table-column prop="prodProductDTO.prodCode" label="商品编码" align=center></el-table-column>
                    <el-table-column prop="prodType" label="商品形式" align=center>
                       <template slot-scope="scope">
                          <span v-if="scope.row.prodType==1">实物</span>
                          <span v-if="scope.row.prodType==2">电子</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prodProductDTO.prodSupplName" label="供应商" align=center></el-table-column>
                    <el-table-column prop="prodProductDTO.prodWarrantyPeriod" label="保质期" align=center></el-table-column>
                    <el-table-column prop="prodProductDTO.prodUnitMeasure" label="单位" align=center></el-table-column>
                    <el-table-column prop="prodSupplyPrice" label="供货价" align=center></el-table-column>
                    <el-table-column prop="prodRetailPrice" label="零售价" width="100px" align=center></el-table-column>
                    <el-table-column prop="specQty" label="规格数量" min-width="80px" align=center></el-table-column>
                    <el-table-column fixed="right" prop="delivWayNames" label="配送方式" align=center>
                    </el-table-column>
                    <el-table-column fixed="right" prop="prodSafeCount" label="安全库存" width="100px" align=center></el-table-column>
                    <el-table-column fixed="right" prop="prodAdvisePrice" label="建议零售价" width="120px" align=center>
                        <template slot-scope="scope">
                            <el-form-item :prop="'prodTableData.'+scope.$index+'.prodAdvisePrice'" :rules="prodFormData.rules.prodAdvisePrice">
                                <el-input v-model="scope.row.prodAdvisePrice"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table><br/><br/>
                <div class="pagination">
                    <LonganPagination :pageTotal="diapageTotal" @pageFunc="diapageFunc" />
                </div>
                <el-form-item class="niutbn">
                    <el-button @click="dialogProdVisible=false">取消</el-button>
                    <el-button type="primary" @click="EnsureAdd('prodFormData')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog> -->
        <el-dialog :visible.sync="dialogProdVisible" :close-on-click-modal="false" width="86%">
            <div style="text-align: left; margin: -40px 0px 20px 0px; border-bottom: 1px solid #ddd;padding-bottom: 20px;">
                <span>酒店&nbsp;&nbsp;&nbsp;</span>
                <el-select
                    v-model="hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    @change="selectedHotel"
                    placeholder="请选择">
                    <el-option v-for="item in merPHotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
            </div>
            <el-form :inline="true" align=left>
                <el-form-item label="供应商">
                    <el-select
                        v-model="inquireMerId"
                        filterable
                        remote
                        :remote-method="remoteMer"
                        :loading="loadingM"
                        @focus="getMerList()"
                        placeholder="请选择">
                        <el-option v-for="item in merList" :key="item.id" :label="item.merchantName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="inquireHotelProd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="inquireProd">查&nbsp;&nbsp;询</el-button>
                </el-form-item>
                <el-form-item>
                    <resetButton @resetFunc='merResetFunc'/>
                </el-form-item>
            </el-form>
            <el-form :model="prodFormData" :rules="prodFormData.rules" ref="prodFormData">
                <el-table
                    :data="prodFormData.unusedHotelProdList"
                    border
                    stripe
                    @selection-change="selectUnusedProdChange"
                    style="width:100%;" >
                    <el-table-column fixed type="selection" width="40px"></el-table-column>
                    <el-table-column prop="id" label="ID" min-width="80px" align=center></el-table-column>
                    <el-table-column prop="prodLogoUrl" label="商品图片" min-width="80px" align=center>
                        <template slot-scope="scope">
                            <img :src="scope.row.prodLogoUrl" alt="" style="width:45px;height:35px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="prodName" label="商品名称" min-width="200px"></el-table-column>
                    <el-table-column prop="prodShowName" label="显示名称" min-width="240px">
                        <template slot-scope="scope">
                            <el-form-item :prop="'unusedHotelProdList.'+scope.$index+'.prodShowName'" :rules="prodFormData.rules.prodShowName">
                                <el-input v-model="scope.row.prodShowName"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prodCode" label="商品编码" min-width="140px" align=center></el-table-column>
                    <el-table-column prop="prodType" label="商品形式" min-width="80px" align=center>
                    <template slot-scope="scope">
                        <span v-if="scope.row.prodType==1">实物</span>
                        <span v-if="scope.row.prodType==2">电子</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="prodSupplName" label="供应商" min-width="100px"></el-table-column> -->
                    <el-table-column prop="merName" label="供应商" min-width="100px"></el-table-column>
                    <el-table-column prop="prodWarrantyPeriod" label="保质期" min-width="80px" align=center></el-table-column>
                    <el-table-column prop="prodUnitMeasure" label="单位" min-width="80px" align=center></el-table-column>
                    <el-table-column prop="prodSupplyPrice" label="供货价" min-width="80px" align=center></el-table-column>
                    <el-table-column prop="prodRetailPrice" label="零售价" width="100px" align=center></el-table-column>
                    <el-table-column prop="specQty" label="规格数量" min-width="80px" align=center></el-table-column>
                    <el-table-column prop="delivWayNames" label="配送方式" min-width="140px"></el-table-column>
                    <el-table-column prop="prodSafeCount" label="安全库存" min-width="80px" align=center></el-table-column>
                    <!-- <el-table-column prop="prodMarketPrice" label="划线价(元)" width="100px" align=center></el-table-column> -->
                    <el-table-column fixed="right" prop="prodAdvisePrice" label="建议零售价" min-width="120px" align=center>
                        <template slot-scope="scope">
                            <el-form-item :prop="'unusedHotelProdList.'+scope.$index+'.prodAdvisePrice'" :rules="prodFormData.rules.prodAdvisePrice">
                                <el-input v-model="scope.row.prodAdvisePrice"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table><br/><br/>
                <el-form-item>
                    <el-button @click="dialogProdVisible=false">取消</el-button>
                    <el-button type="primary" :disabled="isSubmit" @click="EnsureAdd('prodFormData')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from './resetButton'
import LonganPagination from '@/components/LonganPagination'
export default {
    name: 'LonganHotelAllCommodityList',
    components: {
        LonganPagination,
        resetButton
    },
    data(){
        var priceReg = /^\d+(\.\d+)?$/
        var validatePrice = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return {
            authzData: '',
            // orgId: '',
            hotelList: [],
            inquireHotelName: '',
            prodType:'',
            prodList: [],
            inquireProdName: '',
            inquireCommodityType: '',
            CommodityDataList: [],
            hotelProdId: '',
            dialogVisibleDelete: false,
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
            dialogProdVisible: false,
            loadingH: false,
            loadingP: false,
            loadingR:false,
            diapageTotal:0, //弹窗总条数
            diapageSize: 5,
            inquireMerId: '',
            merList: [],
            loadingM: false,
            inquireHotelProd: '',
            prodFormData:{
                prodTableData:[
                    {

                    }
                ],
                rules: {
                    prodShowName: [
                        {required: true, message: '请输入显示名称', trigger: 'blur'},
                        {min: 1, max: 50, message: '显示名称请保持在50个字符以内', trigger: ['blur','change']}
                    ],
                    prodAdvisePrice: [
                        { validator: validatePrice, trigger: ['blur','change'] }
                    ]
                },
                unusedHotelProdList: [
                    // {
                    //     // marketType: []
                    // }
                ]
            },
            selectedProdList: [],
            isSubmit: false,
            hotelId: '',
            merPHotelList: [],
            MerchantList:[],
            inquireHotelProd:'',
            diainquireHotel:'',
            diamerchant:'',
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getProdList();
        this.hotelAllCommodityList();
        // this.diaCommodityList();
        this.getMerList();
    },
    methods: {
        //供应商-入驻商 列表
        getMerList(mName){
            this.loadingM = true;
            const params = {
                name: mName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.getHotelMerchant(params)
                .then(response => {
                    this.loadingM = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.merList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                merchantName: item.merchantName
                            }
                        })
                        const merAll = {
                            id: '',
                            merchantName: '全部'
                        };
                        this.merList.unshift(merAll);
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
        remoteMer(val){
            this.getMerList(val);
        },

        resetFunc(){
            this.inquireHotelName = ''
            this.prodType=''
            this.inquireProdName = ''
            this.inquireCommodityType = ''
            this.hotelAllCommodityList();
        },
        // diaresetFunc(){
        //   this.inquireHotelProd=""
        //   this.diainquireHotel=""
        //   this.diamerchant=""
        //   // this.hotelAllCommodityList();
        // },
        merResetFunc(){
            this.inquireMerId = ''
            this.inquireHotelProd = ''
            this.hotelProdAdd();
        },

        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.hotelAllCommodityList();
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
                        this.merPHotelList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName
                            }
                        })
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

        //酒店所有商品列表
        hotelAllCommodityList(){
            const params = {
                orgAs: '',
                hotelId: this.inquireHotelName,
                prodType:this.prodType,
                prodCode: this.inquireProdName,
                prodOwnerOrgKind: this.inquireCommodityType,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            this.$api.hotelPlatCommodityList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.CommodityDataList = result.data.records;
                        this.pageTotal = result.data.total;
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

        //修改上架状态
        updateStatus(id,value){
            // console.log(value);
            const params = {};
            this.$api.hotelPlatCommodityStatus(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(value){
                            this.$message.success('商品上架成功！');
                        }else{
                            this.$message.success('商品下架成功！');
                        }
                    }else{
                        if(value){
                            this.$message.error('商品上架失败！');
                            this.CommodityDataList.onShelfProd = false;
                        }else{
                            this.$message.error('商品下架失败！');
                            this.CommodityDataList.onShelfProd = true;
                        }
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },

        //获取弹窗商品列表
        diaCommodityList(){
            let that=this;
            const params = {
                orgAs: '',
                hotelId: this.inquireHotelName,
                prodType:this.prodType,
                prodCode: this.inquireProdName,
                prodOwnerOrgKind: this.inquireCommodityType,
                pageNo: this.diapageNum,
                pageSize: this.diapageSize
            };
            // console.log(params);
            this.$api.hotelPlatCommodityList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        that.prodFormData.prodTableData = result.data.records;
                        console.log(that.prodFormData.prodTableData)
                        that.diapageTotal = result.data.total;
                    }else{
                        that.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },

        //弹窗列表分页
        diapageFunc(data){
            this.diapageSize = data.pageSize;
            this.diapageNum = data.pageNum;
            this.diaCommodityList();
        },

         //获取入驻商列表
        getLonganMerchant(rName){
            let that=this;
            // console.log(rName)
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

        //添加酒店入驻商品
        addHotelMerProd(){
            this.hotelId = '';
            this.prodFormData.unusedHotelProdList = [];
            this.dialogProdVisible = true;
        },
        selectedHotel(){
            if(this.hotelId != ''){
                this.hotelProdAdd();
            }else{
                this.$message.error('请选择酒店');
            }
        },
        //添加酒店商品
        hotelProdAdd(){
            if(this.hotelId == ''){
                // this.$message.error('请选择酒店');
                return false;
            }
            const params = {
                hotelId: this.hotelId,
                merId: this.inquireMerId,
                prodName: this.inquireHotelProd
            };
            this.$api.hotelUnusedProdList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.prodFormData.unusedHotelProdList = result.data.map(item => {
                            if(item.prodAdvisePrice == 0){
                                item.prodAdvisePrice = '';
                            }
                            // item.marketType = '';
                            return item;
                        });
                        this.dialogProdVisible = true;
                    }else{
                        this.$message.error(result.msg);
                        this.dialogProdVisible = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定添加商品
        EnsureAdd(prodFormData){
            if(this.prodFormData.unusedHotelProdList.length == 0){
                this.$message.error('请选择要添加的商品！');
                return false;
            }
            if(this.selectedProdList.length == 0){
                this.$message.error('请选择要添加的商品！');
                return false;
            }
            const addProdData = this.selectedProdList.map(item => {
                return {
                    prodCode: item.prodCode,
                    prodShowName: item.prodShowName,
                    prodAdvisePrice: item.prodAdvisePrice
                }
            });
            const params = {
                hotelId: this.hotelId,
                dtoList: addProdData
            };
            this.$refs[prodFormData].validate((valid, model) => {
                if(valid){
                    this.$api.hotelProdAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('添加酒店商品成功！');
                                this.hotelAllCommodityList();
                                this.dialogProdVisible = false;
                            }else{
                                this.$message.error(result.msg);
                                this.dialogProdVisible = false;
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!');
                    return false
                }
            })
        },
        //查询酒店商品
        inquireProd(){
            this.hotelProdAdd();
            this.$store.commit('setSearchList',{
                inquireMerId: this.inquireMerId,
                inquireHotelProd: this.inquireHotelProd,
            })
        },



        // //添加酒店商品
        // addBtn(){

        //    this.dialogProdVisible = true;
        // },

        selectUnusedProdChange(val) {
            // console.log(val);
            this.selectedProdList = val;
            // console.log(this.selectedProdList)
        },

        //详情
        hotelAllCommodityDetail(id){
            this.$router.push({name: 'LonganHotelAllCommodityDetail', query: {id}});
        },

        //修改
        hotelAllCommodityModify(id){
            this.$router.push({name: 'LonganHotelAllCommodityModify', query: {id}});
        },
        //移除
        hotelAllCommodityDelete(id){
            this.hotelProdId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const params = {};
            const id = this.hotelProdId;
             this.$api.hotelPlatProdDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('酒店商品删除成功！');
                        this.dialogVisibleDelete = false;
                        this.hotelAllCommodityList();
                    }else{
                        this.$message.error(result.msg);
                        this.dialogVisibleDelete = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //规格管理
        hotelAllProdSpecs(id){
            const pType = 'all';
            this.$router.push({name: 'LonganHotelProdSpecsList', query: {id, pType}});
        },

        // //查询酒店商品
        // inquireProd(){
        //     this.diaCommodityList();
        // },

        //查询
        inquire(){
            this.pageNum = 1;
            this.hotelAllCommodityList();
            this.$store.commit('setSearchList',{
                inquireProdName: this.inquireProdName,
                inquireHotelName: this.inquireHotelName,
                prodType:this.prodType,
                inquireCommodityType:this.inquireCommodityType
            })
        },
    }
}
</script>

<style lang="less" scoped>
.commoditymanage{
    .pagination{
        margin-top: 20px;
    }
    .niutbn{
      margin-top: 20px;
    }
}
</style>
