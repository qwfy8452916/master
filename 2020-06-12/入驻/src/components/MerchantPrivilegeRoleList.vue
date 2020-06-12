<template>
    <div>
        <PrivilegeRoleList @role-modify="modify" @role-add="roleadd"></PrivilegeRoleList>
    </div>
</template>

<script>
import { PrivilegeRoleList } from 'user-privilege-management'
export default {
    name: 'MerchantPrivilegeRoleList',
    components: {
        PrivilegeRoleList
    },
    data() {
        return {

        }
    },
    methods: {
        modify(id) {
            this.$router.push({name:'MerchantPrivilegeRoleModify', params:{id: id}});
        },
        roleadd(){
            this.$router.push({name:'MerchantPrivilegeRoleAdd'});
        },
    }
}
</script>

