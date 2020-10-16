<template>
    <div class="memberlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="用户昵称">
                <el-input v-model="inquireNickname"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="inquirePhone"></el-input>
            </el-form-item>
            <el-form-item label="绑定时间">
                <el-date-picker
                    v-model="inquireTimeBind"
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
        <el-table :data="MemberDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="用户ID" width="80px" align=center></el-table-column>
            <el-table-column prop="nickName" label="用户昵称"></el-table-column>
            <el-table-column prop="membershipName" label="会员姓名"></el-table-column>
            <el-table-column prop="membershipPhone" label="手机号"></el-table-column>
            <el-table-column prop="bindTime" label="绑定时间" width="160px" align=center></el-table-column>
            <el-table-column prop="deadlineDate" label="过期时间" width="160px" align=center></el-table-column>
            <el-table-column prop="balance" label="账户余额"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="memberDetail(scope.row.id)">查看详情</el-button>
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
export default {
    name: 'TeashopMemberManage',
    data(){
        return {
            inquireNickname: '',
            inquirePhone: '',
            inquireTimeBind: [],
            MemberDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1
        }
    },
    mounted(){
        this.memberList();
    },
    methods: {
        //会员列表
        memberList(){
            if(this.inquireTimeBind == null){
                this.inquireTimeBind = [];
            }
            const params = {
                membershipLevel: 1,
                nickName: this.inquireNickname,
                MPhone: this.inquirePhone,
                bindStartTime: this.inquireTimeBind[0],
                bindEndTime: this.inquireTimeBind[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.memberList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.MemberDataList = result.data.records;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('会员列表获取失败！');
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
            this.memberList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.memberList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.memberList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.memberList();
        },
        //查看详情
        memberDetail(id){
            this.$router.push({name: 'TeashopMemberDetail', query: {id}});
        },
    }
}
</script>

<style lang="less" scoped>
.memberlist{
    .pagination{
        margin-top: 20px;
    }
}
</style>
