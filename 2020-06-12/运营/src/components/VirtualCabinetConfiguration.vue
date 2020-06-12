<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="柜子类型：" prop="cabTypeId">
                <el-select
                    v-model="cabTypeId"
                    filterable
                    remote
                    :remote-method="remoteCabType"
                    :loading="loadingH"
                    @focus="getCabTypeList()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in cabTypeList"
                        :key="item.id"
                        :label="item.cabTypeName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酒店名称">
                <el-select
                    v-model="inquireHotel"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div><el-button class="addbutton" @click="addNewSetting">新&nbsp;&nbsp;增</el-button></div>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="settingName" label="配置名称" align=center></el-table-column>
            <el-table-column prop="cabTypeName" label="柜子类型" align=center></el-table-column>
            <el-table-column label="类型默认配置" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isDefault == 0">否</span>
                    <span v-if="scope.row.isDefault == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column label="支持默认开放功能区" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.availableFuncSupport == 0">否</span>
                    <span v-if="scope.row.availableFuncSupport == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" prop="" width="160px" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="CabinetglDetail(scope.$index, CabinetList)">详情</el-button>
                    <el-button v-if="authzData['F:BO_CAB_CAB_EDIT']" type="text" size="small" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
                    <el-button type="text" v-if="authzData['F:BO_CAB_CAB_VIEW']" size="small" @click="Cabinetglcancel(scope.$index, CabinetList)">删除</el-button>
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
    name: 'VirtualCabinetConfiguration',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            CabinetList:[],
            settingName: '',
            hotelList:[],  //酒店数据
            cabTypeList:[],  //酒店数据
            inquireHotel: undefined,  //酒店id
            cabTypeId: undefined,  //酒店id
            loadingH: false,
            pageId:"",
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            currentPage: 1, //当前页码
            pageNum: 1,
        }
    },
    created() {
    //    this.oprOgrId=localStorage.orgId
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    mounted(){
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getCabTypeList();
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.inquireHotel = ''
            this.cabTypeId = ''
            this.Getdata();
        },
        //查询
        inquire(){
            let that=this;
            this.Getdata();
            this.$store.commit('setSearchList',{
                inquireHotel: this.inquireHotel,
                cabTypeId:this.cabTypeId
            })
        },
        addNewSetting(){
            this.$router.push({name:'VirtualCabinetAdd'});
        },
        //详情
        CabinetglDetail(index,row){
            let guiId=row[index].id
            this.$router.push({name:'VirtualCabinetDetail',query:{modifyid: guiId}});
        },
        //修改
        Cabinetglchange(index,row){
            let guiId=row[index].id
            this.$router.push({name:'VirtualCabinetChange',query:{modifyid: guiId}});
        },
        //删除
        Cabinetglcancel(index,row){
            let guiId=row[index].id;
            let that = this
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.delenterCabConf(guiId).then(response => {
                    if(response.data.code == 0){
                        this.$message.success("操作成功");
                        this.Getdata();
                    }else{
                        that.$alert(response.data.msg,"警告",{
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
        //酒店列表
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                hotelName: hName,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            this.$api.hotelList(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName
                            }
                        })
                        const hotelAll = {
                            id: '',
                            hotelName: '全部'
                        };
                        this.hotelList.unshift(hotelAll);
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
        remoteHotel(val){
            this.getHotelList(val);
        },

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
        //获取数据
        Getdata(){ 
            let that=this;
            let params = {
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            };
            if(this.inquireHotel != ''){
                params.hotelId = this.inquireHotel;
            }
            if(this.cabTypeId != ''){
                params.cabTypeId = this.cabTypeId;
            }
            this.$api.selenterCabConf({params}).then(response => {
                if(response.data.code == 0){
                    that.CabinetList = response.data.data.records;
                    that.pageTotal = response.data.data.total
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
        },
         //柜子列表
        getCabTypeList(hName){
            this.loadingH = true;
            const params = {
                pageNo:1,
                pageSize:50,
                cabTypeName:hName,
            };
            this.$api.CabinetType(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.cabTypeList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                cabTypeName: item.cabTypeName
                            }
                        })
                        const hotelAll = {
                            id: '',
                            cabTypeName: '全部'
                        };
                        this.cabTypeList.unshift(hotelAll);
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
        remoteCabType(val){
            this.getCabTypeList(val);
        },   
    }
}
</script>

<style lang="less" scoped>
.pagination{
    margin-top: 20px;
}
</style>

