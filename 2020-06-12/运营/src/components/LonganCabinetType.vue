<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="类型名称">
                <el-input v-model="cabinetType" placeholder="输入类型名称"></el-input>
            </el-form-item>
            <el-form-item label="格子数">
                <el-input v-model.number="cellNum" type="number" placeholder="输入格子数"></el-input>
            </el-form-item>         
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div v-if="authzData['F:BO_FS_CABTYPE_ADD']"><el-button class="addbutton" @click="addNewSetting">新增柜子类型</el-button></div>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="typeName" label="类型名称" align=center></el-table-column>
            <el-table-column prop="latticeCount" label="格子数" align=center></el-table-column>
            <el-table-column prop="redPacketAmout" label="红包金额" align=center></el-table-column>
            <el-table-column prop="redPacketMinCount" label="最小红包数量" align=center></el-table-column>
            <el-table-column prop="redPacketMaxCount" label="最大红包数量" align=center></el-table-column>
            <el-table-column prop="shareBonus" label="分享奖励金额" align=center></el-table-column>
            <el-table-column prop="specialEnvoyBonus" label="特使奖励金额" align=center></el-table-column>
            <el-table-column prop="rent" label="租金" align=center></el-table-column>
            <el-table-column prop="serviceFee" label="技术服务费" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_FS_CABTYPE_EDIT']" type="text" size="small" @click="CabinetTypechange(scope.$index, CabinetList)">修改</el-button>
                    <el-button v-if="authzData['F:BO_FS_CABTYPE_DELETE']" type="text" size="small" @click="CabinetTypedelete(scope.$index, CabinetList)">删除</el-button>
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
            cabinetType:'',
            cellNum:'',

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
            this.cabinetType = ''
            this.cellNum = ''
            this.Getdata();
        },
        //查询
        inquire(){
            this.Getdata();
            this.$store.commit('setSearchList',{
                cabinetType: this.cabinetType,
                cellNum:this.cellNum
            })
        },
        //新增
        addNewSetting(){
            this.$router.push({name:'LonganCabinetTypeAdd'});
        },
        //修改
        CabinetTypechange(index,row){
            let guiId=row[index].id
            this.$router.push({name:'LonganCabinetTypeChange',query:{modifyid: guiId}});
        },
        //删除
        CabinetTypedelete(index,row){
            let guiId=row[index].id
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.FsCabinetTypeDelete(guiId).then(response => {
                    if(response.data.code == 0){
                        this.$message.success("操作成功");
                        this.Getdata();
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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
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
                latticeCount: this.ifEmpty(this.cellNum),
                typeName : this.ifEmpty(this.cabinetType),
                pageNo: this.pageNum,
                pageSize: this.pageSize
            }
            this.$api.FsCabinetTypeGet({params}).then(response => {
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

