<template>
    <div class="commonuserlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="用户ID">
                <el-input v-model="inquireUserid"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="CommonUserDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="用户ID" width="80px" align=center></el-table-column>
            <el-table-column prop="nickName" label="用户昵称"></el-table-column>
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
    name: 'TeashopCommonUserManage',
    data(){
        return {
            inquireUserid: '',
            CommonUserDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1
        }
    },
    mounted(){
        this.commonUserList();
    },
    methods: {
        //潜客列表
        commonUserList(){
            const params = {
                membershipLevel: 0,
                customerId: this.inquireUserid,
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.memberList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.CommonUserDataList = result.data.records;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('潜客列表获取失败！');
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
            this.commonUserList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.commonUserList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.commonUserList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.commonUserList();
        },
    }
}
</script>

<style lang="less" scoped>
.commonuserlist{
    .pagination{
        margin-top: 20px;
    }
}
</style>
