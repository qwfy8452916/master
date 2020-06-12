<template>
    <div>
        <PrivilegeUserModify @user-list="userlist"></PrivilegeUserModify>
    </div>
</template>

<script>
import {PrivilegeUserModify} from 'user-privilege-management'
export default {
    name: 'MerchantPrivilegeUserModify',
    components: {
        PrivilegeUserModify
    },
    data(){
        return{

        }
    },
    methods: {
        userlist(){
            this.$router.push({name: 'MerchantPrivilegeUserList'});
        }
    }
}
</script>

