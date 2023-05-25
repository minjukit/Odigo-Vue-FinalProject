<template>
    <div class="homeSlide">
        <b-card bg-variant="dark" text-variant="white" title="Card Title">
            <b-card-text>
                With supporting text below as a natural lead-in to additional content.
            </b-card-text>
            <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'HotPlaceHome',
    components: {},
    data() {
        return {
            message: '',
        };
    },
    created() {},
    methods: {},
};
</script>

<style scoped>

#homeSlide{
    margin-top: 10px;
    padding: 10%;
}
</style>