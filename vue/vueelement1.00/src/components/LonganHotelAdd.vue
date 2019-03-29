<template>
    <div class="hoteladd">
        <p class="title">新增酒店</p>
        <el-form :model="HotelDataAdd" :rules="rules" ref="HotelDataAdd" label-width="140px" class="hotelform">
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
            <el-form-item label="酒店banner图" prop="hotelBanner">
                <el-upload 
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    name="fileContent"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    >
                    <!-- :on-preview="handlePreview" 
                    :before-upload="beforeUpload" -->
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、png文件，且不超过2M</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="酒店管理员手机号" prop="hotelAdminPhone">
                <el-input v-model="HotelDataAdd.hotelAdminPhone"></el-input>
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
        var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
        var validatePhone = (rule,value,callback) => {
            // if(!value){
            //     return callback(new Error('联系电话不能为空！'))
            // }
            if(!phoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
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
                hotelAdminPhone: ''
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
                    {required: true, message: '请填写酒店名称', trigger: ['blur','change']}
                ],
                hotelHonor: [
                    {max: 64, message: '请保持在64个字符以内', trigger: ['blur','change']}
                ],
                hotelStyle: [
                    {max: 64, message: '请保持在64个字符以内', trigger: ['blur','change']}
                ],
                // hotelContactPhone: [
                //     {validator: validatePhone, trigger: 'blur'}
                // ],
                hotelReservePhone: [
                    {required: true, validator: validatePhone, trigger: 'blur'}
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
                //     {required: true, message: '请上传酒店banner图', trigger: ['blur','change']}
                // ],
                // hotelAdminName: [
                //     {required: true, message: '请填写酒店管理员姓名', trigger: 'blur'}
                // ],
                hotelAdminPhone: [
                    {required: true, validator: validatePhone, trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
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
            // console.log(file.response.data);
            // this.HotelDataAdd.bannerListDelete.push(file.response.data);
            // for(let i=0;i<this.HotelDataAdd.bannerList.length;i++){
            //     if(file.response.data == this.HotelDataAdd.bannerList[i]){
            //         this.HotelDataAdd.bannerList.splice(i,1);
            //     }
            // }
        },
        //酒店皮肤
        skinGet(){
            const params = {}
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
            const params = {account: this.HotelDataAdd.socialCreditCode};
            if(this.HotelDataAdd.socialCreditCode){
                this.$api.isAccount(params)
                    .then(response => {
                        if(response.data.data == true){
                            this.isSubmit = false;
                        }else{
                            this.$message.error('社会信用代码已存在！');
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

        //确定-添加酒店
        submitForm(HotelDataAdd) {
            let that = this;
            const imageList = that.HotelDataAdd.bannerList.map(item => item.path);
            let params = {
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
                operatorId: '1'     //运营商ID
            }
            // console.log(params);
            // return
            this.$refs[HotelDataAdd].validate((valid) => {
                if (valid) {
                    // console.log(params);
                    this.$api.hotelAdd(params)
                        .then(response => {
                            // console.log(response);
                            if(response.data.code == '0'){
                                // this.$refs[HotelDataAdd].resetFields();
                                this.$message.success('酒店添加成功！');
                                setTimeout(function(){
                                    that.$router.push({name: 'LonganHotelList'});
                                },3000);
                            }else{
                                this.$message.error('酒店添加失败！');
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
            console.log(file);
            // const isJPG = true;
            const isJPG = file.type === 'jpg';
            const isJPEG = file.type === 'jpeg';
            const isPNG = file.type === 'png';
            // const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if(!isJPG && !isJPG && !isPNG){
                this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
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
        width: 42%;
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
        .upload-hint{
            font-size: 12px;
            color: #999;
            line-height: 12px;
        }
    }
}
</style>

