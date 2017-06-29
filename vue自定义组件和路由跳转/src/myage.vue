<style>
    #myage{color:red}
</style>

<template>
    <div id="myage">我的年龄是{{age}}</div>
</template>

<script>
    export default{
        props: ["age"]
    }
</script>