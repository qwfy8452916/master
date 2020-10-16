<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="房间号">
                <el-input v-model="roomCode"></el-input>
            </el-form-item>
            <el-form-item label="柜子id">
                <el-input v-model="cabinetId"></el-input>
            </el-form-item>
            <el-form-item label="柜子状态">
                <el-select class="termput" v-model="defaultstatus" placeholder="请选择" @change="selectdate">
                    <el-option v-for="item in statusdata" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>

        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="repairId" label="维修单id" align=center></el-table-column>
            <el-table-column prop="roomFloor" label="酒店楼层" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="cabinetId" label="柜子id" align=center></el-table-column>
            <el-table-column prop="cabinetStatus" label="柜子状态" align=center>
                <template slot-scope="scope">
                    {{ scope.row.replaceStatus===0 ? "待处理":(scope.row.replaceStatus===1?"待取货":(scope.row.replaceStatus===2?"待更换":"已更换")) }}
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="提交时间" align=center></el-table-column>
        </el-table>
        <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    </div>
</template>

<script>
import resetButton from '@/components/resetButton';
import HotelPagination from '@/components/HotelPagination'
export default {
    name: 'replacecabinet',
    components:{
        resetButton,
        HotelPagination
    },
    data() {
        return{
            oprOgrId:"",  //标识
            roomCode:"",
            cabinetId:"",
            pageId:"",
            pageSize:10,   //每页显示条数
            CabinetList: [],
            pageTotal: 0,   //默认总条数
            currentPage: 1, //当前页码
            pageNum: 1,
            defaultstatus:"",  //状态
            statusdata:[{id:"",name:"全部"},{id:0,name:"待处理"},{id:1,name:"待取货"},{id:2,name:"待更换"},{id:3,name:"已更换"}],
        }
    },
     created() {
    //    this.oprOgrId=localStorage.orgId
       this.oprOgrId = this.$route.params.orgId;
       if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.roomCode = ''
            this.cabinetId = ''
            this.defaultstatus = ''
            this.Getdata();
        },
       selectdate(e){
        this.defaultstatus=e
      },

        //查询
        inquire(){
            let that=this;
            this.Getdata();
            this.$store.commit('setSearchList',{
                roomCode: this.roomCode,
                cabinetId: this.cabinetId,
                defaultstatus: this.defaultstatus
            })
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.Getdata();
        },
        //获取数据
        Getdata(){
            let that=this;
            let params = {
                // hotelOrgId:that.oprOgrId,
                roomCode:that.roomCode,
                cabinetId:that.cabinetId,
                replaceStatus:that.defaultstatus,
                pageNo:that.pageNum,
                pageSize:that.pageSize,
            }

            this.$api.replacecabinetcordlist({params}).then(response => {
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

