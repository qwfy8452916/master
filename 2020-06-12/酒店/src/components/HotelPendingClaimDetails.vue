<template>
    <div>
        <PendingClaimDetails @pendingclaim-list="backbfun"></PendingClaimDetails>
    </div>
</template>

<script>
import { PendingClaimDetails } from 'longan-backend-review'
export default {
    name: 'HotelPendingClaimDetails',
    components: {
        PendingClaimDetails
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
            this.$router.push({name:'HotelPendingClaimList', params:{orgId: orgId}});
        }
    }
}
</script>