<template>
    <div class="membercardlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="会员卡卡号">
                <el-input v-model="inquireCardNumber"></el-input>
            </el-form-item>
            <el-form-item label="卡名称">
                <el-input v-model="inquireCardName"></el-input>
            </el-form-item>
            <el-form-item label="有效期">
                <el-date-picker
                    v-model="inquireTimeIndate"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="inquirePhone"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="inquireStatus" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未分发" value="0"></el-option>
                    <el-option label="未绑定" value="1"></el-option>
                    <el-option label="已绑定" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker
                    v-model="inquireTimeCreate"
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
        <div><el-button class="addbutton" @click="memberCardAdd">新增</el-button></div>
        <el-table :data="MembercardDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="cardCode" label="会员卡卡号" width="90px"></el-table-column>
            <el-table-column prop="name" label="会员卡名称" width="100px"></el-table-column>
            <el-table-column prop="amount" label="金额"></el-table-column>
            <el-table-column prop="validDate" label="有效期" width="190px"></el-table-column>
            <el-table-column prop="membershipPeriod" label="会员期限"></el-table-column>
            <el-table-column prop="type" label="类型">
                <template slot-scope="scope">
                    <span>{{scope.row.type == 0 ? '后台生成':'会员分享'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdByName" label="创建人"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="160px" align=center></el-table-column>
            <el-table-column prop="cardStatus" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.cardStatus == 0">未分发</span>
                    <span v-else>{{scope.row.cardStatus == 1 ? '未绑定':'已绑定'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="memberShipName" label="会员姓名"></el-table-column>
            <el-table-column prop="memberShipPhone" label="会员手机号" width="120px"></el-table-column>
            <el-table-column fixed="right" label="操作" width="160px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.cardStatus != 2 && scope.row.type == 0" type="text" size="small" @click="memberCardModify(scope.row.id)">修改</el-button>
                    <el-button v-if="scope.row.cardStatus != 2 && scope.row.type == 0" type="text" size="small" @click="memberCardDelete(scope.row.id)">删除</el-button>
                    <el-button type="text" size="small" @click="memberCardDetail(scope.row.id)">查看详情</el-button>
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
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该会员卡？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'TeashopMembercardList',
    data(){
        return {
            tmId: '',
            inquireCardNumber: '',
            inquireCardName: '',
            inquireTimeIndate: [],
            inquirePhone: '',
            inquireStatus: '',
            inquireTimeCreate: [],
            MembercardDataList: [],
            dialogVisibleDelete: false,
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1
        }
    },
    mounted(){
        this.memberCardList();
    },
    methods: {
        //会员卡列表
        memberCardList(){
            if(this.inquireTimeIndate == null){
                this.inquireTimeIndate = [];
            }
            if(this.inquireTimeCreate == null){
                this.inquireTimeCreate = [];
            }
            const params = {
                cardCode: this.inquireCardNumber,
                cardName: this.inquireCardName,
                validStartDate: this.inquireTimeIndate[0],
                validEndDate: this.inquireTimeIndate[1],
                phone: this.inquirePhone,
                cardStatus: this.inquireStatus,
                createStartDate: this.inquireTimeCreate[0],
                createEndDate: this.inquireTimeCreate[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.memberCardList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.MembercardDataList = result.data.records.map(item => {
                            item.validDate = item.validStartDate + ' 至 ' + item.validEndDate
                            return item
                        });
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('会员卡列表获取失败！');
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
            this.memberCardList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.memberCardList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.memberCardList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.memberCardList();
        },
        //新增
        memberCardAdd(){
            this.$router.push({name: 'TeashopMembercardAdd'});
        },
        //修改
        memberCardModify(id){
            this.$router.push({name: 'TeashopMembercardModify', query: {id}});
        },
        //删除
        memberCardDelete(id){
            this.tmId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const id = this.tmId;
            const params = {};
            this.$api.memberCardDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('删除会员卡成功！');
                        this.dialogVisibleDelete = false;
                        this.memberCardList();
                    }else{
                        this.$message.error(result.msg);
                        this.dialogVisibleDelete = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //查看详情
        memberCardDetail(id){
            this.$router.push({name: 'TeashopMembercardDetail', query: {id}});
        },
    }
}
</script>

<style lang="less" scoped>
.membercardlist{
    .pagination{
        margin-top: 20px;
    }
}
</style>
