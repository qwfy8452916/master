<template>
    <div>
        <PrivilegeRoleList @role-modify="modify" @role-add="useradd" @login="login"></PrivilegeRoleList>
    </div>
</template>

<script>
import { PrivilegeRoleList } from 'user-privilege-management'
export default {
    name: 'LonganPrivilegeRoleList',
    components: {
        PrivilegeRoleList
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
            const orgId = this.orgId;
            this.$router.push({name:'LonganPrivilegeRoleModify', params:{id: id, orgId: orgId}});
        },
        useradd(){
            const orgId = this.orgId;
            this.$router.push({name:'LonganPrivilegeRoleAdd', params:{orgId}});
        },
        login(){
             this.$router.push({name:'login'});
        }
    }
}
</script>

