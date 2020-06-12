<template>
    <div>
        <PrivilegeRoleList @role-modify="modify" @role-add="roleadd"></PrivilegeRoleList>
    </div>
</template>

<script>
import { PrivilegeRoleList } from 'user-privilege-management'
export default {
    name: 'HotelPrivilegeRoleList',
    components: {
        PrivilegeRoleList
    },
    data() {
        return {

        }
    },
    mounted(){
        
    },
    methods: {
        modify(id) {
            this.$router.push({name:'HotelPrivilegeRoleModify', params:{id: id}});
        },
        roleadd(){
            this.$router.push({name:'HotelPrivilegeRoleAdd'});
        },
    }
}
</script>

