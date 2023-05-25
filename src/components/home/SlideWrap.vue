<template>

    <div id ="homeSlide" >

        <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000"
            fade
            indicators
            img-width="980"
            img-height="320"
            
        >
            <b-carousel-slide>
                <template #img>
                <img
                    class="d-block ml-auto mr-auto"
                    width="980"
                    height="320"
                    src="@/assets/home/banner1.jpg"
                    height:auto
                >
                </template>
            </b-carousel-slide>
            <b-carousel-slide>
                <template #img>
                <img
                    class="d-block ml-auto mr-auto"
                    width="980"
                    height="320"
                    src="@/assets/home/home8.jpg"
                    height:auto
                >
                </template>
            </b-carousel-slide>
            <b-carousel-slide>
                <template #img>
                <img
                    class="d-block ml-auto mr-auto"
                    width="980"
                    height="320"
                    src="@/assets/home/home4.jpg"
                    height:auto
                >
                </template>
            </b-carousel-slide>
            
            
        </b-carousel>
    </div>
</template>

<script>
export default {
    name: 'SlideWrap',
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
    padding: 4%;
}

</style>

