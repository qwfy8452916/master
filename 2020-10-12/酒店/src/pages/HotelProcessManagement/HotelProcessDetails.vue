<template>
    <div>
        <ProcessDetails @process-list="backbfun"></ProcessDetails>
    </div>
</template>

<script>
import { ProcessDetails } from 'longan-backend-review'
export default {
    name: 'HotelProcessDetails',
    components: {
        ProcessDetails
    },
    data() {
        return {
            // orgId: ''
        }
    },
    mounted(){
        // this.orgId = this.$route.params.orgId;
    },
    methods: {
        backbfun() {
            // const orgId = this.orgId;
            // this.$router.push({name:'HotelProcessList', params:{orgId: orgId}});
            this.$router.go(-1);
        }
    }
}
</script>