<template>
    <div class="channellist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="订单号">
                <el-input v-model="inquireOrderCode"></el-input>
            </el-form-item>
            <el-form-item label="分享类型">
                 <el-select
                    v-model="shareType"
                    :loading="loadingH"
                    placeholder="请选择">
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发放人">
                <el-input v-model="inquireProvideName"></el-input>
            </el-form-item>
            <el-form-item label="发放时间">
                <el-date-picker
                    v-model="inquireProvideTime"
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
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="PacketDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="businessCode" label="订单号" width="180px"></el-table-column>
            <el-table-column label="订单类型">
                <template slot-scope="scope">
                    {{scope.row.businessType==1?'购物订单':'订房订单'}}
                </template>
            </el-table-column>
            <el-table-column label="分享类型">
                <template slot-scope="scope">
                    {{scope.row.businessType==1?'购物红包分享':'订房红包分享'}}
                </template>
            </el-table-column>
            <el-table-column prop="totalNum" label="红包数量"></el-table-column>
            <el-table-column prop="receivedNum" label="已领取数量"></el-table-column>
            <el-table-column prop="receviedAmount" label="已领取金额"></el-table-column>
            <el-table-column prop="fromCustomNickName" label="发放人"></el-table-column>
            <el-table-column label="发放时间" width="160px" align=center>
                <template slot-scope="scope">
                    {{scope.row.shareAt=='1970-01-01 00:00:00'?'-':scope.row.shareAt}}
                </template>
            </el-table-column>
            <el-table-column label="截至时间" width="160px" align=center>
                <template slot-scope="scope">
                    {{scope.row.deadlineAt=='1970-01-01 00:00:00'?'-':scope.row.deadlineAt}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_ACT_RED_RECORD']" type="text" size="small" @click="packetGetRecord(scope.row.id)">领取记录</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="领取记录" :visible.sync="dialogRecordVisible" width="56%">
            <el-table :data="getRecordData">
                <el-table-column property="id" label="红包ID" align=center></el-table-column>
                <el-table-column property="receivceAmount" label="红包金额" align=center></el-table-column>
                <el-table-column property="receiveCustomNickName" label="领取人" align=center></el-table-column>
                <el-table-column property="createdAt" label="领取时间" width="160px" align=center></el-table-column>
            </el-table>
        </el-dialog>
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
import resetButton from './resetButton'
export default {
    name: 'LonganRedPacketList',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            inquireOrderCode: '',
            shareType: '',
            inquireProvideName: '',
            inquireProvideTime: [],
            PacketDataList: [],
            dialogRecordVisible: false,
            getRecordData: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            loadingH:false,
            statusList:[
                {
                    value: '',
                    label:'全部'
                },
                {
                    value: 1,
                    label:'购物红包'
                },
                {
                    value: 2,
                    label:'订房红包'
                }
            ]
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.redPacketList();
    },
    methods: {
        resetFunc(){
            this.inquireOrderCode = ''
            this.shareType = ''
            this.inquireProvideName = ''
            this.inquireProvideTime = []
            this.redPacketList();
        },
        //红包列表
        redPacketList(){
            if(this.inquireProvideTime == null){
                this.inquireProvideTime = [];
            }
            const params = {
                businessType : this.shareType,
                fromCustomName : this.inquireProvideName,
                orderCode: this.inquireOrderCode,
                shareAtFrom : this.inquireProvideTime[0]?this.inquireProvideTime[0]:undefined,
                shareAtTo : this.inquireProvideTime[1]?this.inquireProvideTime[1]:undefined,
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.searchRedPack({params})
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.PacketDataList = result.data.records;
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
            this.redPacketList();
            this.$store.commit('setSearchList',{
                inquireOrderCode: this.inquireOrderCode,
                shareType: this.shareType,
                inquireProvideName: this.inquireProvideName,
                inquireProvideTime:this.inquireProvideTime
            })
        },
        //页数跳转
        current(){
            this.pageNum = this.currentPage;
            this.redPacketList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.redPacketList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.redPacketList();
        },
        //领取记录
        packetGetRecord(id){
            this.$api.searchRedPackRecords(id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.getRecordData = result.data;
                        this.dialogRecordVisible = true;
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
    }
}
</script>

<style>
.el-dialog__header{
    text-align: left;
}
.el-dialog__body{
    padding: 0px 20px 30px 20px;
}
</style>

<style lang="less" scoped>
.channellist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

