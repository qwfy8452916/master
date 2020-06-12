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
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="settingShareRule(scope.row.hotelId,scope.row.hotelName,scope.row.id)">设置</el-button>
                    <el-button type="text" size="small" @click="viewdetail(scope.row.id,2)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="10"
                :total="pageTotal"
                :current-page.sync="pageNum"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div> -->
        <el-dialog 
        :visible.sync="dialogVisible"
         :title="settingData.ifDetail?'查看详情':hotelName"
         :before-close="cancel"
         width="30%">
            <div class="wrapper">
                <el-form v-if="settingData.ifDetail?!ifhasNode:true" :model="settingData" :rules="rules" ref="settingData" label-width="140px" class="hotelform">
                    <el-form-item label="商品分享" prop="ifgoodsShare">
                        <el-switch :disabled="settingData.ifDetail" v-model="settingData.ifgoodsShare"></el-switch>
                    </el-form-item>
                    <el-form-item v-if="settingData.ifgoodsShare" label="分享奖励来源" prop="goodsBonusFrom">
                        <el-select :disabled="settingData.ifDetail" v-model="settingData.goodsBonusFrom" placeholder="请选择分享奖励来源">
                            <el-option v-for="item in bonusAmountList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="settingData.ifgoodsShare" label="分享奖励类型" prop="goodsShareType">
                        <el-radio-group :disabled="settingData.ifDetail" v-model="settingData.goodsShareType">
                            <div v-if="settingData.ifDetail ? settingData.goodsShareType == 1 : true">
                                <el-radio :label="1">比例</el-radio>
                                <el-form-item style="height:60px;" label="分享奖励（员工）" prop="goodsEmployeeBili">
                                    <el-input :disabled="settingData.ifDetail" style="width:140px;" v-model.trim="settingData.goodsEmployeeBili"></el-input><span>&nbsp;%</span>
                                </el-form-item>
                                <el-form-item style="height:60px;" label="分享奖励（顾客）" prop="goodsCustomerBili">
                                    <el-input :disabled="settingData.ifDetail" style="width:140px;" v-model.trim="settingData.goodsCustomerBili"></el-input><span>&nbsp;%</span>
                                </el-form-item>
                            </div>
                            <div v-if="settingData.ifDetail ? settingData.goodsShareType == 2 : true">
                                <el-radio :label="2">金额/件商品</el-radio>
                                <el-form-item style="height:60px;" label="分享奖励（员工）" prop="goodsEmployeeNum">
                                    <el-input :disabled="settingData.ifDetail" style="width:140px;" v-model.trim="settingData.goodsEmployeeNum"></el-input><span>&nbsp;元</span>
                                </el-form-item>
                                <el-form-item style="height:60px;" label="分享奖励（顾客）" prop="goodsCustomerNum">
                                    <el-input :disabled="settingData.ifDetail" style="width:140px;" v-model.trim="settingData.goodsCustomerNum"></el-input><span>&nbsp;元</span>
                                </el-form-item>
                            </div>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="订房分享" prop="ifbookShare">
                        <el-switch :disabled="settingData.ifDetail" v-model="settingData.ifbookShare"></el-switch>
                    </el-form-item>
                    <el-form-item v-if="settingData.ifbookShare" label="分享奖励来源" prop="bookBonusFrom">
                        <el-select :disabled="settingData.ifDetail" v-model="settingData.bookBonusFrom" placeholder="请选择分享奖励来源">
                            <el-option v-for="item in bonusAmountList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="settingData.ifbookShare" label="分享奖励类型" prop="bookShareType">
                        <el-radio-group :disabled="settingData.ifDetail" v-model="settingData.bookShareType">
                            <div v-if="settingData.ifDetail ? settingData.bookShareType == 1 : true">
                                <el-radio :label="1">比例</el-radio>
                                <el-form-item style="height:60px;" label="分享奖励（员工）" prop="bookEmployeeBili">
                                    <el-input :disabled="settingData.ifDetail" style="width:140px;" v-model.trim="settingData.bookEmployeeBili"></el-input><span>&nbsp;%</span>
                                </el-form-item>
                                <el-form-item style="height:60px;" label="分享奖励（顾客）" prop="bookCustomerBili">
                                    <el-input :disabled="settingData.ifDetail" style="width:140px;" v-model.trim="settingData.bookCustomerBili"></el-input><span>&nbsp;%</span>
                                </el-form-item>
                            </div>
                            <div v-if="settingData.ifDetail ? settingData.bookShareType == 2 : true">
                                <el-radio :label="2">金额/件商品</el-radio>
                                <el-form-item style="height:60px;" label="分享奖励（员工）" prop="bookEmployeeNum">
                                    <el-input :disabled="settingData.ifDetail" style="width:140px;" v-model.trim="settingData.bookEmployeeNum"></el-input><span>&nbsp;元</span>
                                </el-form-item>
                                <el-form-item style="height:60px;" label="分享奖励（顾客）" prop="bookCustomerNum">
                                    <el-input :disabled="settingData.ifDetail" style="width:140px;" v-model.trim="settingData.bookCustomerNum"></el-input><span>&nbsp;元</span>
                                </el-form-item>
                            </div>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div v-else>暂未设置活动明细</div>
            </div>
            <div class="operate" v-if="!settingData.ifDetail">
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
        var validator1 = (rule, value, callback) => {
            if(this.settingData.ifgoodsShare){
                if(this.settingData.goodsShareType == 1){
                    if(value == ''){
                        callback(new Error('请填写比例'));
                    }else if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)){
                        callback(new Error('请规范填写比例'));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        var validator2 = (rule, value, callback) => {
            if(this.settingData.ifgoodsShare){
                if(this.settingData.goodsShareType == 2){
                    if(value == ''){
                        callback(new Error('请填写金额'));
                    }else if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(value)){
                        callback(new Error('请规范填写金额'));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        var validator3 = (rule, value, callback) => {
            if(this.settingData.ifbookShare){
                if(this.settingData.bookShareType == 1){
                    if(value == ''){
                        callback(new Error('请填写比例'));
                    }else if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)){
                        callback(new Error('请规范填写比例'));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        var validator4 = (rule, value, callback) => {
            if(this.settingData.ifbookShare){
                if(this.settingData.bookShareType == 2){
                    if(value == ''){
                        callback(new Error('请填写金额'));
                    }else if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(value)){
                        callback(new Error('请规范填写金额'));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        return{
            settingData:{
                ifgoodsShare:true,
                ifbookShare:true,
                bookBonusFrom:'',
                goodsBonusFrom:'',
                bookShareType:1,
                goodsShareType:1,
                bookEmployeeBili:'',
                bookCustomerBili:'',
                goodsEmployeeBili:'',
                goodsCustomerBili:'',
                bookEmployeeNum:'',
                bookCustomerNum:'',
                goodsEmployeeNum:'',
                goodsCustomerNum:'',
            },
            bonusAmountList:[
                {
                    id:1,
                    label:'利润'
                },
                {
                    id:2,
                    label:'销售额'
                },
                {
                    id:3,
                    label:'所有人（供应商）'
                },
            ],
            actPartInCount:"",
            actName:'',
            actType:'',
            actBegin:'',
            actEnd:'',
            hotelList:[],
            actID:'',
            hotelName:'',
            showType:'',
            actTypeList:[],
            loading: false,
            batchData:'',
            dateSels:'',
            timeSels:'',
            selectId:'',
            dialogVisible:false,
            settingId:'',
            activityEndTime:'',
            ifhasNode:false,
            rules:{
                bookEmployeeBili:[{validator:validator3,trigger:"blur"}],
                bookCustomerBili:[{validator:validator3,trigger:"blur"}],
                goodsEmployeeBili:[{validator:validator1,trigger:"blur"}],
                goodsCustomerBili:[{validator:validator1,trigger:"blur"}],
                bookEmployeeNum:[{validator:validator4,trigger:"blur"}],
                bookCustomerNum:[{validator:validator4,trigger:"blur"}],
                goodsEmployeeNum:[{validator:validator2,trigger:"blur"}],
                goodsCustomerNum:[{validator:validator2,trigger:"blur"}],
                bookBonusFrom:[{required: true, message: '请选择分享奖励类型',trigger:"change"}],
                goodsBonusFrom:[{required: true, message:'请选择分享奖励类型',trigger:"change"}],
            }
            // pageSize:10,   //每页显示条数
            // pageTotal: 1,   //默认总条数
            // pageNum: 1, //当前页码
        }
    },
    computed:{
        ifViewDetail(){
            return this.settingData.ifDetail?true:false
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
        viewdetail(id,dict){
            this.dialogVisible = true
            this.$api.getActShareRule({actHotelId:id}).then(response => {
                if(response.data.code == 0){
                    if(response.data.data.length){
                        let resdata1 = response.data.data[0]
                        let resdata2 = response.data.data[1]
                        this.settingData.bookBonusFrom = resdata1.bonusAmountFrom
                        this.settingData.goodsBonusFrom = resdata2.bonusAmountFrom
                        this.settingData.bookShareType = resdata1.bonusType
                        this.settingData.goodsShareType = resdata2.bonusType
                        this.settingData.ifbookShare = resdata1.status?true:false
                        this.settingData.ifgoodsShare = resdata2.status?true:false
                        console.log(resdata1.status,this.settingData.ifbookShare);
                        console.log(resdata2.status,this.settingData.ifgoodsShare);
                        if(resdata1.bonusType == 1){
                            this.settingData.bookEmployeeBili = resdata1.empBonus
                            this.settingData.bookCustomerBili = resdata1.cusBounus
                        }else if(resdata1.bonusType == 2){
                            this.settingData.bookEmployeeNum = resdata1.empBonus
                            this.settingData.bookCustomerNum = resdata1.cusBounus
                        }
                        if(resdata2.bonusType == 1){
                            this.settingData.goodsEmployeeBili = resdata2.empBonus
                            this.settingData.goodsCustomerBili = resdata2.cusBounus
                        }else if(resdata2.bonusType == 2){
                            this.settingData.goodsEmployeeNum = resdata2.empBonus
                            this.settingData.goodsCustomerNum = resdata2.cusBounus
                        }
                        this.ifhasNode = false;
                    }else{
                        if(dict == 2){
                            this.ifhasNode = true;
                        }
                    }
                    if(dict == 1){
                        this.settingData.ifDetail = false;
                    }else if(dict == 2){
                        // this.$set(this.settingData,'ifDetail',true)
                        this.settingData.ifDetail = true
                    }
                    this.$forceUpdate()
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
       
        //获取时间戳
        getTimes(time){
            let dateTime = new Date(time)
            return dateTime.getTime(dateTime)
        },
        settingShareRule(hotelId,hotelName,id){
            this.settingData = {
                ifgoodsShare:true,
                ifbookShare:true,
                bookBonusFrom:'',
                goodsBonusFrom:'',
                bookShareType:1,
                goodsShareType:1,
                bookEmployeeBili:'',
                bookCustomerBili:'',
                goodsEmployeeBili:'',
                goodsCustomerBili:'',
                bookEmployeeNum:'',
                bookCustomerNum:'',
                goodsEmployeeNum:'',
                goodsCustomerNum:'',
            }
            this.dialogVisible = true;
            this.selectId = hotelId;
            this.hotelName = hotelName;
            this.settingId = id;
            this.viewdetail(id,1)
        },
        cancel(){
            this.dialogVisible = false;
            
        },
        ensure(){
            let that = this
            let params1 = {
                businessType: 2,
                status:this.settingData.ifbookShare?1:0,
                actHotelId:this.selectId,
                bonusAmountFrom: this.settingData.bookBonusFrom,
                bonusType: this.settingData.bookShareType
            }
            let params2 = {
                businessType: 1,
                status:this.settingData.ifgoodsShare?1:0,
                actHotelId:this.selectId,
                bonusAmountFrom: this.settingData.goodsBonusFrom,
                bonusType: this.settingData.goodsShareType
            }
            if(this.settingData.bookShareType == 1){
                params1.cusBounus = this.settingData.bookCustomerBili
                params1.empBonus = this.settingData.bookEmployeeBili
            }else if(this.settingData.bookShareType == 2){
                params1.cusBounus = this.settingData.bookCustomerNum
                params1.empBonus = this.settingData.bookEmployeeNum
            }
            if(this.settingData.goodsShareType == 1){
                params2.cusBounus = this.settingData.goodsCustomerBili
                params2.empBonus = this.settingData.goodsEmployeeBili
            }else if(this.settingData.goodsShareType == 2){
                params2.cusBounus = this.settingData.goodsCustomerNum
                params2.empBonus = this.settingData.goodsEmployeeNum
            }
            let params = [params1,params2]
            this.$refs['settingData'].validate((valid) => {
                if (valid) {
                    this.$api.setActShareRule(this.settingId,params).then(response=>{
                        if(response.data.code=='0'){
                            this.dialogVisible = false;
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
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
                } else {
                    return false;
                }
            });
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
            .shareRule{
                display: flex;
            }
        }
    }
</style>