<template>
  <div class="home">
    <slide-wrap></slide-wrap>
    <hot-place-home></hot-place-home>
  </div>
</template>

<script>
import SlideWrap from "@/components/home/SlideWrap.vue"
import HotPlaceHome from "@/components/home/HotPlaceHome.vue"

export default {
  name: 'HomeView',
  components: {
    SlideWrap,
    HotPlaceHome
  }
}
</script>
