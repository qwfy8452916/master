<template>
    <div class="hotelserviceadd">
        <p class="title">修改酒店服务类型</p>
        <el-form :model="HotelServiceTypeData" :rules="rules" ref="HotelServiceTypeData" label-width="120px" class="hotelservicetypeform">
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="HotelServiceTypeData.sort"></el-input>
            </el-form-item>
            <el-form-item label="酒店" prop="hotelId">
                <el-select 
                    :disabled="true"
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
                <el-input type="textarea" :rows="3" v-model="HotelServiceTypeData.prompt"></el-input>
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
    name: 'LonganHotelServiceModify',
    data(){
        return{
            authzData: '',
            hsId: '',
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
        this.hsId = this.$route.query.id;
        this.getHotelList();
        this.basicDataItems();
        this.HotelServiceTypeDetail();
    },
    methods: {
        //获取酒店服务类型详情
        HotelServiceTypeDetail(){
            const params = {};
            const id = this.hsId;
            // console.log(params);
            this.$api.HotelServiceTypeDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == 0){
                        this.HotelServiceTypeData = result.data;
                        if(this.HotelServiceTypeData.isNeedNum == 1){
                            this.HotelServiceTypeData.isNeedNum = true;
                        }else{
                            this.HotelServiceTypeData.isNeedNum = false;
                        }
                        if(this.HotelServiceTypeData.isNeedAttachment == 1){
                            this.HotelServiceTypeData.isNeedAttachment = true;
                        }else{
                            this.HotelServiceTypeData.isNeedAttachment = false;
                        }
                        if(this.HotelServiceTypeData.isNeedDescription == 1){
                            this.HotelServiceTypeData.isNeedDescription = true;
                        }else{
                            this.HotelServiceTypeData.isNeedDescription = false;
                        }
                        if(this.HotelServiceTypeData.isNeedRoomNo == 1){
                            this.HotelServiceTypeData.isNeedRoomNo = true;
                        }else{
                            this.HotelServiceTypeData.isNeedRoomNo = false;
                        }
                        this.serviceTypeList(result.data.hotelId, result.data.categoryId);
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
        serviceTypeList(hotelId, categoryId){
            const params = {
                excludeWithHotelId: hotelId,
                notExcludeId: categoryId
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
        //修改酒店服务类型
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
            const id = this.hsId;
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
                    this.$api.HotelServiceTypeModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                if(result.data == true){
                                    this.$message.success('修改酒店服务类型成功！');
                                    this.$router.push({name: 'LonganHotelServiceList'});
                                }else{
                                    this.$message.error('修改酒店服务类型失败！');
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

