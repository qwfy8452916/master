<template>
    <div>
        <PendingReviewList @pendingreview-details="lookDetail"></PendingReviewList>
    </div>
</template>

<script>
import { PendingReviewList } from 'longan-backend-review'
export default {
    name: 'LonganPendingReviewList',
    components: {
        PendingReviewList
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
            this.$router.push({name:'LonganPendingReviewDetails', params:{orgId: orgId}, query:{id: id}});
        }
    }
}
</script>