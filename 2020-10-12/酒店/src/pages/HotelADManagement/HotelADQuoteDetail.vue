<template>
    <div class="hotelserviceadd">
        <p class="title">广告页引用详情</p>
        <el-form :model="HotelADData" :rules="rules" ref="HotelADData" label-width="120px" class="hotelform">
            <el-form-item label="ID" prop="id">
                <el-input :disabled="true" v-model="HotelADData.id"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="statusName">
                <el-input :disabled="true" v-model="HotelADData.statusName"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="adName">
                <el-input :disabled="true" v-model.trim="HotelADData.adName"></el-input>
            </el-form-item>
            <el-form-item label="引用次数" prop="userdCount">
                <el-input :disabled="true" v-model="HotelADData.userdCount"></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="createdByName">
                <el-input :disabled="true" v-model="HotelADData.createdByName"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createdAt">
                <el-input :disabled="true" v-model="HotelADData.createdAt"></el-input>
            </el-form-item>
            <el-form-item v-if="HotelADData.status != 0" label="发布人" prop="issuedByName">
                <el-input :disabled="true" v-model="HotelADData.issuedByName"></el-input>
            </el-form-item>
            <el-form-item v-if="HotelADData.status != 0" label="发布时间" prop="issuedTime">
                <el-input :disabled="true" v-model="HotelADData.issuedTime"></el-input>
            </el-form-item>
            <el-form-item v-if="HotelADData.status != 0" label="最近修改人" prop="lastUpdatedByName">
                <el-input :disabled="true" v-model="HotelADData.lastUpdatedByName"></el-input>
            </el-form-item>
            <el-form-item v-if="HotelADData.status != 0" label="最近修改时间" prop="lastUpdatedAt">
                <el-input :disabled="true" v-model="HotelADData.lastUpdatedAt"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 广告内容</span>
                <!-- <UEtor :defaultMsg="defaultMsg" :ueConfig="ueConfig" ref="ue"></UEtor> -->
                <div v-html="defaultMsg"></div>
            </el-form-item>
        </el-form>
        <br/>
        <p class="quotetitle">引用信息</p>
        <el-table :data="HotelADData.hotelAdSettingUsedDTOS" border stripe style="width:60%;margin-left:120px;" >
            <el-table-column fixed prop="usedType" label="引用目标类型" min-width="120px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.usedType == 1">活动</span>
                </template>
            </el-table-column>
            <el-table-column prop="usedHostId" label="引用目标ID" min-width="100px"></el-table-column>
            <el-table-column prop="usedTime" label="引用时间" min-width="160px" align=center></el-table-column>
        </el-table>
        <div style="margin: 20px 0px 0px 120px;">
            <el-button @click="resetForm">返回</el-button>
        </div>
    </div>
</template>

<script>
import UEtor from '@/components/UEtor'
export default {
    name: 'HotelADQuoteDetail',
    components: {
        UEtor
    },
    data(){
        return{
            authzData: '',
            ADId: '',
            HotelADData: {},
            isSubmit: false,
            defaultMsg: null,
            ueConfig: {
                initialFrameWidth: 900,
                initialFrameHeight: 350,
            },
            rules: {
                adName: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                    {min: 1, max: 30, message: '名称请保持在30个字符以内', trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.ADId = this.$route.query.id;
        this.hotelADQuoteDetail();
    },
    methods: {
        //广告引用详情
        hotelADQuoteDetail(){
            const params = {};
            this.$api.hotelADQuoteDetail(params, this.ADId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.HotelADData = result.data;
                        if(result.data.status == 0){
                            this.HotelADData.statusName = "草稿";
                            this.defaultMsg = result.data.adContent;
                        }else if(result.data.status == 1){
                            this.HotelADData.statusName = "已发布";
                            this.defaultMsg = result.data.adContent;
                        }else if(result.data.status == 2){
                            this.HotelADData.statusName = "已修改待发布";
                            this.defaultMsg = result.data.adModifyContent;
                        }
                        if(result.data.adLevel == 0 && result.data.adScope != 0){
                            this.SelectedHotelData = result.data.hotelDTOS.map(item => {
                                return {
                                    id: item.id,
                                    hotelName: item.hotelName
                                }
                            });
                        }
                        if(result.data.adLevel == 1){
                            this.HotelADData.hotelId = result.data.hotelDTOS[0].id;
                        }
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
        //取消
        resetForm(){
            this.$router.push({name: 'HotelADList'});
        },
    }
}
</script>

<style>
.edui-default .edui-toolbar .edui-combox .edui-combox-body{
    line-height: 22px;
}
</style>

<style lang="less" scoped>
.hotelserviceadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 45%;
        .radioscope{
            line-height: 40px;
        }
    }
    .required-icon{
        color: #F56C6C;
    }
    .pagination{
        margin-top: 20px;
        text-align: center;
    }
    .scopeensure{
        text-align: center;
    }
    .quotetitle{
        font-size: 14px;
        font-weight: bold;
        margin-left: 120px;
    }
}
</style>

