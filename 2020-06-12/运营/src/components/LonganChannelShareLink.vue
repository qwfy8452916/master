<template>
    <div class="channellist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="渠道名称">
                <el-input v-model="inquireChannelName"></el-input>
            </el-form-item>
            <el-form-item label="分享标题">
                <el-input v-model="inquireShareTitle"></el-input>
            </el-form-item>
            <el-form-item label="分享时间">
                <el-date-picker
                    v-model="inquireShareTime"
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
        <el-table :data="LinkDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="channelName" label="渠道名称"></el-table-column>
            <el-table-column prop="shareTitle" label="分享标题"></el-table-column>
            <el-table-column prop="shareCode" label="分享链接"></el-table-column>
            <el-table-column prop="createdAt" label="分享时间" width="160px" align=center></el-table-column>
            <el-table-column prop="wealthPartnerCount" label="财富合伙人数量" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="100px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_FS_CHANNELLINK_PARTNER']" type="text" size="small" @click="wealthPartner(scope.row.shareCode)">财富合伙人</el-button>
                </template>
            </el-table-column>
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
import resetButton from './resetButton'
export default {
    name: 'LonganChannelShareLink',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            inquireChannelId: '',
            inquireChannelName: '',
            inquireShareTitle: '',
            inquireShareTime: [],
            LinkDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const channelId = this.$route.params.channelId;
        if(channelId != undefined){
            this.inquireChannelId = channelId;
        }
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.channelLinkList();
    },
    methods: {
        resetFunc(){
            this.inquireChannelName = ''
            this.inquireShareTitle = ''
            this.inquireShareTime = []
            this.channelLinkList();
        },
        //渠道商分享链接列表
        channelLinkList(){
            if(this.inquireShareTime == null){
                this.inquireShareTime = [];
            }
            //分享类型（1：渠道商分享，2：会员分享，3：红包分享）
            const params = {
                channelName: this.inquireChannelName,
                title: this.inquireShareTitle,
                shareTimeFrom: this.inquireShareTime[0],
                shareTimeTo: this.inquireShareTime[1],
                rowId: this.inquireChannelId,
                shareType: 1,
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.channelLinkList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.LinkDataList = result.data.records;
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
            this.channelLinkList();
            this.$store.commit('setSearchList',{
                inquireChannelName: this.inquireChannelName,
                inquireShareTitle: this.inquireShareTitle,
                inquireShareTime:this.inquireShareTime
            })
        },
        //页数跳转
        current(){
            this.pageNum = this.currentPage;
            this.channelLinkList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.channelLinkList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.channelLinkList();
        },
        //财富合伙人
        wealthPartner(shareCode){
            this.$router.push({name: 'LonganChannelPartner', params: {shareCode}});
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

