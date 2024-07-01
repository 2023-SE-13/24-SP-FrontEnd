<template>
    <div id="box">
        <div id="main">

        </div>
    </div>
</template>

<script>

export default{
    data() {

    },
    props: {
        username: {
            type: String,
            default: "Younsur"
        },
    }
}
</script>

<style scoped>
    #box {
        width: 100%;
        min-height: 70px;
        background-color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

</style>
