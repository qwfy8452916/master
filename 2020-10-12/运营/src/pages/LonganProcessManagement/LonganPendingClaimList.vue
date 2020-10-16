<template>
    <div>
        <PendingClaimList @claim-details="lookDetail"></PendingClaimList>
    </div>
</template>

<script>
import { PendingClaimList } from 'longan-backend-review'
export default {
    name: 'LonganPendingClaimList',
    components: {
        PendingClaimList
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
        lookDetail(id,claimid) {
            const orgId = this.orgId;
            this.$router.push({name:'LonganPendingClaimDetails', params:{orgId: orgId}, query:{id: id,claimid: claimid}});
        }
    }
}
</script>