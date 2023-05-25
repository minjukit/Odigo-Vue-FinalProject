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
              caption="정보를 나눔해보세요"
              img-src="https://picsum.photos/1024/200/?image=33" 
              ></b-carousel-slide>
              <b-carousel-slide
              caption="궁금한 것을 질문해보세요"
              img-src="https://picsum.photos/1024/200/?image=93"
              ></b-carousel-slide>
          </b-carousel>
      </div>
          <b-container class="bv-example-row text-center">
    <router-view></router-view>
  </b-container>
</section>
</template>

<script>
export default {
  name: 'BoardView',
  components: {
    
  }
}
</script>

<style scoped>
section{
  display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #ffffff; 
}

#homeSlide{
  margin-top: 30px;
  
}
</style>