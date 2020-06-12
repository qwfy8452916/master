<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="openid">
                <el-input v-model="openId" placeholder="输入openid"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="fullName" placeholder="输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model.number="mobile" placeholder="输入手机号"></el-input>
            </el-form-item>         
            <el-form-item label="类型">
                <el-select v-model="isSalesman" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="会员" value="0"></el-option>
                  <el-option label="业务员" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="身份">
                <el-select v-model="specialEnvoyLevel" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="普通会员" value="0"></el-option>
                  <el-option label="财富特使" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="startIndex" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="禁用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div v-if="authzData['F:BO_FS_MEMBER_ADD']"><el-button class="addbutton" @click="addNewSetting">新增业务员</el-button></div>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="openId" label="openid" align=center></el-table-column>
            <el-table-column prop="fullName" label="姓名" align=center></el-table-column>
            <el-table-column prop="mobile" label="手机号" align=center></el-table-column>
            <el-table-column label="类型" align=center>
                <template slot-scope="scope">
                    {{scope.row.isSalesman?'业务员':'会员'}}
                </template>
            </el-table-column>
            <el-table-column label="所属社群" align=center>
                <template slot-scope="scope">
                    {{scope.row.upperShareCode ? scope.row.upperShareCode:'-'}}
                </template>
            </el-table-column>
            <el-table-column label="是否是财富合伙人" align=center>
                <template slot-scope="scope">
                    {{scope.row.isFortunePartner == 2?'是(高级)':scope.row.isFortunePartner?"是":'否'}}
                </template>
            </el-table-column>
            <el-table-column label="身份" width="160" align=center>
                <template slot-scope="scope">
                    {{scope.row.specialEnvoyLevel?scope.row.specialEnvoyLevel== '-1'?'普通会员(可升级)':'财富特使':'普通会员'}}
                </template>
            </el-table-column>
            <el-table-column label="财富特使等级" align=center>
                <template slot-scope="scope">
                    {{scope.row.specialEnvoyLevel>0?scope.row.specialEnvoyLevel:'-'}}
                </template>
            </el-table-column>
            <el-table-column v-if="authzData['F:BO_FS_MEMBER_SHARE']" label="分享" align=center>
                <template slot-scope="scope">
                    <span v-if="!scope.row.isSalesman">-</span>
                    <el-switch @change="changeMemberShare(scope.row.shareFlag,scope.row.id)" v-else v-model="scope.row.shareFlag">
                    </el-switch>
                </template>
            </el-table-column>
            
            <el-table-column label="账号余额" align=center>
                <template slot-scope="scope">
                    {{scope.row.fsBalanceDTO?scope.row.fsBalanceDTO.balance:'-'}}
                </template>
            </el-table-column>
            <el-table-column v-if="authzData['F:BO_FS_MEMBER_USING']" label="禁/启用" align=center>
                <template slot-scope="scope">
                    <span v-if="!scope.row.isSalesman">-</span>
                    <el-switch @change="changeMemberStatus(scope.row.status,scope.row.id,scope.$index)" v-else v-model="scope.row.status">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="注册时间" align=center>
                <template slot-scope="scope">
                    {{scope.row.loginTime=='1970-01-01 00:00:00'?'-':scope.row.loginTime}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_FS_MEMBER_EDIT'] && scope.row.isSalesman" type="text" size="small" @click="CabinetTypechange(scope.$index, CabinetList)">修改</el-button>
                    <el-button v-if="authzData['F:BO_FS_MEMBER_ASSOCIATION'] && scope.row.specialEnvoyLevel" type="text" size="small" @click="CabinetTypeCom(scope.$index, CabinetList)">财富特使社群</el-button>
                    <el-button v-if="authzData['F:BO_FS_MEMBER_PARTNERRECORD'] && !scope.row.specialEnvoyLevel" type="text" size="small" @click="CabinetTypeComRe(scope.$index, CabinetList)">财富合伙人投资记录</el-button>
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
    name: 'LaunchHotelManagement',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            CabinetList:[],
            loadingH: false,
            openId:'',
            fullName:'',
            mobile:'',
            isSalesman:'',
            specialEnvoyLevel:'',
            startIndex:'',
            value1:false,

            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            currentPage: 1, //当前页码
            pageNum: 1,
        }
    },
    created() {
    //    this.oprOgrId=localStorage.orgId
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.oprOgrId = this.$route.params.orgId;

    },
    mounted(){
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.openId = ''
            this.fullName = ''
            this.mobile = ''
            this.isSalesman = ''
            this.specialEnvoyLevel = ''
            this.startIndex = ''
            this.hotelFunctionList();
        },
        //查询
        inquire(){
            this.Getdata();
            this.$store.commit('setSearchList',{
                openId: this.openId,
                fullName: this.fullName,
                mobile: this.mobile,
                isSalesman: this.isSalesman,
                specialEnvoyLevel: this.specialEnvoyLevel,
                startIndex:this.startIndex
            })
        },
        //新增
        addNewSetting(){
            this.$router.push({name:'LonganMemberAdd'});
        },
        //修改
        CabinetTypechange(index,row){
            let guiId=row[index].id
            this.$router.push({name:'LonganMemberChange',query:{modifyid: guiId}});
        },
        //财富特使社群
        CabinetTypeCom(index,row){
            let guiId=row[index].shareCode
            let fullName=row[index].fullName
            this.$router.push({name:'LonganMemberCom',query:{modifyid: guiId,fullName:fullName}});
        },
        //财富合伙人投资记录
        CabinetTypeComRe(index,row){
            let guiId=row[index].shareCode
            this.$router.push({name:'LonganMemberComRecords',query:{shareCode: guiId}});
        },
        changeMemberShare(value,id){
            let status = value?1:0;
            this.$api.changeMemberShare(id,status)
                .then(response => {
                    if(response.data.code==0){
                        if(value){
                            this.$message.success("启用成功")
                        }else{
                            this.$message.success("禁用成功")
                        }
                    }else{
                        this.$alert(response.data.msg,"警告",{
                            confirmButtonText: "确定"
                        })
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        changeMemberStatus(value,id,index){
            this.$confirm('是否确认禁/启用该业务员?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let status = value?1:0;
                this.$api.changeMemberStatus(id,status)
                    .then(response => {
                        if(response.data.code==0){
                            if(value){
                                this.$message.success("启用成功")
                            }else{
                                this.$message.success("禁用成功")
                            }
                        }else{
                            this.$alert(response.data.msg,"警告",{
                                confirmButtonText: "确定"
                            })
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
                this.CabinetList[index].status = !value
            });
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
                fullName: this.ifEmpty(this.fullName),
                mobile: this.ifEmpty(this.mobile),
                isSalesman: this.ifEmpty(this.isSalesman),
                specialEnvoyLevel: this.ifEmpty(this.specialEnvoyLevel),
                openId: this.ifEmpty(this.openId),
                status: this.ifEmpty(this.startIndex),
                pageNo: this.pageNum,
                pageSize: this.pageSize
            }
            this.$api.FsMemberAll({params}).then(response => {
                if(response.data.code == 0){
                    this.CabinetList = response.data.data.records;
                    this.CabinetList.forEach((ele)=>{
                        if(ele.isSalesman){
                            ele.status = ele.status?true:false;
                            ele.shareFlag = ele.shareFlag?true:false;
                        }
                    })
                    console.log( this.CabinetList);
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

