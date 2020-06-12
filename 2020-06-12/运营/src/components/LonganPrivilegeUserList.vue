<template>
    <div>
        <PrivilegeUserList @user-modify="modify" @user-add="useradd"></PrivilegeUserList>
    </div>
</template>

<script>
import { PrivilegeUserList } from 'user-privilege-management'
export default {
    name: 'LonganPrivilegeUserList',
    components: {
        PrivilegeUserList
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
        modify(id) {
            // console.log(111111, id)
            const orgId = this.orgId;
            this.$router.push({name:'LonganPrivilegeUserModify', params:{id: id, orgId: orgId}});
        },
        useradd(){
            const orgId = this.orgId;
            this.$router.push({name:'LonganPrivilegeUserAdd', params:{orgId: orgId}});
        },
    }
}
</script>

