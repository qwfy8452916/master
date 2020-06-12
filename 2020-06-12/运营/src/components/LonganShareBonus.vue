<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称">
                <el-select
                    filterable
                    remote
                    :remote-method="remoteCabType"
                    @focus="getHotelList()"
                    v-model="hotelId"
                    placeholder="请选择">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id"
                        >
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
        <div><el-button class="addbutton" @click="addNewSetting">新增酒店分销板块</el-button></div>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="hotelName" label="酒店" align=center></el-table-column>
            <el-table-column label="板块类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.modelType == 1">功能区</span>
                    <span v-if="scope.row.modelType == 2">客房协议价</span>
                    <span v-if="scope.row.modelType == 3">预售券</span>
                </template>
            </el-table-column>
            <el-table-column prop="modelName" label="板块" align=center></el-table-column>
            <el-table-column label="分享类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.shareType == 1">列表</span>
                    <span v-if="scope.row.shareType == 2">单项</span>
                    <span v-if="scope.row.shareType == 3">分类</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="分享对象" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.shareType == 1">列表</span>
                    <span v-if="scope.row.shareType == 2">单项</span>
                    <span v-if="scope.row.shareType == 3">单项</span>
                </template>
            </el-table-column> -->
            <el-table-column label="奖励类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.bonusSettingType == 1">指定分享奖励</span>
                    <span v-if="scope.row.bonusSettingType == 2">默认分享奖励</span>
                    <span v-if="scope.row.bonusSettingType == 0">无分享奖励</span>
                </template>
            </el-table-column>
            <el-table-column prop="bonusAmountFromS" label="分享奖励来源" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.bonusSettingType == 1">{{scope.row.bonusAmountFromS}}</span>
                    <span v-if="scope.row.bonusSettingType == 2">-</span>
                    <span v-if="scope.row.bonusSettingType == 0">-</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="CabinetglManager(scope.$index, CabinetList)">详情</el-button>
                    <el-button type="text" size="small" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
                    <el-button type="text" size="small" @click="Cabinetglcancel(scope.$index, CabinetList)">删除</el-button>
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

            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            pageNum: 1, //当前页码
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
        this.getHotelList()
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.hotelId = ''
            this.Getdata();
        },
        addNewSetting(){
            this.$router.push({name:'LonganShareBonusAdd'});
        },
        swichTab(value,id,index){
            let msg = value?'是否确认打开分销开关?':'是否确认关闭分销开关?'
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let status = value?1:0;
                this.$api.changeModelOnoff(status,id)
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
                            this.CabinetList[index].status = !value
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
        //查询
        inquire(){
            this.pageNum = 1
            this.Getdata();
            this.$store.commit('setSearchList',{
                hotelId: this.hotelId
            })
        },
        //修改
        Cabinetglchange(index,row){
            let guiId=row[index].id
            this.$router.push({name:'LonganShareBonusChange',query:{modifyid: guiId}});
        },
        //详情
        CabinetglManager(index,row){
            let guiId=row[index].id
            this.$router.push({name:'LonganShareBonusDetail',query:{modifyid: guiId}});
        },
        //删除
        Cabinetglcancel(index,row){
            let guiId=row[index].id;
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.delHotelShareArea(guiId).then(response => {
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
            this.getHotelList(val);
        },
         //酒店列表
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                hotelName: hName,
                pageNo: 1,
                pageSize: 50
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
            let params = {
                hotelId:  this.ifEmpty(this.hotelId),
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            }
            this.$api.getHotelShareArea({params}).then(response => {
                if(response.data.code == 0){
                    that.CabinetList = response.data.data.records;
                    that.CabinetList.forEach(item => {
                        item.status = item.status?true:false;
                    });
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
    }
}
</script>

<style lang="less" scoped>
.pagination{
    margin-top: 20px;
}
</style>

