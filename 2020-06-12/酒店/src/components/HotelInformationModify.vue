<template>
    <div class="hoteladd">
        <p class="title">修改企业信息</p>
        <el-form v-model="HotelDataModify" :model="HotelDataModify" :rules="rules" ref="HotelDataModify" label-width="180px" class="hotelform">
            <el-form-item>
                <span slot="label"><label class="titlebar">基础信息</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="社会信用代码" prop="hotelUscc">
                <el-input :disabled="true" v-model="HotelDataModify.hotelUscc"></el-input>
            </el-form-item>
            <el-form-item label="酒店名称" prop="hotelName">
                <el-input v-model="HotelDataModify.hotelName"></el-input>
            </el-form-item>
            <el-form-item label="酒店星级" prop="hotelStarLevel">
                <div class="starclass">
                    <el-rate v-model="HotelDataModify.hotelStarLevel"></el-rate>
                    <el-button type="text" size="small" @click="rateEmpty">清空</el-button>
                </div>
            </el-form-item>
            <el-form-item label="酒店装修时间" prop="hotelDecorationYear">
                <!-- <el-date-picker type="date" v-model="HotelDataModify.hotelDecorationYear" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker> -->
                <el-date-picker type="year" v-model="HotelDataModify.hotelDecorationYear" placeholder="选择年" value-format="yyyy"></el-date-picker>
            </el-form-item>
            <el-form-item label="酒店荣誉" prop="hotelHonor">
                <el-input type="textarea" autosize v-model="HotelDataModify.hotelHonor"></el-input>
            </el-form-item>
             <el-form-item label="酒店风格" prop="hotelStyle">
                <el-input type="textarea" autosize v-model="HotelDataModify.hotelStyle"></el-input>
            </el-form-item>
            <el-form-item label="停车场" prop="isHasPark">
                <el-switch v-model="HotelDataModify.isHasPark"></el-switch>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">酒店信息</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="酒店管理员手机号" prop="adminMobile">
                <el-input v-model="HotelDataModify.adminMobile"></el-input>
            </el-form-item>
            <el-form-item label="酒店联系人" prop="hotelContactsName">
                <el-input v-model="HotelDataModify.hotelContactsName"></el-input>
            </el-form-item>
             <el-form-item label="酒店联系人手机" prop="hotelContactsMobile">
                <el-input v-model="HotelDataModify.hotelContactsMobile"></el-input>
            </el-form-item>
            <el-form-item label="酒店订房电话" prop="hotelBookingPhone">
                <el-input v-model="HotelDataModify.hotelBookingPhone"></el-input>
            </el-form-item>
            <el-form-item label="客服电话" prop="hotelServicePhone">
                <el-input v-model="HotelDataModify.hotelServicePhone"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 区域选择</span>
                <el-select v-model="HotelDataModify.selectProvince" placeholder="省级地区" @change="selectProvince" style="width: 26%;">
                    <el-option v-for="item in province" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
                <el-select v-model="HotelDataModify.selectCity" placeholder="市级地区" @change="selectCity" style="width: 26%;">
                    <el-option v-for="item in city" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
                <el-select v-model="HotelDataModify.selectDistrict" placeholder="区级地区" @change="selectArea" style="width: 28%;">
                    <el-option v-for="item in area" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="区域选择" prop="selectProvince">
                <el-select v-model="HotelDataModify.selectProvince" placeholder="省级地区" @change="selectProvince">
                    <el-option v-for="item in province" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="selectCity">
                <el-select v-model="HotelDataModify.selectCity" placeholder="市级地区" @change="selectCity">
                    <el-option v-for="item in city" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="selectDistrict">
               <el-select v-model="HotelDataModify.selectDistrict" placeholder="区级地区" @change="selectArea">
                    <el-option v-for="item in area" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="地址" prop="hotelAddress">
                <el-input type="textarea" :row="2" id="tipinput" v-model="HotelDataModify.hotelAddress"></el-input>
            </el-form-item>
            <el-form-item label="地图定位" prop="mapPosition" style="width: 150%;">
                <!-- <div id="container" style="width:100%;height:200px;" @click="getLngLat"></div> -->
                <div style="width:100%;height: 360px;">
                    <!-- <input id="tipinput" type="text" placeholder="关键字搜索" class="kwSearch" /> -->
                    <div id="container" style="width:87%;height:360px;"></div>
                </div>
            </el-form-item>
            <el-form-item label="经纬度" prop="hotelLngLat">
                <el-input v-model="HotelDataModify.hotelLngLat" maxlength="30"></el-input>
            </el-form-item>
            <!-- <el-form-item label="经度" prop="hotelLongitude">
                <el-input v-model="HotelDataModify.hotelLongitude"></el-input>
                <input type="text" id="lng" hidden>
            </el-form-item>
            <el-form-item label="纬度" prop="hotelLatitude">
                <el-input v-model="HotelDataModify.hotelLatitude"></el-input>
                <input type="text" id="lat" hidden>
            </el-form-item> -->
            <el-form-item label="酒店主题" prop="hotelSkin">
                <!-- <div class="divskin" v-for="item in skinList" :key="item.id">
                    <img :src="item.themeImageUrl" alt="模板" class="imgskin"><br/>
                    <el-radio name="skin" v-model="hotelSkinWatch" :label="item.id">模板{{item.id}}</el-radio>
                </div> -->
                <el-select v-model="HotelDataModify.hotelThemeId" placeholder="请选择" @change="selectSkin">
                    <el-option
                        v-for="item in skinList"
                        :key="item.id"
                        :label="item.themeName"
                        :value="item.id">
                    </el-option>
                </el-select>
                <img :src="themeImageUrl" alt="" class="imgskin">
            </el-form-item>
            <!-- <el-form-item prop="hotelBanner">
                <span slot="label"><label class="required-icon">*</label>酒店banner图</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :file-list="bannerList"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                </el-upload>
            </el-form-item> -->
            <el-form-item>
                <span slot="label"><label class="titlebar">开票设置</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="支持自营商品销售发票" prop="isSupportProdInvoice">
                <el-switch v-model="HotelDataModify.isSupportProdInvoice"></el-switch>
                <!-- <el-radio name="prodTicket" v-model="HotelDataModify.isSupportProdInvoice" :label="1">是</el-radio>
                <el-radio name="prodTicket" v-model="HotelDataModify.isSupportProdInvoice" :label="0">否</el-radio> -->
            </el-form-item>
            <el-form-item v-if="HotelDataModify.isSupportProdInvoice">
                <span slot="label"><label class="required-icon">*</label> 自营商品销售发票类型</span>
                <el-checkbox-group v-model="HotelDataModify.prodInvoiceWayList">
                    <el-checkbox label="0">电子普通发票</el-checkbox>
                    <el-checkbox label="1">增值税专用发票</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="HotelDataModify.isSupportProdInvoice">
                <span slot="label"><label class="required-icon">*</label> 自营商品销售发票税率</span>
                <el-input v-model.trim="HotelDataModify.prodInvoiceTaxRate" maxlength="10"></el-input> %
                <!-- <el-select v-model="HotelDataModify.prodInvoiceTaxRate" placeholder="请选择">
                    <el-option v-for="item in rateList" :key="item.id" :label="item.rateName" :value="item.id"></el-option>
                </el-select> -->
                <!-- <el-select
                    v-model="HotelDataModify.prodInvoiceTaxRateId"
                    filterable
                    remote
                    :remote-method="remoteInvoiceRate"
                    :loading="loadingR"
                    @focus="getInvoiceRateList()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in invoiceRateList"
                        :key="item.id"
                        :label="item.taxRateName"
                        :value="item.id">
                    </el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item label="支持以房费形式开具发票" prop="isSupportRoomInvoice">
                <el-switch v-model="HotelDataModify.isSupportRoomInvoice"></el-switch>
            </el-form-item>
            <el-form-item v-if="HotelDataModify.isSupportRoomInvoice">
                <span slot="label"><label class="required-icon">*</label> 房费发票税率</span>
                <el-input v-model.trim="HotelDataModify.roomInvoiceTaxRate" maxlength="10"></el-input> %
            </el-form-item>
            <el-form-item label="是否显示房费发票提醒" prop="isShowInvoiceReminder">
                <el-switch v-model="HotelDataModify.isShowInvoiceReminder"></el-switch>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">迷你吧</label></span>
            </el-form-item>
            <hr class="line">
            <!-- <el-form-item label="分成比例" prop="hotelRoyaltyRate">
                <el-input :disabled="true" v-model.number="HotelDataModify.hotelRoyaltyRate"></el-input> %
            </el-form-item> -->
            <el-form-item label="补货费率" prop="empReplFee">
                <el-input :disabled="true" v-model.trim="HotelDataModify.empReplFee" maxlength="10"></el-input> 元/格子
            </el-form-item>
            <!-- <el-form-item prop="isInvoice">
                <span class="ticketlabel"><label class="required-icon">*</label> 是否支持开具含商品金额的发票</span>
                <el-radio name="ticket" v-model="HotelDataModify.isInvoice" :label="1">是</el-radio>
                <el-radio name="ticket" v-model="HotelDataModify.isInvoice" :label="0">否</el-radio>
            </el-form-item> -->
            <BannerPicLinkParams :bannerType="bannerType" :isDisabled="isDisabled" :bannerList="cabBannerList" @bannerListEvent="cabBannerEvent"></BannerPicLinkParams>
            <!-- <el-form-item label="迷你吧banner图">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="3"
                    :headers="headers"
                    name="fileContent"
                    :file-list="cabBannerList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片小于2M,最多支持3张图片</label>
                </el-upload>
                <el-select v-model="cabBannerlink1" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="cabBannerlink2" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="cabBannerlink3" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <span slot="label"><label class="titlebar">便利店</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="便利店" prop="isSupportStore">
                <el-switch v-model="HotelDataModify.isSupportStore"></el-switch>
            </el-form-item>
            <el-form-item v-if="HotelDataModify.isSupportStore" prop="delivFee">
                <span slot="label"><label class="required-icon">*</label> 配送费</span>
                <el-input v-model.trim="HotelDataModify.delivFee" maxlength="10"></el-input> 元/件
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">客房服务</label></span>
            </el-form-item>
            <hr class="line">
             <el-form-item label="客房服务" prop="isSupportRmsvc">
                <el-switch v-model="HotelDataModify.isSupportRmsvc"></el-switch>
            </el-form-item>
            <div v-if="HotelDataModify.isSupportRmsvc">
                <BannerPicLinkParams :bannerType="bannerType" :isDisabled="isDisabled" :bannerList="serBannerList" @bannerListEvent="serBannerEvent"></BannerPicLinkParams>
            </div>
            <!-- <el-form-item v-if="HotelDataModify.isSupportRmsvc" label="客房服务banner图">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="3"
                    :headers="headers"
                    name="fileContent"
                    :file-list="serBannerList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 2)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 2)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 2)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 2)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 2)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片小于2M,最多支持3张图片</label>
                </el-upload>
                <el-select v-model="serBannerlink1" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="serBannerlink2" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="serBannerlink3" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->

            <!-- <el-form-item>
                <span slot="label"><label class="titlebar">商城购物&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="酒店商城" prop="isSupportHshop">
                <el-switch v-model="HotelDataModify.isSupportHshop" @change="isMall"></el-switch>
            </el-form-item>
            <el-form-item v-if="HotelDataModify.isSupportHshop">
                <span slot="label"><label class="required-icon">*</label> 配送方式</span>
                <el-checkbox-group v-model="distributionType">
                    <el-checkbox label="0" >客房配送</el-checkbox>
                    <el-checkbox label="1" >快递配送</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="HotelDataModify.isSupportHshop" label="酒店商城banner图">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="3"
                    :headers="headers"
                    name="fileContent"
                    :file-list="shopBannerList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 3)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 3)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 3)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 3)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 3)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片小于2M,最多支持3张图片</label>
                </el-upload>
                <el-select v-model="shopBannerlink1" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="shopBannerlink2" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="shopBannerlink3" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <span slot="label"><label class="titlebar">客房协议价</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="客房协议价" prop="isSupportRoomAlloc">
               <el-switch v-model="HotelDataModify.isSupportRoomAlloc"></el-switch>
            </el-form-item>
            <div v-if="HotelDataModify.isSupportRoomAlloc">
                <BannerPicLinkParams :bannerType="bannerType" :isDisabled="isDisabled" :bannerList="roomBannerList" @bannerListEvent="roomBannerEvent"></BannerPicLinkParams>
            </div>
            <!-- <el-form-item v-if="HotelDataModify.isSupportRoomAlloc" label="客房协议价banner图">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
                    :file-list="roomBannerList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 4)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 4)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 4)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 4)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 4)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片小于2M,最多支持3张图片</label>
                </el-upload>
                <el-select v-model="roomBannerlink1" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="roomBannerlink2" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="roomBannerlink3" placeholder="图片链接">
                    <el-option v-for="item in cabLinkList" :key="item.id" :label="item.url" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <span slot="label"><label class="titlebar">账户信息</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="开户银行" prop="hotelBankBranch">
                <el-input v-model="HotelDataModify.hotelBankBranch"></el-input>
            </el-form-item>
            <el-form-item label="账号名称" prop="hotelAccountName">
                <el-input v-model="HotelDataModify.hotelAccountName"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="hotelBankAccount">
                <el-input v-model="HotelDataModify.hotelBankAccount" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">英文版</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="购物小程序英文显示" prop="isSupportEn">
               <el-switch v-model="HotelDataModify.isSupportEn"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('HotelDataModify')">取消</el-button>
                <el-button v-if="authzlist['F:BH_HOTEL_HOTELINFO_SUBMIT']" type="primary" @click="submitForm('HotelDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import BannerPicLinkParams from "@/components/BannerPicLinkParams"
