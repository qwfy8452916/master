<template>
    <div class="bookorderdetail">
        <p class="title">查看详情</p>
        <table cellpadding="0" cellspacing="0" class="ordertable">
            <tr>
                <td class="subTitle">订单状态</td>
                <td class="subcont">
                    <span v-if="orderDataDetail.status == 0">待确认</span>
                    <span v-if="orderDataDetail.status == 1">已确认</span>
                    <span v-if="orderDataDetail.status == 2">已完成</span>
                    <span v-if="orderDataDetail.status == 3">已取消</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">房间号</td>
                <td class="subcont">{{orderDataDetail.roomCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">服务类型</td>
                <td class="subcont">{{orderDataDetail.hotelCategoryName}}</td>
            </tr>
            <!-- <tr>
                <td class="subTitle">订单详情</td>
                <td class="subcont"><span style="color:blue;cursor:pointer;" @click="showOrderDetail">查看详情</span></td>
            </tr>
            <tr>
                <td class="subTitle">姓名</td>
                <td class="subcont">{{orderDataDetail.createdByName}}</td>
            </tr> -->
            <tr>
                <td class="subTitle">用户备注</td>
                <td class="subcont">{{orderDataDetail.userRemark}}</td>
            </tr>
            <tr>
                <td class="subTitle">提交时间</td>
                <td class="subcont">{{orderDataDetail.createdAt}}</td>
            </tr>
            <tr v-if="orderDataDetail.status == 1 || orderDataDetail.status == 2">
                <td class="subTitle">确认时间</td>
                <td class="subcont">{{orderDataDetail.confirmTime}}</td>
            </tr>
            <tr v-if="orderDataDetail.status == 1 || orderDataDetail.status == 2">
                <td class="subTitle">确认备注</td>
                <td class="subcont">{{orderDataDetail.confirmRemark}}</td>
            </tr>
            <tr v-if="orderDataDetail.status == 3">
                <td class="subTitle">取消时间</td>
                <td class="subcont">{{orderDataDetail.cancelTime}}</td>
            </tr>
            <tr v-if="orderDataDetail.status == 3">
                <td class="subTitle">取消原因</td>
                <td class="subcont">{{orderDataDetail.cancelReason}}</td>
            </tr>
        </table>
        <br/>
        <label style="font-size:14px;">订单详情</label>
         <!-- <label v-if="isShowSelectList">列表式下单</label> -->
        <table v-if="isShowSelectList" cellpadding="0" cellspacing="0" class="ordertable" width="100%">
            <tr>
                <td class="detailTitle">服务类型</td>
                <td class="detailTitle">商品名称</td>
                <td class="detailTitle">商品数量</td>
                <td class="detailTitle">单价</td>
                <td class="detailTitle">单位</td>
            </tr>
            <tr v-for="item in SelectDataList" :key="item.id">
                <td>{{orderDataDetail.hotelCategoryName}}</td>
                <td>{{item.commonStyleDTO.name}}</td>
                <td>{{item.count}}</td>
                <td>{{item.commonStyleDTO.price}}</td>
                <td>{{item.commonStyleDTO.unit}}</td>
            </tr>
        </table>
        <!-- <label v-if="isShowBannerList">banner图详情下单</label> -->
        <table v-if="isShowBannerList" cellpadding="0" cellspacing="0" class="ordertable" width="100%">
            <tr>
                <td class="detailTitle">服务类型</td>
                <td class="detailTitle">商品名称</td>
                <td class="detailTitle">数量</td>
                <td class="detailTitle">描述</td>
                <td class="detailTitle">图片</td>
            </tr>
            <tr v-for="item in BannerDataList" :key="item.id">
                <td>{{orderDataDetail.hotelCategoryName}}</td>
                <td>{{item.commonStyleDTO.name}}</td>
                <td>{{item.count}}</td>
                <td>{{item.commonStyleDTO.description}}</td>
                <td>
                    <img :src="item.commonStyleDTO.picUrl" alt="" style="width:45px;height:35px">
                </td>
            </tr>
        </table>
        <!-- <label v-if="isShowIconList">图标式下单</label> -->
        <table v-if="isShowIconList" cellpadding="0" cellspacing="0" class="ordertable" width="100%">
            <tr>
                <td class="detailTitle">服务类型</td>
                <td class="detailTitle">商品名称</td>
                <td class="detailTitle">数量</td>
                <!-- <td class="detailTitle">描述</td> -->
                <td class="detailTitle">图片</td>
            </tr>
            <tr v-for="item in IconDataList" :key="item.id">
                <td>{{orderDataDetail.hotelCategoryName}}</td>
                <td>{{item.commonStyleDTO.name}}</td>
                <td>{{item.count}}</td>
                <!-- <td>{{item.commonStyleDTO.description}}</td> -->
                <td>
                    <img :src="item.commonStyleDTO.picUrl" alt="" style="width:45px;height:35px">
                </td>
            </tr>
        </table>
        <!-- <label v-if="isShowFormList">动态表单下单</label> -->
        <table v-if="isShowFormList" cellpadding="0" cellspacing="0" class="ordertable" width="100%">
            <tr>
                <td class="detailTitle subTitle">服务类型</td>
                <td>{{orderDataDetail.hotelCategoryName}}</td>
            </tr>
            <tr v-for="item in FormDataList" :key="item.id">
                <td class="subTitle">{{item.showName}}</td>
                <td>{{item.val}}</td>
            </tr>
        </table>
        <el-button v-if="orderDataDetail.status == 0" type="primary" @click="serviceOrderVerify">确认</el-button>
        <el-button @click="returnList">返回</el-button>
        <el-dialog :visible.sync="dislogVisibleVerify" width="30%">
            <span slot="title">是否确认该服务订单？</span>
            <el-input type="textarea" :rows="3" v-model.trim="confirmRemark" placeholder="请输入对该服务订单的备注（选填）" maxlength="255"></el-input>
            <div slot="footer">
                <el-button @click="dislogVisibleVerify = false">取 消</el-button>
                <el-button type="primary" @click="verifyEnsure('verifyForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="订单详情" :visible.sync="dialogVisibleDetail" width="60%">
            <!-- <label v-if="isShowSelectList">列表式下单</label> -->
            <table v-if="isShowSelectList" cellpadding="0" cellspacing="0" class="ordertable" width="100%">
                <tr>
                    <td class="detailTitle">服务类型</td>
                    <td class="detailTitle">商品名称</td>
                    <td class="detailTitle">商品数量</td>
                    <td class="detailTitle">单价</td>
                    <td class="detailTitle">单位</td>
                </tr>
                <tr v-for="item in SelectDataList" :key="item.id">
                    <td>{{orderDataDetail.hotelCategoryName}}</td>
                    <td>{{item.commonStyleDTO.name}}</td>
                    <td>{{item.count}}</td>
                    <td>{{item.commonStyleDTO.price}}</td>
                    <td>{{item.commonStyleDTO.unit}}</td>
                </tr>
            </table>
            <!-- <label v-if="isShowBannerList">banner图详情下单</label> -->
            <table v-if="isShowBannerList" cellpadding="0" cellspacing="0" class="ordertable" width="100%">
                <tr>
                    <td class="detailTitle">服务类型</td>
                    <td class="detailTitle">商品名称</td>
                    <td class="detailTitle">数量</td>
                    <td class="detailTitle">描述</td>
                    <td class="detailTitle">图片</td>
                </tr>
                <tr v-for="item in BannerDataList" :key="item.id">
                    <td>{{orderDataDetail.hotelCategoryName}}</td>
                    <td>{{item.commonStyleDTO.name}}</td>
                    <td>{{item.count}}</td>
                    <td>{{item.commonStyleDTO.description}}</td>
                    <td>
                        <img :src="item.commonStyleDTO.picUrl" alt="" style="width:45px;height:35px">
                    </td>
                </tr>
            </table>
            <!-- <label v-if="isShowIconList">图标式下单</label> -->
            <table v-if="isShowIconList" cellpadding="0" cellspacing="0" class="ordertable" width="100%">
                <tr>
                    <td class="detailTitle">服务类型</td>
                    <td class="detailTitle">商品名称</td>
                    <td class="detailTitle">数量</td>
                    <!-- <td class="detailTitle">描述</td> -->
                    <td class="detailTitle">图片</td>
                </tr>
                <tr v-for="item in IconDataList" :key="item.id">
                    <td>{{orderDataDetail.hotelCategoryName}}</td>
                    <td>{{item.commonStyleDTO.name}}</td>
                    <td>{{item.count}}</td>
                    <!-- <td>{{item.commonStyleDTO.description}}</td> -->
                    <td>
                        <img :src="item.commonStyleDTO.picUrl" alt="" style="width:45px;height:35px">
                    </td>
                </tr>
            </table>
            <!-- <label v-if="isShowFormList">动态表单下单</label> -->
            <table v-if="isShowFormList" cellpadding="0" cellspacing="0" class="ordertable" width="100%">
                <tr>
                    <td class="detailTitle subTitle">服务类型</td>
                    <td>{{orderDataDetail.hotelCategoryName}}</td>
                </tr>
                <tr v-for="item in FormDataList" :key="item.id">
                    <td class="subTitle">{{item.showName}}</td>
                    <td>{{item.val}}</td>
                </tr>
            </table>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'HotelServiceOrderDetail',
    data(){
        return {
            authzlist: {}, //权限数据
            soId: '',
            orderDataDetail: [],
            dialogVisibleDetail: false,
            isShowSelectList: false,
            SelectDataList: [],
            isShowBannerList: false,
            BannerDataList: [],
            isShowIconList: false,
            IconDataList: [],
            isShowFormList: false,
            FormDataList: [],
            dislogVisibleVerify: false,
            confirmRemark: ''
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.soId = this.$route.query.id;
        this.ServiceOrderDetail();
    },
    methods: {
        //获取订单详情
        ServiceOrderDetail(){
            const that = this;
            const params = {};
            const id = this.soId;
            this.$api.ServiceOrderDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.orderDataDetail = result.data;
                        let detailObj = result.data.orderDetailMap;
                        for(let i in detailObj){
                            switch(i){
                                case 'LIST_ORDER':
                                    that.isShowSelectList = true;
                                    that.SelectDataList =  detailObj[i];
                                    break
                                case 'BANNER_DETAIL_ORDER':
                                    that.isShowBannerList = true;
                                    that.BannerDataList =  detailObj[i];
                                    break
                                case 'ICON_ORDER':
                                    that.isShowIconList = true;
                                    that.IconDataList =  detailObj[i];
                                    break
                                case 'DYNAMIC_FORM':
                                    that.isShowFormList = true;
                                    // that.FormDataList =  detailObj[i];
                                    let formDataList = detailObj[i];
                                    that.FormDataList = JSON.parse(formDataList[0].content);
                                    break
                            }
                        }
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error, '警告', {
                        confirmButtonText: '确定'
                    })
                })
        },
        //查看详情
        showOrderDetail(){
            this.dialogVisibleDetail = true;
        },
        //确认
        serviceOrderVerify(){
            this.confirmRemark = '';
            this.dislogVisibleVerify = true;
        },
        verifyEnsure(){
            const params = {
                confirmRemark: this.confirmRemark
            };
            const id = this.soId;
            this.$api.serviceOrderVerify(params, id)
                .then(response=>{
                    const result = response.data;
                    if(result.code == 0){
                        this.dislogVisibleVerify = false;
                        this.ServiceOrderDetail();
                    }else{
                        this.dislogVisibleVerify = false;
                        this.$message.error(result.msg);
                    }
                }).catch(err=>{
                    this.$alert(err,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //返回
        returnList(){
            this.$router.push({name: 'checkhotelrecord'});
        }
    }
}
</script>

<style>
.el-dialog__body{
    padding: 10px 20px 20px 20px;
}
</style>

<style lang="less" scoped>
.bookorderdetail{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .ordertable{
        font-size: 14px;
        border-top: 1px solid #eee;
        border-left: 1px solid #eee;
        margin: 5px 0px 15px 0px;
        td{
            height: 30px;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            padding: 0px 10px;
        }
        .subTitle{
            width: 100px;
            text-align: right;
            color: #909399;
        }
        .subcont{
            width: 360px;
        }
        .subspan{
            font-size: 12px;
            line-height: 24px;
            color: #909399;
        }
        .detailTitle{
            color: #fff;
            background: #409eff;
        }
    }
}
</style>

