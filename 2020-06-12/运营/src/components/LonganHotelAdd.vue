<template>
    <div class="hoteladd">
        <p class="title">新增酒店</p>
        <el-form :model="HotelDataAdd" :rules="rules" ref="HotelDataAdd" label-width="180px" class="hotelform">
            <el-form-item>
                <span slot="label"><label class="titlebar">基础信息</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="社会信用代码" prop="socialCreditCode">
                <el-input v-model.trim="HotelDataAdd.socialCreditCode" @blur="isHotelUscc"></el-input>
            </el-form-item>
            <!-- <el-form-item label="管理员用户名" prop="">
                <el-input :disabled="true" v-model="HotelDataAdd.hotelPWD"></el-input>
            </el-form-item> -->
            <el-form-item label="登录密码" prop="hotelPWD">
                <el-input :disabled="true" v-model="HotelDataAdd.hotelPWD"></el-input>
            </el-form-item>
            <el-form-item label="酒店名称" prop="hotelName">
                <el-input v-model="HotelDataAdd.hotelName"></el-input>
            </el-form-item>
            <el-form-item label="酒店星级" prop="hotelStar">
                <div class="starclass">
                    <el-rate v-model="HotelDataAdd.hotelStar"></el-rate>
                    <el-button type="text" size="small" @click="rateEmpty">清空</el-button>
                </div>
            </el-form-item>
            <el-form-item label="酒店装修时间" prop="hotelDecorateTime">
                <!-- <el-date-picker type="date" v-model="HotelDataAdd.hotelDecorateTime" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker> -->
                <el-date-picker type="year" v-model="HotelDataAdd.hotelDecorateTime" placeholder="选择年" value-format="yyyy"></el-date-picker>
            </el-form-item>
            <el-form-item label="酒店荣誉" prop="hotelHonor">
                <el-input type="textarea" autosize v-model="HotelDataAdd.hotelHonor"></el-input>
            </el-form-item>
             <el-form-item label="酒店风格" prop="hotelStyle">
                <el-input type="textarea" autosize v-model="HotelDataAdd.hotelStyle"></el-input>
            </el-form-item>
            <el-form-item label="停车场" prop="isPark">
                <el-switch v-model="HotelDataAdd.isPark"></el-switch>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">酒店信息</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="酒店管理员手机号" prop="hotelAdminPhone">
                <el-input v-model="HotelDataAdd.hotelAdminPhone"></el-input>
            </el-form-item>
            <el-form-item label="酒店联系人" prop="hotelContact">
                <el-input v-model="HotelDataAdd.hotelContact"></el-input>
            </el-form-item>
            <el-form-item label="酒店联系人手机" prop="hotelContactPhone">
                <el-input v-model="HotelDataAdd.hotelContactPhone"></el-input>
            </el-form-item>
            <el-form-item label="酒店订房电话" prop="hotelReservePhone">
                <el-input v-model="HotelDataAdd.hotelReservePhone"></el-input>
            </el-form-item>
            <el-form-item label="客服电话" prop="hotelServicePhone">
                <el-input v-model="HotelDataAdd.hotelServicePhone"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 区域选择</span>
                <el-select v-model="HotelDataAdd.selectProvince" placeholder="省级地区" @change="selectProvinceFun" style="width: 26%;">
                    <el-option v-for="item in province" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
                <el-select v-model="HotelDataAdd.selectCity" placeholder="市级地区" @change="selectCityFun" style="width: 26%;">
                    <el-option v-for="item in city" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
                <el-select v-model="HotelDataAdd.selectDistrict" placeholder="区级地区" style="width: 28%;">
                    <el-option v-for="item in area" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="区域选择" prop="selectProvince">
                <el-select v-model="HotelDataAdd.selectProvince" placeholder="省级地区" @change="selectProvinceFun">
                    <el-option v-for="item in province" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="selectCity">
                <el-select v-model="HotelDataAdd.selectCity" placeholder="市级地区" @change="selectCityFun">
                    <el-option v-for="item in city" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="selectDistrict">
               <el-select v-model="HotelDataAdd.selectDistrict" placeholder="区级地区">
                    <el-option v-for="item in area" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="地址" prop="hotelAddress">
                <el-input type="textarea" :row="2" id="tipinput" v-model="HotelDataAdd.hotelAddress"></el-input>
                <!-- <el-button type="text" size="small" @click="dialogVisibleMap=true">地图定位</el-button> -->
                <!-- <input type="text" id="address" hidden> -->
            </el-form-item>
            <el-form-item label="地图定位" prop="mapPosition" style="width: 150%;">
                <div style="width:100%;height: 360px;">
                    <!-- <input id="tipinput" type="text" placeholder="关键字搜索" class="kwSearch" /> -->
                    <div id="container" style="width:87%;height:360px;"></div>
                </div>
            </el-form-item>
            <el-form-item label="经纬度" prop="hotelLngLat">
                <el-input v-model="HotelDataAdd.hotelLngLat" maxlength="30"></el-input>
            </el-form-item>
            <!-- <el-form-item label="经度" prop="hotelLongitude">
                <el-input v-model="HotelDataAdd.hotelLongitude"></el-input>
                <input type="text" id="lng" hidden>
            </el-form-item>
            <el-form-item label="纬度" prop="hotelLatitude">
                <el-input v-model="HotelDataAdd.hotelLatitude"></el-input>
                <input type="text" id="lat" hidden>
            </el-form-item> -->
            <el-form-item label="酒店主题" prop="hotelSkin">
                <!-- <div class="divskin" v-for="item in skinList" :key="item.id">
                    <img :src="item.themeImageUrl" alt="模板" class="imgskin"><br/>
                    <el-radio name="skin" v-model="HotelDataAdd.hotelSkin" :label="item.id">模板{{item.id}}</el-radio>
                </div> -->
                <el-select v-model="HotelDataAdd.hotelSkin" placeholder="请选择" @change="selectSkin">
                    <el-option 
                        v-for="item in skinList" 
                        :key="item.id" 
                        :label="item.themeName" 
                        :value="item.id">
                    </el-option>
                </el-select>
                <img :src="themeImageUrl" alt="" class="imgskin">
            </el-form-item>
            <!-- <el-form-item prop="hotelBanner" ref="uploadBanner">
                <span slot="label"><label class="required-icon">*</label> 酒店banner图</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :headers="headers"
                    :limit="5"
                    name="fileContent"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    :before-upload="beforeUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                </el-upload>
            </el-form-item> -->
            <!-- <el-form-item>
                <span slot="label"><label class="titlebar">红包设置</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="红包" prop="isSupportRedPacket">
                <el-switch v-model="HotelDataAdd.isSupportRedPacket"></el-switch>
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.isSupportRedPacket" prop="redPacketRate">
                <span slot="label"><label class="required-icon">*</label> 红包比例</span>
                <el-input v-model.trim="HotelDataAdd.redPacketRate" maxlength="10"></el-input> %
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.isSupportRedPacket" prop="minOrderAmount">
                <span slot="label"><label class="required-icon">*</label> 最小订单金额</span>
                <el-input v-model.trim="HotelDataAdd.minOrderAmount" maxlength="10"></el-input> 元
            </el-form-item> -->
            <el-form-item>
                <span slot="label"><label class="titlebar">开票设置</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="支持自营商品销售发票" prop="isHprodTicket">
                <el-switch v-model="HotelDataAdd.isHprodTicket"></el-switch>
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.isHprodTicket">
                <span slot="label"><label class="required-icon">*</label> 自营商品销售发票类型</span>
                <el-checkbox-group v-model="HotelDataAdd.invoiceType">
                    <el-checkbox label="0">电子普通发票</el-checkbox>
                    <el-checkbox label="1">增值税专用发票</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.isHprodTicket">
                <span slot="label"><label class="required-icon">*</label> 自营商品销售发票税率</span>
                <el-input v-model.trim="HotelDataAdd.hprodRate" maxlength="10"></el-input> %
                <!-- <el-select v-model="HotelDataAdd.hprodRate" placeholder="请选择">
                    <el-option v-for="item in rateList" :key="item.id" :label="item.rateName" :value="item.id"></el-option>
                </el-select> -->
                <!-- <el-select
                    v-model="prodInvoiceRateName" 
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
            <el-form-item label="支持以房费形式开具发票" prop="isHroomTicket">
                <el-switch v-model="HotelDataAdd.isHroomTicket"></el-switch>
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.isHroomTicket">
                <span slot="label"><label class="required-icon">*</label> 房费发票税率</span>
                <el-input v-model.trim="HotelDataAdd.roomRate" maxlength="10"></el-input> %
            </el-form-item>
            <el-form-item label="是否显示房费发票提醒" prop="isShowInvoiceReminder">
                <el-switch v-model="HotelDataAdd.isShowInvoiceReminder"></el-switch>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">迷你吧</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="补货费率" prop="hotelRate">
                <el-input v-model.trim="HotelDataAdd.hotelRate" maxlength="10"></el-input> 元/格子
            </el-form-item>
            <!-- <el-form-item prop="isTicket">
                <span class="ticketlabel"><label class="required-icon">*</label> 是否支持开具含商品金额的发票</span>
                <el-radio name="ticket" v-model="HotelDataAdd.isTicket" label="1">是</el-radio>
                <el-radio name="ticket" v-model="HotelDataAdd.isTicket" label="0">否</el-radio>
            </el-form-item> -->
            <el-form-item label="分成协议" prop="agreementId">
                <el-select v-model="HotelDataAdd.agreementId" placeholder="请选择">
                    <el-option
                        v-for="item in protocolList" 
                        :key="item.id" 
                        :label="item.allocName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <div class="bannerstyle">
                <el-form-item label="banner图">
                    <span slot="label"><label class="required-icon">*</label> banner图</span>
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
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                    </el-upload>
                </el-form-item>
                <div class="bannerlink">
                    <el-form-item v-for="(item, index) in cabBannerList" :key="index" class="linkstyle">
                        <el-select v-model="item.link" placeholder="选择链接" style="width: 72%">
                            <el-option 
                                v-for="subitem in bannerLinkList" 
                                :key="subitem.id" 
                                :label="subitem.url" 
                                :value="subitem.id">
                            </el-option>
                        </el-select>&nbsp;&nbsp;
                        <el-button type="text" size="small" @click="linkParam(item.id)">链接参数</el-button>
                    </el-form-item>
                </div>
            </div> -->
            <BannerPicLinkParams :bannerType="bannerType" :isDisabled="isDisabled" :bannerList="cabBannerList" @bannerListEvent="cabBannerEvent"></BannerPicLinkParams>
            <!-- <el-form-item label="迷你吧banner图">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="3"
                    :headers="headers"
                    name="fileContent"
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
            <el-form-item label="便利店" prop="hotelStore">
                <el-switch v-model="HotelDataAdd.hotelStore"></el-switch>
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.hotelStore" prop="hotelShippingFee">
                <span slot="label"><label class="required-icon">*</label> 配送费</span>
                <el-input v-model.trim="HotelDataAdd.hotelShippingFee" maxlength="10"></el-input> 元/件
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.hotelStore" prop="storeAllocId">
                <span slot="label"><label class="required-icon">*</label> 分成协议</span>
                <el-select v-model="HotelDataAdd.storeAllocId" placeholder="请选择">
                    <el-option
                        v-for="item in protocolList" 
                        :key="item.id" 
                        :label="item.allocName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">客房服务</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="客房服务" prop="hotelService">
                <el-switch v-model="HotelDataAdd.hotelService"></el-switch>
            </el-form-item>
            <div v-if="HotelDataAdd.hotelService">
                <!-- <el-form-item>
                    <span slot="label"><label class="required-icon">*</label> banner图</span>
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
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                    </el-upload>
                </el-form-item>
                <div class="bannerlink">
                    <el-form-item v-for="(item, index) in serBannerList" :key="index" class="linkstyle">
                        <el-select v-model="item.link" placeholder="选择链接" style="width: 72%">
                            <el-option 
                                v-for="subitem in bannerLinkList" 
                                :key="subitem.id" 
                                :label="subitem.url" 
                                :value="subitem.id">
                            </el-option>
                        </el-select>&nbsp;&nbsp;
                        <el-button type="text" size="small" @click="linkParam(item.id)">链接参数</el-button>
                    </el-form-item>
                </div> -->
                <BannerPicLinkParams :bannerType="bannerType" :isDisabled="isDisabled" :bannerList="serBannerList" @bannerListEvent="serBannerEvent"></BannerPicLinkParams>
            </div>
            <!-- <el-form-item v-if="HotelDataAdd.hotelService" label="客房服务banner图">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="3"
                    :headers="headers"
                    name="fileContent"
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
                <span slot="label"><label class="titlebar">商城购物</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="酒店商城" prop="hotelMall">
                <el-switch v-model="HotelDataAdd.hotelMall" @change="isMall"></el-switch>
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.hotelMall">
                <span slot="label"><label class="required-icon">*</label> 配送方式</span>
                <el-checkbox-group v-model="HotelDataAdd.distributionType">
                    <el-checkbox label="0">客房配送</el-checkbox>
                    <el-checkbox label="1">快递配送</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.hotelMall">
                <span slot="label"><label class="required-icon">*</label> 分成协议</span>
                <el-select v-model="shopAgreement" placeholder="请选择">
                    <el-option
                        v-for="item in protocolList" 
                        :key="item.id" 
                        :label="item.allocName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.hotelMall" label="酒店商城banner图">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="3"
                    :headers="headers"
                    name="fileContent"
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
            <el-form-item label="客房协议价" prop="roomPrice">
               <el-switch v-model="HotelDataAdd.roomPrice"></el-switch>
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.roomPrice">
                <span slot="label"><label class="required-icon">*</label> 分成协议</span>
                <el-select v-model="roomAgreement" placeholder="请选择">
                    <el-option
                        v-for="item in protocolList" 
                        :key="item.id" 
                        :label="item.allocName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <div v-if="HotelDataAdd.roomPrice">
                <!-- <el-form-item label="banner图">
                    <span slot="label"><label class="required-icon">*</label> banner图</span>
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture"
                        :limit="3"
                        :headers="headers"
                        name="fileContent"
                        :file-list="roomBannerList"
                        :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 4)}"
                        :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 4)}"
                        :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 4)}"
                        :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 4)}"
                        :before-upload="(file, index) => {return beforeUpload(file, 4)}">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                    </el-upload>
                </el-form-item>
                <div class="bannerlink">
                    <el-form-item v-for="(item, index) in roomBannerList" :key="index" class="linkstyle">
                        <el-select v-model="item.link" placeholder="选择链接" style="width: 72%">
                            <el-option 
                                v-for="subitem in bannerLinkList" 
                                :key="subitem.id" 
                                :label="subitem.url" 
                                :value="subitem.id">
                            </el-option>
                        </el-select>&nbsp;&nbsp;
                        <el-button type="text" size="small" @click="linkParam(item.id)">链接参数</el-button>
                    </el-form-item>
                </div> -->
                <BannerPicLinkParams :bannerType="bannerType" :isDisabled="isDisabled" :bannerList="roomBannerList" @bannerListEvent="roomBannerEvent"></BannerPicLinkParams>
            </div>
            <!-- <el-form-item v-if="HotelDataAdd.roomPrice" label="客房协议价banner图">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
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
                <span slot="label"><label class="titlebar">政策信息</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="政策信息" prop="policyInfo">
                <el-input type="textarea" :rows="10" maxlength="250" v-model="HotelDataAdd.policyInfo"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">英文版</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="购物小程序英文显示" prop="isSupportEn">
               <el-switch v-model="HotelDataAdd.isSupportEn"></el-switch>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">福柜设置</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="福柜" prop="isSupportWelfareCab">
                <el-switch v-model="HotelDataAdd.isSupportWelfareCab"></el-switch>
            </el-form-item>
            <el-form-item v-if="HotelDataAdd.isSupportWelfareCab" prop="welfareCabMinOrderAmt">
                <span slot="label"><label class="required-icon">*</label> 最小订单金额</span>
                <el-input v-model.trim="HotelDataAdd.welfareCabMinOrderAmt" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('HotelDataAdd')">取消</el-button>
                <el-button v-if="authzData['F:BO_HOTEL_HOTEL_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('HotelDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import BannerPicLinkParams from "@/components/BannerPicLinkParams"
