<template>
    <div>
        <PendingReviewDetails @pendingreview-list="backbfun"></PendingReviewDetails>
    </div>
</template>

<script>
import { PendingReviewDetails } from 'longan-backend-review'
export default {
    name: 'HotelPendingReviewDetails',
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
            this.$router.push({name:'HotelPendingReviewList', params:{orgId: orgId}});
        }
    }
}
</script>