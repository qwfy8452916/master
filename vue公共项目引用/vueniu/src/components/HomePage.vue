<template>
    <div class="frame">
        <!-- <HotelHeader/>
        <HotelSidebar/> -->
        <div class="main">
            <router-view></router-view>
        </div>
        <div class="title">首页</div>
        <div>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </div>
        <el-form :model="HotelDataAdd" :rules="rules" ref="HotelDataAdd" label-width="140px" class="hotelform">
          <el-form-item label="地图定位" prop="mapPosition">
                  <div id="container" style="width:50%;height:200px;" @click="getLngLat"></div>
          </el-form-item>
          <el-form-item label="经度" prop="hotelLongitude">
                <el-input v-model="HotelDataAdd.hotelLongitude"></el-input>
                <input type="text" id="lng" hidden>
            </el-form-item>
            <el-form-item label="纬度" prop="hotelLatitude">
                <el-input v-model="HotelDataAdd.hotelLatitude"></el-input>
                <input type="text" id="lat" hidden>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import HotelHeader from '@/components/HotelHeader'
// import HotelSidebar from '@/components/HotelSidebar'
import AMap from 'AMap'
export default {
    name: 'HomePage',
    // components: {
    //     HotelHeader,
    //     HotelSidebar
    // },
    data() {
        return{
           HotelDataAdd:{
             hotelLongitude:"",
             hotelLatitude:"",
           },
           rules:{},
        }
    },
    mounted(){
        // this.$router.push({name:'index'});
        this.Mockces()
        this.initMap()
    },
    methods: {
         Mockces(){
           let params=""
            this.$api.mockces({params}).then(response=>{
                if(response.status==200){
                   console.log(response)
                }
            })
         },

         //地图
        initMap(){
            let map = new AMap.Map('container',{
                center: [116.397428, 39.90923],   //初始化地图时显示的中心点坐标
                // center: [],
                resizeEnable: true,   //调整任意窗口的大小，自适应窗口
                zoom: 11   //初始化地图时显示的地图放大等级
            })
            map.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                map.addControl(new AMap.ToolBar())
                map.addControl(new AMap.Scale())

                // var geolocation = new AMap.geolocation({
                //     enableHighAccuracy: true,   //是否使用高精度定位，默认 true
                //     timeout: 10000,   //设置定位超时时间，默认 无穷大
                //     buttonOffset: new AMap.Pixel(10,20),   //定位按钮的停靠位置的偏移量 默认 Pixel(10,20)
                //     zoomToAccuracy: true,   //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认 false
                //     buttonPosition: 'RB'   //定位按钮的排放位置，RB表示右下
                // })
                // geolocation.getCurrentPosition()
                // AMap.event.addListener(geolocation,'complete',(e)=>{
                //     console.log(e);   //定位成功后做的事
                //     var marker = new AMap.Marker({
                //         position: e.position,   //(e.position)定位点的点坐标，position marker的定位点坐标，也就是marker最终显示在那个点上
                //         icon: '',   //marker的图标，可以自定义，不写默认使用高德自带的
                //         map: this.map,   //map 要显示该marker的地图对象
                //     })
                // })
                // AMap.event.addListener(geolocation,'error',(e)=>{
                //     console.log(e);   //定位失败做的事
                // })
            })
            map.on('click', function(e){
                document.getElementById("lng").value = e.lnglat.getLng();
                document.getElementById("lat").value = e.lnglat.getLat();
            })
        },
        //经纬度
        getLngLat(){
            this.HotelDataAdd.hotelLongitude = document.getElementById("lng").value;
            this.HotelDataAdd.hotelLatitude = document.getElementById("lat").value;
        },

    }
}
</script>

<style lang="less" scoped>
.frame{
    padding: 0;
    margin: 0;
    .main{
        float: left;
        width: calc(100% - 362px);
        margin: 30px 30px;
    }
    .title{text-align: center;}
}
</style>