import AMap from 'AMap'
export default {
    name: 'LonganHotelAdd',
    components:{
        BannerPicLinkParams,
    },
    data(){
        var mPhoneReg = /^1\d{10}$/
        // var phoneReg = /0\d{2,3}-\d{7,8}/
        var phoneReg = /^[0-9]{11}$/
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
        var rateReg = /^\d+(\.\d+)?$/
        var validateRate = (rule,value,callback) => {
            if(!rateReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var isValidateRate = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!rateReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            dialogVisibleMap: false,
            authzData: '',
            oprId: '',
            map: '',
            uploadUrl: this.$api.upload_file_url,
            province: [],
            city: [],
            area: [],
            skinList: [],
            headers: {},
            protocolList: [],   //分成协议列表
            isSubmit: false,
            themeImageUrl: '',
            shopAgreement: '',   //商城购物 - 分成协议
            roomAgreement: '',   //客房协议价 - 分成协议
            invoiceRateList: [],
            prodInvoiceRateName: '',
            loadingR: false,
            cabBannerList: [],
            serBannerList: [],
            shopBannerList: [],
            roomBannerList: [],
            isDisabled: false,
            bannerType: 2,

            HotelDataAdd: {
                socialCreditCode: '',
                hotelPWD: '123456',
                hotelName: '',
                hotelStar: null,
                hotelDecorateTime: '',
                hotelHonor: '',
                hotelStyle: '',
                isPark: false,
                hotelContact: '',
                hotelContactPhone: '',
                hotelReservePhone: '',
                hotelServicePhone: '',
                selectProvince: '',
                selectCity: '',
                selectDistrict: '',
                hotelAddress: '',
                hotelLngLat: '',
                hotelLongitude: '',
                hotelLatitude: '',
                hotelSkin: '',
                isSupportRedPacket: false,
                redPacketRate: '',
                minOrderAmount: '',
                hotelAdminName: '',
                hotelAdminPhone: '',
                // hotelProportion: '',
                isHprodTicket: true,
                invoiceType: [],
                hprodRate: '',
                roomRate: '',
                isHroomTicket: false,
                isShowInvoiceReminder: false,
                hotelRate: '',
                // isTicket: '0',
                hotelStore: true,
                hotelShippingFee: '',
                storeAllocId: '',
                hotelService: false,
                hotelMall: false,
                distributionType: [],
                cabPlatRatio: 0,
                shopPlatRatio: 0,
                roomPrice: false,
                isSupportEn: false,
                isSupportWelfareCab: false,
                welfareCabMinOrderAmt: ''
            },
            rules: {
                socialCreditCode: [
                    {required: true, message: '请填写社会信用代码', trigger: ['blur','change']},
                    {min: 1, max: 32, message: '社会信用代码请保持在32个字符以内', trigger: 'blur'}
                ],
                hotelPWD: [
                    {required: true, message: '请填写登录密码', trigger: 'blur'}
                ],
                hotelName: [
                    {required: true, message: '请填写酒店名称', trigger: ['blur','change']},
                    {min: 1, max: 32, message: '酒店名称请保持在32个字符以内', trigger: ['blur','change']}
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
                hotelContactPhone: [
                    {validator: validateCMPhone, trigger: 'blur'}
                ],
                // hotelReservePhone: [
                //     {required: true, validator: validatePhone, trigger: ['blur','change']}
                // ],
                hotelReservePhone: [
                    {required: true, message: '请填写酒店订房电话', trigger: ['blur','change']},
                    {min: 1, max: 20, message: '酒店订房电话请保持在20个字符以内', trigger: ['blur','change']}
                ],
                hotelServicePhone: [
                    {required: true, message: '请填写客服电话', trigger: ['blur','change']},
                    {min: 1, max: 20, message: '客服电话请保持在20个字符以内', trigger: ['blur','change']}
                ],
                // hotelRegion: [
                //     {required: true, message: '请选择酒店区域', trigger: 'blur'}
                // ],
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
                hotelSkin: [
                    {required: true, message: '请选择酒店主题', trigger: 'change'}
                ],
                // hotelBanner: [
                //     {required: true, message: '请上传酒店banner图', trigger: 'blur'}
                // ],
                // hotelAdminName: [
                //     {required: true, message: '请填写酒店管理员姓名', trigger: 'blur'}
                // ],
                hotelAdminPhone: [
                    {required: true, validator: validateMPhone, trigger: ['blur','change']}
                ],
                // hotelProportion: [
                //     {required: true, validator: validateRate, trigger: ['blur','change']}
                // ],
                hotelRate: [
                    {required: true, validator: validateRate, trigger: ['blur','change']}
                ],
                // isHprodTicket: [
                //     {required: true, message: '请选择酒店自营商品发票', trigger: 'blur'}
                // ],
                // isTicket: [
                //     {required: true, message: '请选择是否支持开具发票', trigger: 'blur'}
                // ],
                agreementId: [
                    {required: true, message: '请选择分成协议', trigger: 'change'}
                ],
                // isSupportRedPacket: [
                //     {required: true, message: '请选择是否支持红包', trigger: 'change'}
                // ],
                redPacketRate: [
                    {validator: isValidateRate, trigger: ['blur','change']}
                ],
                minOrderAmount: [
                    {validator: isValidateRate, trigger: ['blur','change']}
                ],
                // isSupportWelfareCab: [
                //     {required: true, message: '请选择是否支持福柜', trigger: 'change'}
                // ],
                welfareCabMinOrderAmt: [
                    {validator: isValidateRate, trigger: ['blur','change']}
                ],

                param: [
                    {required: true, message: '请输入参数', trigger: 'blur'},
                    {min: 1, max: 50, message: '参数请保持在50个字符以内', trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.oprId = localStorage.getItem('oprId');
        this.provinceGet();
        this.initMap();
        this.skinGet();
        this.getprotocolList();
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
            this.HotelDataAdd.hotelStar = null;
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
        getInvoiceRateList(){
            this.loadingR = true;
            const params = {
                oprId: this.oprId,
                taxRateName : this.prodInvoiceRateName,
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
        //获取分成协议列表
        getprotocolList(){
            const params = {
            };
            this.$api.getprotocolList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.protocolList = result.data.map(item => {
                            return{
                                allocName: item.allocName,
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
                parentValue: this.HotelDataAdd.selectProvince
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
                parentValue: this.HotelDataAdd.selectCity
            }
            this.$api.provinceGet(params)
                .then(response => {
                    // console.log(response);
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
        selectProvinceFun(){
            this.HotelDataAdd.selectCity = '';
            this.HotelDataAdd.selectDistrict = '';
            this.cityGet();
        },
        //选择-市
        selectCityFun(){
            this.HotelDataAdd.selectDistrict = '';
            this.areaGet();
        },
        //地图
        initMap(){
            const that = this;
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
                    //console.log(e) // 定位成功之后做的事
                    map = new AMap.Map('container',{
                        center: [e.position.lng, e.position.lat],  //初始化地图时显示的中心点坐标
                        resizeEnable: true,   //调整任意窗口的大小，自适应窗口
                        zoom: 16   //初始化地图时显示的地图放大等级
                    })
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
                        that.HotelDataAdd.hotelLngLat = '';
                        that.HotelDataAdd.hotelLongitude = '';
                        that.HotelDataAdd.hotelLatitude = '';
                        // console.log(e);
                        // placeSearch.setCity(e.poi.adcode);
                        // placeSearch.search(e.poi.name);  //关键字查询查询
                        let searchL = (e.poi.location.lng + ',' + e.poi.location.lat).split(',');
                        map.setCenter(searchL);
                    }
                    var geocoder = new AMap.Geocoder();
                    var marker = new AMap.Marker();
                    map.on('click',function(e){
                        that.HotelDataAdd.hotelLngLat = e.lnglat.lng + ',' + e.lnglat.lat;
                        that.HotelDataAdd.hotelLongitude = e.lnglat.lng;
                        that.HotelDataAdd.hotelLatitude = e.lnglat.lat;
                        var lnglat  = that.HotelDataAdd.hotelLngLat.split(',');
                        // console.log(lnglat);
                        map.add(marker);
                        marker.setPosition(lnglat);

                        geocoder.getAddress(lnglat, function(status, result) {
                            // console.log(result);
                            if (status === 'complete'&&result.regeocode) {
                                var address = result.regeocode.formattedAddress;
                                that.HotelDataAdd.hotelAddress = address;
                            }else{
                                log.error('根据经纬度查询地址失败')
                            }
                        });

                    })

                })
            })

            // var map;
            // AMap.plugin('AMap.Geolocation', function () {
            //     var geolocation = new AMap.Geolocation({
            //         // 是否使用高精度定位，默认：true
            //         enableHighAccuracy: true,
            //         // 设置定位超时时间，默认：无穷大
            //         timeout: 10000,
            //         // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            //         buttonOffset: new AMap.Pixel(10, 20),
            //         // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            //         zoomToAccuracy: true,
            //         // 定位按钮的排放位置, RB表示右下
            //         buttonPosition: 'RB'
            //     })
            //     geolocation.getCurrentPosition()
            //     AMap.event.addListener(geolocation, 'complete', (e) => {
            //         //console.log(e) // 定位成功之后做的事
            //         map = new AMap.Map('container',{
            //             center: [e.position.lng, e.position.lat],  //初始化地图时显示的中心点坐标
            //             resizeEnable: true,   //调整任意窗口的大小，自适应窗口
            //             zoom: 16   //初始化地图时显示的地图放大等级
            //         })

            //         // var geocoder = new AMap.Geocoder({
            //         //     city: "010", //城市设为北京，默认：“全国”
            //         //     radius: 1000 //范围，默认：500
            //         // });
            //         // var lnglatinfo = e.position.lng + ',' + e.position.lat;
            //         // console.log(lnglatinfo);
            //         // geocoder.getAddress(lnglatinfo, function(status, result){
            //         //     if(status === 'complete'&& result.regeocode != ''){
            //         //         var address =  result.regeocode.formattedAddress;
            //         //         document.getElementById("address").value = address;
            //         //     }else{
            //         //         console.log('根据经纬度查询地址失败');
            //         //     }
            //         // });

            //         //输入提示
            //         var autoOptions = {
            //             input: "tipinput"
            //         };
            //         var auto = new AMap.Autocomplete(autoOptions);
            //         var placeSearch = new AMap.PlaceSearch({
            //             map: map
            //         });  //构造地点查询类
            //         AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
            //         function select(e) {
            //             placeSearch.setCity(e.poi.adcode);
            //             placeSearch.search(e.poi.name);  //关键字查询查询
            //         }



            //         // 定位成功之后再定位处添加一个marker
            //         var marker = new AMap.Marker({
            //             position: new AMap.LngLat(e.position.lng, e.position.lat),
            //             icon: ''
            //         });
            //         map.add(marker);
            //         map.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
            //             map.addControl(new AMap.ToolBar())
            //             map.addControl(new AMap.Scale())
            //         })
            //         map.on('click', function(e){
            //             map.remove(marker);
            //             marker = new AMap.Marker({
            //                 position: new AMap.LngLat(e.lnglat.getLng(), e.lnglat.getLat()),
            //                 icon: ''
            //             });
            //             map.add(marker);
            //             document.getElementById("lng").value = e.lnglat.getLng();
            //             document.getElementById("lat").value = e.lnglat.getLat();

            //             // var lnglatinfo = e.lnglat.getLng() + ',' + e.lnglat.getLat();
            //             // geocoder.getAddress(lnglatinfo, function(status, result){
            //             //     if(status === 'complete'&& result.regeocode != ''){
            //             //         var address =  result.regeocode.formattedAddress;
            //             //         document.getElementById("address").value = address;
            //             //     }else{
            //             //         console.log('根据经纬度查询地址失败');
            //             //     }
            //             // });

            //         })

            //     })
            //     AMap.event.addListener(geolocation, 'error', (e) => {
            //         console.log(e) // 定位失败做的事
            //     })
            // })
        },
        // //经纬度
        // getLngLat(){
        //     this.HotelDataAdd.hotelLongitude = document.getElementById("lng").value;
        //     this.HotelDataAdd.hotelLatitude = document.getElementById("lat").value;
        // },
        //酒店主题
        skinGet(){
            const params = {
                orgAs: 2
            };
            this.$api.skinGet(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == 0){
                        this.skinList = result.data;
                    }else{
                        this.$message.error('获取酒店主题失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //选择酒店主题
        selectSkin(value){
            const skinUrl = this.skinList.find(item => item.id === value);
            this.themeImageUrl = skinUrl.themeImageUrl;
        },
        //社会信用代码是否存在
        isHotelUscc(){
            const params = {
                account: this.HotelDataAdd.socialCreditCode,
                orgAs: 2
            };
            // console.log(params);
            if(this.HotelDataAdd.socialCreditCode){
                this.$api.isAccount(params)
                    .then(response => {
                        // console.log(response);
                        const result = response.data;
                        if(result.code == '0' ){
                            if(result.data){
                                this.isSubmit = false;
                            }else{
                                this.$message.error('社会信用代码已存在！');
                                this.isSubmit = true;
                            }
                        }else{
                            this.$message.error(result.msg);
                            this.isSubmit = true;
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }
        },
        //酒店商城
        isMall(){
            this.HotelDataAdd.distributionType = [];
        },
        //switch转换
        switchFunc(val){
            if(val){ return 1 }else{ return 0 }
        },
        //确定-添加酒店
        submitForm(HotelDataAdd) {
            let that = this;
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
            let rpRate, moAmount;
            if(this.HotelDataAdd.isSupportRedPacket){
                if(this.HotelDataAdd.redPacketRate == '' || this.HotelDataAdd.minOrderAmount == ''){
                    rpRate = '';
                    moAmount = '';
                }else{
                    rpRate = parseFloat(this.HotelDataAdd.redPacketRate).toFixed(2);
                    moAmount = parseFloat(this.HotelDataAdd.minOrderAmount).toFixed(2);
                }
            }else{
                rpRate = '';
                moAmount = '';
            }
            let wcAmount;
            if(this.HotelDataAdd.isSupportWelfareCab){
                if(this.HotelDataAdd.welfareCabMinOrderAmt == ''){
                    wcAmount = '';
                }else{
                    wcAmount = parseFloat(this.HotelDataAdd.welfareCabMinOrderAmt).toFixed(2);
                }
            }else{
                wcAmount = '';
            }
            // console.log(params);
            // return
            this.$refs[HotelDataAdd].validate((valid) => {
                if (valid) {
                    if(that.HotelDataAdd.selectProvince == '' || that.HotelDataAdd.selectCity == '' || that.HotelDataAdd.selectDistrict == ''){
                        this.$message.error('请选择酒店区域');
                        return false
                    }
                    let hprodRateType, roomRateType, shippingFeeType;
                    if(that.HotelDataAdd.hprodRate == ''){
                        hprodRateType = '';
                    }else{
                        hprodRateType = parseFloat(that.HotelDataAdd.hprodRate).toFixed(2);
                    }
                    if(that.HotelDataAdd.roomRate == ''){
                        roomRateType = '';
                    }else{
                        roomRateType = parseFloat(that.HotelDataAdd.roomRate).toFixed(2);
                    }
                    if(that.HotelDataAdd.hotelShippingFee == ''){
                        shippingFeeType = '';
                    }else{
                        shippingFeeType = parseFloat(that.HotelDataAdd.hotelShippingFee).toFixed(2);
                    }
                    if(that.HotelDataAdd.isHprodTicket){
                        if(that.HotelDataAdd.invoiceType.length == '0'){
                            this.$message.error('请选择自营商品销售发票类型!');
                            return false
                        }
                        if(that.HotelDataAdd.hprodRate == '' || that.HotelDataAdd.hprodRate == undefined){
                            this.$message.error('请输入自营商品销售发票税率!');
                            return false
                        }
                        if(that.HotelDataAdd.hprodRate > 100 || that.HotelDataAdd.hprodRate < 0){
                            this.$message.error('自营商品销售发票税率输入有误！');
                            return false
                        }
                        let hprodrateReg = /^\d+(\.\d+)?$/;
                        if(!hprodrateReg.test(that.HotelDataAdd.hprodRate)){
                            this.$message.error('自营商品销售发票税率输入有误！');
                            return false
                        }
                    }
                    if(that.HotelDataAdd.isHroomTicket){
                        if(that.HotelDataAdd.roomRate == '' || that.HotelDataAdd.roomRate == undefined){
                            this.$message.error('请输入房费税率!');
                            return false
                        }
                        if(that.HotelDataAdd.roomRate > 100 || that.HotelDataAdd.roomRate < 0){
                            this.$message.error('房费税率输入有误！');
                            return false
                        }
                        let toomrateReg = /^\d+(\.\d+)?$/;
                        if(!toomrateReg.test(that.HotelDataAdd.roomRate)){
                            this.$message.error('房费税率输入有误！');
                            return false
                        }
                    }
                    if(that.HotelDataAdd.hotelStore){
                        let sfeeRateReg = /^\d+(\.\d+)?$/;
                        if(!sfeeRateReg.test(that.HotelDataAdd.hotelShippingFee)){
                            this.$message.error('便利店配送费输入有误！');
                            return false
                        }
                        if(that.HotelDataAdd.storeAllocId == ''){
                            this.$message.error('请选择便利店的分成协议!');
                            return false
                        }
                    }
                    if(that.HotelDataAdd.hotelMall){
                        if(that.HotelDataAdd.distributionType.length == '0'){
                            this.$message.error('请选择配送方式!');
                            return false
                        }
                        if(that.shopAgreement == ''){
                            this.$message.error('请选择商城购物的分成协议!');
                            return false
                        }
                        // for(let i = 0; i < shopImgData.length; i++){
                        //     if(shopImgData[i].toLink == ''){
                        //         this.$message.error('酒店商城banner图和链接对应有误!');
                        //         return false
                        //     }
                        // }
                    }
                    if(this.HotelDataAdd.isSupportRedPacket){
                        if(this.HotelDataAdd.redPacketRate == '' || this.HotelDataAdd.minOrderAmount == ''){
                            this.$message.error('请输入红包比例、最小订单金额');
                            return false;
                        }
                        if(this.HotelDataAdd.redPacketRate > 100){
                            this.$message.error('红包比例不能大于100%');
                            return false;
                        }
                    }
                    if(this.HotelDataAdd.isSupportWelfareCab){
                        if(this.HotelDataAdd.welfareCabMinOrderAmt == ''){
                            this.$message.error('请输入福柜最小订单金额');
                            return false;
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
                    if(that.HotelDataAdd.hotelService){
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
                    if(that.HotelDataAdd.roomPrice){
                        if(that.roomAgreement == ''){
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
                        orgAs: 2,
                        hotelUscc: that.HotelDataAdd.socialCreditCode,
                        password: that.HotelDataAdd.hotelPWD,
                        hotelName: that.HotelDataAdd.hotelName,
                        hotelStarLevel: that.HotelDataAdd.hotelStar-1,
                        hotelDecorationYear: that.HotelDataAdd.hotelDecorateTime,
                        hotelHonor: that.HotelDataAdd.hotelHonor,
                        hotelStyle: that.HotelDataAdd.hotelStyle,
                        isHasPark: that.switchFunc(that.HotelDataAdd.isPark),
                        hotelContactsName: that.HotelDataAdd.hotelContact,
                        hotelContactsMobile: that.HotelDataAdd.hotelContactPhone,
                        hotelBookingPhone: that.HotelDataAdd.hotelReservePhone,
                        hotelProvince: that.HotelDataAdd.selectProvince,
                        hotelCity: that.HotelDataAdd.selectCity,
                        hotelArea: that.HotelDataAdd.selectDistrict,
                        hotelAddress: that.HotelDataAdd.hotelAddress,
                        hotelLongitude: that.HotelDataAdd.hotelLongitude,   // 经度
                        hotelLatitude: that.HotelDataAdd.hotelLatitude,   // 纬度
                        hotelThemeId: that.HotelDataAdd.hotelSkin,
                        // hotelAddImages: JSON.stringify(imageList),
                        adminMobile: that.HotelDataAdd.hotelAdminPhone,
                        isSupportRedPacket: that.switchFunc(that.HotelDataAdd.isSupportRedPacket),
                        redPacketRate: rpRate,
                        minOrderAmount: moAmount,
                        // hotelRoyaltyRate: parseFloat(that.HotelDataAdd.hotelProportion).toFixed(2),
                        empReplFee: parseFloat(that.HotelDataAdd.hotelRate).toFixed(2),
                        
                        isSupportProdInvoice: that.switchFunc(that.HotelDataAdd.isHprodTicket),
                        prodInvoiceWayList: that.HotelDataAdd.invoiceType,
                        prodInvoiceTaxRate: hprodRateType,
                        // prodInvoiceTaxRateId: that.prodInvoiceRateName,
                        isSupportRoomInvoice: that.switchFunc(that.HotelDataAdd.isHroomTicket),
                        roomInvoiceTaxRate: roomRateType,
                        isShowInvoiceReminder:  that.switchFunc(that.HotelDataAdd.isShowInvoiceReminder),
                        // isInvoice: that.HotelDataAdd.isTicket,
                        cabAllocId: that.HotelDataAdd.agreementId,

                        hotelServicePhone: that.HotelDataAdd.hotelServicePhone,
                        isSupportStore: that.switchFunc(that.HotelDataAdd.hotelStore),
                        delivFee: shippingFeeType,
                        storeAllocId: that.HotelDataAdd.storeAllocId,

                        isSupportRmsvc: that.switchFunc(that.HotelDataAdd.hotelService),
                        isSupportHshop: that.switchFunc(that.HotelDataAdd.hotelMall),
                        deliveryWayList: that.HotelDataAdd.distributionType,
                        hshopAllocId: that.shopAgreement,
                        isSupportRoomAlloc: that.switchFunc(that.HotelDataAdd.roomPrice),
                        roomAllocId: that.roomAgreement,
                        policyInfo: that.HotelDataAdd.policyInfo,
                        cabImageDTOs: cabBannerPath,
                        rmsvcImageDTOs: serBannerPath,
                        hshopImageDTOs: shopBannerPath,
                        roomAllocImageDTOs: roomBannerPath,
                        isSupportEn: that.switchFunc(that.HotelDataAdd.isSupportEn),
                        isSupportWelfareCab: that.switchFunc(that.HotelDataAdd.isSupportWelfareCab),
                        welfareCabMinOrderAmt: wcAmount
                    }
                    // console.log(params);
                    // return
                    this.isSubmit = true;
                    this.$api.hotelAdd(params)
                        .then(response => {
                            // console.log(response);
                            if(response.data.code == '0'){
                                // this.$refs[HotelDataAdd].resetFields();
                                this.$message.success('酒店添加成功！');
                                this.isSubmit = true;
                                that.$router.push({name: 'LonganHotelList'});
                            }else{
                                this.$message.error(response.data.msg);
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
                            this.isSubmit = false;
                            that.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm(HotelDataAdd) {
            this.$router.push({name: 'LonganHotelList'});
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
                // this.cabBannerList.push(res.data);
                this.cabBannerList.push(image);
            }else if(index == 2){
                // this.serBannerList.push(res.data);
                this.serBannerList.push(image);
            }else if(index == 3){
                // this.shopBannerList.push(res.data);
                this.shopBannerList.push(image);
            }else if(index == 4){
                // this.roomBannerList.push(res.data);
                this.roomBannerList.push(image);
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                // this.cabBannerList = fileList.map(item => {
                //     return item.response.data
                // });
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
                // this.serBannerList = fileList.map(item => {
                //     return item.response.data
                // });
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
                // this.shopBannerList = fileList.map(item => {
                //     return item.response.data
                // });
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
                // this.roomBannerList = fileList.map(item => {
                //     return item.response.data
                // });
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
        //文件超出个数限制时
        handleExceed(file, fileList, index){
            if(index == 1 || index == 2){
                this.$message.error('上传图片不能超过3张！');
            }else if(index == 4){
                this.$message.error('上传图片不能超过5张！');
            }
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList, index){
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
            width: 32%;
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

