<template>
    <div>
        <PrivilegeUserAdd @user-list="userlist"></PrivilegeUserAdd>
    </div>
</template>

<script>
import {PrivilegeUserAdd} from 'user-privilege-management'
export default {
    name: 'LonganPrivilegeUserAdd',
    components: {
        PrivilegeUserAdd
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

