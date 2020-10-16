<template>
    <div>
        <ProcessDetails @process-list="backbfun"></ProcessDetails>
    </div>
</template>

<script>
import { ProcessDetails } from 'longan-backend-review'
export default {
    name: 'MerchantProcessDetails',
    components: {
        ProcessDetails
    },
    data() {
        return {
            orgId: ''
        }
    },
    mounted(){
        this.orgId = this.$route.params.orgId;
    },
    methods: {
        backbfun() {
            const orgId = this.orgId;
            this.$router.push({name:'MerchantProcessList', params:{orgId: orgId}});
        }
    }
}
</script>