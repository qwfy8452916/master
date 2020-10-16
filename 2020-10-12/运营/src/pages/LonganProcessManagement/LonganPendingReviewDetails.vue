<template>
    <div>
        <PendingReviewDetails @pendingreview-list="backbfun"></PendingReviewDetails>
    </div>
</template>

<script>
import { PendingReviewDetails } from 'longan-backend-review'
export default {
    name: 'LonganPendingReviewDetails',
    components: {
        PendingReviewDetails
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
            this.$router.push({name:'LonganPendingReviewList', params:{orgId: orgId}});
        }
    }
}
</script>