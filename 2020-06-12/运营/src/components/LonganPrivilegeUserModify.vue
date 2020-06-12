<template>
    <div>
        <PrivilegeUserModify @user-list="userlist"></PrivilegeUserModify>
    </div>
</template>

<script>
import {PrivilegeUserModify} from 'user-privilege-management'
export default {
    name: 'LonganPrivilegeUserModify',
    components: {
        PrivilegeUserModify
    },
    data(){
        return{
            orgId: ''
        }
    },
    mounted(){
        this.orgId = this.$route.params.orgId;
    },
    methods: {
        userlist(){
            const orgId = this.orgId;
            this.$router.push({name: 'LonganPrivilegeUserList', params:{orgId}});
        }
    }
}
</script>

