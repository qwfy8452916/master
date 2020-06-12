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
    name: 'LonganSidebar',
    data() {
        return{
            isCollapse: false,
            isShow: true,
            srcLink: require('../assets/images/left.png'),
            navlist: '',
            datalist:'',
            currentSideBar:''
        }
    },
    mounted(){
        let that = this;
        (that.$control.jurisdiction(that,1)).then(response=>{that.getPermission(response)}).catch(err=>{that.datalist=err})
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
                this.$router.push({name: 'LonganPrivilegeUserList'});
            }else if(index == '1-2'){
                this.$router.push({name: 'LonganPrivilegeRoleList'});
            }else if(index == '1-3'){
                this.$router.push({name: 'LonganCustomerManage'});
            }else if(index == '1-4'){
                this.$router.push({name: 'LonganCustomerWithdrawRecord'});
            }else if(index == '1-5'){
                this.$router.push({name: 'LonganStaffManage'});
            }else if(index == '2-1'){
                this.$router.push({name: 'LonganHotelList'});
            }else if(index == '2-2'){
                this.$router.push({name: 'LonganHotelGridList'});
            }else if(index == '2-3'){
                this.$router.push({name: 'LonganHotelCommodityMarketList'});
            }else if(index == '2-4'){
                this.$router.push({name: 'LonganHotelAllCommodityList'});
            }else if(index == '2-5'){
                this.$router.push({name: 'LonganHotelProtocolList'});
            }else if(index == '2-6'){
                this.$router.push({name: 'LonganHotelFunctionList'});
            }else if(index == '2-7'){
                this.$router.push({name: 'LonganselfTakingList'});
            }else if(index == '2-8'){
                this.$router.push({name: 'LonganHotelLogistics'});
            }else if(index == '2-9'){
                this.$router.push({name: 'LonganHotelADList'});
            }else if(index == '6-1'){
                this.$router.push({name: 'LonganInventoryList'});
            }else if(index == '6-2'){
                this.$router.push({name: 'LonganGodownEntryList'});
            }else if(index == '6-3'){
                this.$router.push({name: 'HotelPlatformInventory'});
            }else if(index == '6-4'){
                this.$router.push({name: 'hotelproInventorylist'});
            }else if(index == '6-5'){
                this.$router.push({name: 'PlatformenterOrderlist'});
            }else if(index == '6-6'){
                this.$router.push({name: 'PlatformoutOrderlist'});
            }else if(index == '6-7'){
                this.$router.push({name: 'allenterorderlist'});
            }else if(index == '6-8'){
                this.$router.push({name: 'alloutorderlist'});
            }else if(index == '4-1'){
                this.$router.push({name: 'Cabinetgl'});
            }else if(index == '4-2'){
                this.$router.push({name: 'replacecabinet'});
            }else if(index == '4-3'){
                this.$router.push({name: 'VirtualCabinetConfiguration'});
            }else if(index == '4-4'){
                this.$router.push({name: 'LonganIotCardList'});
            }else if(index == '4-5'){
                this.$router.push({name: 'LonganReplenishList'});
            }else if(index == '4-6'){
                this.$router.push({name: 'LonganCabTypeList'});
            }else if(index == '5-1'){
                this.$router.push({name: 'CommodityList'});
            }else if(index == '5-2'){
                this.$router.push({name: 'LonganCommodityStatisticsList'});
            }else if(index == '5-3'){
                this.$router.push({name: 'LonganCommodityMarketTemplateList'});
            }else if(index == '5-4'){
                this.$router.push({name: 'LonganAllCommodityManage'});
            }else if(index == '5-5'){
                this.$router.push({name: 'LonganPlatformCommodityList'});
            }else if(index == '5-6'){
                this.$router.push({name: 'LonganHotelPlatCommodityList'});
            }else if(index == '5-7'){
                this.$router.push({name: 'LonganFunctionProdList'});
            }else if(index == '5-8'){
                this.$router.push({name: 'LonganMinibarProdList'});
            }else if(index == '5-9'){
                this.$router.push({name: 'LonganExternalLogistics'});
            }else if(index == '7-1'){
                this.$router.push({name: 'PurchaseOrderlist'});
            }else if(index == '8-1'){
                this.$router.push({name: 'LonganRevenueStatistics'});
            }else if(index == '8-2'){
                this.$router.push({name: 'LonganDivideInto'});
            }else if(index == '8-3'){
                this.$router.push({name: 'LonganCarryDetail'});
            }else if(index == '8-4'){
                this.$router.push({name: 'LonganReplenishmentFee'});
            }else if(index == '8-5'){
                this.$router.push({name: 'LonganReplenishmentFeeDiscount'});
            }else if(index == '8-6'){
                this.$router.push({name: 'LonganFinancialCost'});
            }else if(index == '8-7'){
                this.$router.push({name: 'LonganAccountlist'});
            }else if(index == '8-19'){
                this.$router.push({name: 'LonganOrgAccountlist'});
            }else if(index == '8-8'){
                this.$router.push({name: 'LonganOrganDivide'});
            }else if(index == '8-9'){
                this.$router.push({name: 'LonganClassifyDivide'});
            }else if(index == '8-10'){
                this.$router.push({name: 'LonganDetailedDivide'});
            }else if(index == '8-11'){
                this.$router.push({name: 'LonganInvoiceRateList'});
            }else if(index == '8-12'){
                this.$router.push({name: 'LonganPredictEarnings'});
            }else if(index == '8-13'){
                this.$router.push({name: 'LonganOrganWaitDivide'});
            }else if(index == '8-14'){
                this.$router.push({name: 'LonganOrganDivideRecord'});
            }else if(index == '8-16'){
                this.$router.push({name: 'LonganWaitAccountIncome'});
            }else if(index == '8-17'){
                this.$router.push({name: 'LonganIncomeRecord'});
            }else if(index == '9-1'){
                this.$router.push({name: 'LonganOperationAnalysis'});
            }else if(index == '10-1'){
                this.$router.push({name: 'LonganDeclarationForm'});
            }else if(index == '10-2'){
                this.$router.push({name: 'LonganAbnormalStateOfCabinet'});
            }else if(index == '10-3'){
                this.$router.push({name: 'LonganMalfunctionManage'});
            }else if(index == '11-1'){
                this.$router.push({name: 'LonganServiceTypeList'});
            }else if(index == '11-2'){
                this.$router.push({name: 'LonganHotelServiceList'});
            }else if(index == '11-3'){
                this.$router.push({name: 'checkhotelrecord'});
            }else if(index == '12-1'){
                this.$router.push({name: 'LonganCommonFeature'});
            }else if(index == '12-2'){
                this.$router.push({name: 'LonganHotelFeature'});
            }else if(index == '13-1'){
                this.$router.push({name: 'hotelskinlist'});
            }else if(index == '14-1'){
                this.$router.push({name: 'invoicerecord'});
            }else if(index == '15-1'){
                this.$router.push({name: 'LonganHotelAfterSale'});
            }else if(index == '15-2'){
                this.$router.push({name: 'allsaleapply'});
            }else if(index == '15-3'){
                this.$router.push({name: 'platformaftersale'});
            }else if(index == '16-1'){
                this.$router.push({name: 'LonganPlatDeliveryList'});
            }else if(index == '16-2'){
                this.$router.push({name: 'LonganAllDeliveryList'});
            }else if(index == '17-1'){
                this.$router.push({name: 'LonganMerchant'});
            }else if(index == '17-2'){
                this.$router.push({name: 'LonganSupplierApply'});
            }else if(index == '18-1'){
                this.$router.push({name: 'LonganOperator'});
            }else if(index == '19-1'){
                this.$router.push({name: 'LonganOrderList'});
            }else if(index == '20-1'){
                this.$router.push({name: 'LonganProcessList'});
            }else if(index == '20-2'){
                this.$router.push({name: 'LonganPendingClaimList'});
            }else if(index == '20-3'){
                this.$router.push({name: 'LonganPendingReviewList'});
            }else if(index == '20-4'){
                this.$router.push({name: 'LonganReviewList'});
            }else if(index == '21-1'){
                this.$router.push({name: 'TeashopTeaList'});
            }else if(index == '21-2'){
                this.$router.push({name: 'TeashopOrderManage'});
            }else if(index == '21-3'){
                this.$router.push({name: 'TeashopMembercardList'});
            }else if(index == '21-4'){
                this.$router.push({name: 'TeashopMemberManage'});
            }else if(index == '21-5'){
                this.$router.push({name: 'TeashopCommonUserManage'});
            }else if(index == '22-1'){
                this.$router.push({name: 'LonganFranchiseelist'});
            }else if(index == '22-2'){
                this.$router.push({name: 'LonganFranchiseehotellist'});
            }else if(index == '23-1'){
                this.$router.push({name: 'LonganAccountlist'});
            }else if(index == '24-1'){
                this.$router.push({name: 'LonganHotelEvaluate'});
            }else if(index == '24-2'){
                this.$router.push({name: 'LonganDefEvaluate'});
            }else if(index == '25-1'){
                this.$router.push({name: 'LonganBookResource'});
            }else if(index == '25-2'){
                this.$router.push({name: 'LonganBookPrice'});
            }else if(index == '25-3'){
                this.$router.push({name: 'LonganBookStatus'});
            }else if(index == '25-4'){
                this.$router.push({name: 'LonganBookOrder'});
            }else if(index == '25-5'){
                this.$router.push({name: 'LonganBookType'});
            }else if(index == '26-1'){
                this.$router.push({name: 'LonganAllDelivery'});
            }else if(index == '26-2'){
                this.$router.push({name: 'LonganExternalOrder'});
            }else if(index == '27-1'){
                this.$router.push({name: 'LonganHotelCultureList'});
            }else if(index == '28-1'){
                this.$router.push({name: 'LonganWaitInvoiceProdList'});
            }else if(index == '28-2'){
                this.$router.push({name: 'LonganAllInvoiceList'});
            }else if(index == '29-1'){
                this.$router.push({name: 'LaunchHotelManagement'});
            }else if(index == '29-2'){
                this.$router.push({name: 'LaunchCabinetManagement'})
            }else if(index == '29-3'){
                this.$router.push({name: 'LauncherManagement'})
            }else if(index == '29-4'){
                this.$router.push({name: 'LonganChannelList'})
            }else if(index == '29-5'){
                this.$router.push({name: 'LonganChannelShareLink'})
            }else if(index == '29-6'){
                this.$router.push({name: 'LonganChannelPartner'})
            }else if(index == '29-7'){
                this.$router.push({name: 'LonganRedPacketList'})
            }else if(index == '29-8'){
                this.$router.push({name: 'LonganCabinetType'})
            }else if(index == '29-9'){
                this.$router.push({name: 'LonganMemberList'})
            }else if(index == '29-10'){
                this.$router.push({name: 'longanWithdraw'})
            }else if(index == '29-11'){
                this.$router.push({name: 'LonganMemberRewards'})
            }else if(index == '29-12'){
                this.$router.push({name: 'LonganRebackMoney'})
            }else if(index == '29-13'){
                this.$router.push({name: 'LauncherinvestorOrder'})
            }else if(index == '29-14'){
                this.$router.push({name: 'LauncherinvestorCabinet'})
            }else if(index == '29-15'){
                this.$router.push({name: 'LonganFsData'})
            }else if(index == '30-1'){
                this.$router.push({name: 'LonganMessagelist'})
            }else if(index == '30-2'){
                this.$router.push({name: 'LonganmessageTest'})
            }else if(index == '30-3'){
                this.$router.push({name: 'LonganWaitSendMessage'})
            }else if(index == '30-4'){
                this.$router.push({name: 'LonganSendMessage'})
            }else if(index == '30-5'){
                this.$router.push({name: 'LonganContentTemp'})
            }else if(index == '31-1'){
                this.$router.push({name: 'LonganPlatformCoupon'})
            }else if(index == '31-2'){
                this.$router.push({name: 'LonganAllCouponGroup'})
            }else if(index == '31-3'){
                this.$router.push({name: 'LonganAllCouponBatch'})
            }else if(index == '31-4'){
                this.$router.push({name: 'LonganGrantCouponRecord'})
            }else if(index == '31-5'){
                this.$router.push({name: 'LonganAllCouponList'})
            }else if(index == '31-7'){
                this.$router.push({name: 'LonganProdCouponBatch'})
            }else if(index == '31-8'){
                this.$router.push({name: 'LonganProdCouponGroup'})
            }else if(index == '31-9'){
                this.$router.push({name: 'LonganCouponList'})
            }else if(index == '32-1'){
                this.$router.push({name: 'LonganExpressTemplate'})
            }else if(index == '33-1'){
                this.$router.push({name: 'LonganReportAllSell'})
            }else if(index == '33-2'){
                this.$router.push({name: 'LonganReportHotelSell'})
            }else if(index == '33-3'){
                this.$router.push({name: 'LonganReportProdSell'})
            }else if(index == '33-4'){
                this.$router.push({name: 'LonganReportRoomBook'})
            }else if(index == '33-5'){
                this.$router.push({name: 'LonganReportOverdueProd'})
            }else if(index == '34-1'){
                this.$router.push({name: 'LonganActivityList'})
            }else if(index == '35-1'){
                this.$router.push({name: 'LonganRedPackList'})
            }else if(index == '36-1'){
                this.$router.push({name: 'LonganLuckyBagsRecords'})
            }else if(index == '37-1'){
                this.$router.push({name: 'LonganShareBonus'})
            }else if(index == '38-1'){
                this.$router.push({name: 'LonganEmployeeList'})
            }else if(index == '38-2'){
                this.$router.push({name: 'LonganEmployeeCash'})
            }else if(index == '39-1'){
                this.$router.push({name: 'LonganCustomerList'})
            }else if(index == '39-2'){
                this.$router.push({name: 'LonganCustomerCash'})
            }else if(index == '40-1'){
                this.$router.push({name: 'LonganHotelShareRecord'})
            }else if(index == '40-2'){
                this.$router.push({name: 'LonganHotelVisitRecord'})
            }else if(index == '40-3'){
                this.$router.push({name: 'LonganHotelOrderRecord'})
            }else if(index == '41-1'){
                this.$router.push({name: 'LonganFuncLinkList'})
            }else if(index == '42-1'){
                this.$router.push({name: 'LonganCardticketList'})
            }else if(index == '42-2'){
                this.$router.push({name: 'LonganCardCouponList'})
            }else if(index == '43-1'){
                this.$router.push({name: 'LonganExternalLogistics'})
            }else if(index == '43-2'){
                this.$router.push({name: 'LonganHotelLogistics'})
            }else if(index == '44-1'){
                this.$router.push({name: 'LonganHotelRetailRecord'})
            }else if(index == '44-2'){
                this.$router.push({name: 'LonganEmpRetailRecord'})
            }




        },
        //获取权限信息
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
                        },
                    ]
                },
                {
                    lable: "酒店管理",
                    pathindex: "2",
                    iconclass: "el-icon-thirdchengshi",
                    items: [
                        {
                            lable: "广告页管理",
                            pathindex: "2-9",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "酒店管理",
                            pathindex: "2-1",
                            status: false,
                            Permission: "M:BO_HOTEL_HOTEL"
                        },
                        {
                            lable: "酒店功能区",
                            pathindex: "2-6",
                            status: false,
                            Permission: "M:BO_HOTEL_FUNCTION"
                        },
                        // {
                        //     lable: "酒店分成协议",
                        //     pathindex: "2-5",
                        //     status: false,
                        //     Permission: "M:BO_HOTEL_DIVIDE"
                        // },
                        {
                            lable: "未更换的格子",
                            pathindex: "2-2",
                            status: false,
                            Permission: "M:BO_HOTEL_UNGRID"
                        },
                        // {
                        //     lable: "商品市场分类",
                        //     pathindex: "2-3",
                        //     status: false,
                        //     Permission: "M:BO_HOTEL_MARKET"
                        // },
                        {
                           lable:"酒店自提点",
                           pathindex:"2-7",
                           status:false,
                           Permission:"M:BO_HOTEL_SELTTAKING"
                        },
                        {
                            lable: "主题管理",
                            pathindex: "13-1",
                            status: false,
                            Permission: "M:BO_HOTEL_THEME"
                        },
                        {
                            lable: "客房设施分类",
                            pathindex: "12-1",
                            status: false,
                            Permission: "M:BO_HOTEL_CFEATURE"
                        },
                        {
                            lable: "客房设施",
                            pathindex: "12-2",
                            status: false,
                            Permission: "M:BO_HOTEL_FEATURE"
                        },
                        {
                            lable: "酒店文化",
                            pathindex: "27-1",
                            status: false,
                            Permission: "M:BO_HOTEL_CULTURE"
                        },
                        // {
                        //     lable: "分销管理",
                        //     pathindex: "37-1",
                        //     status: true,
                        //     Permission: ""
                        // },
                        // {
                        //     lable: "酒店分享记录",
                        //     pathindex: "40-1",
                        //     status: true,
                        //     Permission: ""
                        // },
                        {
                            lable: "链接管理",
                            pathindex: "41-1",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "酒店外部物流",
                            pathindex: "2-8",
                            status: true,
                            Permission: ""
                        },
                    ]
                },
                {
                    lable: "酒店分销设置",
                    pathindex: "37",
                    iconclass: "el-icon-thirdmoshubang",
                    items: [
                        {
                            lable: "酒店分销设置",
                            pathindex: "37-1",
                            status: true,
                            Permission: ""
                        }
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
                    lable: "链接管理",
                    pathindex: "41",
                    iconclass: "el-icon-thirdmoshubang",
                    items: [
                        {
                            lable: "查询链接",
                            pathindex: "41-1",
                            status: true,
                            Permission: ""
                        }
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
                    lable: "员工管理",
                    pathindex: "38",
                    iconclass: "el-icon-thirdicon_zhanghao",
                    items: [
                        {
                            lable: "员工管理",
                            pathindex: "1-5",
                            status: false,
                            Permission: "M:BO_FIN_EMPACCOUNTLIST"
                        },
                        {
                            lable: "员工收支记录",
                            pathindex: "38-2",
                            status: false,
                            Permission: ""
                        },
                        {
                            lable: "员工下级",
                            pathindex: "38-1",
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
                        {
                            lable: "顾客管理",
                            pathindex: "1-3",
                            status: false,
                            Permission: "M:BO_FIN_CUSTACCOUNTLIST"
                            // Permission: "M:BO_USER_CUSTOMER"
                        },
                        {
                            lable: "顾客收支记录",
                            pathindex: "39-2",
                            status: false,
                            Permission: ""
                        },
                        {
                            lable: "顾客下级",
                            pathindex: "39-1",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "提现记录",
                            pathindex: "1-4",
                            status: false,
                            Permission: "M:BO_USER_CUSTOMERLOG"
                        },
                    ]
                },
                {
                    lable: "商品管理",
                    pathindex: "5",
                    iconclass: "el-icon-thirdmoshubang",
                    items: [
                        {
                            lable: "全部商品管理",
                            pathindex: "5-4",
                            status: false,
                            Permission: "M:BO_PROD_ALLPROD"
                        },
                        {
                            lable: "运营商商品管理",
                            pathindex: "5-5",
                            status: false,
                            Permission: "M:BO_PROD_OPRPROD"
                        },
                        {
                            lable: "酒店平台商品",
                            pathindex: "5-6",
                            status: false,
                            Permission: "M:BO_PROD_HOTELPROD"
                        },
                        {
                            lable: "酒店商品管理",
                            pathindex: "2-4",
                            status: false,
                            Permission: "M:BO_HOTEL_PROD"
                        },
                        {
                            lable: "酒店功能区商品",
                            pathindex: "5-7",
                            status: false,
                            Permission: "M:BO_PROD_FUNCPROD"
                        },
                        {
                            lable: "酒店迷你吧商品",
                            pathindex: "5-8",
                            status: false,
                            Permission: "M:BO_PROD_MINIPROD"
                        },
                        {
                            lable: "外部物流",
                            pathindex: "5-9",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "商品统计分类",
                            pathindex: "5-2",
                            status: false,
                            Permission: "M:BO_PROD_CATEGORY"
                        },
                        // {
                        //     lable: "市场分类模板",
                        //     pathindex: "5-3",
                        //     status: false,
                        //     Permission: "M:BO_PROD_MARKETTPL"
                        // },
                        {
                            lable: "快递费模板",
                            pathindex: "32-1",
                            status: false,
                            Permission: "M:BO_PROD_EXPRESSTPL"
                        },
                        {
                            lable: "酒店商品评价",
                            pathindex: "24-1",
                            status: false,
                            Permission: "M:BO_REM_PRODEVALUATE"
                        },
                        {
                            lable: "酒店商品默认评价",
                            pathindex: "24-2",
                            status: false,
                            Permission: "M:BO_REM_DEFAULTEFAUEVALUATE"
                        }
                    ]
                },
                {
                    lable: "柜子管理",
                    pathindex: "4",
                    iconclass: "el-icon-thirdbiaodanzujian-biaoge1",
                    items: [
                        {
                            lable: "柜子管理",
                            pathindex: "4-1",
                            status: false,
                            Permission: "M:BO_CAB_CAB"
                        },
                        {
                            lable: "进场配置",
                            pathindex: "4-3",
                            status: false,
                            Permission: "M:BO_CAB_CAB"
                        },
                        {
                            lable: "更换记录",
                            pathindex: "4-2",
                            status: false,
                            Permission: "M:BO_CAB_LOG"
                        },
                        {
                          lable:"控制板物联卡管理",
                          pathindex:"4-4",
                          status:false,
                          Permission:"M:BO_CAB_IOTCARD"
                        },
                        {
                          lable:"补货管理",
                          pathindex:"4-5",
                          status:false,
                          Permission:"M:BO_CAB_REPLENISH"
                        },
                        {
                          lable:"柜子类型管理",
                          pathindex:"4-6",
                          status:false,
                          Permission:"M:BO_CAB_CABTYPE"
                        },
                        {
                            lable: "报修单",
                            pathindex: "10-1",
                            status: false,
                            Permission: "M:BO_CAB_MAINTENANCEFORM"
                        },
                        // {
                        //     lable: "柜子异常管理",
                        //     pathindex: "10-2",
                        //     status: false,
                        //     Permission: "M:BO_CAB_CABBAD"
                        // },
                        {
                            lable: "柜子实时状态",
                            pathindex: "10-3",
                            status: false,
                            Permission: "M:BO_CAB_FAULT"
                        }
                    ]
                },
                {
                    lable: "库存管理",
                    pathindex: "6",
                    iconclass: "el-icon-thirdhuowudui1",
                    items: [
                        {
                            lable: "酒店平台商品库存",
                            pathindex: "6-3",
                            status: false,
                            Permission: "M:BO_INV_HOTELPROD"
                        },
                        {
                            lable: "全部商品库存",
                            pathindex: "6-4",
                            status: false,
                            Permission: "M:BO_INV_ALLPROD"
                        },
                        {
                            lable: "运营商商品入库单",
                            pathindex: "6-5",
                            status: false,
                            Permission: "M:BO_INV_OPRIN"
                        },
                        {
                            lable: "运营商商品出库单",
                            pathindex: "6-6",
                            status: false,
                            Permission: "M:BO_INV_OPROUT"
                        },
                        {
                            lable: "全部入库单",
                            pathindex: "6-7",
                            status: false,
                            Permission: "M:BO_INV_ALLIN"
                        },
                        {
                            lable: "全部出库单",
                            pathindex: "6-8",
                            status: false,
                            Permission: "M:BO_INV_ALLOUT"
                        },
                        {
                            lable: "采购管理",
                            pathindex: "7-1",
                            status: false,
                            Permission: "M:BO_PUR_PURORDER"
                        }
                    ]
                },
                {
                    lable: "客房服务",
                    pathindex: "11",
                    iconclass: "el-icon-thirdfanshe",
                    items: [
                        {
                            lable: "服务类型",
                            pathindex: "11-1",
                            status: false,
                            Permission: "M:BO_RMSVC_TYPE"
                        },
                        {
                            lable: "酒店服务类型",
                            pathindex: "11-2",
                            status: false,
                            Permission: "M:BO_RMSVC_RMSVC"
                        },
                        {
                            lable: "客房服务订单",
                            pathindex: "11-3",
                            status: false,
                            Permission: "M:BO_RMSVC_RMSVCLOG"
                        }
                    ]
                },
                {
                    lable: "客房预订",
                    pathindex: "25",
                    iconclass: "el-icon-thirdicon_fabu",
                    items: [
                        {
                            lable: "房型管理",
                            pathindex: "25-5",
                            status: false,
                            Permission: "M:BO_BOOK_TYPE"
                        },
                        {
                            lable: "房源管理",
                            pathindex: "25-1",
                            status: false,
                            Permission: "M:BO_BOOK_RESOURCE"
                        },
                        {
                            lable: "房价查询",
                            pathindex: "25-2",
                            status: false,
                            Permission: "M:BO_BOOK_PRICE"
                        },
                        {
                            lable: "房态查询",
                            pathindex: "25-3",
                            status: false,
                            Permission: "M:BO_BOOK_STATUS"
                        },
                        {
                            lable: "订单查询",
                            pathindex: "25-4",
                            status: false,
                            Permission: "M:BO_BOOK_ORDER"
                        }
                    ]
                },
                {
                    lable: "订单配送",
                    pathindex: "26",
                    iconclass: "el-icon-thirdzihangche",
                    items: [
                        {
                            lable: "订单管理",
                            pathindex: "19-1",
                            status: false,
                            Permission: "M:BO_ORDER_ORDER"
                        },
                        {
                            lable: "运营商商品配送单",
                            pathindex: "16-1",
                            status: false,
                            Permission: "M:BO_ORDER_OPRDELIV"
                        },
                        {
                            lable: "全部商品配送单",
                            pathindex: "16-2",
                            status: false,
                            Permission: "M:BO_ORDER_ALLDELIV"
                        },
                        {
                            lable: "所有酒店现场配送单",
                            pathindex: "26-1",
                            status: false,
                            Permission: "M:BO_DELIV_ALLSALEAPPLY"
                        },
                        {
                            lable: "外部配送单",
                            pathindex: "26-2",
                            status: true,
                            Permission: ""
                        }
                    ]
                },
                {
                    lable: "售后服务",
                    pathindex: "15",
                    iconclass: "el-icon-thirdguanfangbanben",
                    items: [
                        {
                            lable: "运营商商品售后",
                            pathindex: "15-3",
                            status: false,
                            Permission: "M:BO_CS_OPRPROD"
                        },
                        {
                            lable: "全部商品售后",
                            pathindex: "15-2",
                            status: false,
                            Permission: "M:BO_CS_ALLPROD"
                        },
                        {
                            lable: "迷你吧售后",
                            pathindex: "15-1",
                            status: false,
                            Permission: "M:BO_CS_MINIAFTER"
                        }
                    ]
                },
                {
                    lable: "活动管理",
                    pathindex: "34",
                    iconclass: "el-icon-thirdget",
                    items: [
                        {
                            lable: "活动管理",
                            pathindex: "34-1",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "红包管理",
                            pathindex: "35-1",
                            status: false,
                            Permission: "M:BO_ACT_RED"
                        }
                    ]
                },
                // {
                //     lable: "运营分析",
                //     pathindex: "9",
                //     iconclass: "el-icon-thirdyunyingguanli",
                //     items: [
                //         {
                //             lable: "订单统计",
                //             pathindex: "9-1",
                //             status: false,
                //             Permission: "M:BO_OPS_ORDERSTAT"
                //         }
                //     ]
                // },
                {
                    lable: "入驻商管理",
                    pathindex: "17",
                    iconclass: "el-icon-thirdmenci",
                    items: [
                        {
                            lable: "入驻商管理",
                            pathindex: "17-1",
                            status: false,
                            Permission: "M:BO_MER_MER"
                        },
                        {
                            lable: "供应商申请",
                            pathindex: "17-2",
                            status: false,
                            Permission: "M:BO_SUPPL_SUPPLIERAPPLY"
                        }
                    ]
                },
                {
                    lable: "合作伙伴管理",
                    pathindex: "22",
                    iconclass: "el-icon-thirdhezuohuobanmiyueguanli",
                    items: [
                        {
                            lable: "合作伙伴管理",
                            pathindex: "22-1",
                            status: false,
                            Permission: "M:BO_ALLY_ALLY"
                        },
                        {
                            lable: "合作伙伴酒店管理",
                            pathindex: "22-2",
                            status: false,
                            Permission: "M:BO_ALLY_HOTEL"
                        }
                    ]
                },
                {
                    lable: "财务管理",
                    pathindex: "8",
                    iconclass: "el-icon-thirdshujukanban",
                    items: [
                        {
                            lable: "实时分成",
                            pathindex: "8-12",
                            status: false,
                            Permission: "M:BO_FIN_REALTIMEINCOME"
                        },
                        {
                            lable: "发票税率",
                            pathindex: "8-11",
                            status: false,
                            Permission: "M:BO_FIN_PRODRATE"
                        },
                        {
                            lable: "分成协议",
                            pathindex: "2-5",
                            status: false,
                            Permission: "M:BO_FIN_DIVIDE"
                        },
                        {
                            lable: "账户管理",
                            pathindex: "8-7",
                            status: false,
                            // Permission: "M:BO_FIN_ACCOUNT"
                        },
                        {
                            lable: "组织账户管理",
                            pathindex: "8-19",
                            status: false,
                            Permission: "M:BO_FIN_ORGACCOUNTLIST"
                        },
                        {
                            lable: "组织分成",
                            pathindex: "8-8",
                            status: false,
                            // Permission: "M:BO_FIN_ORG"
                        },
                        {
                            lable: "分类分成",
                            pathindex: "8-9",
                            status: false,
                            Permission: "M:BO_FIN_CLASSIFY"
                        },
                        {
                            lable: "明细分成",
                            pathindex: "8-10",
                            status: false,
                            Permission: "M:BO_FIN_DETAIL"
                        },
                        {
                            lable: "提现记录",
                            pathindex: "8-3",
                            status: false,
                            Permission: "M:BO_FIN_WITHDRAW"
                        },
                        {
                            lable: "补货费",
                            pathindex: "8-4",
                            status: false,
                            Permission: "M:BO_FIN_REPLFEE"
                        },
                        {
                            lable: "补货费提现",
                            pathindex: "8-5",
                            status: false,
                            Permission: "M:BO_FIN_REPLFEE_WITHDRAW"
                        },
                        {
                            lable: "组织待入账分成记录",
                            pathindex: "8-13",
                            status: false,
                            Permission: "M:BO_FIN_ORGAWAITINCOM"
                        },
                        {
                            lable: "组织分成记录",
                            pathindex: "8-14",
                            status: false,
                            Permission: "M:BO_FIN_ORGADIVIDERECORD"
                        },
                        {
                            lable: "待入账收入",
                            pathindex: "8-16",
                            status: false,
                            Permission: ""
                        },
                        {
                            lable: "收支记录",
                            pathindex: "8-17",
                            status: false,
                            Permission: ""
                        },
                        {
                            lable: "开票管理",
                            pathindex: "14-1",
                            status: false,
                            Permission: "M:BO_FIN_REPLFEE_INVOICE"
                        },
                        {
                            lable: "待开商品销售发票",
                            pathindex: "28-1",
                            status: false,
                            Permission: "M:BO_FIN_INVOICE_WAIT"
                        },
                        {
                            lable: "全部发票管理",
                            pathindex: "28-2",
                            status: false,
                            Permission: "M:BO_FIN_INVOICE"
                        },
                    ]
                },
                {
                    lable: "审核管理",
                    pathindex: "20",
                    iconclass: "el-icon-thirdtianshenpi",
                    items: [
                        {
                            lable: "我发起的流程",
                            pathindex: "20-1",
                            status: false,
                            Permission: "M:CM_REV_START"
                        },
                        // {
                        //     lable: "待认领任务",
                        //     pathindex: "20-2",
                        //     status: false,
                        //     Permission: "M:CM_REV_CLAIM"
                        // },
                        {
                            lable: "待审核任务",
                            pathindex: "20-3",
                            status: false,
                            Permission: "M:CM_REV_UNREV"
                        },
                        {
                            lable: "已审核任务",
                            pathindex: "20-4",
                            status: false,
                            Permission: "M:CM_REV_REVED"
                        }
                    ]
                },
                /*{
                    lable: "茶叶商城",
                    pathindex: "21",
                    iconclass: "el-icon-thirdyouhui",
                    items: [
                        {
                            lable: "会员卡管理",
                            pathindex: "21-3",
                            status: false,
                            Permission: "M:BO_TSHOP_MEMBERCARD"
                        },
                        {
                            lable: "会员管理",
                            pathindex: "21-4",
                            status: false,
                            Permission: "M:BO_TSHOP_MEMBER"
                        },
                        {
                            lable: "潜客管理",
                            pathindex: "21-5",
                            status: false,
                            Permission: "M:BO_TSHOP_COMMON"
                        },
                        {
                            lable: "商品管理",
                            pathindex: "21-1",
                            status: false,
                            Permission: "M:BO_TSHOP_PROD"
                        },
                        {
                            lable: "订单管理",
                            pathindex: "21-2",
                            status: false,
                            Permission: "M:BO_TSHOP_ORDER"
                        }
                    ]
                },*/
                {
                    lable: "消息通知",
                    pathindex: "30",
                    iconclass: "el-icon-thirdguangbo",
                    items: [
                        {
                            lable: "消息模板",
                            pathindex: "30-1",
                            status: true,
                            Permission: "M:BO_MSG_MSGTEMP"
                        },
                        {
                            lable: "测试",
                            pathindex: "30-2",
                            status: true,
                            Permission: "M:BO_MSG_TEST"
                        },
                        {
                            lable: "待发送消息",
                            pathindex: "30-3",
                            status: true,
                            Permission: "M:BO_MSG_WAITEMSG"
                        },
                        {
                            lable: "已发送消息",
                            pathindex: "30-4",
                            status: true,
                            Permission: "M:BO_MSG_SENDMSG"
                        },
                        {
                            lable: "内容模板",
                            pathindex: "30-5",
                            status: true,
                            Permission: "M:BO_MSG_CONTENTTEMP"
                        },

                    ]
                },
                {
                    lable: "优惠券",
                    pathindex: "31",
                    iconclass: "el-icon-thirdyouhui",
                    items: [
                       {
                            lable: "通用优惠券批次管理",
                            pathindex: "31-1",
                            status: false,
                            Permission: "M:BO_COUPON_CURRBATCH"
                        },
                        {
                            lable: "所有优惠券分组",
                            pathindex: "31-2",
                            status: false,
                            Permission: "M:BO_COUPON_ALLGROUP"
                        },
                        {
                            lable: "所有优惠券批次",
                            pathindex: "31-3",
                            status: false,
                            Permission: "M:BO_COUPON_ALLBATCH"
                        },
                        {
                            lable: "优惠券发放管理",
                            pathindex: "31-4",
                            status: false,
                            Permission: "M:BO_COUPON_GRANT"
                        },
                        {
                            lable: "所有优惠券管理",
                            pathindex: "31-5",
                            status: false,
                            Permission: "M:BO_COUPON_ALLCOUPON"
                        },
                        {
                            lable: "平台商品优惠券批次管理",
                            pathindex: "31-7",
                            status: false,
                            Permission: "M:BO_COUPON_OPERBATCH"
                        },
                        {
                            lable: "平台商品优惠券分组管理",
                            pathindex: "31-8",
                            status: false,
                            Permission: "M:BO_COUPON_OPRGROUP"
                        },
                        {
                            lable: "平台商品优惠券管理",
                            pathindex: "31-9",
                            status: false,
                            Permission: "M:BO_COUPON_OPRCOUPON"
                        },
                    ]
                },
                {
                    lable: "卡券管理",
                    pathindex: "42",
                    iconclass: "el-icon-thirdrongxuejirongjiechi",
                    items: [
                        {
                            lable: "卡券管理",
                            pathindex: "42-1",
                            status: false,
                            Permission: "M:BO_VOU_CARDTICKET"
                        },{
                            lable: "用户卡券管理",
                            pathindex: "42-2",
                            status: false,
                            Permission: "M:BO_VOU_CARDCOUPON"
                        }
                    ]
                },
                {
                    lable: "财运星",
                    pathindex: "29",
                    iconclass: "el-icon-thirdshoucang",
                    items: [
                        {
                            lable: "实时数据",
                            pathindex: "29-15",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "投放酒店管理",
                            pathindex: "29-1",
                            status: false,
                            Permission: "M:BO_FS_HOTEL"
                        },
                        {
                            lable: "投放柜子管理",
                            pathindex: "29-2",
                            status: false,
                            Permission: "M:BO_FS_CAB"
                        },
                        {
                            lable: "投资人管理",
                            pathindex: "29-3",
                            status: false,
                            Permission: "M:BO_FS_INVESTOR"
                        },
                        {
                            lable: "投资订单",
                            pathindex: "29-13",
                            status: false,
                            Permission: "M:BO_FS_INVORDER"
                        },
                        {
                            lable: "投资柜子",
                            pathindex: "29-14",
                            status: false,
                            Permission: "M:BO_FS_INVCAB"
                        },
                        {
                            lable: "退款记录",
                            pathindex: "29-12",
                            status: false,
                            Permission: "M:BO_FS_REFUND"
                        },
                        {
                            lable: "渠道管理",
                            pathindex: "29-4",
                            status: false,
                            Permission: "M:BO_FS_CHANNEL"
                        },
                        {
                            lable: "渠道商链接",
                            pathindex: "29-5",
                            status: false,
                            Permission: "M:BO_FS_CHANNELLINK"
                        },
                        {
                            lable: "渠道商合伙人",
                            pathindex: "29-6",
                            status: false,
                            Permission: "M:BO_FS_CHANNELPARTNER"
                        },
                        {
                            lable: "红包管理",
                            pathindex: "29-7",
                            status: false,
                            Permission: "M:BO_FS_RED"
                        },
                        {
                            lable: "柜子类型管理",
                            pathindex: "29-8",
                            status: false,
                            Permission: "M:BO_FS_CABTYPE"
                        },
                        {
                            lable: "会员管理",
                            pathindex: "29-9",
                            status: false,
                            Permission: "M:BO_FS_MEMBER"
                        },
                        {
                            lable: "会员提现",
                            pathindex: "29-10",
                            status: false,
                            Permission: "M:BO_FS_MEMBERWITHDRAW"
                        },
                        {
                            lable: "会员奖励",
                            pathindex: "29-11",
                            status: false,
                            Permission: "M:BO_FS_MEMBERAWARD"
                        },
                    ]
                },
                {
                    lable: "统计报表",
                    pathindex: "33",
                    iconclass: "el-icon-thirdtubiao-zhexiantu",
                    items: [
                        {
                            lable: "全部销售汇总报表",
                            pathindex: "33-1",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "酒店销售汇总报表",
                            pathindex: "33-2",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "商品销售汇总报表",
                            pathindex: "33-3",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "客房预订汇总报表",
                            pathindex: "33-4",
                            status: true,
                            Permission: ""
                        },
                        {
                            lable: "过期商品",
                            pathindex: "33-5",
                            status: true,
                            Permission: ""
                        }
                    ]
                },
                {
                    lable: "福柜",
                    pathindex: "36",
                    iconclass: "el-icon-thirdbiaodanzujian-biaoge1",
                    items: [
                        {
                            lable: "福柜领取记录",
                            pathindex: "36-1",
                            status: false,
                            Permission: "M:BO_LUCKYCAB_GETRECORD"
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
    /* background: rgba(64,158,255,0.1); */
    background: #f2f2f2;
}
/* .el-submenu__title i{
    color: #ddd;
} */
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
