<template>
<section>
  <div id ="homeSlide" >

        <b-carousel
            id="carousel-1"
          
            indicators
            img-width="1024"
            img-height="200"
            style="max-width:1024px; max-height:200px"
        >
            <b-carousel-slide 
            caption="인기많은 여행지를 알아보세요"
            img-src="https://picsum.photos/1024/200/?image=17" 
            ></b-carousel-slide>
            <b-carousel-slide
            caption="인기많은 여행지를 알아보세요"
            img-src="https://picsum.photos/1024/200/?image=16"
            ></b-carousel-slide>
            <b-carousel-slide
            caption="인기많은 여행지를 알아보세요"
            img-src="https://picsum.photos/1024/200/?image=15"
            ></b-carousel-slide>
        </b-carousel>
    </div>
    <b-container class="bv-example-row mt-3 text-center">
    
    <!-- <div class="headerinside">
      <h1 class="customfont">HOT Place!</h1>
    </div>
    <h6>인기많은 여행지를 알아보세요</h6> -->
    <router-view></router-view>
  </b-container>
  </section>
</template>

<script>
export default {
  name: 'HotPlaceView',
  components: {
    
  }
}
</script>

<style scoped>
.underline-hotpink {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(99, 167, 255, 0.3) 30%
  );
}


section{
  display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #ffffff; 
}

.headerinside{
  width: 100%;
  height:100px;
  background: 
    rgba(3, 204, 120, 0.3) ;
  display: flex;
  justify-content: center;
  justify-self: center;
  align-items: center;
  
}

#homeSlide{
  margin-top: 30px;
  
}
</style>