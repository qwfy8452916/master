<template>
    <div>
        <PrivilegeUpdatePWD @go-login="gologin" @go-index="goindex"></PrivilegeUpdatePWD>
    </div>
</template>

<script>
import {PrivilegeUpdatePWD} from 'user-privilege-management'
export default {
    name: 'LonganPrivilegeUpdatePWD',
    components: {
        PrivilegeUpdatePWD
    },
    data(){
        return{
            // orgId: ''
        }
    },
    mounted(){
        // this.orgId = this.$route.params.orgId;
    },
    methods: {
        gologin(){
            // const orgId = this.orgId;
            this.$router.push({name: 'login'});
        },
        goindex(){
            // const orgId = this.orgId;
            this.$router.push({name: 'index'});
        }
    }
}
</script>

