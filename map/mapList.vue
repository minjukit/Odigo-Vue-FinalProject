<template>
    <div id="map">
        <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            map: null,
        };
    },
    created() { },
    mounted() {

    },
    methods: {},
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 600px;
}
</style>