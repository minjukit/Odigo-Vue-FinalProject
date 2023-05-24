<template>
  <div class="home">
    <slide-wrap></slide-wrap>
    <hot-place-home></hot-place-home>
    <card-hot-place></card-hot-place>
  </div>
</template>

<script>
import SlideWrap from "@/components/home/SlideWrap.vue"
import HotPlaceHome from "@/components/home/HotPlaceHome.vue"
import CardHotPlace from "@/components/home/CardHotPlace.vue"

export default {
  name: 'HomeView',
  components: {
    SlideWrap,
    HotPlaceHome,
    CardHotPlace
  }
}
</script>