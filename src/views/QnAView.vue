<template>
    <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-hotpink">
      공지사항
    </h3>
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: 'QnAView',
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