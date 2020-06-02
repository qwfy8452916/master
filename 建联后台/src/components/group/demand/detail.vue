<template>
    <div class="zn-demand">
        <stepBar :stepData="stepData" />
        <div class="demand-item">
            <div class="item-label">状态：</div>
            <div class="org" >{{statusText}}</div>
        </div>
        <el-form :model="demandForm" ref="demandForm" :label-position="lablePosition" label-width="120px" class="align-left">
            <h2>项目信息</h2>
            <el-row :span='24'>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="项目名称：">
                        {{demandForm.projectName}}
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="项目编码：">
                        {{demandForm.projectNo}}
                    </el-form-item>
                </el-col>
            </el-row>
            <h2>产品信息</h2>
            <el-row :span="24">
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="分类：">
                        <el-cascader
                            :options="optionsProduct"
                            :props="props"
                            v-model="demandForm.productId"
                            disabled
                        ></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="品牌：">
                        {{demandForm.productBrand}}
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="数量：">
                        {{demandForm.purchaseNum}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :span='24'>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="单位：">
                        {{demandForm.purchaseUnit}}
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="产品规格：">
                        {{demandForm.productSpec}}
                    </el-form-item>
                </el-col>
            </el-row>
            <h2>联采规则</h2>
            <el-row :span='24'>
                <el-col :xs="14" :sm="14" :md="14" :lg="9" :xl="9">
                    <el-form-item label="供应商报价截止时间：" label-width="170px">
                        {{demandForm.tenderDeadline}}
                    </el-form-item>
                    <el-form-item label="发票要求：">
                        <span>增值税发票（交易过程中涉及的开票都采用增值税发票）</span>
                    </el-form-item>
                    <el-form-item label="联采说明：">
                        {{demandForm.tenderDesc}}
                    </el-form-item>
                    <el-form-item label="附件：" prop="fileList">
                        <el-upload
                            class="upload-demo"
                            :action="this.$api.upload_file_url"
                            name='fileContent'
                            :on-preview="handlePreview"
                            multiple
                            :file-list="demandForm.fileList"
                            list-type="picture"
                            disabled>
                            <!-- <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">您可以将招标文件或其他您认为需要让报价供应商知晓的内容以附件形式上传，上传支持jpg、jpeg、gif、png、docx、xls、xlsx、pdf格式。</div> -->
                        </el-upload>
                    </el-form-item>
                    <h2>收货信息</h2>
                    <el-form-item label="收货地址：">
                        <el-cascader
                            :options="location_list"
                            :props="props"
                            v-model="demandForm.address"
                            disabled></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址：">
                        {{demandForm.shippingAddr}}
                    </el-form-item>
                    <el-form-item label="验收人姓名：">
                        {{demandForm.shippingInspector}}
                    </el-form-item>
                    <el-form-item label="验收人联系电话：" label-width="150px">
                        {{demandForm.shippingInspectorMobile}}
                    </el-form-item>
                    <el-form-item label="验收人身份证号：" label-width="150px">
                        {{demandForm.shippingInspectorIdentityCard}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :span='24'>
                    <h2>报价参考</h2>
                    <el-form-item label="报价参考方式：" prop="tenderReferenceType">
                        <el-select v-model="demandForm.tenderReferenceType" placeholder="请选择" disabled>
                            <el-option value="XB" label="西本网"></el-option>
                            <el-option value="WDGT" label="我的钢铁"></el-option>
                            <el-option value="EXTRA" label="其他"></el-option>
                        </el-select>
                    </el-form-item>
                    <div v-if="demandForm.tenderReferenceType=='EXTRA'">
                    <el-form-item label="报价参考地：">
                        {{demandForm.tenderReferenceExtraAddr}}
                    </el-form-item>
                    <el-form-item label="报价参考说明：">
                        {{demandForm.tenderReferenceExtraDesc}}
                    </el-form-item>
                    </div>
                    <div v-else>
                        <el-form-item label="报价参考地：" prop="tenderAddress">
                            <el-cascader
                                :options="optionsAdd"
                                :props="props"
                                v-model="demandForm.tenderAddress"
                                disabled
                            ></el-cascader>
                        </el-form-item>
                    </div>
                    <el-form-item label="结算方式：" prop="settleDesc">
                        {{demandForm.settleDesc}}
                    </el-form-item>
                    <h2>邀约供应商信息</h2>
                    <el-table :data="supplierFormSure" style="width: 1000px;margin-bottom:22px;">
                        <el-table-column prop="enterpriseName" label="供应商名字"></el-table-column>
                        <el-table-column prop="contact" label="联系人"></el-table-column>
                        <el-table-column prop="phone" label="联系电话"></el-table-column>
                    </el-table>
                    <template v-if="demandForm.status>4">
                        <h2>报价详情</h2>
                        <el-table :data="offersData" :span-method="SpanMethod" border style="width: 1000px;margin-bottom:22px">
                            <el-table-column prop="name" label="供应商名字"></el-table-column>
                            <el-table-column prop="offeredAt" label="报价时间"></el-table-column>
                            <el-table-column prop="settleTypeName" label="结算方式"></el-table-column>
                            <el-table-column prop="offer" label="价格"></el-table-column>
                            <el-table-column prop="feeDesc" label="运费"></el-table-column>
                            <el-table-column prop="description" label="备注"></el-table-column>
                            <el-table-column prop="statusText" label="状态"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.status == 1">待供应商报价</div>
                                    <el-button type="text" v-show="dataAuth['F:CM_DEMAND_DEMAND_DETAIL_CHOOSE']" v-else-if="scope.row.status == 2&&demandForm.status==6" @click="selectOffer(scope.row.id)" style="color:#0066CC;">确认报价</el-button>
                                    <div v-else>--</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                  
                        <el-button v-show="dataAuth['F:CM_DEMAND_DEMAND_DETAIL_INVITE']" v-if="demandForm.status==4||demandForm.status==5||demandForm.status==8" type="primary" @click="push"  class="btn-mid">邀约报价</el-button>
                   
            </el-row>
        </el-form>
        <!-- 查看大图 -->
        <el-dialog title="查看图片" :visible.sync="imgVisible" width="60%" >
            <div><img :src='imgurl' style="margin: 0 auto;display: inherit;width: 100%"/></div>
        </el-dialog>

        <el-dialog width="40%" title="选择供应商" :visible.sync="pushDialogVisible" center>
            <div class="d_cont">
                <div class="cont_con">
                    <div class="con_top">
                        <div class="inputs"><el-input placeholder="请输入供应商名称" v-model="companyName" clearable></el-input></div>
                        <div class="inputs"><el-button type="primary" @click="getpushList(1)">查询</el-button></div>
                    </div>
                    <div v-for="item in pushdata.pushForm.type" :key="item.id" class="items">{{item.value}}<div class="delLogo" @click="del(item.value)">X</div></div>
                    <div class="con_bottom">
                        <el-checkbox-group v-model="pushdata.pushForm.type" v-for="(item,index) in pushdata.pushList" :key="index">
                            <el-checkbox :label="item"  name="type">{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="pageCont" style="margin-top: 0; padding-bottom: 0">
                        <el-pagination background layout="prev, pager, next" :total="total" :currentPage="currentPage"  @current-change="pushcurrent_change"></el-pagination>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="openPaymentModeWindow">下一步</el-button>
                <!-- <el-button @click="pushDialogVisible = false">取 消</el-button> -->
            </span>
        </el-dialog>

        <el-dialog width="50%" title="选择付款方式" :visible.sync="paymentModeVisible" center>
            <div class="d_cont">
                <div class="cont_con">
                    <el-table
                        :data="paymentModeList"
                        border
                        @selection-change="handlePaymentSelect"
                        :row-key="getRowKey"
                        style="width: 100%">
                        <el-table-column
                            prop="content"
                            label="付款方式描述">
                        </el-table-column>
                        <el-table-column
                            type="selection"
                            :reserve-selection="true">
                        </el-table-column>
                    </el-table>
                    <div class="pageCont" style="margin-top: 10px; padding-bottom: 0">
                        <el-pagination background layout="prev, pager, next" :total="paymentModeTotal" :currentPage="curPage"  @current-change="goTo"></el-pagination>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" v-if="dataAuth['F:CM_DEMAND_DEMAND_DETAIL_PUSH']" @click="pushDialog()">推送</el-button>
                <el-button @click="closePaymentModeWindow">上一步</el-button>
                <router-link to="/basic/paymentAdd" target="_blank">
                    <el-button type="primary" v-if="dataAuth['F:CM_DEMAND_DEMAND_DETAIL_ADDSETTLE']" plain>添加付款方式</el-button>
                </router-link>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import stepBar from '@/components/public/stepBar'
export default {
    data(){
        return{
            id:'',
            props: {
                label:'label',
                value:'id',
                children: 'children'
            },
            //产品名称
            optionsProduct:[],
            //地址
            location_list:[],
            optionsAdd:[],
            //上传查看大图
            imgVisible:false,
            imgurl:'',
            dataAuth:{
                
            },
            demandForm:{
                projectName:'',
                projectNo:'',
                productId:[],
                productBrand:'',
                purchaseNum:'',
                purchaseUnit:'',
                productSpec:'',
                tenderDeadline:'',
                tenderDesc:'',
                fileList:[],
                address:[],
                shippingAddr:'',
                shippingInspector:'',
                shippingInspectorMobile:'',
                shippingInspectorIdentityCard:'',
                tenderReferenceType:'',
                tenderAddress:[],
                settleDesc:'',
                tenderReferenceExtraAddr:'',
                tenderReferenceExtraDesc:'',
                status:'',
            },
            supplierFormSure:[],

            //推荐供应商
            pushDialogVisible:false,
            companyName:"",
            pushdata:{
                pushList:[],
                pushForm:{
                    type:[],
                },
                success:0,
            },
            perPage:10,
            total:0,
            currentPage:1,
            paymentModeVisible: false,
            paymentModeList: [],
            paymentModeTotal: 0,
            curPage: 1,
            paymentModeSelected: [],
            getRowKey(row){ //获取行号，保留之前选中项
                return row.id
            },
            //报价信息
            offerArr: [],
            offerpos: '',
            offersData:[],
            stepData: {},
            statusData:[
                {
                    statusDone:'已提交',
                    reject:'待重新提交',
                },
                {
                    statusDone:'已通过',
                    statusUp:'待审核',
                    reject:'已驳回'
                },
                {
                    statusDone:'已推送供应商',
                    statusUp:'待推送供应商',
                    reject:'待推送供应商'
                },
                {
                    statusDone:'已报价',
                    statusUp:'待报价',
                },
                {
                    statusDone:'已选择供应商',
                    statusUp:'待选择供应商',
                },
                {
                    statusDone:'已确认报价',
                    statusUp:'待确认报价',
                    reject:'已驳回'
                }
            ],
            matchArr:[2,4,5,6,7,9],
            lablePosition:'left'
        }
    },
    components: {
        stepBar,
    },
    created(){
        this.dataAuth = this.$store.state.authData;
        this.stepData = this.$stepBar;
        this.getRegionList('PROVINCE','','').then(result => {
            this.location_list = result.map(item => {
                return {
                    label: item.dictName,
                    id: item.dictValue,
                    key:item.dictKey,
                    children: []
                }
            });
            this.optionsAdd = result.map(item => {
                return {
                    label: item.dictName,
                    id: item.dictValue,
                    key:item.dictKey,
                    children: []
                }
            })
        });
        this.getProductSelect(0).then(result=>{
            this.optionsProduct = result.map(item=>{
                return {
                    label: item.categoryName,
                    id: item.id,
                    children:[]
                }
            })
        })
    },
    computed:{
        statusText() {
            const statusText = {
                2: '待审核',
                3: '需求驳回',
                4: '待推送供应商',
                5: '待报价',
                6: '待选择供应商',
                7: '待确认报价',
                8: '报价驳回',
                9: '已完成'
            }
            return statusText[this.demandForm.status] || '--'
        },
    },
    mounted(){
        this.id = this.$route.params.id;
        this.getdemandDetail()
    },
    methods:{
        //详情
        getdemandDetail(){
            let that = this;
            that.$api.demand_detail(that.id).then(response=>{
                let result = response.data;
                if(result.code===0){
                    that.demandForm = result.data;
                    that.supplierForm = JSON.parse(result.data.invites);
                    that.supplierFormSure = JSON.parse(result.data.invites);
                    that.demandForm['fileList'] = JSON.parse(result.data.tenderAttachments).map(item=>{
                        return {
                            url:item.filePathUri,
                            name:item.filePath
                        }
                    });
                    that.demandForm['tenderDeadline'] = that.dateToString(result.data.tenderDeadline);
                    
                    const productId = result.data.productId;
                    that.demandForm['productId']=[0,productId];
                    let productParentId;
                    that.getProductParentId(productId).then(res=>{
                        productParentId = res.parentId;
                        that.demandForm['productId']=[productParentId,productId];
                        const producIndex = that.optionsProduct.findIndex(item=>item.id == productParentId)
                        that.getProductSelect(productParentId).then(rei=>{
                            that.optionsProduct[producIndex]['children']=rei.map(item=>{
                                return {
                                    id: item.id,
                                    label: item.categoryName
                                }
                            })
                        })
                    });
                    
                    
                    
                    const locationProvinceId = result.data.shippingProvinceId;
                    const locationCityId = result.data.shippingCityId;
                    const locationAreaId = result.data.shippingCountyId;
                    that.demandForm['address'] = [locationProvinceId,locationCityId,locationAreaId];
                    const locationProvinceIndex = that.location_list.findIndex(item => item.id == locationProvinceId);
                    that.getRegionList('CITY','PROVINCE',locationProvinceId).then(result=>{
                        that.location_list[locationProvinceIndex]['children'] = result.map(item=>{
                            return {
                                label: item.dictName,
                                id: item.dictValue,
                                key:item.dictKey,
                                children:[]
                            }
                        });
                        const locationCityIndex = that.location_list[locationProvinceIndex]['children'].findIndex(item => item.id == locationCityId);
                        that.getRegionList('AREA','CITY',locationCityId).then(result=>{
                            that.location_list[locationProvinceIndex]['children'][locationCityIndex]['children'] = result.map(item=>{
                                return {
                                    label: item.dictName,
                                    id: item.dictValue,
                                    key:item.dictKey
                                }
                            })
                        })
                    })
                    
                    
                    const tenderProvinceId = result.data.tenderReferenceProvinceId;
                    const tenderCityId = result.data.tenderReferenceCityId;
                    that.demandForm.tenderAddress = [tenderProvinceId, tenderCityId];
                    const tenderProvinceIndex = that.optionsAdd.findIndex(item => item.id == tenderProvinceId)
                    that.getRegionList('CITY','PROVINCE',tenderProvinceId).then(result=>{
                        if(tenderProvinceIndex != -1){
                            that.optionsAdd[tenderProvinceIndex]['children'] = result.map(item=>{
                                return {
                                    label: item.dictName,
                                    id: item.dictValue,
                                    key:item.dictKey,
                                }
                            })
                        }
                    });

                    // 供应商报价信息
                    that.offersData = [];
                    let offers = result.data.offer
                    for(let i=0;i<offers.length;i++){
                        let offerSettles = offers[i].offerSettles;
                        for(let n=0;n<offerSettles.length;n++){
                            let offerItem = {
                                id:offers[i].id,
                                name:offers[i].supplierEntName,
                                offeredAt:offers[i].offeredAt || '--',
                                feeDesc:offers[i].feeDesc || '--',
                                description:offers[i].description || '--',
                                settleTypeName:offerSettles[n].settleTypeName || '--',
                                offer:offerSettles[n].offer || '--',
                                status:offers[i].status,
                                statusText:that.supplierStatus(offers[i].status)
                            }
                            that.offersData.push(offerItem)
                        }
                    }
                    that.offerArr= [];
                    that.offerpos= '';
                    that.getSpanArr(that.offersData,that.offerArr,that.offerpos);
                    let current_status = that.demandForm.status;
                    console.log(current_status)
                    if(current_status == 8) current_status = 4;
                    switch (current_status) {
                        case 3:
                            that.stepData.steps.forEach((item,index) => {
                                if(index == 0 || index == 1){
                                    item.process_desc = that.statusData[index].reject;
                                }else if(index != 6){
                                    item.process_desc = that.statusData[index].statusUp;
                                }
                            })
                            that.stepData.curStep = 1;
                            that.stepData.steps[1].current_status = 'error';
                            break;
                        default:
                            let current_step = this.matchArr.indexOf(current_status);
                            console.log(current_step)
                            that.stepData.steps.forEach((item,index) => {
                                if(current_step + 1 > index){

                                    item.process_desc = that.statusData[index].statusDone;
                                }else if(index != 6){
                                    item.process_desc = that.statusData[index].statusUp;
                                }
                            })
                            that.stepData.curStep = current_step + 2;
                            that.stepData.steps[1].current_status = '';
                            break;
                    }
                    
                }else{
                    that.$alert(result.message , '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                }

            }).catch(error => {
                console.log(error);
                that.$alert(error,'提示',{
                    confirmButtonText: '知道了',
                    callback: action => {}
                })
            })
        },
        //供应商报价表格
        SpanMethod({ row, column, rowIndex, columnIndex }){
            if(columnIndex != 2 && columnIndex != 3){
                const _row = this.offerArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return{
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        getSpanArr(data,arr,position){　
            for(var i = 0; i < data.length; i++) {
                if(i === 0){
                    arr.push(1);
                    position = 0
                }else{
                  // 判断当前元素与上一个元素是否相同
                    if(data[i].id === data[i - 1].id){
                        arr[position] += 1;
                        arr.push(0);
                    }else{
                        arr.push(1);
                        position = i;
                    }
                }
            }
        },
        supplierStatus(status) {
            const statusText = {
                1: '待报价',
                2: '已报价',
                3: '已成交',
                4: '未成交'
            }
            return statusText[status] || '--'
        },
        //查看大图
        handlePreview(file) {
            let that=this;
            that.imgVisible=true;
            that.imgurl=file.url;
        },
        //产品分类
        getProductSelect:function(id){
            let that = this;
            return that.$api.getProudctSelect(id)
                .then(response => {
                    let result = response.data;
                    if(result.code == 0){
                        return result.data
                    }else{
                        that.$alert(result.message , '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    that.$alert(error,'提示',{
                        confirmButtonText: '知道了',
                        callback: action => {}
                    })
                })
        },
        //产品分类子向父,获取父级的id
        getProductParentId:function(id){
            let that = this;
            let params = {
                id:id,
            }
            return that.$api.getProudctName(params)
                .then(response => {
                    let result = response.data;
                    if(result.code == 0){
                        return result.data
                    }else{
                        that.$alert(result.message , '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    that.$alert(error,'提示',{
                        confirmButtonText: '知道了',
                        callback: action => {}
                    })
                })
        },
        /**
         * 获取省市县的列表
         * @param  {entId,key,parentKey,parentValue}父级ID
         * @return {Array}          当前父级ID下的子列表
         */
        getRegionList(key,parentKey,parentValue){
            let that = this;
            let params = {
                entId:'0',
                key:key,
                parentKey:parentKey,
                parentValue:parentValue
            }
            return that.$api.regionList(params)
                .then(response => {
                    let result = response.data;
                    if(result.code === 0){
                        return result.data
                    }else{
                        that.$alert(result.message , '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    that.$alert(error,'提示',{
                        confirmButtonText: '知道了',
                        callback: action => {}
                    })
                })
        },
        //推送供应商的弹窗
        //推送  弹窗
        push(){
            let that=this;
            //清空
            that.pushdata.pushForm={
                type:[],
            };
            that.companyName="";
            that.getpushList(1);
            that.pushDialogVisible=true;
            that.currentPage=1;
            that.paymentModeSelected = [];
        },
        //供应商列表信息
        getpushList(pageNum){
            let that=this;
            let params = {
                pageSize:that.perPage,
                pageNo:pageNum
            };
            if(that.companyName){
                params.name=that.companyName;
            }
            that.$api.supplierCompany(params).then(function (response) {
                let result = response.data;
                if(result.code === 0){
                    let arr=result.data.records;
                    that.pushdata.pushList=arr.map((item)=>{
                        let list={
                            id:item.id,
                            value:item.entName,
                        };
                        return list;
                    })
                    that.total=result.data.total;
                }else {
                    that.$alert(response.data.message , '警告', {confirmButtonText: '确定', callback: action => {}});
                };
            }).catch(function (error) {
                that.$alert(error , '警告', {confirmButtonText: '确定',callback: action => {}});
            });
        },
        //供应商分页
        pushcurrent_change:function(currentPage){
            this.currentPage = currentPage;
            this.getpushList(currentPage);
        },
        //删除选中供应商
        del(companyname){
            let that=this;
            for(var i=0;i<that.pushdata.pushForm.type.length;i++){
                if(that.pushdata.pushForm.type[i].value==companyname){
                    that.pushdata.pushForm.type.splice(i,1);
                }
            }
        },
        //下一步打开结算方式弹窗
        openPaymentModeWindow:function(){
            let supplierArr = this.pushdata.pushForm.type;
            if(supplierArr.length == 0){ //未选择供应商则提示
                this.$message({
                    message: '请选择供应商',
                    type: 'warning'
                })
                return false
            }
            this.pushDialogVisible = false;
            this.paymentModeVisible = true;
            this.getPaymentModeList();
        },
        //获取付款方式列表
        getPaymentModeList(page){
            let that = this;
            let params = {
                isActive:1,
                 pageNo:page,
                pageSize:10,
            };
            that.$api.getSettle(params).then((res)=>{
                console.log(res)
               
                let result = res.data;
                if(result.code===0){
                    that.paymentModeList = result.data.records;
                     that.paymentModeTotal = result.data.total;
                }
                
            })
        },
        //付款方式选择
        handlePaymentSelect(val){
            this.paymentModeSelected = val;
        },
        //推送  按钮
        pushDialog(){
            let that = this;
            let memberid = that.pushdata.pushForm.type.map((item)=>{
                let ids = item.id;
                return ids
            });
            let params = {
                supplierIdList: memberid,
                reqId: this.id,
                settleTypeIdList: this.paymentSelectedList
            };
            let pay_type_arr = [];
            that.paymentModeSelected.forEach(function(element, index){
                pay_type_arr.push(element.id)
            });
            if(pay_type_arr.length != 0 && memberid.length != 0){
                params.settleTypeIdList = pay_type_arr;
            }else{
                that.$message({
                    message: '请选择支付方式',
                    type: 'warning'
                })
                return false;
            }
            that.paymentModeVisible = false;
            that.$api.pushSupplier(params).then(function (response) {
                if(response.data.code===0){
                    //that.getTabList(that.currentPage);
                    that.pushdata.success=1;
                    that.ispush=false;
                    that.msgDialog=true;
                    window.location.reload();
                }else {
                    that.$alert(response.data.message , '警告', {confirmButtonText: '确定', callback: action => {}});
                };
            }).catch(function (error) {
                that.$alert(error , '警告', {confirmButtonText: '确定',callback: action => {}});
            });
        },
        //付款方式分页跳转
        goTo(curPage){
            this.curPage = curPage;
            this.getPaymentModeList(this.curPage);
        },
        //关闭付款弹框
        closePaymentModeWindow(){
            this.paymentModeVisible = false;
            this.pushDialogVisible = true;
        },
        //确认供应商报价
        selectOffer(id){
            // console.log(id)
            let that = this;
            this.$confirm('是否确认报价?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.$api.selectOffer(id).then(res=>{
                    let result = res.data;
                    if(result.code===0){
                        this.$message({
                            message: '报价成功',
                            type: 'success'
                        });
                        that.getdemandDetail();
                    }else{
                        that.$alert(result.message , '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }

                }).catch(error => {
                    console.log(error);
                    that.$alert(error,'提示',{
                        confirmButtonText: '知道了',
                        callback: action => {}
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消报价'
                });          
            });
        }
        
    }

}
</script>
<style>
body .el-dialog__header{
    background-color: #2793f4;
}
body .el-dialog__title{
    color: #fff;
}
body .el-dialog__headerbtn .el-dialog__close{
    color: #fff;
}
body .el-dialog__headerbtn:focus .el-dialog__close,body .el-dialog__headerbtn:hover .el-dialog__close{
    color: #fff;
}
body .pageCont {
    position: absolute;
    left: 50%;
    text-align: center;
    margin-left: -225px;
    margin-top: 30px;
    padding-bottom: 50px;
    width: 450px;
}
</style>


<style scoped lang='less'>
    .zn-demand{
        .demand-item{
            width: 100%;
            height: 40px;
            line-height: 40px;
            display: flex;
            .item-content{
                color: #409EFF ;
            }
        }
        //弹窗
        .d_cont{
            //height: 420px;
            .cont_head{
                height: 50px;
                line-height: 50px;
                color: #000;
                width: 100%;
                text-align: center;
                font-size: 20px;
                font-weight: 600;
            }
            .cont_con{
                //height: 270px;
                .con_top{
                    height: 50px;
                    width: 100%;
                    .inputs{
                        height: 50px;
                        width: 40%;
                        float: left;
                        margin-left: 3%
                    }
                }
                .con_bottom{
                    height: 220px;
                    width: 100%;
                    overflow: hidden;
                    overflow-y: auto;
                    .el-checkbox {
                        height: 30px;
                        line-height: 30px;
                        width: 100%;
                        text-align: left;
                        border-bottom: 1px solid #eee;
                        &:nth-child(2n){
                            margin-left: 0; 
                        }
                        &:nth-child(2n+1){
                            margin-left: 0; 
                        }
                        span {
                            float: right;
                        }
                    }
                }
            }
            .pageCont{
                height: 30px;
                //width: 100%;
                float: left;
                bottom: initial;
            }
            .items{
                float: left;
                height: 30px;
                line-height: 30px;
                width: 100px;
                text-align: left;
                padding-left: 5px;
                color: #0677dc;
                border: 1px solid #0677dc;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-right: 10px;
                display: inline-block;
                white-space: nowrap;
                padding-right: 20px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                margin-bottom: 10px;
                position: relative;
                .delLogo{
                    // background-image: url(../../assets/public/error.png);
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 100% 100%;
                    line-height: 14px;
                    height: 10px;
                    width: 10px;
                    vertical-align: middle;
                    right: 7px;
                    cursor: pointer;
                    top: 9px;
                    position: absolute;
                }
            }
        }
    }
</style>
