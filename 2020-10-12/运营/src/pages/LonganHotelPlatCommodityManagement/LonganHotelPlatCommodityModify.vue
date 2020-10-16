<template>
    <div class="commodityadd">
        <p class="title">修改酒店平台商品</p>
        <el-form :model="CommodityDataModify" :rules="rules" ref="CommodityDataModify" label-width="120px" class="commodityform">
            <el-form-item label="酒店" prop="hotelId">
                <el-select
                    :disabled="true"
                    v-model="CommodityDataModify.hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    @change="hotelChange"
                    placeholder="请选择">
                    <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item prop="marketType">
                <span slot="label"><label class="required-icon">*</label> 市场分类</span>
                <el-input type="textarea" autosize :readonly="true" v-model="selectMarketData" placeholder="请选择" @focus="showMarketTree"></el-input>
                <div v-if="isShowTree" class="treestyle">
                    <el-button type="text" @click="hideMarketTree" class="closetree">关闭</el-button>
                    <el-tree
                        :data = "typeDataDetail"
                        :props="defaultProps"
                        show-checkbox
                        :check-strictly = 'true'
                        :check-on-click-node = 'true'
                        :default-checked-keys="selectMarketIdList"
                        node-key = 'id'
                        ref="tree"
                        @check-change = "selectMarket"
                        default-expand-all
                        :expand-on-click-node = "false">
                    </el-tree>
                </div> -->
                <!-- <el-tree
                    :data = "typeDataDetail"
                    :props="defaultProps"
                    show-checkbox
                    :check-strictly = 'true'
                    :check-on-click-node = 'true'
                    node-key = 'id'
                    ref="tree"
                    :default-checked-keys="marketIdData"
                    default-expand-all
                    :expand-on-click-node = "false">
                </el-tree> -->
                <!-- <el-select v-model="CommodityDataModify.marketType" placeholder="请选择" @change="categorySelect">
                    <el-option v-for="item in marketList" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
                </el-select>
                <el-tag
                    v-for="tag in tagsList"
                    :key="tag.id"
                    closable
                    @close="tagClose(tag)">
                    {{tag.categoryName}}
                </el-tag> -->
            <!-- </el-form-item> -->
            <el-form-item label="商品" prop="prodCode">
                <el-select :disabled="true" v-model="CommodityDataModify.prodCode" placeholder="请选择">
                    <el-option
                        v-for="item in prodList"
                        :key="item.id"
                        :label="item.prodName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="显示名称" prop="prodShowName">
                <el-input v-model="CommodityDataModify.prodShowName"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" prop="prodCode">
                <el-input :disabled="true" v-model="CommodityDataModify.prodCode"></el-input>
            </el-form-item>
            <!-- <el-form-item label="最高采购价" prop="prodPurMaxPrice">
                <el-input :disabled="true" v-model.trim="maxPrice" maxlength="10"></el-input> 元
            </el-form-item> -->
            <el-form-item label="商品形式" prop="prodType">
                <el-select :disabled="true" v-model="CommodityDataModify.prodType" @change="selectProdType" placeholder="请选择">
                    <el-option 
                        v-for="item in pTypeList" 
                        :key="item.id" 
                        :label="item.name" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item v-if="CommodityDataModify.prodType == 2" prop="vouBatchId">
                <span slot="label"><label class="required-icon">*</label> 卡券选择</span>
                <el-select v-model="CommodityDataModify.vouBatchId" placeholder="请选择">
                    <el-option v-for="item in couponList" :key="item.id" :label="item.couponName" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item v-if="CommodityDataModify.prodType == 2">
                <span slot="label"><label class="required-icon">*</label> 电子券选择</span>
                <el-button :disabled="true" type="primary" class="addbtn" size="small" @click="couponAddLine">添加</el-button>
            </el-form-item>
            <el-table v-if="CommodityDataModify.prodType == 2" :data="CommodityDataModify.EleCouponsData" style="margin: -20px 0px 0px 130px;">
                <el-table-column label="类型" min-width="150px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'EleCouponsData.'+scope.$index+'.couponType'" :rules="rules.couponType" class="marginstyle">
                            <el-select
                                :disabled="true"
                                v-model="scope.row.couponType"
                                @change="selectCouponT(scope.$index, scope.row.couponType)"
                                placeholder="请选择类型">
                                <el-option label="卡券" :value="1"></el-option>
                                <el-option label="优惠券" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="名称" min-width="240px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'EleCouponsData.'+scope.$index+'.couponId'" :rules="rules.couponId" class="marginstyle">
                            <el-select
                                :disabled="true"
                                v-model="scope.row.ticketName"
                                placeholder="请选择名称">
                                <el-option
                                    v-for="item in scope.row.couponList"
                                    :key="item.id"
                                    :label="item.couponName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="数量" min-width="80px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'EleCouponsData.'+scope.$index+'.couponCount'" :rules="rules.couponCount" class="marginstyle">
                            <el-input :disabled="true" v-model.number="scope.row.couponCount" placeholder="请输入数量"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="排序" min-width="80px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'EleCouponsData.'+scope.$index+'.couponSort'" :rules="rules.couponSort" class="marginstyle">
                            <el-input :disabled="true" v-model.number="scope.row.couponSort" placeholder="请输入排序"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="60px" align=center>
                    <template slot-scope="scope">
                        <el-form-item class="marginstyle">
                            <el-button :disabled="true" type="text" size="small" @click="giftDeleteLine(scope.$index)">移除</el-button>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
            <br/>
            <!-- <el-form-item label="建议零售价" prop="prodAdvisePrice">
                <el-input :disabled="true" v-model.trim="suggestPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="采购单价" prop="prodPurPrice">
                <div v-if="authzData['F:BO_PROD_HOTELPROD_PRICE']" class="lookhistoryprice">
                    <el-button type="text" size="small" @click="lookHistoryPrice">查看历史价格</el-button>
                </div>
                <el-input v-model.trim="CommodityDataModify.prodPurPrice" maxlength="10"></el-input> 元
            </el-form-item> -->
            <el-form-item label="供货价" prop="prodSupplyPrice">
                <el-input v-model.trim="CommodityDataModify.prodSupplyPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="零售价" prop="prodRetailPrice">
                <el-input v-model.trim="CommodityDataModify.prodRetailPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="划线价" prop="prodMarketPrice">
                <el-input v-model.trim="CommodityDataModify.prodMarketPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="配送方式" prop="delivWays">
                <!-- <el-checkbox-group :disabled="isAbleModify" v-model="CommodityDataModify.delivWays" @change="selectDelivType">
                    <el-checkbox label="1">店内送</el-checkbox>
                    <el-checkbox label="2">快递送</el-checkbox>
                </el-checkbox-group> -->
                <el-select v-model="CommodityDataModify.delivWays" multiple placeholder="请选择" @change="selectDelivType">
                    <el-option v-for="item in delivWayList" :key="item.id" :label="item.delivWayName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="isInvShow" label="酒店库存" prop="isNeedInv">
                <!-- <span slot="label"><label class="required-icon">*</label> 是否需要库存</span>
                <el-radio-group v-model="CommodityDataModify.isNeedInv" @change="selectIsInv">
                    <el-radio :label="1">需要</el-radio>
                    <el-radio :label="0">不需要</el-radio>
                </el-radio-group> -->
                <el-switch v-model="CommodityDataModify.isNeedInv" @change="selectIsInv" :disabled="CommodityDataModify.delivWays.indexOf('3')!=-1"></el-switch>
            </el-form-item>
            <el-form-item v-if="isInvShow && CommodityDataModify.isNeedInv" prop="prodSafeCount">
                <span slot="label"><label class="required-icon">*</label> 安全库存</span>
                <el-input  v-model.number="CommodityDataModify.prodSafeCount" placeholder="请输入安全库存"></el-input>
            </el-form-item>
            <el-form-item label="可售数量" prop="availableSaleQty">
                <el-input  v-model.number="CommodityDataModify.availableSaleQty"></el-input>
            </el-form-item>
            <el-form-item v-if="isFreeShip" prop="isFreeShipping">
                <span slot="label"><label class="required-icon">*</label> 快递费包邮</span>
                <!-- <span slot="label"><label class="required-icon">*</label> 快递费</span>
                <el-radio-group v-model="CommodityDataModify.isFreeShipping">
                    <el-radio :label="1">包邮</el-radio>
                    <el-radio :label="0">不包邮</el-radio>
                </el-radio-group> -->
                <el-switch v-model="CommodityDataModify.isFreeShipping"></el-switch>
                <!-- <span v-if="CommodityDataModify.isFreeShipping">包邮</span>
                <span v-else>不包邮</span> -->
                <span v-if="!CommodityDataModify.isFreeShipping">&nbsp;&nbsp;
                    <el-select v-model="CommodityDataModify.expressFeeId" placeholder="请选择快递费模板" style="width:48%;">
                        <el-option
                            v-for="item in expressFeeList"
                            :key="item.id"
                            :label="item.exFeeName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </span>
            </el-form-item>
            <el-form-item v-if="isPickUp" label="自提点" prop="pickUpPointIds">
                <el-select v-model="CommodityDataModify.pickUpPointIds" multiple placeholder="请选择">
                    <el-option v-for="item in pickUpPointList" :key="item.id" :label="item.pickUpPointName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <div class="functionadd">
                <span class="funspan">功能区</span>
                <el-button type="primary" class="addbtn" size="small" @click="functionAddLine">添加</el-button>
                <span class="hint">提示：功能区不可重复选择</span>
                <el-table
                    :data="CommodityDataModify.functionData"
                    :show-header="false">
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-form-item :prop="'functionData.'+scope.$index+'.funcId'" :rules="rules.funcId">
                                <el-select
                                    v-model="scope.row.funcId"
                                    @change="selectFunction(scope.$index, scope.row.funcId)"
                                    placeholder="请选择功能区"
                                    style="width:34%;">
                                    <el-option
                                        v-for="item in functionList"
                                        :key="item.funcId"
                                        :label="item.funcCnName"
                                        :value="item.funcId">
                                    </el-option>
                                </el-select>
                                <el-select
                                    v-model="scope.row.classifyIds"
                                    @change="selectClassify(scope.$index, scope.row.funcId, scope.row.classifyIds)"
                                    multiple
                                    placeholder="请选择功能区分类"
                                    style="width:46%;">
                                    <el-option
                                        v-for="item in scope.row.classifyList"
                                        :key="item.categoryId"
                                        :label="item.categoryName"
                                        :value="item.categoryId">
                                    </el-option>
                                </el-select>
                                <el-button type="text" size="small" @click="functionDeleteLine(scope.$index)">删除</el-button>
                            </el-form-item>
                            <!-- <el-form-item :prop="'functionData.'+scope.$index+'.classifyIds'" :rules="rules.classifyIds">
                                <el-select
                                    v-model="scope.row.classifyIds"
                                    @change="selectClassify(scope.$index, scope.row.funcId, scope.row.classifyIds)"
                                    multiple
                                    placeholder="请选择功能区分类">
                                    <el-option
                                        v-for="item in scope.row.classifyList"
                                        :key="item.categoryId"
                                        :label="item.categoryName"
                                        :value="item.categoryId">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- <el-form-item label="分成协议名称" prop="agreementId">
                <el-select v-model="CommodityDataModify.agreementId" placeholder="请选择">
                    <el-option
                        v-for="item in protocolList"
                        :key="item.id"
                        :label="item.agreementName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="客服电话" prop="servicePhone">
                <el-input v-model.trim="CommodityDataModify.servicePhone"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="本地特产" prop="isLocalSpecialty">
                <el-switch v-model="CommodityDataModify.isLocalSpecialty"></el-switch>
            </el-form-item> -->
            <el-form-item label="列表图">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :file-list="imgList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片支持jpg、jpeg、png等,小于2M,支持1张</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="详情banner">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
                    :file-list="bannerList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 2)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 2)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 2)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 2)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 2)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片支持jpg、jpeg、png等,小于2M,支持5张</label>
                </el-upload>
            </el-form-item>
            <!-- <el-form-item label="商品描述图">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
                    :file-list="descList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 3)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 3)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 3)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 3)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 3)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片支持jpg、jpeg、png等</label>
                </el-upload>
            </el-form-item> -->
            <uploadpic :isDisabled="isDisabled" :descList="descList" @descListevent="descListevent"></uploadpic>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BO_PROD_HOTELPROD_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommodityDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="" :visible.sync="dialogPriceVisible" width="38%">
            <el-table :data="priceData">
                <el-table-column property="startTime" label="开始时间" min-width="160px" align=center></el-table-column>
                <el-table-column property="endTime" label="结束时间" min-width="160px" align=center></el-table-column>
                <el-table-column property="purPrice" label="采购单价" min-width="80px" align=center></el-table-column>
                <el-table-column property="lastUpdatedByName" label="操作人姓名" min-width="100px"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import uploadpic from "@/components/uploadpic"
