<template>
    <div class="commoditymodify">
        <p class="title">更换柜子商品</p>
        <el-form v-model="HotelCommodityDataModity" :model="HotelCommodityDataModity" :rules="rules" ref="HotelCommodityDataModity" label-width="100px" class="hotelcommodityform">
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label>原商品名称</span>
                <el-input :disabled="true" v-model="hotelCommodityOld"></el-input>
            </el-form-item>
            <el-form-item label="新商品名称" prop="commodityName">
                <!-- <el-select v-model="HotelCommodityDataModity.commodityName" placeholder="请选择" @change="cabinetCommodityListFun">
                    <el-option
                        v-for="item in cabinetCommodityList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select> -->
                <el-select 
                    v-model="HotelCommodityDataModity.commodityName" 
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loading"
                    @focus="cabinetCommodityListFun"
                    @change="selectProd"
                    placeholder="请选择">
                    <el-option-group
                        v-for="item in cabinetCommodityList"
                        :key="item.prodOwnerOrgKind"
                        :label="item.prodKindName">
                        <el-option
                            v-for="subitem in item.hotelProductDTOList"
                            :key="subitem.id"
                            :label="subitem.prodProductDTO.prodName"
                            :value="subitem.id">
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="商品排序" prop="sort">
                <el-input v-model.number="HotelCommodityDataModity.sort"></el-input>
            </el-form-item>
            <el-form-item label="商品件数" prop="prodCount">
                <el-input :disabled="true" v-model="HotelCommodityDataModity.prodCount" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="分成协议" prop="cabAllocId">
                <el-select v-model="cabAllocId" placeholder="请选择">
                    <el-option 
                        v-for="item in protocolList" 
                        :key="item.id" 
                        :label="item.allocName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzData['F:BO_HOTEL_HOTEL_CAB_PROD_SUBMIT']" type="primary" @click="submitForm('HotelCommodityDataModity')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelCabinetModify',
    data(){
        var numReg = /^[1-9]\d*$/
        var isValidateNum = (rule,value,callback) => {
            if(!numReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            authzData: '',
            // orgId: '',
            id: '',
            profileId: '',
            hotelId: '',
            hotelCommodityOld: '',
            cabAllocId: '',
            HotelCommodityDataModity: {
                prodCount: 1
            },
            protocolList: [],
            cabinetCommodityList: [],
            rules: {
                // commodityName: [
                //     {required: true, message: '请选择新商品名称', trigger: 'change'},
                // ],
                prodCount: [
                   {validator: isValidateNum, trigger: ['blur','change']}
                ]
            },
            loading: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.id = this.$route.query.id;
        this.profileId = this.$route.query.profileId;
        this.hotelId = this.$route.params.hotelId;
        this.getprotocolList();
        this.hotelCommodityDetail();
        this.cabinetCommodityListFun();
    },
    methods: {
        //获取分成协议列表
        getprotocolList(){
            const params = {
            };
            this.$api.getprotocolList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.protocolList = result.data.map(item => {
                            return{
                                allocName: item.allocName,
                                id: item.id
                            }
                        })
                        const protocolNo = {
                            allocName: '暂不选择',
                            id: 0
                        };
                        this.protocolList.push(protocolNo);
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
        //获取柜子商品详情
        hotelCommodityDetail(){
            const params = {};
            const id = this.id;
            this.$api.hotelCabinetDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.product != null){
                            this.hotelCommodityOld = result.data.product.prodName;
                            this.cabAllocId = result.data.allocId;
                        }
                        this.HotelCommodityDataModity = result.data;
                        // if(result.data.prodId != 0){
                        //     const commodityInfo = result.data.prodProductDTO;
                        //     this.hotelCommodityOld = commodityInfo.prodName;
                        // }
                    }else{
                        this.$message.error('柜子商品信息获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //获取商品列表
        cabinetCommodityListFun(){
            const params = {
                // orgAs: 2,
                hotelId: this.hotelId
            };
            // console.log(params);
            this.$api.hotelCabinetCommodityList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){

                        this.cabinetCommodityList = result.data;

                        // const productData = result.data;
                        // const productList = productData.map((item, index) => {
                        //     return {
                        //         label: item.productName,
                        //         value: item.prodId
                        //     }
                        // })
                        // this.cabinetCommodityList = productList;

                        // this.cabinetCommodityList = result.data.map(item => {
                        //     return {
                        //         label: item.prodProductDTO.prodName,
                        //         value: item.prodProductDTO.prodCode
                        //     }
                        // });
                    }else{
                        this.$message.error('柜子商品列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //远程搜索
        remoteProd(val){
            if(val != ''){
                this.loading = true;
                const params = {
                    prodName: val,
                    hotelId: this.hotelId
                };
                // console.log(params);
                this.$api.hotelCabinetCommodityList(params)
                    .then(response => {
                        this.loading = false;
                        // console.log(response);
                        const result = response.data;
                        if(result.code == '0'){
                            this.cabinetCommodityList = result.data;
                        }else{
                            this.$message.error('柜子商品列表获取失败！');
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }else{
                this.cabinetCommodityListFun();
            }
        },
        //选择商品
        selectProd(){
            this.cabAllocId = '';
        },
        //确定-修改柜子商品
        submitForm(HotelCommodityDataModity){
            if(this.hotelCommodityOld == '' && this.HotelCommodityDataModity.commodityName == undefined){
                this.$message.error('请选择新商品名称！');
                return false
            }
            if(this.HotelCommodityDataModity.prodCount == ''){
                this.HotelCommodityDataModity.prodCount = 1;
            }
            const params = {
                hotelProdId: this.HotelCommodityDataModity.commodityName,
                sort: this.HotelCommodityDataModity.sort,
                prodCount: this.HotelCommodityDataModity.prodCount,
                allocId: this.cabAllocId,
                // orgAs: 2,
                // hotelId: this.hotelId,
                // id: this.id,
                // latticeCode: this.HotelCommodityDataModity.latticeCode,   //格子编号
                // prodCode: this.HotelCommodityDataModity.commodityName
            };
            const id = this.id;
            const hotelId = this.hotelId;
            let that = this;
            this.$refs[HotelCommodityDataModity].validate((valid) => {
                if (valid) {
                    that.$api.hotelCabinetCommodityModify(params, id)
                        .then(response => {
                            if(response.data.code == '0'){
                                that.$message.success('更换柜子商品信息成功！');
                                // const id = that.hotelId;
                                const id = that.profileId;
                                that.$router.push({name: 'LonganHotelCabinetList', query: {hotelId, id}});
                            }else{
                                that.$message.error('更换柜子商品信息失败！');
                            }
                        })
                        .catch(error => {
                            that.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm(){
            // const orgId = this.orgId;
            // this.$router.push({name: 'LonganHotelCabinetList',params: {orgId}, query: {id: this.hotelId}});
            const hotelId = this.hotelId;
            const id = this.profileId;
            this.$router.push({name: 'LonganHotelCabinetList', query: {hotelId, id}});
        }
    }

}
</script>

<style scoped>
.hotelcommodityform >>> .el-select{
    width: 100%;
}
</style>

<style lang="less" scoped>
.commoditymodify{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelcommodityform{
        width: 42%;
        .required-icon{
            color: #ff3030;
        }
    }
}
</style>
