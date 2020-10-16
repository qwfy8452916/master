<template>
    <div>
        <el-form :model="query" ref="query" :inline="true" align=left class="searchform">
            <!-- <el-form-item label="酒店" prop="inquireHotel">
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
            </el-form-item> -->
            <el-form-item label="类型" prop="cabinetType">
                <el-select class="termput" v-model="query.cabinetType" placeholder="请选择" >
                    <el-option label="全部" value=""></el-option>
                    <el-option label="实体柜" value="0"></el-option>
                    <el-option label="虚拟码" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="进场配置：" prop="meetingEnterId">
                <el-select @focus="getEnterSettings()" v-model="query.meetingEnterId" placeholder="选择进场配置">
                  <el-option v-for="item in enterSettings" :value="item.id" :label="item.settingName" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="编码" prop="qrCode">
                <el-input v-model="query.qrCode"></el-input>
            </el-form-item>
            <el-form-item label="绑定类型" prop="bindAreaFlag">
                <el-select class="termput" v-model="query.bindAreaFlag" placeholder="请选择" >
                    <el-option
                        v-for="(item,i) in funcTypeList"
                        :key="i"
                        :label="item.funcTypeName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地点" prop="roomCode">
                <el-input v-model="query.roomCode"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="defaultstatus">
                <el-select class="termput" v-model="query.defaultstatus" placeholder="请选择" @change="selectdate">
                    <el-option v-for="item in statusdata" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="物联卡" prop="IotCard">
                <el-input v-model="query.IotCard"></el-input>
            </el-form-item>
            <!-- <el-form-item label="不间断电源" prop="electricStatus">
                <el-select class="termput" v-model="query.electricStatus" placeholder="请选择" >
                    <el-option label="全部" value=""></el-option>
                    <el-option label="否" value="0"></el-option>
                    <el-option label="是" value="1"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
                <!-- <el-button class="resetbtn" type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button> -->
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div><el-button class="addbutton" @click="Cabinetgladd">新增</el-button></div>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="ID" min-width="80px" align=center></el-table-column>
            <!-- <el-table-column prop="hotelName" label="酒店" min-width="200px"></el-table-column> -->
            <el-table-column prop="isVisual" label="类型" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isVisual=='0'">实体柜</span>
                    <span v-if="scope.row.isVisual=='1'">虚拟码</span>
                </template>
            </el-table-column>
            <el-table-column prop="enterSettingName" label="进场配置" min-width="120px" align=center></el-table-column>
            <el-table-column prop="cabinetQrcode" label="编码" min-width="140px" align=center></el-table-column>
            <el-table-column prop="bindAreaFlagName" label="绑定类型" min-width="80px" align=center></el-table-column>
            <el-table-column prop="roomFloor" label="区域" min-width="80px" align=center></el-table-column>
            <el-table-column prop="roomCode" label="地点" min-width="80px" align=center></el-table-column>
            <el-table-column prop="wifiSsid" label="WiFi名称" min-width="100px"></el-table-column>
            <el-table-column prop="wifiPassword" label="WiFi密码" min-width="100px"></el-table-column>
            <el-table-column prop="cabinetStatus" label="状态" min-width="80px" align=center>
                <template slot-scope="scope">
                    {{ scope.row.cabinetStatus=='1' ? "正常":"故障" }}
                </template>
            </el-table-column>
            <el-table-column prop="cabinetIot" label="物联卡" min-width="180px" align=center></el-table-column>
            <el-table-column prop="isPowerFailure" label="不间断电源" min-width="100px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isPowerFailure=='1'">是</span>
                    <span v-if="scope.row.isPowerFailure=='0'">否</span>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="160px" align=center></el-table-column>
            <!-- <el-table-column prop="createdAt" label="添加时间" min-width="160px" align=center></el-table-column> -->
            <!-- <el-table-column prop="lastUpdatedByName" label="操作人姓名" min-width="100px"></el-table-column> -->
            <el-table-column fixed="right" label="操作" min-width="140px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="Cabinetgldetail(scope.$index, CabinetList)">详情</el-button>
                    <el-button v-if="authzData['F:BH_CAB_CABINETGLALTER']" type="text" size="small" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
                    <!-- <el-button type="text" size="small" @click="Cabinetgldelete(scope.$index, CabinetList)">删除</el-button> -->
                    <el-button type="text" size="small" @click="Cabinetgllook(scope.$index, CabinetList)">查看二维码</el-button>
                    <el-button type="text" v-if="authzData['F:BH_CAB_CABINETGL_DETAIL'] && scope.row.cabType!='02' && scope.row.isVisual!='1'" size="small" @click="Cabinetgllooks(scope.$index, CabinetList)">查看商品信息</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog 
        :visible.sync="dialogVisible"
        :before-close="canceldialogVisible"
        title="查看二维码"
        width="30%">
            <div class="imagelist">
                <!-- <el-image 
                    class='uploadImg'
                    v-for="(item,index) in virtuaQrcodel"
                    :key="index"
                    :src="item.qrValue" 
                    :preview-src-list="virtuaQrcodel.map(item => {return item.qrValue})">
                <div class="imagename">{{item.qrName}}</div>
                </el-image> -->
                <div 
                v-for="(item,index) in virtuaQrcodel"
                :key="index" 
                >
                    <vue-qr class="ScanImg" :text="item.qrValue" :size="200"></vue-qr>
                    <p>{{item.qrName}}</p>
                </div>
            </div>
        </el-dialog>
        <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    </div>
