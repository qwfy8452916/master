<template>
    <div>
        <PrivilegeUserList @user-modify="modify" @user-add="useradd"></PrivilegeUserList>
    </div>
</template>

<script>
import { PrivilegeUserList } from 'user-privilege-management'
export default {
    name: 'LonganPrivilegeUserList',
    components: {
        PrivilegeUserList
    },
    data() {
        return {

        }
    },
    methods: {
        modify(id) {
            // console.log(111111, id)
            this.$router.push({name:'LonganPrivilegeUserModify', params:{id: id}});
        },
        useradd(){
            this.$router.push({name:'LonganPrivilegeUserAdd'});
        },
    }
}
</script>

