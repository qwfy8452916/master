<template>
    <div>
        <PrivilegeUserAdd @user-list="userlist"></PrivilegeUserAdd>
    </div>
</template>

<script>
import {PrivilegeUserAdd} from 'user-privilege-management'
export default {
    name: 'LonganPrivilegeUserAdd',
    components: {
        PrivilegeUserAdd
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