</template>

<script>
import resetButton from '@/components/resetButton'
import vueQr from 'vue-qr'
import HotelPagination from '@/components/HotelPagination'
export default {
    name: 'Cabinetgl',
    components:{
        HotelPagination,
        resetButton,
        vueQr
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
              bindAreaFlag:'',
              meetingEnterId:""
            },
            dialogVisible:false,
            enterSettings:[],
            virtuaQrcodel:[],
            funcTypeList:[],
            hotelList:[],  //酒店数据
            loadingH: false,
            pageId:"",
            CabinetList: [],
            modifyid:'' ,  //柜子id
            pageTotal: 0,
            pageSize: 10,
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
        this.query.inquireHotel = localStorage.getItem('hotelId')
        // this.getHotelList();
        this.getEnterSettings();
        this.basicDataItems_bindType();
        this.Getdata()
    },
    methods: {
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.Getdata();
        },
        resetFunc(){
            // this.query.inquireHotel = ''
            this.query.roomCode = ''
            this.query.IotCard = ''
            this.query.qrCode = ''
            this.query.defaultstatus = ''
            this.query.bindAreaFlag = ''
            this.query.meetingEnterId = ''
            this.query.cabinetType = ''
            // this.query.electricStatus = ''
            this.Getdata();
        },
        selectdate(e){
            this.defaultstatus=e
        },

        //重置
        resetbtn(query){
            this.$refs[query].resetFields();
        },
        //获取类型 - 字典表
        basicDataItems_bindType() {
        const params = {
            key: "BIND_AREA_FLAG",
            orgId: "0",
            parentKey: "",
            parentValue: "",
        };
        this.$api
            .basicDataItems(params)
            .then((response) => {
            const result = response.data;
            if (result.code == 0) {
                if (result.data.length != 0) {
                    this.funcTypeList = result.data.map((item) => {
                        return {
                        id: item.dictValue,
                        funcTypeName: item.dictName,
                        };
                    });
                    const hotelAll = {
                        id: '',
                        funcTypeName: '全部'
                    };
                    this.funcTypeList.unshift(hotelAll);
                }
            } else {
                this.$message.error(result.msg);
                }
            })
                .catch((error) => {
                this.$alert(error, "警告", {
                    confirmButtonText: "确定",
                });
            });
        },

        getEnterSettings(){
            let params = {
                all: 1,
                hotelId : this.query.inquireHotel
            };
            this.$api.getCabinetConfig(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.enterSettings = result.data
                        const hotelAll = {
                            id: '',
                            settingName: '全部'
                        };
                        this.enterSettings.unshift(hotelAll);
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
        //查询
        inquire(){
          let that=this;
           this.pageNum=1;
           this.currentPage=1;
           this.Getdata();
           this.$store.commit('setSearchList',{
                // inquireHotel: this.query.inquireHotel,
                roomCode: this.query.roomCode,
                IotCard: this.query.IotCard,
                qrCode: this.query.qrCode,
                defaultstatus: this.query.defaultstatus,
                cabinetType: this.query.cabinetType,
                bindAreaFlag: this.query.bindAreaFlag,
                enterSettingId: this.query.meetingEnterId,
                // electricStatus: this.query.electricStatus
            })
        },
        //新增
        Cabinetgladd(index,row){
            this.$router.push({name:'CabinetAdd'});
        },
        //删除
        Cabinetgldelete(index,row){
            let guiId=row[index].id;
            this.$confirm('是否确认删除该柜子?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.deleteCabinet(guiId).then(response => {
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
        //修改
        Cabinetglchange(index,row){
            let modifyid=row[index]
            this.query.currentPage=this.currentPage
            let query=this.query
            this.$router.push({name:'Cabinetchange',query:{modifyid,query}});
        },
        //详情
        Cabinetgldetail(index,row){
            let modifyid=row[index]
            this.query.currentPage=this.currentPage
            let query=this.query
            this.$router.push({name:'CabinetDetail',query:{modifyid,query}});
        },
        canceldialogVisible(){
            this.virtuaQrcodel = []
            this.dialogVisible = false
        },
        //查看
        Cabinetgllook(index,row){
            let modifyid=row[index].id
            this.$api.virtuaQrcodel({id: modifyid})
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.dialogVisible = true
                        this.virtuaQrcodel = result.data
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
        Cabinetgllooks(index,row){
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

        //获取数据
        Getdata(){
            let that=this;
            let params = {
                // encryptedOrgId:that.oprOgrId,
                orgAs:2,
                pageNo:that.pageNum,
                pageSize:that.pageSize,

                cabinetQrcode :that.query.qrCode,
                cabinetIot:that.query.IotCard,
                hotelId:that.query.inquireHotel,
                roomCode :that.query.roomCode,
                cabinetStatus:that.query.defaultstatus,
                enterSettingId:that.query.meetingEnterId,
                isVisual:that.query.cabinetType,
                bindAreaFlag:that.query.bindAreaFlag,
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
.imagelist{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.resetbtn.el-button--primary{
    background-color: #71a8e0;
    border-color: #71a8e0;
}
</style>

