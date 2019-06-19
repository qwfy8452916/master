<template>
    <div>
        <PrivilegeRoleModify @role-list="rolelist"></PrivilegeRoleModify>
    </div>
</template>

<script>
// import {PrivilegeRoleModify} from 'user-privilege-management'
export default {
    name: 'HotelPrivilegeRoleModify',
    // components: {
    //     PrivilegeRoleModify
    // },
    data(){
        return{

        }
    },
    methods: {
        rolelist(){
            this.$router.push({name: 'HotelPrivilegeRoleList'});
        }
    }
}
</script>

