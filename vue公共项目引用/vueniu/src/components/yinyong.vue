<template>
    <div class="frame">
         <div>yinyong</div>
         <HelloWorld @user-modify="modify"></HelloWorld>
    </div>
</template>

<script>

import { HelloWorld } from 'yinyong'
export default {
    name: 'yinyong',
    components: {
        HelloWorld
    },
    data() {
        return{

        }
    },
    mounted(){
        // this.$router.push({name:'index'});
    },
    methods: {
      modify(id){
        console.log('引用界面打印'+id)
      }
    }
}
</script>

<style lang="less" scoped>
.frame{
    padding: 0;
    margin: 0;

}
</style>
