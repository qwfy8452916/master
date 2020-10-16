<template>
    <div class="hoteladd">
        <p class="title">活动明细</p>
        <div class="detail">
            <p style="color:#ccc;">活动信息</p>
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
            <div class="parts">
                <span>参与次数：</span><span class="content">
                    {{showType}}
                </span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>级别：</span><span class="content">{{actScopeLevel}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>所属组织：</span><span class="content">{{actOrgName}}</span>
            </div>
            <el-divider></el-divider>
            <div class="parts">
                <span>酒店名称：</span><span class="content">{{hotelName}}</span>
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
        </div>
        <p style="color:#ccc;">活动设置</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="优惠内容" prop="disCountLad">
                <el-button type="primary" size="small" @click="addLadder">添加</el-button>
                <el-popover
                    placement="right-start"
                    title="提示"
                    width="200"
                    trigger="hover"
                    :content="prompt1">
                    <el-button style="border:none;padding:0;vertical-align:middle;" slot="reference">
                        <i class="el-icon-warning-outline" style="font-size:18px"></i>
                    </el-button>
                </el-popover>
                <div class="ladder" v-for="(item,index) in Commoditygai.disCountLad" :key="index">
                    <span>第{{item.prodNumber}}件折扣</span><el-input style="width:100px" v-model="item.discount" placeholder=""></el-input><span>%，每单一次</span>
                    <el-button v-if="item.prodNumber != 1" type="text" size="small" @click="deleteLadder(index)">删除</el-button>
                </div>
            </el-form-item>
            <el-form-item label="是否重复计算" prop="repeatFlag">
                <el-switch v-model="Commoditygai.repeatFlag"></el-switch>
                <el-popover
                    placement="right-start"
                    title="提示"
                    width="200"
                    trigger="hover"
                    :content="prompt">
                    <el-button style="border:none;padding:0;vertical-align:middle;" slot="reference">
                        <i class="el-icon-warning-outline" style="font-size:18px"></i>
                    </el-button>
                </el-popover>
            </el-form-item>
            <el-form-item label="选择商品" prop="disCountGoods">
                <el-button type="primary" size="small" @click="addGoods">商品</el-button>
                <el-table :data="disCountGoods" border>
                    <el-table-column label="商品名称" prop="prodName" align="center"></el-table-column>
                    <el-table-column label="商品显示名称" prop="prodShowName" align="center"></el-table-column>
                    <el-table-column label="供货价" prop="prodSupplyPrice" align="center"></el-table-column>
                    <el-table-column label="零售价" prop="prodRetailPrice" align="center"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="deleteGoods(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next, jumper"
                        :pager-count="5"
                        :page-size="pageSize1"
                        :total="pageTotal1"
                        :current-page.sync="pageNum1"
                        @current-change = "current1"
                        @prev-click="prev1"
                        @next-click="next1">
                    </el-pagination>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="none" @click="cancelRedpack()">取消</el-button>
                <el-button type="primary" @click="ensureRedpack('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
        
        <el-dialog 
        :visible.sync="dialogVisible"
        :before-close="cancelGoods"
         title="请选择酒店商品"
         width="800px">
            <div class="searchHotel">
                <el-input style="width:200px" v-model="inquireCommodityName" placeholder="输入商品名称"></el-input>
                <el-button type="primary" @click="functionProdList">搜索</el-button>
            </div>
            <div class="chooseTable">
                <el-table border stripe 
                style="width:100%;" 
                :data="searchGoodsList"
                ref="multipleTable"
                @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        :selectable="checkSelectable"
                        :selected='true'
                        width="55">
                    </el-table-column>
                    <el-table-column label="商品名称" prop="prodName" align="center"></el-table-column>
                    <el-table-column label="商品显示名称" prop="prodShowName" align="center"></el-table-column>
                    <el-table-column label="供货价" prop="prodSupplyPrice" align="center"></el-table-column>
                    <el-table-column label="零售价" prop="prodRetailPrice" align="center"></el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next, jumper"
                        :pager-count="5"
                        :page-size="pageSize"
                        :total="pageTotal"
                        :current-page.sync="pageNum"
                        @current-change = "current"
                        @prev-click="prev"
                        @next-click="next">
                    </el-pagination>
                </div>
            </div>
            <div class="operate">
                <el-button type="none" @click="cancelGoods()">取消</el-button>
                <el-button type="primary" @click="ensureGoods()">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LaunchCabinetAdd',
    data(){
        var validator1 = (rule, value, callback) => {
            let ifError = true
            this.Commoditygai.disCountLad.forEach(item => {
                if(!item.discount){
                    ifError = false
                }
            })
            if(!ifError){
                callback(new Error('请填写折扣数额'));
            }else{
                callback();
            }
        }
        var disCountGoods = (rule, value, callback) => {
            if(!this.disCountGoods.length){
                callback(new Error('请添加酒店商品'));
            }else{
                callback();
            }
        }
        var validator2 = (rule, value, callback) => {
            let ifErrorText = true
            this.Commoditygai.disCountLad.forEach(item => {
                if(!/(^[1-9]([0-9]+)(\.[0-9]{1,2})?$)/.test(item.discount)){
                    ifErrorText = false
                }
            })
            if(!ifErrorText){
                callback(new Error('请规范填写折扣数额'));
            }else{
                callback();
            }
        }
        return{
            prompt:`如果支持重复计算，则表示，满足条件后的下一轮也会按照这个折扣计算。例如，第2件5折，当第3件时没有5折优惠，但第4件时，则会再次享受5折优惠。`,
            prompt1:`最多新增5件商品的折扣，不能跳过1、2件商品，直接设置第3件`,
            Commoditygai:{
                disCountLad:[],
                repeatFlag:false,
            },
            disCountGoodsAll:[],
            disCountGoods:[],
            actOrgId:'',
            actName:'',
            actType:'',
            actScopeLevel:'',
            actOrgName:'',
            actBegin:'',
            actEnd:'',
            dateSels:'',
            timeSels:'',
            showType:"",
            actID:'',
            hotelId:'',
            hotelName:'',

            detailId:'',
            inquireCommodityName:'',
            dialogVisible:false,
            hotelSelection:[],
            searchGoodsList:[],
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            pageNum: 1, //当前页码

            pageSize1:10,   //每页显示条数
            pageTotal1: 1,   //默认总条数
            pageNum1: 1, //当前页码

            rules: {
                disCountLad: [
                    {required: true,validator: validator1,trigger: 'blur'},
                    {validator: validator2,trigger: 'blur'},
                ],
                disCountGoods: [
                    {required: true,validator: disCountGoods,trigger: 'change'},
                ]
            }
        }
    },
    created() {
        this.actID = this.$route.query.modifyid;
        // this.hotelId = this.$route.query.hotelId;
        this.getFillbackData();
    },
    methods: {
        addLadder(){
            let length = this.Commoditygai.disCountLad.length
            if(length == 5){
                this.$message.error('最多添加5个折扣优惠！');
                return;
            }
            this.Commoditygai.disCountLad.push({
                prodNumber:length+1,
                discount:'',
            })
        },
        deleteLadder(index){
            this.Commoditygai.disCountLad.splice(index,1)
            for(var i=index;i<this.Commoditygai.disCountLad.length;i++){
                this.Commoditygai.disCountLad[i].prodNumber--
            }
        },
        deleteGoods(index){
            this.disCountGoodsAll.splice(index+(this.pageNum1-1)*this.pageSize1,1)
            this.getPageData()
        },
        addGoods(){
            //添加商品
            this.dialogVisible = true;
            this.functionProdList();
        },
        //商品列表
        functionProdList(){
            const params = {
                // hotelId: this.hotelId,
                // funcId: this.modelTypeObj.modelId,
                prodName: this.inquireCommodityName,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            this.$api.newProdList({params},this.actOrgId)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.searchGoodsList = result.data.records
                        this.pageTotal = result.data.total;
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
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.functionProdList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.functionProdList();
        },
        //当前页码
        current(){
            this.functionProdList();
        },
        //上一页
        prev1(){
            this.pageNum1 = this.pageNum1 - 1;
            this.getPageData();
        },
        //下一页
        next1(){
            this.pageNum1 = this.pageNum1 + 1;
            this.getPageData();
        },
        //当前页码
        current1(){
            this.getPageData();
        },
        //取消
        cancelGoods(){
            this.dialogVisible = false
            this.inquireCommodityName = ''
            this.searchGoodsList = []
        },
        //确认商品
        ensureGoods(){
            let hotelSelections = this.hotelSelection
            this.disCountGoodsAll = this.disCountGoodsAll.concat(hotelSelections)
            this.getPageData()
            this.cancelGoods()
        },
        //检查是否已选中
        checkSelectable(row,index){
            let flag = true;
            this.disCountGoodsAll.forEach(item => {
                if(item.id == row.id){
                    flag = false
                }
            })
            return flag
        },
        handleSelectionChange(val) {
            this.hotelSelection = val;
        },
        cancelRedpack(){
            this.$router.push({name:'LonganActivityList'});
        },
        //确认明细
        ensureRedpack(Commoditygai) {
            let params = {
                actId:this.actID,
                actSecDiscountSettingLadderDTOS: this.Commoditygai.disCountLad,
                actSecDiscountSettingProdDTOS: this.disCountGoodsAll.map(item => {return {prodId:item.id,prodCode:item.prodCode}}),
                repeatFlag:this.Commoditygai.repeatFlag?1:0,
            }
            console.log(params)
            // return
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.secondDiscount(params,this.detailId)
                        .then(response => {
                            if(response.data.code==0){
                                this.$message.success("操作成功")
                                this.$router.push({name:'LonganActivityList'});
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
                } else {
                    return false;
                }
            });
        },
        //获取回填数据
        getFillbackData(){
            this.$api.selectActivityOne(this.actID).then(response => {
                if(response.data.code == 0){
                    let hotelName = ''
                    this.actName = response.data.data.actName
                    if(response.data.data.allHotelFlag){
                        hotelName = '全部酒店'
                    }else{
                        response.data.data.actHotelDTOS.forEach(item => {
                            hotelName += (item.hotelName+',')
                        })
                    }
                    this.hotelName = hotelName
                    this.actOrgName = response.data.data.actOrgName
                    this.actOrgId = response.data.data.actOrgId
                    this.actScopeLevel = response.data.data.actScopeLevel==2?'供应商':response.data.data.actScopeLevel==1?'单店':'平台'
                    this.actBegin = response.data.data.actBegin.split(' ')[0]
                    this.actEnd = response.data.data.actEnd.split(' ')[0]
                    this.actPartInCount = response.data.data.actPartInCount
                    this.Commoditygai.disCountLad = response.data.data.actSecDecCountDetail.actSecDiscountSettingLadderDTOS.map(item => {
                        return {
                            discount: item.discount,
                            prodNumber: item.prodNumber,
                        }
                    })
                    this.disCountGoodsAll = response.data.data.actSecDecCountDetail.actSecDiscountSettingProdDTOS.map(item => {
                        return item.productDTO
                    })
                    this.getPageData()
                    this.Commoditygai.repeatFlag = response.data.data.actSecDecCountDetail.repeatFlag?true:false
                    this.actPartInCountType = response.data.data.actPartInCountType
                    this.detailId = response.data.data.actSecDecCountDetail.id
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
        getPageData(){
            this.pageTotal1 = this.disCountGoodsAll.length
            this.disCountGoods = this.disCountGoodsAll.slice((this.pageNum1-1)*this.pageSize1,this.pageNum1*this.pageSize1)
            if(this.disCountGoodsAll.length == 0 && this.pageNum1>1){
                this.pageNum1--
                this.getPageData()
            }
        },
        //获取活动列表
        getActList(type){
            this.$api.basicDataItems({key:'ACTTYPE',orgId:0}).then(response => {
                if(response.data.code==0){
                    this.actType = response.data.data.find(item => {
                        return item.dictValue == type
                    }).dictName
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
            margin-top: 20px;
        }
        .wrapper{
            color: #333;
        }
    }
    .pagination{
        text-align: center;
        margin-top: 20px
    }
    .searchHotel{
        text-align: left
    }
    .hotelform{
        width: 960px;
        .el-input,.el-select{width: 225px;}
    }
</style>