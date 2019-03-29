<template>
    <div class="hoteladd">
        <p class="title">酒店详情</p>
        <el-form v-model="HotelDataDetail" label-width="140px" class="hotelform">
            <el-form-item label="社会信用代码" prop="hotelUscc">
                <el-input :disabled="true" v-model="HotelDataDetail.hotelUscc"></el-input>
            </el-form-item>
            <!-- <el-form-item label="登录密码" prop="password">
                <el-input :disabled="true" v-model="HotelDataDetail.password"></el-input>
            </el-form-item> -->
            <el-form-item label="酒店名称" prop="hotelName">
                <el-input :disabled="true" v-model="HotelDataDetail.hotelName"></el-input>
            </el-form-item>
            <el-form-item label="酒店星级" prop="hotelStarLevel">
                <div class="starclass">
                    <el-rate :disabled="true" v-model="HotelDataDetail.hotelStarLevel"></el-rate>
                </div>
            </el-form-item>
            <el-form-item label="酒店装修时间" prop="hotelDecorationYear">
                <el-date-picker type="date" :disabled="true" v-model="HotelDataDetail.hotelDecorationYear" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="酒店荣誉" prop="hotelHonor">
                <el-input type="textarea" :disabled="true" autosize v-model="HotelDataDetail.hotelHonor"></el-input>
            </el-form-item>
             <el-form-item label="酒店风格" prop="hotelStyle">
                <el-input type="textarea" :disabled="true" autosize v-model="HotelDataDetail.hotelStyle"></el-input>
            </el-form-item>
             <el-form-item label="酒店联系人电话" prop="hotelContactsMobile">
                <el-input :disabled="true" v-model="HotelDataDetail.hotelContactsMobile"></el-input>
            </el-form-item>
            <el-form-item label="酒店订房电话" prop="hotelBookingPhone">
                <el-input :disabled="true" v-model="HotelDataDetail.hotelBookingPhone"></el-input>
            </el-form-item>
            <el-form-item label="区域选择" prop="hotelRegion">
                <!-- <el-input v-model="HotelDataDetail.hotelRegion"></el-input> -->
                <el-select :disabled="true" v-model="this.hotelProvince" placeholder="省级地区">
                    <el-option label="1" value="province"></el-option>
                </el-select>
                <el-select :disabled="true" v-model="this.hotelCity" placeholder="市级地区">
                    <el-option label="2" value="city"></el-option>
                </el-select>
                <el-select :disabled="true" v-model="this.hotelArea" placeholder="区级地区">
                    <el-option label="3" value="area"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址" prop="hotelAddress">
                <el-input :disabled="true" v-model="HotelDataDetail.hotelAddress"></el-input>
            </el-form-item>
            <el-form-item label="酒店皮肤" prop="hotelSkin">
                <!-- <el-input v-model="HotelDataDetail.hotelSkin"></el-input> -->
                    <!-- <div class="divskin">
                        <img :src="HotelDataDetail.hotelThemeDTO.themeImageUrl" alt="模板A" class="imgskin"><br/>
                        <el-radio name="skin" :disabled="true" v-model="HotelDataDetail.hotelThemeDTO.id" :label="HotelDataDetail.hotelThemeDTO.id">模板{{HotelDataDetail.hotelThemeDTO.id}}</el-radio>
                    </div>    -->
            </el-form-item>
            <el-form-item label="酒店banner图" prop="hotelBanner">
                <!-- <el-input v-model="HotelDataDetail.hotelBanner"></el-input> -->
                <img v-for="item in HotelDataDetail.hotelImageDTOs" :key="item.id" :src="item.imageUrl" alt="1" class="bannerimg"> 
            </el-form-item>
            <!-- <el-form-item label="酒店管理员姓名" prop="hotelAdminName">
                <el-input :disabled="true" v-model="HotelDataDetail.hotelAdminName"></el-input>
            </el-form-item> -->
            <el-form-item label="酒店管理员手机号" prop="adminMobile">
                <el-input :disabled="true" v-model="HotelDataDetail.adminMobile"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="returnList">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelDetail',
    data(){
        return{
            HotelDataDetail: [],
            hotelProvince: '',
            hotelCity: '',
            hotelArea: ''
        }
    },
    mounted(){
        this.hotelDetailInfo();
    },
    methods: {
        hotelDetailInfo(){
            const id = this.$route.params.id;
            const params = {};
            this.$api.hotelDetail(params, id)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == '0'){
                        this.HotelDataDetail = response.data.data;
                        this.HotelDataDetail.hotelStarLevel = this.HotelDataDetail.hotelStarLevel + 1;
                        this.hotelProvince = this.HotelDataDetail.province.dictName;
                        this.hotelCity = this.HotelDataDetail.city.dictName;
                        this.hotelArea = this.HotelDataDetail.area.dictName;
                    }else{
                        this.$message.error('酒店详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        returnList(){
            this.$router.push({name:'LonganHotelList'});
        }
    },
}
</script>

<style scoped>
  .el-select{
    width: 32%;
  }
</style>

<style lang="less" scoped>
.hoteladd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 42%;
        .starclass{
            padding-top: 10px;
        }
        .divskin{
            width: 32%;
            display: inline-block;
            .imgskin{
                background: #f9f;
                width: 90px;
                height: 120px;
                display: inline-block;
            }
        }
        .bannerimg{
            background: #f9f;
            width: 19%;
            height: 100px;
            display: inline-block;
        }
    }
}
</style>

