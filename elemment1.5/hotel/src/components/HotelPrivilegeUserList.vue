<template>
    <div>
        <PrivilegeUserList @user-modify="modify" @user-add="useradd"></PrivilegeUserList>
    </div>
</template>

<script>
// import { PrivilegeUserList } from 'user-privilege-management'
export default {
    name: 'HotelPrivilegeUserList',
    // components: {
    //     PrivilegeUserList
    // },
    data() {
        return {

        }
    },
    mounted(){

    },
    methods: {
        modify(id) {
            this.$router.push({name:'HotelPrivilegeUserModify', params:{id: id}});
        },
        useradd(){
            this.$router.push({name:'HotelPrivilegeUserAdd'});
        },
    }
}
</script>

