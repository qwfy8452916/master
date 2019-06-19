<template>
    <div>
        <PrivilegeRoleAdd @role-list="rolelist"></PrivilegeRoleAdd>
    </div>
</template>

<script>
// import {PrivilegeRoleAdd} from 'user-privilege-management'
export default {
    name: 'HotelPrivilegeRoleAdd',
    // components: {
    //     PrivilegeRoleAdd
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

