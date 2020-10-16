<template>
    <div class="hotelserviceadd">
        <p class="title">添加酒店服务类型</p>
        <el-form :model="HotelServiceTypeData" :rules="rules" ref="HotelServiceTypeData" label-width="120px" class="hotelservicetypeform">
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="HotelServiceTypeData.sort"></el-input>
            </el-form-item>
            <el-form-item label="酒店" prop="hotelId">
                <el-select 
                    v-model="HotelServiceTypeData.hotelId" 
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择" 
                    @change="getHotelOrgId">
                    <el-option 
                        v-for="item in hotelList" 
                        :key="item.id" 
                        :label="item.hotelName" 
                        :value="item.id"
                        :data-orgId="item.horgId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="服务类型" prop="categoryId">
                <el-select v-model="HotelServiceTypeData.categoryId" placeholder="请选择" @change="selectServiceType">
                    <el-option 
                        v-for="item in serviceList" 
                        :key="item.id" 
                        :label="item.serviceName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
                <el-input v-model="HotelServiceTypeData.showName"></el-input>
            </el-form-item>
            <el-form-item label="明细样式" prop="style">
                <el-select v-model="HotelServiceTypeData.style" placeholder="请选择" @change="selectStyle">
                    <el-option 
                        v-for="item in itemStyleList" 
                        :key="item.id" 
                        :label="item.itemName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="HotelServiceTypeData.style != 'PIC_ONLY'" label="数量" prop="isNeedNum">
                <el-checkbox v-model="HotelServiceTypeData.isNeedNum">是否需要选择数量</el-checkbox>
            </el-form-item>
            <el-form-item v-if="HotelServiceTypeData.style != 'PIC_ONLY'" label="上传附件" prop="isNeedAttachment">
                <el-checkbox v-model="HotelServiceTypeData.isNeedAttachment">是否需要上传附件</el-checkbox>
            </el-form-item>
            <el-form-item v-if="HotelServiceTypeData.style != 'PIC_ONLY'" label="描述" prop="isNeedDescription">
                <el-checkbox v-model="HotelServiceTypeData.isNeedDescription">是否需要填写描述</el-checkbox>
            </el-form-item>
            <el-form-item v-if="HotelServiceTypeData.style != 'PIC_ONLY' && HotelServiceTypeData.isNeedDescription" prop="description">
                <el-input type="textarea" :rows="2" maxlength="255" v-model="HotelServiceTypeData.description" placeholder="请输入您想描述的内容"></el-input>
            </el-form-item>
            <el-form-item v-if="HotelServiceTypeData.style != 'PIC_ONLY'" label="房间号" prop="isNeedRoomNo">
                <el-checkbox v-model="HotelServiceTypeData.isNeedRoomNo">是否需要填写房间号</el-checkbox>
            </el-form-item>
            <el-form-item label="提交成功提示语" prop="prompt">
                <el-input type="textarea" style="width: 400px" :rows="3" v-model="HotelServiceTypeData.prompt"></el-input>
                <el-popover
                    placement="right-start"
                    title="提交成功文案："
                    trigger="hover">
                    <p>报修：您已成功提交报修，请耐心等待，工作人员将尽快帮您处理</p>
                    <p>客房菜单/早餐配菜：您已成功点餐，请耐心等待，工作人员将尽快送至客房</p>
                    <p>叫醒服务：已收到您的叫醒预约，工作人员将在约定时间电话叫醒您</p>
                    <p>SPA服务：已收到您的服务预约，SPA技师即将前往客房为您服务</p>
                    <p>酒店专车：已收到您的用车预约，酒店将拨打您的电话确认预约</p>
                    <p>换枕服务：已收到您的换枕预约，工作人员将尽快送至客房</p>
                    <p>快速洗衣：已收到您的洗衣预约，工作人员将尽快前往客房取衣</p>
                    <p>及时打扫：已收到您的打扫预约，工作人员将尽快为您打扫客房</p>
                    <p>快速洗衣：已收到您的洗衣预约，工作人员将尽快前往客房取衣</p>
                    <el-button style="border:none;padding:0;vertical-align:middle;margin-bottom:25px" slot="reference">
                        <i class="el-icon-warning-outline" style="font-size:18px"></i>
                    </el-button>
                </el-popover>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzData['F:BO_RMSVC_RMSVC_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('HotelServiceTypeData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelServiceAdd',
    data(){
        return{
            authzData: '',
            // orgId: '',
            // horgId: '',
            hotelList: [],
            serviceList: [],
            itemStyleList: [],
            HotelServiceTypeData: {
                sort: 0,
                showName: '',
                isNeedNum: false,
                isNeedAttachment: false,
                isNeedDescription: false,
                description: '',
                isNeedRoomNo: false,
            },
            isSubmit: false,
            rules: {
                sort: [
                    { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                ],
                hotelId: [
                    {required: true, message: '请选择酒店', trigger: 'blur'}
                ],
                categoryId: [
                    {required: true, message: '请选择服务类型', trigger: 'blur'}
                ],
                showName: [
                    {min: 1, max: 12, message: '显示名称请保持在12个字符以内', trigger: ['blur','change']}
                ],
                style: [
                    {required: true, message: '请选择明细样式', trigger: 'blur'}
                ],
                prompt: [
                    {required: true, message: '请输入提交成功提示语', trigger: ['blur','change']},
                    {min: 1, max: 50, message: '提示语请保持在50个字符以内', trigger: ['blur','change']}
                ]
            },
            loadingH: false,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.getHotelList();
        this.basicDataItems();
    },
    methods: {
        //获取酒店信息
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
                                hotelName: item.hotelName,
                                horgId: item.orgId
                            }
                        })
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
        //获取酒店orgId
        getHotelOrgId(value){
            // const checkedHotel = this.hotelList.find(item => item.id === value);
            // this.horgId = checkedHotel.horgId;
            // this.getHotelServiceType();
            this.serviceTypeList(value);
        },
        //获取酒店未使用的服务类型
        serviceTypeList(hotelId){
            const params = {
                excludeWithHotelId: hotelId
            };
            // console.log(params);
            this.$api.serviceTypeList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == 0){
                        this.serviceList = result.data.map(item => {
                            return{
                                serviceName: item.name,
                                id: item.id
                            }
                        })
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
        getHotelServiceType(){
            const params = {
                hotelOrgId: this.horgId
            };
            // console.log(params);
            this.$api.hotelserviceTypeList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == 0){
                        this.serviceList = result.data.map(item => {
                            return{
                                serviceName: item.rmsvcName,
                                id: item.id
                            }
                        })
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
        //选择服务类型
        selectServiceType(val){
            // console.log(val);
            for(let i = 0; i < this.serviceList.length; i++){
                if(this.serviceList[i].id == val){
                    this.HotelServiceTypeData.showName = this.serviceList[i].serviceName;
                }
            }
        },
        //获取客房服务明细样式 - 字典表
        basicDataItems(){
             const params = {
                key: 'RMSVC_CATEGORY_STYLE',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.itemStyleList = result.data.map(item => {
                            return{
                                id: item.dictValue,
                                itemName: item.dictName
                            }
                        })
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
        //选择明细样式
        selectStyle(){
            this.HotelServiceTypeData.isNeedNum = false;
            this.HotelServiceTypeData.isNeedAttachment = false;
            this.HotelServiceTypeData.isNeedDescription = false;
            this.HotelServiceTypeData.description = '';
            this.HotelServiceTypeData.isNeedRoomNo = false;
        },
        //添加酒店服务类型
        submitForm(HotelServiceTypeData){
            if(this.HotelServiceTypeData.sort == ''){
                this.HotelServiceTypeData.sort = 0;
            }
            let isNeedNumN, isNeedAttachmentN, isNeedDescriptionN, isNeedRoomNoN;
            if(this.HotelServiceTypeData.isNeedNum){isNeedNumN = 1;}else{isNeedNumN = 0;}
            if(this.HotelServiceTypeData.isNeedAttachment){isNeedAttachmentN = 1;}else{isNeedAttachmentN = 0;}
            if(this.HotelServiceTypeData.isNeedDescription){isNeedDescriptionN = 1;}else{isNeedDescriptionN = 0;}
            if(this.HotelServiceTypeData.isNeedRoomNo){isNeedRoomNoN = 1;}else{isNeedRoomNoN = 0;}
            const params = {
                sort: this.HotelServiceTypeData.sort,
                hotelId: this.HotelServiceTypeData.hotelId,
                categoryId: this.HotelServiceTypeData.categoryId,
                showName: this.HotelServiceTypeData.showName,
                style: this.HotelServiceTypeData.style,
                isNeedNum: isNeedNumN,
                isNeedAttachment: isNeedAttachmentN,
                isNeedDescription: isNeedDescriptionN,
                description: this.HotelServiceTypeData.description,
                isNeedRoomNo: isNeedRoomNoN,
                prompt: this.HotelServiceTypeData.prompt,
            };
            this.$refs[HotelServiceTypeData].validate((valid) => {
                if(valid){
                    if(this.HotelServiceTypeData.style != 'PIC_ONLY' && this.HotelServiceTypeData.isNeedDescription){
                        if(this.HotelServiceTypeData.description == ''){
                            this.$message.error('请输入描述内容！');
                            return false
                        }
                    }
                    // console.log(params);
                    // return
                    this.isSubmit = true;
                    this.$api.HotelServiceTypeAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                if(result.data == true){
                                    this.$message.success('添加酒店服务类型成功！');
                                    this.$router.push({name: 'LonganHotelServiceList'});
                                }else{
                                    this.$message.error('添加酒店服务类型失败！');
                                    this.isSubmit = false;
                                }
                            }else{
                                this.$message.error(result.msg);
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
                            this.isSubmit = false;
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            this.$router.push({name: 'LonganHotelServiceList'});
        }
    }
}
</script>

<style lang="less" scoped>
.hotelserviceadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelservicetypeform{
        width: 42%;
    }
}
</style>

