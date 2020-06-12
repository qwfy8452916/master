<template>
    <div class="sidebar">
        <el-menu class="menu-ver" :unique-opened="true" :collapse="isCollapse">
            <el-submenu v-for="item in navlist" :key="item.pathindex" :index="item.pathindex">
                <template slot="title">
                    <i :class="item.iconclass"></i>
                    <span>{{item.lable}}</span>
                </template>
                <el-menu-item v-for="i in item.items" :key="i.pathindex" :index="i.pathindex" @click="sidebarLink(i.pathindex)">{{i.lable}}</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="showhide">
            <span v-if="isShow"></span>
            <img @click="controlMenu" :src="srcLink" class="leftimg" alt="left" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotelSideBar',
    data() {
        return{
            isCollapse: false,
            isShow: true,
            srcLink: require('../assets/images/left.png'),
            navlist: '',
            datalist: '',
            currentSideBar:''
        }
    },
    mounted(){
        let that = this;
        (that.$control.jurisdiction(that,1)).then(response=>{this.getPermission(response)}).catch(err=>{that.datalist=err})
        // that.getPermission();
    },
    methods: {
        controlMenu(){
            if(this.isCollapse){
                this.isCollapse = false;
                this.isShow = true;
                this.srcLink = require('../assets/images/left.png');
            }else{
                this.isCollapse = true;
                this.isShow = false;
                this.srcLink = require('../assets/images/right.png');
            }
            this.$emit("menuStatus", this.isCollapse);
        },
        sidebarLink(index){
            if(this.currentSideBar != index){
                this.$store.commit('resetSearch')
            }
            this.currentSideBar = index
            if(index == '1-1'){
                this.$router.push({name: 'HotelPrivilegeUserList'});
            }else if(index == '1-2'){
                this.$router.push({name: 'HotelPrivilegeRoleList'});
            }else if(index == '2-1'){
                this.$router.push({name: 'HotelInventoryList'});
            }else if(index == '2-2'){
                this.$router.push({name: 'HotelGodownEntryList'});
            }else if(index == '2-3'){
                this.$router.push({name: 'Hotelownprodstock'});
            }else if(index == '2-4'){
                this.$router.push({name: 'Hotelallprodstock'});
            }else if(index == '2-5'){
                this.$router.push({name: 'Hotelouthouselist'});
            }else if(index == '2-6'){
                this.$router.push({name: 'HotelownprodWarehousing'});
            }else if(index == '2-7'){
                this.$router.push({name: 'Hotelownprodoutlist'});
            }else if(index == '2-8'){
                this.$router.push({name: 'HotelADList'});
            }else if(index == '3-1'){
                this.$router.push({name: 'HotelReplenishList'});
            }else if(index == '3-2'){
                this.$router.push({name: 'HotelClaimGoodsList'});
            }else if(index == '4-1'){
                this.$router.push({name: 'HotelRevenueStatistics'});
            }else if(index == '4-2'){
                this.$router.push({name: 'HotelDivideInto'});
            }else if(index == '4-3'){
                this.$router.push({name: 'HotelWithdrawalsRecord'});
            }else if(index == '4-4'){
                this.$router.push({name: 'HotelReplenishmentFeeList'});
            }else if(index == '4-5'){
                this.$router.push({name: 'HotelReplenishmentFeeRecordList'});
            }else if(index == '4-6'){
                this.$router.push({name: 'Hotelgetcashdetail'});
            }else if(index == '4-7'){
                this.$router.push({name: 'HotelWaiteEntryRecord'});
            }else if(index == '4-8'){
                this.$router.push({name: 'HotelEntryRecord'});
            }else if(index == '5-1'){
                this.$router.push({name: 'HotelFaultManagement'});
            }else if(index == '6-1'){
                this.$router.push({name: 'HotelPurchaseOrderlist'});
            }else if(index == '7-1'){
                this.$router.push({name: 'HotelInformationModify'});
            }else if(index == '7-2'){
                this.$router.push({name: 'HotelGridList'});
            }else if(index == '7-3'){
                this.$router.push({name: 'HotelCommodityMarketList'});
            }else if(index == '7-4'){
                this.$router.push({name: 'HotelOwnCommodityList'});
            }else if(index == '7-5'){
                this.$router.push({name: 'HotelAllCommodityManage'});
            }else if(index == '7-6'){
                // this.$router.push({name: 'HotelCabCommodityManage'});
                this.$router.push({name: 'HotelMinibarProdList'});
            }else if(index == '7-7'){
                this.$router.push({name: 'HotelFunctionProdList'});
            }else if(index == '8-1'){
                this.$router.push({name: 'Cabinetgl'});
            }else if(index == '8-2'){
                this.$router.push({name: 'replacecabinet'});
            }else if(index == '9-1'){
                this.$router.push({name: 'HotelServiceList'});
            }else if(index == '9-2'){
                this.$router.push({name: 'checkhotelrecord'});
            }else if(index == '10-1'){
                this.$router.push({name: 'invoicerecord'});
            }else if(index == '11-1'){
                this.$router.push({name: 'HotelFeatureType'});
            }else if(index == '12-1'){
                this.$router.push({name: 'HotelProcessList'});
            }else if(index == '12-2'){
                this.$router.push({name: 'HotelPendingClaimList'});
            }else if(index == '12-3'){
                this.$router.push({name: 'HotelPendingReviewList'});
            }else if(index == '12-4'){
                this.$router.push({name: 'HotelReviewList'});
            }else if(index == '13-1'){
                this.$router.push({name: 'HotelOwnDeliveryList'});
            }else if(index == '13-2'){
                this.$router.push({name: 'HotelServiceDeliveryList'});
            }else if(index == '14-1'){
                this.$router.push({name: 'HotelOrderList'});
            }else if(index == '15-1'){
                this.$router.push({name: 'allsaleapply'});
            }else if(index == '15-2'){
                this.$router.push({name: 'selfaftersalelist'});
            }else if(index == '16-1'){
                this.$router.push({name: 'HotelAccountgMan'});
            }else if(index == '16-4'){
                this.$router.push({name: 'HotelAccountInfo'});
            }else if(index == '16-2'){
                this.$router.push({name: 'HotelDividedetail'});
            }else if(index == '16-3'){
                this.$router.push({name: 'HotelAllInvoiceList'});
            }else if(index == '19-1'){
                this.$router.push({name: 'HotelBookTypeList'});
            }else if(index == '19-2'){
                this.$router.push({name: 'HotelBookResourceList'});
            }else if(index == '19-3'){
                this.$router.push({name: 'HotelBookPriceManage'});
            }else if(index == '19-4'){
                this.$router.push({name: 'HotelBookStatusManage'});
            }else if(index == '19-5'){
                this.$router.push({name: 'HotelBookOrderList'});
            }else if(index == '20-1'){
                this.$router.push({name: 'HotelWaitDealOrder'});
            }else if(index == '20-2'){
                this.$router.push({name: 'HotelAllOrderList'});
            }else if(index == '21-1'){
                this.$router.push({name: 'HotelCultureList'});
            }else if(index == '22-1'){
                this.$router.push({name: 'HotelFunctionList'});
            }else if(index == '22-2'){
                this.$router.push({name: 'HotelselfTakingList'});
            }else if(index == '30-1'){
                this.$router.push({name: 'VirtualCabinetConfiguration'});
            }else if(index == '31-1'){
                this.$router.push({name: 'HotelExpressTemplate'});
            }else if(index == '32-1'){
                this.$router.push({name: 'HotelProdCouponBatch'});
            }else if(index == '32-2'){
                this.$router.push({name: 'HotelProdCouponGroup'});
            }else if(index == '32-3'){
                this.$router.push({name: 'HotelCouponList'});
            }else if(index == '33-1'){
                this.$router.push({name: 'HotelCardticketList'});
            }else if(index == '33-2'){
                this.$router.push({name: 'HotelCardCouponList'});
            }else if(index == '34-1'){
                this.$router.push({name: 'HotelReportOverdueProd'});
            }else if(index == '38-2'){
                this.$router.push({name: 'HotelEmployeeList'})
            }else if(index == '39-2'){
                this.$router.push({name: 'HotelCustomerList'})
            }else if(index == '40-1'){
                this.$router.push({name: 'HotelShareRecord'})
            }else if(index == '40-2'){
                this.$router.push({name: 'HotelVisitRecord'})
            }else if(index == '40-3'){
                this.$router.push({name: 'HotelOrderRecord'})
            }else if(index == '44-1'){
                this.$router.push({name: 'HotelRetailRecord'})
            }else if(index == '44-2'){
                this.$router.push({name: 'HotelEmpRetailRecord'})
            }else if(index == '45-1'){
                this.$router.push({name: 'HotelActivityList'})
            }

        },
        getPermission(response){
            const responsedata = response;

            const navlistdata = [
                {
                    lable: "用户管理",
                    pathindex: "1",
                    iconclass: "el-icon-thirdzhanghaoquanxianguanli",
                    items: [
                        {
                            lable: "用户管理",
                            pathindex: "1-1",
                            status: false,
                            Permission: "M:CM_USER_USER"
                        },
                        {
                            lable: "角色管理",
                            pathindex: "1-2",
                            status: false,
                            Permission: "M:CM_AUTHZ_ROLE"
                        }
                    ]
                },
                {
                    lable: "员工管理",
                    pathindex: "38",
                    iconclass: "el-icon-thirdicon_zhanghao",
                    items: [
                        // {
                        //     lable: "员工管理",
                        //     pathindex: "1-5",
                        //     status: false,
                        //     Permission: "M:BO_FIN_EMPACCOUNTLIST"
                        // },
                        {
                            lable: "员工下级",
                            pathindex: "38-2",
                            status: true,
                            Permission: ""
                        },
                    ]
                },
                {
                    lable: "顾客管理",
                    pathindex: "39",
                    iconclass: "el-icon-thirdquanxianshenpi",
                    items: [
                        // {
                        //     lable: "顾客管理",
                        //     pathindex: "1-3",
                        //     status: false,
                        //     Permission: "M:BO_FIN_CUSTACCOUNTLIST"
                        //     // Permission: "M:BO_USER_CUSTOMER"
                        // },
                        {
                            lable: "顾客下级",
                            pathindex: "39-2",
                            status: true,
                            Permission: ""
                        },
                    ]
                },
                {
                    lable: "查询酒店分享记录",
                    pathindex: "40",
                    iconclass: "el-icon-thirdmoshubang",
                    items: [
                        {
                            lable: "查询酒店分享记录",
                            pathindex: "40-1",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "查询酒店分享访问记录",
                            pathindex: "40-2",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "查询酒店分享订单记录",
                            pathindex: "40-3",
                            status: true,
                            Permission: ""
                        },
                    ]
                },
                {
                    lable: "酒店分销统计",
                    pathindex: "44",
                    iconclass: "el-icon-thirdmoshubang",
                    items: [
                        {
                            lable: "酒店分销统计",
                            pathindex: "44-1",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "员工分销统计",
                            pathindex: "44-2",
                            status: true,
                            Permission: ""
                        }
                    ]
                },
                {
                    lable: "酒店管理",
                    pathindex: "22",
                    iconclass: "el-icon-thirdchengshi",
                    items: [
                        {
                            lable: "广告页管理",
                            pathindex: "2-8",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "功能区管理",
                            pathindex: "22-1",
                            status: false,
                            Permission: "M:BH_FUNC_FUNCTION"
                        },
                        {
                            lable: "酒店文化",
                            pathindex: "21-1",
                            status: false,
                            Permission: "M:BH_HOTEL_CULTURE"
                        },
                        {
                            lable: "查询酒店自提点",
                            pathindex: "22-2",
                            status: false,
                            Permission: "M:BH_HOTEL_SELTTAKING"
                        },
                        {
                            lable: "客房设施",
                            pathindex: "11-1",
                            status: false,
                            Permission: "M:BH_HOTEL_FEATURETYPE"
                        },
                        {
                            lable: "进场配置",
                            pathindex: "30-1",
                            status: false,
                            Permission: "M:BH_HOTEL_VIRTUALCAB"
                        }
                    ]
                },
                {
                    lable: "活动管理",
                    pathindex: "45",
                    iconclass: "el-icon-thirdget",
                    items: [
                        {
                            lable: "活动管理",
                            pathindex: "45-1",
                            status: true,
                            Permission: ""
                        }
                    ]
                },
                {
                    lable: "商品管理",
                    pathindex: "7",
                    iconclass: "el-icon-thirdmoshubang",
                    items: [
                        {
                            lable: "自营商品",
                            pathindex: "7-4",
                            status: false,
                            Permission: "M:BH_PROD_HOTELPROD"
                        },
                        {
                            lable: "酒店商品",
                            pathindex: "7-5",
                            status: false,
                            Permission: "M:BH_PROD_ALLPROD"
                        },
                        {
                            lable: "迷你吧商品",
                            pathindex: "7-6",
                            status: false,
                            Permission: "M:BH_PROD_CABPROD"
                        },
                        {
                            lable: "功能区商品",
                            pathindex: "7-7",
                            status: false,
                            Permission: "M:BH_PROD_FUNCPROD"
                        },
                        {
                            lable: "快递费模板",
                            pathindex: "31-1",
                            status: false,
                            Permission: "M:BH_PROD_EXPRESSTPL"
                        }
                    ]
                },
                {
                    lable: "迷你吧",
                    pathindex: "17",
                    iconclass: "el-icon-thirdbiaodanzujian-biaoge1",
                    items: [
                        {
                            lable: "柜子管理",
                            pathindex: "8-1",
                            status: false,
                            Permission: "M:BH_CAB_CAB"
                        },
                        {
                            lable: "更换记录",
                            pathindex: "8-2",
                            status: false,
                            Permission: "M:BH_CAB_LOG"
                        },
                        // {
                        //     lable: "故障管理",
                        //     pathindex: "5-1",
                        //     status: false,
                        //     Permission: "M:BH_MAL_MALFUNCTION"
                        // },
                        {
                            lable: "未更换的格子",
                            pathindex: "7-2",
                            status: false,
                            Permission: "M:BH_CAB_GRIDLIST"
                        },

                        {
                            lable: "补货管理",
                            pathindex: "3-1",
                            status: false,
                            Permission: "M:BH_REPL_REPLENISHLIST"
                        },
                        // {
                        //     lable: "开票管理",
                        //     pathindex: "10-1",
                        //     status: false,
                        //     Permission: "M:BH_FIN_INVOICERECORD"
                        // }
                    ]
                },
                /*{
                    lable: "酒店商城",
                    pathindex: "18",
                    iconclass: "el-icon-thirdjizhanguanli",
                    items: [
                        {
                            lable: "商品市场分类",
                            pathindex: "7-3",
                            status: false,
                            Permission: "M:BH_HOTEL_COMMODITYMARKETLIST"
                        }
                    ]
                },*/
                {
                    lable: "客房服务",
                    pathindex: "9",
                    iconclass: "el-icon-thirdfanshe",
                    items: [
                        {
                            lable: "客房服务配置",
                            pathindex: "9-1",
                            status: false,
                            Permission: "M:BH_RMSVC_SERVICELIST"
                        },
                        {
                            lable: "客房服务订单",
                            pathindex: "9-2",
                            status: false,
                            Permission: "M:BH_RMSVC_CHECKHOTELRECORD"
                        }
                    ]
                },
                {
                    lable: "客房预订",
                    pathindex: "19",
                    iconclass: "el-icon-thirdicon_fabu",
                    items: [
                        {
                            lable: "房型管理",
                            pathindex: "19-1",
                            status: false,
                            Permission: "M:BH_BOOK_TYPE"
                        },
                        {
                            lable: "房源管理",
                            pathindex: "19-2",
                            status: false,
                            Permission: "M:BH_BOOK_RESOURCE"
                        },
                        {
                            lable: "房价管理",
                            pathindex: "19-3",
                            status: false,
                            Permission: "M:BH_BOOK_PRICE"
                        },
                        {
                            lable: "房态管理",
                            pathindex: "19-4",
                            status: false,
                            Permission: "M:BH_BOOK_STATUS"
                        },
                        {
                            lable: "订单管理",
                            pathindex: "19-5",
                            status: false,
                            Permission: "M:BH_BOOK_ORDER"
                        }
                    ]
                },
                {
                    lable: "库存管理",
                    pathindex: "2",
                    iconclass: "el-icon-thirdhuowudui1",
                    items: [
                        {
                            lable: "采购管理",
                            pathindex: "6-1",
                            status: false,
                            Permission: "M:BH_PUR_PURCHASEORDERLIST"
                        },
                        {
                            lable: "自营商品库存",
                            pathindex: "2-3",
                            status: false,
                            Permission: "M:BH_INV_OWNPRODSTOCK"
                        },
                        {
                            lable: "全部商品库存",
                            pathindex: "2-4",
                            status: false,
                            Permission: "M:BH_INV_ALLPRODSTOCK"
                        },
                        {
                            lable: "入库单管理",
                            pathindex: "2-2",
                            status: false,
                            Permission: "M:BH_INV_GODOWNENTRYLIST"
                        },
                        {
                            lable: "出库单管理",
                            pathindex: "2-5",
                            status: false,
                            Permission: "M:BH_INV_OUTHOUSELIST"
                        },
                        {
                            lable: "自营商品入库单",
                            pathindex: "2-6",
                            status: false,
                            Permission: "M:BH_INV_OWNPRODWAREHOUSING"
                        },
                        {
                            lable: "自营商品出库单",
                            pathindex: "2-7",
                            status: false,
                            Permission: "M:BH_INV_OWNPRODOUTLIST"
                        }
                    ]
                },
                {
                    lable: "订单配送",
                    pathindex: "20",
                    iconclass: "el-icon-thirdzihangche",
                    items: [
                        {
                            lable: "订单管理",
                            pathindex: "14-1",
                            status: false,
                            Permission: "M:BH_ORDER_ORDERLIST"
                        },
                        {
                            lable: "自营商品配送单",
                            pathindex: "13-1",
                            status: false,
                            Permission: "M:BH_DELIV_OWNDELIVERYLIST"
                        },
                        {
                            lable: "现场配送单",
                            pathindex: "13-2",
                            status: false,
                            Permission: "M:BH_DELIV_SERVICEDELIVERYLIST"
                        },
                        {
                            lable: "待处理现场配送单",
                            pathindex: "20-1",
                            status: false,
                            Permission: "M:BH_DELIV_WAITDEALORDER"
                        },
                        // {
                        //     lable: "所有客房配送单",
                        //     pathindex: "20-2",
                        //     status: false,
                        //     Permission: "M:BH_DELIV_ALLORDERLIST"
                        // },
                    ]
                },
                {
                    lable: "售后服务",
                    pathindex:"15",
                    iconclass: "el-icon-thirdguanfangbanben",
                    items: [
                        {
                            lable: "自营商品售后",
                            pathindex: "15-2",
                            status: false,
                            Permission: "M:BH_CS_HOTELPROD"
                        },
                        {
                            lable: "全部商品售后",
                            pathindex: "15-1",
                            status: false,
                            Permission: "M:BH_CS_ALLPROD"
                        }
                    ]
                },
                {
                    lable: "财务管理",
                    pathindex: "4",
                    iconclass: "el-icon-thirdshujukanban",
                    items: [
                        {
                            lable: "开票管理",
                            pathindex: "16-3",
                            status: false,
                            Permission: "M:BH_FIN_INVOICE"
                        },
                        {
                            lable: "账户管理",
                            pathindex: "16-1",
                            status: false,
                            // Permission: "M:BH_FIN_ACCOUNTGMAN"
                        },
                        {
                            lable: "酒店账户信息",
                            pathindex: "16-4",
                            status: false,
                            Permission: "M:BH_FIN_HOTELACCOUNTINFO"
                        },
                        {
                            lable: "分成明细",
                            pathindex: "16-2",
                            status: false,
                            Permission: "M:BH_FIN_DIVIDEDETAIL"
                        },
                        {
                            lable: "分成管理",
                            pathindex: "4-2",
                            status: false,
                            Permission: "M:BH_FIN_DIVIDEINTO"
                        },
                        {
                            lable: "提现记录",
                            pathindex: "4-6",
                            status: false,
                            Permission: "M:BH_FIN_GETCASHDETAIL"
                        },
                        {
                            lable: "提现管理",
                            pathindex: "4-3",
                            status: false,
                            Permission: "M:BH_FIN_WITHDRAWALSRECORD"
                        },
                        {
                            lable: "酒店待入账记录",
                            pathindex: "4-7",
                            status: false,
                            Permission: "M:BH_FIN_WAITINCOME"
                        },
                        {
                            lable: "酒店入账记录",
                            pathindex: "4-8",
                            status: false,
                            Permission: "M:BH_FIN_INCOME"
                        }
                    ]
                },
                {
                    lable: "审核管理",
                    pathindex: "12",
                    iconclass: "el-icon-thirdtianshenpi",
                    items: [
                        {
                            lable: "我发起的流程",
                            pathindex: "12-1",
                            status: false,
                            Permission: "M:CM_REV_START"
                        },
                        // {
                        //     lable: "待认领任务",
                        //     pathindex: "12-2",
                        //     status: false,
                        //     Permission: "M:CM_REV_CLAIM"
                        // },
                        {
                            lable: "待审核任务",
                            pathindex: "12-3",
                            status: false,
                            Permission: "M:CM_REV_UNREV"
                        },
                        {
                            lable: "已审核任务",
                            pathindex: "12-4",
                            status: false,
                            Permission: "M:CM_REV_REVED"
                        }
                    ]
                },
                {
                    lable: "优惠券",
                    pathindex: "32",
                    iconclass: "el-icon-thirdyouhui",
                    items: [
                        {
                            lable: "优惠券批次管理",
                            pathindex: "32-1",
                            status: false,
                            Permission: "M:BH_COUPON_HOTELBATCH"
                        },
                        {
                            lable: "优惠券分组管理",
                            pathindex: "32-2",
                            status: false,
                            Permission: "M:BH_COUPON_HOTELGROUP"
                        },
                        {
                            lable: "优惠券管理",
                            pathindex: "32-3",
                            status: false,
                            Permission: "M:BH_COUPON_HOTELCOUPON"
                        }
                    ]
                },
                {
                    lable: "卡券管理",
                    pathindex: "33",
                    iconclass: "el-icon-thirdrongxuejirongjiechi",
                    items: [
                        {
                            lable: "卡券管理",
                            pathindex: "33-1",
                            status: false,
                            Permission: "M:BH_VOU_CARDTICKET"
                        },
                        {
                            lable: "用户卡券管理",
                            pathindex: "33-2",
                            status: false,
                            Permission: "M:BH_VOU_CARDCOUPON"
                        },
                    ]
                },
                {
                    lable: "统计报表",
                    pathindex: "34",
                    iconclass: "el-icon-thirdtubiao-zhexiantu",
                    items: [
                        {
                            lable: "过期商品",
                            pathindex: "34-1",
                            status: true,
                            Permission: ""
                        }
                    ]
                },
            ];

            navlistdata.map(item => {
                item.items.map(subitem => {
                    for(let i in responsedata){
                        if(subitem.Permission == i){
                            if(responsedata[i]){
                                subitem.status = true;
                            }else{
                                subitem.status = false;
                            }
                        }
                    }
                });
            });
            for(let i = navlistdata.length-1; i >= 0; i--){
                for(let j = navlistdata[i].items.length-1; j >= 0;j--){
                    if(navlistdata[i].items[j].status == false){
                        navlistdata[i].items.splice(j,1);
                    }
                }
                if(navlistdata[i].items.length == 0){
                    navlistdata.splice(i,1);
                }
            }
            this.navlist = navlistdata;
        }
    }
}
</script>

<style>
.menu-ver:not(.el-menu--collapse){
    width: 240px;
}
.menu-ver{
    /* height: calc(100% - 200px); */
    position: fixed !important;
    top: 70px;
    bottom: 30px;
    z-index: 10;
    overflow-y: auto;
    overflow-x: hidden;
}
.el-submenu .el-menu{
    background: #f2f2f2;
}
.el-submenu__title:hover{
    font-weight: bold;
}
.el-menu-item:hover{
    font-weight: bold;
}
</style>

<style lang="less" scoped>
.sidebar{
    // float: left;
    // width: 240px;
    text-align: left;
    // height: 100%;
    // max-height: calc(100% - 150px);
    // padding-top: 70px;
    .showhide{
        position: fixed;
        bottom: 0px;
        background: #fff;
        padding: 0px 5px;
        cursor: pointer;
        min-width: 55px;
        text-align: center;
        z-index: 10;
        span{
            width: 202px;
            height: 20px;
            display: inline-block;
        }
        .leftimg{
            width: 14px;
            height: 14px;
            padding: 6px 5px;
        }
    }
}
</style>


