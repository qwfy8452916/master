<template>
    <div class="zn-demand">
        <stepBar :stepData="stepData" />
        <el-form :model="demandForm" :rules="ruleForm" ref="demandForm" label-width="140px" class="align-left">
            <h2 class="h2-text">项目信息</h2>
            <el-row :span='24'>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="项目名称" prop="projectName">
                        <el-input placeholder="请输入项目名称" v-model="demandForm.projectName" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="项目编码" prop="projectNo">
                        <el-input placeholder="请输入项目编号" v-model="demandForm.projectNo" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <h2>产品信息</h2>
            <el-row :span="24">
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="分类" prop="productId">
                        <el-cascader
                            :options="optionsProduct"
                            @active-item-change="handleItemChange"
                            :props="props"
                            v-model="demandForm.productId"
                            :disabled="isedit==0"
                        ></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="品牌" prop="productBrand ">
                        <el-input placeholder="请输入品牌" v-model="demandForm.productBrand" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="数量" prop="purchaseNum">
                        <el-input
                         placeholder="请输入数量" 
                        type="number" v-model.trim="demandForm.purchaseNum"
                         :disabled="isedit==0"
                          @change="on_filter"
                         ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :span='24'>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="单位" prop="purchaseUnit">
                        <el-input placeholder="请输入单位名称" v-model="demandForm.purchaseUnit" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="11" :sm="11" :md="9" :lg="6" :xl="6">
                    <el-form-item label="产品规格" prop="productSpec">
                        <el-input placeholder="请输入产品规格" v-model="demandForm.productSpec" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <h2>联采规则</h2>
            <el-row :span='24'>
                <el-col :xs="14" :sm="14" :md="14" :lg="9" :xl="9">
                    <el-form-item label="供应商报价截止时间" prop="tenderDeadline" label-width="150px">
                        <el-date-picker
                            v-model="demandForm.tenderDeadline"
                            type="datetime"
                            value-format= 'yyyy-MM-dd HH:mm:ss'
                            placeholder="选择日期时间"
                            :picker-options="dateOptions"
                            :disabled="isedit==0"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发票要求">
                        <span>增值税发票（交易过程中涉及的开票都采用增值税发票）</span>
                    </el-form-item>
                    <el-form-item label="联采说明" prop="tenderDesc">
                        <el-input type="textarea" rows="6" resize='none' v-model="demandForm.tenderDesc" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <el-form-item label="上传附件" prop="fileList">
                        <el-upload
                            class="upload-demo"
                            :action="this.$api.upload_file_url"
                            name='fileContent'
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :on-success="handleSuccess"
                            multiple
                            :file-list="demandForm.fileList"
                            list-type="picture"
                            :disabled="isedit==0">
                            <el-button size="small" type="primary" v-show="isedit!=0">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">您可以将招标文件或其他您认为需要让报价供应商知晓的内容以附件形式上传，上传支持jpg、jpeg、gif、png、docx、xls、xlsx、pdf格式。</div>
                        </el-upload>
                    </el-form-item>
                    <h2>收货信息</h2>
                    <el-form-item label="收货地址" prop="address">
                        <el-cascader
                            :options="location_list"
                            @active-item-change="handleLocationItemChange"
                            :props="props"
                            v-model="demandForm.address"
                            :disabled="isedit==0"></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="shippingAddr">
                        <el-input placeholder="请输入详细地址" v-model="demandForm.shippingAddr" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <el-form-item label="验收人姓名" prop="shippingInspector">
                        <el-input :maxlength="10" placeholder="请输入验收人姓名" v-model="demandForm.shippingInspector" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <el-form-item label="验收人联系电话" prop="shippingInspectorMobile">
                        <el-input placeholder="请输入验收人联系电话" v-model="demandForm.shippingInspectorMobile" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <el-form-item label="验收人身份证号" prop="shippingInspectorIdentityCard">
                        <el-input placeholder="请输入验收人身份证号" v-model="demandForm.shippingInspectorIdentityCard" :disabled="isedit==0"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :span='24'>
                <el-col :xs="14" :sm="14" :md="14" :lg="9" :xl="9">
                    <h2>报价参考</h2>
                    <el-form-item label="报价参考方式" prop="tenderReferenceType">
                        <!-- <el-input placeholder="如我的钢铁网，西本网等" v-model="demandForm.quote_price"></el-input> -->
                        <el-select v-model="demandForm.tenderReferenceType" placeholder="请选择" :disabled="isedit==0">
                            <el-option value="XB" label="西本网"></el-option>
                            <el-option value="WDGT" label="我的钢铁"></el-option>
                            <el-option value="EXTRA" label="其他"></el-option>
                        </el-select>
                    </el-form-item>
                    <div v-if="demandForm.tenderReferenceType=='EXTRA'">
                    <el-form-item label="报价参考地" prop="tenderReferenceExtraAddr">
                        <el-input placeholder="如北京，上海等" v-model="demandForm.tenderReferenceExtraAddr" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <el-form-item label="报价参考说明" prop="tenderReferenceExtraDesc">
                        <el-input placeholder="请输入报价说明" v-model="demandForm.tenderReferenceExtraDesc" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    </div>
                    <div v-else>
                        <el-form-item label="报价参考地" prop="tenderAddress">
                        <el-cascader
                            :options="optionsAdd"
                            @active-item-change="handleAddrItemChange"
                            :props="props"
                            v-model="demandForm.tenderAddress"
                            :disabled="isedit==0"
                        ></el-cascader>
                    </el-form-item>
                    </div>
                    <el-form-item label="结算方式" prop="settleDesc">
                        <el-input type="textarea" rows="6" v-model="demandForm.settleDesc" :disabled="isedit==0"></el-input>
                    </el-form-item>
                    <h2>邀约供应商信息</h2>
                    <el-form-item>
                        <el-button type="primary" @click="pushSupplierCardShow" v-show="isedit!=0" style="background-color:#fff;border:1px solid #0066CC;color:#0066CC">推荐供应商</el-button>
                    </el-form-item>
                    <el-form-item v-for="(item,index) in supplierFormSure" :key="index">
                        <div class="supplierListBox">
                            <div class="containBox">
                                <div class="supplierName">{{item.enterpriseName||'--'}}</div>
                                <div class="suppliercontact"><span>{{item.contact}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.phone}}</span></div>
                            </div>
                            <div class="editBox">
                                <i class="el-icon-delete" v-show="isedit!=0" @click="isedit==0?'':deleteSupplier(supplierFormSure,index)" style="font-size:20px"></i>
                            </div>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                    <el-main class="el-main1" v-show="isedit!=0">
                        <div class="example" :class="{fold: exampleFold}">
                            <p>A:需方每批先付定货款，供方后发货；每批货价格按款到账日“XX网（如我的钢铁或西本网，扬州市建筑钢材价格行情）”指定范围内同厂家同规格下浮XX元/吨。</p>
                            <p>
                                说明/备注：（由联采部对应合同条款，编辑进去）
                                且遇网价涨价时不涨，遇降价时按款到账日“XX网（如我的钢铁或西本网，扬州市建筑钢材价格行情）”指定范围内同厂家同规格下浮XX元/吨。若“XX网（如我的钢铁或西本网，扬州市建筑钢材价格行情）”一天内有多次报价时，以网站当日同厂家同规格多次报价平均数为准。若遇星期六、星期日，则按本周五价格执行；若款到账日该网站无报价，则以每批款到账日前最后一次价格为主。
                            </p>
                            <p>B：每月10日，付清上月产生的所有货款；价格按货到工地日“XX网（如我的钢铁或西本网，扬州市建筑钢材价格行情）”指定范围内同厂家同规格下浮XX元/吨。</p>
                            <p>
                                说明/备注：（由联采部对应合同条款，编辑进去）
                                若“XX网（如我的钢铁或西本网，扬州市建筑钢材价格行情）”一天内有多次报价时，以网站当日同厂家同规格多次报价平均数为准。若遇星期六、星期日，则按本周五价格执行；若货到工地日该网站无报价，则以每批货到工地日前最后一次价格为主。
                            </p>
                            <p>C:每批货到工地日， 每90天付清该批货款；价格按货到工地日“XX网（如我的钢铁或西本网，扬州市建筑钢材价格行情）”指定范围内同厂家同规格上浮XX元/吨。</p>
                            <p>
                                说明/备注：（由联采部对应合同条款，编辑进去）
                                若“XX网（如我的钢铁或西本网，扬州市建筑钢材价格行情）”一天内有多次报价时，以网站当日同厂家同规格多次报价平均数为准。若遇星期六、星期日，则按本周五价格执行；若货到工地日该网站无报价，则以每批货到工地日前最后一次价格为主。
                            </p>
                            <div class="fold-btn-div" :class="{'unfold-btn-div': unfoldBtnDiv}">
                                <el-button type="text" @click="showExample" style="color:#0576DB;">{{ exampleFold ? '更多详情' : '收起' }}></el-button>
                            </div>
                        </div>
                    </el-main>
                </el-col>
            </el-row>
            <el-row>
                <template v-if="demandForm.status == '7'">
                    <h2>供应商报价信息</h2>
                    <el-table :data="offersData" :span-method="SpanMethod" border style="width: 1000px;margin-left:50px;margin-bottom:22px">
                        <el-table-column prop="name" label="供应商名字"></el-table-column>
                        <el-table-column prop="offeredAt" label="报价时间"></el-table-column>
                        <el-table-column prop="settleTypeName" label="结算方式"></el-table-column>
                        <el-table-column prop="offer" label="价格"></el-table-column>
                        <el-table-column prop="feeDesc" label="运费"></el-table-column>
                        <el-table-column prop="description" label="备注"></el-table-column>
                        <el-table-column prop="statusText" label="状态"></el-table-column>
                    </el-table>
                </template>
                <el-form-item v-show="isedit!=0">
                    <el-checkbox :checked="demandForm.isread" @change="isRead()" style="color:#0066CC">阅读采购协议</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if="dataAuth['F:CM_BDEMAND_BDEMAND_CREATE_APPROVE']" @click="demandSure" v-show="isedit!=0" class="btn-mid">确定</el-button>
                    <el-button type="primary" v-show="isedit==0" class="cancel-btn" @click="back">返回</el-button>
                    <el-button type="primary" v-if="dataAuth['F:CM_DEMAND_BDEMAND_DETAIL_REJECT']" v-show="demandForm.status == '7'" @click="rejectOffer" class="cancel-btn">驳回</el-button>
                    <el-button type="primary" v-if="dataAuth['F:CM_BDEMAND_BDEMAND_DETAIL_APPROVE']" v-show="demandForm.status == '7'" @click="approveOffer" class="btn-mid">确认并提交</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <!-- 图片弹框预览 -->
        <el-dialog title="查看图片" :visible.sync="imgVisible" width="60%" >
            <div><img :src='imgurl' style="margin: 0 auto;display: inherit;width: 100%"/></div>
        </el-dialog>
        <!-- 邀约供应商信息 -->
        <el-dialog  class='align-left' title="推荐供应商" :visible.sync="pushSupplierCard" width="60%" >
            <div class="a">
                <el-button @click="addSupplier" type="primary">添加</el-button>
            </div>
            <div v-for="(item,index) in supplierForm" :key="index">
                <div class="align-right">
                    <i class="el-icon-delete" @click="deleteSupplier(supplierForm,index)" style="font-size:20px"></i>
                </div>
                <el-form label-position='right' label-width="200px">
                    <el-form-item label="邀请供应商（企业名称）" >
                        <el-input v-model="item.enterpriseName"></el-input>
                    </el-form-item>
                    <el-form-item label="邀请供应商联系人" >
                        <el-input v-model="item.contact"></el-input>
                    </el-form-item>
                    <el-form-item label="邀请供应商联系方式" >
                        <el-input v-model="item.phone"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="pushSupplierCard = false" class="cancel-btn">取 消</el-button>
                <el-button type="primary" @click="pushSupplierSure" class="btn-mid">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import stepBar from '@/components/public/stepBar'
