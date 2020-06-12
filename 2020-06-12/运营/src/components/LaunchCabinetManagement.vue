<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称">
                <el-select
                    v-model="hotelId"
                    placeholder="请选择">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="柜子类型名称">
                <el-select 
                    v-model="typeName"
                    filterable
                    remote
                    :remote-method="remoteCabType"
                    @focus="getCabTypeList()"
                    placeholder="请选择">
                    <el-option v-for="item in cabTypeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label='状态'>
                <el-select
                    v-model="status"
                    :loading="loadingH"
                    placeholder="请选择">
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="绑定人">
                <el-input v-model="bindingPeople" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="首发时间">
                <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    value-format='yyyy-MM-dd HH:mm:ss'
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
        <div v-if="authzData['F:BO_FS_CAB_ADD']"><el-button class="addbutton" @click="addNewSetting">新增投放柜子</el-button></div>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="cabTypeName" label="类型名称" align=center></el-table-column>
            <el-table-column prop="hotelCabNum" label="柜子编号" align=center></el-table-column>
            <el-table-column prop="status" label="状态" align=center></el-table-column>
            <el-table-column prop="hitRate" label="抽中概率" align=center></el-table-column>
            <el-table-column label="创建时间" align=center>
                <template slot-scope="scope">
                    {{scope.row.createdAt=='1970-01-01 00:00:00'?'-':scope.row.createdAt}}
                </template>
            </el-table-column>
            <el-table-column label="首发时间" align=center>
                <template slot-scope="scope">
                    {{scope.row.launchTime=='1970-01-01 00:00:00'?'-':scope.row.launchTime}}
                </template>
            </el-table-column>
            <el-table-column prop="bindingPeopleName" label="绑定人" align=center>
                <template slot-scope="scope">
                    {{scope.row.bindingPeopleName== null?'-':scope.row.bindingPeopleName}}
                </template>
            </el-table-column>
            <el-table-column label="绑定时间" align=center>
                <template slot-scope="scope">
                    {{scope.row.bindingTime=='1970-01-01 00:00:00'?'-':scope.row.bindingTime}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" v-if="authzData['F:BO_FS_CAB_EDIT'] && scope.row.status=='未绑定'" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
                    <el-button v-if="authzData['F:BO_FS_CAB_DELETE']" type="text" size="small" @click="Cabinetglcancel(scope.$index, CabinetList)">删除</el-button>
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
            CabinetList:[],
            loadingH: false,
            hotelId:'',
            hotelList:[],
            status:'',
            cabTypeList:[],
            bindingPeople:'',
            typeName:'',
            dateRange:[],
            statusList:[
                {
                    label:'全部',
                    value:''
                },
                {
                    label:'未绑定',
                    value:0
                },
                {
                    label:'已绑定',
                    value:1
                },
            ],
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            pageNum: 1, //当前页码
        }
    },
    created() {
    //    this.oprOgrId=localStorage.orgId
        this.getHotelList();
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.oprOgrId = this.$route.params.orgId;
        this.hotelId = this.$route.query.modifyid;
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
            this.hotelId = ''
            this.typeName = ''
            this.status = ''
            this.bindingPeople = ''
            this.dateRange = []
            this.Getdata();
        },
        //查询
        inquire(){
            this.pageNum = 1
            this.Getdata();
            this.$store.commit('setSearchList',{
                hotelId: this.hotelId,
                typeName: this.typeName,
                status: this.status,
                bindingPeople: this.bindingPeople,
                dateRange:this.dateRange
            })
        },
        addNewSetting(){
            this.$router.push({name:'LaunchCabinetAdd'});
        },
        //修改
        Cabinetglchange(index,row){
            let guiId=row[index].id
            this.$router.push({name:'LaunchCabinetChange',query:{modifyid: guiId}});
        },
        
        //删除
        Cabinetglcancel(index,row){
            let guiId=row[index].id;
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.FsCabinetDelete(guiId).then(response => {
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
        remoteCabType(val){
            this.getCabTypeList(val);
        },
         //柜子类型列表
        getCabTypeList(ctName){
            const params = {};
            this.$api.getCabTypeList(params)
            .then(response => {
                const result = response.data;
                if(result.code == 0){
                    if(result.data.length != 0){
                        this.cabTypeList = result.data.map(item => {
                            return{
                                id: item.id,
                                typeName: item.typeName 
                            }
                        })
                    }
                    const cabTypeAll = {
                        id: '',
                        typeName : '全部'
                    };
                    this.cabTypeList.unshift(cabTypeAll);
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
        ifEmpty(item){
            if(item === ''){
                return undefined;
            }else{
                return item;
            }
        },
        Getdata(){ 
            let that=this;
            let statusRule = {
                0:'未绑定',
                1:'已绑定',
            }
            let params = {
                hotelId: this.ifEmpty(this.hotelId),
                bindingPeople:  this.ifEmpty(this.bindingPeople),
                status:  this.ifEmpty(this.status),
                launchTimeFrom: this.dateRange == null ? undefined : this.dateRange[0],
                launchTimeTo: this.dateRange == null ? undefined : this.dateRange[1], 
                pageNo: this.pageNum,
                pageSize: this.pageSize,
                typeId: this.ifEmpty(this.typeName)
            }
            this.$api.FsCabinetSearch({params}).then(response => {
                if(response.data.code == 0){
                    that.CabinetList = response.data.data.records;
                    that.CabinetList.forEach(item => {
                        if(item.bindingPeople == 0){
                            item.bindingPeople = '无';
                        }
                        item.status = statusRule[item.status];
                    })
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
        },
        //获取酒店列表
        getHotelList(){
            this.$api.FsHotelAll({}).then(response => {
                if(response.data.code == 0){
                    this.hotelList = response.data.data.map(item => {
                        return {
                            label: item.hotelName,
                            id: item.id
                        }
                    })
                    let alldata = {
                        id:'',
                        label:'全部'
                    }
                    this.hotelList.unshift(alldata);
                }else{
                    this.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
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

