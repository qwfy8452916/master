<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="所属社群">
                <el-input v-model="uppserShareCodeName" placeholder="输入所属社群"></el-input>
            </el-form-item>
            <el-form-item label="openid">
                <el-input v-model="openId" placeholder="输入openid"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model.number="nickName" type="number" placeholder="输入用户昵称"></el-input>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="upperShareCode" label="所属社群" align=center></el-table-column>
            <el-table-column prop="openId" label="openid" align=center></el-table-column>
            <el-table-column prop="fullName" label="用户昵称" align=center></el-table-column>
            <el-table-column label="成为特使时间" align=center>-</el-table-column>
            <el-table-column label="领取优惠券时间" align=center>-</el-table-column>
            <el-table-column prop="investCont" label="购买柜子数量" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_FS_MEMBER_ASSOCIATION_RECORD']" type="text" size="small" @click="CabinetTyperecord(scope.$index, CabinetList)">投资记录</el-button>
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
    name: 'LaunchHotelManagement',
    data() {
        return{
            authzData: '',
            CabinetList:[],
            loadingH: false,
            openId:'',
            uppserShareCodeName:'',
            nickName:'',
            shareCode:'',
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            currentPage: 1, //当前页码
            pageNum: 1,
            memberID:''
        }
    },
    created() {
    //    this.oprOgrId=localStorage.orgId
        this.shareCode = this.$route.query.modifyid;
        this.uppserShareCodeName = this.$route.query.fullName;
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.oprOgrId = this.$route.params.orgId;

    },
    mounted(){
        this.Getdata()
    },
    methods: {
        //查询
        inquire(){
            this.Getdata();
        },
        //新增
        addNewSetting(){
            this.$router.push({name:'LonganMemberAdd'});
        },
        //投资记录
        CabinetTyperecord(index,row){
            let guiId=row[index].openId
            this.$router.push({name:'LonganMemberComRecords',query:{openId: guiId}});
        },
       
        //当前页码
        current(){
            this.pageNum = this.currentPage;
            this.Getdata();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.Getdata();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.Getdata();
        },
        //非空校验
        ifEmpty(item){
           if(item === ''){
               return undefined;
            }else{
                return item;
            }
        },
        //获取数据
        Getdata(){ 
            let that=this;
            let params = {
                openId:this.ifEmpty(this.openId),
                uppserShareCodeName:this.ifEmpty(this.uppserShareCodeName),
                nickName:this.ifEmpty(this.nickName),
                upperShareCode:this.shareCode,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            }
            this.$api.FsMemberShareCom({params}).then(response => {
                if(response.data.code == 0){
                    this.CabinetList = response.data.data.records;
                    that.pageTotal = response.data.data.total;
                }else{
                    that.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                that.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
.pagination{
    margin-top: 20px;
}
</style>

