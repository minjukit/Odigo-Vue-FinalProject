<template>
    <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-hotpink">
      핫플레이스
    </h3>
    <h6>인기많은 여행지를 알아보세요</h6>
    <router-view></router-view>
  </b-container>
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
</style>