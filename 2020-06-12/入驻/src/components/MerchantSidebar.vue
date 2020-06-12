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
    name: 'MerchantSidebar',
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
    created(){
      (this.$control.jurisdiction(this,1)).then(response=>{this.getPermission(response)}).catch(err=>{this.datalist=err})
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
            // console.log(index);
            if(this.currentSideBar != index){
                this.$store.commit('resetSearch')
            }
            this.currentSideBar = index
            if(index == '1-1'){
                this.$router.push({name: 'MerchantPrivilegeUserList'});
            }else if(index == '1-2'){
                this.$router.push({name: 'MerchantPrivilegeRoleList'});
            }else if(index == '2-1'){
                this.$router.push({name: 'MerchantOwnCommodityList'});
            }else if(index == '3-1'){
                this.$router.push({name: 'MerchantHotelCommodityList'});
            }else if(index == '4-1'){
                this.$router.push({name: 'MerchantOwnDeliveryList'});
            }else if(index == '4-2'){
                this.$router.push({name: 'MerchantServiceDeliveryList'});
            }else if(index == '5-1'){
                this.$router.push({name: 'MerchantStockList'});
            }else if(index == '5-2'){
                this.$router.push({name: 'MerchantGodownEntryList'});
            }else if(index == '5-3'){
                this.$router.push({name: 'MerchantStockOutList'});
            }else if(index == '6-1'){
                this.$router.push({name: 'selfaftersalelist'});
            }else if(index == '7-1'){
                this.$router.push({name: 'MerchantAccountgMan'});
            }else if(index == '7-5'){
                this.$router.push({name: 'MerchantAccountgInfo'});
            }else if(index == '7-2'){
                this.$router.push({name: 'MerchantDividedetail'});
            }else if(index == '7-3'){
                this.$router.push({name: 'Merchantgetcashdetail'});
            }else if(index == '7-4'){
                this.$router.push({name: 'MerchantAllInvoiceList'});
            }else if(index == '12-1'){
                this.$router.push({name: 'MerchantProcessList'});
            }else if(index == '12-2'){
                this.$router.push({name: 'MerchantPendingClaimList'});
            }else if(index == '12-3'){
                this.$router.push({name: 'MerchantPendingReviewList'});
            }else if(index == '12-4'){
                this.$router.push({name: 'MerchantReviewList'});
            }else if(index == '13-1'){
                this.$router.push({name: 'MerchantExpressTemplate'});
            }else if(index == '14-1'){
                this.$router.push({name: 'MerchantProdCouponBatch'});
            }else if(index == '14-2'){
                this.$router.push({name: 'MerchantProdCouponGroup'});
            }else if(index == '14-3'){
                this.$router.push({name: 'MerchantCouponList'});
            }
            // else if(index == '20-1'){
            //     this.$router.push({name: 'MerchantProcessList'});
            // }else if(index == '20-2'){
            //     this.$router.push({name: 'MerchantPendingClaimList'});
            // }else if(index == '20-3'){
            //     this.$router.push({name: 'MerchantPendingReviewList'});
            // }else if(index == '20-4'){
            //     this.$router.push({name: 'MerchantReviewList'});
            // }
        },
        getPermission(response){
        //   console.log(response)
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
                    lable: "商品管理",
                    pathindex: "2",
                    iconclass: "el-icon-thirdmoshubang",
                    items: [
                        {
                            lable: "商品管理",
                            pathindex: "2-1",
                            status: false,
                            Permission: "M:BM_PROD_PRODUCT"
                        },
                        {
                            lable: "酒店商品管理",
                            pathindex: "3-1",
                            status: false,
                            Permission: "M:BM_PROD_HOTELPRODUCT"
                        },
                        {
                            lable: "快递费模板",
                            pathindex: "13-1",
                            status: false,
                            Permission: "M:BM_PROD_EXPRESSTPL"
                        }
                    ]
                },
                {
                    lable: "库存管理",
                    pathindex: "5",
                    iconclass: "el-icon-thirdhuowudui1",
                    items: [
                        {
                            lable: "商品库存",
                            pathindex: "5-1",
                            status: false,
                            Permission: "M:BM_INV_PRODUCTSTOCK"
                        },
                        {
                            lable: "入库单管理",
                            pathindex: "5-2",
                            status: false,
                            Permission: "M:BM_INV_WAREHOUSING"
                        },
                        {
                            lable: "出库单管理",
                            pathindex: "5-3",
                            status: false,
                            Permission: "M:BM_INV_OUTSTOCK"
                        }
                    ]
                },
                {
                    lable: "配送管理",
                    pathindex: "4",
                    iconclass: "el-icon-thirdzihangche",
                    items: [
                        {
                            lable: "商品配送单",
                            pathindex: "4-1",
                            status: false,
                            Permission: "M:BM_DELIV_DELIVERY"
                        },
                        {
                            lable: "现场配送单",
                            pathindex: "4-2",
                            status: false,
                            Permission: "M:BM_DELIV_DELIVERY"
                        }
                    ]
                },
                {
                    lable: "售后服务",
                    pathindex: "6",
                    iconclass: "el-icon-thirdguanfangbanben",
                    items: [
                        {
                            lable: "售后申请",
                            pathindex: "6-1",
                            status: false,
                            Permission: "M:BM_CS_AFTERSALE"
                        }
                    ]
                },
                {
                    lable: "财务管理",
                    pathindex: "7",
                    iconclass: "el-icon-thirdshujukanban",
                    items: [
                        {
                            lable: "开票管理",
                            pathindex: "7-4",
                            status: false,
                            Permission: "M:BM_FIN_INVOICE"
                        },
                        {
                            lable: "账户管理",
                            pathindex: "7-1",
                            status: false,
                            // Permission: "M:BM_FIN_ACCOUNT"
                        },
                        {
                            lable: "账户信息",
                            pathindex: "7-5",
                            status: true,
                            Permission: "M:BM_FIN_MERACCOUNTINFO"
                        },
                        {
                            lable: "分成明细",
                            pathindex: "7-2",
                            status: false,
                            Permission: "M:BM_FIN_DIVIDE"
                        },
                        {
                            lable: "提现记录",
                            pathindex: "7-3",
                            status: false,
                            Permission: "M:BM_FIN_GETCASH"
                        }
                    ]
                },
                {
                    lable: "审核管理",
                    pathindex: "12",
                    iconclass: "el-icon-thirdquanxianshenpi",
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
                    pathindex: "14",
                    iconclass: "el-icon-thirdyouhui",
                    items: [
                        {
                            lable: "优惠券批次管理",
                            pathindex: "14-1",
                            status: false,
                            Permission: "M:BM_COUPON_MERBATCH"
                        },
                        {
                            lable: "优惠券分组管理",
                            pathindex: "14-2",
                            status: false,
                            Permission: "M:BM_COUPON_MERGROUP"
                        },
                        {
                            lable: "优惠券管理",
                            pathindex: "14-3",
                            status: false,
                            Permission: "M:BM_COUPON_MERCOUPON"
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
            console.log(this.navlist)
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
