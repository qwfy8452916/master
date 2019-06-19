<template>
    <div class="frame">
        <HotelHeader/>
        <HotelSidebar/>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HotelHeader from '@/components/HotelHeader'
import HotelSidebar from '@/components/HotelSidebar'

export default {
    name: 'HomePage',
    components: {
        HotelHeader,
        HotelSidebar
    },
    data() {
        return{

        }
    },
    mounted(){
        this.$router.push({name:'index'});
    },
    methods: {
        
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
}
</style>



