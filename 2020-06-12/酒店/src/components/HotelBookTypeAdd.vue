<template>
    <div class="booktypeadd">
        <p class="title">新增房型</p>
        <el-form :model="BookTypeData" :rules="BookTypeData.rules" ref="BookTypeData" label-width="120px" class="bookform">
            <el-form-item>
                <span slot="label"><label class="titlebar">基础信息&nbsp;&nbsp;</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="房型名称" prop="typeName">
                <el-input v-model="BookTypeData.typeName"></el-input>
            </el-form-item>
            <el-form-item label="床型" prop="bedType">
                <el-select v-model="BookTypeData.bedType" placeholder="请选择">
                    <el-option 
                        v-for="item in bedTypeList" 
                        :key="item.id" 
                        :label="item.bedName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="床宽" prop="bedWidth">
                <el-input v-model.trim="BookTypeData.bedWidth" maxlength="10"></el-input> 米
            </el-form-item>
            <el-form-item label="面积" prop="roomArea">
                <el-input v-model.trim="BookTypeData.roomArea" maxlength="10"></el-input> 平方米
            </el-form-item>
            <el-form-item label="楼层" prop="roomFloor">
                <el-input v-model.trim="BookTypeData.roomFloor"></el-input>
            </el-form-item>
            <!-- <el-form-item label="基础价格" prop="roomPrice">
                <el-input v-model.trim="BookTypeData.roomPrice" maxlength="10"></el-input> 元
            </el-form-item> -->
            <el-form-item label="是否有钟点房" prop="isHourRoom">
                <el-radio-group v-model="BookTypeData.isHourRoom">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                </el-radio-group><br/>
                <span v-if="BookTypeData.isHourRoom == 1">钟点房时间&nbsp;
                    <el-time-select
                        v-model="hourStart"
                        :picker-options="{
                            start: '06:00',
                            step: '01:00',
                            end: '22:00'
                        }"
                        placeholder="选择时间"
                        class="timeWidth">
                    </el-time-select>&nbsp;至&nbsp;
                    <el-time-select
                        v-model="hourEnd"
                        :picker-options="{
                            start: '06:00',
                            step: '01:00',
                            end: '22:00'
                        }"
                        placeholder="选择时间"
                        class="timeWidth">
                    </el-time-select>&nbsp;&nbsp;&nbsp;每时段为&nbsp;<el-input v-model.trim="hourTimeSlot" maxlength="2" class="hourwidth"></el-input>&nbsp;小时
                </span>
            </el-form-item>
            <el-form-item label="加床服务" prop="isAddBed">
                <el-radio-group v-model="BookTypeData.isAddBed">
                    <el-radio :label="0">不可加床</el-radio>
                    <el-radio :label="1">无偿加床</el-radio>
                    <el-radio :label="2">有偿加床</el-radio>
                </el-radio-group>
                <span v-if="BookTypeData.isAddBed == 2">
                    <el-input v-model.trim="addbedPrice" maxlength="6" placeholder="请输入" class="addbed"></el-input> 元
                </span>
            </el-form-item>
            <el-form-item label="是否有浴缸" prop="bathtubFlag">
                <el-radio-group v-model="BookTypeData.bathtubFlag">
                    <el-radio :label="1">有浴缸</el-radio>
                    <el-radio :label="0">无</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否有洗衣服务" prop="laundryServiceFlag">
                <el-radio-group v-model="BookTypeData.laundryServiceFlag">
                    <el-radio :label="1">有洗衣服务</el-radio>
                    <el-radio :label="0">无</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="早餐可送入房" prop="breakfastInRoom">
                <el-radio-group v-model="BookTypeData.breakfastInRoom">
                    <el-radio :label="1">早餐可送入房</el-radio>
                    <el-radio :label="0">无</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否禁烟" prop="smokingFlag">
                <el-radio-group v-model="BookTypeData.smokingFlag">
                    <el-radio :label="1">禁烟</el-radio>
                    <el-radio :label="0">无</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="BookTypeData.sort"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">客房设施&nbsp;&nbsp;</label></span>
            </el-form-item>
            <hr class="line">
            <div class="facilityadd">
                <span class="facspan"><label class="required-icon">*</label> 客房设施</span>
                <el-button type="primary" class="addbtn" size="small" @click="facilityAddLine">添加设施</el-button>
                <el-table
                    :data="BookTypeData.facilityDTOS"
                    :show-header="false"
                    class="facilitytable">
                    <el-table-column prop="facilityType">
                        <template slot-scope="scope">
                            <el-form-item class="facilityOrderBy" :prop="'facilityDTOS.'+scope.$index+'.orderBy'" :rules="BookTypeData.rules.orderBy">
                                <el-input placeholder="设施排序" v-model.number="scope.row.orderBy"></el-input>
                            </el-form-item>
                            <el-form-item class="facilityType" :prop="'facilityDTOS.'+scope.$index+'.facilityType'" :rules="BookTypeData.rules.facilityType">
                                <el-input class="facilityname" placeholder="设施名称" v-model="scope.row.facilityType"></el-input>&nbsp;&nbsp;&nbsp;
                                <el-button type="text" size="small" @click="facilityDeleteLine(scope.$index)">删除</el-button>
                            </el-form-item>
                            <el-form-item :prop="'facilityDTOS.'+scope.$index+'.facilityContent'" :rules="BookTypeData.rules.facilityContent">
                                <el-input type="textarea" :rows="2" placeholder="设施内容" v-model="scope.row.facilityContent"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="facilityContent">
                        <template slot-scope="scope">
                            <el-form-item :prop="'facilityDTOS.'+scope.$index+'.facilityContent'" :rules="BookTypeData.rules.facilityContent">
                                <el-input type="textarea" :rows="2" placeholder="设施内容" v-model="scope.row.facilityContent"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column width="30px">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="facilityDeleteLine(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>
            <!-- <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 设施</span>
                <p class="facilitytitle">媒体科技</p>
                <el-input type="textarea" :rows="3" v-model.trim="BookTypeData.facilityMedia" maxlength="250" placeholder="请输入媒体科技"></el-input>
                <p class="facilitytitle">浴室设施</p>
                <el-input type="textarea" :rows="3" v-model.trim="BookTypeData.facilityShower" maxlength="250" placeholder="请输入浴室设施"></el-input>
                <p class="facilitytitle">食品/饮品</p>
                <el-input type="textarea" :rows="3" v-model.trim="BookTypeData.facilityFood" maxlength="250" placeholder="请输入食品/饮品"></el-input>
                <p class="facilitytitle">便利设施</p>
                <el-input type="textarea" :rows="3" v-model.trim="BookTypeData.facilityFast" maxlength="250" placeholder="请输入便利设施"></el-input>
                <p class="facilitytitle">其他</p>
                <el-input type="textarea" :rows="3" v-model.trim="BookTypeData.facilityElse" maxlength="250" placeholder="请输入其他"></el-input>
            </el-form-item> -->
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 列表图</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;支持1张图片，图片为jpg、jpeg、png、gif格式</label>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 详情图</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 2)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 2)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 2)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 2)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 2)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;最多选择5张图片，图片为jpg、jpeg、png、gif格式</label>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzlist['F:BH_BOOK_TYPE_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('BookTypeData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'HotelBookTypeAdd',
    data(){
        var decimalsReg = /^\d+(\.\d+)?$/
        var validateDecimals = (rule,value,callback) => {
            if(!decimalsReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            authzlist: {}, //权限数据
            hotelId: '',
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            imgList: [],
            bannerList: [],
            bedTypeList: [],
            isSubmit: false,
            BookTypeData: {
                sort: 0,
                rules: {
                    typeName: [
                        {required: true, message: '请输入房型名称', trigger: 'blur'},
                        {min: 1, max: 20, message: '房型名称请保持在20个字符以内', trigger: ['blur','change']}
                    ],
                    bedType: [
                        {required: true, message: '请选择床型', trigger: 'change'}
                    ],
                    bedWidth: [
                        {required: true, validator: validateDecimals, trigger: ['blur','change']}
                    ],
                    roomArea: [
                        {required: true, validator: validateDecimals, trigger: ['blur','change']}
                    ],
                    roomFloor: [
                        {required: true, message: '请填写楼层', trigger: 'blur'},
                        {min: 1, max: 10, message: '楼层请保持在10个字符以内', trigger: ['blur','change']}
                    ],
                    // roomPrice: [
                    //     {required: true, validator: validateDecimals, trigger: ['blur','change']}
                    // ],
                    isAddBed: [
                        {required: true, message: '请选择是否可加床', trigger: 'change'}
                    ],
                    bathtubFlag: [
                        {required: true, message: '请选择是否有浴缸', trigger: 'change'}
                    ],
                    laundryServiceFlag: [
                        {required: true, message: '请选择是否有洗衣服务', trigger: 'change'}
                    ],
                    breakfastInRoom: [
                        {required: true, message: '请选择早餐是否可送入房', trigger: 'change'}
                    ],
                    smokingFlag: [
                        {required: true, message: '请选择是否禁烟', trigger: 'change'}
                    ],
                    sort: [
                        { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                    ],
                    orderBy: [
                        { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                    ],
                    facilityType: [
                        {required: true, message: '请填写设施名称', trigger: 'blur'},
                        {min: 1, max: 10, message: '设施名称请保持在10个字符以内', trigger: ['blur','change']}
                    ],
                    facilityContent: [
                        {required: true, message: '请填写设施内容', trigger: 'blur'},
                        {min: 1, max: 255, message: '设施内容请保持在255个字符以内', trigger: ['blur','change']}
                    ],
                },

                facilityDTOS: [{
                    orderBy: '',
                    facilityType: '',
                    facilityContent: ''
                }]

            },
            hourStart: null,
            hourEnd: null,
            hourTimeSlot: '',
            addbedPrice: '',
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.hotelId = localStorage.getItem('hotelId');
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.getBedList();
    },
    methods: {
        //添加-客房设施-行
        facilityAddLine(){
            const facData = this.BookTypeData.facilityDTOS;
            // if(facData.length < 5){
                let newLine = {
                    orderBy: '',
                    facilityType: '',
                    facilityContent: ''
                };
                this.BookTypeData.facilityDTOS.push(newLine);
            // }else{
            //     this.$message.error('客房设施最多5个!');
            // }  
        },
        //删除-客房设施-行
        facilityDeleteLine(index){
            this.BookTypeData.facilityDTOS.splice(index, 1);
        },
        //获取床型列表
        getBedList(){
            const params = {
                key: 'BED_TYPE',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.bedTypeList = result.data.map(item => {
                            return{
                                id: item.dictValue,
                                bedName: item.dictName
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
        //确定 - 添加房源
        submitForm(BookTypeData){
            const that = this;
            if(this.BookTypeData.sort == ''){
                this.BookTypeData.sort = 0;
            }
            /*let facilityList = [
                {
                    facilityContent: this.BookTypeData.facilityMedia,
                    facilityType: 4
                },{
                    facilityContent: this.BookTypeData.facilityShower,
                    facilityType: 2
                },{
                    facilityContent: this.BookTypeData.facilityFood,
                    facilityType: 3
                },{
                    facilityContent: this.BookTypeData.facilityFast,
                    facilityType: 1
                },{
                    facilityContent: this.BookTypeData.facilityElse,
                    facilityType: 5
                }
            ];*/

            // this.BookTypeData.facilityDTOS = this.BookTypeData.facilityDTOS.map((item,index) => {
            //     item.orderBy = index;
            //     return item;
            // });
            const params = {
                hotelId: this.hotelId,
                typeName: this.BookTypeData.typeName,
                bedType: this.BookTypeData.bedType,
                bedWidth: this.BookTypeData.bedWidth,
                roomSize: this.BookTypeData.roomArea,
                floor: this.BookTypeData.roomFloor,
                // basicPrice: this.BookTypeData.roomPrice,
                hourRoomFlag: this.BookTypeData.isHourRoom,
                hourRoomStartTime: this.hourStart,
                hourRoomEndTime: this.hourEnd,
                hourRoomDuration: this.hourTimeSlot,
                // facilityDTOS: facilityList,
                bedAddFlag: this.BookTypeData.isAddBed,
                bedAddPrice: this.addbedPrice,
                uploadImagePathList: JSON.stringify(this.imgList),
                uploadImagePathDetail: JSON.stringify(this.bannerList),
                bathtubFlag: this.BookTypeData.bathtubFlag,
                laundryServiceFlag: this.BookTypeData.laundryServiceFlag,
                breakfastInRoom: this.BookTypeData.breakfastInRoom,
                smokingFlag: this.BookTypeData.smokingFlag,
                sort: this.BookTypeData.sort,
                facilityDTOS: this.BookTypeData.facilityDTOS,
            };
            // console.log(params);
            // return
            this.$refs[BookTypeData].validate((valid) => {
                if(valid){
                    if(this.BookTypeData.isHourRoom == 1){
                        if(this.hourStart == null || this.hourEnd == null){
                            this.$message.error('请选择钟点房时间');
                            return false
                        }
                        if(this.hourStart.substr(0,2) > this.hourEnd.substr(0,2)){
                            this.$message.error('钟点房时间选择有误');
                            return false
                        }
                        let validateNum = /^[1-9]\d*$/;
                        if(!validateNum.test(this.hourTimeSlot)){
                            this.$message.error('钟点房时段格式错误');
                            return false
                        }
                        let slotData = this.hourEnd.substr(0,2) - this.hourStart.substr(0,2);
                        if(this.hourTimeSlot > slotData){
                            this.$message.error('钟点房时段不能大于钟点房时间差');
                            return false
                        }
                    }
                    if(this.BookTypeData.facilityDTOS.length == 0){
                        this.$message.error('请填写客房设施');
                        return false
                    }
                    // if(!this.BookTypeData.facilityMedia && !this.BookTypeData.facilityShower && !this.BookTypeData.facilityFood && !this.BookTypeData.facilityFast && !this.BookTypeData.facilityElse){
                    //     this.$message.error('请输入设施');
                    //     return false
                    // }
                    if(this.BookTypeData.isAddBed == 2){
                        let validateFloat = /^\d+(\.\d+)?$/;
                        if(!validateFloat.test(this.addbedPrice)){
                            this.$message.error('加床金额格式错误');
                            return false
                        }
                    }
                    if(this.imgList.length == 0){
                        this.$message.error('请上传列表图!');
                        return false
                    }
                    if(this.bannerList.length == 0){
                        this.$message.error('请上传详情图');
                        return false
                    }
                    this.isSubmit = true;
                    this.$api.bookTypeAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('房型新增成功！');
                                this.$router.push({name: 'HotelBookTypeList'});
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
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            this.$router.push({name: 'HotelBookTypeList'});
        },
        //图片上传成功
        handleSuccess(res, file, fileList, index){
            if(index == 1){
                this.imgList.push(res.data);
            }else if(index == 2){
                this.bannerList.push(res.data);
            }else if(index == 3){
                this.descList.push(res.data);
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                this.imgList = fileList.map(item => {
                    return item.response.data
                });
            }else if(index == 2){
                this.bannerList = fileList.map(item => {
                    return item.response.data
                });
            }else if(index == 3){
                this.descList = fileList.map(item => {
                    return item.response.data
                });
            }
        },
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file, index){
            if(index == 1 || index == 2){
                const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png' || 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传的图片只能是jpg、jpeg、png、gif格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }else if(index == 3){
                const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png' || 'image/gif';
                if (!isJPG) {
                    this.$message.error('上传的图片只能是jpg、jpeg、png、gif格式!');
                }
                return isJPG;
            }
        },
        //文件超出个数限制时
        handleExceed(file, fileList, index){
            if(index == 1){
                this.$message.error('列表图只能上传1张！');
            }else if(index == 2){
                this.$message.error('详情图不能超过5张！');
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
.el-input--suffix .el-input__inner{
    padding-right: 8px;
}
</style>

<style scoped>
.el-input{
    width: 86%;
}
.el-select{
    width: 86%;
}
.el-radio{
    margin-right: 20px;
}
/* .el-textarea{
    width: 86%;
} */
.booktypeadd >>> .el-table::before{
    height: 0px; 
}
.booktypeadd >>> .el-table td{
    border-bottom: 0px;
    padding: 0px 0px;
}
.booktypeadd >>> .el-table .cell{
    padding-left: 0px;
}
</style>

<style lang="less" scoped>
.booktypeadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .bookform{
        width: 45%;
        .titlebar{
            font-weight: bold;
            font-size: 16px;
            color: #444;
        }
        .line{
            width: 200%;
            border: 0px;
            border-bottom: 1px dashed #ccc;
            margin: -15px 0px 20px 0px;
        }
        .timeWidth{
            width: 21%;
        }
        .required-icon{
            color: #ff3030;
        }
        .facilitytitle{
            margin: 0px 0px;
        }
        .addbed{
            width: 18%;
        }
        .hourwidth{
            width: 12%;
        }
        .facilityadd{
            .facspan{
                display: inline-block;
                width: 108px;
                font-size: 14px;
                color: #666;
                text-align: right;
                padding-right: 12px;
            }
            .addbtn{
                margin-bottom: 10px;
                background: #ffa522;
                border: #dda522;
                color: #fff;
                display: inline-block;
            }
            .facilityOrderBy{
                width: 240px;
            }
            .facilityType{
                margin: -62px 0px 20px 120px;
            }
            .facilityname{
                width: 80%;
            }
        }
    }
}
</style>

