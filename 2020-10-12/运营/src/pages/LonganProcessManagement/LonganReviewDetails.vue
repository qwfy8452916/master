<template>
    <div>
        <ReviewDetails @review-list="backbfun"></ReviewDetails>
    </div>
</template>

<script>
import { ReviewDetails } from 'longan-backend-review'
export default {
    name: 'LonganReviewDetails',
    components: {
        ReviewDetails
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
            this.$router.push({name:'LonganReviewList', params:{orgId: orgId}});
        }
    }
}
</script>