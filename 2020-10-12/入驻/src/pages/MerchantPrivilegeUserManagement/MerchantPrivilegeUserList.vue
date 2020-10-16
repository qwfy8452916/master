<template>
    <div>
        <PrivilegeUserList @user-modify="modify" @user-add="useradd"></PrivilegeUserList>
    </div>
</template>

<script>
import { PrivilegeUserList } from 'user-privilege-management'
export default {
    name: 'MerchantPrivilegeUserList',
    components: {
        PrivilegeUserList
    },
    data() {
        return {

        }
    },
    methods: {
        modify(id) {
            // console.log(22222, id);
            this.$router.push({name:'MerchantPrivilegeUserModify', params:{id: id}});
        },
        useradd(){
            this.$router.push({name:'MerchantPrivilegeUserAdd'});
        },
    }
}
</script>