export default {
    name: 'HotelInformationModify',
    components:{
        BannerPicLinkParams,
    },
    data(){
        var mPhoneReg = /^1\d{10}$/
        var phoneReg = /0\d{2,3}-\d{7,8}/
        var validateCMPhone = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!mPhoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var validatePhone = (rule,value,callback) => {
            if(!phoneReg.test(value) && !mPhoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var validateMPhone = (rule,value,callback) => {
            if(!mPhoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var bankAccount = /^[0-9]{1,30}$/
        var validateBank = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!bankAccount.test(value)){
                callback(new Error('请填写正确的银行账号'))
            }else{
                callback()
            }
        }
        return{
            authzlist: {}, //权限数据
            hotelId: '',
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            id: '',
            province: [],
            city: [],
            area: [],
            skinList: [],
            themeImageUrl: '',
            bannerList: [],
            bannerAddList: [],
            bannerDeleteList: [],
            isSubmit: false,
            invoiceRateList: [],
            loadingR: false,
            cabBannerList: [],
            serBannerList: [],
            shopBannerList: [],
            roomBannerList: [],
            isDisabled: false,
            bannerType: 2,
            empId: '',
            distributionType: [],
            HotelDataModify: {},
            rules: {
                hotelUscc: [
                    {required: true, message: '请填写社会信用代码', trigger: ['blur','change']},
                    {min: 1, max: 32, message: '社会信用代码请保持在32个字符以内', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请填写登录密码', trigger: 'blur'}
                ],
                hotelName: [
                    {required: true, message: '请填写酒店名称', trigger: ['blur','change']}
                ],
                hotelHonor: [
                    {max: 64, message: '请保持在64个字符以内', trigger: ['blur','change']}
                ],
                hotelStyle: [
                    {max: 64, message: '请保持在64个字符以内', trigger: ['blur','change']}
                ],
                hotelContact: [
                     {min: 1, max: 32, message: '酒店联系人请保持在32个字符以内', trigger: ['blur','change']}
                ],
                hotelContactsMobile: [
                    {validator: validateCMPhone, trigger: 'blur'}
                ],
                hotelBookingPhone: [
                    {required: true, message: '请填写酒店订房电话', trigger: ['blur','change']},
                    {min: 1, max: 20, message: '酒店订房电话请保持在20个字符以内', trigger: ['blur','change']}
                ],
                hotelServicePhone: [
                    {required: true, message: '请填写客服电话', trigger: ['blur','change']},
                    {min: 1, max: 20, message: '客服电话请保持在20个字符以内', trigger: ['blur','change']}
                ],
                selectProvince: [
                    {required: true, message: '请选择省', trigger: 'blur'}
                ],
                selectCity: [
                    {required: true, message: '请选择市', trigger: 'blur'}
                ],
                selectDistrict: [
                    {required: true, message: '请选择区', trigger: 'blur'}
                ],
                hotelAddress: [
                    {required: true, message: '请填写酒店地址', trigger: ['blur','change']},
                    {max: 64, message: '请保持在64个字符以内', trigger: ['blur','change']}
                ],
                hotelLngLat: [
                    {required: true, message: '请填写/选择经纬度', trigger: ['blur','change']},
                    {max: 30, message: '经纬度请保持在30个字符以内', trigger: 'change'}
                ],
                hotelThemeId: [
                    {required: true, message: '请选择酒店主题', trigger: 'change'}
                ],
                // hotelBanner: [
                //     {required: true, message: '请上传酒店banner图', trigger: ['blur','change']}
                // ],
                adminMobile: [
                    {required: true, validator: validateMPhone, trigger: ['blur','change']}
                ],
                // hotelRoyaltyRate: [
                //     {required: true, message: '请填写分成比例',  trigger: 'blur'},
                //     {min: 0, max: 9999999999, type: 'number', message: '请填写正确的分成比例', trigger: ['blur','change']}
                // ],
                empReplFee: [
                    {required: true, message: '请填写补货费率',  trigger: 'blur'}
                ],
                // isInvoice: [
                //     {required: true, message: '请选择是否支持开具发票', trigger: 'blur'}
                // ],
                hotelBankBranch: [
                    {max: 32, message: '请保持在32个字符以内', trigger: ['blur','change']}
                ],
                hotelAccountName: [
                    {max: 32, message: '请保持在32个字符以内', trigger: ['blur','change']}
                ],
                hotelBankAccount: [
                    {validator: validateBank, trigger: ['blur','change']}
                ],

                param: [
                    {required: true, message: '请输入参数', trigger: 'blur'},
                    {min: 1, max: 50, message: '参数请保持在50个字符以内', trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.hotelId = localStorage.getItem('hotelId');
        this.hotelDetailInfo();
        // this.initMap();
        this.skinGet();
        // this.getInvoiceRateList();
        // this.basicDataItems();
    },
    methods: {
        cabBannerEvent(e){
            this.cabBannerList = e.fileList;
        },
        serBannerEvent(e){
            this.serBannerList = e.fileList;
        },
        roomBannerEvent(e){
            this.roomBannerList = e.fileList;
        },
        //清空星级
        rateEmpty(){
            this.HotelDataModify.hotelStarLevel = null;
        },
        //获取图片指向链接 - 字典表
        basicDataItems(){
             const params = {
                key: 'HOTEL_IMAGE_LINK_NAME',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.cabLinkList = result.data.map(item => {
                            return{
                                id: item.dictValue,
                                url: item.dictName
                            }
                        })
                        const cabNO = {
                            id: '',
                            url: '无链接'
                        };
                        this.cabLinkList.push(cabNO);
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
        //获取商品销售发票税率列表
        getInvoiceRateList(RName){
            this.loadingR = true;
            const params = {
                taxRateName : RName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.invoiceRateList(params)
                .then(response => {
                    this.loadingR = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.invoiceRateList = result.data.records.map(item => {
                            return{
                                taxRateName: item.taxRateName,
                                id: item.id
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
        remoteInvoiceRate(val){
            this.getInvoiceRateList(val);
        },
        //transform 转换
        transformFunc(val){
            if(val == 1){ return true }else{ return false }
        },
        //酒店详情
        hotelDetailInfo(){
            // const params = {
            //     orgAs: 3
            // };
            this.$api.hotelDetail(this.hotelId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const imageList = result.data.hotelImageDTOs;
                        this.HotelDataModify = result.data;
                        this.HotelDataModify.hotelStarLevel = this.HotelDataModify.hotelStarLevel + 1;
                        this.HotelDataModify.isHasPark = this.transformFunc(result.data.isHasPark);
                        this.HotelDataModify.selectProvince = result.data.province.dictValue;
                        this.HotelDataModify.selectCity = result.data.city.dictValue;
                        this.HotelDataModify.selectDistrict = result.data.area.dictValue;
                        this.HotelDataModify.hotelLngLat = result.data.hotelLongitude + ',' + result.data.hotelLatitude;
                        // this.HotelDataModify.hotelLongitude = result.data.hotelLongitude;
                        // this.HotelDataModify.hotelLatitude = result.data.hotelLatitude;
                        // this.HotelDataModify.isSupportRedPacket = this.transformFunc(result.data.isSupportRedPacket);
                        this.HotelDataModify.isSupportProdInvoice = this.transformFunc(result.data.isSupportProdInvoice);
                        this.HotelDataModify.isSupportRoomInvoice = this.transformFunc(result.data.isSupportRoomInvoice);
                        this.HotelDataModify.isShowInvoiceReminder = this.transformFunc(result.data.isShowInvoiceReminder);
                        this.HotelDataModify.isSupportStore = this.transformFunc(result.data.isSupportStore);
                        this.HotelDataModify.isSupportRmsvc = this.transformFunc(result.data.isSupportRmsvc);
                        this.HotelDataModify.isSupportRoomAlloc = this.transformFunc(result.data.isSupportRoomAlloc);
                        // this.HotelDataModify.isSupportHshop = this.transformFunc(result.data.isSupportHshop);
                        this.HotelDataModify.isSupportEn = this.transformFunc(result.data.isSupportEn);
                        // this.HotelDataModify.isSupportWelfareCab = this.transformFunc(result.data.isSupportWelfareCab);

                        var dtype = result.data.deliveryWayList;
                        for(let i in dtype){
                            this.distributionType.push(dtype[i]);
                        }
                        this.themeImageUrl = result.data.hotelThemeDTO.themeImageUrl;
                        this.id = this.HotelDataModify.id;
                        this.empId = this.HotelDataModify.adminEmpId;
                        this.cabBannerList = result.data.cabImageDTOs.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.url,
                                path: item.imagePath,
                                linkId: item.linkId,
                                isParam: item.isNeedParameter == 1?true:false,
                                paramsData: item.params,
                                paramsLD: []
                            }
                        });
                        this.serBannerList = result.data.rmsvcImageDTOs.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.url,
                                path: item.imagePath,
                                linkId: item.linkId,
                                isParam: item.isNeedParameter == 1?true:false,
                                paramsData: item.params,
                                paramsLD: []
                            }
                        });
                        this.shopBannerList = result.data.hshopImageDTOs.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.url,
                                path: item.imagePath,
                                linkId: item.linkId,
                                isParam: item.isNeedParameter == 1?true:false,
                                paramsData: item.params,
                                paramsLD: []
                            }
                        });
                        this.roomBannerList = result.data.roomAllocImageDTOs.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.url,
                                path: item.imagePath,
                                linkId: item.linkId,
                                isParam: item.isNeedParameter == 1?true:false,
                                paramsData: item.params,
                                paramsLD: []
                            }
                        });
                        this.initMap(result.data.hotelLongitude, result.data.hotelLatitude);
                        this.provinceGet();
                        this.cityGet();
                        this.areaGet();
                    }else{
                        this.$message.error('酒店信息获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //省
        provinceGet(){
            const params = {
                key: 'PROVINCE',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            }
            this.$api.provinceGet(params)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == 0){
                        this.province = response.data.data;
                    }else{
                        this.$message.error('获取省份失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //市
        cityGet(){
            const params = {
                key: 'CITY',
                orgId: '0',
                parentKey: 'PROVINCE',
                parentValue: this.HotelDataModify.selectProvince
            }
            this.$api.provinceGet(params)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == 0){
                        this.city = response.data.data;
                    }else{
                        this.$message.error('获取城市失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //区
        areaGet(){
            const params = {
                key: 'AREA',
                orgId: '0',
                parentKey: 'CITY',
                parentValue: this.HotelDataModify.selectCity
            }
            this.$api.provinceGet(params)
                .then(response => {
                    if(response.data.code == 0){
                        this.area = response.data.data;
                    }else{
                        this.$message.error('获取区域失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //选择-省
        selectProvince(){
            this.HotelDataModify.selectCity = '';
            this.HotelDataModify.selectDistrict = '';
            this.cityGet();
        },
        //选择-市
        selectCity(){
            this.HotelDataModify.selectDistrict = '';
            this.areaGet();
        },
        //选择-区
        selectArea(){
            this.areaGet();
        },
        //地图
        initMap(Mlng, Mlat){
            const that = this;
            var mapLng = Mlng;
            var mapLat = Mlat;
            var map;
            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new AMap.Pixel(10, 20),
                    // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,
                    // 定位按钮的排放位置, RB表示右下
                    buttonPosition: 'RB'
                })
                geolocation.getCurrentPosition()
                AMap.event.addListener(geolocation, 'complete', (e) => {
                    // console.log(e) // 定位成功之后做的事
                    var marker;
                    if(mapLng && mapLat){
                        map = new AMap.Map('container',{
                            center: [mapLng, mapLat],  //初始化地图时显示的中心点坐标
                            resizeEnable: true,   //调整任意窗口的大小，自适应窗口
                            zoom: 16   //初始化地图时显示的地图放大等级
                        })
                        // 定位成功之后再定位处添加一个marker
                        marker = new AMap.Marker({
                            position: new AMap.LngLat(mapLng, mapLat),
                            icon: ''
                        });
                    }else{
                        map = new AMap.Map('container',{
                            center: [e.position.lng, e.position.lat],  //初始化地图时显示的中心点坐标
                            resizeEnable: true,   //调整任意窗口的大小，自适应窗口
                            zoom: 16   //初始化地图时显示的地图放大等级
                        })
                        // 定位成功之后再定位处添加一个marker
                        marker = new AMap.Marker();
                    }

                    //输入提示 - 关键字搜索
                    var autoOptions = {
                        input: "tipinput"
                    };
                    var auto = new AMap.Autocomplete(autoOptions);
                    var placeSearch = new AMap.PlaceSearch({
                        map: map
                    });  //构造地点查询类
                    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
                    function select(e) {
                        that.HotelDataModify.hotelLngLat = '';
                        that.HotelDataModify.hotelLongitude = '';
                        that.HotelDataModify.hotelLatitude = '';
                        // placeSearch.setCity(e.poi.adcode);
                        // placeSearch.search(e.poi.name);  //关键字查询查询
                        let searchL = (e.poi.location.lng + ',' + e.poi.location.lat).split(',');
                        map.setCenter(searchL);
                    }

                    map.add(marker);
                    map.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                        map.addControl(new AMap.ToolBar())
                        map.addControl(new AMap.Scale())
                    })
                    var geocoder = new AMap.Geocoder();
                    map.on('click', function(e){
                        // map.remove(marker);
                        // marker = new AMap.Marker({
                        //     position: new AMap.LngLat(e.lnglat.getLng(), e.lnglat.getLat()),
                        //     icon: ''
                        // });
                        that.HotelDataModify.hotelLngLat = e.lnglat.lng + ',' + e.lnglat.lat;
                        that.HotelDataModify.hotelLongitude = e.lnglat.lng;
                        that.HotelDataModify.hotelLatitude = e.lnglat.lat;
                        var lnglat  = that.HotelDataModify.hotelLngLat.split(',');

                        map.add(marker);
                        marker.setPosition(lnglat);

                        geocoder.getAddress(lnglat, function(status, result) {
                            // console.log(result);
                            if (status === 'complete'&&result.regeocode) {
                                var address = result.regeocode.formattedAddress;
                                that.HotelDataModify.hotelAddress = address;
                            }else{
                                log.error('根据经纬度查询地址失败')
                            }
                        });

                        // document.getElementById("lng").value = e.lnglat.getLng();
                        // document.getElementById("lat").value = e.lnglat.getLat();
                    })
                })
                AMap.event.addListener(geolocation, 'error', (e) => {
                    console.log(e) // 定位失败做的事
                })
            })
        },
        // //经纬度
        // getLngLat(){
        //     this.HotelDataModify.hotelLongitude = document.getElementById("lng").value;
        //     this.HotelDataModify.hotelLatitude = document.getElementById("lat").value;
        // },
        // //图片上传成功
        // handleSuccess(res, file, fileList) {
        //     // console.log(res, file);
        //     const image = {
        //         name: file.name,
        //         url: file.url,
        //         path: res.data
        //     }
        //     // this.bannerAddList.push(image);
        //     this.bannerList.push(image);
        // },
        // //移除图片
        // handleRemove(file, fileList) {
        //     // console.log(fileList);
        //     this.bannerList = fileList.map((item, index)=>{
        //        return {
        //           name: item.name,
        //           url: item.url,
        //           path: item.path
        //        }
        //     })
        // },
        //酒店皮肤
        skinGet(){
            const params = {
                orgAs: 3
            }
            this.$api.skinGet(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == 0){
                        this.skinList = result.data;
                    }else{
                        this.$message.error('获取酒店皮肤失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //选择酒店皮肤
        selectSkin(value){
            const skinUrl = this.skinList.find(item => item.id === value);
            this.themeImageUrl = skinUrl.themeImageUrl;
        },
        //酒店商城
        isMall(){
            this.distributionType = [];
        },
        //switch转换
        switchFunc(val){
            if(val){ return 1 }else{ return 0 }
        },
        //确定-修改酒店信息
        submitForm(HotelDataModify) {
            const id = this.id;
            let that = this;
            const imageList = that.bannerList.map(item => item.path);
            //迷你吧banner图
            let cabBannerPath = this.cabBannerList.map(item => {
                return {
                    imagePath: item.path,
                    linkId: item.linkId,
                    linkParamList: item.paramsData
                }
            });
            //客房服务banner图
            let serBannerPath = this.serBannerList.map(item => {
                return {
                    imagePath: item.path,
                    linkId: item.linkId,
                    linkParamList: item.paramsData
                }
            });
            //酒店商城banner图
            let shopBannerPath = this.shopBannerList.map(item => {
                return {
                    imagePath: item.path,
                    linkId: item.linkId,
                    linkParamList: item.paramsData
                }
            });
            //客房协议价banner图
            let roomBannerPath = this.roomBannerList.map(item => {
                return {
                    imagePath: item.path,
                    linkId: item.linkId,
                    linkParamList: item.paramsData
                }
            });
            // console.log(params);
            // return
            this.$refs[HotelDataModify].validate((valid) => {
                if (valid) {
                    if(that.HotelDataModify.selectProvince == '' || that.HotelDataModify.selectCity == '' || that.HotelDataModify.selectDistrict == ''){
                        this.$message.error('请选择酒店区域');
                        return false
                    }
                    let hprodRateType, roomRateType, shippingFeeType;
                    if(that.HotelDataModify.prodInvoiceTaxRate == ''){
                        hprodRateType = '';
                    }else{
                        hprodRateType = parseFloat(that.HotelDataModify.prodInvoiceTaxRate).toFixed(2);
                    }
                    if(that.HotelDataModify.roomInvoiceTaxRate == ''){
                        roomRateType = '';
                    }else{
                        roomRateType = parseFloat(that.HotelDataModify.roomInvoiceTaxRate).toFixed(2);
                    }
                    if(that.HotelDataModify.delivFee == ''){
                        shippingFeeType = '';
                    }else{
                        shippingFeeType = parseFloat(that.HotelDataModify.delivFee).toFixed(2);
                    }
                    if(that.HotelDataModify.isSupportStore){
                        let sfeeRateReg = /^\d+(\.\d+)?$/;
                        if(!sfeeRateReg.test(that.HotelDataModify.delivFee)){
                            this.$message.error('便利店配送费输入有误！');
                            return false
                        }
                    }
                    if(that.HotelDataModify.isSupportProdInvoice){
                        if(that.HotelDataModify.prodInvoiceWayList.length == '0'){
                            this.$message.error('请选择自营商品销售发票类型!');
                            return false
                        }
                        // if(that.HotelDataModify.prodInvoiceTaxRateId == ''){
                        //     this.$message.error('请选择商品销售发票税率!');
                        //     return false
                        // }
                        if(that.HotelDataModify.prodInvoiceTaxRate == '' || that.HotelDataModify.prodInvoiceTaxRate == undefined){
                            this.$message.error('请输入自营商品销售发票税率!');
                            return false
                        }
                        if(that.HotelDataModify.prodInvoiceTaxRate > 100 || that.HotelDataModify.prodInvoiceTaxRate < 0){
                            this.$message.error('自营商品销售发票税率输入有误！');
                            return false
                        }
                        let hprodrateReg = /^\d+(\.\d+)?$/;
                        if(!hprodrateReg.test(that.HotelDataModify.prodInvoiceTaxRate)){
                            this.$message.error('自营商品销售发票税率输入有误！');
                            return false
                        }
                    }
                    if(that.HotelDataModify.isSupportRoomInvoice){
                        if(that.HotelDataModify.roomInvoiceTaxRate == '' || that.HotelDataModify.roomInvoiceTaxRate == undefined){
                            this.$message.error('请输入房费税率!');
                            return false
                        }
                        if(that.HotelDataModify.roomInvoiceTaxRate > 100 || that.HotelDataModify.roomInvoiceTaxRate < 0){
                            this.$message.error('房费税率输入有误！');
                            return false
                        }
                        let toomrateReg = /^\d+(\.\d+)?$/;
                        if(!toomrateReg.test(that.HotelDataModify.roomInvoiceTaxRate)){
                            this.$message.error('房费税率输入有误！');
                            return false
                        }
                    }
                    if(this.cabBannerList.length == 0){
                        this.$message.error('请上传迷你吧banner图!');
                        return false
                    }
                    for(let i=0; i<this.cabBannerList.length; i++){
                        for(let j=0; j<this.cabBannerList[i].paramsLD.length; j++){
                            if(this.cabBannerList[i].paramsData == null || this.cabBannerList[i].paramsData.length == 0){
                                if(this.cabBannerList[i].paramsLD[j].isNecessary == 1 && (this.cabBannerList[i].paramsLD[j].value == '' || this.cabBannerList[i].paramsLD[j].value == undefined)){
                                    this.$message.error('请填写链接参数的必填参数!');
                                    return false
                                }
                            }
                        }
                    }
                    if(that.HotelDataModify.isSupportRmsvc){
                        if(this.serBannerList.length == 0){
                            this.$message.error('请上传客房服务banner图!');
                            return false
                        }
                        for(let i=0; i<this.serBannerList.length; i++){
                            for(let j=0; j<this.serBannerList[i].paramsLD.length; j++){
                                if(this.serBannerList[i].paramsData == null || this.serBannerList[i].paramsData.length == 0){
                                    if(this.serBannerList[i].paramsLD[j].isNecessary == 1 && (this.serBannerList[i].paramsLD[j].value == '' || this.serBannerList[i].paramsLD[j].value == undefined)){
                                        this.$message.error('请填写链接参数的必填参数!');
                                        return false
                                    }
                                }
                            }
                        }
                    }
                    if(that.HotelDataModify.isSupportRoomAlloc){
                        if (that.HotelDataModify.roomAllocId == '') {
                            this.$message.error('请选择客房协议价的分成协议!');
                            return false
                        }
                        if(this.roomBannerList.length == 0){
                            this.$message.error('请上传客房协议banner图!');
                            return false
                        }
                        for(let i=0; i<this.roomBannerList.length; i++){
                            for(let j=0; j<this.roomBannerList[i].paramsLD.length; j++){
                                if(this.roomBannerList[i].paramsData == null || this.roomBannerList[i].paramsData.length == 0){
                                    if(this.roomBannerList[i].paramsLD[j].isNecessary == 1 && (this.roomBannerList[i].paramsLD[j].value == '' || this.roomBannerList[i].paramsLD[j].value == undefined)){
                                        this.$message.error('请填写链接参数的必填参数!');
                                        return false
                                    }
                                }
                            }
                        }
                    }
                    let params = {
                        adminEmpId: this.empId,
                        hotelUscc: that.HotelDataModify.hotelUscc,
                        hotelName: that.HotelDataModify.hotelName,
                        hotelStarLevel: that.HotelDataModify.hotelStarLevel-1,
                        hotelDecorationYear: that.HotelDataModify.hotelDecorationYear,
                        hotelHonor: that.HotelDataModify.hotelHonor,
                        hotelStyle: that.HotelDataModify.hotelStyle,
                        isHasPark: that.switchFunc(that.HotelDataModify.isHasPark),
                        hotelContactsName: that.HotelDataModify.hotelContactsName,
                        hotelContactsMobile: that.HotelDataModify.hotelContactsMobile,
                        hotelBookingPhone: that.HotelDataModify.hotelBookingPhone,
                        hotelProvince: that.HotelDataModify.hotelProvince,
                        hotelCity: that.HotelDataModify.hotelCity,
                        hotelArea: that.HotelDataModify.hotelArea,
                        hotelAddress: that.HotelDataModify.hotelAddress,
                        hotelLongitude: that.HotelDataModify.hotelLongitude,   // 经度
                        hotelLatitude: that.HotelDataModify.hotelLatitude,   // 纬度
                        hotelThemeId: that.HotelDataModify.hotelThemeId,
                        hotelAddImages: JSON.stringify(imageList),
                        adminMobile: that.HotelDataModify.adminMobile,
                        // hotelRoyaltyRate: that.HotelDataModify.hotelRoyaltyRate,
                        empReplFee: parseFloat(that.HotelDataModify.empReplFee).toFixed(2),

                        isSupportProdInvoice: that.switchFunc(that.HotelDataModify.isSupportProdInvoice),
                        prodInvoiceWayList: that.HotelDataModify.prodInvoiceWayList,
                        // prodInvoiceTaxRateId: that.HotelDataModify.prodInvoiceTaxRateId,
                        prodInvoiceTaxRate: hprodRateType,
                        isSupportRoomInvoice: that.switchFunc(that.HotelDataModify.isSupportRoomInvoice),
                        roomInvoiceTaxRate: roomRateType,
                        isShowInvoiceReminder:  that.switchFunc(that.HotelDataModify.isShowInvoiceReminder),

                        hotelServicePhone: that.HotelDataModify.hotelServicePhone,
                        isSupportStore: that.switchFunc(that.HotelDataModify.isSupportStore),
                        delivFee: shippingFeeType,

                        hotelBankBranch: that.HotelDataModify.hotelBankBranch,
                        hotelAccountName: that.HotelDataModify.hotelAccountName,
                        hotelBankAccount: that.HotelDataModify.hotelBankAccount,
                        isSupportRmsvc: that.switchFunc(that.HotelDataModify.isSupportRmsvc),
                        // isSupportHshop: that.switchFunc(that.HotelDataModify.isSupportHshop),
                        deliveryWayList: that.distributionType,
                        isSupportRoomAlloc: that.switchFunc(that.HotelDataModify.isSupportRoomAlloc),
                        cabImageDTOs: cabBannerPath,
                        rmsvcImageDTOs: serBannerPath,
                        hshopImageDTOs: shopBannerPath,
                        roomAllocImageDTOs: roomBannerPath,
                        isSupportEn: that.switchFunc(that.HotelDataModify.isSupportEn),
                    }
                    this.$api.hotelModify(params,id)
                        .then(response => {
                            // console.log(response);
                            if(response.data.code == '0'){
                                this.$message.success('修改企业信息成功！');
                                that.$router.push({name: 'index'});
                            }else{
                                this.$message.error(result.msg);
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        //图片上传成功
        handleSuccess(res, file, fileList, index){
            const image = {
                name: file.name,
                url: file.url,
                path: res.data,
                link: '',
                id: ''
            }
            if(index == 1){
                this.cabBannerList.push(image);
            }else if(index == 2){
                this.serBannerList.push(image);
            }else if(index == 3){
                this.shopBannerList.push(image);
            }else if(index == 4){
                this.roomBannerList.push(image);
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                this.cabBannerList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path,
                        link: '',
                        id: ''
                    }
                });
            }else if(index == 2){
                this.serBannerList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path,
                        link: '',
                        id: ''
                    }
                });
            }else if(index == 3){
                this.shopBannerList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path,
                        link: '',
                        id: ''
                    }
                });
            }else if(index == 4){
                this.roomBannerList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path,
                        link: '',
                        id: ''
                    }
                });
            }
        },
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file, index){
           const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传商品图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //取消
        resetForm(HotelDataModify) {
            this.$router.push({name: 'HotelPrivilegeUserList'});
        },
        //文件超出个数限制时
        handleExceed(file,fileList, index){
            if(index == 1 || index == 2){
                this.$message.error('上传图片不能超过3张！');
            }else if(index == 4){
                this.$message.error('上传图片不能超过5张！');
            }
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        }
    },
}
</script>

<style>
.el-input--suffix .el-input__inner{
    padding-right: 8px;
}
.el-rate{
    display: inline-block;
    margin-right: 10px;
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
</style>

<style lang="less" scoped>
.hoteladd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 50%;
        .titlebar{
            font-size: 16px;
            color: #999;
        }
        .line{
            width: 200%;
            border: 0px;
            border-bottom: 1px dashed #ccc;
            margin: -15px 0px 20px 0px;
        }
        .lgcstyle{
            position: absolute;
            top: 0px;
            left: 210px;
        }
        .bannerstyle{
            position: relative;
            .bannerlink{
                position: absolute;
                z-index: 10;
                top: 76px;
                left: 200px;
                .el-form-item{
                    height: 102px;
                    margin-bottom: 0px;
                }
            }
        }
        .imgskin{
            width: 48%;
            display: inline-block;
            margin: 15px 0px -22px 0px;
        }
        .kwSearch{
            position: absolute;
            z-index: 1;
            right: 15%;
            top: 8px;
            width: 36%;
            padding: 2px 3px;
            outline: none;
        }
        .ticketlabel{
            margin: 0px 12px 0px -84px;
        }
        .required-icon{
            color: #ff3030;
        }
        .upload-hint{
            font-size: 12px;
            color: #999;
            line-height: 12px;
        }
        .bannerllink{
            width: 63%;
            position: absolute;
            right: 50px;
            top: 0px;
        }
    }
}
</style>

