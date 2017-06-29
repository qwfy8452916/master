<template>
    <div id="me">
        <myname name="jack"></myname>
        <myage age="18"></myage>
    </div>
</template>

<script>
    import age  from "./myage.vue";
    import name  from "./myname.vue";

    export default{
    	props:["name","age"],
        components:{"myname":name, "myage":age}
    }
</script>