export default {
    data(){
        return{
            id:'',
            isedit:1,
            //时间默认当前时间
            dateOptions: {
                disabledDate(time) {
                  return time.getTime() <= Date.now();
                }
            },
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
            demandForm:{
                status:'',
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
                isread:false,
            },
            dataAuth:{},
            ruleForm:{
                projectName:[
                    {required:true,message:'请输入项目名称',trigger:'blur'}
                ],
                projectNo:[
                    {required:true,message:'请输入项目编码',trigger:'blur'}
                ],
                productId:[
                    {required:true,message:'请输入产品名称',trigger:'blur'}
                ],
                productBrand:[
                    {required:true,message:'请输入品牌名称',trigger:'blur'}
                ],
                purchaseNum:[
                    {required:true,message:'请输入数量',trigger:'blur'}
                ],
                purchaseUnit:[
                    {required:true,message:'请输入单位',trigger:'blur'}
                ],
                productSpec:[
                    {required:true,message:'请输入规格',trigger:'blur'}
                ],
                tenderDeadline:[
                    {required:true,message:'请输入截止时间',trigger:'blur'}
                ],
                address:[
                    {required:true,message:'请输入地址',trigger:'blur'}
                ],
                shippingAddr:[
                    {required:true,message:'请输入详细地址',trigger:'blur'}
                ],
                shippingInspector:[
                    {required:true,message:'请输入验收人名称',trigger:'blur'}
                ],
                shippingInspectorMobile:[
                    {required:true,message:'请输入正确的验收人手机',trigger:'blur',min: 11, max: 11}
                ],
                tenderReferenceType:[
                    {required:true,message:'请输入参考价格',trigger:'blur'}
                ],
                tenderAddress:[
                    {required:true,message:'请输入参考地址',trigger:'blur'}
                ]
            },
            //供应商弹窗
            pushSupplierCard:false,
            supplierForm:[
                {
                    enterpriseName:'',
                    contact:'',
                    phone:''
                }
            ],
            supplierFormSure:[],
            //结算方式
            exampleFold: true,
            unfoldBtnDiv: false,
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
            labelPosition: 'right'
        }
    },
    components:{
        stepBar
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
    mounted(){
        if(this.$route.params.id&&this.$route.params.isedit){
            this.id = this.$route.params.id;
            this.isedit = this.$route.params.isedit;
            this.getdemandDetail()
        }
    },
    methods:{
        isRead(){
            this.demandForm.isread = !this.demandForm.isread;
        },
        on_filter(value){
            if(Number(value)<0){
                this.demandForm.purchaseNum = 1;
                this.$message({
                    message: '数据不可小于0!',
                    type: 'warning'
                });
            }
        },
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
                    //产品名
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
                    
                    
                    //收货地
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
                    
                    //参考地
                    const tenderProvinceId = result.data.tenderReferenceProvinceId;
                    const tenderCityId = result.data.tenderReferenceCityId;
                    that.demandForm.tenderAddress = [tenderProvinceId, tenderCityId];
                    const tenderProvinceIndex = that.optionsAdd.findIndex(item => item.id == tenderProvinceId)
                    that.getRegionList('CITY','PROVINCE',tenderProvinceId).then(result=>{
                        that.optionsAdd[tenderProvinceIndex]['children'] = result.map(item=>{
                            return {
                                label: item.dictName,
                                id: item.dictValue,
                                key:item.dictKey,
                            }
                        })
                    });

                    //报价
                    // 供应商报价信息
                    that.offersData = [];
                    let offers = result.data.offer
                    for(let i=0;i<offers.length;i++){
                        let offerSettles = offers[i].offerSettles;
                        if(offers[i].id == result.data.bidOfferId){
                            for(let n=0;n<offerSettles.length;n++){
                                let offerItem = {
                                    id:offers[i].id,
                                    offerSettlesId:offerSettles[n].id,
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
                    }
                    that.offerArr= [];
                    that.offerpos= '';
                    that.getSpanArr(that.offersData,that.offerArr,that.offerpos);
                    let current_status = that.demandForm.status;
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
                }
            })
        },
        //上传图片
        handleSuccess(response,file,fileList){
            console.log(file)
            const image = {
                name: response.data,
                url: file.url
            }
            this.demandForm.fileList.push(image);
        },
        handleRemove(file, fileList) {
            this.demandForm.fileList = fileList.map((item, index)=>{
               return {
                  name: item.name,
                  url: item.url
               }
            })
        },
        handlePreview(file) {
            let that=this;
            if(file.raw.type.indexOf("image")>-1){
                that.imgVisible=true;
                that.imgurl=file.url;
            }
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
        handleItemChange:function(val){
            const level = val.length;
            let parentId = val[level - 1];
            if(level >= 2){ //显示两级
                return false
            }
            const index = this.optionsProduct.findIndex(item => item.id == parentId);
            if(this.hasChildren(this.optionsProduct,index)){ //防止重复请求
                return false
            }
            this.getProductSelect(parentId)
                .then(result => {
                    if(index != -1){
                        this.optionsProduct[index]['children'] = result.map(item => {
                            let element = {
                                id: item.id,
                                label: item.categoryName
                            };
                            return element
                        });
                    }else{
                        console.log(`找不到该parentId： ${parentId}`)
                    }
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
        /**
         * 判断location是否有子列表
         * @param  {Number}  index 索引值
         * @return {Boolean}
         */
        hasChildren(List,index,parentindex){
            if(parentindex != undefined){
                if(List[parentindex]['children'][index]['children'] && List[parentindex]['children'][index]['children'].length > 0){
                    return true
                }
            }else{
                if(List[index]['children'] && List[index]['children'].length > 0){
                    return true
                }
            }
            return false
        },
        //处理父级选项变化
        handleLocationItemChange(val){ //val各父级选项组成的数组
            const level = val.length;
            let parentValue = val[level - 1];
            if(level > 2){ //显示省、市,区
                return false
            }
            let parentindex,index,key;
            if(level==1){
                index = this.location_list.findIndex(item => item.id == parentValue);
                key = this.location_list[index].key;
            }else if(level==2){
                parentindex = this.location_list.findIndex(item => item.id == val[0]);
                index = this.location_list[parentindex].children.findIndex(item=> item.id == val[1]);
                key = this.location_list[parentindex].children[index].key;
            }
            let childrenKey = "PROVINCE";
            switch (key) { 
                case "PROVINCE":
                    childrenKey = "CITY";
                    break;
                case "CITY":
                    childrenKey = "AREA";
                    break;
                default:
                    childrenKey = "PROVINCE"
            }
            if(this.hasChildren(this.location_list,index,parentindex)){ //防止重复请求
                return false
            }
            this.getRegionList(childrenKey,key,parentValue)
                .then(result => {
                    if(index != -1&&level==1){
                        this.location_list[index]['children'] = result.map(item => {
                            let element = {
                                label: item.dictName,
                                id: item.dictValue,
                                key:item.dictKey,
                                children: []
                            };
                            return element
                        });
                    }else if(index != -1&&level==2){
                        this.location_list[parentindex]['children'][index]['children'] = result.map(item => {
                            let element = {
                                label: item.dictName,
                                id: item.dictValue,
                                key:item.dictKey
                            };
                            return element
                        });
                    }else{
                        console.log(`找不到该parentValue： ${parentValue}`)
                    }
                })
        },
        //报价参考地
        handleAddrItemChange:function(val){
            const level = val.length;
            let parentId = val[level - 1];
            if(level >= 2){ //显示省、市
                return false
            }
            const index = this.optionsAdd.findIndex(item => item.id == parentId);
            const key = this.location_list[index].key;
            let childrenKey = "PROVINCE";
            switch (key) { 
                case "PROVINCE":
                    childrenKey = "CITY";
                    break;
                case "CITY":
                    childrenKey = "AREA";
                    break;
                default:
                    childrenKey = "PROVINCE"
            }
            if(this.hasChildren(this.optionsAdd,index)){ //防止重复请求
                return false
            }
            this.getRegionList(childrenKey,key,parentId)
                .then(result => {
                    if(index != -1){
                        this.optionsAdd[index]['children'] = result.map(item => {
                            let element = {
                                label: item.dictName,
                                id: item.dictValue,
                                key:item.dictKey
                            };
                            return element
                        });
                    }else{
                        console.log(`找不到该parentId： ${parentId}`)
                    }
                })
        },
        //供应商弹窗
        pushSupplierCardShow(){
            this.pushSupplierCard = true;
            this.supplierForm = [
                {
                    enterpriseName:'',
                    contact:'',
                    phone:''
                }
            ]
        },
        //新增供应商
        addSupplier:function(){
            this.supplierForm.push({
                enterpriseName:'',
                contact:'',
                phone:''
            })
        },
        //删除供应商
        deleteSupplier:function(form,index){
            console.log(1)
            if(form.length == 1){
                this.$message({
                    message: '至少保留一行数据!',
                    type: 'warning'
                });
                return false
            }
            form.splice(index,1)
        },
        //确定供应商
        pushSupplierSure:function(){
            for(let i=0;i<this.supplierForm.length;i++){
                if(Object.keys(this.supplierForm[i]).some(key => !this.supplierForm[i][key])){ //参数非空校验
                    this.$message({
                        message: '请完善信息',
                        type: 'warning'
                    })
                    return false
                }
            }
            this.supplierFormSure.push(...this.supplierForm);
            this.pushSupplierCard = false;
        },
        //结算方式文本收起放下
        showExample(){
            this.exampleFold = !this.exampleFold;
            this.unfoldBtnDiv = !this.unfoldBtnDiv;
        },
        //确定需求单
        demandSure:function(){
            let that = this;
            let tenderAttachments = this.demandForm['fileList'].map(item=>{
                return item.name
            });
            this.$refs['demandForm'].validate((valid)=>{
                if(valid){
                    let params = {
                        inviteCount:that.supplierFormSure.length,
                        invites:JSON.stringify(that.supplierFormSure),
                        isPublished:1,
                        productBrand:this.demandForm['productBrand'],
                        productId:this.demandForm['productId'][1],
                        productSpec:this.demandForm['productSpec'],
                        projectName:this.demandForm['projectName'],
                        projectNo:this.demandForm['projectNo'],
                        purchaseNum:this.demandForm['purchaseNum'],
                        purchaseUnit:this.demandForm['purchaseUnit'],
                        shippingAddr:this.demandForm['shippingAddr'],
                        shippingCityId:this.demandForm['address'][1],
                        shippingCountyId:this.demandForm['address'][2],
                        shippingInspector:this.demandForm['shippingInspector'],
                        shippingInspectorIdentityCard:this.demandForm['shippingInspectorIdentityCard'],
                        shippingInspectorMobile:this.demandForm['shippingInspectorMobile'],
                        shippingProvinceId:this.demandForm['address'][0],
                        tenderAttachments:JSON.stringify(tenderAttachments),
                        tenderDeadline:this.demandForm['tenderDeadline'],
                        tenderDesc:this.demandForm['tenderDesc'],
                        tenderReferenceCityId:this.demandForm['tenderAddress'][1],
                        settleDesc:this.demandForm['settleDesc'],
                        tenderReferenceExtraAddr:this.demandForm['tenderReferenceExtraAddr'],
                        tenderReferenceExtraDesc:this.demandForm['tenderReferenceExtraDesc'],
                        tenderReferenceProvinceId:this.demandForm['tenderAddress'][0],
                        tenderReferenceType:this.demandForm['tenderReferenceType']
                    }
                    if(that.supplierFormSure.length == 0){
                        that.$message({
                            message: '请添加至少一位供应商！',
                            type: 'warning'
                        })
                        return ;
                    }
                    if(!that.demandForm.isread){
                        that.$message({
                            message: '未勾选阅读采购协议！',
                            type: 'warning'
                        })
                        return ;
                    }
                    if(that.id){
                        that.$api.demand_edit(that.id,params).then(response=>{
                            that.$message({
                                message: '编辑成功',
                                type: 'success'
                            })
                            that.$router.push({path:'/branch/demandList'})
                        })
                    }else{
                        that.$api.demand_add(params).then(response=>{
                            that.$message({
                                message: '新增成功',
                                type: 'success'
                            })
                            that.$router.push({path:'demandList'})
                        })
                    }
                    
                }else{
                    this.$message({
                        message: '请完善信息',
                        type: 'warning'
                    })
                }
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
        //审核报价
        rejectOffer(){
            let that = this;
            let params = {
                checkResult:'0'
            }
            this.$prompt('请输入驳回原因', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern:  /\S/,
                inputErrorMessage: '请输入驳回原因'
            }).then(({ value }) => {
                params.rejectReason = value;
                that.$api.checkOffer(that.id,params).then(res=>{
                    let result = res.data;
                    if(result.code===0){
                        that.$message({
                            type: 'success',
                            message: '驳回成功!'
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
                    message: '取消输入'
                });       
            });
        },
        approveOffer(){
            let that = this;
            let params = {
                checkResult:'1'
            }
            this.$confirm('是否确认提交报价信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.$api.checkOffer(that.id,params).then(res=>{
                    let result = res.data;
                    if(result.code===0){
                        that.$message({
                            type: 'success',
                            message: '提交成功!'
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
                    message: '已取消提交'
                });          
            });
        },
        // 返回列表
        back(){
            this.$router.push({name: 'demandList'});
        }
        
    }

}
</script>

<style lang='less'>
    .zn-demand{
        .example{
            position: relative;
        }
        .example p:nth-child(2n){
            color: #aaa;
        }
        .example p:nth-child(2n+1){
            color: #333;
        }
        .fold{
            height: 300px;
            overflow: hidden;
        }
        .fold-btn-div{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            padding-top: 100px;
            height: 50px;
            text-align: center;
            background: linear-gradient(-180deg,rgba(255,255,255,0) 0%,#fff 70%);
        }
        .unfold-btn-div{
            bottom: -50px;
            background: 0;
        }
        .supplierListBox{
            width: 100%;
            display: flex;
            align-items: center;
            background-color: #eee;
            padding: 10px;
            .containBox{
                flex-grow: 1;
                line-height: 30px;
            }
        }
    }
</style>
