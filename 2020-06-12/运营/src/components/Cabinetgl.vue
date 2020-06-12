<template>
    <div>
        <el-form :model="query" ref="query" :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称" prop="inquireHotel">
                <el-select
                    v-model="query.inquireHotel"
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
            <el-form-item label="房间号" prop="roomCode">
                <el-input v-model="query.roomCode"></el-input>
            </el-form-item>
            <el-form-item label="物联卡" prop="IotCard">
                <el-input v-model="query.IotCard"></el-input>
            </el-form-item>
            <el-form-item label="物理编码" prop="qrCode">
                <el-input v-model="query.qrCode"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="defaultstatus">
                <el-select class="termput" v-model="query.defaultstatus" placeholder="请选择" @change="selectdate">
                    <el-option v-for="item in statusdata" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="cabinetType">
                <el-select class="termput" v-model="query.cabinetType" placeholder="请选择" >
                    <el-option label="全部" value=""></el-option>
                    <el-option label="实体柜" value="0"></el-option>
                    <el-option label="虚拟柜" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="不间断电源" prop="electricStatus">
                <el-select class="termput" v-model="query.electricStatus" placeholder="请选择" >
                    <el-option label="全部" value=""></el-option>
                    <el-option label="否" value="0"></el-option>
                    <el-option label="是" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
                <!-- <el-button class="resetbtn" type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button> -->
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>

        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="柜子id" width="80px" align=center></el-table-column>
            <el-table-column prop="cabinetIot" label="物联卡" width="80px" align=center></el-table-column>
            <el-table-column prop="cabinetQrcode" label="物理编码" align=center></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="roomFloor" label="酒店楼层" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" width="160px" align=center></el-table-column>
            <el-table-column prop="cabinetStatus" label="状态" align=center>
                <template slot-scope="scope">
                    {{ scope.row.cabinetStatus=='1' ? "正常":"故障" }}
                </template>
            </el-table-column>
            <el-table-column prop="isVisual" label="类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isVisual=='0'">实体柜</span>
                    <span v-if="scope.row.isVisual=='1'">虚拟柜</span>
                </template>
            </el-table-column>
            <el-table-column prop="enterSettingName" label="进场配置名称" align=center></el-table-column>
            <el-table-column prop="isPowerFailure" label="不间断电源" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isPowerFailure=='1'">是</span>
                    <span v-if="scope.row.isPowerFailure=='0'">否</span>
                </template>
            </el-table-column>
            <el-table-column prop="wifiSsid" label="WiFi名称" align=center></el-table-column>
            <el-table-column prop="wifiPassword" label="WiFi密码" align=center></el-table-column>
            <el-table-column prop="lastUpdatedByName" label="操作人姓名" align=center></el-table-column>
            <el-table-column fixed="right" prop="" width="160px" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_CAB_CAB_EDIT']" type="text" size="small" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
                    <el-button type="text" v-if="authzData['F:BO_CAB_CAB_VIEW'] && scope.row.cabType!='02' && scope.row.isVisual!='1'" size="small" @click="Cabinetgllook(scope.$index, CabinetList)">查看商品信息</el-button>
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
    name: 'Cabinetgl',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            oprOgrId:"",  //标识
            query:{
              qrCode:"",    //柜子二维码
              IotCard:"",   //柜子物联卡
              inquireHotel:"",  //酒店id
              roomCode:"",
              defaultstatus:"",  //状态
              cabinetType:"",  //柜子类型
              electricStatus:"",  //柜子断电状态
              currentPage:'',
            },


            hotelList:[],  //酒店数据
            loadingH: false,
            pageId:"",
            pageSize:10,   //每页显示条数
            CabinetList: [],
            modifyid:'' ,  //柜子id
            pageTotal: 1,   //默认总条数
            currentPage: 1, //当前页码
            pageNum: 1,
            statusdata:[{id:"",name:"全部"},{id:1,name:"正常"},{id:2,name:"异常"}],
        }
    },
    created() {

        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.oprOgrId = this.$route.params.orgId;

        if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.currentPage=this.$route.query.query.currentPage
        }
    },
    mounted(){

        if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.query=this.$route.query.query;
            this.pageNum=this.$route.query.query.currentPage
        }
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this.query[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.query.inquireHotel = ''
            this.query.roomCode = ''
            this.query.IotCard = ''
            this.query.qrCode = ''
            this.query.defaultstatus = ''
            this.query.cabinetType = ''
            this.query.electricStatus = ''
            this.Getdata();
        },
        selectdate(e){
            this.defaultstatus=e
        },

        //重置
        resetbtn(query){
            this.$refs[query].resetFields();
        },

        //查询
        inquire(){
          let that=this;
           this.pageNum=1;
           this.currentPage=1;
           this.Getdata();
           this.$store.commit('setSearchList',{
                inquireHotel: this.query.inquireHotel,
                roomCode: this.query.roomCode,
                IotCard: this.query.IotCard,
                qrCode: this.query.qrCode,
                defaultstatus: this.query.defaultstatus,
                cabinetType: this.query.cabinetType,
                electricStatus: this.query.electricStatus
            })
        },
        //修改
        Cabinetglchange(index,row){
            let modifyid=row[index]
            this.query.currentPage=this.currentPage
            let query=this.query
            this.$router.push({name:'Cabinetchange',query:{modifyid,query}});
        },
        //查看
        Cabinetgllook(index,row){
            let modifyid=row[index].id
            this.query.currentPage=this.currentPage
            let query=this.query
            this.$router.push({name:'Cabinetlook',query:{modifyid,query}});
        },

        updateStatus(id,value){
           console.log(id)
           console.log(value)
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
                // encryptedOrgId:that.oprOgrId,
                orgAs:2,
                cabinetQrcode :that.query.qrCode,
                cabinetIot:that.query.IotCard,
                hotelId:that.query.inquireHotel,
                pageNo:that.pageNum,
                pageSize:that.pageSize,
                roomCode :that.query.roomCode,
                cabinetStatus:that.query.defaultstatus,
                isVisual:that.query.cabinetType,
                isPowerFailure:that.query.electricStatus,
            }

            this.$api.CabinetGl({params}).then(response => {
                    if(response.data.code == 0){
                        that.pageTotal=response.data.data.total
                        that.CabinetList=response.data.data.records
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
.resetbtn.el-button--primary{
    background-color: #71a8e0;
    border-color: #71a8e0;
}
</style>

