<template>
    <div class="HotelFaultManagement">
        <el-form :inline="true" align=left class="searchform">
            <div class="elform">
                <div class="elformbox">
                    <el-form-item label="柜子id">
                        <el-input v-model="cabId" @keyup.native="number"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="供电状态">
                        <el-select v-model="PowerType">
                            <el-option label="全部" value="0"></el-option>
                            <el-option label="待审核" value="1"></el-option>
                            <el-option label="驳回" value="2"></el-option>
                            <el-option label="同意" value="3"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="故障类型">
                        <el-select v-model="malType">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="item in MalTypeList"
                                :key="item.dictValue"
                                :label="item.dictName"
                                :value="item.dictValue"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="elformbox">
                    <el-form-item label="报修人">
                        <el-input v-model="malReportBy"></el-input>
                    </el-form-item>
                    <el-form-item label="处理人">
                        <el-input v-model="dealPeople"></el-input>
                    </el-form-item>
                </div>
                <div class="elformbox">
                    <el-form-item label="处理状态">
                        <el-select v-model="dealStatus">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="处理成功" value="1"></el-option>
                            <el-option label="处理失败" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <div>
                        <el-form-item>
                            <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
                        </el-form-item>
                    </div>
                </div>
                <div class="elformbox">
                    
                </div>
            </div>
        </el-form>
        <el-table :data="FaultManagementDataList" border stripe style="width:100%;" >
            <el-table-column prop="roomFloor" label="酒店楼层" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="cabId" label="柜子id" align=center></el-table-column>
            <el-table-column prop="latticeCode" label="格子编号" align=center></el-table-column>
            <el-table-column prop="malType" label="故障类型" align=center><!-- 0-初始类型; 1-扫码失败; 2-柜门不开; 3-锁具异常; 4-其他 -->
                <template slot-scope="scope">
                    <span v-if="scope.row.malType == '0'">初始类型</span>
                    <span v-else-if="scope.row.malType == '1'">扫码失败</span>
                    <span v-else-if="scope.row.malType == '2'">柜门不开</span>
                    <span v-else-if="scope.row.malType == '3'">锁具异常</span>
                    <span v-else-if="scope.row.malType == '4'">其他</span>
                </template>
            </el-table-column>
            <el-table-column prop="malReportBy" label="报修人" align=center></el-table-column>
            <el-table-column prop="createdAt" label="报修时间" align=center></el-table-column>
            <el-table-column prop="dealPeople" label="处理人" align=center></el-table-column>
            <el-table-column prop="dealAt" label="处理时间" align=center></el-table-column>
            <el-table-column prop="dealStatus" label="处理状态" align=center><!-- 0是未处理，1是处理成功；2是处理失败 -->
                <template slot-scope="scope">
                    <span v-if="scope.row.dealStatus == '0'">未处理</span>
                    <span v-else-if="scope.row.dealStatus == '1'">处理成功</span>
                    <span v-else-if="scope.row.dealStatus == '2'">处理失败</span>
                </template> 
            </el-table-column>
            <el-table-column prop="malPart" label="故障部件" align=center><!-- 0-初始类型; 1-部件1坏了; 2-部件2坏了; 3-其他 -->
                <template slot-scope="scope">
                    <span v-if="scope.row.malPart == '0'">初始类型</span>
                    <span v-else-if="scope.row.malPart == '1'">部件1坏了</span>
                    <span v-else-if="scope.row.malPart == '2'">部件2坏了</span>
                    <span v-else-if="scope.row.malPart == '3'">其他</span>
                </template>    
            </el-table-column>
            <el-table-column prop="malReason" label="故障原因" align=center><!-- 0-初始类型; 1-理由1; 2-理由2; 3-其他 -->
                <template slot-scope="scope">
                    <span v-if="scope.row.malReason == '0'">初始类型</span>
                    <span v-else-if="scope.row.malReason == '1'">理由1</span>
                    <span v-else-if="scope.row.malReason == '2'">理由2</span>
                    <span v-else-if="scope.row.malReason == '3'">其他</span>
                </template>       
            </el-table-column>
            <el-table-column prop="remark" label="备注" align=center></el-table-column>
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
    name: 'HotelFaultManagement',
    data(){
        return{
            FaultManagementDataList: [],
            MalTypeList: [],
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            HOrgId: '',
            cabId: '',
            malType: '',
            malReportBy: '',
            dealPeople: '',
            dealStatus: '',
        }
    },
    mounted(){
        // this.HOrgId=localStorage.getItem('orgId');
        // this.HOrgId = this.$route.params.orgId;
        this.GetMalTypeList();
        this.FaultManagement();
    },
    methods: {
        //故障类型
        GetMalTypeList(){
            const params2 = '';
            this.$api.FaultManagementMalType(params2)
                .then(response => {
                    const result = response.data;
                    const resultlist = result.data.malType;
                    if(result.code == '0'){
                        this.MalTypeList = resultlist;
                    }else{
                        this.$message.error('故障列表获取失败');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                });
        },
        //营收统计
        FaultManagement(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                // hOrgId : this.HOrgId,
                orgAs: 3,
                cabId: this.cabId,
                malType: this.malType,
                malReportBy: this.malReportBy,
                dealPeople: this.dealPeople,
                dealStatus: this.dealStatus,
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.FaultManagement({params})
                .then(response => {
                    const result = response.data;
                    const resultlist = result.data.records;
                    if(result.code == '0'){
                        this.FaultManagementDataList = resultlist;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('故障列表获取失败');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                });
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.FaultManagement();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.FaultManagement();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.FaultManagement();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.FaultManagement();
        },
        lookDetail(id){
            this.$router.push({name: 'HotelFaultManagementDetail', query: {id}});
        },
        DetailEdit(id){
            this.$router.push({name: 'HotelFaultManagementEdit', query: {id}});
        },
        number(){　　
    　　    this.cabId=this.cabId.replace(/[^\.\d]/g,'');
            this.cabId=this.cabId.replace('.','');
    　　}
    }
}
</script>

<style lang="less" scoped>
    .Revenue-font{
        text-align: left;
        margin-bottom: 20px;
    }
    .pagination{
        margin-top: 20px;
    }
    .elformbox{
        width: 25%;
    }
    .elform{
        display: flex;
        justify-content: flex-start;
    }
</style>

