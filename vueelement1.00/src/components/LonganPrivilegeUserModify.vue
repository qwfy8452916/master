<template>
    <div>
        <PrivilegeUserModify @user-list="userlist"></PrivilegeUserModify>
    </div>
</template>

<script>
import {PrivilegeUserModify} from 'user-privilege-management'
export default {
    name: 'LonganPrivilegeUserModify',
    components: {
        PrivilegeUserModify
    },
    data(){
        return{

        }
    },
    methods: {
        userlist(){
            this.$router.push({name: 'LonganPrivilegeUserList'});
        }
    }
}
</script>

