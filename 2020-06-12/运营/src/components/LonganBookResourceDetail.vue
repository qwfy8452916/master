<template>
    <div class="resourceadd">
        <p class="title">查看详情</p>
        <el-form :model="ResourceDataModify" :rules="rules" ref="ResourceDataModify" label-width="120px" class="bookform">
            <el-form-item>
                <span slot="label"><label class="titlebar">房源信息&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="酒店名称" prop="hotelId">
                <el-select :disabled="true" v-model="ResourceDataModify.hotelId" placeholder="请选择">
                    <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房型名称" prop="roomTypeId">
                <el-select :disabled="true" v-model="ResourceDataModify.roomTypeId" placeholder="请选择">
                    <el-option 
                        v-for="item in typeList" 
                        :key="item.id" 
                        :label="item.typeName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房源名称" prop="resourceName">
                <el-input :disabled="true" v-model.trim="ResourceDataModify.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="早餐" prop="breakfastFlag">
                <el-select :disabled="true" v-model="ResourceDataModify.breakfastFlag" placeholder="请选择">
                    <el-option label="无早" :value="0"></el-option>
                    <el-option label="单早" :value="1"></el-option>
                    <el-option label="双早" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="窗户" prop="windowFlag">
                <el-select :disabled="true" v-model="ResourceDataModify.windowFlag" placeholder="请选择">
                    <el-option label="无窗" :value="0"></el-option>
                    <el-option label="有窗" :value="1"></el-option>
                    <el-option label="飘窗" :value="2"></el-option>
                    <el-option label="落地窗" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="可入住人数" prop="livePeople">
                <el-input :disabled="true" v-model.number="ResourceDataModify.livePeople"></el-input> 人
            </el-form-item>
            <el-form-item label="可否取消" prop="isCancellable">
                <el-radio-group :disabled="true" v-model="ResourceDataModify.isCancellable">
                    <el-radio :label="0">不可取消</el-radio>
                    <el-radio :label="1">可取消</el-radio>
                </el-radio-group>
                <span v-if="ResourceDataModify.isCancellable == 1">截止&nbsp;
                    <el-time-select
                        :disabled="true"
                        v-model="cancelEnd"
                        :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '23:00'
                        }"
                        placeholder="选择时间"
                        class="timeWidth">
                    </el-time-select>&nbsp;之前
                </span>
            </el-form-item>
            <el-form-item label="房量" prop="roomCount">
                <el-input :disabled="true" v-model.number="ResourceDataModify.roomCount"></el-input> 间
            </el-form-item>
            <el-form-item label="基础价格" prop="basicPrice">
                <el-input :disabled="true" v-model="ResourceDataModify.basicPrice"></el-input> 元
            </el-form-item>
            <el-form-item label="是否为钟点房" prop="isHourRoom">
                <el-radio-group :disabled="true" v-model="ResourceDataModify.isHourRoom">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input :disabled="true" v-model.number="ResourceDataModify.sort"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">客房欢迎礼</label></span>
            </el-form-item>
            <div class="facilityadd">
                <span class="facspan">欢迎礼标签</span>
                <el-button :disabled="true" type="primary" class="addbtn" size="small" @click="giftAddLine">+ 添加</el-button>
                <el-table
                    :data="ResourceDataModify.GiftData"
                    :show-header="false"
                    class="facilitytable">
                    <el-table-column prop="giftTxt">
                        <template slot-scope="scope">
                            <el-form-item :prop="'GiftData.'+scope.$index+'.giftTxt'" :rules="rules.giftTxt">
                                <el-input :disabled="true" v-model="scope.row.giftTxt"></el-input>&nbsp;&nbsp;
                                <el-button :disabled="true" type="text" size="small" @click="giftDeleteLine(scope.$index)">删除</el-button>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column width="30px">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="giftDeleteLine(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>
            <!-- <el-form-item>
                <span slot="label"><label class="titlebar">红包设置</label></span>
            </el-form-item>
            <el-form-item label="红包" prop="redPacketFlag">
                <el-radio-group :disabled="true" v-model="ResourceDataModify.redPacketFlag">
                    <el-radio :label="0">不支持</el-radio>
                    <el-radio :label="1">支持</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="ResourceDataModify.redPacketFlag == 1" prop="redPacketRate">
                <span slot="label"><label class="required-icon">*</label> 红包比例</span>
                <el-input :disabled="true" v-model.trim="ResourceDataModify.redPacketRate"></el-input> %
            </el-form-item> -->
            <el-form-item>
                <el-button @click="resetForm">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'HotelBookResourceModify',
    data(){
        var decimalsReg = /^\d+(\.\d+)?$/
        var validateDecimals = (rule,value,callback) => {
            if(!decimalsReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var isValidateDecimals = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!decimalsReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            authzData: '',
            hotelList: [],
            brId: '',
            typeList: [],
            isSubmit: false,
            ResourceDataModify: {},
            cancelEnd: null,
            rules: {
                resourceName: [
                    {required: true, message: '请填写房源名称', trigger: 'blur'},
                    {min: 1, max: 20, message: '房源名称请保持在20个字符以内', trigger: ['blur','change']}
                ],
                breakfastFlag: [
                    {required: true, message: '请选择早餐', trigger: 'change'}
                ],
                roomTypeId: [
                    {required: true, message: '请选择房型名称', trigger: 'change'}
                ],
                windowFlag: [
                    {required: true, message: '请选择窗户', trigger: 'change'}
                ],
                livePeople: [
                    {required: true, message: '请填写可入住人数', trigger: 'blur'},
                    {min: 1, max: 9999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
                isCancellable: [
                    {required: true, message: '请选择可否取消', trigger: 'change'}
                ],
                roomCount: [
                    {required: true, message: '请填写房量', trigger: 'blur'},
                    {min: 1, max: 9999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
                basicPrice: [
                    {required: true, validator: validateDecimals, trigger: ['blur','change']}
                ],
                isHourRoom: [
                    {required: true, message: '请选择是否为钟点房', trigger: 'change'}
                ],
                sort: [
                    { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                ],
                giftTxt: [
                    {required: true, message: '请填写欢迎礼标签', trigger: 'blur'},
                    {min: 1, max: 10, message: '欢迎礼标签请保持在10个字符以内', trigger: ['blur','change']}
                ],
                redPacketFlag: [
                    {required: true, message: '请选择是否支持红包', trigger: 'change'}
                ],
                redPacketRate: [
                    {validator: isValidateDecimals, trigger: ['blur','change']}
                ],
                GiftData: [],
                redPacketRate: ''
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.brId = this.$route.query.id;
        this.getHotelList();
        this.bookResourceDetail();
    },
    methods: {
        //添加-欢迎礼标签-行
        giftAddLine(){
            const facData = this.ResourceDataModify.GiftData;
            // if(facData.length < 5){
                let newLine = {
                    giftTxt: ''
                };
                this.ResourceDataModify.GiftData.push(newLine);
            // }else{
            //     this.$message.error('客房设施最多5个!');
            // }  
        },
        //删除-欢迎礼标签-行
        giftDeleteLine(index){
            this.ResourceDataModify.GiftData.splice(index, 1);
        },
        //酒店列表
        getHotelList(){
            const params = {
                orgAs: 2
            };
            this.$api.getHotelNameAll(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName
                            }
                        })
                        const hotelAll = {
                            id: '',
                            hotelName: '全部'
                        };
                        this.hotelList.push(hotelAll);
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
        //获取房型列表
        getTypeList(hotelId){
            const params = {
                hotelId: hotelId
            };
            this.$api.getBookTypeList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.typeList = result.data.map(item => {
                            return{
                                id: item.id,
                                typeName: item.typeName
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
        //获取房源详情
        bookResourceDetail(){
            const params = {};
            const id = this.brId;
            this.$api.bookResourceDetail(params, id)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.ResourceDataModify = result.data;
                        this.cancelEnd = result.data.cancelDeadline;
                        const giftList = JSON.parse(result.data.present);
                        this.ResourceDataModify.GiftData = giftList.map(item => {
                            return {
                                giftTxt: item
                            }
                        });
                        this.getTypeList(result.data.hotelId);
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
        //返回
        resetForm(){
            this.$router.push({name: 'LonganBookResource'});
        },
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
.resourceadd >>> .el-table::before{
    height: 0px; 
}
.resourceadd >>> .el-table td{
    border-bottom: 0px;
    padding: 0px 0px;
}
.resourceadd >>> .el-table .cell{
    padding-left: 0px;
}
</style>

<style lang="less" scoped>
.resourceadd{
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
        .timeWidth{
            width: 21%;
        }
        .required-icon{
            color: #ff3030;
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
        }
    }
}
</style>

