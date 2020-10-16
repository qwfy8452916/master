
<template>
  <div class="CabTypeListAdds">
     <p class="title">单位房源协议价详情</p>
     <el-form :disabled="true" align="left" :model="enterprisesData" label-width="120px" :rules="rules" ref="enterprisesData">
         <el-form-item label="协议单位" prop="contractedEnterprisesId">
            <el-select
                :disabled="true"
                v-model="enterprisesData.contractedEnterprisesId"
                placeholder="请选择协议">
                <el-option
                    v-for="item in EnterprisesList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                    >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="房源" prop="totalRoomFlag">
            <el-radio-group v-model="enterprisesData.totalRoomFlag" style="margin-top:12px;">
                <div>
                    <el-radio :label="1" style="margin-right:10px">全部房源</el-radio>
                </div>
                <div style="margin-bottom:20px;margin-top:10px;">
                    <el-radio :label="0">部分房源</el-radio>
                    <el-button type="text" size="small" @click="chooseRoom()">选择</el-button>
                    <el-table :data="roomsChooseList" border style="width:600px">
                        <el-table-column label="房型" prop="roomTypeName" align="center"></el-table-column>
                        <el-table-column label="房源" prop="resourceName" align="center"></el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="deleteRooms(scope.$index,1)">移除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="价格类型" prop="contractedPriceType">
            <el-radio-group v-model="enterprisesData.contractedPriceType">
                <div style="margin-top:10px;">
                    <el-radio :label="1">折扣</el-radio>
                    <el-form-item style="height:60px;" prop="contractedPrice1">
                        <el-input style="width:140px;" v-model.trim="contractedPrice1"></el-input><span>&nbsp;%</span>
                    </el-form-item>
                </div>
                <div>
                    <el-radio :label="2" style="margin-right:10px">固定金额</el-radio>
                    <el-form-item style="height:60px;" prop="contractedPrice2">
                        <el-input style="width:140px;" v-model.trim="contractedPrice2"></el-input><span>&nbsp;元</span>
                    </el-form-item>
                </div>
            </el-radio-group>
        </el-form-item>
        <el-dialog 
        :visible.sync="dialogVisible4"
        :before-close="cancelRooms"
         title="选择房源"
         width="500px">
            <div class="chooseTable">
                <el-table border stripe
                style="width:100%;" 
                :data="searchRoomsList"
                ref="multipleTable1"
                @selection-change="handleSelectionChange1">
                    <el-table-column
                        type="selection"
                        :selectable="checkSelectable1"
                        width="55">
                    </el-table-column>
                    <el-table-column label="房型" prop="roomTypeName" align="center"></el-table-column>
                    <el-table-column label="房源" prop="resourceName" align="center"></el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next, jumper"
                        :pager-count="5"
                        :page-size="pageSize1"
                        :total="pageTotal1"
                        :current-page.sync="pageNum1"
                        @current-change = "current1"
                        @prev-click="prev1"
                        @next-click="next1">
                    </el-pagination>
                </div>
            </div>
            <div class="operate">
                <el-button type="none" @click="cancelRooms()">取消</el-button>
                <el-button type="primary" @click="ensureRooms()">确定</el-button>
            </div>
        </el-dialog>
     </el-form>
     <div style="margin-left:120px;text-align:left">
        <el-button @click="cancelBtn">返回</el-button>
    </div>
  </div>
</template>

