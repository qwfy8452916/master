<template>
    <div>
        <ProcessList @process-details="lookDetail"></ProcessList>
    </div>
</template>

<script>
import { ProcessList } from 'longan-backend-review'
export default {
    name: 'MerchantProcessList',
    components: {
        ProcessList
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
        lookDetail(id) {
            const orgId = this.orgId;
            this.$router.push({name:'MerchantProcessDetails', params:{orgId: orgId}, query:{id: id}});
        }
    }
}
</script>