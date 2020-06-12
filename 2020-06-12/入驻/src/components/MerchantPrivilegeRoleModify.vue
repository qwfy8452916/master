<template>
    <div>
        <PrivilegeRoleModify @role-list="rolelist"></PrivilegeRoleModify>
    </div>
</template>

<script>
import {PrivilegeRoleModify} from 'user-privilege-management'
export default {
    name: 'MerchantPrivilegeRoleModify',
    components: {
        PrivilegeRoleModify
    },
    data(){
        return{

        }
    },
    methods: {
        rolelist(){
            this.$router.push({name: 'MerchantPrivilegeRoleList'});
        }
    }
}
</script>

