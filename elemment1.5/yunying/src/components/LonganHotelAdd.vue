<template>
    <div class="hoteladd">
        <p class="title">新增酒店</p>
        <el-form :model="HotelDataAdd" :rules="rules" ref="HotelDataAdd" label-width="140px" class="hotelform">
            <el-form-item>
                <span slot="label"><label class="titlebar">基本信息&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="社会信用代码" prop="socialCreditCode">
                <el-input v-model="HotelDataAdd.socialCreditCode" @blur="isHotelUscc"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="hotelPWD">
                <el-input :disabled="true" v-model="HotelDataAdd.hotelPWD"></el-input>
            </el-form-item>
            <el-form-item label="酒店名称" prop="hotelName">
                <el-input v-model="HotelDataAdd.hotelName"></el-input>
            </el-form-item>
            <el-form-item label="酒店星级" prop="hotelStar">
                <div class="starclass">
                    <el-rate v-model="HotelDataAdd.hotelStar"></el-rate>
                </div>
            </el-form-item>
            <el-form-item label="酒店装修时间" prop="hotelDecorateTime">
                <el-date-picker type="date" v-model="HotelDataAdd.hotelDecorateTime" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="酒店荣誉" prop="hotelHonor">
                <el-input type="textarea" autosize v-model="HotelDataAdd.hotelHonor"></el-input>
            </el-form-item>
             <el-form-item label="酒店风格" prop="hotelStyle">
                <el-input type="textarea" autosize v-model="HotelDataAdd.hotelStyle"></el-input>
            </el-form-item>
            <el-form-item label="是否有停车场" prop="isPark">
                <el-radio name="park" v-model="HotelDataAdd.isPark" label="1">有</el-radio>
                <el-radio name="park" v-model="HotelDataAdd.isPark" label="0">没有</el-radio>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">酒店信息&nbsp;&nbsp;</label></span>
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
            <!-- <el-form-item label="区域选择" prop="hotelRegion">
                <el-select v-model="HotelDataAdd.selectProvince" placeholder="省级地区" @change="selectProvince">
                    <el-option v-for="item in province" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
                <el-select v-model="HotelDataAdd.selectCity" placeholder="市级地区" @change="selectCity">
                    <el-option v-for="item in city" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
                <el-select v-model="HotelDataAdd.selectDistrict" placeholder="区级地区">
                    <el-option v-for="item in area" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="区域选择" prop="selectProvince">
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
            </el-form-item>
            <el-form-item label="地址" prop="hotelAddress">
                <el-input v-model="HotelDataAdd.hotelAddress"></el-input>
            </el-form-item>
            <el-form-item label="地图定位" prop="mapPosition">
                <div id="container" style="width:100%;height:200px;" @click="getLngLat"></div>
            </el-form-item>
            <el-form-item label="经度" prop="hotelLongitude">
                <el-input v-model="HotelDataAdd.hotelLongitude"></el-input>
                <input type="text" id="lng" hidden>
            </el-form-item>
            <el-form-item label="纬度" prop="hotelLatitude">
                <el-input v-model="HotelDataAdd.hotelLatitude"></el-input>
                <input type="text" id="lat" hidden>
            </el-form-item>
            <el-form-item label="酒店皮肤" prop="hotelSkin">
                    <div class="divskin" v-for="item in skinList" :key="item.id">
                        <img :src="item.themeImageUrl" alt="模板" class="imgskin"><br/>
                        <el-radio name="skin" v-model="HotelDataAdd.hotelSkin" :label="item.id">模板{{item.id}}</el-radio>
                    </div>
            </el-form-item>
            <el-form-item prop="hotelBanner" ref="uploadBanner">
                <span slot="label"><label class="required-icon">*</label>酒店banner图</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    name="fileContent"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    :before-upload="beforeUpload"
                    >
                    <!-- :on-preview="handlePreview"
                    :before-upload="beforeUpload" -->
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="酒店管理员手机号" prop="hotelAdminPhone">
                <el-input v-model="HotelDataAdd.hotelAdminPhone"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">分成比例&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="分成比例" prop="hotelProportion">
                <el-input v-model.trim="HotelDataAdd.hotelProportion" maxlength="10"></el-input> %
            </el-form-item>
            <el-form-item label="补货费率" prop="hotelRate">
                <el-input v-model.trim="HotelDataAdd.hotelRate" maxlength="10"></el-input> 元/格子
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('HotelDataAdd')">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('HotelDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import AMap from 'AMap'
export default {
    name: 'LonganHotelAdd',
    data(){
        var mPhoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
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
        return{
            encryptedOprOrgId: '',   //加密后的运营商orgId
            uploadUrl: this.$api.upload_file_url,
            province: [],
            city: [],
            area: [],
            skinList: [],
            isSubmit: false,

            HotelDataAdd: {
                socialCreditCode: '',
                hotelPWD: '123456',
                hotelName: '',
                hotelStar: null,
                hotelDecorateTime: '',
                hotelHonor: '',
                hotelStyle: '',
                isPark: '',
                hotelContact: '',
                hotelContactPhone: '',
                hotelReservePhone: '',
                selectProvince: '',
                selectCity: '',
                selectDistrict: '',
                hotelAddress: '',
                hotelLongitude: '',
                hotelLatitude: '',
                hotelSkin: '',
                bannerList: [],
                bannerListDelete: [],
                hotelAdminName: '',
                hotelAdminPhone: '',
                hotelProportion: '',
                hotelRate: ''
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
                    {max: 32, message: '请保持在32个字符以内', trigger: ['blur','change']}
                ],
                hotelSkin: [
                    {required: true, message: '请选择酒店皮肤', trigger: ['blur','change']}
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
                hotelProportion: [
                    {required: true, validator: validateRate, trigger: ['blur','change']}
                ],
                hotelRate: [
                    {required: true, validator: validateRate, trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
        this.encryptedOprOrgId = localStorage.getItem('orgId');
        this.provinceGet();
        this.initMap();
        this.skinGet();
    },
    methods: {
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
            let map = new AMap.Map('container',{
                center: [116.397428, 39.90923],   //初始化地图时显示的中心点坐标
                // center: [],
                resizeEnable: true,   //调整任意窗口的大小，自适应窗口
                zoom: 11   //初始化地图时显示的地图放大等级
            })
            map.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                map.addControl(new AMap.ToolBar())
                map.addControl(new AMap.Scale())

                // var geolocation = new AMap.geolocation({
                //     enableHighAccuracy: true,   //是否使用高精度定位，默认 true
                //     timeout: 10000,   //设置定位超时时间，默认 无穷大
                //     buttonOffset: new AMap.Pixel(10,20),   //定位按钮的停靠位置的偏移量 默认 Pixel(10,20)
                //     zoomToAccuracy: true,   //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认 false
                //     buttonPosition: 'RB'   //定位按钮的排放位置，RB表示右下
                // })
                // geolocation.getCurrentPosition()
                // AMap.event.addListener(geolocation,'complete',(e)=>{
                //     console.log(e);   //定位成功后做的事
                //     var marker = new AMap.Marker({
                //         position: e.position,   //(e.position)定位点的点坐标，position marker的定位点坐标，也就是marker最终显示在那个点上
                //         icon: '',   //marker的图标，可以自定义，不写默认使用高德自带的
                //         map: this.map,   //map 要显示该marker的地图对象
                //     })
                // })
                // AMap.event.addListener(geolocation,'error',(e)=>{
                //     console.log(e);   //定位失败做的事
                // })
            })
            map.on('click', function(e){
                document.getElementById("lng").value = e.lnglat.getLng();
                document.getElementById("lat").value = e.lnglat.getLat();
            })
        },
        //经纬度
        getLngLat(){
            this.HotelDataAdd.hotelLongitude = document.getElementById("lng").value;
            this.HotelDataAdd.hotelLatitude = document.getElementById("lat").value;
        },
        //图片上传成功
        handleSuccess(res, file, fileList) {
            // this.HotelDataAdd.bannerList.push(res.data);
            const image = {
                name: file.name,
                url: file.url,
                path: res.data
            }
            // console.log(image);
            this.HotelDataAdd.bannerList.push(image);
            // console.log(this.HotelDataAdd.bannerList);
        },
        //移除图片
        handleRemove(file, fileList) {
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
                encryptedOrgId: this.encryptedOprOrgId
            };
            this.$api.skinGet(params)
                .then(response => {
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
        //社会信用代码是否存在
        isHotelUscc(){
            const params = {
                account: this.HotelDataAdd.socialCreditCode,
                encryptedOprOrgId: this.encryptedOprOrgId
            };
            if(this.HotelDataAdd.socialCreditCode){
                this.$api.isAccount(params)
                    .then(response => {
                        const result = response.data;
                        if(result.code == '0' ){
                            if(result.data){
                                this.isSubmit = false;
                            }else{
                                this.$message.error('社会信用代码已存在！');
                                this.isSubmit = true;
                            }
                        }else{
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }
        },

        //确定-添加酒店
        submitForm(HotelDataAdd) {
            let that = this;
            const imageList = that.HotelDataAdd.bannerList.map(item => item.path);
            let params = {
                encryptedOprOrgId: that.encryptedOprOrgId,
                hotelUscc: that.HotelDataAdd.socialCreditCode,
                password: that.HotelDataAdd.hotelPWD,
                hotelName: that.HotelDataAdd.hotelName,
                hotelStarLevel: that.HotelDataAdd.hotelStar-1,
                hotelDecorationYear: that.HotelDataAdd.hotelDecorateTime,
                hotelHonor: that.HotelDataAdd.hotelHonor,
                hotelStyle: that.HotelDataAdd.hotelStyle,
                isHasPark: that.HotelDataAdd.isPark,
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
                hotelAddImages: JSON.stringify(imageList),
                adminMobile: that.HotelDataAdd.hotelAdminPhone,
                hotelRoyaltyRate: parseFloat(that.HotelDataAdd.hotelProportion).toFixed(2),
                empReplFee: parseFloat(that.HotelDataAdd.hotelRate).toFixed(2)
            }
            // console.log(params);
            // return
            this.$refs[HotelDataAdd].validate((valid) => {
                if (valid) {
                    if(imageList == ''){
                        this.$message.error('请上传酒店banner图!');
                        return false
                    }
                    // console.log(params);
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
                                this.$message.error('酒店添加失败！');
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
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
            // this.$refs[HotelDataAdd].resetFields();
            this.$router.push({name: 'LonganHotelList'});
        },
        //点击文件列表中已上传的文件时
        handlePreview(file) {
            // console.log(file);
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
            .imgskin{
                background: #f9f;
                width: 90px;
                height: 120px;
                display: inline-block;
            }
        }
        .mapposition{
            width: 100%;
            height: 100px;
            background: #9f9;
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

