<template>
    <div class="hotellist">
        <el-form :inline="true" align=left>
            <el-form-item label="酒店名称">
                <el-input v-model="inquireHotelName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>

        <el-row>
        <el-col :span="24" class="addcommodity">
            <!-- <div class="grid-content bg-purple-dark" justify="start"> -->
                <el-button type="primary" @click="addproduct()">添加商品</el-button>
            <!-- </div> -->
            </el-col>
        </el-row>

        <el-table :data="HotelDataList" border style="width:100%;" >
            <el-table-column fixed prop="hotelId" label="商品id" width="80px" align=center></el-table-column>
            <el-table-column prop='socialCreditCode' label="商品图片" width="180px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.socialCreditCode" alt="" style="width: 50px;height: 50px">
                </template> 
            </el-table-column>
            <el-table-column prop="hotelName" label="商品名称" width="150px" align=center></el-table-column>
            <el-table-column prop="adminName" label="供应商名称" width="100px" align=center></el-table-column>
            <el-table-column prop="adminPhone" label="SQ编号" width="120px" align=center></el-table-column>
            <el-table-column prop="hotelAddress" label="最高采购价" width="240px" align=center></el-table-column>
            <el-table-column prop="hotelBackstage" label="建议零售价" width="200px" align=center></el-table-column>
            <el-table-column prop="addTime" label="保质期" width="160px" align=center></el-table-column>
            <el-table-column prop="addTime" label="规格" width="160px" align=center></el-table-column>
            <el-table-column prop="addTime" label="添加时间" width="160px" align=center></el-table-column>
            <el-table-column prop="addTime" label="操作人姓名" width="160px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="200px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="Modifyproduct()">修改</el-button>
                    <el-button type="text" size="small" @click="Deleteproduct(scope.$index, HotelDataList)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该商品？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="Confirmdel()">确定</el-button>
                <!-- <el-button type="primary" @click="dialogVisibleDelete=false">确定</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'CommodityList',
    data() {
        return{
            inquireHotelName: '',
            del:null,
            HotelDataList: [{
                hotelId: '4555665',
                socialCreditCode: 'https://dwz.cn/KRzIgknV',
                hotelName: '红玫瑰酒店',
                adminName: '李四',
                hotelBackstage:'20',
                adminPhone: '16935689954',
                hotelAddress: '苏州姑苏区西城永捷201号',
                addTime: '2019-03-16 19:34:07',
            },
            {
                hotelId: '4555665',
                socialCreditCode: 'https://dwz.cn/KRzIgknV',
                hotelName: '红玫瑰酒店',
                adminName: '李四',
                hotelBackstage:'20',
                adminPhone: '16935689954',
                hotelAddress: '苏州姑苏区西城永捷201号',
                addTime: '2019-03-16 19:34:07',
            },
            {
                hotelId: '4555665',
                socialCreditCode: 'https://dwz.cn/KRzIgknV',
                hotelName: '红玫瑰酒店',
                adminName: '李四',
                hotelBackstage:'20',
                adminPhone: '16935689954',
                hotelAddress: '苏州姑苏区西城永捷201号',
                addTime: '2019-03-16 19:34:07',
            }],
            dialogVisibleDelete: false,
        }
    },
    methods: {
        //查询
        inquire(){
            if(this.inquireHotelName){
                console.log(111);
            }
        },
        //添加商品
        addproduct(){
          this.$router.push({name:'CommodityAdd'});
        },
        //修改
        Modifyproduct(){
            this.$router.push({name:'Commodityedit',params:{paicheNo: 1}});
        },
        //删除
        Deleteproduct(index,rows){
            this.del=index
            // rows.splice(index, 1);
            this.dialogVisibleDelete = true;
        },

        Confirmdel(){
            this.HotelDataList.splice(this.del,1)
            this.dialogVisibleDelete = false;
        }

    }
}
</script>

<style lang="less" scoped>

.addcommodity{text-align:left;margin-bottom: 12px;}
</style>

