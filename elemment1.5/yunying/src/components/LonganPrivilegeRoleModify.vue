<template>
    <div>
        <PrivilegeRoleModify @role-list="rolelist"></PrivilegeRoleModify>
    </div>
</template>

<script>
import {PrivilegeRoleModify} from 'user-privilege-management'
export default {
    name: 'LonganPrivilegeRoleModify',
    components: {
        PrivilegeRoleModify
    },
    data(){
        return{

        }
    },
    methods: {
        rolelist(){
            this.$router.push({name: 'LonganPrivilegeRoleList'});
        }
    }
}
</script>

