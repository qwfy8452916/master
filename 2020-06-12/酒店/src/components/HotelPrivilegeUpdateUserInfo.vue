<template>
    <div>
        <PrivilegeUpdateUserInfo @update-info="updateinfo"></PrivilegeUpdateUserInfo>
    </div>
</template>

<script>
import {PrivilegeUpdateUserInfo} from 'user-privilege-management'
export default {
    name: 'HotelPrivilegeUpdateUserInfo',
    components: {
        PrivilegeUpdateUserInfo
    },
    data(){
        return{
            // orgId: ''
        }
    },
    mounted(){
        // this.orgId = this.$route.params.orgId;
    },
    methods: {
        updateinfo(){
            // const orgId = this.orgId;
            this.$router.push({name: 'index'});
        }
    }
}
</script>

