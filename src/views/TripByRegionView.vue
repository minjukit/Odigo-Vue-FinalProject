<template>
  <div class="home">
    <kakao-map></kakao-map>
  </div>
</template>

<script>
import KakaoMap from "@/components/map/KakaoMap.vue"

export default {
  name: 'TripByRegionView',
  components: {
    KakaoMap

  }
}
</script>
