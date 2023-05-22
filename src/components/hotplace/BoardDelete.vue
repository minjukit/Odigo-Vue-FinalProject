<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-overlay
          id="overlay-background"
          show
          :variant="variant"
          :opacity="opacity"
          :blur="blur"
          rounded="sm"
        >
        <b-alert show><h3>글 삭제 중..</h3></b-alert>
         </b-overlay>
      </b-col>
    </b-row>
   
  </b-container>
</template>

<script>
import http from "@/util/http-common.js";

export default {
  name: "BoardDelete",
   data() {
      return {
        variant: 'light',
        opacity: 0.85,
        blur: '2px',
        variants: [
          'transparent',
          'white',
          'light',
          'dark',
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
        ],
        blurs: [
          { text: 'None', value: '' },
          '1px',
          '2px',
          '5px',
          '0.5em',
          '1rem'
        ]
      }
    },
  created() {
    http.delete(`/hotplace/${this.$route.params.id}`).then((response) => {
      let msg =response.status;
      if (response.status === 200) {
        msg = "삭제가 완료되었습니다.";
      }
      alert(msg);
      //console.log(msg);
      // 현재 route를 /list로 변경.
      this.$router.push({ name: "HotPlaceList" });
    }).catch((err)=>{
      alert("삭제 처리시 문제가 발생했습니다."+err);
       this.$router.push({ name: "HotPlaceList" });
    }
    );
  },
};
</script>

<style></style>
