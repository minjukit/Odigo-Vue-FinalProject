<template>
    <div class="homeSlide">
        <b-card class="cardBack" text-variant="black">
            <b-row>
            <b-col class="col-8">
            <h2>어디로 떠나세요?</h2>
            <b-card-text>
                오디고와 계획해봐요!
            </b-card-text>
            </b-col>
              <b-col class="col-4 flex" id = "btnflex" >
                <b-button href="/region/regionSearch" variant="success" >여행지 검색</b-button>
              </b-col>
            </b-row>
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
.cardBack{
    
    -moz-border-radius: 2px;
    margin-left: auto;
    margin-right: auto;
    width: 64%;
	-webkit-border-radius: 2px;
	border-radius: 14px;
	/* -moz-box-shadow: 2px 2px 2px 2px rgba(0, 235, 78, 0.61);
	-webkit-box-shadow: 2px 2px 2px 2px rgba(0, 235, 78, 0.61); */
	box-shadow: 0 1px 2px rgba(57, 158, 99, 0.27), 
                0 2px 4px rgba(57, 158, 99, 0.27), 
                0 4px 8px rgba(57, 158, 99, 0.27), 
                0 8px 16px rgba(57, 158, 99, 0.27), 
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
}
#homeSlide{
    margin-top: 10px;
    padding: 10%;
}

#btnflex{
 display: flex;
 justify-content: center;
 align-items: center;

}

</style>