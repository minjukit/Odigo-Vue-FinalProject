<template>

  
  <div id="main-card" class="card text-black">
  <b-card-group deck class="card-group">
     <b-card  title="노형수퍼마켙" :img-src="require('@/assets/home/home3.jpg')" 
     img-height="360"
          img-width="200"
          img-alt="Image" img-top >
      <b-card-text>
        제주특별자치도 제주시 특별자치도
      </b-card-text>
      <template #footer>
        <small class="text-muted">15분전</small>
      </template>
    </b-card>

    <b-card  title="섭지코지" :img-src="require('@/assets/home/home1.jpg')"  img-height="360"
          img-width="200"
          img-alt="Image" img-top >
      <b-card-text>
        제주특별자치도 서귀포시 성산읍
      </b-card-text>
      <template #footer>
        <small class="text-muted">15분전</small>
      </template>
    </b-card>

    <b-card title="용머리해안" :img-src="require('@/assets/home/home6.jpg')" img-height="360"
          img-width="200"
          img-alt="Image" img-top >

      <b-card-text>
        제주특별자치도 서귀포시 안덕면
      </b-card-text>
      <template #footer>
        <small class="text-muted">어제</small>
      </template>
      
    </b-card>
     </b-card-group>
     <b-card-group deck class="card-group">
<b-card  title="부산대교" :img-src="require('@/assets/home/home2.jpg')" 
      img-height="360"
          img-width="200"
          img-alt="Image" img-top >
      <b-card-text>
        부산광역시 중구 중앙동
      </b-card-text>
      <template #footer>
        <small class="text-muted">11일전</small>
      </template>
    </b-card>

    <b-card  title="전주한옥마을" :img-src="require('@/assets/home/home5.jpg')" img-height="360"
          img-width="200"
          img-alt="Image" img-top >
      <b-card-text>
        전라북도 전주시 완산구
      </b-card-text>
      <template #footer>
        <small class="text-muted">43분전</small>
      </template>
    </b-card>

    <b-card title="여수 밤바다" :img-src="require('@/assets/home/home7.jpg')" img-height="360"
          img-width="200"
          img-alt="Image" img-top >

      <b-card-text>
        대한민국 전라남도 동남부
      </b-card-text>
      <template #footer>
        <small class="text-muted">5일전</small>
      </template>
      
    </b-card>

  </b-card-group>


</div>

</template>

<script>
export default {

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


.cardimg{
  width: 83%;
  height: 540px;
  margin-left: auto;
   margin-right: auto;
   margin-top: 30px;

}

#main-card{
  margin-top: 70px;
  background: white;
  border: none;
}
.card-group{
 width: 68%;
   margin-left: auto;
   margin-right: auto;
   margin-top: 30px;
}
</style>