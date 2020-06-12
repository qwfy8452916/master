<template>
    <div class="channellist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="openId">
                <el-input v-model="inquireOpenId"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model="inquireNickname"></el-input>
            </el-form-item>
            <el-form-item label="柜子类型">
                <el-select 
                    v-model="inquireCabType"
                    filterable
                    remote
                    :remote-method="remoteCabType"
                    :loading="loadingC"
                    @focus="getCabTypeList()"
                    placeholder="请选择">
                    <el-option v-for="item in cabTypeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付时间">
                <el-date-picker
                    v-model="inquireCreateTime"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="PartnerDataList" border stripe style="width:100%;" >
            <el-table-column prop="investorOpenId" label="openId" align=center></el-table-column>
            <el-table-column prop="investorNickName" label="用户昵称" align=center></el-table-column>
            <el-table-column prop="cabTypeName" label="柜子类型" align=center></el-table-column>
            <el-table-column prop="cabinetQuantity" label="柜子数量" align=center></el-table-column>
            <el-table-column prop="totalRent" label="租金" align=center></el-table-column>
            <el-table-column prop="totalServiceFee" label="技术服务费" width="90px" align=center></el-table-column>
            <el-table-column prop="couponAmount" label="优惠券金额" width="90px" align=center></el-table-column>
            <el-table-column prop="balanceAmount" label="余额支付金额" width="110px" align=center></el-table-column>
            <el-table-column prop="actualPayAmount" label="实付金额" align=center></el-table-column>
            <el-table-column prop="payTime" label="支付时间" width="160px" align=center></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="10"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LonganChannelPartner',
    data() {
        return{
            authzData: '',
            inquireOpenId: '',
            inquireNickname: '',
            inquireCabType: '',
            cabTypeList: [],
            loadingC: false,
            inquireCreateTime: [],
            PartnerDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            shareCode:''
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        if(this.$route.query.openId){
            this.inquireOpenId = this.$route.query.openId;
        }else if(this.$route.query.shareCode){
            this.shareCode = this.$route.query.shareCode;
        }
        this.channelPartnerList();
    },
    methods: {
        //柜子类型列表
        getCabTypeList(ctName){
            const params = {};
            this.$api.getCabTypeList(params)
            .then(response => {
                const result = response.data;
                if(result.code == 0){
                    if(result.data.length != 0){
                        this.cabTypeList = result.data.map(item => {
                            return{
                                id: item.id,
                                typeName: item.typeName 
                            }
                        })
                    }
                    const cabTypeAll = {
                        id: '',
                        typeName : '全部'
                    };
                    this.cabTypeList.unshift(cabTypeAll);
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
        remoteCabType(val){
            this.getCabTypeList(val);
        },
        //合伙人列表
        channelPartnerList(shareCode){
            if(this.inquireCreateTime == null){
                this.inquireCreateTime = [];
            }
            const params = {
                openId: this.inquireOpenId,
                nickName: this.inquireNickname,
                cabTypeId: this.inquireCabType,
                investTimeFrom: this.inquireCreateTime[0],
                investTimeTo: this.inquireCreateTime[1],
                shareCode: this.shareCode,
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.FsMemberShareComRe({params})
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.PartnerDataList = result.data.records;
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
        //查询
        inquire(){
            this.pageNum = 1;
            this.channelPartnerList();
        },
        //页数跳转
        current(){
            this.pageNum = this.currentPage;
            this.channelPartnerList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.channelPartnerList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.channelPartnerList();
        },
    }
}
</script>

<style lang="less" scoped>
.channellist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

