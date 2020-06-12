<template>
    <div class="actdetailmanage">
        <p class="title">活动明细</p>
        <el-form :model="ActDetailDataManage" ref="ActDetailDataManage" label-width="100px" class="actdetailform">
            <el-form-item label="活动名称">{{ActDetailDataManage.actName}}</el-form-item>
            <el-form-item label="活动类型">{{actTypeName}}</el-form-item>
            <el-form-item label="活动时间">{{ActDetailDataManage.actTime}}</el-form-item>
            <el-form-item label="参与次数">{{ActDetailDataManage.actInNum}}</el-form-item>
            <el-form-item label="级别">{{ActDetailDataManage.actLevel}}</el-form-item>
            <el-form-item label="酒店名称">{{ActDetailDataManage.hotelName}}</el-form-item>
        </el-form>
        <el-form :model="ActDetailGift" ref="ActDetailGift" class="actdetailform">
            <el-form-item>
                <span slot="label"><label class="titlebar">设置礼包</label></span>
                <el-button type="primary" class="addbtn" size="small" @click="giftAddLine">添加</el-button>
            </el-form-item>
            <el-table :data="ActDetailGift.ActGiftData" style="margin-left:100px;">
                <el-table-column label="礼包类型" min-width="80px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'ActGiftData.'+scope.$index+'.couponType'" :rules="rules.couponType">
                            <el-select
                                v-model="scope.row.couponType"
                                @change="selectCouponT(scope.$index, scope.row.couponType)"
                                placeholder="请选择类型">
                                <el-option label="优惠券" :value="1"></el-option>
                                <el-option label="卡券" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="礼包名称" min-width="100px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'ActGiftData.'+scope.$index+'.couponId'" :rules="rules.couponId">
                            <el-select
                                v-model="scope.row.couponId"
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
                        <el-form-item :prop="'ActGiftData.'+scope.$index+'.couponCount'" :rules="rules.couponCount">
                            <el-input v-model.number="scope.row.couponCount" placeholder="请输入数量"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="排序" min-width="80px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'ActGiftData.'+scope.$index+'.couponSort'" :rules="rules.couponSort">
                            <el-input v-model.number="scope.row.couponSort" placeholder="请输入排序"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="40px" align=center>
                    <template slot-scope="scope">
                        <el-form-item>
                            <el-button type="text" size="small" @click="giftDeleteLine(scope.$index)">移除</el-button>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <el-form label-width="100px" class="actdetailform">
            <el-form-item>
                <span slot="label"><label class="titlebar">设置图片</label></span>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 活动图片</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :file-list="ActImgList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,最多支持1张图片</label>
                </el-upload>
            </el-form-item> 
            <el-form-item label="领券页广告图" >
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :file-list="ActADImgList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 2)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 2)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 2)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 2)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 2)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,最多支持1张图片</label>
                </el-upload>
            </el-form-item>
            <br/>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('ActDetailGift')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'LonganActivityDef',
    data(){
        return{
            authzlist: {}, //权限数据
            actID:'',
            ActDetailDataManage: {},
            actTypeName: '',
            actHotelId: '',
            yCouponList: [],
            cCouponList: [],
            ActDetailGift: {
                ActGiftData: [
                    {
                        couponType: '',
                        couponList: [],
                        couponId: '',
                        couponCount: 1,
                        couponSort: 0,
                    }
                ]
            },
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            ActImgList: [],
            ActADImgList: [],
            isSubmit: false,
            rules: {
                couponType: [
                    {required: true, message: '请选择礼包类型', trigger: 'change'},
                ],
                couponId: [
                    {required: true, message: '请选择礼包名称', trigger: 'change'},
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
    mounted() {
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.actID = this.$route.query.modifyid;
        this.getActDetail();
    },
    methods: {
        //获取活动明细
        getActDetail(){
            let that = this;
            this.$api.selectActivityOne(this.actID)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        let actInNum;
                        if(result.data.actPartInCountType == 0){
                            actInNum = '不限制'
                        }else if(result.data.actPartInCountType == 1){
                            actInNum = '次/每类型'
                        }else if(result.data.actPartInCountType == 2){
                            actInNum = '次/每活动'
                        }else if(result.data.actPartInCountType == 3){
                            actInNum = '次/每天'
                        }else if(result.data.actPartInCountType == 4){
                            actInNum = '次/每周'
                        }else if(result.data.actPartInCountType == 5){
                            actInNum = '次/每月'
                        }
                        this.getActCouponList(result.data.actBegin, result.data.actEnd);
                        let hotelName = '';
                        if(result.data.actHotelDTOS.length != 0){
                            hotelName = result.data.actHotelDTOS[0].hotelName;
                            this.actHotelId = result.data.actHotelDTOS[0].id;
                            this.getActVouList(result.data.actHotelDTOS[0].hotelId);
                            this.ActDetailGift.ActGiftData = result.data.actHotelDTOS[0].details.map(item => {
                                return {
                                    couponType: item.couponType,
                                    couponList: [],
                                    couponId: item.couponId,
                                    couponCount: item.couponCount,
                                    couponSort: item.couponSort,
                                }
                            });
                            if(result.data.actHotelDTOS[0].actImageUrl != ""){
                                this.ActImgList = [{
                                    name: result.data.actHotelDTOS[0].actImage,
                                    url: result.data.actHotelDTOS[0].actImageUrl,
                                    path: result.data.actHotelDTOS[0].actImage,
                                }];
                            }
                            if(result.data.actHotelDTOS[0].actAdImageUrl != ""){
                                this.ActADImgList = [{
                                    name: result.data.actHotelDTOS[0].actAdImage,
                                    url: result.data.actHotelDTOS[0].actAdImageUrl,
                                    path: result.data.actHotelDTOS[0].actAdImage,
                                }];
                            }
                        }
                        this.ActDetailDataManage = {
                            actName: result.data.actName,
                            actTime: result.data.actBegin.split(' ')[0] +" 至 "+ result.data.actEnd.split(' ')[0],
                            actInNum: result.data.actPartInCount == 0?''+actInNum:result.data.actPartInCount+actInNum,
                            actLevel: result.data.actScopeLevel == 0?'平台':'单店',
                            hotelName: hotelName,
                        };
                        that.getActList(result.data.actType);
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //获取活动类型列表
        getActList(actType){
            let params = {
                key: 'ACTTYPE',
                orgId: 0
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        let actTypeList = result.data.map(item => {
                            return {
                                id: item.dictValue,
                                label: item.dictName
                            }
                        });
                        this.actTypeName = actTypeList.find(item => item.id == actType).label;
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
        //添加
        giftAddLine(){
            let newLine = {
                couponType: '',
                couponId: '',
                couponCount: 1,
                couponSort: 0,
            };
            this.ActDetailGift.ActGiftData.push(newLine);
        },
        //移除
        giftDeleteLine(index){
            this.ActDetailGift.ActGiftData.splice(index, 1);
        },
        //选择礼包类型 1：优惠券 2：卡券
        selectCouponT(index, cType){
            if(cType == 1){
                this.ActDetailGift.ActGiftData[index].couponList = this.yCouponList;
            }else if(cType == 2){
                this.ActDetailGift.ActGiftData[index].couponList = this.cCouponList;
            }
        },
        //优惠券列表
        getActCouponList(actStartDate, actEndDate){
            const that = this;
            let params = {
                actStartDate: actStartDate,
                actEndDate: actEndDate,
                drawWay: 4
            };
            this.$api.getActCouponList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.yCouponList = result.data.map(item => {
                            return {
                                id: item.id,
                                couponName: item.couponName
                            }
                        });
                        this.ActDetailGift.ActGiftData = this.ActDetailGift.ActGiftData.map(item => {
                            let couponList;
                            if(item.couponType == 1){
                                couponList = that.yCouponList;
                            }else{
                                couponList = that.cCouponList;
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
        //卡券列表
        getActVouList(hotelId){
            const that = this;
            let params = {
                hotelId: hotelId
            };
            this.$api.getActVouList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.cCouponList = result.data.map(item => {
                            return {
                                id: item.id,
                                couponName: item.vouName
                            }
                        });
                        this.ActDetailGift.ActGiftData = this.ActDetailGift.ActGiftData.map(item => {
                            let couponList;
                            if(item.couponType == 1){
                                couponList = that.yCouponList;
                            }else{
                                couponList = that.cCouponList;
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

        //确定
        submitForm(ActDetailGift){
            let actImgArr = JSON.stringify(this.ActImgList.map(item => item.path));
            let actImgStr = actImgArr.substr(2, actImgArr.length-4);
            let actAdImgArr = JSON.stringify(this.ActADImgList.map(item => item.path));
            let actAdImgStr = actAdImgArr.substr(2, actAdImgArr.length-4);
            if(this.ActDetailGift.ActGiftData.length < 1){
                this.$message.error('请设置礼包!');
                return false
            }
            let couponIds = this.ActDetailGift.ActGiftData.map(item => {
                return {
                    couponType: item.couponType,
                    couponId: item.couponId,
                    couponCount: item.couponCount,
                    couponSort: item.couponSort,
                }
            });
            const params = {
                couponIds: couponIds,
                actImage: actImgStr,
                actAdImage: actAdImgStr,
            };
            this.$refs[ActDetailGift].validate((valid) => {
                if (valid) {
                    if(this.ActImgList.length == 0){
                        this.$message.error('请上传活动图片!');
                        return false
                    }
                    this.isSubmit = true;
                    this.$api.actDetailManage(params, this.actHotelId)
                        .then(response => {
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('活动明细设置成功！');
                                this.$router.push({name: 'LonganActivityList'});
                            }else{
                                this.isSubmit = false;
                                this.$message.error(result.msg);
                            }
                        })
                        .catch(error => {
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
            this.$router.push({name: 'LonganActivityList'});
        },
        //图片上传成功
        handleSuccess(res, file, fileList, index){
            if(index == 1){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.ActImgList.push(image);
            }else if(index == 2){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.ActADImgList.push(image);
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                this.ActImgList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
            }else if(index == 2){
                this.ActADImgList = fileList.map(item => {
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
            this.$message.error('图片只能上传1张！');
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

<style lang="less" scoped>
.actdetailmanage{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .actdetailform{
        width: 50%;
        .titlebar{
            width: 100px;
            font-size: 16px;
            color: #999;
            text-align: right;
            display: inline-block;
        }
        .addbtn{
            margin-bottom: 10px;
            background: #ffa522;
            border: #dda522;
            color: #fff;
            display: inline-block;
        }
        .required-icon{
            color: #ff3030;
        }
    }
}
</style>

<!--
<template>
    <div class="hoteladd">
        <p class="title">活动明细</p>
        <div class="detail">
            <el-divider></el-divider>
            <div class="parts">
                <span>活动名称：</span><span class="content">{{actName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>活动类型：</span><span class="content">{{actType}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>活动时间：</span><span class="content">{{actBegin+' 至 '+actEnd}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts" v-if="dateSels">
                <span class="content" style="margin-left:70px;">{{dateSels}}</span>
            </div>
            <el-divider v-if="dateSels"></el-divider>
            <div class="parts" v-if="timeSels">
                <span class="content" style="margin-left:70px;">{{timeSels}}</span>
            </div>
            <el-divider v-if="timeSels"></el-divider>
            <div class="parts">
                <span>参与次数：</span><span class="content">
                    {{showType}}
                </span>
            </div>
            <el-divider></el-divider>
        </div>
        <el-table border stripe style="width:55%;" :data="hotelList">
            <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
            <el-table-column width="380px;" label="优惠券" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.details.length">
                        <div v-for="item in scope.row.details" :key="item.id">
                            {{item.couponBatchDTO.couponName}}
                        </div>
                    </div>
                    <span v-else>暂未设置优惠券</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="settingCoupons(scope.row.hotelId,scope.$index,scope.row.id)">设置优惠券</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog 
        :visible.sync="dialogVisible"
         title="设置优惠券"
         :before-close="cancel"
         width="30%">
            <div class="wrapper">
                <el-select
                style="width:400px;"
                v-model="coupons" 
                multiple
                filterable
                remote
                reserve-keyword
                collapse-tags 
                :multiple-limit="10"
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                @focus="getCouponsList()"
                :loading="loading">
                    <el-option-group
                    v-for="group in batchData"
                    :key="group.couponOwnerOrgKindName"
                    :label="group.couponOwnerOrgKindName">
                        <el-option
                            v-for="item in group.batchList"   
                            :key="item.id"
                            :label="item.couponBatchName"
                            :value="item.id">
                        </el-option>
                    </el-option-group>
                </el-select>
            </div>
            <div class="operate">
                <el-button type="none" @click="cancel()">取消</el-button>
                <el-button type="primary" @click="ensure()">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'LaunchCabinetAdd',
    data(){
        return{
            actPartInCount:"",
            actName:'',
            actType:'',
            actBegin:'',
            actEnd:'',
            hotelList:[],
            actID:'',
            showType:'',
            loading: false,
            batchData:'',
            dateSels:'',
            actTypeList:[],
            timeSels:'',
            selectId:'',
            dialogVisible:false,
            coupons:[],
            settingId:'',
            activityEndTime:''
            // pageSize:10,   //每页显示条数
            // pageTotal: 1,   //默认总条数
            // pageNum: 1, //当前页码
        }
    },
    created() {
        this.actID = this.$route.query.modifyid;
        this.getFillbackData();
        this.gethotelList();
    },
    methods: {
        getFillbackData(){
            let that = this;
            this.$api.selectActivityOne(this.actID).then(response => {
                if(response.data.code == 0){
                    this.actName = response.data.data.actName
                    this.actBegin = response.data.data.actBegin.split(' ')[0]
                    this.actEnd = response.data.data.actEnd.split(' ')[0]
                    this.activityEndTime = this.getTimes(response.data.data.actEnd)
                    this.actPartInCount = response.data.data.actPartInCount
                    this.actPartInCountType = response.data.data.actPartInCountType
                    if(this.actPartInCountType == 0){
                        this.showType = '不限制'
                    }else if(this.actPartInCountType == 1){
                        this.showType = this.actPartInCount + '次/每类型'
                    }else if(this.actPartInCountType == 2){
                        this.showType = this.actPartInCount + '次/每活动'
                    }else if(this.actPartInCountType == 3){
                        this.showType = this.actPartInCount + '次/每天'
                    }else if(this.actPartInCountType == 4){
                        this.showType = this.actPartInCount + '次/每周'
                    }else if(this.actPartInCountType == 5){
                        this.showType = this.actPartInCount + '次/每月'
                    }
                    this.getActList(response.data.data.actType)
                    this.settingDateTime(response.data.data)
                }else{
                    that.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                that.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //获取活动列表
        getActList(actType){
            this.$api.basicDataItems({key:'ACTTYPE',orgId:0}).then(response => {
                if(response.data.code==0){
                    this.actTypeList = response.data.data.map(item => {
                        return {
                            id: item.dictValue,
                            label: item.dictName
                        }
                    })
                    this.actTypeList.forEach(key => {
                        if(key.id == actType){
                            this.actType = key.label
                        }
                    })
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        settingDateTime(response){
            let chineseNum = ['一','二','三','四','五','六']
            let actPartInDate = response.actPartInDate?JSON.parse(response.actPartInDate):[];
            let length = actPartInDate.length;
            if(response.actPartInDateType == 1){
                actPartInDate.forEach((item,index) => {
                    this.dateSels += item == 1?'周日，':'周'+chineseNum[item-2]+(index == length -1?'':'，')
                })
            }else if(response.actPartInDateType == 2){
                actPartInDate.forEach((item,index) => {
                    this.dateSels += (item+'月'+(index==length-1?'':'，'))
                })
            }else if(response.actPartInDateType == 3){
                actPartInDate.forEach((item,index) => {
                    this.dateSels += (item+'号'+(index==length-1?'':'，'))
                })
            }
            if(response.actPartInTime){
                let length0 = JSON.parse(response.actPartInTime).length;
                JSON.parse(response.actPartInTime).forEach((item,index) => {
                    this.timeSels += (item+(index==length0-1?'':'，'))
                })
            }
        },
        gethotelList(){
            this.$api.selectActivityOne(this.actID).then(response => {
                if(response.data.code == 0){
                    this.hotelList = response.data.data.actHotelDTOS
                }else{
                    this.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        getCouponsList(batchName){
            let that=this;
            let params={
                couponName:batchName,
                hotelId: this.selectId,
                actEndDate: this.actEnd,
                actStartDate: this.actBegin
                // pageNo: 1,
                // pageSize: 50
            };
            this.$api.actGetCouponList({params}).then(response=>{
                if(response.data.code=='0'){
                    let arr = [];
                    response.data.data.forEach(item=>{
                        let ifChong = false
                        arr.forEach((item2,index)=>{
                            if(item.couponOwnerOrgKind == item2.couponOwnerOrgKind){
                                // if(item.couponTermDays == 0 && this.getTimes(item.couponTermEndDate) < this.activityEndTime) return
                                arr[index].batchList.push({
                                    id:item.id,
                                    couponBatchName:item.couponName
                                })
                                ifChong = true
                            }
                        })
                        if(!ifChong){
                            // if(item.couponTermDays == 0 && this.getTimes(item.couponTermEndDate) < this.activityEndTime) return
                            arr.push({
                                couponOwnerOrgKind: item.couponOwnerOrgKind,
                                couponOwnerOrgKindName: item.couponOwnerOrgKindName,
                                batchList:[{
                                    id:item.id,
                                    couponBatchName:item.couponName
                                }]
                            })
                        }
                    })
                    this.batchData = arr
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText:"确定"
                    })
                }
            }).catch(error=>{
                    that.$alert(error,"警告",{
                    confirmButtonText:"确定"
                })
            })
        },
        //获取时间戳
        getTimes(time){
            let dateTime = new Date(time)
            return dateTime.getTime(dateTime)
        },
        //远程搜索
        remoteMethod(val){
            this.getCouponsList(val)
        },
        settingCoupons(hotelId,index,id){
            this.dialogVisible = true;
            this.selectId = hotelId;
            this.settingId = id;
            this.coupons = this.hotelList[index].details.map(item=>{
                return item.couponId
            })
            this.getCouponsList();
        },
        cancel(){
            this.dialogVisible = false;
            this.coupons = this.hotelList
        },
        ensure(){
            let that = this
            let params = {
                couponIds: this.coupons
            }
            if(!this.coupons.length){
                that.$alert('请至少选择一个优惠券',"警告",{
                    confirmButtonText:"确定"
                })
                return;
            }
            this.dialogVisible = false;
            this.coupons = []
            this.$api.settingCoupons(this.settingId,params).then(response=>{
                if(response.data.code=='0'){
                    this.gethotelList()
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
    }
}
</script>
<style lang="less" scoped>
    .hoteladd{
        text-align: left;
        .title{
            font-weight: bold;
        }
        .detail{
            width: 30%;
            font-size: 14px;
            .parts{
                .content{
                    color: #999999;
                }
            }
            .el-divider{
                margin: 10px 0;
            }
        }
        .operate{
            display: flex;
            justify-content: center;
        }
        .wrapper{
            display: flex;
            justify-content: center;
            margin-bottom: 40px;
            height: 150px;
            flex-direction: column;
            align-items:center;
        }
    }
</style>
-->