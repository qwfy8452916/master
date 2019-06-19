<template>
    <div>
        <PrivilegeRoleList @role-modify="modify" @role-add="useradd"></PrivilegeRoleList>
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

        }
    },
    methods: {
        modify(id) {
            this.$router.push({name:'LonganPrivilegeRoleModify', params:{id: id}});
        },
        useradd(){
            this.$router.push({name:'LonganPrivilegeRoleAdd'});
        },
    }
}
</script>

