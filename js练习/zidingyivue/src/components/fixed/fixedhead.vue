<template>
    <div class="wrap">
       <div>固定头部</div>
       <double01/>
       <double02/>
       <double03/>
       <router-view/>
    </div>
</template>

<script>

import {double01,double02,double03} from '@/components/basic'

console.log(double01)

export default {
    name:'fixedhead',
    components: {
    double01,
    double02,
    double03
  },
}
</script>

<style scope lang=less>

</style>