export default {
    name: 'LonganHotelPlatCommodityModify',
    components:{
        uploadpic,
    },
    data(){
        var priceReg = /^\d+(\.\d+)?$/
        var validatePrice = (rule,value,callback) => {
            if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var validatePriceReq = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var countReg = /^(0|\+?[1-9][0-9]*)$/
        var validateCount = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!countReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        const typeDataDetail = [];
        return {
            authzData: '',
            // orgId: '',
            isShowTree: false,
            selectMarketData: '',
            selectMarketIdList: [],
            typeDataDetail: JSON.parse(JSON.stringify(typeDataDetail)),
            defaultProps: {
                children: 'childrenList',
                label: 'categoryName'
            },
            marketIdData: [],
            hpcId: '',
            loadingH: false,
            hotelList: [],
            marketList: [],
            tagsList: [],
            prodList: [],
            expressFeeList: [],
            // protocolList: [],
            couponList: [],
            delivWayList: [],
            pickUpPointList: [],
            prodId: '',
            isInvShow: false,
            isSafeInv: true,
            isFreeShip: false,
            isPickUp: false,
            isAbleModify: true,
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            imgList: [],
            bannerList: [],
            isDisabled: false,
            descList: [],
            functionList: [],
            yCouponList: [],   //优惠券列表
            cCouponList: [],   //卡券列表
            CommodityDataModify: {
                prodName: '',
                delivWays: [],
                isNeedInv: true,
                prodMarketPrice: '',
                prodSafeCount: 0,
                isFreeShipping: true,
                expressFeeId: '',
                prodSupplyPrice: '',
                prodRetailPrice: '',
                prodMarketPrice: '',
                availableSaleQty: -999,
                pickUpPointIds: [],
                // functionData: [{
                //     funcId: '',
                //     classifyList: [],
                //     classifyIds: []
                // }]
            },
            commodityName: '',
            commodityCode: '',
            // maxPrice: '',
            suggestPrice: '',
            isSubmit: false,
            dialogPriceVisible: false,
            priceData: [],
            pTypeList: [],   //商品形式列表
            rules: {
                hotelId: [
                    {required: true, message: '请选择酒店', trigger: 'change'},
                ],
                prodCode: [
                    {required: true, message: '请选择商品', trigger: 'change'},
                ],
                prodShowName: [
                    {min: 1, max: 50, message: '商品显示名称请保持在50个字符以内', trigger: ['blur','change']}
                ],
                prodType: [
                    {required: true, message: '请选择商品形式', trigger: 'change'}
                ],
                prodSupplyPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                prodRetailPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                prodMarketPrice: [
                    {validator: validatePriceReq, trigger: ['blur','change']}
                ],
                prodSafeCount: [
                    // {required: true, message: '请输入安全库存', trigger: 'blur'},
                    // {min: 1, max: 9999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                    {validator: validateCount, trigger: ['blur','change']}
                ],
                // prodPurPrice: [
                //     {required: true, validator: validatePrice, trigger: ['blur','change']}
                // ],
                delivWays: [
                    {required: true, message: '请选择配送方式', trigger: 'change'},
                ],
                
                // servicePhone: [
                //     {required: true, message: '请填写客服电话', trigger: 'blur'},
                //     {min: 1, max: 20, message: '客服电话请保持在20个字符以内', trigger: ['blur','change']}
                // ],
                availableSaleQty: [
                    {required: true, message: '请输入可售数量', trigger: 'blur'},
                    {min: -999, max: 9999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
                funcId: [
                    {required: true, message: '请选择功能区', trigger: 'change'},
                ],
                // classifyIds: [
                //     {required: true, message: '请选择功能区分类', trigger: 'change'},
                // ],
                //电子券选择
                couponType: [
                    {required: true, message: '请选择类型', trigger: 'change'},
                ],
                couponId: [
                    {required: true, message: '请选择名称', trigger: 'change'},
                ],
                couponCount: [
                    {required: true, message: '请输入数量', trigger: 'blur'},
                    {min: 1, max: 999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
                couponSort: [
                    {required: true, message: '请输入排序', trigger: 'blur'},
                    {min: -999999999, max: 999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hpcId = this.$route.query.id;
        this.hotelPlatCommodityDetail();
        this.getHotelList();
        // this.getHotelCouponList();
        // this.getProdCouponList();
        this.basicDataItems_PT();
        this.basicDataItems();
        this.getExpFeeList();
        // this.getMarketList(this.$route.params.hotelId);
        // this.getHotelMarketDetail(this.$route.params.hotelId);
    },
    methods: {
        //商品描述图
        descListevent(e){
            this.descList = e.fileList;
        },
        //获取商品形式 - 字典表
        basicDataItems_PT() {
            const params = {
                key: 'PROD_TYPE',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if (result.code == 0) {
                        this.pTypeList = result.data.map(item => {
                            return {
                                id: parseInt(item.dictValue),
                                name: item.dictName
                            }
                        })
                    } else {
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error, "警告", {
                        confirmButtonText: "确定"
                    })
                })
        },
        //选择商品形式
        selectProdType(val){
            if(val == "3"){
                this.$message.warning("平台商品不支持菜品！");
                this.CommodityDataModify.prodType = "";
            }
        },
        //添加
        couponAddLine(){
            let newLine = {
                couponType: '',
                couponId: '',
                couponCount: 1,
                couponSort: 0,
            };
            this.CommodityDataModify.EleCouponsData.push(newLine);
        },
        //移除
        giftDeleteLine(index){
            this.CommodityDataModify.EleCouponsData.splice(index, 1);
        },
        //选择礼包类型 1：卡券 2：优惠券
        selectCouponT(index, cType){
            if(cType == 1){
                this.CommodityDataModify.EleCouponsData[index].couponList = this.cCouponList;
            }else if(cType == 2){
                this.CommodityDataModify.EleCouponsData[index].couponList = this.yCouponList;
            }
        },
        //优惠券列表
        getProdCouponList(){
            const that = this;
            let params = {};
            this.$api.getProdCouponList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.yCouponList = result.data.map(item => {
                            return {
                                id: item.id,
                                couponName: item.couponBatchName
                            }
                        });
                        this.CommodityDataModify.EleCouponsData = this.CommodityDataModify.EleCouponsData.map(item => {
                            let couponList;
                            if(item.couponType == 1){
                                couponList = that.cCouponList;
                            }else{
                                couponList = that.yCouponList;
                            }
                            return {
                                couponType: item.couponType,
                                couponList: couponList,
                                couponId: item.couponId,
                                couponCount: item.couponCount,
                                couponSort: item.couponSort,
                            }
                        });
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
        //获取卡券列表
        getHotelCouponList(){
            const that = this;
            const params = {};
            // console.log(params);
            this.$api.getHotelCouponList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            this.cCouponList = result.data.map(item => {
                                return{
                                    id: item.id,
                                    couponName: item.vouName
                                }
                            })
                            this.CommodityDataModify.EleCouponsData = this.CommodityDataModify.EleCouponsData.map(item => {
                                let couponList;
                                if(item.couponType == 1){
                                    couponList = that.cCouponList;
                                }else{
                                    couponList = that.yCouponList;
                                }
                                return {
                                    couponType: item.couponType,
                                    couponList: couponList,
                                    couponId: item.couponId,
                                    couponCount: item.couponCount,
                                    couponSort: item.couponSort,
                                }
                            });
                        }
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
        //获取配送方式 - 字典表
        basicDataItems(){
             const params = {
                key: 'DEVI',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        if(result.data.length != 0){
                            this.delivWayList = result.data.map(item => {
                                return{
                                    id: item.dictValue,
                                    delivWayName: item.dictName
                                }
                            })
                        }
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

        //获取酒店自提点列表
        getHotelPickUpPointList(hotelId){
            const params = {
                hotelId: hotelId
            };
            // console.log(params);
            this.$api.getHotelPickUpPointList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            this.pickUpPointList = result.data.map(item => {
                                return{
                                    id: item.id,
                                    pickUpPointName: item.pointName
                                }
                            })
                        }
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
        //获取酒店列表
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
        hotelChange(){
            if(this.CommodityDataModify.hotelId == ''){
                this.prodList = [];
                this.pickUpPointList = [];
                this.CommodityDataModify.functionData = [{
                    funcId: '',
                    classifyList: [],
                    classifyIds: []
                }];
            }else{
                this.CommodityDataModify.prodName = '';
                this.CommodityDataModify.pickUpPointIds = [];
                this.CommodityDataModify.functionData = [{
                    funcId: '',
                    classifyList: [],
                    classifyIds: []
                }];
                this.getFunctionList();
                this.getProdList(this.CommodityDataModify.hotelId);
                this.getHotelPickUpPointList(this.CommodityDataModify.hotelId);
            }
        },
        //获取快递费模板列表
        getExpFeeList(){
            this.$api.getExpressFee()
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            this.expressFeeList = result.data.map(item => {
                                return {
                                    id: item.id,
                                    exFeeName: item.modelName
                                }
                            });
                        }
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
        //选择商品形式
        selectProdType(value){
            this.CommodityDataModify.delivWays = [];
            this.isInvShow = false;
            this.isFreeShip = false;
            this.isPickUp = false;
            this.functionList = [];
        },
        //选择配送方式
        selectDelivType(value){
            if(this.CommodityDataModify.prodType == 2){
                this.CommodityDataModify.delivWays = ["5"];
                this.getFunctionList();
            }else{
                if(value.length != 0){
                    //店内送
                    let dnsIndex = this.CommodityDataModify.delivWays.indexOf("1");
                    //快递送
                    let kdIndex = this.CommodityDataModify.delivWays.indexOf("2");
                    //迷你吧
                    let mnbIndex = this.CommodityDataModify.delivWays.indexOf("3");
                    //自提区
                    let ztIndex = this.CommodityDataModify.delivWays.indexOf("4");
                    //电子商品
                    let zzIndex = this.CommodityDataModify.delivWays.indexOf("5");
                    //堂食
                    let tsIndex = this.CommodityDataModify.delivWays.indexOf("6");
                    //外卖
                    let wmIndex = this.CommodityDataModify.delivWays.indexOf("7");
                    //外带
                    let wdIndex = this.CommodityDataModify.delivWays.indexOf("8");
                    if(this.CommodityDataModify.prodType == 1){
                        if(zzIndex != -1){
                            this.$message.warning("实物-商品不支持电子商品/堂食/外卖/外带！");
                            this.CommodityDataModify.delivWays.splice(zzIndex, 1);
                        }else if(tsIndex != -1){
                            this.$message.warning("实物-商品不支持电子商品/堂食/外卖/外带！");
                            this.CommodityDataModify.delivWays.splice(tsIndex, 1);
                        }else if(wmIndex != -1){
                            this.$message.warning("实物-商品不支持电子商品/堂食/外卖/外带！");
                            this.CommodityDataModify.delivWays.splice(wmIndex, 1);
                        }else if(wdIndex != -1){
                            this.$message.warning("实物-商品不支持电子商品/堂食/外卖/外带！");
                            this.CommodityDataModify.delivWays.splice(wdIndex, 1);
                        }else{
                            //店内送
                            if(dnsIndex == -1 && mnbIndex == -1){
                                this.isInvShow = false;
                                this.CommodityDataModify.isNeedInv = false;
                            }else{
                                this.isInvShow = true;
                                this.CommodityDataModify.isNeedInv = true;
                            }
                            //快递送
                            if(kdIndex != -1){
                                this.isFreeShip = true;
                            }else{
                                this.isFreeShip = false;
                            }
                            //自提区
                            if(ztIndex != -1){
                                this.isPickUp = true;
                            }else{
                                this.isPickUp = false;
                            }
                        }
                    }
                    this.getFunctionList();
                }else{
                    this.isInvShow = false;
                    this.isFreeShip = false;
                    this.isPickUp = false;
                    this.functionList = [];
                }
            }
            // if(value.length == 0){
            //     this.isInvShow = false;
            //     this.isFreeShip = false;
            //     this.functionList = [];
            // }else if(value.length == 1){
            //     if(value[0] == 0){
            //         this.isInvShow = true;
            //         this.isFreeShip = false;
            //         // this.CommodityDataModify.isFreeShipping = '';
            //     }else{
            //         this.isInvShow = false;
            //         this.isFreeShip = true;
            //     }
            //     this.getFunctionList();
            // }else if(value.length == 2){
            //     this.isInvShow = true;
            //     this.isFreeShip = true;
            //     this.getFunctionList();
            // }
        },
        //选择是否需要库存
        selectIsInv(value){
            if(value){
                this.isSafeInv = true;
            }else{
                this.isSafeInv = false;
                // this.CommodityDataModify.prodSafeCount = 0;
            }
        },
        //获取酒店商品下未被选用的功能区列表
        getFunctionList(){
            if(this.CommodityDataModify.hotelId == '' || this.CommodityDataModify.hotelId == undefined){
                return false;
            }
            const params = {
                hotelId: this.CommodityDataModify.hotelId,
                delivWays: (this.CommodityDataModify.delivWays).toString(),
            };
            // console.log(params);
            this.$api.hotelProdUnsedFunctionList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            this.functionList = result.data.map(item => {
                                return{
                                    funcId: item.id,
                                    funcCnName: item.funcCnName
                                }
                            });
                        }
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
        //选择功能区
        selectFunction(index, funcId){
            this.CommodityDataModify.functionData[index].classifyList = [];
            this.CommodityDataModify.functionData[index].classifyIds = [];
            this.getClassifyList(index, funcId);
        },
        //获取功能市场分类
        getClassifyList(index, funcId){
            const that = this;
            let funcIndex = index;
            const params = {
                hotelId: this.CommodityDataModify.hotelId,
                funcId: funcId
            };
            this.$api.hotelProdUnsedFunctionCategory(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            that.CommodityDataModify.functionData[funcIndex].classifyList = result.data.map(item => {
                                return{
                                    categoryId: item.id,
                                    categoryName: item.categoryName
                                }
                            });
                        }
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
        //选择功能区市场分类
        selectClassify(index, funcId, classifyIds){
            const that = this;
            let funcIndex = index;
            const params = {
                hotelId: this.CommodityDataModify.hotelId,
                funcId: funcId,
                categoryIds: classifyIds.toString()
            };
            this.$api.hotelProdUnsedVerifyAlloc(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code != '0'){
                        this.$message.error(result.msg);
                        let cIds = that.CommodityDataModify.functionData[funcIndex].classifyIds;
                        that.CommodityDataModify.functionData[funcIndex].classifyIds.splice(cIds.length-1,1);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //新增行
        functionAddLine(){
            for(let i = 0; i < this.CommodityDataModify.functionData.length; i++){
                if(this.CommodityDataModify.functionData[i].funcId == ''){
                    this.$message.error('请选择功能区');
                    return false
                }
            }
            let newLine = {
                funcId: '',
                classifyList: [],
                classifyIds: []
            };
            this.CommodityDataModify.functionData.push(newLine);
        },
        //删除行
        functionDeleteLine(index){
            this.CommodityDataModify.functionData.splice(index, 1);
        },

        showMarketTree(){
            this.isShowTree = true;
        },
        hideMarketTree(){
            this.isShowTree = false;
        },
        selectMarket(){
            let treeNodes = this.$refs.tree.getCheckedNodes();
            let treeKeys = this.$refs.tree.getCheckedKeys();
            this.selectMarketIdList = treeKeys;
            let treeNameArr = '';
            for(let i = 0; i < treeNodes.length; i++){
                treeNameArr += treeNodes[i].categoryName + '、'
            }
            this.selectMarketData = treeNameArr;
        },
        //获取市场分类 - 树
        getHotelMarketDetail(hotelId){
            const params = {
                hotelId: hotelId
            };
            this.$api.getHotelMarketDetail(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.typeDataDetail = result.data;
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

        //transform 转换
        transformFunc(val){
            if(val == 1){ return true }else{ return false }
        },
        //获取商品详情
        hotelPlatCommodityDetail(){
            const that = this;
            const id = this.hpcId;
            const params = {};
            // console.log(id);
            this.$api.hotelPlatCommodityDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        // var marketInfo = result.data.hotelMarketCategoryDTOList;
                        // if(result.data.isSupportRmsvc == 1){
                        //     this.isService = true;
                        // }else{
                        //     this.isService = false;
                        // }
                        // for(let i = 0; i < marketInfo.length; i++){
                        //     const market = {
                        //         id: marketInfo[i].id,
                        //         categoryName: marketInfo[i].categoryName,
                        //     };
                        //     this.tagsList.push(market);
                        //     const category = this.marketList.find(item => item.id === marketInfo[i].id);
                        //     this.marketList.splice(this.marketList.indexOf(category), 1);
                        // }

                        // this.selectMarketIdList = result.data.hotelMarketCategoryDTOList.map(item => {
                        //     return item.id
                        // });
                        // let treeNameArr = '';
                        // for(let i = 0; i < result.data.hotelMarketCategoryDTOList.length; i++){
                        //     treeNameArr += result.data.hotelMarketCategoryDTOList[i].categoryName + '、'
                        // }
                        // this.selectMarketData = treeNameArr;
                        this.CommodityDataModify = result.data;
                        //店内送
                        let dnsIndex = result.data.delivWays.indexOf("1");
                        //迷你吧
                        let mnbIndex = result.data.delivWays.indexOf("3");
                        if(dnsIndex == -1 && mnbIndex == -1){
                            this.isInvShow = false;
                        }else{
                            this.isInvShow = true;
                        }
                        //快递送
                        let kdIndex = result.data.delivWays.indexOf("2");
                        if(kdIndex != -1){
                            this.isFreeShip = true;
                        }else{
                            this.isFreeShip = false;
                        }
                        //自提区
                        let ztIndex = result.data.delivWays.indexOf("4");
                        if(ztIndex != -1){
                            this.isPickUp = true;
                        }else{
                            this.isPickUp = false;
                        }
                        /*if(result.data.delivWay == 1){
                            this.isInvShow = true;
                            this.isFreeShip = false;
                            if(result.data.isNeedInv == 1){
                                this.isSafeInv = true;
                            }else{
                                this.isSafeInv = false;
                            }
                        }else if(result.data.delivWay == 2){
                            this.isInvShow = false;
                            this.isFreeShip = true;
                        }else if(result.data.delivWay == 3){
                            this.isInvShow = true;
                            this.isFreeShip = true;
                            if(result.data.isNeedInv == 1){
                                this.isSafeInv = true;
                            }else{
                                this.isSafeInv = false;
                            }
                        }*/
                        this.commodityName = result.data.prodProductDTO.prodName;
                        this.commodityCode = result.data.prodProductDTO.prodCode;
                        // this.maxPrice = result.data.prodProductDTO.prodPurMaxPrice;
                        this.suggestPrice = result.data.prodProductDTO.prodAdvisePrice;
                        this.CommodityDataModify.isNeedInv = that.transformFunc(result.data.isNeedInv);
                        this.CommodityDataModify.isFreeShipping = that.transformFunc(result.data.isFreeShipping);
                        this.CommodityDataModify.isLocalSpecialty = that.transformFunc(result.data.isLocalSpecialty);
                        if(result.data.prodLogoUrl != "" && result.data.prodLogoUrl != null){
                            this.imgList = [{
                                name: result.data.prodLogoPath,
                                url:  result.data.prodLogoUrl,
                                path: result.data.prodLogoPath
                            }];
                        }
                        if(result.data.bannerImageList != null){
                            this.bannerList = result.data.bannerImageList.map(item => {
                                return {
                                    id: item.id,
                                    name: item.imagePath,
                                    url: item.imageUrl,
                                    path: item.imagePath
                                }
                            });
                        }
                        if(result.data.descImageList != null){
                            this.descList = result.data.descImageList.map(item => {
                                return {
                                    id: item.id,
                                    name: item.imagePath,
                                    url: item.imageUrl,
                                    path: item.imagePath,
                                    sort: item.sort,
                                }
                            });
                        }
                        this.CommodityDataModify.EleCouponsData = result.data.elecBatchList.map(item => {
                            return{
                                couponType: item.batchType,
                                // couponList: [],
                                couponId: item.batchId,
                                ticketName: item.ticketName,
                                couponCount: item.count,
                                couponSort: item.sort,
                            }
                        });
                        this.CommodityDataModify.functionData = result.data.funcParams.map((item, index) => {
                            that.getClassifyList(index, item.funcId);
                            return{
                                funcId: item.funcId,
                                classifyList: [],
                                classifyIds: item.marketCategoryIds
                            }
                        });

                        this.getProdList(result.data.hotelId);
                        // this.getHotelMarketDetail(this.$route.params.hotelId);
                        this.isDisableDelivWay(result.data.hotelId, result.data.id);
                        this.getFunctionList();
                        this.getHotelPickUpPointList(result.data.hotelId);
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
        //检验配送方式是否可修改（检验功能区下是否有商品或者酒店商品有没有被功能区使用）
        isDisableDelivWay(hotelId, hotelProdId){
            const params = {
                hotelId: hotelId,
                hotelProdId: hotelProdId,
            };
            this.$api.isDisableDelivWay(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        if(result.data){
                            this.isAbleModify = false;
                        }else{
                            this.isAbleModify = true;
                        }
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
        //获取市场分类列表
        getMarketList(value){
            const params = {
                // encryptedOrgId: this.orgId,
                // orgAs: 2,
                hotelId: value
            };
            // console.log(params);
            this.$api.hotelCommodityMarketListM(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.marketList = result.data.map(item => {
                            return {
                                id: item.id,
                                categoryName: item.categoryName
                            }
                        });
                        this.hotelPlatCommodityDetail();
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
        //添加市场分类
        categorySelect(value){
            const category = this.marketList.find(item => item.id === value);
            // console.log(category);
            this.tagsList.push(category);
            // console.log(this.tagsList);
            this.marketList.splice(this.marketList.indexOf(category), 1);
            // console.log(this.marketList);
            this.CommodityDataModify.marketType = '';
        },
        //取消添加的市场分类
        tagClose(tag){
            // console.log(tag);
            this.tagsList.splice(this.tagsList.indexOf(tag), 1);
            this.marketList.push(tag);
            // console.log(this.marketList);
        },

        //获取商品列表
        getProdList(value){
            const params = {
                hotelId: value
            };
            // console.log(params);
            this.$api.hotelPlatCommodityUnused(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.prodList = result.data.map(item => {
                            return {
                                id: item.prodCode,
                                prodName: item.prodName
                            }
                        });
                        const prodAdd = {
                            id: this.commodityCode,
                            prodName: this.commodityName
                        };
                        this.prodList.push(prodAdd);
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
        //查看历史价格
        lookHistoryPrice(){
            const params = {
                hotelId: this.CommodityDataModify.hotelId,
                hotelProdId: this.hpcId
            };
            // console.log(params);
            this.$api.lookHistoryPrice(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.priceData = result.data;
                        this.dialogPriceVisible = true;
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
        //switch转换
        switchFunc(val){
            if(val){ return 1 }else{ return 0 }
        },
        //确定 - 修改
        submitForm(CommodityDataModify){
            // let marketIdList = this.$refs.tree.getCheckedKeys();
            let marketIdList = this.selectMarketIdList;
            // const marketIdList = this.tagsList.map(item => {
            //    return item.id
            // });
            let pMarketPrice;
            if(this.CommodityDataModify.prodMarketPrice == ''){
                pMarketPrice = '';
            }else{
                pMarketPrice = parseFloat(this.CommodityDataModify.prodMarketPrice).toFixed(2);
            }
            const logoPathArr = JSON.stringify(this.imgList.map(item => item.path));
            const logoPathStr = logoPathArr.substr(2,logoPathArr.length-4);
            const bannerPath = this.bannerList.map(item => item.path);
            // const descPath = this.descList.map(item => item.path);
            let descPath = this.descList.map(item => {
                return{
                    imagePath: item.path,
                    sort: item.sort,
                }
            });
            const id = this.hpcId;
            // console.log(params);
            this.$refs[CommodityDataModify].validate((valid) => {
                if (valid) {
                    // if(this.CommodityDataModify.prodType == 2){
                    //     if(this.CommodityDataModify.vouBatchId == ''){
                    //         this.$message.error('请选择卡券!');
                    //         return false
                    //     }
                    // }
                    //店内送、迷你吧
                    let dnsIndex = this.CommodityDataModify.delivWays.indexOf("1");
                    let mnbIndex = this.CommodityDataModify.delivWays.indexOf("3");
                    if(dnsIndex != -1 || mnbIndex != -1){
                        if(this.CommodityDataModify.isNeedInv){
                            if(this.CommodityDataModify.prodSafeCount == ''){
                                this.$message.error('请输入安全库存!');
                                return false
                            }
                        }
                    }
                    //快递送
                    let kdIndex = this.CommodityDataModify.delivWays.indexOf("2");
                    if(kdIndex != -1){
                        if(!this.CommodityDataModify.isFreeShipping){
                            if(this.CommodityDataModify.expressFeeId == ''){
                                this.$message.error('请选择快递费模板!');
                                return false
                            }
                        }
                    }
                    /*if(this.CommodityDataModify.delivWays.length == 1){
                        if(this.CommodityDataModify.delivWays[0] == 0){
                            if(this.CommodityDataModify.isNeedInv){
                                if(this.CommodityDataModify.prodSafeCount == ''){
                                    this.$message.error('请输入安全库存!');
                                    return false
                                }
                            }
                        }
                        if(this.CommodityDataModify.delivWays[0] == 1){
                            // if(this.CommodityDataModify.isFreeShipping === ''){
                            //     this.$message.error('请选择快递费!');
                            //     return false
                            // }else{
                                if(!this.CommodityDataModify.isFreeShipping){
                                    if(this.CommodityDataModify.expressFeeId == ''){
                                        this.$message.error('请选择快递费模板!');
                                            return false
                                    }
                                }
                            // }
                        }
                    }
                    if(this.CommodityDataModify.delivWays.length == 2){
                        if(this.CommodityDataModify.isNeedInv){
                            if(this.CommodityDataModify.prodSafeCount == ''){
                                this.$message.error('请输入安全库存!');
                                return false
                            }
                        }
                        // if(this.CommodityDataModify.isFreeShipping === ''){
                        //     this.$message.error('请选择快递费!');
                        //     return false
                        // }else{
                            if(!this.CommodityDataModify.isFreeShipping){
                                if(this.CommodityDataModify.expressFeeId == ''){
                                    this.$message.error('请选择快递费模板!');
                                        return false
                                }
                            }
                        // }
                    }*/
                    //判断功能区不可重复
                    let funcIds = [];
                    for(let i = 0; i < this.CommodityDataModify.functionData.length; i++){
                        funcIds.push(this.CommodityDataModify.functionData[i].funcId);
                    }
                    let funcIdsSort = funcIds.sort();
                    for(let j = 0; j < funcIds.length; j++){
                        if(funcIdsSort[j] == funcIdsSort[j+1]){
                            this.$message.error('功能区不可重复选择!');
                            return false
                        }
                    }
                    let funcDataList = this.CommodityDataModify.functionData.map(item => {
                        return {
                            funcId: item.funcId,
                            marketCategoryIds: item.classifyIds
                        }
                    });
                    const params = {
                        prodOwnerOrgKind: 2,
                        hotelId: this.CommodityDataModify.hotelId,
                        // marketCategoryList: marketIdList,
                        prodCode: this.CommodityDataModify.prodCode,
                        prodShowName: this.CommodityDataModify.prodShowName,
                        prodType: this.CommodityDataModify.prodType,
                        vouBatchId: this.CommodityDataModify.vouBatchId,
                        // prodPurPrice: parseFloat(this.CommodityDataModify.prodPurPrice).toFixed(2),
                        prodSupplyPrice: parseFloat(this.CommodityDataModify.prodSupplyPrice).toFixed(2),
                        prodRetailPrice: parseFloat(this.CommodityDataModify.prodRetailPrice).toFixed(2),
                        prodMarketPrice: pMarketPrice,
                        delivWays: this.CommodityDataModify.delivWays,
                        isNeedInv: this.switchFunc(this.CommodityDataModify.isNeedInv),
                        prodSafeCount: this.CommodityDataModify.prodSafeCount,
                        availableSaleQty: this.CommodityDataModify.availableSaleQty,
                        isFreeShipping: this.switchFunc(this.CommodityDataModify.isFreeShipping),
                        expressFeeId: this.CommodityDataModify.expressFeeId,
                        pickUpPointIds: this.CommodityDataModify.pickUpPointIds,
                        // agreementId: this.CommodityDataModify.agreementId
                        // servicePhone: this.CommodityDataModify.servicePhone,
                        isLocalSpecialty: this.switchFunc(this.CommodityDataModify.isLocalSpecialty),
                        funcParams: funcDataList,
                        prodLogoPath: logoPathStr,
                        bannerImages: bannerPath,
                        descImageList: descPath,
                    };
                    this.isSubmit = true;
                    this.$api.hotelPlatCommodityModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('修改成功，请等待审核！');
                                this.$router.push({name: 'LonganHotelPlatCommodityList'});
                            }else{
                                this.$message.error(result.msg);
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
                            this.isSubmit = false;
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            this.$router.push({name: 'LonganHotelPlatCommodityList'});
        },
        //图片上传成功
        handleSuccess(res, file, fileList, index){
            if(index == 1){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.imgList.push(image);
            }else if(index == 2){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.bannerList.push(image);
            }else if(index == 3){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.descList.push(image);
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                this.imgList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
            }else if(index == 2){
                this.bannerList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
            }else if(index == 3){
                this.descList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
            }
        },
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file, index){
            if(index == 1 || index == 2){
                const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传商品图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }else if(index == 3){
                const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
                if (!isJPG) {
                    this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
                }
                return isJPG;
            }
        },
        //文件超出个数限制时
        handleExceed(file, fileList, index){
            if(index == 1){
                this.$message.error('商品列表图只能上传1张！');
            }else if(index == 2){
                this.$message.error('商品详情banner图不能超过5张！');
            }
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList, index){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        }
    }
}
</script>

<style>
.el-checkbox:last-of-type{
    margin-right: 6px;
}
</style>

<style scoped>
.el-input{
    width: 82%;
}
.el-select{
    width: 82%;
}
.el-textarea{
    width: 82%;
}
.commodityadd >>> .el-table::before{
    height: 0px;
}
.commodityadd >>> .el-table td{
    border-bottom: 0px;
    padding: 0px 0px;
}
.commodityadd >>> .el-table .cell{
    padding-left: 0px;
}
</style>

<style lang="less" scoped>
.commodityadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .commodityform{
        width: 42%;
        .treestyle{
            background: #fff;
            border: 1px solid #444;
            position: absolute;
            z-index: 10;
            width: 100%;
            padding: 5px 0px;
            border: 1px solid transparent;
            border-color: rgba(68,68,68,0.1);
            box-shadow: 0px 0px 1px rgba(68,68,68,0.1);
            margin-top: 10px;
            .closetree{
                position: absolute;
                right: 10px;
                top: 0px;
                z-index: 10;
            }
        }
        .inputtime{
            width: 40%;
        }
        .selecttime{
            width: 30%;
        }
        .lookhistoryprice{
            float: right;
            margin-right: -52px;
        }
        .required-icon{
            color: #F56C6C;
        }
        .marginstyle{
            margin-left: -120px;
        }
        .addbtn{
            margin-bottom: 10px;
            background: #ffa522;
            border: #dda522;
            color: #fff;
            display: inline-block;
        }
        .functionadd{
            .funspan{
                display: inline-block;
                width: 108px;
                font-size: 14px;
                color: #666;
                text-align: right;
                padding-right: 12px;
            }
            .hint{
                font-size: 12px;
                color: #bbb;
            }
        }
    }
}
</style>
