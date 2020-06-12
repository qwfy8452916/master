<template>
    <div>
        <PrivilegeRoleAdd @role-list="rolelist"></PrivilegeRoleAdd>
    </div>
</template>

<script>
import {PrivilegeRoleAdd} from 'user-privilege-management'
export default {
    name: 'LonganPrivilegeRoleAdd',
    components: {
        PrivilegeRoleAdd
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
        rolelist(){
            const orgId = this.orgId;
            this.$router.push({name: 'LonganPrivilegeRoleList', params:{orgId}});
        }
    }
}
</script>

