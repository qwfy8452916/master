<template>
    <div class="hotellist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称">
                <el-input v-model="inquireHotelName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <!-- <el-form-item>
                <el-button class="inquireReset" @click="userReset">重&nbsp;&nbsp;置</el-button>
            </el-form-item> -->
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div v-if="authzData['F:BO_HOTEL_HOTEL_ADD']"><el-button class="addbutton" @click="hotelAdd">新&nbsp;&nbsp;增</el-button></div>
        <el-table :data="HotelDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="酒店id" width="80px" align=center></el-table-column>
            <el-table-column prop="hotelUscc" label="社会信用代码" width="200px"></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称" min-width="200px"></el-table-column>
            <el-table-column prop="adminMobile" label="管理员手机号" width="120px" align=center></el-table-column>
            <el-table-column prop="hotelAddress" label="地址" min-width="280px"></el-table-column>
            <!-- <el-table-column prop="hotelLoginAddress" label="酒店后台管理地址" width="180px">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="hotelLink(scope.row.hotelLoginAddress)">复制</el-button>
                </template>
            </el-table-column> -->
            <el-table-column prop="createdAt" label="添加时间" width="160px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="300px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_HOTEL_HOTEL_VIEW']" type="text" size="small" @click="LookHotelDetail(scope.row.id)">详情</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_HOTEL_EDIT']" type="text" size="small" @click="ModifyHotel(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_HOTEL_DELETE']" type="text" size="small" @click="DeleteHotel(scope.row.id)">删除</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_HOTEL_RESETPWD']" type="text" size="small" @click="ResetPWD(scope.row.id)">重置密码</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_HOTEL_CAB']" type="text" size="small" @click="HotelCabinet(scope.row.id)">管理柜子商品</el-button>
                    <!-- <el-button type="text" size="small" @click="HotelCommodity(scope.row.id)">管理酒店商品</el-button> -->
                    <!-- <el-button v-if="authzData['F:BO_HOTEL_HOTEL_DIVIDE']" type="text" size="small" @click="HotelProtocol(scope.row.id)">管理分成协议</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>确定删除该酒店？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="重置密码" :visible.sync="dislogVisibleResetPWD" width="30%">
            <el-form :model="resetForm" :rules="resetRules" ref="resetForm" label-width="80px">
                <el-form-item label="新密码" prop="newpwd">
                    <el-input type="password" v-model.trim="resetForm.newpwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="ensurepwd">
                    <el-input type="password" v-model.trim="resetForm.ensurepwd"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleResetPWD = false">取 消</el-button>
                <el-button type="primary" @click="EnsureReset('resetForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from './resetButton'
import LonganPagination from '@/components/LonganPagination'
export default {
    name: 'LonganHotelList',
    components: {
        LonganPagination,
        resetButton
    },
    data() {
        var validateNewPwd = (rule,value,callback) =>{
            if(!value){
                callback(new Error('请输入新密码'));
            }else if(value.toString().length < 6 || value.toString().length > 18){
                callback(new Error('密码长度为6 ~ 18个字符'));
            }else{
                callback();
            }
        };
        var validateEnsurePwd = (rule,value,callback) =>{
            if(value === ''){
                callback(new Error('请再次输入密码'));
            }else if(value !== this.resetForm.newpwd){
                callback(new Error('两次输入密码不一致！'));
            }else{
                callback();
            }
        };
        return{
            authzData: '',
            // orgId: '',
            inquireHotelName: '',
            HotelDataList: [],
            hotelId: '',
            dialogVisibleDelete: false,
            dislogVisibleResetPWD: false,
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
            //重置密码
            resetForm: {
                newpwd: '',
                ensurepwd: ''
            },
            resetRules: {
                newpwd: [
                    {required: true, validator: validateNewPwd, trigger: 'blur'}
                ],
                ensurepwd: [
                    {required: true, validator: validateEnsurePwd, trigger: 'blur'}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.hotelList();
    },
    methods: {
        resetFunc(){
            this.inquireHotelName = ''
            this.hotelList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.hotelList();
        },
        //酒店列表
        hotelList(){
            const params = {
                // encryptedOprOrgId: this.orgId,
                orgAs: 2,
                hotelName: this.inquireHotelName,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            // console.log(params);
            this.$api.hotelList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(response.data.code == '0'){
                        this.HotelDataList = result.data.records;
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
        hotelLink(link){
            // window.location.href = link;
        },
        //新增
        hotelAdd(){
            // const orgId = this.orgId;
            // this.$router.push({name:'LonganHotelAdd', params:{orgId}});
            this.$router.push({name:'LonganHotelAdd'});
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.hotelList();
            this.$store.commit('setSearchList',{
                inquireHotelName: this.inquireHotelName
            })
        },
        //重置
        userReset(){
            this.inquireHotelName = '';
            this.inquire();
        },
        //查看
        LookHotelDetail(id){
            // const orgId = this.orgId;
            // this.$router.push({name:'LonganHotelDetail', params:{orgId}, query: {id}});
            this.$router.push({name:'LonganHotelDetail', query: {id}});
        },
        //修改
        ModifyHotel(id){
            // const orgId = this.orgId;
            // this.$router.push({name:'LonganHotelModify', params:{orgId}, query: {id}});
            this.$router.push({name:'LonganHotelModify', query: {id}});
        },
        //删除
        DeleteHotel(id){
            this.hotelId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const id = this.hotelId;
            const params = {};
            this.$api.hotelDelete(params,id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(response.data.code == '0'){
                        this.$message.success('删除酒店成功！');
                        this.dialogVisibleDelete = false;
                        this.hotelList();

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
        //重置密码
        ResetPWD(id){
            this.resetForm.newpwd = '';
            this.resetForm.ensurepwd = '';
            this.hotelId = id;
            this.dislogVisibleResetPWD = true;
        },
        EnsureReset(resetForm){
            const id = this.hotelId;
            const params = {
                id: this.hotelId,
                newPassword: this.resetForm.newpwd
            };
            // console.log(id,params);
            this.$refs[resetForm].validate((valid) => {
                if (valid) {
                    this.$api.hotelResetPWD(params,id)
                        .then(response => {
                            // console.log(response);
                            if(response.data.code == 0){
                                this.$message.success('重置密码成功！');
                                this.dislogVisibleResetPWD = false;
                            }else{
                                this.$message.error('重置密码失败！');
                                this.dislogVisibleResetPWD = false;
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                            this.dislogVisibleResetPWD = false;
                        })
                }else{
                    // console.log('error!');
                    return false
                }
            })
        },
        //管理柜子商品
        HotelCabinet(id){
            // const orgId = this.orgId;
            // this.$router.push({name: 'LonganHotelCabinetList', params:{orgId}, query: {id}});
            // this.$router.push({name: 'LonganHotelCabinetList', query: {id}});
            const hId = id;
            this.$router.push({name: 'LonganMinibarProdList', query: {hId}});
        },
        //管理酒店商品
        HotelCommodity(id){
            // const orgId = this.orgId;
            // this.$router.push({name: 'LonganHotelCommodityList', params:{orgId}, query: {id}});
            this.$router.push({name: 'LonganHotelCommodityList', query: {id}});
        },
        //管理分层协议
        HotelProtocol(id){
            this.$router.push({name: 'LonganHotelProtocolList', query: {id}});
        }
    }
}
</script>

<style lang="less" scoped>
.hotellist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

