<template>
    <div class="hoteladd">
        <p class="title">修改酒店信息</p>
        <el-form v-model="HotelDataModify" :model="HotelDataModify" :rules="rules" ref="HotelDataModify" label-width="140px" class="hotelform">
            <el-form-item>
                <span slot="label"><label class="titlebar">基本信息&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="社会信用代码" prop="hotelUscc">
                <el-input :disabled="true" v-model="HotelDataModify.hotelUscc"></el-input>
            </el-form-item>
            <el-form-item label="酒店名称" prop="hotelName">
                <el-input v-model="HotelDataModify.hotelName"></el-input>
            </el-form-item>
            <el-form-item label="酒店星级" prop="hotelStarLevel">
                <div class="starclass">
                    <el-rate v-model="HotelDataModify.hotelStarLevel"></el-rate>
                </div>
            </el-form-item>
            <el-form-item label="酒店装修时间" prop="hotelDecorationYear">
                <el-date-picker type="date" v-model="HotelDataModify.hotelDecorationYear" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="酒店荣誉" prop="hotelHonor">
                <el-input type="textarea" autosize v-model="HotelDataModify.hotelHonor"></el-input>
            </el-form-item>
             <el-form-item label="酒店风格" prop="hotelStyle">
                <el-input type="textarea" autosize v-model="HotelDataModify.hotelStyle"></el-input>
            </el-form-item>
            <el-form-item label="是否有停车场" prop="isHasPark">
                <el-radio name="park" v-model="HotelDataModify.isHasPark" :label="1">有</el-radio>
                <el-radio name="park" v-model="HotelDataModify.isHasPark" :label="0">没有</el-radio>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">酒店信息&nbsp;&nbsp;</label></span>
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
            <el-form-item label="区域选择" prop="selectProvince">
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
            </el-form-item>
            <el-form-item label="地址" prop="hotelAddress">
                <el-input v-model="HotelDataModify.hotelAddress"></el-input>
            </el-form-item>
            <el-form-item label="地图定位" prop="mapPosition">
                <div id="container" style="width:100%;height:200px;" @click="getLngLat"></div>
            </el-form-item>
            <el-form-item label="经度" prop="hotelLongitude">
                <el-input v-model="HotelDataModify.hotelLongitude"></el-input>
                <input type="text" id="lng" hidden>
            </el-form-item>
            <el-form-item label="纬度" prop="hotelLatitude">
                <el-input v-model="HotelDataModify.hotelLatitude"></el-input>
                <input type="text" id="lat" hidden>
            </el-form-item>
            <el-form-item label="酒店皮肤" prop="hotelSkin">
                    <div class="divskin" v-for="item in skinList" :key="item.id">
                        <img :src="item.themeImageUrl" alt="模板" class="imgskin"><br/>
                        <el-radio name="skin" v-model="hotelSkinWatch" :label="item.id">模板{{item.id}}</el-radio>
                    </div>
            </el-form-item>
            <el-form-item prop="hotelBanner">
                <span slot="label"><label class="required-icon">*</label>酒店banner图</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    name="fileContent"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :file-list="bannerList"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    >
                    <!-- :on-preview="handlePreview"
                    :before-upload="beforeUpload" -->
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="酒店管理员手机号" prop="adminMobile">
                <el-input v-model="HotelDataModify.adminMobile"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">分成比例&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="分成比例" prop="hotelRoyaltyRate">
                <el-input :disabled="true" v-model.number="HotelDataModify.hotelRoyaltyRate"></el-input> %
            </el-form-item>
            <el-form-item label="补货费率" prop="empReplFee">
                <el-input :disabled="true" v-model.trim="HotelDataModify.empReplFee" maxlength="10"></el-input> 元/格子
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">账户信息&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="开户银行" prop="hotelBankBranch">
                <el-input v-model="HotelDataModify.hotelBankBranch"></el-input>
            </el-form-item>
            <el-form-item label="账号名称" prop="hotelAccountName">
                <el-input v-model="HotelDataModify.hotelAccountName"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="hotelBankAccount">
                <el-input v-model.number="HotelDataModify.hotelBankAccount" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('HotelDataModify')">取消</el-button>
                <el-button type="primary" @click="submitForm('HotelDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'HotelInformationModify',
    data(){
        var mPhoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
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
        var bankAccount = /^[0-9]{10,20}$/
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
            encryptedHotelOrgId: '',
            uploadUrl: this.$api.upload_file_url,
            id: '',
            province: [],
            city: [],
            area: [],
            skinList: [],
            bannerList: [],
            bannerAddList: [],
            bannerDeleteList: [],
            isSubmit: false,
            empId: '',
            hotelSkinWatch: '',
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
                // hotelBookingPhone: [
                //     {required: true, validator: validatePhone, trigger: ['blur','change']}
                // ],
                hotelBookingPhone: [
                    {required: true, message: '请填写酒店订房电话', trigger: ['blur','change']},
                    {min: 1, max: 20, message: '酒店订房电话请保持在20个字符以内', trigger: ['blur','change']}
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
                    {max: 32, message: '请保持在32个字符以内', trigger: ['blur','change']}
                ],
                // hotelSkin: [
                //     {required: true, message: '请选择酒店皮肤', trigger: 'blur'}
                // ],
                // hotelBanner: [
                //     {required: true, message: '请上传酒店banner图', trigger: ['blur','change']}
                // ],
                // hotelAdminName: [
                //     {required: true, message: '请填写酒店管理员姓名', trigger: 'blur'}
                // ],
                adminMobile: [
                    {required: true, validator: validateMPhone, trigger: ['blur','change']}
                ],
                hotelRoyaltyRate: [
                    {required: true, message: '请填写分成比例',  trigger: 'blur'},
                    {min: 0, max: 9999999999, type: 'number', message: '请填写正确的分成比例', trigger: ['blur','change']}
                ],
                empReplFee: [
                    {required: true, message: '请填写补货费率',  trigger: 'blur'}
                ],
                hotelBankBranch: [
                    {max: 32, message: '请保持在32个字符以内', trigger: ['blur','change']}
                ],
                hotelAccountName: [
                    {max: 32, message: '请保持在32个字符以内', trigger: ['blur','change']}
                ],
                hotelBankAccount: [
                    {validator: validateBank, trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
        this.encryptedHotelOrgId = localStorage.getItem('orgId');
        this.hotelDetailInfo();
        this.provinceGet();
        this.initMap();
        this.skinGet();
    },
    methods: {
        //酒店详情
        hotelDetailInfo(){
            const params = {};
            this.$api.hotelDetail(params, this.encryptedHotelOrgId)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == '0'){
                        const imageList = response.data.data.hotelImageDTOs;
                        this.HotelDataModify = response.data.data;
                        this.HotelDataModify.hotelStarLevel = this.HotelDataModify.hotelStarLevel + 1;
                        this.HotelDataModify.selectProvince = this.HotelDataModify.province.dictName;
                        this.HotelDataModify.selectCity = this.HotelDataModify.city.dictName;
                        this.HotelDataModify.selectDistrict = this.HotelDataModify.area.dictName;
                        this.hotelSkinWatch = response.data.data.hotelThemeId;
                        this.id = this.HotelDataModify.id;
                        this.HotelDataModify.isHasPark = response.data.data.isHasPark;
                        this.empId = this.HotelDataModify.adminEmpId;
                        this.bannerList = imageList.map((item, index) => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.url,
                                path: item.imagePath
                            }
                        })
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
        initMap(){
            let map = new AMap.Map('container',{
                center: [116.397428, 39.90923],
                resizeEnable: true,
                zoom: 10
            })
            map.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                map.addControl(new AMap.ToolBar())
                map.addControl(new AMap.Scale())
            })
            map.on('click', function(e){
                document.getElementById("lng").value = e.lnglat.getLng();
                document.getElementById("lat").value = e.lnglat.getLat();
            })
        },
        //经纬度
        getLngLat(){
            this.HotelDataModify.hotelLongitude = document.getElementById("lng").value;
            this.HotelDataModify.hotelLatitude = document.getElementById("lat").value;
        },
        //图片上传成功
        handleSuccess(res, file, fileList) {
            // console.log(res, file);
            const image = {
                name: file.name,
                url: file.url,
                path: res.data
            }
            // this.bannerAddList.push(image);
            this.bannerList.push(image);
        },
        //移除图片
        handleRemove(file, fileList) {
            // console.log(fileList);
            this.bannerList = fileList.map((item, index)=>{
               return {
                  name: item.name,
                  url: item.url,
                  path: item.path
               }
            })
        },
        //酒店皮肤
        skinGet(){
            const params = {
                encryptedOrgId: this.encryptedHotelOrgId
            }
            this.$api.skinGet(params)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == 0){
                        this.skinList = response.data.data;
                    }else{
                        this.$message.error('获取城市皮肤失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-修改酒店信息
        submitForm(HotelDataModify) {
            const id = this.id;
            let that = this;
            const imageList = that.bannerList.map(item => item.path);
            // console.log(imageList);
            // return
            let params = {
                adminEmpId: this.empId,
                hotelUscc: that.HotelDataModify.hotelUscc,
                hotelName: that.HotelDataModify.hotelName,
                hotelStarLevel: that.HotelDataModify.hotelStarLevel-1,
                hotelDecorationYear: that.HotelDataModify.hotelDecorationYear,
                hotelHonor: that.HotelDataModify.hotelHonor,
                hotelStyle: that.HotelDataModify.hotelStyle,
                isHasPark: that.HotelDataModify.isHasPark,
                hotelContactsName: that.HotelDataModify.hotelContactsName,
                hotelContactsMobile: that.HotelDataModify.hotelContactsMobile,
                hotelBookingPhone: that.HotelDataModify.hotelBookingPhone,
                hotelProvince: that.HotelDataModify.hotelProvince,
                hotelCity: that.HotelDataModify.hotelCity,
                hotelArea: that.HotelDataModify.hotelArea,
                hotelAddress: that.HotelDataModify.hotelAddress,
                hotelLongitude: that.HotelDataModify.hotelLongitude,   // 经度
                hotelLatitude: that.HotelDataModify.hotelLatitude,   // 纬度
                hotelThemeId: that.hotelSkinWatch,
                hotelAddImages: JSON.stringify(imageList),
                adminMobile: that.HotelDataModify.hotelAdminPhone,
                hotelRoyaltyRate: that.HotelDataModify.hotelRoyaltyRate,
                empReplFee: parseFloat(that.HotelDataModify.empReplFee).toFixed(2),
                hotelBankBranch: that.HotelDataModify.hotelBankBranch,
                hotelAccountName: that.HotelDataModify.hotelAccountName,
                hotelBankAccount: that.HotelDataModify.hotelBankAccount
            }
            // console.log(params);
            // return
            this.$refs[HotelDataModify].validate((valid) => {
                if (valid) {
                    // console.log(params,id);
                    if(imageList == ''){
                        this.$message.error('请上传酒店banner图!');
                        return false
                    }
                    this.$api.hotelModify(params,id)
                        .then(response => {
                            // console.log(response);
                            if(response.data.code == '0'){
                                this.$message.success('修改酒店信息成功！');
                                that.$router.push({name: 'HotelPrivilegeUserList'});
                            }else{
                                this.$message.error('修改酒店信息失败！');
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
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file){
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
            // this.$refs[HotelDataModify].resetFields();
            // this.hotelDetailInfo();
            this.$router.push({name: 'HotelPrivilegeUserList'});
        },
        //文件超出个数限制时
        handleExceed(file,fileList){
            this.$message.error('上传图片不能超过5张！');
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

<style scoped>
.el-input{
    width: 87%;
}
.el-select{
    width: 32%;
}
</style>

<style lang="less" scoped>
.hoteladd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 45%;
        .titlebar{
            font-weight: bold;
            font-size: 16px;
            color: #444;
        }
        .starclass{
            padding-top: 10px;
        }
        .divskin{
            width: 32%;
            display: inline-block;
        }
        .imgskin{
            background: #f9f;
            width: 90px;
            height: 120px;
            display: inline-block;
        }
        .required-icon{
            color: #ff3030;
        }
        .upload-hint{
            font-size: 12px;
            color: #999;
            line-height: 12px;
        }
    }
}
</style>

