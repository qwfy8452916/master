<template>
    <div>
        <PrivilegeRoleAdd @role-list="rolelist"></PrivilegeRoleAdd>
    </div>
</template>

<script>
import {PrivilegeRoleAdd} from 'user-privilege-management'
export default {
    name: 'HotelPrivilegeRoleAdd',
    components: {
        PrivilegeRoleAdd
    },
    data(){
        return{
            orgId: ''
        }
    },
    methods: {
        rolelist(){
            const orgId = this.orgId;
            this.$router.push({name: 'HotelPrivilegeRoleList', params:{orgId}});
        }
    }
}
</script>

