<template>
    <div>
        <ReviewList @review-details="lookDetail"></ReviewList>
    </div>
</template>

<script>
import { ReviewList } from 'longan-backend-review'
export default {
    name: 'LonganReviewList',
    components: {
        ReviewList
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
            this.$router.push({name:'LonganReviewDetails', params:{orgId: orgId}, query:{id: id}});
        }
    }
}
</script>