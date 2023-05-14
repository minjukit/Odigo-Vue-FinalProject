<template>
    <div id="map">
        <h3>카카오 맵이다</h3>
        <div>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ text }}</div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'KakaoMap',
    components: {},
    data() {
        return {
            map: null,
        };
    },
    created() {},
    mounted(){
       
    },
    methods: {},
};
</script>

<style scoped>
#map {
    width:100%;
    height: 600px;
}
</style>