<script>
  export default{
    name:'HotelEnterprisesRoomsDetail',
    data(){
      var totalRoomFlag = (rule, value, callback) => {
        if(value === 0 && this.roomsChooseList.length == 0){
            callback(new Error('请至少选择一个房源'));
        }else{
            callback();
        }
      }
      var contractedPrice1 = (rule, value, callback) => {
        if(this.enterprisesData.contractedPriceType == 1 && !/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(this.contractedPrice1)){
            callback(new Error('请规范填写折扣'));
        }else{
            callback();
        }
      }
      var contractedPrice2 = (rule, value, callback) => {
        if(this.enterprisesData.contractedPriceType == 2 && !/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(this.contractedPrice2)){
            callback(new Error('请规范填写金额'));
        }else{
            callback();
        }
      }
      return {
        authzData:'',
        enterprisesData:{
            contractedEnterprisesId:"",
            totalRoomFlag:"",
            contractedPriceType:"",
            contractedPrice:"",
        },
        contractedPrice1:'',
        contractedPrice2:'',
        dialogVisible4:false,
        searchRoomsList:[],
        roomsChooseList:[],
        EnterprisesList:[],
        hotelSelection:[],
        pageSize1:10,   //每页显示条数
        pageTotal1: 1,   //默认总条数
        pageNum1: 1, //当前页码
        hotelId:"",
        modifyid:"",
        rules:{
            contractedEnterprisesId:[{required:true,message:"请选择协议单位",trigger:"change"}],
            totalRoomFlag:[{required:true,message:"请选择房源",trigger:"change"},{validator: totalRoomFlag,trigger: 'blur'}],
            contractedPriceType:[{required:true,message:"请选择价格类型",trigger:"change"}],
            contractedPrice1:[{validator: contractedPrice1,trigger: 'blur'}],
            contractedPrice2:[{validator: contractedPrice2,trigger: 'blur'}],
        },

      }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hotelId = localStorage.getItem('hotelId');
        this.modifyid = this.$route.query.modifyid;
        this.getEnterprises()
        this.getFillbackData();
    },
    methods:{
        getFillbackData(){
            this.$api.getOneEnterprisesRooms(this.modifyid).then(response => {
                if(response.data.code == 0){
                    this.enterprisesData = {
                        contractedEnterprisesId:response.data.data.contractedEnterprisesId,
                        totalRoomFlag:response.data.data.totalRoomFlag,
                        contractedPriceType:response.data.data.contractedPriceType,
                    }
                    if(response.data.data.contractedPriceType == 1){
                        this.contractedPrice1 = response.data.data.contractedPrice
                    }else if(response.data.data.contractedPriceType == 2){
                        this.contractedPrice2 = response.data.data.contractedPrice
                    }
                    this.roomsChooseList = response.data.data.roomResourceIds
                    this.roomsChooseList.forEach(item => {
                        item.resourceName = item.roomResourceName
                        item.id = item.roomResourceId
                    })
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
        },
        //取消
        cancelBtn(){
            this.$router.push({name:'HotelEnterprisesRoomsList'})
        },
        //确认房源
        ensureRooms(){
            let hotelSelections = this.hotelSelection
            this.roomsChooseList = this.roomsChooseList.concat(hotelSelections)
            // this.$refs['enterprisesData'].validate();
            this.cancelRooms()
        },
        //检查是否已选中
        checkSelectable1(row,index){
            let flag = true;
            this.roomsChooseList.forEach(item => {
                if(item.id == row.id){
                    flag = false
                }
            })
            return flag
        },
        handleSelectionChange1(val) {
            console.log(val)
            this.hotelSelection = val;
        },
        chooseRoom(type){
            this.dialogVisible4 = true
            this.getRoomList()
        },
        deleteRooms(index,type){
            this.roomsChooseList.splice(index,1)
        },
        //获取数据
        getEnterprises(){ 
            let that=this;
            let params = {
                hotelId: this.hotelId,
                pageNo: 1,
                pageSize: 50,
            }
            this.$api.getEnterprises({params}).then(response => {
                if(response.data.code == 0){
                    that.EnterprisesList = response.data.data.records.map(item => {
                        return {
                            id:item.id,
                            label:item.enterpiseName
                        }
                    })
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
        //房源列表
        getRoomList(){
            const params = {
                hotelId: this.hotelId,
                orgAs: 3,
                pageSize: this.pageSize1,
                pageNo: this.pageNum1,
            };
            this.$api.bookResourceList(params).then(response=>{
                if(response.data.code=='0'){
                    this.searchRoomsList = response.data.data.records
                    this.pageTotal1 = response.data.data.total;
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText:"确定"
                    })
                }
            }).catch(error=>{
                    this.$alert(error,"警告",{
                    confirmButtonText:"确定"
                })
            })
        },
        cancelRooms(){
            this.dialogVisible4 = false
            this.searchRoomsList = []
        },
        //上一页
        prev1(){
            this.pageNum1 = this.pageNum1 - 1;
            this.getRoomList();
        },
        //下一页
        next1(){
            this.pageNum1 = this.pageNum1 + 1;
            this.getRoomList();
        },
        //当前页码
        current1(){
            this.getRoomList();
        },
        //确定
        sureBtn(enterprisesData){
            let that=this;
            let params = this.enterprisesData
            params.hotelId = this.hotelId
            params.contractedPrice = this.enterprisesData.contractedPriceType == 1?this.contractedPrice1:this.contractedPrice2
            params.roomResourceIds = this.roomsChooseList.map(item => {return  {roomResourceId: item.id}})
            this.$refs[enterprisesData].validate((valid,model)=>{
                if(valid){
                    this.$api.changeEnterprisesRooms(params,this.modifyid).then(response=>{
                        if(response.data.code=='0'){
                            that.$message.success("操作成功")
                            that.$router.push({name:"HotelEnterprisesRoomsList"})
                        }else{
                            that.$alert(response.data.msg,"警告",{
                            confirmButtonText:"确定"
                                })
                            }
                        })
                }else{
                    console.log("error!")
                }
            })
        },
    }
  }
</script>

<style lang="less" scope>
  .CabTypeListAdds{
    .title{font-weight: bold;text-align: left;}
    .cancelleft.el-button--primary{
      margin-left: 50px;
    }
    .pagination{
        text-align: center;
        margin-top: 20px
    }
    .operate{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
  }
</style>




















