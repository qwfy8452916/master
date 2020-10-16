<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="功能区">
                <el-select v-model="funcId" placeholder="选择功能区">
                <el-option v-for="item in funcList" :value="item.id" :label="item.label" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关联酒店">
                <el-select v-model="relateHotelId" placeholder="选择关联酒店">
                <el-option v-for="item in relateHotelList" :value="item.id" :label="item.label" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div>
            <el-button class="addbutton" @click="addNewSetting">新&nbsp;&nbsp;增</el-button>
        </div>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="ID" align=center></el-table-column>
            <el-table-column prop="sort" label="排序" align=center></el-table-column>
            <el-table-column prop="hotelFuncName" label="功能区" align=center></el-table-column>
            <el-table-column prop="hotelRelationDTO.relateHotelName" label="关联酒店" align=center></el-table-column>
            <el-table-column prop="createrName" label="添加人" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="viewDetail(scope.$index, CabinetList)">详情</el-button>
                    <el-button type="text" size="small" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
                    <el-button type="text" size="small" @click="Cabinetglcancel(scope.$index, CabinetList)">移除</el-button>
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
                :current-page.sync="pageNum"
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
    name: 'LaunchCabinetManagement',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            loadingH: false,
            CabinetList:[],
            relateHotelId:'',
            relateHotelList:[],
            funcId:'',
            funcList:'',
            
            hotelId:'',
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            pageNum: 1, //当前页码
        }
    },
    created() {
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    mounted(){
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.hotelId = localStorage.getItem('hotelId');
        this.hotelFunctionList()
        this.relateHotel()
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.relateHotelId = ''
            this.funcId = ''
            this.Getdata();
        },
        hotelFunctionList(){
            const params = {
                hotelId: this.hotelId,
                funcType: 7,
            }
            this.$api.getFuncType({params}).then(response => {
                if(response.data.code==0){
                    let recordsData = response.data.data;
                    let areaList = recordsData.map(item=>{
                        return {
                            label: item.funcCnName,
                            id: item.id,
                        }
                    })
                    areaList.unshift({
                        label:'全部',
                        id:""
                    })
                    this.funcList = areaList;
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
        relateHotel(){
            const params = {
                hotelId: this.hotelId,
                pageNo:1,
                pageSize:50,
            }
            this.$api.getRelateHotel({params}).then(response => {
                if(response.data.code==0){
                    let recordsData = response.data.data.records;
                    let areaList = recordsData.map(item=>{
                        return {
                            label: item.relateHotelName,
                            id: item.id,
                        }
                    })
                    areaList.unshift({
                        label:'全部',
                        id:""
                    })
                    this.relateHotelList = areaList;
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
        
        //查询
        inquire(){
            this.pageNum = 1
            this.Getdata();
            this.$store.commit('setSearchList',{
                relateHotelId: this.relateHotelId,
                funcId: this.funcId,
            })
        },
        addNewSetting(){
            this.$router.push({name:'HotelFunctionLeadAdd'});
        },
        //修改
        Cabinetglchange(index,row){
            let guiId=row[index].id
            this.$router.push({name:'HotelFunctionLeadChange',query:{modifyid: guiId}});
        },
        //查看详情
        viewDetail(index,row){
            let guiId=row[index].id
            this.$router.push({name:'HotelFunctionLeadDetail',query:{modifyid: guiId}});
        },
        //删除
        Cabinetglcancel(index,row){
            let guiId=row[index].id;
            this.$confirm('是否确认移除该导航?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.deleteHotelGuidance(guiId).then(response => {
                    if(response.data.code == 0){
                        this.$message.success("操作成功");
                        this.Getdata();
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
                    message: '已取消删除'
                });          
            });
        },
        //当前页码
        current(){
            // this.pageNum = this.currentPage;
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
        //获取数据
        Getdata(){ 
            let that=this;
            let params = {
                relateId: this.relateHotelId,
                hotelId: this.hotelId,
                funcId: this.funcId,
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            }
            this.$api.getHotelGuidance({params}).then(response => {
                if(response.data.code == 0){
                    that.CabinetList = response.data.data.records;
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

